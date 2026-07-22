---
title: WGSL Reflection
description: "Simplified WGSL declarations without manual bind groups: how PlayCanvas reflects resources from shader source and assigns bindings."
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** Edit and review the shader and script assets used by “WGSL Reflection” locally in Pull/Push mode.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Read or overwrite Shader asset text, configure the entities that use it, and launch or capture the scene to verify rendering.

:::

PlayCanvas reflects resources directly from your WGSL shader source: you declare uniforms, textures, and storage buffers without `@group`/`@binding` indices, and the engine parses these declarations, builds the bind group format, and assigns the bindings automatically. This simplified syntax is used by vertex, fragment, and compute shaders.

The following sections outline how resources are declared and reflected. For the vertex/fragment-only constructs (attributes, varyings, and fragment outputs), see [WGSL Vertex and Fragment Shaders](/user-manual/graphics/shaders/wgsl-vertex-fragment-shaders).

### Simplified Shader Interface Syntax

In standard WGSL (WebGPU Shading Language), declaring uniforms, attributes, and varyings requires explicitly specifying a `@group` and `@binding` index for each resource. This can be verbose and error-prone, especially for common patterns.

To improve usability and streamline shader development, we adopt a simplified syntax similar to GLSL. In this model, you must not specify `@group` or `@binding` attributes manually—the engine strips any such annotations during shader processing and reassigns bindings based on a predefined layout.

#### Example Comparison

Standard WGSL:

```wgsl
struct Uniforms {
    uTime: f32,
};

struct FragmentInput {
    @location(0) uv0: vec2f,
    @builtin(position) position: vec4f
};

@group(0) @binding(0) var<uniform> ub: Uniforms;

@fragment fn fragmentMain(FragmentInput) -> @location(0) vec4f {
    // body
}
```

In contrast, the simplified syntax avoids a lot of the boilerplate.

```wgsl
uniform uTime: f32;
varying uv0: vec2f;

@fragment fn fragmentMain(input: FragmentInput) -> FragmentOutput {
    // body
}
```

### Uniforms

Uniforms are used to pass *numerical resources* from the engine to the shader.

Uniforms are declared using this simplified syntax:

```wgsl
uniform view_position: vec3f;
uniform tints: array<vec3f, 4>;
uniform weights: array<f32, 8>;
```

Internally, uniforms are automatically placed in uniform buffers, and in the shader code are accessed using a `uniform.` prefix:

```wgsl
var pos = uniform.view_position;
var color = uniform.tints[2];

// f32 and vec2<> types used in an array are due to alignment requirements wrapped
// in an aligned structure, and the value is available as its `element` property.
// struct WrappedF32 { @size(16) element: f32 }
var weight = uniform.weights[3].element;
```

The engine automatically sets appropriate uniform values when rendering.

:::note

Currently, our uniform system supports only simple types, including `f32`, `i32`, `u32`, as well as vectors and matrices (e.g., `vec4f`, `mat4x4f`). Structs are not supported at this time, so all uniform values must be declared as individual variables of basic types.

:::

### Texture Resources

Texture resources are using simplified WGSL syntax, where specifying a `@group` and `@binding` index for each resource has to be omitted.

#### Sampling Textures

In WGSL, textures and samplers are treated as separate objects, unlike in GLSL, where those are combined.

When you want to sample a texture (i.e. retrieve filtered texel values), you must provide a texture object *directly followed* by a sampler.

```wgsl
// 2d texture with a sampler declaration
var diffuseMap: texture_2d<f32>;
var diffuseMapSampler: sampler;

// texture sampling
var texel = textureSample(diffuseMap, diffuseMapSampler, coords);
```

#### Fetching Textures

If you only need to read raw texel data (i.e., without filtering, mipmapping, or addressing modes), you can use `textureLoad` instead of `textureSample`. This is called non-filtered access, or simply texel fetching.

In such cases, no sampler is required or allowed. For example:

```wgsl
// cubemap texture without a sampler
var noSamplerMap: texture_cube<f32>;

// fetching the texel
let texel = textureLoad(noSamplerMap, coords, mipLevel);
```

#### Unfilterable Textures

WebGPU supports unfilterable float textures, which are typically used for specialized purposes such as sampling from depth textures, where filtering is not allowed. However, WGSL does not provide a distinct sample type in the syntax for declaring these unfilterable float textures. To address this limitation and enable proper bind group auto-generation based on shader declarations, we introduce a new sample type called `uff` (unfilterable-float).

Using `uff`, you can explicitly declare an unfilterable-float texture in the shader like this:

```wgsl
// declaration
var colorMap: texture_2d<uff>;

// sampling
let data: vec4f = textureLoad(colorMap, uv, 0);
```

This extension allows the engine to correctly interpret the texture's sampling capabilities and bind it accordingly. Under the hood, the engine rewrites `texture_2d<uff>` to `texture_2d<f32>` in the emitted WGSL and generates a `BindTextureFormat` with `SAMPLETYPE_UNFILTERABLE_FLOAT` automatically.

##### Pairing `uff` with a sampler

`uff` textures can also be paired with a `sampler` declaration so you can use `textureSampleLevel`, `textureGather`, or the unfiltered form of `textureSample`. This is the standard pattern for reading a depth render target as a raw float (for example, hierarchical-Z, depth-aware blur, or screen-space ambient occlusion).

```wgsl
var srcDepth: texture_2d<uff>;
var srcDepthSampler: sampler;

// Single-tap sampled read at an explicit mip level.
let z = textureSampleLevel(srcDepth, srcDepthSampler, uv, 0.0).r;

// 2x2 gather (returns the r channel of four adjacent texels).
let four = textureGather(0, srcDepth, srcDepthSampler, uv);
```

:::note

When pairing `uff` with a sampler, the `pc.Texture` you bind must have a **non-filtering** sampler configuration (typically `minFilter: FILTER_NEAREST`, `magFilter: FILTER_NEAREST`, and a `*_NEAREST` mip filter). Filtering samplers are only valid against filterable-float textures, and WebGPU will reject the bind group at draw time if you pair a filtering sampler with an unfilterable-float texture.

:::

##### Choosing how to bind a depth texture

Depth textures (any `pc.PIXELFORMAT_DEPTH*` format) cannot be sampled as plain `texture_2d<f32>` on WebGPU unless the device exposes the optional `float32-filterable` feature. Pick the right declaration based on what you need to do:

| Use case                                                       | WGSL declaration    | Sampler                                                                  |
| -------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------ |
| Shadow comparison (`textureSampleCompare*`)                    | `texture_depth_2d`  | `sampler_comparison`                                                     |
| Raw depth as float, no filtering (HZB, SSAO, depth-aware blur) | `texture_2d<uff>`   | non-filtering `sampler`, or no sampler with `textureLoad`                |
| Filtered linear depth                                          | `texture_2d<f32>`   | filtering `sampler` — requires the `float32-filterable` device feature   |

:::note

The bind group format is derived from your shader's resource declarations. Mutating `meshBindGroupFormat` on a `Shader` instance after creation has no effect — shader processing regenerates it from the source. To control the sample type, declare the texture with `uff` (or another sample-type-specific WGSL form) rather than overriding the bind group format afterwards.

:::

:::note

Support for `texture_external` is not available yet, and will be added in the future.

:::

### Storage Buffers

Storage buffers are GPU-accessible memory resources that allow shaders to read and write arbitrary data with random access. In WGSL, they are declared using `var<storage>` and are ideal for working with large or structured datasets such as particle systems, compute data, or dynamic geometry. Unlike uniforms, storage buffers support both read and write access (with appropriate access control).

Example of using storage buffer in Vertex Shader:

```wgsl
struct Particle {
    position: vec3f,
    velocity: vec3f,
}

// particle storage buffer in read-only mode
var<storage, read> particles: array<Particle>;
```

### Storage Textures

Storage textures let a shader write (and optionally read) texels directly, without a sampler. They are most commonly used as the output of a compute shader. Declare them with the simplified `texture_storage_*` syntax, specifying the format and the access mode:

```wgsl
// write-only storage texture (the common case for compute output)
var outputTexture: texture_storage_2d<rgba8unorm, write>;

// writing a texel
textureStore(outputTexture, vec2i(global_id.xy), color);
```

The access mode can be `write`, `read`, or `read_write`. Reading from a storage texture (`read` / `read_write`) requires the `device.supportsStorageTextureRead` capability and an author-supplied `requires readonly_and_readwrite_storage_textures;` directive — see [WGSL Capabilities](/user-manual/graphics/shaders/wgsl-capabilities#wgsl-language-extensions).

The texture you bind must be created with the `storage: true` option (see [Compute Shaders](/user-manual/graphics/shaders/compute-shaders)).
