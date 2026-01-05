---
title: Custom Post Effects
tags: [posteffects]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406045/ABC61F-image-75.jpg
---

In this tutorial, you'll learn how to create a custom watercolor post effect in PlayCanvas that applies a softening filter and a paper grain texture to your scene. By the end of this guide, you'll have a visually appealing watercolor effect that you can apply to any 3D scene.

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/3je0YP0q/" title="Custom Post Effects" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

## Step 1: Setting Up Your Shaders

First, we need to create the shaders that will define our watercolor effect. You'll create two shader assets: a vertex shader and a fragment shader.

### Vertex Shader (watercolor.vert)

The vertex shader will pass the UV coordinates from the vertices to the fragment shader. Create a new shader asset in PlayCanvas and name it `watercolor.vert`. Then, copy and paste the following code:

```glsl title="watercolor.vert"
attribute vec2 aPosition;

varying vec2 vUv0;

void main(void)
{
    gl_Position = vec4(aPosition, 0.0, 1.0);
    vUv0 = (aPosition.xy + 1.0) * 0.5;
}
```

### Fragment Shader (watercolor.frag)

The fragment shader will apply the watercolor effect using the color buffer texture and UV coordinates. Create another shader asset named `watercolor.frag` and insert the following code:

```glsl title="watercolor.frag"
precision mediump float;

// The texture containing our rendered scene
uniform sampler2D uColorBuffer;

// The UV coordinates passed from the vertex shader
varying vec2 vUv0;

// Function to create a simple paper grain texture
float paperTexture(vec2 uv) {
    // Create a pseudo-random pattern based on UV coordinates
    float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
    // Modulate the grain intensity
    grain = smoothstep(0.3, 0.7, grain);
    return grain;
}

void main(void) {
    // Sample the color from the scene texture at this fragment's UV coordinates
    vec4 sceneColor = texture2D(uColorBuffer, vUv0);

    // Apply a softening filter to mimic watercolor fluidity
    // Blend with neighboring pixels (basic blur)
    vec4 blurColor = vec4(0.0);
    float offset = 0.003; // Offset for neighboring pixels; adjust for blur amount
    for (int x = -1; x <= 1; x++) {
        for (int y = -1; y <= 1; y++) {
            blurColor += texture2D(uColorBuffer, vUv0 + vec2(x, y) * offset);
        }
    }
    blurColor /= 9.0;

    // Mix original color with blurred version
    vec4 mixedColor = mix(sceneColor, blurColor, 0.5);

    // Overlay the paper texture
    float grain = paperTexture(vUv0 * 10.0); // Tiling of the grain texture
    mixedColor.rgb += mixedColor.rgb * grain * 0.1; // Modulate to adjust intensity

    // Output the final color
    gl_FragColor = mixedColor;
}
```

## Step 2: Creating the Watercolor Effect Script

Now, you'll create a script to apply the shaders to your scene. Create a new script in PlayCanvas and name it `watercolor.js`. Paste in the code provided:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script, PostEffect, Shader, SEMANTIC_POSITION, drawFullscreenQuad } from 'playcanvas';

//--------------- POST EFFECT DEFINITION------------------------//
class WatercolorEffect extends PostEffect {
    constructor(graphicsDevice, vs, fs) {
        super(graphicsDevice);

        this.shader = new Shader(graphicsDevice, {
            attributes: {
                aPosition: SEMANTIC_POSITION
            },
            vshader: vs,
            fshader: fs
        });
    }

    // Every post effect must implement the render method which 
    // sets any parameters that the shader might require and 
    // also renders the effect on the screen
    render(inputTarget, outputTarget, rect) {
        // Set the input render target to the shader. This is the image rendered from our camera
        this.device.scope.resolve("uColorBuffer").setValue(inputTarget.colorBuffer);
        
        // Draw a full screen quad on the output target. In this case the output target is the screen.
        // Drawing a full screen quad will run the shader that we defined above
        drawFullscreenQuad(this.device, outputTarget, this.vertexBuffer, this.shader, rect);
    }
}


//--------------- SCRIPT DEFINITION------------------------//
export class WaterColor extends Script {
    static scriptName = "waterColor";

    /**
     * @attribute
     * @title Vertex Shader
     * @type {Asset}
     * @resource 'shader'
     */
    vs;

    /**
     * @attribute
     * @title Fragment Shader
     * @type {Asset}
     * @resource 'shader'
     */ 
    fs;


    // initialize code called once per entity
    initialize() {
        const effect = new WatercolorEffect(this.app.graphicsDevice, this.vs.resource, this.fs.resource);
        
        // add the effect to the camera's postEffects queue
        const queue = this.entity.camera.postEffects;
        queue.addEffect(effect);
        
        // when the script is enabled add our effect to the camera's postEffects queue
        this.on('enable', function () {
            queue.addEffect(effect, false); 
        });
        
        // when the script is disabled remove our effect from the camera's postEffects queue
        this.on('disable', function () {
            queue.removeEffect(effect); 
        });
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
//--------------- POST EFFECT DEFINITION------------------------//
class WatercolorEffect extends pc.PostEffect {
    constructor(graphicsDevice, vs, fs) {
        super(graphicsDevice);

        this.shader = new pc.Shader(graphicsDevice, {
            attributes: {
                aPosition: pc.SEMANTIC_POSITION
            },
            vshader: vs,
            fshader: fs
        });
    }

    // Every post effect must implement the render method which 
    // sets any parameters that the shader might require and 
    // also renders the effect on the screen
    render(inputTarget, outputTarget, rect) {
        // Set the input render target to the shader. This is the image rendered from our camera
        this.device.scope.resolve("uColorBuffer").setValue(inputTarget.colorBuffer);
        
        // Draw a full screen quad on the output target. In this case the output target is the screen.
        // Drawing a full screen quad will run the shader that we defined above
        pc.drawFullscreenQuad(this.device, outputTarget, this.vertexBuffer, this.shader, rect);
    }
}


//--------------- SCRIPT DEFINITION------------------------//
var Watercolor = pc.createScript('watercolor');

Watercolor.attributes.add('vs', {
    type: 'asset',
    assetType: 'shader',
    title: 'Vertex Shader'
});

Watercolor.attributes.add('fs', {
    type: 'asset',
    assetType: 'shader',
    title: 'Fragment Shader'
});

// initialize code called once per entity
Watercolor.prototype.initialize = function() {
    const effect = new WatercolorEffect(this.app.graphicsDevice, this.vs.resource, this.fs.resource);
    
    // add the effect to the camera's postEffects queue
    const queue = this.entity.camera.postEffects;
    queue.addEffect(effect);
    
    // when the script is enabled add our effect to the camera's postEffects queue
    this.on('enable', function () {
        queue.addEffect(effect, false); 
    });
    
    // when the script is disabled remove our effect from the camera's postEffects queue
    this.on('disable', function () {
        queue.removeEffect(effect); 
    });
};
```

</TabItem>
</Tabs>

:::note

Remember to parse the script so that the Editor knows about the script's attributes!

:::

## Step 3: Applying the Effect to a Camera

To see your watercolor effect in action, you need to apply it to a camera in your scene:

* Create a new entity with a [camera component](/user-manual/editor/scenes/components/camera) if you haven't already.
* Add a [script component](/user-manual/editor/scenes/components/script) to the camera entity and assign the watercolor script to it.
* Assign the `watercolor.vert` and `watercolor.frag` shader assets to the corresponding attributes in the watercolor script component.

Now, when you play your scene, you should see the watercolor effect applied, giving your scene a soft, artistic look.

See the Custom Post Effects project [here](https://playcanvas.com/project/406045).
