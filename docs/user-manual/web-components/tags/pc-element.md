---
title: <pc-element>
description: "Reference for the pc-element element: text, image, and group UI elements with fonts, sprites, layout, and input support on entities."
---

The `<pc-element>` tag is used to define an element component. Element components are the building blocks of user interfaces and come in three types — `group`, `image`, and `text` — selected with the `type` attribute. Which attributes apply depends on the type.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

:::note

Image elements can render a sprite (including 9-sliced sprites, via a `sliced` [`<pc-asset>`](../pc-asset)) or a texture, and can act as a `mask` to clip their descendants. Only text elements require a `font-asset`.

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `anchor` | Vector4 | `"0 0 0 1"` | Sets the element's anchor as `left bottom right top` relative to its parent. Each value ranges from 0 to 1. `[0,0,0,0]` anchors to the bottom-left; `[1,1,1,1]` anchors to the top-right. If left≠right or bottom≠top (a split anchor), the element resizes to cover that area, e.g. `[0,0,1,1]` fills the parent. |
| `auto-fit-height` | Boolean | `"false"` | Reduce the font size (down to `min-font-size`) so text fits the element's height. Requires `auto-height="false"`. Text elements only |
| `auto-fit-width` | Boolean | `"false"` | Reduce the font size (down to `min-font-size`) so text fits the element's width. Requires `auto-width="false"`. Text elements only |
| `auto-height` | Boolean | `"true"` | Whether to automatically adjust height to fit text content. Text elements only |
| `auto-width` | Boolean | `"true"` | Whether to automatically adjust width to fit text content. Text elements only |
| `color` | Color | `"1 1 1 1"` | Color as space-separated RGBA values, hex code, or [named color](https://github.com/playcanvas/web-components/blob/main/src/colors.ts) |
| `enable-markup` | Boolean | `"false"` | Enables markup processing for styled text. Supports tags like `[color="#ff0000"]text[/color]` for colored text. |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `font-asset` | String | - | Font [`<pc-asset>`](../pc-asset) ID (must reference a `font` type asset). Required for text elements only |
| `font-size` | Number | `"32"` | Font size in pixels |
| `height` | Number | `"0"` | Height in pixels (0 for auto-sizing) |
| `line-height` | Number | `"32"` | Line height in pixels |
| `margin` | Vector4 | - | Insets the element from a split (stretched) anchor as `left bottom right top`. For point anchors, `width`/`height` govern size instead |
| `mask` | Boolean | `"false"` | Whether the element clips its descendants to its bounds. Image elements only |
| `max-font-size` | Number | `"32"` | Largest font size used when auto-fitting |
| `min-font-size` | Number | `"8"` | Smallest font size used when auto-fitting |
| `opacity` | Number | `"1"` | Opacity, from 0 (transparent) to 1 (opaque) |
| `pivot` | Vector2 | `"0.5 0.5"` | Pivot point as "X Y" values |
| `pixels-per-unit` | Number | - | Pixels per unit used when rendering a sprite. Image elements only |
| `sprite-asset` | String | - | Sprite [`<pc-asset>`](../pc-asset) ID to render. Image elements only |
| `sprite-frame` | Number | `"0"` | Frame index of the sprite to render. Image elements only |
| `text` | String | - | Text content to display |
| `texture-asset` | String | - | Texture [`<pc-asset>`](../pc-asset) ID to render. Image elements only |
| `type` | Enum | `"group"` | Element type: `"group"` \| `"image"` \| `"text"` |
| `use-input` | Boolean | `"false"` | Whether the element receives pointer input. Required for [`<pc-button>`](../pc-button) and scroll-view interaction |
| `width` | Number | `"0"` | Width in pixels (0 for auto-sizing) |
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
