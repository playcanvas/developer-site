---
title: Compute Passes
description: "ComputePass dispatches compute shaders at a position in the frame: adding it to a camera, sizing the dispatch from the scene maps, reading results back, and XR views."
---

A [`ComputePass`](https://api.playcanvas.com/engine/classes/ComputePass.html) is a [frame pass](frame-passes.md) which dispatches a list of [compute](/user-manual/graphics/shaders/compute-shaders/) instances, in order, in a single physical compute pass. It places compute work at a position in the frame, for example after a camera renders, to process its scene depth and color maps in the same frame.

To dispatch compute instances right away instead, when called, use [`GraphicsDevice#computeDispatch`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#computedispatch).

:::warning

Compute shaders are only supported on **WebGPU**, see [`GraphicsDevice#supportsCompute`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#supportscompute). On other devices, the pass executes without dispatching anything.

:::

## Creating the pass

Create the pass with the compute instances it dispatches. Its [`computes`](https://api.playcanvas.com/engine/classes/ComputePass.html#computes) array holds them, and you can add instances to it, or remove them, later. Set its name, which labels the dispatch in GPU profiling:

```javascript
const compute = new Compute(app.graphicsDevice, shader, 'Histogram');
compute.setParameter('bins', histogramBuffer);

const pass = new ComputePass(app.graphicsDevice, [compute]);
pass.name = 'HistogramPass';
```

## Adding the pass to a frame

Add the pass to the [`beforePasses`](https://api.playcanvas.com/engine/classes/CameraComponent.html#beforepasses) or the [`afterPasses`](https://api.playcanvas.com/engine/classes/CameraComponent.html#afterpasses) of a camera, to dispatch it before or after the camera renders, or to the before or after passes of another pass. A camera rendering with its own [`framePasses`](camera-passes.md#replacing-the-cameras-rendering) can also include the pass among them, to dispatch it at its position in the list, for example between a pass rendering the scene into a texture and a pass using what the compute shader wrote. A pass in the after passes of a camera reads what the camera rendered in the same frame:

```javascript
cameraEntity.camera.afterPasses.push(pass);
```

The pass executes at most once in a frame.

## Reading what the camera rendered

A compute pass in the after passes of a camera can read the depth and color maps the camera rendered in the same frame. Request the maps on the camera, with [`requestSceneDepthMap`](https://api.playcanvas.com/engine/classes/CameraComponent.html#requestscenedepthmap) and [`requestSceneColorMap`](https://api.playcanvas.com/engine/classes/CameraComponent.html#requestscenecolormap), and attach them to the compute instance, with [`setSceneDepthMap`](https://api.playcanvas.com/engine/classes/Compute.html#setscenedepthmap) and [`setSceneColorMap`](https://api.playcanvas.com/engine/classes/Compute.html#setscenecolormap):

```javascript
cameraEntity.camera.requestSceneColorMap(true);
compute.setSceneColorMap(cameraEntity.camera.sceneColorMapHandle);
```

See [Scene Depth and Color Maps](/user-manual/graphics/shaders/compute-shaders/#scene-depth-and-color-maps) for requesting them on a camera rendering with a `CameraFrame`, and for reading them in the compute shader.

## The dispatch

Each compute instance is dispatched with the dispatch size and the parameters set on it. Set them before the frame renders, or in [`onBefore`](https://api.playcanvas.com/engine/classes/FramePass.html#onbefore), right before the dispatch. Use `onBefore` also to prepare the buffers the shaders write, for example to clear them.

A shader processing each texel of the scene color map of a camera, attached [as above](#reading-what-the-camera-rendered), is dispatched over the size of the color map. Its handle has the size of the map the camera rendered most recently, which differs from the size of the canvas when the camera renders at a render scale, or into a render target of its own. The depth map handle has the same [`width`](https://api.playcanvas.com/engine/classes/SceneDepthMapHandle.html#width) and [`height`](https://api.playcanvas.com/engine/classes/SceneDepthMapHandle.html#height):

```javascript
pass.onBefore = () => {
    // a thread for each texel of the color map the camera just rendered
    const { width, height } = cameraEntity.camera.sceneColorMapHandle;
    compute.setupDispatchThreads(width, height);
    histogramBuffer.clear();
};
```

## Reading the results back

Read the results in [`onAfter`](https://api.playcanvas.com/engine/classes/FramePass.html#onafter), as a read requested there is recorded right after the dispatch. The data arrives a few frames later:

```javascript
pass.onAfter = () => {
    histogramBuffer.read().then((data) => {
        // the histogram, a few frames after it was computed
    });
};
```

## XR views

When the frame renders multiple XR views, [`xrViewIndex`](https://api.playcanvas.com/engine/classes/ComputePass.html#xrviewindex) selects the view the pass executes in, at its position in that view. Use `-1` to execute it once, before all the views. As a compute instance is dispatched at most once in a frame, dispatching for several views needs a `ComputePass` for each, with separate compute instances. A pass in the after passes of a camera executes once, after all the views.

## Owning the pass

The pass does not destroy its compute instances, and the camera does not destroy the pass. When no longer needed, remove the pass, and destroy it and the compute instances:

```javascript
const passes = cameraEntity.camera.afterPasses;
passes.splice(passes.indexOf(pass), 1);
pass.destroy();
compute.destroy();
```

## Examples

A compute pass after the camera builds a histogram of the colors it rendered, which is read back and drawn on the screen.

<EngineExample id="compute/histogram" title="Histogram" />

A compute pass after the camera reads its scene depth and color maps, to draw a scanner pulse sweeping through the scene.

<EngineExample id="compute/scene-maps" title="Scene Maps" />
