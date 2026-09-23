// utils/plugins/llms/test/markdown.test.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import { docIdFromFile, docPathFromId } from '../docs.mjs';
import { convertDoc } from '../markdown.mjs';

const fixturesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures');
const siteUrl = 'https://developer.playcanvas.com';

const lines = (...list) => list.join('\n');

/**
 * Convert a doc as fixtures/user-manual/section/page.md, published at /user-manual/section/page/
 */
function convert(source, options = {}) {
    return convertDoc(source, {
        filePath: path.join(fixturesDir, 'user-manual', 'section', 'page.md'),
        pageUrl: `${siteUrl}/user-manual/section/page/`,
        siteUrl,
        siteDir: fixturesDir,
        fileUrl: file => `${siteUrl}${docPathFromId(docIdFromFile(fixturesDir, file))}`,
        ...options
    });
}

describe('code blocks', () => {
    it('keeps import and export statements', () => {
        const code = lines(
            '```javascript',
            "import { Script } from 'playcanvas';",
            '',
            'export class Rotator extends Script {',
            "    static scriptName = 'rotator';",
            '}',
            '```'
        );
        assert.equal(convert(lines("import Tabs from '@theme/Tabs';", '', code)).markdown, code);
    });

    it('keeps JSX', () => {
        const code = lines(
            '```jsx',
            'export const Scene = () => (',
            "    <Entity name='camera' position={[4, 1, 4]}>",
            "        <Camera clearColor='#090707' fov={28} />",
            '    </Entity>',
            ');',
            '```'
        );
        assert.equal(convert(code).markdown, code);
    });

    it('keeps blank lines and comments', () => {
        const code = lines('```html', '<!-- an HTML comment -->', '', '', '', '<pc-app></pc-app>', '```');
        assert.equal(convert(code).markdown, code);
    });

    it('keeps custom heading id syntax', () => {
        const code = lines('```md', '## Setting Up {#setting-up}', '```');
        assert.equal(convert(code).markdown, code);
    });
});

describe('MDX syntax', () => {
    it('removes imports, exports and comments', () => {
        const { markdown } = convert(lines(
            "import Tabs from '@theme/Tabs';",
            'export const answer = 42;',
            '',
            '<!-- screenshot: the editor -->',
            '',
            '{/* a JSX comment */}',
            '',
            'Text'
        ));
        assert.equal(markdown, 'Text');
    });

    it('removes custom heading ids', () => {
        assert.equal(convert('## Setting Up {#setting-up}').markdown, '## Setting Up');
    });

    it('normalizes Windows line endings', () => {
        const source = lines('# Title', '', '```js', 'const a = 1;', '```');
        assert.deepEqual(convert(source.replace(/\n/g, '\r\n')), convert(source));
    });
});

describe('components', () => {
    it('renders tabs as labelled sections', () => {
        const { markdown } = convert(lines(
            '<Tabs groupId="script-code">',
            '<TabItem value="esm" label="ESM">',
            '',
            '```javascript',
            "import { Script } from 'playcanvas';",
            '```',
            '',
            '</TabItem>',
            '<TabItem value="classic" label="Classic">',
            '',
            '```javascript',
            "var Rotate = pc.createScript('rotate');",
            '```',
            '',
            '</TabItem>',
            '</Tabs>'
        ));
        assert.equal(markdown, lines(
            '**ESM**',
            '',
            '```javascript',
            "import { Script } from 'playcanvas';",
            '```',
            '',
            '**Classic**',
            '',
            '```javascript',
            "var Rotate = pc.createScript('rotate');",
            '```'
        ));
    });

    it('moves indented tab content to the left margin', () => {
        const { markdown } = convert(lines(
            '<Tabs>',
            '  <TabItem value="jsx" label="JSX">',
            '',
            '  ```jsx title="app.jsx"',
            '  <Application />',
            '  ```',
            '',
            '  </TabItem>',
            '</Tabs>'
        ));
        assert.equal(markdown, lines('**JSX**', '', '```jsx title="app.jsx"', '<Application />', '```'));
    });

    it('keeps a component inside a list item', () => {
        const { markdown } = convert(lines(
            '1. Add a script:',
            '',
            '   <Tabs>',
            '   <TabItem value="esm" label="ESM">',
            '',
            '   ```js',
            '   update();',
            '   ```',
            '',
            '   </TabItem>',
            '   </Tabs>',
            '',
            '2. Launch the app.'
        ));
        assert.equal(markdown, lines(
            '1. Add a script:',
            '',
            '   **ESM**',
            '',
            '   ```js',
            '   update();',
            '   ```',
            '',
            '2. Launch the app.'
        ));
    });

    it('inlines the full source of code examples', () => {
        const { markdown, problems } = convert(lines(
            "import { CodeExample } from '@site/src/components/playcanvas-react/CodeExample';",
            "import ExampleSource from '!!raw-loader!./example';",
            '',
            '<CodeExample label="A camera" code={ExampleSource} showDemo>',
            '  <Application>',
            '    <Example />',
            '  </Application>',
            '</CodeExample>'
        ));
        const source = fs.readFileSync(path.join(fixturesDir, 'user-manual', 'section', 'example.jsx'), 'utf-8').replace(/\r\n?/g, '\n');
        assert.deepEqual(problems, []);
        assert.equal(markdown, lines('**A camera**', '', '```jsx title="example.jsx"', source.trimEnd(), '```'));
    });

    it('reports code examples whose code cannot be found', () => {
        const { markdown, problems } = convert('<CodeExample label="Missing" code={MissingSource}><Demo /></CodeExample>');
        assert.equal(markdown, '');
        assert.equal(problems.length, 1);
    });

    it('links engine examples to the Examples Browser and their source', () => {
        assert.equal(
            convert('<EngineExample id="xr/ar-hit-test" title="View Live Example" />').markdown,
            '[Live example: AR Hit Test](https://playcanvas.com/examples/#/xr/ar-hit-test) ' +
            '([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/xr/ar-hit-test.example.mjs))'
        );
        assert.equal(
            convert('<EngineExample title="PlayCanvas Engine Examples Browser" />').markdown,
            '[PlayCanvas Engine Examples Browser](https://playcanvas.com/examples)'
        );
    });

    it('summarizes images, videos and embedded pages', () => {
        const { markdown } = convert(lines(
            '![The inspector](/img/inspector.png)',
            '',
            '<img loading="lazy" alt="The hierarchy" src="/img/hierarchy.png" />',
            '',
            '<video autoPlay muted loop src="/video/demo.mp4" style={{width: \'100%\'}} />',
            '',
            '<div className="iframe-container">',
            '    <iframe src="https://playcanv.as/p/abc/" title="Simple App" allowfullscreen></iframe>',
            '</div>',
            '',
            '<iframe src="https://www.youtube.com/embed/xyz" title="Walkthrough"></iframe>'
        ));
        assert.equal(markdown, lines(
            '[Image: The inspector]',
            '',
            '[Image: The hierarchy]',
            '',
            '[Video](https://developer.playcanvas.com/video/demo.mp4)',
            '',
            '[Interactive demo: Simple App](https://playcanv.as/p/abc/)',
            '',
            '[Video: Walkthrough](https://www.youtube.com/embed/xyz)'
        ));
    });

    it('renders link cards as a link and a description', () => {
        const { markdown } = convert(lines(
            '<Link className="card" to="/user-manual/supersplat/viewer/">',
            '  <div className="card__header"><h3>Embed the Viewer</h3></div>',
            '  <div className="card__body"><p>Host splats on your own site.</p></div>',
            '</Link>'
        ));
        assert.equal(markdown, '[Embed the Viewer](https://developer.playcanvas.com/user-manual/supersplat/viewer/): Host splats on your own site.');
    });

    it('drops icon glyphs and the space after them', () => {
        assert.equal(convert('Click **<span class="pc-icon">&#57632;</span> Add** to add one.').markdown, 'Click **Add** to add one.');
    });

    it('renders details as a bold summary and the content', () => {
        const { markdown } = convert(lines(
            '<details>',
            '  <summary><b>Parameters</b></summary>',
            '',
            'The parameters.',
            '',
            '</details>'
        ));
        assert.equal(markdown, lines('**Parameters**', '', 'The parameters.'));
    });

    it('keeps other HTML as written', () => {
        assert.equal(convert('Press <kbd>Ctrl</kbd> + <kbd>S</kbd>.').markdown, 'Press <kbd>Ctrl</kbd> + <kbd>S</kbd>.');
    });

    it('drops live demos', () => {
        assert.equal(convert(lines('Before', '', '<PlayCanvasReactExample />', '', 'After')).markdown, lines('Before', '', 'After'));
    });

    it('renders typed code blocks as property tables', () => {
        const typedoc = () => [{
            name: '$',
            entries: [
                { name: 'type', optional: true, defaultValue: '"directional"', type: { displayName: '"directional" | "omni"' }, description: 'The type\nof the light.' }
            ]
        }];
        const { markdown } = convert(lines('```tsx asTypedoc', 'export default $;', '```'), { typedoc });
        assert.equal(markdown, lines(
            '| Name | Type | Default | Description |',
            '| --- | --- | --- | --- |',
            '| `type?` | `"directional" \\| "omni"` | `"directional"` | The type of the light. |'
        ));
    });
});

describe('links', () => {
    it('resolves links the way the site does', () => {
        const { markdown } = convert(lines(
            '[Markdown file](../other/guide.md#setup)',
            '[Index file](../other/index.md)',
            '[Relative page](sibling/)',
            '[Parent page](../)',
            '[Site page](/user-manual/engine/)',
            '[Anchor](#usage)',
            '[External](https://github.com/playcanvas/engine)',
            '[Static](pathname:///downloads/file.zip)',
            '[Reference][ref]',
            '',
            '[ref]: ./sibling.md'
        ));
        assert.equal(markdown, lines(
            '[Markdown file](https://developer.playcanvas.com/user-manual/other/guide/#setup)',
            '[Index file](https://developer.playcanvas.com/user-manual/other/)',
            '[Relative page](https://developer.playcanvas.com/user-manual/section/page/sibling/)',
            '[Parent page](https://developer.playcanvas.com/user-manual/section/)',
            '[Site page](https://developer.playcanvas.com/user-manual/engine/)',
            '[Anchor](https://developer.playcanvas.com/user-manual/section/page/#usage)',
            '[External](https://github.com/playcanvas/engine)',
            '[Static](https://developer.playcanvas.com/downloads/file.zip)',
            '[Reference][ref]',
            '',
            '[ref]: https://developer.playcanvas.com/user-manual/section/sibling/'
        ));
    });

    it('labels images inside links without nesting brackets', () => {
        const { markdown } = convert(lines(
            '[![Lightmapping](/img/scene.jpg)](https://playcanv.as/p/abc/)',
            '',
            '[![](/img/scene.jpg)](../other/page.md)'
        ));
        assert.equal(markdown, lines(
            '[Image: Lightmapping](https://playcanv.as/p/abc/)',
            '',
            '[Image](https://developer.playcanvas.com/user-manual/other/page/)'
        ));
    });
});

describe('metadata', () => {
    it('reads the front matter, the title and the first paragraph', () => {
        const doc = convert(lines(
            '---',
            'title: Front Matter Title',
            'tags: [a, b]',
            '---',
            '',
            "import X from 'y';",
            '',
            '# The `<Camera/>` Component {#camera}',
            '',
            '![Diagram](/img/diagram.png)',
            '',
            ':::tip Not a directive',
            '',
            'Tip text.',
            '',
            ':::',
            '',
            'The first *real* paragraph.'
        ));
        assert.deepEqual(doc.frontMatter, { title: 'Front Matter Title', tags: ['a', 'b'] });
        assert.equal(doc.title, 'The `<Camera/>` Component');
        assert.equal(doc.firstParagraph, 'The first real paragraph.');
    });
});
