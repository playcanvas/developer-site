// What each page under docs/tutorials/ says about itself in its front matter, shared by the
// tutorials index page and the tutorials sidebar.
//
//   kind: tutorial | sample
//       A tutorial explains how something is built, step by step. A sample is a project to
//       open and read, with little or no write-up.
//   topic: one of TOPICS
//       The group the page appears under in the sidebar.
//
// Both are read from the English page only. The Japanese site uses the same values, so a
// translation cannot move a page to a different group.

import fs from 'node:fs';
import path from 'node:path';

import { readFrontMatter } from '../llms/markdown.mjs';
import { THUMBS_PATH } from './thumbs.mjs';

export { THUMBS_PATH, thumbnailPath } from './thumbs.mjs';

export const KINDS = ['tutorial', 'sample'];

// In sidebar order.
export const TOPICS = [
    'Basics',
    'Games',
    'Input',
    'Cameras',
    'Physics',
    'Graphics',
    'Shaders and Post Effects',
    'Animation',
    'Audio',
    'User Interface',
    'Assets and Scenes',
    'Gaussian Splatting',
    'XR',
    'Multiplayer'
];

const TUTORIALS_DIR = 'docs/tutorials';
const PLAYS_PATH = 'utils/plugins/tutorials/plays.json';

/**
 * Finds the PlayCanvas project a tutorial page is about: the first project the page links to,
 * or failing that the project its thumbnail came from.
 *
 * @param {string} source - The page source.
 * @param {{ project: string } | undefined} thumb - The page's entry in thumbs.json, if any.
 * @returns {string | null} The project ID.
 */
export function projectIdOf(source, thumb) {
    return source.match(/playcanvas\.com\/project\/(\d+)/)?.[1] ?? thumb?.project ?? null;
}

/**
 * Reads the kind, topic and play count of every tutorial page.
 *
 * @param {string} siteDir - The site directory.
 * @returns {Map<string, { kind: string, topic: string, title: string, plays: number, projectId: string | null }>}
 * The pages by doc ID (`tutorials/<file name without extension>`, unless the page sets an `id`).
 * @throws {Error} When a page's kind or topic is missing or not one of the known values.
 */
export function loadTutorials(siteDir) {
    const dir = path.join(siteDir, TUTORIALS_DIR);
    const plays = JSON.parse(fs.readFileSync(path.join(siteDir, PLAYS_PATH), 'utf8'));
    const thumbs = JSON.parse(fs.readFileSync(path.join(siteDir, THUMBS_PATH), 'utf8'));
    const tutorials = new Map();
    const problems = [];

    for (const file of fs.readdirSync(dir).sort()) {
        if (!/\.mdx?$/.test(file)) {
            continue;
        }
        const slug = file.replace(/\.mdx?$/, '');
        const source = fs.readFileSync(path.join(dir, file), 'utf8');
        const frontMatter = readFrontMatter(source, file);
        const { kind, topic } = frontMatter;
        if (!KINDS.includes(kind)) {
            problems.push(`${TUTORIALS_DIR}/${file}: kind is ${JSON.stringify(kind)}; set it to ${KINDS.join(' or ')}`);
        }
        if (!TOPICS.includes(topic)) {
            problems.push(`${TUTORIALS_DIR}/${file}: topic is ${JSON.stringify(topic)}; set it to one of ${TOPICS.join(', ')}`);
        }
        tutorials.set(`tutorials/${frontMatter.id ?? slug}`, {
            kind,
            topic,
            title: String(frontMatter.title ?? slug),
            plays: plays[slug] ?? 0,
            projectId: projectIdOf(source, thumbs[slug])
        });
    }

    if (problems.length > 0) {
        throw new Error(`Tutorial front matter needs fixing:\n  ${problems.join('\n  ')}`);
    }
    return tutorials;
}
