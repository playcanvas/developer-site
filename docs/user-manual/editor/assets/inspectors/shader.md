---
title: Shader
---

A shader asset contains GLSL code. You can create a new Shader asset by clicking New Shader in the Asset Panel in the Editor or by uploading a file with an extension of ```.vert```, ```.frag``` or ```.glsl```.

To edit a Shader asset, right click on it in the Editor and select Edit. Here's an example on using Shader assets to create a custom material.

```javascript
const vertexShader = this.app.assets.find('my_vertex_shader');
const fragmentShader = this.app.assets.find('my_fragment_shader');
const shaderDefinition = {
    attributes: {
        aPosition: pc.SEMANTIC_POSITION,
        aUv0: pc.SEMANTIC_TEXCOORD0
    },
    vshader: vertexShader.resource,
    fshader: fragmentShader.resource
};

const shader = new pc.Shader(this.app.graphicsDevice, shaderDefinition);
const material = new pc.Material();
material.setShader(shader);
```
