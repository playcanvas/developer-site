---
title: Ambient Occlusion
---

Ambient Occlusion is a technique to approximate how much light gets onto the surface based on its occlusion by the environment.

In PlayCanvas, ambient lighting is multiplied by the AO map, both diffuse and specular.

![Ambient Occlusion comparison: without/with](/img/user-manual/graphics/lighting/lightmapping/model-ao-comparison.jpg)  
*Left: without AO; Right: with Global AO*

AO map can be of different scale. E.g. a texture detail AO, showing surface crevices or a world-scale AO with large shadowing effect of different parts of the model. Large-scale AO will give more effect, it usually matches lightmaps on UV1, and is more important.

## Rendering Global AO

Rendering AO can be done using popular 3D modelling and archviz tools. It is practically same as rendering Lightmap that is described in [Lightmapping Section][0].

With few small differences where special material is applied on all geometry that will paint it so it looks like AO, and different settings during rendering into texture.

In 3D's Max with VRay it is done by creating a material of **VRayDirt** type and **Ambient Occlusion** mode, where **radius** can be changed to get desirable results.

![3D's Max: Ambient Occlusion VRay Material](/img/user-manual/graphics/lighting/lightmapping/3ds-max-ao-rendering.png)

This material should be applied on all static geometry that have to be in ambient occlusion map. In 3D's Max this can be done either by manually applying it on individual objects or by using VRay Render Settings, using **Override mtl** property. This way individual materials are preserved and it makes life easier.

![3D's Max VRay Render Settings: Override mtl](/img/user-manual/graphics/lighting/lightmapping/3ds-max-vray-override-mtl.png)

Then we need to get this data out into the texture. In 3D's Max this is done by using [Render To Texture][3], same as during Lightmapping rendering, except **output** option should be using **VRayCompleteMap**.

AO Texture does not need to store very detailed information, and visually does not suffers from texture compression artifacts much. So JPEG is economical and is suitable format for it.

## Upload to Editor

Simply upload texture in Editor and apply it on Ambient Occlusion slot on materials.

![Editor Ambient Occlusion Map](/img/user-manual/graphics/lighting/lightmapping/editor-ao-map.png)

## Example

You can [explore example][6] that uses global Ambient Occlusion described above and its [project][7].

[![PlayCanvas Lightmapping](/img/user-manual/graphics/lighting/lightmapping/playcanvas-lightmapping-scene.jpg)][6]  
*The lighting in this scene is implemented using Lightmap and AO textures and Box Projected IBL (reflections)*

[0]: /user-manual/graphics/lighting/lightmapping/
[3]: /user-manual/graphics/lighting/lightmapping#render-to-texture
[6]: https://playcanv.as/p/zdkARz26/
[7]: https://playcanvas.com/project/446587/overview/archviz-example
