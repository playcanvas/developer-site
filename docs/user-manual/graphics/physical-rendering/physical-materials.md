---
title: Physical Materials
---

To use Physically Based Rendering in PlayCanvas you will need to understand how the Physical Material is configured and what effect altering the various parameters will have.

In this section we'll talk about the most useful properties of the material and you can see in the live demos how altering them affects the appearance of a material.

First a note about Cubemaps and Workflows

## Image Based Lighting

[First up IBL][6], because inevitably you'll jump into the Editor and create Materials and wonder why your materials don't look the like the samples below. **Physical Materials with an HDR Prefiltered CubeMap look great!**

## Metalness and Specular Workflow

![Workflows](/img/user-manual/graphics/physical-rendering/specular-metalness-workflows.png)

PBR is often split into two different methods of building assets or workflows. The two workflows are equivalent and offer the same results. It is really down to your preference as to which you choose. At PlayCanvas we usually choose the "metalness" flow as we find the metalness map simpler to create and is as it is only a single channel it is usually more efficient.

The **metalness** workflow involves setting a metalness value or creating a metalness map which determines which areas of the material are metal or non-metal. Usually this is a simple binary choice. 1 for metal, 0 for non-metal. It is not often that you have a value between the two.

The **specular** workflow involves setting a specular value or creating a specular map which determines the color and intensity of the reflected light for your material.

There is a good explanation of the differences on the [Marmoset Toolbag blog][5].

On to materials...

## Material Properties and Maps

### Diffuse

The Diffuse Color is the base color of the material. This is an RGB color value. For clean pure (metal, plastic) substances this can be a constant value but it can also be supplied as a diffuse map texture. Note, you should usually avoid including lighting detail (shadows or highlights) in your diffuse map as this can be applied in other maps.

It can also be known as **albedo** or **base color**.

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/Q28EwTwQ/?color" title="Physical Materials - Diffuse" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

You can often find the charts of recorded values for diffuse/albedo values on the internet.

![Metals](/img/user-manual/graphics/physical-rendering/metals.jpg)

| Material | RGB                                      |
|----------|------------------------------------------|
| Gold     | (1.000, 0.766, 0.336) or [255, 195, 86]  |
| Silver   | (0.972, 0.960, 0.915) or [248, 245, 233] |
| Copper   | (0.955, 0.637, 0.538) or [244, 162, 137] |

### Metalness

The metalness value is part of the **metalness** workflow. Metalness is a single value between 0-1 which determines if a material is metal (1) or non-metal (0).

:::note

The metalness value should almost always be 0 or 1. It is rare that you will need a value somewhere between these two.

:::

You can also supply a metalness map which lets you define specific areas of your material as metal or non-metal.

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/Q28EwTwQ/?metal" title="Physical Materials - Metalness" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

### Glossiness

Glossiness is used in both  **metalness** and **specular** workflows and it defines how smooth your material surface is. The glossiness will affect how blurry or sharp the reflections on the material are, or how broad or narrow the specular highlights are. Glossiness is provided as a single value between 0-100 or a glossiness map.

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/Q28EwTwQ/?gloss" title="Physical Materials - Glossiness" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

Some PBR systems use **Roughness** instead of Glossiness. The roughness is the inverse of the glossiness. If you need to convert a roughness map to a glossiness map, simply invert it.

Sometimes glossiness and roughness are referred to as the **microsurface** value.

### All together

These three properties **diffuse**, **metalness** and **glossiness** are the core of the physical material system. You can try different combinations in the live demo below.

There are many other additional properties to investigate that can be used to make great materials such as Ambient Occlusion, Emissive, Opacity, Normal and Height maps.

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/Q28EwTwQ/" title="Physical Materials - All" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

[5]: https://marmoset.co/posts/pbr-texture-conversion/
[6]: /user-manual/graphics/physical-rendering/image-based-lighting/
