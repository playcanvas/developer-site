---
title: Shader Precompilation
description: Compile the shaders and render pipelines of a scene in parallel before it renders, with progress events for a loading bar, to avoid long first frames and stalls.
---

Each material and mesh combination needs its own shader, and on WebGPU, its own render pipeline. By default, they are compiled when they are first drawn, one after another, while the frame waits. This makes the first frame of an application slow, and objects with new materials can cause a visible stall when they come into view. On WebGPU, render pipelines created at draw time are compiled one at a time, which makes this especially slow.

`app.precompile()` prepares the shaders and render pipelines that the next frame needs, without rendering it. They compile in parallel on background threads of the browser, on both WebGL2 and WebGPU. While they compile, the application keeps updating but renders nothing, and the canvas keeps its previous content. Once everything has compiled, rendering continues.

## Usage

Call `precompile()` after adding content that needs new shaders, for example before starting the application, or after loading a level:

```javascript
app.precompile().then((stats) => {
    console.log(`Compiled ${stats.shaders} shaders in ${stats.time.toFixed(0)} ms`);
});
app.start();
```

The precompile runs during the next frame of the application, so content added before that frame is included. The returned promise resolves before the first frame that renders with everything compiled, with these statistics:

| Property | Description |
| -------- | ----------- |
| `shaders` | The number of shaders created. |
| `pipelines` | The number of render pipelines requested. WebGPU only, 0 on WebGL2. |
| `frameTime` | The duration of the frame that started the precompile, in milliseconds. |
| `time` | The duration of the precompile until everything compiled, in milliseconds. |

In the Editor, a script can call it from its `initialize` method, which runs before the first frame:

```javascript
import { Script } from 'playcanvas';

export class Precompile extends Script {
    static scriptName = 'precompile';

    initialize() {
        this.app.precompile();
    }
}
```

## Which Mesh Instances Are Included

By default, all mesh instances in the layers rendered by the cameras are included, including those outside the view of the cameras. This way, objects that come into view later do not cause a stall.

To compile fewer shaders up front, enable frustum culling to include only the mesh instances that the cameras can see. The others compile when they first come into view, as they do without precompiling:

```javascript
app.precompile({ frustumCulling: true });
```

The forward rendering of the cameras and the shadow maps of the lights are included. Other rendering, such as post-processing effects of [CameraFrame](/user-manual/graphics/posteffects/cameraframe/), is compiled when it first renders.

## Showing Progress

The application fires events that a loading bar can use:

| Event | Description |
| ----- | ----------- |
| `precompile:start` | The compilation has started. |
| `precompile:progress` | The fraction of shaders and render pipelines compiled so far, from 0 to 1. Fired in the frames where it changes. |
| `precompile:end` | Everything has compiled. Fired with the statistics, just before the frame that renders with them. |

The application renders nothing until compilation finishes, so the progress display has to be outside the canvas, for example an HTML element:

```javascript
const bar = document.createElement('div');
bar.style.cssText = 'position:absolute; left:0; bottom:0; height:4px; width:0; background:#f60;';
document.body.appendChild(bar);

app.on('precompile:progress', (progress) => {
    bar.style.width = `${progress * 100}%`;
});
app.once('precompile:end', () => {
    bar.remove();
});

app.precompile();
```

On WebGL2, progress reporting requires the `KHR_parallel_shader_compile` extension. Without it, progress reports 1 right away.

In the Editor, the [loading screen](/user-manual/editor/interface/launch-page/loading-screen/) can stay visible until the precompile finishes.

## Platform Details

- **WebGPU**: Missing render pipelines are created asynchronously. The number of pipelines that compile at the same time is limited based on the number of logical processors, because too many at once can stop the browser from updating the page.
- **WebGL2**: Shaders compile and link when they are created. On some platforms, such as Chrome on macOS, the browser finishes compiling a shader only when it is first drawn. Once the shaders have linked, the precompile renders the frame once more into a single pixel to finish compiling them.

Precompiling has no cost for frames that render normally.

## Results

Time until the first frame shows in the [Car Showcase](https://playcanvas.github.io/#/demos/car-showcase) example, with no cached shaders, in Chrome on an Apple M4 Max:

| | Without precompile | With precompile |
| - | ------------------ | --------------- |
| WebGPU | 9.4 s | 2.1 s |
| WebGL2 | 3.0 s | 2.6 s |

The [Shader Precompile](https://playcanvas.github.io/#/graphics/shader-precompile) example shows many material variants, with options to toggle precompiling and frustum culling, a progress bar, and the total time spent stalled on shader compilation.

See the [API reference](https://api.playcanvas.com/engine/classes/AppBase.html#precompile) for more details.
