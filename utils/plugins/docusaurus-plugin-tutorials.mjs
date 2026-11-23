// utils/plugins/docusaurus-plugin-tutorials.mjs
import path from 'node:path';

import { KINDS, TOPICS, loadTutorials } from './tutorials/data.mjs';

const DOCS_PLUGIN = 'docusaurus-plugin-content-docs';

// Sidebar labels of the two kinds. Docusaurus translates them through the `key` of each
// category (see i18n/ja/docusaurus-plugin-content-docs/current.json).
const KIND_LABELS = {
    tutorial: 'Tutorials',
    sample: 'Sample Projects'
};

const keyOf = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/**
 * Pairs the docs Docusaurus loaded from docs/tutorials/ with what their front matter says.
 *
 * @param {{ id: string, sourceDirName: string }[]} docs - Every doc of the version.
 * @param {string} siteDir - The site directory.
 * @returns {{ doc: object, meta: object }[]} The tutorial docs with their kind, topic, English
 * title and play count.
 * @throws {Error} When a doc and a file do not pair up, which would silently drop a page.
 */
function tutorialDocs(docs, siteDir) {
    const meta = loadTutorials(siteDir);
    const tutorials = docs.filter((doc) => doc.sourceDirName === 'tutorials');
    const unknown = tutorials.filter((doc) => !meta.has(doc.id)).map((doc) => doc.id);
    const unused = [...meta.keys()].filter((id) => !tutorials.some((doc) => doc.id === id));
    if (unknown.length > 0 || unused.length > 0) {
        throw new Error(`Tutorial docs and files do not match. Docs with no file: ${unknown.join(', ') || 'none'}. Files with no doc: ${unused.join(', ') || 'none'}. A file name that starts with a number needs an \`id\` in its front matter.`);
    }
    return tutorials.map((doc) => ({ doc, meta: meta.get(doc.id) }));
}

/**
 * Docusaurus plugin that builds the tutorials index page at /tutorials/.
 *
 * The page lists every doc under docs/tutorials/ with its title, description, thumbnail and
 * tags, taken from the docs plugin so a localized build gets the translated text, plus the
 * kind and topic from the English front matter and a play count (see tutorials/data.mjs).
 * The list is passed to the page as a route module, so only that page downloads it.
 *
 * @param {object} context - Docusaurus context.
 * @returns {object} The plugin.
 */
export default function pluginTutorials(context) {
    const { siteDir, baseUrl } = context;

    return {
        name: 'docusaurus-plugin-tutorials',

        getPathsToWatch() {
            return [path.join(siteDir, 'docs/tutorials/*.{md,mdx}'), path.join(siteDir, 'utils/plugins/tutorials/plays.json')];
        },

        async allContentLoaded({ allContent, actions }) {
            const docs = allContent[DOCS_PLUGIN].default.loadedVersions[0].docs;

            const tutorials = tutorialDocs(docs, siteDir).map(({ doc, meta }) => ({
                id: doc.id,
                title: doc.title,
                description: doc.description,
                permalink: doc.permalink,
                thumb: doc.frontMatter.thumb ?? null,
                tags: doc.frontMatter.tags ?? [],
                kind: meta.kind,
                topic: meta.topic,
                plays: meta.plays
            }));

            const dataPath = await actions.createData('tutorials.json', JSON.stringify(tutorials));
            actions.addRoute({
                path: `${baseUrl}tutorials`,
                component: '@site/src/components/TutorialsIndex/index.jsx',
                modules: { tutorials: dataPath },
                exact: true
            });
        }
    };
}

/**
 * Builds the tutorials sidebar: a link to the index page, then the tutorials and the sample
 * projects, each grouped by topic. Use it as the docs plugin's `sidebarItemsGenerator` for the
 * `tutorials` directory.
 *
 * Pages are ordered by their English title in every locale, so the Japanese sidebar matches
 * the English one.
 *
 * @param {object} args - The generator arguments Docusaurus passes.
 * @param {{ id: string, sourceDirName: string }[]} args.docs - Every doc of the version.
 * @param {{ contentPath: string }} args.version - The version, whose `contentPath` is the
 * English docs directory.
 * @returns {object[]} The sidebar items.
 */
export function tutorialsSidebarItems({ docs, version }) {
    const pages = tutorialDocs(docs, path.dirname(version.contentPath))
        .map(({ doc, meta }) => ({ id: doc.id, ...meta }))
        .sort((a, b) => a.title.localeCompare(b.title, 'en', { numeric: true, sensitivity: 'base' }));

    const kinds = KINDS.map((kind) => ({
        type: 'category',
        label: KIND_LABELS[kind],
        key: `tutorials-kind-${kind}`,
        items: TOPICS
            .map((topic) => ({
                type: 'category',
                label: topic,
                key: `tutorials-${kind}-${keyOf(topic)}`,
                items: pages
                    .filter((page) => page.kind === kind && page.topic === topic)
                    .map((page) => ({ type: 'doc', id: page.id }))
            }))
            .filter((category) => category.items.length > 0)
    }));

    return [
        { type: 'link', label: 'Browse All', key: 'tutorials-browse-all', href: '/tutorials/' },
        ...kinds
    ];
}
