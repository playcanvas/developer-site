---
title: <pc-asset>
description: "Reference for the pc-asset element: declare assets to load by URL or id, types, preloading, and how other tags consume loaded resources."
---

The `<pc-asset>` tag is used to define an asset.

:::note[Usage]

* It must be a direct child of [`<pc-app>`](../pc-app).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `atlas` | String | - | For `sprite` assets: the `id` of the `textureatlas` `<pc-asset>` this sprite reads from. The atlas must be declared before the sprite |
| `data` | String | - | Inline JSON asset data. Used by texture atlases (frame definitions) and sprites |
| `frame-keys` | String | - | For `sprite` assets: space- or comma-separated list of atlas frame keys that make up the sprite |
| `id` | String | - | Unique identifier used by other tags to reference this asset |
| `lazy` | Flag | - | Whether to defer loading until first referenced or explicitly requested |
| `pixels-per-unit` | Number | `"1"` | For `sprite` assets: number of pixels per world unit |
| `render-mode` | Enum | `"simple"` | For `sprite` assets: `"simple"` \| `"sliced"` \| `"tiled"`. Use `"sliced"` for 9-slice panels |
| `src` | String | - | Path to the asset file |
| `type` | Enum | *inferred* | Asset type: `"audio"` \| `"binary"` \| `"css"` \| `"container"` \| `"font"` \| `"gsplat"` \| `"html"` \| `"json"` \| `"script"` \| `"shader"` \| `"sprite"` \| `"text"` \| `"texture"` \| `"textureatlas"` |

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

Sprites are defined by a texture atlas (which holds the frame definitions) and one or more `sprite` assets that reference it. The atlas must be declared before any sprite that uses it:

```html
<pc-app>
    <!-- Texture atlas, with inline frame definitions -->
    <pc-asset id="ui-sheet" type="textureatlas" src="assets/textures/ui.png"
              data='{"frames":{"3":{"name":"panel","border":[10,10,10,10],"rect":[41,1,100,100],"pivot":[0.5,0.5]}}}'></pc-asset>
    <!-- 9-sliced sprite that reads frame "3" from the atlas -->
    <pc-asset id="panel" type="sprite" atlas="ui-sheet" frame-keys="3" render-mode="sliced"></pc-asset>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-asset>` elements using the [AssetElement API](https://api.playcanvas.com/web-components/classes/AssetElement.html).
