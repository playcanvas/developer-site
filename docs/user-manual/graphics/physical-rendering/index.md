---
title: Physically Based Rendering
---

![Star-Lord](/img/user-manual/graphics/physical-rendering/star-lord.jpg)  
*Star-Lord Model by [Joachim Coppens][2]*

Physically based rendering (PBR) is a combination of artist workflow, measured physical properties and material shaders that work together to bring order and consistency to graphics rendering. Using the underlying physical principles of how light and surfaces interact we can create predictable visuals which work in all lighting conditions without special cases.

## Fundamental Principles

Below, we'll try and summarize the basic principles behind how physically based shaders calculate the lighting. In the next sections we'll cover in more detail the specifics of how physically based rendering can be used with in PlayCanvas.

## Diffuse & Specular

Diffuse and Specular (or reflected) light are the two terms that describe two main types of interaction between light and a material. Specular light refers to light which has bounced off the surface. On a smooth surface this light will reflect all the in same direction and the surface will appear mirror-like. Diffuse light is light that has been absorbed, scattered in the material and re-emerged. This light tends to be uniform in direction unlike specular light. During this absorbing and re-emerging some light wavelengths will be absorbed. The wavelengths that are not absorbed give the material its color. For example, if all blue and green wavelengths are absorbed, the material will appear red. In rendering terms, diffuse color is sometimes known as "albedo" or "base color".

## Energy Conservation

![Energy Conservation](/img/user-manual/graphics/physical-rendering/energy-conservation.jpg)
*Smooth surfaces have small bright patches, rough surfaces have large dim patches*

One of the key features of physically correct rendering is that of Energy Conservation. Derived from the fact that the diffuse light and the reflected light all come from the light hitting the material, the sum of diffuse and reflected light can not be more than the total light hitting the material. In practice this means that if a surface is highly reflective it will show very little diffuse color. And the opposite, if a material has a bright diffuse color, it can not reflect much.

The joy of PBR is that energy conservation is included in the shader, so as an artist you don't have to think about it. It just works!

## Metals & Non-metals

![Metals & Non-metals](/img/user-manual/graphics/physical-rendering/materials.jpg)

One thing that's new with PBR versus older shading models is thinking about what a material is made of in order to determine its behavior. The main thing we consider here is whether the material is a conductor (usually a metal) or an insulator (a non-metal).

The reason this is important is it determines many factors about how the material responds to light. For example, metals are generally reflective (between 60%-90%) where as non-metals are not (0%-20%). Secondly, reflections on non-metals are usually white where as metals will usually reflect the same color as the diffuse.

Because of these differences one of the PBR workflows includes a **metalness** property which makes this stuff simple by defining a material as either a metal, or a non-metal. More on metalness workflow in the following sections.

## Fresnel

Fresnel is a term that you don't really have to know about to work with PBR in PlayCanvas, but it will give you a better view of how materials behave if you do.

All you need to know about Fresnel is it means that the angle at which you are viewing a surface influences how reflective that surface appears. If the surface is almost edge on to your view, it will be almost completely reflective.

## Microsurface

Finally onto microsurface. Generally, 3D artists are familiar with the idea of normal maps. Textures that modify the direction of the surface they are applied to. Microsurface, otherwise known as roughness or glossiness, provides a similar thing, only on a much smaller scale. The microsurface of a material describes how rough or smooth a surface is. Compare glass (high glossiness, low roughness) to sandpaper (high roughness, low glossiness). We're not specifying the exact direction the surface faces, just the general idea of rough or smooth.

Some PBR systems use Roughness, some use Glossiness, they are the same thing. Roughness is the inverse of Glossiness and vice versa. If you want to convert from one to the other, simply invert the texture or value.

[Next: Physical Materials][6]

*More reading is available in the great Marmoset Toolbag's [PBR Theory][5] article.*

[2]: https://www.joachimcoppens.com/
[5]: https://www.marmoset.co/toolbag/learn/pbr-theory
[6]: /user-manual/graphics/physical-rendering/physical-materials
