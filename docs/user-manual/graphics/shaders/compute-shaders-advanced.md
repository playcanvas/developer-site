---
title: Compute Shaders Advanced
description: "Manual bind group control for WebGPU compute shaders: hand-authored computeBindGroupFormat, explicit bindings, and mixing with reflected resources."
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** Implement Compute Shaders Advanced; required behavior and constraints: Manual bind group control for WebGPU compute shaders: hand-authored computeBindGroupFormat, explicit bindings, and mixing with reflected resources; launch the application, capture the rendered result, and check the console for shader or rendering errors.
- **[VS Code Extension](/user-manual/ai/vscode-extension/):** Implement Compute Shaders Advanced in the relevant script or shader assets so the result satisfies this requirement: manual bind group control for WebGPU compute shaders: hand-authored computeBindGroupFormat, explicit bindings, and mixing with reflected resources; review the complete diff and diagnostics before Push.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Read or overwrite Shader asset text, configure the entities that use it, and launch or capture the scene to verify rendering.

:::

For most compute shaders, the simplified syntax described on the [Compute Shaders](/user-manual/graphics/shaders/compute-shaders) page is all you need — declare resources in WGSL and the engine reflects them automatically.

This page covers **manual** control over bind groups, which remains fully supported. You provide a `computeBindGroupFormat` (and optionally `computeUniformBufferFormats`) describing the resources yourself, and write explicit `@group`/`@binding` indices in the WGSL. Reach for this when you need:

- precise control over the binding layout,
- to interop with engine- or application-owned buffers at fixed bindings, or
- to mix explicitly-bound resources with reflected ones.

:::note

Manual bind groups are not deprecated. If you have existing compute shaders that hand-author a `computeBindGroupFormat`, they continue to work unchanged — you can migrate them to the simplified syntax whenever convenient, or not at all.

:::

## Bind Group Format

The `computeBindGroupFormat` defines what resources are available to the compute shader. When you supply it, write explicit `@group`/`@binding` indices in the WGSL to match. You can bind various types of resources:

```javascript
const shader = new pc.Shader(device, {
    name: 'MyComputeShader',
    shaderLanguage: pc.SHADERLANGUAGE_WGSL,
    cshader: shaderCode,
    computeBindGroupFormat: new pc.BindGroupFormat(device, [
        // Resource bindings go here
    ])
});
```

### Storage Buffers

Storage buffers allow read/write access to large amounts of data:

```javascript
// Read-write storage buffer
new pc.BindStorageBufferFormat('particles', pc.SHADERSTAGE_COMPUTE)

// Read-only storage buffer
new pc.BindStorageBufferFormat('spheres', pc.SHADERSTAGE_COMPUTE, true)
```

In WGSL, access storage buffers like this:

```wgsl
@group(0) @binding(0) var<storage, read_write> particles: array<f32>;
@group(0) @binding(1) var<storage, read> spheres: array<vec4f>;
```

### Storage Textures

Storage textures allow the compute shader to write directly to a texture:

```javascript
new pc.BindStorageTextureFormat('outTexture', pc.PIXELFORMAT_RGBA8, pc.TEXTUREDIMENSION_2D)
```

In WGSL:

```wgsl
@group(0) @binding(0) var outputTexture: texture_storage_2d<rgba8unorm, write>;

// Writing to the texture
textureStore(outputTexture, vec2i(global_id.xy), color);
```

### Input Textures

Input textures provide read-only texture data. The last parameter controls whether a sampler is included:

```javascript
// Texture without sampler (for textureLoad)
new pc.BindTextureFormat('inputTexture', pc.SHADERSTAGE_COMPUTE, undefined, undefined, false)

// Texture with sampler (for textureSampleLevel)
new pc.BindTextureFormat('inputTexture', pc.SHADERSTAGE_COMPUTE, undefined, undefined, true)
```

In WGSL, when a sampler is included, it uses the texture name with a `_sampler` suffix:

```wgsl
// Without sampler - use textureLoad for direct texel access
@group(0) @binding(0) var inputTexture: texture_2d<f32>;
let color = textureLoad(inputTexture, position, 0);

// With sampler - use textureSampleLevel for filtered sampling
@group(0) @binding(0) var inputTexture: texture_2d<f32>;
@group(0) @binding(1) var inputTexture_sampler: sampler;
let color = textureSampleLevel(inputTexture, inputTexture_sampler, uv, 0.0);
```

:::note

In compute shaders, use `textureSampleLevel` instead of `textureSample` because you must explicitly specify the mip level (LOD).

:::

### Uniform Buffers

For passing uniform data to compute shaders, first define the uniform buffer format:

```javascript
const uniformBufferFormat = new pc.UniformBufferFormat(device, [
    new pc.UniformFormat('tint', pc.UNIFORMTYPE_VEC4),
    new pc.UniformFormat('time', pc.UNIFORMTYPE_FLOAT),
    new pc.UniformFormat('count', pc.UNIFORMTYPE_UINT)
]);
```

Then include it in the shader definition along with the bind group:

```javascript
const shader = new pc.Shader(device, {
    name: 'ComputeShader',
    shaderLanguage: pc.SHADERLANGUAGE_WGSL,
    cshader: shaderCode,

    // Assign the uniform buffer format
    computeUniformBufferFormats: {
        ub: uniformBufferFormat
    },

    // Include uniform buffer in bind group
    computeBindGroupFormat: new pc.BindGroupFormat(device, [
        new pc.BindUniformBufferFormat('ub', pc.SHADERSTAGE_COMPUTE),
        // ... other bindings
    ])
});
```

In WGSL:

```wgsl
struct ub_compute {
    tint: vec4f,
    time: f32,
    count: u32
}

@group(0) @binding(0) var<uniform> ubCompute: ub_compute;

@compute @workgroup_size(1, 1, 1)
fn main(@builtin(global_invocation_id) global_id: vec3u) {
    let t = ubCompute.time;
    let c = ubCompute.count;
}
```

## Mixing Reflected and Manual Resources

A caller-provided `computeBindGroupFormat` and the simplified (reflected) syntax can be used together in the same shader:

- Resources you describe in `computeBindGroupFormat` use the bindings you give them, in **group 0**.
- Any resources you declare with the simplified syntax (no `@group`/`@binding`) are still reflected — they are placed in a **separate bind group at index 1**.
- Explicitly-bound (`@group`/`@binding`) declarations in the WGSL are left untouched.

If you do **not** provide a `computeBindGroupFormat`, reflected resources are placed in group 0 instead (see [Compute Shaders](/user-manual/graphics/shaders/compute-shaders)).

In all cases, values are assigned by name with `setParameter`, regardless of whether a resource is manually bound or reflected.

## Examples

The following examples use manually-authored bind group formats:

<EngineExample id="compute/histogram" title="Histogram" />

<EngineExample id="compute/texture-gen" title="Texture Generation" />

<EngineExample id="compute/indirect-dispatch" title="Indirect Dispatch" />
