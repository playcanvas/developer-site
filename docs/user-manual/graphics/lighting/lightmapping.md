---
title: Lightmapping
---

[![PlayCanvas Lightmapping](/img/user-manual/graphics/lighting/lightmapping/playcanvas-lightmapping-scene.jpg)][13]
*The lighting in this scene is implemented using Lightmap and AO textures and Box Projected IBL (reflections)*

Here is the link to [final scene][13] and [project][14] that uses these techniques to achieve results in image above: External HDR Lightmaps (described in this page below), [Ambient Occlusion][12] and HDR Cubemap applied using Box Projection using [Image Based Lighting][11] technique to achieve realistic reflections.

## Overview {#overview}

Lightmap generation is the process of pre-calculating lighting information for a static scene and storing it in textures which are then applied on materials. This is an efficient way of lighting a scene if many of the light sources and geometry are static or environmental.

PlayCanvas offers two ways to use lightmaps in your scene: **External lightmap generation** using a 3rd-party tool and [**Runtime Lightmapping**][0] that can be generated automatically by the Engine on loading or later while application is running.

This page gives details and best practices on rendering lightmaps from external tools.

## External Lightmap Generation {#external-lightmap-generation}

Many 3D content tools have ways to generate lightmap textures. For example, 3ds Max, Maya, Blender and other tools all have ways to bake lightmaps into textures. The advantages of using an offline tool for lightmap generation is that you can use very sophisticated lighting calculations like Global Illumination for bounce lighting, soft shadows, ambient occlusion, etc. The major disadvantage is that you have to have a complete representation of your scene inside the 3D tool. So if your PlayCanvas scene is made up of lots of instances positioned in the Editor, you need to re-create this inside your lightmapping tool.

Once you have created lightmaps using an external tool you simply upload them as regular texture assets and they can be added to your materials using the lightmap slot in the standard Physical Material.

## Tools {#tools}

In this page we will use 3ds Max with VRay to generate lightmaps, but the same functionality is achievable with any other similar modeling tools.

## Gamma Correction {#gamma-correction}

When rendering Lightmaps or CubeMaps they should be rendered in Linear Space to ensure color curves are not affected by gamma correction twice. The PlayCanvas Engine will apply gamma correction during real-time rendering.

In 3ds Max this option (Enable Gamma/LUT Correction) should be disabled and can be found in Preference Settings (Customize > Preferences):

![3ds Max > Preferences > Linear Space](/img/user-manual/graphics/lighting/lightmapping/3ds-max-preferences.png)

Then make sure Color Mapping is updated. It can be found in Render Settings (F10, or from Render to Texture window). Output should not be clamped, and not post-processed (Mode option), Linear Multiply should be used for linear color space.
Here is a screenshot of what options should be set to what values, click the "Default" button to expand settings to "Expert":

![3D's Max > Render Settings](/img/user-manual/graphics/lighting/lightmapping/3ds-max-render-settings-color-mapping.png)

## UV Mapping {#uv-mapping}

In order to apply a lightmap texture on geometry we need to unwrap it first. Here are some practices that will help you to get good lightmap friendly UV's.

### Simple Geometry {#simple-geometry}

A smaller area of geometry is better. Try to minimize the area of triangles and eliminate non-visible triangles. A larger area will reduce lightmap detail, require larger textures and sometimes multiple assets.

![Lighmapping Tips: Simple Geometry](/img/user-manual/graphics/lighting/lightmapping/uv-geometry.jpg)

### Consistent Texel Size {#consistent-texel-size}

Keep texels in UV unstretched and consistent in size with other texels within same geometry. This is to ensure that level of detail in lightmap texture is consistent within the scene. Some variations of texel size could be applied when geometry will be seen from up close or in the far distance as required by artistic and optimization decisions.

![Lighmapping Tips: UV Consistent Texel Size](/img/user-manual/graphics/lighting/lightmapping/uv-consistency.jpg)

### Non-overlapping UV {#non-overlapping-uv}

Triangles in UV should not overlap to ensure each pixel has a unique position in 3D space on geometry so it can store its own illumination information appropriately. UV space for lightmaps is clamped, meaning that UV will be contained between 0.0 and 1.0 and will not tile outside.

![Lighmapping Tips: Non-overlapping UV](/img/user-manual/graphics/lighting/lightmapping/uv-overlapping.jpg)

## Other Tips {#other-tips}

To get good lightmap results we need to ensure that rendering is based only on data that is relevant to light propagation and not to the point of view of camera during rendering.

1. **Disable normal maps** on materials - micro surface details are too tiny to be relevant in lightmap textures.
2. Set **Reflection to 0** and **Disable Gloss Maps** on materials - reflection can lead to caustics and complications for renderers, leading to visual artifacts. Generally lightmaps should contain only diffuse lighting and reflectivity should be implemented using some runtime technique.
3. **Very dark materials won't produce good results** as they do not reflect light much and so will not assist Global Illumination.
4. In the Render To Texture window (see below) set **Padding** to larger value.
5. **Light can leak** from behind the geometry, add blocking geometry to prevent light.

![Lighmapping Light Leaking](/img/user-manual/graphics/lighting/lightmapping/lightmapping-light-leak.jpg)

## Render To Texture {#render-to-texture}

To get illumination data out of the modeling tool we want to render the light data into a texture. We can specify resolution and format for it.

In 3ds Max this is done using the Render To Texture window. Where Padding needs to be set to larger value; selected 2nd UV Channel; and Output profile depending on your renderer, in screenshot below `VRayRawTotalLightingMap` is used.

![Render To Texture: PlayCanvas Lightmapping](/img/user-manual/graphics/lighting/lightmapping/3ds-max-render-to-texture-window.png)

## Noise {#noise}

Depending on the quality and time of rendering in some situations the illumination data in the output might be not perfect and suffer from noise. This is easily solvable by applying some blur to the image that will not blur the edges in texture but will smoothen plain sections. In Photoshop this is done using Surface Blur filter:

![Lightmapping: Photoshop > Surface Blur](/img/user-manual/graphics/lighting/lightmapping/lightmapping-surface-blur.jpg)

## Upload to Editor {#upload-to-editor}

At this stage you have your geometry with a second UV channel (UV1) and HDR lightmap textures and it is time to upload them to your PlayCanvas scene and setup the materials. This is done by drag 'n' dropping the files or using the upload button in assets panel. After you've uploaded your geometry it will auto-generate materials. For each material that a lightmap is rendered for you need to set the lightmap texture. Simply select all required materials and drag'n'drop or pick lightmap texture for the Lightmap slot.

![PlayCanvas Editor: Material Lightmap Texture Slot](/img/user-manual/graphics/lighting/lightmapping/lightmapping-material-slot.png)

## Final remarks {#final-remarks}

Gamma correction, tone mapping and exposure - are good settings that you will want to play with to get the desired look and color for your scene.

You can [explore the example][13] that uses the techniques described above and also its [project][14].

[0]: /user-manual/graphics/lighting/runtime-lightmaps/
[11]: /user-manual/graphics/physical-rendering/image-based-lighting/
[12]: /user-manual/graphics/lighting/ambient-occlusion/
[13]: https://playcanv.as/p/zdkARz26/
[14]: https://playcanvas.com/project/446587/overview/archviz-example
