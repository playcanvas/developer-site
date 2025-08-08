---
title: WGSL Specifics
---

WGSL shaders used by the PlayCanvas engine must satisfy certain requirements. These requirements allow the engine to correctly integrate shaders, ensuring they receive the necessary resources such as attributes, uniforms, and varyings.

The following sections outline key aspects of writing WGSL shaders for PlayCanvas.

### Simplified Shader Interface Syntax

In standard WGSL (WebGPU Shading Language), declaring uniforms, attributes, and varyings requires explicitly specifying a `@group` and `@binding` index for each resource. This can be verbose and error-prone, especially for common patterns.

To improve usability and streamline shader development, we adopt a simplified syntax similar to GLSL. In this model, you do not need to specify `@group` or `@binding` attributes manually—these are automatically assigned and managed by the engine based on a predefined layout.

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

### Attributes

Attributes define per-vertex input data, and can only be used in the vertex shader. They must be declared using the following syntax:

```wgsl
attribute aUv0: vec2f;
```

Internally, a `VertexInput` struct is automatically created and populated with all the attributes. Attributes can be accessed from the structure passed to the main function, but also in the global scope.

```wgsl
attribute aUv0: vec2f;

@vertex fn vertexMain(input: VertexInput) -> VertexOutput {

    // access it using input passed to the main function
    var myUv1 = input.aUv0;

    // but also as a global variable (particularly useful inside other functions)
    var myUv2 = aUv0;
}
```

As part of the `VertexInput` structure, and also in the global scope, these built-in attributes are automatically available:

```wgsl
vertexIndex: @builtin(vertex_index)
instanceIndex: @builtin(instance_index)
```

The attribute names must match the names specified in the `attributes` property when creating the [ShaderMaterial][1].

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

```wlsl
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

This extension allows the engine to correctly interpret the texture’s sampling capabilities and bind it accordingly.

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

### Varyings

Varyings are used to pass values from the vertex shader to the fragment shader. Declare them in both vertex and fragment shader using this simplified syntax:

```wgsl
varying texCoord: vec2f;
```

Internally, those are parsed, and stored in `VertexOutput` structure in the vertex shader, as well as in `FragmentInput` structure in the fragment shader.

#### Vertex Shader

As part of the `VertexOutput` structure these built-in variables are automatically available:

```wgsl
position: @builtin(position)
```

Example:

```wgsl
varying texCoord: vec2f;

@vertex fn vertexMain(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;
    output.position = uniform.matrix_viewProjection * pos;
    output.texCoord = vec2f(0.0, 1.0);
    return output;
}
```

#### Fragment Shader

As part of the `FragmentInput` structure these built-in variables are automatically available:

```wgsl
position: @builtin(position)            // interpolated fragment position
frontFacing: @builtin(front_facing)     // front-facing
sampleIndex: builtin(sample_index)      // sample index for MSAA
```

These built-ins are also available in the global scope using these names:

```wgsl
pcPosition
pcFrontFacing
pcSampleIndex
```

Example:

```wgsl
varying texCoord: vec2f;

@fragment
fn fragmentMain(input: FragmentInput) -> FragmentOutput {
    var output: FragmentOutput;
    output.color = vec4f(1.0);
    return output;
}
```

### Fragment Shader Outputs

The fragment shader is responsible for producing one or more color outputs, which are written to the render targets (color attachments) of the framebuffer.

The engine automatically provides a `FragmentOutput` structure, which includes a predefined set of vec4f fields: `color`, `color1`, `color2` and so on, covering all possible color attachments, up to the limit defined by `GraphicsDevice.maxColorAttachments`.

As part of the `FragmentOutput` structure these built-in variables are automatically available:

```wgsl
fragDepth: @builtin(frag_depth)
```

Example:

```wgsl
@fragment fn fragmentMain(input: FragmentInput) -> FragmentOutput {
    var output: FragmentOutput;
    output.color = vec4f(1.0);
    output.color1 = vec4f(0.5);
    output.fragDepth = 0.2;
    return output;
}
```

:::note

Support for rendering to integer textures (output format other then `vec4f`) is not available yet, and will be added in the future.

:::

[1]: /user-manual/graphics/shaders/
