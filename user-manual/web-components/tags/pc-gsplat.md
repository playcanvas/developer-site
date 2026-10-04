# <pc-gsplat>

The `<pc-gsplat>` tag adds a gsplat component that renders a 3D Gaussian Splat: a scene captured as millions of small, soft, colored blobs.

When rendering splat-based scenes, it is recommended to set `antialias` to `false` and `max-pixel-ratio` to `1` on your [`<pc-app>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-app.md) tag for best performance.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md), a [`<pc-model>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-model.md) or a [`<pc-node>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-node.md).

:::

## Attributes

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | [Asset ID](https://developer.playcanvas.com/user-manual/web-components/attributes.md#asset-and-material-ids) | - | Gaussian splat asset ID (must reference a `gsplat` type asset) |
| `cast-shadows` | Boolean | `"false"` | Whether the gsplat component casts shadows |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `lod-base-distance` | Number | `"5"` | Camera distance of the first LOD transition, from LOD 0 to LOD 1: parts of the splat closer than this use the finest level. In world units, compensated for the camera's field of view, and clamped to a minimum of 0.1. Only affects assets that contain LOD levels. |
| `lod-multiplier` | Number | `"3"` | Multiplier between successive LOD transition distances: each coarser level starts at this many times the distance of the one before. Higher values keep finer detail further from the camera, at a higher memory cost. Clamped to a minimum of 1.2. Only affects assets that contain LOD levels. |
| `lod-range-max` | Number | `"99"` | Maximum allowed LOD index (inclusive). The selected LOD is clamped so it never goes coarser (higher index) than this value. The default of `99` effectively means "no cap". Only affects assets that contain LOD levels. |
| `lod-range-min` | Number | `"0"` | Minimum allowed LOD index (inclusive). The selected LOD is clamped so it never goes finer (lower index) than this value. Raising it avoids downloading the highest-quality (largest) LOD files. Only affects assets that contain LOD levels. |

## Level of Detail

A streamed splat asset is one exported with LOD levels: its [`<pc-asset>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-asset.md) `src` points at the export's `lod-meta.json`, which is downloaded up front while the splat data itself streams in on demand. Declare it with `type="gsplat"`, since a `.json` file would otherwise be loaded as plain JSON. Such an asset is not rendered at full detail everywhere. Its detail steps down with camera distance: the finest level out to `lod-base-distance`, then each coarser level from `lod-multiplier` times the distance where the one before began. The engine also works to a **scene-wide splat budget**, a number of splats across every `<pc-gsplat>` in the scene. The budget and how it is used are properties of the scene, so they live on [`<pc-scene>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scene.md); how each splat's detail falls off with distance lives here:

| Attribute | On | What it controls |
| --- | --- | --- |
| `gsplat-splat-budget` | [`<pc-scene>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scene.md) | The number of splats to render across the scene. Defaults to 1,000,000; 0 or less means no budget |
| `gsplat-splat-budget-mode` | [`<pc-scene>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scene.md) | `"target"`, the default, raises detail until the budget is used up, wherever the camera is, and the LOD distances only shape how detail falls off and how it divides between splats. `"limit"` lets the LOD distances decide the detail and only lowers it when they would exceed the budget, so a distant splat uses just the few splats its distance calls for |
| `lod-base-distance`, `lod-multiplier` | `<pc-gsplat>` | Where *this* splat's detail steps down. Raise either to keep finer detail further from the camera |
| `lod-range-min`, `lod-range-max` | `<pc-gsplat>` | Hard clamps on the LOD index this splat may use, whatever distance and the budget decide — raise the minimum to avoid ever downloading the largest files |

```html
<pc-asset id="capture" src="capture/lod-meta.json" type="gsplat"></pc-asset>
<!-- ... -->
<pc-scene gsplat-splat-budget="1500000" gsplat-splat-budget-mode="limit">
    <pc-entity name="capture">
        <pc-gsplat asset="capture" lod-base-distance="8" lod-range-min="1"></pc-gsplat>
    </pc-entity>
</pc-scene>
```

With no budget, `"target"` renders everything at its finest level and `"limit"` leaves the detail to the LOD distances alone. A plain `.ply` or `.sog` asset with no LOD levels always renders in full, but its splats count against the budget, leaving that much less for the streamed ones.

The [Splat Streaming example](https://playcanvas.github.io/web-components/examples/#splat-streaming.html) streams a large LOD capture. It pins `lod-range-min` to the coarsest level so the whole scene arrives quickly, then removes the pin and lets finer levels stream in, which shows the budget at work.

## Stochastic Rendering

Splats are normally sorted every frame and alpha blended. On WebGPU, `gsplat-stochastic` on [`<pc-scene>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scene.md) draws them unsorted instead, with dithered coverage and depth writes, which takes the sort out of the frame at the cost of a fine noise. Temporal anti-aliasing smooths the noise out, and `gsplat-dither` picks its pattern. WebGL ignores both attributes.

```html
<pc-scene gsplat-stochastic gsplat-dither="bayer4">
```

## Example

A Gaussian splat scanned from a real toy. Drag to orbit and scroll to zoom — and note the `<pc-app>` attributes recommended above:

```html live-example
<pc-app antialias="false" max-pixel-ratio="1">
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@2.23.0/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset id="toy" src="https://developer.playcanvas.com/assets/toy-cat.sog"></pc-asset>
    <pc-scene>
        <pc-entity name="camera" position="0 0 2.5">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
            <pc-script>
                <pc-script-instance name="cameraControls" enable-pan="false" zoom-range="1 5"></pc-script-instance>
            </pc-script>
        </pc-entity>
        <pc-entity name="toy" position="0 -0.7 0" rotation="0 0 180">
            <pc-gsplat asset="toy"></pc-gsplat>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-gsplat>` elements using the [GSplatComponentElement API](https://api.playcanvas.com/web-components/classes/GSplatComponentElement.html).

The `component` property is the engine [GSplatComponent](https://api.playcanvas.com/engine/classes/GSplatComponent.html) the element adds — `null` until the element is ready — and everything the attributes do not expose is available on it.

## See Also

* [`<pc-asset>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-asset.md) — the splat file, declared as a `gsplat` asset
* [`<pc-app>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-app.md) — the device settings recommended for splats
* [Using Web Components](https://developer.playcanvas.com/user-manual/gaussian-splatting/building/your-first-app/web-components.md) — a first splat app, step by step

Examples: [Basic Splat](https://playcanvas.github.io/web-components/examples/#basic-splat.html), [Splat Annotations](https://playcanvas.github.io/web-components/examples/#splat-annotations.html), [Splat Flipbook](https://playcanvas.github.io/web-components/examples/#splat-flipbook.html) and [Splat Streaming](https://playcanvas.github.io/web-components/examples/#splat-streaming.html).
