---
title: WGSL Vertex and Fragment Shaders
description: "Vertex and fragment specific WGSL constructs in PlayCanvas: attributes, varyings, and fragment outputs."
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** Implement WGSL Vertex and Fragment Shaders; required behavior and constraints: Vertex and fragment specific WGSL constructs in PlayCanvas: attributes, varyings, and fragment outputs; launch the application, capture the rendered result, and check the console for shader or rendering errors.
- **[VS Code Extension](/user-manual/ai/vscode-extension/):** Implement WGSL Vertex and Fragment Shaders in the relevant script or shader assets so the result satisfies this requirement: vertex and fragment specific WGSL constructs in PlayCanvas: attributes, varyings, and fragment outputs; review the complete diff and diagnostics before Push.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Read or overwrite Shader asset text, configure the entities that use it, and launch or capture the scene to verify rendering.

:::

This page covers the WGSL constructs that are specific to vertex and fragment shaders: attributes, varyings, and fragment outputs.

For resources that are shared across all shader stages — uniforms, textures, and storage buffers, declared with the simplified syntax and reflected into bind groups automatically — see [WGSL Reflection](/user-manual/graphics/shaders/wgsl-reflection).

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

The attribute names must match the names specified in the `attributes` property when creating the [ShaderMaterial](/user-manual/graphics/shaders/).

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
sampleIndex: @builtin(sample_index)     // sample index for MSAA
primitiveIndex: @builtin(primitive_index) // primitive index (when supported)
```

These built-ins are also available in the global scope using these names:

```wgsl
pcPosition
pcFrontFacing
pcSampleIndex
pcPrimitiveIndex  // when supported
```

:::note

The `primitiveIndex` / `pcPrimitiveIndex` built-in is only available when `device.supportsPrimitiveIndex` is true. This feature is WebGPU-only (not available on WebGL2). See [WGSL language extensions](/user-manual/graphics/shaders/wgsl-capabilities#wgsl-language-extensions) for `enable primitive_index;` and `CAPS_PRIMITIVE_INDEX`.

:::

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

Support for rendering to integer textures (output format other than `vec4f`) is not available yet, and will be added in the future.

:::
