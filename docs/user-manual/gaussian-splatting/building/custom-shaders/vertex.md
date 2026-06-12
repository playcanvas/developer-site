---
title: Vertex Stage
description: "Customize Gaussian splat position, rotation, scale and color with the gsplatModifyVS shader chunk: overridable functions, GLSL/WGSL, and a live example."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `gsplatModifyVS` chunk customizes splats in the vertex stage. It runs **once per splat**, making it the right place to move, rotate, scale, hide or tint whole splats.

**View Live Example** - See shader chunk customization in action with animated splats.

<EngineExample id="gaussian-splatting/multi-splat" title="View Live Example" />

## Overridable Functions

The `gsplatModifyVS` chunk lets you override three functions:

| Function | Purpose |
| --- | --- |
| `modifySplatCenter` | Transform the splat center position (model space) |
| `modifySplatRotationScale` | Adjust the splat rotation quaternion and scale |
| `modifySplatColor` | Transform the splat color and opacity |

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
void modifySplatCenter(inout vec3 center);
void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 scale);
void modifySplatColor(vec3 center, inout vec4 color);
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
fn modifySplatCenter(center: ptr<function, vec3f>);
fn modifySplatRotationScale(originalCenter: vec3f, modifiedCenter: vec3f, rotation: ptr<function, vec4f>, scale: ptr<function, vec3f>);
fn modifySplatColor(center: vec3f, color: ptr<function, vec4f>);
```

</TabItem>
</Tabs>

You only need to implement the functions you want to change.

## How the Example Works

The live example above animates every splat with a sine-wave displacement and a golden color pulse. It comes together in three steps.

**1. Write the shader chunk**, overriding the functions you need. The example animates using a `uTime` uniform:

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
uniform float uTime;

void modifySplatCenter(inout vec3 center) {
    float heightIntensity = center.y * 0.2;
    center.x += sin(uTime * 5.0 + center.y) * 0.3 * heightIntensity;
}

void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 scale) {
    // no modification
}

void modifySplatColor(vec3 center, inout vec4 clr) {
    float sineValue = abs(sin(uTime * 5.0 + center.y));
    vec3 gold = vec3(1.0, 0.85, 0.0);
    float blend = smoothstep(0.9, 1.0, sineValue);
    clr.xyz = mix(clr.xyz, gold, blend);
}
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
uniform uTime: f32;

fn modifySplatCenter(center: ptr<function, vec3f>) {
    let heightIntensity = (*center).y * 0.2;
    (*center).x += sin(uniform.uTime * 5.0 + (*center).y) * 0.3 * heightIntensity;
}

fn modifySplatRotationScale(originalCenter: vec3f, modifiedCenter: vec3f, rotation: ptr<function, vec4f>, scale: ptr<function, vec3f>) {
    // no modification
}

fn modifySplatColor(center: vec3f, clr: ptr<function, vec4f>) {
    let sineValue = abs(sin(uniform.uTime * 5.0 + center.y));
    let gold = vec3f(1.0, 0.85, 0.0);
    let blend = smoothstep(0.9, 1.0, sineValue);
    (*clr) = vec4f(mix((*clr).xyz, gold, blend), (*clr).a);
}
```

</TabItem>
</Tabs>

**2. Apply the chunk to the scene gsplat material**, then update the material so it recompiles. Setting both the GLSL and WGSL chunk covers WebGL and WebGPU devices:

```javascript
const sceneMat = app.scene.gsplat.material;

sceneMat.getShaderChunks('glsl').set('gsplatModifyVS', glslVertShader);
sceneMat.getShaderChunks('wgsl').set('gsplatModifyVS', wgslVertShader);
sceneMat.update();
```

**3. Drive any uniforms each frame:**

```javascript
let currentTime = 0;
app.on('update', (dt) => {
    currentTime += dt;
    sceneMat.setParameter('uTime', currentTime);
    sceneMat.update();
});
```

## See Also

- [Fragment Stage Customization](/user-manual/gaussian-splatting/building/custom-shaders/fragment) — per-pixel color modification
- [Varying Streams](/user-manual/gaussian-splatting/building/custom-shaders/varyings) — pass per-splat values computed here to the fragment stage
