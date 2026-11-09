# Shader Quad Passes

A [`RenderPassShaderQuad`](https://api.playcanvas.com/engine/classes/RenderPassShaderQuad.html) is a [`RenderPass`](https://developer.playcanvas.com/user-manual/graphics/advanced-rendering/frame-graph/render-pass.md) which draws a quad with a shader, so the fragment shader runs once for each pixel the quad covers: by default the whole render target, or the part of it its [viewport](https://developer.playcanvas.com/user-manual/graphics/advanced-rendering/frame-graph/render-pass-shader-quad.md#render-states-and-the-drawn-area) selects. This is the building block of post-processing effects, and of any pass computing a texture on the GPU.

The pass creates the quad for its [`shader`](https://api.playcanvas.com/engine/classes/RenderPassShaderQuad.html#shader), sets the render states, and draws the quad when it executes. You can use it directly, by setting its shader, or as the base class of a pass which creates the shader and sets its parameters.

## The shader

The vertex shader receives the corners of the quad in an attribute using `SEMANTIC_POSITION`. The `quadVS` shader chunk implements it, and passes the uv coordinates of the quad to the fragment shader in the `uv0` varying, so you only write the fragment shader. Write it in both GLSL and WGSL, so the pass works on WebGL2 and WebGPU:

**GLSL**

```glsl
uniform sampler2D sourceTexture;
uniform vec3 tint;
varying vec2 uv0;

void main() {
    vec4 color = texture2D(sourceTexture, uv0);
    gl_FragColor = vec4(color.rgb * tint, color.a);
}
```

**WGSL**

```wgsl
var sourceTexture: texture_2d<f32>;
var sourceTextureSampler: sampler;
uniform tint: vec3f;
varying uv0: vec2f;

@fragment fn fragmentMain(input: FragmentInput) -> FragmentOutput {
    var output: FragmentOutput;
    let color = textureSample(sourceTexture, sourceTextureSampler, input.uv0);
    output.color = vec4f(color.rgb * uniform.tint, color.a);
    return output;
}
```

Create the shader with [`ShaderUtils.createShader`](https://api.playcanvas.com/engine/classes/ShaderUtils.html#createshader), giving it both fragment shaders:

```javascript
const shader = ShaderUtils.createShader(device, {
    uniqueName: 'TintShader',
    attributes: { aPosition: SEMANTIC_POSITION },
    vertexChunk: 'quadVS',
    fragmentGLSL: tintGLSL,
    fragmentWGSL: tintWGSL
});
```

The pass does not destroy its shader, as shaders are shared.

## Setting the shader parameters

The textures and uniforms of the shader are set on the scope of the graphics device. Other passes can set parameters with the same names, so set them right before the quad is drawn: resolve them once, when the pass is created, and set their values in an override of `execute`, before calling `super.execute()`, which draws the quad:

```javascript
// A pass drawing a texture into its render target, multiplied by a color
class TintPass extends RenderPassShaderQuad {
    constructor(device, sourceTexture) {
        super(device);
        this.name = 'TintPass';
        this.sourceTexture = sourceTexture;
        this.tint = new Float32Array([1, 0.5, 0.5]);
        this.shader = ShaderUtils.createShader(device, {
            uniqueName: 'TintShader',
            attributes: { aPosition: SEMANTIC_POSITION },
            vertexChunk: 'quadVS',
            fragmentGLSL: tintGLSL,
            fragmentWGSL: tintWGSL
        });

        // resolve the shader parameters once
        this.sourceTextureId = device.scope.resolve('sourceTexture');
        this.tintId = device.scope.resolve('tint');
    }

    execute() {
        // set the parameters right before the quad is drawn
        this.sourceTextureId.setValue(this.sourceTexture);
        this.tintId.setValue(this.tint);
        super.execute();
    }
}

const pass = new TintPass(app.graphicsDevice, sourceTexture);
pass.init(renderTarget);

// the quad covers the whole render target, so clear it instead of loading its content
pass.setClearColor(Color.BLACK);
```

Add the pass to a camera to draw it every frame, see [Camera Passes](https://developer.playcanvas.com/user-manual/graphics/advanced-rendering/frame-graph/camera-passes.md), or render it once with `pass.render()`.

## Render states and the drawn area

By default, the quad covers the whole render target, and is drawn without blending, depth test or face culling, replacing what the render target contains. To change that, set:

- [`blendState`](https://api.playcanvas.com/engine/classes/RenderPassShaderQuad.html#blendstate) to combine the quad with the content of the render target.
- [`depthState`](https://api.playcanvas.com/engine/classes/RenderPassShaderQuad.html#depthstate), [`stencilFront`](https://api.playcanvas.com/engine/classes/RenderPassShaderQuad.html#stencilfront) and [`stencilBack`](https://api.playcanvas.com/engine/classes/RenderPassShaderQuad.html#stencilback) to test the quad against the depth or the stencil of the render target.
- [`viewport`](https://api.playcanvas.com/engine/classes/RenderPassShaderQuad.html#viewport), and optionally [`scissor`](https://api.playcanvas.com/engine/classes/RenderPassShaderQuad.html#scissor), to draw into a part of the render target only.

For example, to draw shaders into a tile of a texture atlas, using the pass directly. The atlas is not cleared, so its other tiles keep their content:

```javascript
const pass = new RenderPassShaderQuad(app.graphicsDevice);
pass.name = 'AtlasTile';
pass.shader = tileShader;
pass.init(atlasRenderTarget);

pass.viewport = new Vec4(256, 0, 256, 256);
pass.render();

// blend a second shader over the same tile
pass.shader = overlayShader;
pass.blendState = BlendState.ALPHABLEND;
pass.render();

pass.destroy();
```

## Drawing several quads

To draw many quads which differ only by the data each reads for its index, such as sprites, set [`numInstances`](https://api.playcanvas.com/engine/classes/RenderPassShaderQuad.html#numinstances) to draw them in a single instanced draw. Each instance reads its index, `gl_InstanceID` in GLSL and `pcInstanceIndex` in WGSL, to fetch the data of its quad, for example to place it. By default, `numInstances` is `undefined`, which draws a single quad without instancing. Zero draws nothing, while the pass still renders, so it still clears its render target.

To draw several quads with different parameters, for example one for each light, override `execute`, and for each quad set its parameters, or its viewport, and call `super.execute()`, which draws it with the render states of the pass:

```javascript
execute() {
    for (const light of this.lights) {
        this.colorId.setValue(light.color);
        this.viewport = light.screenRect;
        super.execute();
    }
}
```

## Drawing a quad immediately

For a single draw, for example to generate a texture once, [`drawQuadWithShader`](https://api.playcanvas.com/engine/functions/drawQuadWithShader.html) draws a quad with a shader into a render target right away, without setting up a pass:

```javascript
device.scope.resolve('scale').setValue(4);
drawQuadWithShader(device, renderTarget, shader);
```

Each call creates a pass, renders it and destroys it, so it allocates on every call. It draws with the blend state currently set on the graphics device, and loads the content of the render target without clearing it. To draw a quad every frame, or with its own render states, use a `RenderPassShaderQuad`, created once and reused.

## Examples

Two `RenderPassShaderQuad` passes paint light trails into a texture: a fade pass darkens it with a reverse subtract blend state, and a brush pass draws a dot along the path of each brush, setting the viewport of each dot, all in one pass.

[Live example: Light Trails](https://playcanvas.com/examples/#/render-targets/render-pass-shader-quad) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/render-targets/render-pass-shader-quad/example.mjs))

A `RenderPassShaderQuad` in a post-processing effect, drawing ink outlines into the scene where its depth or brightness changes abruptly.

[Live example: Ink Outline](https://playcanvas.com/examples/#/camera-frame/ink-outline) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/camera-frame/ink-outline/example.mjs))
