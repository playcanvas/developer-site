---
title: Global Sorting
---

Global Sorting is a rendering feature that allows multiple Gaussian splat components in a scene to be sorted together, eliminating visibility and popping artifacts when splat components overlap.

:::info Beta Feature

Global Sorting is currently in beta. If you encounter any issues, please report them on the [PlayCanvas Engine GitHub repository](https://github.com/playcanvas/engine/issues).

:::

## The Problem

Without global sorting, multiple GSplatComponents are rendered independently. Each component's Gaussians are sorted separately, and the components themselves are rendered based on their bounding boxes. This approach can lead to:

- **Visibility artifacts** when splat components overlap
- **Popping effects** as the camera moves and component render order changes
- **Incorrect depth sorting** between Gaussians from different components

## The Solution: Global Sorting

Global sorting solves these issues by sorting all Gaussians from all splat components together in a single unified sort. This ensures correct rendering order across the entire scene, regardless of how many splat components you have or how they overlap.

## Enabling Global Sorting

To enable global sorting, set the [`unified`](https://api.playcanvas.com/engine/classes/GSplatComponent.html#unified) property to `true` on your GSplat components:

```javascript
entity.gsplat.unified = true;
```

:::note

The `unified` property can only be changed when the component is disabled.

:::

## Live Example

Check out the [Global Sorting example](https://playcanvas.vercel.app/#/gaussian-splatting/global-sorting) which demonstrates the difference between global sorting enabled and disabled. The example allows you to toggle unified mode on and off to observe how global sorting eliminates artifacts when rendering multiple overlapping splat components.

## Benefits

- **Improved Visual Quality**: Eliminates artifacts when rendering multiple overlapping splat components
- **Consistent Rendering**: Maintains correct depth sorting regardless of camera position
- **Better Scene Composition**: Enables complex scenes with many splat components

## See Also

- [GSplatComponent API](https://api.playcanvas.com/engine/classes/GSplatComponent.html)
- [Draw Order and Sorting](/user-manual/gaussian-splatting/building/engine-features/draw-order)
- [LOD Streaming](/user-manual/gaussian-splatting/building/engine-features/lod-streaming)
- [Global Sorting Example](https://playcanvas.vercel.app/#/gaussian-splatting/global-sorting)
