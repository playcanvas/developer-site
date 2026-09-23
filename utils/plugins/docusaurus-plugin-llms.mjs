// utils/plugins/docusaurus-plugin-llms.mjs
import fs from 'fs';
import path from 'path';

import { docIdFromFile, docPathFromId, loadSidebarOrder, markdownPathFromDocPath, sidebarSortKey } from './llms/docs.mjs';
import { indexPages, loadIndexes, renderIndex, renderText, sectionOf } from './llms/indexes.mjs';
import { convertDoc, readFrontMatter } from './llms/markdown.mjs';

/**
 * Docusaurus plugin to generate LLM-friendly documentation files:
 * - A Markdown version of every doc, published next to its page
 *   (/user-manual/engine.md for /user-manual/engine/) and linked from the
 *   page's head
 * - The hand-written llms.txt indexes of the llms/ directory, checked and
 *   published, each with a file of all its pages (see llms/indexes.mjs)
 * - llms-full.txt: every doc in a single file
 *
 * Only the default locale build generates them: the docs are read from the
 * docs directory, so a localized build would publish a copy of the same files.
 *
 * @param {Object} context - Docusaurus context
 * @param {Object} options - Plugin options
 * @param {string} [options.docsDir='docs'] - Path to docs directory relative to site root
 * @param {string} [options.indexDir='llms'] - Path to the directory of llms.txt indexes relative
 *   to site root
 * @param {string} [options.sidebarPath='sidebars.js'] - Path to the sidebars file relative to
 *   site root, which sets the order of the docs
 * @param {string[]} [options.excludeDirs=['shader-editor', 'tutorials']] - Directories to exclude
 *   from LLM file generation (e.g., private or unlisted documentation sections)
 * @param {boolean} [options.failOnError=false] - If true, build will fail when LLM file
 *   generation encounters an error, when a doc cannot be converted faithfully or does not
 *   match a built page, or when an index links a page that is not published or is over its
 *   budget. If false (default), errors are logged as warnings and the build continues.
 */
export default function pluginLlms(context, options = {}) {
    const { siteDir, siteConfig, i18n } = context;
    const docsDir = path.join(siteDir, options.docsDir || 'docs');
    const indexDir = path.join(siteDir, options.indexDir || 'llms');
    const sidebarPath = path.join(siteDir, options.sidebarPath || 'sidebars.js');
    const baseUrl = siteConfig.url;
    const excludeDirs = options.excludeDirs ?? ['shader-editor', 'tutorials'];
    const failOnError = options.failOnError ?? false;

    return {
        name: 'docusaurus-plugin-llms',

        async postBuild({ outDir, routesPaths }) {
            if (i18n && i18n.currentLocale !== i18n.defaultLocale) {
                console.log(`[LLMs Plugin] Skipping LLM files for the '${i18n.currentLocale}' locale`);
                return;
            }

            console.log('[LLMs Plugin] Generating LLM-friendly documentation files...');

            // Docs that could not be converted faithfully, and index problems
            const problems = [];

            try {
                // Ensure the docs directory exists before processing
                if (!fs.existsSync(docsDir)) {
                    console.warn(`[LLMs Plugin] Docs directory not found at ${docsDir}. Skipping LLM file generation.`);
                    return;
                }
                // Collect all markdown files (excluding private/unlisted directories)
                const docFiles = collectMarkdownFiles(docsDir, excludeDirs);
                console.log(`[LLMs Plugin] Found ${docFiles.length} documentation files`);

                // Drafts are not published, and unlisted docs are hidden from the site's navigation and search
                const sources = docFiles
                    .map(filePath => ({ filePath, source: fs.readFileSync(filePath, 'utf-8') }))
                    .filter(({ filePath, source }) => {
                        const frontMatter = readFrontMatter(source, filePath);
                        return frontMatter.draft !== true && frontMatter.unlisted !== true;
                    });

                // Links to published docs point to their Markdown versions
                const publishedPaths = new Set(sources.map(({ filePath }) => docPathFromId(docIdFromFile(docsDir, filePath))));
                const linkUrl = markdownLinkMapper(baseUrl, publishedPaths);

                // Document `tsx asTypedoc` code blocks as the site does (loaded here as it starts TypeScript)
                const { generateDefinitions } = await import('./remark-typedoc.mjs');
                const typedoc = code => generateDefinitions({ code, typeResolver: typedocTypeResolver });

                // Process files and extract content
                const docs = sources
                    .map(source => processMarkdownFile(source, { docsDir, siteDir, baseUrl, typedoc, linkUrl }, problems))
                    .filter(Boolean);

                // Every doc URL must be a built page (routes are only known in a real build)
                if (routesPaths) {
                    const routes = new Set(routesPaths);
                    for (const doc of docs) {
                        if (!routes.has(doc.urlPath)) {
                            problems.push(`${doc.relativePath}: no page is built at ${doc.urlPath}`);
                        }
                    }
                }

                // Sort in the sidebar's reading order, except that the subcategories the root
                // index lists under '## Optional' come last (consumers that truncate lose the end first)
                const sidebarOrder = await loadSidebarOrder(sidebarPath);
                docs.sort((a, b) => (isOptionalDoc(a) - isOptionalDoc(b)) ||
                    (sidebarSortKey(a.id, sidebarOrder) - sidebarSortKey(b.id, sidebarOrder)) ||
                    a.urlPath.localeCompare(b.urlPath));

                // A Markdown version of every doc, linked from its page
                for (const doc of docs) {
                    const heading = doc.content.startsWith('# ') ? '' : `# ${doc.title}\n\n`;
                    writeFile(outDir, markdownPathFromDocPath(doc.urlPath), `${heading}${doc.content}\n`);
                }
                linkMarkdownVersions(outDir, docs);
                console.log(`[LLMs Plugin] Generated ${docs.length} Markdown pages`);

                // Generate llms-full.txt (complete content)
                const llmsFullTxt = formatBundle({
                    title: 'PlayCanvas Developer Documentation - Full Content',
                    summary: 'The complete text of the PlayCanvas User Manual in one file, for indexing, or for downloading and searching.',
                    indexUrl: `${baseUrl}/llms.txt`,
                    docs,
                    baseUrl
                });
                writeFile(outDir, '/llms-full.txt', llmsFullTxt);
                console.log(`[LLMs Plugin] Generated llms-full.txt (${(llmsFullTxt.length / 1024).toFixed(1)} KB)`);

                publishIndexes({ siteDir, indexDir, outDir, docs, baseUrl, engineVersion: resolveEngineVersion(siteDir) }, problems);

            } catch (error) {
                if (failOnError) {
                    // Re-throw to fail the build
                    throw new Error(`[LLMs Plugin] Failed to generate LLM files: ${error.message}`, { cause: error });
                }
                // Log warning but allow build to continue
                // This is intentional: LLM files are supplementary and their generation
                // failure should not prevent the main documentation from being deployed.
                console.warn('[LLMs Plugin] Warning: Failed to generate LLM files (build continuing):', error.message);
                console.warn('[LLMs Plugin] Set { failOnError: true } in plugin options to make this fatal.');
            }

            if (problems.length > 0) {
                const message = `[LLMs Plugin] ${problems.length} problem(s):\n  ${problems.join('\n  ')}`;
                if (failOnError) {
                    throw new Error(message);
                }
                console.warn(message);
            }
        }
    };
}

/**
 * Recursively collect all markdown files from a directory
 * @param {string} dir - Directory to scan
 * @param {string[]} excludeDirs - Directory names to exclude
 * @param {string[]} files - Accumulated file list
 */
function collectMarkdownFiles(dir, excludeDirs = [], files = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        // Docusaurus does not build files or directories starting with an underscore (partials)
        if (entry.name.startsWith('_')) {
            continue;
        }

        if (entry.isDirectory()) {
            // Skip excluded directories
            if (excludeDirs.includes(entry.name)) {
                continue;
            }
            collectMarkdownFiles(fullPath, excludeDirs, files);
        } else if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) {
            files.push(fullPath);
        }
    }

    return files;
}

/**
 * Process a markdown file and extract metadata and content. Returns null for a
 * doc that cannot be parsed, and adds anything that could not be converted
 * faithfully to problems.
 */
function processMarkdownFile({ filePath, source }, { docsDir, siteDir, baseUrl, typedoc, linkUrl }, problems) {
    const relativePath = path.relative(docsDir, filePath).split(path.sep).join('/');
    const id = docIdFromFile(docsDir, filePath);
    const urlPath = docPathFromId(id);

    let doc;
    try {
        doc = convertDoc(source, {
            filePath,
            pageUrl: `${baseUrl}${urlPath}`,
            siteUrl: baseUrl,
            siteDir,
            fileUrl: file => `${baseUrl}${docPathFromId(docIdFromFile(docsDir, file))}`,
            linkUrl,
            typedoc
        });
    } catch (error) {
        problems.push(`${relativePath}: ${error.message}`);
        return null;
    }
    problems.push(...doc.problems.map(problem => `${relativePath}: ${problem}`));

    const { frontMatter } = doc;
    return {
        filePath,
        relativePath,
        id,
        urlPath,
        title: frontMatter.title || doc.title || path.basename(filePath, path.extname(filePath)),
        description: frontMatter.description || truncate(doc.firstParagraph ?? '', 200),
        tags: frontMatter.tags || [],
        category: getCategoryFromPath(urlPath),
        content: doc.markdown
    };
}

/**
 * Map an absolute URL of a published doc's page to its Markdown version
 */
function markdownLinkMapper(baseUrl, publishedPaths) {
    return (url) => {
        if (!url.startsWith(`${baseUrl}/`)) return url;

        const target = new URL(url);
        const docPath = [target.pathname, `${target.pathname}/`].find(candidate => publishedPaths.has(candidate));
        return docPath ? `${baseUrl}${markdownPathFromDocPath(docPath)}${target.search}${target.hash}` : url;
    };
}

/**
 * Point every doc's page to its Markdown version with a link in its head. A
 * preview without a site build has no pages to change.
 */
function linkMarkdownVersions(outDir, docs) {
    for (const doc of docs) {
        const file = path.join(outDir, ...doc.urlPath.split('/'), 'index.html');
        if (!fs.existsSync(file)) continue;

        const html = fs.readFileSync(file, 'utf-8');
        const tag = `<link rel="alternate" type="text/markdown" href="${markdownPathFromDocPath(doc.urlPath)}">`;
        if (!html.includes(tag)) {
            fs.writeFileSync(file, html.replace('</head>', `${tag}</head>`), 'utf-8');
        }
    }
}

/**
 * Publish the llms.txt indexes, each with the file of all its pages
 */
function publishIndexes({ siteDir, indexDir, outDir, docs, baseUrl, engineVersion }, problems) {
    if (!fs.existsSync(path.join(indexDir, 'llms.txt'))) {
        problems.push(`there is no root index at ${path.relative(siteDir, path.join(indexDir, 'llms.txt'))}`);
        return;
    }
    const indexes = loadIndexes(siteDir, indexDir);
    const llmsFiles = new Set(['/llms-full.txt', ...indexes.flatMap(index => [index.publishedPath, index.bundlePath].filter(Boolean))]);

    // Every section of the User Manual belongs to one index, which lists its pages
    const sections = new Set(docs.map(doc => sectionOf(doc.urlPath)).filter(Boolean));
    for (const section of sections) {
        const covering = indexes.filter(index => index.covers.includes(section));
        if (covering.length !== 1) {
            problems.push(`the ${section} section is covered by ${covering.length} indexes${covering.length ? ` (${covering.map(index => index.source).join(', ')})` : ''}, not one`);
        }
    }
    for (const index of indexes) {
        for (const section of index.covers.filter(covered => !sections.has(covered))) {
            problems.push(`${index.source}: covers ${section}, which has no published docs`);
        }
    }

    const vars = { ENGINE_VERSION: engineVersion };
    const reachable = new Set();
    for (const index of indexes) {
        const { linked, others } = indexPages(index, docs);
        [...linked, ...others].forEach(doc => reachable.add(doc));
        let bundle = null;
        if (index.bundlePath) {
            // Problems in the summary are reported for the index itself
            const summary = renderText(index.summary, { source: index.source, siteUrl: baseUrl, docs, llmsFiles, vars }, []);
            const pages = [...linked, ...others];
            const text = formatBundle({ title: `${index.title}: All Pages`, summary, indexUrl: `${baseUrl}${index.publishedPath}`, docs: pages, baseUrl });
            writeFile(outDir, index.bundlePath, text);
            bundle = { pages: pages.length, bytes: Buffer.byteLength(text) };
        }
        const text = renderIndex(index, { siteUrl: baseUrl, docs, llmsFiles, others, bundle, vars }, problems);
        writeFile(outDir, index.publishedPath, text);
    }

    // Every page can be found from an index
    for (const doc of docs.filter(published => !reachable.has(published))) {
        problems.push(`${doc.relativePath}: no index links it or covers its section`);
    }
    console.log(`[LLMs Plugin] Published ${indexes.length} llms.txt indexes`);
}

/**
 * Format docs as a single file: a header, then every doc with its title, the
 * URL of its page and the URL of its Markdown version
 */
function formatBundle({ title, summary, indexUrl, docs, baseUrl }) {
    const lines = [];

    lines.push(`# ${title}

> ${summary}

Index: ${indexUrl}
Total Documents: ${docs.length}
Generated: ${new Date().toISOString().split('T')[0]}

${'='.repeat(80)}
`);

    for (const doc of docs) {
        const tagsLine = (doc.tags && doc.tags.length > 0)
            ? `Tags: ${Array.isArray(doc.tags) ? doc.tags.join(', ') : doc.tags}\n`
            : '';

        lines.push(`## ${doc.title}

URL: ${baseUrl}${doc.urlPath}
Markdown: ${baseUrl}${markdownPathFromDocPath(doc.urlPath)}
${tagsLine}
${doc.content}

${'-'.repeat(80)}
`);
    }

    return lines.join('\n');
}

/**
 * Write a file of the build at its URL path
 */
function writeFile(outDir, urlPath, text) {
    const file = path.join(outDir, ...urlPath.split('/'));
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, text, 'utf-8');
}

/**
 * Type resolver for remark-typedoc: the one in docusaurus.config.js, without its
 * links to the API reference (the type text is what an LLM needs)
 */
function typedocTypeResolver({ displayName, tags }) {
    return tags.has('ignore') || tags.has('internal') ? null : { displayName };
}

/**
 * Whether a doc is in a User Manual subcategory that the root index lists under '## Optional'
 */
function isOptionalDoc(doc) {
    const parts = doc.urlPath.split('/').filter(Boolean);
    return doc.category === 'User Manual' && OPTIONAL_SUBCATEGORIES.includes(parts[1]);
}

/**
 * Shorten text to a maximum length, marking the cut with an ellipsis
 */
function truncate(text, maxLength) {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

/**
 * Get category from URL path
 */
function getCategoryFromPath(urlPath) {
    const parts = urlPath.split('/').filter(Boolean);
    if (parts.length === 0) return 'root';

    // Map top-level paths to categories
    const categoryMap = {
        'user-manual': 'User Manual',
        'tutorials': 'Tutorials'
    };

    return categoryMap[parts[0]] || parts[0];
}

// Subcategories the root index lists under '## Optional' (per the llms.txt spec,
// a section that consumers can skip when a shorter context is needed)
const OPTIONAL_SUBCATEGORIES = ['account-management', 'glossary', 'press-pack', 'security'];

/**
 * Resolve the installed PlayCanvas engine version, or null if unavailable
 */
function resolveEngineVersion(siteDir) {
    try {
        const pkgPath = path.join(siteDir, 'node_modules', 'playcanvas', 'package.json');
        return JSON.parse(fs.readFileSync(pkgPath, 'utf-8')).version || null;
    } catch {
        return null;
    }
}
