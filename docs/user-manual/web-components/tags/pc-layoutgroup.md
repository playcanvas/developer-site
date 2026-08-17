---
title: <pc-layoutgroup>
description: "Reference for the pc-layoutgroup element: arranges child elements in horizontal or vertical layouts with spacing, padding, alignment, and fitting."
---

The `<pc-layoutgroup>` tag is used to define a layout group component, which automatically arranges its child element entities in a row or column.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity) that also has a [`<pc-element>`](../pc-element).
* Child entities are laid out automatically. Add a [`<pc-layoutchild>`](../pc-layoutchild) to a child to control how it is sized within the group.

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `alignment` | Vector2 | `"0 1"` | Horizontal and vertical alignment of the child elements (each component 0 to 1) |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `height-fitting` | Enum | `"none"` | Fitting along the vertical axis: `"none"` \| `"stretch"` \| `"shrink"` \| `"both"` |
| `orientation` | Enum | `"horizontal"` | Orientation of the layout: `"horizontal"` \| `"vertical"` |
| `padding` | Vector4 | `"0 0 0 0"` | Padding around the group as `left bottom right top` |
| `reverse-x` | Boolean | `"false"` | Reverse the order of children along the horizontal axis |
| `reverse-y` | Boolean | `"false"` | Reverse the order of children along the vertical axis |
| `spacing` | Vector2 | `"0 0"` | Spacing between children as `x y` |
| `width-fitting` | Enum | `"none"` | Fitting along the horizontal axis: `"none"` \| `"stretch"` \| `"shrink"` \| `"both"` |
| `wrap` | Boolean | `"false"` | Whether children wrap onto a new line or column when they overflow the group |

</div>

## Example

A vertical list that lays out its rows automatically. Try `orientation="horizontal"`, a bigger `spacing`, or `reverse-y` — or add another row and watch it slot in:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="ui">
            <pc-screen screen-space="true" scale-mode="blend" reference-resolution="640 320"></pc-screen>
            <pc-entity name="list">
                <pc-element type="group" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5" width="260" height="220"></pc-element>
                <pc-layoutgroup orientation="vertical" alignment="0 1" spacing="0 8"
                                padding="10 10 10 10" width-fitting="stretch"></pc-layoutgroup>

                <pc-entity name="row-1">
                    <pc-element type="image" width="240" height="50" color="#ff8a3c"></pc-element>
                </pc-entity>
                <pc-entity name="row-2">
                    <pc-element type="image" width="240" height="50" color="#7ab8ff"></pc-element>
                </pc-entity>
                <pc-entity name="row-3">
                    <pc-element type="image" width="240" height="50" color="#8ce99a"></pc-element>
                </pc-entity>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-layoutgroup>` elements using the [LayoutGroupComponentElement API](https://api.playcanvas.com/web-components/classes/LayoutGroupComponentElement.html).
