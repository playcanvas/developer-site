import { visit } from 'unist-util-visit';

/**
 * Works around a Docusaurus 3 bug that escapes the alt text and title of
 * Markdown images twice (https://github.com/meta/docusaurus/issues/12507).
 *
 * transformImage turns `![The Editor's graph](/img/graph.png)` into an `<img>`
 * JSX node, and runs escapeHtml() on the alt and title as it does. That was
 * needed when the plugin built a JSX string (MDX 1). It now builds a JSX AST
 * node, whose attribute values are escaped again when React renders them, so
 * the page gets alt="The Editor&amp;#39;s graph" and screen readers read the
 * entity out. transformLinks does the same to the title of links to local
 * assets such as downloads.
 *
 * rememberAssetAttributes runs before the default plugins and records the
 * alt and title of each image and link. restoreAssetAttributes runs after them
 * and writes the recorded values back onto the JSX nodes those plugins made.
 * transformImage and transformLinks mutate the original node in place, so the
 * node object is the key from one plugin to the other. User-written JSX, such
 * as <img alt="...">, is not touched (it was never escaped).
 *
 * Fixed upstream in Docusaurus 4 (https://github.com/meta/docusaurus/pull/12508).
 * Remove both plugins on that upgrade: they are no-ops by then.
 */

/** @type {WeakMap<object, { alt?: string | null, title?: string | null }>} */
const originals = new WeakMap();

export function rememberAssetAttributes() {
    return (tree) => {
        visit(tree, ['image', 'link'], (node) => {
            if (node.alt || node.title) {
                originals.set(node, { alt: node.alt, title: node.title });
            }
        });
    };
}

export function restoreAssetAttributes() {
    return (tree) => {
        visit(tree, ['mdxJsxTextElement', 'mdxJsxFlowElement'], (node) => {
            const original = originals.get(node);
            if (!original) {
                return;
            }
            for (const attribute of node.attributes) {
                if (attribute.type !== 'mdxJsxAttribute') {
                    continue;
                }
                if ((attribute.name === 'alt' || attribute.name === 'title') && original[attribute.name]) {
                    attribute.value = original[attribute.name];
                }
            }
        });
    };
}
