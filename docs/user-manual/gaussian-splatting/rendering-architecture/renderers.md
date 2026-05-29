---
title: Renderers
description: "Gaussian splat renderers in PlayCanvas: raster with CPU sorting vs experimental GPU sorting, selecting a renderer, sorting, and depth buffer limits."
---

PlayCanvas provides more than one rendering pipeline — a *renderer* — for Gaussian splats. The renderer determines how splats are sorted and rasterized. It is a scene-wide setting, and by default the engine selects the most appropriate renderer for the current device.

## Available Renderers

### Raster with CPU Sorting (default)

`GSPLAT_RENDERER_RASTER_CPU_SORT`

- The default renderer, supported on both WebGL 2 and WebGPU.
- Splats are sorted on the CPU in a background Web Worker, then rasterized.
- Supports the full feature set, including XR rendering and shader customization.
- Because sorting is asynchronous, very fast camera motion can briefly reveal slightly out-of-date ordering until the next sort completes.

### Raster with GPU Sorting (experimental)

`GSPLAT_RENDERER_RASTER_GPU_SORT`

- **Experimental**, and **WebGPU only** — on WebGL devices it automatically falls back to CPU sorting.
- Splats are culled and sorted on the GPU each frame, avoiding the Web Worker round-trip. This lowers sorting latency and scales better to large splat counts.
- Has **limited functionality** and does not yet implement the full feature set. In particular, **XR rendering** and **shader customization** are not currently supported.

:::info Experimental

The GPU sorting renderer is experimental and missing some features (for example XR rendering and shader customization). Use the CPU sorting renderer if your application depends on those.

:::

## Selecting a Renderer

The renderer is selected through the scene-wide GSplat settings on `app.scene.gsplat`:

```javascript
// Request the GPU sorting renderer (WebGPU only; falls back to CPU sorting on WebGL)
app.scene.gsplat.renderer = pc.GSPLAT_RENDERER_RASTER_GPU_SORT;
```

The available options are:

- `pc.GSPLAT_RENDERER_AUTO` — *(default)* automatically selects the best renderer for the current device.
- `pc.GSPLAT_RENDERER_RASTER_CPU_SORT` — raster with CPU sorting.
- `pc.GSPLAT_RENDERER_RASTER_GPU_SORT` — raster with GPU sorting (WebGPU only).

A renderer that requires WebGPU falls back to CPU sorting on WebGL devices. To find out which renderer is actually in effect after this fallback, read `currentRenderer`:

```javascript
if (app.scene.gsplat.currentRenderer === pc.GSPLAT_RENDERER_RASTER_GPU_SORT) {
    // GPU sorting is active on this device
}
```

## Sorting

Gaussians are drawn back to front based on their depth from the camera. Where this sort runs depends on the active renderer:

- **CPU sorting**: the sort runs asynchronously in a Web Worker, and the result is uploaded to the GPU. Because it is asynchronous, you may notice a brief lag if the camera transform changes significantly over a very short time, while the worker recalculates the order.
- **GPU sorting**: the sort runs on the GPU every frame, so it stays in step with camera movement.

Regardless of the renderer, all Gaussians from all GSplatComponents are sorted together in a single global sort, rather than each component being sorted independently. This produces correct depth ordering across components and eliminates visibility and popping artifacts where they overlap. See [Splat Rendering Architecture](/user-manual/gaussian-splatting/rendering-architecture) for details.

## Depth Buffer Considerations

GSplatComponents do not write to the depth buffer during rendering. This limitation means you cannot use functionality that relies on reading back or leveraging depth buffer data in your application. For example, a Depth of Field post effect, which typically requires the depth buffer, would not generally be compatible with splat rendering.

As a workaround, you can generate a mesh-based approximation of your splat and render it to the depth buffer in a separate layer (without writing to the framebuffer). This technique allows depth-dependent effects while maintaining the visual quality of the Gaussian splat rendering.
