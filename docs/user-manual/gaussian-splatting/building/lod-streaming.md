---
title: Streamed SOG
description: "Streamed SOG for large splat scenes: spatial tree layout, generating lod-meta data, examples, and performance guidance."
---

Streamed SOG enables efficient rendering of large Gaussian splat scenes by dynamically loading appropriate levels of detail (LOD) for each region of the scene, within a global splat budget. This dramatically reduces memory usage and improves rendering performance for large-scale splat scenes.

## How It Works

Streamed SOG works by:

1. Pre-generating multiple versions of your splat at different detail levels
2. Organizing them into a spatial tree structure for efficient streaming
3. Dynamically loading and unloading detail levels by camera distance, fitted to a global splat budget
4. Rendering only the selected level of detail for each region of the scene

This approach allows you to render massive splat scenes that would otherwise be impossible due to memory constraints.

## Creating Streamed SOG Data

To use Streamed SOG, you need to generate the format — a `lod-meta.json` spatial tree structure that organizes multiple levels of detail for efficient streaming (see the [Streamed SOG Format Specification](/user-manual/gaussian-splatting/formats/streamed-sog)). There are two ways to obtain the LOD levels:

- **Provide your own LOD levels** — supply multiple splat files at progressively lower detail (LOD 0 = highest detail, higher numbers = lower detail), for example produced during training or exported separately.
- **Generate them with SplatTransform** — use [SplatTransform](/user-manual/splat-transform) to decimate a single high-quality splat into lower-detail levels, so you don't have to author them yourself.

Once you have the LOD levels, SplatTransform bundles them into the Streamed SOG format. See the [Generating Streamed SOG](/user-manual/splat-transform/streamed-sog) guide for detailed instructions.

## Live Examples

Explore these live examples to see Streamed SOG in action:

- Streamed SOG (Basic) - Demonstrates basic streaming with different detail levels

<EngineExample id="gaussian-splatting/lod-streaming" title="Streamed SOG (Basic)" />

- Streamed SOG with Spherical Harmonics - Shows streaming with spherical harmonic data

<EngineExample id="gaussian-splatting/lod-streaming-sh" title="Streamed SOG with Spherical Harmonics" />

## Enabling Streamed SOG

Streaming is enabled simply by loading a Streamed SOG asset (`lod-meta.json`) onto a GSplat component — no additional configuration is required.

## Controlling LOD Behavior

### How LOD Is Chosen

The engine picks one LOD level per region of the scene from its distance to the camera. Each gsplat component sets where its detail steps down: the finest level (LOD 0) out to [`lodBaseDistance`](https://api.playcanvas.com/engine/classes/GSplatComponent.html#lodbasedistance), then each coarser level from [`lodMultiplier`](https://api.playcanvas.com/engine/classes/GSplatComponent.html#lodmultiplier) times the distance where the one before began. With the defaults of 5 and 3, LOD 1 begins at 5 world units, LOD 2 at 15 and LOD 3 at 45:

```javascript
entity.gsplat.lodBaseDistance = 10; // LOD 0 out to 10 units
entity.gsplat.lodMultiplier = 4; // then LOD 1 to 40 units, LOD 2 to 160, ...
```

Raising either value keeps finer detail further from the camera, at a higher memory cost. `lodBaseDistance` has a minimum of 0.1 and `lodMultiplier` a minimum of 1.2. The distances are compensated for the camera's field of view: a wider FOV makes objects appear smaller on screen, so coarser levels are used sooner.

How these distances combine with the scene-wide [splat budget](/user-manual/gaussian-splatting/building/performance#global-splat-budget) is set by the budget mode.

### Budget Mode

[`splatBudgetMode`](https://api.playcanvas.com/engine/classes/GSplatParams.html#splatbudgetmode) on `app.scene.gsplat` selects between two modes:

```javascript
app.scene.gsplat.splatBudgetMode = pc.GSPLAT_BUDGET_LIMIT;
```

- `GSPLAT_BUDGET_TARGET` (default): detail is raised until the budget is used up, wherever the camera is. The engine moves the LOD distances of every splat outward or inward by one shared factor until the scene fills the budget, so the distances you set only shape how detail falls off with distance and how it divides between splats, not how much of it there is.
- `GSPLAT_BUDGET_LIMIT`: the LOD distances decide the detail, and the budget only lowers it when they would ask for more splats than it allows. A distant splat uses only the few splats its distance calls for and leaves the rest of the budget unused, so a scene seen from far away does not stream in finer levels just to fill the budget.

A budget of 0 or less means no budget at all: target mode then renders everything at its finest level, and limit mode leaves the detail to the LOD distances alone.

### Scene-Level Control

The [`Scene.gsplat`](https://api.playcanvas.com/engine/classes/Scene.html#gsplat) property provides access to scene-wide settings for gsplat rendering. This includes options for:

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

The most important scene-level setting for Streamed SOG is the global splat budget, which automatically balances detail across all GSplat assets, either as a target splat count to fill or as a limit, depending on the budget mode above. See [Global Splat Budget](/user-manual/gaussian-splatting/building/performance#global-splat-budget) in the Performance section for details.

## Using Streamed SOG in the Editor

Native support for Streamed SOG in the PlayCanvas Editor will be added in the near future. In the meantime, you can use the Engine API in scripts to enable Streamed SOG functionality in your Editor projects.

### Sample Project

We've created a sample project that demonstrates how to use Streamed SOG with Gaussian splats in the PlayCanvas Editor:

**[Church of Saints Peter and Paul](https://playcanvas.com/project/1408991/overview/church-of-saints-peter-and-paul)**

This project showcases a large-scale Gaussian splat scene with Streamed SOG, including custom reveal shader effects.

### Using the Streamed GSplat Script

The sample project includes a `streamed-gsplat.mjs` script that can be added to any Entity to enable Streamed SOG:

#### Setup Steps

1. Add the script to an Entity in your scene
2. Configure the `splatUrl` property to point to an externally hosted Streamed SOG file

:::note External Hosting

Currently, the Streamed SOG data needs to be hosted externally (not as an Editor asset). This limitation will be removed in the future when native Editor support for Streamed SOG is added.

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

As native Editor support for Streamed SOG is added, the following improvements are planned:

- **Direct Asset Import**: Upload Streamed SOG files directly as Editor assets (no external hosting needed)
- **Visual Configuration**: Configure LOD settings through the Editor UI instead of script properties
- **Preview in Editor**: View and test streaming behavior directly in the Editor viewport

## Benefits

- **Better Performance**: Streamed SOG reduces memory usage and improves rendering performance for large scenes
- **Scalability**: Enables rendering of much larger Gaussian splat scenes by dynamically loading appropriate detail levels
- **Flexibility**: Provides fine-grained control over LOD distances and streaming behavior
- **Optimized Loading**: Only loads the data needed for the current view

## See Also

- [GSplatComponent API](https://api.playcanvas.com/engine/classes/GSplatComponent.html)
- [Scene.gsplat API](https://api.playcanvas.com/engine/classes/Scene.html#gsplat)
- [SplatTransform CLI Tool](/user-manual/splat-transform)
- [Generating Streamed SOG](/user-manual/splat-transform/streamed-sog)
- [Streamed SOG Format Specification](/user-manual/gaussian-splatting/formats/streamed-sog)
- [Splat Rendering Architecture](/user-manual/gaussian-splatting/rendering-architecture)
- [Custom Shaders](/user-manual/gaussian-splatting/building/custom-shaders)
