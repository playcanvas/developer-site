// utils/plugins/llms/test/corpus.test.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { after, before, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import pluginLlms from '../../docusaurus-plugin-llms.mjs';
import { docIdFromFile, docPathFromId, markdownPathFromDocPath } from '../docs.mjs';
import { INDEX_BUDGET, ROOT_INDEX_BUDGET, loadIndexes } from '../indexes.mjs';
import { convertDoc, parseDoc, readFrontMatter } from '../markdown.mjs';

/**
 * Tests over the real docs, so that a doc using Markdown or MDX the converter
 * does not handle fails here rather than silently losing content
 */

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..');
const docsDir = path.join(siteDir, 'docs');
const siteUrl = 'https://developer.playcanvas.com';

// remark-typedoc resolves its tsconfig.json from the working directory
process.chdir(siteDir);

function docFiles(dir = path.join(docsDir, 'user-manual'), files = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) docFiles(fullPath, files);
        else if (/\.mdx?$/.test(entry.name)) files.push(fullPath);
    }
    return files;
}

function codeNodes(node, found = []) {
    if (node.type === 'code') found.push(node);
    (node.children ?? []).forEach(child => codeNodes(child, found));
    return found;
}

// Whether Markdown ends inside a fenced code block, which would turn whatever follows it into code
function endsInCodeBlock(markdown) {
    let fence = null;
    for (const line of markdown.split('\n')) {
        const match = /^ *(`{3,}|~{3,})(.*)$/.exec(line);
        if (!match) continue;
        if (fence === null) fence = match[1];
        else if (match[1][0] === fence[0] && match[1].length >= fence.length && !match[2].trim()) fence = null;
    }
    return fence !== null;
}

describe('every doc', () => {
    // Converted without the typedoc option, so `tsx asTypedoc` blocks stay code blocks and
    // every code block must survive. Their conversion to tables is tested on the generated files.
    it('converts without losing a line of code', () => {
        const failures = [];
        for (const filePath of docFiles()) {
            const source = fs.readFileSync(filePath, 'utf-8');
            const urlPath = docPathFromId(docIdFromFile(docsDir, filePath));
            const { markdown, problems } = convertDoc(source, {
                filePath,
                pageUrl: `${siteUrl}${urlPath}`,
                siteUrl,
                siteDir,
                fileUrl: file => `${siteUrl}${docPathFromId(docIdFromFile(docsDir, file))}`
            });

            const relativePath = path.relative(docsDir, filePath);
            failures.push(...problems.map(problem => `${relativePath}: ${problem}`));
            for (const code of codeNodes(parseDoc(source).tree)) {
                const missing = code.value.split('\n').map(line => line.trim()).find(line => line && !markdown.includes(line));
                if (missing !== undefined) failures.push(`${relativePath}: lost code line "${missing}"`);
            }
            if (/<(Tabs|TabItem|CodeExample|EngineExample|CodePenEmbed)\b/.test(markdown)) {
                failures.push(`${relativePath}: a site component was left in the output`);
            }
            if (endsInCodeBlock(markdown)) {
                failures.push(`${relativePath}: ends inside a code block`);
            }
        }
        assert.deepEqual(failures, []);
    });
});

describe('the generated files', () => {
    let outDir;
    let llmsFullTxt;

    // A generated file, by the URL path it is published at
    const outPath = urlPath => path.join(outDir, ...urlPath.split('/'));
    const read = urlPath => fs.readFileSync(outPath(urlPath), 'utf-8');

    // Every published index, with its text as generated
    const indexes = () => loadIndexes(siteDir, path.join(siteDir, 'llms')).map(index => ({ ...index, text: read(index.publishedPath) }));

    // Every published doc
    const publishedDocs = () => docFiles().filter((file) => {
        const frontMatter = readFrontMatter(fs.readFileSync(file, 'utf-8'));
        return !frontMatter.unlisted && !frontMatter.draft;
    }).map(file => docPathFromId(docIdFromFile(docsDir, file)));

    before(async () => {
        // failOnError makes any problem the plugin finds, such as a broken index link, fail here
        outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'llms-test-'));

        // A built page, for the plugin to link to its Markdown version
        fs.mkdirSync(outPath('/user-manual/engine/standalone/'), { recursive: true });
        fs.writeFileSync(outPath('/user-manual/engine/standalone/index.html'), '<!doctype html><html><head><title>Standalone</title></head><body></body></html>');

        await pluginLlms({ siteDir, siteConfig: { url: siteUrl } }, { failOnError: true }).postBuild({ outDir });
        llmsFullTxt = read('/llms-full.txt');
    });

    after(() => {
        fs.rmSync(outDir, { recursive: true, force: true });
    });

    // The llms-full.txt section of a page
    const section = (urlPath) => {
        const start = llmsFullTxt.indexOf(`URL: ${siteUrl}${urlPath}\n`);
        assert.notEqual(start, -1, `no section for ${urlPath}`);
        return llmsFullTxt.slice(start, llmsFullTxt.indexOf(`\n${'-'.repeat(80)}`, start));
    };

    it('keeps the ESM script examples whole', () => {
        const esm = section('/user-manual/scripting/script-attributes/esm/');
        assert.ok(esm.includes("import { Script } from 'playcanvas';"));
        assert.ok(esm.includes('export class Rotator extends Script {'));
    });

    it('keeps React code examples whole', () => {
        const react = section('/user-manual/react/');
        assert.ok(react.includes('export const Lambo = () => {'));
        assert.ok(react.includes("<Entity name='camera' position={[4, 1, 4]}>"));
        assert.ok(react.includes("<Camera clearColor='#090707' fov={28} />"));
    });

    it('keeps the code of every tab', () => {
        const fences = section('/user-manual/scripting/debugging/console-logging/').match(/^```/gm);
        assert.equal(fences.length, 10);
    });

    it('documents React component props', () => {
        assert.match(section('/user-manual/react/api/entity/'), /^\| `position\?` \| `\[number, number, number\]` \|/m);
    });

    it('turns every asTypedoc block into property tables', () => {
        const blocks = docFiles().flatMap((file) => {
            const { frontMatter, tree } = parseDoc(fs.readFileSync(file, 'utf-8'));
            return frontMatter.unlisted || frontMatter.draft ? [] : codeNodes(tree);
        }).filter(code => /^tsx?$/.test(code.lang ?? '') && code.meta?.includes('asTypedoc'));
        const tables = llmsFullTxt.match(/^\| Name \| Type \| Default \| Description \|$/gm) ?? [];

        assert.ok(blocks.length > 0);
        assert.ok(tables.length >= blocks.length, `${tables.length} tables for ${blocks.length} asTypedoc blocks`);
        assert.ok(!llmsFullTxt.includes('asTypedoc'), 'an asTypedoc block was left as code');
    });

    it('links docs at the URLs they are published at', () => {
        const engineIndex = read('/user-manual/engine/llms.txt');
        assert.ok(engineIndex.includes(`(${siteUrl}/user-manual/2D/slicing.md)`));
        assert.ok(!engineIndex.includes('/user-manual/2D/9-slicing'));
    });

    it('writes a Markdown version of every published page', () => {
        for (const docPath of publishedDocs()) {
            assert.ok(fs.existsSync(outPath(markdownPathFromDocPath(docPath))), `no Markdown version of ${docPath}`);
        }
        const standalone = read('/user-manual/engine/standalone.md');
        assert.ok(standalone.startsWith('# Using the Engine Standalone\n'));
        assert.ok(standalone.includes(`(${siteUrl}/user-manual/getting-started/start-with-create-playcanvas.md)`));
    });

    it('links each built page to its Markdown version', () => {
        const html = read('/user-manual/engine/standalone/index.html');
        const tags = html.match(/<link rel="alternate" type="text\/markdown" href="[^"]*">/g);
        assert.deepEqual(tags, ['<link rel="alternate" type="text/markdown" href="/user-manual/engine/standalone.md">']);
        assert.ok(html.indexOf(tags[0]) < html.indexOf('</head>'));
    });

    it('gives the page and the Markdown version of every doc in the bundles', () => {
        assert.ok(llmsFullTxt.includes(`URL: ${siteUrl}/user-manual/engine/standalone/\nMarkdown: ${siteUrl}/user-manual/engine/standalone.md\n`));
        assert.ok(read('/user-manual/engine/llms-full.txt').includes(`Markdown: ${siteUrl}/user-manual/engine/standalone.md\n`));
    });

    it('publishes every index, with the file of all its pages', () => {
        for (const index of indexes()) {
            assert.ok(index.text.startsWith(`# ${index.title}\n`));
            if (index.bundlePath) {
                assert.ok(read(index.bundlePath).startsWith(`# ${index.title}: All Pages\n`));
            }
        }
    });

    it('links indexes only to files that are published', () => {
        for (const { source, text } of indexes()) {
            assert.ok(!/\]\(\//.test(text), `${source} has a site path left`);
            assert.ok(!/\{\{\w+\}\}/.test(text), `${source} has a placeholder left`);
            for (const [, urlPath] of text.matchAll(/\]\(https:\/\/developer\.playcanvas\.com(\/[^)#\s]*)/g)) {
                assert.ok(fs.existsSync(outPath(urlPath)), `${source} links ${urlPath}, which is not published`);
            }
        }
    });

    it('lists every page of the User Manual in an index', () => {
        const listed = new Set(indexes().flatMap(({ text }) => [...text.matchAll(/\]\(https:\/\/developer\.playcanvas\.com(\/[^)#\s]*)/g)].map(match => match[1])));
        for (const docPath of publishedDocs()) {
            assert.ok(listed.has(markdownPathFromDocPath(docPath)), `${docPath} is in no index`);
        }
    });

    it('keeps every index within its budget', () => {
        for (const { source, publishedPath, text } of indexes()) {
            const budget = publishedPath === '/llms.txt' ? ROOT_INDEX_BUDGET : INDEX_BUDGET;
            assert.ok(Buffer.byteLength(text) <= budget, `${source} is over its budget`);
        }
    });

    it('orders the docs like the sidebar, with the optional sections last', () => {
        const urls = [...llmsFullTxt.matchAll(/^URL: (.*)$/gm)].map(match => match[1]);
        assert.equal(urls[0], `${siteUrl}/user-manual/`);
        assert.equal(urls[1], `${siteUrl}/user-manual/getting-started/`);
        assert.equal(urls.at(-1), `${siteUrl}/user-manual/security/`);
    });

    it('leaves out unlisted docs', () => {
        assert.ok(!llmsFullTxt.includes(`URL: ${siteUrl}/user-manual/api/splat-publish/`));
    });
});
