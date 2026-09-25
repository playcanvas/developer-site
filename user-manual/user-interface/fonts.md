# Fonts

A [text element](https://developer.playcanvas.com/user-manual/user-interface/text-elements.md) draws its text with a **font asset**: a multi-channel signed distance field (MSDF) atlas, made of a `.json` file that describes the glyphs and one or more `.png` texture pages that hold them. The glyphs are stored as distance fields rather than as pixels, so one font asset stays sharp at any size, and one asset per typeface is enough.

## Creating a Font Asset

### In the Editor

Upload a `.ttf`, `.ttc`, `.otf` or `.dfont` file. The Editor generates the font asset in your browser, in a folder that holds the source file, the `.json` file, the `.png` texture pages and the font asset itself.

Select the font asset to choose its characters in the inspector. **CHARACTER PRESETS** adds whole sets of characters (**Latin**, **Latin Supplement**, **Cyrillic** and **Greek**), **CUSTOM CHARACTER RANGE** adds a range of Unicode code points given in hex, and the **Characters** field lists every character the asset will hold. Click **REGENERATE FONT ASSETS** to build the asset again with them. If the font file lacks some of the characters, the inspector lists them, with buttons to copy each character or its code.

A font created by an older version of the Editor is converted to the current format the first time you regenerate it, which can't be undone. See the [Font asset inspector](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/font.md) for the other options.

### With font-tools

Without the Editor, create font assets with [font-tools](https://github.com/playcanvas/font-tools), the generator that the Editor itself uses:

- **Web app.** Open [playcanvas.github.io/font-tools](https://playcanvas.github.io/font-tools/), drop in a TTF or OTF file, choose the characters and the glyph size, preview the result as real PlayCanvas text, and download the files. Everything runs in your browser, and your font is never uploaded.
- **Command line.** Generate an asset from a terminal:

  ```bash
  npx @playcanvas/font-tools MyFont.ttf --charset latin-ext -o assets/fonts/myfont
  ```

  This writes `myfont.json` and `myfont.png`. Large character sets spill onto more pages: `myfont1.png`, `myfont2.png` and so on.

| Option | Default | Effect |
| --- | --- | --- |
| `-o`, `--out <path>` | The font's name | The output path, without the extension |
| `--charset <spec>` | `ascii` | A preset (`ascii`, `latin`, `latin-ext`, `cyrillic` or `greek`), or the characters themselves |
| `--size <px>` | `64` | The size of each glyph's cell in the atlas |
| `--pxrange <px>` | `8` | The distance range of the MSDF, in pixels |
| `--name <face>` | The output name | The face name written into the `.json` file |
| `--no-kerning` | Kerning on | Leaves out kerning |

font-tools reads the kerning pairs of a font by default, and the Editor does not, so text in a font-tools asset is spaced a little more tightly. font-tools is open source under the MIT license, and also has a JavaScript API for generating fonts in your own tools.

## Choosing Characters

A font asset holds only the characters it was created with, and a text element draws any other character as a space, with a warning in the console. Include every character your text uses: accented letters, punctuation such as `“”` and `…`, currency symbols, and the characters of every language you [localize](https://developer.playcanvas.com/user-manual/user-interface/localization.md) into.

Each character takes space in the texture pages, so thousands of characters, as Chinese, Japanese and Korean text needs, make a large asset that takes longer to load. Include the characters your text actually uses, rather than whole scripts, and give each language its own [localized font](https://developer.playcanvas.com/user-manual/user-interface/localization.md#localized-fonts) if the sets differ a lot.

## Using a Font Asset

Keep the `.json` file and its `.png` pages together, with the same base name. The loader works out the URLs of the pages from the URL of the `.json` file and loads them too.

**Engine**

```javascript
// Loading myfont.json also loads myfont.png, and any further pages
const font = new pc.Asset('myfont', 'font', { url: 'fonts/myfont.json' });
app.assets.add(font);
await new Promise((resolve) => {
    font.ready(resolve);
    app.assets.load(font);
});

const label = new pc.Entity('label');
label.addComponent('element', {
    type: pc.ELEMENTTYPE_TEXT,
    fontAsset: font.id,
    text: 'Hello, World!',
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5]
});
screen.addChild(label);
```

Register `pc.FontHandler` when you create the application, so that it can load font assets.

**Editor**

No loading code is needed. Drag the font asset onto the **Font** field of a text element. See [Text Elements](https://developer.playcanvas.com/user-manual/user-interface/text-elements.md).

**React**

Load the `.json` file with [`useFont`](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usefont), and give the asset to a text [`<Element>`](https://developer.playcanvas.com/user-manual/react/api/element.md):

```jsx
import { Entity } from '@playcanvas/react';
import { Element } from '@playcanvas/react/components';
import { useFont } from '@playcanvas/react/hooks';

export function Label() {
  const { asset: font } = useFont('fonts/myfont.json');
  if (!font) return null;

  return (
    <Entity name="label">
      <Element type="text" fontAsset={font} text="Hello, World!"
        anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]} />
    </Entity>
  );
}
```

See [Loading Assets](https://developer.playcanvas.com/user-manual/react/guide/loading-assets.md) for handling the `loading` and `error` states.

**Web Components**

Declare the asset with `type="font"`, as a `.json` file would otherwise be loaded as plain JSON, and refer to it by its `id`:

```html
<pc-app>
    <pc-asset id="myfont" type="font" src="fonts/myfont.json"></pc-asset>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera></pc-camera>
        </pc-entity>
        <pc-entity name="screen">
            <pc-screen screen-space scale-mode="blend" reference-resolution="1280 720"></pc-screen>
            <pc-entity name="label">
                <pc-element type="text" font-asset="myfont" text="Hello, World!"
                            anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"></pc-element>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## Emoji

MSDF glyphs have a single color, so a font asset can't draw color emoji. `pc.CanvasFont`, which is not yet in the API reference, draws characters with the browser's own fonts into textures instead, emoji included. It is a bitmap font: create it at a size at least as large as the text you draw with it, and add the characters you need before you use them:

```javascript
const emojiFont = new pc.CanvasFont(app, {
    fontName: 'Arial',
    fontSize: 64,
    color: new pc.Color(1, 1, 1),
    width: 256,
    height: 256
});
emojiFont.createTextures('Well done! 🎉');

const message = new pc.Entity('message');
message.addComponent('element', {
    type: pc.ELEMENTTYPE_TEXT,
    text: 'Well done! 🎉',
    fontSize: 32,
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5]
});
message.element.font = emojiFont;
screen.addChild(message);
```

The first call to `createTextures` creates the font's textures. Before you set text with characters the textures don't have yet, add the characters with `updateTextures`.

[Live example: Text Emojis](https://playcanvas.com/examples/#/user-interface/text-emojis) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/user-interface/text-emojis.example.mjs))

## See Also

- [Text Elements](https://developer.playcanvas.com/user-manual/user-interface/text-elements.md) - Drawing, wrapping, fitting and styling text
- [Localization](https://developer.playcanvas.com/user-manual/user-interface/localization.md) - Translated text, and fonts for each language
- [Font asset inspector](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/font.md) - Every option of a font asset in the Editor
- [font-tools](https://github.com/playcanvas/font-tools) - The font generator's source, command line options and API
