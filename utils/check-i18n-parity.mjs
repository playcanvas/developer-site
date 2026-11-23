// Checks that every page in docs/ has a Japanese counterpart at the same path, and the reverse.
//
// Docusaurus builds the Japanese site from docs/ and overlays i18n/ja/ on it by path. A page
// with no file at the same path under i18n/ja/ is served in English on the Japanese site, and a
// translation whose path matches no page in docs/ is never served at all. Neither fails a
// build, so a page that was added, moved or renamed in one tree only goes unnoticed.
//
// Paths are compared exactly as they are on disk. GitHub Pages and CI are case-sensitive while
// macOS and Windows usually are not, so a translation saved as `Page.md` for `page.md` looks
// fine locally and is orphaned in production; those are reported as a case mismatch.
//
// Only pages (.md and .mdx) are compared. Example sources that sit beside a page are imported
// by path and fail the build themselves when missing.
//
// Usage:
//   node utils/check-i18n-parity.mjs
//   node utils/check-i18n-parity.mjs --root /path/to/another/checkout
//
// Exits 1 when the trees differ. Every line of the report names the file to add, move or
// rename.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SOURCE_DIR = 'docs';
const LOCALES = [
    { name: 'ja', dir: 'i18n/ja/docusaurus-plugin-content-docs/current' }
];
const PAGE_EXTENSIONS = new Set(['.md', '.mdx']);

const args = process.argv.slice(2);
const rootFlag = args.indexOf('--root');
const root = rootFlag === -1
    ? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
    : path.resolve(args[rootFlag + 1]);

/**
 * Lists the pages under a directory as POSIX paths relative to it, in the case they have on
 * disk.
 *
 * @param {string} dir - The directory to walk, relative to the checkout root.
 * @returns {Promise<string[]>} The relative paths of the pages found.
 */
async function listPages(dir) {
    const entries = await fs.readdir(path.join(root, dir), { recursive: true, withFileTypes: true });
    return entries
        .filter((entry) => entry.isFile() && PAGE_EXTENSIONS.has(path.extname(entry.name)))
        .map((entry) => path.relative(path.join(root, dir), path.join(entry.parentPath, entry.name)))
        .map((page) => page.split(path.sep).join('/'))
        .sort();
}

const sourcePages = await listPages(SOURCE_DIR);
const sourceSet = new Set(sourcePages);
const problems = [];

for (const locale of LOCALES) {
    const localePages = await listPages(locale.dir);
    const localeSet = new Set(localePages);
    const localeByLowerCase = new Map(localePages.map((page) => [page.toLowerCase(), page]));
    const caseMismatched = new Set();

    for (const page of sourcePages) {
        if (localeSet.has(page)) {
            continue;
        }
        const otherCase = localeByLowerCase.get(page.toLowerCase());
        if (otherCase) {
            caseMismatched.add(otherCase);
            problems.push(`${locale.name}: case mismatch. Rename ${locale.dir}/${otherCase} to match ${SOURCE_DIR}/${page}`);
        } else {
            problems.push(`${locale.name}: missing translation. ${SOURCE_DIR}/${page} has no ${locale.dir}/${page}`);
        }
    }

    for (const page of localePages) {
        if (!sourceSet.has(page) && !caseMismatched.has(page)) {
            problems.push(`${locale.name}: orphaned translation. ${locale.dir}/${page} has no ${SOURCE_DIR}/${page}`);
        }
    }
}

console.log(`Checked ${sourcePages.length} pages in ${SOURCE_DIR}/ against ${LOCALES.map((locale) => locale.name).join(' and ')}.`);
if (problems.length > 0) {
    console.log('');
    for (const problem of problems) {
        console.log(`  ${problem}`);
    }
    console.log(`\n${problems.length} problem${problems.length === 1 ? '' : 's'}.`);
    process.exit(1);
}
console.log('Every page has a translation at the same path.');
