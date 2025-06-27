---
title: Custom Shaders
tags: [shaders, materials]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406044/4J2JX2-image-75.jpg
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/zwvhLoS9/" title="Custom Shaders" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

:::info

This tutorial uses a custom shader on a material to create a dissolve effect in GLSL. The complete project can be found [here][project].

:::

When you import your 3D models into PlayCanvas by default they will use our [Physical Material][3]. This is a versatile material type that can cover a lot of your rendering needs.

However, you will often want to perform special effects or special cases for your materials. To do this you will need to write a custom shader.

## Shaders and Shader Definition

WebGL uses the GLSL language to write shaders that can be run across all browsers. In PlayCanvas you create this code in shader assets and then assign the code to a [Shader Definition][1] before using this to create a new `pc.Shader`.

### Vertex Shader

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

### Fragment Shader

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
    if (height < (uTime+0.04)) {
      color = vec4(0, 0.2, 1, 1.0);
    }
    gl_FragColor = color;
}
```

The two shaders above define the functionality of the new Material. In the Vertex Shader we are transforming the vertex positions of the mesh into screen space. In the Fragment Shader we are setting the color of the pixel. This pixel color is chosen based on the two textures that are provided into this asset. If the value uTime is less than the color in the heightmap then we don't render any pixel (the model is invisible). If the value of uTime is greater than the heightmap value then we get the color from the diffuse map texture that we provide

### Shader Definition

```javascript
var vertexShader = this.vs.resource;

// dynamically set the precision depending on device.
var fragmentShader = "precision " + gd.precision + " float;\n";
fragmentShader = fragmentShader + this.fs.resource;


// A shader definition used to create a new shader.
var shaderDefinition = {
    attributes: {
        aPosition: pc.SEMANTIC_POSITION,
        aUv0: pc.SEMANTIC_TEXCOORD0
    },
    vshader: vertexShader,
    fshader: fragmentShader
};
```

The shader definition contains three sections. In `attributes` you must specify the variable names and the value of attributes that will be defined for each Vertex that your vertex shader is executed for. These values are later declared in your vertex shader as an `attribute`.

The Vertex Shader code is supplied as a string in the `vshader` property and the Fragment Shader is supplied as a string in the 'fshader' property.

Above is the shader definition used to make the dissolving effect. Notice that we're getting the shader code from two assets. These assets are supplied using [script attributes][2] which make it easy to access assets from a script.

Aside from attributes there are two other special types of variable in the GLSL shaders: `varying` and `uniform`

## GLSL `varying` variables

A variable that is declared **varying** will be set in the vertex shader, but used in the fragment shader. It's a way of passing data on from the first program to the second.

## GLSL `uniform` variables

A variable declared **`uniform`** will be declared in both vertex and fragment shaders. The value of this variable must be passed into the shader from the main application. For example, the position of a light in your scene.

## Creating Materials

```javascript
// Create the shader from the definition
this.shader = new pc.Shader(gd, shaderDefinition);

// Create a new material and set the shader
this.material = new pc.Material();
this.material.shader = this.shader;

// Set the initial time parameter
this.material.setParameter('uTime', 0);

// Set the diffuse texture
this.material.setParameter('uDiffuseMap', diffuseTexture);

// Use the "clouds" texture as the height map property
this.material.setParameter('uHeightMap', heightTexture);

// Replace the material on the model with our new material
model.meshInstances[0].material = this.material;
```

Once we've got the shader definition we create a new Shader and a new Material and pass the shader onto the material using `setShader()`. The uniforms are then initialized using the `setParameter()` method. Finally we replace the original material on the model with the new material we've created. Notice, that each mesh in a model has it's own material. So if your model has more than one mesh, you may need to set the material onto more than one mesh instance.

*You can (and should) use the same material on more than one mesh.*

## Using a texture in a new Material

```javascript
var diffuseTexture = this.app.assets.get(this.diffuseMap).resource;
//...
this.material.setParameter('uDiffuseMap', diffuseTexture);
```

The effect demonstrated in this tutorial is achieved using a height map texture. We access the texture from the asset registry using the code above. At the
top of our script we have declared a script attribute called 'maps' which allows us to set a texture from the PlayCanvas Editor:

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem value="classic" label="Classic">

```javascript
CustomShader.attributes.add('vs', {
    type: 'asset',
    assetType: 'shader',
    title: 'Vertex Shader'
});

CustomShader.attributes.add('fs', {
    type: 'asset',
    assetType: 'shader',
    title: 'Fragment Shader'
});

CustomShader.attributes.add('diffuseMap', {
    type: 'asset',
    assetType: 'texture',
    title: 'Diffuse Map'
});

CustomShader.attributes.add('heightMap', {
    type: 'asset',
    assetType: 'texture',
    title: 'Height Map'
});
```

</TabItem>
<TabItem  value="esm" label="ESM">

```javascript
/**
 * @attribute
 * @title Vertex Shader
 * @type {Asset}
 * @resource shader
 */
vs;

/**
 * @attribute
 * @title Fragment Shader
 * @type {Asset}
 * @resource shader
 */
fs;

/**
 * @attribute
 * @title Diffuse Map
 * @type {Asset}
 * @resource texture
 */
diffuseMap;

/**
 * @attribute
 * @title Height Map
 * @type {Asset}
 * @resource texture
 */
heightMap;
```

</TabItem>
</Tabs>

When our height map texture is loaded we can set the uniform `uHeightMap` to be the `pc.Texture` object.

## Updating uniforms

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script } from 'playcanvas';

export class CustomShader extends Script {
    static scriptName = "customShader";

    update(dt) {
        this.time += dt;

        // Bounce value of t 0->1->0
        var t = (this.time % 2);
        if (t > 1) {
            t = 1 - (t - 1);
        }

        // Update the time value in the material
        this.material.setParameter('uTime', t);
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
// update code called every frame
CustomShader.prototype.update = function(dt) {
    this.time += dt;

    // Bounce value of t 0->1->0
    var t = (this.time % 2);
    if (t > 1) {
        t = 1 - (t - 1);
    }

    // Update the time value in the material
    this.material.setParameter('uTime', t);
};
```

</TabItem>
</Tabs>

To achieve the disappearing effect we use the height map value as a threshold, and we increase the threshold over time. In the update method above we bounce the value of `t` between 0 and 1 and we set this as the `uTime` uniform.

In our shader if the value of the heightmap on a pixel is less than the value time value we don't draw the pixel. In addition at values that are close to the threshold, we draw the pixel in blue to display a nice 'edge' to the effect.

## Complete listing

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script, SEMANTIC_TEXCOORD0, SEMANTIC_POSITION, Shader, Material } from 'playcanvas';

export class CustomShader extends Script {
    static scriptName = "customShader";

    /**
     * @attribute
     * @title Vertex Shader
     * @type {Asset}
     * @resource shader
     */
    vs = null;

    /**
     * @attribute
     * @title Fragment Shader
     * @type {Asset}
     * @resource shader
     */
    fs = null;

    /**
     * @attribute
     * @title Diffuse Map
     * @type {Asset}
     * @resource texture
     */
    diffuseMap = null;

    /**
     * @attribute
     * @title Height Map
     * @type {Asset}
     * @resource texture
     */
    heightMap = null;

    // initialize code called once per entity
    initialize() {
        this.time = 0;

        const app = this.app;
        const gd = app.graphicsDevice;

        const diffuseTexture = this.diffuseMap.resource;
        const heightTexture = this.heightMap.resource;

        const vertexShader = this.vs.resource;
        let fragmentShader = "precision " + gd.precision + " float;\n";
        fragmentShader = fragmentShader + this.fs.resource;

        // A shader definition used to create a new shader.
        const shaderDefinition = {
            attributes: {
                aPosition: SEMANTIC_POSITION,
                aUv0: SEMANTIC_TEXCOORD0
            },
            vshader: vertexShader,
            fshader: fragmentShader
        };

        // Create the shader from the definition
        this.shader = new Shader(gd, shaderDefinition);

        // Create a new material and set the shader
        this.material = new Material();
        this.material.shader = this.shader;

        // Set the initial time parameter
        this.material.setParameter('uTime', 0);

        // Set the diffuse texture
        this.material.setParameter('uDiffuseMap', diffuseTexture);

        // Use the "clouds" texture as the height map property
        this.material.setParameter('uHeightMap', heightTexture);

        // Replace the material on the model with our new material
        var renders = this.entity.findComponents('render');

        for (var i = 0; i < renders.length; ++i) {
            var meshInstances = renders[i].meshInstances;
            for (var j = 0; j < meshInstances.length; j++) {
                meshInstances[j].material = this.material;
            }
        }
    }

    // update code called every frame
    update(dt) {
        this.time += dt;

        // Bounce value of t 0->1->0
        var t = (this.time % 2);
        if (t > 1) {
            t = 1 - (t - 1);
        }

        // Update the time value in the material
        this.material.setParameter('uTime', t);
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var CustomShader = pc.createScript('customShader');

CustomShader.attributes.add('vs', {
    type: 'asset',
    assetType: 'shader',
    title: 'Vertex Shader'
});

CustomShader.attributes.add('fs', {
    type: 'asset',
    assetType: 'shader',
    title: 'Fragment Shader'
});

CustomShader.attributes.add('diffuseMap', {
    type: 'asset',
    assetType: 'texture',
    title: 'Diffuse Map'
});

CustomShader.attributes.add('heightMap', {
    type: 'asset',
    assetType: 'texture',
    title: 'Height Map'
});

// initialize code called once per entity
CustomShader.prototype.initialize = function() {
    this.time = 0;

    var app = this.app;
    var gd = app.graphicsDevice;

    var diffuseTexture = this.diffuseMap.resource;
    var heightTexture = this.heightMap.resource;

    var vertexShader = this.vs.resource;
    var fragmentShader = "precision " + gd.precision + " float;\n";
    fragmentShader = fragmentShader + this.fs.resource;

    // A shader definition used to create a new shader.
    var shaderDefinition = {
        attributes: {
            aPosition: pc.SEMANTIC_POSITION,
            aUv0: pc.SEMANTIC_TEXCOORD0
        },
        vshader: vertexShader,
        fshader: fragmentShader
    };

    // Create the shader from the definition
    this.shader = new pc.Shader(gd, shaderDefinition);

    // Create a new material and set the shader
    this.material = new pc.Material();
    this.material.shader = this.shader;

    // Set the initial time parameter
    this.material.setParameter('uTime', 0);

    // Set the diffuse texture
    this.material.setParameter('uDiffuseMap', diffuseTexture);

    // Use the "clouds" texture as the height map property
    this.material.setParameter('uHeightMap', heightTexture);

    // Replace the material on the model with our new material
    var renders = this.entity.findComponents('render');

    for (var i = 0; i < renders.length; ++i) {
        var meshInstances = renders[i].meshInstances;
        for (var j = 0; j < meshInstances.length; j++) {
            meshInstances[j].material = this.material;
        }
    }
};

// update code called every frame
CustomShader.prototype.update = function(dt) {
    this.time += dt;

    // Bounce value of t 0->1->0
    var t = (this.time % 2);
    if (t > 1) {
        t = 1 - (t - 1);
    }

    // Update the time value in the material
    this.material.setParameter('uTime', t);
};
```

</TabItem>
</Tabs>

Here is the complete script. Remember you'll need to create vertex shader and fragment shader assets in order for it to work.

[1]: https://api.playcanvas.com/engine/classes/Shader.html
[2]: /user-manual/scripting/fundamentals/script-attributes/
[3]: /user-manual/graphics/physical-rendering/physical-materials/
[project]: https://playcanvas.com/project/406044/overview/tutorial-custom-shaders
