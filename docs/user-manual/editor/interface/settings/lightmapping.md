---
title: Lightmapping Settings
sidebar_label: Lightmapping
---

Controls baked lighting resolution, filtering, and ambient occlusion.

:::note

These settings affect all users on the currently active [branch](../../version-control/branches.md) of the project.

:::

Navigate to the `LIGHTMAPPING` section and expand the panel:

![Lightmapping Settings](/img/user-manual/editor/interface/settings/lightmapping.webp)

Here is a breakdown of the available settings:

## General

| Setting | Description |
| --- | --- |
| **Size Multiplier** | The resolution of auto-generated lightmap textures is based on the area of geometry in world space and the size multipliers of the model and scene. Changing this value affects lightmap resolution across the whole scene. |
| **Max Resolution** | Maximum resolution for auto-generated lightmap textures. |
| **Mode** | The lightmap baking mode:<ul><li><strong>Color Only</strong>: A single color lightmap</li><li><strong>Color and Direction</strong>: A color lightmap plus dominant light direction (used for bump/specular)</li></ul> |

## Filtering

| Setting | Description |
| --- | --- |
| **Filter** | Enable a bilateral filter on runtime-baked lightmaps. |
| **Range** | The range parameter of the bilateral filter. |
| **Smoothness** | The spatial parameter of the bilateral filter. |

## Ambient Bake

| Setting | Description |
| --- | --- |
| **Ambient Bake** | Bake ambient light into lightmaps. |
| **Samples** | Number of samples to use when baking ambient light. |
| **Sphere Part** | The portion of the sphere to include when baking ambient light. |
| **Occlusion Brightness** | Brightness of the baked ambient occlusion. |
| **Occlusion Contrast** | Contrast of the baked ambient occlusion. |
