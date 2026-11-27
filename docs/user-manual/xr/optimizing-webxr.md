---
title: Performance
description: "Keep XR applications at the headset's frame rate: the frame budget, XR resolution with maxPixelRatio and framebufferScaleFactor, fixed foveation, choosing a frame rate, the costs of stereo rendering, and measuring on a device."
---

A headset shows a new frame at its refresh rate, typically 72, 90 or 120 times a second, and your application has to render every one of them in time. At 90 frames per second, that is 11 milliseconds for your scripts, the engine and the GPU together. When a frame is late, the headset shows the previous one again, shifted to follow the user's head. The world then judders or smears as the user looks around, which can make them feel unwell, so a steady frame rate matters more in XR than anywhere else.

It is also harder to reach. A headset renders your scene twice, once for each eye, usually at a higher resolution than a desktop monitor's. Standalone headsets such as the Meta Quest have the processor and GPU of a phone. And an AR session's tracking of the real world uses some of the same processor.

## Resolution {#resolution}

Every device recommends a resolution for its views, which is about what its displays can show. The resolution of a session is that recommendation, scaled by two factors:

```none
session resolution = recommended resolution × (maxPixelRatio ÷ devicePixelRatio) × framebufferScaleFactor
```

- **`maxPixelRatio`** is a property of the graphics device that also limits the resolution of the canvas outside XR. It defaults differently on each surface:

  | Surface | Default `maxPixelRatio` |
  | --- | --- |
  | Engine and React | 1, so on a device whose `devicePixelRatio` is above 1, such as a phone, the session renders below the recommended resolution |
  | Editor | `devicePixelRatio` when **Device Pixel Ratio** is on in the RENDERING settings, and 1 otherwise |
  | Web Components | `devicePixelRatio` |

  To start sessions at the recommended resolution, set it to the browser's `devicePixelRatio` before the session starts:

  ```javascript
  app.graphicsDevice.maxPixelRatio = window.devicePixelRatio;
  ```

- **`framebufferScaleFactor`** is a [session option](/user-manual/xr/sessions/#options-and-features), 1 by default. Values below 1 render fewer pixels, and above 1 render more, sharper ones, if the device allows it:

  ```javascript
  camera.camera.startXr(XRTYPE_VR, XRSPACE_LOCALFLOOR, {
      framebufferScaleFactor: 0.8
  });
  ```

The resolution is fixed when a session starts. `app.xr.framebufferScaleFactor` reports the factor of the running session, and changes to `maxPixelRatio` apply to the next session. The number of pixels grows with the square of the scale, so a factor of 0.8 renders about two thirds of them. For an application that is limited by its pixels, such as one with expensive materials, lowering it is the quickest saving.

## Fixed Foveation {#fixed-foveation}

The lenses of a headset blur the edges of its displays, so pixels there are partly wasted. Fixed foveation renders the edges of each view at a lower resolution than the center. Set `app.xr.fixedFoveation`, from 0 (off) to 1 (the most), while a session runs:

```javascript
app.xr.on('start', () => {
    // null when the device doesn't support fixed foveation
    if (app.xr.fixedFoveation !== null) {
        app.xr.fixedFoveation = 1;
    }
});
```

With WebGL, fixed foveation only works when the graphics device has no anti-aliasing, as the engine then renders straight into the headset's framebuffer. Create the device with `antialias: false`, or turn off **Anti-aliasing** in the Editor's RENDERING settings. The engine logs a warning when it ignores the setting.

## Frame Rate {#frame-rate}

Some headsets can run at more than one refresh rate. A higher rate looks smoother, but leaves less time for each frame. `app.xr.supportedFrameRates` lists the rates a session can run at, or is `null` if the device doesn't say, and `app.xr.frameRate` is the current one. Ask for another with `updateTargetFrameRate`:

```javascript
app.xr.on('start', () => {
    if (app.xr.supportedFrameRates?.includes(72)) {
        app.xr.updateTargetFrameRate(72, (err) => {
            if (err) console.warn(`Frame rate not changed: ${err.message}`);
        });
    }
});

app.xr.on('frameratechange', (frameRate) => {
    console.log(`Now running at ${frameRate} Hz`);
});
```

A lower rate, such as 72, gives a heavy scene time to render every frame. A rate the application can't keep up with is worse than a lower one that it can.

## Rendering Costs {#rendering-costs}

The guidance in [General Guidelines](/user-manual/optimization/guidelines/) applies to XR, and these parts of it matter most:

- **Draw calls.** The scene is drawn for each eye, so draw calls cost twice. Combine static meshes with [batching](/user-manual/graphics/advanced-rendering/batching/), and draw repeated meshes with [instancing](/user-manual/graphics/advanced-rendering/hardware-instancing/).
- **Lights and shadows.** Each light adds to the cost of every pixel it reaches, and each shadow-casting light renders the scene again into its shadow map, six times for an omni light. Bake static lighting into [lightmaps](/user-manual/graphics/lighting/runtime-lightmaps/), and keep shadows for the few lights that need them.
- **Pixels.** Expensive materials, transparency and overdraw are paid for at the session's full resolution, twice. Use [fixed foveation](#fixed-foveation), and lower the [resolution](#resolution) if you have to.
- **Post-processing.** Full-screen effects are expensive at XR resolutions. With WebGPU in stereo, the engine doesn't yet support per-camera post-processing or the grab passes of refraction.
- **Textures.** Compressed textures use less memory and bandwidth. See [Texture Compression](/user-manual/optimization/texture-compression/).
- **Garbage collection.** A collection that pauses the application for a few milliseconds makes it miss a frame. Allocate objects up front and reuse them, rather than creating new vectors and arrays every frame.

## Measuring {#measuring}

Measure on the devices you support, as an emulator on a desktop computer tells you nothing about a headset's frame rate. While a session runs, the headset's display shows your scene rather than the page, so overlays such as [MiniStats](/user-manual/optimization/mini-stats/) and the [Inspector](/user-manual/debugging/inspector/) aren't visible in it:

- Profile over [remote debugging](/user-manual/xr/testing/#remote-debugging) with the **Performance** panel of your computer's browser, to see where the time of each frame goes.
- On a Meta Quest, Meta's [OVR Metrics Tool](https://developers.meta.com/horizon/documentation/native/android/ts-ovrmetricstool/) shows the frame rate and GPU load over everything the headset shows.
- Log `app.xr.frameRate` and your own timings to the console, and read them over remote debugging.

## See Also

- [General Guidelines](/user-manual/optimization/guidelines/) - Optimizing scripts, draw calls, materials and lighting
- [Device Pixel Ratio](/user-manual/optimization/runtime-devicepixelratio/) - Choosing `maxPixelRatio` for the device
- [GPU Profiling](/user-manual/optimization/gpu-profiling/) - Profiling frames with native GPU tools
- [XrManager](https://api.playcanvas.com/engine/classes/XrManager.html) - Reference for `fixedFoveation`, `frameRate` and `updateTargetFrameRate`
