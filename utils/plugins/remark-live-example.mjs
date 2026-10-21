// utils/plugins/remark-live-example.mjs
import { visit } from 'unist-util-visit';

/**
 * The fence meta flag that marks a code block as a live example. An HTML
 * fence is a Web Components scene, and a JavaScript fence is an Engine app:
 *
 * ```html live-example
 * <pc-app>...</pc-app>
 * ```
 *
 * ```js live-example
 * import * as pc from 'playcanvas';
 * ...
 * ```
 *
 * Flagged fences are replaced with a <LiveExample code="..." language="..."/>
 * element (globally registered in src/theme/MDXComponents.js). Authoring stays
 * plain markdown, so the example source remains visible to GitHub readers, the
 * llms.txt pipeline and translators.
 */
const META_FLAG = 'live-example';

// Fence languages that can run live, mapped to the language LiveExample takes.
const LANGUAGES = {
    html: 'html',
    js: 'js',
    javascript: 'js'
};

export default function remarkLiveExample() {
    return (tree) => {
        visit(tree, 'code', (node, index, parent) => {
            const language = LANGUAGES[node.lang];
            if (!language) return;
            if (!(node.meta ?? '').split(/\s+/).includes(META_FLAG)) return;

            parent.children[index] = {
                type: 'mdxJsxFlowElement',
                name: 'LiveExample',
                attributes: [{
                    type: 'mdxJsxAttribute',
                    name: 'code',
                    value: node.value
                }, {
                    type: 'mdxJsxAttribute',
                    name: 'language',
                    value: language
                }],
                children: []
            };
        });
    };
}
