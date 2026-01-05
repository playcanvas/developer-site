---
title: Introduction
sidebar_position: 1
---

## What is Shader Editor?

__Shader Editor__ is a web-based visual programming tool for creating shader materials and effects.

Instead of writing shader programs directly, in __Shader Editor__ you construct shader graphs. These graphs comprise a network of nodes connected together with edges. __Shader Editor__ will convert a completed graph to the equivalent shader program for use at runtime.

### Example

For example, the following effect animates multiple surface normal maps and combines them with special effect lighting:

![sample effect](/img/shader-editor/sample-effect.gif)

The effect is made up of various graphs, including the following one. This graph takes care of unpacking the normals in a normal map:

![sample graph](/img/shader-editor/sample-graph.png)

__Shader Editor__ will convert this graph into a shader program, which is executed on a GPU at runtime:

```glsl
void func_unpackNormal(in vec3 usr_rawNormal, out vec3 usr_unpackedNormal) {
    float var_ = float(2);
    vec3 var_0 = vec3(var_,var_,var_);
    vec3 var_1 = var_0 * usr_rawNormal;
    float var_2 = float(-1);
    vec3 var_3 = vec3(var_2,var_2,var_2);
    vec3 var_4 = var_1 + var_3;
    usr_unpackedNormal = var_4;
}
```

### Next steps

Learn more about Shader Editor in general in the [Overview](/shader-editor/overview) section.

Find out more about the window layout in the [Window Layout](/shader-editor/window-layout) section.
