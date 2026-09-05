---
title: Profiling with AppStats
description: Read frame, CPU, GPU, draw call, primitive and GPU memory statistics from app.stats for profiling scripts, reports and automated comparisons.
---

[`AppStats`](https://api.playcanvas.com/engine/classes/AppStats.html) exposes read-only performance measurements through [`app.stats`](https://api.playcanvas.com/engine/classes/AppBase.html#stats). Use it for profiling scripts, custom dashboards and automated comparisons without rendering an overlay. [MiniStats](/user-manual/optimization/mini-stats/) provides a visual view of application statistics alongside its own CPU timer.

The public getters described here require **Engine 2.23 or later**. They are available on both `Application` and `AppBase`. The application creates the stats instance and returns the same object on every access; you do not construct or replace it.

## Reading Statistics

Read the getters when you need a measurement:

```javascript
const stats = app.stats;
const updateMs = stats.cpuUpdateTime;
const renderMs = stats.cpuRenderTime;
const textureMiB = stats.vramTextureBytes / (1024 * 1024);
```

Durations are in **milliseconds** and memory sizes are in **bytes**. These getters return the latest available values, not MiniStats' half-second averages. `fps` is the exception: it reports the frame count from the latest approximately one-second reporting interval.

Reading stats does not enable GPU profiling, allocate a snapshot object or render anything. CPU timings and counters start at zero; GPU timing starts as `undefined`.

## Metrics and Build Availability

| Measurement | Getters | Builds |
| ----------- | ------- | ------ |
| Frame cadence | `frameTime`, `fps` | All |
| Draw calls | `drawCallCount` | All |
| CPU update and render | `cpuUpdateTime`, `cpuRenderTime` | All |
| CPU system phases | `cpuSystemUpdateTime`, `cpuSystemPostUpdateTime` | All |
| Animation and physics | `cpuAnimationTime`, `cpuPhysicsTime` | All |
| GPU frame | `gpuFrameTime` | All, when supported and enabled |
| GPU resource memory | [GPU memory getters](#gpu-resource-memory) | All |
| Primitives | `primitiveCount` | Debug and profiler only; `undefined` in release and minified builds |

For npm applications, use `playcanvas/debug` or `playcanvas/profiler` when you need primitive counting. Import the application and other engine classes consistently from the chosen build. CPU timings, draw calls, memory and supported GPU timings do not require switching away from a release build.

`drawCallCount` counts draw commands submitted in the previous frame. `primitiveCount` counts submitted triangles, lines and points across all passes. Primitive counting includes instances and CPU-authored multi-draw commands, before GPU clipping and culling. It is an estimate from draw parameters: GPU-generated indirect draws are excluded, and primitive-restart indices in indexed strips are not inspected. It does not perform GPU readback. Use the API reference for each getter's exact scope.

## Understanding the Timings

`frameTime` is the interval between application ticks, including browser scheduling and time spent outside the engine. It is unaffected by time scaling or delta-time clamping. It is not the sum of CPU and GPU durations, and a value near 16.67 ms can simply reflect a 60 Hz display cadence.

The CPU measurements have different scopes:

- `cpuUpdateTime` includes component systems, application update listeners and input updates. It excludes graphics device updates.
- `cpuRenderTime` includes prerender/postrender listeners, hierarchy synchronization, batching and render command submission. It excludes graphics device `frameStart`/`frameEnd` work and GPU execution. It retains its latest value when rendering is skipped.
- `cpuSystemUpdateTime` includes script `update` callbacks, physics and other systems subscribed to that phase. `cpuSystemPostUpdateTime` includes script `postUpdate` callbacks. Both are part of `cpuUpdateTime`.
- `cpuAnimationTime` measures the dedicated `AnimComponentSystem` phase within the application update. Legacy `AnimationComponentSystem` work is part of the system update phase.
- `cpuPhysicsTime` measures the most recent physics step, normally within the system update. It includes synchronization and contact handling. Multiple manually requested steps are not accumulated; the value is zero before any step or when physics is paused through its `timeScale`.

These phases overlap or contain one another. Do not add every CPU getter to obtain a total. MiniStats' overall CPU timer uses broader frame-event boundaries and need not equal `cpuUpdateTime + cpuRenderTime`.

Frame counters are published at the start of the next application tick. CPU timings update as their phases finish. Reading in a `frameend` listener gives completed CPU phase measurements, but the published draw count belongs to the previous frame. GPU results arrive later still. The stats object is a live collection of the latest measurements, not an atomic snapshot of one frame.

## Enabling GPU Timing

GPU profiling is disabled by default. Enable it before collecting GPU samples:

```javascript
const profiler = app.graphicsDevice.gpuProfiler;
if (profiler) {
    profiler.enabled = true;
}

// Later, once frames have rendered and query results have arrived:
const gpuMs = app.stats.gpuFrameTime;
if (gpuMs !== undefined) {
    // Use gpuMs as the most recently resolved GPU duration.
}
```

| Backend | Support needed | Measurement |
| ------- | -------------- | ----------- |
| WebGL 2 | `EXT_disjoint_timer_query_webgl2` | Elapsed time from a whole-frame timer query. |
| WebGPU | `timestamp-query` | Span from the first profiled pass beginning to the last pass ending, including gaps between passes. |

The engine requests the WebGPU feature automatically when the adapter exposes it. A profiler object can exist even when timing is unsupported; enabling it is not proof that results will be available.

`gpuFrameTime` returns `undefined` when profiling is disabled or unsupported, before a valid result arrives, and after timing invalidation such as context loss. Do not substitute zero when interpreting an unavailable result. Valid results may be several frames old and can repeat across CPU frames until a newer query resolves.

This is elapsed GPU time, not GPU utilization. Pass intervals can overlap, so adding per-pass durations can overestimate the overall frame duration. Use MiniStats on WebGPU for a pass breakdown, or [native GPU profilers](/user-manual/optimization/gpu-profiling/) for a deeper investigation.

MiniStats also enables profiling when it creates its GPU timer. If no tool needs GPU timing anymore, set `profiler.enabled = false`. Reading stats, hiding MiniStats or destroying its overlay does not disable the device's GPU profiler.

## GPU Resource Memory

`vramTotalBytes` is the sum of the following estimates:

| Getter | Resources |
| ------ | --------- |
| `vramTextureBytes` | Textures |
| `vramVertexBufferBytes` | Vertex buffers |
| `vramIndexBufferBytes` | Index buffers |
| `vramUniformBufferBytes` | Uniform buffers |
| `vramStorageBufferBytes` | Storage buffers |

Uniform or storage buffer values can be zero when no tracked buffers have been allocated. Storage buffer memory is zero on backends without storage buffers.

The estimates belong to the application's graphics device, which can be shared by applications. They do not describe total physical GPU memory usage or capacity, and exclude untracked driver overhead and JavaScript memory. Divide by `1024 * 1024` to report MiB.

## Collecting Periodic Reports

For a useful baseline, accumulate frame samples and publish a report at a lower frequency. This example averages frame cadence, CPU timings and draw calls over approximately 500 ms and records the peak frame interval. GPU duration, primitives and memory remain explicitly labeled as the latest available values.

```javascript
const stats = app.stats;
const report = {
    windowMs: 0,
    samples: 0,
    frameAvgMs: 0,
    framePeakMs: 0,
    cpuUpdateAvgMs: 0,
    cpuRenderAvgMs: 0,
    drawCallsAvg: 0,
    gpuLatestMs: null,
    primitivesLatest: null,
    vramLatestMiB: 0
};
let elapsed = 0;
let samples = 0;
let framePeak = 0;
let updateTotal = 0;
let renderTotal = 0;
let drawCallsTotal = 0;

function sampleStats() {
    elapsed += stats.frameTime;
    samples++;
    framePeak = Math.max(framePeak, stats.frameTime);
    updateTotal += stats.cpuUpdateTime;
    renderTotal += stats.cpuRenderTime;
    drawCallsTotal += stats.drawCallCount;

    if (elapsed < 500) return;

    report.windowMs = elapsed;
    report.samples = samples;
    report.frameAvgMs = elapsed / samples;
    report.framePeakMs = framePeak;
    report.cpuUpdateAvgMs = updateTotal / samples;
    report.cpuRenderAvgMs = renderTotal / samples;
    report.drawCallsAvg = drawCallsTotal / samples;
    report.gpuLatestMs = stats.gpuFrameTime ?? null;
    report.primitivesLatest = stats.primitiveCount ?? null;
    report.vramLatestMiB = stats.vramTotalBytes / (1024 * 1024);

    // Serialize only when publishing; console output is optional instrumentation.
    console.log(JSON.stringify(report));

    elapsed = 0;
    samples = 0;
    framePeak = 0;
    updateTotal = 0;
    renderTotal = 0;
    drawCallsTotal = 0;
}

app.on('frameend', sampleStats);

// When profiling is finished:
// app.off('frameend', sampleStats);
```

The sampling path reuses its state without creating arrays or objects each frame. Serialization happens only when publishing. An unavailable GPU or primitive measurement is reported as `null`. The GPU value is not averaged here because repeated reads can refer to the same resolved GPU frame.

For a dashboard or agent integration, replace the console output with your own report consumer. If it retains reports, copy or serialize at publication time because the report object is reused. Keep instrumentation identical across runs; logging, rendering overlays and GPU queries can affect the measurements.

## Comparing Changes

1. Choose a repeatable camera path or interaction and a target frame budget. Use the same device, backend, resolution, quality settings and engine build for both runs.
2. Let assets load and shaders compile before collecting steady-state samples. Measure startup separately with the [Editor Profiler](/user-manual/optimization/profiler/) or browser performance tools.
3. Keep the application visible and repeat the same scenario for a fixed period. Background throttling changes the frame intervals.
4. Save the baseline reports, make one change and repeat. Compare averages, peaks and memory trends rather than a single frame or FPS alone.
5. Investigate high CPU phase times with browser performance tools, GPU costs with MiniStats pass timings or native profilers, and persistent memory growth by checking resource lifetimes.

:::ai
Give an agent the scenario, environment, measurement interval and baseline reports. Ask it to identify the likely bottleneck, propose one change, rerun the same capture and report the difference. Use the public getters rather than internal stats fields, and preserve unavailable values instead of treating them as zero. See [Developing with AI](/user-manual/engine/developing-with-ai/) for project setup and browser verification.
:::
