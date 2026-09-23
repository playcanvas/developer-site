// utils/plugins/llms/test/corpus.test.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { before, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import pluginLlms from '../../docusaurus-plugin-llms.mjs';
import { docIdFromFile, docPathFromId } from '../docs.mjs';
import { convertDoc, parseDoc } from '../markdown.mjs';

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
    let llmsTxt;
    let llmsFullTxt;

    before(async () => {
        const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'llms-test-'));
        await pluginLlms({ siteDir, siteConfig: { url: siteUrl } }, { failOnError: true }).postBuild({ outDir });
        llmsTxt = fs.readFileSync(path.join(outDir, 'llms.txt'), 'utf-8');
        llmsFullTxt = fs.readFileSync(path.join(outDir, 'llms-full.txt'), 'utf-8');
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

    it('links docs at the URLs they are published at', () => {
        assert.ok(llmsTxt.includes(`(${siteUrl}/user-manual/2D/slicing/)`));
        assert.ok(!llmsTxt.includes('/user-manual/2D/9-slicing/'));
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
