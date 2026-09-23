// utils/plugins/llms/test/indexes.test.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';

import { INDEX_BUDGET, indexPages, loadIndexes, renderIndex, sectionOf } from '../indexes.mjs';

const siteUrl = 'https://developer.playcanvas.com';
const lines = (...list) => list.join('\n');

const doc = (urlPath, title) => ({ urlPath, title });
const docs = [
    doc('/user-manual/engine/', 'PlayCanvas Engine'),
    doc('/user-manual/engine/standalone/', 'Using the Engine Standalone'),
    doc('/user-manual/graphics/', 'Graphics'),
    doc('/user-manual/graphics/shaders/', 'Shaders [WGSL]'),
    doc('/user-manual/editor/', 'PlayCanvas Editor')
];

const index = body => ({
    source: 'llms/user-manual/engine/llms.txt',
    publishedPath: '/user-manual/engine/llms.txt',
    bundlePath: '/user-manual/engine/llms-full.txt',
    covers: ['engine', 'graphics'],
    title: 'PlayCanvas Engine',
    summary: '',
    body
});

const render = (body, options = {}) => {
    const problems = [];
    const text = renderIndex(index(body), {
        siteUrl,
        docs,
        llmsFiles: new Set(['/llms-full.txt', '/user-manual/engine/llms.txt', '/user-manual/editor/llms.txt']),
        others: [],
        bundle: null,
        vars: { ENGINE_VERSION: '2.22.3' },
        ...options
    }, problems);
    return { text, problems };
};

describe('rendering an index', () => {
    it('points page links at their Markdown versions, and keeps fragments', () => {
        const { text, problems } = render(lines(
            '- [Standalone](/user-manual/engine/standalone/): Setup.',
            '- [Shaders](/user-manual/graphics/shaders#wgsl): Without a trailing slash.',
            '- [Editor](/user-manual/editor/llms.txt): Another index.',
            '- [Engine API](https://api.playcanvas.com/engine/): External.'
        ));
        assert.deepEqual(problems, []);
        assert.equal(text, lines(
            '- [Standalone](https://developer.playcanvas.com/user-manual/engine/standalone.md): Setup.',
            '- [Shaders](https://developer.playcanvas.com/user-manual/graphics/shaders.md#wgsl): Without a trailing slash.',
            '- [Editor](https://developer.playcanvas.com/user-manual/editor/llms.txt): Another index.',
            '- [Engine API](https://api.playcanvas.com/engine/): External.'
        ));
    });

    it('reports links to pages that are not published', () => {
        const { problems } = render('- [Gone](/user-manual/engine/gone/): Removed.');
        assert.deepEqual(problems, ['llms/user-manual/engine/llms.txt: /user-manual/engine/gone/ is not a published page or LLM file']);
    });

    it('fills in placeholders and reports unknown ones', () => {
        const { text, problems } = render('Engine {{ENGINE_VERSION}} and {{UNKNOWN}}');
        assert.equal(text, 'Engine 2.22.3 and {{UNKNOWN}}');
        assert.deepEqual(problems, ['llms/user-manual/engine/llms.txt: no value for {{UNKNOWN}}']);
    });

    it('lists the other covered pages after the file of all its pages', () => {
        const { text } = render('## Optional\n\n{{OTHER_PAGES}}', {
            others: [docs[2], docs[3]],
            bundle: { pages: 4, bytes: 5000 }
        });
        assert.equal(text, lines(
            '## Optional',
            '',
            '- [All pages of this index in one file](https://developer.playcanvas.com/user-manual/engine/llms-full.txt): 4 pages (5 KB), for downloading and searching rather than reading into context.',
            '- [Graphics](https://developer.playcanvas.com/user-manual/graphics.md)',
            '- [Shaders \\[WGSL\\]](https://developer.playcanvas.com/user-manual/graphics/shaders.md)'
        ));
    });

    it('reports an index over its budget', () => {
        const { problems } = render('x'.repeat(INDEX_BUDGET + 1));
        assert.equal(problems.length, 1);
        assert.match(problems[0], /over its 50 KB budget/);
    });
});

describe('the pages of an index', () => {
    it('are the pages it links, in order, then the other covered pages in reading order', () => {
        const { linked, others } = indexPages(index(lines(
            '- [Shaders](/user-manual/graphics/shaders/)',
            '- [Standalone](/user-manual/engine/standalone/)',
            '- [Editor](/user-manual/editor/)',
            '- [Shaders again](/user-manual/graphics/shaders/#glsl)'
        )), docs);
        assert.deepEqual(linked.map(d => d.urlPath), ['/user-manual/graphics/shaders/', '/user-manual/engine/standalone/', '/user-manual/editor/']);
        assert.deepEqual(others.map(d => d.urlPath), ['/user-manual/engine/', '/user-manual/graphics/']);
    });

    it('are grouped by the first path segment under the User Manual', () => {
        assert.equal(sectionOf('/user-manual/graphics/shaders/'), 'graphics');
        assert.equal(sectionOf('/user-manual/glossary/'), 'glossary');
        assert.equal(sectionOf('/user-manual/'), '');
    });
});

describe('loading indexes', () => {
    it('reads their front matter and where they are published, the root one first', () => {
        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'llms-indexes-'));
        fs.mkdirSync(path.join(dir, 'llms', 'user-manual', 'react'), { recursive: true });
        fs.writeFileSync(path.join(dir, 'llms', 'user-manual', 'react', 'llms.txt'), '---\ncovers: [react]\n---\n# PlayCanvas React\n\n> Declarative scenes.\n');
        fs.writeFileSync(path.join(dir, 'llms', 'llms.txt'), '# PlayCanvas\r\n\r\n> The hub.\r\n');

        const indexes = loadIndexes(dir, path.join(dir, 'llms'));
        fs.rmSync(dir, { recursive: true, force: true });

        assert.deepEqual(indexes.map(({ source, publishedPath, bundlePath, covers, title, summary }) => ({ source, publishedPath, bundlePath, covers, title, summary })), [
            { source: 'llms/llms.txt', publishedPath: '/llms.txt', bundlePath: null, covers: [], title: 'PlayCanvas', summary: 'The hub.' },
            { source: 'llms/user-manual/react/llms.txt', publishedPath: '/user-manual/react/llms.txt', bundlePath: '/user-manual/react/llms-full.txt', covers: ['react'], title: 'PlayCanvas React', summary: 'Declarative scenes.' }
        ]);
        assert.equal(indexes[1].body, '# PlayCanvas React\n\n> Declarative scenes.\n');
    });
});
