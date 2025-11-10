---
title: Customizing the Compose Shader
---

The simplest way to add custom post-effects is by customizing the final compose pass, where all effects are combined and rendered to the backbuffer. This approach is ideal when you don't need additional render passes and want to modify the final output.

## Overview

You can inject custom shader code by overriding shader chunks before creating the `CameraFrame`. The compose pass provides three empty chunks specifically for customization:

- `composeDeclarationsPS` - Add custom uniform declarations and helper functions
- `composeMainStartPS` - Add code at the start of the main function
- `composeMainEndPS` - Add code at the end of the main function, just before the final output

## Example: Simple Pixelation Effect

Here's a complete example showing how to add a pixelation effect:

```javascript
import * as pc from 'playcanvas';

// Override compose shader chunks before creating CameraFrame
const shaderChunks = pc.ShaderChunks.get(graphicsDevice, pc.SHADERLANGUAGE_GLSL);

shaderChunks.set('composeDeclarationsPS', `
    uniform float pixelSize;
`);

shaderChunks.set('composeMainEndPS', `
    // Apply pixelation effect
    vec2 pixelatedUV = floor(uv0 / pixelSize) * pixelSize;
    color = getLinear(texture2D(sceneTexture, pixelatedUV));
`);

// For WebGPU, also set WGSL chunks
const wgslChunks = pc.ShaderChunks.get(graphicsDevice, pc.SHADERLANGUAGE_WGSL);
wgslChunks.set('composeDeclarationsPS', `
    uniform pixelSize: f32;
`);

wgslChunks.set('composeMainEndPS', `
    let pixelatedUV: vec2f = floor(input.uv0 / uniform.pixelSize) * uniform.pixelSize;
    color = getLinear(textureSample(sceneTexture, sceneTextureSampler, pixelatedUV));
`);

// Now create the CameraFrame
const cameraFrame = new pc.CameraFrame(app, cameraEntity.camera);
cameraFrame.update();

// Set the custom uniform value
app.on('update', () => {
    graphicsDevice.scope.resolve('pixelSize').setValue(0.005);
});
```

## Important Notes

- **Global Application**: Changes to shader chunks are applied globally to all `CameraFrame` instances.
- **WebGPU Support**: Remember to provide both GLSL and WGSL shader chunks for cross-platform compatibility.
- **Timing**: Shader chunks must be set before creating the `CameraFrame` instance.

## Resources

- [Custom Compose Shader Example](https://playcanvas.vercel.app/#/graphics/custom-compose-shader) - Complete working demonstration

## Use Cases

This approach is ideal for:
- Adding simple screen-space effects (vignette, color adjustments, distortion)
- Post-processing that doesn't require additional textures or render passes
- Quick prototyping of visual effects
- Effects that operate on the final composed image

