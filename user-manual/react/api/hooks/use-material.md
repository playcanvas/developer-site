# `useMaterial`

The `useMaterial` hook allows you to create and manage a PlayCanvas [StandardMaterial](https://api.playcanvas.com/engine/classes/StandardMaterial.html) instance. Create a material with the hook and apply it to a [`<Render/>`](https://developer.playcanvas.com/user-manual/react/api/render.md) component.

## Usage

You can create a material with the hook and apply it to a [`<Render/>`](https://developer.playcanvas.com/user-manual/react/api/render.md) component and update material properties dynamically.

**Set material properties dynamically**

```jsx title="material-example.jsx"
import { Entity } from '@playcanvas/react';
import { Render } from '@playcanvas/react/components';
import { useMaterial } from '@playcanvas/react/hooks';
import { useControls } from 'leva';

const vars = {
    diffuse: { value: '#000000' },
    metalness: { value: 1, min: 0, max: 1, step: 0.01 },
    gloss: { value: 0.5, min: 0, max: 1, step: 0.01 },
    // emissive: { value: '#000000' },
    // emissiveIntensity: { value: 0, min: 0, max: 2, step: 0.01 },
    // specular: { value: '#ffffff' },
    // shininess: { value: 30, min: 0, max: 100, step: 1 },
    // reflectivity: { value: 0.5, min: 0, max: 1, step: 0.01 },
    // clearCoat: { value: 0, min: 0, max: 1, step: 0.01 },
    // clearCoatRoughness: { value: 0, min: 0, max: 1, step: 0.01 }
};

// ↑ imports hidden
export const MaterialExample = () => {
    const materialProps = useControls(vars);
    const material = useMaterial({ 
      useMetalness: true,
      glossInvert: true,
      ...materialProps 
    });


    return (
      <Entity>
          <Render type="box" material={material} />
      </Entity>
    );
};
```

## Parameters

The hooks accepts an object with the following properties that closely match those of the [`StandardMaterial`](https://api.playcanvas.com/engine/classes/StandardMaterial.html) class.

**Parameters**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `userAttributes?` | `Map<any, any>` | - |  |
| `onUpdateShader?` | `UpdateShaderCallback \| undefined` | - | A custom function that will be called after all shader generator properties are collected and before shader code is generated. This function will receive an object with shader generator settings (based on current material and scene properties), that you can change and then return. Returned value will be used instead. This is mostly useful when rendering the same set of objects, but with different shader variations based on the same material. For example, you may wish to render a depth or normal pass using textures assigned to the material, a reflection pass with simpler shaders and so on. These properties are split into two sections, generic standard material options and lit options. Properties of the standard material options are StandardMaterialOptions and the options for the lit options are LitShaderOptions. |
| `shaderOptBuilder?` | `StandardMaterialOptionsBuilder` | - |  |
| `alphaFade?` | `number` | - | Used to fade out materials when opacityFadesSpecular is set to false. |
| `ambient?` | `string` | - | The ambient color of the material, specified in sRGB color space. This color value is 3-component (RGB), where each component is between 0 and 1. |
| `anisotropyIntensity?` | `number` | - | Defines amount of anisotropy. Requires enableGGXSpecular is set to true. - When anisotropyIntensity == 0, specular is isotropic. - Specular anisotropy increases as anisotropyIntensity value increases to maximum of 1. |
| `anisotropyRotation?` | `number` | - | Defines the rotation (in degrees) of anisotropy. |
| `anisotropyMap?` | `Texture \| null` | - | The anisotropy map of the material (default is null). |
| `anisotropyMapOffset?` | `[number, number]` | - | Controls the 2D offset of the anisotropy map. Each component is between 0 and 1. |
| `anisotropyMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the anisotropy map. |
| `anisotropyMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the anisotropy map. |
| `anisotropyMapUv?` | `number` | - | Anisotropy map UV channel. |
| `aoIntensity?` | `number` | - | Ambient occlusion intensity. Defaults to 1. |
| `aoMap?` | `Texture \| null` | - | The main (primary) baked ambient occlusion (AO) map (default is null). Modulates ambient color. |
| `aoMapChannel?` | `string` | - | Color channel of the main (primary) AO map to use. Can be "r", "g", "b" or "a". |
| `aoMapOffset?` | `[number, number]` | - | Controls the 2D offset of the main (primary) AO map. Each component is between 0 and 1. |
| `aoMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the main (primary) AO map. |
| `aoMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the main (primary) AO map. |
| `aoMapUv?` | `number` | - | Main (primary) AO map UV channel |
| `aoDetailMap?` | `Texture \| null` | - | The detail (secondary) baked ambient occlusion (AO) map of the material (default is null). Will only be used if main (primary) ao map is non-null. |
| `aoDetailMapChannel?` | `string` | - | Color channels of the detail (secondary) AO map to use. Can be "r", "g", "b" or "a" (default is "g"). |
| `aoDetailMapOffset?` | `[number, number]` | - | Controls the 2D offset of the detail (secondary) AO map. Each component is between 0 and 1. |
| `aoDetailMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the detail (secondary) AO map. |
| `aoDetailMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the detail (secondary) AO map. |
| `aoDetailMapUv?` | `number` | - | Detail (secondary) AO map UV channel. |
| `aoDetailMode?` | `string` | - | Determines how the main (primary) and detail (secondary) AO maps are blended together. Can be: - DETAILMODE_MUL: Multiply together the primary and secondary colors. - DETAILMODE_ADD: Add together the primary and secondary colors. - DETAILMODE_SCREEN: Softer version of DETAILMODE_ADD. - DETAILMODE_OVERLAY: Multiplies or screens the colors, depending on the primary color. - DETAILMODE_MIN: Select whichever of the primary and secondary colors is darker, component-wise. - DETAILMODE_MAX: Select whichever of the primary and secondary colors is lighter, component-wise. Defaults to DETAILMODE_MUL. |
| `aoVertexColor?` | `boolean` | - | Use mesh vertex colors for AO. If aoMap is set, it'll be multiplied by vertex colors. |
| `aoVertexColorChannel?` | `string` | - | Vertex color channels to use for AO. Can be "r", "g", "b" or "a". |
| `bumpiness?` | `number` | - | The bumpiness of the material. This value scales the assigned main (primary) normal map. It should be normally between 0 (no bump mapping) and 1 (full bump mapping), but can be set to e.g. 2 to give even more pronounced bump effect. |
| `clearCoat?` | `number` | - | Defines intensity of clearcoat layer from 0 to 1. Clearcoat layer is disabled when clearCoat == 0. Default value is 0 (disabled). |
| `clearCoatBumpiness?` | `number` | - | The bumpiness of the clearcoat layer. This value scales the assigned main clearcoat normal map. It should be normally between 0 (no bump mapping) and 1 (full bump mapping), but can be set to e.g. 2 to give even more pronounced bump effect. |
| `clearCoatGlossInvert?` | `boolean` | - | Invert the clearcoat gloss component (default is false). Enabling this flag results in material treating the clear coat gloss members as roughness. |
| `clearCoatGlossMap?` | `Texture \| null` | - | Monochrome clearcoat glossiness map (default is null). If specified, will be multiplied by normalized 'clearCoatGloss' value and/or vertex colors. |
| `clearCoatGlossMapChannel?` | `string` | - | Color channel of the clearcoat gloss map to use. Can be "r", "g", "b" or "a". |
| `clearCoatGlossMapOffset?` | `[number, number]` | - | Controls the 2D offset of the clearcoat gloss map. Each component is between 0 and 1. |
| `clearCoatGlossMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the clear coat gloss map. |
| `clearCoatGlossMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the clearcoat gloss map. |
| `clearCoatGlossMapUv?` | `number` | - | Clearcoat gloss map UV channel. |
| `clearCoatGlossVertexColor?` | `boolean` | - | Use mesh vertex colors for clearcoat glossiness. If clearCoatGlossMap is set, it'll be multiplied by vertex colors. |
| `clearCoatGlossVertexColorChannel?` | `string` | - | Vertex color channel to use for clearcoat glossiness. Can be "r", "g", "b" or "a". |
| `clearCoatGloss?` | `number` | - | Defines the clearcoat glossiness of the clearcoat layer from 0 (rough) to 1 (mirror). |
| `clearCoatMap?` | `Texture \| null` | - | Monochrome clearcoat intensity map (default is null). If specified, will be multiplied by normalized 'clearCoat' value and/or vertex colors. |
| `clearCoatMapChannel?` | `string` | - | Color channel of the clearcoat intensity map to use. Can be "r", "g", "b" or "a". |
| `clearCoatMapOffset?` | `[number, number]` | - | Controls the 2D offset of the clearcoat intensity map. Each component is between 0 and 1. |
| `clearCoatMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the clearcoat intensity map. |
| `clearCoatMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the clearcoat intensity map. |
| `clearCoatMapUv?` | `number` | - | Clearcoat intensity map UV channel. |
| `clearCoatNormalMap?` | `Texture \| null` | - | The clearcoat normal map of the material (default is null). The texture must contains normalized, tangent space normals. |
| `clearCoatNormalMapOffset?` | `[number, number]` | - | Controls the 2D offset of the main clearcoat normal map. Each component is between 0 and 1. |
| `clearCoatNormalMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the main clearcoat map. |
| `clearCoatNormalMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the main clearcoat normal map. |
| `clearCoatNormalMapUv?` | `number` | - | Clearcoat normal map UV channel. |
| `clearCoatVertexColor?` | `boolean` | - | Use mesh vertex colors for clearcoat intensity. If clearCoatMap is set, it'll be multiplied by vertex colors. |
| `clearCoatVertexColorChannel?` | `string` | - | Vertex color channel to use for clearcoat intensity. Can be "r", "g", "b" or "a". |
| `cubeMap?` | `Texture \| null` | - | The cubic environment map of the material (default is null). This setting overrides sphereMap and will replace the scene lighting environment. |
| `cubeMapProjection?` | `number` | - | The type of projection applied to the cubeMap property: - CUBEPROJ_NONE: The cube map is treated as if it is infinitely far away. - CUBEPROJ_BOX: Box-projection based on a world space axis-aligned bounding box. Defaults to CUBEPROJ_NONE. |
| `cubeMapProjectionBox?` | `BoundingBox` | - | The world space axis-aligned bounding box defining the box-projection used for the cubeMap property. Only used when cubeMapProjection is set to CUBEPROJ_BOX. |
| `diffuse?` | `string` | - | The diffuse color of the material, specified in sRGB color space. This color value is 3-component (RGB), where each component is between 0 and 1. Defines basic surface color (aka albedo). |
| `diffuseDetailMap?` | `Texture \| null` | - | The detail (secondary) diffuse map of the material (default is null). Will only be used if main (primary) diffuse map is non-null. |
| `diffuseDetailMapChannel?` | `string` | - | Color channels of the detail (secondary) diffuse map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `diffuseDetailMapOffset?` | `[number, number]` | - | Controls the 2D offset of the detail (secondary) diffuse map. Each component is between 0 and 1. |
| `diffuseDetailMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the detail (secondary) diffuse map. |
| `diffuseDetailMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the detail (secondary) diffuse map. |
| `diffuseDetailMapUv?` | `number` | - | Detail (secondary) diffuse map UV channel. |
| `diffuseDetailMode?` | `string` | - | Determines how the main (primary) and detail (secondary) diffuse maps are blended together. Can be: - DETAILMODE_MUL: Multiply together the primary and secondary colors. - DETAILMODE_ADD: Add together the primary and secondary colors. - DETAILMODE_SCREEN: Softer version of DETAILMODE_ADD. - DETAILMODE_OVERLAY: Multiplies or screens the colors, depending on the primary color. - DETAILMODE_MIN: Select whichever of the primary and secondary colors is darker, component-wise. - DETAILMODE_MAX: Select whichever of the primary and secondary colors is lighter, component-wise. Defaults to DETAILMODE_MUL. |
| `diffuseMap?` | `Texture \| null` | - | The main (primary) diffuse map of the material (default is null). |
| `diffuseMapChannel?` | `string` | - | Color channels of the main (primary) diffuse map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `diffuseMapOffset?` | `[number, number]` | - | Controls the 2D offset of the main (primary) diffuse map. Each component is between 0 and 1. |
| `diffuseMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the main (primary) diffuse map. |
| `diffuseMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the main (primary) diffuse map. |
| `diffuseMapUv?` | `number` | - | Main (primary) diffuse map UV channel. |
| `diffuseVertexColor?` | `boolean` | - | Multiply diffuse by the mesh vertex colors. |
| `diffuseVertexColorChannel?` | `string` | - | Vertex color channels to use for diffuse. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `emissive?` | `string` | - | The emissive color of the material, specified in sRGB color space. This color value is 3-component (RGB), where each component is between 0 and 1. |
| `emissiveIntensity?` | `number` | - | Emissive color multiplier. |
| `emissiveMap?` | `Texture \| null` | - | The emissive map of the material (default is null). Can be HDR. When the emissive map is applied, the emissive color is multiplied by the texel color in the map. Since the emissive color is black by default, the emissive map won't be visible unless the emissive color is changed. |
| `emissiveMapChannel?` | `string` | - | Color channels of the emissive map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `emissiveMapOffset?` | `[number, number]` | - | Controls the 2D offset of the emissive map. Each component is between 0 and 1. |
| `emissiveMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the emissive map. |
| `emissiveMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the emissive map. |
| `emissiveMapUv?` | `number` | - | Emissive map UV channel. |
| `emissiveVertexColor?` | `boolean` | - | Use mesh vertex colors for emission. If emissiveMap or emissive are set, they'll be multiplied by vertex colors. |
| `emissiveVertexColorChannel?` | `string` | - | Vertex color channels to use for emission. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `enableGGXSpecular?` | `boolean` | - | Enables GGX specular. Also enables anisotropyIntensity parameter to set material anisotropy. |
| `envAtlas?` | `Texture \| null` | - | The prefiltered environment lighting atlas (default is null). This setting overrides cubeMap and sphereMap and will replace the scene lighting environment. |
| `fresnelModel?` | `number` | - | Defines the formula used for Fresnel effect. As a side-effect, enabling any Fresnel model changes the way diffuse and reflection components are combined. When Fresnel is off, legacy non energy-conserving combining is used. When it is on, combining behavior is energy-conserving. - FRESNEL_NONE: No Fresnel. - FRESNEL_SCHLICK: Schlick's approximation of Fresnel (recommended). Parameterized by specular color. |
| `gloss?` | `number` | - | Defines the glossiness of the material from 0 (rough) to 1 (shiny). Materials imported from glTF enable StandardMaterial#glossInvert , which reverses this: on those materials gloss holds roughness, so 0 is shiny and 1 is rough. |
| `glossInvert?` | `boolean` | - | Invert the gloss component (default is false). Enabling this flag results in material treating the gloss members as roughness. |
| `glossMap?` | `Texture \| null` | - | Gloss map (default is null). If specified, will be multiplied by normalized gloss value and/or vertex colors. |
| `glossMapChannel?` | `string` | - | Color channel of the gloss map to use. Can be "r", "g", "b" or "a". |
| `glossMapOffset?` | `[number, number]` | - | Controls the 2D offset of the gloss map. Each component is between 0 and 1. |
| `glossMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the gloss map. |
| `glossMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the gloss map. |
| `glossMapUv?` | `number` | - | Gloss map UV channel. |
| `glossVertexColor?` | `boolean` | - | Use mesh vertex colors for glossiness. If glossMap is set, it'll be multiplied by vertex colors. |
| `glossVertexColorChannel?` | `string` | - | Vertex color channel to use for glossiness. Can be "r", "g", "b" or "a". |
| `heightMap?` | `Texture \| null` | - | The height map of the material (default is null). Used for a view-dependent parallax effect. The texture must represent the height of the surface where darker pixels are lower and lighter pixels are higher, with heightMapBase  selecting the value that sits at the level of the original geometry. It is recommended to use it together with a normal map. Note that the parallax offset is applied to all other maps of the material, so the height map should use the same tiling and offset as those maps. |
| `heightMapChannel?` | `string` | - | Color channel of the height map to use. Can be "r", "g", "b" or "a". |
| `heightMapFactor?` | `number` | - | Height map multiplier (default is 1). Affects the strength of the parallax effect. A value of 1 displaces the texture by up to 5% of a UV tile, so useful values are typically in the 0 to 2 range. |
| `heightMapOffset?` | `[number, number]` | - | Controls the 2D offset of the height map. Each component is between 0 and 1. |
| `heightMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the height map. |
| `heightMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the height map. |
| `heightMapUv?` | `number` | - | Height map UV channel. |
| `lightMap?` | `Texture \| null` | - | A custom lightmap of the material (default is null). Lightmaps are textures that contain pre-rendered lighting. Can be HDR. |
| `lightMapChannel?` | `string` | - | Color channels of the lightmap to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `lightMapOffset?` | `[number, number]` | - | Controls the 2D offset of the lightmap. Each component is between 0 and 1. |
| `lightMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the lightmap. |
| `lightMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the lightmap. |
| `lightMapUv?` | `number` | - | Lightmap UV channel |
| `lightVertexColor?` | `boolean` | - | Use baked vertex lighting. If lightMap is set, it'll be multiplied by vertex colors. |
| `lightVertexColorChannel?` | `string` | - | Vertex color channels to use for baked lighting. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `metalness?` | `number` | - | Defines how much the surface is metallic. From 0 (dielectric) to 1 (metal). |
| `metalnessMap?` | `Texture \| null` | - | Monochrome metalness map (default is null). |
| `metalnessMapChannel?` | `string` | - | Color channel of the metalness map to use. Can be "r", "g", "b" or "a". |
| `metalnessMapOffset?` | `[number, number]` | - | Controls the 2D offset of the metalness map. Each component is between 0 and 1. |
| `metalnessMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the metalness map. |
| `metalnessMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the metalness map. |
| `metalnessMapUv?` | `number` | - | Metalness map UV channel. |
| `metalnessVertexColor?` | `boolean` | - | Use mesh vertex colors for metalness. If metalnessMap is set, it'll be multiplied by vertex colors. |
| `metalnessVertexColorChannel?` | `string` | - | Vertex color channel to use for metalness. Can be "r", "g", "b" or "a". |
| `normalDetailMap?` | `Texture \| null` | - | The detail (secondary) normal map of the material (default is null). Will only be used if main (primary) normal map is non-null. |
| `normalDetailMapBumpiness?` | `number` | - | The bumpiness of the material. This value scales the assigned detail (secondary) normal map. It should be normally between 0 (no bump mapping) and 1 (full bump mapping), but can be set to e.g. 2 to give even more pronounced bump effect. |
| `normalDetailMapOffset?` | `[number, number]` | - | Controls the 2D offset of the detail (secondary) normal map. Each component is between 0 and 1. |
| `normalDetailMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the detail (secondary) normal map. |
| `normalDetailMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the detail (secondary) normal map. |
| `normalDetailMapUv?` | `number` | - | Detail (secondary) normal map UV channel. |
| `normalMap?` | `Texture \| null` | - | The main (primary) normal map of the material (default is null). The texture must contains normalized, tangent space normals. |
| `normalMapOffset?` | `[number, number]` | - | Controls the 2D offset of the main (primary) normal map. Each component is between 0 and 1. |
| `normalMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the main (primary) normal map. |
| `normalMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the main (primary) normal map. |
| `normalMapUv?` | `number` | - | Main (primary) normal map UV channel. |
| `occludeDirect?` | `boolean` | - | Tells if AO should darken directional lighting. Defaults to false. |
| `occludeSpecular?` | `number` | - | Uses ambient occlusion to darken specular/reflection. It's a hack, because real specular occlusion is view-dependent. However, it can be better than nothing. - SPECOCC_NONE: No specular occlusion - SPECOCC_AO: Use AO directly to occlude specular. - SPECOCC_GLOSSDEPENDENT: Modify AO based on material glossiness/view angle to occlude specular. |
| `occludeSpecularIntensity?` | `number` | - | Controls visibility of specular occlusion. |
| `opacity?` | `number` | - | The opacity of the material. This value can be between 0 and 1, where 0 is fully transparent and 1 is fully opaque. If you want the material to be semi-transparent you also need to set the Material#blendType  to BLEND_NORMAL, BLEND_ADDITIVE or any other mode. Also note that for most semi-transparent objects you want Material#depthWrite  to be false, otherwise they can fully occlude objects behind them. |
| `opacityDither?` | `string` | - | Used to specify whether opacity is dithered, which allows transparency without alpha blending. Can be: - DITHER_NONE: Opacity dithering is disabled. - DITHER_BAYER2: Opacity is dithered using a Bayer 2 matrix. - DITHER_BAYER4: Opacity is dithered using a Bayer 4 matrix. - DITHER_BAYER8: Opacity is dithered using a Bayer 8 matrix. - DITHER_BAYER16: Opacity is dithered using a Bayer 16 matrix. - DITHER_BLUENOISE: Opacity is dithered using a blue noise. - DITHER_IGNNOISE: Opacity is dithered using an interleaved gradient noise. Defaults to DITHER_NONE. |
| `opacityShadowDither?` | `string` | - | Used to specify whether shadow opacity is dithered, which allows shadow transparency without alpha blending. Can be: - DITHER_NONE: Opacity dithering is disabled. - DITHER_BAYER2: Opacity is dithered using a Bayer 2 matrix. - DITHER_BAYER4: Opacity is dithered using a Bayer 4 matrix. - DITHER_BAYER8: Opacity is dithered using a Bayer 8 matrix. - DITHER_BAYER16: Opacity is dithered using a Bayer 16 matrix. - DITHER_BLUENOISE: Opacity is dithered using a blue noise. - DITHER_IGNNOISE: Opacity is dithered using an interleaved gradient noise. Defaults to DITHER_NONE. |
| `opacityFadesSpecular?` | `boolean` | - | Used to specify whether specular and reflections are faded out using opacity. Default is true. When set to false use alphaFade to fade out materials. |
| `opacityMap?` | `Texture \| null` | - | The opacity map of the material (default is null). |
| `opacityMapChannel?` | `string` | - | Color channel of the opacity map to use. Can be "r", "g", "b" or "a". |
| `opacityMapOffset?` | `[number, number]` | - | Controls the 2D offset of the opacity map. Each component is between 0 and 1. |
| `opacityMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the opacity map. |
| `opacityMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the opacity map. |
| `opacityMapUv?` | `number` | - | Opacity map UV channel. |
| `opacityVertexColor?` | `boolean` | - | Use mesh vertex colors for opacity. If opacityMap is set, it'll be multiplied by vertex colors. |
| `opacityVertexColorChannel?` | `string` | - | Vertex color channels to use for opacity. Can be "r", "g", "b" or "a". |
| `pixelSnap?` | `boolean` | - | Align vertices to pixel coordinates when rendering. Useful for pixel perfect 2D graphics. |
| `reflectivity?` | `number` | - | Environment map intensity. |
| `refraction?` | `number` | - | Defines the visibility of refraction. Material can refract the same cube map as used for reflections. |
| `refractionIndex?` | `number` | - | Defines the index of refraction, i.e. The amount of distortion. The value is calculated as (outerIor / surfaceIor), where inputs are measured indices of refraction, the one around the object and the one of its own surface. In most situations outer medium is air, so outerIor will be approximately 1. Then you only need to do (1.0 / surfaceIor). |
| `dispersion?` | `number` | - | The strength of the angular separation of colors (chromatic aberration) transmitting through a volume. Defaults to 0, which is equivalent to no dispersion. |
| `shadowCatcher?` | `boolean` | - | When enabled, the material will output accumulated directional shadow value in linear space as the color. |
| `specular?` | `string` | - | The specular color of the material, specified in sRGB color space. This color value is 3-component (RGB), where each component is between 0 and 1. Defines surface reflection/specular color. Affects specular intensity and tint. |
| `specularMap?` | `Texture \| null` | - | The specular map of the material (default is null). |
| `specularMapChannel?` | `string` | - | Color channels of the specular map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `specularMapOffset?` | `[number, number]` | - | Controls the 2D offset of the specular map. Each component is between 0 and 1. |
| `specularMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the specular map. |
| `specularMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the specular map. |
| `specularMapUv?` | `number` | - | Specular map UV channel. |
| `specularVertexColor?` | `boolean` | - | Multiply specular by the mesh vertex colors. |
| `specularVertexColorChannel?` | `string` | - | Vertex color channels to use for specular. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `specularityFactor?` | `number` | - | The factor of specular intensity, used to weight the fresnel and specularity. Default is 1.0. |
| `specularityFactorMap?` | `Texture \| null` | - | The factor of specularity as a texture (default is null). |
| `specularityFactorMapChannel?` | `string` | - | The channel used by the specularity factor texture to sample from (default is 'a'). |
| `specularityFactorMapOffset?` | `[number, number]` | - | Controls the 2D offset of the specularity factor map. Each component is between 0 and 1. |
| `specularityFactorMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the specularity factor map. |
| `specularityFactorMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the specularity factor map. |
| `specularityFactorMapUv?` | `number` | - | Specularity factor map UV channel. |
| `useSheen?` | `boolean` | - | Toggle sheen specular effect on/off. |
| `sheen?` | `string` | - | The specular color of the sheen (fabric) microfiber structure, specified in sRGB color space. This color value is 3-component (RGB), where each component is between 0 and 1. |
| `sheenMap?` | `Texture \| null` | - | The sheen microstructure color map of the material (default is null). |
| `sheenMapChannel?` | `string` | - | Color channels of the sheen map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `sheenMapOffset?` | `[number, number]` | - | Controls the 2D offset of the sheen map. Each component is between 0 and 1. |
| `sheenMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the sheen map. |
| `sheenMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the sheen map. |
| `sheenMapUv?` | `number` | - | Sheen map UV channel. |
| `sheenVertexColor?` | `boolean` | - | Use mesh vertex colors for sheen. If sheen map or sheen tint are set, they'll be multiplied by vertex colors. |
| `sheenVertexColorChannel?` | `string` | - | Vertex color channels to use for sheen. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `sphereMap?` | `Texture \| null` | - | The spherical environment map of the material (default is null). This will replace the scene lighting environment. |
| `twoSidedLighting?` | `boolean` | - | Calculate proper normals (and therefore lighting) on backfaces. |
| `useFog?` | `boolean` | - | Apply fogging (as configured in scene settings) |
| `useTonemap?` | `boolean` | - | Apply tonemapping (as configured via CameraComponent#toneMapping ). Defaults to true. |
| `useLighting?` | `boolean` | - | Apply lighting |
| `useMetalness?` | `boolean` | - | Use metalness properties instead of specular. When enabled, diffuse colors also affect specular instead of the dedicated specular map. This can be used as alternative to specular color to save space. With metalness == 0, the pixel is assumed to be dielectric, and diffuse color is used as normal. With metalness == 1, the pixel is fully metallic, and diffuse color is used as specular color instead. |
| `useMetalnessSpecularColor?` | `boolean` | - | When metalness is enabled, use the specular map to apply color tint to specular reflections. |
| `useSkybox?` | `boolean` | - | Apply scene skybox as prefiltered environment map |
| `userId?` | `string` | - | A unique id the user can assign to the material. The engine internally does not use this for anything, and the user can assign a value to this id for any purpose they like. Defaults to an empty string. |
| `id?` | `number` | - |  |
| `parameters?` | `{}` | - |  |
| `alphaTest?` | `number` | - | The alpha test reference value to control which fragments are written to the currently active render target based on alpha value. All fragments with an alpha value of less than the alphaTest reference value will be discarded. alphaTest defaults to 0 (all fragments pass). |
| `alphaToCoverage?` | `boolean` | - | Enables or disables alpha to coverage. When enabled, and if hardware anti-aliasing is on, limited order-independent transparency can be achieved. Quality depends on the number of MSAA samples of the current render target. It can nicely soften edges of otherwise sharp alpha cutouts, but isn't recommended for large area semi-transparent surfaces. Note, that you don't need to enable blending to make alpha to coverage work. It will work without it, just like alphaTest. This requires a multi-sampled render target, and is silently ignored when rendering to a single-sampled one. On WebGPU it additionally requires the first color attachment of the render target to use a blendable format with an alpha channel, and is silently ignored otherwise - note that PIXELFORMAT_111110F, the default HDR format used by CameraFrame, has no alpha channel. |
| `cull?` | `number` | - | Controls how triangles are culled based on their face direction with respect to the viewpoint. Can be: - CULLFACE_NONE: Do not cull triangles based on face direction. - CULLFACE_BACK: Cull the back faces of triangles (do not render triangles facing away from the view point). - CULLFACE_FRONT: Cull the front faces of triangles (do not render triangles facing towards the view point). Defaults to CULLFACE_BACK. |
| `frontFace?` | `number` | - | Controls whether polygons are front- or back-facing by setting a winding orientation. Can be: - FRONTFACE_CW: The clock-wise winding. - FRONTFACE_CCW: The counterclockwise winding. Defaults to FRONTFACE_CCW. |
| `stencilFront?` | `StencilParameters \| null` | - | Stencil parameters for front faces (default is null). |
| `stencilBack?` | `StencilParameters \| null` | - | Stencil parameters for back faces (default is null). |
| `flatShading?` | `boolean` | - | Enables or disables flat shading. When enabled, the surface is shaded using the geometric normal of the triangle the fragment belongs to, instead of the normal interpolated from the vertex normals, giving the mesh a faceted look. This works on skinned and morphed geometry as well. The geometric normal is oriented to match the winding of the triangle, as configured by Material#frontFace , and so it agrees with correctly authored vertex normals. Flat shading therefore only changes the faceting - Material#cull , Material#frontFace  and StandardMaterial#twoSidedLighting  all behave the same as they do for smooth shading. StandardMaterial and LitMaterial implement this automatically. For a ShaderMaterial, this adds a `FLAT_SHADING` define to the shader, which the supplied shader code needs to handle. The `flatNormalPS` chunk provides the `getFlatNormal` function used by the engine internally, and can be used for this: ```javascript #include "flatNormalPS" ... #ifdef FLAT_SHADING vec3 normal = getFlatNormal(worldPos); #else vec3 normal = normalize(interpolatedNormal); #endif ``` As with other material properties, call Material#update  after changing this. Defaults to false. Gets whether flat shading is enabled. |
| `shaderChunksVersion?` | `string` | - | Sets the version of the shader chunks. This should be a string containing the current engine major and minor version (e.g., '2.8' for engine v2.8.1) and ensures compatibility with the current engine version. When providing custom shader chunks, set this to the latest supported version. If a future engine release no longer supports the specified version, a warning will be issued. In that case, update your shader chunks to match the new format and set this to the latest version accordingly. Returns the version of the shader chunks. |
| `depthBias?` | `number` | - | Sets the offset for the output depth buffer value. Useful for decals to prevent z-fighting. Typically a small negative value (-0.1) is used to render the mesh slightly closer to the camera. Gets the offset for the output depth buffer value. |
| `slopeDepthBias?` | `number` | - | Sets the offset for the output depth buffer value based on the slope of the triangle relative to the camera. Gets the offset for the output depth buffer value based on the slope of the triangle relative to the camera. |
| `redWrite?` | `boolean` | - | Sets whether the red channel is written to the color buffer. If true, the red component of fragments generated by the shader of this material is written to the color buffer of the currently active render target. If false, the red component will not be written. Defaults to true. Gets whether the red channel is written to the color buffer. |
| `greenWrite?` | `boolean` | - | Sets whether the green channel is written to the color buffer. If true, the red component of fragments generated by the shader of this material is written to the color buffer of the currently active render target. If false, the green component will not be written. Defaults to true. Gets whether the green channel is written to the color buffer. |
| `blueWrite?` | `boolean` | - | Sets whether the blue channel is written to the color buffer. If true, the red component of fragments generated by the shader of this material is written to the color buffer of the currently active render target. If false, the blue component will not be written. Defaults to true. Gets whether the blue channel is written to the color buffer. |
| `alphaWrite?` | `boolean` | - | Sets whether the alpha channel is written to the color buffer. If true, the red component of fragments generated by the shader of this material is written to the color buffer of the currently active render target. If false, the alpha component will not be written. Defaults to true. Gets whether the alpha channel is written to the color buffer. |
| `blendState?` | `Readonly<BlendState>` | - | Sets the blend state for this material. Controls how fragment shader outputs are blended when being written to the currently active render target. This overwrites blending type set using blendType, and offers more control over blending. Gets the blend state for this material. Use the setter to update transparency and sort state. |
| `blendType?` | `number` | - | Sets the blend mode for this material. Controls how fragment shader outputs are blended when being written to the currently active render target. Can be: - BLEND_SUBTRACTIVE: Subtract the color of the source fragment from the destination fragment and write the result to the frame buffer. - BLEND_ADDITIVE: Add the color of the source fragment to the destination fragment and write the result to the frame buffer. - BLEND_NORMAL: Enable simple translucency for materials such as glass. This is equivalent to enabling a source blend mode of BLENDMODE_SRC_ALPHA and a destination blend mode of BLENDMODE_ONE_MINUS_SRC_ALPHA. - BLEND_NONE: Disable blending. - BLEND_PREMULTIPLIED: Similar to BLEND_NORMAL expect the source fragment is assumed to have already been multiplied by the source alpha value. - BLEND_MULTIPLICATIVE: Multiply the color of the source fragment by the color of the destination fragment and write the result to the frame buffer. - BLEND_ADDITIVEALPHA: Same as BLEND_ADDITIVE except the source RGB is multiplied by the source alpha. - BLEND_MULTIPLICATIVE2X: Multiplies colors and doubles the result. - BLEND_SCREEN: Softer version of additive. - BLEND_MIN: Minimum color. - BLEND_MAX: Maximum color. Defaults to BLEND_NONE. Gets the blend mode for this material. |
| `depthState?` | `DepthState` | - | Sets the depth state. Note that this can also be done by using depthTest, depthFunc and depthWrite. Gets the depth state. |
| `depthTest?` | `boolean` | - | Sets whether depth testing is enabled. If true, fragments generated by the shader of this material are only written to the current render target if they pass the depth test. If false, fragments generated by the shader of this material are written to the current render target regardless of what is in the depth buffer. Defaults to true. Gets whether depth testing is enabled. |
| `depthFunc?` | `number` | - | Sets the depth test function. Controls how the depth of new fragments is compared against the current depth contained in the depth buffer. Can be: - FUNC_NEVER: don't draw - FUNC_LESS: draw if new depth < depth buffer - FUNC_EQUAL: draw if new depth == depth buffer - FUNC_LESSEQUAL: draw if new depth <= depth buffer - FUNC_GREATER: draw if new depth > depth buffer - FUNC_NOTEQUAL: draw if new depth != depth buffer - FUNC_GREATEREQUAL: draw if new depth >= depth buffer - FUNC_ALWAYS: always draw Defaults to FUNC_LESSEQUAL. Gets the depth test function. |
| `depthWrite?` | `boolean` | - | Sets whether depth writing is enabled. If true, fragments generated by the shader of this material write a depth value to the depth buffer of the currently active render target. If false, no depth value is written. Defaults to true. Gets whether depth writing is enabled. |

## Returns

The hooks will return a [`StandardMaterial`](https://api.playcanvas.com/engine/classes/StandardMaterial.html) instance which can be applied to a [`Render`](https://developer.playcanvas.com/user-manual/react/api/render.md) component.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `userAttributes` | `Map<any, any>` | - |  |
| `_specularIsBlack` | `any` | - | Whether the specular color was black at the last update. |
| `_mapTransforms` | `any` | - | Texture transform grouping state. |
| `onUpdateShader` | `UpdateShaderCallback \| undefined` | - | A custom function that will be called after all shader generator properties are collected and before shader code is generated. This function will receive an object with shader generator settings (based on current material and scene properties), that you can change and then return. Returned value will be used instead. This is mostly useful when rendering the same set of objects, but with different shader variations based on the same material. For example, you may wish to render a depth or normal pass using textures assigned to the material, a reflection pass with simpler shaders and so on. These properties are split into two sections, generic standard material options and lit options. Properties of the standard material options are StandardMaterialOptions and the options for the lit options are LitShaderOptions. |
| `_assetReferences` | `{}` | - |  |
| `_activeParams` | `Set<any>` | - |  |
| `_activeLightingParams` | `Set<any>` | - |  |
| `shaderOptBuilder` | `StandardMaterialOptionsBuilder` | - |  |
| `reset` | `() => void` | - |  |
| `alphaFade` | `number` | - | Used to fade out materials when opacityFadesSpecular is set to false. |
| `ambient` | `Color` | - | The ambient color of the material, specified in sRGB color space. This color value is 3-component (RGB), where each component is between 0 and 1. |
| `anisotropyIntensity` | `number` | - | Defines amount of anisotropy. Requires enableGGXSpecular is set to true. - When anisotropyIntensity == 0, specular is isotropic. - Specular anisotropy increases as anisotropyIntensity value increases to maximum of 1. |
| `anisotropyRotation` | `number` | - | Defines the rotation (in degrees) of anisotropy. |
| `anisotropyMap` | `Texture \| null` | - | The anisotropy map of the material (default is null). |
| `anisotropyMapOffset` | `Vec2` | - | Controls the 2D offset of the anisotropy map. Each component is between 0 and 1. |
| `anisotropyMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the anisotropy map. |
| `anisotropyMapTiling` | `Vec2` | - | Controls the 2D tiling of the anisotropy map. |
| `anisotropyMapUv` | `number` | - | Anisotropy map UV channel. |
| `aoIntensity` | `number` | - | Ambient occlusion intensity. Defaults to 1. |
| `aoMap` | `Texture \| null` | - | The main (primary) baked ambient occlusion (AO) map (default is null). Modulates ambient color. |
| `aoMapChannel` | `string` | - | Color channel of the main (primary) AO map to use. Can be "r", "g", "b" or "a". |
| `aoMapOffset` | `Vec2` | - | Controls the 2D offset of the main (primary) AO map. Each component is between 0 and 1. |
| `aoMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the main (primary) AO map. |
| `aoMapTiling` | `Vec2` | - | Controls the 2D tiling of the main (primary) AO map. |
| `aoMapUv` | `number` | - | Main (primary) AO map UV channel |
| `aoDetailMap` | `Texture \| null` | - | The detail (secondary) baked ambient occlusion (AO) map of the material (default is null). Will only be used if main (primary) ao map is non-null. |
| `aoDetailMapChannel` | `string` | - | Color channels of the detail (secondary) AO map to use. Can be "r", "g", "b" or "a" (default is "g"). |
| `aoDetailMapOffset` | `Vec2` | - | Controls the 2D offset of the detail (secondary) AO map. Each component is between 0 and 1. |
| `aoDetailMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the detail (secondary) AO map. |
| `aoDetailMapTiling` | `Vec2` | - | Controls the 2D tiling of the detail (secondary) AO map. |
| `aoDetailMapUv` | `number` | - | Detail (secondary) AO map UV channel. |
| `aoDetailMode` | `string` | - | Determines how the main (primary) and detail (secondary) AO maps are blended together. Can be: - DETAILMODE_MUL: Multiply together the primary and secondary colors. - DETAILMODE_ADD: Add together the primary and secondary colors. - DETAILMODE_SCREEN: Softer version of DETAILMODE_ADD. - DETAILMODE_OVERLAY: Multiplies or screens the colors, depending on the primary color. - DETAILMODE_MIN: Select whichever of the primary and secondary colors is darker, component-wise. - DETAILMODE_MAX: Select whichever of the primary and secondary colors is lighter, component-wise. Defaults to DETAILMODE_MUL. |
| `aoVertexColor` | `boolean` | - | Use mesh vertex colors for AO. If aoMap is set, it'll be multiplied by vertex colors. |
| `aoVertexColorChannel` | `string` | - | Vertex color channels to use for AO. Can be "r", "g", "b" or "a". |
| `bumpiness` | `number` | - | The bumpiness of the material. This value scales the assigned main (primary) normal map. It should be normally between 0 (no bump mapping) and 1 (full bump mapping), but can be set to e.g. 2 to give even more pronounced bump effect. |
| `clearCoat` | `number` | - | Defines intensity of clearcoat layer from 0 to 1. Clearcoat layer is disabled when clearCoat == 0. Default value is 0 (disabled). |
| `clearCoatBumpiness` | `number` | - | The bumpiness of the clearcoat layer. This value scales the assigned main clearcoat normal map. It should be normally between 0 (no bump mapping) and 1 (full bump mapping), but can be set to e.g. 2 to give even more pronounced bump effect. |
| `clearCoatGlossInvert` | `boolean` | - | Invert the clearcoat gloss component (default is false). Enabling this flag results in material treating the clear coat gloss members as roughness. |
| `clearCoatGlossMap` | `Texture \| null` | - | Monochrome clearcoat glossiness map (default is null). If specified, will be multiplied by normalized 'clearCoatGloss' value and/or vertex colors. |
| `clearCoatGlossMapChannel` | `string` | - | Color channel of the clearcoat gloss map to use. Can be "r", "g", "b" or "a". |
| `clearCoatGlossMapOffset` | `Vec2` | - | Controls the 2D offset of the clearcoat gloss map. Each component is between 0 and 1. |
| `clearCoatGlossMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the clear coat gloss map. |
| `clearCoatGlossMapTiling` | `Vec2` | - | Controls the 2D tiling of the clearcoat gloss map. |
| `clearCoatGlossMapUv` | `number` | - | Clearcoat gloss map UV channel. |
| `clearCoatGlossVertexColor` | `boolean` | - | Use mesh vertex colors for clearcoat glossiness. If clearCoatGlossMap is set, it'll be multiplied by vertex colors. |
| `clearCoatGlossVertexColorChannel` | `string` | - | Vertex color channel to use for clearcoat glossiness. Can be "r", "g", "b" or "a". |
| `clearCoatGloss` | `number` | - | Defines the clearcoat glossiness of the clearcoat layer from 0 (rough) to 1 (mirror). |
| `clearCoatMap` | `Texture \| null` | - | Monochrome clearcoat intensity map (default is null). If specified, will be multiplied by normalized 'clearCoat' value and/or vertex colors. |
| `clearCoatMapChannel` | `string` | - | Color channel of the clearcoat intensity map to use. Can be "r", "g", "b" or "a". |
| `clearCoatMapOffset` | `Vec2` | - | Controls the 2D offset of the clearcoat intensity map. Each component is between 0 and 1. |
| `clearCoatMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the clearcoat intensity map. |
| `clearCoatMapTiling` | `Vec2` | - | Controls the 2D tiling of the clearcoat intensity map. |
| `clearCoatMapUv` | `number` | - | Clearcoat intensity map UV channel. |
| `clearCoatNormalMap` | `Texture \| null` | - | The clearcoat normal map of the material (default is null). The texture must contains normalized, tangent space normals. |
| `clearCoatNormalMapOffset` | `Vec2` | - | Controls the 2D offset of the main clearcoat normal map. Each component is between 0 and 1. |
| `clearCoatNormalMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the main clearcoat map. |
| `clearCoatNormalMapTiling` | `Vec2` | - | Controls the 2D tiling of the main clearcoat normal map. |
| `clearCoatNormalMapUv` | `number` | - | Clearcoat normal map UV channel. |
| `clearCoatVertexColor` | `boolean` | - | Use mesh vertex colors for clearcoat intensity. If clearCoatMap is set, it'll be multiplied by vertex colors. |
| `clearCoatVertexColorChannel` | `string` | - | Vertex color channel to use for clearcoat intensity. Can be "r", "g", "b" or "a". |
| `cubeMap` | `Texture \| null` | - | The cubic environment map of the material (default is null). This setting overrides sphereMap and will replace the scene lighting environment. |
| `cubeMapProjection` | `number` | - | The type of projection applied to the cubeMap property: - CUBEPROJ_NONE: The cube map is treated as if it is infinitely far away. - CUBEPROJ_BOX: Box-projection based on a world space axis-aligned bounding box. Defaults to CUBEPROJ_NONE. |
| `cubeMapProjectionBox` | `BoundingBox` | - | The world space axis-aligned bounding box defining the box-projection used for the cubeMap property. Only used when cubeMapProjection is set to CUBEPROJ_BOX. |
| `diffuse` | `Color` | - | The diffuse color of the material, specified in sRGB color space. This color value is 3-component (RGB), where each component is between 0 and 1. Defines basic surface color (aka albedo). |
| `diffuseDetailMap` | `Texture \| null` | - | The detail (secondary) diffuse map of the material (default is null). Will only be used if main (primary) diffuse map is non-null. |
| `diffuseDetailMapChannel` | `string` | - | Color channels of the detail (secondary) diffuse map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `diffuseDetailMapOffset` | `Vec2` | - | Controls the 2D offset of the detail (secondary) diffuse map. Each component is between 0 and 1. |
| `diffuseDetailMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the detail (secondary) diffuse map. |
| `diffuseDetailMapTiling` | `Vec2` | - | Controls the 2D tiling of the detail (secondary) diffuse map. |
| `diffuseDetailMapUv` | `number` | - | Detail (secondary) diffuse map UV channel. |
| `diffuseDetailMode` | `string` | - | Determines how the main (primary) and detail (secondary) diffuse maps are blended together. Can be: - DETAILMODE_MUL: Multiply together the primary and secondary colors. - DETAILMODE_ADD: Add together the primary and secondary colors. - DETAILMODE_SCREEN: Softer version of DETAILMODE_ADD. - DETAILMODE_OVERLAY: Multiplies or screens the colors, depending on the primary color. - DETAILMODE_MIN: Select whichever of the primary and secondary colors is darker, component-wise. - DETAILMODE_MAX: Select whichever of the primary and secondary colors is lighter, component-wise. Defaults to DETAILMODE_MUL. |
| `diffuseMap` | `Texture \| null` | - | The main (primary) diffuse map of the material (default is null). |
| `diffuseMapChannel` | `string` | - | Color channels of the main (primary) diffuse map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `diffuseMapOffset` | `Vec2` | - | Controls the 2D offset of the main (primary) diffuse map. Each component is between 0 and 1. |
| `diffuseMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the main (primary) diffuse map. |
| `diffuseMapTiling` | `Vec2` | - | Controls the 2D tiling of the main (primary) diffuse map. |
| `diffuseMapUv` | `number` | - | Main (primary) diffuse map UV channel. |
| `diffuseVertexColor` | `boolean` | - | Multiply diffuse by the mesh vertex colors. |
| `diffuseVertexColorChannel` | `string` | - | Vertex color channels to use for diffuse. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `emissive` | `Color` | - | The emissive color of the material, specified in sRGB color space. This color value is 3-component (RGB), where each component is between 0 and 1. |
| `emissiveIntensity` | `number` | - | Emissive color multiplier. |
| `emissiveMap` | `Texture \| null` | - | The emissive map of the material (default is null). Can be HDR. When the emissive map is applied, the emissive color is multiplied by the texel color in the map. Since the emissive color is black by default, the emissive map won't be visible unless the emissive color is changed. |
| `emissiveMapChannel` | `string` | - | Color channels of the emissive map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `emissiveMapOffset` | `Vec2` | - | Controls the 2D offset of the emissive map. Each component is between 0 and 1. |
| `emissiveMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the emissive map. |
| `emissiveMapTiling` | `Vec2` | - | Controls the 2D tiling of the emissive map. |
| `emissiveMapUv` | `number` | - | Emissive map UV channel. |
| `emissiveVertexColor` | `boolean` | - | Use mesh vertex colors for emission. If emissiveMap or emissive are set, they'll be multiplied by vertex colors. |
| `emissiveVertexColorChannel` | `string` | - | Vertex color channels to use for emission. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `enableGGXSpecular` | `boolean` | - | Enables GGX specular. Also enables anisotropyIntensity parameter to set material anisotropy. |
| `envAtlas` | `Texture \| null` | - | The prefiltered environment lighting atlas (default is null). This setting overrides cubeMap and sphereMap and will replace the scene lighting environment. |
| `fresnelModel` | `number` | - | Defines the formula used for Fresnel effect. As a side-effect, enabling any Fresnel model changes the way diffuse and reflection components are combined. When Fresnel is off, legacy non energy-conserving combining is used. When it is on, combining behavior is energy-conserving. - FRESNEL_NONE: No Fresnel. - FRESNEL_SCHLICK: Schlick's approximation of Fresnel (recommended). Parameterized by specular color. |
| `gloss` | `number` | - | Defines the glossiness of the material from 0 (rough) to 1 (shiny). Materials imported from glTF enable StandardMaterial#glossInvert , which reverses this: on those materials gloss holds roughness, so 0 is shiny and 1 is rough. |
| `glossInvert` | `boolean` | - | Invert the gloss component (default is false). Enabling this flag results in material treating the gloss members as roughness. |
| `glossMap` | `Texture \| null` | - | Gloss map (default is null). If specified, will be multiplied by normalized gloss value and/or vertex colors. |
| `glossMapChannel` | `string` | - | Color channel of the gloss map to use. Can be "r", "g", "b" or "a". |
| `glossMapOffset` | `Vec2` | - | Controls the 2D offset of the gloss map. Each component is between 0 and 1. |
| `glossMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the gloss map. |
| `glossMapTiling` | `Vec2` | - | Controls the 2D tiling of the gloss map. |
| `glossMapUv` | `number` | - | Gloss map UV channel. |
| `glossVertexColor` | `boolean` | - | Use mesh vertex colors for glossiness. If glossMap is set, it'll be multiplied by vertex colors. |
| `glossVertexColorChannel` | `string` | - | Vertex color channel to use for glossiness. Can be "r", "g", "b" or "a". |
| `heightMap` | `Texture \| null` | - | The height map of the material (default is null). Used for a view-dependent parallax effect. The texture must represent the height of the surface where darker pixels are lower and lighter pixels are higher, with heightMapBase  selecting the value that sits at the level of the original geometry. It is recommended to use it together with a normal map. Note that the parallax offset is applied to all other maps of the material, so the height map should use the same tiling and offset as those maps. |
| `heightMapChannel` | `string` | - | Color channel of the height map to use. Can be "r", "g", "b" or "a". |
| `heightMapFactor` | `number` | - | Height map multiplier (default is 1). Affects the strength of the parallax effect. A value of 1 displaces the texture by up to 5% of a UV tile, so useful values are typically in the 0 to 2 range. |
| `heightMapOffset` | `Vec2` | - | Controls the 2D offset of the height map. Each component is between 0 and 1. |
| `heightMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the height map. |
| `heightMapTiling` | `Vec2` | - | Controls the 2D tiling of the height map. |
| `heightMapUv` | `number` | - | Height map UV channel. |
| `lightMap` | `Texture \| null` | - | A custom lightmap of the material (default is null). Lightmaps are textures that contain pre-rendered lighting. Can be HDR. |
| `lightMapChannel` | `string` | - | Color channels of the lightmap to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `lightMapOffset` | `Vec2` | - | Controls the 2D offset of the lightmap. Each component is between 0 and 1. |
| `lightMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the lightmap. |
| `lightMapTiling` | `Vec2` | - | Controls the 2D tiling of the lightmap. |
| `lightMapUv` | `number` | - | Lightmap UV channel |
| `lightVertexColor` | `boolean` | - | Use baked vertex lighting. If lightMap is set, it'll be multiplied by vertex colors. |
| `lightVertexColorChannel` | `string` | - | Vertex color channels to use for baked lighting. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `metalness` | `number` | - | Defines how much the surface is metallic. From 0 (dielectric) to 1 (metal). |
| `metalnessMap` | `Texture \| null` | - | Monochrome metalness map (default is null). |
| `metalnessMapChannel` | `string` | - | Color channel of the metalness map to use. Can be "r", "g", "b" or "a". |
| `metalnessMapOffset` | `Vec2` | - | Controls the 2D offset of the metalness map. Each component is between 0 and 1. |
| `metalnessMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the metalness map. |
| `metalnessMapTiling` | `Vec2` | - | Controls the 2D tiling of the metalness map. |
| `metalnessMapUv` | `number` | - | Metalness map UV channel. |
| `metalnessVertexColor` | `boolean` | - | Use mesh vertex colors for metalness. If metalnessMap is set, it'll be multiplied by vertex colors. |
| `metalnessVertexColorChannel` | `string` | - | Vertex color channel to use for metalness. Can be "r", "g", "b" or "a". |
| `normalDetailMap` | `Texture \| null` | - | The detail (secondary) normal map of the material (default is null). Will only be used if main (primary) normal map is non-null. |
| `normalDetailMapBumpiness` | `number` | - | The bumpiness of the material. This value scales the assigned detail (secondary) normal map. It should be normally between 0 (no bump mapping) and 1 (full bump mapping), but can be set to e.g. 2 to give even more pronounced bump effect. |
| `normalDetailMapOffset` | `Vec2` | - | Controls the 2D offset of the detail (secondary) normal map. Each component is between 0 and 1. |
| `normalDetailMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the detail (secondary) normal map. |
| `normalDetailMapTiling` | `Vec2` | - | Controls the 2D tiling of the detail (secondary) normal map. |
| `normalDetailMapUv` | `number` | - | Detail (secondary) normal map UV channel. |
| `normalMap` | `Texture \| null` | - | The main (primary) normal map of the material (default is null). The texture must contains normalized, tangent space normals. |
| `normalMapOffset` | `Vec2` | - | Controls the 2D offset of the main (primary) normal map. Each component is between 0 and 1. |
| `normalMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the main (primary) normal map. |
| `normalMapTiling` | `Vec2` | - | Controls the 2D tiling of the main (primary) normal map. |
| `normalMapUv` | `number` | - | Main (primary) normal map UV channel. |
| `occludeDirect` | `boolean` | - | Tells if AO should darken directional lighting. Defaults to false. |
| `occludeSpecular` | `number` | - | Uses ambient occlusion to darken specular/reflection. It's a hack, because real specular occlusion is view-dependent. However, it can be better than nothing. - SPECOCC_NONE: No specular occlusion - SPECOCC_AO: Use AO directly to occlude specular. - SPECOCC_GLOSSDEPENDENT: Modify AO based on material glossiness/view angle to occlude specular. |
| `occludeSpecularIntensity` | `number` | - | Controls visibility of specular occlusion. |
| `opacity` | `number` | - | The opacity of the material. This value can be between 0 and 1, where 0 is fully transparent and 1 is fully opaque. If you want the material to be semi-transparent you also need to set the Material#blendType  to BLEND_NORMAL, BLEND_ADDITIVE or any other mode. Also note that for most semi-transparent objects you want Material#depthWrite  to be false, otherwise they can fully occlude objects behind them. |
| `opacityDither` | `string` | - | Used to specify whether opacity is dithered, which allows transparency without alpha blending. Can be: - DITHER_NONE: Opacity dithering is disabled. - DITHER_BAYER2: Opacity is dithered using a Bayer 2 matrix. - DITHER_BAYER4: Opacity is dithered using a Bayer 4 matrix. - DITHER_BAYER8: Opacity is dithered using a Bayer 8 matrix. - DITHER_BAYER16: Opacity is dithered using a Bayer 16 matrix. - DITHER_BLUENOISE: Opacity is dithered using a blue noise. - DITHER_IGNNOISE: Opacity is dithered using an interleaved gradient noise. Defaults to DITHER_NONE. |
| `opacityShadowDither` | `string` | - | Used to specify whether shadow opacity is dithered, which allows shadow transparency without alpha blending. Can be: - DITHER_NONE: Opacity dithering is disabled. - DITHER_BAYER2: Opacity is dithered using a Bayer 2 matrix. - DITHER_BAYER4: Opacity is dithered using a Bayer 4 matrix. - DITHER_BAYER8: Opacity is dithered using a Bayer 8 matrix. - DITHER_BAYER16: Opacity is dithered using a Bayer 16 matrix. - DITHER_BLUENOISE: Opacity is dithered using a blue noise. - DITHER_IGNNOISE: Opacity is dithered using an interleaved gradient noise. Defaults to DITHER_NONE. |
| `opacityFadesSpecular` | `boolean` | - | Used to specify whether specular and reflections are faded out using opacity. Default is true. When set to false use alphaFade to fade out materials. |
| `opacityMap` | `Texture \| null` | - | The opacity map of the material (default is null). |
| `opacityMapChannel` | `string` | - | Color channel of the opacity map to use. Can be "r", "g", "b" or "a". |
| `opacityMapOffset` | `Vec2` | - | Controls the 2D offset of the opacity map. Each component is between 0 and 1. |
| `opacityMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the opacity map. |
| `opacityMapTiling` | `Vec2` | - | Controls the 2D tiling of the opacity map. |
| `opacityMapUv` | `number` | - | Opacity map UV channel. |
| `opacityVertexColor` | `boolean` | - | Use mesh vertex colors for opacity. If opacityMap is set, it'll be multiplied by vertex colors. |
| `opacityVertexColorChannel` | `string` | - | Vertex color channels to use for opacity. Can be "r", "g", "b" or "a". |
| `pixelSnap` | `boolean` | - | Align vertices to pixel coordinates when rendering. Useful for pixel perfect 2D graphics. |
| `reflectivity` | `number` | - | Environment map intensity. |
| `refraction` | `number` | - | Defines the visibility of refraction. Material can refract the same cube map as used for reflections. |
| `refractionIndex` | `number` | - | Defines the index of refraction, i.e. The amount of distortion. The value is calculated as (outerIor / surfaceIor), where inputs are measured indices of refraction, the one around the object and the one of its own surface. In most situations outer medium is air, so outerIor will be approximately 1. Then you only need to do (1.0 / surfaceIor). |
| `dispersion` | `number` | - | The strength of the angular separation of colors (chromatic aberration) transmitting through a volume. Defaults to 0, which is equivalent to no dispersion. |
| `shadowCatcher` | `boolean` | - | When enabled, the material will output accumulated directional shadow value in linear space as the color. |
| `specular` | `Color` | - | The specular color of the material, specified in sRGB color space. This color value is 3-component (RGB), where each component is between 0 and 1. Defines surface reflection/specular color. Affects specular intensity and tint. |
| `specularMap` | `Texture \| null` | - | The specular map of the material (default is null). |
| `specularMapChannel` | `string` | - | Color channels of the specular map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `specularMapOffset` | `Vec2` | - | Controls the 2D offset of the specular map. Each component is between 0 and 1. |
| `specularMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the specular map. |
| `specularMapTiling` | `Vec2` | - | Controls the 2D tiling of the specular map. |
| `specularMapUv` | `number` | - | Specular map UV channel. |
| `specularVertexColor` | `boolean` | - | Multiply specular by the mesh vertex colors. |
| `specularVertexColorChannel` | `string` | - | Vertex color channels to use for specular. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `specularityFactor` | `number` | - | The factor of specular intensity, used to weight the fresnel and specularity. Default is 1.0. |
| `specularityFactorMap` | `Texture \| null` | - | The factor of specularity as a texture (default is null). |
| `specularityFactorMapChannel` | `string` | - | The channel used by the specularity factor texture to sample from (default is 'a'). |
| `specularityFactorMapOffset` | `Vec2` | - | Controls the 2D offset of the specularity factor map. Each component is between 0 and 1. |
| `specularityFactorMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the specularity factor map. |
| `specularityFactorMapTiling` | `Vec2` | - | Controls the 2D tiling of the specularity factor map. |
| `specularityFactorMapUv` | `number` | - | Specularity factor map UV channel. |
| `useSheen` | `boolean` | - | Toggle sheen specular effect on/off. |
| `sheen` | `Color` | - | The specular color of the sheen (fabric) microfiber structure, specified in sRGB color space. This color value is 3-component (RGB), where each component is between 0 and 1. |
| `sheenMap` | `Texture \| null` | - | The sheen microstructure color map of the material (default is null). |
| `sheenMapChannel` | `string` | - | Color channels of the sheen map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `sheenMapOffset` | `Vec2` | - | Controls the 2D offset of the sheen map. Each component is between 0 and 1. |
| `sheenMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the sheen map. |
| `sheenMapTiling` | `Vec2` | - | Controls the 2D tiling of the sheen map. |
| `sheenMapUv` | `number` | - | Sheen map UV channel. |
| `sheenVertexColor` | `boolean` | - | Use mesh vertex colors for sheen. If sheen map or sheen tint are set, they'll be multiplied by vertex colors. |
| `sheenVertexColorChannel` | `string` | - | Vertex color channels to use for sheen. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `sphereMap` | `Texture \| null` | - | The spherical environment map of the material (default is null). This will replace the scene lighting environment. |
| `twoSidedLighting` | `boolean` | - | Calculate proper normals (and therefore lighting) on backfaces. |
| `useFog` | `boolean` | - | Apply fogging (as configured in scene settings) |
| `useTonemap` | `boolean` | - | Apply tonemapping (as configured via CameraComponent#toneMapping ). Defaults to true. |
| `useLighting` | `boolean` | - | Apply lighting |
| `useMetalness` | `boolean` | - | Use metalness properties instead of specular. When enabled, diffuse colors also affect specular instead of the dedicated specular map. This can be used as alternative to specular color to save space. With metalness == 0, the pixel is assumed to be dielectric, and diffuse color is used as normal. With metalness == 1, the pixel is fully metallic, and diffuse color is used as specular color instead. |
| `useMetalnessSpecularColor` | `boolean` | - | When metalness is enabled, use the specular map to apply color tint to specular reflections. |
| `useSkybox` | `boolean` | - | Apply scene skybox as prefiltered environment map |
| `_uniformCache` | `{}` | - |  |
| `copy` | `(source: StandardMaterial) => StandardMaterial` | - | Copy a `StandardMaterial`. |
| `_alphaDither` | `any` | - |  |
| `_getMapTransformId` | `any` | - | Returns the transform group assigned to a texture map. |
| `setAttribute` | `(name: string, semantic: string) => void` | - | Sets a vertex shader attribute on a material. |
| `_setParameter` | `(name: any, value: any) => void` | - |  |
| `_setParameters` | `(parameters: any) => void` | - |  |
| `_processParameters` | `(paramsName: any) => void` | - |  |
| `_updateMap` | `(p: any) => void` | - |  |
| `_allocUniform` | `(name: any, allocFunc: any) => any` | - |  |
| `getUniform` | `(name: any, device: any, scene: any) => any` | - |  |
| `updateEnvUniforms` | `(device: any, scene: any) => void` | - |  |
| `meshInstances` | `any` | - | The mesh instances referencing this material |
| `name` | `string` | - | The name of the material. |
| `userId` | `string` | - | A unique id the user can assign to the material. The engine internally does not use this for anything, and the user can assign a value to this id for any purpose they like. Defaults to an empty string. |
| `id` | `number` | - |  |
| `_definesDirty` | `boolean` | - |  |
| `_definesKey` | `any` | - | Cached content key for Material#defines , or null when it needs recomputing. An empty defines set caches as '', so null unambiguously means "dirty". |
| `parameters` | `{}` | - |  |
| `alphaTest` | `number` | - | The alpha test reference value to control which fragments are written to the currently active render target based on alpha value. All fragments with an alpha value of less than the alphaTest reference value will be discarded. alphaTest defaults to 0 (all fragments pass). |
| `alphaToCoverage` | `boolean` | - | Enables or disables alpha to coverage. When enabled, and if hardware anti-aliasing is on, limited order-independent transparency can be achieved. Quality depends on the number of MSAA samples of the current render target. It can nicely soften edges of otherwise sharp alpha cutouts, but isn't recommended for large area semi-transparent surfaces. Note, that you don't need to enable blending to make alpha to coverage work. It will work without it, just like alphaTest. This requires a multi-sampled render target, and is silently ignored when rendering to a single-sampled one. On WebGPU it additionally requires the first color attachment of the render target to use a blendable format with an alpha channel, and is silently ignored otherwise - note that PIXELFORMAT_111110F, the default HDR format used by CameraFrame, has no alpha channel. |
| `_sceneTexturesWrite` | `any` | - | Explicit setting of sceneTexturesWrite, or undefined to derive it from transparency. |
| `cull` | `number` | - | Controls how triangles are culled based on their face direction with respect to the viewpoint. Can be: - CULLFACE_NONE: Do not cull triangles based on face direction. - CULLFACE_BACK: Cull the back faces of triangles (do not render triangles facing away from the view point). - CULLFACE_FRONT: Cull the front faces of triangles (do not render triangles facing towards the view point). Defaults to CULLFACE_BACK. |
| `frontFace` | `number` | - | Controls whether polygons are front- or back-facing by setting a winding orientation. Can be: - FRONTFACE_CW: The clock-wise winding. - FRONTFACE_CCW: The counterclockwise winding. Defaults to FRONTFACE_CCW. |
| `stencilFront` | `StencilParameters \| null` | - | Stencil parameters for front faces (default is null). |
| `stencilBack` | `StencilParameters \| null` | - | Stencil parameters for back faces (default is null). |
| `_shaderChunks` | `any` | - |  |
| `_oldChunks` | `{}` | - |  |
| `_dirtyShader` | `boolean` | - |  |
| `flatShading` | `boolean` | - | Enables or disables flat shading. When enabled, the surface is shaded using the geometric normal of the triangle the fragment belongs to, instead of the normal interpolated from the vertex normals, giving the mesh a faceted look. This works on skinned and morphed geometry as well. The geometric normal is oriented to match the winding of the triangle, as configured by Material#frontFace , and so it agrees with correctly authored vertex normals. Flat shading therefore only changes the faceting - Material#cull , Material#frontFace  and StandardMaterial#twoSidedLighting  all behave the same as they do for smooth shading. StandardMaterial and LitMaterial implement this automatically. For a ShaderMaterial, this adds a `FLAT_SHADING` define to the shader, which the supplied shader code needs to handle. The `flatNormalPS` chunk provides the `getFlatNormal` function used by the engine internally, and can be used for this: ```javascript #include "flatNormalPS" ... #ifdef FLAT_SHADING vec3 normal = getFlatNormal(worldPos); #else vec3 normal = normalize(interpolatedNormal); #endif ``` As with other material properties, call Material#update  after changing this. Defaults to false. Gets whether flat shading is enabled. |
| `getShaderChunks` | `(shaderLanguage?: string \| undefined) => ShaderChunkMap` | - | Returns an object containing shader chunks for a specific shader language for the material. These chunks define custom GLSL or WGSL code used to construct the final shader for the material. The chunks can be also be included in shaders using the `#include "ChunkName"` directive. On the WebGL platform: - If GLSL chunks are provided, they are used directly. On the WebGPU platform: - If WGSL chunks are provided, they are used directly. - If only GLSL chunks are provided, a GLSL shader is generated and then transpiled to WGSL, which is less efficient. To ensure faster shader compilation, it is recommended to provide shader chunks for all supported platforms. A simple example on how to override a shader chunk providing emissive color for both GLSL and WGSL to simply return a red color: ```javascript material.getShaderChunks(SHADERLANGUAGE_GLSL).set('emissivePS', ` void getEmission() { dEmission = vec3(1.0, 0.0, 1.0); } `); material.getShaderChunks(SHADERLANGUAGE_WGSL).set('emissivePS', ` fn getEmission() { dEmission = vec3f(1.0, 0.0, 1.0); } `); // call update to apply the changes material.update(); ``` |
| `shaderChunksVersion` | `string` | - | Sets the version of the shader chunks. This should be a string containing the current engine major and minor version (e.g., '2.8' for engine v2.8.1) and ensures compatibility with the current engine version. When providing custom shader chunks, set this to the latest supported version. If a future engine release no longer supports the specified version, a warning will be issued. In that case, update your shader chunks to match the new format and set this to the latest version accordingly. Returns the version of the shader chunks. |
| `depthBias` | `number` | - | Sets the offset for the output depth buffer value. Useful for decals to prevent z-fighting. Typically a small negative value (-0.1) is used to render the mesh slightly closer to the camera. Gets the offset for the output depth buffer value. |
| `slopeDepthBias` | `number` | - | Sets the offset for the output depth buffer value based on the slope of the triangle relative to the camera. Gets the offset for the output depth buffer value based on the slope of the triangle relative to the camera. |
| `_shaderVersion` | `number` | - |  |
| `_scene` | `any` | - |  |
| `_updateVersion` | `any` | - | Incremented by Material#update  so internal consumers can detect material changes without consuming shared dirty state. |
| `_preparedVersion` | `any` | - | The update version most recently processed by Material#prepareForRender . |
| `redWrite` | `boolean` | - | Sets whether the red channel is written to the color buffer. If true, the red component of fragments generated by the shader of this material is written to the color buffer of the currently active render target. If false, the red component will not be written. Defaults to true. Gets whether the red channel is written to the color buffer. |
| `greenWrite` | `boolean` | - | Sets whether the green channel is written to the color buffer. If true, the red component of fragments generated by the shader of this material is written to the color buffer of the currently active render target. If false, the green component will not be written. Defaults to true. Gets whether the green channel is written to the color buffer. |
| `blueWrite` | `boolean` | - | Sets whether the blue channel is written to the color buffer. If true, the red component of fragments generated by the shader of this material is written to the color buffer of the currently active render target. If false, the blue component will not be written. Defaults to true. Gets whether the blue channel is written to the color buffer. |
| `alphaWrite` | `boolean` | - | Sets whether the alpha channel is written to the color buffer. If true, the red component of fragments generated by the shader of this material is written to the color buffer of the currently active render target. If false, the alpha component will not be written. Defaults to true. Gets whether the alpha channel is written to the color buffer. |
| `transparent` | `boolean` | - |  |
| `_updateTransparency` | `() => void` | - |  |
| `blendState` | `Readonly<BlendState>` | - | Sets the blend state for this material. Controls how fragment shader outputs are blended when being written to the currently active render target. This overwrites blending type set using blendType, and offers more control over blending. Gets the blend state for this material. Use the setter to update transparency and sort state. |
| `blendType` | `number` | - | Sets the blend mode for this material. Controls how fragment shader outputs are blended when being written to the currently active render target. Can be: - BLEND_SUBTRACTIVE: Subtract the color of the source fragment from the destination fragment and write the result to the frame buffer. - BLEND_ADDITIVE: Add the color of the source fragment to the destination fragment and write the result to the frame buffer. - BLEND_NORMAL: Enable simple translucency for materials such as glass. This is equivalent to enabling a source blend mode of BLENDMODE_SRC_ALPHA and a destination blend mode of BLENDMODE_ONE_MINUS_SRC_ALPHA. - BLEND_NONE: Disable blending. - BLEND_PREMULTIPLIED: Similar to BLEND_NORMAL expect the source fragment is assumed to have already been multiplied by the source alpha value. - BLEND_MULTIPLICATIVE: Multiply the color of the source fragment by the color of the destination fragment and write the result to the frame buffer. - BLEND_ADDITIVEALPHA: Same as BLEND_ADDITIVE except the source RGB is multiplied by the source alpha. - BLEND_MULTIPLICATIVE2X: Multiplies colors and doubles the result. - BLEND_SCREEN: Softer version of additive. - BLEND_MIN: Minimum color. - BLEND_MAX: Maximum color. Defaults to BLEND_NONE. Gets the blend mode for this material. |
| `depthState` | `DepthState` | - | Sets the depth state. Note that this can also be done by using depthTest, depthFunc and depthWrite. Gets the depth state. |
| `depthTest` | `boolean` | - | Sets whether depth testing is enabled. If true, fragments generated by the shader of this material are only written to the current render target if they pass the depth test. If false, fragments generated by the shader of this material are written to the current render target regardless of what is in the depth buffer. Defaults to true. Gets whether depth testing is enabled. |
| `depthFunc` | `number` | - | Sets the depth test function. Controls how the depth of new fragments is compared against the current depth contained in the depth buffer. Can be: - FUNC_NEVER: don't draw - FUNC_LESS: draw if new depth < depth buffer - FUNC_EQUAL: draw if new depth == depth buffer - FUNC_LESSEQUAL: draw if new depth <= depth buffer - FUNC_GREATER: draw if new depth > depth buffer - FUNC_NOTEQUAL: draw if new depth != depth buffer - FUNC_GREATEREQUAL: draw if new depth >= depth buffer - FUNC_ALWAYS: always draw Defaults to FUNC_LESSEQUAL. Gets the depth test function. |
| `depthWrite` | `boolean` | - | Sets whether depth writing is enabled. If true, fragments generated by the shader of this material write a depth value to the depth buffer of the currently active render target. If false, no depth value is written. Defaults to true. Gets whether depth writing is enabled. |
| `clone` | `() => StandardMaterial` | - | Clone a material. |
| `_updateMeshInstanceKeys` | `() => void` | - |  |
| `_clearVariantsIfDirty` | `any` | - |  |
| `updateUniforms` | `(device: any, scene: any) => void` | - |  |
| `update` | `() => void` | - | Applies any changes made to the material's properties. This method should be called after modifying material properties to ensure the changes take effect. The method will clear cached shader variants and trigger recompilation if: - Modified material properties require a different shader variant (e.g., enabling/disabling textures or other properties that affect shader generation) - Material-specific shader chunks (from getShaderChunks) have been modified - Global shader chunks (from ShaderChunks.get) have been modified - Material defines have been changed Note: Shaders are not compiled immediately. Instead, existing shader variants are cleared and new variants will be compiled on-demand as they are needed for different render passes (e.g., forward, shadow, pick). When global shader chunks are modified, `update()` must be called on each material that should reflect those changes. |
| `clearParameters` | `() => void` | - |  |
| `getParameters` | `() => {}` | - |  |
| `clearVariants` | `() => void` | - |  |
| `getParameter` | `(name: string) => object` | - | Retrieves the specified shader parameter from a material. |
| `_setParameterSimple` | `(name: any, data: any) => void` | - |  |
| `setParameter` | `(name: string, data: number \| Texture \| number[] \| ArrayBufferView<ArrayBufferLike> \| StorageBuffer) => void` | - | Sets a shader parameter on a material. |
| `deleteParameter` | `(name: string) => void` | - | Deletes a shader parameter on a material. |
| `setParameters` | `(device: any, names: any) => void` | - |  |
| `setDefine` | `(name: string, value: string \| boolean \| undefined) => void` | - | Adds or removes a define on the material. Defines can be used to enable or disable various parts of the shader code. |
| `getDefine` | `(name: string) => boolean` | - | Returns true if a define is enabled on the material, otherwise false. |
| `destroy` | `() => void` | - | Removes this material from the scene and possibly frees up memory from its shaders (if there are no other materials using it). |

## Further examples

### Advanced Properties

The `StandardMaterial` accepts many different properties which can be found [here](https://api.playcanvas.com/engine/classes/StandardMaterial.html).

```jsx copy
import { useMaterial } from '@playcanvas/react/hooks'

function AdvancedMaterial() {
  const material = useMaterial({
    diffuse: 'purple',
    opacity: 0.9,
    metalness: 0.3,
    roughness: 0.4,
    emissive: 'yellow',
    emissiveIntensity: 0.2,
    specular: 'white',
    shininess: 50,
    reflectivity: 0.8,
    clearCoat: 0.5,
    clearCoatRoughness: 0.1
  })
  
  return <Render type="box" material={material} />
}
```

### Material with Textures

You can use textures with the material by loading them with the [`useTexture`](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usetexture) hook.

```jsx copy
import { useMaterial } from '@playcanvas/react/hooks'
import { useTexture } from '@playcanvas/react/hooks'

function TexturedMaterialExample() {
  const { asset: diffuseMap } = useTexture('diffuse.jpg')
  const { asset: normalMap } = useTexture('normal.jpg')
  const { asset: roughnessMap } = useTexture('roughness.jpg')
  
  const material = useMaterial({
    diffuseMap: diffuseMap?.resource,
    normalMap: normalMap?.resource,
    roughnessMap: roughnessMap?.resource,
    diffuse: 'white',
    metalness: 0.5,
    roughness: 0.5
  })
  
  return <Render type="box" material={material} />
}
```

### Material Sharing

You can easily share materials between multiple render components:

```jsx copy
import { useMaterial } from '@playcanvas/react/hooks'

function SharedMaterial() {
  const material = useMaterial({
    diffuse: 'orange',
    metalness: 0.7,
    roughness: 0.3
  })
  
  return (
    <div>
      <Render type="box" material={material} />
      <Render type="sphere" material={material} />
      <Render type="cylinder" material={material} />
    </div>
  )
}
```

## Related

- [useTexture](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usetexture) - Load texture assets
- [Render Component](https://developer.playcanvas.com/user-manual/react/api/render.md) - Use materials with render components
- [StandardMaterial API](https://api.playcanvas.com/engine/classes/StandardMaterial.html) - PlayCanvas material documentation
