import { visit } from 'unist-util-visit';

/**
 * Shared static asset URL prefixes that are emitted only by the default-locale
 * build (see https://github.com/playcanvas/developer-site/issues/880).
 */
const ROOT_STATIC_RE = /^\/(?:img|video|downloads|assets)\//;

/**
 * Rewrites shared static asset URLs to the pathname:// protocol so localized
 * pages reference the single copy at the site root instead of needing a
 * per-locale copy of static/.
 *
 * Runs as a beforeDefaultRemarkPlugin, ahead of Docusaurus's
 * transformImage/transformLinks, which both treat pathname:// as an escape
 * hatch: transformImage strips the prefix and leaves a literal root path,
 * while transformLinks leaves the URL for <Link> to handle at runtime (the
 * anchor override in src/theme/MDXComponents.js keeps the locale baseUrl off
 * those links).
 */
export default function remarkRootStaticUrls() {
    return (tree) => {
        visit(tree, ['image', 'link'], (node) => {
            if (ROOT_STATIC_RE.test(node.url ?? '')) {
                node.url = `pathname://${node.url}`;
            }
        });
    };
}
