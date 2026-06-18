#!/usr/bin/env node
/**
 * One-off migration: prefix shared static asset URLs with pathname:// in Markdown/MDX.
 * Skips URLs that already use pathname://.
 *
 * @see https://github.com/playcanvas/developer-site/issues/880
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteDir = path.resolve(__dirname, '..');

const TARGET_DIRS = [
    path.join(siteDir, 'docs'),
    path.join(siteDir, 'i18n/ja/docusaurus-plugin-content-docs/current'),
];

const STATIC_PREFIXES = ['img', 'assets', 'video', 'downloads'];

/** @param {string} content */
function migrateContent(content) {
    const prefixPattern = STATIC_PREFIXES.join('|');
    const re = new RegExp(
        `\\]\\((?!pathname://)(\\/(?:${prefixPattern})\\/)`,
        'g',
    );
    return content.replace(re, '](pathname://$1');
}

/** @param {string} dir */
function collectMarkdownFiles(dir) {
    /** @type {string[]} */
    const files = [];
    if (!fs.existsSync(dir)) {
        return files;
    }
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const entryPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...collectMarkdownFiles(entryPath));
        } else if (/\.(md|mdx)$/.test(entry.name)) {
            files.push(entryPath);
        }
    }
    return files;
}

function main() {
    let filesChanged = 0;
    let replacements = 0;

    for (const dir of TARGET_DIRS) {
        for (const filePath of collectMarkdownFiles(dir)) {
            const original = fs.readFileSync(filePath, 'utf8');
            const updated = migrateContent(original);
            if (updated === original) {
                continue;
            }
            const count = (updated.length - original.length) / 'pathname://'.length;
            replacements += count;
            fs.writeFileSync(filePath, updated, 'utf8');
            filesChanged += 1;
            console.log(`${path.relative(siteDir, filePath)} (${count} URLs)`);
        }
    }

    console.log(`\nDone: ${filesChanged} files updated, ~${replacements} pathname:// prefixes added.`);
}

main();
