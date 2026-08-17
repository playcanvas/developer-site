// utils/plugins/remark-live-example.mjs
import { visit } from 'unist-util-visit';

/**
 * The fence meta flag that marks an HTML code block as a live example:
 *
 * ```html live-example
 * <pc-app>...</pc-app>
 * ```
 *
 * Flagged fences are replaced with a <LiveExample code="..."/> element
 * (globally registered in src/theme/MDXComponents.js). Authoring stays plain
 * markdown, so the example source remains visible to GitHub readers, the
 * llms.txt pipeline and translators.
 */
const META_FLAG = 'live-example';

export default function remarkLiveExample() {
    return (tree) => {
        visit(tree, 'code', (node, index, parent) => {
            if (node.lang !== 'html') return;
            if (!(node.meta ?? '').split(/\s+/).includes(META_FLAG)) return;

            parent.children[index] = {
                type: 'mdxJsxFlowElement',
                name: 'LiveExample',
                attributes: [{
                    type: 'mdxJsxAttribute',
                    name: 'code',
                    value: node.value
                }],
                children: []
            };
        });
    };
}
