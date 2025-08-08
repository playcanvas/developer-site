---
title: GLSL Specifics
---

GLSL shaders used by the PlayCanvas engine must satisfy certain requirements. These requirements allow the engine to correctly integrate shaders, ensuring they receive the necessary resources such as attributes, uniforms, and varyings. Following these rules also allows us to automatically process the shader for slightly different requirements when transpiling to WGSL for use with WebGPU.

The following sections outline key aspects of writing GLSL shaders for PlayCanvas.

:::note

`#version` should not be included in the shader source. PlayCanvas automatically adds the appropriate version directive based on whether WebGL2 or WebGPU is targeted.

:::

### Attributes

Attributes define per-vertex input data, and can only be used in the vertex shader. They must be declared using the following syntax:

```glsl
attribute vec2 aUv0;
```

The attribute names must match the names specified in the `attributes` property when creating the [ShaderMaterial][1].

:::note

The `in` keyword (introduced in GLSL 3.3+) is not supported.

:::

### Uniforms

Uniforms are used to pass resources from the engine to the shader. They are declared in the standard way for numerical and texture uniforms:

```glsl
uniform vec3 view_position;
```

The engine automatically sets appropriate uniform values when rendering.

:::note

Currently, our uniform system supports only simple types, including `float`, `int`, `uint`, as well as vectors and matrices (e.g., `vec4`, `mat4`). Structs are not supported at this time, so all uniform values must be declared as individual variables of basic types.

:::

### Varyings

Varyings are used to pass values from the vertex shader to the fragment shader. They must be declared using standard GLSL syntax:

```glsl
varying vec2 uv0;
```

:::note

The `in`/`out` syntax (introduced in GLSL 3.3+) is not supported.

:::

[1]: /user-manual/graphics/shaders/
