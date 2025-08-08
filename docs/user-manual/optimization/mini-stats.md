---
title: MiniStats
---

MiniStats is a lightweight graphical display of an application's key performance statistics. It shows draw call count, frame time, CPU load and (where supported) GPU load.

Editor users can enable the MiniStats panel via the Launch button menu:

<img loading="lazy" alt="Launch Menu" width="600" src="/img/user-manual/optimization/mini-stats/launch-menu-mini-stats.png" />

Clicking on the MiniStats will cycle through three supported sizes:

<img loading="lazy" alt="Mini Stats" width="411" src="/img/user-manual/optimization/mini-stats/mini-stats.gif" />

The information displayed is as follows:

* **DrawCalls** - The number of rendered objects dispatched every frame. Each draw call has a cost on the CPU and GPU, so minimizing this number is sensible.
* **Frame** - The total time in milliseconds for the browser to process each frame.
* **GPU** - Shows the time in milliseconds to render each frame by the GPU. This stat is supported by both WebGL 2 and WebGPU flavors of the Engine but there are some requirements:
  * WebGL 2: The underlying WebGL implementation must support the [`EXT_disjoint_timer_query_webgl2`](https://web3dsurvey.com/webgl2/extensions/EXT_disjoint_timer_query_webgl2) extension. You can confirm whether your browser supports this extension by visiting [WebGL Report](https://webglreport.com/?v=2).
  * WebGPU: The underlying WebGPU implementation must support the GPU Adapter feature [`timestamp-query`](https://web3dsurvey.com/webgpu/features/timestamp-query).
* **CPU** - Shows the time in milliseconds to render each frame by the CPU.

The CPU and GPU graphs display a breakdown of the update and render portion of the frame using red and green respectively.

## Using MiniStats Outside of the Editor

While the MiniStats panel is incorporated into the Editor's Launch page, you can also use it independent of the Editor. To add MiniStats to your application, simply call:

```javascript
const miniStats = new pc.MiniStats(app);
```

For more details on available methods and properties, refer to the [MiniStats API reference](https://api.playcanvas.com/engine/classes/MiniStats.html).

Take a look at the [Engine Examples Browser](https://playcanvas.github.io/) to see MiniStats in action in an Engine-only context.
