---
title: Lighting
---

Lighting a scene is the process of calculating the color or shading of a pixel render to the screen based on the material properties of the surface and the light sources that are applied to that material.

In PlayCanvas, lighting can be broadly divided up into two basic categories: dynamic lights and lightmaps.

## Dynamic Lights

Lighting calculations that are performed at runtime are classed as dynamic. Every frame the engine calculates the amount of light falling on a surface from the type, position and properties of Light Entities and uses this to color the material.

## Lightmaps

For lights and geometry that does not move, it is often preferable to determine the lighting information in advance. This information is then saved into lightmap textures which are applied to the surface materials. This method has a very low runtime cost at the expense of having static lighting which can not change and pre-computation times.

There are two methods of creating lightmaps:

### External Lightmap Generation

Many 3D creation tools have lightmap generation included or available as an add-on, including 3DS Max, Maya and Blender. These tools generally generate lightmap textures which can be uploaded as regular assets and added to the Lightmap slot in the standard Physical Material.

### PlayCanvas Runtime Lightmap Generation

The PlayCanvas Engine has built in lightmap generation. This can be used to generate lightmaps automatically just before your game runs. With this method you can use the standard light components, make changes and preview your scene directly in the Editor.
