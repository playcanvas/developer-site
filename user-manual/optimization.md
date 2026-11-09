# Debugging and Optimization

This section covers the tools for looking inside a running PlayCanvas application, to find out why it does not behave as expected or does not perform as it should, and the ways of making it load and run faster.

## Which Tool to Use

| To find out | Use |
| ----------- | --- |
| What your code does, and where it goes wrong | [Console Logging](https://developer.playcanvas.com/user-manual/debugging/console-logging.md) and the [Browser Dev Tools](https://developer.playcanvas.com/user-manual/debugging/browser-dev-tools.md) |
| What the application holds: its entities and components, cameras, assets and GPU resources | The [Inspector](https://developer.playcanvas.com/user-manual/debugging/inspector.md) |
| How a frame renders, pass by pass and draw by draw | The Frame graph tab of the [Inspector](https://developer.playcanvas.com/user-manual/debugging/inspector.md), and [stepping through a frame](https://developer.playcanvas.com/user-manual/debugging/inspector.md#stepping-through-a-frame) |
| What your code computes in the scene, such as bounds, directions or the content of a render target | [Debug Drawing](https://developer.playcanvas.com/user-manual/graphics/debug-drawing.md) |
| Whether the application keeps its frame rate as you use it | [MiniStats](https://developer.playcanvas.com/user-manual/optimization/mini-stats.md) |
| Which frames are slow, and what holds them back: the CPU, the GPU, scripts or loading | The [Performance tab of the Inspector](https://developer.playcanvas.com/user-manual/optimization/inspector-performance.md) |
| How long the application takes to start, and what loads when | The [Performance tab of the Inspector](https://developer.playcanvas.com/user-manual/optimization/inspector-performance.md#recording-the-start-of-the-application), or the [Editor Profiler](https://developer.playcanvas.com/user-manual/optimization/profiler.md) |
| The statistics of the engine from code, for dashboards and automated comparisons | [Profiling with AppStats](https://developer.playcanvas.com/user-manual/optimization/app-stats.md) |
| What the GPU does within a frame, in detail | [GPU Profiling](https://developer.playcanvas.com/user-manual/optimization/gpu-profiling.md) with the native GPU tools |

## Optimization

Optimization is a critical part of developing a PlayCanvas application. It can mean the difference between a great user experience and a terrible one.

:::tip

Don't wait until a project is near completion before you consider optimization. Be thinking about it from the start. It may meaningfully impact how you design your application.

:::

Let's begin by establishing the key goals for optimization and highlight why each goal is important:

| Goal | Why it matters |
| ---- | -------------- |
| ⏱️ Minimize load time | Your users have limited patience. If your app does not load quickly, they may give up waiting and go elsewhere. |
| 🎞️ Maximize frame rate | A high (and stable) frame rate makes for pleasing visuals and low latency response to user input. |
| 🔋 Minimize CPU and GPU load | Just because your app maintains 60 frames per second does not mean your work is done. Reducing processor load preserves battery power and keeps devices running cool. |
| 🧠 Minimize memory utilization | Browsers allocate a limited pool of memory to applications. Once this pool is exhausted, the tab will crash and reload. Your users will be upset! |

### Measure Before Optimizing

Choose a repeatable scene or interaction, record a baseline on the target device, then measure each change under the same conditions, with the profiling tools in [Which Tool to Use](https://developer.playcanvas.com/user-manual/optimization.md#which-tool-to-use). The [guidelines](https://developer.playcanvas.com/user-manual/optimization/guidelines.md) and the pages after them describe what to change.

:::ai
Give an AI assistant a performance goal, repeatable scenario and baseline reports from **[AppStats](https://developer.playcanvas.com/user-manual/optimization/app-stats.md#collecting-periodic-reports)**. It can combine these with MiniStats or browser evidence and propose one measurable change at a time. Use the **[Editor MCP Server](https://developer.playcanvas.com/user-manual/editor/mcp-server.md)** to replay Editor input or follow **[Developing with AI](https://developer.playcanvas.com/user-manual/engine/developing-with-ai.md)** for standalone projects.
:::
