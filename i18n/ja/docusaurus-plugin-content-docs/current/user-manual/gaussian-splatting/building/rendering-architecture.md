---
title: Splat Rendering Architecture
---

PlayCanvas supports two rendering modes for Gaussian splats: **Unified** and **Non-unified**. Understanding these modes helps you choose the right approach for your application.

## Unified vs Non-unified Rendering

### Non-unified Mode

In non-unified mode, each GSplat component is rendered independently:

- Splats within each component are sorted separately
- Components are rendered based on their bounding box order
- Simple setup with no additional overhead
- **Limitation**: Visual artifacts occur when splat components overlap

This mode is suitable for simple scenes with a single splat or non-overlapping splats.

### Unified Mode

In unified mode, all GSplat components share a common rendering pipeline:

- All splats from all components are copied to a shared **work buffer**
- Splats are sorted globally across all components
- Eliminates artifacts when splats overlap
- Enables advanced features like [procedural splats](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/), [LOD streaming](/user-manual/gaussian-splatting/building/unified-rendering/lod-streaming), and [GPU processing](/user-manual/gaussian-splatting/building/unified-rendering/splat-processing)

**Unified mode is recommended** for most applications, especially when:

- Multiple splat components may overlap
- You need consistent depth sorting across components
- You want to use advanced features

## Enabling Unified Mode

Set the `unified` property to `true` on your GSplat components:

```javascript
entity.gsplat.unified = true;
```


## Learn More

For detailed information about unified rendering architecture and its features, see:

- [Unified Splat Rendering](/user-manual/gaussian-splatting/building/unified-rendering/) - Architecture details and global sorting
- [Draw Order and Sorting](/user-manual/gaussian-splatting/building/draw-order) - How splats are sorted for rendering
