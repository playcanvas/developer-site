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
| `anisotropyMap?` | `Texture \| null` | - | The anisotropy map of the material (default is null). |
| `anisotropyMapOffset?` | `[number, number]` | - | Controls the 2D offset of the anisotropy map. Each component is between 0 and 1. |
| `anisotropyMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the anisotropy map. |
| `anisotropyMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the anisotropy map. |
| `anisotropyMapUv?` | `number` | - | Anisotropy map UV channel. Valid values are 0 to 7. |
| `aoMap?` | `Texture \| null` | - | The main (primary) baked ambient occlusion (AO) map (default is null). Modulates ambient color. |
| `aoMapChannel?` | `string` | - | Color channel of the main (primary) AO map to use. Can be "r", "g", "b" or "a". |
| `aoMapOffset?` | `[number, number]` | - | Controls the 2D offset of the main (primary) AO map. Each component is between 0 and 1. |
| `aoMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the main (primary) AO map. |
| `aoMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the main (primary) AO map. |
| `aoMapUv?` | `number` | - | Main (primary) AO map UV channel. Valid values are 0 to 7. |
| `aoDetailMap?` | `Texture \| null` | - | The detail (secondary) baked ambient occlusion (AO) map of the material (default is null). Will only be used if main (primary) ao map is non-null. |
| `aoDetailMapChannel?` | `string` | - | Color channels of the detail (secondary) AO map to use. Can be "r", "g", "b" or "a" (default is "g"). |
| `aoDetailMapOffset?` | `[number, number]` | - | Controls the 2D offset of the detail (secondary) AO map. Each component is between 0 and 1. |
| `aoDetailMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the detail (secondary) AO map. |
| `aoDetailMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the detail (secondary) AO map. |
| `aoDetailMapUv?` | `number` | - | Detail (secondary) AO map UV channel. Valid values are 0 to 7. |
| `aoDetailMode?` | `string` | - | Determines how the main (primary) and detail (secondary) AO maps are blended together. Can be: - DETAILMODE_MUL: Multiply together the primary and secondary colors. - DETAILMODE_ADD: Add together the primary and secondary colors. - DETAILMODE_SCREEN: Softer version of DETAILMODE_ADD. - DETAILMODE_OVERLAY: Multiplies or screens the colors, depending on the primary color. - DETAILMODE_MIN: Select whichever of the primary and secondary colors is darker, component-wise. - DETAILMODE_MAX: Select whichever of the primary and secondary colors is lighter, component-wise. Defaults to DETAILMODE_MUL. |
| `aoVertexColor?` | `boolean` | - | Use mesh vertex colors for AO. If aoMap is set, it'll be multiplied by vertex colors. |
| `aoVertexColorChannel?` | `string` | - | Vertex color channels to use for AO. Can be "r", "g", "b" or "a". |
| `clearCoatGlossInvert?` | `boolean` | - | Invert the clearcoat gloss component (default is false). Enabling this flag results in material treating the clear coat gloss members as roughness. |
| `clearCoatGlossMap?` | `Texture \| null` | - | Monochrome clearcoat glossiness map (default is null). If specified, will be multiplied by normalized 'clearCoatGloss' value and/or vertex colors. |
| `clearCoatGlossMapChannel?` | `string` | - | Color channel of the clearcoat gloss map to use. Can be "r", "g", "b" or "a". |
| `clearCoatGlossMapOffset?` | `[number, number]` | - | Controls the 2D offset of the clearcoat gloss map. Each component is between 0 and 1. |
| `clearCoatGlossMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the clear coat gloss map. |
| `clearCoatGlossMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the clearcoat gloss map. |
| `clearCoatGlossMapUv?` | `number` | - | Clearcoat gloss map UV channel. Valid values are 0 to 7. |
| `clearCoatGlossVertexColor?` | `boolean` | - | Use mesh vertex colors for clearcoat glossiness. If clearCoatGlossMap is set, it'll be multiplied by vertex colors. |
| `clearCoatGlossVertexColorChannel?` | `string` | - | Vertex color channel to use for clearcoat glossiness. Can be "r", "g", "b" or "a". |
| `clearCoatMap?` | `Texture \| null` | - | Monochrome clearcoat intensity map (default is null). If specified, will be multiplied by normalized 'clearCoat' value and/or vertex colors. |
| `clearCoatMapChannel?` | `string` | - | Color channel of the clearcoat intensity map to use. Can be "r", "g", "b" or "a". |
| `clearCoatMapOffset?` | `[number, number]` | - | Controls the 2D offset of the clearcoat intensity map. Each component is between 0 and 1. |
| `clearCoatMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the clearcoat intensity map. |
| `clearCoatMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the clearcoat intensity map. |
| `clearCoatMapUv?` | `number` | - | Clearcoat intensity map UV channel. Valid values are 0 to 7. |
| `clearCoatNormalMap?` | `Texture \| null` | - | The clearcoat normal map of the material (default is null). The texture must contains normalized, tangent space normals. |
| `clearCoatNormalMapOffset?` | `[number, number]` | - | Controls the 2D offset of the main clearcoat normal map. Each component is between 0 and 1. |
| `clearCoatNormalMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the main clearcoat map. |
| `clearCoatNormalMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the main clearcoat normal map. |
| `clearCoatNormalMapUv?` | `number` | - | Clearcoat normal map UV channel. Valid values are 0 to 7. |
| `clearCoatVertexColor?` | `boolean` | - | Use mesh vertex colors for clearcoat intensity. If clearCoatMap is set, it'll be multiplied by vertex colors. |
| `clearCoatVertexColorChannel?` | `string` | - | Vertex color channel to use for clearcoat intensity. Can be "r", "g", "b" or "a". |
| `cubeMap?` | `Texture \| null` | - | The cubic environment map of the material (default is null). This setting overrides sphereMap and will replace the scene lighting environment. |
| `cubeMapProjection?` | `number` | - | The type of projection applied to the cubeMap property: - CUBEPROJ_NONE: The cube map is treated as if it is infinitely far away. - CUBEPROJ_BOX: Box-projection based on a world space axis-aligned bounding box. Defaults to CUBEPROJ_NONE. |
| `diffuseDetailMap?` | `Texture \| null` | - | The detail (secondary) diffuse map of the material (default is null). Will only be used if main (primary) diffuse map is non-null. |
| `diffuseDetailMapChannel?` | `string` | - | Color channels of the detail (secondary) diffuse map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `diffuseDetailMapOffset?` | `[number, number]` | - | Controls the 2D offset of the detail (secondary) diffuse map. Each component is between 0 and 1. |
| `diffuseDetailMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the detail (secondary) diffuse map. |
| `diffuseDetailMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the detail (secondary) diffuse map. |
| `diffuseDetailMapUv?` | `number` | - | Detail (secondary) diffuse map UV channel. Valid values are 0 to 7. |
| `diffuseDetailMode?` | `string` | - | Determines how the main (primary) and detail (secondary) diffuse maps are blended together. Can be: - DETAILMODE_MUL: Multiply together the primary and secondary colors. - DETAILMODE_ADD: Add together the primary and secondary colors. - DETAILMODE_SCREEN: Softer version of DETAILMODE_ADD. - DETAILMODE_OVERLAY: Multiplies or screens the colors, depending on the primary color. - DETAILMODE_MIN: Select whichever of the primary and secondary colors is darker, component-wise. - DETAILMODE_MAX: Select whichever of the primary and secondary colors is lighter, component-wise. Defaults to DETAILMODE_MUL. |
| `diffuseMap?` | `Texture \| null` | - | The main (primary) diffuse map of the material (default is null). |
| `diffuseMapChannel?` | `string` | - | Color channels of the main (primary) diffuse map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `diffuseMapOffset?` | `[number, number]` | - | Controls the 2D offset of the main (primary) diffuse map. Each component is between 0 and 1. |
| `diffuseMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the main (primary) diffuse map. |
| `diffuseMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the main (primary) diffuse map. |
| `diffuseMapUv?` | `number` | - | Main (primary) diffuse map UV channel. Valid values are 0 to 7. |
| `diffuseVertexColor?` | `boolean` | - | Multiply diffuse by the mesh vertex colors. |
| `diffuseVertexColorChannel?` | `string` | - | Vertex color channels to use for diffuse. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `emissiveMap?` | `Texture \| null` | - | The emissive map of the material (default is null). Can be HDR. When the emissive map is applied, the emissive color is multiplied by the texel color in the map. Since the emissive color is black by default, the emissive map won't be visible unless the emissive color is changed. |
| `emissiveMapChannel?` | `string` | - | Color channels of the emissive map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `emissiveMapOffset?` | `[number, number]` | - | Controls the 2D offset of the emissive map. Each component is between 0 and 1. |
| `emissiveMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the emissive map. |
| `emissiveMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the emissive map. |
| `emissiveMapUv?` | `number` | - | Emissive map UV channel. Valid values are 0 to 7. |
| `emissiveVertexColor?` | `boolean` | - | Use mesh vertex colors for emission. If emissiveMap or emissive are set, they'll be multiplied by vertex colors. |
| `emissiveVertexColorChannel?` | `string` | - | Vertex color channels to use for emission. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `enableGGXSpecular?` | `boolean` | - | Enables GGX specular. Also enables anisotropyIntensity parameter to set material anisotropy. |
| `envAtlas?` | `Texture \| null` | - | The prefiltered environment lighting atlas (default is null). This setting overrides cubeMap and sphereMap and will replace the scene lighting environment. |
| `fresnelModel?` | `number` | - | Defines the formula used for Fresnel effect. As a side-effect, enabling any Fresnel model changes the way diffuse and reflection components are combined. When Fresnel is off, legacy non energy-conserving combining is used. When it is on, combining behavior is energy-conserving. - FRESNEL_NONE: No Fresnel. - FRESNEL_SCHLICK: Schlick's approximation of Fresnel (recommended). Parameterized by specular color. |
| `glossInvert?` | `boolean` | - | Invert the gloss component (default is false). Enabling this flag results in material treating the gloss members as roughness. |
| `glossMap?` | `Texture \| null` | - | Gloss map (default is null). If specified, will be multiplied by normalized gloss value and/or vertex colors. |
| `glossMapChannel?` | `string` | - | Color channel of the gloss map to use. Can be "r", "g", "b" or "a". |
| `glossMapOffset?` | `[number, number]` | - | Controls the 2D offset of the gloss map. Each component is between 0 and 1. |
| `glossMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the gloss map. |
| `glossMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the gloss map. |
| `glossMapUv?` | `number` | - | Gloss map UV channel. Valid values are 0 to 7. |
| `glossVertexColor?` | `boolean` | - | Use mesh vertex colors for glossiness. If glossMap is set, it'll be multiplied by vertex colors. |
| `glossVertexColorChannel?` | `string` | - | Vertex color channel to use for glossiness. Can be "r", "g", "b" or "a". |
| `heightMap?` | `Texture \| null` | - | The height map of the material (default is null). Used for a view-dependent parallax effect. The texture must represent the height of the surface where darker pixels are lower and lighter pixels are higher, with heightMapBase selecting the value that sits at the level of the original geometry. It is recommended to use it together with a normal map. Note that the parallax offset is applied to all other maps of the material, so the height map should use the same tiling and offset as those maps. |
| `heightMapChannel?` | `string` | - | Color channel of the height map to use. Can be "r", "g", "b" or "a". |
| `heightMapOffset?` | `[number, number]` | - | Controls the 2D offset of the height map. Each component is between 0 and 1. |
| `heightMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the height map. |
| `heightMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the height map. |
| `heightMapUv?` | `number` | - | Height map UV channel. Valid values are 0 to 7. |
| `lightMap?` | `Texture \| null` | - | A custom lightmap of the material (default is null). Lightmaps are textures that contain pre-rendered lighting. Can be HDR. When a mesh instance rendered with this material has a lightmap of its own, baked by the Lightmapper, that lightmap is used instead of this one. |
| `lightMapChannel?` | `string` | - | Color channels of the lightmap to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `lightMapOffset?` | `[number, number]` | - | Controls the 2D offset of the lightmap. Each component is between 0 and 1. |
| `lightMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the lightmap. |
| `lightMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the lightmap. |
| `lightMapUv?` | `number` | - | Lightmap UV channel. Valid values are 0 to 7. |
| `lightVertexColor?` | `boolean` | - | Use baked vertex lighting. If lightMap is set, it'll be multiplied by vertex colors. |
| `lightVertexColorChannel?` | `string` | - | Vertex color channels to use for baked lighting. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `metalnessMap?` | `Texture \| null` | - | Monochrome metalness map (default is null). |
| `metalnessMapChannel?` | `string` | - | Color channel of the metalness map to use. Can be "r", "g", "b" or "a". |
| `metalnessMapOffset?` | `[number, number]` | - | Controls the 2D offset of the metalness map. Each component is between 0 and 1. |
| `metalnessMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the metalness map. |
| `metalnessMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the metalness map. |
| `metalnessMapUv?` | `number` | - | Metalness map UV channel. Valid values are 0 to 7. |
| `metalnessVertexColor?` | `boolean` | - | Use mesh vertex colors for metalness. If metalnessMap is set, it'll be multiplied by vertex colors. |
| `metalnessVertexColorChannel?` | `string` | - | Vertex color channel to use for metalness. Can be "r", "g", "b" or "a". |
| `normalDetailMap?` | `Texture \| null` | - | The detail (secondary) normal map of the material (default is null). Will only be used if main (primary) normal map is non-null. |
| `normalDetailMapOffset?` | `[number, number]` | - | Controls the 2D offset of the detail (secondary) normal map. Each component is between 0 and 1. |
| `normalDetailMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the detail (secondary) normal map. |
| `normalDetailMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the detail (secondary) normal map. |
| `normalDetailMapUv?` | `number` | - | Detail (secondary) normal map UV channel. Valid values are 0 to 7. |
| `normalMap?` | `Texture \| null` | - | The main (primary) normal map of the material (default is null). The texture must contains normalized, tangent space normals. |
| `normalMapOffset?` | `[number, number]` | - | Controls the 2D offset of the main (primary) normal map. Each component is between 0 and 1. |
| `normalMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the main (primary) normal map. |
| `normalMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the main (primary) normal map. |
| `normalMapUv?` | `number` | - | Main (primary) normal map UV channel. Valid values are 0 to 7. |
| `occludeDirect?` | `boolean` | - | Tells if AO should darken directional lighting. Defaults to false. |
| `occludeSpecular?` | `number` | - | Uses ambient occlusion to darken specular/reflection. It's a hack, because real specular occlusion is view-dependent. However, it can be better than nothing. - SPECOCC_NONE: No specular occlusion - SPECOCC_AO: Use AO directly to occlude specular. - SPECOCC_GLOSSDEPENDENT: Modify AO based on material glossiness/view angle to occlude specular. |
| `opacityDither?` | `string` | - | Used to specify whether opacity is dithered, which allows transparency without alpha blending. Can be: - DITHER_NONE: Opacity dithering is disabled. - DITHER_BAYER2: Opacity is dithered using a Bayer 2 matrix. - DITHER_BAYER4: Opacity is dithered using a Bayer 4 matrix. - DITHER_BAYER8: Opacity is dithered using a Bayer 8 matrix. - DITHER_BAYER16: Opacity is dithered using a Bayer 16 matrix. - DITHER_BLUENOISE: Opacity is dithered using a blue noise. - DITHER_IGNNOISE: Opacity is dithered using an interleaved gradient noise. Defaults to DITHER_NONE. |
| `opacityShadowDither?` | `string` | - | Used to specify whether shadow opacity is dithered, which allows shadow transparency without alpha blending. Can be: - DITHER_NONE: Opacity dithering is disabled. - DITHER_BAYER2: Opacity is dithered using a Bayer 2 matrix. - DITHER_BAYER4: Opacity is dithered using a Bayer 4 matrix. - DITHER_BAYER8: Opacity is dithered using a Bayer 8 matrix. - DITHER_BAYER16: Opacity is dithered using a Bayer 16 matrix. - DITHER_BLUENOISE: Opacity is dithered using a blue noise. - DITHER_IGNNOISE: Opacity is dithered using an interleaved gradient noise. Defaults to DITHER_NONE. |
| `opacityFadesSpecular?` | `boolean` | - | Used to specify whether specular and reflections are faded out using opacity. Default is true. When set to false use alphaFade to fade out materials. |
| `opacityMap?` | `Texture \| null` | - | The opacity map of the material (default is null). |
| `opacityMapChannel?` | `string` | - | Color channel of the opacity map to use. Can be "r", "g", "b" or "a". |
| `opacityMapOffset?` | `[number, number]` | - | Controls the 2D offset of the opacity map. Each component is between 0 and 1. |
| `opacityMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the opacity map. |
| `opacityMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the opacity map. |
| `opacityMapUv?` | `number` | - | Opacity map UV channel. Valid values are 0 to 7. |
| `opacityVertexColor?` | `boolean` | - | Use mesh vertex colors for opacity. If opacityMap is set, it'll be multiplied by vertex colors. |
| `opacityVertexColorChannel?` | `string` | - | Vertex color channels to use for opacity. Can be "r", "g", "b" or "a". |
| `pixelSnap?` | `boolean` | - | Align vertices to pixel coordinates when rendering. Useful for pixel perfect 2D graphics. |
| `shadowCatcher?` | `boolean` | - | When enabled, the material will output accumulated directional shadow value in linear space as the color. |
| `specularMap?` | `Texture \| null` | - | The specular map of the material (default is null). |
| `specularMapChannel?` | `string` | - | Color channels of the specular map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `specularMapOffset?` | `[number, number]` | - | Controls the 2D offset of the specular map. Each component is between 0 and 1. |
| `specularMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the specular map. |
| `specularMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the specular map. |
| `specularMapUv?` | `number` | - | Specular map UV channel. Valid values are 0 to 7. |
| `specularVertexColor?` | `boolean` | - | Multiply specular by the mesh vertex colors. |
| `specularVertexColorChannel?` | `string` | - | Vertex color channels to use for specular. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `specularityFactorMap?` | `Texture \| null` | - | The factor of specularity as a texture (default is null). |
| `specularityFactorMapChannel?` | `string` | - | The channel used by the specularity factor texture to sample from (default is 'a'). |
| `specularityFactorMapOffset?` | `[number, number]` | - | Controls the 2D offset of the specularity factor map. Each component is between 0 and 1. |
| `specularityFactorMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the specularity factor map. |
| `specularityFactorMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the specularity factor map. |
| `specularityFactorMapUv?` | `number` | - | Specularity factor map UV channel. Valid values are 0 to 7. |
| `useSheen?` | `boolean` | - | Toggle sheen specular effect on/off. |
| `sheenMap?` | `Texture \| null` | - | The sheen microstructure color map of the material (default is null). |
| `sheenMapChannel?` | `string` | - | Color channels of the sheen map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `sheenMapOffset?` | `[number, number]` | - | Controls the 2D offset of the sheen map. Each component is between 0 and 1. |
| `sheenMapRotation?` | `number` | - | Controls the 2D rotation (in degrees) of the sheen map. |
| `sheenMapTiling?` | `[number, number]` | - | Controls the 2D tiling of the sheen map. |
| `sheenMapUv?` | `number` | - | Sheen map UV channel. Valid values are 0 to 7. |
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
| `diffuse?` | `string` | - | Sets the diffuse color of the material, specified in sRGB color space. This color value is 3-component (RGB), where each component is between 0 and 1. Defines basic surface color (aka albedo). Gets the diffuse color of the material. |
| `emissive?` | `string` | - | Sets the emissive color of the material, specified in sRGB color space. This color value is 3-component (RGB), where each component is between 0 and 1. The emission is this color multiplied by StandardMaterial#emissiveIntensity , and by the emissive map when one is set. Gets the emissive color of the material. |
| `emissiveIntensity?` | `number` | - | Sets the emissive color multiplier. Defaults to 1. Gets the emissive color multiplier. |
| `ambient?` | `string` | - | The ambient color of the material, specified in sRGB color space. This color value is 3-component (RGB), where each component is between 0 and 1. Gets the ambient color of the material. |
| `specular?` | `string` | - | The specular color of the material, specified in sRGB color space. This color value is 3-component (RGB), where each component is between 0 and 1. Defines surface reflection/specular color. Affects specular intensity and tint. Gets the specular color of the material. |
| `sheen?` | `string` | - | The specular color of the sheen (fabric) microfiber structure, specified in sRGB color space. This color value is 3-component (RGB), where each component is between 0 and 1. Gets the sheen color of the material. |
| `attenuation?` | `string` | - | The attenuation color for refractive materials, specified in sRGB color space. Only used when useDynamicRefraction is enabled. Gets the attenuation color of the material. |
| `specularityFactor?` | `number` | - | The factor of specular intensity, used to weight the fresnel and specularity. Default is 1.0. Gets the specularity factor of the material. |
| `sheenGloss?` | `number` | - | The glossiness of the sheen (fabric) microfiber structure. This color value is a single value between 0 and 1. Gets the sheen glossiness of the material. |
| `gloss?` | `number` | - | Defines the glossiness of the material from 0 (rough) to 1 (shiny). Materials imported from glTF enable StandardMaterial#glossInvert , which reverses this: on those materials gloss holds roughness, so 0 is shiny and 1 is rough. Gets the glossiness of the material. |
| `aoIntensity?` | `number` | - | Ambient occlusion intensity. Defaults to 1. Gets the ambient occlusion intensity of the material. |
| `heightMapBase?` | `number` | - | The height map value that sits at the level of the original geometry, in the 0 to 1 range (default is 0.5). Relief above the base appears to stand out of the surface and relief below it appears to sink in. Set it to 1 to treat the map as pure depth carved below the geometry, or to 0 to treat it as pure elevation above it. Both parallax modes honor it. Gets the height map base level of the material. |
| `parallaxSamples?` | `number` | - | The maximum number of height map taps taken along the view ray when parallaxMode  is PARALLAX_OCCLUSION (default is 16). Fewer taps are taken as the view direction approaches the surface normal, where the ray barely moves. Has no effect in * PARALLAX_OFFSET mode. Gets the maximum number of height map taps of parallax occlusion mapping of the material. |
| `parallaxShadowSamples?` | `number` | - | The maximum number of height map taps taken towards each directional light to shadow the relief against itself, or 0 to disable it (default is 0). The shadow is soft: the march accumulates how far the height field stands above the light ray and weights it by distance, so more taps buy a smoother penumbra rather than an earlier exit. Applies only to directional lights, and only when parallaxMode  is PARALLAX_OCCLUSION. Gets the maximum number of height map taps of the parallax self shadowing of the material. |
| `opacity?` | `number` | - | The opacity of the material. This value can be between 0 and 1, where 0 is fully transparent and 1 is fully opaque. If you want the material to be semi-transparent you also need to set the Material#blendType  to BLEND_NORMAL, BLEND_ADDITIVE or any other mode. Also note that for most semi-transparent objects you want Material#depthWrite to be false, otherwise they can fully occlude objects behind them. Gets the opacity of the material. |
| `alphaFade?` | `number` | - | Used to fade out materials when opacityFadesSpecular is set to false. Gets the alpha fade of the material. |
| `bumpiness?` | `number` | - | The bumpiness of the material. This value scales the assigned main (primary) normal map. It should be normally between 0 (no bump mapping) and 1 (full bump mapping), but can be set to e.g. 2 to give even more pronounced bump effect. Gets the bumpiness of the material. |
| `normalDetailMapBumpiness?` | `number` | - | The bumpiness of the material. This value scales the assigned detail (secondary) normal map. It should be normally between 0 (no bump mapping) and 1 (full bump mapping), but can be set to e.g. 2 to give even more pronounced bump effect. Gets the detail normal map bumpiness of the material. |
| `reflectivity?` | `number` | - | Environment map intensity. Gets the environment map intensity of the material. |
| `occludeSpecularIntensity?` | `number` | - | Controls visibility of specular occlusion. Gets the specular occlusion intensity of the material. |
| `refraction?` | `number` | - | Defines the visibility of refraction. Material can refract the same cube map as used for reflections. Gets the refraction of the material. |
| `refractionIndex?` | `number` | - | Defines the index of refraction, i.e. The amount of distortion. The value is calculated as (outerIor / surfaceIor), where inputs are measured indices of refraction, the one around the object and the one of its own surface. In most situations outer medium is air, so outerIor will be approximately 1. Then you only need to do (1.0 / surfaceIor). Gets the index of refraction of the material. |
| `dispersion?` | `number` | - | The strength of the angular separation of colors (chromatic aberration) transmitting through a volume. Defaults to 0, which is equivalent to no dispersion. Gets the dispersion of the material. |
| `thickness?` | `number` | - | The thickness of the medium, only used when useDynamicRefraction is enabled. The unit is in base units, and scales with the size of the object. Gets the thickness of the medium of the material. |
| `metalness?` | `number` | - | Defines how much the surface is metallic. From 0 (dielectric) to 1 (metal). Gets the metalness of the material. |
| `anisotropyIntensity?` | `number` | - | Defines amount of anisotropy. Requires enableGGXSpecular is set to true. - When anisotropyIntensity == 0, specular is isotropic. - Specular anisotropy increases as anisotropyIntensity value increases to maximum of 1. Gets the anisotropy intensity of the material. |
| `clearCoat?` | `number` | - | Defines intensity of clearcoat layer from 0 to 1. Clearcoat layer is disabled when clearCoat == 0. Default value is 0 (disabled). Gets the clearcoat intensity of the material. |
| `clearCoatGloss?` | `number` | - | Defines the clearcoat glossiness of the clearcoat layer from 0 (rough) to 1 (mirror). Gets the clearcoat glossiness of the material. |
| `clearCoatBumpiness?` | `number` | - | The bumpiness of the clearcoat layer. This value scales the assigned main clearcoat normal map. It should be normally between 0 (no bump mapping) and 1 (full bump mapping), but can be set to e.g. 2 to give even more pronounced bump effect. Gets the clearcoat bumpiness of the material. |
| `iridescence?` | `number` | - | Defines the intensity of the iridescence layer from 0 to 1. Only used when useIridescence is enabled, and the layer is disabled when iridescence == 0. If an iridescenceMap is specified, it is multiplied by this value. Default value is 0 (disabled). Gets the iridescence intensity of the material. |
| `iridescenceRefractionIndex?` | `number` | - | The index of refraction of the iridescent thin-film. Affects the color phase shift as described here: https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_iridescence Gets the index of refraction of the iridescent thin-film of the material. |
| `iridescenceThicknessMin?` | `number` | - | The minimum thickness for the iridescence layer. Only used when an iridescence thickness map is used. The unit is in nm. Gets the minimum iridescence thickness of the material. |
| `iridescenceThicknessMax?` | `number` | - | The maximum thickness for the iridescence layer. Used as the 'base' thickness when no iridescence thickness map is defined. The unit is in nm. Gets the maximum iridescence thickness of the material. |
| `anisotropyRotation?` | `number` | - | Defines the rotation (in degrees) of anisotropy. Gets the anisotropy rotation of the material. |
| `attenuationDistance?` | `number` | - | The distance defining the absorption rate of light within the medium. Only used when useDynamicRefraction is enabled. Gets the attenuation distance of the material. |
| `heightMapFactor?` | `number` | - | Height map multiplier (default is 1). Affects the strength of the parallax effect. A value of 1 displaces the texture by up to 5% of a UV tile, so useful values are typically in the 0 to 2 range. Gets the height map factor of the material. |
| `alphaDither?` | `number` | - | The alpha value used by the opacity dither path, in the range [0, 1]. Independent of * opacity, which keeps driving alpha blending. Lets a material be alpha-blended and dithered at the same time with different strengths — useful for fading objects out via dither while preserving their alpha-blended look (e.g. fading glass as the camera approaches). Has no effect unless opacityDither (or opacityShadowDither) is set to a dither mode. Set to `1.0` to disable dither at runtime without changing the dither mode, or `0.0` to fully discard via dither. For backwards compatibility, a material that has never had this property assigned uses opacity as the dither alpha, matching the historical behavior where the dither pass shares the blend alpha. Gets the dither alpha of the material. |
| `cubeMapProjectionBox?` | `BoundingBox \| null` | - | Sets the world space axis-aligned bounding box defining the box-projection used for the cubeMap property, or null for no box. Only used when cubeMapProjection is set to CUBEPROJ_BOX. The box is copied into the material. Gets the world space axis-aligned bounding box of the box-projection, or null. A change of its center or half extents is applied by StandardMaterial#update . |
| `userId?` | `string` | - | A unique id the user can assign to the material. The engine internally does not use this for anything, and the user can assign a value to this id for any purpose they like. Defaults to an empty string. |
| `id?` | `number` | - |  |
| `parameters?` | `{}` | - |  |
| `alphaToCoverage?` | `boolean` | - | Enables or disables alpha to coverage. When enabled, and if hardware anti-aliasing is on, limited order-independent transparency can be achieved. Quality depends on the number of MSAA samples of the current render target. It can nicely soften edges of otherwise sharp alpha cutouts, but isn't recommended for large area semi-transparent surfaces. Note, that you don't need to enable blending to make alpha to coverage work. It will work without it, just like alphaTest. This requires a multi-sampled render target, and is silently ignored when rendering to a single-sampled one. On WebGPU it additionally requires the first color attachment of the render target to use a blendable format with an alpha channel, and is silently ignored otherwise - note that PIXELFORMAT_111110F, the default HDR format used by CameraFrame, has no alpha channel. |
| `cull?` | `number` | - | Controls how triangles are culled based on their face direction with respect to the viewpoint. Can be: - CULLFACE_NONE: Do not cull triangles based on face direction. - CULLFACE_BACK: Cull the back faces of triangles (do not render triangles facing away from the view point). - CULLFACE_FRONT: Cull the front faces of triangles (do not render triangles facing towards the view point). Defaults to CULLFACE_BACK. |
| `frontFace?` | `number` | - | Controls whether polygons are front- or back-facing by setting a winding orientation. Can be: - FRONTFACE_CW: The clock-wise winding. - FRONTFACE_CCW: The counterclockwise winding. Defaults to FRONTFACE_CCW. |
| `stencilFront?` | `StencilParameters \| null` | - | Stencil parameters for front faces (default is null). |
| `stencilBack?` | `StencilParameters \| null` | - | Stencil parameters for back faces (default is null). |
| `flatShading?` | `boolean` | - | Enables or disables flat shading. When enabled, the surface is shaded using the geometric normal of the triangle the fragment belongs to, instead of the normal interpolated from the vertex normals, giving the mesh a faceted look. This works on skinned and morphed geometry as well. The geometric normal is oriented to match the winding of the triangle, as configured by Material#frontFace , and so it agrees with correctly authored vertex normals. Flat shading therefore only changes the faceting - Material#cull , Material#frontFace  and StandardMaterial#twoSidedLighting  all behave the same as they do for smooth shading. StandardMaterial and `LitMaterial` implement this automatically. For a ShaderMaterial, this adds a `FLAT_SHADING` define to the shader, which the supplied shader code needs to handle. The `flatNormalPS` chunk provides the `getFlatNormal` function used by the engine internally, and can be used for this: ```javascript #include "flatNormalPS" ... #ifdef FLAT_SHADING vec3 normal = getFlatNormal(worldPos); #else vec3 normal = normalize(interpolatedNormal); #endif ``` As with other material properties, call Material#update  after changing this. Defaults to false. Gets whether flat shading is enabled. |
| `shaderChunksVersion?` | `string` | - | Sets the version of the shader chunks. This should be a string containing the current engine major and minor version (e.g., '2.8' for engine v2.8.1) and ensures compatibility with the current engine version. When providing custom shader chunks, set this to the latest supported version. If a future engine release no longer supports the specified version, a warning will be issued. In that case, update your shader chunks to match the new format and set this to the latest version accordingly. Returns the version of the shader chunks. |
| `alphaTest?` | `number` | - | Sets the alpha test reference value to control which fragments are written to the currently active render target based on alpha value. All fragments with an alpha value of less than the alphaTest reference value will be discarded. Defaults to 0 (all fragments pass). Gets the alpha test reference value. |
| `depthBias?` | `number` | - | Sets the offset for the output depth buffer value. Useful for decals to prevent z-fighting. Typically a small negative value (-0.1) is used to render the mesh slightly closer to the camera. Gets the offset for the output depth buffer value. |
| `slopeDepthBias?` | `number` | - | Sets the offset for the output depth buffer value based on the slope of the triangle relative to the camera. Gets the offset for the output depth buffer value based on the slope of the triangle relative to the camera. |
| `redWrite?` | `boolean` | - | Sets whether the red channel is written to the color buffer. If true, the red component of fragments generated by the shader of this material is written to the color buffer of the currently active render target. If false, the red component will not be written. Defaults to true. Gets whether the red channel is written to the color buffer. |
| `greenWrite?` | `boolean` | - | Sets whether the green channel is written to the color buffer. If true, the red component of fragments generated by the shader of this material is written to the color buffer of the currently active render target. If false, the green component will not be written. Defaults to true. Gets whether the green channel is written to the color buffer. |
| `blueWrite?` | `boolean` | - | Sets whether the blue channel is written to the color buffer. If true, the red component of fragments generated by the shader of this material is written to the color buffer of the currently active render target. If false, the blue component will not be written. Defaults to true. Gets whether the blue channel is written to the color buffer. |
| `alphaWrite?` | `boolean` | - | Sets whether the alpha channel is written to the color buffer. If true, the red component of fragments generated by the shader of this material is written to the color buffer of the currently active render target. If false, the alpha component will not be written. Defaults to true. Gets whether the alpha channel is written to the color buffer. |
| `blendState?` | `Readonly<BlendState>` | - | Sets the blend state for this material. Controls how fragment shader outputs are blended when being written to the currently active render target. This overwrites blending type set using blendType, and offers more control over blending. Gets the blend state for this material. Use the setter to update transparency and sort state. |
| `blendType?` | `number` | - | Sets the blend mode for this material. Controls how fragment shader outputs are blended when being written to the currently active render target. Can be: - BLEND_SUBTRACTIVE: Subtract the color of the source fragment from the destination fragment and write the result to the frame buffer. - BLEND_ADDITIVE: Add the color of the source fragment to the destination fragment and write the result to the frame buffer. - BLEND_NORMAL: Enable simple translucency for materials such as glass. This is equivalent to enabling a source blend mode of BLENDMODE_SRC_ALPHA and a destination blend mode of BLENDMODE_ONE_MINUS_SRC_ALPHA. - BLEND_NONE: Disable blending. - BLEND_PREMULTIPLIED: Similar to BLEND_NORMAL expect the source fragment is assumed to have already been multiplied by the source alpha value. - BLEND_MULTIPLICATIVE: Multiply the color of the source fragment by the color of the destination fragment and write the result to the frame buffer. - BLEND_ADDITIVEALPHA: Same as BLEND_ADDITIVE except the source RGB is multiplied by the source alpha. - BLEND_MULTIPLICATIVE2X: Multiplies colors and doubles the result. - BLEND_SCREEN: Softer version of additive. - BLEND_MIN: Minimum color. - BLEND_MAX: Maximum color. Defaults to BLEND_NONE. Gets the blend mode for this material. |
| `depthState?` | `DepthState` | - | Sets the depth state. Note that this can also be done by using depthTest, depthFunc and depthWrite. Gets the depth state. |
| `depthTest?` | `boolean` | - | Sets whether depth testing is enabled. If true, fragments generated by the shader of this material are only written to the current render target if they pass the depth test. If false, fragments generated by the shader of this material are written to the current render target regardless of what is in the depth buffer. See DepthState#test  for how this interacts with depthFunc. Depth writes are controlled independently by depthWrite. Defaults to true. Gets whether depth testing is enabled. |
| `depthFunc?` | `number` | - | Sets the depth test function. Controls how the depth of new fragments is compared against the current depth contained in the depth buffer. Can be: - FUNC_NEVER: don't draw - FUNC_LESS: draw if new depth < depth buffer - FUNC_EQUAL: draw if new depth == depth buffer - FUNC_LESSEQUAL: draw if new depth <= depth buffer - FUNC_GREATER: draw if new depth > depth buffer - FUNC_NOTEQUAL: draw if new depth != depth buffer - FUNC_GREATEREQUAL: draw if new depth >= depth buffer - FUNC_ALWAYS: always draw Defaults to FUNC_LESSEQUAL. Gets the depth test function. |
| `depthWrite?` | `boolean` | - | Sets whether depth writing is enabled. If true, fragments generated by the shader of this material write a depth value to the depth buffer of the currently active render target. If false, no depth value is written. Defaults to true. Gets whether depth writing is enabled. |

## Returns

The hooks will return a [`StandardMaterial`](https://api.playcanvas.com/engine/classes/StandardMaterial.html) instance which can be applied to a [`Render`](https://developer.playcanvas.com/user-manual/react/api/render.md) component.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `userAttributes` | `Map<any, any>` | - |  |
| `_specularIsBlack` | `any` | - | Whether the specular color was black at the last update. |
| `_textureSharing` | `any` | - | Which of the assigned maps share a texture, as of the last update. |
| `_sharingCheckedVersion` | `any` | - | The texture assignment version the texture sharing was last checked for. |
| `_mapTransforms` | `any` | - | Texture transform grouping state. |
| `onUpdateShader` | `UpdateShaderCallback \| undefined` | - | A custom function that will be called after all shader generator properties are collected and before shader code is generated. This function will receive an object with shader generator settings (based on current material and scene properties), that you can change and then return. Returned value will be used instead. This is mostly useful when rendering the same set of objects, but with different shader variations based on the same material. For example, you may wish to render a depth or normal pass using textures assigned to the material, a reflection pass with simpler shaders and so on. These properties are split into two sections, generic standard material options and lit options. Properties of the standard material options are StandardMaterialOptions and the options for the lit options are LitShaderOptions. |
| `_assetReferences` | `{}` | - |  |
| `_activeParams` | `Set<any>` | - |  |
| `shaderOptBuilder` | `StandardMaterialOptionsBuilder` | - |  |
| `reset` | `() => void` | - |  |
| `anisotropyMap` | `Texture \| null` | - | The anisotropy map of the material (default is null). |
| `anisotropyMapOffset` | `Vec2` | - | Controls the 2D offset of the anisotropy map. Each component is between 0 and 1. |
| `anisotropyMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the anisotropy map. |
| `anisotropyMapTiling` | `Vec2` | - | Controls the 2D tiling of the anisotropy map. |
| `anisotropyMapUv` | `number` | - | Anisotropy map UV channel. Valid values are 0 to 7. |
| `aoMap` | `Texture \| null` | - | The main (primary) baked ambient occlusion (AO) map (default is null). Modulates ambient color. |
| `aoMapChannel` | `string` | - | Color channel of the main (primary) AO map to use. Can be "r", "g", "b" or "a". |
| `aoMapOffset` | `Vec2` | - | Controls the 2D offset of the main (primary) AO map. Each component is between 0 and 1. |
| `aoMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the main (primary) AO map. |
| `aoMapTiling` | `Vec2` | - | Controls the 2D tiling of the main (primary) AO map. |
| `aoMapUv` | `number` | - | Main (primary) AO map UV channel. Valid values are 0 to 7. |
| `aoDetailMap` | `Texture \| null` | - | The detail (secondary) baked ambient occlusion (AO) map of the material (default is null). Will only be used if main (primary) ao map is non-null. |
| `aoDetailMapChannel` | `string` | - | Color channels of the detail (secondary) AO map to use. Can be "r", "g", "b" or "a" (default is "g"). |
| `aoDetailMapOffset` | `Vec2` | - | Controls the 2D offset of the detail (secondary) AO map. Each component is between 0 and 1. |
| `aoDetailMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the detail (secondary) AO map. |
| `aoDetailMapTiling` | `Vec2` | - | Controls the 2D tiling of the detail (secondary) AO map. |
| `aoDetailMapUv` | `number` | - | Detail (secondary) AO map UV channel. Valid values are 0 to 7. |
| `aoDetailMode` | `string` | - | Determines how the main (primary) and detail (secondary) AO maps are blended together. Can be: - DETAILMODE_MUL: Multiply together the primary and secondary colors. - DETAILMODE_ADD: Add together the primary and secondary colors. - DETAILMODE_SCREEN: Softer version of DETAILMODE_ADD. - DETAILMODE_OVERLAY: Multiplies or screens the colors, depending on the primary color. - DETAILMODE_MIN: Select whichever of the primary and secondary colors is darker, component-wise. - DETAILMODE_MAX: Select whichever of the primary and secondary colors is lighter, component-wise. Defaults to DETAILMODE_MUL. |
| `aoVertexColor` | `boolean` | - | Use mesh vertex colors for AO. If aoMap is set, it'll be multiplied by vertex colors. |
| `aoVertexColorChannel` | `string` | - | Vertex color channels to use for AO. Can be "r", "g", "b" or "a". |
| `clearCoatGlossInvert` | `boolean` | - | Invert the clearcoat gloss component (default is false). Enabling this flag results in material treating the clear coat gloss members as roughness. |
| `clearCoatGlossMap` | `Texture \| null` | - | Monochrome clearcoat glossiness map (default is null). If specified, will be multiplied by normalized 'clearCoatGloss' value and/or vertex colors. |
| `clearCoatGlossMapChannel` | `string` | - | Color channel of the clearcoat gloss map to use. Can be "r", "g", "b" or "a". |
| `clearCoatGlossMapOffset` | `Vec2` | - | Controls the 2D offset of the clearcoat gloss map. Each component is between 0 and 1. |
| `clearCoatGlossMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the clear coat gloss map. |
| `clearCoatGlossMapTiling` | `Vec2` | - | Controls the 2D tiling of the clearcoat gloss map. |
| `clearCoatGlossMapUv` | `number` | - | Clearcoat gloss map UV channel. Valid values are 0 to 7. |
| `clearCoatGlossVertexColor` | `boolean` | - | Use mesh vertex colors for clearcoat glossiness. If clearCoatGlossMap is set, it'll be multiplied by vertex colors. |
| `clearCoatGlossVertexColorChannel` | `string` | - | Vertex color channel to use for clearcoat glossiness. Can be "r", "g", "b" or "a". |
| `clearCoatMap` | `Texture \| null` | - | Monochrome clearcoat intensity map (default is null). If specified, will be multiplied by normalized 'clearCoat' value and/or vertex colors. |
| `clearCoatMapChannel` | `string` | - | Color channel of the clearcoat intensity map to use. Can be "r", "g", "b" or "a". |
| `clearCoatMapOffset` | `Vec2` | - | Controls the 2D offset of the clearcoat intensity map. Each component is between 0 and 1. |
| `clearCoatMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the clearcoat intensity map. |
| `clearCoatMapTiling` | `Vec2` | - | Controls the 2D tiling of the clearcoat intensity map. |
| `clearCoatMapUv` | `number` | - | Clearcoat intensity map UV channel. Valid values are 0 to 7. |
| `clearCoatNormalMap` | `Texture \| null` | - | The clearcoat normal map of the material (default is null). The texture must contains normalized, tangent space normals. |
| `clearCoatNormalMapOffset` | `Vec2` | - | Controls the 2D offset of the main clearcoat normal map. Each component is between 0 and 1. |
| `clearCoatNormalMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the main clearcoat map. |
| `clearCoatNormalMapTiling` | `Vec2` | - | Controls the 2D tiling of the main clearcoat normal map. |
| `clearCoatNormalMapUv` | `number` | - | Clearcoat normal map UV channel. Valid values are 0 to 7. |
| `clearCoatVertexColor` | `boolean` | - | Use mesh vertex colors for clearcoat intensity. If clearCoatMap is set, it'll be multiplied by vertex colors. |
| `clearCoatVertexColorChannel` | `string` | - | Vertex color channel to use for clearcoat intensity. Can be "r", "g", "b" or "a". |
| `cubeMap` | `Texture \| null` | - | The cubic environment map of the material (default is null). This setting overrides sphereMap and will replace the scene lighting environment. |
| `cubeMapProjection` | `number` | - | The type of projection applied to the cubeMap property: - CUBEPROJ_NONE: The cube map is treated as if it is infinitely far away. - CUBEPROJ_BOX: Box-projection based on a world space axis-aligned bounding box. Defaults to CUBEPROJ_NONE. |
| `diffuseDetailMap` | `Texture \| null` | - | The detail (secondary) diffuse map of the material (default is null). Will only be used if main (primary) diffuse map is non-null. |
| `diffuseDetailMapChannel` | `string` | - | Color channels of the detail (secondary) diffuse map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `diffuseDetailMapOffset` | `Vec2` | - | Controls the 2D offset of the detail (secondary) diffuse map. Each component is between 0 and 1. |
| `diffuseDetailMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the detail (secondary) diffuse map. |
| `diffuseDetailMapTiling` | `Vec2` | - | Controls the 2D tiling of the detail (secondary) diffuse map. |
| `diffuseDetailMapUv` | `number` | - | Detail (secondary) diffuse map UV channel. Valid values are 0 to 7. |
| `diffuseDetailMode` | `string` | - | Determines how the main (primary) and detail (secondary) diffuse maps are blended together. Can be: - DETAILMODE_MUL: Multiply together the primary and secondary colors. - DETAILMODE_ADD: Add together the primary and secondary colors. - DETAILMODE_SCREEN: Softer version of DETAILMODE_ADD. - DETAILMODE_OVERLAY: Multiplies or screens the colors, depending on the primary color. - DETAILMODE_MIN: Select whichever of the primary and secondary colors is darker, component-wise. - DETAILMODE_MAX: Select whichever of the primary and secondary colors is lighter, component-wise. Defaults to DETAILMODE_MUL. |
| `diffuseMap` | `Texture \| null` | - | The main (primary) diffuse map of the material (default is null). |
| `diffuseMapChannel` | `string` | - | Color channels of the main (primary) diffuse map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `diffuseMapOffset` | `Vec2` | - | Controls the 2D offset of the main (primary) diffuse map. Each component is between 0 and 1. |
| `diffuseMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the main (primary) diffuse map. |
| `diffuseMapTiling` | `Vec2` | - | Controls the 2D tiling of the main (primary) diffuse map. |
| `diffuseMapUv` | `number` | - | Main (primary) diffuse map UV channel. Valid values are 0 to 7. |
| `diffuseVertexColor` | `boolean` | - | Multiply diffuse by the mesh vertex colors. |
| `diffuseVertexColorChannel` | `string` | - | Vertex color channels to use for diffuse. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `emissiveMap` | `Texture \| null` | - | The emissive map of the material (default is null). Can be HDR. When the emissive map is applied, the emissive color is multiplied by the texel color in the map. Since the emissive color is black by default, the emissive map won't be visible unless the emissive color is changed. |
| `emissiveMapChannel` | `string` | - | Color channels of the emissive map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `emissiveMapOffset` | `Vec2` | - | Controls the 2D offset of the emissive map. Each component is between 0 and 1. |
| `emissiveMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the emissive map. |
| `emissiveMapTiling` | `Vec2` | - | Controls the 2D tiling of the emissive map. |
| `emissiveMapUv` | `number` | - | Emissive map UV channel. Valid values are 0 to 7. |
| `emissiveVertexColor` | `boolean` | - | Use mesh vertex colors for emission. If emissiveMap or emissive are set, they'll be multiplied by vertex colors. |
| `emissiveVertexColorChannel` | `string` | - | Vertex color channels to use for emission. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `enableGGXSpecular` | `boolean` | - | Enables GGX specular. Also enables anisotropyIntensity parameter to set material anisotropy. |
| `envAtlas` | `Texture \| null` | - | The prefiltered environment lighting atlas (default is null). This setting overrides cubeMap and sphereMap and will replace the scene lighting environment. |
| `fresnelModel` | `number` | - | Defines the formula used for Fresnel effect. As a side-effect, enabling any Fresnel model changes the way diffuse and reflection components are combined. When Fresnel is off, legacy non energy-conserving combining is used. When it is on, combining behavior is energy-conserving. - FRESNEL_NONE: No Fresnel. - FRESNEL_SCHLICK: Schlick's approximation of Fresnel (recommended). Parameterized by specular color. |
| `glossInvert` | `boolean` | - | Invert the gloss component (default is false). Enabling this flag results in material treating the gloss members as roughness. |
| `glossMap` | `Texture \| null` | - | Gloss map (default is null). If specified, will be multiplied by normalized gloss value and/or vertex colors. |
| `glossMapChannel` | `string` | - | Color channel of the gloss map to use. Can be "r", "g", "b" or "a". |
| `glossMapOffset` | `Vec2` | - | Controls the 2D offset of the gloss map. Each component is between 0 and 1. |
| `glossMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the gloss map. |
| `glossMapTiling` | `Vec2` | - | Controls the 2D tiling of the gloss map. |
| `glossMapUv` | `number` | - | Gloss map UV channel. Valid values are 0 to 7. |
| `glossVertexColor` | `boolean` | - | Use mesh vertex colors for glossiness. If glossMap is set, it'll be multiplied by vertex colors. |
| `glossVertexColorChannel` | `string` | - | Vertex color channel to use for glossiness. Can be "r", "g", "b" or "a". |
| `heightMap` | `Texture \| null` | - | The height map of the material (default is null). Used for a view-dependent parallax effect. The texture must represent the height of the surface where darker pixels are lower and lighter pixels are higher, with heightMapBase selecting the value that sits at the level of the original geometry. It is recommended to use it together with a normal map. Note that the parallax offset is applied to all other maps of the material, so the height map should use the same tiling and offset as those maps. |
| `heightMapChannel` | `string` | - | Color channel of the height map to use. Can be "r", "g", "b" or "a". |
| `heightMapOffset` | `Vec2` | - | Controls the 2D offset of the height map. Each component is between 0 and 1. |
| `heightMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the height map. |
| `heightMapTiling` | `Vec2` | - | Controls the 2D tiling of the height map. |
| `heightMapUv` | `number` | - | Height map UV channel. Valid values are 0 to 7. |
| `lightMap` | `Texture \| null` | - | A custom lightmap of the material (default is null). Lightmaps are textures that contain pre-rendered lighting. Can be HDR. When a mesh instance rendered with this material has a lightmap of its own, baked by the Lightmapper, that lightmap is used instead of this one. |
| `lightMapChannel` | `string` | - | Color channels of the lightmap to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `lightMapOffset` | `Vec2` | - | Controls the 2D offset of the lightmap. Each component is between 0 and 1. |
| `lightMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the lightmap. |
| `lightMapTiling` | `Vec2` | - | Controls the 2D tiling of the lightmap. |
| `lightMapUv` | `number` | - | Lightmap UV channel. Valid values are 0 to 7. |
| `lightVertexColor` | `boolean` | - | Use baked vertex lighting. If lightMap is set, it'll be multiplied by vertex colors. |
| `lightVertexColorChannel` | `string` | - | Vertex color channels to use for baked lighting. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `metalnessMap` | `Texture \| null` | - | Monochrome metalness map (default is null). |
| `metalnessMapChannel` | `string` | - | Color channel of the metalness map to use. Can be "r", "g", "b" or "a". |
| `metalnessMapOffset` | `Vec2` | - | Controls the 2D offset of the metalness map. Each component is between 0 and 1. |
| `metalnessMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the metalness map. |
| `metalnessMapTiling` | `Vec2` | - | Controls the 2D tiling of the metalness map. |
| `metalnessMapUv` | `number` | - | Metalness map UV channel. Valid values are 0 to 7. |
| `metalnessVertexColor` | `boolean` | - | Use mesh vertex colors for metalness. If metalnessMap is set, it'll be multiplied by vertex colors. |
| `metalnessVertexColorChannel` | `string` | - | Vertex color channel to use for metalness. Can be "r", "g", "b" or "a". |
| `normalDetailMap` | `Texture \| null` | - | The detail (secondary) normal map of the material (default is null). Will only be used if main (primary) normal map is non-null. |
| `normalDetailMapOffset` | `Vec2` | - | Controls the 2D offset of the detail (secondary) normal map. Each component is between 0 and 1. |
| `normalDetailMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the detail (secondary) normal map. |
| `normalDetailMapTiling` | `Vec2` | - | Controls the 2D tiling of the detail (secondary) normal map. |
| `normalDetailMapUv` | `number` | - | Detail (secondary) normal map UV channel. Valid values are 0 to 7. |
| `normalMap` | `Texture \| null` | - | The main (primary) normal map of the material (default is null). The texture must contains normalized, tangent space normals. |
| `normalMapOffset` | `Vec2` | - | Controls the 2D offset of the main (primary) normal map. Each component is between 0 and 1. |
| `normalMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the main (primary) normal map. |
| `normalMapTiling` | `Vec2` | - | Controls the 2D tiling of the main (primary) normal map. |
| `normalMapUv` | `number` | - | Main (primary) normal map UV channel. Valid values are 0 to 7. |
| `occludeDirect` | `boolean` | - | Tells if AO should darken directional lighting. Defaults to false. |
| `occludeSpecular` | `number` | - | Uses ambient occlusion to darken specular/reflection. It's a hack, because real specular occlusion is view-dependent. However, it can be better than nothing. - SPECOCC_NONE: No specular occlusion - SPECOCC_AO: Use AO directly to occlude specular. - SPECOCC_GLOSSDEPENDENT: Modify AO based on material glossiness/view angle to occlude specular. |
| `opacityDither` | `string` | - | Used to specify whether opacity is dithered, which allows transparency without alpha blending. Can be: - DITHER_NONE: Opacity dithering is disabled. - DITHER_BAYER2: Opacity is dithered using a Bayer 2 matrix. - DITHER_BAYER4: Opacity is dithered using a Bayer 4 matrix. - DITHER_BAYER8: Opacity is dithered using a Bayer 8 matrix. - DITHER_BAYER16: Opacity is dithered using a Bayer 16 matrix. - DITHER_BLUENOISE: Opacity is dithered using a blue noise. - DITHER_IGNNOISE: Opacity is dithered using an interleaved gradient noise. Defaults to DITHER_NONE. |
| `opacityShadowDither` | `string` | - | Used to specify whether shadow opacity is dithered, which allows shadow transparency without alpha blending. Can be: - DITHER_NONE: Opacity dithering is disabled. - DITHER_BAYER2: Opacity is dithered using a Bayer 2 matrix. - DITHER_BAYER4: Opacity is dithered using a Bayer 4 matrix. - DITHER_BAYER8: Opacity is dithered using a Bayer 8 matrix. - DITHER_BAYER16: Opacity is dithered using a Bayer 16 matrix. - DITHER_BLUENOISE: Opacity is dithered using a blue noise. - DITHER_IGNNOISE: Opacity is dithered using an interleaved gradient noise. Defaults to DITHER_NONE. |
| `opacityFadesSpecular` | `boolean` | - | Used to specify whether specular and reflections are faded out using opacity. Default is true. When set to false use alphaFade to fade out materials. |
| `opacityMap` | `Texture \| null` | - | The opacity map of the material (default is null). |
| `opacityMapChannel` | `string` | - | Color channel of the opacity map to use. Can be "r", "g", "b" or "a". |
| `opacityMapOffset` | `Vec2` | - | Controls the 2D offset of the opacity map. Each component is between 0 and 1. |
| `opacityMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the opacity map. |
| `opacityMapTiling` | `Vec2` | - | Controls the 2D tiling of the opacity map. |
| `opacityMapUv` | `number` | - | Opacity map UV channel. Valid values are 0 to 7. |
| `opacityVertexColor` | `boolean` | - | Use mesh vertex colors for opacity. If opacityMap is set, it'll be multiplied by vertex colors. |
| `opacityVertexColorChannel` | `string` | - | Vertex color channels to use for opacity. Can be "r", "g", "b" or "a". |
| `pixelSnap` | `boolean` | - | Align vertices to pixel coordinates when rendering. Useful for pixel perfect 2D graphics. |
| `shadowCatcher` | `boolean` | - | When enabled, the material will output accumulated directional shadow value in linear space as the color. |
| `specularMap` | `Texture \| null` | - | The specular map of the material (default is null). |
| `specularMapChannel` | `string` | - | Color channels of the specular map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `specularMapOffset` | `Vec2` | - | Controls the 2D offset of the specular map. Each component is between 0 and 1. |
| `specularMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the specular map. |
| `specularMapTiling` | `Vec2` | - | Controls the 2D tiling of the specular map. |
| `specularMapUv` | `number` | - | Specular map UV channel. Valid values are 0 to 7. |
| `specularVertexColor` | `boolean` | - | Multiply specular by the mesh vertex colors. |
| `specularVertexColorChannel` | `string` | - | Vertex color channels to use for specular. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `specularityFactorMap` | `Texture \| null` | - | The factor of specularity as a texture (default is null). |
| `specularityFactorMapChannel` | `string` | - | The channel used by the specularity factor texture to sample from (default is 'a'). |
| `specularityFactorMapOffset` | `Vec2` | - | Controls the 2D offset of the specularity factor map. Each component is between 0 and 1. |
| `specularityFactorMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the specularity factor map. |
| `specularityFactorMapTiling` | `Vec2` | - | Controls the 2D tiling of the specularity factor map. |
| `specularityFactorMapUv` | `number` | - | Specularity factor map UV channel. Valid values are 0 to 7. |
| `useSheen` | `boolean` | - | Toggle sheen specular effect on/off. |
| `sheenMap` | `Texture \| null` | - | The sheen microstructure color map of the material (default is null). |
| `sheenMapChannel` | `string` | - | Color channels of the sheen map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination. |
| `sheenMapOffset` | `Vec2` | - | Controls the 2D offset of the sheen map. Each component is between 0 and 1. |
| `sheenMapRotation` | `number` | - | Controls the 2D rotation (in degrees) of the sheen map. |
| `sheenMapTiling` | `Vec2` | - | Controls the 2D tiling of the sheen map. |
| `sheenMapUv` | `number` | - | Sheen map UV channel. Valid values are 0 to 7. |
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
| `_collectUnappliedChanges` | `any` | - | Adds the names of the map properties changed without a subsequent update, for the debug warning about unapplied changes. |
| `diffuse` | `Color` | - | Sets the diffuse color of the material, specified in sRGB color space. This color value is 3-component (RGB), where each component is between 0 and 1. Defines basic surface color (aka albedo). Gets the diffuse color of the material. |
| `emissive` | `Color` | - | Sets the emissive color of the material, specified in sRGB color space. This color value is 3-component (RGB), where each component is between 0 and 1. The emission is this color multiplied by StandardMaterial#emissiveIntensity , and by the emissive map when one is set. Gets the emissive color of the material. |
| `emissiveIntensity` | `number` | - | Sets the emissive color multiplier. Defaults to 1. Gets the emissive color multiplier. |
| `_emissiveIntensity` | `any` | - |  |
| `ambient` | `Color` | - | The ambient color of the material, specified in sRGB color space. This color value is 3-component (RGB), where each component is between 0 and 1. Gets the ambient color of the material. |
| `specular` | `Color` | - | The specular color of the material, specified in sRGB color space. This color value is 3-component (RGB), where each component is between 0 and 1. Defines surface reflection/specular color. Affects specular intensity and tint. Gets the specular color of the material. |
| `sheen` | `Color` | - | The specular color of the sheen (fabric) microfiber structure, specified in sRGB color space. This color value is 3-component (RGB), where each component is between 0 and 1. Gets the sheen color of the material. |
| `attenuation` | `Color` | - | The attenuation color for refractive materials, specified in sRGB color space. Only used when useDynamicRefraction is enabled. Gets the attenuation color of the material. |
| `specularityFactor` | `number` | - | The factor of specular intensity, used to weight the fresnel and specularity. Default is 1.0. Gets the specularity factor of the material. |
| `_specularityFactor` | `any` | - |  |
| `sheenGloss` | `number` | - | The glossiness of the sheen (fabric) microfiber structure. This color value is a single value between 0 and 1. Gets the sheen glossiness of the material. |
| `_sheenGloss` | `any` | - |  |
| `gloss` | `number` | - | Defines the glossiness of the material from 0 (rough) to 1 (shiny). Materials imported from glTF enable StandardMaterial#glossInvert , which reverses this: on those materials gloss holds roughness, so 0 is shiny and 1 is rough. Gets the glossiness of the material. |
| `_gloss` | `any` | - |  |
| `aoIntensity` | `number` | - | Ambient occlusion intensity. Defaults to 1. Gets the ambient occlusion intensity of the material. |
| `_aoIntensity` | `any` | - |  |
| `heightMapBase` | `number` | - | The height map value that sits at the level of the original geometry, in the 0 to 1 range (default is 0.5). Relief above the base appears to stand out of the surface and relief below it appears to sink in. Set it to 1 to treat the map as pure depth carved below the geometry, or to 0 to treat it as pure elevation above it. Both parallax modes honor it. Gets the height map base level of the material. |
| `_heightMapBase` | `any` | - |  |
| `parallaxSamples` | `number` | - | The maximum number of height map taps taken along the view ray when parallaxMode  is PARALLAX_OCCLUSION (default is 16). Fewer taps are taken as the view direction approaches the surface normal, where the ray barely moves. Has no effect in * PARALLAX_OFFSET mode. Gets the maximum number of height map taps of parallax occlusion mapping of the material. |
| `_parallaxSamples` | `any` | - |  |
| `parallaxShadowSamples` | `number` | - | The maximum number of height map taps taken towards each directional light to shadow the relief against itself, or 0 to disable it (default is 0). The shadow is soft: the march accumulates how far the height field stands above the light ray and weights it by distance, so more taps buy a smoother penumbra rather than an earlier exit. Applies only to directional lights, and only when parallaxMode  is PARALLAX_OCCLUSION. Gets the maximum number of height map taps of the parallax self shadowing of the material. |
| `_parallaxShadowSamples` | `any` | - |  |
| `opacity` | `number` | - | The opacity of the material. This value can be between 0 and 1, where 0 is fully transparent and 1 is fully opaque. If you want the material to be semi-transparent you also need to set the Material#blendType  to BLEND_NORMAL, BLEND_ADDITIVE or any other mode. Also note that for most semi-transparent objects you want Material#depthWrite to be false, otherwise they can fully occlude objects behind them. Gets the opacity of the material. |
| `_opacity` | `any` | - |  |
| `alphaFade` | `number` | - | Used to fade out materials when opacityFadesSpecular is set to false. Gets the alpha fade of the material. |
| `_alphaFade` | `any` | - |  |
| `bumpiness` | `number` | - | The bumpiness of the material. This value scales the assigned main (primary) normal map. It should be normally between 0 (no bump mapping) and 1 (full bump mapping), but can be set to e.g. 2 to give even more pronounced bump effect. Gets the bumpiness of the material. |
| `_bumpiness` | `any` | - |  |
| `normalDetailMapBumpiness` | `number` | - | The bumpiness of the material. This value scales the assigned detail (secondary) normal map. It should be normally between 0 (no bump mapping) and 1 (full bump mapping), but can be set to e.g. 2 to give even more pronounced bump effect. Gets the detail normal map bumpiness of the material. |
| `_normalDetailMapBumpiness` | `any` | - |  |
| `reflectivity` | `number` | - | Environment map intensity. Gets the environment map intensity of the material. |
| `_reflectivity` | `any` | - |  |
| `occludeSpecularIntensity` | `number` | - | Controls visibility of specular occlusion. Gets the specular occlusion intensity of the material. |
| `_occludeSpecularIntensity` | `any` | - |  |
| `refraction` | `number` | - | Defines the visibility of refraction. Material can refract the same cube map as used for reflections. Gets the refraction of the material. |
| `_refraction` | `any` | - |  |
| `refractionIndex` | `number` | - | Defines the index of refraction, i.e. The amount of distortion. The value is calculated as (outerIor / surfaceIor), where inputs are measured indices of refraction, the one around the object and the one of its own surface. In most situations outer medium is air, so outerIor will be approximately 1. Then you only need to do (1.0 / surfaceIor). Gets the index of refraction of the material. |
| `_refractionIndex` | `any` | - |  |
| `dispersion` | `number` | - | The strength of the angular separation of colors (chromatic aberration) transmitting through a volume. Defaults to 0, which is equivalent to no dispersion. Gets the dispersion of the material. |
| `_dispersion` | `any` | - |  |
| `thickness` | `number` | - | The thickness of the medium, only used when useDynamicRefraction is enabled. The unit is in base units, and scales with the size of the object. Gets the thickness of the medium of the material. |
| `_thickness` | `any` | - |  |
| `metalness` | `number` | - | Defines how much the surface is metallic. From 0 (dielectric) to 1 (metal). Gets the metalness of the material. |
| `_metalness` | `any` | - |  |
| `anisotropyIntensity` | `number` | - | Defines amount of anisotropy. Requires enableGGXSpecular is set to true. - When anisotropyIntensity == 0, specular is isotropic. - Specular anisotropy increases as anisotropyIntensity value increases to maximum of 1. Gets the anisotropy intensity of the material. |
| `_anisotropyIntensity` | `any` | - |  |
| `clearCoat` | `number` | - | Defines intensity of clearcoat layer from 0 to 1. Clearcoat layer is disabled when clearCoat == 0. Default value is 0 (disabled). Gets the clearcoat intensity of the material. |
| `_clearCoat` | `any` | - |  |
| `clearCoatGloss` | `number` | - | Defines the clearcoat glossiness of the clearcoat layer from 0 (rough) to 1 (mirror). Gets the clearcoat glossiness of the material. |
| `_clearCoatGloss` | `any` | - |  |
| `clearCoatBumpiness` | `number` | - | The bumpiness of the clearcoat layer. This value scales the assigned main clearcoat normal map. It should be normally between 0 (no bump mapping) and 1 (full bump mapping), but can be set to e.g. 2 to give even more pronounced bump effect. Gets the clearcoat bumpiness of the material. |
| `_clearCoatBumpiness` | `any` | - |  |
| `iridescence` | `number` | - | Defines the intensity of the iridescence layer from 0 to 1. Only used when useIridescence is enabled, and the layer is disabled when iridescence == 0. If an iridescenceMap is specified, it is multiplied by this value. Default value is 0 (disabled). Gets the iridescence intensity of the material. |
| `_iridescence` | `any` | - |  |
| `iridescenceRefractionIndex` | `number` | - | The index of refraction of the iridescent thin-film. Affects the color phase shift as described here: https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_iridescence Gets the index of refraction of the iridescent thin-film of the material. |
| `_iridescenceRefractionIndex` | `any` | - |  |
| `iridescenceThicknessMin` | `number` | - | The minimum thickness for the iridescence layer. Only used when an iridescence thickness map is used. The unit is in nm. Gets the minimum iridescence thickness of the material. |
| `_iridescenceThicknessMin` | `any` | - |  |
| `iridescenceThicknessMax` | `number` | - | The maximum thickness for the iridescence layer. Used as the 'base' thickness when no iridescence thickness map is defined. The unit is in nm. Gets the maximum iridescence thickness of the material. |
| `_iridescenceThicknessMax` | `any` | - |  |
| `anisotropyRotation` | `number` | - | Defines the rotation (in degrees) of anisotropy. Gets the anisotropy rotation of the material. |
| `_anisotropyRotation` | `any` | - |  |
| `attenuationDistance` | `number` | - | The distance defining the absorption rate of light within the medium. Only used when useDynamicRefraction is enabled. Gets the attenuation distance of the material. |
| `_attenuationDistance` | `any` | - |  |
| `heightMapFactor` | `number` | - | Height map multiplier (default is 1). Affects the strength of the parallax effect. A value of 1 displaces the texture by up to 5% of a UV tile, so useful values are typically in the 0 to 2 range. Gets the height map factor of the material. |
| `_heightMapFactor` | `any` | - |  |
| `alphaDither` | `number` | - | The alpha value used by the opacity dither path, in the range [0, 1]. Independent of * opacity, which keeps driving alpha blending. Lets a material be alpha-blended and dithered at the same time with different strengths — useful for fading objects out via dither while preserving their alpha-blended look (e.g. fading glass as the camera approaches). Has no effect unless opacityDither (or opacityShadowDither) is set to a dither mode. Set to `1.0` to disable dither at runtime without changing the dither mode, or `0.0` to fully discard via dither. For backwards compatibility, a material that has never had this property assigned uses opacity as the dither alpha, matching the historical behavior where the dither pass shares the blend alpha. Gets the dither alpha of the material. |
| `_alphaDither` | `any` | - |  |
| `cubeMapProjectionBox` | `BoundingBox \| null` | - | Sets the world space axis-aligned bounding box defining the box-projection used for the cubeMap property, or null for no box. Only used when cubeMapProjection is set to CUBEPROJ_BOX. The box is copied into the material. Gets the world space axis-aligned bounding box of the box-projection, or null. A change of its center or half extents is applied by StandardMaterial#update . |
| `_cubeMapProjectionBox` | `BoundingBox` | - |  |
| `copy` | `(source: StandardMaterial) => StandardMaterial` | - | Copy a `StandardMaterial`. |
| `_getMapTransformId` | `any` | - | Returns the transform group assigned to a texture map. |
| `setAttribute` | `(name: string, semantic: string) => void` | - | Sets a vertex shader attribute on a material. |
| `_setParameter` | `(name: any, value: any) => void` | - |  |
| `_processParameters` | `any` | - | Replaces the set of parameters published by the previous update with the parameters published since, deleting the ones that were dropped. |
| `_updateMap` | `(p: any) => void` | - |  |
| `meshInstances` | `any` | - | The mesh instances referencing this material |
| `name` | `string` | - | The name of the material. |
| `userId` | `string` | - | A unique id the user can assign to the material. The engine internally does not use this for anything, and the user can assign a value to this id for any purpose they like. Defaults to an empty string. |
| `id` | `number` | - |  |
| `_definesDirty` | `boolean` | - |  |
| `_definesKey` | `any` | - | Cached content key for Material#defines , or null when it needs recomputing. An empty defines set caches as '', so null unambiguously means "dirty". |
| `parameters` | `{}` | - |  |
| `_alphaTest` | `any` | - |  |
| `alphaToCoverage` | `boolean` | - | Enables or disables alpha to coverage. When enabled, and if hardware anti-aliasing is on, limited order-independent transparency can be achieved. Quality depends on the number of MSAA samples of the current render target. It can nicely soften edges of otherwise sharp alpha cutouts, but isn't recommended for large area semi-transparent surfaces. Note, that you don't need to enable blending to make alpha to coverage work. It will work without it, just like alphaTest. This requires a multi-sampled render target, and is silently ignored when rendering to a single-sampled one. On WebGPU it additionally requires the first color attachment of the render target to use a blendable format with an alpha channel, and is silently ignored otherwise - note that PIXELFORMAT_111110F, the default HDR format used by CameraFrame, has no alpha channel. |
| `_sceneTexturesWrite` | `any` | - | Explicit setting of sceneTexturesWrite, or undefined to derive it from transparency. |
| `cull` | `number` | - | Controls how triangles are culled based on their face direction with respect to the viewpoint. Can be: - CULLFACE_NONE: Do not cull triangles based on face direction. - CULLFACE_BACK: Cull the back faces of triangles (do not render triangles facing away from the view point). - CULLFACE_FRONT: Cull the front faces of triangles (do not render triangles facing towards the view point). Defaults to CULLFACE_BACK. |
| `frontFace` | `number` | - | Controls whether polygons are front- or back-facing by setting a winding orientation. Can be: - FRONTFACE_CW: The clock-wise winding. - FRONTFACE_CCW: The counterclockwise winding. Defaults to FRONTFACE_CCW. |
| `stencilFront` | `StencilParameters \| null` | - | Stencil parameters for front faces (default is null). |
| `stencilBack` | `StencilParameters \| null` | - | Stencil parameters for back faces (default is null). |
| `_shaderChunks` | `any` | - |  |
| `_oldChunks` | `{}` | - |  |
| `_dirtyShader` | `boolean` | - |  |
| `flatShading` | `boolean` | - | Enables or disables flat shading. When enabled, the surface is shaded using the geometric normal of the triangle the fragment belongs to, instead of the normal interpolated from the vertex normals, giving the mesh a faceted look. This works on skinned and morphed geometry as well. The geometric normal is oriented to match the winding of the triangle, as configured by Material#frontFace , and so it agrees with correctly authored vertex normals. Flat shading therefore only changes the faceting - Material#cull , Material#frontFace  and StandardMaterial#twoSidedLighting  all behave the same as they do for smooth shading. StandardMaterial and `LitMaterial` implement this automatically. For a ShaderMaterial, this adds a `FLAT_SHADING` define to the shader, which the supplied shader code needs to handle. The `flatNormalPS` chunk provides the `getFlatNormal` function used by the engine internally, and can be used for this: ```javascript #include "flatNormalPS" ... #ifdef FLAT_SHADING vec3 normal = getFlatNormal(worldPos); #else vec3 normal = normalize(interpolatedNormal); #endif ``` As with other material properties, call Material#update  after changing this. Defaults to false. Gets whether flat shading is enabled. |
| `getShaderChunks` | `(shaderLanguage?: string \| undefined) => ShaderChunkMap` | - | Returns an object containing shader chunks for a specific shader language for the material. These chunks define custom GLSL or WGSL code used to construct the final shader for the material. The chunks can be also be included in shaders using the `#include "ChunkName"` directive. On the WebGL platform: - If GLSL chunks are provided, they are used directly. On the WebGPU platform: - If WGSL chunks are provided, they are used directly. - If only GLSL chunks are provided, a GLSL shader is generated and then transpiled to WGSL, which is less efficient. To ensure faster shader compilation, it is recommended to provide shader chunks for all supported platforms. A simple example on how to override a shader chunk providing emissive color for both GLSL and WGSL to simply return a red color: ```javascript material.getShaderChunks(SHADERLANGUAGE_GLSL).set('emissivePS', ` void getEmission() { dEmission = vec3(1.0, 0.0, 1.0); } `); material.getShaderChunks(SHADERLANGUAGE_WGSL).set('emissivePS', ` fn getEmission() { dEmission = vec3f(1.0, 0.0, 1.0); } `); // call update to apply the changes material.update(); ``` |
| `shaderChunksVersion` | `string` | - | Sets the version of the shader chunks. This should be a string containing the current engine major and minor version (e.g., '2.8' for engine v2.8.1) and ensures compatibility with the current engine version. When providing custom shader chunks, set this to the latest supported version. If a future engine release no longer supports the specified version, a warning will be issued. In that case, update your shader chunks to match the new format and set this to the latest version accordingly. Returns the version of the shader chunks. |
| `alphaTest` | `number` | - | Sets the alpha test reference value to control which fragments are written to the currently active render target based on alpha value. All fragments with an alpha value of less than the alphaTest reference value will be discarded. Defaults to 0 (all fragments pass). Gets the alpha test reference value. |
| `depthBias` | `number` | - | Sets the offset for the output depth buffer value. Useful for decals to prevent z-fighting. Typically a small negative value (-0.1) is used to render the mesh slightly closer to the camera. Gets the offset for the output depth buffer value. |
| `slopeDepthBias` | `number` | - | Sets the offset for the output depth buffer value based on the slope of the triangle relative to the camera. Gets the offset for the output depth buffer value based on the slope of the triangle relative to the camera. |
| `_shaderVersion` | `number` | - |  |
| `_scene` | `any` | - |  |
| `_updateVersion` | `any` | - | Incremented by Material#update  so internal consumers can detect material changes without consuming shared dirty state. |
| `_preparedVersion` | `any` | - | The update version most recently processed by Material#prepareForRender . |
| `_modifiedProperties` | `any` | - | Typed properties whose public value changed and has not been written to the uniform buffer yet. Allocated on first use. |
| `_mutableProperties` | `any` | - | Snapshots of the aggregate typed property values handed out by a getter, by property. Compared on update to detect in-place mutation of the returned object. Allocated on first use. |
| `_uniformBuffer` | `any` | - | The uniform buffer storing the typed properties, created on the first preparation for rendering. Null for materials without typed properties. |
| `_uniformBufferBindGroup` | `any` | - | The bind group holding the material uniform buffer. |
| `_layout` | `any` | - | The layout the uniform buffer and the bind group were built from, null until the first render of the material. |
| `_resolvedTextureVersion` | `any` | - | The texture assignment version the layout was last resolved for. |
| `_uniformDataVersion` | `any` | - | Incremented each time typed property data is written to the uniform buffer storage. |
| `_uniformUploadedVersion` | `any` | - | The uniform data version most recently uploaded to the GPU. |
| `_layoutVersion` | `any` | - | Incremented when the layout of the material is replaced - the set of its typed properties or of its textures changed - so that mesh instances re-classify their parameters against it. Constant for a material whose layout never changes. |
| `_layoutDirty` | `any` | - | True when the set of uniforms of the material uniform buffer changed since the buffer was created, so the layout is fetched again on the next preparation. |
| `_markLayoutDirty` | `() => void` | - | Marks the layout of the material as changed: the next preparation fetches it again, and replaces the uniform buffer and the bind group when it differs. |
| `redWrite` | `boolean` | - | Sets whether the red channel is written to the color buffer. If true, the red component of fragments generated by the shader of this material is written to the color buffer of the currently active render target. If false, the red component will not be written. Defaults to true. Gets whether the red channel is written to the color buffer. |
| `greenWrite` | `boolean` | - | Sets whether the green channel is written to the color buffer. If true, the red component of fragments generated by the shader of this material is written to the color buffer of the currently active render target. If false, the green component will not be written. Defaults to true. Gets whether the green channel is written to the color buffer. |
| `blueWrite` | `boolean` | - | Sets whether the blue channel is written to the color buffer. If true, the red component of fragments generated by the shader of this material is written to the color buffer of the currently active render target. If false, the blue component will not be written. Defaults to true. Gets whether the blue channel is written to the color buffer. |
| `alphaWrite` | `boolean` | - | Sets whether the alpha channel is written to the color buffer. If true, the red component of fragments generated by the shader of this material is written to the color buffer of the currently active render target. If false, the alpha component will not be written. Defaults to true. Gets whether the alpha channel is written to the color buffer. |
| `transparent` | `boolean` | - |  |
| `_updateTransparency` | `() => void` | - |  |
| `blendState` | `Readonly<BlendState>` | - | Sets the blend state for this material. Controls how fragment shader outputs are blended when being written to the currently active render target. This overwrites blending type set using blendType, and offers more control over blending. Gets the blend state for this material. Use the setter to update transparency and sort state. |
| `blendType` | `number` | - | Sets the blend mode for this material. Controls how fragment shader outputs are blended when being written to the currently active render target. Can be: - BLEND_SUBTRACTIVE: Subtract the color of the source fragment from the destination fragment and write the result to the frame buffer. - BLEND_ADDITIVE: Add the color of the source fragment to the destination fragment and write the result to the frame buffer. - BLEND_NORMAL: Enable simple translucency for materials such as glass. This is equivalent to enabling a source blend mode of BLENDMODE_SRC_ALPHA and a destination blend mode of BLENDMODE_ONE_MINUS_SRC_ALPHA. - BLEND_NONE: Disable blending. - BLEND_PREMULTIPLIED: Similar to BLEND_NORMAL expect the source fragment is assumed to have already been multiplied by the source alpha value. - BLEND_MULTIPLICATIVE: Multiply the color of the source fragment by the color of the destination fragment and write the result to the frame buffer. - BLEND_ADDITIVEALPHA: Same as BLEND_ADDITIVE except the source RGB is multiplied by the source alpha. - BLEND_MULTIPLICATIVE2X: Multiplies colors and doubles the result. - BLEND_SCREEN: Softer version of additive. - BLEND_MIN: Minimum color. - BLEND_MAX: Maximum color. Defaults to BLEND_NONE. Gets the blend mode for this material. |
| `depthState` | `DepthState` | - | Sets the depth state. Note that this can also be done by using depthTest, depthFunc and depthWrite. Gets the depth state. |
| `depthTest` | `boolean` | - | Sets whether depth testing is enabled. If true, fragments generated by the shader of this material are only written to the current render target if they pass the depth test. If false, fragments generated by the shader of this material are written to the current render target regardless of what is in the depth buffer. See DepthState#test  for how this interacts with depthFunc. Depth writes are controlled independently by depthWrite. Defaults to true. Gets whether depth testing is enabled. |
| `depthFunc` | `number` | - | Sets the depth test function. Controls how the depth of new fragments is compared against the current depth contained in the depth buffer. Can be: - FUNC_NEVER: don't draw - FUNC_LESS: draw if new depth < depth buffer - FUNC_EQUAL: draw if new depth == depth buffer - FUNC_LESSEQUAL: draw if new depth <= depth buffer - FUNC_GREATER: draw if new depth > depth buffer - FUNC_NOTEQUAL: draw if new depth != depth buffer - FUNC_GREATEREQUAL: draw if new depth >= depth buffer - FUNC_ALWAYS: always draw Defaults to FUNC_LESSEQUAL. Gets the depth test function. |
| `depthWrite` | `boolean` | - | Sets whether depth writing is enabled. If true, fragments generated by the shader of this material write a depth value to the depth buffer of the currently active render target. If false, no depth value is written. Defaults to true. Gets whether depth writing is enabled. |
| `clone` | `() => StandardMaterial` | - | Clone a material. |
| `_updateMeshInstanceKeys` | `() => void` | - |  |
| `_clearVariantsIfDirty` | `any` | - |  |
| `updateUniforms` | `(device: any, scene: any) => void` | - |  |
| `_markPropertyModified` | `(property: MaterialProperty) => void` | - | Records that the public value of a typed property changed. The value is written to the uniform buffer by the next Material#update . |
| `_markPropertyMutable` | `(property: MaterialProperty, value: object) => void` | - | Records that the aggregate value of a typed property was handed out by its getter, so that an in-place mutation of the returned object can be detected by the next Material#update . Only the first exposure allocates a snapshot. |
| `_updateProperties` | `any` | - | Processes the typed property changes: in-place mutations of exposed values are detected and treated as modifications, and modified values are converted into the uniform buffer storage. Until the uniform buffer exists, the modified properties stay pending and are written when it is created. Runs from Material#update  - the renderer does not process changes, so a change made without a subsequent update is not applied (and reported in the debug build). |
| `_prepareUniformBuffer` | `any` | - | Creates the material uniform buffer and its bind group on first use, and uploads the uniform buffer when its data changed. |
| `_debugWarnedUnapplied` | `boolean` | - |  |
| `update` | `() => void` | - | Applies any changes made to the material's properties. This method should be called after modifying material properties to ensure the changes take effect. The method will clear cached shader variants and trigger recompilation if: - Modified material properties require a different shader variant (e.g., enabling/disabling textures or other properties that affect shader generation) - Material-specific shader chunks (from getShaderChunks) have been modified - Global shader chunks (from ShaderChunks.get) have been modified - Material defines have been changed Note: Shaders are not compiled immediately. Instead, existing shader variants are cleared and new variants will be compiled on-demand as they are needed for different render passes (e.g., forward, shadow, pick). When global shader chunks are modified, `update()` must be called on each material that should reflect those changes. |
| `clearParameters` | `() => void` | - |  |
| `getParameters` | `() => {}` | - |  |
| `clearVariants` | `() => void` | - |  |
| `getParameter` | `(name: string) => object` | - | Retrieves the specified shader parameter from a material. |
| `_setParameterSimple` | `(name: any, data: any) => void` | - |  |
| `setParameter` | `(name: string, data: number \| Texture \| number[] \| ArrayBufferView<ArrayBufferLike> \| StorageBuffer) => void` | - | Sets a shader parameter on a material. |
| `deleteParameter` | `(name: string) => void` | - | Deletes a shader parameter on a material. |
| `_setScopeParameter` | `any` | - |  |
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
