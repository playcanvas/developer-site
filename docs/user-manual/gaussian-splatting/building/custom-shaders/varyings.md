---
title: Varying Streams
description: "Pass per-splat data from the gsplat vertex stage to the fragment stage using custom varying streams: API, generated set/get functions, and a live clipping example."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Varying streams pass custom per-splat data from the [vertex stage](/user-manual/gaussian-splatting/building/custom-shaders/vertex) to the [fragment stage](/user-manual/gaussian-splatting/building/custom-shaders/fragment). A value is computed **once per splat** in the `gsplatModifyVS` chunk and read by every fragment of that splat in the `gsplatModifyPS` chunk.

The typical use is classification: decide something about a splat once, then let the fragment stage pay per-pixel cost only where needed.

**View Live Example** - Splats clipped by an animated box, with per-pixel clipping only on splats intersecting the box surface.

<EngineExample id="gaussian-splatting/clipping" title="View Live Example" />

## Adding Streams

Streams are managed via [`app.scene.gsplat.varyings`](https://api.playcanvas.com/engine/classes/GSplatParams.html#varyings):

```javascript
app.scene.gsplat.varyings.add([
    { name: 'clipState', type: pc.TYPE_UINT32, components: 1 }
]);

// later, to remove
app.scene.gsplat.varyings.remove(['clipState']);
```

Supported types are `TYPE_FLOAT32`, `TYPE_INT32` and `TYPE_UINT32`, with 1 to 4 components.

For each stream, two functions are generated and made available to your shader chunks:

| Function | Available in | Purpose |
| --- | --- | --- |
| `set<Name>(value)` | `gsplatModifyVS` | Write the per-splat value (runs once per splat) |
| `get<Name>()` | `gsplatModifyPS` | Read the per-splat value for the current fragment |

Adding or removing streams rebuilds the gsplat shaders, so configure them at startup rather than toggling them at runtime.

## Example

The live example above clips splats by an animated world-space box. The vertex stage classifies each splat against the box once per splat: splats fully inside are clipped entirely, splats fully outside set a flag so their fragments skip all work, and only splats intersecting the box surface run the per-pixel test.

**1. Write the per-splat value in the vertex stage chunk:**

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
uniform vec3 uClipCenter;
uniform vec3 uClipHalf;

void modifySplatCenter(inout vec3 center) {
}

void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 scale) {
    // signed distance of the splat center from the clipping box surface (negative inside)
    vec3 d = abs(modifiedCenter - uClipCenter) - uClipHalf;
    float sdf = length(max(d, vec3(0.0))) + min(max(d.x, max(d.y, d.z)), 0.0);

    // conservative splat radius
    float radius = 2.0 * gsplatGetSizeFromScale(scale);

    if (sdf < -radius) {
        // fully inside the box - clip the whole splat
        scale = vec3(0.0);
        setClipState(1u);
    } else if (sdf > radius) {
        // fully outside the box - no per-pixel clipping needed
        setClipState(1u);
    } else {
        // intersects the box surface - clip per pixel in the fragment shader
        setClipState(0u);
    }
}

void modifySplatColor(vec3 center, inout vec4 color) {
}
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
uniform uClipCenter: vec3f;
uniform uClipHalf: vec3f;

fn modifySplatCenter(center: ptr<function, vec3f>) {
}

fn modifySplatRotationScale(originalCenter: vec3f, modifiedCenter: vec3f, rotation: ptr<function, vec4f>, scale: ptr<function, vec3f>) {
    // signed distance of the splat center from the clipping box surface (negative inside)
    let d = abs(modifiedCenter - uniform.uClipCenter) - uniform.uClipHalf;
    let sdf = length(max(d, vec3f(0.0))) + min(max(d.x, max(d.y, d.z)), 0.0);

    // conservative splat radius
    let radius = 2.0 * gsplatGetSizeFromScale(*scale);

    if (sdf < -radius) {
        // fully inside the box - clip the whole splat
        *scale = vec3f(0.0);
        setClipState(1u);
    } else if (sdf > radius) {
        // fully outside the box - no per-pixel clipping needed
        setClipState(1u);
    } else {
        // intersects the box surface - clip per pixel in the fragment shader
        setClipState(0u);
    }
}

fn modifySplatColor(center: vec3f, color: ptr<function, vec4f>) {
}
```

</TabItem>
</Tabs>

**2. Read it in the fragment stage chunk** and early-out before the expensive per-pixel work:

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
uniform vec3 uClipCenter;
uniform vec3 uClipHalf;
uniform mat4 uInvViewProj;
uniform vec4 uScreenSize;

void modifySplatColor(vec2 gaussianUV, inout vec4 color) {
    // splats fully inside or outside the box were already resolved per splat in the vertex stage
    if (getClipState() == 1u) return;

    // reconstruct the world position of this fragment (on the splat's depth plane)
    vec3 ndc = vec3(gl_FragCoord.xy * uScreenSize.zw, gl_FragCoord.z) * 2.0 - 1.0;
    vec4 world = uInvViewProj * vec4(ndc, 1.0);
    vec3 worldPos = world.xyz / world.w;

    // clip fragments inside the box
    vec3 d = abs(worldPos - uClipCenter) - uClipHalf;
    if (max(d.x, max(d.y, d.z)) < 0.0) {
        color.a = 0.0;
    }
}
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
uniform uClipCenter: vec3f;
uniform uClipHalf: vec3f;
uniform uInvViewProj: mat4x4f;
uniform uScreenSize: vec4f;

fn modifySplatColor(gaussianUV: vec2f, color: ptr<function, vec4f>) {
    // splats fully inside or outside the box were already resolved per splat in the vertex stage
    if (getClipState() == 1u) {
        return;
    }

    // reconstruct the world position of this fragment (on the splat's depth plane)
    let uv = pcPosition.xy * uniform.uScreenSize.zw;
    let ndc = vec3f(uv.x * 2.0 - 1.0, (1.0 - uv.y) * 2.0 - 1.0, pcPosition.z * 2.0 - 1.0);
    let world = uniform.uInvViewProj * vec4f(ndc, 1.0);
    let worldPos = world.xyz / world.w;

    // clip fragments inside the box
    let d = abs(worldPos - uniform.uClipCenter) - uniform.uClipHalf;
    if (max(d.x, max(d.y, d.z)) < 0.0) {
        *color = vec4f((*color).rgb, 0.0);
    }
}
```

</TabItem>
</Tabs>

Both chunks are applied to the scene gsplat material as usual, using the `gsplatModifyVS` and `gsplatModifyPS` keys.

## Memory Considerations

On some platforms each component is stored in per-splat video memory, so its size scales with the number of rendered splats. Keep the data as compact as possible - prefer fewer components, and consider bit-packing multiple small values into a single uint component instead of using separate streams.

## See Also

- [Vertex Stage Customization](/user-manual/gaussian-splatting/building/custom-shaders/vertex) — where the values are written
- [Fragment Stage Customization](/user-manual/gaussian-splatting/building/custom-shaders/fragment) — where the values are read
