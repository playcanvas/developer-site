// utils/plugins/llms/markdown.mjs
import fs from 'fs';
import path from 'path';

import remarkComment from '@slorber/remark-comment';
import { load as loadYaml } from 'js-yaml';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

/**
 * Converts the Markdown/MDX source of a doc to plain Markdown for LLMs.
 *
 * The source is parsed with the syntax extensions the Docusaurus MDX loader
 * uses, then copied verbatim except for the nodes that only mean something on
 * the website: MDX imports, comments and JSX components are rewritten or
 * dropped, and site-relative URLs are made absolute. Code blocks are copied
 * exactly as written, except `tsx asTypedoc` blocks, which become the property
 * tables the site generates from them.
 */

// The syntax extensions of the Docusaurus MDX loader, in the same order
const processor = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkDirective)
    .use(remarkGfm)
    .use(remarkComment, { ast: true });

const FRONT_MATTER_RE = /^---\n([\s\S]*?)\n---(?:\n|$)/;

// The lines Docusaurus treats as headings when it escapes custom heading ids
// (see escapeMarkdownHeadingIds in @docusaurus/utils)
const HEADING_LINE_RE = /(?:^|\n)#{1,6}(?!#).*/g;

// Stands in for the brace of a custom heading id while parsing
const HEADING_ID_MASK = '';

// A custom heading id at the end of a heading: ## Title {#my-id}
const HEADING_ID_RE = /\s*\\?\{#[^}]*\}\s*$/;

// Marks a removed inline element whose following space should go too
const SWALLOW_SPACE = '\u0000';
const SWALLOW_SPACE_RE = /\u0000 ?/g;

const RAW_LOADER_PREFIX = '!!raw-loader!';

// Extensions webpack tries for an import without one, in the order Docusaurus configures
const MODULE_EXTENSIONS = ['.wasm', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'];

const FENCE_RE = /^ *(`{3,}|~{3,})(.*)$/;

const VIDEO_EMBED_RE = /^https:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com|player\.vimeo\.com)\//;

// Mirrors src/components/EngineExample
const EXAMPLES_URL = 'https://playcanvas.com/examples';
const EXAMPLES_SOURCE_URL = 'https://github.com/playcanvas/engine/blob/main/examples/src/examples';
const GENERIC_EXAMPLE_TITLES = new Set(['live demo', 'this example', 'view live demo', 'view live example', 'watch live demo']);
const EXAMPLE_NAME_ACRONYMS = /\b(Ar|Glb|Gpu|Hdr|Html|Lod|Lut|Taa|Vr|Webgl|Webgpu|Xr)\b/g;

// Nodes whose children are joined without a separator when flattened to text
const PHRASING_TYPES = new Set(['paragraph', 'heading', 'emphasis', 'strong', 'delete', 'link', 'linkReference', 'tableCell', 'mdxJsxTextElement']);

/**
 * @typedef {object} ConvertOptions
 * @property {string} filePath - Absolute path of the doc file
 * @property {string} pageUrl - Absolute URL of the doc's page
 * @property {string} siteUrl - Site origin, e.g. https://developer.playcanvas.com
 * @property {string} siteDir - Site root, for resolving '@site/' imports
 * @property {(filePath: string) => string} fileUrl - Absolute URL of the page built from a doc file
 * @property {(code: string) => Array<{ entries: object[] }>} [typedoc] - Documents the types of a
 *   `tsx asTypedoc` code block, like generateDefinitions in utils/plugins/remark-typedoc.mjs
 */

/**
 * @typedef {object} ConvertedDoc
 * @property {object} frontMatter - Parsed front matter
 * @property {string|null} title - Text of the first H1 heading
 * @property {string|null} firstParagraph - Text of the first top-level paragraph
 * @property {string} markdown - The converted Markdown
 * @property {string[]} problems - Content that could not be converted
 */

/**
 * Parse the source of a doc the way the Docusaurus MDX loader does
 *
 * @param {string} source - Doc source, including front matter
 * @param {string} [filePath] - Doc path, for warnings
 * @returns {{ frontMatter: object, text: string, tree: object }} The front
 * matter, the text that was parsed and its syntax tree
 */
export function parseDoc(source, filePath) {
    const normalized = source.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
    const match = normalized.match(FRONT_MATTER_RE);
    const frontMatter = match ? parseFrontMatter(match[1], filePath) : {};
    const text = match ? normalized.slice(match[0].length) : normalized;

    // Custom heading ids ({#my-id}) are not valid MDX. Docusaurus escapes them with a
    // backslash, on every line that starts like a heading, code included. Masking the
    // brace instead keeps positions aligned with the source, so code is copied as written.
    const tree = processor.parse(text.replace(HEADING_LINE_RE, line => line.replace('{#', `${HEADING_ID_MASK}#`)));
    unmask(tree);
    return { frontMatter, text, tree };
}

/**
 * Restore the braces of heading ids in the values of a syntax tree
 */
function unmask(node) {
    if (typeof node.value === 'string') {
        node.value = node.value.replaceAll(HEADING_ID_MASK, '{');
    }
    node.children?.forEach(unmask);
}

/**
 * Convert the source of a doc to Markdown for LLMs
 *
 * @param {string} source - Doc source, including front matter
 * @param {ConvertOptions} options - Where the doc lives
 * @returns {ConvertedDoc} The converted doc
 */
export function convertDoc(source, options) {
    const { frontMatter, text, tree } = parseDoc(source, options.filePath);
    const ctx = { ...options, text, problems: [], rawImports: collectRawImports(tree, options), linkDepth: 0 };
    const rendered = renderSpan(0, text.length, tree.children, ctx).replace(SWALLOW_SPACE_RE, '');

    return {
        frontMatter,
        title: findTitle(tree),
        firstParagraph: findFirstParagraph(tree),
        markdown: collapseBlankLines(rendered).trim(),
        problems: ctx.problems
    };
}

/**
 * Parse YAML front matter, warning (like the previous implementation) rather
 * than failing on invalid YAML
 */
function parseFrontMatter(frontMatterText, filePath) {
    try {
        return loadYaml(frontMatterText) || {};
    } catch (error) {
        console.warn(`[LLMs Plugin] Warning: Failed to parse front matter${filePath ? ` of ${filePath}` : ''}: ${error.message}`);
        return {};
    }
}

/**
 * Map the names of '!!raw-loader!' imports to the files they load
 */
function collectRawImports(tree, { filePath, siteDir }) {
    const imports = new Map();
    for (const node of tree.children) {
        if (node.type !== 'mdxjsEsm') continue;

        for (const statement of node.data?.estree?.body ?? []) {
            const request = statement.type === 'ImportDeclaration' ? statement.source.value : '';
            const specifier = statement.specifiers?.find(s => s.type === 'ImportDefaultSpecifier');
            if (!request.startsWith(RAW_LOADER_PREFIX) || !specifier) continue;

            const target = request.slice(RAW_LOADER_PREFIX.length);
            imports.set(specifier.local.name, target.startsWith('@site/') ?
                path.join(siteDir, target.slice('@site/'.length)) :
                path.resolve(path.dirname(filePath), target));
        }
    }
    return imports;
}

/**
 * Render a node: its replacement if it only means something on the website,
 * otherwise its source with its children rendered in place
 */
function renderNode(node, ctx) {
    switch (node.type) {
        case 'code':
            return ctx.typedoc && /^tsx?$/.test(node.lang ?? '') && node.meta?.includes('asTypedoc') ?
                renderTypedoc(node, ctx) :
                sourceOf(node, ctx);
        case 'mdxjsEsm':
        case 'comment':
            return '';
        case 'mdxFlowExpression':
        case 'mdxTextExpression':
            // Drop {/* comments */}, keep other expressions as written
            return /^\s*\/\*[\s\S]*\*\/\s*$/.test(node.value) ? '' : sourceOf(node, ctx);
        case 'heading':
            return renderSource(node, ctx).replace(HEADING_ID_RE, '');
        case 'image':
            // Inside a link, a label in brackets would nest inside the link text
            if (ctx.linkDepth > 0) return node.alt ? `Image: ${node.alt}` : 'Image';
            return node.alt ? `[Image: ${node.alt}]` : '';
        case 'link':
        case 'linkReference':
        case 'definition': {
            ctx.linkDepth++;
            const rendered = renderLink(node, ctx);
            ctx.linkDepth--;
            return rendered;
        }
        case 'mdxJsxFlowElement':
        case 'mdxJsxTextElement':
            return renderJsx(node, ctx);
        default:
            return renderSource(node, ctx);
    }
}

/**
 * Source text of a node
 */
function sourceOf(node, ctx) {
    return ctx.text.slice(node.position.start.offset, node.position.end.offset);
}

/**
 * Source text of a node, with its children rendered in place
 */
function renderSource(node, ctx) {
    return renderSpan(node.position.start.offset, node.position.end.offset, node.children ?? [], ctx);
}

/**
 * Source text between two offsets, with the given nodes rendered in place
 */
function renderSpan(start, end, children, ctx) {
    let result = '';
    let offset = start;
    for (const child of children) {
        result += ctx.text.slice(offset, child.position.start.offset) + renderNode(child, ctx);
        offset = child.position.end.offset;
    }
    return result + ctx.text.slice(offset, end);
}

/**
 * The children of a node rendered, with block children moved to the left margin
 */
function renderChildren(node, ctx) {
    const { children } = node;
    if (children.length === 0) return '';

    const rendered = renderSpan(children[0].position.start.offset, children.at(-1).position.end.offset, children, ctx);
    if (node.type !== 'mdxJsxFlowElement') return rendered;

    const margin = Math.min(...children.map(child => child.position.start.column - 1));
    return margin > 0 ? rendered.replace(new RegExp(`\\n {1,${margin}}`, 'g'), '\n') : rendered;
}

/**
 * Render a Markdown link or definition with an absolute URL
 */
function renderLink(node, ctx) {
    const url = resolveUrl(node.url, ctx);
    if (url === node.url) return renderSource(node, ctx);

    const title = node.title ? ` "${node.title.replace(/"/g, '\\"')}"` : '';
    if (node.type === 'definition') {
        return `[${node.label ?? node.identifier}]: ${url}${title}`;
    }
    const text = node.children.length ? renderSpan(node.children[0].position.start.offset, node.children.at(-1).position.end.offset, node.children, ctx) : '';
    return `[${text}](${url}${title})`;
}

/**
 * Render a JSX element, keeping a block replacement at the element's own
 * indentation (e.g. inside a list item)
 */
function renderJsx(node, ctx) {
    const rendered = renderElement(node, ctx);
    if (rendered === undefined) return renderSource(node, ctx);

    return node.type === 'mdxJsxFlowElement' ? indentAs(node, rendered) : rendered;
}

/**
 * Indent the lines after the first of a block's replacement like the block itself
 */
function indentAs(node, text) {
    const indent = node.position.start.column - 1;
    return indent > 0 ? text.replace(/\n(?=[^\n])/g, `\n${' '.repeat(indent)}`) : text;
}

/**
 * Render a `tsx asTypedoc` code block as the property tables the site
 * generates from it (see utils/plugins/remark-typedoc.mjs and RenderApiDocs)
 */
function renderTypedoc(node, ctx) {
    let definitions;
    try {
        definitions = ctx.typedoc(node.value);
    } catch (error) {
        // The site shows the code block when the types cannot be resolved, so do the same
        console.warn(`[LLMs Plugin] Warning: Failed to document an asTypedoc block in ${ctx.filePath}: ${error.message}`);
        return sourceOf(node, ctx);
    }

    const tables = definitions.filter(definition => definition.entries?.length).map(({ entries }) => [
        '| Name | Type | Default | Description |',
        '| --- | --- | --- | --- |',
        ...entries.map(entry => `| ${tableCode(`${entry.name}${entry.optional ? '?' : ''}`)} | ${tableCode(entry.type?.displayName ?? 'unknown')} | ${entry.defaultValue ? tableCode(entry.defaultValue) : '-'} | ${tableText(entry.description)} |`)
    ].join('\n'));
    return tables.length ? indentAs(node, tables.join('\n\n')) : sourceOf(node, ctx);
}

function tableText(text) {
    return String(text ?? '').replace(/\s*\n\s*/g, ' ').replace(/\|/g, '\\|').trim();
}

function tableCode(text) {
    return `\`${tableText(text)}\``;
}

/**
 * Replacement for a JSX element, or undefined to keep it as written
 */
function renderElement(node, ctx) {
    switch (node.name) {
        case 'Tabs':
            return node.children.filter(child => isElement(child, 'TabItem')).map(tab => renderTab(tab, ctx)).join('\n\n');
        case 'TabItem':
            return renderTab(node, ctx);
        case 'CodeExample':
            return renderCodeExample(node, ctx);
        case 'EngineExample':
            return renderEngineExample(node);
        case 'CodePenEmbed': {
            const id = stringAttribute(node, 'id');
            return id ? `[CodePen: ${stringAttribute(node, 'title') ?? 'example'}](https://codepen.io/playcanvas/pen/${id})` : '';
        }
        case 'Link':
            return renderLinkElement(node, stringAttribute(node, 'to') ?? stringAttribute(node, 'href'), ctx);
        case 'a':
            return renderLinkElement(node, stringAttribute(node, 'href'), ctx);
        case 'img': {
            const alt = stringAttribute(node, 'alt');
            return alt ? `[Image: ${alt}]` : '';
        }
        case 'video': {
            const src = stringAttribute(node, 'src');
            return src ? `[Video](${resolveUrl(src, ctx)})` : '';
        }
        case 'iframe':
            return renderIframe(node, ctx);
        case 'div': {
            if (!hasClass(node, 'iframe-container')) return renderChildren(node, ctx);
            const iframe = findElement(node, 'iframe');
            return iframe ? renderIframe(iframe, ctx) : '';
        }
        case 'span':
            // Icon font glyphs, as in: <span class="pc-icon">&#57632;</span> Add
            return hasClass(node, 'pc-icon') ? SWALLOW_SPACE : renderChildren(node, ctx);
        case 'details':
            return renderDetails(node, ctx);
        default:
            // Other HTML (<br/>, <kbd>, lists in table cells...) reads fine as it is
            if (node.name && /^[a-z]/.test(node.name)) return undefined;

            // Other components are live demos and widgets: keep any Markdown they wrap
            return renderChildren(node, ctx);
    }
}

/**
 * Render a tab as a labelled section
 */
function renderTab(tab, ctx) {
    const label = stringAttribute(tab, 'label') ?? stringAttribute(tab, 'value');
    const content = renderChildren(tab, ctx).trim();
    return label ? `**${label}**\n\n${content}` : content;
}

/**
 * Render a React code example as a code block of its full source (the site
 * hides the imports, but they are what an LLM most needs)
 */
function renderCodeExample(node, ctx) {
    const label = stringAttribute(node, 'label');
    const source = codeExampleSource(node, ctx);
    if (!source) {
        ctx.problems.push(`the code of <CodeExample${label ? ` label="${label}"` : ''}> could not be resolved`);
        return '';
    }

    const block = codeBlock(source.code, stringAttribute(node, 'language') ?? 'jsx', stringAttribute(node, 'filename') ?? source.fileName);
    return label ? `**${label}**\n\n${block}` : block;
}

/**
 * The code of a <CodeExample>: a string, or a '!!raw-loader!' import of a file
 */
function codeExampleSource(node, ctx) {
    const attribute = node.attributes.find(a => a.type === 'mdxJsxAttribute' && a.name === 'code');
    if (typeof attribute?.value === 'string') {
        return { code: attribute.value };
    }

    const request = ctx.rawImports.get(attribute?.value?.value?.trim());
    // Like webpack, allow the import to leave out the file extension
    const filePath = request && ['', ...MODULE_EXTENSIONS].map(extension => request + extension).find(file => fs.statSync(file, { throwIfNoEntry: false })?.isFile());
    if (!filePath) return null;

    return { code: fs.readFileSync(filePath, 'utf-8').replace(/\r\n?/g, '\n'), fileName: path.basename(filePath) };
}

/**
 * Link an engine example to the Examples Browser and to its source
 */
function renderEngineExample(node) {
    const title = stringAttribute(node, 'title') ?? 'PlayCanvas engine example';
    const examplePath = stringAttribute(node, 'id')?.replace(/^#?\//, '').replace(/^#/, '');
    if (!examplePath) {
        return `[${title}](${EXAMPLES_URL})`;
    }

    const name = GENERIC_EXAMPLE_TITLES.has(title.toLowerCase()) ? exampleName(examplePath) : title;
    return `[Live example: ${name}](${EXAMPLES_URL}/#/${examplePath}) ([source](${EXAMPLES_SOURCE_URL}/${examplePath}.example.mjs))`;
}

/**
 * Display name of an example derived from its id: 'xr/ar-hit-test' is 'AR Hit Test'
 */
function exampleName(examplePath) {
    return examplePath.split('/').pop()
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
        .replace(EXAMPLE_NAME_ACRONYMS, v => v.toUpperCase());
}

/**
 * Link an embedded page: a video, or otherwise an interactive demo
 */
function renderIframe(node, ctx) {
    const src = stringAttribute(node, 'src');
    if (!src) return '';

    const kind = VIDEO_EMBED_RE.test(src) ? 'Video' : 'Interactive demo';
    const title = stringAttribute(node, 'title');
    return `[${kind}${title ? `: ${title}` : ''}](${resolveUrl(src, ctx)})`;
}

/**
 * Render a link element as a Markdown link. A card (a link wrapping blocks
 * such as a title and a description) links its first block and appends the
 * rest as a description.
 */
function renderLinkElement(node, href, ctx) {
    // Elements written on their own lines inside a block element are wrapped in a paragraph
    const blocks = node.children.length === 1 && node.children[0].type === 'paragraph' ? node.children[0].children : node.children;
    const children = blocks.filter(child => child.type !== 'text' || child.value.trim());
    const isCard = children.length > 1 && children.every(child => /^(mdxJsxFlowElement|mdxJsxTextElement|paragraph|heading)$/.test(child.type));
    const [text = '', ...rest] = (isCard ? children.map(plainText) : [plainText(node)]).filter(Boolean);
    if (!href) return [text, ...rest].join(' ');

    const link = `[${text}](${resolveUrl(href, ctx)})`;
    return rest.length ? `${link}: ${rest.join(' ')}` : link;
}

/**
 * Render a <details> element as its summary in bold, followed by its content
 */
function renderDetails(node, ctx) {
    const summaryBlock = node.children.find(child => findElement(child, 'summary'));
    const summary = summaryBlock ? plainText(findElement(summaryBlock, 'summary')) : '';
    const content = renderChildren({ ...node, children: node.children.filter(child => child !== summaryBlock) }, ctx).trim();
    return [summary && `**${summary}**`, content].filter(Boolean).join('\n\n');
}

/**
 * Make a URL absolute, resolving it the way the website does
 */
function resolveUrl(url, ctx) {
    if (!url) return url;

    // pathname:// marks a site root URL that must not be localized
    const target = url.startsWith('pathname://') ? url.slice('pathname://'.length) : url;
    if (/^[a-z][a-z\d+.-]*:/i.test(target) || target.startsWith('//')) return target;
    if (target.startsWith('#')) return `${ctx.pageUrl}${target}`;
    if (target.startsWith('/')) return `${ctx.siteUrl}${target}`;

    try {
        // Links to Markdown files resolve against the file, other links against the page
        const [, filePart, suffix] = target.match(/^([^?#]*)(.*)$/s);
        if (/\.mdx?$/i.test(filePart)) {
            return ctx.fileUrl(path.resolve(path.dirname(ctx.filePath), decodeURIComponent(filePart))) + suffix;
        }
        return new URL(target, ctx.pageUrl).href;
    } catch {
        return url;
    }
}

/**
 * Wrap code in a fenced code block that its own backticks cannot close
 */
function codeBlock(code, language, title) {
    const longestRun = Math.max(0, ...Array.from(code.matchAll(/`+/g), match => match[0].length));
    const fence = '`'.repeat(Math.max(3, longestRun + 1));
    return `${fence}${language}${title ? ` title="${title}"` : ''}\n${code.replace(/\n+$/, '')}\n${fence}`;
}

/**
 * Collapse runs of blank lines, except inside fenced code blocks
 */
function collapseBlankLines(markdown) {
    const lines = [];
    let fence = null;
    let previousBlank = false;
    for (const line of markdown.split('\n')) {
        const blank = fence === null && line.trim() === '';
        if (!blank || !previousBlank) {
            lines.push(blank ? '' : line);
        }
        previousBlank = blank;

        const match = FENCE_RE.exec(line);
        if (fence === null) {
            fence = match ? match[1] : null;
        } else if (match && match[1][0] === fence[0] && match[1].length >= fence.length && !match[2].trim()) {
            fence = null;
        }
    }
    return lines.join('\n');
}

/**
 * Text of the first H1 heading, without a custom heading id
 */
function findTitle(tree) {
    const heading = findNode(tree, node => node.type === 'heading' && node.depth === 1);
    return heading ? plainText(heading).replace(HEADING_ID_RE, '') || null : null;
}

/**
 * Text of the first top-level paragraph with prose, skipping images and
 * admonitions
 */
function findFirstParagraph(tree) {
    // Admonitions titled as ':::tip Title' are not directives but paragraphs: skip
    // from the opening marker to the closing ':::'
    let inAdmonition = false;
    for (const node of tree.children) {
        if (node.type !== 'paragraph') continue;

        const text = plainText(node);
        if (text.startsWith(':::')) {
            inAdmonition = text !== ':::' && !text.endsWith(':::');
            continue;
        }
        const hasProse = node.children.some(child => !['image', 'imageReference', 'break'].includes(child.type) &&
            !isElement(child, 'img') && (child.type !== 'text' || child.value.trim()));
        if (!inAdmonition && hasProse && text) return text;
    }
    return null;
}

/**
 * Text content of a node, with whitespace collapsed
 */
function plainText(node) {
    return textOf(node).replace(/\s+/g, ' ').trim();
}

function textOf(node) {
    switch (node.type) {
        case 'text':
            return node.value;
        case 'inlineCode':
            return `\`${node.value}\``;
        case 'break':
            return ' ';
        case 'image':
            return node.alt ?? '';
        case 'code':
        case 'comment':
        case 'mdxjsEsm':
        case 'mdxFlowExpression':
        case 'mdxTextExpression':
            return '';
        case 'mdxJsxFlowElement':
        case 'mdxJsxTextElement':
            if (node.name === 'img') return stringAttribute(node, 'alt') ?? '';
            if (node.name === 'br' || (node.name === 'span' && hasClass(node, 'pc-icon'))) return ' ';
            break;
    }
    // Keep the text of separate blocks apart
    return (node.children ?? []).map(textOf).join(PHRASING_TYPES.has(node.type) ? '' : ' ');
}

/**
 * First node, in document order, that matches a predicate
 */
function findNode(node, predicate) {
    if (predicate(node)) return node;
    for (const child of node.children ?? []) {
        const found = findNode(child, predicate);
        if (found) return found;
    }
    return null;
}

function findElement(node, name) {
    return findNode(node, candidate => isElement(candidate, name));
}

function isElement(node, name) {
    return (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && node.name === name;
}

/**
 * Value of a JSX attribute written as a string (not as an expression)
 */
function stringAttribute(node, name) {
    const attribute = node.attributes?.find(a => a.type === 'mdxJsxAttribute' && a.name === name);
    return typeof attribute?.value === 'string' ? attribute.value : undefined;
}

function hasClass(node, className) {
    return (stringAttribute(node, 'className') ?? stringAttribute(node, 'class') ?? '').split(/\s+/).includes(className);
}
