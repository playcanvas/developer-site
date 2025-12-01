---
title: Light Estimation
---

In AR, the real world can have complex illumination and various environments. For better immersion and the ability to blend between the real and the virtual world, virtual objects can be shaded and illuminated based on Light Estimation data, such as:

* **Directional light** (the most prominent), its rotation, intensity and color.
* **Ambient light** in the form of L3 spherical harmonics.
* **Reflections** in the form of a cube map ([currently not integrated][1]).

## Support

You can check if light estimation is supported by the system:

```javascript
if (app.xr.lightEstimation.supportedColor) {
    // light estimation access is supported
}

app.xr.lightEstimation.on('available', () => {
    // light estimation becomes available
});
```

## Directional Light

The most basic information that light estimation provides is the most prominent directional light rotation, intensity and color:

```javascript
const lightEstimation = app.xr.lightEstimation;

// check if light estimation is available
if (lightEstimation.available) {
    // rotate entity
    entity.setRotation(lightEstimation.rotation());

    // set light parameters
    entity.light.intensity = lightEstimation.intensity;
    entity.light.color = lightEstimation.color;
}
```

## Ambient Light

As the environment is usually much more complex than a single directional light, light estimation provides ambient light information in the form of L3 SH (spherical harmonics).

To use SH, the material either has a prefiltered cube map applied (scene skybox works also), or the constant ambient shader chunk (`ambientConstantPS`) should be updated.

You can set SH data per material:

```javascript
if (app.xr.lightEstimation.available) {
    material.setParameter('ambientSH[0]', app.xr.lightEstimation.sphericalHarmonics);
}
```

If there is no prefiltered cube map or skybox on the scene, you can update the material chunk:

```javascript
material.chunks.ambientConstantPS = chunkCode;
material.update();
```

Shader chunk code:

```glsl
uniform vec3 ambientSH[9];

void addAmbient(vec3 worldNormal) {
    vec3 n = worldNormal;

    vec3 color =
        ambientSH[0] +
        ambientSH[1] * n.x +
        ambientSH[2] * n.y +
        ambientSH[3] * n.z +
        ambientSH[4] * n.x * n.z +
        ambientSH[5] * n.z * n.y +
        ambientSH[6] * n.y * n.x +
        ambientSH[7] * (3.0 * n.z * n.z - 1.0) +
        ambientSH[8] * (n.x * n.x - n.y * n.y);

    dDiffuseLight += color;
}
```

## Reflections

WebXR Light Estimation provides an estimation of the environment reflection in form of a cube map, but [at the moment][1] it is not integrated into PlayCanvas Engine.

[1]: https://github.com/playcanvas/engine/issues/6070
