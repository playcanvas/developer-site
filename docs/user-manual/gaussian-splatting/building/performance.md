---
title: Performance
---

Rendering splats can be expensive on both the CPU and GPU. Here are some strategies to achieve good performance:

## Limit Gaussian Count

Be mindful of the number of Gaussians in your scene since every Gaussian is sorted on camera depth every frame. You can check the number contained within a particular GSplat asset by using the [SPLAT DATA Panel](https://github.com/playcanvas/supersplat/wiki/Inspecting-Splat-Data) in the [SuperSplat Editor](https://superspl.at/editor). Use SuperSplat to trim unwanted Gaussians from your PLY files.

For large scenes, consider using [LOD Streaming](/user-manual/gaussian-splatting/building/unified-rendering/lod-streaming) which dynamically loads appropriate levels of detail based on camera distance. This significantly reduces the number of active Gaussians at any given time while maintaining visual quality where it matters most.

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

## LOD Streaming Configuration

When using [LOD Streaming](/user-manual/gaussian-splatting/building/unified-rendering/lod-streaming), you have several options to control quality and performance. The recommended approach is to use the **global splat budget** which automatically manages LOD selection across all GSplat assets in your scene.

### Global Splat Budget

The global splat budget is the primary way to control rendering performance for LOD streaming. Set it via:

```javascript
app.scene.gsplat.splatBudget = 4000000; // 4 million splats max
```

When a budget is set, the engine automatically adjusts LOD levels across all GSplat assets to stay within the budget. It prioritizes nearby geometry (using finer LOD) while degrading distant geometry first. This provides a consistent frame rate regardless of how many splats are potentially visible.

- **Budget = 0**: Disables budget enforcement, using only distance-based LOD selection
- **Budget > 0**: Enforces the specified maximum splat count across all GSplat assets

The budget system accounts for all GSplat assets in the scene, including both LOD-streaming assets (with multiple detail levels) and fixed assets (single detail level).

### LOD Distances

LOD distance thresholds are controlled by two properties per GSplat component:

```javascript
entity.gsplat.lodBaseDistance = 5;  // distance for the first LOD transition
entity.gsplat.lodMultiplier = 2;   // multiplier between successive thresholds
```

`lodBaseDistance` sets how far from the camera the first quality reduction occurs. `lodMultiplier` controls how quickly quality drops with distance — each subsequent LOD level transitions at this factor times the previous level's distance. Lower values keep higher quality at distance; higher values switch to coarser LODs sooner. LOD distances are also automatically compensated for the camera's field of view — a wider FOV makes objects appear smaller on screen, so LOD switches to coarser levels sooner.

### LOD Range Limits

The `lodRangeMin` and `lodRangeMax` settings restrict which LOD levels can be used:

```javascript
app.scene.gsplat.lodRangeMin = 0; // Allow highest quality LOD
app.scene.gsplat.lodRangeMax = 3; // Never go lower than LOD 3
```

These settings are useful for:

- **Reducing downloads**: On devices with slow internet connections, setting a higher `lodRangeMin` prevents downloading the highest quality (and largest) LOD files
- **Memory constraints**: Limiting LOD range reduces memory usage by avoiding loading of certain detail levels

However, for typical rendering performance management, the global splat budget is more effective than LOD range limits. The budget automatically finds the right balance across all assets, while LOD range limits apply uniformly regardless of camera position or scene composition.

### Recommended Configuration

For most applications:

1. **Set a global splat budget** appropriate for your target hardware (e.g., 1 million for mobile, 3+ million for desktop)
2. **Leave LOD range at defaults** (min=0, max=highest available) unless you have specific download or memory constraints
3. **Tune LOD distances** if you want finer control over quality transitions at specific distances
