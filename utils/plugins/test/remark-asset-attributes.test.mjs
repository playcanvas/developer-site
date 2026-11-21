// utils/plugins/test/remark-asset-attributes.test.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import { after, before, describe, it } from 'node:test';

import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

import { rememberAssetAttributes, restoreAssetAttributes } from '../remark-asset-attributes.mjs';

/**
 * Runs Docusaurus's own transformImage and transformLinks between the two
 * plugins, as the docs plugin does, and checks that alt text and titles reach
 * the JSX nodes as written in the Markdown source
 */

const require = createRequire(import.meta.url);
const transformImage = require('@docusaurus/mdx-loader/lib/remark/transformImage').default;
const transformLinks = require('@docusaurus/mdx-loader/lib/remark/transformLinks').default;

// A 1x1 PNG, so that transformImage can read the image size
const PNG = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGNgYGBgAAAABQABpfZFQAAAAABJRU5ErkJggg==',
    'base64'
);

const ALT = 'The Editor\'s "graph" & its states';
const TITLE = 'A \'title\' & "quotes"';

let siteDir;

before(() => {
    siteDir = fs.mkdtempSync(path.join(os.tmpdir(), 'remark-asset-attributes-'));
    fs.mkdirSync(path.join(siteDir, 'static', 'img'), { recursive: true });
    fs.mkdirSync(path.join(siteDir, 'static', 'downloads'), { recursive: true });
    fs.writeFileSync(path.join(siteDir, 'static', 'img', 'graph.png'), PNG);
    fs.writeFileSync(path.join(siteDir, 'static', 'downloads', 'project.zip'), '');
});

after(() => {
    fs.rmSync(siteDir, { recursive: true, force: true });
});

async function run(markdown, { workaround = true } = {}) {
    const options = { staticDirs: [path.join(siteDir, 'static')], siteDir, onBrokenMarkdownImages: 'throw', onBrokenMarkdownLinks: 'throw' };
    const processor = unified()
        .use(remarkParse)
        .use(remarkMdx)
        .use(workaround ? [rememberAssetAttributes] : [])
        .use(transformImage, options)
        .use(transformLinks, options)
        .use(workaround ? [restoreAssetAttributes] : []);
    const tree = await processor.run(processor.parse(markdown), { path: path.join(siteDir, 'docs', 'page.md') });
    const elements = [];
    visit(tree, ['mdxJsxTextElement', 'mdxJsxFlowElement'], (node) => {
        const attributes = Object.fromEntries(node.attributes
            .filter(attribute => attribute.type === 'mdxJsxAttribute' && typeof attribute.value === 'string')
            .map(attribute => [attribute.name, attribute.value]));
        elements.push({ name: node.name, attributes });
    });
    return elements;
}

describe('remark-asset-attributes', () => {
    it('keeps the alt text and title of a Markdown image as written', async () => {
        const [img] = await run(`![${ALT}](/img/graph.png "${TITLE.replaceAll('"', '\\"')}")`);
        assert.equal(img.name, 'img');
        assert.equal(img.attributes.alt, ALT);
        assert.equal(img.attributes.title, TITLE);
    });

    it('keeps the title of a link to a local asset as written', async () => {
        const [a] = await run(`[Download](/downloads/project.zip "${TITLE.replaceAll('"', '\\"')}")`);
        assert.equal(a.name, 'a');
        assert.equal(a.attributes.title, TITLE);
    });

    it('leaves JSX images alone', async () => {
        const [img] = await run('<img alt="The Editor&#39;s &quot;graph&quot; &amp; its states" src="/img/graph.png" />');
        assert.equal(img.attributes.alt, ALT);
    });

    it('is still needed: Docusaurus escapes Markdown image alt text without it', async () => {
        const [img] = await run(`![${ALT}](/img/graph.png)`, { workaround: false });
        assert.notEqual(
            img.attributes.alt,
            ALT,
            'Docusaurus no longer escapes alt text twice. Remove utils/plugins/remark-asset-attributes.mjs and its config entries.'
        );
    });
});
