---
title: Dynamic Sky
description: "The CameraFrame dynamic sky effect: an analytic day sky, the night sky, flat and volumetric clouds, a sun light kept in sync, and the lighting of the scene generated from the sky."
---

The [`DynamicSkyEffect`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html) renders the sky of a camera in place of the sky of the scene: a day sky of an analytic atmosphere lit by the sun, a night sky of stars and the moon, and optionally clouds drifting with the wind. The position of the sun sets the time of day, and the effect can keep a directional light in sync with it. It also generates the lighting of the scene from its sky.

The dynamic sky is not a built-in effect of the camera frame: create it, and add it to a camera frame with [`addEffect`](https://api.playcanvas.com/engine/classes/CameraFrame.html#addeffect):

```javascript
const sky = new DynamicSkyEffect(app.graphicsDevice);
sky.light = sunEntity.light;
sky.cloudType = CLOUDTYPE_VOLUMETRIC;
cameraFrame.addEffect(sky);
cameraFrame.update();
```

Like all effects, its settings apply on the next [`CameraFrame#update`](https://api.playcanvas.com/engine/classes/CameraFrame.html#update). A day and night cycle moving the sun calls it every frame:

```javascript
let time = 0;
app.on('update', (dt) => {
    time += dt;
    sky.elevation = Math.sin(time * 0.1) * 60;
    cameraFrame.update();
});
```

## The sun and the time of day

The [`azimuth`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#azimuth) and the [`elevation`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#elevation) of the sun, in degrees, set the time of day. An elevation below 0 places the sun below the horizon, which gives the night sky. [`rotation`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#rotation) turns the whole sky around the vertical axis, so the sky, the sun and the moon turn together.

The effect keeps the directional light assigned to its [`light`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#light) in sync with the sky: its direction, color and intensity, and so the shadows it casts. By day the light shines from the sun at [`sunIntensity`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#sunintensity), dimmed by the clouds, and at night it fades to the moonlight, at [`moonIntensity`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#moonintensity) and in the [`moonColor`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#mooncolor). The sky scales with `sunIntensity` too, so it sets the brightness of the whole day, to match the exposure of the camera.

## The day sky

| Property | Description |
| -------- | ----------- |
| `turbidity` | The haziness of the atmosphere, 1-20. Higher values give a milkier sky and a larger glow around the sun. |
| `rayleigh` | The amount of the Rayleigh scattering, 0-4, setting the blueness of the sky. |
| `mieCoefficient` | The amount of the Mie scattering, 0-0.1, setting the brightness of the glow around the sun. |
| `mieDirectionalG` | How tightly the glow hugs the sun, 0-1. |
| `luminance` | The brightness of the sky, relative to the light of the sun. At 1, the sky lights the scene as a clear sky does, so a single exposure suits the sky and the sunlit ground. |
| `twilightGlow` | The strength of the warm glow at the horizon while the sun is just below it. |

## The night sky

| Property | Description |
| -------- | ----------- |
| `nightColor`, `nightBrightness` | The color and the brightness of the night sky. |
| `starBrightness` | The brightness of the stars. 0 disables them. |
| `starDensity` | The fraction of the cells of the sky holding a star, 0-1. |
| `starSize` | The scale of the size of the stars. |
| `moonDirection` | The direction toward the moon, turned by the rotation of the sky. |
| `moonSize` | The angular radius of the moon disc, in degrees. |
| `moonGlow` | The brightness of the moon disc. |

## Clouds

The sky has no clouds by default. Set [`cloudType`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#cloudtype) to add them:

- `CLOUDTYPE_FLAT`: a single flat layer of noise with simple shading, which is cheap. The sky shader evaluates them for each pixel, like the rest of the sky, so they also work in [XR](#xr).
- `CLOUDTYPE_VOLUMETRIC`: volumetric clouds, ray marched through a layer of 3D noise. They are the expensive part of the sky, and render to a texture of their own, at a reduced resolution. Their noise is generated on the CPU when they are first used.

| Property | Description |
| -------- | ----------- |
| `cloudCoverage` | The fraction of the sky covered by clouds, 0-1, from a clear sky to overcast. |
| `cloudSoftness` | The softness of the clouds, 0.01-1, from dense clouds with crisp edges to translucent, wispy ones. |
| `cloudOpacity` | The opacity of the clouds, 0-1. |
| `cloudBrightness` | The brightness of the sunlight falling on the clouds. |
| `cloudNightBrightness` | The brightness of the moonlight on the clouds at night. |
| `cloudSize` | The distance in meters over which the cloud pattern repeats. Larger values give larger clouds. |
| `cloudHeight` | The altitude of the cloud layer, in meters. |
| `cloudThickness` | The thickness of the layer of the volumetric clouds, in meters. |
| `cloudSunDimming` | The fraction of the sunlight the clouds block at the full coverage, dimming the light. |
| `windSpeed`, `windDirection` | The speed the clouds drift with, in meters per second, and the direction they drift toward, in degrees. The clouds drift with the time of the application. |

Two properties set the cost of the volumetric clouds:

- [`cloudQuality`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#cloudquality), 0-1, sets the number of their steps through the cloud layer and toward the light. The cost grows about linearly, doubling from 0.5 to 1. Lower values give less defined edges and a flatter shading.
- [`cloudResolution`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#cloudresolution), 0.25-1, is the resolution the clouds render at, relative to the scene. The clouds are soft, so a reduced resolution saves most of their cost with little loss of detail.

## Lighting the scene

While its [`lighting`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#lighting) is enabled, the effect generates the lighting of the scene from its sky: the environment atlas lighting the materials, assigned to [`Scene#envAtlas`](https://api.playcanvas.com/engine/classes/Scene.html#envatlas). Only one effect should do so, the one of the main camera.

Generating the lighting has a cost, so the effect generates it again only when the sky has changed enough:

- [`lightingThreshold`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#lightingthreshold) is the angle the sun moves by before the lighting is generated again.
- [`lightingCloudThreshold`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#lightingcloudthreshold) is the distance the clouds drift by, as a fraction of their size, before it is generated again. 0, the default, disables it.
- [`lightingInterpolation`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#lightinginterpolation) blends the lighting from its previous update to its latest one, so it follows a gradually changing sky smoothly, instead of changing at once.
- [`bakeLighting`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#bakelighting) generates the lighting again before the next frame, for a change it does not regenerate for on its own.

[`lightingResolution`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#lightingresolution) is the resolution of the sky the lighting is generated from, and [`atlasSize`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#atlassize) the size of the environment atlas. A larger atlas gives sharper reflections on glossy surfaces.

The cameras without the effect, such as the cameras rendering planar reflections, render the sky of the scene from that environment atlas: a still image of this sky.

## XR {#xr}

In XR, the sky renders for each view, like the rest of the scene, and so do the flat clouds. The volumetric clouds render to their texture once, for the view of the camera, and each view reads them from it. Where the view of an eye extends past the view of the camera, the texture has no clouds to read, and they streak at its edge. Use `CLOUDTYPE_FLAT` clouds in XR.

## Limitations

- The volumetric clouds are not supported in XR, see [XR](#xr).
- The sky does not work together with the [volumetric fog](/user-manual/graphics/posteffects/cameraframe/volumetric-fog/) of the camera frame: the clouds cast no shadows into the fog, and the fog is not lit by the light of the sky.

## Example

An analytic atmosphere over a day and night cycle, with stars, the moon and volumetric clouds drifting with the wind, lighting the scene and keeping the sun light in sync with the sky.

<EngineExample id="camera-frame/dynamic-sky" title="Dynamic Sky" />
