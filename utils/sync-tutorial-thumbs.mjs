// Refreshes the tutorial thumbnails that come from PlayCanvas projects.
//
// Most tutorial pages use their project's thumbnail as their `thumb` on the /tutorials/ index.
// The site keeps a copy of each one in static/img/tutorials/<page>/thumbnail.webp, so the index
// does not depend on PlayCanvas's image storage. utils/plugins/tutorials/thumbs.json records,
// for each of those pages, the project the thumbnail belongs to and the image it was made from.
//
// When a project's owner changes its thumbnail, the copy here keeps showing the old one until
// this script runs: it asks the public project API for each project's current thumbnail and
// replaces the copies that are out of date.
//
// Usage:
//   node utils/sync-tutorial-thumbs.mjs                              Replace the out-of-date thumbnails
//   node utils/sync-tutorial-thumbs.mjs --check                      List them without changing anything
//   node utils/sync-tutorial-thumbs.mjs --check --report report.md   Also write the list as Markdown
//
// Replacing thumbnails needs `cwebp` on the PATH (see "Images" in .github/CONTRIBUTING.md).
//
// A project that is gone (deleted or made private) or has no thumbnail keeps the copy it has, and
// the script exits 1 so it is not missed. With --check it also exits 1 when any thumbnail is out
// of date. A project that cannot be reached is listed, but does not fail the run on its own.
// The scheduled workflow (.github/workflows/thumbnails.yml) posts the report as an issue.

import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import { THUMBS_PATH, thumbnailPath } from './plugins/tutorials/thumbs.mjs';

const API = 'https://playcanvas.com/api/projects';
// The index shows thumbnails at up to 180 CSS pixels, so 360 covers high-density screens
const SIZE = 360;
// The API allows roughly 120 requests a minute and answers 429 beyond that, so projects are
// read one at a time with a pause between, and a 429 waits for the limit to reset.
const REQUEST_DELAY_MS = 600;
const RETRY_DELAYS_MS = [15000, 30000, 60000];

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const run = promisify(execFile);

/**
 * Reads the URL of a public project's current thumbnail, at the largest size the API offers.
 *
 * @param {string} projectId - The project ID.
 * @returns {Promise<{ url: string } | { problem: string, unreachable?: boolean }>} The URL, or
 * why there is none. `unreachable` marks a problem that may go away, such as a server error.
 */
async function thumbnailOf(projectId) {
    let last = 'no response';
    for (const delay of [0, ...RETRY_DELAYS_MS]) {
        await sleep(delay);
        try {
            const response = await fetch(`${API}/${projectId}`, { signal: AbortSignal.timeout(20000) });
            if (response.ok) {
                const { thumbnails } = await response.json();
                const url = thumbnails?.xl ?? thumbnails?.l;
                return url ? { url } : { problem: 'the project has no thumbnail' };
            }
            if (response.status !== 429 && response.status < 500) {
                return { problem: `HTTP ${response.status}: the project is deleted or private` };
            }
            last = `HTTP ${response.status}`;
        } catch (error) {
            // Network error or timeout: try again
            last = error.name === 'TimeoutError' ? 'timed out' : 'network error';
        }
    }
    return { problem: last, unreachable: true };
}

/**
 * Downloads an image and saves it as a square WebP thumbnail.
 *
 * @param {string} url - The image URL.
 * @param {string} file - The WebP file to write.
 */
export async function saveThumbnail(url, file) {
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) {
        throw new Error(`${url}: HTTP ${response.status}`);
    }
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'tutorial-thumb-'));
    try {
        const source = path.join(dir, 'source');
        await fs.writeFile(source, Buffer.from(await response.arrayBuffer()));
        await fs.mkdir(path.dirname(file), { recursive: true });
        // Project thumbnails are rendered scenes, so lossy WebP (see "Images" in CONTRIBUTING.md)
        await run('cwebp', ['-quiet', '-q', '85', '-m', '6', '-resize', String(SIZE), String(SIZE), source, '-o', file]);
    } finally {
        await fs.rm(dir, { recursive: true, force: true });
    }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
    const args = process.argv.slice(2);
    const check = args.includes('--check');
    const reportPath = args.includes('--report') ? args[args.indexOf('--report') + 1] : null;
    const thumbsPath = path.join(siteDir, THUMBS_PATH);
    const thumbs = JSON.parse(await fs.readFile(thumbsPath, 'utf8'));
    const slugs = Object.keys(thumbs);

    if (!check) {
        try {
            await run('cwebp', ['-version']);
        } catch {
            console.error('cwebp is not installed. See "Images" in .github/CONTRIBUTING.md.');
            process.exit(1);
        }
    }

    const minutes = Math.ceil(slugs.length * REQUEST_DELAY_MS / 60000);
    console.log(`Reading ${slugs.length} project${slugs.length === 1 ? '' : 's'}, about ${minutes} minute${minutes === 1 ? '' : 's'}...`);
    const changed = [];
    const gone = [];
    const unreachable = [];
    for (const slug of slugs) {
        const { project, source } = thumbs[slug];
        const current = await thumbnailOf(project);
        await sleep(REQUEST_DELAY_MS);
        if (!current.url) {
            (current.unreachable ? unreachable : gone).push({ slug, project, problem: current.problem });
            continue;
        }
        if (current.url === source) {
            continue;
        }
        changed.push({ slug, project });
        if (!check) {
            await saveThumbnail(current.url, path.join(siteDir, 'static', thumbnailPath(slug)));
            thumbs[slug].source = current.url;
        }
    }

    if (!check) {
        await fs.writeFile(thumbsPath, `${JSON.stringify(thumbs, null, 2)}\n`);
    }

    const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
    const line = ({ slug, project, problem }) => `${slug} (project ${project})${problem ? `: ${problem}` : ''}`;
    console.log(changed.length
        ? `${check ? 'Out of date' : 'Updated'}: ${changed.length}\n  ${changed.map(line).join('\n  ')}`
        : 'Every thumbnail is up to date.');
    for (const [list, heading] of [[gone, 'Left as they are'], [unreachable, 'Could not reach (left as they are)']]) {
        if (list.length) {
            console.error(`${heading}: ${list.length}\n  ${list.map(line).join('\n  ')}`);
        }
    }

    if (reportPath) {
        const page = ({ slug, project }) => `| \`docs/tutorials/${slug}.md\` | [${project}](https://playcanvas.com/project/${project}) |`;
        const lines = [];
        if (changed.length === 0 && gone.length === 0) {
            lines.push('Every tutorial thumbnail matches its project\'s thumbnail.');
        }
        if (changed.length) {
            lines.push(
                `The scheduled thumbnail check found ${plural(changed.length, 'tutorial page')} whose project has a new thumbnail.`,
                '',
                '| Page | Project |',
                '| --- | --- |',
                ...changed.map(page),
                '',
                'Run `npm run sync:tutorial-thumbs` (it needs `cwebp`) to replace the copies in `static/img/tutorials/` and update `utils/plugins/tutorials/thumbs.json`, check the new images, and open a pull request.'
            );
        }
        if (gone.length) {
            lines.push(
                ...(changed.length ? [''] : []),
                `${plural(gone.length, 'project')} no longer ${gone.length === 1 ? 'has' : 'have'} a thumbnail to copy:`,
                '',
                '| Page | Project | Problem |',
                '| --- | --- | --- |',
                ...gone.map((entry) => `${page(entry)} ${entry.problem} |`),
                '',
                'The pages keep the thumbnails they have. If the project has moved, update its ID in `utils/plugins/tutorials/thumbs.json`; otherwise remove the page from `thumbs.json` so its thumbnail is no longer checked.'
            );
        }
        if (changed.length || gone.length) {
            lines.push('', 'This issue is updated by each run of the Tutorial thumbnails workflow and closed by the first run that finds nothing to do. Run `npm run sync:tutorial-thumbs -- --check` to check locally.');
        }
        if (unreachable.length) {
            lines.push(
                '',
                `<details><summary>${plural(unreachable.length, 'project')} could not be reached</summary>`,
                '',
                'These requests failed with a server error, a timeout or a network error. They are not counted as problems.',
                '',
                ...unreachable.map((entry) => `- ${line(entry)}`),
                '',
                '</details>'
            );
        }
        await fs.writeFile(path.resolve(reportPath), `${lines.join('\n')}\n`);
    }

    if (gone.length || (check && changed.length)) {
        process.exit(1);
    }
}
