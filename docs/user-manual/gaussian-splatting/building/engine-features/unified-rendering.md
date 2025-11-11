---
title: Unified Rendering
---

Unified Rendering is a beta feature that significantly enhances the capabilities of the `GSplatComponent` by enabling global sorting and Level of Detail (LOD) streaming for Gaussian Splats.

:::info Beta Feature

Unified Rendering is currently in beta. If you encounter any issues, please report them on the [PlayCanvas Engine GitHub repository](https://github.com/playcanvas/engine/issues).

:::

## Enabling Unified Rendering

To enable unified rendering on a GSplat component, set the [`unified`](https://api.playcanvas.com/engine/classes/GSplatComponent.html#unified) property to `true`:

```javascript
entity.gsplat.unified = true;
```

:::note

The `unified` property can only be changed when the component is disabled.

:::

## Key Features

Unified Rendering introduces two major features that improve the quality and performance of Gaussian splat rendering:

### Global Sorting

Without unified rendering, multiple GSplatComponents are rendered independently, with each component's Gaussians sorted separately and the components themselves rendered based on their bounding boxes. This approach can lead to visibility and popping artifacts when multiple splat components overlap in a scene.

With **global sorting** enabled through unified rendering, all Gaussians from all splat components in the scene are sorted together. This eliminates visual artifacts and ensures correct rendering order across multiple GSplatComponents.

**Live Example:**

Check out the [Global Sorting example](https://playcanvas.vercel.app/#/gaussian-splatting/global-sorting) which demonstrates the difference. The example allows you to toggle unified mode on and off to observe how global sorting eliminates artifacts when rendering multiple overlapping splat components.

### LOD Streaming

When a GSplat component is in unified mode, it supports the LOD streaming format (`lod-meta.json`). This feature enables efficient rendering of large Gaussian splat scenes by streaming in appropriate levels of detail based on the camera's distance.

#### Creating LOD Streaming Data

To use LOD streaming, you need to generate the streaming format from multiple splat files with different levels of detail. See the [Generating LOD Format](/user-manual/gaussian-splatting/editing/splat-transform#generating-lod-format) section in the SplatTransform documentation for detailed instructions on how to create the required `lod-meta.json` format.

#### LOD Streaming Examples

Explore these live examples to see LOD streaming in action:

- [LOD Streaming (Basic)](https://playcanvas.vercel.app/#/gaussian-splatting/lod-streaming) - Demonstrates basic LOD streaming with different detail levels
- [LOD Streaming with Spherical Harmonics](https://playcanvas.vercel.app/#/gaussian-splatting/lod-streaming-sh) - Shows LOD streaming with spherical harmonic data

#### Controlling LOD Behavior

You can control and fine-tune LOD streaming using the following APIs:

**Component-level control:**

Use the [`lodDistances`](https://api.playcanvas.com/engine/classes/GSplatComponent.html#loddistances) property to set the distance thresholds for switching between LOD levels:

```javascript
// Set LOD distance thresholds (in world units)
entity.gsplat.lodDistances = [10, 20, 40, 80];
```

**Scene-level control:**

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

## Benefits of Unified Rendering

- **Improved Visual Quality**: Global sorting eliminates artifacts when rendering multiple overlapping splat components
- **Better Performance**: LOD streaming reduces memory usage and improves rendering performance for large scenes
- **Scalability**: Enables rendering of much larger Gaussian splat scenes by dynamically loading appropriate detail levels
- **Flexibility**: Provides fine-grained control over LOD distances and streaming behavior

## See Also

- [GSplatComponent API](https://api.playcanvas.com/engine/classes/GSplatComponent.html)
- [Draw Order and Sorting](/user-manual/gaussian-splatting/building/engine-features/draw-order)
- [SplatTransform CLI Tool](/user-manual/gaussian-splatting/editing/splat-transform)
- [Global Sorting Example](https://playcanvas.vercel.app/#/gaussian-splatting/global-sorting)
