---
title: <pc-sky>
description: "Reference for the pc-sky element: skybox from a texture asset with box, dome, or infinite projection, optional scene lighting, and rotation."
---

The `<pc-sky>` tag is used to define a sky component.

:::note[Usage]

* It must be a direct child of a [`<pc-scene>`](../pc-scene).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | Texture asset ID (must reference a `texture` type asset) |
| `center` | Vector3 | `"0 0.01 0"` | Sky center as "X Y Z" values (0-1 range) |
| `intensity` | Number | `"1"` | Sky brightness intensity |
| `lighting` | Boolean | `"false"` | Whether the skybox is used as a light source |
| `mip-level` | Number | `"0"` | Mip level of the skybox, where 0 is the sharpest. Raising it selects a blurrier mip, which is how a skybox is softened without blurring the texture itself |
| `rotation` | Vector3 | `"0 0 0"` | Sky rotation as "X Y Z" Euler angles |
| `scale` | Vector3 | `"100 100 100"` | Sky scale as "X Y Z" values |
| `type` | Enum | `"infinite"` | Sky type: `"box"` \| `"dome"` \| `"infinite"` \| `"none"` |

</div>

## Example

An equirectangular texture as a dome-projected sky that also lights the scene (note `lighting`). Drag to look around, and try `type="infinite"`, a `rotation` of `"0 90 0"` or a higher `mip-level` to soften it:

```html live-example
<pc-app>
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@2.21.4/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset id="skybox" src="https://developer.playcanvas.com/assets/sepulchral-chapel-rotunda-4k.webp"></pc-asset>
    <pc-scene>
        <pc-sky asset="skybox" type="dome" center="0 0.05 0" scale="20 20 20" lighting></pc-sky>
        <pc-entity name="camera" position="0 1.5 5">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
            <pc-script>
                <pc-script-instance name="cameraControls" enable-pan="false" pitch-range="-90 0" zoom-range="2 12"></pc-script-instance>
            </pc-script>
        </pc-entity>
        <pc-entity name="sphere" position="0 1 0">
            <pc-render type="sphere"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-sky>` elements using the [SkyElement API](https://api.playcanvas.com/web-components/classes/SkyElement.html).

The attributes are mirrored as properties. The sky itself is engine scene state — `sky` and the environment atlas on the [Scene](https://api.playcanvas.com/engine/classes/Scene.html) — reached through the `<pc-scene>` element's `scene` property.

## See Also

* [`<pc-asset>`](../pc-asset) — the equirectangular texture asset
* [`<pc-scene>`](../pc-scene) — exposure, and where the sky lives in the engine
* [`<pc-light>`](../pc-light) — direct lights alongside the sky's image-based lighting

Examples: [GLB Loader](https://playcanvas.github.io/web-components/examples/glb-loader.html), [Product Viewer](https://playcanvas.github.io/web-components/examples/product-viewer.html) and [Shadow Cascades](https://playcanvas.github.io/web-components/examples/shadow-cascades.html).
