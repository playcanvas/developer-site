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
//   node utils/sync-tutorial-thumbs.mjs           Replace the out-of-date thumbnails
//   node utils/sync-tutorial-thumbs.mjs --check   List them without changing anything
//
// Needs `cwebp` on the PATH (see "Images" in .github/CONTRIBUTING.md). A project that cannot be
// read keeps the thumbnail it has, and the script exits 1 so the failure is not missed. With
// --check it also exits 1 when any thumbnail is out of date.

import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import { THUMBS_PATH, thumbnailPath } from './plugins/tutorials/data.mjs';

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
 * @returns {Promise<string | null>} The URL, or null when the project cannot be read or has
 * no thumbnail.
 */
async function thumbnailOf(projectId) {
    for (const delay of [0, ...RETRY_DELAYS_MS]) {
        await sleep(delay);
        try {
            const response = await fetch(`${API}/${projectId}`, { signal: AbortSignal.timeout(20000) });
            if (response.ok) {
                const { thumbnails } = await response.json();
                return thumbnails?.xl ?? thumbnails?.l ?? null;
            }
            if (response.status !== 429 && response.status < 500) {
                return null;
            }
        } catch {
            // Network error or timeout: try again
        }
    }
    return null;
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
    const check = process.argv.includes('--check');
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
    const failed = [];
    for (const slug of slugs) {
        const { project, source } = thumbs[slug];
        const current = await thumbnailOf(project);
        await sleep(REQUEST_DELAY_MS);
        if (!current) {
            failed.push(`${slug} (project ${project})`);
            continue;
        }
        if (current === source) {
            continue;
        }
        changed.push(`${slug} (project ${project})`);
        if (!check) {
            await saveThumbnail(current, path.join(siteDir, 'static', thumbnailPath(slug)));
            thumbs[slug].source = current;
        }
    }

    if (!check) {
        await fs.writeFile(thumbsPath, `${JSON.stringify(thumbs, null, 2)}\n`);
    }

    const verb = check ? 'Out of date' : 'Updated';
    console.log(changed.length ? `${verb}: ${changed.length}\n  ${changed.join('\n  ')}` : 'Every thumbnail is up to date.');
    if (failed.length) {
        console.error(`Could not read ${failed.length} project(s), so their thumbnails were left as they are:\n  ${failed.join('\n  ')}`);
    }
    if (failed.length || (check && changed.length)) {
        process.exit(1);
    }
}
