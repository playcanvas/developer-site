---
title: Indirect Drawing
description: WebGPU indirect draw slots, GPU buffer parameters, compute-driven culling, and per-frame slot allocation rules.
---

Indirect drawing is a GPU-driven rendering technique where draw call parameters (such as vertex count, instance count, etc.) are stored in GPU buffer memory rather than being specified directly by the CPU. This allows compute shaders to dynamically generate or modify rendering parameters, enabling more efficient GPU-driven rendering workflows.

This feature is currently **only supported on WebGPU** (you can check support using [`GraphicsDevice.supportsIndirectDraw`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#supportsindirectdraw)) and is ignored on other platforms, where the mesh instance renders as a normal draw call.

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
- Each slot is 20 bytes (five 32-bit words)

### Slot Layout {#slot-layout}

The engine issues an indexed draw (`drawIndexedIndirect`) for a mesh with an index buffer, and a non-indexed draw (`drawIndirect`) for a mesh without one. The two draws read a different layout from the same 20-byte slot, so write the one that matches your mesh:

```wgsl
// Mesh with an index buffer: all five words are read
struct DrawIndexedIndirectArgs {
    indexCount: u32,
    instanceCount: u32,
    firstIndex: u32,
    baseVertex: i32,
    firstInstance: u32
};

// Mesh without an index buffer: only the first four words are read
struct DrawIndirectArgs {
    vertexCount: u32,
    instanceCount: u32,
    firstVertex: u32,
    firstInstance: u32,
    unused: u32 // keeps the 20-byte slot stride
};
```

For a non-indexed mesh, `firstInstance` is the fourth word. A value written to the fifth word is ignored.

### Passing Per-Draw Data

The shader reads `firstInstance` as part of the instance index (`pcInstanceIndex` in WGSL), separately from the vertex index. This makes it a good place for a per-draw value, such as an offset into instance data.

Do not use `baseVertex` for this. The GPU adds it to every index, so it shifts the vertex index the shader receives.

A non-zero `firstInstance` requires the `indirect-first-instance` WebGPU feature, which is widely supported. Check [`GraphicsDevice.supportsIndirectFirstInstance`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#supportsindirectfirstinstance) before you rely on it. Without the feature, the GPU skips any indirect draw whose `firstInstance` is not zero.

### Using with Compute Shaders

Indirect drawing is most powerful when combined with compute shaders that generate the draw parameters. The `getIndirectMetaData()` method returns essential mesh information for compute shaders:

```javascript
// Get mesh metadata needed for indirect rendering
// Returns Int32Array [count, base, baseVertex, 0]
const meshMetaData = meshInstance.getIndirectMetaData();

// Create compute shader to control rendering parameters
const compute = new Compute(device, shader, 'IndirectDrawCompute');
compute.setParameter('indirectMetaData', meshMetaData);
compute.setParameter('indirectDrawBuffer', app.graphicsDevice.indirectDrawBuffer);
compute.setParameter('indirectSlot', indirectSlot);

// Dispatch compute shader to generate draw parameters
device.computeDispatch([compute], 'GenerateIndirectDraw');
```

The metadata is not an indirect draw command. Its last value is reserved and is not `firstInstance`. Copy the values into the slot layout that matches your mesh, as shown in [Slot Layout](#slot-layout).

## API Reference

For detailed API documentation, refer to these PlayCanvas engine classes and methods:

- [`MeshInstance.setIndirect()`](https://api.playcanvas.com/engine/classes/MeshInstance.html#setindirect) - Configure a mesh instance for indirect rendering
- [`GraphicsDevice.supportsIndirectDraw`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#supportsindirectdraw) - Check whether the device supports indirect drawing
- [`GraphicsDevice.supportsIndirectFirstInstance`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#supportsindirectfirstinstance) - Check whether indirect draws can use a non-zero `firstInstance`
- [`GraphicsDevice.getIndirectDrawSlot()`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#getindirectdrawslot) - Allocate a slot in the indirect draw buffer
- [`GraphicsDevice.indirectDrawBuffer`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#indirectdrawbuffer) - Access the indirect draw buffer
- [`GraphicsDevice.maxIndirectDrawCount`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#maxindirectdrawcount) - Control maximum indirect draw calls per frame

## Live Example

See the Indirect Draw example for a complete demonstration of indirect drawing with animated instance counts.

<EngineExample id="compute/indirect-draw" title="Indirect Draw example" />
