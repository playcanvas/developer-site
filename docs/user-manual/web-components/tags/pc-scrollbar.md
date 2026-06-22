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

```html
<pc-entity name="scrollbar">
    <pc-element type="image" anchor="1 0 1 1" width="20"></pc-element>
    <pc-scrollbar orientation="vertical" handle-size="0.5" handle="#handle"></pc-scrollbar>

    <!-- Draggable handle -->
    <pc-entity name="handle" id="handle">
        <pc-element type="image" anchor="0 1 1 1" use-input></pc-element>
        <pc-button></pc-button>
    </pc-entity>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-scrollbar>` elements using the [ScrollbarComponentElement API](https://api.playcanvas.com/web-components/classes/ScrollbarComponentElement.html).
