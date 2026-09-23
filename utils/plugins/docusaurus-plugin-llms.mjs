// utils/plugins/docusaurus-plugin-llms.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { docIdFromFile, docPathFromId, loadSidebarOrder, sidebarSortKey } from './llms/docs.mjs';
import { convertDoc } from './llms/markdown.mjs';

/**
 * Docusaurus plugin to generate LLM-friendly documentation files.
 * Generates:
 * - llms.txt: Structured overview with links to all documentation sections
 * - llms-full.txt: Complete documentation content in a single file
 *
 * Only the default locale build generates them: the docs are read from the
 * docs directory, so a localized build would publish a copy of the same files.
 *
 * @param {Object} context - Docusaurus context
 * @param {Object} options - Plugin options
 * @param {string} [options.docsDir='docs'] - Path to docs directory relative to site root
 * @param {string} [options.sidebarPath='sidebars.js'] - Path to the sidebars file relative to
 *   site root, which sets the order of the docs
 * @param {string[]} [options.excludeDirs=['shader-editor', 'tutorials']] - Directories to exclude
 *   from LLM file generation (e.g., private or unlisted documentation sections)
 * @param {boolean} [options.failOnError=false] - If true, build will fail when LLM file
 *   generation encounters an error, or when a doc cannot be converted faithfully or does
 *   not match a built page. If false (default), errors are logged as warnings and the
 *   build continues. Set to true if LLM files are critical to your deployment.
 */
export default function pluginLlms(context, options = {}) {
    const { siteDir, siteConfig, i18n } = context;
    const docsDir = path.join(siteDir, options.docsDir || 'docs');
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

            // Docs that could not be converted faithfully
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

                // Document `tsx asTypedoc` code blocks as the site does (loaded here as it starts TypeScript)
                const { generateDefinitions } = await import('./remark-typedoc.mjs');
                const typedoc = code => generateDefinitions({ code, typeResolver: typedocTypeResolver });

                // Process files and extract content
                const processedDocs = docFiles
                    .map(filePath => processMarkdownFile(filePath, { docsDir, siteDir, baseUrl, typedoc }, problems))
                    .filter(Boolean);

                // Every doc URL must be a built page (routes are only known in a real build)
                if (routesPaths) {
                    const routes = new Set(routesPaths);
                    for (const doc of processedDocs) {
                        if (!routes.has(doc.urlPath)) {
                            problems.push(`${doc.relativePath}: no page is built at ${doc.urlPath}`);
                        }
                    }
                }

                // Sort in the sidebar's reading order, except that the subcategories llms.txt lists
                // under '## Optional' come last (consumers that truncate lose the end first)
                const sidebarOrder = await loadSidebarOrder(sidebarPath);
                processedDocs.sort((a, b) => (isOptionalDoc(a) - isOptionalDoc(b)) ||
                    (sidebarSortKey(a.id, sidebarOrder) - sidebarSortKey(b.id, sidebarOrder)) ||
                    a.urlPath.localeCompare(b.urlPath));

                // Generate llms.txt (structured overview)
                const engineVersion = resolveEngineVersion(siteDir);
                const llmsTxt = generateLlmsTxt(processedDocs, baseUrl, engineVersion);
                const llmsTxtPath = path.join(outDir, 'llms.txt');
                fs.writeFileSync(llmsTxtPath, llmsTxt, 'utf-8');
                console.log(`[LLMs Plugin] Generated ${llmsTxtPath}`);

                // Generate llms-full.txt (complete content)
                const llmsFullTxt = generateLlmsFullTxt(processedDocs, baseUrl);
                const llmsFullTxtPath = path.join(outDir, 'llms-full.txt');
                fs.writeFileSync(llmsFullTxtPath, llmsFullTxt, 'utf-8');
                console.log(`[LLMs Plugin] Generated ${llmsFullTxtPath} (${(llmsFullTxt.length / 1024).toFixed(1)} KB)`);

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
                const message = `[LLMs Plugin] ${problems.length} doc problem(s):\n  ${problems.join('\n  ')}`;
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
 * Process a markdown file and extract metadata and content. Returns null for
 * a doc that is not published, and adds anything that could not be converted
 * faithfully to problems.
 */
function processMarkdownFile(filePath, { docsDir, siteDir, baseUrl, typedoc }, problems) {
    const relativePath = path.relative(docsDir, filePath).split(path.sep).join('/');
    const id = docIdFromFile(docsDir, filePath);
    const urlPath = docPathFromId(id);

    let doc;
    try {
        doc = convertDoc(fs.readFileSync(filePath, 'utf-8'), {
            filePath,
            pageUrl: `${baseUrl}${urlPath}`,
            siteUrl: baseUrl,
            siteDir,
            fileUrl: file => `${baseUrl}${docPathFromId(docIdFromFile(docsDir, file))}`,
            typedoc
        });
    } catch (error) {
        problems.push(`${relativePath}: ${error.message}`);
        return null;
    }

    // Drafts are not published, and unlisted docs are hidden from the site's navigation and search
    const { frontMatter } = doc;
    if (frontMatter.draft === true || frontMatter.unlisted === true) {
        return null;
    }
    problems.push(...doc.problems.map(problem => `${relativePath}: ${problem}`));

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
 * Type resolver for remark-typedoc: the one in docusaurus.config.js, without its
 * links to the API reference (the type text is what an LLM needs)
 */
function typedocTypeResolver({ displayName, tags }) {
    return tags.has('ignore') || tags.has('internal') ? null : { displayName };
}

/**
 * Whether a doc is in a User Manual subcategory that llms.txt lists under '## Optional'
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

// Subcategories rendered under '## Optional' (per the llms.txt spec, a section
// that consumers can skip when a shorter context is needed)
const OPTIONAL_SUBCATEGORIES = ['account-management', 'glossary', 'press-pack', 'security'];

// User Manual subcategory order, following sidebars.js (minus the
// subcategories in OPTIONAL_SUBCATEGORIES, which render under '## Optional')
const USER_MANUAL_ORDER = [
    'Overview',
    'getting-started',
    'engine', 'editor', 'react', 'web-components',
    'supersplat', 'splat-transform',
    'ecs', 'assets', 'scripting', 'graphics', 'gaussian-splatting',
    'animation', 'physics', '2D', 'user-interface', 'xr',
    'optimization', 'api', 'pcui'
];

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

/**
 * Load the hand-written llms.txt header partial
 */
function loadHeaderTemplate() {
    const templatePath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'llms', 'llms-header.md');
    return fs.readFileSync(templatePath, 'utf-8').replace(/\r\n/g, '\n');
}

/**
 * Substitute {{NAME}} placeholders, then drop any line with an unresolved
 * placeholder (e.g. the engine version line when resolution failed)
 */
function applyTemplate(template, vars) {
    const substituted = template.replace(/\{\{(\w+)\}\}/g, (match, name) => {
        const value = vars[name];
        return (value === null || value === undefined) ? match : String(value);
    });
    return substituted
        .split('\n')
        .filter(line => !/\{\{\w+\}\}/.test(line))
        .join('\n');
}

/**
 * Format a doc as an llms.txt list entry: - [Title](url): description
 * (If per-page markdown variants are published later, the link target changes here.)
 */
function formatDocEntry(doc, baseUrl) {
    const title = doc.title.replace(/\s+/g, ' ').replace(/[[\]]/g, '\\$&').trim();
    let description = (doc.description || '').replace(/\s+/g, ' ').trim();
    if (description.length > 300) {
        description = `${description.slice(0, 300)}...`;
    }
    const link = `- [${title}](${baseUrl}${doc.urlPath})`;
    return description ? `${link}: ${description}` : link;
}

/**
 * Format a subcategory slug as a display name
 */
function formatSubcategoryName(subcat) {
    // Acronyms that should be fully uppercased
    const acronyms = new Set(['api', 'xr', '2d', 'ui', 'ecs', 'pcui']);
    // Brand names with specific capitalization
    const brandNames = { 'playcanvas': 'PlayCanvas', 'supersplat': 'SuperSplat' };
    return subcat
        .split('-')
        .map((word) => {
            const lower = word.toLowerCase();
            if (acronyms.has(lower)) return word.toUpperCase();
            if (brandNames[lower]) return brandNames[lower];
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}

/**
 * Render subcategory groups as lines: an H3 heading when a subcategory has
 * multiple docs, then one list entry per doc
 */
function renderSubcategorySections(subcategories, order, baseUrl) {
    const lines = [];

    // Sort subcategories: use defined order if available, otherwise alphabetical
    const sortedSubcats = Object.keys(subcategories).sort((a, b) => {
        if (order) {
            const indexA = order.indexOf(a);
            const indexB = order.indexOf(b);
            // Items in order come first, in their defined order
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
        }
        // Fallback to alphabetical
        return a.localeCompare(b);
    });

    for (const subcat of sortedSubcats) {
        const subcatDocs = subcategories[subcat];

        if (subcatDocs.length > 1) {
            lines.push(`### ${formatSubcategoryName(subcat)}`);
        }

        for (const doc of subcatDocs) {
            lines.push(formatDocEntry(doc, baseUrl));
        }

        if (subcatDocs.length > 1) {
            lines.push('');
        }
    }

    return lines;
}

/**
 * Generate the llms.txt file (structured overview)
 */
function generateLlmsTxt(docs, baseUrl, engineVersion) {
    const lines = [];

    lines.push(applyTemplate(loadHeaderTemplate(), {
        BASE_URL: baseUrl,
        ENGINE_VERSION: engineVersion,
        TOTAL_DOCS: String(docs.length),
        DATE: new Date().toISOString().split('T')[0]
    }));

    // Group by category
    const categories = {};
    for (const doc of docs) {
        if (!categories[doc.category]) {
            categories[doc.category] = [];
        }
        categories[doc.category].push(doc);
    }

    // User Manual: group by subcategory (second level path), holding back
    // secondary subcategories for the '## Optional' section
    const mainSubcats = {};
    const optionalSubcats = {};
    for (const doc of categories['User Manual'] ?? []) {
        const parts = doc.urlPath.split('/').filter(Boolean);
        const subcat = parts.length > 1 ? parts[1] : 'Overview';
        const target = OPTIONAL_SUBCATEGORIES.includes(subcat) ? optionalSubcats : mainSubcats;
        if (!target[subcat]) {
            target[subcat] = [];
        }
        target[subcat].push(doc);
    }

    lines.push('## User Manual\n');
    lines.push(...renderSubcategorySections(mainSubcats, USER_MANUAL_ORDER, baseUrl));

    // Add any remaining categories
    for (const category of Object.keys(categories)) {
        if (category === 'User Manual') continue;

        const docLinks = categories[category]
            .map(doc => formatDocEntry(doc, baseUrl))
            .join('\n');

        lines.push(`## ${category}\n\n${docLinks}\n`);
    }

    if (Object.keys(optionalSubcats).length > 0) {
        lines.push('## Optional\n');
        lines.push('Secondary content that most coding tasks will not need.\n');
        lines.push(...renderSubcategorySections(optionalSubcats, OPTIONAL_SUBCATEGORIES, baseUrl));
    }

    return `${lines.join('\n').trimEnd()}\n`;
}

/**
 * Generate the llms-full.txt file (complete content)
 */
function generateLlmsFullTxt(docs, baseUrl) {
    const lines = [];

    lines.push(`# PlayCanvas Developer Documentation - Full Content

> This file contains the complete text content of the PlayCanvas documentation.
> It is designed for consumption by Large Language Models (LLMs) and AI assistants.

Base URL: ${baseUrl}
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
${tagsLine}
${doc.content}

${'-'.repeat(80)}
`);
    }

    return lines.join('\n');
}
