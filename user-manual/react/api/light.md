# `<Light/>`

The `<Light/>` component allows an Entity to emit light. Any [`<Render/>`](https://developer.playcanvas.com/user-manual/react/api/render.md) component will be lit by the light. When attached to an [`<Entity/>`](https://developer.playcanvas.com/user-manual/react/api/entity.md), the light can be positioned and oriented using the entity's transform. Lights can be directional, omni or spot.

## Usage

Simply attach a `<Light/>` to an [`<Entity/>`](https://developer.playcanvas.com/user-manual/react/api/entity.md) and it will emit light from the entity's position and rotation.

```tsx
<Entity>
  <Light type="directional" intensity={10} />
</Entity>
```

**Control light properties**

```jsx title="light-example.jsx"
import { Entity } from '@playcanvas/react';
import { Light, Render } from '@playcanvas/react/components';
import { useControls } from 'leva';

const vars = {
    type: { 
        options: ['directional', 'point', 'spot'],
        value: 'directional'
    },
    color: { value: '#ffffff' },
    intensity: { value: 1, min: 0, max: 5, step: 0.1 },
    range: { value: 10, min: 1, max: 50, step: 1 },
    innerConeAngle: { value: 20, min: 0, max: 90, step: 1 },
    outerConeAngle: { value: 30, min: 0, max: 90, step: 1 }
};

// ↑ imports hidden
export const LightExample = () => {
    const lightingProps = useControls(vars);

    return (
        <>
            {/* Light entity */}
            <Entity name="light" 
                position={lightingProps.type === 'directional' ? [0, 5, 0] : [0, 2, 0]}
                rotation={lightingProps.type === 'directional' ? [45, 0, 0] : [0, 0, 0]}
            >
                <Light {...lightingProps} />
            </Entity>

            {/* Box to show lighting */}
            <Entity position={[0, 0, 0]}>
                <Render type="box" />
            </Entity>

            {/* Sphere to show lighting */}
            <Entity position={[2, 0, 0]}>
                <Render type="sphere" />
            </Entity>

            {/* Cylinder to show lighting */}
            <Entity position={[-2, 0, 0]}>
                <Render type="cylinder" />
            </Entity>
        </>
    );
};
```

Learn more about [Lights](https://api.playcanvas.com/engine/classes/LightComponent.html) in the PlayCanvas documentation.

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"directional" \| "omni" \| "spot"` | `"directional"` | The type of the light. |
| `color?` | `string` | - | Sets the color of the light in sRGB space. The alpha component of the color is ignored. Defaults to white (`[1, 1, 1]`). Gets the color of the light. Use the setter to update the color. |
| `intensity?` | `number` | - | Sets the brightness of the light. Defaults to 1. Gets the brightness of the light. |
| `luminance?` | `number` | - | Sets the physically-based luminance. Only used if `scene.physicalUnits` is true. Defaults to 0. Gets the physically-based luminance. |
| `shape?` | `number` | - | Sets the light source shape. Can be: - LIGHTSHAPE_PUNCTUAL: Infinitesimally small point. - LIGHTSHAPE_RECT: Rectangle shape. - LIGHTSHAPE_DISK: Disk shape. - LIGHTSHAPE_SPHERE: Sphere shape. Defaults to LIGHTSHAPE_PUNCTUAL. Gets the light source shape. |
| `affectSpecularity?` | `boolean` | - | Sets whether material specularity will be affected by this light. Only takes effect when type is `"directional"`; for other types the value is preserved on the component and applied if type later becomes `"directional"`. Defaults to true. Gets whether material specularity will be affected by this light. |
| `castShadows?` | `boolean` | - | Sets whether the light will cast shadows. Defaults to false. For a directional light, shadows are only rendered out to LightComponent#shadowDistance  from the viewpoint, which defaults to 40. Size that to the area the camera actually sees, or shadows simply stop appearing beyond it. Gets whether the light will cast shadows. |
| `shadowDistance?` | `number` | - | Sets the distance from the viewpoint beyond which shadows are no longer rendered. Affects directional lights only. Defaults to 40. Gets the distance from the viewpoint beyond which shadows are no longer rendered. |
| `shadowIntensity?` | `number` | - | Sets the intensity of the shadow darkening. 0 having no effect and 1 meaning shadows are entirely black. Defaults to 1. Gets the intensity of the shadow darkening. |
| `volumetricScattering?` | `number` | - | Sets a multiplier of the light's contribution to the volumetric fog, allowing individual lights to scatter more or less light than the others, or none at all when set to 0. Only used by omni and spot lights, when CameraFrame renders volumetric fog with local lights enabled. Defaults to 1. Gets the multiplier of the light's contribution to the volumetric fog. |
| `shadowResolution?` | `number` | - | Sets the size of the texture used for the shadow map. Valid sizes are 64, 128, 256, 512, 1024, 2048. Defaults to 1024. Gets the size of the texture used for the shadow map. |
| `shadowBias?` | `number` | - | Set the depth bias for tuning the appearance of the shadow mapping generated by this light. Valid range is 0 to 1. Defaults to 0.05. Get the depth bias for tuning the appearance of the shadow mapping generated by this light. |
| `numCascades?` | `number` | - | Sets the number of shadow cascades. Can be 1, 2, 3 or 4. Defaults to 1, representing no cascades. Gets the number of shadow cascades. |
| `cascadeBlend?` | `number` | - | Sets the blend factor for cascaded shadow maps, defining the fraction of each cascade level used for blending between adjacent cascades. The value should be between 0 and 1. Defaults to 0, which disables blending between cascades. Gets the blend factor for cascaded shadow maps. |
| `bakeNumSamples?` | `number` | - | Sets the number of samples used to bake this light into the lightmap. Defaults to 1. Maximum value is 255. Gets the number of samples used to bake this light into the lightmap. |
| `bakeArea?` | `number` | - | Sets the angular size in degrees of the area used when baking soft shadow boundaries for the directional light into the lightmap. Range is 0 to 180. Requires bake to be set to true and type to be `"directional"`. Defaults to 0. Gets the angular size in degrees of the area used when baking soft shadow boundaries for the directional light into the lightmap. |
| `cascadeDistribution?` | `number` | - | Sets the distribution of subdivision of the camera frustum for individual shadow cascades. Only used if numCascades is larger than 1. Can be a value in range of 0 and 1. Value of 0 represents a linear distribution, value of 1 represents a logarithmic distribution. Defaults to 0.5. Larger value increases the resolution of the shadows in the near distance. Gets the distribution of subdivision of the camera frustum for individual shadow cascades. |
| `normalOffsetBias?` | `number` | - | Sets the normal offset depth bias. Valid range is 0 to 1. Defaults to 0. Gets the normal offset depth bias. |
| `range?` | `number` | - | Sets the range of the light. Affects omni and spot lights only. Defaults to 10. Gets the range of the light. |
| `innerConeAngle?` | `number` | - | Sets the half-angle (measured in degrees from the light's direction axis to the cone edge) at which the spotlight cone starts to fade off. The full inner beam angle is twice this value. Affects spot lights only. Defaults to 40 (i.e. an 80-degree full inner beam). Gets the half-angle (measured in degrees from the light's direction axis to the cone edge) at which the spotlight cone starts to fade off. |
| `outerConeAngle?` | `number` | - | Sets the half-angle (measured in degrees from the light's direction axis to the cone edge) at which the spotlight cone has faded to nothing. The full outer beam angle is twice this value. Affects spot lights only. Defaults to 45 (i.e. a 90-degree full outer beam). Gets the half-angle (measured in degrees from the light's direction axis to the cone edge) at which the spotlight cone has faded to nothing. |
| `falloffMode?` | `number` | - | Sets the fall off mode for the light. This controls the rate at which a light attenuates from its position. Can be: - LIGHTFALLOFF_LINEAR: Linear. - LIGHTFALLOFF_INVERSESQUARED: Inverse squared. Affects omni and spot lights only. Defaults to LIGHTFALLOFF_LINEAR. Gets the fall off mode for the light. |
| `shadowType?` | `number` | - | Sets the type of shadows being rendered by this light. Can be: - SHADOW_PCF1_32F - SHADOW_PCF3_32F - SHADOW_PCF5_32F - SHADOW_PCF1_16F - SHADOW_PCF3_16F - SHADOW_PCF5_16F - SHADOW_VSM_16F - SHADOW_VSM_32F - SHADOW_PCSS_32F Defaults to SHADOW_PCF3_32F. Gets the type of shadows being rendered by this light. |
| `vsmBlurSize?` | `number` | - | Sets the number of samples used for blurring a variance shadow map. Only odd values are supported; even values are rounded up to the next odd value. Values should be between 1 and 25. Defaults to 11. Gets the number of samples used for blurring a variance shadow map. |
| `vsmBlurMode?` | `number` | - | Sets the blurring mode for variance shadow maps. Can be: - BLUR_BOX: Box filter. - BLUR_GAUSSIAN: Gaussian filter. May look smoother than box, but requires more samples. Defaults to BLUR_GAUSSIAN. Gets the blurring mode for variance shadow maps. |
| `vsmBias?` | `number` | - | Sets the bias used to fight shadow acne when rendering variance shadow maps. Range is 0 to 1. Defaults to 0.0025. Gets the VSM bias value. |
| `cookieAsset?` | `number \| null` | - | Sets the id of the texture asset to be used as the cookie for this light. Only spot and omni lights can have cookies. Spot lights expect a 2D texture; omni lights expect a cubemap. Defaults to null. Gets the id of the texture asset used as the cookie for this light, or null if none is set. |
| `cookie?` | `Texture \| null` | - | Sets the texture to be used as the cookie for this light. Only spot and omni lights can have cookies. Spot lights expect a 2D texture; omni lights expect a cubemap. Defaults to null. Gets the texture to be used as the cookie for this light. |
| `cookieIntensity?` | `number` | - | Sets the cookie texture intensity. Defaults to 1. Gets the cookie texture intensity. |
| `cookieFalloff?` | `boolean` | - | Sets whether normal spotlight falloff is active when a cookie texture is set. When set to false, a spotlight will work like a pure texture projector (only fading with distance). Defaults to true. Gets whether normal spotlight falloff is active when a cookie texture is set. |
| `cookieChannel?` | `string` | - | Sets the color channels of the cookie texture to use. Can be `"r"`, `"g"`, `"b"`, `"a"` or `"rgb"`. Defaults to `"rgb"`. Gets the color channels of the cookie texture to use. |
| `cookieAngle?` | `number` | - | Sets the angle for spotlight cookie rotation in degrees. Defaults to 0. Gets the angle for spotlight cookie rotation (in degrees). |
| `cookieScale?` | `Vec2 \| null` | - | Sets the spotlight cookie scale. Set to null to use no scaling. Defaults to null. Gets the spotlight cookie scale. |
| `cookieOffset?` | `Vec2 \| null` | - | Sets the spotlight cookie position offset. Defaults to null. Gets the spotlight cookie position offset. |
| `shadowUpdateMode?` | `number` | - | Sets the shadow update mode. This tells the renderer how often shadows must be updated for this light. Can be: - SHADOWUPDATE_NONE: Don't render shadows. - SHADOWUPDATE_THISFRAME: Render shadows only once (then automatically switches to SHADOWUPDATE_NONE). - SHADOWUPDATE_REALTIME: Render shadows every frame. Defaults to SHADOWUPDATE_REALTIME. Gets the shadow update mode. |
| `mask?` | `number` | - | Sets the bitmask that determines which MeshInstances are lit by this light. The value is composed from MASK_AFFECT_DYNAMIC, MASK_AFFECT_LIGHTMAPPED and MASK_BAKE. The affectDynamic, affectLightmapped and bake helpers write to the same underlying mask but maintain their own state and are not recomputed from `mask`, so writing `mask` directly will not update those helpers (and a subsequent write to a helper may overwrite bits set via `mask`). Defaults to MASK_AFFECT_DYNAMIC. Gets the mask to determine which MeshInstances are lit by this light. |
| `affectDynamic?` | `boolean` | - | Sets whether the light will affect non-lightmapped objects. Toggles the MASK_AFFECT_DYNAMIC bit on mask. Defaults to true. Gets whether the light will affect non-lightmapped objects. |
| `affectLightmapped?` | `boolean` | - | Sets whether the light will affect lightmapped objects. Toggles the MASK_AFFECT_LIGHTMAPPED bit on mask. Mutually exclusive with bake on the mask: enabling one clears the other's mask bit. Defaults to false. Gets whether the light will affect lightmapped objects. |
| `bake?` | `boolean` | - | Sets whether the light will be rendered into lightmaps. Toggles the MASK_BAKE bit on mask. Mutually exclusive with affectLightmapped on the mask: enabling one clears the other's mask bit. Defaults to false. Gets whether the light will be rendered into lightmaps. |
| `bakeDir?` | `boolean` | - | Sets whether the light's direction will contribute to directional lightmaps. The light must be enabled and bake set to true. Be aware that the directional lightmap is an approximation and can only hold a single direction per pixel. Intersecting multiple lights with bakeDir set to true may lead to incorrect-looking specular/bump mapping in the area of intersection. The error is not always visible though, and is highly scene-dependent. Defaults to true. Gets whether the light's direction will contribute to directional lightmaps. |
| `isStatic?` | `boolean` | - | Sets whether the light ever moves. This is an optimization hint. Defaults to false. Gets whether the light ever moves. |
| `layers?` | `readonly number[]` | - | Sets the array of layer IDs (Layer#id ) to which this light should belong. Don't push/pop/splice or modify this array. If you want to change it, set a new one instead. Defaults to [LAYERID_WORLD]. Gets the array of layer IDs (Layer#id ) to which this light should belong. |
| `shadowUpdateOverrides?` | `number[] \| null` | - | Sets an array of SHADOWUPDATE_ settings per shadow cascade. Set to null if not used. Defaults to null. Gets an array of SHADOWUPDATE_ settings per shadow cascade. |
| `shadowSamples?` | `number` | - | Sets the number of shadow samples used for soft shadows when the shadow type is SHADOW_PCSS_32F. This value should be a positive whole number starting at 1. Higher values result in smoother shadows but can significantly decrease performance. Defaults to 16. Gets the number of shadow samples used for soft shadows. |
| `shadowBlockerSamples?` | `number` | - | Sets the number of blocker samples used for soft shadows when the shadow type is SHADOW_PCSS_32F. These samples are used to estimate the distance between the shadow caster and the shadow receiver, which is then used for the estimation of contact hardening in the shadow. This value should be a non-negative whole number. Higher values improve shadow quality by considering more occlusion points, but can decrease performance. When set to 0, contact hardening is disabled and the shadow has constant softness. Defaults to 16. Note that this value can be lower than shadowSamples to optimize performance, often without large impact on quality. Gets the number of blocker samples used for contact hardening shadows. |
| `penumbraSize?` | `number` | - | Sets the size of penumbra for contact hardening shadows. For area lights, acts as a multiplier with the dimensions of the area light. For punctual and directional lights it's the area size of the light. Defaults to 1. Gets the size of penumbra for contact hardening shadows. |
| `penumbraFalloff?` | `number` | - | Sets the falloff rate for shadow penumbra for contact hardening shadows. This is a value larger than or equal to 1. This parameter determines how quickly the shadow softens with distance. Higher values result in a faster softening of the shadow, while lower values produce a more gradual transition. Defaults to 1. Gets the falloff rate for shadow penumbra for contact hardening shadows. |
| `system?` | `ComponentSystem` | - | The ComponentSystem used to create this Component. |
| `entity?` | `Entity` | - | The Entity that this Component is attached to. |
| `enabled?` | `boolean` | - | Sets the enabled state of the component. Gets the enabled state of the component. |
