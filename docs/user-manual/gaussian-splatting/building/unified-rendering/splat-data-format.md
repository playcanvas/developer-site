---
title: Splat Data Format
---

`GSplatFormat` describes how splat data is stored in GPU textures and generates the shader code needed to read that data. It defines texture streams (name and pixel format) and shader code for extracting splat attributes.

:::info Beta Feature

Splat Data Format is currently in beta. If you encounter any issues, please report them on the [PlayCanvas Engine GitHub repository](https://github.com/playcanvas/engine/issues).

:::

:::note

This feature requires [unified rendering](/user-manual/gaussian-splatting/building/unified-rendering/) mode.

:::

## Overview

GSplat data is stored in GPU textures called **streams**. Each stream has a name and pixel format (e.g., `PIXELFORMAT_RGBA32F`). The `GSplatFormat` defines these streams and the shader code that reads splat attributes from them.

## Shader Access

The format generates shader functions to read splat data from texture streams. These functions use a global `splat` struct that identifies which splat to read.

### Current Splat Index

By default, each splat reads its own data. To read from a different splat, use `setSplat(index)`:

```glsl
// GLSL
setSplat(otherIndex);  // Set the splat index for subsequent reads
vec3 pos = getCenter(); // Now reads from otherIndex
```

```wgsl
// WGSL
setSplat(otherIndex);
let pos = getCenter();
```

### Load Functions

For each stream, two load functions are generated:

| Function | Description |
|----------|-------------|
| `load{StreamName}()` | Reads from current `splat.uv` (set by `setSplat()`) |
| `load{StreamName}WithIndex(index)` | Reads directly from a specific index |

For example, a stream named `dataCenter` generates:

- `loadDataCenter()` - reads using current splat index
- `loadDataCenterWithIndex(index)` - reads from specified index

```glsl
// GLSL - Read from specific index without changing current splat
vec4 otherCenter = loadDataCenterWithIndex(neighborIndex);
```

```wgsl
// WGSL
let otherCenter = loadDataCenterWithIndex(neighborIndex);
```

This is useful when you need to access neighbor splats or compare data across multiple splats.

## Format for Loaded Resources

When you load a gsplat resource (PLY, SOG, or LOD format), the format is **automatically created** based on the file's data. You don't need to create or configure it manually.

### Accessing the Format

You can access the format through the resource:

```javascript
const format = entity.gsplat.resource.format;
```

### Adding Extra Streams to Resources

You can add extra streams to a resource's format to store custom per-splat data. Each stream has a **storage type** that determines how textures are allocated:

| Storage Type | Description |
|-------------|-------------|
| `GSPLAT_STREAM_RESOURCE` | Texture is shared across all component instances using this resource (default) |
| `GSPLAT_STREAM_INSTANCE` | Texture is created per gsplat component instance |

#### Resource-Level Streams

Use `GSPLAT_STREAM_RESOURCE` (or omit `storage`) when the data is the same for all instances of a resource:

```javascript
// Add a stream shared across all instances
resource.format.addExtraStreams([
    { name: 'customData', format: pc.PIXELFORMAT_RGBA8 }
]);

// Access the shared texture
const texture = resource.streams.getTexture('customData');
```

#### Instance-Level Streams

Use `GSPLAT_STREAM_INSTANCE` when each component instance needs its own texture data:

```javascript
// Add a per-instance stream
resource.format.addExtraStreams([
    { name: 'instanceTint', format: pc.PIXELFORMAT_RGBA8, storage: pc.GSPLAT_STREAM_INSTANCE }
]);

// Access the instance texture via the component
const texture = entity.gsplat.getInstanceTexture('instanceTint');
if (texture) {
    const data = texture.lock();
    // Fill texture data per splat...
    texture.unlock();
}
```

Common stream formats:

- `PIXELFORMAT_RGBA8` - 4 bytes (e.g., packed flags or tint colors)
- `PIXELFORMAT_RGBA16F` - 4 half floats (e.g., custom attributes)
- `PIXELFORMAT_RGBA32F` - 4 floats (e.g., high precision data)

:::note

Streams cannot be removed once added.

:::

## Format for Procedural Splats

When creating [procedural splats](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/) with `GSplatContainer`, you need to explicitly create and configure a format. PlayCanvas provides built-in formats for common cases, and you can also create custom formats with your own streams and shader code.

See [Procedural Splats](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/) for details on:

- Built-in formats (`createDefaultFormat`, `createSimpleFormat`)
- Creating custom formats with custom streams
- Writing shader code to read your custom data

## Work Buffer Format

The work buffer has its own format for storing intermediate splat data during unified rendering. You can add extra streams to it for customization during copy and render operations.

See [Work Buffer Format](/user-manual/gaussian-splatting/building/unified-rendering/work-buffer-format) for details on:

- Adding extra streams to the work buffer
- Customizing the copy operation with `setWorkBufferModifier()`
- Writing and reading custom data

## See Also

- [GSplatFormat API](https://api.playcanvas.com/engine/classes/GSplatFormat.html)
- [Work Buffer Format](/user-manual/gaussian-splatting/building/unified-rendering/work-buffer-format) - Customizing the copy operation
- [Work Buffer Rendering](/user-manual/gaussian-splatting/building/unified-rendering/work-buffer-rendering) - Customizing the render operation
- [Procedural Splats](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/) - Creating splats programmatically
- [Unified Splat Rendering](/user-manual/gaussian-splatting/building/unified-rendering/)
