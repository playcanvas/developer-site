---
title: <pc-sky>
---

The `<pc-sky>` tag is used to define a sky component.

:::note

* It must be a direct child of a [`<pc-scene>`](../pc-scene).

:::

## Attributes

| Attribute | Description |
| --- | --- |
| `asset` | A string that should match the `id` of a [`<pc-asset>`](../pc-asset) tag that has a type of `texture`. |
| `center` | The center of the sky. Specified as a space-separated list of X, Y, and Z values in the range 0 to 1. If not specified, `0 0.01 0` is used. |
| `intensity` | The intensity of the sky. If not specified, `1` is used. |
| `level` | The mipmap level used to render the sky. If not specified, `0` is used (base mip level). |
| `rotation` | The rotation of the sky. Specified as a space-separated list of X, Y, and Z values. If not specified, `0 0 0` is used. |
| `scale` | The scale of the sky. Specified as a space-separated list of X, Y, and Z values. If not specified, `100 100 100` is used. |
| `type` | The type of sky component. Can be `box`, `dome`, `infinite` or `none`. If not specified, `infinite` is used. |

## Example

```html
<pc-asset id="skybox" src="assets/skybox.webp" preload></pc-asset>
<pc-scene>
    <pc-sky asset="skybox"></pc-sky>
</pc-scene>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-sky>` elements using the [SkyElement API](https://api.playcanvas.com/web-components/classes/SkyElement.html).
