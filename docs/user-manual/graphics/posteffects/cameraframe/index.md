---
title: Modern Post Processing
description: "CameraFrame HDR stack: volumetric fog, bloom, SSAO, TAA, depth of field, color enhancement, grading, and customization."
---

PlayCanvas offers modern post-processing workflows that provide visually advanced and performant implementations. The primary approach uses the [`CameraFrame`](https://api.playcanvas.com/engine/classes/CameraFrame.html) class for HDR post-processing with built-in effects, but you can also create fully custom render passes for complete control.

## Features

The `CameraFrame` enables advanced rendering techniques including:

- **Bloom** - HDR physically based bloom effect that simulates the natural glow of bright light sources, with an optional brightness threshold to restrict the glow to the brightest parts of the scene
- **[Volumetric Fog](volumetric-fog.md)** - Height fog and light shafts lit by directional, omni, and spot lights
- **SSAO (Screen Space Ambient Occlusion)** - Enhances depth perception by simulating ambient light occlusion
- **Depth of Field (DoF)** - Mimics camera focus effects, blurring objects outside the focal plane
- **Temporal Anti-Aliasing (TAA)** - Reduces visual artifacts by smoothing jagged edges over time, and can upscale a scene rendered at a lower resolution
- **SMAA (Subpixel Morphological Anti-Aliasing)** - Smooths jagged edges within a single frame, without jittering the camera or ghosting
- **Vignette** - Blends the image edges towards a configurable color using `vignette.color`
- **Color Grading** - Adjusts brightness, contrast, saturation, and color tint for stylistic effects
- **[Color Enhance](#color-enhance)** - Adjusts shadows, highlights, midtones, vibrance, and dehaze in HDR
- **Color LUT** - Apply color lookup tables for advanced color transformations. See [HDR Rendering > Color LUT](/user-manual/graphics/linear-workflow/hdr-rendering/#color-lut) for details.
- **Fringing** - Chromatic aberration effect that simulates color channel separation
- **Tone Mapping** - Controls how HDR colors are mapped to displayable range
- **Sharpness** - Enhances image sharpness to counteract blurriness from TAA or upscaling
- **Auto Exposure** - Adapts the exposure of the camera to the brightness of what it sees
- **[Lens Flare](lens-flare.md)** - Flares of lights, fading as their light is covered by the scene
- **[Dynamic Sky](dynamic-sky.md)** - A day and night sky with clouds, lighting the scene and keeping the sun light in sync

Apart from tone mapping, each of these is an effect, a [`CameraFrameEffect`](https://api.playcanvas.com/engine/classes/CameraFrameEffect.html). Most are built into the camera frame, such as `cameraFrame.bloom` and `cameraFrame.vignette`. SMAA, auto exposure, lens flare and dynamic sky are added to it with [`addEffect`](https://api.playcanvas.com/engine/classes/CameraFrame.html#addeffect). You can also write [effects of your own](custom-effects.md).

## Setup and Usage

For detailed information on setting up and using `CameraFrame`, see the [HDR Rendering](/user-manual/graphics/linear-workflow/hdr-rendering/) guide and the [CameraFrame API documentation](https://api.playcanvas.com/engine/classes/CameraFrame.html).

For Editor users, a ready-to-use script is available. See [CameraFrame in the Editor](/user-manual/graphics/linear-workflow/hdr-rendering/#cameraframe-in-the-editor) for setup instructions.

### Color Enhance {#color-enhance}

`colorEnhance` provides selective adjustments in addition to the brightness, contrast, saturation, and tint controls in `grading`:

- `shadows` and `highlights` brighten or darken those areas, with a range of -3 to 3 and a neutral value of 0.
- `midtones` adjusts intermediate brightness while preserving shadows and highlights more strongly than an exposure change, with a range of -1 to 1.
- `vibrance` boosts less-saturated colors more than already-saturated ones. Negative values desaturate; the range is -1 to 1.
- `dehaze` increases clarity for positive values and adds haze for negative values, with a range of -1 to 1. This is a color adjustment; use [volumetric fog](volumetric-fog.md) for fog illuminated by scene lights.

```javascript
cameraFrame.colorEnhance.enabled = true;
cameraFrame.colorEnhance.shadows = 0.5;
cameraFrame.colorEnhance.midtones = 0.1;
cameraFrame.colorEnhance.vibrance = 0.2;
cameraFrame.update();
```

All five adjustments default to 0, and the effect is disabled by default.

### Vignette Color

Use `vignette.color` to tint the edges instead of fading them to black:

```javascript
cameraFrame.vignette.intensity = 0.4;
cameraFrame.vignette.color.set(0.1, 0.05, 0.2);
cameraFrame.update();
```

`inner`, `outer`, and `curvature` control the shape and falloff. Setting `outer` below `inner` reverses the effect, applying it towards the center.

### Debug Views {#debug-views}

Set `cameraFrame.debug` to inspect an intermediate result: `'scene'`, `'ssao'`, `'bloom'`, `'vignette'`, `'dofcoc'` (depth-of-field circle of confusion), `'dofblur'`, or `'depth'`.

```javascript
cameraFrame.debug = 'depth';
cameraFrame.update();
```

Debug views do not enable effects or generate additional textures. The depth view is black if the frame is not already producing scene depth; effect views require the corresponding effect to be enabled. Set `debug` to `null` and call `update()` to return to the composed image. In the Editor script, use **Rendering > Debug** and select **None** to restore normal output.

For Gaussian splats, see [scene depth requirements](volumetric-fog.md#gaussian-splats) when using fog or depth of field.

## Examples

- HDR with Bloom and LUT - Demonstrates HDR bloom and color lookup table effects

<EngineExample id="graphics/hdr" title="HDR with Bloom and LUT" />

- Post-Processing - Shows bloom, grading, Color Enhance, colored vignette, fringing, and TAA

<EngineExample id="graphics/post-processing" title="Post-Processing" />

- Ambient Occlusion - Demonstrates SSAO implementation

<EngineExample id="graphics/ambient-occlusion" title="Ambient Occlusion" />

- Depth of Field - Demonstrates depth of field effect

<EngineExample id="graphics/depth-of-field" title="Depth of Field" />

- Temporal Anti-Aliasing - Demonstrates TAA implementation

<EngineExample id="graphics/taa" title="Temporal Anti-Aliasing" />

- Volumetric Fog - Height fog illuminated by a directional light

<EngineExample id="graphics/volumetric-fog" title="Volumetric Fog" />

- Volumetric Fog Local Lights - Omni and spot lights scattering in fog

<EngineExample id="graphics/volumetric-fog-local-lights" title="Volumetric Fog Local Lights" />

- Volumetric Fog Shafts - Shadowed spot light beams and light cookies

<EngineExample id="graphics/volumetric-fog-shafts" title="Volumetric Fog Shafts" />

- LUT Grading - Crossfade between two color grades on a Gaussian splat scene

<EngineExample id="gaussian-splatting/lut-grading" title="LUT Grading" />

## Custom Post Processing

Modern post-processing can be extended in three ways. Choose the approach that best fits your needs:

### [Custom Effects](custom-effects.md)

Add effects of your own to the composition of the `CameraFrame`, next to the built-in effects. An effect contributes a shader chunk to the single compose pass, so it costs no additional full-screen pass.

**Best for:** Screen-space effects, color adjustments, stylized looks.

### [Effects with Passes](effect-passes.md)

Write effects which own frame passes, rendering at the stages of the camera frame, such as before the scene, between its opaque and transparent geometry, or after it.

**Best for:** Multi-pass effects, effects at a lower resolution, rendering into the scene, effects accumulating frames over time.

### [Camera Passes](/user-manual/graphics/advanced-rendering/frame-graph/camera-passes/)

Replace the rendering of a camera with frame passes of your own, without using `CameraFrame`. This gives you full control over the whole rendering of the camera.

**Best for:** Complete custom pipelines, specialized rendering, maximum flexibility.
