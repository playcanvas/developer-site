---
title: <pc-layoutchild>
description: "Reference for the pc-layoutchild element: per-child layout constraints (min/max size and fit proportions) within a layout group."
---

The `<pc-layoutchild>` tag is used to define a layout child component, which controls how an element is sized by its parent [`<pc-layoutgroup>`](../pc-layoutgroup).

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity) that also has a [`<pc-element>`](../pc-element).
* That entity must itself be a child of an entity with a [`<pc-layoutgroup>`](../pc-layoutgroup).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `exclude-from-layout` | Flag | - | Exclude this element from the layout so it takes up no space |
| `fit-height-proportion` | Number | `"0"` | Proportion of the group's spare height this element takes when `height-fitting` stretches or shrinks |
| `fit-width-proportion` | Number | `"0"` | Proportion of the group's spare width this element takes when `width-fitting` stretches or shrinks |
| `max-height` | Number | - | Maximum height the element is laid out with (omit for no limit) |
| `max-width` | Number | - | Maximum width the element is laid out with (omit for no limit) |
| `min-height` | Number | `"0"` | Minimum height the element is laid out with |
| `min-width` | Number | `"0"` | Minimum width the element is laid out with |

</div>

## Example

```html
<pc-entity>
    <pc-element type="image" width="200" height="45"></pc-element>
    <pc-layoutchild min-height="45" fit-width-proportion="1"></pc-layoutchild>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-layoutchild>` elements using the [LayoutChildComponentElement API](https://api.playcanvas.com/web-components/classes/LayoutChildComponentElement.html).
