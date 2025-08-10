---
title: Rendering Settings
sidebar_label: Rendering
---

Controls lighting, resolution, and rendering features.

## Environment

| Setting | Description |
| --- | --- |
| **Ambient Color** | Global ambient light color. |
| **Skybox** | Environment skybox texture. |
| **Type** | Type of sky used for the background/environment. |
| **Mesh Position / Rotation / Scale** | Position, rotation and scale of a sky mesh when used. |
| **Center** | Relative normalized offset of the sky from the ground. |
| **Intensity** | Brightness of skybox lighting. |
| **Rotation** | Rotates the skybox on X/Y/Z. |
| **Mip** | Mip level of the skybox texture. |

## Lighting

| Setting | Description |
| --- | --- |
| **Clustered Lighting** | Enables clustered lighting. |
| **Cells (X, Y, Z)** | Number of lighting cells along each axis. |
| **Max Lights Per Cell** | Maximum lights per cell. |
| **Cookie Atlas Resolution** | Resolution of the atlas texture storing non-directional cookie textures. |
| **Cookies Enabled** | Enables light cookies. |
| **Shadows Enabled** | Toggles shadows globally. |
| **Shadow Atlas Resolution** | Shadow map resolution. |
| **Shadow Type** | Shadow filtering method. |
| **Area Lights Enabled** | Enables area lights. |

## Exposure & Fog

| Setting | Description |
| --- | --- |
| **Exposure** | Scene brightness multiplier. |
| **Fog** | Fog type. `None`, `Linear`, `Exp`, `Exp2`. |
| **Fog Density** | Rate at which fog fades in for Exp/Exp2 types. |
| **Fog Start / End** | Distances where fog begins and reaches maximum for Linear fog. |

## Resolution

| Setting | Description |
| --- | --- |
| **Resolution Width / Height** | Target render resolution. |
| **Resolution Mode** | How resolution is determined. |
| **Fill Mode** | Canvas scaling behavior. |

## Device & API

| Setting | Description |
| --- | --- |
| **Device Order** | Preferred rendering backend. |
| **Enable WebGPU** | Enables WebGPU. |
| **Enable WebGL 2.0** | Enables WebGL 2.0. |

## Rendering Options

| Setting | Description |
| --- | --- |
| **Power Preference** | GPU performance preference. |
| **Anti-Alias** | Enables MSAA. |
| **Device Pixel Ratio** | Uses native pixel ratio. |
| **Transparent Canvas** | Transparent background. |
| **Preserve Drawing Buffer** | Keeps frame buffer after presenting. |

## External Libraries

| Setting | Description |
| --- | --- |
| **Basis Library** | Import Basis texture compression. |
| **Draco Library** | Import Draco mesh compression. |
