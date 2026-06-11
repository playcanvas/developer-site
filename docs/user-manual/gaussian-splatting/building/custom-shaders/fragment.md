---
title: Fragment Stage
description: "Customize the final Gaussian splat fragment color with the gsplatModifyPS shader chunk: per-pixel color modification, GLSL/WGSL, and available shader inputs."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `gsplatModifyPS` chunk customizes the final splat color in the fragment stage. It runs **once per covered pixel**, so effects can vary smoothly across a splat's footprint — something the per-splat vertex stage cannot do.

**View Live Example** - The [Relighting](/user-manual/gaussian-splatting/building/relighting) technique is built on this hook.

<EngineExample id="gaussian-splatting/relighting" title="View Live Example" />

## Overridable Function

The chunk overrides a single function:

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
void modifySplatColor(vec2 gaussianUV, inout vec4 color);
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
fn modifySplatColor(gaussianUV: vec2f, color: ptr<function, vec4f>);
```

</TabItem>
</Tabs>

It is called in the forward pass after the gaussian falloff and opacity dither have been evaluated, just before the color is premultiplied and output:

- `gaussianUV` — the fragment's position within the gaussian footprint: `(0,0)` at the splat center, length 1 at the edge where the splat is clipped. `dot(gaussianUV, gaussianUV)` gives the normalized squared radius used by the falloff.
- `color` — `rgb` is the splat color, `a` is the final fragment alpha. Both can be modified; alpha changes affect the blending weight, enabling custom falloffs or per-pixel fades.

## Available Inputs

Inside the chunk you can also use:

- `gl_FragCoord` (GLSL) / `pcPosition` (WGSL) — the fragment's framebuffer position in pixels
- `uScreenSize` — engine-provided `vec4` uniform: `xy` = render target size, `zw` = inverse size
- Your own uniforms and textures, declared in the chunk and driven via material parameters

## Example

This chunk samples a screen-aligned texture at the fragment's own screen position and modulates the splat color by it — the core of the [Relighting](/user-manual/gaussian-splatting/building/relighting) technique:

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
uniform sampler2D uTintMap;
uniform vec4 uScreenSize;

void modifySplatColor(vec2 gaussianUV, inout vec4 color) {
    vec3 tint = textureLod(uTintMap, gl_FragCoord.xy * uScreenSize.zw, 0.0).rgb;
    color.rgb *= tint;
}
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
var uTintMap: texture_2d<f32>;
var uTintMapSampler: sampler;
uniform uScreenSize: vec4f;

fn modifySplatColor(gaussianUV: vec2f, color: ptr<function, vec4f>) {
    let tint = textureSampleLevel(uTintMap, uTintMapSampler, pcPosition.xy * uniform.uScreenSize.zw, 0.0).rgb;
    *color = vec4f((*color).rgb * tint, (*color).a);
}
```

</TabItem>
</Tabs>

Apply it the same way as the vertex chunk, using the `gsplatModifyPS` key:

```javascript
const sceneMat = app.scene.gsplat.material;

sceneMat.getShaderChunks('glsl').set('gsplatModifyPS', glslFragShader);
sceneMat.getShaderChunks('wgsl').set('gsplatModifyPS', wgslFragShader);
sceneMat.setParameter('uTintMap', tintTexture);
sceneMat.update();
```

## See Also

- [Vertex Stage Customization](/user-manual/gaussian-splatting/building/custom-shaders/vertex) — move, scale and tint splats
- [Relighting](/user-manual/gaussian-splatting/building/relighting) — light splats using a proxy mesh, built on this hook
