import { visit } from 'unist-util-visit';

/** @typedef {import('unist').Node} Node */

/**
 * Shared static asset path prefixes emitted once under build/ (site root).
 *
 * @see https://github.com/playcanvas/developer-site/issues/880
 */
const STATIC_RE = /^\/(?:img|video|downloads|assets)\//;
const PATHNAME_STATIC_RE = /^pathname:\/\/\/(?:img|video|downloads|assets)\//;

/**
 * @param {string} name
 * @param {boolean} value
 */
function jsxBooleanAttribute(name, value) {
    return {
        type: 'mdxJsxAttribute',
        name,
        value: {
            type: 'mdxJsxAttributeValueExpression',
            value: String(value),
            data: {
                estree: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'Literal',
                                value,
                                raw: String(value),
                            },
                        },
                    ],
                    sourceType: 'module',
                    comments: [],
                },
            },
        },
    };
}

/**
 * Prefix shared static asset URLs with pathname:// at MDX compile time so
 * Docusaurus serves them as literal site-root paths instead of webpack-bundling
 * them or requiring a per-locale static/ copy.
 *
 * Runs as a beforeDefaultRemarkPlugin, ahead of transformImage/transformLinks.
 */
export default function remarkPathnameStatic() {
    return (/** @type {Node} */ tree) => {
        visit(tree, ['image', 'link'], (node) => {
            if (node.url && STATIC_RE.test(node.url)) {
                node.url = `pathname://${node.url}`;
            }
        });
    };
}

/**
 * Convert pathname:// static links to JSX anchors that bypass locale baseUrl
 * and trailingSlash (see @docusaurus/Link — pathname:// is not "internal").
 *
 * Runs in remarkPlugins, after transformImage/transformLinks.
 */
export function remarkRootStaticLinks() {
    return (/** @type {Node} */ tree) => {
        visit(tree, 'link', (node) => {
            if (!node.url || !PATHNAME_STATIC_RE.test(node.url)) {
                return;
            }

            /** @type {import('unist').Node[]} */
            const attributes = [
                // Keep pathname:// so Link skips /ja/ prefix and trailingSlash.
                { type: 'mdxJsxAttribute', name: 'href', value: node.url },
                jsxBooleanAttribute('autoAddBaseUrl', false),
                { type: 'mdxJsxAttribute', name: 'target', value: '_blank' },
                { type: 'mdxJsxAttribute', name: 'rel', value: 'noopener noreferrer' },
                jsxBooleanAttribute('data-noBrokenLinkCheck', true),
            ];

            if (node.title) {
                attributes.push({
                    type: 'mdxJsxAttribute',
                    name: 'title',
                    value: node.title,
                });
            }

            Object.assign(node, {
                type: 'mdxJsxTextElement',
                name: 'a',
                attributes,
                children: node.children,
            });
        });
    };
}
