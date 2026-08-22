---
title: <pc-layout-child>
description: "Reference for the pc-layout-child element: per-child layout constraints (min/max size and fit proportions) within a layout group."
---

The `<pc-layout-child>` tag is used to define a layout child component, which controls how an element is sized by its parent [`<pc-layout-group>`](../pc-layout-group).

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity) that also has a [`<pc-element>`](../pc-element).
* That entity must itself be a child of an entity with a [`<pc-layout-group>`](../pc-layout-group).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `exclude-from-layout` | Boolean | `"false"` | Exclude this element from the layout so it takes up no space |
| `fit-height-proportion` | Number | `"0"` | Proportion of the group's spare height this element takes when `height-fitting` stretches or shrinks |
| `fit-width-proportion` | Number | `"0"` | Proportion of the group's spare width this element takes when `width-fitting` stretches or shrinks |
| `max-height` | Number | - | Maximum height the element is laid out with (omit for no limit) |
| `max-width` | Number | - | Maximum width the element is laid out with (omit for no limit) |
| `min-height` | Number | `"0"` | Minimum height the element is laid out with |
| `min-width` | Number | `"0"` | Minimum width the element is laid out with |

</div>

## Example

Three items in a horizontal group with `width-fitting="stretch"`. The middle item's `fit-width-proportion="1"` means it alone absorbs the group's spare width. Try giving the first item a proportion of `1` too — they will share it — or set a `max-width` on the middle one:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="ui">
            <pc-screen screen-space="true" scale-mode="blend" reference-resolution="640 320"></pc-screen>
            <pc-entity name="toolbar">
                <pc-element type="group" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5" width="480" height="70"></pc-element>
                <pc-layout-group orientation="horizontal" alignment="0 0.5" spacing="8 0"
                                 padding="10 10 10 10" width-fitting="stretch"></pc-layout-group>

                <pc-entity name="item-1">
                    <pc-element type="image" width="80" height="50" color="#7ab8ff"></pc-element>
                    <pc-layout-child></pc-layout-child>
                </pc-entity>
                <pc-entity name="item-2">
                    <pc-element type="image" width="80" height="50" color="#ff8a3c"></pc-element>
                    <pc-layout-child fit-width-proportion="1"></pc-layout-child>
                </pc-entity>
                <pc-entity name="item-3">
                    <pc-element type="image" width="80" height="50" color="#7ab8ff"></pc-element>
                    <pc-layout-child></pc-layout-child>
                </pc-entity>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-layout-child>` elements using the [LayoutChildComponentElement API](https://api.playcanvas.com/web-components/classes/LayoutChildComponentElement.html).
