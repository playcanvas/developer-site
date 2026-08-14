---
title: <pc-scrollbar>
description: "Reference for the pc-scrollbar element: draggable scrollbar with orientation, handle size, and value, used to drive a scroll view."
---

The `<pc-scrollbar>` tag is used to define a scrollbar component, which provides a draggable handle that reports a position in the range 0 to 1.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity) that also has a [`<pc-element>`](../pc-element).
* It is referenced by a [`<pc-scrollview>`](../pc-scrollview) via its `horizontal-scrollbar` or `vertical-scrollbar` attribute.
* Its `handle` attribute references the [`<pc-entity>`](../pc-entity) used as the draggable handle, whose image element should have `use-input` set.

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `handle` | String | - | Reference (CSS selector, element id, or entity name) to the [`<pc-entity>`](../pc-entity) used as the draggable handle |
| `handle-size` | Number | `"0.5"` | Size of the handle relative to the size of the track (0 to 1) |
| `orientation` | Enum | `"horizontal"` | Orientation of the scrollbar: `"horizontal"` \| `"vertical"` |
| `value` | Number | `"0"` | Current position of the scrollbar (0 to 1) |

</div>

## Example

A standalone vertical scrollbar — drag the orange handle. Try a different `handle-size` (as a fraction of the track) or starting `value`:

```html live-example
<pc-app max-pixel-ratio="1">
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="ui">
            <pc-screen screen-space="true" scale-mode="blend" reference-resolution="640 320"></pc-screen>
            <pc-entity name="scrollbar">
                <pc-element type="image" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"
                            width="20" height="240" color="#3a3f4b"></pc-element>
                <pc-scrollbar orientation="vertical" handle-size="0.35" handle="#handle"></pc-scrollbar>

                <!-- Draggable handle -->
                <pc-entity name="handle" id="handle">
                    <pc-element type="image" anchor="0 1 1 1" margin="0 0 0 0" color="#ff8a3c" use-input></pc-element>
                    <pc-button hover-tint="0.85 0.85 0.85 1" pressed-tint="0.7 0.7 0.7 1"></pc-button>
                </pc-entity>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-scrollbar>` elements using the [ScrollbarComponentElement API](https://api.playcanvas.com/web-components/classes/ScrollbarComponentElement.html).
