---
title: Modern Post Processing
---

PlayCanvas offers modern post-processing workflows that provide visually advanced and performant implementations. The primary approach uses the `CameraFrame` class for HDR post-processing with built-in effects, but you can also create fully custom render passes for complete control.

## Features

The `CameraFrame` enables advanced rendering techniques including:

- **Bloom** - HDR physically based bloom effect that simulates the natural glow of bright light sources
- **SSAO (Screen Space Ambient Occlusion)** - Enhances depth perception by simulating ambient light occlusion
- **Depth of Field (DoF)** - Mimics camera focus effects, blurring objects outside the focal plane
- **Temporal Anti-Aliasing (TAA)** - Reduces visual artifacts by smoothing jagged edges over time
- **Vignette** - Darkens or lightens the image edges to draw attention to the center
- **Color Grading** - Adjusts brightness, contrast, saturation, and color tint for stylistic effects
- **Color LUT** - Apply color lookup tables for advanced color transformations
- **Fringing** - Chromatic aberration effect that simulates color channel separation
- **Tone Mapping** - Controls how HDR colors are mapped to displayable range
- **Sharpness** - Enhances image sharpness to counteract blurriness from TAA or upscaling

## Setup and Usage

For detailed information on setting up and using `CameraFrame`, see the [HDR Rendering](/user-manual/graphics/linear-workflow/hdr-rendering/) guide and the [CameraFrame API documentation](https://api.playcanvas.com/engine/classes/CameraFrame.html).

For Editor users, a ready-to-use script is available. See [CameraFrame in the Editor](/user-manual/graphics/linear-workflow/hdr-rendering/#cameraframe-in-the-editor) for setup instructions.

## Examples

- [HDR with Bloom and LUT](https://playcanvas.vercel.app/#/graphics/hdr) - Demonstrates HDR bloom and color lookup table effects
- [Post-Processing](https://playcanvas.vercel.app/#/graphics/post-processing) - Shows multiple effects including bloom, grading, vignette, fringing, and TAA
- [Ambient Occlusion](https://playcanvas.vercel.app/#/graphics/ambient-occlusion) - Demonstrates SSAO implementation
- [Depth of Field](https://playcanvas.vercel.app/#/graphics/depth-of-field) - Demonstrates depth of field effect
- [Temporal Anti-Aliasing](https://playcanvas.vercel.app/#/graphics/taa) - Demonstrates TAA implementation

## Custom Post Processing

Modern post-processing can be customized and extended in several ways. Choose the approach that best fits your needs:

### [Customizing the Compose Shader](compose-shader)

Extend the `CameraFrame` by adding effects to the final compose pass only. This is the simplest approach when you don't need additional render passes.

**Best for:** Simple screen-space effects, color adjustments, quick prototyping.

### [Extending RenderPassCameraFrame Class](extending-class)

Extend the `CameraFrame` by adding custom render passes. This allows you to integrate additional rendering techniques while leveraging built-in effects.

**Best for:** Multi-pass effects, advanced integrations, processing intermediate results.

### [Custom Render Passes](custom-passes)

Build a complete custom post-processing stack without using `CameraFrame`. This gives you full control over the entire rendering pipeline.

**Best for:** Complete custom pipelines, specialized rendering, maximum flexibility.
