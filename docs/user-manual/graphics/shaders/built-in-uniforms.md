---
title: Built-in Shader Uniforms
description: Engine-provided camera matrices, screen and viewport dimensions, exposure, and XR view index for custom forward shaders.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

PlayCanvas supplies the following numerical uniforms when rendering meshes in forward passes. Use them in `ShaderMaterial` shaders and custom material chunks without calling `Material.setParameter()` for these names.

Camera values follow the camera or XR view being rendered. The list describes forward rendering; do not assume the same inputs are populated in shadow, picking, compute, or standalone post-processing passes.

## Available Uniforms

The uniforms can be read in vertex and fragment shaders. Declare the names you use, with the types shown below. In WGSL, access them through the `uniform.` prefix.

| Uniform | GLSL type | WGSL type | Value |
| --- | --- | --- | --- |
| `matrix_view` | `mat4` | `mat4x4f` | Transforms world-space positions to view space. |
| `matrix_viewInverse` | `mat4` | `mat4x4f` | Inverse of `matrix_view`; transforms view-space positions to world space. |
| `matrix_view3` | `mat3` | `mat3x3f` | Upper-left 3×3 part of `matrix_view`. Transforms directions without translation. |
| `matrix_projection` | `mat4` | `mat4x4f` | Transforms view-space positions to clip space. Includes the renderer's projection adjustments, such as jitter, render-target Y flip, and the graphics backend's depth convention. |
| `matrix_viewProjection` | `mat4` | `mat4x4f` | `matrix_projection * matrix_view`; transforms world-space positions to clip space. |
| `view_position` | `vec3` | `vec3f` | Camera position in world space; the current eye's position in XR. |
| `screen_size` | `vec4` | `vec4f` | Canvas drawing-buffer width, height, inverse width, and inverse height. These are pixel dimensions, not CSS dimensions. |
| `viewport_size` | `vec4` | `vec4f` | Camera viewport width, height, inverse width, and inverse height in pixels. Accounts for the render target, `camera.rect`, and the XR eye viewport. Contains no viewport origin. |
| `view_index` | `uint` | `u32` | Zero-based index of the XR view currently being rendered. Use it to select per-view data such as a depth texture array layer. |
| `exposure` | `float` | `f32` | Camera exposure when `scene.physicalUnits` is enabled; otherwise `scene.exposure`. When using the engine's tone-mapping chunks, let those chunks apply exposure to avoid applying it twice. |

The projection matrices are the versions used for rendering. They can differ from a projection matrix calculated in application code before jitter or backend adjustments. Prefer `matrix_viewProjection` when projecting a world-space position in a shader.

`matrix_model` and `matrix_normal` are per-mesh inputs, separate from these camera and scene values. For transformations that also support skinning, morphing, and instancing, use the [vertex shader chunks](/user-manual/graphics/shaders/#vertex-shader).

## Declaring and Reading Uniforms

For example, convert a world-space direction to view space:

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
uniform mat3 matrix_view3;

vec3 directionToView(vec3 worldDirection) {
    return matrix_view3 * worldDirection;
}
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
uniform matrix_view3: mat3x3f;

fn directionToView(worldDirection: vec3f) -> vec3f {
    return uniform.matrix_view3 * worldDirection;
}
```

</TabItem>
</Tabs>

For the full declaration rules, see [GLSL Specifics](/user-manual/graphics/shaders/glsl-specifics#uniforms) and [WGSL Reflection](/user-manual/graphics/shaders/wgsl-reflection#uniforms).

## Screen Size and Viewport Size

Both size uniforms use the layout `[width, height, 1 / width, 1 / height]`, but describe different areas:

- `screen_size` always describes the canvas drawing buffer. Rendering to a smaller offscreen target does not change it.
- `viewport_size` describes the camera's viewport within its current target. It changes for offscreen targets, partial camera rectangles, and XR eye viewports.

For a 1920×1080 canvas with a camera rendering into a 960×540 target, `screen_size.xy` is `(1920, 1080)` and `viewport_size.xy` is `(960, 540)` when the camera fills the target. If the camera occupies half the target's width, `viewport_size.xy` is `(480, 540)`.

Do not use `screen_size` as a general texture-size uniform. To normalize framebuffer coordinates for a partial viewport, also account for the viewport origin; neither size uniform supplies that origin.
