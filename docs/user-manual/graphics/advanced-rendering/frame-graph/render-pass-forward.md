---
title: Rendering the Scene
description: "RenderPassForward renders layers of the scene with a camera: creating it, adding layers, what it does each frame, and replacing the camera's rendering with your own passes."
---

A [`RenderPassForward`](https://api.playcanvas.com/engine/classes/RenderPassForward.html) is a [`RenderPass`](render-pass.md) which renders layers of the scene with a single camera. It is the pass the engine renders the scene with. Use it in the [`framePasses`](https://api.playcanvas.com/engine/classes/CameraComponent.html#framepasses) of a camera to render the scene into a render target of your own, and to process it with your own passes before it is displayed.

## Creating the pass

Create the pass with the graphics device, the scene, and the camera component rendering the layers. Initialize it with the render target to render into, and then add the layers it renders, in order:

```javascript
const worldLayer = app.scene.layers.getLayerByName('World');
const uiLayer = app.scene.layers.getLayerById(LAYERID_UI);

const scenePass = new RenderPassForward(app.graphicsDevice, app.scene, cameraEntity.camera);
scenePass.name = 'ScenePass';
scenePass.init(renderTarget);

scenePass.addLayer(worldLayer, false);
scenePass.addLayer(uiLayer, true);
```

Each layer has an opaque and a transparent sub-layer. The second argument of [`addLayer`](https://api.playcanvas.com/engine/classes/RenderPassForward.html#addlayer) selects which of them renders, so add a layer twice to render both. The camera needs to render the layers the pass renders, see [`CameraComponent#layers`](https://api.playcanvas.com/engine/classes/CameraComponent.html#layers).

## What the pass does each frame

The pass renders its layers the way a camera renders them:

- It clears the render target as the clear flags of the camera and of the layers request. Pass `false` as the third argument of `addLayer` to not clear for that layer.
- It culls the mesh instances of its layers for the camera, and renders the directional shadows they need.
- It renders the [`beforePasses`](https://api.playcanvas.com/engine/classes/CameraComponent.html#beforepasses) of the camera, when it is the first pass rendering the camera in the frame.
- It fires the `prerender` event of the scene from the first pass rendering the camera in the frame, `postrender` from the last one, and `prerender:layer` and `postrender:layer` around each layer it renders.

## Gamma correction and tone mapping

By default, the pass renders with the gamma correction and the tone mapping of the camera. A pass can override them with [`gammaCorrection`](https://api.playcanvas.com/engine/classes/RenderPassForward.html#gammacorrection) and [`toneMapping`](https://api.playcanvas.com/engine/classes/RenderPassForward.html#tonemapping). For example, an HDR pipeline renders the scene linearly into a floating point render target, and tone maps it in a later pass, while a pass rendering the UI to the screen keeps the camera's settings:

```javascript
scenePass.gammaCorrection = GAMMA_NONE;
scenePass.toneMapping = TONEMAP_LINEAR;
```

## Replacing the camera's rendering

To render a camera with passes of your own, add a `RenderPassForward` to its [`framePasses`](camera-passes.md#replacing-the-cameras-rendering), together with the passes processing what it renders, for example rendering the scene into a texture, and then drawing the texture to the screen with a [shader quad pass](render-pass-shader-quad.md). A camera can also render its layers in several forward passes, for example its opaque layers, then a pass of your own reading what they rendered, and then its transparent layers. See [Camera Passes](camera-passes.md).

## Limitations

A `RenderPassForward` cannot be nested under another one: in its before or after passes, or in the `beforePasses` of its camera, which it renders before itself. To render the layers with another camera first, render the passes one after the other, for example as the before passes of a plain `FramePass` in the `framePasses`, or render them with a camera of a lower priority.

## Example

A forward pass renders the world and the UI layers into a texture, which a shader quad pass draws to the screen, tinted.

<EngineExample id="render-targets/render-pass-camera" title="Render Pass Camera" />
