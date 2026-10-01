// utils/plugins/llms/test/docs.test.mjs
import assert from 'node:assert/strict';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import { docIdFromFile, docPathFromId, loadSidebarOrder, sidebarSortKey } from '../docs.mjs';

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..');
const docsDir = path.join(siteDir, 'docs');

describe('doc ids and URLs', () => {
    it('strips number prefixes like Docusaurus', () => {
        assert.equal(docIdFromFile(docsDir, path.join(docsDir, 'user-manual', '2D', '9-slicing.md')), 'user-manual/2D/slicing');
        assert.equal(docIdFromFile(docsDir, path.join(docsDir, 'user-manual', 'react', 'index.mdx')), 'user-manual/react/index');
    });

    it('serves index docs at their directory', () => {
        assert.equal(docPathFromId('user-manual/index'), '/user-manual/');
        assert.equal(docPathFromId('user-manual/getting-started/index'), '/user-manual/getting-started/');
        assert.equal(docPathFromId('user-manual/2D/slicing'), '/user-manual/2D/slicing/');
    });
});

describe('sidebar order', () => {
    it('numbers the docs of sidebars.js in reading order', async () => {
        const order = await loadSidebarOrder(path.join(siteDir, 'sidebars.js'));
        assert.equal(order.get('user-manual/index'), 0);
        assert.ok(order.get('user-manual/getting-started/index') < order.get('user-manual/getting-started/community'));
        assert.ok(order.has('user-manual/2D/slicing'));
    });

    it('places docs missing from the sidebars after their nearest siblings', () => {
        const order = new Map([['a/index', 0], ['a/b/one', 1], ['a/b/two', 2], ['c/index', 3]]);
        assert.equal(sidebarSortKey('a/b/two', order), 2);
        assert.equal(sidebarSortKey('a/b/orphan', order), 2.5);
        assert.equal(sidebarSortKey('a/orphan', order), 2.5);
        assert.equal(sidebarSortKey('z/orphan', order), Infinity);
    });
});
