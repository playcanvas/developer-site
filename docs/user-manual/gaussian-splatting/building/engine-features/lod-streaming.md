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

## Enabling LOD Streaming

To enable LOD streaming, set the [`unified`](https://api.playcanvas.com/engine/classes/GSplatComponent.html#unified) property to `true` on your GSplat component and load a streaming LOD format asset:

```javascript
entity.gsplat.unified = true;
```

:::note

The `unified` property can only be changed when the component is disabled.

:::

## Creating LOD Streaming Data

To use LOD streaming, you need to generate the streaming format from multiple splat files with different levels of detail. The tool takes your pre-generated LOD files and creates an optimized streaming format.

See the [Generating LOD Format](/user-manual/gaussian-splatting/editing/splat-transform#generating-lod-format) section in the SplatTransform documentation for detailed instructions on how to create the required `lod-meta.json` format.

:::tip

You must create the different LOD levels yourself (LOD 0 = highest detail, higher numbers = lower detail). The tool organizes these into a streaming-optimized format but doesn't create the simplified versions.

:::

## Live Examples

Explore these live examples to see LOD streaming in action:

- [LOD Streaming (Basic)](https://playcanvas.vercel.app/#/gaussian-splatting/lod-streaming) - Demonstrates basic LOD streaming with different detail levels
- [LOD Streaming with Spherical Harmonics](https://playcanvas.vercel.app/#/gaussian-splatting/lod-streaming-sh) - Shows LOD streaming with spherical harmonic data

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
- [Streaming LOD using Editor](/user-manual/gaussian-splatting/building/streaming-lod-editor)
- [Global Sorting](/user-manual/gaussian-splatting/building/engine-features/global-sorting)
