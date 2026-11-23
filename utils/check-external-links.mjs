// Checks the external links in the docs for ones that no longer resolve.
//
// The build fails on a broken internal link, but nothing looks at the links that leave the
// site, so they rot quietly: an API page is renamed, a project moves its docs, a host shuts
// down. This collects every http(s) URL in the English and Japanese pages (link targets,
// embeds, thumbnails), requests each one once and reports the ones that are gone.
//
// Only a definite answer counts as broken: 404, 410, or a domain that public DNS says does
// not exist. Anything else that is not a success (403 from a host that refuses automated
// requests, a timeout, a rate limit, a server error, a lookup that fails only on this
// machine's resolver) is listed as unverified and does not fail the run, so a red result
// always means a link to fix.
//
// URLs inside code blocks and inline code are skipped: they are mostly API endpoints and
// placeholders, not links a reader follows.
//
// Usage:
//   node utils/check-external-links.mjs
//   node utils/check-external-links.mjs --report links-report.md
//   node utils/check-external-links.mjs --root /path/to/another/checkout
//
// Exits 1 when any link is broken. `--report` also writes the result as Markdown, which the
// scheduled workflow (.github/workflows/links.yml) posts as an issue.

import { Resolver } from 'node:dns/promises';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CONTENT_DIRS = ['docs', 'i18n/ja/docusaurus-plugin-content-docs/current'];
const PAGE_EXTENSIONS = new Set(['.md', '.mdx']);

// URLs that are written as links but are not meant to be followed. Each entry says why.
const IGNORE = [
    // Reserved example domains and local servers used in walkthroughs.
    /^https?:\/\/([^/]+\.)?example\.(com|org|net)(\/|$)/,
    /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?(\/|$)/,
    // URL patterns with a placeholder in them: /:id, {id}, <id>, *, $VAR or a trailing "...".
    /\/:[A-Za-z]/,
    /[{}*$]|%7B|\.\.\.$/,
    // Prefixes quoted in prose to show the shape of a URL, with the ID left off.
    /^https:\/\/playcanv\.as\/(p|e\/p|b)\/?$/,
    /^https:\/\/playcanvas\.com\/(api|editor\/scene|project)\/?$/
];

// Hosts that answer 403 for a file that does not exist (S3 does, unless the bucket allows
// listing), so 403 there means the link is broken, not that the request was refused.
const FORBIDDEN_MEANS_MISSING = [/(^|\.)amazonaws\.com$/];

// A failed lookup is confirmed against these public resolvers before a domain is reported as
// gone, because the local resolver can fail for a domain that resolves everywhere else.
const PUBLIC_DNS = ['8.8.8.8', '1.1.1.1'];

const TIMEOUT_MS = 20000;
// Waits before each retry of an answer that could be temporary. Hosts that rate-limit a burst
// of requests (GitHub answers 429 or 503) usually let the second or third attempt through.
const RETRY_DELAYS_MS = [3000, 10000];
const MAX_REQUESTS = 16;
const MAX_REQUESTS_PER_HOST = 2;
const HEADERS = {
    'user-agent': 'Mozilla/5.0 (compatible; link-checker)',
    'accept': 'text/html,application/xhtml+xml,*/*;q=0.8'
};

const args = process.argv.slice(2);
const flag = (name) => {
    const index = args.indexOf(name);
    return index === -1 ? null : args[index + 1];
};
const root = flag('--root')
    ? path.resolve(flag('--root'))
    : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const reportPath = flag('--report');

/**
 * Removes fenced code blocks and inline code from a page, so the URLs left are ones the page
 * links to or embeds.
 *
 * @param {string} text - The page source.
 * @returns {string} The source without code.
 */
function stripCode(text) {
    const kept = [];
    let fence = null;
    for (const line of text.split('\n')) {
        const marker = line.match(/^\s*(`{3,}|~{3,})/);
        if (fence) {
            if (marker && marker[1][0] === fence[0] && marker[1].length >= fence.length) {
                fence = null;
            }
            continue;
        }
        if (marker) {
            fence = marker[1];
            continue;
        }
        kept.push(line.replace(/`[^`]*`/g, ''));
    }
    return kept.join('\n');
}

/**
 * Finds the URLs in a page. A URL ends at whitespace, a quote, an angle bracket, a square
 * bracket or non-ASCII text, at the `)` that closes a Markdown link, and before trailing
 * punctuation.
 *
 * @param {string} text - The page source, without code.
 * @returns {string[]} The URLs, without fragments.
 */
function extractUrls(text) {
    const urls = [];
    for (const [candidate] of text.matchAll(/https?:\/\/[!-~]+/g)) {
        let end = candidate.search(/["'<>\\\]`]/);
        if (end === -1) {
            end = candidate.length;
        }
        let depth = 0;
        for (let i = 0; i < end; i++) {
            if (candidate[i] === '(') {
                depth++;
            } else if (candidate[i] === ')' && --depth < 0) {
                end = i;
            }
        }
        const url = candidate.slice(0, end)
            .replace(/&amp;/g, '&')
            .replace(/#.*$/, '')
            .replace(/[.,;:!?*]+$/, '');
        if (URL.canParse(url)) {
            urls.push(url);
        }
    }
    return urls;
}

/**
 * Lists the pages under a directory.
 *
 * @param {string} dir - The directory to walk, relative to the checkout root.
 * @returns {Promise<string[]>} The pages' paths, relative to the checkout root.
 */
async function listPages(dir) {
    const entries = await fs.readdir(path.join(root, dir), { recursive: true, withFileTypes: true });
    return entries
        .filter((entry) => entry.isFile() && PAGE_EXTENSIONS.has(path.extname(entry.name)))
        .map((entry) => path.relative(root, path.join(entry.parentPath, entry.name)).split(path.sep).join('/'))
        .sort();
}

/**
 * Returns a function that runs async tasks with at most `max` in flight.
 *
 * @param {number} max - The most tasks to run at once.
 * @returns {(task: () => Promise<any>) => Promise<any>} The limited runner.
 */
function limiter(max) {
    let active = 0;
    const waiting = [];
    const next = () => {
        if (active < max && waiting.length > 0) {
            active++;
            waiting.shift()();
        }
    };
    return (task) => new Promise((resolve, reject) => {
        waiting.push(() => task().then(resolve, reject).finally(() => {
            active--;
            next();
        }));
        next();
    });
}

/**
 * Requests a URL once.
 *
 * @param {string} url - The URL to request.
 * @returns {Promise<{ status: number } | { error: string }>} The final HTTP status, or the
 * code of the network error.
 */
async function request(url) {
    try {
        const response = await fetch(url, {
            headers: HEADERS,
            redirect: 'follow',
            signal: AbortSignal.timeout(TIMEOUT_MS)
        });
        // Only the status matters, so drop the body instead of downloading it.
        await response.body?.cancel().catch(() => {});
        return { status: response.status };
    } catch (error) {
        return { error: error.cause?.code ?? error.name ?? 'error' };
    }
}

/**
 * Asks public DNS whether a host has an address.
 *
 * @param {string} host - The host name to look up.
 * @returns {Promise<boolean | null>} True when it resolves, false when public DNS says it
 * does not exist, null when the question could not be answered.
 */
async function resolvesPublicly(host) {
    const resolver = new Resolver({ timeout: 5000, tries: 2 });
    resolver.setServers(PUBLIC_DNS);
    const missing = (error) => error.code === 'ENOTFOUND' || error.code === 'ENODATA';
    try {
        await resolver.resolve4(host);
        return true;
    } catch (error4) {
        if (!missing(error4)) {
            return null;
        }
        try {
            await resolver.resolve6(host);
            return true;
        } catch (error6) {
            return missing(error6) ? false : null;
        }
    }
}

/**
 * Checks a URL, retrying when the answer could be temporary.
 *
 * @param {string} url - The URL to check.
 * @returns {Promise<{ state: 'ok' | 'broken' | 'unverified', detail: string }>} The verdict
 * and the status or error behind it.
 */
async function check(url) {
    let result = await request(url);
    for (const delay of RETRY_DELAYS_MS) {
        if (result.error === undefined && result.status !== 429 && result.status < 500) {
            break;
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
        result = await request(url);
    }
    const host = new URL(url).hostname;
    if (result.error !== undefined) {
        if (result.error === 'ENOTFOUND' && await resolvesPublicly(host) === false) {
            return { state: 'broken', detail: 'no such domain' };
        }
        return { state: 'unverified', detail: result.error };
    }
    const { status } = result;
    const detail = String(status);
    if (status >= 200 && status < 300) {
        return { state: 'ok', detail };
    }
    if (status === 404 || status === 410 || (status === 403 && FORBIDDEN_MEANS_MISSING.some((pattern) => pattern.test(host)))) {
        return { state: 'broken', detail };
    }
    return { state: 'unverified', detail };
}

// Collect every URL and the pages that use it.
const usedIn = new Map();
let pageCount = 0;
for (const dir of CONTENT_DIRS) {
    for (const page of await listPages(dir)) {
        pageCount++;
        const text = stripCode(await fs.readFile(path.join(root, page), 'utf8'));
        for (const url of extractUrls(text)) {
            if (IGNORE.some((pattern) => pattern.test(url))) {
                continue;
            }
            if (!usedIn.has(url)) {
                usedIn.set(url, new Set());
            }
            usedIn.get(url).add(page);
        }
    }
}

console.log(`Checking ${usedIn.size} external links from ${pageCount} pages...`);

const overall = limiter(MAX_REQUESTS);
const perHost = new Map();
const results = await Promise.all([...usedIn.keys()].sort().map((url) => {
    const host = new URL(url).hostname;
    if (!perHost.has(host)) {
        perHost.set(host, limiter(MAX_REQUESTS_PER_HOST));
    }
    return perHost.get(host)(() => overall(() => check(url))).then((verdict) => ({ url, ...verdict }));
}));

const broken = results.filter((result) => result.state === 'broken');
const unverified = results.filter((result) => result.state === 'unverified');
const ok = results.length - broken.length - unverified.length;

const pagesFor = (url) => [...usedIn.get(url)].sort();

for (const { url, detail } of broken) {
    console.log(`\n  ${detail}  ${url}`);
    for (const page of pagesFor(url)) {
        console.log(`        ${page}`);
    }
}
if (unverified.length > 0) {
    console.log(`\nCould not verify (not counted as broken):`);
    for (const { url, detail } of unverified) {
        console.log(`  ${detail}  ${url}`);
    }
}
console.log(`\n${ok} resolve, ${broken.length} broken, ${unverified.length} could not be verified.`);

if (reportPath) {
    const lines = [];
    if (broken.length === 0) {
        lines.push('Every external link in the docs resolves.');
    } else {
        lines.push(
            `The scheduled link check found ${broken.length} external link${broken.length === 1 ? '' : 's'} that no longer resolve${broken.length === 1 ? 's' : ''}.`,
            '',
            '| Link | Result | Used in |',
            '| --- | --- | --- |'
        );
        for (const { url, detail } of broken) {
            const pages = pagesFor(url);
            const shown = pages.slice(0, 4).map((page) => `\`${page}\``).join('<br>');
            const more = pages.length > 4 ? `<br>and ${pages.length - 4} more` : '';
            lines.push(`| ${url.replace(/\|/g, '%7C')} | ${detail} | ${shown}${more} |`);
        }
        lines.push(
            '',
            'Update or remove each link in `docs/` and in its Japanese counterpart under `i18n/ja/`. If a link is correct and should not be checked, add a pattern for it to `IGNORE` in `utils/check-external-links.mjs`.',
            '',
            'This issue is updated by each run of the External links workflow and closed by the first run that finds nothing broken. Run `npm run check:links` to check locally.'
        );
    }
    if (unverified.length > 0) {
        lines.push(
            '',
            `<details><summary>${unverified.length} link${unverified.length === 1 ? '' : 's'} could not be verified</summary>`,
            '',
            'These hosts refused the request, timed out, returned a server error or failed a lookup that public DNS answers. They are not counted as broken.',
            ''
        );
        for (const { url, detail } of unverified) {
            lines.push(`- ${detail}: ${url}`);
        }
        lines.push('', '</details>');
    }
    await fs.writeFile(path.resolve(reportPath), `${lines.join('\n')}\n`);
}

process.exit(broken.length > 0 ? 1 : 0);
