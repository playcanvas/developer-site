---
title: Lightmapping Settings
sidebar_label: Lightmapping
---

Controls baked lighting resolution, filtering, and ambient occlusion.

:::note

These settings affect all users on the currently active [branch](../../version-control/branches.md) of the project.

:::

## General

| Setting | Description |
| --- | --- |
| **Size Multiplier** | Scales lightmap resolution per object. |
| **Max Resolution** | Maximum resolution for any single lightmap texture. |
| **Mode** | Data stored in the lightmap: `Color Only` or `Color and Direction`. |

## Filtering

| Setting | Description |
| --- | --- |
| **Filter** | Enables smoothing of baked lightmaps. |
| **Range** | Pixel radius of the smoothing effect. |
| **Smoothness** | Strength of light/shadow blending. |

## Ambient Bake

| Setting | Description |
| --- | --- |
| **Ambient Bake** | Enables ambient light baking. |
| **Samples** | Rays per texel for ambient bake. |
| **Sphere Part** | Fraction of the sphere used for sampling. |
| **Occlusion Brightness** | Brightness in occluded areas. |
| **Occlusion Contrast** | Contrast between lit and shadowed areas. |
