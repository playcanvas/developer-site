// utils/plugins/llms/docs.mjs
import path from 'path';

import { DefaultNumberPrefixParser, stripPathNumberPrefixes } from '@docusaurus/plugin-content-docs/lib/numberPrefix.js';
import { loadFreshModule } from '@docusaurus/utils';

/**
 * Doc ids, URLs and reading order, computed the way the Docusaurus docs plugin
 * computes them for this site (docs served from the site root, trailing slashes).
 */

/**
 * Docusaurus id of a doc file: its path from the docs directory without
 * extension or number prefixes ('user-manual/2D/9-slicing.md' is 'user-manual/2D/slicing')
 *
 * @param {string} docsDir - The docs directory
 * @param {string} filePath - Path of the doc file
 * @returns {string} The doc id
 */
export function docIdFromFile(docsDir, filePath) {
    const relativePath = path.relative(docsDir, filePath).split(path.sep).join('/').replace(/\.mdx?$/, '');
    return stripPathNumberPrefixes(relativePath, DefaultNumberPrefixParser);
}

/**
 * URL path of a doc: index docs are served at their directory's URL
 *
 * @param {string} docId - The doc id
 * @returns {string} The URL path, with a trailing slash
 */
export function docPathFromId(docId) {
    const slug = docId.replace(/(^|\/)(index|readme)$/i, '');
    return slug ? `/${slug}/` : '/';
}

/**
 * Number every doc id in the sidebars in reading order
 *
 * @param {string} sidebarPath - Path of the sidebars file
 * @returns {Promise<Map<string, number>>} The position of each doc id
 */
export async function loadSidebarOrder(sidebarPath) {
    const sidebars = await loadFreshModule(sidebarPath);
    const order = new Map();
    const add = (docId) => {
        if (!order.has(docId)) order.set(docId, order.size);
    };
    const visit = (items) => {
        for (const item of items) {
            if (typeof item === 'string') {
                add(item);
            } else if (item.type === 'doc' || item.type === 'ref') {
                add(item.id);
            } else if (item.type === 'category') {
                if (item.link?.type === 'doc') add(item.link.id);
                visit(item.items ?? []);
            } else if (!item.type) {
                // Shorthand category: { 'Label': [items] }
                Object.values(item).filter(Array.isArray).forEach(visit);
            }
        }
    };

    for (const sidebar of Object.values(sidebars)) {
        visit(Array.isArray(sidebar) ? sidebar : [sidebar]);
    }
    return order;
}

/**
 * Sort key of a doc: its sidebar position or, for a doc missing from the
 * sidebars, a position just after the last sidebar doc in its nearest directory
 *
 * @param {string} docId - The doc id
 * @param {Map<string, number>} order - Sidebar positions from loadSidebarOrder
 * @returns {number} The sort key
 */
export function sidebarSortKey(docId, order) {
    if (order.has(docId)) return order.get(docId);

    for (let dir = path.posix.dirname(docId); dir !== '.'; dir = path.posix.dirname(dir)) {
        let last = -1;
        for (const [id, position] of order) {
            if (id.startsWith(`${dir}/`)) last = Math.max(last, position);
        }
        if (last >= 0) return last + 0.5;
    }
    return Infinity;
}
