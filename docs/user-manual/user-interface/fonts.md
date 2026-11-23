---
title: Fonts
description: Create the MSDF font assets that text elements need, in the Editor or with font-tools, choose the characters they hold, load them in the Engine, React and Web Components, and draw emoji.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A [text element](/user-manual/user-interface/text-elements/) draws its text with a **font asset**: a multi-channel signed distance field (MSDF) atlas, made of a `.json` file that describes the glyphs and one or more `.png` texture pages that hold them. The glyphs are stored as distance fields rather than as pixels, so one font asset stays sharp at any size, and one asset per typeface is enough.

## Creating a Font Asset {#creating-a-font-asset}

### In the Editor {#in-the-editor}

Upload a `.ttf`, `.ttc`, `.otf` or `.dfont` file. The Editor generates the font asset in your browser, in a folder that holds the source file, the `.json` file, the `.png` texture pages and the font asset itself.

Select the font asset to choose its characters in the inspector. **CHARACTER PRESETS** adds whole sets of characters (**Latin**, **Latin Supplement**, **Cyrillic** and **Greek**), **CUSTOM CHARACTER RANGE** adds a range of Unicode code points given in hex (see [Character Ranges](#character-ranges)), and the **Characters** field lists every character the asset will hold. Click **REGENERATE FONT ASSETS** to build the asset again with them. If the font file lacks some of the characters, the inspector lists them, with buttons to copy each character or its code.

A font created by an older version of the Editor is converted to the current format the first time you regenerate it, which can't be undone. See the [Font asset inspector](/user-manual/editor/assets/inspectors/font/) for the other options.

### With font-tools {#font-tools}

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

## Choosing Characters {#choosing-characters}

A font asset holds only the characters it was created with, and a text element draws any other character as a space, with a warning in the console. Include every character your text uses: accented letters, punctuation such as `“”` and `…`, currency symbols, and the characters of every language you [localize](/user-manual/user-interface/localization/) into.

Each character takes space in the texture pages, so thousands of characters, as Chinese, Japanese and Korean text needs, make a large asset that takes longer to load. Include the characters your text actually uses, rather than whole scripts, and give each language its own [localized font](/user-manual/user-interface/localization/#localized-fonts) if the sets differ a lot.

### Character Ranges {#character-ranges}

Unicode groups characters into blocks of consecutive code points. These blocks hold the characters that font assets most often need:

| Block | From | To | Characters |
| --- | --- | --- | --- |
| Basic Latin | `0x0020` | `0x007E` | English letters, digits, punctuation and the space |
| Latin-1 Supplement | `0x00A0` | `0x00FF` | Accented letters of Western European languages, such as é, ñ and ü, and symbols such as ©, ° and £ |
| Latin Extended-A | `0x0100` | `0x017F` | Letters of Central European languages and Turkish, such as č, ł, ő and ğ |
| Latin Extended-B | `0x0180` | `0x024F` | More Latin letters, such as Romanian ș and ț, and Vietnamese ơ and ư |
| Greek and Coptic | `0x0370` | `0x03FF` | Greek |
| Cyrillic | `0x0400` | `0x04FF` | Russian, Ukrainian, Bulgarian, Serbian and other languages written in Cyrillic |
| Hebrew | `0x0590` | `0x05FF` | Hebrew |
| Arabic | `0x0600` | `0x06FF` | Arabic letters, digits and punctuation |
| Latin Extended Additional | `0x1E00` | `0x1EFF` | Vietnamese letters with two marks, such as ế and ộ |
| General Punctuation | `0x2000` | `0x206F` | Curly quotes, dashes, the ellipsis and the bullet: “ ” ‘ ’ – — … • |
| Currency Symbols | `0x20A0` | `0x20CF` | €, ₹, ₩ and ₽. The $ sign is in Basic Latin, and £ and ¥ are in Latin-1 Supplement |
| CJK Symbols and Punctuation | `0x3000` | `0x303F` | Chinese and Japanese punctuation, such as 、。「」 |
| Hiragana | `0x3040` | `0x309F` | Japanese hiragana |
| Katakana | `0x30A0` | `0x30FF` | Japanese katakana, and the long vowel mark ー |
| CJK Unified Ideographs | `0x4E00` | `0x9FFF` | Chinese characters, Japanese kanji and Korean hanja: 20,992 characters |
| Hangul Syllables | `0xAC00` | `0xD7AF` | Korean: 11,172 syllables |
| Arabic Presentation Forms-B | `0xFE70` | `0xFEFF` | The forms Arabic letters take at the start, middle and end of a word |
| Halfwidth and Fullwidth Forms | `0xFF00` | `0xFFEF` | Full-width punctuation common in Chinese and Japanese text, such as ！, ？ and （） |

To add a block in the Editor, enter its From and To values, `0x` prefix included, in the two fields under **CUSTOM CHARACTER RANGE**, and click **+**. The **Latin**, **Latin Supplement**, **Greek** and **Cyrillic** presets add Basic Latin, Latin-1 Supplement, Greek and Coptic, and Cyrillic. Every font-tools preset includes Basic Latin: `latin-ext` adds Latin-1 Supplement and Latin Extended-A, `greek` adds Greek and Coptic, and `cyrillic` adds Cyrillic. For other characters, give `--charset` the characters themselves. The [Unicode code charts](https://www.unicode.org/charts/) list every block, with a chart of its characters.

A font asset can hold characters that a text element can't draw correctly. Text elements draw each character's glyph on its own, without shaping the text: they don't join letters, form ligatures or position marks. Hebrew and Arabic run right to left, and Arabic letters change form to join their neighbors. The scripts in the [Right to Left Language Support](/tutorials/right-to-left-language-support/) tutorial reorder the text, and replace each Arabic letter with the form it takes in its word, from Arabic Presentation Forms-B, so a font asset for Arabic needs that block as well as Arabic. Scripts that need more shaping than that, such as Devanagari, Bengali and Tamil, don't render correctly however many of their characters a font asset holds.

## Using a Font Asset {#using-a-font-asset}

Keep the `.json` file and its `.png` pages together, with the same base name. The loader works out the URLs of the pages from the URL of the `.json` file and loads them too.

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// Loading myfont.json also loads myfont.png, and any further pages
const font = new Asset('myfont', 'font', { url: 'fonts/myfont.json' });
app.assets.add(font);
await new Promise((resolve) => {
    font.ready(resolve);
    app.assets.load(font);
});

const label = new Entity('label');
label.addComponent('element', {
    type: ELEMENTTYPE_TEXT,
    fontAsset: font.id,
    text: 'Hello, World!',
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5]
});
screen.addChild(label);
```

Register `FontHandler` when you create the application, so that it can load font assets.

</TabItem>
<TabItem value="editor" label="Editor">

No loading code is needed. Drag the font asset onto the **Font** field of a text element. See [Text Elements](/user-manual/user-interface/text-elements/).

</TabItem>
<TabItem value="react" label="React">

Load the `.json` file with [`useFont`](/user-manual/react/api/hooks/use-asset/#usefont), and give the asset to a text [`<Element>`](/user-manual/react/api/element/):

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

See [Loading Assets](/user-manual/react/guide/loading-assets/) for handling the `loading` and `error` states.

</TabItem>
<TabItem value="web-components" label="Web Components">

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

</TabItem>
</Tabs>

## Emoji {#emoji}

MSDF glyphs have a single color, so a font asset can't draw color emoji. `CanvasFont`, which is not yet in the API reference, draws characters with the browser's own fonts into textures instead, emoji included. It is a bitmap font: create it at a size at least as large as the text you draw with it, and add the characters you need before you use them:

```javascript
const emojiFont = new CanvasFont(app, {
    fontName: 'Arial',
    fontSize: 64,
    color: new Color(1, 1, 1),
    width: 256,
    height: 256
});
emojiFont.createTextures('Well done! 🎉');

const message = new Entity('message');
message.addComponent('element', {
    type: ELEMENTTYPE_TEXT,
    text: 'Well done! 🎉',
    fontSize: 32,
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5]
});
message.element.font = emojiFont;
screen.addChild(message);
```

The first call to `createTextures` creates the font's textures. Before you set text with characters the textures don't have yet, add the characters with `updateTextures`.

<EngineExample id="user-interface/text-emojis" title="Text Emojis" />

## See Also

- [Text Elements](/user-manual/user-interface/text-elements/) - Drawing, wrapping, fitting and styling text
- [Localization](/user-manual/user-interface/localization/) - Translated text, and fonts for each language
- [Font asset inspector](/user-manual/editor/assets/inspectors/font/) - Every option of a font asset in the Editor
- [font-tools](https://github.com/playcanvas/font-tools) - The font generator's source, command line options and API
