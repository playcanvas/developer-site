// utils/plugins/tutorials/test/data.test.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import { tutorialsSidebarItems } from '../../docusaurus-plugin-tutorials.mjs';
import { KINDS, THUMBS_PATH, TOPICS, loadTutorials, projectIdOf, thumbnailPath } from '../data.mjs';
import { readFrontMatter } from '../../llms/markdown.mjs';

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..');
const tutorials = loadTutorials(siteDir);

// The docs as Docusaurus hands them to the sidebar generator, plus one outside tutorials/
const docs = [
    ...[...tutorials.keys()].map((id) => ({ id, sourceDirName: 'tutorials' })),
    { id: 'user-manual/index', sourceDirName: 'user-manual' }
];
const sidebar = tutorialsSidebarItems({ docs, version: { contentPath: path.join(siteDir, 'docs') } });

/**
 * Writes a site with one tutorial page to a temporary directory.
 *
 * @param {string} frontMatter - The page's front matter lines.
 * @returns {string} The site directory.
 */
function siteWithPage(frontMatter) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tutorials-test-'));
    fs.mkdirSync(path.join(dir, 'docs/tutorials'), { recursive: true });
    fs.mkdirSync(path.join(dir, 'utils/plugins/tutorials'), { recursive: true });
    fs.writeFileSync(path.join(dir, 'docs/tutorials/page.md'), `---\ntitle: Page\n${frontMatter}\n---\n\nText.\n`);
    fs.writeFileSync(path.join(dir, 'utils/plugins/tutorials/plays.json'), '{}');
    fs.writeFileSync(path.join(dir, 'utils/plugins/tutorials/thumbs.json'), '{}');
    return dir;
}

describe('tutorial front matter', () => {
    it('gives every page a known kind and topic', () => {
        // loadTutorials throws on the first run of problems, so reaching here means none
        assert.ok(tutorials.size > 0);
        for (const { kind, topic } of tutorials.values()) {
            assert.ok(KINDS.includes(kind));
            assert.ok(TOPICS.includes(topic));
        }
    });

    it('rejects a missing or misspelled kind or topic, naming the file', () => {
        assert.throws(() => loadTutorials(siteWithPage('kind: sample')), /docs\/tutorials\/page\.md: topic is undefined/);
        assert.throws(() => loadTutorials(siteWithPage('kind: example\ntopic: Physics')), /page\.md: kind is "example"/);
        assert.throws(() => loadTutorials(siteWithPage('kind: sample\ntopic: Camera')), /page\.md: topic is "Camera"/);
        assert.equal(loadTutorials(siteWithPage('kind: sample\ntopic: Cameras')).get('tutorials/page').kind, 'sample');
    });

    it('has a play count for every page and none for pages that are gone', () => {
        const plays = JSON.parse(fs.readFileSync(path.join(siteDir, 'utils/plugins/tutorials/plays.json'), 'utf8'));
        const slugs = [...tutorials.keys()].map((id) => id.replace(/^tutorials\//, '')).sort();
        assert.deepEqual(Object.keys(plays).sort(), slugs, 'run `npm run sync:tutorial-plays`');
    });
});

describe('tutorial thumbnails', () => {
    const JA_DIR = 'i18n/ja/docusaurus-plugin-content-docs/current/tutorials';
    const thumbs = JSON.parse(fs.readFileSync(path.join(siteDir, THUMBS_PATH), 'utf8'));
    const pages = fs.readdirSync(path.join(siteDir, 'docs/tutorials')).filter((file) => /\.mdx?$/.test(file));
    const thumbOf = (file) => String(readFrontMatter(fs.readFileSync(file, 'utf8'), file).thumb ?? '');

    it('gives every page a thumbnail stored on this site, the same in English and Japanese', () => {
        for (const file of pages) {
            const thumb = thumbOf(path.join(siteDir, 'docs/tutorials', file));
            assert.match(thumb, /^\/img\//, `${file}: thumb must be a file in static/, not ${thumb}`);
            assert.ok(fs.existsSync(path.join(siteDir, 'static', thumb)), `${file}: ${thumb} does not exist`);
            assert.equal(thumbOf(path.join(siteDir, JA_DIR, file)), thumb, `${file}: the Japanese thumb differs`);
        }
    });

    it('lists only existing pages in thumbs.json, each using its copy of the project thumbnail', () => {
        const slugs = pages.map((file) => file.replace(/\.mdx?$/, ''));
        for (const [slug, { project, source }] of Object.entries(thumbs)) {
            assert.ok(slugs.includes(slug), `thumbs.json: ${slug} is not a tutorial page`);
            assert.match(project, /^\d+$/, `thumbs.json: ${slug} needs a project ID`);
            assert.match(source, /^https:\/\//, `thumbs.json: ${slug} needs the source image URL`);
            const file = pages.find((page) => page.replace(/\.mdx?$/, '') === slug);
            assert.equal(thumbOf(path.join(siteDir, 'docs/tutorials', file)), `/${thumbnailPath(slug)}`);
        }
    });

    it('takes a page\'s project from its first project link, then from its thumbnail', () => {
        const link = 'Open the [project](https://playcanvas.com/project/123/overview/name).';
        assert.equal(projectIdOf(link, { project: '456' }), '123');
        assert.equal(projectIdOf('No link.', { project: '456' }), '456');
        assert.equal(projectIdOf('No link.', undefined), null);
    });
});

describe('tutorials sidebar', () => {
    const kinds = sidebar.filter((item) => item.type === 'category');
    const topics = kinds.flatMap((kind) => kind.items);

    it('lists every tutorial page once and nothing else', () => {
        const ids = topics.flatMap((topic) => topic.items.map((item) => item.id));
        assert.deepEqual([...ids].sort(), [...tutorials.keys()].sort());
    });

    it('starts with a link to the index page and has a group for each kind', () => {
        assert.deepEqual(sidebar[0], { type: 'link', label: 'Browse All', key: 'tutorials-browse-all', href: '/tutorials/' });
        assert.deepEqual(kinds.map((kind) => kind.label), ['Tutorials', 'Sample Projects']);
    });

    it('keeps topics in the order of TOPICS and leaves out empty ones', () => {
        for (const kind of kinds) {
            const labels = kind.items.map((topic) => topic.label);
            assert.deepEqual(labels, TOPICS.filter((topic) => labels.includes(topic)));
            assert.ok(kind.items.every((topic) => topic.items.length > 0));
        }
    });

    it('fails when a doc has no file or a file has no doc', () => {
        const version = { contentPath: path.join(siteDir, 'docs') };
        const extra = [...docs, { id: 'tutorials/not-a-file', sourceDirName: 'tutorials' }];
        assert.throws(() => tutorialsSidebarItems({ docs: extra, version }), /Docs with no file: tutorials\/not-a-file/);
        assert.throws(() => tutorialsSidebarItems({ docs: docs.slice(1), version }), /Files with no doc: tutorials\//);
    });

    it('has a Japanese label for every link and category', () => {
        const labels = JSON.parse(fs.readFileSync(
            path.join(siteDir, 'i18n/ja/docusaurus-plugin-content-docs/current.json'), 'utf8'
        ));
        const keys = [
            `sidebar.tutorialsSidebar.link.${sidebar[0].key}`,
            ...[...kinds, ...topics].map((category) => `sidebar.tutorialsSidebar.category.${category.key}`)
        ];
        assert.equal(new Set(keys).size, keys.length, 'sidebar keys must be unique');
        assert.deepEqual(keys.filter((key) => !labels[key]), []);
    });
});
