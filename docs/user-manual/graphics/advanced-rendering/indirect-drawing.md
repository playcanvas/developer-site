---
title: Indirect Drawing
---

Indirect drawing is a GPU-driven rendering technique where draw call parameters (such as vertex count, instance count, etc.) are stored in GPU buffer memory rather than being specified directly by the CPU. This allows compute shaders to dynamically generate or modify rendering parameters, enabling more efficient GPU-driven rendering workflows.

This feature is currently **only supported on WebGPU** (you can check WebGPU availability using [`GraphicsDevice.isWebGPU`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#iswebgpu)) and is ignored on other platforms.

## How Indirect Drawing Works

In traditional rendering, the CPU specifies draw parameters like vertex count and instance count for each draw call. With indirect drawing, these parameters are stored in a GPU buffer, and the GPU reads them during rendering. This enables:

- **GPU-driven culling**: Compute shaders can determine which objects to render
- **Dynamic instance counts**: Procedurally control how many instances to draw
- **Reduced CPU overhead**: Less CPU-GPU synchronization
- **Complex rendering effects**: Enable advanced techniques like GPU-driven LOD selection

## Basic Usage

### Setting Up Indirect Drawing

Indirect drawing requires allocating a slot in the indirect draw buffer and assigning it to a mesh instance. **Important**: slots must be allocated fresh each frame:

```javascript
// Get a fresh slot every frame
const indirectSlot = app.graphicsDevice.getIndirectDrawSlot();

// Configure the mesh instance to use indirect rendering
// First parameter: camera component (or null for all cameras)
// Second parameter: the allocated slot
meshInstance.setIndirect(null, indirectSlot);
```

### Configuring Buffer Size

Control the maximum number of indirect draw calls per frame:

```javascript
// Set maximum indirect draw calls per frame (default: 1024)
app.graphicsDevice.maxIndirectDrawCount = 2048;
```

### Understanding the Indirect Draw Buffer

The indirect draw buffer is a storage buffer that holds draw call parameters. It's automatically managed by the graphics device:

- Access via `app.graphicsDevice.indirectDrawBuffer`
- Size controlled by `maxIndirectDrawCount` property
- Each slot contains: `indexCount`, `instanceCount`, `firstIndex`, `baseVertex`, `firstInstance`

### Using with Compute Shaders

Indirect drawing is most powerful when combined with compute shaders that generate the draw parameters. The `getIndirectMetaData()` method returns essential mesh information for compute shaders:

```javascript
// Get mesh metadata needed for indirect rendering
// Returns Int32Array [count, base, baseVertex, 0]
const meshMetaData = meshInstance.getIndirectMetaData();

// Create compute shader to control rendering parameters
const compute = new pc.Compute(device, shader, 'IndirectDrawCompute');
compute.setParameter('indirectMetaData', meshMetaData);
compute.setParameter('indirectDrawBuffer', app.graphicsDevice.indirectDrawBuffer);
compute.setParameter('indirectSlot', indirectSlot);

// Dispatch compute shader to generate draw parameters
device.computeDispatch([compute], 'GenerateIndirectDraw');
```

## API Reference

For detailed API documentation, refer to these PlayCanvas engine classes and methods:

- [`MeshInstance.setIndirect()`](https://api.playcanvas.com/engine/classes/MeshInstance.html#setindirect) - Configure a mesh instance for indirect rendering
- [`GraphicsDevice.getIndirectDrawSlot()`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#getindirectdrawslot) - Allocate a slot in the indirect draw buffer
- [`GraphicsDevice.indirectDrawBuffer`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#indirectdrawbuffer) - Access the indirect draw buffer
- [`GraphicsDevice.maxIndirectDrawCount`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#maxindirectdrawcount) - Control maximum indirect draw calls per frame

## Live Example

See the [Indirect Draw example](https://playcanvas.github.io/#/compute/indirect-draw) for a complete demonstration of indirect drawing with animated instance counts.
