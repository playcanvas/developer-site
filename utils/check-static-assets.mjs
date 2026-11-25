// Keeps static/ from growing back to the size it had before the 2026 asset diet (494 MB, now
// about 330 MB). Everything in static/ is deployed with every build, so a file that is too big
// or used by nothing costs every deploy and every clone.
//
// It fails on:
//   - an animated GIF. Use an MP4 video instead (see "Videos" in .github/CONTRIBUTING.md).
//   - an image over 1 MiB. Save it as WebP, and scale it down if it's wider than it's shown.
//   - a video over 25 MiB. Lower the resolution or raise the CRF.
//   - a file whose path, relative to static/, appears in no tracked text file. That catches an
//     image left behind when a page stops using it. Delete it, or if something outside this
//     repository links to it, add it to KEEP with the reason.
//
// Usage:
//   node utils/check-static-assets.mjs
//   node utils/check-static-assets.mjs --root /path/to/another/checkout
//
// Exits 1 when anything is reported. Every line of the report names the file and what to do.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MiB = 1024 * 1024;
const IMAGE_LIMIT = 1 * MiB;
const VIDEO_LIMIT = 25 * MiB;
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif']);
const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.mov']);
const TEXT_EXTENSIONS = new Set([
    '.md', '.mdx', '.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.json', '.css', '.html',
    '.txt', '.yml', '.yaml', '.svg'
]);

// Images allowed over IMAGE_LIMIT, relative to static/, with why
const LARGE_IMAGES = {
    'img/user-manual/assets/textures/texture-compression/basis-vs-no-compression-brick.webp':
        'lossless on purpose: readers zoom in to compare compression artefacts',
    'img/user-manual/assets/textures/texture-compression/basis-vs-no-compression-cube.webp':
        'lossless on purpose: readers zoom in to compare compression artefacts',
    'assets/materials/concrete/normal.webp': 'normal map, near-lossless so lighting stays smooth',
    'assets/materials/granite/normal.webp': 'normal map, near-lossless so lighting stays smooth'
};

// Files no tracked text file names by path, relative to static/, with why they stay
const KEEP = {
    'CNAME': 'GitHub Pages custom domain',
    '.nojekyll': 'stops GitHub Pages running Jekyll',
    'user-manual/context7.json': 'claims the site on context7.com',
    'assets/audio-credits.txt': 'provenance of the generated audio in assets/',
    'assets/fonts/arial.png': 'atlas loaded beside arial.json',
    'assets/fonts/source-sans.png': 'atlas loaded beside source-sans.json'
};

const args = process.argv.slice(2);
const rootFlag = args.indexOf('--root');
const root = rootFlag === -1
    ? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
    : path.resolve(args[rootFlag + 1]);

const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' })
    .split('\0')
    .filter(Boolean);

const corpus = tracked
    .filter(file => TEXT_EXTENSIONS.has(path.extname(file).toLowerCase()) && !file.endsWith('package-lock.json'))
    .map(file => fs.readFileSync(path.join(root, file), 'utf8'))
    .join('\n');

const problems = [];
const mib = bytes => `${(bytes / MiB).toFixed(1)} MiB`;

for (const file of tracked.filter(f => f.startsWith('static/'))) {
    const rel = file.slice('static/'.length);
    const ext = path.extname(rel).toLowerCase();
    const size = fs.statSync(path.join(root, file)).size;

    if (ext === '.gif') {
        problems.push(`${file}: GIF. Convert it to an MP4 video (see "Videos" in .github/CONTRIBUTING.md)`);
    } else if (IMAGE_EXTENSIONS.has(ext) && size > IMAGE_LIMIT && !LARGE_IMAGES[rel]) {
        problems.push(`${file}: ${mib(size)} image, over ${mib(IMAGE_LIMIT)}. Save it as WebP at the size it's shown`);
    } else if (VIDEO_EXTENSIONS.has(ext) && size > VIDEO_LIMIT) {
        problems.push(`${file}: ${mib(size)} video, over ${mib(VIDEO_LIMIT)}. Lower its resolution or raise the CRF`);
    }

    if (!KEEP[rel] && !corpus.includes(rel) && !corpus.includes(encodeURI(rel))) {
        problems.push(`${file}: used by nothing. Delete it, or add it to KEEP in utils/check-static-assets.mjs with the reason`);
    }
}

for (const rel of [...Object.keys(LARGE_IMAGES), ...Object.keys(KEEP)]) {
    if (!tracked.includes(`static/${rel}`)) {
        problems.push(`static/${rel}: listed in utils/check-static-assets.mjs but missing. Remove it from the list`);
    }
}

if (problems.length) {
    console.error(problems.join('\n'));
    console.error(`\n${problems.length} problem${problems.length === 1 ? '' : 's'} in static/`);
    process.exit(1);
}
console.log(`static/: ${tracked.filter(f => f.startsWith('static/')).length} files, all used and within size limits`);
