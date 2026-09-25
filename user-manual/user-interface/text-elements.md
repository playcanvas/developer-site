# Text Elements

A text element draws a string with a [font asset](https://developer.playcanvas.com/user-manual/user-interface/fonts.md). Every label, title, score, line of dialogue and other piece of text in an in-canvas interface is a text element.

[Live example: Text](https://playcanvas.com/examples/#/user-interface/text) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/user-interface/text.example.mjs))

## Creating Text

**Engine**

```javascript
const title = new pc.Entity('title');
title.addComponent('element', {
    type: pc.ELEMENTTYPE_TEXT,
    fontAsset: font.id,
    text: 'Game Over',
    fontSize: 64,
    color: new pc.Color(1, 0.55, 0.2),
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5]
});
screen.addChild(title);
```

`font` is a font asset that has loaded. See [Using a Font Asset](https://developer.playcanvas.com/user-manual/user-interface/fonts.md#using-a-font-asset).

**Editor**

Select a screen or an element, click **+** in the Hierarchy and choose **User Interface › Text Element**. Set **Font** to a font asset, then set **Text**, **Font Size** and **Color**. In the **Text** field, press Shift+Enter to start a new line.

**React**

```jsx
<Entity name="title">
  <Element type="text" fontAsset={font} text="Game Over" fontSize={64} color="#ff8c33"
    anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]} />
</Entity>
```

`font` is the asset that [`useFont`](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usefont) returns.

**Web Components**

```html
<pc-entity name="title">
    <pc-element type="text" font-asset="arial" text="Game Over" font-size="64" color="#ff8c33"
                anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"></pc-element>
</pc-entity>
```

`arial` is the `id` of a `<pc-asset type="font">`.

A character that is not in the font is drawn as a space, and the engine logs a warning that names it. Include every character your text needs when you create the font asset. See [Choosing Characters](https://developer.playcanvas.com/user-manual/user-interface/fonts.md#choosing-characters).

## Size, Spacing and Alignment

| Property | Effect |
| --- | --- |
| `fontSize` | The height of the text, in screen units. 32 by default |
| `lineHeight` | The distance between the baselines of neighboring lines. A text element created with a `fontSize` but no `lineHeight` gets a line height equal to the font size. Changing `fontSize` later leaves `lineHeight` as it is |
| `spacing` | A multiplier for the distance between characters. 1 by default |
| `alignment` | Where the text sits inside the element, from `0, 0` at the bottom-left to `1, 1` at the top-right. `0.5, 0.5`, the default, centers it |

The alignment only shows when the element is larger than its text, such as a label with a fixed width, or wrapped lines of different lengths.

## Sizing, Wrapping and Line Limits

By default, a text element is sized to its text: **Auto Width** and **Auto Height** set its width and height to those of the text whenever the text changes. Turn them off to give the element a size of its own.

Text wraps onto new lines when **Wrap Lines** is on and the element has a width to wrap at: either **Auto Width** is off, or the element's anchor is [split horizontally](https://developer.playcanvas.com/user-manual/user-interface/elements.md#split-anchors), which gives it the width of its anchors. With Auto Height on, the element grows taller as lines are added.

```javascript
// A paragraph that wraps at 400 units and grows downwards from its top edge
paragraph.element.autoWidth = false;
paragraph.element.width = 400;
paragraph.element.wrapLines = true;
paragraph.element.pivot = new pc.Vec2(0.5, 1);
```

`maxLines` limits the number of lines. The text beyond the limit is not cut off: it continues on the last line, past the edge of the element, so combine a line limit with [shrinking to fit](https://developer.playcanvas.com/user-manual/user-interface/text-elements.md#shrinking-to-fit), or crop the overflow with a [mask](https://developer.playcanvas.com/user-manual/user-interface/masks.md). After the text is laid out, `lines` holds it as an array with one string per line.

## Shrinking to Fit

**Auto Fit Width** and **Auto Fit Height** shrink the font until the text fits the element, between a **Max Font Size** and a **Min Font Size**, 32 and 8 by default. Text that fits is drawn at the maximum size, and text that doesn't fit even at the minimum size is drawn at the minimum size and overflows. The line height shrinks along with the font.

Auto fitting only works on an axis whose auto size is off: Auto Fit Width needs **Auto Width** off, and Auto Fit Height needs **Auto Height** off. With auto size on, the element grows to fit the text instead.

```javascript
// Shrink a name to fit its 200 × 40 badge, down to 12 units if needed
badge.element.autoWidth = false;
badge.element.autoHeight = false;
badge.element.width = 200;
badge.element.height = 40;
badge.element.autoFitWidth = true;
badge.element.autoFitHeight = true;
badge.element.maxFontSize = 32;
badge.element.minFontSize = 12;
```

[Live example: Text Auto Font Size](https://playcanvas.com/examples/#/user-interface/text-auto-font-size) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/user-interface/text-auto-font-size.example.mjs))

## Justified Text

With **Justify** on, wrapped lines are stretched to the full width of the element by widening the gaps between their words. The last line of a paragraph, and any line that ends with a line break, keeps its alignment instead. Justified text needs wrapping, so turn on **Wrap Lines** as well. The `justify` property is available from engine 2.22.

[Live example: Text Justify](https://playcanvas.com/examples/#/user-interface/text-justify) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/user-interface/text-justify.example.mjs))

## Outline and Shadow

| Property | Effect |
| --- | --- |
| `outlineColor` and `outlineThickness` | An outline around the characters. The thickness goes from 0, no outline, to 1 |
| `shadowColor` and `shadowOffset` | A shadow below the characters. The offset is a `pc.Vec2`, and each of its values goes from -1 to 1 |

Outlines and shadows are drawn by the shader of the font, and work with the MSDF font assets that the Editor and font-tools create.

## Markup

With **Enable Markup** on (`enableMarkup` in the Engine and React, `enable-markup` in Web Components), tags in the text style parts of it:

| Tag | Effect |
| --- | --- |
| `[color="#ff0000"]…[/color]` | Draws the text in a color, given as a six-digit hex code. It replaces the element's color for that text |
| `[outline color="#000000" thickness="0.5"]…[/outline]` | Outlines the text |
| `[shadow color="#000000" offset="0.5"]…[/shadow]` | Adds a shadow. Use `offsetX` and `offsetY` to set each axis on its own |

```javascript
message.element.enableMarkup = true;
message.element.text = 'You found the [color="#ffcc00"]golden key[/color]!';
```

Write `\[` for a `[` that doesn't start a tag. When the markup has an error, such as a tag that is never closed, the whole text is drawn as written, tags included, and the engine logs a warning.

[Live example: Text Markup](https://playcanvas.com/examples/#/user-interface/text-markup) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/user-interface/text-markup.example.mjs))

## Revealing Text

`rangeStart` and `rangeEnd` draw part of the text: the characters from `rangeStart` up to, but not including, `rangeEnd`. Changing them doesn't lay the text out again, so a typewriter effect costs little. Changing `text` resets the range to the whole of the new text, which gives you its length:

```javascript
dialog.element.text = 'It is dangerous to go alone.';

// Changing the text resets the range, so rangeEnd is now its length
const length = dialog.element.rangeEnd;
let shown = 0;
const handle = app.on('update', (dt) => {
    // Reveal 20 characters a second
    shown = Math.min(shown + dt * 20, length);
    dialog.element.rangeEnd = Math.floor(shown);
    if (shown === length) handle.off();
});
```

[Live example: Text Typewriter](https://playcanvas.com/examples/#/user-interface/text-typewriter) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/user-interface/text-typewriter.example.mjs))

## Changing Text at Runtime

Setting `text` lays the text out again and rebuilds its mesh, which costs more than moving or recoloring the element. Updating a few labels every frame, such as a timer or a score, is fine. For many labels, set the text only when its value has changed. See [Draw Order and Performance](https://developer.playcanvas.com/user-manual/user-interface/draw-order-and-performance.md#updating-text).

To show text in the player's language, give the element a localization key instead of text. See [Localization](https://developer.playcanvas.com/user-manual/user-interface/localization.md).

## Right-to-Left and Complex Scripts

A text element draws one glyph per character, from left to right. Languages written from right to left, such as Arabic and Hebrew, need their characters reordered first, and Arabic also needs the joined forms of its letters. See [Language Notes](https://developer.playcanvas.com/user-manual/user-interface/localization.md#language-notes) for how to add this.

## See Also

- [Fonts](https://developer.playcanvas.com/user-manual/user-interface/fonts.md) - Creating font assets and choosing their characters
- [Localization](https://developer.playcanvas.com/user-manual/user-interface/localization.md) - Showing text in the player's language
- [Element Component](https://developer.playcanvas.com/user-manual/editor/scenes/components/element.md), [`<pc-element>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-element.md) and [ElementComponent](https://api.playcanvas.com/engine/classes/ElementComponent.html) - Reference for every text property
