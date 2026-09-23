# Volumetric Fog

[`CameraFrame.volumetricFog`](https://api.playcanvas.com/engine/classes/CameraFrame.html#volumetricfog) renders height fog illuminated by scene lights. Directional lights produce atmospheric haze and sun shafts; omni and spot lights create illuminated volumes and beams. The effect samples shadows along view rays, so objects can block the light within the fog.

## Setup

Use a perspective camera. Assign a directional light component to `volumetricFog.light`, or enable local omni or spot lights. Enabling fog without either source leaves the effect inactive. Assigning a non-directional light to `light` disables the effect; use the local-light settings for omni and spot lights.

The following example assumes `cameraEntity` has a camera component and `sunEntity` has a directional light component:

```javascript
const cameraFrame = new pc.CameraFrame(app, cameraEntity.camera);
cameraFrame.rendering.toneMapping = pc.TONEMAP_NEUTRAL;
cameraFrame.taa.enabled = true;

sunEntity.light.castShadows = true;
cameraFrame.volumetricFog.enabled = true;
cameraFrame.volumetricFog.light = sunEntity.light;
cameraFrame.volumetricFog.density = 0.01;
cameraFrame.volumetricFog.heightBase = 0;
cameraFrame.volumetricFog.heightFalloff = 0.05;
cameraFrame.update();
```

Choose the height and density to suit your scene's world units. To see shafts, place shadow-casting geometry between the light and the fog, and set the light's shadow distance and resolution to cover the area of interest. Fog is composed before TAA, so enabling TAA smooths the raymarch noise over time. Call `cameraFrame.update()` after changing settings.

## Omni and Spot Lights

Local lights require [clustered lighting](https://developer.playcanvas.com/user-manual/graphics/lighting/clustered-lighting.md), which is enabled by default. Enable the light types you want to contribute:

```javascript
cameraFrame.volumetricFog.localSpotLights = true;
cameraFrame.volumetricFog.localOmniLights = true;
cameraFrame.volumetricFog.localIntensity = 1;
cameraFrame.volumetricFog.localSteps = 12;
cameraFrame.update();

// Adjust one spot light's contribution independently of its surface lighting.
spotEntity.light.volumetricScattering = 2;
```

[`LightComponent.volumetricScattering`](https://api.playcanvas.com/engine/classes/LightComponent.html#volumetricscattering) defaults to 1 and applies to omni and spot lights. Set it to 0 to exclude a light from the fog. `localIntensity` scales all local-light scattering, while `intensity` controls the directional-light contribution. Narrow beams may need a higher `localIntensity` because they cross only a short section of each view ray.

Local lights sample the clustered shadow and cookie atlases. Enable shadow casting on the lights to let geometry block their beams, and use cookies to shape the illumination. Shadow atlas resolution affects the detail visible in the beams.

For a scene lit only by local lights, leave `volumetricFog.light` as `null` and enable `localSpotLights` or `localOmniLights`. The ambient term still contributes, but ambient alone does not activate the effect.

## Appearance

| Setting | Default | Effect |
| --- | --- | --- |
| `density` | `0.01` | Fog density at and below the base height. |
| `heightBase` | `0` | World-space height above which density starts to fall off. |
| `heightFalloff` | `0.05` | Exponential density falloff above the base. Use 0 for uniform density. |
| `tint` | White | Color of the fog's scattering medium. |
| `extinction` | `1` | Absorption relative to scattering. Lower values keep distant fog and shafts brighter, at the expense of physical accuracy. |
| `anisotropy` | `0.6` | Forward scattering, from 0 to 0.95. Larger values make fog brighter when looking towards the light. |
| `intensity` | `1` | Directional-light scattering strength. |
| `localIntensity` | `1` | Omni and spot light scattering strength. |
| `ambientColor` | White | Color of the ambient light scattered by the fog. |
| `ambientIntensity` | `0.02` | Ambient contribution that keeps shadowed fog visible. |

## Quality and Performance

| Setting | Default | Tradeoff |
| --- | --- | --- |
| `steps` | `24` | Main raymarch samples, from 4 to 128. More samples improve quality at a higher cost. |
| `localSteps` | `12` | Samples inside each local light volume, from 2 to 64. Increase for detailed beams. |
| `scale` | `0.5` | Fog texture resolution relative to the scene render target, from 0.25 to 1. Lower values reduce pixel work. |
| `maxDistance` | `300` | Maximum world-space distance covered by the raymarch. Limit it to the visible fog range. |

Start with the default half-resolution fog and TAA, then increase samples only where noise or banding remains visible. A longer `maxDistance` spreads the same samples over more space, so long rays may need more steps.

Local-light cost grows with the number of contributing lights, their screen coverage, and `localSteps`. Omni lights fill a sphere and often cover more of the screen than spot lights. Keep light ranges tight and disable scattering on lights that do not need to illuminate fog.

## Gaussian Splats

Fog and depth of field need Gaussian splats to contribute to scene depth to respect the splats' surfaces. This is disabled by default because it costs an extra full-screen render target. Enable it through [`GSplatParams.sceneDepthWrite`](https://api.playcanvas.com/engine/classes/GSplatParams.html#scenedepthwrite):

```javascript
if (pc.CameraFrame.isSplatSceneDepthSupported(app.graphicsDevice)) {
    app.scene.gsplat.sceneDepthWrite = true;
    cameraFrame.rendering.samples = 1;
    cameraFrame.update();
}
```

[`CameraFrame.isSplatSceneDepthSupported`](https://api.playcanvas.com/engine/classes/CameraFrame.html#issplatscenedepthsupported) checks device support, not the camera's complete configuration. Splat scene depth also requires:

- No MSAA on the CameraFrame (`rendering.samples = 1`); TAA can still be used.
- A camera that clears its whole render target.
- No depth prepass required for in-scene depth sampling. In particular, `rendering.sceneDepthMap = true` and `ssao.type = pc.SSAOTYPE_LIGHTING` prevent this path. Use `pc.SSAOTYPE_COMBINE` if SSAO is needed alongside splat scene depth.

Unsupported configurations fall back to depth that excludes splats, and a debug build warns when requested splat depth cannot be produced. If the scene relies on splat depth, disable fog and DoF when it is unavailable, or provide suitable depth geometry. Use the [depth debug view](https://developer.playcanvas.com/user-manual/graphics/posteffects/cameraframe.md#debug-views) to inspect the result.

Some devices use lower-precision scene depth. Keep camera clip distances within approximately 0.000015 to 16384 world units on those devices to preserve depth accuracy.

## In the Editor

Add and parse [`camera-frame.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/camera-frame.mjs), then attach the registered `cameraFrame` script to the camera entity as described in [CameraFrame in the Editor](https://developer.playcanvas.com/user-manual/graphics/linear-workflow/hdr-rendering.md#cameraframe-in-the-editor).

Enable the **Volumetric Fog** group. Its **Light** field takes the directional light **entity**; the engine API takes the light **component**. Enable **Local Spot Lights** or **Local Omni Lights** for local illumination, and use the same appearance and quality controls described above. Enable **TAA** to smooth the fog. If these attributes are missing from an existing project, update the script asset and parse it again.

## Examples

[Live example: Volumetric Fog](https://playcanvas.com/examples/#/graphics/volumetric-fog) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/graphics/volumetric-fog.example.mjs))

[Live example: Volumetric Fog Local Lights](https://playcanvas.com/examples/#/graphics/volumetric-fog-local-lights) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/graphics/volumetric-fog-local-lights.example.mjs))

[Live example: Volumetric Fog Shafts](https://playcanvas.com/examples/#/graphics/volumetric-fog-shafts) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/graphics/volumetric-fog-shafts.example.mjs))
