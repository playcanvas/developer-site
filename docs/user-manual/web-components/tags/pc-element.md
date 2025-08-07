---
title: <pc-element>
---

The `<pc-element>` tag is used to define an element component.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `anchor` | Vector4 | `"0 0 0 1"` | Anchor point as "X Y Z W" values |
| `asset` | String | - | Font asset ID (must reference a `font` type asset) |
| `auto-width` | Flag | - | Whether to automatically adjust width to fit content |
| `color` | Color | `"1 1 1 1"` | Color as space-separated RGBA values, hex code, or [named color](https://github.com/playcanvas/web-components/blob/main/src/colors.ts) |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `font-size` | Number | `"16"` | Font size in pixels |
| `line-height` | Number | `"1.2"` | Line height multiplier |
| `pivot` | Vector2 | `"0.5 0.5"` | Pivot point as "X Y" values |
| `text` | String | - | Text content to display |
| `type` | Enum | `"group"` | Element type: `"group"` \| `"image"` \| `"text"` |
| `width` | Number | `"0"` | Width in pixels (0 for auto-sizing) |
| `wrap-lines` | Flag | - | Whether to wrap text lines |

</div>

## Example

```html
<pc-entity>
    <pc-element type="text" asset="arial"text="Hello, World!"></pc-element>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-element>` elements using the [ElementComponentElement API](https://api.playcanvas.com/web-components/classes/ElementComponentElement.html).
