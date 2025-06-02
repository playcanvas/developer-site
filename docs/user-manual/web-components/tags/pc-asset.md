---
title: <pc-asset>
---

The `<pc-asset>` tag is used to define an asset.

:::note

* It must be a direct child of [`<pc-app>`](../pc-app).

:::

## Attributes

| Attribute | Description |
| --- | --- |
| `id` | The ID of the asset. This is used by other tags (such as [`<pc-sky>`](../pc-sky)) to reference this asset. |
| `lazy` | Valueless attribute. If present, the asset is not loaded until it is first referenced by the scene or explicitly requested via the Engine's Asset API. |
| `src` | The path to the asset. |
| `type` | The type of asset. If not specified, the type is inferred from the file extension. Can be: `audio`, `binary`, `css`, `container`, `gsplat`, `html`, `json`, `script`, `shader`, `text`, `texture`. |

## Example

```html
<pc-app>
    <!-- Script asset -->
    <pc-asset src="assets/scripts/animate.mjs"></pc-asset>
    <!-- GLB asset -->
    <pc-asset src="assets/models/car.glb" id="car"></pc-asset>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-asset>` elements using the [AssetElement API](https://api.playcanvas.com/web-components/classes/AssetElement.html).
