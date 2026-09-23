// utils/plugins/llms/indexes.mjs
import fs from 'fs';
import path from 'path';

import { load as loadYaml } from 'js-yaml';

import { markdownPathFromDocPath } from './docs.mjs';

/**
 * The hand-written llms.txt indexes in the llms/ directory. Its layout mirrors
 * where they are published: llms/user-manual/engine/llms.txt is published at
 * /user-manual/engine/llms.txt.
 *
 * An index is Markdown in the llms.txt format, linking pages by their site
 * path (/user-manual/engine/standalone/). Its front matter lists the User
 * Manual sections it covers:
 *
 *     ---
 *     covers: [engine, graphics, physics]
 *     ---
 *
 * The build checks every site path, points pages at their Markdown versions,
 * and fills in these placeholders:
 *
 * - {{ENGINE_VERSION}}: the engine version the site runs
 * - {{OTHER_PAGES}}: a list of the covered pages the index does not link,
 *   after a link to the file of all its pages (llms-full.txt)
 *
 * Every index but the root one also gets that file of all its pages: the ones
 * it links, in its order, then the others it covers.
 */

// Size limits, well below the 100,000 characters some fetch tools read of a file
export const ROOT_INDEX_BUDGET = 15 * 1024;
export const INDEX_BUDGET = 50 * 1024;

const FRONT_MATTER_RE = /^---\n([\s\S]*?)\n---\n/;

// A link to a site path: [text](/user-manual/engine/)
const SITE_LINK_RE = /\]\((\/[^)\s]*)\)/g;

/**
 * @typedef {object} Index
 * @property {string} source - Path of the source file, from the site root
 * @property {string} publishedPath - URL path the index is published at
 * @property {string|null} bundlePath - URL path of the file of all its pages, if it has one
 * @property {string[]} covers - The User Manual sections the index covers
 * @property {string} title - The H1 of the index
 * @property {string} summary - The blockquote of the index
 * @property {string} body - The index without its front matter
 */

/**
 * Load the indexes of a directory
 *
 * @param {string} siteDir - The site root
 * @param {string} indexDir - The directory of the indexes
 * @returns {Index[]} The indexes, the root one first
 */
export function loadIndexes(siteDir, indexDir) {
    const files = [];
    (function walk(dir) {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) walk(fullPath);
            else if (entry.name === 'llms.txt') files.push(fullPath);
        }
    })(indexDir);

    return files.map((file) => {
        const text = fs.readFileSync(file, 'utf-8').replace(/\r\n?/g, '\n');
        const match = text.match(FRONT_MATTER_RE);
        const frontMatter = match ? loadYaml(match[1]) ?? {} : {};
        const body = match ? text.slice(match[0].length) : text;
        const publishedPath = `/${path.relative(indexDir, file).split(path.sep).join('/')}`;

        return {
            source: path.relative(siteDir, file).split(path.sep).join('/'),
            publishedPath,
            bundlePath: publishedPath === '/llms.txt' ? null : publishedPath.replace(/llms\.txt$/, 'llms-full.txt'),
            covers: frontMatter.covers ?? [],
            title: body.match(/^# (.+)$/m)?.[1] ?? '',
            summary: body.match(/^> (.+)$/m)?.[1] ?? '',
            body
        };
    }).sort((a, b) => a.publishedPath.split('/').length - b.publishedPath.split('/').length || a.publishedPath.localeCompare(b.publishedPath));
}

/**
 * The User Manual section of a doc: 'engine' for /user-manual/engine/standalone/
 *
 * @param {string} docPath - The URL path of the doc
 * @returns {string} The section, or '' for the User Manual's own page
 */
export function sectionOf(docPath) {
    return docPath.split('/')[2] ?? '';
}

/**
 * The docs an index links, in order, and the docs it covers without linking them
 *
 * @param {Index} index - The index
 * @param {object[]} docs - Every published doc, in reading order
 * @returns {{ linked: object[], others: object[] }} The linked and the other covered docs
 */
export function indexPages(index, docs) {
    const docsByPath = new Map(docs.map(doc => [doc.urlPath, doc]));
    const linked = [];
    for (const [, target] of index.body.matchAll(SITE_LINK_RE)) {
        const doc = findDoc(docsByPath, target.split('#')[0]);
        if (doc && !linked.includes(doc)) linked.push(doc);
    }
    const others = docs.filter(doc => index.covers.includes(sectionOf(doc.urlPath)) && !linked.includes(doc));
    return { linked, others };
}

/**
 * Render an index for publishing: check and rewrite its links, and fill in
 * its placeholders
 *
 * @param {Index} index - The index
 * @param {object} options - What the index links to
 * @param {string} options.siteUrl - Site origin, e.g. https://developer.playcanvas.com
 * @param {object[]} options.docs - Every published doc
 * @param {Set<string>} options.llmsFiles - URL paths of every published LLM file
 * @param {object[]} options.others - The covered docs the index does not link
 * @param {{ pages: number, bytes: number }|null} options.bundle - The file of all its pages
 * @param {object} options.vars - Placeholder values
 * @param {string[]} problems - Receives any problem found
 * @returns {string} The published index
 */
export function renderIndex(index, { siteUrl, docs, llmsFiles, others, bundle, vars }, problems) {
    const otherPages = [
        ...(bundle ? [`- [All pages of this index in one file](${siteUrl}${index.bundlePath}): ${bundle.pages} pages (${Math.ceil(bundle.bytes / 1024)} KB), for downloading and searching rather than reading into context.`] : []),
        ...others.map(doc => `- [${linkText(doc.title)}](${siteUrl}${markdownPathFromDocPath(doc.urlPath)})`)
    ].join('\n');

    const text = renderText(index.body, { source: index.source, siteUrl, docs, llmsFiles, vars: { ...vars, OTHER_PAGES: otherPages } }, problems);

    const budget = index.publishedPath === '/llms.txt' ? ROOT_INDEX_BUDGET : INDEX_BUDGET;
    const bytes = Buffer.byteLength(text);
    if (bytes > budget) {
        problems.push(`${index.source}: ${Math.ceil(bytes / 1024)} KB is over its ${budget / 1024} KB budget`);
    }
    return text;
}

/**
 * Render text of an index: make its site links absolute, pointing pages at their
 * Markdown versions, and fill in its placeholders
 *
 * @param {string} text - Text of an index
 * @param {object} options - What the text links to
 * @param {string} options.source - Path of the index, for problems
 * @param {string} options.siteUrl - Site origin
 * @param {object[]} options.docs - Every published doc
 * @param {Set<string>} options.llmsFiles - URL paths of every published LLM file
 * @param {object} options.vars - Placeholder values
 * @param {string[]} problems - Receives any problem found
 * @returns {string} The rendered text
 */
export function renderText(text, { source, siteUrl, docs, llmsFiles, vars }, problems) {
    const docsByPath = new Map(docs.map(doc => [doc.urlPath, doc]));
    const linked = text.replace(SITE_LINK_RE, (match, target) => {
        const [targetPath, fragment] = target.split(/(?=#)/);
        if (llmsFiles.has(targetPath)) {
            return `](${siteUrl}${target})`;
        }
        const doc = findDoc(docsByPath, targetPath);
        if (!doc) {
            problems.push(`${source}: ${target} is not a published page or LLM file`);
            return match;
        }
        return `](${siteUrl}${markdownPathFromDocPath(doc.urlPath)}${fragment ?? ''})`;
    });

    return linked.replace(/\{\{(\w+)\}\}/g, (match, name) => {
        const value = vars[name];
        if (value === undefined || value === null) {
            problems.push(`${source}: no value for ${match}`);
            return match;
        }
        return String(value);
    });
}

/**
 * The doc at a site path, with or without its trailing slash
 */
function findDoc(docsByPath, targetPath) {
    return docsByPath.get(targetPath) ?? docsByPath.get(`${targetPath}/`);
}

/**
 * A doc title made safe for link text
 */
function linkText(title) {
    return title.replace(/\s+/g, ' ').replace(/[[\]]/g, '\\$&').trim();
}
