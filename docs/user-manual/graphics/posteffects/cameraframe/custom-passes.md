---
title: Custom Render Passes
---

The most flexible approach is to implement completely custom render passes that work independently from `CameraFrame`. This gives you full control over the rendering pipeline and allows you to build a custom post-processing stack from scratch.

## Overview

This approach does not use `CameraFrame` at all. Instead, you create your own render passes and assign them directly to the camera's `renderPasses` array. This is ideal when you need complete control or want to implement a custom post-processing pipeline.

## Example: Simple Tint Render Pass

Here's a complete example of a custom render pass that tints the scene:

```javascript
import * as pc from 'playcanvas';

class RenderPassTint extends pc.RenderPassShaderQuad {
    constructor(device, sourceTexture) {
        super(device);
        this.sourceTexture = sourceTexture;
        this.tint = pc.Color.WHITE.clone();
        
        this.shader = this.createShader();
    }
    
    createShader() {
        return pc.ShaderUtils.createShader(this.device, {
            uniqueName: 'TintShader',
            attributes: { aPosition: pc.SEMANTIC_POSITION },
            vertexChunk: 'quadVS',
            
            fragmentGLSL: `
                uniform sampler2D sourceTexture;
                uniform vec3 tint;
                varying vec2 uv0;
                
                void main() {
                    vec4 color = texture2D(sourceTexture, uv0);
                    gl_FragColor = vec4(color.rgb * tint, color.a);
                }
            `,
            
            fragmentWGSL: `
                var sourceTexture: texture_2d<f32>;
                var sourceTextureSampler: sampler;
                uniform tint: vec3f;
                varying uv0: vec2f;
                
                @fragment fn fragmentMain(input: FragmentInput) -> FragmentOutput {
                    var output: FragmentOutput;
                    let color: vec4f = textureSample(sourceTexture, sourceTextureSampler, uv0);
                    output.color = vec4f(color.rgb * uniform.tint, color.a);
                    return output;
                }
            `
        });
    }
    
    execute() {
        this.device.scope.resolve('sourceTexture').setValue(this.sourceTexture);
        this.device.scope.resolve('tint').setValue([this.tint.r, this.tint.g, this.tint.b]);
        super.execute();
    }
}
```

## Setting Up Custom Render Passes

To use custom render passes without `CameraFrame`:

```javascript
// Create your scene render pass (renders the 3D scene)
const scenePass = new pc.RenderPassForward(device, composition, scene, renderer);
scenePass.init(renderTarget);

// Create your custom post-processing pass
const tintPass = new RenderPassTint(device, renderTarget.colorBuffer);
tintPass.init(camera.renderTarget);

// Assign passes to the camera
camera.renderPasses = [scenePass, tintPass];
```

## Multi-Pass Example

Here's an example of chaining multiple custom passes:

```javascript
// Create render targets
const rt1 = new pc.RenderTarget({
    colorBuffer: new pc.Texture(device, {
        width: 1920, height: 1080,
        format: pc.PIXELFORMAT_RGBA8
    })
});

const rt2 = new pc.RenderTarget({
    colorBuffer: new pc.Texture(device, {
        width: 1920, height: 1080,
        format: pc.PIXELFORMAT_RGBA8
    })
});

// Create scene pass
const scenePass = new pc.RenderPassForward(device, composition, scene, renderer);
scenePass.init(rt1);

// Create blur pass (horizontal)
const blurHPass = new RenderPassBlurHorizontal(device, rt1.colorBuffer);
blurHPass.init(rt2);

// Create blur pass (vertical)
const blurVPass = new RenderPassBlurVertical(device, rt2.colorBuffer);
blurVPass.init(camera.renderTarget); // Final output

// Set the pass chain
camera.renderPasses = [scenePass, blurHPass, blurVPass];
```

## Resources

- [Render Pass Example](https://playcanvas.vercel.app/#/graphics/render-pass) - Complete demonstration of custom render passes

## Use Cases

This approach is ideal for:
- **Complete custom pipelines** - When you need total control over the rendering process
- **Integration with external systems** - Integrating third-party rendering or effects libraries
- **Performance optimization** - Building a minimal pipeline tailored to your specific needs
- **Learning and experimentation** - Understanding how rendering pipelines work
- **Specialized rendering** - Non-standard rendering techniques or research implementations

## Important Considerations

- **Manual management** - You're responsible for managing render targets, textures, and memory
- **Performance** - Ensure proper resource cleanup to avoid memory leaks
- **Cross-platform** - Provide both GLSL and WGSL shaders for WebGL and WebGPU support
- **Resolution handling** - Handle dynamic resolution changes appropriately
- **Layer management** - Properly configure which layers each pass renders

