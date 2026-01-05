---
title: Depth Layer
---

Some rendering techniques require access to the depth or the color buffer of the scene for a specific camera. The Depth Layer is a special layer, which can be added to the `layers` property of a camera. The [`order`](/user-manual/graphics/layers/#choosing-the-layer-order) of the layers defines at which point during the rendering, the depth or the color buffer is captured. The captured buffers can then be used in the following layers of the camera.

Typically, those buffers are captured after all opaque layers are rendered and can be used in following transparent layers or post-processing.

Additionally, to capture these buffers, the capture needs to be enabled on a CameraComponent from a script:

- [```requestSceneColorMap```](https://api.playcanvas.com/engine/classes/CameraComponent.html#requestscenecolormap) to request a color map
- [```requestSceneDepthMap```](https://api.playcanvas.com/engine/classes/CameraComponent.html#requestscenedepthmap) to request a depth map

## Buffer access

To access one of these buffers in the shader as a texture, these are the uniform names to be used:

- for the color map: `uSceneColorMap`
- for the depth map: `uSceneDepthMap`

## Color Space Handling

When using `uSceneColorMap`, it's important to handle color space correctly. The scene color texture contains either gamma-corrected values (when rendering LDR to a non-sRGB target) or linear values (when using HDR rendering with CameraFrame).

### SCENE_COLORMAP_GAMMA Define

The engine automatically provides a `SCENE_COLORMAP_GAMMA` shader define when the scene color map contains gamma-corrected values that need to be converted to linear space. This typically occurs during LDR rendering when the camera outputs gamma-corrected colors to a standard (non-sRGB) render target.

**GLSL Example:**

```glsl
vec3 sceneColor = texture2DLod(uSceneColorMap, uv, 0.0).rgb;

#ifdef SCENE_COLORMAP_GAMMA
// Convert from gamma to linear space
sceneColor = decodeGamma(sceneColor);
#endif

// Now sceneColor is in linear space for lighting calculations
```

**WGSL Example:**

```wgsl
var sceneColor: vec3f = textureSampleLevel(uSceneColorMap, uSceneColorMapSampler, uv, 0.0).rgb;

#ifdef SCENE_COLORMAP_GAMMA
// Convert from gamma to linear space
sceneColor = decodeGamma3(sceneColor);
#endif

// Now sceneColor is in linear space for lighting calculations
```

The `decodeGamma()` and `decodeGamma3()` functions are built-in utility functions that perform the gamma-to-linear conversion using the standard gamma 2.2 curve.

For more information on linear workflow and color space handling, see the [Linear Workflow](/user-manual/graphics/linear-workflow/) documentation.

## CameraFrame Integration

When using [`CameraFrame`](/user-manual/graphics/posteffects/cameraframe/) for HDR post-processing, you can request depth and color maps through the [`rendering`](https://api.playcanvas.com/engine/classes/CameraFrame.html#rendering) settings:

- **Color Map**: Set `cameraFrame.rendering.sceneColorMap = true` to enable access to `uSceneColorMap` (e.g., for refraction or custom post-processing effects)
- **Depth Map**: Set `cameraFrame.rendering.sceneDepthMap = true` to enable access to `uSceneDepthMap` (e.g., for depth-dependent effects like custom fog or edge detection)

The color map in CameraFrame contains linear HDR values (no gamma correction needed), so the `SCENE_COLORMAP_GAMMA` define will not be set. This ensures consistent color space handling across different rendering configurations.

## Examples

These engine examples demonstrate the rendering of both the depth and the color map, and also custom shaders allowing their use:

- GrabPass demonstrates the use of the color buffer: [`GrabPass`](https://playcanvas.github.io/#/shaders/grab-pass)
- GroundFog demonstrates the use of the depth buffer: [`GroundFog`](https://playcanvas.github.io/#/shaders/ground-fog)
- Dispersion demonstrates refraction and chromatic dispersion using the scene color texture: [`Dispersion`](https://playcanvas.github.io/#/materials/dispersion)
