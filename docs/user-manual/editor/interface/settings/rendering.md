---
title: Rendering Settings
sidebar_label: Rendering
---

Controls lighting, resolution, and rendering features.

:::note

These settings affect all users on the currently active [branch](../../version-control/branches.md) of the project.

:::

Navigate to the `RENDERING` section and expand the panel:

![Rendering Settings](/img/user-manual/editor/interface/settings/rendering.webp)

Here is a breakdown of the available settings:

## Environment

| Setting | Description |
| --- | --- |
| **Ambient Color** | The color of the scene's ambient light, specified in sRGB color space. |
| **Skybox** | A cubemap asset rendered behind your 3D scene. Also used as the default environment map for physical materials when prefiltered. |
| **Type** | Select the projection used to render the skybox cubemap:<ul><li><strong>Infinite</strong>: Rendered at infinity</li><li><strong>Box</strong>: Mapped to a box mesh</li><li><strong>Dome</strong>: Mapped to a hemispherical dome</li></ul> |
| **Mesh Position / Rotation / Scale** | The position, rotation and scale of the sky mesh. |
| **Center** | The relative normalized offset of the sky from the ground. |
| **Intensity** | The skybox intensity, used to match exposure levels. |
| **Rotation** | Rotation of the skybox. |
| **Mip** | Mip level of the prefiltered skybox. Higher values select lower-resolution, more blurred mips. |

## Clustered Lighting

| Setting | Description |
| --- | --- |
| **Clustered Lighting** | Enable clustered lighting. |
| **Cells (X, Y, Z)** | Number of cells per world-space axis used to subdivide the space containing lights. |
| **Max Lights Per Cell** | Maximum number of lights a cell can store. |
| **Cookie Atlas Resolution** | Resolution of the atlas texture storing all non-directional cookie textures. |
| **Cookies Enabled** | Clustered lights support cookies. |
| **Shadows Enabled** | Clustered lights support shadows. |
| **Shadow Atlas Resolution** | Resolution of the atlas texture storing all non-directional shadow textures. |
| **Shadow Type** | The type of shadow filtering used by all shadows. |
| **Area Lights Enabled** | Clustered lights support area lights. |

## Exposure & Fog

| Setting | Description |
| --- | --- |
| **Exposure** | The exposure value tweaks the overall brightness of the scene. |
| **Fog** | Controls an approximation of ambient fog in your scene. Types:<ul><li><strong>None</strong>: Fog disabled</li><li><strong>Linear</strong>: Fades in linearly between Fog Start and Fog End distances</li><li><strong>Exp</strong>: Fades in from the view position according to an exponential function</li><li><strong>Exp2</strong>: Fades in from the view position according to an exponential squared function</li></ul> |
| **Fog Density** | Controls the rate at which fog fades in for Exp and Exp2 fog types. Larger values cause fog to fade in more quickly. Must be positive. |
| **Fog Start / End** | Distances, in scene units, where fog starts to fade in (start) and where it reaches maximum (end). |

## Resolution

| Setting | Description |
| --- | --- |
| **Resolution Width / Height** | The width/height of your application in pixels. |
| **Resolution Mode** | Decides whether the canvas resolution changes when it is resized. |
| **Fill Mode** | Decides how the canvas fills the browser window. |

## Device & API

| Setting | Description |
| --- | --- |
| **Device Order** | The order in which attempts are made to create the graphics devices. |
| **Enable WebGPU** | When enabled, the application will try to use WebGPU if available. |
| **Enable WebGL 2.0** | When enabled, the application will try to use WebGL 2.0 if available. |

## Rendering Options

| Setting | Description |
| --- | --- |
| **Power Preference** | Provides a hint to WebGL regarding the preferred power mode:<ul><li><strong>Default</strong>: Browser decides</li><li><strong>High Performance</strong>: Prioritize rendering performance</li><li><strong>Low Power</strong>: Prioritize power saving</li></ul> |
| **Anti-Alias** | When disabled, anti-aliasing is disabled for the back buffer. |
| **Device Pixel Ratio** | Multiplies the canvas back buffer resolution by the device pixel ratio (e.g., 2x on Retina). Increases sharpness and GPU/memory usage. |
| **Transparent Canvas** | Makes the canvas background transparent so the web page shows through. Useful for overlaying the app on custom page designs or UI. |
| **Preserve Drawing Buffer** | Preserves the drawing buffer until explicitly cleared. Useful for taking screenshots. |

## External Libraries

| Setting | Description |
| --- | --- |
| **Basis Library** | Add the necessary libraries to support Basis compression. |
| **Draco Library** | Add the necessary libraries to support Draco compression. |
