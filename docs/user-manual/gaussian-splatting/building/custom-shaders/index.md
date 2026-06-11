---
title: Custom Shaders
description: "Customize Gaussian splat rendering with shader chunks on the scene gsplat material: vertex and fragment stage hooks, how to choose between them, and how to apply them."
---

The PlayCanvas Engine lets you customize how Gaussian Splats are rendered by overriding shader chunks. The chunks are set on the scene-wide gsplat material ([`app.scene.gsplat.material`](https://api.playcanvas.com/engine/classes/GSplatParams.html#material)), so a single custom shader applies to **all** splats in the scene.

There are two customization points, one per shader stage:

| Chunk | Stage | Runs | Purpose |
| --- | --- | --- | --- |
| [`gsplatModifyVS`](/user-manual/gaussian-splatting/building/custom-shaders/vertex) | Vertex | Once per splat | Modify splat position, rotation, scale, color and opacity |
| [`gsplatModifyPS`](/user-manual/gaussian-splatting/building/custom-shaders/fragment) | Fragment | Once per covered pixel | Modify the final color and alpha of each splat fragment |

## Choosing a Stage

**Use the [vertex stage](/user-manual/gaussian-splatting/building/custom-shaders/vertex)** for anything that is uniform across a splat: moving, scaling, rotating, hiding splats, or tinting them based on their position. It runs once per splat, so it is the cheaper option and the only one that can change splat geometry.

**Use the [fragment stage](/user-manual/gaussian-splatting/building/custom-shaders/fragment)** when the effect needs to vary *across* a splat's footprint — for example when sampling a texture. It runs once per covered fragment, so it costs more on heavily overlapping splats.

The two stages can be combined freely — implement either or both.

## Applying Chunks

Both chunks follow the same pattern: set the chunk source for each shader language (GLSL covers WebGL, WGSL covers WebGPU), then update the material to recompile:

```javascript
const sceneMat = app.scene.gsplat.material;

sceneMat.getShaderChunks('glsl').set('gsplatModifyVS', glslChunk);
sceneMat.getShaderChunks('wgsl').set('gsplatModifyVS', wgslChunk);
sceneMat.update();
```

Custom uniforms declared by your chunks are driven through material parameters each frame:

```javascript
app.on('update', (dt) => {
    sceneMat.setParameter('uTime', currentTime);
    sceneMat.update();
});
```

## Removing Chunks

To revert to default rendering, delete the chunk override and update the material:

```javascript
const sceneMat = app.scene.gsplat.material;
sceneMat.getShaderChunks('glsl').delete('gsplatModifyVS');
sceneMat.getShaderChunks('wgsl').delete('gsplatModifyVS');
sceneMat.update();
```

## See Also

- [Vertex Stage Customization](/user-manual/gaussian-splatting/building/custom-shaders/vertex) — move, scale and tint splats
- [Fragment Stage Customization](/user-manual/gaussian-splatting/building/custom-shaders/fragment) — per-pixel color modification
- [Relighting](/user-manual/gaussian-splatting/building/relighting) — light splats using a proxy mesh, built on the fragment hook
- [Work Buffer Rendering](/user-manual/gaussian-splatting/rendering-architecture/work-buffer-rendering) — customize the global render pass that draws the sorted splats
