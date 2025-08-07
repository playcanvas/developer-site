---
title: <pc-sky>
---

The `<pc-sky>` tag is used to define a sky component.

:::note

* It must be a direct child of a [`<pc-scene>`](../pc-scene).

:::

## Attributes

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | String | - | Texture asset ID (must reference a `texture` type asset) |
| `center` | String | `"0 0.01 0"` | Sky center as space-separated "X Y Z" values (0-1 range) |
| `intensity` | Number | `"1"` | Sky brightness intensity |
| `level` | Number | `"0"` | Mipmap level to use for rendering |
| `rotation` | String | `"0 0 0"` | Sky rotation as space-separated "X Y Z" Euler angles |
| `scale` | String | `"100 100 100"` | Sky scale as space-separated "X Y Z" values |
| `type` | Enum | `"infinite"` | Sky type: `"box"` \| `"dome"` \| `"infinite"` \| `"none"` |

## Example

```html
<pc-asset id="skybox" src="assets/skybox.webp" preload></pc-asset>
<pc-scene>
    <pc-sky asset="skybox"></pc-sky>
</pc-scene>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-sky>` elements using the [SkyElement API](https://api.playcanvas.com/web-components/classes/SkyElement.html).
