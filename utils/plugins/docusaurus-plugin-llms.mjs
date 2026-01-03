// utils/plugins/docusaurus-plugin-llms.mjs
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

/**
 * Docusaurus plugin to generate LLM-friendly documentation files.
 * Generates:
 * - llms.txt: Structured overview with links to all documentation sections
 * - llms-full.txt: Complete documentation content in a single file
 *
 * @param {Object} context - Docusaurus context
 * @param {Object} options - Plugin options
 * @param {string} [options.docsDir='docs'] - Path to docs directory relative to site root
 * @param {string[]} [options.excludeDirs=['shader-editor']] - Directories to exclude from
 *   LLM file generation (e.g., private or unlisted documentation sections)
 * @param {boolean} [options.failOnError=false] - If true, build will fail when LLM file
 *   generation encounters an error. If false (default), errors are logged as warnings
 *   and the build continues. Set to true if LLM files are critical to your deployment.
 */
export default function pluginLlms(context, options = {}) {
    const { siteDir, siteConfig } = context;
    const docsDir = path.join(siteDir, options.docsDir || 'docs');
    const baseUrl = siteConfig.url;
    const excludeDirs = options.excludeDirs ?? ['shader-editor'];
    const failOnError = options.failOnError ?? false;

    return {
        name: 'docusaurus-plugin-llms',

        async postBuild({ outDir }) {
            console.log('[LLMs Plugin] Generating LLM-friendly documentation files...');

            try {
                // Ensure the docs directory exists before processing
                if (!fs.existsSync(docsDir)) {
                    console.warn(`[LLMs Plugin] Docs directory not found at ${docsDir}. Skipping LLM file generation.`);
                    return;
                }
                // Collect all markdown files (excluding private/unlisted directories)
                const docFiles = await collectMarkdownFiles(docsDir, excludeDirs);
                console.log(`[LLMs Plugin] Found ${docFiles.length} documentation files`);

                // Process files and extract content
                const processedDocs = await Promise.all(
                    docFiles.map(filePath => processMarkdownFile(filePath, docsDir))
                );

                // Sort by path for consistent ordering
                processedDocs.sort((a, b) => a.urlPath.localeCompare(b.urlPath));

                // Generate llms.txt (structured overview)
                const llmsTxt = generateLlmsTxt(processedDocs, baseUrl);
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
 * Process a markdown file and extract metadata and content
 */
function processMarkdownFile(filePath, docsDir) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(docsDir, filePath);

    // Parse frontmatter
    const frontmatter = parseFrontmatter(content);

    // Convert file path to URL path
    let urlPath = '/' + relativePath
        .replace(/\\/g, '/')
        .replace(/\.mdx?$/, '/')
        .replace(/\/index\/$/, '/');

    // Extract title from frontmatter or first heading
    const title = frontmatter.title || extractFirstHeading(content) || path.basename(filePath, path.extname(filePath));

    // Clean content for LLM consumption
    const cleanedContent = cleanMarkdownContent(content);

    // Extract description from first paragraph if available
    const description = frontmatter.description || extractFirstParagraph(cleanedContent);

    // Extract tags if present
    const tags = frontmatter.tags || [];

    // Determine category from path
    const category = getCategoryFromPath(urlPath);

    return {
        filePath,
        relativePath,
        urlPath,
        title,
        description,
        tags,
        category,
        content: cleanedContent
    };
}

/**
 * Parse YAML frontmatter from markdown content using js-yaml.
 * Supports full YAML syntax including multi-line strings (| and >),
 * multi-line arrays, nested objects, and all standard YAML constructs.
 */
function parseFrontmatter(content) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return {};

    try {
        return yaml.load(match[1]) || {};
    } catch (error) {
        // Log warning but return empty object to allow processing to continue
        console.warn(`[LLMs Plugin] Warning: Failed to parse frontmatter: ${error.message}`);
        return {};
    }
}

/**
 * Extract the first heading from markdown content
 */
function extractFirstHeading(content) {
    // Remove frontmatter first
    const withoutFrontmatter = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n*/, '');
    const match = withoutFrontmatter.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : null;
}

/**
 * Extract the first paragraph from markdown content
 */
function extractFirstParagraph(content) {
    // Find first non-heading, non-empty paragraph
    const lines = content.split('\n');
    let paragraph = '';

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) {
            if (paragraph) break;
            continue;
        }
        if (trimmed.startsWith('#')) continue;
        if (trimmed.startsWith('![')) continue;
        // Skip lines that start with what looks like an HTML/JSX tag (e.g. <div>, <MyComponent>, </Section>)
        if (/^<\s*\/?[A-Za-z]/.test(trimmed)) continue;

        paragraph += (paragraph ? ' ' : '') + trimmed;
        if (paragraph.length > 200) break;
    }

    return paragraph.slice(0, 200) + (paragraph.length > 200 ? '...' : '');
}

/**
 * Clean markdown content for LLM consumption
 */
function cleanMarkdownContent(content) {
    let cleaned = content;

    // Remove frontmatter (handle both \n and \r\n line endings)
    cleaned = cleaned.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n*/, '');

    // Remove JSX/MDX components but keep text content
    cleaned = cleaned.replace(/<([A-Z][a-zA-Z]*)[^>]*\/>/g, ''); // Self-closing components
    const componentWithChildrenRegex = /<([A-Z][a-zA-Z]*)[^>]*>[\s\S]*?<\/\1>/g;
    // Remove components with children; iterate to handle nested components of the same type
    let previousCleaned;
    do {
        previousCleaned = cleaned;
        cleaned = cleaned.replace(componentWithChildrenRegex, '');
    } while (cleaned !== previousCleaned);

    // Remove iframe embeds
    cleaned = cleaned.replace(/<iframe[\s\S]*?<\/iframe>/gi, '[Interactive Demo]');
    cleaned = cleaned.replace(/<div[^>]*className=["']iframe-container["'][^>]*>[\s\S]*?<\/div>/g, '[Interactive Demo]');

    // Simplify images - keep alt text
    cleaned = cleaned.replace(/!\[([^\]]*)\]\([^)]+\)/g, (match, alt) => {
        return alt ? `[Image: ${alt}]` : '';
    });

    // Remove HTML comments
    cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

    // Remove import statements
    cleaned = cleaned.replace(/^import\s+.*$/gm, '');

    // Remove export statements
    cleaned = cleaned.replace(/^export\s+.*$/gm, '');

    // Clean up excessive whitespace
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

    // Trim
    cleaned = cleaned.trim();

    return cleaned;
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

/**
 * Generate the llms.txt file (structured overview)
 */
function generateLlmsTxt(docs, baseUrl) {
    const lines = [];

    lines.push(`# PlayCanvas Developer Documentation

> PlayCanvas is an open-source WebGL/WebGPU 3D game engine for creating interactive experiences and games that run in the browser.

This file provides a structured overview of the PlayCanvas documentation.
For the complete documentation content, see: ${baseUrl}/llms-full.txt

Base URL: ${baseUrl}
Total Documents: ${docs.length}
Generated: ${new Date().toISOString().split('T')[0]}

## Recommended Entry Points

- Getting Started: ${baseUrl}/user-manual/getting-started/
- PlayCanvas Editor: ${baseUrl}/user-manual/editor/
- PlayCanvas Engine: ${baseUrl}/user-manual/engine/
- PlayCanvas React: ${baseUrl}/user-manual/playcanvas-react/
- Web Components: ${baseUrl}/user-manual/web-components/
- Scripting: ${baseUrl}/user-manual/scripting/
- Gaussian Splatting: ${baseUrl}/user-manual/gaussian-splatting/
- Graphics: ${baseUrl}/user-manual/graphics/
- Physics: ${baseUrl}/user-manual/physics/
- XR (VR/AR): ${baseUrl}/user-manual/xr/
`);

    // Group by category
    const categories = {};
    for (const doc of docs) {
        if (!categories[doc.category]) {
            categories[doc.category] = [];
        }
        categories[doc.category].push(doc);
    }

    // Define category order
    const categoryOrder = ['User Manual', 'Tutorials'];

    // Define subcategory order to match sidebars.js
    const subcategoryOrder = {
        'User Manual': [
            'index', 'getting-started', 'account-management',
            'engine', 'editor', 'playcanvas-react', 'web-components',
            'ecs', 'assets', 'scripting', 'graphics', 'gaussian-splatting',
            'animation', 'physics', '2D', 'user-interface', 'xr',
            'optimization', 'api', 'pcui', 'glossary', 'press-pack'
        ]
    };

    // Output each category
    for (const category of categoryOrder) {
        if (!categories[category]) continue;

        lines.push(`## ${category}\n`);

        // Group by subcategory (second level path)
        const subcategories = {};
        for (const doc of categories[category]) {
            const parts = doc.urlPath.split('/').filter(Boolean);
            const subcat = parts.length > 1 ? parts[1] : 'Overview';
            if (!subcategories[subcat]) {
                subcategories[subcat] = [];
            }
            subcategories[subcat].push(doc);
        }

        // Sort subcategories: use defined order if available, otherwise alphabetical
        const order = subcategoryOrder[category];
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

            // Format subcategory name
            // Acronyms that should be fully uppercased
            const acronyms = new Set(['api', 'xr', '2d', 'ui', 'ecs', 'pcui']);
            // Brand names with specific capitalization
            const brandNames = { 'playcanvas': 'PlayCanvas' };
            const subcatName = subcat
                .split('-')
                .map((word) => {
                    const lower = word.toLowerCase();
                    if (acronyms.has(lower)) return word.toUpperCase();
                    if (brandNames[lower]) return brandNames[lower];
                    return word.charAt(0).toUpperCase() + word.slice(1);
                })
                .join(' ');

            if (subcatDocs.length > 1) {
                lines.push(`### ${subcatName}`);
            }

            for (const doc of subcatDocs) {
                lines.push(`- ${baseUrl}${doc.urlPath} - ${doc.title}`);
            }

            if (subcatDocs.length > 1) {
                lines.push('');
            }
        }
    }

    // Add any remaining categories
    for (const category of Object.keys(categories)) {
        if (categoryOrder.includes(category)) continue;

        const docLinks = categories[category]
            .map(doc => `- ${baseUrl}${doc.urlPath} - ${doc.title}`)
            .join('\n');

        lines.push(`## ${category}\n\n${docLinks}\n`);
    }

    return lines.join('\n');
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
