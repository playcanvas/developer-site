---
title: Tone Mapping & Exposure
description: Map HDR scene lighting to your display with per-camera tone mapping and gamma, plus optional physically based exposure controls.
---

:::ai

* **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Create and configure Camera Components, focus the editing camera, and launch or capture the scene to verify the view.

:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Lighting calculations happen in high dynamic range: the intensity of a pixel can far exceed what a standard display can show. Tone mapping is the final transform that compresses this HDR range into displayable colors, and it has a major impact on the look of your scene. In PlayCanvas, tone mapping is set per camera.

## Tone Mapping {#tone-mapping}

The available tone mapping curves are:

* [`TONEMAP_LINEAR`](https://api.playcanvas.com/engine/variables/TONEMAP_LINEAR.html) — no compression; bright values simply clip at white. The default.
* [`TONEMAP_FILMIC`](https://api.playcanvas.com/engine/variables/TONEMAP_FILMIC.html) — a classic filmic curve with gentle roll-off in the highlights.
* [`TONEMAP_HEJL`](https://api.playcanvas.com/engine/variables/TONEMAP_HEJL.html) — a punchy, contrasty filmic approximation.
* [`TONEMAP_ACES`](https://api.playcanvas.com/engine/variables/TONEMAP_ACES.html) — the Academy Color Encoding System curve, widely used for cinematic, photorealistic rendering.
* [`TONEMAP_ACES2`](https://api.playcanvas.com/engine/variables/TONEMAP_ACES2.html) — a variant of ACES with a different balance of contrast and saturation.
* [`TONEMAP_NEUTRAL`](https://api.playcanvas.com/engine/variables/TONEMAP_NEUTRAL.html) — compresses highlights while keeping hue and saturation shifts minimal; a good choice when accurate colors matter (e.g. product configurators).

For physically based scenes with HDR lighting, `TONEMAP_ACES` or `TONEMAP_NEUTRAL` are usually the best starting points.

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
camera.camera.toneMapping = pc.TONEMAP_ACES;
```

</TabItem>
<TabItem value="editor" label="Editor">

Select the camera in the Hierarchy and set **Tonemapping** in the [Camera Component](/user-manual/editor/scenes/components/camera).

</TabItem>
<TabItem value="react" label="React">

```jsx
import { TONEMAP_ACES } from 'playcanvas';

<Entity name="camera">
  <Camera toneMapping={TONEMAP_ACES} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<!-- tonemap: none | linear | filmic | hejl | aces | aces2 | neutral -->
<pc-entity name="camera">
  <pc-camera tonemap="aces"></pc-camera>
</pc-entity>
```

</TabItem>
</Tabs>

:::note

When post-processing is active via [CameraFrame](/user-manual/graphics/posteffects/cameraframe/), tone mapping is applied by the post-processing pipeline instead — set it on the `CameraFrame`'s rendering options rather than the camera.

:::

## Gamma Correction {#gamma-correction}

After tone mapping, the camera's output is gamma-encoded for display on standard sRGB screens. This is controlled by `gammaCorrection`:

* [`GAMMA_SRGB`](https://api.playcanvas.com/engine/variables/GAMMA_SRGB.html) — output is encoded for sRGB displays. The default and recommended setting for all normal rendering.
* [`GAMMA_NONE`](https://api.playcanvas.com/engine/variables/GAMMA_NONE.html) — output remains in linear space. This is only intended for advanced HDR pipelines where the output is rendered to an intermediate HDR texture that is tone mapped and gamma-corrected in a subsequent pass. On a standard display, it makes the scene appear too dark.

To understand why rendering is performed in linear space and gamma-encoded at the end, see [Linear Workflow](/user-manual/graphics/linear-workflow/).

## Physical Exposure {#physical-exposure}

By default, scene brightness is controlled by a simple `scene.exposure` multiplier. Alternatively, the camera can model the exposure of a physical camera using three properties familiar to photographers:

```javascript
app.scene.physicalUnits = true; // light intensities are now in physical units (lux)

camera.camera.aperture = 16;        // f-stops — higher means less exposure (default: 16)
camera.camera.shutter = 1 / 1000;   // seconds — longer means more exposure (default: 1/1000)
camera.camera.sensitivity = 1000;   // ISO — higher means more exposure (default: 1000)
```

:::note

`aperture`, `shutter` and `sensitivity` only take effect when `scene.physicalUnits` is `true`. When it is `false` (the default), `scene.exposure` is used instead.

:::

See it in action in the engine's physical units example:

<EngineExample id="graphics/light-physical-units" title="Physical Light Units" />
