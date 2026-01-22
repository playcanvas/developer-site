---
title: LOD Streaming
---

LOD (Level of Detail) Streaming enables efficient rendering of large Gaussian splat scenes by dynamically loading appropriate levels of detail based on the camera's distance. This feature dramatically reduces memory usage and improves rendering performance for large-scale splat scenes.

:::info Beta Feature

LOD Streaming is currently in beta. If you encounter any issues, please report them on the [PlayCanvas Engine GitHub repository](https://github.com/playcanvas/engine/issues).

:::

## How It Works

LOD streaming works by:

1. Pre-generating multiple versions of your splat at different detail levels
2. Organizing them into an octree structure for efficient streaming
3. Dynamically loading and unloading detail levels based on camera distance
4. Rendering only the appropriate level of detail for each region of the scene

This approach allows you to render massive splat scenes that would otherwise be impossible due to memory constraints.

## Creating LOD Streaming Data

To use LOD streaming, you need to generate the streaming format from multiple splat files with different levels of detail. The tool takes your pre-generated LOD files and creates an optimized streaming format.

See the [Generating LOD Format](/user-manual/gaussian-splatting/editing/splat-transform#generating-lod-format) section in the SplatTransform documentation for detailed instructions on how to create the required `lod-meta.json` format.

:::tip

You must create the different LOD levels yourself (LOD 0 = highest detail, higher numbers = lower detail). The tool organizes these into a streaming-optimized format but doesn't create the simplified versions.

:::

## Live Examples

Explore these live examples to see LOD streaming in action:

- [LOD Streaming (Basic)](https://playcanvas.github.io/#/gaussian-splatting/lod-streaming) - Demonstrates basic LOD streaming with different detail levels
- [LOD Streaming with Spherical Harmonics](https://playcanvas.github.io/#/gaussian-splatting/lod-streaming-sh) - Shows LOD streaming with spherical harmonic data

## Enabling LOD Streaming

To enable LOD streaming, set the [`unified`](https://api.playcanvas.com/engine/classes/GSplatComponent.html#unified) property to `true` on your GSplat component and load a streaming LOD format asset:

```javascript
entity.gsplat.unified = true;
```

:::note

The `unified` property can only be changed when the component is disabled.

:::

## Controlling LOD Behavior

You can control and fine-tune LOD streaming using the following APIs:

### Component-Level Control

Use the [`lodDistances`](https://api.playcanvas.com/engine/classes/GSplatComponent.html#loddistances) property to set the distance thresholds for switching between LOD levels:

```javascript
// Set LOD distance thresholds (in world units)
entity.gsplat.lodDistances = [10, 20, 40, 80];
```

### Scene-Level Control

The [`Scene.gsplat`](https://api.playcanvas.com/engine/classes/Scene.html#gsplat) property provides access to scene-wide settings for unified gsplat rendering. This includes options for:

- Performance tuning parameters
- Debug visualization settings
- Memory management controls
- Stream loading behavior

```javascript
// Access scene-level gsplat settings
const gsplatSettings = app.scene.gsplat;

// Configure settings as needed
// (See API documentation for available properties)
```

## Using LOD Streaming in the Editor

Native support for LOD streaming in the PlayCanvas Editor will be added in the near future. In the meantime, you can use the Engine API in scripts to enable streaming LOD functionality in your Editor projects.

### Sample Project

We've created a sample project that demonstrates how to use streaming LOD with Gaussian splats in the PlayCanvas Editor:

**[Church of Saints Peter and Paul](https://playcanvas.com/project/1408991/overview/church-of-saints-peter-and-paul)**

This project showcases a large-scale Gaussian splat scene with LOD streaming, including custom reveal shader effects.

### Using the Streamed GSplat Script

The sample project includes a `streamed-gsplat.mjs` script that can be added to any Entity to enable LOD streaming:

#### Setup Steps

1. Add the script to an Entity in your scene
2. Configure the `splatUrl` property to point to an externally hosted LOD splat format file

:::note External Hosting

Currently, the LOD splat data needs to be hosted externally (not as an Editor asset). This limitation will be removed in the future when native Editor support for streaming LOD format is added.

:::

#### Quality Settings

The `streamed-gsplat.mjs` script provides four different quality/performance presets, allowing you to specify:

- Which LOD levels to load
- At what distances each LOD level should be displayed

These settings enable fine-tuned control over the balance between visual quality and rendering performance, making it easy to optimize for different target platforms and devices.

### Custom Shader Effects

The sample project also demonstrates how to create custom shader effects for Gaussian splats. It includes scripts from the [PlayCanvas Engine GSplat Scripts](https://github.com/playcanvas/engine/tree/main/scripts/esm/gsplat) repository.

Specifically, the project uses the [Reveal Radial](https://github.com/playcanvas/engine/blob/main/scripts/esm/gsplat/reveal-radial.mjs) shader effect (along with its base class) to create an animated reveal of the splat scene. This effect:

- Creates radial waves emanating from a center point
- First shows small colored dots progressively
- Then lifts particles up with a highlight effect before settling to their original state

This demonstrates the flexibility of the PlayCanvas Engine's shader system for creating compelling visual effects with Gaussian splats.

### Future Editor Improvements

As native Editor support for streaming LOD is added, the following improvements are planned:

- **Direct Asset Import**: Upload LOD splat files directly as Editor assets (no external hosting needed)
- **Visual Configuration**: Configure LOD settings through the Editor UI instead of script properties
- **Preview in Editor**: View and test streaming LOD behavior directly in the Editor viewport

## Benefits

- **Better Performance**: LOD streaming reduces memory usage and improves rendering performance for large scenes
- **Scalability**: Enables rendering of much larger Gaussian splat scenes by dynamically loading appropriate detail levels
- **Flexibility**: Provides fine-grained control over LOD distances and streaming behavior
- **Optimized Loading**: Only loads the data needed for the current view

## See Also

- [GSplatComponent API](https://api.playcanvas.com/engine/classes/GSplatComponent.html)
- [Scene.gsplat API](https://api.playcanvas.com/engine/classes/Scene.html#gsplat)
- [SplatTransform CLI Tool](/user-manual/gaussian-splatting/editing/splat-transform)
- [Generating LOD Format](/user-manual/gaussian-splatting/editing/splat-transform#generating-lod-format)
- [Global Sorting](/user-manual/gaussian-splatting/building/global-sorting)
- [Custom Shaders](/user-manual/gaussian-splatting/building/custom-shaders)
