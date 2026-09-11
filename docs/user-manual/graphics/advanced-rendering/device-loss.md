---
title: Device Loss and Recovery
description: Handle WebGL context loss and WebGPU device loss, restore GPU-generated data, and test recovery in PlayCanvas.
---

:::note

This page describes recovery behavior in **PlayCanvas Engine 2.23 and later**.

:::

The browser can lose access to the GPU because of a driver reset, resource pressure, or a change in the system's graphics configuration. Treat loss as something an application may encounter during normal use.

In **WebGL2**, the rendering context is lost and the browser may restore it. In **WebGPU**, the lost native device cannot be reused: PlayCanvas requests a replacement device and recreates its GPU resources. The application keeps the same PlayCanvas graphics device object.

## What the engine restores

PlayCanvas pauses its application update and rendering loop while the device is lost, then resumes after successful recovery. JavaScript objects, entities, and application state remain in memory. Browser timers, network requests, and asynchronous callbacks can still run during this pause.

The distinction is between recreating a resource and recovering its **contents**:

| Resource or data | Recovery behavior |
| --- | --- |
| Engine-managed shaders, bindings, and pipelines | Recreated for the restored context or replacement device. |
| Textures and vertex/index buffers with retained CPU sources | Uploaded again from those sources. |
| Render targets | Recreated, but previously rendered pixels are lost. Render their contents again. |
| Storage buffers | Recreated at the same size. Write their input data again or regenerate it with compute. |
| Runtime lightmaps, generated environments, and one-off texture copies | Repeat the bake, generation, or copy operation. |
| GPU-only particle, simulation, or painting history | Previous history is lost. Restart it or restore an application-owned backup. |

Keep authoritative data or a way to regenerate it outside GPU memory. A loaded texture can return from its source image; paint subsequently accumulated into that texture cannot. Normal per-frame rendering regenerates many intermediate targets automatically.

## Restoring application data

Listen for `devicelost` and `devicerestored` on `app.graphicsDevice`. Stop application-owned GPU work on loss, and repopulate generated resources after restoration. Use these engine events on both backends instead of replacing the engine's native loss handling.

This WebGPU example retains CPU input for a [storage buffer](https://api.playcanvas.com/engine/classes/StorageBuffer.html). It also tracks interrupted reads for the next section:

```javascript
const device = app.graphicsDevice;
const values = new Float32Array([1, 2, 3, 4]);
const buffer = new pc.StorageBuffer(
    device,
    values.byteLength,
    pc.BUFFERUSAGE_COPY_SRC | pc.BUFFERUSAGE_COPY_DST
);
let readGeneration = 0;

const restoreData = () => {
    buffer.write(0, values);
    app.renderNextFrame = true;
};

const lost = device.on('devicelost', () => {
    readGeneration++;
});
const restored = device.on('devicerestored', restoreData);
restoreData();

app.on('destroy', () => {
    readGeneration++;
    lost.off();
    restored.off();
    buffer.destroy();
});
```

Update the retained `values` when your application's input changes. Make restoration repeatable: another loss can happen later. Reuse engine resource objects and avoid creating duplicate listeners or resources on each recovery.

For [runtime lightmaps](../lighting/runtime-lightmaps.md), schedule another bake after restoration, as the [baked-lighting example](https://playcanvas.github.io/#/graphics/lights-baked) does. Regenerate application-created environment maps similarly. If `app.autoRender` is false, request a frame **after** the regenerated content is ready with `app.renderNextFrame = true`.

## Handling asynchronous reads

An in-flight read can reject before `devicelost` arrives, or settle after recovery. For WebGPU storage-buffer reads, handle `AbortError` and discard results from an older generation:

```javascript
async function readValues() {
    const generation = readGeneration;
    try {
        const result = await buffer.read(
            0,
            values.byteLength,
            new Float32Array(values.length),
            true
        );
        return generation === readGeneration ? result : null;
    } catch (error) {
        if (
            error.name === 'AbortError' ||
            generation !== readGeneration
        ) {
            return null;
        }
        throw error;
    }
}
```

The final `true` submits this one-off read immediately, including outside the render loop. Immediate submission adds overhead; avoid it for routine per-frame reads.

Here, `null` means the caller should wait for a fresh result. Other failures still propagate. Issue new GPU work only when the device is available, including work started by timers or network callbacks.

Remove recovery listeners when their owner is destroyed. Explicitly destroy resources you no longer need, including `Compute` instances, which the device retains for recovery. Do not cache native WebGPU buffers, textures, or pipelines across device replacement.

## Testing recovery

In locally built engine examples using a debug build, paste this into the browser console:

```javascript
pc.AppBase.getApplication().graphicsDevice.debugLoseContext(1000);
```

This **internal testing helper is not a public API**. It triggers actual WebGL context loss or WebGPU device destruction, then attempts recovery after a 1,000 ms delay. The delay is not a guarantee of when recovery finishes. Its implementation is stripped from non-debug builds; do not use it in production application logic.

Test more than once, including while reads or compute work are in flight. Check that rendering and interaction resume, generated lighting returns, and an on-demand scene redraws without camera movement. Check both backends and inspect the console for validation errors.

## When recovery fails

Recovery is not guaranteed: the browser may be unable to restore a context or obtain another GPU device. Do not assume every `devicelost` event will be followed by `devicerestored`. An application can show an HTML recovery message and, after an application-chosen timeout, offer a page reload. Use HTML rather than an in-canvas message, since rendering is paused. Preserve important user work outside GPU memory.

For more background on the WebGPU lifecycle, see [WebGPU Device Loss by Brandon Jones](https://toji.dev/webgpu-best-practices/device-loss.html).
