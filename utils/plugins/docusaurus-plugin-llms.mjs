// utils/plugins/docusaurus-plugin-llms.mjs
import fs from 'fs';
import path from 'path';

/**
 * Docusaurus plugin to generate LLM-friendly documentation files.
 * Generates:
 * - llms.txt: Structured overview with links to all documentation sections
 * - llms-full.txt: Complete documentation content in a single file
 */
export default function pluginLlms(context, options = {}) {
    const { siteDir, siteConfig } = context;
    const docsDir = path.join(siteDir, options.docsDir || 'docs');
    const baseUrl = siteConfig.url;

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
                // Collect all markdown files
                const docFiles = await collectMarkdownFiles(docsDir);
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
                console.error('[LLMs Plugin] Error generating LLM files:', error);
            }
        }
    };
}

/**
 * Recursively collect all markdown files from a directory
 */
function collectMarkdownFiles(dir, files = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            collectMarkdownFiles(fullPath, files);
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
 * Parse YAML frontmatter from markdown content
 */
function parseFrontmatter(content) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return {};

    const frontmatter = {};
    const lines = match[1].split(/\r?\n/);

    for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();

            // Handle arrays like [tag1, tag2]
            if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
            } else {
                // Remove surrounding quotes if present
                value = value.replace(/^['"]|['"]$/g, '');
            }

            frontmatter[key] = value;
        }
    }

    return frontmatter;
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
    cleaned = cleaned.replace(/<([A-Z][a-zA-Z]*)[^>]*>[\s\S]*?<\/\1>/g, ''); // Components with children

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
        'tutorials': 'Tutorials',
        'shader-editor': 'Shader Editor'
    };

    return categoryMap[parts[0]] || parts[0];
}

/**
 * Generate the llms.txt file (structured overview)
 */
function generateLlmsTxt(docs, baseUrl) {
    const lines = [];

    lines.push('# PlayCanvas Developer Documentation');
    lines.push('');
    lines.push('> PlayCanvas is an open-source WebGL/WebGPU 3D game engine for creating interactive experiences and games that run in the browser.');
    lines.push('');
    lines.push('This file provides a structured overview of the PlayCanvas documentation.');
    lines.push(`For the complete documentation content, see: ${baseUrl}/llms-full.txt`);
    lines.push('');
    lines.push(`Base URL: ${baseUrl}`);
    lines.push(`Total Documents: ${docs.length}`);
    lines.push(`Generated: ${new Date().toISOString().split('T')[0]}`);
    lines.push('');

    // Group by category
    const categories = {};
    for (const doc of docs) {
        if (!categories[doc.category]) {
            categories[doc.category] = [];
        }
        categories[doc.category].push(doc);
    }

    // Define category order
    const categoryOrder = ['User Manual', 'Tutorials', 'Shader Editor'];

    // Output each category
    for (const category of categoryOrder) {
        if (!categories[category]) continue;

        lines.push(`## ${category}`);
        lines.push('');

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

        // Sort subcategories alphabetically
        const sortedSubcats = Object.keys(subcategories).sort();

        for (const subcat of sortedSubcats) {
            const subcatDocs = subcategories[subcat];

            // Format subcategory name
            const subcatName = subcat
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            if (subcatDocs.length > 1) {
                lines.push(`### ${subcatName}`);
            }

            for (const doc of subcatDocs) {
                lines.push(`- ${baseUrl}${doc.urlPath} - ${doc.title}`);
            }
            lines.push('');
        }
    }

    // Add any remaining categories
    for (const category of Object.keys(categories)) {
        if (categoryOrder.includes(category)) continue;

        lines.push(`## ${category}`);
        lines.push('');

        for (const doc of categories[category]) {
            lines.push(`- ${baseUrl}${doc.urlPath} - ${doc.title}`);
        }
        lines.push('');
    }

    return lines.join('\n');
}

/**
 * Generate the llms-full.txt file (complete content)
 */
function generateLlmsFullTxt(docs, baseUrl) {
    const lines = [];

    lines.push('# PlayCanvas Developer Documentation - Full Content');
    lines.push('');
    lines.push('> This file contains the complete text content of the PlayCanvas documentation.');
    lines.push('> It is designed for consumption by Large Language Models (LLMs) and AI assistants.');
    lines.push('');
    lines.push(`Base URL: ${baseUrl}`);
    lines.push(`Total Documents: ${docs.length}`);
    lines.push(`Generated: ${new Date().toISOString().split('T')[0]}`);
    lines.push('');
    lines.push('='.repeat(80));
    lines.push('');

    for (const doc of docs) {
        // Document header
        lines.push(`## ${doc.title}`);
        lines.push('');
        lines.push(`URL: ${baseUrl}${doc.urlPath}`);

        if (doc.tags && doc.tags.length > 0) {
            const tagsStr = Array.isArray(doc.tags) ? doc.tags.join(', ') : doc.tags;
            lines.push(`Tags: ${tagsStr}`);
        }

        lines.push('');

        // Document content
        lines.push(doc.content);

        lines.push('');
        lines.push('-'.repeat(80));
        lines.push('');
    }

    return lines.join('\n');
}

