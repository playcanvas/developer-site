// Refreshes the play counts the tutorials index page sorts by.
//
// "Most played" on /tutorials/ orders the pages by how often each one's PlayCanvas project
// has been played. The counts are a snapshot in utils/plugins/tutorials/plays.json, so the
// build never depends on the network; this script takes a new one from the public project
// API. Pages that share a project share its count, and a page with no project gets 0.
//
// Usage:
//   node utils/sync-tutorial-plays.mjs
//
// A project that cannot be read keeps the count it had, and the script exits 1 so the
// failure is not missed.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { loadTutorials } from './plugins/tutorials/data.mjs';

const API = 'https://playcanvas.com/api/projects';
const PLAYS_PATH = 'utils/plugins/tutorials/plays.json';
// The API allows roughly 120 requests a minute and answers 429 beyond that, so projects are
// read one at a time with a pause between, and a 429 waits for the limit to reset.
const REQUEST_DELAY_MS = 600;
const RETRY_DELAYS_MS = [15000, 30000, 60000];

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Reads how many times a public project has been played.
 *
 * @param {string} projectId - The project ID.
 * @returns {Promise<number | null>} The play count, or null when the project cannot be read.
 */
async function playsOf(projectId) {
    for (const delay of [0, ...RETRY_DELAYS_MS]) {
        await sleep(delay);
        try {
            const response = await fetch(`${API}/${projectId}`, { signal: AbortSignal.timeout(20000) });
            if (response.ok) {
                const { plays } = await response.json();
                return typeof plays === 'number' ? plays : null;
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

const tutorials = loadTutorials(siteDir);
const playsPath = path.join(siteDir, PLAYS_PATH);
const previous = JSON.parse(await fs.readFile(playsPath, 'utf8'));

const projectIds = [...new Set([...tutorials.values()].map((tutorial) => tutorial.projectId).filter(Boolean))];
console.log(`Reading ${projectIds.length} projects, about ${Math.ceil(projectIds.length * REQUEST_DELAY_MS / 60000)} minutes...`);
const playsByProject = new Map();
for (const projectId of projectIds) {
    playsByProject.set(projectId, await playsOf(projectId));
    await sleep(REQUEST_DELAY_MS);
}

const plays = {};
const failed = [];
for (const [id, { projectId }] of tutorials) {
    const slug = id.replace(/^tutorials\//, '');
    const count = projectId ? playsByProject.get(projectId) : 0;
    if (count === null) {
        failed.push(`${slug} (project ${projectId})`);
    }
    plays[slug] = count ?? previous[slug] ?? 0;
}

await fs.writeFile(playsPath, `${JSON.stringify(plays, null, 2)}\n`);

const changed = Object.keys(plays).filter((slug) => plays[slug] !== previous[slug]).length;
console.log(`Read ${projectIds.length} projects for ${tutorials.size} pages; ${changed} counts changed.`);
if (failed.length > 0) {
    console.log(`\nCould not read, kept the previous count:\n  ${failed.join('\n  ')}`);
    process.exit(1);
}
