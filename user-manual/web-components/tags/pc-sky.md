# <pc-sky>

The `<pc-sky>` tag gives a scene its sky from an image: a background drawn behind everything else and, with `lighting`, the environment that lights and reflects in the scene's materials.

:::note[Usage]

* It must be a direct child of a [`<pc-scene>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scene.md).

:::

## Attributes

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | [Asset ID](https://developer.playcanvas.com/user-manual/web-components/attributes.md#asset-and-material-ids) | - | Texture asset ID (must reference a `texture` type asset) |
| `center` | Vector3 | `"0 0.01 0"` | Sky center as "X Y Z" values (0-1 range). Used by the `box` and `dome` types |
| `intensity` | Number | `"1"` | Brightness of the sky, and of the lighting it provides |
| `lighting` | Boolean | `"false"` | Whether the sky's image also lights the scene, including the reflections in its materials. Read when the image loads |
| `mip-level` | Number | `"0"` | Mip level of the skybox, where 0 is the sharpest. Raising it selects a blurrier mip, which is how a skybox is softened without blurring the texture itself. Needs `lighting`, which is what creates the blurred mips |
| `rotation` | Vector3 | `"0 0 0"` | Sky rotation as "X Y Z" Euler angles in degrees |
| `scale` | Vector3 | `"100 100 100"` | Sky scale as "X Y Z" values. Used by the `box` and `dome` types |
| `type` | Enum | `"infinite"` | Sky type: `"box"` \| `"dome"` \| `"infinite"` \| `"none"`. `"none"` draws no background, while `lighting` still lights the scene |

## Example

An equirectangular texture as a dome-projected sky that also lights the scene (note `lighting`). Drag to look around, and try `type="infinite"`, `type="none"` to keep only the lighting, or a higher `mip-level` to soften it:

```html live-example
<pc-app>
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@2.22.6/scripts/esm/camera-controls.mjs"></pc-asset>
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

* [`<pc-asset>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-asset.md) — the equirectangular texture asset
* [`<pc-scene>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scene.md) — exposure, and where the sky lives in the engine
* [`<pc-light>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-light.md) — direct lights alongside the sky's image-based lighting

Examples: [GLB Loader](https://playcanvas.github.io/web-components/examples/#glb-loader.html), [Product Viewer](https://playcanvas.github.io/web-components/examples/#product-viewer.html) and [Shadow Cascades](https://playcanvas.github.io/web-components/examples/#shadow-cascades.html).
