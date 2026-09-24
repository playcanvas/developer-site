# Supported Browsers

The PlayCanvas Engine requires a browser with [WebGL 2.0](https://en.wikipedia.org/wiki/WebGL#WebGL_2) support and the JavaScript features described in [Build Target](https://developer.playcanvas.com/user-manual/engine/supported-browsers.md#build-target). The minimum browser versions are:

| Browser                                     | Version | Win | macOS | Linux | Chrome OS | Android | iOS |
| ------------------------------------------- | ------- | --- | ----- | ----- | --------- | ------- | --- |
| [Chrome](https://www.google.com/chrome/)    | 80+     | ✔️  | ✔️    | ✔️    | ✔️        | ✔️      | ✔️  |
| [Safari](https://www.apple.com/safari/)     | 15+     |     | ✔️    |       |           |         | ✔️  |
| [Firefox](https://www.mozilla.org/firefox/) | 75+     | ✔️  | ✔️    | ✔️    |           | ✔️      | ✔️  |
| [Edge](https://www.microsoft.com/edge)      | 80+     | ✔️  | ✔️    | ✔️    |           | ✔️      | ✔️  |
| [Opera](https://www.opera.com/)             | 67+     | ✔️  | ✔️    | ✔️    |           | ✔️      |     |

On iOS and iPadOS, Chrome, Firefox and Edge are built on WebKit, the same browser engine as Safari, so they need iOS or iPadOS 15 or later. Opera for Android numbers its versions separately from desktop Opera, and needs version 57 or later.

:::tip

We recommend using an up-to-date browser for the best performance and access to newer features like [WebGPU](https://developer.playcanvas.com/user-manual/engine/supported-browsers.md#webgpu).

:::

## WebGPU

The Engine renders with WebGL 2.0 by default. An application can request [WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API) instead when it creates its graphics device with [`createGraphicsDevice`](https://api.playcanvas.com/engine/functions/createGraphicsDevice.html), and the Engine falls back to WebGL 2.0 when WebGPU isn't available. WebGPU is available in:

* **Chrome** 113+ on Windows, macOS and ChromeOS, 121+ on Android, and 144+ on Linux with Intel Gen12+ GPUs
* **Edge** 113+ on Windows and macOS, and 144+ on Linux with Intel Gen12+ GPUs
* **Safari** 26+ on macOS, iOS and iPadOS
* **Firefox** 141+ on Windows, and 147+ on macOS with Apple silicon
* **Opera** 99+ on Windows and macOS

WebGPU support is still expanding, so check [Can I use](https://caniuse.com/webgpu) for the latest coverage.

## Checking Browser Support

To verify your browser supports WebGL 2.0, visit [webglreport.com](https://webglreport.com/?v=2). To check for WebGPU, visit [webgpureport.org](https://webgpureport.org/). 🎉

## Build Target

The PlayCanvas Engine is built targeting ES2020 JavaScript, and its release and profiler ES module builds also use class fields from ES2022. These language features, rather than WebGL 2.0, set the minimum versions of Chrome, Edge, Firefox and Opera above. Older versions of these browsers support WebGL 2.0, but can't run the Engine.
