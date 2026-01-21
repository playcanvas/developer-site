---
title: Building Splat-based Apps
---

PlayCanvas provides multiple ways to build interactive 3D applications with Gaussian Splats, from low-level Engine APIs to declarative frameworks like React and Web Components.

## Getting Started

The [Your First Splat App](your-first-app/index.md) tutorials walk you through building a basic Gaussian Splat viewer using each of the available approaches:

- **[Engine](your-first-app/engine.md)** - Use the PlayCanvas Engine directly for maximum control
- **[Editor](your-first-app/editor.md)** - Build visually in the PlayCanvas Editor
- **[React](your-first-app/react.md)** - Use the `@playcanvas/react` package for declarative React apps
- **[Web Components](your-first-app/web-components.md)** - Use HTML custom elements for simple integration

## The GSplatComponent

At the core of splat rendering is the [GSplatComponent](https://api.playcanvas.com/engine/classes/GSplatComponent.html). This component grants any Entity the ability to render 3D Gaussian Splats:

```javascript
const entity = new pc.Entity();
entity.addComponent('gsplat', {
    asset: splatAsset
});
app.root.addChild(entity);
```

## Engine Features

PlayCanvas includes a range of features for working with Gaussian Splats:

| Feature | Description |
|---------|-------------|
| [Draw Order](draw-order.md) | Control rendering order when multiple splats overlap |
| [Global Sorting](global-sorting.md) | Sort Gaussians across multiple components for correct blending |
| [LOD Streaming](lod-streaming.md) | Stream different levels of detail for large scenes |
| [Picking](picking.md) | Detect clicks and touches on splat surfaces |
| [Shadows](shadows.md) | Cast shadows from splats onto meshes |
| [Custom Shaders](custom-shaders.md) | Create visual effects with custom shader code |
| [Performance](performance.md) | Optimize rendering for better frame rates |
