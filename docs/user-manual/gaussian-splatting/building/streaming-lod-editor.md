---
title: Streaming LOD using Editor
---

The PlayCanvas Engine supports [Unified Rendering](/user-manual/gaussian-splatting/building/engine-features/unified-rendering), which includes LOD streaming capabilities for Gaussian splats. Native support for this feature in the PlayCanvas Editor will be added in the near future. In the meantime, you can use the Engine API in scripts to enable streaming LOD functionality in your Editor projects.

## Sample Project

We've created a sample project that demonstrates how to use streaming LOD with Gaussian splats in the PlayCanvas Editor:

**[Church of Saints Peter and Paul](https://playcanvas.com/project/1408991/overview/church-of-saints-peter-and-paul)**

This project showcases a large-scale Gaussian splat scene with LOD streaming, including custom reveal shader effects.

:::note Engine Version

The project currently needs to be manually set to use **Engine version 2.13.0** until this version is used by the Editor by default in the very near future. You can set the engine version in the Launch Options.

:::

## Using the Streamed GSplat Script

The sample project includes a `streamed-gsplat.mjs` script that can be added to any Entity to enable LOD streaming:

### Setup Steps

1. Add the script to an Entity in your scene
2. Configure the `splatUrl` property to point to an externally hosted LOD splat format file

:::info Creating LOD Format

To generate the required LOD streaming format, see the [Generating LOD Format](/user-manual/gaussian-splatting/editing/splat-transform#generating-lod-format) section in the SplatTransform documentation.

:::

:::note External Hosting

Currently, the LOD splat data needs to be hosted externally (not as an Editor asset). This limitation will be removed in the future when native Editor support for streaming LOD format is added.

:::

### Quality Settings

The `streamed-gsplat.mjs` script provides four different quality/performance presets, allowing you to specify:

- Which LOD levels to load
- At what distances each LOD level should be displayed

These settings enable fine-tuned control over the balance between visual quality and rendering performance, making it easy to optimize for different target platforms and devices.

## Custom Shader Effects

The sample project also demonstrates how to create custom shader effects for Gaussian splats. It includes scripts from the [PlayCanvas Engine GSplat Scripts](https://github.com/playcanvas/engine/tree/main/scripts/esm/gsplat) repository.

### Reveal Effect Example

Specifically, the project uses the [Reveal Radial](https://github.com/playcanvas/engine/blob/main/scripts/esm/gsplat/reveal-radial.mjs) shader effect (along with its base class) to create an animated reveal of the splat scene. This effect:

- Creates radial waves emanating from a center point
- First shows small colored dots progressively
- Then lifts particles up with a highlight effect before settling to their original state

This demonstrates the flexibility of the PlayCanvas Engine's shader system for creating compelling visual effects with Gaussian splats.

## Future Improvements

As native Editor support for streaming LOD is added, the following improvements are planned:

- **Direct Asset Import**: Upload LOD splat files directly as Editor assets (no external hosting needed)
- **Visual Configuration**: Configure LOD settings through the Editor UI instead of script properties
- **Preview in Editor**: View and test streaming LOD behavior directly in the Editor viewport

Stay tuned for updates as these features are rolled out!

## See Also

- [Unified Rendering](/user-manual/gaussian-splatting/building/engine-features/unified-rendering)
- [SplatTransform CLI Tool](/user-manual/gaussian-splatting/editing/splat-transform)
- [Generating LOD Format](/user-manual/gaussian-splatting/editing/splat-transform#generating-lod-format)
- [Custom Shaders](/user-manual/gaussian-splatting/building/engine-features/custom-shaders)
- [Sample Project: Church of Saints Peter and Paul](https://playcanvas.com/project/1408991/overview/church-of-saints-peter-and-paul)
