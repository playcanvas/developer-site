---
title: <pc-element>
---

The `<pc-element>` tag is used to define an element component.

:::note

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

<div className="nowrap-first-col">

| Attribute | Description |
| --- | --- |
| `anchor` | The anchor of the element component. Specified as a space-separated list of X, Y, Z, and W values. If not specified, `0 0 0 1` is used. |
| `asset` | A string that should match the `id` of a [`<pc-asset>`](../pc-asset) tag that has a type of `font`. |
| `auto-width` | Valueless attribute. If present, the element component automatically adjusts its width. |
| `color` | The color of the element component. Can be a space-separated list of R, G, B, and A values, a hex color code, or a [named color](https://github.com/playcanvas/web-components/blob/main/src/colors.ts). If not specified, `1 1 1 1` is used. |
| `font-size` | The font size of the element component. If not specified, `16` is used. |
| `line-height` | The line height of the element component. If not specified, `1.2` is used. |
| `pivot` | The pivot of the element component. Specified as a space-separated list of X and Y values. If not specified, `0.5 0.5` is used. |
| `text` | The text of the element component. |
| `type` | The type of element component. Can be `group`, `image` or `text`. If not specified, `group` is used. |
| `width` | The width of the element component. If not specified, `0` is used. |
| `wrap-lines` | Valueless attribute. If present, the element component wraps lines. |

</div>

## Example

```html
<pc-entity>
    <pc-element type="text" asset="arial"text="Hello, World!"></pc-element>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-element>` elements using the [ElementComponentElement API](https://api.playcanvas.com/classes/EngineWebComponents.ElementComponentElement.html).
