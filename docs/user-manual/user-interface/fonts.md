---
title: Fonts
description: Create the MSDF Font assets that text elements need — in the Editor, or with the standalone font-tools for Engine, React and Web Components projects.
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** Create the MSDF Font assets that text elements need — in the Editor, or with the standalone font-tools for Engine, React and Web Components projects; capture the viewport and launched interface, exercising pointer input when relevant.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Upload Font assets, inspect or modify their asset data, replace references, and delete or download them from the open project; capture the viewport and launched interface, exercising pointer input when relevant.

:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A [Text Element](/user-manual/user-interface/text-elements) renders its string using a **Font asset** — a multi-channel signed distance field (MSDF) atlas made up of a `.json` file (glyph metrics) and one or more `.png` texture pages. Because the glyphs are stored as distance fields rather than fixed-size bitmaps, a single Font asset stays crisp at any size, so you only need one asset per typeface.

This page covers the two ways to create a Font asset and how to load one in each runtime.

## Creating a Font asset

### In the Editor

Drag a `.ttf`, `.ttc`, `.otf` or `.dfont` file into the Editor and it is converted to an MSDF Font asset automatically. You choose which characters to include and tune the result, then click **Process Font** to regenerate. See the [Font asset inspector](/user-manual/editor/assets/inspectors/font) for the full list of options.

### Without the Editor — font-tools

If you are building with the Engine, React or Web Components — without the Editor — use [**font-tools**](https://github.com/playcanvas/font-tools) to generate the same `.json` + `.png` asset the Editor produces. There are two ways to use it:

- **Web app** — Open [playcanvas.github.io/font-tools](https://playcanvas.github.io/font-tools/), drag in a TTF or OTF, choose a character set and glyph size, preview the result in live PlayCanvas text, and download the files. Everything runs in your browser — your font is never uploaded.
- **Command line** — Generate an asset without leaving your terminal:

  ```bash
  npx @playcanvas/font-tools MyFont.ttf --charset latin-ext -o assets/fonts/myfont
  ```

  This writes `myfont.json` and `myfont.png` (large character sets spill onto additional pages: `myfont1.png`, `myfont2.png`, and so on).

:::note Open Source

font-tools is [open-sourced under an MIT license on GitHub](https://github.com/playcanvas/font-tools). See the README for the full list of CLI options and the JavaScript API for generating fonts programmatically.

:::

## Using a Font asset

Keep the `.json` and its `.png` page(s) together, with the same base name — the loader derives the texture URLs from the JSON URL and fetches the pages automatically.

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// myfont.json + myfont.png (from font-tools) sit side by side;
// loading the .json pulls in the .png page(s) automatically.
const asset = new pc.Asset('myfont', 'font', { url: '/assets/fonts/myfont.json' });
app.assets.add(asset);

asset.ready(() => {
    // A 2D screen to hold the text
    const screen = new pc.Entity('screen');
    screen.addComponent('screen', { screenSpace: true });
    app.root.addChild(screen);

    const text = new pc.Entity('text');
    text.addComponent('element', {
        type: 'text',
        fontAsset: asset.id,
        text: 'Hello, World!',
        fontSize: 32,
        anchor: [0.5, 0.5, 0.5, 0.5],
        pivot: [0.5, 0.5]
    });
    screen.addChild(text);
});

app.assets.load(asset);
```

</TabItem>
<TabItem value="editor" label="Editor">

No loading code is required. Drag the Font asset onto the **Font** slot of a Text [Element component](/user-manual/editor/scenes/components/element#text-element), as described in [Text Elements](/user-manual/user-interface/text-elements).

</TabItem>
<TabItem value="react" label="React">

In [PlayCanvas React](/user-manual/react), font-tools is the standalone alternative to the build-time `?sdf` conversion offered by the [`@playcanvas/rollup`](https://www.npmjs.com/package/@playcanvas/plugin) plugin. Load the generated `.json` with [`useFont`](/user-manual/react/api/hooks/use-asset#usefont), then assign it to a text [`<Element>`](/user-manual/react/api/element) inside a [`<Screen>`](/user-manual/react/api/screen):

```tsx
import { Entity } from '@playcanvas/react';
import { Screen, Element } from '@playcanvas/react/components';
import { useFont } from '@playcanvas/react/hooks';

function Label() {
  const { asset } = useFont('/assets/fonts/myfont.json');
  if (!asset) return null;

  return (
    <Entity>
      <Screen />
      <Entity>
        <Element type="text" fontAsset={asset} text="Hello, World!" fontSize={32} />
      </Entity>
    </Entity>
  );
}
```

See [Loading Assets](/user-manual/react/guide/loading-assets) for handling `loading` and `error` states.

</TabItem>
<TabItem value="web-components" label="Web Components">

Declare the asset with `type="font"` (the `.json` extension would otherwise be treated as a plain JSON asset), then reference it by `id` from a text [`<pc-element>`](/user-manual/web-components/tags/pc-element):

```html
<pc-app>
  <!-- font-tools output: fonts/myfont.json + fonts/myfont.png -->
  <pc-asset id="myfont" type="font" src="fonts/myfont.json"></pc-asset>

  <pc-entity>
    <pc-screen screen-space>
      <pc-entity>
        <pc-element type="text" asset="myfont" text="Hello, World!" font-size="32"></pc-element>
      </pc-entity>
    </pc-screen>
  </pc-entity>
</pc-app>
```

</TabItem>
</Tabs>
