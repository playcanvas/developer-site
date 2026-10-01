---
title: <pc-element>
description: "Reference for the pc-element element: text, image, and group UI elements with fonts, sprites, layout, and input support on entities."
---

The `<pc-element>` tag adds an element component, the building block of user interfaces. It comes in three types, selected with the `type` attribute — `group`, `image` and `text` — and which attributes apply depends on the type.

Despite the name, this is not a base class or a generic wrapper. `<pc-element>` is the engine's 2D UI component, and like every component tag it spells the component it adds (`entity.element`): it gives its host entity a rectangle that draws an image, text, or nothing at all.

The rectangle is usually laid out on a [`<pc-screen>`](../pc-screen), but an element doesn't need one: the scrolling crawl of the [Text](https://playcanvas.github.io/web-components/examples/#text.html) example has no screen. Without a screen above it, an element is placed by its entity's transform and sized in world units, so a 32 × 32 element is 32 meters across. See [Elements Without a Screen](/user-manual/user-interface/elements/#elements-without-a-screen).

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity), a [`<pc-model>`](../pc-model) or a [`<pc-node>`](../pc-node).

:::

:::note

Image elements draw a texture or a sprite — including a 9-sliced or tiled sprite, from a sprite [`<pc-asset>`](../pc-asset) with `render-mode="sliced"` or `"tiled"` — and can act as a `mask` that clips their descendants. Only text elements need a `font-asset`.

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `alignment` | Vector2 | `"0.5 0.5"` | Horizontal and vertical alignment of the text within the element, each from 0 to 1: `"0.5 0.5"` centers it and `"0 1"` aligns it to the top left. Text elements only |
| `anchor` | Vector4 | `"0 0 0 0"` | The points of the parent that the element's edges attach to, as `left bottom right top`, each from 0 to 1: `"0 0 0 0"` is the parent's bottom-left corner and `"1 1 1 1"` its top-right. Where the two values for an axis differ, the anchor is split: the element stretches with its parent on that axis, inset by its `margin`, and its `width` or `height` is ignored. `anchor="0 0 1 1" margin="0 0 0 0"` fills the parent. See [Anchor](/user-manual/user-interface/elements/#anchor) |
| `auto-fit-height` | Boolean | `"false"` | Shrink the font, from `max-font-size` down to `min-font-size`, so that the text fits the element's height. `font-size` is ignored while it is on. Requires `auto-height="false"`. Text elements only |
| `auto-fit-width` | Boolean | `"false"` | Shrink the font, from `max-font-size` down to `min-font-size`, so that the text fits the element's width. `font-size` is ignored while it is on. Requires `auto-width="false"`. Text elements only |
| `auto-height` | Boolean | `"true"` | Whether to automatically adjust height to fit text content. Text elements only |
| `auto-width` | Boolean | `"true"` | Whether to automatically adjust width to fit text content. Text elements only |
| `color` | Color | `"1 1 1 1"` | Color of the image or text. It multiplies the colors of a texture, so a white texture can be drawn in any color. Its alpha is ignored, so use `opacity` for transparency |
| `enable-markup` | Boolean | `"false"` | Whether tags in the text, such as `[color="#ff0000"]red[/color]`, style runs of it. See [Markup](/user-manual/user-interface/text-elements/#markup). Text elements only |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `fit-mode` | Enum | `"stretch"` | How the texture or sprite fits the element's rectangle: `"stretch"` \| `"contain"` \| `"cover"`. `stretch` fills the rectangle exactly, ignoring the source's aspect ratio; `contain` fits the whole source inside the rectangle and `cover` fills the rectangle with it, both preserving the aspect ratio. A covering image overflows the rectangle, so crop it with a `mask` on a parent. Image elements only |
| `font-asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | Font [`<pc-asset>`](../pc-asset) ID (must reference a `font` type asset). Required for text elements only |
| `font-size` | Number | `"32"` | Size of the text, in screen units. Text elements only |
| `height` | Number | `"32"` | Height of the element, in screen units. Ignored where the anchor is split vertically, and on a text element while `auto-height` fits it to its text |
| `justify` | Boolean | `"false"` | Whether wrapped lines are stretched flush with both edges of the element by widening the gaps between their words. Needs `wrap-lines` and a fixed width. The last line, and any line ended by an explicit line break, follows `alignment` instead. Text elements only |
| `line-height` | Number | `"32"` | Distance between the baselines of neighboring lines, in screen units. It doesn't follow `font-size`, so set it with a larger font, or wrapped lines overlap. Text elements only |
| `margin` | Vector4 | - | Distance of each edge from its anchor, as `left bottom right top`, on the axes where the anchor is split. Positive values move the edges inwards. Without it, a split axis keeps the engine's default margins of `0 0 -32 -32`, and the element overhangs its right and top anchors by 32 units, so set it whenever you split an anchor. See [Margins](/user-manual/user-interface/elements/#margin) |
| `mask` | Boolean | `"false"` | Whether the element clips its descendants to its rectangle, or to the opaque parts of its texture or sprite. The mask itself isn't drawn, so its `color` has no effect. See [Masks](/user-manual/user-interface/masks/). Image elements only |
| `max-font-size` | Number | `"32"` | Largest font size used when auto-fitting, and the size that fitting starts from. Text elements only |
| `max-lines` | Number | - | Maximum number of lines `wrap-lines` wraps the text onto; any leftover text is appended to the last line. No limit when omitted. Text elements only |
| `min-font-size` | Number | `"8"` | Smallest font size used when auto-fitting. Text elements only |
| `opacity` | Number | `"1"` | Opacity, from 0 (transparent) to 1 (opaque). It doesn't affect the element's children |
| `outline-color` | Color | `"0 0 0 1"` | Color of the text outline, drawn only when `outline-thickness` is above 0. Text elements only |
| `outline-thickness` | Number | `"0"` | Thickness of the text outline, from 0 (no outline) to 1. Text elements only |
| `pivot` | Vector2 | `"0 0"` | The point of the element that is placed at its position, and that it rotates and scales about, as fractions of its size: `"0 0"` is its bottom-left corner and `"0.5 0.5"` its center |
| `pixels-per-unit` | Number | - | Overrides the sprite's pixels per unit, which sets the width of the borders of a sliced or tiled sprite: a border of `b` pixels is `b / pixels-per-unit` screen units wide. A simple sprite is stretched to the element, so it has no effect there. Image elements only |
| `shadow-color` | Color | `"0 0 0 1"` | Color of the text shadow, drawn only when `shadow-offset` is not `"0 0"`. Text elements only |
| `shadow-offset` | Vector2 | `"0 0"` | Offset of the text shadow as "X Y" values, each from -1 to 1 in proportion to the font size. Positive values shift the shadow right and up, and `"0 0"` draws no shadow. Text elements only |
| `spacing` | Number | `"1"` | Spacing between the letters of the text, as a multiple of their normal spacing. Text elements only |
| `sprite-asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | Sprite [`<pc-asset>`](../pc-asset) ID to render. Image elements only |
| `sprite-frame` | Number | `"0"` | Frame index of the sprite to render. Image elements only |
| `text` | String | - | The text to display. Text elements only |
| `texture-asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | Texture [`<pc-asset>`](../pc-asset) ID to render. Image elements only |
| `type` | Enum | `"group"` | Element type: `"group"` \| `"image"` \| `"text"` |
| `use-input` | Boolean | `"false"` | Whether the element receives mouse, touch and XR input, and fires input events. Required by [`<pc-button>`](../pc-button), by the content of a [`<pc-scroll-view>`](../pc-scroll-view) to be dragged, and by a scrollbar's handle. See [Enabling UI Input](/user-manual/user-interface/input/#enabling-ui-input) |
| `width` | Number | `"32"` | Width of the element, in screen units. Ignored where the anchor is split horizontally, and on a text element while `auto-width` fits it to its text |
| `wrap-lines` | Boolean | `"false"` | Whether the text wraps onto new lines at the element's width. It needs a width to wrap at: `auto-width="false"`, or an anchor split horizontally. Text elements only |

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

* [`<pc-screen>`](../pc-screen) — the screen an interface is laid out and drawn on
* [`<pc-button>`](../pc-button) — makes an image element interactive
* [`<pc-layout-group>`](../pc-layout-group) — arranges the elements of its entity's children automatically
* [`<pc-scroll-view>`](../pc-scroll-view) — scrolls a content element inside a viewport
* [Elements](/user-manual/user-interface/elements/), [Text Elements](/user-manual/user-interface/text-elements/) and [Image Elements](/user-manual/user-interface/image-elements/) — anchors, sizes, text and images, in the User Interface section

Examples: [2D Screen](https://playcanvas.github.io/web-components/examples/#2d-screen.html), [Text](https://playcanvas.github.io/web-components/examples/#text.html) and [UI Layout](https://playcanvas.github.io/web-components/examples/#ui-layout.html).
