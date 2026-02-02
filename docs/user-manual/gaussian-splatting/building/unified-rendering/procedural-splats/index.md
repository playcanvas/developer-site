---
title: Procedural Splats
---

`GSplatContainer` enables you to create Gaussian splat data programmatically rather than loading it from files. This is useful for dynamic visualizations, procedural effects, and converting other data types to splats.

:::info Beta Feature

Procedural Splats is currently in beta. If you encounter any issues, please report them on the [PlayCanvas Engine GitHub repository](https://github.com/playcanvas/engine/issues).

:::

:::note

This feature requires [unified rendering](/user-manual/gaussian-splatting/building/unified-rendering/) mode.

:::

## Overview

`GSplatContainer` is a container for procedural splat data that you fill from CPU. It works with a `GSplatFormat` that defines the texture streams and how to read splat attributes. Note that [GSplatProcessor](/user-manual/gaussian-splatting/building/unified-rendering/splat-processing) also allows writing to containers on the GPU.

Key characteristics:

- **Fixed size**: Capacity is set at creation and cannot be changed
- **CPU-populated**: You fill texture data from JavaScript
- **GPU-populated**: You can also write texture data on the GPU via [GSplatProcessor](/user-manual/gaussian-splatting/building/unified-rendering/splat-processing)
- **Format-driven**: Uses `GSplatFormat` to define data layout and shader code

## Splat Data Format

Unlike loaded resources where the format is automatic, procedural splats require you to create a format explicitly. PlayCanvas provides built-in formats for common use cases.

### Built-in Formats

#### Default Format

`GSplatFormat.createDefaultFormat(device)` creates a format with full splat data:

| Stream | Format | Content |
|--------|--------|---------|
| `dataColor` | RGBA16F | Color (r, g, b, a) as half floats |
| `dataCenter` | RGBA32F | Position (x, y, z) as floats |
| `dataScale` | RGBA16F | Scale (x, y, z) as half floats |
| `dataRotation` | RGBA16F | Rotation quaternion (x, y, z, w) as half floats |

```javascript
const format = pc.GSplatFormat.createDefaultFormat(device);
```

#### Simple Format

`GSplatFormat.createSimpleFormat(device)` creates a lightweight format for uniform-scale splats without rotation:

| Stream | Format | Content |
|--------|--------|---------|
| `dataCenter` | RGBA32F | Position (x, y, z) + uniform size in w |
| `dataColor` | RGBA16F | Color (r, g, b, a) as half floats |

```javascript
const format = pc.GSplatFormat.createSimpleFormat(device);
```

This format is ideal for the [helper scripts](#helper-scripts) like `GsplatMesh`, `GsplatImage`, and `GsplatLines`.

### Custom Formats

For advanced use cases, you can create custom formats with your own streams and shader code.

#### Constructor

```javascript
const format = new pc.GSplatFormat(device, streams, options);
```

**Parameters:**

- `device` - The graphics device
- `streams` - Array of stream descriptors: `{ name: string, format: number }`
- `options.readGLSL` - GLSL shader code (required for WebGL)
- `options.readWGSL` - WGSL shader code (required for WebGPU)

#### Required Shader Functions

Your read code must define these four functions:

| Function | Return Type | Description |
|----------|-------------|-------------|
| `getCenter()` | `vec3` | Splat position in local space |
| `getColor()` | `vec4` | Splat color (r, g, b, a) |
| `getScale()` | `vec3` | Splat scale (x, y, z) |
| `getRotation()` | `vec4` | Rotation quaternion (x, y, z, w) |

`getCenter()` always executes first. You can use it to execute shared functionality, for example sample stream textures and store values in global variables for use in other functions.

#### Load Functions

For each stream, the format generates a load function named `load{StreamName}()` (with the first letter capitalized). For example, a stream named `data` generates `loadData()`.

#### Example: Custom Format with Tint Uniforms

This example creates a format with a single RGBA8 texture and custom uniforms for per-instance color gradients:

```javascript
const format = new pc.GSplatFormat(device, [
    { name: 'data', format: pc.PIXELFORMAT_RGBA8 }
], {
    readGLSL: `
        uniform vec3 uTint;
        uniform vec3 uTint2;
        vec4 splatData;  // Global variable to avoid sampling texture twice

        vec3 getCenter() {
            // getCenter always executes first - sample texture here
            splatData = loadData();
            return (splatData.rgb - 0.5) * 5.0;
        }

        vec4 getColor() {
            vec3 tint = mix(uTint2, uTint, splatData.a);
            return vec4(tint, 1.0);
        }

        vec3 getScale() { return vec3(0.15); }
        vec4 getRotation() { return vec4(0.0, 0.0, 0.0, 1.0); }
    `,
    readWGSL: `
        uniform uTint: vec3f;
        uniform uTint2: vec3f;
        var<private> splatData: vec4f;  // Global variable to avoid sampling texture twice

        fn getCenter() -> vec3f {
            // getCenter always executes first - sample texture here
            splatData = loadData();
            return (splatData.rgb - 0.5) * 5.0;
        }

        fn getColor() -> vec4f {
            let tint = mix(uniform.uTint2, uniform.uTint, splatData.a);
            return vec4f(tint, 1.0);
        }

        fn getScale() -> vec3f { return vec3f(0.15); }
        fn getRotation() -> vec4f { return vec4f(0.0, 0.0, 0.0, 1.0); }
    `
});
```

## Basic Usage

### 1. Create a Format

Use a built-in format or create a custom one:

```javascript
// Simple format for uniform-scale splats (no rotation)
const format = pc.GSplatFormat.createSimpleFormat(device);

// Or default format with full splat data
const format = pc.GSplatFormat.createDefaultFormat(device);
```

### 2. Create the Container

```javascript
const maxSplats = 1000;
const container = new pc.GSplatContainer(device, maxSplats, format);
```

### 3. Fill Texture Data

Lock textures, fill with data, then unlock:

```javascript
// Get textures by stream name
const centerTex = container.getTexture('dataCenter');
const colorTex = container.getTexture('dataColor');

// Lock for writing
const centerData = centerTex.lock();  // Float32Array for RGBA32F
const colorData = colorTex.lock();    // Uint16Array for RGBA16F

// Fill data for each splat
for (let i = 0; i < numSplats; i++) {
    // Center position (x, y, z) + size in w
    centerData[i * 4 + 0] = x;
    centerData[i * 4 + 1] = y;
    centerData[i * 4 + 2] = z;
    centerData[i * 4 + 3] = size;

    // Color as half-floats (use FloatPacking helper)
    colorData[i * 4 + 0] = pc.FloatPacking.float2Half(r);
    colorData[i * 4 + 1] = pc.FloatPacking.float2Half(g);
    colorData[i * 4 + 2] = pc.FloatPacking.float2Half(b);
    colorData[i * 4 + 3] = pc.FloatPacking.float2Half(a);
}

// Unlock when done
centerTex.unlock();
colorTex.unlock();
```

### 4. Set Centers and Bounding Box

The container needs center positions for sorting and a bounding box for culling:

```javascript
// Fill centers array (xyz per splat, Float32Array)
const centers = container.centers;
for (let i = 0; i < numSplats; i++) {
    centers[i * 3 + 0] = x;
    centers[i * 3 + 1] = y;
    centers[i * 3 + 2] = z;
}

// Set bounding box
container.aabb = new pc.BoundingBox(
    new pc.Vec3(centerX, centerY, centerZ),
    new pc.Vec3(halfExtentX, halfExtentY, halfExtentZ)
);
```

### 5. Update and Add to Scene

```javascript
// Update container with number of splats to render (can be less than maxSplats)
container.update(numSplats);

// Add to scene via gsplat component
entity.addComponent('gsplat', {
    resource: container,
    unified: true
});
```

`numSplats` can be less than or equal to `maxSplats`, allowing only part of the container to be used for rendering.

## Updating Splat Data

To update splat data after creation:

1. Lock the texture, modify data, unlock
2. If centers changed, update `container.centers`
3. Call `container.update(numSplats, centersUpdated)`

```javascript
// Update color texture
const colorTex = container.getTexture('dataColor');
const colorData = colorTex.lock();
// ... modify colorData ...
colorTex.unlock();

// Update count (centersUpdated=false if centers didn't change)
container.update(numSplats, false);
```

## Helper Scripts

PlayCanvas provides ready-to-use scripts that wrap `GSplatContainer` for common use cases:

| Script | Description |
|--------|-------------|
| [GsplatMesh](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/mesh) | Convert mesh geometry to splats |
| [GsplatImage](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/image) | Render images as splats (one per pixel) |
| [GsplatLines](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/lines) | Draw lines, arrows, and bounding boxes |
| [GsplatText](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/text) | Render text as splats |

These scripts handle the container creation and data population for you.

## Live Example

See the [Procedural Instanced example](https://playcanvas.github.io/#/gaussian-splatting/procedural-instanced) which demonstrates creating a custom `GSplatContainer` with a custom format and per-instance shader uniforms.

## See Also

- [GSplatContainer API](https://api.playcanvas.com/engine/classes/GSplatContainer.html)
- [GSplatFormat API](https://api.playcanvas.com/engine/classes/GSplatFormat.html)
- [Splat Data Format](/user-manual/gaussian-splatting/building/unified-rendering/splat-data-format)
- [Splat Processing](/user-manual/gaussian-splatting/building/unified-rendering/splat-processing)
- [Unified Splat Rendering](/user-manual/gaussian-splatting/building/unified-rendering/)
