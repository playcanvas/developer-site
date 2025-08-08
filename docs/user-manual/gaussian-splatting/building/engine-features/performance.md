---
title: Performance
---

Rendering splats can be expensive on both the CPU and GPU. Here are some strategies to achieve good performance:

## Limit Gaussian Count

Be mindful of the number of Gaussians in your scene since every Gaussian is sorted on camera depth every frame. You can check the number contained within a particular GSplat asset by using the [SPLAT DATA Panel](https://github.com/playcanvas/supersplat/wiki/Inspecting-Splat-Data) in the [SuperSplat Editor](https://superspl.at/editor). Use SuperSplat to trim unwanted Gaussians from your PLY files.

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
