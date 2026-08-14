---
title: <pc-screen>
description: "Reference for the pc-screen element: 2D screen space for UI elements, resolution, scale modes, and child pc-element hierarchies."
---

The `<pc-screen>` tag is used to define a screen component.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `priority` | Number | `"0"` | Rendering priority (0-255) |
| `reference-resolution` | Vector2 | `"640 320"` | Reference resolution as "Width Height" values |
| `resolution` | Vector2 | `"640 320"` | Screen resolution as "Width Height" values |
| `scale-blend` | Number | `"0.5"` | How `resolution` and `reference-resolution` are weighted against each other when `scale-mode` is `"blend"`, from 0 (follow `resolution`) to 1 (follow `reference-resolution`). Ignored when `scale-mode` is `"none"` |
| `scale-mode` | Enum | `"none"` | How the screen scales its contents: `"none"` \| `"blend"`. `"none"` renders at `resolution` and ignores `reference-resolution`; `"blend"` scales between the two, weighted by `scale-blend`, which is what keeps a UI laid out at one resolution usable at another. Requires `screen-space` |
| `screen-space` | Boolean | `"false"` | Whether to render in screen space |

</div>

:::note[Scaling only applies to screen-space screens]

A world-space screen does not support scaling, and the engine forces `scale-mode` back to `"none"`
on one. Set `screen-space` alongside `scale-mode="blend"` for it to have any effect.

:::

## Example

A screen-space screen hosting a text element. With `scale-mode="blend"`, the UI scales as the canvas resizes — try the fullscreen button to see it, or edit the `text`:

```html live-example
<pc-app>
    <pc-asset src="https://developer.playcanvas.com/assets/fonts/arial.json" type="font" id="arial"></pc-asset>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="ui">
            <!-- A 2D screen that scales with the canvas -->
            <pc-screen screen-space="true" scale-mode="blend" reference-resolution="640 320"></pc-screen>
            <!-- Text rendered on the parent screen -->
            <pc-entity name="title">
                <pc-element type="text" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"
                            font-asset="arial" font-size="48" color="#ff8a3c"
                            text="Hello, World!"></pc-element>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-screen>` elements using the [ScreenComponentElement API](https://api.playcanvas.com/web-components/classes/ScreenComponentElement.html).
