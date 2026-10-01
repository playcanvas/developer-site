---
title: Light Estimation
description: "AR light estimation in PlayCanvas: starting estimation in an AR session, lighting virtual objects with the estimated direction, color and intensity of the main real-world light, and the spherical harmonics of the ambient light."
---

Virtual objects look most at home in AR when they are lit like the room around them. Light estimation tells you where the room's strongest light comes from, its color and its intensity, and gives you an estimate of the light from all around.

## Starting Estimation {#starting-estimation}

The engine requests light estimation for every AR session. Once the session has started, `app.xr.lightEstimation.supported` is `true` if the session can estimate light, and `start()` begins estimating:

```javascript
app.xr.on('start', () => {
    if (app.xr.lightEstimation.supported) {
        app.xr.lightEstimation.start();
    }
});
```

The first estimate arrives a moment later: `app.xr.lightEstimation.available` becomes `true`, and it fires `available`. If estimation can't start, it fires `error`. Estimation stops when the session ends, or when you call `end()`.

## Directional Light {#directional-light}

The estimate's `rotation`, `color` and `intensity` describe the strongest light in the room, as a directional light. Apply them to a directional light of your own every frame:

```javascript
app.on('update', () => {
    const estimation = app.xr.lightEstimation;
    if (!estimation.available) return;

    sun.setRotation(estimation.rotation);
    sun.light.color = estimation.color;
    sun.light.intensity = estimation.intensity;
});
```

The rotation points a directional light's entity the way the real light shines, so shadows that the light casts fall the way real shadows do. The intensity is the largest of the light's red, green and blue values, and at least 1, and the color is those values divided by the intensity. All three are `null` until an estimate is available.

## Ambient Light {#ambient-light}

`sphericalHarmonics` is an estimate of the light from every direction, as 27 numbers: the red, green and blue values of nine L2 spherical harmonics coefficients, in the order the [WebXR Lighting Estimation](https://immersive-web.github.io/lighting-estimation/#xrlightestimate-interface) specification defines. Use it to drive ambient lighting in your own shaders.

The engine doesn't apply it to materials. The `ambientSH` property of a standard material takes its nine coefficients in a different order, so the WebXR values can't be assigned to it directly.

The specification also defines reflection cube maps, which the engine doesn't provide.

## See Also

- [Lights](/user-manual/graphics/lighting/lights/) - Directional lights and their properties
- [Shadows](/user-manual/graphics/lighting/shadows/) - Shadows from the estimated light
- [XrLightEstimation](https://api.playcanvas.com/engine/classes/XrLightEstimation.html) - The API reference for `app.xr.lightEstimation`
