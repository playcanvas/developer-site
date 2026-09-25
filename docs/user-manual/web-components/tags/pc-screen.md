---
title: <pc-screen>
description: "Reference for the pc-screen element: 2D screen space for UI elements, resolution, scale modes, and child pc-element hierarchies."
---

The `<pc-screen>` tag is used to define a screen component.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity), a [`<pc-model>`](../pc-model) or a [`<pc-node>`](../pc-node).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `priority` | Number | `"0"` | Drawing order among screens, from 0 to 127: a screen with a higher priority is drawn over screens with a lower one, and its elements receive input first |
| `reference-resolution` | Vector2 | `"640 320"` | The resolution the UI is laid out for, as "Width Height" values. With `scale-mode="blend"`, the contents are scaled by the size of the canvas relative to it |
| `resolution` | Vector2 | `"640 320"` | Size of a world-space screen in its entity's local units, as "Width Height" values. A screen-space screen takes its resolution from the canvas, so this has no effect on one |
| `scale-blend` | Number | `"0.5"` | With `scale-mode="blend"`, how the width and the height of the canvas are weighted in the scale, from 0 (width only) to 1 (height only). 0.5 weights them equally. Ignored when `scale-mode` is `"none"` |
| `scale-mode` | Enum | `"none"` | How the screen scales its contents: `"none"` \| `"blend"`. `"none"` doesn't scale them: on a screen-space screen, one unit is one pixel of the canvas's drawing buffer. `"blend"` scales them by the size of the canvas relative to `reference-resolution`, weighted by `scale-blend`, which is what keeps a UI laid out at one resolution usable at another. Requires `screen-space` |
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

The `component` property is the engine [ScreenComponent](https://api.playcanvas.com/engine/classes/ScreenComponent.html) the element adds — `null` until the element is ready — and everything the attributes do not expose is available on it.

## See Also

* [`<pc-element>`](../pc-element) — the elements a screen renders
* [`<pc-layout-group>`](../pc-layout-group) — automatic arrangement of elements
* [`<pc-scroll-view>`](../pc-scroll-view) — scrolling content on a screen
* [`<pc-button>`](../pc-button) — interactive elements
* [Screens](/user-manual/user-interface/screens/) — screen space and world space, resolution and scaling, in the User Interface section

Examples: [2D Screen](https://playcanvas.github.io/web-components/examples/2d-screen.html), [UI Layout](https://playcanvas.github.io/web-components/examples/ui-layout.html) and [Scroll View](https://playcanvas.github.io/web-components/examples/scroll-view.html).
