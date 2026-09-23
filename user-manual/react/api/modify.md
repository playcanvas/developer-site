# `<Modify.*>`

`<Modify>` provides declarative rules for editing the entities and components inside a GLB. Place `<Modify.Node>` elements inside a [`<Gltf/>`](https://developer.playcanvas.com/user-manual/react/api/gltf.md) to match part of the imported hierarchy, then use the helper subcomponents to tweak what you find.

The system lets you:

- Match entities using filesystem-like paths or predicate functions.
- Merge new props into existing light, render, and camera components.
- Remove components or replace an entity’s children entirely.
- Add brand-new child entities inline with your rule.

The [Modifying GLB Models guide](https://developer.playcanvas.com/user-manual/react/guide/modifying-glb-models.md) walks through practical scenarios using these primitives.

## `<Modify.Node>`

`<Modify.Node>` defines where a rule applies. Use the `path` prop to target entities by name, component filter, wildcards (`*` and `**`), or even a predicate function.

```tsx copy
<Gltf asset={asset} key={asset.id}>
  <Modify.Node path="Interior.**[light]">
    <Modify.Light intensity={(current = 1) => current * 0.5} />
  </Modify.Node>
</Gltf>
```

Set `clearChildren` to start from a clean slate before adding your own children:

```tsx copy
<Modify.Node path="Accessories" clearChildren>
  <Entity name="Spoiler">
    <Render type="torus" />
  </Entity>
</Modify.Node>
```

Every non-`Modify.*` element you nest inside `<Modify.Node>` is cloned and appended as a child of each match.

### Path helpers

- `Body.FrontBumper` — exact match.
- `Body.*` — direct children.
- `Body.**` — any depth below `Body`.
- `**[render]` — any entity with a render component.
- `(entity) => entity.name.startsWith('Wheel')` — predicate function.

## Component modifiers

Within a node rule you can mutate existing components using the modifier helpers. Each helper supports direct values, updater functions, and a `remove` flag.

```tsx copy
<Modify.Node path="**[light]">
  <Modify.Light color="cyan" intensity={2} />
</Modify.Node>

<Modify.Node path="**[render]">
  <Modify.Render
    castShadows={(value = false) => !value}
    receiveShadows
  />
</Modify.Node>

<Modify.Node path="Cabin.Camera">
  <Modify.Camera remove />
</Modify.Node>
```

All matching entities are evaluated, but if multiple rules address the same component the most specific path wins.

### Functional updates

Pass a function to merge props based on the current value:

```tsx copy
<Modify.Light intensity={(current = 1) => current * 1.5} />
```

Use this pattern when you want to adjust values relative to whatever ships in the GLB.

## Live example

The interactive demo below combines `<Gltf/>` and `<Modify.Node>` to control rendering behavior. Toggle the checkboxes to see component rules take effect. Try disabling `Render visuals` to confirm that rules still run in data-only mode.

**Modify render components inside a GLB**

```jsx title="gltf-modify-example.jsx"
import { useState } from 'react';
import { Entity, Gltf, Modify } from '@playcanvas/react';
import { useModel, useMaterial } from '@playcanvas/react/hooks';
import { useControls as useLevaControls } from 'leva';

const vars = {
  renderStyle: {
    options: {
      Wireframe: 1, 
      Shaded: 0
    },
    value: 1
  }
}

const useControls = () => useLevaControls(vars);
// ↑ imports hidden

export const GltfModifyExample = () => {
  const { asset } = useModel('/assets/statue.glb');
  const { renderStyle } = useControls()

  if (!asset) return null;

  return (
    <Gltf asset={asset} >
      <Modify.Node path="**[render]" >
        <Modify.Render renderStyle={renderStyle} />
      </Modify.Node>
    </Gltf>
  );
};
```

## Properties

### `<Modify.Node/>`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `path` | `string \| PathPredicate` | - |  |
| `clearChildren?` | `boolean` | - |  |
| `children?` | `ReactNode` | - |  |

### `<Modify.Light/>`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `remove?` | `boolean` | - |  |
| `type?` | `PropOrUpdater<"directional" \| "omni" \| "spot">` | `"directional"` | The type of the light. |
| `color?` | `string \| ((current: string \| undefined) => string \| undefined)` | - | Sets the color of the light in sRGB space. The alpha component of the color is ignored. Defaults to white (`[1, 1, 1]`). Gets the color of the light. Use the setter to update the color. |
| `intensity?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the brightness of the light. Defaults to 1. Gets the brightness of the light. |
| `luminance?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the physically-based luminance. Only used if `scene.physicalUnits` is true. Defaults to 0. Gets the physically-based luminance. |
| `shape?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the light source shape. Can be: - LIGHTSHAPE_PUNCTUAL: Infinitesimally small point. - LIGHTSHAPE_RECT: Rectangle shape. - LIGHTSHAPE_DISK: Disk shape. - LIGHTSHAPE_SPHERE: Sphere shape. Defaults to LIGHTSHAPE_PUNCTUAL. Gets the light source shape. |
| `affectSpecularity?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets whether material specularity will be affected by this light. Only takes effect when type is `"directional"`; for other types the value is preserved on the component and applied if type later becomes `"directional"`. Defaults to true. Gets whether material specularity will be affected by this light. |
| `castShadows?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets whether the light will cast shadows. Defaults to false. For a directional light, shadows are only rendered out to LightComponent#shadowDistance  from the viewpoint, which defaults to 40. Size that to the area the camera actually sees, or shadows simply stop appearing beyond it. Gets whether the light will cast shadows. |
| `shadowDistance?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the distance from the viewpoint beyond which shadows are no longer rendered. Affects directional lights only. Defaults to 40. Gets the distance from the viewpoint beyond which shadows are no longer rendered. |
| `shadowIntensity?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the intensity of the shadow darkening. 0 having no effect and 1 meaning shadows are entirely black. Defaults to 1. Gets the intensity of the shadow darkening. |
| `volumetricScattering?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets a multiplier of the light's contribution to the volumetric fog, allowing individual lights to scatter more or less light than the others, or none at all when set to 0. Only used by omni and spot lights, when CameraFrame renders volumetric fog with local lights enabled. Defaults to 1. Gets the multiplier of the light's contribution to the volumetric fog. |
| `shadowResolution?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the size of the texture used for the shadow map. Valid sizes are 64, 128, 256, 512, 1024, 2048. Defaults to 1024. Gets the size of the texture used for the shadow map. |
| `shadowBias?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Set the depth bias for tuning the appearance of the shadow mapping generated by this light. Valid range is 0 to 1. Defaults to 0.05. Get the depth bias for tuning the appearance of the shadow mapping generated by this light. |
| `numCascades?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the number of shadow cascades. Can be 1, 2, 3 or 4. Defaults to 1, representing no cascades. Gets the number of shadow cascades. |
| `cascadeBlend?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the blend factor for cascaded shadow maps, defining the fraction of each cascade level used for blending between adjacent cascades. The value should be between 0 and 1. Defaults to 0, which disables blending between cascades. Gets the blend factor for cascaded shadow maps. |
| `bakeNumSamples?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the number of samples used to bake this light into the lightmap. Defaults to 1. Maximum value is 255. Gets the number of samples used to bake this light into the lightmap. |
| `bakeArea?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the angular size in degrees of the area used when baking soft shadow boundaries for the directional light into the lightmap. Range is 0 to 180. Requires bake to be set to true and type to be `"directional"`. Defaults to 0. Gets the angular size in degrees of the area used when baking soft shadow boundaries for the directional light into the lightmap. |
| `cascadeDistribution?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the distribution of subdivision of the camera frustum for individual shadow cascades. Only used if numCascades is larger than 1. Can be a value in range of 0 and 1. Value of 0 represents a linear distribution, value of 1 represents a logarithmic distribution. Defaults to 0.5. Larger value increases the resolution of the shadows in the near distance. Gets the distribution of subdivision of the camera frustum for individual shadow cascades. |
| `normalOffsetBias?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the normal offset depth bias. Valid range is 0 to 1. Defaults to 0. Gets the normal offset depth bias. |
| `range?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the range of the light. Affects omni and spot lights only. Defaults to 10. Gets the range of the light. |
| `innerConeAngle?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the half-angle (measured in degrees from the light's direction axis to the cone edge) at which the spotlight cone starts to fade off. The full inner beam angle is twice this value. Affects spot lights only. Defaults to 40 (i.e. an 80-degree full inner beam). Gets the half-angle (measured in degrees from the light's direction axis to the cone edge) at which the spotlight cone starts to fade off. |
| `outerConeAngle?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the half-angle (measured in degrees from the light's direction axis to the cone edge) at which the spotlight cone has faded to nothing. The full outer beam angle is twice this value. Affects spot lights only. Defaults to 45 (i.e. a 90-degree full outer beam). Gets the half-angle (measured in degrees from the light's direction axis to the cone edge) at which the spotlight cone has faded to nothing. |
| `falloffMode?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the fall off mode for the light. This controls the rate at which a light attenuates from its position. Can be: - LIGHTFALLOFF_LINEAR: Linear. - LIGHTFALLOFF_INVERSESQUARED: Inverse squared. Affects omni and spot lights only. Defaults to LIGHTFALLOFF_LINEAR. Gets the fall off mode for the light. |
| `shadowType?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the type of shadows being rendered by this light. Can be: - SHADOW_PCF1_32F - SHADOW_PCF3_32F - SHADOW_PCF5_32F - SHADOW_PCF1_16F - SHADOW_PCF3_16F - SHADOW_PCF5_16F - SHADOW_VSM_16F - SHADOW_VSM_32F - SHADOW_PCSS_32F Defaults to SHADOW_PCF3_32F. Gets the type of shadows being rendered by this light. |
| `vsmBlurSize?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the number of samples used for blurring a variance shadow map. Only odd values are supported; even values are rounded up to the next odd value. Values should be between 1 and 25. Defaults to 11. Gets the number of samples used for blurring a variance shadow map. |
| `vsmBlurMode?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the blurring mode for variance shadow maps. Can be: - BLUR_BOX: Box filter. - BLUR_GAUSSIAN: Gaussian filter. May look smoother than box, but requires more samples. Defaults to BLUR_GAUSSIAN. Gets the blurring mode for variance shadow maps. |
| `vsmBias?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the bias used to fight shadow acne when rendering variance shadow maps. Range is 0 to 1. Defaults to 0.0025. Gets the VSM bias value. |
| `cookieAsset?` | `number \| ((current: number \| null \| undefined) => number \| null \| undefined) \| null` | - | Sets the id of the texture asset to be used as the cookie for this light. Only spot and omni lights can have cookies. Spot lights expect a 2D texture; omni lights expect a cubemap. Defaults to null. Gets the id of the texture asset used as the cookie for this light, or null if none is set. |
| `cookie?` | `Texture \| ((current: Texture \| null \| undefined) => Texture \| null \| undefined) \| null` | - | Sets the texture to be used as the cookie for this light. Only spot and omni lights can have cookies. Spot lights expect a 2D texture; omni lights expect a cubemap. Defaults to null. Gets the texture to be used as the cookie for this light. |
| `cookieIntensity?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the cookie texture intensity. Defaults to 1. Gets the cookie texture intensity. |
| `cookieFalloff?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets whether normal spotlight falloff is active when a cookie texture is set. When set to false, a spotlight will work like a pure texture projector (only fading with distance). Defaults to true. Gets whether normal spotlight falloff is active when a cookie texture is set. |
| `cookieChannel?` | `string \| ((current: string \| undefined) => string \| undefined)` | - | Sets the color channels of the cookie texture to use. Can be `"r"`, `"g"`, `"b"`, `"a"` or `"rgb"`. Defaults to `"rgb"`. Gets the color channels of the cookie texture to use. |
| `cookieAngle?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the angle for spotlight cookie rotation in degrees. Defaults to 0. Gets the angle for spotlight cookie rotation (in degrees). |
| `cookieScale?` | `Vec2 \| ((current: Vec2 \| null \| undefined) => Vec2 \| null \| undefined) \| null` | - | Sets the spotlight cookie scale. Set to null to use no scaling. Defaults to null. Gets the spotlight cookie scale. |
| `cookieOffset?` | `Vec2 \| ((current: Vec2 \| null \| undefined) => Vec2 \| null \| undefined) \| null` | - | Sets the spotlight cookie position offset. Defaults to null. Gets the spotlight cookie position offset. |
| `shadowUpdateMode?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the shadow update mode. This tells the renderer how often shadows must be updated for this light. Can be: - SHADOWUPDATE_NONE: Don't render shadows. - SHADOWUPDATE_THISFRAME: Render shadows only once (then automatically switches to SHADOWUPDATE_NONE). - SHADOWUPDATE_REALTIME: Render shadows every frame. Defaults to SHADOWUPDATE_REALTIME. Gets the shadow update mode. |
| `mask?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the bitmask that determines which MeshInstances are lit by this light. The value is composed from MASK_AFFECT_DYNAMIC, MASK_AFFECT_LIGHTMAPPED and MASK_BAKE. The affectDynamic, affectLightmapped and bake helpers write to the same underlying mask but maintain their own state and are not recomputed from `mask`, so writing `mask` directly will not update those helpers (and a subsequent write to a helper may overwrite bits set via `mask`). Defaults to MASK_AFFECT_DYNAMIC. Gets the mask to determine which MeshInstances are lit by this light. |
| `affectDynamic?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets whether the light will affect non-lightmapped objects. Toggles the MASK_AFFECT_DYNAMIC bit on mask. Defaults to true. Gets whether the light will affect non-lightmapped objects. |
| `affectLightmapped?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets whether the light will affect lightmapped objects. Toggles the MASK_AFFECT_LIGHTMAPPED bit on mask. Mutually exclusive with bake on the mask: enabling one clears the other's mask bit. Defaults to false. Gets whether the light will affect lightmapped objects. |
| `bake?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets whether the light will be rendered into lightmaps. Toggles the MASK_BAKE bit on mask. Mutually exclusive with affectLightmapped on the mask: enabling one clears the other's mask bit. Defaults to false. Gets whether the light will be rendered into lightmaps. |
| `bakeDir?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets whether the light's direction will contribute to directional lightmaps. The light must be enabled and bake set to true. Be aware that the directional lightmap is an approximation and can only hold a single direction per pixel. Intersecting multiple lights with bakeDir set to true may lead to incorrect-looking specular/bump mapping in the area of intersection. The error is not always visible though, and is highly scene-dependent. Defaults to true. Gets whether the light's direction will contribute to directional lightmaps. |
| `isStatic?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets whether the light ever moves. This is an optimization hint. Defaults to false. Gets whether the light ever moves. |
| `layers?` | `readonly number[] \| ((current: readonly number[] \| undefined) => readonly number[] \| undefined)` | - | Sets the array of layer IDs (Layer#id ) to which this light should belong. Don't push/pop/splice or modify this array. If you want to change it, set a new one instead. Defaults to [LAYERID_WORLD]. Gets the array of layer IDs (Layer#id ) to which this light should belong. |
| `shadowUpdateOverrides?` | `number[] \| ((current: number[] \| null \| undefined) => number[] \| null \| undefined) \| null` | - | Sets an array of SHADOWUPDATE_ settings per shadow cascade. Set to null if not used. Defaults to null. Gets an array of SHADOWUPDATE_ settings per shadow cascade. |
| `shadowSamples?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the number of shadow samples used for soft shadows when the shadow type is SHADOW_PCSS_32F. This value should be a positive whole number starting at 1. Higher values result in smoother shadows but can significantly decrease performance. Defaults to 16. Gets the number of shadow samples used for soft shadows. |
| `shadowBlockerSamples?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the number of blocker samples used for soft shadows when the shadow type is SHADOW_PCSS_32F. These samples are used to estimate the distance between the shadow caster and the shadow receiver, which is then used for the estimation of contact hardening in the shadow. This value should be a non-negative whole number. Higher values improve shadow quality by considering more occlusion points, but can decrease performance. When set to 0, contact hardening is disabled and the shadow has constant softness. Defaults to 16. Note that this value can be lower than shadowSamples to optimize performance, often without large impact on quality. Gets the number of blocker samples used for contact hardening shadows. |
| `penumbraSize?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the size of penumbra for contact hardening shadows. For area lights, acts as a multiplier with the dimensions of the area light. For punctual and directional lights it's the area size of the light. Defaults to 1. Gets the size of penumbra for contact hardening shadows. |
| `penumbraFalloff?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the falloff rate for shadow penumbra for contact hardening shadows. This is a value larger than or equal to 1. This parameter determines how quickly the shadow softens with distance. Higher values result in a faster softening of the shadow, while lower values produce a more gradual transition. Defaults to 1. Gets the falloff rate for shadow penumbra for contact hardening shadows. |
| `system?` | `ComponentSystem \| ((current: ComponentSystem \| undefined) => ComponentSystem \| undefined)` | - | The ComponentSystem used to create this Component. |
| `entity?` | `Entity \| ((current: Entity \| undefined) => Entity \| undefined)` | - | The Entity that this Component is attached to. |
| `enabled?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets the enabled state of the component. Gets the enabled state of the component. |

### `<Modify.Render/>`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `remove?` | `boolean` | - |  |
| `type?` | `PropOrUpdater<"asset" \| "box" \| "capsule" \| "cone" \| "cylinder" \| "plane" \| "sphere" \| "torus">` | `"box"` | The type of primitive shape to render. |
| `asset?` | `Asset \| ((current: Asset \| undefined) => Asset \| undefined)` | - | The asset to render. |
| `children?` | `PropOrUpdater<ReactNode>` | - |  |
| `isStatic?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Mark meshes as non-movable (optimization). |
| `renderStyle?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the render style of this component's MeshInstances. Can be: - RENDERSTYLE_SOLID - RENDERSTYLE_WIREFRAME - RENDERSTYLE_POINTS Defaults to RENDERSTYLE_SOLID. Gets the render style of this component's MeshInstances. |
| `customAabb?` | `BoundingBox \| ((current: BoundingBox \| null \| undefined) => BoundingBox \| null \| undefined) \| null` | - | Sets the custom object space bounding box that is used for visibility culling of attached mesh instances. This is an optimization, allowing an oversized bounding box to be specified for skinned characters in order to avoid per frame bounding box computations based on bone positions. Gets the custom object space bounding box that is used for visibility culling of attached mesh instances. |
| `meshInstances?` | `readonly MeshInstance[] \| ((current: readonly MeshInstance[] \| undefined) => readonly MeshInstance[] \| undefined)` | - | Sets the array of meshInstances contained in the component. Gets the array of meshInstances contained in the component. Use the setter to replace the array; do not mutate the returned array. |
| `lightmapped?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets whether the component is affected by the runtime lightmapper. If true, the meshes will be lightmapped after using lightmapper.bake(). Gets whether the component is affected by the runtime lightmapper. |
| `castShadows?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets whether attached meshes will cast shadows for lights that have shadow casting enabled. Gets whether attached meshes will cast shadows for lights that have shadow casting enabled. |
| `shadowCascadeMask?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets a bitmask that controls which shadow cascades the attached meshes contribute to when rendered with a LIGHTTYPE_DIRECTIONAL light source. Combine the SHADOW_CASCADE_0 .. SHADOW_CASCADE_3 flags to select individual cascades. This is only effective when castShadows is enabled. Defaults to SHADOW_CASCADE_ALL, which contributes to all available cascades. Note that this filters the meshes per cascade at render time, it does not remove them from the shadow casters of the Layer - use castShadows to disable shadow casting completely. Gets the bitmask that controls which shadow cascades the attached meshes contribute to. |
| `receiveShadows?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets whether shadows will be cast on attached meshes. Gets whether shadows will be cast on attached meshes. |
| `castShadowsLightmap?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets whether meshes instances will cast shadows when rendering lightmaps. Gets whether meshes instances will cast shadows when rendering lightmaps. |
| `lightmapSizeMultiplier?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the lightmap resolution multiplier. Gets the lightmap resolution multiplier. |
| `layers?` | `readonly number[] \| ((current: readonly number[] \| undefined) => readonly number[] \| undefined)` | - | Sets the array of layer IDs (Layer#id ) to which the mesh instances belong. Don't push, pop, splice or modify this array. If you want to change it, set a new one instead. Gets the array of layer IDs (Layer#id ) to which the mesh instances belong. |
| `batchGroupId?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the batch group for the mesh instances in this component (see BatchGroup). Default is -1 (no group). Gets the batch group for the mesh instances in this component (see BatchGroup). |
| `material?` | `Material \| ((current: Material \| undefined) => Material \| undefined)` | - | Sets the material Material that will be used to render the component. The material is ignored for renders of type 'asset' — which is the type every entity produced by `instantiateRenderEntity` carries, so this setter has no effect on models loaded from a container. For those, assign `material` on each entry of RenderComponent#meshInstances  instead. Gets the material Material that will be used to render the component. |
| `materialAssets?` | `Asset[] \| number[] \| ((current: Asset[] \| number[] \| undefined) => Asset[] \| number[] \| undefined)` | - | Sets the material assets that will be used to render the component. Each material corresponds to the respective mesh instance. Gets the material assets that will be used to render the component. |
| `rootBone?` | `Entity \| ((current: Entity \| null \| undefined) => Entity \| null \| undefined) \| null` | - | Sets the root bone entity (or entity guid) for the render component. Gets the root bone entity for the render component. |
| `materialAsset?` | `any` | - |  |
| `system?` | `ComponentSystem \| ((current: ComponentSystem \| undefined) => ComponentSystem \| undefined)` | - | The ComponentSystem used to create this Component. |
| `entity?` | `Entity \| ((current: Entity \| undefined) => Entity \| undefined)` | - | The Entity that this Component is attached to. |
| `enabled?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets the enabled state of the component. Gets the enabled state of the component. |

### `<Modify.Camera/>`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `remove?` | `boolean` | - |  |
| `gammaCorrection?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the gamma correction to apply when rendering the scene. Can be: - GAMMA_SRGB: Output is gamma-encoded for standard sRGB displays. This is the default and recommended setting for all normal rendering. - GAMMA_NONE: Output remains in linear space. This is only intended for advanced HDR pipelines where the output is rendered to an intermediate HDR texture that will be tonemapped and gamma-corrected in a subsequent pass. **Warning**: Setting `GAMMA_NONE` will cause the entire scene (including UI) to appear too dark on standard displays, as linear values are written directly without gamma encoding. For HDR rendering with post-processing, use CameraFrame which handles this automatically. Defaults to GAMMA_SRGB. Gets the gamma correction used when rendering the scene. |
| `toneMapping?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the tonemapping transform to apply to the rendered color buffer. Can be: - TONEMAP_LINEAR - TONEMAP_FILMIC - TONEMAP_HEJL - TONEMAP_ACES - TONEMAP_ACES2 - TONEMAP_NEUTRAL Defaults to TONEMAP_LINEAR. Gets the tonemapping transform applied to the rendered color buffer. |
| `fog?` | `FogParams \| ((current: FogParams \| null \| undefined) => FogParams \| null \| undefined) \| null` | - | Sets the fog parameters. If this is not null, the camera will use these fog parameters instead of those specified on the Scene#fog . Gets a FogParams that defines fog parameters, or null if those are not set. |
| `aperture?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the camera aperture in f-stops. Default is 16. Higher value means less exposure. Used if Scene#physicalUnits  is true. Gets the camera aperture in f-stops. |
| `aspectRatio?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the aspect ratio (width divided by height) of the camera. If aspectRatioMode is ASPECT_AUTO, then this value will be automatically calculated every frame, and you can only read it. If it's ASPECT_MANUAL, you can set the value. Gets the aspect ratio (width divided by height) of the camera. |
| `aspectRatioMode?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the aspect ratio mode of the camera. Can be: - ASPECT_AUTO: aspect ratio will be calculated from the current render target's width divided by height. - ASPECT_MANUAL: use the aspectRatio value. Defaults to ASPECT_AUTO. Gets the aspect ratio mode of the camera. |
| `clearColor?` | `string \| ((current: string \| undefined) => string \| undefined)` | - | Sets the camera component's clear color. Defaults to `[0.75, 0.75, 0.75, 1]`. Gets the camera component's clear color. |
| `clearColorBuffer?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets whether the camera will automatically clear the color buffer before rendering. Defaults to true. Gets whether the camera will automatically clear the color buffer before rendering. |
| `clearDepth?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the depth value to clear the depth buffer to. Defaults to 1. Gets the depth value to clear the depth buffer to. |
| `clearDepthBuffer?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets whether the camera will automatically clear the depth buffer before rendering. Defaults to true. Gets whether the camera will automatically clear the depth buffer before rendering. |
| `clearStencilBuffer?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets whether the camera will automatically clear the stencil buffer before rendering. Defaults to true. Gets whether the camera will automatically clear the stencil buffer before rendering. |
| `cullFaces?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets whether the camera will cull triangle faces. If true, the camera will take Material#cull  into account. Otherwise both front and back faces will be rendered. Defaults to true. Gets whether the camera will cull triangle faces. |
| `disablePostEffectsLayer?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the layer id of the layer on which the post-processing of the camera stops being applied to. Defaults to LAYERID_UI, which causes post-processing to not be applied to UI layer and any following layers for the camera. Set to `undefined` for post-processing to be applied to all layers of the camera. Gets the layer id of the layer on which the post-processing of the camera stops being applied to. |
| `farClip?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the distance from the camera after which no rendering will take place. Defaults to 1000. Gets the distance from the camera after which no rendering will take place. |
| `flipFaces?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets whether the camera will flip the face direction of triangles. If set to true, the camera will invert front and back faces. Can be useful for reflection rendering. Defaults to false. Gets whether the camera will flip the face direction of triangles. |
| `fov?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the field of view of the camera in degrees. Usually this is the Y-axis field of view (see horizontalFov). Used for PROJECTION_PERSPECTIVE cameras only. Defaults to 45. Gets the field of view of the camera in degrees. |
| `frustumCulling?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets whether frustum culling is enabled. This controls the culling of MeshInstances against the camera frustum, i.e. if objects outside of the camera's frustum should be omitted from rendering. If false, all mesh instances in the scene are rendered by the camera, regardless of visibility. Defaults to false. Gets whether frustum culling is enabled. |
| `horizontalFov?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets whether the camera's field of view (fov) is horizontal or vertical. Defaults to false (meaning it is vertical by default). Gets whether the camera's field of view (fov) is horizontal or vertical. |
| `layers?` | `readonly number[] \| ((current: readonly number[] \| undefined) => readonly number[] \| undefined)` | - | Sets the array of layer IDs (Layer#id ) to which this camera should belong. Don't push, pop, splice or modify this array. If you want to change it, set a new one instead. Defaults to [LAYERID_WORLD, LAYERID_DEPTH, LAYERID_SKYBOX, LAYERID_UI, LAYERID_IMMEDIATE]. Gets the array of layer IDs (Layer#id ) to which this camera belongs. |
| `jitter?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the jitter intensity applied in the projection matrix. Used for jittered sampling by TAA. A value of 1 represents a jitter in the range of `[-1, 1]` of a pixel. Smaller values result in a crisper yet more aliased outcome, whereas increased values produce a smoother but blurred result. Defaults to 0, representing no jitter. Gets the jitter intensity applied in the projection matrix. |
| `nearClip?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the distance from the camera before which no rendering will take place. Defaults to 0.1. Gets the distance from the camera before which no rendering will take place. |
| `orthoHeight?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the half-height of the orthographic view window (in the Y-axis). Used for PROJECTION_ORTHOGRAPHIC cameras only. Defaults to 10. Gets the half-height of the orthographic view window (in the Y-axis). |
| `priority?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the priority to control the render order of this camera. Cameras with a smaller priority value are rendered first. Defaults to 0. Gets the priority to control the render order of this camera. |
| `projection?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the type of projection used to render the camera. Can be: - PROJECTION_PERSPECTIVE: A perspective projection. The camera frustum resembles a truncated pyramid. - PROJECTION_ORTHOGRAPHIC: An orthographic projection. The camera frustum is a cuboid. Defaults to PROJECTION_PERSPECTIVE. Gets the type of projection used to render the camera. |
| `projectionOffset?` | `[number, number] \| ((current: [number, number] \| undefined) => [number, number] \| undefined)` | - | Sets the offset of the projection window from the view direction, creating an off-center (asymmetric) projection. The offset is expressed in half-frustum units - an offset of `(0, 1)` moves the projection window up by half of the frustum height. Applies to both perspective and orthographic projections and is ignored in XR, where the projection is supplied by the XR system. Defaults to `(0, 0)`. A typical use case is perspective correction (shift lens): keep the camera level and use a vertical offset to frame a tall object, so its vertical lines stay parallel: Gets the offset of the projection window. |
| `rect?` | `[number, number, number, number] \| ((current: [number, number, number, number] \| undefined) => [number, number, number, number] \| undefined)` | - | Sets the rendering rectangle for the camera. This controls where on the screen the camera will render in normalized screen coordinates. Defaults to `[0, 0, 1, 1]`. Gets the rendering rectangle for the camera. |
| `renderSceneColorMap?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - |  |
| `renderSceneDepthMap?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - |  |
| `renderTarget?` | `RenderTarget \| ((current: RenderTarget \| undefined) => RenderTarget \| undefined)` | - | Sets the render target to which rendering of the camera is performed. If not set, it will render simply to the screen. Gets the render target to which rendering of the camera is performed. |
| `scissorRect?` | `[number, number, number, number] \| ((current: [number, number, number, number] \| undefined) => [number, number, number, number] \| undefined)` | - | Sets the scissor rectangle for the camera. This clips all pixels which are not in the rectangle. The order of the values is `[x, y, width, height]`. Defaults to `[0, 0, 1, 1]`. Gets the scissor rectangle for the camera. |
| `sensitivity?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the camera sensitivity in ISO. Defaults to 1000. Higher value means more exposure. Used if Scene#physicalUnits  is true. Gets the camera sensitivity in ISO. |
| `shutter?` | `number \| ((current: number \| undefined) => number \| undefined)` | - | Sets the camera shutter speed in seconds. Defaults to 1/1000s. Longer shutter means more exposure. Used if Scene#physicalUnits  is true. Gets the camera shutter speed in seconds. |
| `system?` | `ComponentSystem \| ((current: ComponentSystem \| undefined) => ComponentSystem \| undefined)` | - | The ComponentSystem used to create this Component. |
| `entity?` | `Entity \| ((current: Entity \| undefined) => Entity \| undefined)` | - | The Entity that this Component is attached to. |
| `enabled?` | `boolean \| ((current: boolean \| undefined) => boolean \| undefined)` | - | Sets the enabled state of the component. Gets the enabled state of the component. |
