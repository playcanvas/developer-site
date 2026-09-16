---
title: Modern Post Processing
description: "CameraFrame HDR stack: volumetric fog, bloom, SSAO, TAA, depth of field, color enhancement, grading, and customization."
---

PlayCanvas offers modern post-processing workflows that provide visually advanced and performant implementations. The primary approach uses the [`CameraFrame`](https://api.playcanvas.com/engine/classes/CameraFrame.html) class for HDR post-processing with built-in effects, but you can also create fully custom render passes for complete control.

## Features

The `CameraFrame` enables advanced rendering techniques including:

- **Bloom** - HDR physically based bloom effect that simulates the natural glow of bright light sources
- **[Volumetric Fog](volumetric-fog.md)** - Height fog and light shafts lit by directional, omni, and spot lights
- **SSAO (Screen Space Ambient Occlusion)** - Enhances depth perception by simulating ambient light occlusion
- **Depth of Field (DoF)** - Mimics camera focus effects, blurring objects outside the focal plane
- **Temporal Anti-Aliasing (TAA)** - Reduces visual artifacts by smoothing jagged edges over time
- **Vignette** - Blends the image edges towards a configurable color using `vignette.color`
- **Color Grading** - Adjusts brightness, contrast, saturation, and color tint for stylistic effects
- **[Color Enhance](#color-enhance)** - Adjusts shadows, highlights, midtones, vibrance, and dehaze in HDR
- **Color LUT** - Apply color lookup tables for advanced color transformations. See [HDR Rendering > Color LUT](/user-manual/graphics/linear-workflow/hdr-rendering/#color-lut) for details.
- **Fringing** - Chromatic aberration effect that simulates color channel separation
- **Tone Mapping** - Controls how HDR colors are mapped to displayable range
- **Sharpness** - Enhances image sharpness to counteract blurriness from TAA or upscaling

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

Modern post-processing can be customized and extended in several ways. Choose the approach that best fits your needs:

### [Customizing the Compose Shader](compose-shader)

Extend the `CameraFrame` by adding effects to the final compose pass only. This is the simplest approach when you don't need additional render passes.

**Best for:** Simple screen-space effects, color adjustments, quick prototyping.

### [Extending FramePassCameraFrame Class](extending-class)

Extend the `CameraFrame` by adding custom frame passes. This allows you to integrate additional rendering techniques while leveraging built-in effects.

**Best for:** Multi-pass effects, advanced integrations, processing intermediate results.

### [Custom Render Passes](custom-passes)

Build a complete custom post-processing stack without using `CameraFrame`. This gives you full control over the entire rendering pipeline.

**Best for:** Complete custom pipelines, specialized rendering, maximum flexibility.
