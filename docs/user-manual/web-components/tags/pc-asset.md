---
title: <pc-asset>
---

The `<pc-asset>` tag is used to define an asset.

:::note[Usage]

* It must be a direct child of [`<pc-app>`](../pc-app).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | String | - | Unique identifier used by other tags to reference this asset |
| `lazy` | Flag | - | Whether to defer loading until first referenced or explicitly requested |
| `src` | String | - | Path to the asset file |
| `type` | Enum | *inferred* | Asset type: `"audio"` \| `"binary"` \| `"css"` \| `"container"` \| `"gsplat"` \| `"html"` \| `"json"` \| `"script"` \| `"shader"` \| `"text"` \| `"texture"` |

</div>

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
