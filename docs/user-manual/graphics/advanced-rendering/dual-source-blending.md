---
title: Dual-Source Blending
description: Use two fragment shader outputs in one blend operation on WebGL 2 and WebGPU.
---

Dual-source blending allows a fragment shader to produce two colors for a single color attachment. The first color is the value being blended, while the second color can be selected as a blend factor. This supports effects such as subpixel text antialiasing and advanced compositing that cannot be expressed using a single fragment output.

## Platform Support

Dual-source blending is an optional capability on both graphics backends:

- **WebGPU** uses the `dual-source-blending` device feature and WGSL language extension.
- **WebGL 2** uses the `WEBGL_blend_func_extended` extension.

PlayCanvas exposes both through the same capability flag:

```javascript
const device = app.graphicsDevice;

if (!device.supportsDualSourceBlending) {
    // Use a fallback material or rendering path.
}
```

The engine also defines `CAPS_DUAL_SOURCE_BLENDING` when the capability is available. On WebGPU, the engine adds `enable dual_source_blending;` to fragment shader variants that use the feature.

## Blend Factors

The secondary fragment output can be referenced using four blend factors:

| Blend factor | Description |
|--------------|-------------|
| `BLENDMODE_SRC1_COLOR` | Secondary source color |
| `BLENDMODE_ONE_MINUS_SRC1_COLOR` | One minus the secondary source color |
| `BLENDMODE_SRC1_ALPHA` | Secondary source alpha |
| `BLENDMODE_ONE_MINUS_SRC1_ALPHA` | One minus the secondary source alpha |

Only use these constants when `device.supportsDualSourceBlending` is true.

## StandardMaterial

Dual-source blending is enabled automatically when a material's [`BlendState`](https://api.playcanvas.com/engine/classes/BlendState.html) uses one of the secondary source factors. There is no separate material setting.

First, override the `outputPS` chunk to write the primary and secondary fragment outputs. Supply both GLSL and WGSL versions when supporting both graphics backends:

```javascript
const material = new pc.StandardMaterial();
material.useLighting = false;
material.useTonemap = false;

material.getShaderChunks(pc.SHADERLANGUAGE_GLSL).set('outputPS', `
    gl_FragColor = vec4(0.45, 0.02, 0.02, 0.0);
    pcFragColorSecondary = vec4(0.0, 0.85, 0.18, 1.0);
`);

material.getShaderChunks(pc.SHADERLANGUAGE_WGSL).set('outputPS', `
    output.color = vec4f(0.45, 0.02, 0.02, 0.0);
    output.colorSecondary = vec4f(0.0, 0.85, 0.18, 1.0);
`);
```

Then configure the blend state. This example calculates `source0 + destination * source1` for RGB:

```javascript
material.blendState = new pc.BlendState(
    true,
    pc.BLENDEQUATION_ADD,
    pc.BLENDMODE_ONE,
    pc.BLENDMODE_SRC1_COLOR,
    pc.BLENDEQUATION_ADD,
    pc.BLENDMODE_ZERO,
    pc.BLENDMODE_ONE
);

material.update();
```

Here, `gl_FragColor` / `output.color` is `source0`, and `pcFragColorSecondary` / `output.colorSecondary` is `source1`. The secondary value participates in blending but is not written to a separate color attachment.

## ShaderMaterial

[`ShaderMaterial`](https://api.playcanvas.com/engine/classes/ShaderMaterial.html) uses the same BlendState-driven behavior. Write both outputs in the fragment shader and assign a blend state containing a secondary source factor. The engine automatically generates the dual-source shader variant for that material.

When creating shader definitions directly using `ShaderDefinitionUtils.createDefinition`, pass `useDualSourceBlending: true`. This low-level option is not needed for StandardMaterial or ShaderMaterial.

## Restrictions

- The render target must have exactly one color attachment. Dual-source blending cannot be combined with [Multiple Render Targets](./multiple-render-targets).
- Support is device-dependent, so always check `device.supportsDualSourceBlending` before assigning a secondary source blend factor.
- Dual-source blending is selected independently for each material and draw call. Other materials in the same render pass do not need dual-source outputs.

## Example

The [Dual-Source Blending example](https://playcanvas.com/examples/#/test/dual-source-blending) renders a black-and-white checkerboard, then draws a dual-source blended quad over it. Black cells receive only the red primary output, while white cells also contribute the green secondary output.
