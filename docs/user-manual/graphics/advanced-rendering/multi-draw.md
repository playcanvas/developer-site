---
title: Multi-Draw
---

Multi-draw is a rendering technique that lets the engine submit multiple sub-draws with a single API call. Multiple geometries are combined into a single Mesh and rendered through a single MeshInstance, with each sub-draw targeting a different portion of the combined geometry. This reduces CPU overhead and improves performance when rendering many sub-meshes that share the same material and render state.

## Use Cases

Multi-draw is particularly useful for:

- **Terrain rendering** - Divide terrain into patches, render all visible patches in one call, and dynamically cull hidden patches
- **Merged geometry** - Combine multiple geometries into a single mesh and render different portions with different instance counts
- **LOD systems** - Switch between sub-meshes without changing draw calls
- **Culling systems** - Hide/show portions of geometry without material changes

## Platform Support

Check multi-draw support using `GraphicsDevice.supportsMultiDraw`:

```javascript
if (app.graphicsDevice.supportsMultiDraw) {
    // Use multi-draw
} else {
    // Fallback to standard rendering
}
```

- **WebGPU**: Always supported (uses indirect draw commands)
- **WebGL2**: Supported on most devices via the `WEBGL_multi_draw` extension

When `supportsMultiDraw` is false, the engine automatically falls back to an internal loop of single draw calls using the multi-draw data. While this doesn't provide the full multi-draw performance benefit, it is still significantly faster than rendering separate geometries with individual MeshInstances, as the material and render state are set up only once.

## Live Examples

- [Multi-Draw](https://playcanvas.vercel.app/#/graphics/multi-draw) - Terrain rendering with dynamic patch culling
- [Multi-Draw Instanced](https://playcanvas.vercel.app/#/graphics/multi-draw-instanced) - Different geometries with instancing (WebGPU only)
- [Multi-Draw Instanced Multi-Platform](https://playcanvas.vercel.app/#/graphics/multi-draw-instanced-multi-platform) - Cross-platform instanced multi-draw

## Basic Multi-Draw

The simplest use of multi-draw is rendering sub-meshes from a combined mesh.

### Step 1: Create a Combined Mesh

Combine multiple geometries into a single mesh, tracking the index offset and count for each sub-mesh:

```javascript
// Track sub-draw info
const subDraws = [];
let indexOffset = 0;

// Combine geometries
const positions = [];
const indices = [];
let vertexBase = 0;

for (const geometry of geometries) {
    // Store sub-draw info
    subDraws.push({
        firstIndex: indexOffset,
        indexCount: geometry.indices.length
    });

    // Append positions
    positions.push(...geometry.positions);

    // Append indices with offset
    for (const idx of geometry.indices) {
        indices.push(vertexBase + idx);
    }

    vertexBase += geometry.positions.length / 3;
    indexOffset += geometry.indices.length;
}

// Create the combined mesh
const mesh = new pc.Mesh(app.graphicsDevice);
mesh.setPositions(positions);
mesh.setIndices(indices);
mesh.update();
```

### Step 2: Set Up Multi-Draw

Use `MeshInstance.setMultiDraw()` to allocate draw commands and populate them:

```javascript
const meshInst = new pc.MeshInstance(mesh, material);

// Allocate multi-draw with max number of sub-draws
const cmd = meshInst.setMultiDraw(null, subDraws.length);

// Add each sub-draw
for (let i = 0; i < subDraws.length; i++) {
    const sub = subDraws[i];
    // add(index, indexCount, instanceCount, firstIndex, baseVertex, firstInstance)
    cmd.add(i, sub.indexCount, 1, sub.firstIndex, 0, 0);
}

// Finalize with the number of active draws
cmd.update(subDraws.length);
```

### Step 3: Dynamic Updates

You can update the draw commands each frame to show/hide sub-draws:

```javascript
app.on('update', (dt) => {
    let activeCount = 0;

    for (let i = 0; i < subDraws.length; i++) {
        // Check if this sub-draw should be visible (e.g., frustum culling)
        if (isVisible(subDraws[i])) {
            cmd.add(activeCount, subDraws[i].indexCount, 1, subDraws[i].firstIndex, 0, 0);
            activeCount++;
        }
    }

    // Update with actual number of visible draws
    cmd.update(activeCount);
});
```

## Multi-Draw with Instancing

Multi-draw can be combined with hardware instancing to render different geometries with different instance counts in a single call.

### WebGPU Approach

On WebGPU, you can use the `firstInstance` parameter to specify where each sub-draw reads its instance data from:

```javascript
// Three geometries with different instance counts
const instanceCounts = [8, 15, 25];
const totalInstances = instanceCounts.reduce((a, b) => a + b, 0);

// Create instance data for all instances
const matrices = new Float32Array(totalInstances * 16);
// ... populate matrices ...

// Create instancing vertex buffer
const vbFormat = pc.VertexFormat.getDefaultInstancingFormat(app.graphicsDevice);
const vb = new pc.VertexBuffer(app.graphicsDevice, vbFormat, totalInstances, {
    data: matrices
});
meshInst.setInstancing(vb);

// Set up multi-draw with firstInstance offsets
const firstInstance = [0, instanceCounts[0], instanceCounts[0] + instanceCounts[1]];
const cmd = meshInst.setMultiDraw(null, 3);

cmd.add(0, indexCounts[0], instanceCounts[0], firstIndex[0], 0, firstInstance[0]);
cmd.add(1, indexCounts[1], instanceCounts[1], firstIndex[1], 0, firstInstance[1]);
cmd.add(2, indexCounts[2], instanceCounts[2], firstIndex[2], 0, firstInstance[2]);
cmd.update(3);
```

### Cross-Platform Approach

WebGL2 does not support `firstInstance`. To achieve the same result on both platforms, you can store instance data in a texture and use `gl_DrawID` with a custom shader chunk:

```javascript
if (app.graphicsDevice.isWebGL2 && app.graphicsDevice.supportsMultiDraw) {
    // Store matrices in a texture
    const matricesTexture = new pc.Texture(app.graphicsDevice, {
        width: totalInstances * 4,  // 4 vec4s per matrix
        height: 1,
        format: pc.PIXELFORMAT_RGBA32F,
        minFilter: pc.FILTER_NEAREST,
        magFilter: pc.FILTER_NEAREST,
        mipmaps: false,
        levels: [matrices]
    });

    // Use custom vertex format with instance ID
    const vbFormat = new pc.VertexFormat(app.graphicsDevice, [{
        semantic: pc.SEMANTIC_ATTR11,
        components: 1,
        type: pc.TYPE_INT32,
        asInt: true
    }]);

    // Override the instancing shader chunk
    material.setAttribute('aInstanceId', pc.SEMANTIC_ATTR11);
    material.setParameter('uDrawOffsets[0]', drawOffsets);
    material.setParameter('uInstanceMatrices', matricesTexture);
    material.shaderChunks.glsl.set('transformInstancingVS', customShaderCode);
}
```

The custom shader fetches the matrix from the texture using `gl_DrawID` to determine the base offset:

```glsl
#ifdef CAPS_MULTI_DRAW
    attribute int aInstanceId;
    uniform float uDrawOffsets[10];
    uniform sampler2D uInstanceMatrices;

    mat4 getInstancedMatrix(int index) {
        int size = textureSize(uInstanceMatrices, 0).x;
        int j = index * 4;
        int x = j % size;
        int y = j / size;
        vec4 v1 = texelFetch(uInstanceMatrices, ivec2(x, y), 0);
        vec4 v2 = texelFetch(uInstanceMatrices, ivec2(x + 1, y), 0);
        vec4 v3 = texelFetch(uInstanceMatrices, ivec2(x + 2, y), 0);
        vec4 v4 = texelFetch(uInstanceMatrices, ivec2(x + 3, y), 0);
        return mat4(v1, v2, v3, v4);
    }

    mat4 getModelMatrix() {
        int drawOffset = int(uDrawOffsets[gl_DrawID]);
        int instanceIndex = drawOffset + aInstanceId;
        return matrix_model * getInstancedMatrix(instanceIndex);
    }
#endif
```

## DrawCommands API Reference

The `DrawCommands` class is returned by `MeshInstance.setMultiDraw()`:

### setMultiDraw

```javascript
const cmd = meshInstance.setMultiDraw(camera, maxCount);
```

- `camera` - CameraComponent to bind commands to, or `null` for all cameras
- `maxCount` - Maximum number of sub-draws to allocate. Pass `0` to disable multi-draw.
- Returns: `DrawCommands` instance

### add

```javascript
cmd.add(i, indexOrVertexCount, instanceCount, firstIndexOrVertex, baseVertex, firstInstance);
```

- `i` - Draw index (0 to maxCount-1)
- `indexOrVertexCount` - Number of indices or vertices to draw
- `instanceCount` - Number of instances (use 1 if not instanced)
- `firstIndexOrVertex` - Starting index or vertex offset
- `baseVertex` - Base vertex offset (WebGPU only, default 0)
- `firstInstance` - First instance offset (WebGPU only, default 0)

### update

```javascript
cmd.update(count);
```

- `count` - Actual number of draws to execute (can be less than maxCount)

Call `update()` after all `add()` calls to finalize the draw commands.
