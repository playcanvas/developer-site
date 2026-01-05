---
title: HDR Rendering
---

High Dynamic Range (HDR) rendering significantly enhances visual realism in computer graphics by capturing and displaying a broader spectrum of light and color. This technique ensures that both the brightest highlights and the deepest shadows retain their details, offering a more lifelike representation of scenes. One notable advantage of HDR rendering is its ability to produce physically based bloom effects, where intense light sources naturally bleed into surrounding areas, mimicking real-world camera and eye behavior. Additionally, HDR rendering facilitates more accurate reflections and refractions, as it allows for light values that exceed the standard displayable range, resulting in visuals that are both striking and true to life.

![HDR](/img/user-manual/graphics/linear-workflow/hdr.webp)

## Camera Settings

The camera provides two key settings for handling HDR rendering:

- **gammaCorrection**
- **toneMapping**

These settings can be configured based on the rendering mode.

### LDR (Low Dynamic Range)

- **toneMapping**: For LDR rendering, you can select any tone mapping method to achieve the desired visual style. The tone mapping compresses HDR values into displayable LDR values.
- **gammaCorrection**: Set to `GAMMA_SRGB` to indicate that the output should be stored in gamma space, as it represents colors.
  - If the output pixel format is sRGB, gamma correction is handled by the hardware.
  - Otherwise, gamma encoding is applied in shader code.

### HDR (High Dynamic Range)

For HDR rendering, the goal is to preserve HDR color information:

- **toneMapping**: Set to `TONEMAP_LINEAR` to maintain HDR colors.
- **gammaCorrection**: Disable by setting to `GAMMA_NONE`.
- Ensure that a compatible HDR pixel format is used for the render target. This format can be obtained using the `GraphicsDevice.getRenderableHdrFormat()` API.

### HDR Display Output

When rendering in HDR mode, an HDR display output can be enabled by configuring the `Application` with the `displayFormat` parameter set to `DISPLAYFORMAT_HDR`.

- **toneMapping**: If HDR output is supported, set to `TONEMAP_NONE`.
- **gammaCorrection**: Keep set to `GAMMA_SRGB` to ensure low-intensity values remain visually similar to LDR rendering.
- After the device has been created, check if HDR display output is supported using `GraphicsDevice.isHdr()`. Note that for `isHdr()` to return `true`, the browser must be running on a display that supports HDR output.

**Note:** Currently, HDR display output is only supported by WebGPU. On other platforms, `GraphicsDevice.isHdr()` will always return `false`.

## PlayCanvas Engine - CameraFrame Class

The PlayCanvas Engine offers a comprehensive rendering setup through the `CameraFrame` class, which integrates advanced effects such as High Dynamic Range (HDR) rendering, bloom, Screen Space Ambient Occlusion (SSAO), and more. This setup enhances visual fidelity by simulating realistic lighting and post-processing effects.

### Key Features of CameraFrame

- **Bloom**: Simulates the scattering of light to create a glow around bright areas.
- **SSAO**: Enhances depth perception by simulating ambient light occlusion in crevices and corners.
- **Depth of Field (DoF)**: Mimics camera focus effects, blurring objects outside the focal plane.
- **Temporal Anti-Aliasing (TAA)**: Reduces visual artifacts by smoothing jagged edges over time.
- **Vignette**: Darkens the image's corners to draw attention to the center.
- **Color Grading**: Adjusts the color balance for stylistic effects.

### Configuring CameraFrame on a Camera

```javascript
const cameraFrame = new pc.CameraFrame(app, cameraEntity.camera);
cameraFrame.rendering.toneMapping = pc.TONEMAP_NEUTRAL;
cameraFrame.rendering.samples = 4;
cameraFrame.bloom.enabled = true;
cameraFrame.bloom.intensity = 0.01;
cameraFrame.update();
```

For HDR bloom to be effective, the scene should include bright light sources. This is typically achieved using emissive materials with high intensity. For example:

```javascript
material.emissive = pc.Color.YELLOW;
material.emissiveIntensity = 50;
```

For more detailed information, refer to the CameraFrame [API documentation](https://api.playcanvas.com/engine/classes/CameraFrame.html).

## CameraFrame in the Editor

There is a `CameraScript` [available here](https://github.com/playcanvas/engine/blob/main/scripts/esm/camera-frame.mjs) for the PlayCanvas Editor project. This script integrates `CameraFrame` functionality directly into the Editor's Inspector, making it easy to set up and configure cameras with advanced rendering features.

### Instructions on Use

1. Add the `CameraScript` into your project and parse it.
2. Add it to an entity that has the `CameraComponent`.
3. Use the Inspector to configure the rendering settings for the camera, such as tone mapping, bloom, SSAO, and other effects.

This integration streamlines the process of setting up complex camera effects and enhances the overall workflow within the PlayCanvas Editor.

![CameraFrame Script](/img/user-manual/graphics/linear-workflow/camera-frame.png)

## CameraFrame Tips

- HDR bloom requires at least one renderable float format (e.g., RG11B10, RGBA16F, or RGBA32F). If none of these formats are supported by the device, HDR bloom is automatically disabled.
- The `toneMapping` property of `StandardMaterial` is ignored. Tonemapping is applied as a full-screen post-processing pass, so per-mesh tonemapping control is not possible.
- When using `CameraFrame`, two properties control tonemapping:
  - `CameraFrame.rendering.toneMapping` – Controls tonemapping for the 3D scene rendered within the `CameraFrame`.
  - `CameraComponent.toneMapping` – Controls tonemapping applied after the 3D scene including post-processing is rendered. This typically affects UI elements rendered on top.
- When using `CameraFrame`, you may notice differences in the intensity of alpha-blended geometry. This occurs because blending takes place in linear HDR space, which is more physically accurate than blending in gamma space. As a result, you may need to adjust material properties related to alpha blending.
