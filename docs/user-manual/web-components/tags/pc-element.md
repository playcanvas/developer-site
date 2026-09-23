---
title: <pc-element>
description: "Reference for the pc-element element: text, image, and group UI elements with fonts, sprites, layout, and input support on entities."
---

The `<pc-element>` tag is used to define an element component. Element components are the building blocks of user interfaces and come in three types — `group`, `image`, and `text` — selected with the `type` attribute. Which attributes apply depends on the type.

Despite the name, this is not a base class or a generic wrapper. `<pc-element>` is the engine's 2D UI component, and like every component tag it spells the component it adds (`entity.element`): it gives its host entity a rectangle inside a [`<pc-screen>`](../pc-screen) hierarchy that draws an image, a line of text, or nothing at all.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity), a [`<pc-model>`](../pc-model) or a [`<pc-node>`](../pc-node).

:::

:::note

Image elements can render a sprite (including 9-sliced sprites, via a `sliced` [`<pc-asset>`](../pc-asset)) or a texture, and can act as a `mask` to clip their descendants. Only text elements require a `font-asset`.

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `alignment` | Vector2 | `"0.5 0.5"` | Horizontal and vertical alignment of the text within the element, each from 0 to 1: `"0.5 0.5"` centers it and `"0 1"` aligns it to the top left. Text elements only |
| `anchor` | Vector4 | `"0 0 0 0"` | Sets the element's anchor as `left bottom right top` relative to its parent. Each value ranges from 0 to 1. `[0,0,0,0]` anchors to the bottom-left; `[1,1,1,1]` anchors to the top-right. If left≠right or bottom≠top (a split anchor), the element resizes to cover that area, e.g. `[0,0,1,1]` fills the parent. |
| `auto-fit-height` | Boolean | `"false"` | Reduce the font size (down to `min-font-size`) so text fits the element's height. Requires `auto-height="false"`. Text elements only |
| `auto-fit-width` | Boolean | `"false"` | Reduce the font size (down to `min-font-size`) so text fits the element's width. Requires `auto-width="false"`. Text elements only |
| `auto-height` | Boolean | `"true"` | Whether to automatically adjust height to fit text content. Text elements only |
| `auto-width` | Boolean | `"true"` | Whether to automatically adjust width to fit text content. Text elements only |
| `color` | Color | `"1 1 1 1"` | Color as space-separated RGBA values, hex code, or [named color](https://github.com/playcanvas/web-components/blob/main/src/colors.ts) |
| `enable-markup` | Boolean | `"false"` | Enables markup processing for styled text. Supports tags like `[color="#ff0000"]text[/color]` for colored text. |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `fit-mode` | Enum | `"stretch"` | How the texture or sprite fits the element's rectangle: `"stretch"` \| `"contain"` \| `"cover"`. `stretch` fills the rectangle exactly, ignoring the source's aspect ratio; `contain` fits the whole source inside the rectangle and `cover` fills the rectangle with it, both preserving the aspect ratio. Image elements only |
| `font-asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | Font [`<pc-asset>`](../pc-asset) ID (must reference a `font` type asset). Required for text elements only |
| `font-size` | Number | `"32"` | Font size in pixels |
| `height` | Number | `"32"` | Height in pixels (0 for auto-sizing) |
| `justify` | Boolean | `"false"` | Whether wrapped lines are stretched flush with both edges of the element by widening the gaps between their words. Needs `wrap-lines` and a fixed width. The last line, and any line ended by an explicit line break, follows `alignment` instead. Text elements only |
| `line-height` | Number | `"32"` | Line height in pixels |
| `margin` | Vector4 | - | Insets the element from a split (stretched) anchor as `left bottom right top`. For point anchors, `width`/`height` govern size instead |
| `mask` | Boolean | `"false"` | Whether the element clips its descendants to its bounds. Image elements only |
| `max-font-size` | Number | `"32"` | Largest font size used when auto-fitting |
| `max-lines` | Number | - | Maximum number of lines `wrap-lines` wraps the text onto; any leftover text is appended to the last line. No limit when omitted. Text elements only |
| `min-font-size` | Number | `"8"` | Smallest font size used when auto-fitting |
| `opacity` | Number | `"1"` | Opacity, from 0 (transparent) to 1 (opaque) |
| `outline-color` | Color | `"0 0 0 1"` | Color of the text outline, drawn only when `outline-thickness` is above 0. Text elements only |
| `outline-thickness` | Number | `"0"` | Thickness of the text outline, from 0 (no outline) to 1. Text elements only |
| `pivot` | Vector2 | `"0 0"` | Pivot point as "X Y" values |
| `pixels-per-unit` | Number | - | Pixels per unit used when rendering a sprite. Image elements only |
| `shadow-color` | Color | `"0 0 0 1"` | Color of the text shadow, drawn only when `shadow-offset` is not `"0 0"`. Text elements only |
| `shadow-offset` | Vector2 | `"0 0"` | Offset of the text shadow as "X Y" values, each from -1 to 1 in proportion to the font size. Positive values shift the shadow right and up, and `"0 0"` draws no shadow. Text elements only |
| `spacing` | Number | `"1"` | Spacing between the letters of the text, as a multiple of their normal spacing. Text elements only |
| `sprite-asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | Sprite [`<pc-asset>`](../pc-asset) ID to render. Image elements only |
| `sprite-frame` | Number | `"0"` | Frame index of the sprite to render. Image elements only |
| `text` | String | - | Text content to display |
| `texture-asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | Texture [`<pc-asset>`](../pc-asset) ID to render. Image elements only |
| `type` | Enum | `"group"` | Element type: `"group"` \| `"image"` \| `"text"` |
| `use-input` | Boolean | `"false"` | Whether the element receives pointer input. Required for [`<pc-button>`](../pc-button) and scroll-view interaction |
| `width` | Number | `"32"` | Width in pixels (0 for auto-sizing) |
| `wrap-lines` | Boolean | `"false"` | Whether to wrap text lines |

</div>

## Example

An `image` element as a panel, with two `text` elements on top — the second uses `enable-markup` for inline coloring. Try editing the `text`, `font-size` or panel `color`:

```html live-example
<pc-app>
    <pc-asset src="https://developer.playcanvas.com/assets/fonts/arial.json" type="font" id="arial"></pc-asset>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="ui">
            <pc-screen screen-space="true" scale-mode="blend" reference-resolution="640 320"></pc-screen>
            <pc-entity name="panel">
                <pc-element type="image" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"
                            width="400" height="150" color="#2a2d36" opacity="0.9"></pc-element>
                <pc-entity name="heading" position="0 35 0">
                    <pc-element type="text" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"
                                font-asset="arial" font-size="36" text="<pc-element>"></pc-element>
                </pc-entity>
                <pc-entity name="body" position="0 -25 0">
                    <pc-element type="text" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"
                                font-asset="arial" font-size="20" enable-markup="true"
                                text='Comes in [color="#ff8a3c"]group[/color], [color="#7ab8ff"]image[/color] and [color="#8ce99a"]text[/color] types'></pc-element>
                </pc-entity>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-element>` elements using the [ElementComponentElement API](https://api.playcanvas.com/web-components/classes/ElementComponentElement.html).

The `component` property is the engine [ElementComponent](https://api.playcanvas.com/engine/classes/ElementComponent.html) the element adds — `null` until the element is ready — and everything the attributes do not expose is available on it.

## See Also

* [`<pc-screen>`](../pc-screen) — every element sits under a screen
* [`<pc-button>`](../pc-button) — makes an image element interactive
* [`<pc-layout-group>`](../pc-layout-group) — arranges sibling elements automatically
* [`<pc-scroll-view>`](../pc-scroll-view) — scrolls a content element inside a viewport

Examples: [2D Screen](https://playcanvas.github.io/web-components/examples/2d-screen.html), [Text](https://playcanvas.github.io/web-components/examples/text.html), [3D Text](https://playcanvas.github.io/web-components/examples/3d-text.html) and [UI Layout](https://playcanvas.github.io/web-components/examples/ui-layout.html).
