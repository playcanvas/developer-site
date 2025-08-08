---
title: Multiple Render Targets
---

The multiple render targets feature allows to simultaneously render to multiple textures. This manual page explores implementation, configuration, and an example use case of multiple render targets.

For its support on a device, check `pc.GraphicsDevice.supportsMrt`. In general, it is supported on all WebGL2 and WebGPU devices and also on WebGL1 devices that support the `WEBGL_draw_buffers` extension. Note that on WebGL1 devices, the support is very high apart from on Android, where it is very low.

Additionally, you can detect the number of color attachments you can use by checking `pc.GraphicsDevice.maxColorAttachments`. Typically, 8 attachments are supported.

Multiple render targets have the following restrictions:

- All color attachments of a multiple render target must have the same width and height.
- All color attachments are cleared to the same value, specified using `pc.CameraComponent.clearColor`.
- All color attachments use the same write mask and alpha blend mode, as specified using `pc.BlendState`.

## How to use MRT

Create a render target using multiple color textures:

```javascript
const colorBuffers = app.graphicsDevice.supportsMrt ? [texture0, texture1, texture2] : [texture0];
const renderTarget = new pc.RenderTarget({
    name: 'MRT',
    colorBuffers: colorBuffers,
    depth: true
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

// if MRT is supported, set the camera to use a custom shader pass called MyMRT
if (app.graphicsDevice.supportsMrt) {
    camera.camera.setShaderPass('MyMRT');
}
```

### Standard Materials

When rendering using `StandardMaterial` into Multiple Render Targets (MRT), it is necessary to override the output shader chunk to direct values to additional color buffers. It is important to note that the modification in this example does not affect `gl_FragColor`, which is used for the forward pass output in target 0. If you wish to override it as well, you can output values to `pcFragColor0` as well.

```javascript
materials.forEach((material) => {
    material.chunks.outputPS = `
        #ifdef MYMRT_PASS
            // output world normal to target 1
            pcFragColor1 = vec4(litArgs_worldNormal * 0.5 + 0.5, 1.0);

            // output gloss to target 2
            pcFragColor2 = vec4(vec3(litArgs_gloss) , 1.0);
        #endif
    `;
});
```

### Custom Shaders

When not using `StandardMaterial` for rendering and instead employing a fully custom fragment shader, you can directly output the desired values to `pcFragColor0...pcFragColor7`. If you only need to modify the rendering for a specific camera, utilize the `MYMRT_PASS` define, which corresponds to the shader pass configured for that camera.
