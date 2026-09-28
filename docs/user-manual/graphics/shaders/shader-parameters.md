---
title: Shader Parameters
description: Set the values of your own shader uniforms on a material, on a mesh instance, or globally on the graphics device.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Custom shaders often read uniforms of their own, such as a tint color or an animation time. Their values can be set in three places:

- On a **material**, for all mesh instances that render with it.
- On a **mesh instance**, for the draws of that mesh instance only.
- **Globally**, on the scope of the graphics device, for every draw that does not set its own value.

For each draw, a value set on the mesh instance takes precedence over one set on its material, which takes precedence over a global value. The uniforms the engine supplies itself, such as the camera matrices, are described in [Built-in Shader Uniforms](/user-manual/graphics/shaders/built-in-uniforms).

The values can be numbers, arrays of numbers for vectors and matrices, and textures. To change the contents of an array, set the array again: a change made to an array in place is not guaranteed to be picked up.

## Declaring the Uniforms

Declare the uniforms in the shader as usual. For example, a fragment shader reading a `tint` color:

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
uniform vec3 tint;

void main(void) {
    gl_FragColor = vec4(tint, 1.0);
}
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
uniform tint: vec3f;

@fragment
fn fragmentMain(input: FragmentInput) -> FragmentOutput {
    var output: FragmentOutput;
    output.color = vec4f(uniform.tint, 1.0);
    return output;
}
```

</TabItem>
</Tabs>

## Material Parameters

`Material.setParameter()` sets a value for all mesh instances that render with the material, and `Material.deleteParameter()` removes it. This is how the uniforms of a `ShaderMaterial`, or of custom shader chunks, are supplied:

```javascript
material.setParameter('tint', [1, 0.5, 0]);
```

`StandardMaterial` supplies the uniforms of its own properties, such as `diffuse`, `emissive` or `gloss`. Set these properties and call `update()` instead. Calling `setParameter()` with the names of their uniforms, such as `material_diffuse`, has no effect, and debug builds warn about it.

Material parameters are not reset after the draws of the material. A later draw whose material does not have a parameter of the same name reads the value the last material set.

## Mesh Instance Parameters

`MeshInstance.setParameter()` overrides a value for the draws of one mesh instance, and `MeshInstance.deleteParameter()` removes the override. Other mesh instances using the same material are not affected:

```javascript
const meshInstance = entity.render.meshInstances[0];
meshInstance.setParameter('tint', [0, 1, 0]);
```

A mesh instance can also override the values of `StandardMaterial` properties, and its textures, using the names of their uniforms. The value is the one the shader receives, so a color is set in linear space, while the `diffuse` property itself takes an sRGB color:

```javascript
meshInstance.setParameter('material_diffuse', new Float32Array([0.8, 0.1, 0.1]));
```

:::warning

Overriding the values or textures of a `StandardMaterial` per mesh instance is not a cheap solution. The mesh instance gets its own copy of the material's uniform data, which takes additional GPU memory, is uploaded again whenever the material or the override changes, and is bound for each of its draws. When many mesh instances differ in these values, prefer separate materials, or [hardware instancing](/user-manual/graphics/advanced-rendering/hardware-instancing) with per-instance data.

:::

Overriding other values, such as the uniforms of a `ShaderMaterial`, does not create such a copy.

## Global Parameters

A value can also be set globally, on the scope of the graphics device. Every draw where neither the material nor the mesh instance sets its own value uses it:

```javascript
app.graphicsDevice.scope.resolve('tint').setValue([1, 0, 0]);
```

A mesh instance overriding a global value uses its own value for its draws only, and the draws that follow read the global value again.

As material parameters are not reset after the draws of the material, a name used as a global default should not be set as a parameter of only some of the materials. The draws of the other materials would read the value the last of those materials set, instead of the global one.

## Values Set by the Renderer

The renderer sets some uniforms itself, once for each render pass: the camera values listed in [Built-in Shader Uniforms](/user-manual/graphics/shaders/built-in-uniforms), and the values of the lights and of the fog. Values set for these names on a material, on a mesh instance or globally have no effect.

On WebGPU, the same applies to the textures the renderer supplies for each pass to `StandardMaterial`, such as the environment atlas, the scene color and depth maps, and the shadow and cookie atlases of clustered lighting. They cannot be replaced per material or per mesh instance, and debug builds warn about it.
