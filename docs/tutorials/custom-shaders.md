---
title: Custom Shaders
tags: [shaders, materials]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406044/4J2JX2-image-75.jpg
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/zwvhLoS9/" title="Custom Shaders" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

:::info

This tutorial uses the [ShaderMaterial](https://api.playcanvas.com/engine/classes/ShaderMaterial.html) API to create a dissolve effect with burning edges that works with both WebGL and WebGPU. The complete project can be found [here](https://playcanvas.com/project/406044/overview/tutorial-custom-shaders).

:::

When you import your 3D models into PlayCanvas by default they will use our [Physical Material](/user-manual/graphics/physical-rendering/physical-materials/). This is a versatile material type that can cover a lot of your rendering needs.

However, you will often want to perform special effects or special cases for your materials. To do this you will need to write a custom shader.

## ShaderMaterial API

PlayCanvas provides the [ShaderMaterial](https://api.playcanvas.com/engine/classes/ShaderMaterial.html) API which simplifies the creation of custom shaders and supports both WebGL (GLSL) and WebGPU (WGSL). This API automatically handles the differences between graphics APIs and provides a cleaner interface for shader development.

## Cross-Platform Shader Support

To ensure your custom shaders work across all devices and browsers, you should provide both [GLSL](/user-manual/graphics/shaders/glsl-specifics/) and [WGSL](/user-manual/graphics/shaders/wgsl-specifics/) versions of your shaders:

- **GLSL** (OpenGL Shading Language): Used by WebGL
- **WGSL** (WebGPU Shading Language): Used by WebGPU

## Vertex Shaders

### GLSL Vertex Shader

```glsl
attribute vec3 aPosition;
attribute vec2 aUv0;

uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;

varying vec2 vUv0;

void main(void)
{
    vUv0 = aUv0;
    gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
}
```

### WGSL Vertex Shader

```wgsl
attribute aPosition: vec3f;
attribute aUv0: vec2f;

uniform matrix_viewProjection: mat4x4f;
uniform matrix_model: mat4x4f;

varying vUv0: vec2f;

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;

    output.vUv0 = aUv0;
    output.position = uniform.matrix_viewProjection * uniform.matrix_model * vec4<f32>(aPosition, 1.0);

    return output;
}
```

## Fragment Shaders

### GLSL Fragment Shader

```glsl
varying vec2 vUv0;

uniform sampler2D uDiffuseMap;
uniform sampler2D uHeightMap;
uniform float uTime;

void main(void)
{
    float height = texture2D(uHeightMap, vUv0).r;
    vec4 color = texture2D(uDiffuseMap, vUv0);

    if (height < uTime) {
        discard;
    }

    // Burning band width
    float edgeWidth = 0.05;

    if (height < (uTime + edgeWidth)) {
        // 0 at inner edge → 1 at outer edge
        float t = (height - uTime) / edgeWidth;

        // Fire gradient: yellow to dark orange
        vec3 burnColor = mix(
            vec3(1.0, 0.7, 0.2),
            vec3(0.6, 0.1, 0.0),
            t
        );

        // Blend the burn color with the original texture
        color = vec4(mix(burnColor, color.rgb, t), 1.0);
    }

    gl_FragColor = color;
}
```

### WGSL Fragment Shader

```wgsl
varying vUv0: vec2f;

uniform uTime: f32;

var uDiffuseMap: texture_2d<f32>;
var uDiffuseMapSampler: sampler;
var uHeightMap: texture_2d<f32>;
var uHeightMapSampler: sampler;

@fragment
fn fragmentMain(input: FragmentInput) -> FragmentOutput {
    var output: FragmentOutput;

    let height = textureSample(uHeightMap, uHeightMapSampler, vUv0).r;
    var color = textureSample(uDiffuseMap, uDiffuseMapSampler, vUv0);

    if (height < uniform.uTime) {
        discard;
    }

    // Burning band width
    let edgeWidth = 0.05;

    if (height < (uniform.uTime + edgeWidth)) {
        // t goes from 0 (just inside edge) to 1 (outer edge)
        let t = (height - uniform.uTime) / edgeWidth;

        // Fire color: bright yellow fading to dark orange
        let burnColor = mix(
            vec3f(1.0, 0.7, 0.2),
            vec3f(0.6, 0.1, 0.0),
            t
        );

        // Blend burn color with original texture (more burn at the outer edge)
        color = vec4f(mix(burnColor, color.rgb, t), 1.0);
    }

    output.color = color;
    return output;
}
```

The shaders above create a dissolve effect with a fire-like burning edge. The vertex shaders transform mesh vertices into screen space, while the fragment shaders create the dissolve effect based on a height map texture. When the `uTime` value is greater than the height map value at a pixel, that pixel is discarded (making the model transparent there). Near the dissolve edge, we blend in a fire-colored gradient for a realistic burning effect.

## Creating the ShaderMaterial

```javascript
// Create a new ShaderMaterial with both GLSL and WGSL versions
this.material = new ShaderMaterial({
    uniqueName: 'Dissolve',
    vertexGLSL: this.vertexGLSL.resource,
    fragmentGLSL: this.fragmentGLSL.resource,
    vertexWGSL: this.vertexWGSL.resource,
    fragmentWGSL: this.fragmentWGSL.resource,
    attributes: {
        aPosition: SEMANTIC_POSITION,
        aUv0: SEMANTIC_TEXCOORD0
    }
});
```

The [ShaderMaterial constructor](https://api.playcanvas.com/engine/classes/ShaderMaterial.html#constructor) takes both GLSL and WGSL shader code. PlayCanvas will automatically choose the appropriate version based on the graphics API being used. The `attributes` object specifies the vertex attributes your shaders expect.

## Setting Shader Parameters

```javascript
// Set the initial time parameter
this.material.setParameter('uTime', 0);

// Set the diffuse texture
const diffuseTexture = this.diffuseMap.resource;
this.material.setParameter('uDiffuseMap', diffuseTexture);

// Set the height map texture
const heightTexture = this.heightMap.resource;
this.material.setParameter('uHeightMap', heightTexture);
```

Uniforms are set using the [`setParameter()`](https://api.playcanvas.com/engine/classes/Material.html#setparameter) method, which works the same way as with regular materials. The ShaderMaterial automatically handles the differences between GLSL and WGSL uniform syntax.

## Script Attributes for Shader Assets

```javascript
/**
 * GLSL vertex shader.
 * 
 * @attribute
 * @title GLSL Vertex Shader
 * @type {pc.Asset}
 */
vertexGLSL;

/**
 * GLSL fragment shader.
 * 
 * @attribute
 * @title GLSL Fragment Shader
 * @type {pc.Asset}
 */
fragmentGLSL;

/**
 * WGSL vertex shader.
 * 
 * @attribute
 * @title WGSL Vertex Shader
 * @type {pc.Asset}
 */
vertexWGSL;

/**
 * WGSL fragment shader.
 * 
 * @attribute
 * @title WGSL Fragment Shader
 * @type {pc.Asset}
 */
fragmentWGSL;

/**
 * Diffuse Map
 * 
 * @attribute
 * @title Diffuse Map
 * @type {pc.Asset}
 */
diffuseMap;

/**
 * Height Map
 * 
 * @attribute
 * @title Height Map
 * @type {pc.Asset}
 */
heightMap;
```

You'll need to create four shader assets (two GLSL and two WGSL) and assign them to these script attributes in the PlayCanvas Editor.

## Updating Uniforms

```javascript
update(dt) {
    this.time += dt;

    // Create a smooth oscillation using sine wave
    const t = (Math.sin(this.time) + 1) / 2;

    // Update the time value in the material
    this.material.setParameter('uTime', t);
}
```

To achieve the dissolving effect, we use the height map value as a threshold that changes over time. In this version, we use a sine wave to create a smooth oscillation between 0 and 1, providing a more natural dissolve animation.

## Complete Script

```javascript
import { Script, ShaderMaterial, SEMANTIC_POSITION, SEMANTIC_TEXCOORD0 } from 'playcanvas';

/**
 * Apply a dissolve shader material to an entity's render components.
 */
export class CustomShader extends Script {
    scriptName = 'dissolveShader';

    /**
     * GLSL vertex shader.
     * 
     * @attribute
     * @title GLSL Vertex Shader
     * @type {pc.Asset}
     */
    vertexGLSL;

    /**
     * GLSL fragment shader.
     * 
     * @attribute
     * @title GLSL Fragment Shader
     * @type {pc.Asset}
     */
    fragmentGLSL;

    /**
     * WGSL vertex shader.
     * 
     * @attribute
     * @title WGSL Vertex Shader
     * @type {pc.Asset}
     */
    vertexWGSL;

    /**
     * WGSL fragment shader.
     * 
     * @attribute
     * @title WGSL Fragment Shader
     * @type {pc.Asset}
     */
    fragmentWGSL;

    /**
     * Diffuse Map
     * 
     * @attribute
     * @title Diffuse Map
     * @type {pc.Asset}
     */
    diffuseMap;

    /**
     * Height Map
     * 
     * @attribute
     * @title Height Map
     * @type {pc.Asset}
     */
    heightMap;

    time = 0;

    // initialize code called once per entity
    initialize() {
        // Create a new material and set the shader
        this.material = new ShaderMaterial({
            uniqueName: 'Dissolve',
            vertexGLSL: this.vertexGLSL.resource,
            fragmentGLSL: this.fragmentGLSL.resource,
            vertexWGSL: this.vertexWGSL.resource,
            fragmentWGSL: this.fragmentWGSL.resource,
            attributes: {
                aPosition: SEMANTIC_POSITION,
                aUv0: SEMANTIC_TEXCOORD0
            }
        });

        // Set the initial time parameter
        this.material.setParameter('uTime', 0);

        // Set the diffuse texture
        const diffuseTexture = this.diffuseMap.resource;
        this.material.setParameter('uDiffuseMap', diffuseTexture);

        // Set the height map texture
        const heightTexture = this.heightMap.resource;
        this.material.setParameter('uHeightMap', heightTexture);

        // Replace the material on all render components
        const renders = this.entity.findComponents('render');
        for (let i = 0; i < renders.length; ++i) {
            const meshInstances = renders[i].meshInstances;
            for (let j = 0; j < meshInstances.length; j++) {
                meshInstances[j].material = this.material;
            }
        }
    }

    // update code called every frame
    update(dt) {
        this.time += dt;

        // Create a smooth oscillation using sine wave
        const t = (Math.sin(this.time) + 1) / 2;

        // Update the time value in the material
        this.material.setParameter('uTime', t);
    }
}
```

This script demonstrates how to create cross-platform custom shaders using the ShaderMaterial API. The dissolve effect uses a height map to determine which pixels to discard, creating a burning edge effect as the dissolution progresses.

## GLSL vs WGSL Differences

When writing shaders for both APIs, keep these key differences in mind:

- **Syntax**: WGSL uses more explicit typing (`vec3f`, `f32`) while GLSL infers types
- **Attributes/Varyings**: WGSL uses structured input/output while GLSL uses global variables
- **Textures**: WGSL separates textures and samplers, GLSL combines them
- **Entry points**: WGSL uses `@vertex` and `@fragment` decorators, GLSL uses `main()`

The ShaderMaterial API handles these differences automatically, allowing you to focus on the shader logic rather than API-specific details.
