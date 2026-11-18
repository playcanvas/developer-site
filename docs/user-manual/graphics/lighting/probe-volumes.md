---
title: Probe Volumes
description: Bake indirect lighting into a grid of probes at runtime, light static and moving objects with it, and switch between several baked lighting setups.
---

![Probe volume at night](/img/user-manual/graphics/lighting/probe-volumes/night.webp)
*At night, this scene is lit by dim moonlight, a directional light with shadows, and by emissive meshes, whose light reaches the surfaces around them through the probes*

A probe volume is a grid of light probes filling a box in the scene. Each probe stores the indirect light arriving at its position from all directions, as spherical harmonics. Surfaces inside the box take their ambient lighting from the probes around them instead of from the environment, so light bounces off walls and floors, rooms are darker than the open sky, and glowing emissive surfaces light their surroundings.

The probes are baked at runtime by the engine, on the GPU, and can be saved to a file and loaded later.

## When to Use Probe Volumes {#when-to-use-probe-volumes}

Probe volumes and [lightmaps](/user-manual/graphics/lighting/lightmapping) both provide baked lighting, with different trade-offs.

Probe volumes:

- Light **static and moving objects** alike, so characters and other dynamic objects pick up the baked lighting of their surroundings
- Need **no lightmap UVs** and no textures per object, and work with [batching](/user-manual/graphics/advanced-rendering/batching)
- Can be **rebaked quickly** when the lighting changes, such as a change of the time of day
- Can hold **several baked lighting setups** and switch between them

However, the probes are spaced apart, typically by a meter or more, so they store soft, low frequency lighting. They do not provide sharp baked shadows, and probes close to thin walls can let light leak through them (see [Reducing Light Leaks](#reducing-light-leaks)). Direct lighting and shadows from dynamic lights are still rendered as usual on top of the probe lighting.

![Probe volume at sunset](/img/user-manual/graphics/lighting/probe-volumes/sunset.webp)
*The same scene at sunset: the low sun is a dynamic light, and the light bouncing from the surfaces it hits comes from the probes*

## Baking and Saving the Probes {#baking-and-saving-the-probes}

Create a [`ProbeVolume`][ProbeVolume] covering the box to light, and a [`ProbeVolumeBaker`][ProbeVolumeBaker] for it. The resolution is the number of probes along each axis of the box, so the spacing of the probes is the size of the box divided by the resolution.

```javascript
import { BoundingBox, ProbeVolume, ProbeVolumeBaker, Vec3 } from 'playcanvas';

// a 32 x 12 x 32 meter box, with probes spaced 2 meters apart
const aabb = new BoundingBox(new Vec3(0, 6, 0), new Vec3(16, 6, 16));
const volume = new ProbeVolume(app.graphicsDevice, { aabb, resolution: [16, 6, 16] });

// capture the emission of the surfaces, so emissive meshes light the scene
const baker = new ProbeVolumeBaker(app, volume, { emissive: true });

// capture what the probes see, then bake their lighting from it
await baker.captureGeometry();
await baker.bakeLighting({ bounces: 2 });

// save the probes, to load them later
const buffer = volume.serialize();
```

The probes capture the [layers](/user-manual/graphics/layers) passed in the `layers` option of the baker, the World and Skybox layers by default. Place the dynamic objects, which the probes should light but not capture, on a different layer.

Baking takes from a fraction of a second to a few seconds, depending on the number of probes, and runs over several frames, so the application keeps rendering while it bakes. Both `captureGeometry` and `bakeLighting` accept an `onProgress` callback to show the progress.

## Using the Probes {#using-the-probes}

Load the saved probes as a binary asset, create the volume from them, and apply it to the materials it should light:

```javascript
import { Asset, ProbeVolume } from 'playcanvas';

const asset = new Asset('probes', 'binary', { url: 'probes.bin' });
asset.ready(() => {
    const volume = ProbeVolume.deserialize(app.graphicsDevice, asset.resource);

    // light the materials of the scene with the probes
    materials.forEach((material) => {
        volume.applyToMaterial(material);
        material.update();
    });
});
app.assets.add(asset);
app.assets.load(asset);
```

The materials take their ambient lighting from the probes inside the box, and blend to the ambient lighting of the environment over the `blendDistance` outside of it. To stop a material from using the probes, call `volume.applyToMaterial(material, false)`.

The probes baked on a computer can be loaded on any device, including the devices that cannot bake them.

## Capturing the Geometry and Baking the Lighting {#capturing-the-geometry-and-baking-the-lighting}

Baking happens in two steps:

1. `captureGeometry` renders what each probe sees: the color, the direction and the distance of the surfaces around it, and their emission. This is the slower step, and only needs to run again when the geometry or the probe volume changes.
2. `bakeLighting` lights the captured surfaces with the lights of the scene and the sky, and stores the result in the probes. This step is fast, so the lighting can be baked again as it changes, for example as the sun moves.

`bakeLighting` takes these options:

| Option | Description |
| --- | --- |
| `source` | `PROBESOURCE_GBUFFER`, the default, lights the captured surfaces on the GPU, which is the fastest. `PROBESOURCE_SCENE` renders the lit scene from each probe instead, which is slower but includes everything the lit shaders render. |
| `bounces` | The number of times the light bounces between the surfaces after the direct lighting. More bounces brighten enclosed spaces. |
| `dilation` | Fills the probes inside geometry from their neighbors. |
| `shadowBounds` | The area the shadows of the directional lights cover during the bake. Defaults to the box of the volume. |
| `index` | The lighting of the volume to bake into, see [Several Lighting Setups](#several-lighting-setups). |

## Several Lighting Setups {#several-lighting-setups}

A volume can hold several lightings of the same probes, such as the lighting at midday, at sunset and at night. Bake each one with its own `index`, and select the one shown with `activeLighting`:

```javascript
// bake the lighting of the day into lighting 0, and of the night into lighting 1
setDayLighting();
await baker.bakeLighting({ index: 0 });
setNightLighting();
await baker.bakeLighting({ index: 1 });

// show the night
volume.activeLighting = 1;
```

The lightings share the captured geometry, so the geometry is only captured once. `serialize` saves all of them into a single file, and `lightingCount` returns how many a volume holds.

## Reducing Light Leaks {#reducing-light-leaks}

A surface is lit by the eight probes around it, which can be on the other side of a wall. Several features reduce the light leaking through walls:

![Probes shown in the Probe Volume example](/img/user-manual/graphics/lighting/probe-volumes/probes.webp)
*The probes of the scene, shown by the Probe Volume example. Each sphere shows the lighting stored in its probe, from each direction. The red probe is inside geometry and excluded, and the yellow lines connect the probes moved out of geometry to their grid positions*

- **Validity**: probes inside geometry, which see the back faces of the surfaces around them, are excluded from the lighting. Enabled by the `validity` option of `captureGeometry`.
- **Virtual offset**: probes inside geometry are captured at a position moved out of it. Enabled by the `virtualOffset` option of `captureGeometry`.
- **Visibility**: each probe stores how far it can see in each direction, and probes which cannot see a surface do not light it. Enabled by the `visibility` option of `captureGeometry`, and the `visibility` property of the volume.
- **Leak reduction**: probes behind a surface, relative to its normal, contribute less to it. Set with the `leakReduction` property.
- **Normal bias**: offsets the position at which a surface samples the probes along its normal, away from the probes behind it. Set with the `normalBias` property, in world units.

If light still leaks, place the probes closer together, or move or resize the box so that the probes don't fall inside thin walls. Walls thinner than the spacing of the probes are the most likely to leak.

## Runtime Settings {#runtime-settings}

These properties of the volume change how the probes are shown, without baking them again:

| Property | Description |
| --- | --- |
| `enabled` | Whether the materials use the probes. When disabled, they use the ambient lighting of the environment. |
| `intensity` | A multiplier of the lighting of the probes. |
| `shSharpening` | Sharpens the directional detail of the probes, which makes the lighting less flat. |
| `reflectionOcclusion` | Darkens the reflections of the environment where the probes are darker than it, such as inside a closed room, which would otherwise reflect the bright sky. |
| `blendDistance` | The distance outside of the box over which the lighting blends to the ambient lighting of the environment. |
| `format` | The format the probes are stored in: `PIXELFORMAT_RGBA16F`, the default, or `PIXELFORMAT_RGBA8`, which uses half the memory at a lower precision. |

## Device Support {#device-support}

Baking renders to half float or float textures. WebGPU always supports them, and WebGL2 devices need the float color buffer extensions, which some older or low-end mobile devices don't have. Check [`ProbeVolumeBaker.isSupported`][isSupported] before baking. On the devices that cannot bake, bake the probes ahead of time and load them with `ProbeVolume.deserialize`.

## Example {#example}

The [Probe Volume example](https://playcanvas.github.io/#/graphics/probe-volume) shows a pavilion lit by a probe volume, with three lighting setups loaded from a file. Its Baking panel edits the probe volume, rebakes the lighting as it changes, and downloads the probes.

[ProbeVolume]: https://api.playcanvas.com/engine/classes/ProbeVolume.html
[ProbeVolumeBaker]: https://api.playcanvas.com/engine/classes/ProbeVolumeBaker.html
[isSupported]: https://api.playcanvas.com/engine/classes/ProbeVolumeBaker.html#issupported
