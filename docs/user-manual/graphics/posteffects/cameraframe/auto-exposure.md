---
title: Auto Exposure
description: "The CameraFrame auto exposure effect: metering the brightness of the screen, adapting the exposure, cuts, reading the exposure and the histogram, the debug view, and the Editor script."
---

The [`AutoExposureEffect`](https://api.playcanvas.com/engine/classes/AutoExposureEffect.html) adapts the exposure of a camera to the brightness of what it sees, like the eye adapting to the dark or to the daylight. Every frame, it measures a histogram of the brightness of the screen, and averages the part of it between two fractions of the screen, leaving out the darkest and the brightest parts, such as deep shadows and the sun. It then changes the exposure gradually towards the one which displays that average as middle grey.

The auto exposure is not a built-in effect of the camera frame: create it, and add it to a camera frame with [`addEffect`](https://api.playcanvas.com/engine/classes/CameraFrame.html#addeffect):

```javascript
const autoExposure = new AutoExposureEffect(app.graphicsDevice);
cameraFrame.addEffect(autoExposure);
cameraFrame.update();
```

## The exposure it adapts

The effect adapts the exposure the camera renders with: the [exposure of the scene](https://api.playcanvas.com/engine/classes/Scene.html#exposure), or with [physical units](/user-manual/graphics/cameras/tone-mapping/#physical-exposure), the exposure of the physical camera. It scales it by up to [`minEv`](https://api.playcanvas.com/engine/classes/AutoExposureEffect.html#minev) and [`maxEv`](https://api.playcanvas.com/engine/classes/AutoExposureEffect.html#maxev) stops, so set the exposure of the camera for a typical view, and the effect adapts it from there.

Every part of the frame which uses the exposure follows it, the tone mapping of the composition and the anti-aliasing among them. The effect needs tone mapping, as without it the composition applies no exposure: it is inactive while `rendering.toneMapping` is `TONEMAP_NONE`.

## Metering

The effect measures the brightness of the screen from the half resolution copy of the scene, into a histogram of 64 bins. Three properties choose the part of the screen it averages:

| Property | Description |
| -------- | ----------- |
| `lowPercent` | The fraction of the screen, 0-1, left out of the average as its darkest part, such as deep shadows. Higher values meter the brighter parts of the screen, darkening the image. Defaults to 0.1. |
| `highPercent` | The fraction of the screen, 0-1, below which the average is taken, leaving out the brightest part above it, such as the sun and bright highlights. Defaults to 0.9. |
| `centerWeight` | How much the brightness of the center of the screen counts over its edges, 0-1. 0 meters the whole screen equally, 1 mostly its center. Defaults to 0.5. |

## Adaptation

| Property | Description |
| -------- | ----------- |
| `compensation` | The exposure compensation in EV: how much brighter than middle grey the average of the screen is displayed. Positive values brighten the image, negative values darken it, each step doubling or halving it. Defaults to 0. |
| `minEv` | The lowest exposure the effect adapts to, in EV relative to the exposure of the camera. -2 lets it darken the image to a quarter of its brightness, for bright scenes. Defaults to -6. |
| `maxEv` | The highest exposure the effect adapts to, in EV relative to the exposure of the camera. 2 lets it brighten the image four times, for dark scenes. Defaults to 6. |
| `speedDarkToLight` | How fast the exposure adapts when the scene gets brighter, as from a dark interior into the daylight. The exposure covers about two thirds of the change in 1 / `speedDarkToLight` seconds. Defaults to 3. |
| `speedLightToDark` | How fast the exposure adapts when the scene gets darker. The eye adapts to the dark more slowly than to the light, so this defaults to 1. |

Like all effects, changes to these properties apply on the next [`CameraFrame#update`](https://api.playcanvas.com/engine/classes/CameraFrame.html#update).

## Cuts

After a cut to a different view, a gradual adaptation from the previous view looks out of place. Call [`reset`](https://api.playcanvas.com/engine/classes/AutoExposureEffect.html#reset) on a cut, and the effect adapts to the next measurement at once, ignoring the measurements of the view before the cut:

```javascript
cameraEntity.setPosition(nextShot.position);
autoExposure.reset();
```

The effect also adapts at once to its first measurement.

## Reading the exposure

The histogram is read back from the GPU, so the exposure follows the screen a frame or two late, which the gradual adaptation hides. Two properties give the results:

- [`exposure`](https://api.playcanvas.com/engine/classes/AutoExposureEffect.html#exposure) is the exposure the camera renders with this frame, the exposure of the camera scaled by the adaptation.
- [`histogram`](https://api.playcanvas.com/engine/classes/AutoExposureEffect.html#histogram) is the latest histogram read back, a `Uint32Array` with the weight of each of its 64 bins, from the darkest to the brightest. It is updated in place as histograms arrive.

## Debug view

The `autoexposure` debug view displays the scene at the exposure the camera renders with, without the other effects, with the histogram of its brightness drawn along the bottom. The bins the average includes are drawn bright, the average in yellow, and the brightness the camera exposes as middle grey in blue. The two markers meet once the exposure has adapted.

```javascript
cameraFrame.debug = 'autoexposure';
cameraFrame.update();
```

## Auto exposure in the Editor

The `autoExposureEffect` script, from [`auto-exposure.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/auto-exposure.mjs), adds the effect to the camera frame of the camera entity it is on, next to the [`cameraFrame` script](/user-manual/graphics/linear-workflow/hdr-rendering/#cameraframe-in-the-editor). Its attributes are the properties of the effect, and its **Debug** attribute displays the debug view.

## Example

Walk from the sunlit courtyards into the dark tunnels between them, and the exposure adapts, faster to the light than to the dark.

<EngineExample id="camera-frame/auto-exposure" title="Auto Exposure" />
