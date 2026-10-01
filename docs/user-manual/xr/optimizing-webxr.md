---
title: Performance
description: "Keeping WebXR applications fast in PlayCanvas: the frame rates headsets need, choosing the session's resolution, fixed foveation and anti-aliasing, target frame rates, keeping the cost of rendering two views down, and measuring performance in a headset."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A headset needs a new frame for each eye 72 to 120 times a second, and a dropped frame is felt as well as seen: the world stutters as the user's head moves. In AR, the device also spends time tracking the real world, and phones have less to spend. Plan for performance from the start of an XR project, and test on the devices you target as you build.

<EngineExample id="xr/vr-test-bed" title="VR Test Bed" />

## Resolution {#resolution}

The number of pixels you render is the biggest single cost. The session's resolution is set when it starts, by the `framebufferScaleFactor` option, relative to the resolution the browser recommends for the device:

```javascript
// Render at 80% of the recommended width and height
camera.camera.startXr(pc.XRTYPE_VR, pc.XRSPACE_LOCALFLOOR, {
    framebufferScaleFactor: 0.8
});
```

The engine scales it by the graphics device's pixel ratio too: the factor is multiplied by the device's `maxPixelRatio` divided by the display's `devicePixelRatio`. A device whose `maxPixelRatio` is below the display's renders the session at a lower resolution, as it renders the page's canvas. For the full resolution, let the device use the display's pixel ratio:

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
device.maxPixelRatio = window.devicePixelRatio;
```

The graphics device's default is 1, or the display's ratio where that is lower.

</TabItem>
<TabItem value="editor" label="Editor">

Enable **Device Pixel Ratio** in the **RENDERING** section of the [Settings](/user-manual/editor/interface/settings/rendering/) panel.

</TabItem>
<TabItem value="react" label="React">

`<Application>` leaves the graphics device's default, a pixel ratio of at most 1. Raise it from a component inside `<Application>`:

```jsx
import { useEffect } from 'react';
import { useApp } from '@playcanvas/react/hooks';

function FullResolution() {
  const app = useApp();
  useEffect(() => {
    app.graphicsDevice.maxPixelRatio = window.devicePixelRatio;
  }, [app]);
  return null;
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

`<pc-app>` uses the display's pixel ratio unless you cap it with `max-pixel-ratio`, so there is nothing to do.

</TabItem>
</Tabs>

`app.xr.framebufferScaleFactor` reports the factor of the running session. To change it, end the session and start another.

## Fixed Foveation {#fixed-foveation}

The edges of a headset's lenses are blurry anyway, so rendering them at full resolution is wasted work. Fixed foveation renders the edges of each view at lower resolution. Set `app.xr.fixedFoveation` from 0, which is off, to 1, the most, while a session runs:

```javascript
app.xr.on('start', () => {
    if (app.xr.fixedFoveation !== null) {
        app.xr.fixedFoveation = 0.5;
    }
});
```

`fixedFoveation` is `null` where the device doesn't support it. Foveation works only when the graphics device renders without anti-aliasing (MSAA). With anti-aliasing, the engine renders each frame elsewhere and copies it into the session's framebuffer, at full resolution, and the debug build warns that foveation is ignored:

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const device = await pc.createGraphicsDevice(canvas, {
    deviceTypes: [pc.DEVICETYPE_WEBGL2],
    antialias: false
});
```

</TabItem>
<TabItem value="editor" label="Editor">

Disable **Anti-Alias** in the **RENDERING** section of the [Settings](/user-manual/editor/interface/settings/rendering/) panel.

</TabItem>
<TabItem value="react" label="React">

```jsx
<Application graphicsDeviceOptions={{ antialias: false }}>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-app backend="webgl2" antialias="false">
```

</TabItem>
</Tabs>

Without anti-aliasing, edges can shimmer. Higher resolution, and textures with mipmaps, reduce it.

## Frame Rate {#frame-rate}

Many headsets can run at several refresh rates. A lower rate gives each frame more time, and a higher one looks smoother and is more comfortable, if the application can keep up. `app.xr.supportedFrameRates` lists the rates the device offers, or is `null` where it doesn't say, and `app.xr.frameRate` is the current one. Ask for another with `updateTargetFrameRate()`:

```javascript
app.xr.on('start', () => {
    const rates = app.xr.supportedFrameRates;
    if (rates?.includes(72)) {
        app.xr.updateTargetFrameRate(72, (err) => {
            if (err) console.warn(err.message);
        });
    }
});

app.xr.on('frameratechange', (frameRate) => {
    console.log(`Running at ${frameRate} Hz`);
});
```

## Rendering Cost {#rendering-cost}

The engine renders the scene once for each view, so everything that costs time per draw, per pixel or per light costs it twice on a headset. The usual techniques matter more than ever:

- **Draw calls.** Combine meshes with [batching](/user-manual/graphics/advanced-rendering/batching/), draw repeated objects with [instancing](/user-manual/graphics/advanced-rendering/hardware-instancing/), and let culling skip what is out of view.
- **Lights and shadows.** Every dynamic light, and every shadow it casts, has a cost per frame. Bake static lighting into [lightmaps](/user-manual/graphics/lighting/runtime-lightmaps/), and cast shadows from as few lights as you can.
- **Fill rate.** Complex materials, transparency and overdraw are paid for at every pixel of both views. Keep shaders simple, and avoid large transparent surfaces.
- **Post-processing.** Full-screen effects run for every pixel of every view, which is expensive at XR resolutions, so avoid them. On WebGPU, stereo sessions don't support per-camera post-processing, or materials that read the depth or color of the scene.
- **Garbage collection.** A collection pause drops frames. Reuse vectors and other objects rather than creating them in `update`.

See the [optimization guidelines](/user-manual/optimization/guidelines/) for more.

## Measuring {#measuring}

The page's tools aren't visible in a headset, so measure there in other ways:

- **Remote debugging.** Connect the headset's browser to the developer tools on your computer, and record a performance profile while you use the application. See [Testing and Debugging](/user-manual/xr/testing/#remote-debugging).
- **A display in the scene.** Show the frame rate on a panel in the scene. The [`XrMenu`](/user-manual/user-interface/xr/#xr-menus) script's label items, which `setItemLabel()` updates, make a quick one. The example above shows its foveation level in one.
- **The device's own tools.** Some headsets have performance overlays of their own, such as Meta's OVR Metrics Tool on Quest.

## See Also

- [Optimization](/user-manual/optimization/) - Optimizing PlayCanvas applications in general
- [Sessions](/user-manual/xr/sessions/#session-features) - The options of `startXr()`
- [Testing and Debugging](/user-manual/xr/testing/) - Profiling on devices
