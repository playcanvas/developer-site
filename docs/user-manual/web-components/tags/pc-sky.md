---
title: <pc-sky>
---

The `<pc-sky>` tag is used to define a sky component.

:::note[Usage]

* It must be a direct child of a [`<pc-scene>`](../pc-scene).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | String | - | Texture asset ID (must reference a `texture` type asset) |
| `center` | Vector3 | `"0 0.01 0"` | Sky center as "X Y Z" values (0-1 range) |
| `intensity` | Number | `"1"` | Sky brightness intensity |
| `level` | Number | `"0"` | Mipmap level to use for rendering |
| `rotation` | Vector3 | `"0 0 0"` | Sky rotation as "X Y Z" Euler angles |
| `scale` | Vector3 | `"100 100 100"` | Sky scale as "X Y Z" values |
| `type` | Enum | `"infinite"` | Sky type: `"box"` \| `"dome"` \| `"infinite"` \| `"none"` |

</div>

## Example

```html
<pc-asset id="skybox" src="assets/skybox.webp"></pc-asset>
<pc-scene>
    <pc-sky asset="skybox"></pc-sky>
</pc-scene>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-sky>` elements using the [SkyElement API](https://api.playcanvas.com/web-components/classes/SkyElement.html).
