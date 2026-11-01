---
title: Lens Flare
description: "The CameraFrame lens flare effect: shape libraries, flare looks and their elements, following lights, occlusion and fading, and the lens flare scripts for the Editor."
---

The [`LensFlareEffect`](https://api.playcanvas.com/engine/classes/LensFlareEffect.html) draws the flares of lights, or of any positions, in the scene. Each flare is a [`LensFlare`](https://api.playcanvas.com/engine/classes/LensFlare.html) following its light, whose **look** places shapes along the axis from the light through the center of the screen. The flares fade as their light is covered by the scene, as it leaves the screen, and for a spot light as the camera leaves its cone.

The lens flare is not a built-in effect of the camera frame: create it, and add it to a camera frame with [`addEffect`](https://api.playcanvas.com/engine/classes/CameraFrame.html#addeffect). It draws the flares at a lower resolution than the scene, and adds them to the scene in linear HDR space, before tone mapping.

## Setting up the flares

The effect draws the shapes of all its flares from one **shape library**: textures, which it copies into a texture array, and which the elements of the flares reference by name. A shape is a texture with the shape in its color channels and its coverage in alpha, such as a white shape on a transparent background.

```javascript
const lensFlare = new LensFlareEffect(app.graphicsDevice);
lensFlare.shapes = {
    shapes: {
        glow: glowAsset.resource,
        star: starAsset.resource,
        disc: discAsset.resource
    }
};
cameraFrame.addEffect(lensFlare);

// a flare following the sun: a glow, a star and a train of four ghosts
const sun = new LensFlare({
    elements: [
        { shape: 'glow', size: 0.5, color: [1, 0.9, 0.7], intensity: 0.5 },
        { shape: 'star', size: 1.2, intensity: 0.4 },
        { shape: 'disc', offset: 0.5, size: 0.08, color: [0.4, 0.8, 1], count: 4, spread: 0.4 }
    ]
}, { light: sunEntity.light });
lensFlare.add(sun);

cameraFrame.update();
```

The shapes are stored at the same resolution, 512 pixels by default, set with the `resolution` of the shape library. Create a `LensFlare` for each light that flares, and register it with the effect with [`add`](https://api.playcanvas.com/engine/classes/LensFlareEffect.html#add). [`remove`](https://api.playcanvas.com/engine/classes/LensFlareEffect.html#remove) unregisters it.

## Looks

The look of a flare is the list of its elements, drawn in order. A look is plain data, shared by any number of flares, and can be loaded from a JSON asset. Each element places a shape on the axis of the flare:

| Property | Description |
| -------- | ----------- |
| `shape` | The name of the shape, in the shape library of the effect. |
| `offset` | The position along the axis: 0 at the source, 1 at the center of the screen, 2 mirrored across the center, negative beyond the source. Defaults to 0. |
| `size` | The height of the element, as a fraction of the screen height. Defaults to 0.1. |
| `aspect` | The width of the element relative to its height. Defaults to 1. |
| `rotation` | The rotation of the element, in degrees. Defaults to 0. |
| `autoRotate` | Whether the element rotates to align with the axis, for streaks. Defaults to false. |
| `color` | The color of the element, as a `Color` or an array of three numbers. Defaults to white. |
| `intensity` | The brightness of the element. Defaults to 1. |
| `count` | The number of copies of the element, spread along the axis around its offset: a train of ghosts. Defaults to 1. |
| `spread` | The distance along the axis the copies are spread over, in the units of the offset. Defaults to 0. |

The elements of a look are built into the effect when `CameraFrame#update` is called. To change a look, assign it to the [`look`](https://api.playcanvas.com/engine/classes/LensFlare.html#look) of the flare again, the same object included, and update the camera frame.

## The source of a flare

The second argument of the `LensFlare` constructor selects what the flare follows:

- `light`: a light component. A directional light gives the direction of the source, and an omni or a spot light its position. A spot light also limits the flare to its cone.
- `node`: a node whose position is the source, for a flare without a light.
- `position`: a world position, for a source with neither a light nor a node.
- `direction`: a world direction towards a source infinitely far away, for a flare without a light.

The color of the light tints the flare, and its intensity scales it, unless [`useLightColor`](https://api.playcanvas.com/engine/classes/LensFlare.html#uselightcolor) or [`useLightIntensity`](https://api.playcanvas.com/engine/classes/LensFlare.html#uselightintensity) is turned off. The [`color`](https://api.playcanvas.com/engine/classes/LensFlare.html#color), [`intensity`](https://api.playcanvas.com/engine/classes/LensFlare.html#intensity) and [`scale`](https://api.playcanvas.com/engine/classes/LensFlare.html#scale) of the flare tint, brighten and scale all its elements.

## Occlusion and fading

The effect measures how much of the source of each flare the scene covers, by testing the scene depth around it, and fades the flare by it. The properties of the flare shape this:

- [`occlusionRadius`](https://api.playcanvas.com/engine/classes/LensFlare.html#occlusionradius) is the radius around the source the depth is tested in. A source partly covered fades partly.
- [`occlusionFade`](https://api.playcanvas.com/engine/classes/LensFlare.html#occlusionfade) is the time the measured visibility takes to follow a change, smoothing the fade.
- [`occlusionOffset`](https://api.playcanvas.com/engine/classes/LensFlare.html#occlusionoffset) moves the depth test from the source towards the camera, so the geometry of a lamp does not cover its own light.
- [`edgeFade`](https://api.playcanvas.com/engine/classes/LensFlare.html#edgefade) is the width of the band at the edge of the screen the flare fades out over, as its source leaves the screen, and [`allowOffScreen`](https://api.playcanvas.com/engine/classes/LensFlare.html#allowoffscreen) keeps the flare drawing while its source is just outside the screen.
- [`fadeStart`](https://api.playcanvas.com/engine/classes/LensFlare.html#fadestart) and [`fadeEnd`](https://api.playcanvas.com/engine/classes/LensFlare.html#fadeend) fade out the flare of a positional source with its distance from the camera.

The properties of a flare are live: changes apply to the next frame rendered, without updating the camera frame.

## The effect

The [`intensity`](https://api.playcanvas.com/engine/classes/LensFlareEffect.html#intensity) of the effect sets the brightness of all its flares, and 0 disables it. The flares are drawn at a resolution relative to the scene, given by [`scale`](https://api.playcanvas.com/engine/classes/LensFlareEffect.html#scale), between 0.25 and 1, half of it by default. A lower scale is cheaper, and softens the flares.

## Lens flares in the Editor

The [`lens-flare.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/lens-flare.mjs) script file provides two scripts:

- `lensFlareEffect`, on the camera entity next to the [`cameraFrame` script](/user-manual/graphics/linear-workflow/hdr-rendering/#cameraframe-in-the-editor), adds the effect to its camera frame, and holds the shape library: the texture assets of the shapes, their names and their resolution.
- `lensFlare`, on an entity, gives it a flare, with the elements of its look and the other properties of the flare as attributes. With a light component on the entity, the flare follows the light, and otherwise the position of the entity.

## Example

The sun of a procedural sky has a large flare with a diffraction burst and a train of ghosts, the lamps a small glow, and the spot lights flare only while the camera is inside their cone.

<EngineExample id="camera-frame/lens-flare" title="Lens Flare" />
