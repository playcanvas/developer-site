---
title: Transparency
description: "Compare the ways PlayCanvas renders transparent surfaces: alpha blending, alpha test, opacity dithering and alpha to coverage, and when to use each."
---

PlayCanvas offers several ways to render a surface that is not fully opaque. They differ in cost, in how much they depend on draw order, and in the kind of artifacts they produce, so the right choice depends on what you are rendering.

All of them are driven by the material's opacity, which comes from [`StandardMaterial#opacity`](https://api.playcanvas.com/engine/classes/StandardMaterial.html#opacity), an [`opacityMap`](https://api.playcanvas.com/engine/classes/StandardMaterial.html#opacitymap), or vertex colors.

## Alpha Blending

Setting [`blendType`](https://api.playcanvas.com/engine/classes/Material.html#blendtype) to a blending mode such as `BLEND_NORMAL` mixes the surface with whatever is already in the frame buffer.

```javascript
material.blendType = pc.BLEND_NORMAL;
material.opacity = 0.5;
material.update();
```

This gives the smoothest result and supports any opacity value, but it is order dependent. Blended geometry is drawn in the transparent pass, after opaque geometry, and is sorted back to front per layer according to [`Layer#transparentSortMode`](https://api.playcanvas.com/engine/classes/Layer.html#transparentsortmode). Sorting happens per mesh instance, so it cannot resolve a single mesh that overlaps itself - a common source of artifacts on foliage, hair and glass. Blended materials also normally disable depth writes, so they do not occlude each other.

## Alpha Test

[`alphaTest`](https://api.playcanvas.com/engine/classes/Material.html#alphatest) discards any fragment whose opacity falls below a threshold.

```javascript
material.alphaTest = 0.5;
material.update();
```

The result is binary - a fragment is either fully opaque or gone - so there is nothing to sort and the material stays in the opaque pass, writing depth normally. That makes it cheap and completely order independent, at the cost of hard, aliased cutout edges. It is the usual choice for dense foliage and other cutouts where partial opacity is not needed.

## Opacity Dithering

[`opacityDither`](https://api.playcanvas.com/engine/classes/StandardMaterial.html#opacitydither) converts opacity into a screen-space dither pattern, discarding a proportion of fragments instead of blending them.

```javascript
material.blendType = pc.BLEND_NONE;
material.opacity = 0.5;
material.opacityDither = pc.DITHER_BAYER8;
material.update();
```

Available patterns are `DITHER_BAYER2`, `DITHER_BAYER4`, `DITHER_BAYER8`, `DITHER_BAYER16`, `DITHER_BLUENOISE` and `DITHER_IGNNOISE`. Like alpha test this is order independent and stays in the opaque pass, but it supports continuous opacity. The trade-off is visible noise, which resolves into smooth transparency when combined with temporal antialiasing or a high output resolution. [`opacityShadowDither`](https://api.playcanvas.com/engine/classes/StandardMaterial.html#opacityshadowdither) applies the same technique to the shadow the object casts.

## Alpha To Coverage

[`alphaToCoverage`](https://api.playcanvas.com/engine/classes/Material.html#alphatocoverage) uses the fragment's alpha to build an MSAA sample coverage mask. Instead of blending, the hardware keeps a proportion of the multi-sample coverage matching the alpha value.

```javascript
material.blendType = pc.BLEND_NONE;
material.opacity = 0.5;
material.alphaToCoverage = true;
material.update();
```

Blending does not need to be enabled - the alpha is consumed by the coverage mask, much like alpha test. The material stays in the opaque pass and writes depth, which makes the result order independent.

Quality is bounded by the sample count of the render target. With 4x MSAA, opacity is quantized to 0%, 25%, 50%, 75% and 100%, which is why alpha to coverage works well for softening the sharp edges of an alpha cutout, but is a poor choice for large areas of even semi-transparency, where the quantization is obvious.

### Requirements

Alpha to coverage requires a multi-sampled render target and is **silently ignored** when rendering into a single-sampled one. Nothing is logged in release builds and no error is raised - the surface simply renders as fully opaque. If you enable the flag and see no change, check that antialiasing is actually on:

```javascript
const device = await pc.createGraphicsDevice(canvas, {
    deviceTypes: [deviceType],
    antialias: true
});
```

On WebGPU there is an additional requirement: the first color attachment of the render target must use a blendable format that has an alpha channel. This matters in practice because [`CameraFrame`](https://api.playcanvas.com/engine/classes/CameraFrame.html) prefers `PIXELFORMAT_111110F` for its HDR render target, and that format has no alpha channel. Alpha to coverage is therefore ignored for geometry rendered through `CameraFrame` with its default formats, and a warning is logged in debug builds. Requesting a format with an alpha channel resolves it:

```javascript
cameraFrame.rendering.renderFormats = [pc.PIXELFORMAT_RGBA16F];
cameraFrame.update();
```

WebGL has no equivalent restriction, as it uses the alpha the shader outputs regardless of whether the render target stores an alpha channel. Alpha to coverage therefore still applies on WebGL with formats such as `PIXELFORMAT_111110F`, which is a deliberate difference between the two backends rather than a bug.

## Choosing an Approach

| Technique | Opacity | Order dependent | Pass | Main drawback |
|-----------|---------|-----------------|------|---------------|
| Alpha blending | Continuous | Yes | Transparent | Sorting artifacts, no self-sorting |
| Alpha test | Binary | No | Opaque | Hard, aliased edges |
| Opacity dithering | Continuous | No | Opaque | Visible noise without TAA |
| Alpha to coverage | Quantized to sample count | No | Opaque | Needs MSAA, coarse steps |

As a rough guide, use alpha blending for glass and other genuinely see-through surfaces where quality matters more than ordering; alpha test for dense cutouts; opacity dithering for fades and level-of-detail transitions, especially when temporal antialiasing is already enabled; and alpha to coverage to soften cutout edges when MSAA is already being paid for.
