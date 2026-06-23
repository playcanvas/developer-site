---
title: Relighting
description: "Relight Gaussian splat scenes with standard lights using a proxy mesh and the GsplatRelighting script: setup, lights, shadows and tuning."
---

Gaussian splat scenes are captured with their lighting baked in. Relighting lets you change that lighting at runtime — add a sun with soft shadows, place point lights, or swap the environment — by lighting a **proxy mesh** of the scene with standard lights and transferring that lighting onto the splats per pixel.

**View Live Example** - A splat scene relit by an HDRI environment, a PCSS directional light and shadow-casting omni lights.

<EngineExample id="gaussian-splatting/relighting" title="View Live Example" />

## How It Works

1. A simplified mesh approximating the splat scene (for example reconstructed from the splats, or the photogrammetry mesh) is placed on a dedicated layer, together with the lights that should light it.
2. The `GsplatRelighting` script renders that layer from a camera matching the main camera into an offscreen texture: lit mesh color in RGB, and a mesh coverage mask in alpha.
3. A [fragment stage](/user-manual/gaussian-splatting/building/custom-shaders/fragment) shader chunk modulates each splat fragment by the lighting sampled at its own screen position. Because the texture is screen-aligned with the main camera, no reprojection is needed and the lighting transfers per pixel.

Splats not covered by the proxy mesh (such as the sky) are left untinted, or scaled by a separate background multiplier so they can follow the environment exposure.

## Setup

The technique is packaged in the [`GsplatRelighting`](https://github.com/playcanvas/engine/blob/main/scripts/esm/gsplat/gsplat-relighting.mjs) script. Attach it to the entity holding your main camera:

```javascript
import { GsplatRelighting } from 'playcanvas/scripts/esm/gsplat/gsplat-relighting.mjs';

camera.addComponent('script');
const relighting = camera.script.create(GsplatRelighting, {
    properties: {
        blend: 0.5,
        brightness: 1
    }
});
```

Place the proxy mesh on the relighting layer, with a material configured to write the coverage mask:

```javascript
const meshMaterial = new pc.StandardMaterial();
meshMaterial.diffuse = new pc.Color(0.5, 0.5, 0.5);
relighting.configureMaterial(meshMaterial);

const meshEntity = meshAsset.resource.instantiateRenderEntity();
meshEntity.findComponents('render').forEach((render) => {
    render.layers = [relighting.layer.id];
    render.meshInstances.forEach((meshInstance) => {
        meshInstance.material = meshMaterial;
    });
});
app.root.addChild(meshEntity);
```

Then add lights to the same layer — any standard lights work, including image based lighting, shadow-casting directional and omni lights:

```javascript
const light = new pc.Entity('sun');
light.addComponent('light', {
    type: 'directional',
    layers: [relighting.layer.id],
    castShadows: true
});
app.root.addChild(light);
```

## Script Attributes

| Attribute | Default | Purpose |
| --- | --- | --- |
| `blend` | 1 | How much the mesh lighting affects the splats (0 = original splats, 1 = fully modulated) |
| `brightness` | 2 | Brightness of the lighting when tinting; 2 compensates the 0.5 gray albedo of the proxy material |
| `background` | 1 | Multiplier for splats not covered by the mesh (e.g. the sky), letting them follow environment exposure |
| `textureScale` | 1 | Resolution of the lighting texture relative to the back buffer |
| `layerName` | `'Relighting'` | Name of the layer for the proxy mesh and lights (created if missing) |
| `priority` | -1 | Priority of the internal camera; keep below the main camera so the texture renders first |

The lighting texture is available as `relighting.texture` (HDR where supported), for debugging or further processing.

## Notes

- The proxy mesh quality directly drives the result: where its silhouette diverges from the splat surface, lighting boundaries land in the wrong place. A closer-matching mesh is the main quality lever.
- Lights that do not move can use [`SHADOWUPDATE_THISFRAME`](https://api.playcanvas.com/engine/variables/SHADOWUPDATE_THISFRAME.html) to render their shadow maps once instead of every frame — the live example does this for its omni lights.

## See Also

- [Custom Shaders](/user-manual/gaussian-splatting/building/custom-shaders) — the shader chunk system this is built on
- [Fragment Stage Customization](/user-manual/gaussian-splatting/building/custom-shaders/fragment) — the per-pixel hook used to apply the lighting
