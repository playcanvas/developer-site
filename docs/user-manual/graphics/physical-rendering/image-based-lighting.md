---
title: Image Based Lighting
---

To get best results with Physically Based Rendering in PlayCanvas you can use the technique called Image Based Lighting or IBL, it allows to use pre-rendered image data as source information for ambient and reflection light.

This technique relies on [CubeMap][3] - the environment map that is made of 6 texture (faces) forming a cube to have full surround texture coverage.

## HDR

Image data can be stored in LDR or HDR (High Dynamic Range) color space, which allows to store more than 0.0 to 1.0 (256 gradations) in single channel. HDR allows to store values above 1.0 (what is considered "white"), with combination of many factors of environment such as gamma correction, tone mapping and exposure  it allows to contain more light details and provide much better control over light quality and desirable results to artists.

![HDR vs LDR CubeMap for Image Based Rendering](/img/user-manual/graphics/physical-rendering/ibl-hdr-ldr.jpg)

Notice how bright parts in the texture are clamped using LDR.

## Energy Conservation

The concept is derived from the fact that the diffuse light and the reflected light all come from the light hitting the material, the sum of diffuse and reflected light can not be more than the total light hitting the material. In practice this means that if a surface is highly reflective it will show very little diffuse color. And the opposite, if a material has a bright diffuse color, it can not reflect much.

In nature, smoother surfaces have sharper reflections and rougher surfaces have blurrier. The reason for that is basically that rougher surfaces have larger, more prominent microfacets, reflecting light in many directions, while smooth surfaces tend to reflect it mostly in one direction. When light coming from different directions is averaged inside a tiny visible point, the result looks blurry to us, and also less bright, thanks to energy conservation. PlayCanvas simulates this behavior with the glossiness parameter, which works automatically for lights, however, for IBL we must precalculate the correct blurred response in advance. This is what the Prefilter button does.

**Prefilter** button is available on CubeMap asset in the Inspector, it is mandatory to enable IBL on physical materials using a CubeMap.

## Authoring Environment Maps

Environment Maps comes in different projections: equirectangular, CubeMap (face list), azimuthal and many others. WebGL and GPU works with face list - set of 6 textures representing sides of a cube - CubeMap. So environment map should be converted into 6 textures if it comes in any other projection.

In order to convert between projections you can use various tools, one of them is cross-platform open-source CubeMap filtering tool: [cmftStudio][0].

CubeMaps can be CGI rendered or assembled from photography, and there are websites to download/buy HDR environment maps. Some of good sources for experimenting can be: [sIBL Archive][6], [No Emotion HDR's][10], [Open Footage][11], [Paul Debevec][12]. Environment maps can come in equirectangular projection and convertible by cmftStudio mentioned above.

## Rendering CubeMap

CubeMap is made of 6 faces, each representing square side of a cube, simply put: it can be rendered using square viewport camera, by rotating it in different 90 degrees directions with 90 degrees field of view.

![CubeMap Faces](/img/user-manual/graphics/physical-rendering/cubemap-faces.jpg)

You can use popular 3D modelling tools, or photography and 360 Imagery software. They should be rendered in linear gamma space and without color corrections that is described in [Lightmapping Gamma Correction section][1].

One of the plugins for 3D Studio Max such as [this][2] can be used to render VRay CubeMap Faces, ready to be uploaded into PlayCanvas Editor.

## Applying IBL

This can be done using two methods:

1. Use CubeMap as Skybox in Scene Settings.
2. Use CubeMap as environment map on the Material directly.

## Box Projection Mapping

This technique changes the projection of environment map which allows to specify box within the space so CubeMap corresponds to its bounds. The most common use is to simulate reflections on surfaces within room scale environment.

![Material CubeMap Box Projection](/img/user-manual/graphics/physical-rendering/cubemap-box-projection.png)

## Example

Here is an [example][7] and [project][8] of the scene using CubeMap Box Projection. Notice the reflection on the wooden floor from the windows and the subtle reflection on the ceiling, as well as the reflection of the room on the metal PlayCanvas logo on the wall on the right. This is a dynamic effect and can provide very realistic reflections and control to the artist of how surfaces reflect the room environment.

[![Environment Box Projection Mapping](/img/user-manual/graphics/lighting/lightmapping/playcanvas-lightmapping-scene.jpg)][7]

The lighting in this scene is implemented using Lightmap and AO textures and Box Projected IBL (reflections).

[0]: https://github.com/dariomanesku/cmftStudio
[1]: /user-manual/graphics/lighting/lightmapping/#gamma-correction
[2]: http://www.scriptspot.com/3ds-max/scripts/vray-cubemap-generator-for-unity
[3]: /user-manual/assets/types/cubemap/
[6]: http://www.hdrlabs.com/sibl/archive.html
[7]: https://playcanv.as/p/zdkARz26/
[8]: https://playcanvas.com/project/446587/overview/archviz-example
[10]: http://noemotionhdrs.net/
[11]: https://www.openfootage.net/?tag=hdri
[12]: https://www.pauldebevec.com/Probes/
