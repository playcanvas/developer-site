---
title: <pc-gsplat>
description: "Reference for the pc-gsplat element: render Gaussian splat assets with attributes for the splat data source, shadows, and LOD tuning."
---

The `<pc-gsplat>` tag is used to define a gsplat component for rendering 3D Gaussian Splats.

When rendering splat-based scenes, it is recommended to set `antialias` to `false` and `max-pixel-ratio` to `1` on your [`<pc-app>`](../pc-app) tag for best performance.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | String | - | Gaussian splat asset ID (must reference a `gsplat` type asset) |
| `cast-shadows` | Boolean | `"false"` | Whether the gsplat component casts shadows |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `lod-base-distance` | Number | `"5"` | Distance for the first LOD transition (LOD 0 to LOD 1). Splats closer than this use the highest-quality LOD. Minimum `0.1`. Only affects assets that contain LOD levels. |
| `lod-multiplier` | Number | `"3"` | Multiplier between successive LOD distance thresholds, forming a geometric progression. Higher values switch to coarser LODs sooner. Minimum `1.2`. Only affects assets that contain LOD levels. |
| `lod-range-max` | Number | `"99"` | Maximum allowed LOD index (inclusive). The LOD selected by distance is clamped so it never goes coarser (higher index) than this value. The default of `99` effectively means "no cap". Only affects assets that contain LOD levels. |
| `lod-range-min` | Number | `"0"` | Minimum allowed LOD index (inclusive). The LOD selected by distance is clamped so it never goes finer (lower index) than this value. Raising it avoids downloading the highest-quality (largest) LOD files. Only affects assets that contain LOD levels. |

</div>

## Example

A Gaussian splat scanned from a real toy. Drag to orbit and scroll to zoom — and note the `<pc-app>` attributes recommended above:

```html live-example
<pc-app antialias="false" max-pixel-ratio="1">
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@2.21.4/scripts/esm/camera-controls.mjs"></pc-asset>
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

The examples cover a few splat workflows: [Basic Splat](https://playcanvas.github.io/web-components/examples/basic-splat.html), [Splat Annotations](https://playcanvas.github.io/web-components/examples/splat-annotations.html), [Splat Flipbook](https://playcanvas.github.io/web-components/examples/splat-flipbook.html) and [Splat Streaming](https://playcanvas.github.io/web-components/examples/splat-streaming.html).
