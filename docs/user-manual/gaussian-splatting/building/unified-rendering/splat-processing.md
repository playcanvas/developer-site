---
title: Splat Processing
---

`GSplatProcessor` enables GPU-based processing of Gaussian Splat data using custom shader code. It reads from source texture streams and writes results to destination streams, enabling operations like painting, selection, deletion, and custom data transforms.

:::info Beta Feature

Splat Processing is currently in beta. If you encounter any issues, please report them on the [PlayCanvas Engine GitHub repository](https://github.com/playcanvas/engine/issues).

:::

:::note

This feature requires [unified rendering](/user-manual/gaussian-splatting/building/unified-rendering/) mode.

:::

## Overview

Gaussian Splats store per-splat attributes (position, rotation, scale, color) in texture streams. Additional custom streams can be added using extra streams on the [splat data format](/user-manual/gaussian-splatting/building/unified-rendering/splat-data-format).

`GSplatProcessor` provides a way to modify this data on the GPU:

- **Read** from source streams using generated load functions
- **Write** to destination streams using generated write functions
- **Process** all splats in parallel on the GPU

This is useful for:

- Painting/coloring splats based on brush position
- Marking splats for selection or deletion
- Transforming splat data
- Custom per-splat effects

## Basic Usage

### 1. Create the Processor

Create a processor by specifying the source (where to read splat data from), destination (which streams to write to), and the shader code that processes each splat:

```javascript
const processor = new pc.GSplatProcessor(
    app.graphicsDevice,
    { component: entity.gsplat },                           // source
    { component: entity.gsplat, streams: ['customColor'] }, // destination
    {
        processGLSL: `
            uniform vec4 uBrushSphere;  // xyz = position, w = radius
            uniform vec4 uBrushColor;

            void process() {
                vec3 center = getCenter();
                float dist = distance(center, uBrushSphere.xyz);
                if (dist < uBrushSphere.w) {
                    writeCustomColor(uBrushColor);
                } else {
                    writeCustomColor(vec4(0.0));
                }
            }
        `,
        processWGSL: `
            uniform uBrushSphere: vec4f;
            uniform uBrushColor: vec4f;

            fn process() {
                let center = getCenter();
                let dist = distance(center, uniform.uBrushSphere.xyz);
                if (dist < uniform.uBrushSphere.w) {
                    writeCustomColor(uniform.uBrushColor);
                } else {
                    writeCustomColor(vec4f(0.0));
                }
            }
        `
    }
);
```

### 2. Set Parameters and Execute

Set uniforms for the processing shader, then execute to process all splats:

```javascript
// Set uniforms for the processing shader
processor.setParameter('uBrushSphere', [x, y, z, radius]);
processor.setParameter('uBrushColor', [1, 0, 0, 1]);

// Execute the processing pass
processor.process();
```

## Constructor

```javascript
new pc.GSplatProcessor(device, source, destination, options)
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `device` | GraphicsDevice | The graphics device |
| `source` | GSplatProcessorBinding | Source data binding |
| `destination` | GSplatProcessorBinding | Destination data binding |
| `options.processGLSL` | string | GLSL shader code (required for WebGL) |
| `options.processWGSL` | string | WGSL shader code (required for WebGPU) |

### GSplatProcessorBinding

```typescript
{
    resource?: GSplatResourceBase,  // Direct resource reference
    component?: GSplatComponent,    // Component (resource resolved automatically)
    streams?: string[]              // Stream names to bind
}
```

If instance streams (`GSPLAT_STREAM_INSTANCE`) are used, `component` must be specified to access those per-component textures.

For source, if `streams` is omitted, format streams are automatically bound with the standard `getCenter()`, `getColor()`, `getRotation()`, `getScale()` functions. When source and destination resources are different, all streams from the source can be read. When they are the same resource, streams being written to cannot be read from.

For destination, `streams` is required and specifies which streams to write to.

### Different Resource Sizes

The source and destination resources can have different numbers of splats. The `process()` function executes once for each **destination** splat. The current destination splat index is available via `splat.index`:

```glsl
void process() {
    uint destIndex = splat.index;  // Current destination splat index
    
    // Calculate which source splat to read from
    uint sourceIndex = destIndex * 2;  // Example: sample every other splat
    setSplat(sourceIndex);
    vec3 srcPos = getCenter();
    
    // Write to destination
    writePosition(vec4(srcPos, 1.0));
}
```

You can also read from any source splat using `load{StreamName}WithIndex()` without changing the current splat context.

This enables operations like:

- Copying data from a larger source to a smaller destination (downsampling)
- Generating destination splats from sampled source data
- Mapping between resources with different splat counts

## Shader Functions

### Reading (Source)

When source streams aren't specified, the processor provides:

| Function | Return | Description |
|----------|--------|-------------|
| `getCenter()` | `vec3` | Splat position (must be called first) |
| `getColor()` | `vec4` | Splat color |
| `getRotation()` | `vec4` | Rotation quaternion |
| `getScale()` | `vec3` | Splat scale |

### Reading from Different Indices

By default, each splat reads its own data. To read from a different splat, use `setSplat(index)`:

```glsl
// GLSL - Read from neighbor splat
setSplat(neighborIndex);
vec3 neighborPos = getCenter();
vec4 neighborColor = getColor();
```

Each load function also has a `WithIndex` variant for direct index access:

```glsl
// GLSL - Read specific stream from another index
vec4 otherCenter = loadDataCenterWithIndex(neighborIndex);
```

This is useful for algorithms that need to compare or combine data from multiple splats.

### Writing (Destination)

For each destination stream, a write function is generated: `write{StreamName}(value)`.

For example, a stream named `customColor` generates `writeCustomColor(vec4 value)`.

## API

### setParameter(name, value)

Sets a shader uniform parameter.

```javascript
// Scalar
processor.setParameter('uRadius', 0.5);

// Vector (as array)
processor.setParameter('uBrushPos', [x, y, z]);

// Texture
processor.setParameter('uBrushTex', brushTexture);
```

### getParameter(name)

Gets a previously set parameter value.

### deleteParameter(name)

Removes a parameter.

### process()

Executes the processing pass, reading from source and writing to destination.

### destroy()

Releases all GPU resources. Call when done with the processor.

### blendState

Property for setting blend state (useful for accumulative effects like additive painting):

```javascript
processor.blendState = pc.BlendState.ADDBLEND;
```

## Use Cases

### Painting

Paint splats within a brush radius with a color:

```glsl
void process() {
    vec3 center = getCenter();
    float dist = distance(center, uBrushPos.xyz);
    if (dist < uBrushRadius) {
        float falloff = 1.0 - (dist / uBrushRadius);
        writeCustomColor(uBrushColor * falloff);
    } else {
        writeCustomColor(vec4(0.0));
    }
}
```

### Selection

Mark splats inside an AABB as selected:

```glsl
void process() {
    vec3 center = getCenter();
    bool inside = all(greaterThan(center, uSelectionMin)) &&
                  all(lessThan(center, uSelectionMax));
    writeSelection(inside ? vec4(1.0) : vec4(0.0));
}
```

### Deletion (Visibility)

Mark splats as invisible:

```glsl
void process() {
    vec3 center = getCenter();
    float visible = distance(center, uDeletePos) > uDeleteRadius ? 1.0 : 0.0;
    writeVisible(vec4(visible));
}
```

## Live Examples

- [Paint example](https://playcanvas.github.io/#/gaussian-splatting/paint) - Demonstrates painting splats with a brush
- [Editor example](https://playcanvas.github.io/#/gaussian-splatting/editor) - Demonstrates selection, deletion, and cloning

## See Also

- [GSplatProcessor API](https://api.playcanvas.com/engine/classes/GSplatProcessor.html)
- [Splat Data Format](/user-manual/gaussian-splatting/building/unified-rendering/splat-data-format)
- [Procedural Splats](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/)
- [Unified Splat Rendering](/user-manual/gaussian-splatting/building/unified-rendering/)
