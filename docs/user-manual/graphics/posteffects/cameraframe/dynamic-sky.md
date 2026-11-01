---
title: Dynamic Sky
description: "The CameraFrame dynamic sky effect: an analytic day sky, the night sky, flat and volumetric clouds, a sun light kept in sync, the lighting of the scene generated from the sky, and haze in the color of the sky."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [`DynamicSkyEffect`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html) renders the sky of a camera in place of the sky of the scene: a day sky of an analytic atmosphere lit by the sun, a night sky of stars and the moon, and optionally clouds drifting with the wind. The position of the sun sets the time of day, and the effect can keep a directional light in sync with it. It also generates the lighting of the scene from its sky, and can haze the scene with it.

The dynamic sky is not a built-in effect of the camera frame: create it, and add it to a camera frame with [`addEffect`](https://api.playcanvas.com/engine/classes/CameraFrame.html#addeffect):

```javascript
const sky = new DynamicSkyEffect(app.graphicsDevice);
sky.light = sunEntity.light;
sky.cloudType = CLOUDTYPE_VOLUMETRIC;
cameraFrame.addEffect(sky);
cameraFrame.update();
```

In the Editor, its script adds it, see [The dynamic sky in the Editor](#the-dynamic-sky-in-the-editor).

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

## Haze

While its [`haze`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#haze) is enabled, the effect adds aerial perspective to the scene its camera renders: with their distance, surfaces fade into the color of the sky behind them. The haze is warm toward a low sun, blue away from it, and follows the gradient of the night sky after the sunset. It is densest at its base height and thins out with the height above it, so the valleys stay hazy while the view from high up is clear.

```javascript
sky.haze = true;
sky.hazeDensity = 0.0002;
sky.hazeHeight = 300;
sky.hazeBaseHeight = 0;
cameraFrame.update();
```

| Property | Description |
| -------- | ----------- |
| `hazeDensity` | The density of the haze at its base height, per world unit: the fraction of the light it scatters over a unit of distance. A level view at the base height is 95% hidden at a distance of about 3 / density. |
| `hazeHeight` | The height over which the density falls to about a third, in world units. Lower values keep the haze closer to the ground. |
| `hazeBaseHeight` | The height the haze is densest at, in world units: usually the lowest ground of the scene, such as the level of the sea. Below it, the haze grows denser still. |

Keep the density low. The haze takes the color of the sky near the horizon, which is much brighter than the sunlit ground, so even a few percent of haze brightens the distant surfaces noticeably.

The haze takes the place of the fog of the camera, [`Scene#fog`](https://api.playcanvas.com/engine/classes/Scene.html#fog) or [`CameraComponent#fog`](https://api.playcanvas.com/engine/classes/CameraComponent.html#fog): while it is enabled, the effect gives its camera a fog of its own, and gives the camera its fog back once the haze is disabled. The other cameras keep their fog.

- The lit materials, such as [`StandardMaterial`](https://api.playcanvas.com/engine/classes/StandardMaterial.html), are hazed.
- The particles and the gaussian splats render without fog on the camera.
- A material opts out of the haze, and renders without fog, with [`useFog`](https://api.playcanvas.com/engine/classes/StandardMaterial.html#usefog) set to `false`, or with the `DYNAMIC_SKY_NO_HAZE` define:

```javascript
material.setDefine('DYNAMIC_SKY_NO_HAZE', true);
material.update();
```

Enabling or disabling the haze compiles the shaders of the lit materials the camera renders again, so set it up front rather than toggling it during the game.

The effect hazes the materials with a replacement of the `fogPS` shader chunk, for all the materials of the graphics device. A material replacing `fogPS` with a chunk of its own is not hazed, and finds the `FOG` define of its shaders set to `DYNAMICSKYHAZE` on the camera.

## The sky in other shaders

The effect sets the uniforms of its sky on the graphics device every frame, so the shaders of other materials can evaluate the same sky, for example a water shader reflecting it. Its shader chunks, in GLSL and WGSL, evaluate the sky from these uniforms:

- `dynamicSkyAtmospherePS`: `dynamicSkyBase(dir, ambient)` returns the radiance of the sky in a direction, without the sun disc, the stars and the moon, and sets `ambient` to the light of the sky around it. The direction is in the space of the sky: a world space direction turned by the rotation of the sky, the `dynSkyRotation` uniform, with X flipped.
- `dynamicSkyHazePS`: `dynamicSkyHaze(color, cameraPos, worldPos)` returns a linear color seen through the [haze](#haze), for the shaders the haze does not reach on its own.

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
#include "dynamicSkyAtmospherePS"
uniform mat3 dynSkyRotation;

vec3 skyColor(vec3 worldDir) {
    vec3 dir = worldDir * dynSkyRotation;
    dir.x = -dir.x;
    vec3 ambient;
    return dynamicSkyBase(dir, ambient);
}
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
#include "dynamicSkyAtmospherePS"
uniform dynSkyRotation: mat3x3f;

fn skyColor(worldDir: vec3f) -> vec3f {
    var dir = worldDir * uniform.dynSkyRotation;
    dir.x = -dir.x;
    var ambient: vec3f;
    return dynamicSkyBase(dir, &ambient);
}
```

</TabItem>
</Tabs>

On the CPU, [`getSkyColor`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#getskycolor) evaluates the same sky in a direction, for lighting worked out in a script, such as the light the sky gives to particles:

```javascript
const zenith = sky.getSkyColor(Vec3.UP);
```

With more than one dynamic sky, a material renders with the sky that was updated last.

## XR {#xr}

In XR, the sky renders for each view, like the rest of the scene, and so do the flat clouds. The volumetric clouds render to their texture once, for the view of the camera, and each view reads them from it. Where the view of an eye extends past the view of the camera, the texture has no clouds to read, and they streak at its edge. Use `CLOUDTYPE_FLAT` clouds in XR.

## The dynamic sky in the Editor

The `dynamicSkyEffect` script, from [`dynamic-sky.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/dynamic-sky.mjs), adds the effect to the camera frame of the camera entity it is on, next to the [`cameraFrame` script](/user-manual/graphics/linear-workflow/hdr-rendering/#cameraframe-in-the-editor). Its attributes are the properties of the effect, in the groups **Sun**, **Day**, **Night**, **Clouds** and **Lighting**. The **Light** attribute of the **Sun** group is the entity of the directional light kept in sync with the sun.

The script does not animate the time of day. It copies its attributes into the effect every frame, so a script of your own on the same entity moves the sun by changing them:

```javascript
import { Script } from 'playcanvas';

class DayNightCycle extends Script {
    static scriptName = 'dayNightCycle';

    time = 0;

    update(dt) {
        this.time += dt;
        const sky = this.entity.script.dynamicSkyEffect;
        sky.sun.elevation = Math.sin(this.time * 0.1) * 60;
    }
}

export { DayNightCycle };
```

The [haze](#haze) is not one of the attributes of the script. Set it on the effect the script drives, its `effect`, which the script creates in its `initialize`:

```javascript
import { Script } from 'playcanvas';

class SkyHaze extends Script {
    static scriptName = 'skyHaze';

    postInitialize() {
        const sky = this.entity.script.dynamicSkyEffect.effect;
        sky.haze = true;
        sky.hazeDensity = 0.0002;
        sky.hazeHeight = 300;
    }
}

export { SkyHaze };
```

## Limitations

- The volumetric clouds are not supported in XR, see [XR](#xr).
- The sky does not work together with the [volumetric fog](/user-manual/graphics/posteffects/cameraframe/volumetric-fog/) of the camera frame: the clouds cast no shadows into the fog, and the fog is not lit by the light of the sky.
- The haze does not reach the particles and the gaussian splats, which render without fog on the camera with the haze.

## Examples

An analytic atmosphere over a day and night cycle, with stars, the moon and volumetric clouds drifting with the wind, lighting the scene and keeping the sun light in sync with the sky.

<EngineExample id="camera-frame/dynamic-sky" title="Dynamic Sky" />

A desert landscape under the sky over a day, with the haze fading the distant ground into the color of the sky.

<EngineExample id="graphics/procedural-sky" title="Procedural Sky" />
