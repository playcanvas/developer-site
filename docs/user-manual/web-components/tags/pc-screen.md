---
title: <pc-screen>
---

The `<pc-screen>` tag is used to define a screen component.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `blend` | Flag | - | Whether to enable alpha blending |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `priority` | Number | `"0"` | Rendering priority (0-255) |
| `reference-resolution` | Vector2 | `"640 320"` | Reference resolution as "Width Height" values |
| `resolution` | Vector2 | `"640 320"` | Screen resolution as "Width Height" values |
| `scale-blend` | Number | `"0.5"` | Scale blending factor (0-1) |
| `screen-space` | Flag | - | Whether to render in screen space |

</div>

## Example

```html
<pc-entity>
    <!-- define a 2d screen -->
    <pc-screen></pc-screen>
    <!-- render some text on the parent screen -->
    <pc-entity>
        <pc-element type="text" asset="arial" text="Hello, World!"></pc-element>
    </pc-entity>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-screen>` elements using the [ScreenComponentElement API](https://api.playcanvas.com/web-components/classes/ScreenComponentElement.html).
