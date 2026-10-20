---
title: Performance
description: "Performance tips for splat scenes: splat counts, fill rate, scene settings, Streamed SOG budgets, and optimization strategies."
---

Rendering splats can be expensive on both the CPU and GPU. Here are some strategies to achieve good performance:

## Limit Gaussian Count

Be mindful of the number of Gaussians in your scene since every Gaussian is sorted on camera depth every frame. You can check the number contained within a particular GSplat asset by using the [SPLAT DATA Panel](/user-manual/supersplat/editor/data-panel/) in the [SuperSplat Editor](/user-manual/supersplat/editor/). Use SuperSplat to trim unwanted Gaussians from your PLY files.

For large scenes, consider using [Streamed SOG](/user-manual/gaussian-splatting/building/lod-streaming) which dynamically loads appropriate levels of detail based on camera distance. This significantly reduces the number of active Gaussians at any given time while maintaining visual quality where it matters most.

## Fill Rate Considerations

3D Gaussian Splatting is particularly expensive in terms of fill rate (fragment operations). This is because:

- **High Overdraw**: Each Gaussian splat is rendered as a textured billboard (quad) that often overlaps with many other splats
- **Transparency Blending**: Splats use alpha blending to achieve smooth appearance, requiring expensive per-fragment blending operations
- **Fragment Density**: Dense splat clouds can result in dozens or even hundreds of fragments being processed for each final pixel

This high fragment cost is why optimizing pixel count and rendering settings is crucial for 3DGS performance.

### Configure Scene Settings

Given the fragment-heavy nature of Gaussian splatting, these settings have a significant impact on performance:

- **Disable `Anti-Alias`**: Anti-aliasing multiplies the number of fragments processed per pixel, which is especially costly for splat rendering
- **Disable `Device Pixel Ratio`**: This reduces the overall pixel resolution, directly reducing the number of fragments that need to be processed

Both settings help reduce the fragment processing load, which is the primary bottleneck in 3DGS rendering.

## Streamed SOG Configuration

When using [Streamed SOG](/user-manual/gaussian-splatting/building/lod-streaming), you have several options to control quality and performance. The recommended approach is to use the **global splat budget** which automatically manages LOD selection across all GSplat assets in your scene.

### Global Splat Budget

The global splat budget is the primary way to control rendering performance for Streamed SOG. [`splatBudget`](https://api.playcanvas.com/engine/classes/GSplatParams.html#splatbudget) defaults to 1 million splats; set it via:

```javascript
app.scene.gsplat.splatBudget = 4000000; // 4 million splats
```

The engine automatically adjusts LOD levels across all GSplat assets to fit the budget, keeping nearby geometry at finer detail while degrading distant geometry first. By default the budget is a target: detail is raised until it is used up, wherever the camera is, which provides a consistent workload regardless of how many splats are potentially visible. A budget of 0 or less means no budget at all.

The budget system accounts for all GSplat assets in the scene, including both Streamed SOG assets (with multiple detail levels) and fixed assets (single detail level). Fixed assets always render in full, so their splats leave that much less of the budget for the streamed ones.

### LOD Distances and Budget Mode

Within the budget, each gsplat component sets how its detail steps down with distance from the camera: [`lodBaseDistance`](https://api.playcanvas.com/engine/classes/GSplatComponent.html#lodbasedistance) is the distance of the LOD 0 to LOD 1 transition, and [`lodMultiplier`](https://api.playcanvas.com/engine/classes/GSplatComponent.html#lodmultiplier) is the factor between each transition distance and the next. Raising either keeps finer detail further from the camera, at a higher memory cost. [`splatBudgetMode`](https://api.playcanvas.com/engine/classes/GSplatParams.html#splatbudgetmode) on `app.scene.gsplat` decides how these distances combine with the budget — with the default `GSPLAT_BUDGET_TARGET` they only shape the falloff and the budget decides how much detail there is, while with `GSPLAT_BUDGET_LIMIT` they decide the detail and the budget only lowers it when they would exceed it:

```javascript
entity.gsplat.lodBaseDistance = 10; // LOD 0 out to 10 units
entity.gsplat.lodMultiplier = 4; // then LOD 1 to 40 units, LOD 2 to 160, ...
app.scene.gsplat.splatBudgetMode = pc.GSPLAT_BUDGET_LIMIT;
```

See [Controlling LOD Behavior](/user-manual/gaussian-splatting/building/lod-streaming#controlling-lod-behavior) for details. LOD distances are also automatically compensated for the camera's field of view — a wider FOV makes objects appear smaller on screen, so it switches to coarser levels sooner.

### LOD Range Limits

The `lodRangeMin` and `lodRangeMax` settings on a gsplat component restrict which LOD levels that splat can use:

```javascript
entity.gsplat.lodRangeMin = 0; // Allow highest quality LOD
entity.gsplat.lodRangeMax = 3; // Never go lower than LOD 3
```

These settings are useful for:

- **Reducing downloads**: On devices with slow internet connections, setting a higher `lodRangeMin` prevents downloading the highest quality (and largest) LOD files
- **Memory constraints**: Limiting LOD range reduces memory usage by avoiding loading of certain detail levels

However, for typical rendering performance management, the global splat budget is more effective than LOD range limits. The budget automatically finds the right balance across all assets, while LOD range limits apply per asset regardless of camera position or scene composition.

### Fast Time to First Frame

For large streamed scenes, you can display a rendered frame almost immediately by loading only the **lowest** (coarsest) level of detail first, then letting higher-detail levels stream in afterwards. This avoids waiting for high-quality data before anything appears on screen.

The approach has two steps:

1. When the GSplat asset is created, clamp the LOD range to the coarsest level only, so just the smallest amount of data loads first.
2. Listen for the GSplat system's `frame:ready` event. Once the coarse data has loaded and rendered — and nothing is still loading — restore the full LOD range so higher-detail levels stream in based on camera distance.

```javascript
const gsplatSystem = app.systems.gsplat;

// `entity` has a gsplat component using a loaded Streamed SOG asset
const gsplat = entity.gsplat;

// 1. Start with the lowest (coarsest) LOD only, for the fastest first frame
const lodLevels = gsplat.resource?.octree?.lodLevels;
if (lodLevels) {
    const worstLod = lodLevels - 1;
    gsplat.lodRangeMin = worstLod;
    gsplat.lodRangeMax = worstLod;
}

// 2. Once the coarse data is loaded and rendered, open the LOD range back up
//    so higher-detail levels stream in
const onFrameReady = (camera, layer, ready, loadingCount) => {
    if (ready && loadingCount === 0) {
        gsplatSystem.off('frame:ready', onFrameReady);

        // restore the full LOD range (0 = highest detail)
        gsplat.lodRangeMin = 0;
        gsplat.lodRangeMax = lodLevels - 1;
    }
};
gsplatSystem.on('frame:ready', onFrameReady);
```

This technique is demonstrated in the live [Streamed SOG example](/user-manual/gaussian-splatting/building/lod-streaming#live-examples).

### Recommended Configuration

For most applications:

1. **Set a global splat budget** appropriate for your target hardware (e.g., 1 million for mobile, 3+ million for desktop)
2. **Leave LOD range at defaults** (min=0, max=highest available) unless you have specific download or memory constraints
3. **Tune LOD distances** (`lodBaseDistance`, `lodMultiplier`) to shape how detail falls off with distance, and switch to `GSPLAT_BUDGET_LIMIT` if quality should change at those distances rather than wherever the budget puts the transitions
