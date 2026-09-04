---
title: <pc-gsplat>
description: "Reference for the pc-gsplat element: render Gaussian splat assets with attributes for the splat data source, shadows, and LOD tuning."
---

The `<pc-gsplat>` tag is used to define a gsplat component for rendering 3D Gaussian Splats.

When rendering splat-based scenes, it is recommended to set `antialias` to `false` and `max-pixel-ratio` to `1` on your [`<pc-app>`](../pc-app) tag for best performance.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity), a [`<pc-model>`](../pc-model) or a [`<pc-node>`](../pc-node).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | Gaussian splat asset ID (must reference a `gsplat` type asset) |
| `cast-shadows` | Boolean | `"false"` | Whether the gsplat component casts shadows |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `lod-falloff` | Number | `"1"` | How quickly this splat's detail falls off away from the camera, as an exponent from 0 to 8. Higher values concentrate more of the scene-wide splat budget near the camera; lower values spread it more evenly. Only affects assets that contain LOD levels. |
| `lod-range-max` | Number | `"99"` | Maximum allowed LOD index (inclusive). The LOD selected by distance is clamped so it never goes coarser (higher index) than this value. The default of `99` effectively means "no cap". Only affects assets that contain LOD levels. |
| `lod-range-min` | Number | `"0"` | Minimum allowed LOD index (inclusive). The LOD selected by distance is clamped so it never goes finer (lower index) than this value. Raising it avoids downloading the highest-quality (largest) LOD files. Only affects assets that contain LOD levels. |

</div>

## Level of Detail

A streamed splat asset is one exported with LOD levels: its [`<pc-asset>`](../pc-asset) `src` points at the export's `lod-meta.json`, which is downloaded up front while the splat data itself streams in on demand. Such an asset is not rendered at full detail everywhere. The engine works to a **scene-wide splat budget**: a target number of splats on screen across every `<pc-gsplat>` in the scene, spent where it buys the most. The budget and how it is spent are properties of the scene, so they live on [`<pc-scene>`](../pc-scene); how each splat competes for its share lives here:

| Attribute | On | What it controls |
| --- | --- | --- |
| `gsplat-splat-budget` | [`<pc-scene>`](../pc-scene) | The total number of splats to render across the scene. Defaults to 1,000,000; a budget larger than the scene resolves every node at its finest level |
| `gsplat-lod-mode` | [`<pc-scene>`](../pc-scene) | `"error"` spends the budget where it removes the most approximation error; `"distance"` ignores the error metadata and steps detail down in concentric bands around the camera, for captures whose error tables are unreliable |
| `lod-falloff` | `<pc-gsplat>` | How steeply *this* splat trades far-field detail for near-field detail within its share of the budget. 1 is neutral; higher values pull detail towards the camera |
| `lod-range-min`, `lod-range-max` | `<pc-gsplat>` | Hard clamps on the LOD index this splat may use, whatever the budget decides — raise the minimum to avoid ever downloading the largest files |

```html
<pc-scene gsplat-splat-budget="1500000" gsplat-lod-mode="error">
    <pc-entity name="capture">
        <pc-gsplat asset="capture" lod-falloff="1.5" lod-range-min="1"></pc-gsplat>
    </pc-entity>
</pc-scene>
```

There is no way to switch budgeted selection off: a budget of zero or less would pin every node to its coarsest level rather than lift the cap, so the engine warns and keeps the default instead. To see everything at full detail, set a budget larger than the capture. None of this affects a plain `.ply`, `.sog` or `.splat` asset with no LOD levels, which always renders in full.

The [Splat Streaming example](https://playcanvas.github.io/web-components/examples/splat-streaming.html) streams a large LOD capture and exposes the budget, so the trade-off can be watched rather than imagined.

## Example

A Gaussian splat scanned from a real toy. Drag to orbit and scroll to zoom — and note the `<pc-app>` attributes recommended above:

```html live-example
<pc-app antialias="false" max-pixel-ratio="1">
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@2.22.0/scripts/esm/camera-controls.mjs"></pc-asset>
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

* [`<pc-asset>`](../pc-asset) — the splat file, declared as a `gsplat` asset
* [`<pc-app>`](../pc-app) — the device settings recommended for splats
* [Using Web Components](../../gaussian-splatting/building/your-first-app/web-components.md) — a first splat app, step by step

Examples: [Basic Splat](https://playcanvas.github.io/web-components/examples/basic-splat.html), [Splat Annotations](https://playcanvas.github.io/web-components/examples/splat-annotations.html), [Splat Flipbook](https://playcanvas.github.io/web-components/examples/splat-flipbook.html) and [Splat Streaming](https://playcanvas.github.io/web-components/examples/splat-streaming.html).
