---
title: Shader Chunk Migrations
---

## Introduction

The PlayCanvas Engine's material shader chunk system is undergoing substantial changes in order to support a more flexible material system. Please see [this page](https://github.com/playcanvas/engine/issues/4250) for more context.

In order to help users migrate their existing custom shader chunks, this page lists the changes made to chunks and organizes them by engine release (starting v1.51).

## Chunk API Versions

The debug version of the Engine will report any API changes to the runtime console when it detects overridden chunks. For example:

![Console output](/img/user-manual/graphics/shader-chunk-migrations/console-warning.png)

Once an application's chunks have been updated to the latest API they must be flagged as such. For example, after updating a material's custom chunks to the latest engine release (say v2.8), specify this in the chunks object as follows:

```javascript
const materialChunksGLSL = material.getShaderChunks(pc.SHADERLANGUAGE_GLSL);
materialChunksGLSL.set('diffusePS', '...');
material.shaderChunksVersion = '2.8';
```

By doing this you will no longer see warning messages in the console.

## Chunk changes

The following tables break down the chunk changes by Engine release.

### *Engine v2.6*

#### Internal engine chunks

The following vertex shader chunks were removed and replaced by a single `litMainVS` chunk:

- `endVS`
- `startVS`
- `baseVS`
- `viewNormalVS`
- `baseNineSlicedVS`

`lightmapDirAddPS` chunk has been removed, and its functionality integrated into `lightmapAddPS` chunk.

`TBNderivativePS` and `TBNObjectSpacePS` chunks were removed, and their functionality integrated into `TBNPS` chunk.

`startPS` chunk has been removed, and a replacement larger chunk will be added at a later stage.

`outputAlphaOpaquePS` and `outputAlphaPremulPS` chunks were merged into `outputAlphaPS` chunk.

`cubeMapProjectBoxPS` and `cubeMapProjectNonePS` chunks were merged into `cubeMapProjectPS` chunk.

`envMultiplyPS` and `envConstPS` were merged into `envProcPS` chunk.

`aoSpecOccSimplePS`, `aoSpecOccConstSimplePS`, `aoSpecOccPS` and `aoSpecOccConstPS` chunks were merged into `aoSpecOccPS` chunk.

`shadowSampleCoordPS` chunk has been removed, and its content is now part of `lightFunctionPS` chunk.

The following reflection related chunks had a slight change in how the texture decode function is provided. `$DECODE` is now `{reflectionDecode}` and `$DECODE_CUBEMAP` is now `{reflectionCubemapDecode}`. These chunks were affected:

- `reflectionEnvPS`
- `reflectionEnvHQPS`
- `reflectionCubePS`
- `reflectionSpherePS`

The following ambient lighting related chunks had been removed, and merged into a single `ambientPS` chunk:

- `ambientConstantPS`
- `ambientEnvPS`
- `ambientSHPS`

### *Engine v2.5*

The following chunks were removed and replaced by a single `fogPS` chunk:

- `fogExpPS`
- `fogExp2PS`
- `fogLinearPS`
- `fogNonePS`

The following chunks were removed and replaced by a single `gammaPS` chunk:

- `gamma1_0PS`
- `gamma2_2PS`

### *Engine v1.70*

| Chunk | Changes |
| ---   | ---     |
| `refractionDynamicPS` | <ul><li>Now accepts additional parameter `float dispersion`.</li></ul> |
| `refractionCubePS` | <ul><li>Now accepts additional parameter `float dispersion`.</li></ul> |

### *Engine v1.65*

In 1.62, global variables used to pass the values between the front end back end chunks were grouped into structures LitShaderArguments, IridescenceArgs, ClearcoatArgs and SheenArgs. Those were causing multiple compatibility issues on Android devices, and so in 1.65, these are being converted back to global variables. For example `litShaderArgs.albedo` is now `litArgs_albedo`.

These are the new global variables:

```glsl
// Surface albedo absorbance
vec3 litArgs_albedo;

// Transparency
float litArgs_opacity;

// Emission color
vec3 litArgs_emission;

// Normal direction in world space
vec3 litArgs_worldNormal;

// Ambient occlusion amount, range [0..1]
float litArgs_ao;

// Light map color
vec3 litArgs_lightmap;

// Light map direction
vec3 litArgs_lightmapDir;

// Surface metalness factor, range [0..1]
float litArgs_metalness;

// The f0 specularity factor
vec3 litArgs_specularity;

// Specularity intensity factor, range [0..1]
float litArgs_specularityFactor;

// The microfacet glossiness factor, range [0..1]
float litArgs_gloss;

// Glossiness of the sheen layer, range [0..1]
float litArgs_sheen_gloss;

// The color of the f0 specularity factor for the sheen layer
vec3 litArgs_sheen_specularity;

// Transmission factor (refraction), range [0..1]
float litArgs_transmission;

// Uniform thickness of medium, used by transmission, range [0..inf]
float litArgs_thickness;

// Index of refraction
float litArgs_ior;

// Iridescence effect intensity, range [0..1]
float litArgs_iridescence_intensity;

// Thickness of the iridescent microfilm layer, value is in nanometers, range [0..1000]
float litArgs_iridescence_thickness;

// The normal used for the clearcoat layer
vec3 litArgs_clearcoat_worldNormal;

// Intensity of the clearcoat layer, range [0..1]
float litArgs_clearcoat_specularity;

// Glossiness of clearcoat layer, range [0..1]
float litArgs_clearcoat_gloss;
```

These are the chunk that had their signature changed to accept individual members, instead of the whole structures:

- endPS
- metalnessModulatePS
- outputAlphaPS
- outputAlphaPremulPS
- fresnelSchlickPS
- iridescenceDiffractionPS
- lightmapAddPS
- lightmapDirAddPS
- refractionCubePS
- refractionDynamicPS

### *Engine v1.62*

In PlayCanvas, we have two sets of shader chunks, one set we refer to as the shader frontend, which provide values for the arguments passed to our lighting algorithm, also called the shader backend.

With 1.62, we are creating a clearer distinction between these two, such that the values passed to the backend are well defined and known in advance, not automatically generated. This allows for writing a fully custom shader that can interface with our lighting code just like how our native materials do.

As a result of that, almost all backend chunks have been changed to accommodate for the split. This means that any custom backend shader chunks must move away from using globals to using the arguments passed to them by the lighting backend.

This change also makes some chunks, such as the clearcoat specific ones, redundant, as their functions have become reusable when they're no longer reliant on global values.

#### Changes

This release breaks most lit/frag chunks. Most of these chunks have had their signatures changed to accept the various values they need, instead of relying on globals. With that said, most globals are still set in the shader. An example of this change is:

```glsl
vec3 combineColor() {
    vec3 ret = vec3(0);
    ret = dAlbedo * dDiffuseLight;
    ...
}
```

Is now expressed:

```glsl
vec3 combineColor(vec3 albedo, vec3 sheenSpecularity, float clearcoatSpecularity) {
    vec3 ret = vec3(0);
    ret = albedo * dDiffuseLight;
    ...
}
```

Where we previously had globals, in 1.62 they are packed into structs, these structs are the primary LitShaderArgs which is defined as such:

```glsl
struct LitShaderArguments
{
    // Transparency
    float opacity;

    // Normal direction in world space
    vec3 worldNormal;

    // Surface albedo absorbance
    vec3 albedo;

    // Transmission factor (refraction), range [0..1]
    float transmission;

    // Uniform thickness of medium, used by transmission, range [0..inf]
    float thickness;

    // The f0 specularity factor
    vec3 specularity;

    // The microfacet glossiness factor, range [0..1]
    float gloss;

    // Surface metalness factor, range [0..1]
    float metalness;

    // Specularity intensity factor, range [0..1]
    float specularityFactor;

    // Ambient occlusion amount, range [0..1]
    float ao;

    // Emission color
    vec3 emission;

    // Light map color
    vec3 lightmap;

    // Light map direction
    vec3 lightmapDir;

    // Iridescence extension arguments
    IridescenceArgs iridescence;

    // Clearcoat extension arguments
    ClearcoatArgs clearcoat;

    // Sheen extension arguments
    SheenArgs sheen;
};
```

The last three arguments are our shading extensions. IridescenceArgs is defined as such:

```glsl
struct IridescenceArgs
{
    // Iridescence effect intensity, range [0..1]
    float intensity;

    // Thickness of the iridescent microfilm layer, value is in nanometers, range [0..1000]
    float thickness;
};
```

ClearcoatArgs:

```glsl
struct ClearcoatArgs
{
    // Intensity of the clearcoat layer, range [0..1]
    float specularity;

    // Glossiness of clearcoat layer, range [0..1]
    float gloss;

    // The normal used for the clearcoat layer
    vec3 worldNormal;
};
```

SheenArgs:

```glsl
struct SheenArgs
{
    // Glossiness of the sheen layer, range [0..1]
    float gloss;

    // The color of the f0 specularity factor for the sheen layer
    vec3 specularity;
};
```

| Chunk | Changes |
| --- | --- |
| `ambient(Constant/Env/SH)` | <ul><li>Accepts a vec3 for the world normal instead of using `dNormalW`</li></ul> |
| `aoDiffuseOcc` | <ul><li>Accepts a float value for the AO, instead of using `dAO`</li></ul> |
| `aoSpec(Occ/OccConst/OccConstSimple/OccSimple)` | <ul><li>Accepts float gloss, float ao, a vec3 world normal and a vec3 view direction instead of using `dGlossiness`, `dAo`, `dNormalW` and `dViewDirW`</li></ul> |
| `combine` | <ul><li>Accepts vec3 for albedo, sheen specularity and a float for clearcoat specularity instead of using `dAlbedo`, `sSpecularity` and `ccSpecularity`</li></ul> |
| `clusteredLight` | <ul><li>Reliance on globals have been reduced to only `dLightPosW`, `dLightDirW`, `dLightDirNormW` and `dShadowCoord` which is initialized per light</li></ul> |
| `clusteredLightShadow` | <ul><li>For omni lights, generates a local variable instead of relying on `dShadowCoord`. For spot lights, accepts the shadow coordinate instead of using `dShadowCoord` as before</li></ul> |
| `combine` | <ul><li>Accepts vec3 albedo, vec3 sheen specularity and float clearcoat specularity instead of using `dAlbedo`, `sSpecularity` and `ccSpecularity`</li></ul> |
| `end` | <ul><li>Passes albedo, sheen specularity and clearcoat specularity to combine using `litShaderArgs`, uses `litShaderArgs.emission` instead of relying on `dEmission`</li></ul> |
| `fallOff(InvSquared/Linear)` | <ul><li>Accepts a float light radius and a vec3 light direction instead of using `dLightDirW`</li></ul> |
| `fresnelSchlick` | <ul><li>Accepts gloss and `IridescenceArgs` instead of relying on `dGlossiness`, `dIridescenceFresnel` and `dIridescence`</li></ul> |
| `iridescenceDiffraction` | <ul><li>Accepts a float as iridescence thickness instead of using `dIridescenceThickness`</li></ul> |
| `lightDiffuseLambert` | <ul><li>Accepts vec3 world normal, a vec3 view direction, a vec3 light direction and a vec3 normalized light direction instead of using `dNormalW`, `dViewDirW`, `dLightDirW` and `dLightDirNormW`</li></ul> |
| `lightSheen` | <ul><li>Accepts a vec3 half vector, a vec3 world normal, a vec3 view direction, a vec3 normalized light direction and a float gloss instead of relying on `dNormalW`, `dViewDirW`, `dLightDirNormW` and `dGlossiness`</li></ul> |
| `lightSpecular(AnisoGGX/Blinn/Phong)` | <ul><li>Accepts a vec3 half vector for the reflection, a vec3 reflection direction (used by Phong only), a vec3 world normal, a vec3 view dir, a float gloss value and a 3x3 matrix for the TBN, instead of relying on `dReflDirW`, `dNormalW`, `dViewDirW`, `dGlossiness/ccGlossiness` and `dTBN`</li></ul> |
| `lightmap(DirAdd/Add)` | <ul><li>Accepts a vec3 lightmap value, a vec3 lightmap direction, a vec3 world normal, a vec3 view direction, float gloss, vec3 specularity, a read-write vec3 normalized light direction, a vec3 geometric normal and IridescenceArgs instead of relying on `dLightMap`, `dLightmapDir`, `dNormalW`, `dViewDirW`, `dGlossiness`, `dVertexNormalW` and `dSpecularity`</li></ul> |
| `ltc` | <ul><li>No longer uses `dViewDirW`, `dNormalW`, `dGlossiness`, `dSpecularity`, `ccGlossiness`, `ccSpecularity` and `dLightDirW`, but instead relies on their values being passed as arguments</li></ul> |
| `metalnessModulate` | <ul><li>Accepts a `LitShaderArguments` struct which is updated by the chunk. Removes the reliance on `dSpecularity`, `dMetalness` and `dAlbedo`</li></ul> |
| `output(Alpha/AlphaPremul)` | <ul><li>Uses `litShaderArgs.opacity` instead of `dAlpha`</li></ul> |
| `reflDir(Aniso)` | <ul><li>Accepts a vec3 world normal, a vec3 view direction, a float value for gloss and 3x3 matrix for the TBN, instead of using `dGlossiness`, `dViewDirW`, `dNormalW` and `dTBN`</li></ul> |
| `reflection(CC/Cube/Env/EnvHQ/Sphere/SphereLow)` | <ul><li>Accepts a vec3 reflection direction and a float gloss value instead of using `dReflDirW`/`ccReflDirW` and `dGlossiness`</li></ul> |
| `reflectionSheen` | <ul><li>Accepts a vec3 world normal, a vec3 view direction and a float gloss value instead of using `dNormalW`, `dViewDirW` and `sGlossiness`</li></ul> |
| `refraction(Cube/Dynamic)` | <ul><li>Accepts a vec3 world normal, float thickness, float gloss, vec3 specularity, vec3 albedo, float transmission and `IridescenceArgs` instead of using `dNormalW`, `dAlbedo`, `dTransmission`, `dThickness`, `dGlossiness`, `dSpecularity` and passes the iridescence arguments to the fresnel function</li></ul> |
| `shadow(Common/Coord/CoordPerspZBuffer` | <ul><li>Accepts a permutation of a vec3 light direction, a vec3 light position, a vec3 normalized light direction and a vec3 geometric normal instead of using `dLightDirW`, `dLightPosW`, `dLightDirNormW` and `dVertexNormalW` and instead accepts them as arguments. The permutation depends on the requirements for the different shadow coordinate functions</li></ul> |
| `shadow(EVSM/EVSMn/Standard/StandardGL2/VSM8)` | <ul><li>Accepts a vec3 shadow sample coordinate instead of using `dShadowCoord`</li></ul> |
| `spot` | <ul><li>Accepts a vec3 normalized light direction instead of using `dLightDirNormW`</li></ul> |
| `TBN(-/ObjectSpace/derivative/fast)` | <ul><li>Accepts a vec3 tangent, binormal and normal instead of using `dTangentW`, `dBinormalW` and `dNormalW`</li></ul> |

---

### Engine v1.60

| Chunk | Changes |
| ---   | ---     |
| `clearCoatGlossPS` | <ul><li>Renamed uniform `material_clearCoatGlossiness` to `material_clearCoatGloss`.</li></ul> |
| `glossPS`          | <ul><li>Renamed uniform `material_glossiness` to `material_gloss`.</li></ul> |
| `sheenGlossPS`     | <ul><li>Renamed uniform `material_sheenGlossiness` to `material_sheenGloss`.</li></ul> |

---

### Engine v1.57

In 1.57, almost all front-end chunks have been changed to minimize the amount of samplers used by the shader. This is an optional feature, however it's recommended to follow the same coding style to reduce the amount of samplers used by the shader. The following chunks are affected by it:

| Chunk  |
| --- |
| `aoPS` |
| `clearCoatPS` |
| `clearCoatGlossPS` |
| `clearCoatNormalPS` |
| `diffusePS` |
| `diffuseDetailMapPS` |
| `emissivePS` |
| `metalnessPS` |
| `normalMapPS` |
| `normalDetailMapPS` |
| `opacityPS` |
| `parallaxPS` |
| `sheenPS` |
| `sheenGlossPS` |
| `specularPS` |
| `specularityFactorPS` |
| `thicknessPS` |
| `transmissionPS` |

This is also supported in custom front-end chunks, given that your chunk piggybacks on the pre-existing material samplers. To support this method in your chunks, what you'd need to do is:

- Remove the sampler uniform declaration from the chunk
- Replace the sampler name with the `$SAMPLER` macro

For example:

```glsl
uniform sampler2D texture_aoMap;
void getAO() {
    dAo = 1.0;

    #ifdef MAPTEXTURE
    dAo *= texture2DBias(texture_aoMap, $UV, textureBias).$CH;
    #endif

    #ifdef MAPVERTEX
    dAo *= saturate(vVertexColor.$VC);
    #endif
}
```

Would be converted to:

```glsl
void getAO() {
    dAo = 1.0;

    #ifdef MAPTEXTURE
    dAo *= texture2DBias($SAMPLER, $UV, textureBias).$CH;
    #endif

    #ifdef MAPVERTEX
    dAo *= saturate(vVertexColor.$VC);
    #endif
}
```

This allows the engine to automatically pick the sampler uniform to use, thus potentially reducing the total number of samplers. But note, this is only supported for front-end chunks.

---

### Engine v1.56

| Chunk | Changes |
| ---   | ---     |
| `combineXXXX` | <ul><li>all combine chunks except for `combinePS` have been deleted.</li><li>instead, combinePS is controlled with a handful of preprocessor defines.</li></ul> |
| `refractionPS` | <ul><li>split into two new chunks, `refractionCubePS` and `refractionDynamicPS`.</li></ul> |
| `refractionCubePS` | <ul><li>the old `refractionPS` is identical to this one, uses a cube map for refractions.</li></ul> |
| `refractionDynamicPS` | <ul><li>new chunk which supports dynamic refractions by using the grab pass, needs `requestSceneColorMap(true);` to be set on the camera to work.</li></ul> |
| `sheenPS` | <ul><li>new chunk to provide sheen (fabric) color.</li></ul> |
| `sheenGlossPS` | <ul><li>new chunk to provide sheen (fabric) glossiness.</li></ul> |
| `reflectionEnvHQPS` | <ul><li>new chunk to provide a high quality specular environment map for reflections and refractions.</li></ul> |
| `thicknessPS` | <ul><li>new chunk to provide thickness which modifies attenuation color for transmissive (transparent/refractive) materials.</li></ul> |
| `bakeDirLmEndPs` | <ul><li>moved to `chunks-lightmapper.js`.</li></ul> |
| `bakeLmEndPS` | <ul><li>moved to `chunks-lightmapper.js`.</li></ul> |

---

### Engine v1.55

| Chunk | Changes |
| --- | --- |
| `clearCoatNormalPS` | <ul><li>refrain from generating world CC reflection, now done on the backend instead</li><li>normalize final world space normal</li></ul> |
| `clusteredLightPS` | <ul><li>remove dead code.</li><li>the `CLUSTER_XXX` macros have been renamed to `LIT_XXX`.</li><li>each light calculates fresnel</li></ul> |
| `combinePS` | <ul><li>new chunk to replace all the other combine chunks.</li></ul> |
| `combineXXXX` | <ul><li>combine chunk variations have been made deprecated and replaced with a single chunk.</li></ul> |
| `diffusePS` | <ul><li>fix gamma handling relative to albedo detail</li></ul> |
| `diffuseDetailMapPS` | <ul><li>gamma correct detail map before combining with base albedo</li></ul> |
| `endPS` | <ul><li>combine emissive with `dEmissive` instead of a call to `getEmission()`</li><li>`CLEARCOAT` macro is now `LIT_CLEARCOAT`.</li></ul> |
| `emissivePS` | <ul><li>set `dEmission` global instead of returning the value in order to bring it in line with the other frontend components</li></ul> |
| `fresnelSchlickPS` | <ul><li>fresnel effect now reacts to index of refraction.</li><li>no longer changes specularity global, but returns value to be used per-light and for the environment</li></ul> |
| `lightmapSingleVert.js` | <ul><li>removed (unused)</li></ul> |
| `lightmapDirPS`, `lightmapSinglePS`| <ul><li>renamed the lightmap function to `getLightMap()` instead of `addLightMap()`</li><li>changed the implementation to write `dLightmap` and `dLightmapDir` global instead of updating `dDiffuseLight` and `dSpecularLight` directly</li><li>backend now handles combining lightmap in `lightmapAddPS` and `lightmapDirAddPS`</li></ul> |
| `lightmapAddPS`, `lightmapDirAddPS` | <ul><li>new chunks for adding the lightmap values passed in from the backend</li><li>`CLEARCOAT` macro replaced with `LIT_CLEARCOAT`.</li></ul> |
| `lightSpecularAnisoGGXPS` | <ul><li>`CLEARCOAT` define replaced with `LIT_CLEARCOAT`</li></ul> |
| `lightSpecularBlinnPS`, `lightSpecularPhongPS` | <ul><li>added clear coat `#define`, removed call to `antiAliasGlossiness()`</li></ul> |
| `ltcPS` | <ul><li>`CLEARCOAT` macro replaced with `LIT_CLEARCOAT`.</li></ul> |
| `normalMapFastPS` | <ul><li>removed</li></ul> |
| `normalMapPS` | <ul><li>added `MAPTEXTURE` #define like the other chunks</li><li>normalize final normal</li><li>when normal texture isn't defined, calculate normal from geometry normal instead</li></ul> |
| `normalDetailMapPS` | <ul><li>remove two (mostly) unnecessary calls to `normalize` - final normal is normalized instead</li></ul> |
| `normalVertexPS` | <ul><li>removed chunk, moved functionality to `normalMapPS` frontend chunk</li></ul> |
| `metalnessPS` | <ul><li>now controls metalness in front end and is not exclusive of `specularPS`</li></ul> |
| `metalnessModulatePS` | <ul><li>new chunk to control how specular color is modulated based on specular color and albedo with regards to metalness</li></ul> |
| `reflectionCC` | <ul><li>`CLEARCOAT` define replaced with `LIT_CLEARCOAT`.</li></ul> |
| `specularAaNonePS`, `specularAaToksvigPS`, `specularAaToksvigFastPS` | <ul><li>removed</li></ul> |
| `startPS` | <ul><li>removed global declarations, generate them on demand instead</li><li>`CLEARCOAT` macro replaced with `LIT_CLEARCOAT`.</li></ul> |
| `specularPS` | <ul><li>only provides specular color, metalness modulation is now done in backend.</li></ul> |
| `specularityFactorPS` | <ul><li>new chunk to control specular intensity for metalness workflow.</li></ul> |
