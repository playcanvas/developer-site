---
title: Multiple Render Targets
description: Configure multiple render targets, shared attachments rules, and shader output to several color buffers at once.
---

The multiple render targets feature allows you to simultaneously render to multiple textures. This manual page explores implementation, configuration, and an example use case of multiple render targets.

MRT is supported on every device PlayCanvas runs on (WebGL2 and WebGPU). To detect the number of color attachments you can use on the current device, check `pc.GraphicsDevice.maxColorAttachments`. Typically, 8 attachments are supported.

Multiple render targets have the following restrictions:

- All color attachments of a multiple render target must have the same width and height.
- All color attachments are cleared to the same value, specified using `pc.CameraComponent.clearColor`.
- All color attachments use the same write mask and alpha blend mode, as specified using `pc.BlendState`.

## How to use MRT

Create the textures you want to render into:

```javascript
const createTexture = name => new pc.Texture(app.graphicsDevice, {
    name,
    width: 512,
    height: 512,
    format: pc.PIXELFORMAT_RGBA8,
    minFilter: pc.FILTER_LINEAR,
    magFilter: pc.FILTER_LINEAR,
    addressU: pc.ADDRESS_CLAMP_TO_EDGE,
    addressV: pc.ADDRESS_CLAMP_TO_EDGE
});

const texture0 = createTexture('RT-texture-0');
const texture1 = createTexture('RT-texture-1');
const texture2 = createTexture('RT-texture-2');
```

Wrap them in a render target:

```javascript
const renderTarget = new pc.RenderTarget({
    name: 'MRT',
    colorBuffers: [texture0, texture1, texture2],
    depth: true,
    samples: 2
});
```

Create a camera which will be used to render to MRT:

```javascript
const camera = new pc.Entity('MRTCamera');
camera.addComponent('camera', {
    // set its priority to make it render before the main camera each frame
    priority: -1,

    // this camera renders into MRT
    renderTarget: renderTarget
});
app.root.addChild(camera);

// set the camera to use a custom shader pass called MyMRT
camera.camera.setShaderPass('MyMRT');
```

### Standard Materials

When rendering using `StandardMaterial` into Multiple Render Targets (MRT), override the `outputPS` shader chunk to direct values to the additional color buffers. Supply the chunk for each shader language your project targets — GLSL for WebGL2, WGSL for WebGPU.

GLSL output chunk:

```glsl
#ifdef MYMRT_PASS
    // output world normal to target 1
    pcFragColor1 = vec4(litArgs_worldNormal * 0.5 + 0.5, 1.0);

    // output gloss to target 2
    pcFragColor2 = vec4(vec3(litArgs_gloss), 1.0);
#endif
```

WGSL output chunk:

```wgsl
#ifdef MYMRT_PASS
    // output world normal to target 1
    output.color1 = vec4f(litArgs_worldNormal * 0.5 + 0.5, 1.0);

    // output gloss to target 2
    output.color2 = vec4f(vec3f(litArgs_gloss), 1.0);
#endif
```

Apply the chunks to the materials of every mesh instance you want rendered through MRT:

```javascript
const renders = entity.findComponents('render');
renders.forEach((render) => {
    render.meshInstances.forEach((meshInstance) => {
        const material = meshInstance.material;
        material.getShaderChunks(pc.SHADERLANGUAGE_GLSL).set('outputPS', glslChunk);
        material.getShaderChunks(pc.SHADERLANGUAGE_WGSL).set('outputPS', wgslChunk);
        material.shaderChunksVersion = '2.8';
    });
});
```

The chunks above only write to color targets 1 and 2 — target 0 (`pcFragColor0` in GLSL, `output.color0` in WGSL) still receives the standard forward-pass output. Write to it in the same chunk if you want to override it too.

### Custom Shaders

When using a fully custom fragment shader instead of `StandardMaterial`, write the desired values directly to `pcFragColor0`...`pcFragColor7` in GLSL or `output.color0`...`output.color7` in WGSL.

To restrict the modification to a specific camera, gate it behind the shader pass define for that camera. The define is the upper-cased pass name with `_PASS` appended, so `setShaderPass('MyMRT')` enables `MYMRT_PASS` in your shader.

## Example

A full working sample is available in the engine examples: [Multiple Render Targets](https://playcanvas.github.io/#/graphics/multi-render-targets) renders a chess board through a custom shader pass that writes its world normal and gloss into additional color targets, displayed on screen as separate textures.
