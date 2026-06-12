---
title: Fragment Stage
description: "Customize the final Gaussian splat fragment color with the gsplatModifyPS shader chunk: per-pixel color modification, GLSL/WGSL, and available shader inputs."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `gsplatModifyPS` chunk customizes the final splat color in the fragment stage. It runs **once per covered pixel**, so effects can vary smoothly across a splat's footprint — something the per-splat vertex stage cannot do.

**View Live Example** - Each splat rendered as a ring of its own color, with a highlight wave.

<EngineExample id="gaussian-splatting/shader-rings" title="View Live Example" />

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

This is the chunk used by the live example above. It renders each splat as a ring of its own color: `gaussianUV` provides the position within the splat footprint, and `fwidth` converts the requested ring width from pixels into footprint units, keeping the ring a constant screen-space width at any zoom:

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
uniform float uRingWidth;
uniform float uRingAlpha;

void modifySplatColor(vec2 gaussianUV, inout vec4 color) {
    // distance from the splat center: 0 at center, 1 at the clipping edge
    float radius = length(gaussianUV);

    // ring of constant screen-space width at the splat edge - fwidth gives the
    // change of radius per screen pixel, converting pixels to radius units
    float radiusPerPixel = fwidth(radius);
    float innerEdge = 1.0 - uRingWidth * radiusPerPixel;
    float ring = smoothstep(innerEdge - radiusPerPixel, innerEdge, radius);
    color.a = ring * uRingAlpha;
}
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
uniform uRingWidth: f32;
uniform uRingAlpha: f32;

fn modifySplatColor(gaussianUV: vec2f, color: ptr<function, vec4f>) {
    // distance from the splat center: 0 at center, 1 at the clipping edge
    let radius = length(gaussianUV);

    // ring of constant screen-space width at the splat edge - fwidth gives the
    // change of radius per screen pixel, converting pixels to radius units
    let radiusPerPixel = fwidth(radius);
    let innerEdge = 1.0 - uniform.uRingWidth * radiusPerPixel;
    let ring = smoothstep(innerEdge - radiusPerPixel, innerEdge, radius);
    *color = vec4f((*color).rgb, ring * uniform.uRingAlpha);
}
```

</TabItem>
</Tabs>

Apply it the same way as the vertex chunk, using the `gsplatModifyPS` key, and drive the uniforms via material parameters:

```javascript
const sceneMat = app.scene.gsplat.material;

sceneMat.getShaderChunks('glsl').set('gsplatModifyPS', glslFragShader);
sceneMat.getShaderChunks('wgsl').set('gsplatModifyPS', wgslFragShader);
sceneMat.setParameter('uRingWidth', 1);
sceneMat.setParameter('uRingAlpha', 0.25);
sceneMat.update();
```

For an effect that samples a screen-aligned texture at each fragment's screen position, see [Relighting](/user-manual/gaussian-splatting/building/relighting) — it modulates splats by the lighting of a proxy mesh rendered to an offscreen texture.

## See Also

- [Vertex Stage Customization](/user-manual/gaussian-splatting/building/custom-shaders/vertex) — move, scale and tint splats
- [Varying Streams](/user-manual/gaussian-splatting/building/custom-shaders/varyings) — read per-splat values written by the vertex stage
- [Relighting](/user-manual/gaussian-splatting/building/relighting) — light splats using a proxy mesh, built on this hook
