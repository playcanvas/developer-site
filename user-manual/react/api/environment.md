# `<Environment/>`

The `<Environment/>` component is used to configure the environment lighting and skybox for a scene. It provides a simple way to set up global lighting, and other effects that affect the entire scene.

With an `<Environment/>` component in your scene, you can:

- Set the background texture for the scene
- Provides Image-Based Lighting (IBL) for realistic environmental reflections
- Controls sky dome properties, rotation, scale, and positioning
- Manages exposure, luminance, and other global lighting parameters

## Usage

Place the `<Environment/>` component within an [`<Application/>`](https://developer.playcanvas.com/user-manual/react/api/application.md) and add it to the scene. You'll need to load a HDR or environment atlas and provide it to the component.

:::tip

**You only need one `<Environment/>` component for the entire scene**. Using multiple `<Environment/>` components within the same `<Application/>` will trigger a warning.

:::

Simply load a HDR and set it as the skybox. You can find great HDR images on [HDRI Haven](https://hdrihaven.com/).

```jsx copy
const EnvironmentExample = () => {
  const { asset: skybox } = useTexture('/env.hdr')

  return (
      <Environment skybox={skybox} />
      {/* The rest of your scene... */}
  )
}
```

The component will affect the entire scene, so you should only use it once. You can specify global lighting parameters like exposure, luminance, and other global lighting parameters. See the [Properties](https://developer.playcanvas.com/user-manual/react/api/environment.md#properties) section for more details.

You can also use the `<Environment/>` component to create a dome effect. This is useful for creating a more realistic environment with a ground plane. You can specify the scale, position, rotation, and other properties of the dome.

**Switch between different environment atlases and exposure settings**

```jsx title="environment-example.jsx"
import { Entity } from '@playcanvas/react';
import { Environment, Render } from '@playcanvas/react/components';
import {  useTexture, useModel } from '@playcanvas/react/hooks';
import { useControls } from 'leva'

const vars = { 
    exposure: { value: 0.75, min: 0, max: 1 }, 
    environment: {
        options: {
        Street:'/assets/wide-street.hdr', 
        ['Aviation Museum']:'/assets/museum.hdr'
        },
        value: '/assets/wide-street.hdr'
    } 
}
// ↑ imports hidden

export const EnvironmentExample = () => {
    const { exposure, environment } = useControls(vars)
    
    // Load the assets
    const { asset: lambo } = useModel('/assets/lambo.glb');
    const { asset: skybox } = useTexture(environment);
    
    if (!lambo || !skybox) return null;

    return (<>
        {/* Environment with controllable settings */}
        <Environment 
            type="dome"
            skybox={skybox}
            exposure={exposure}
            scale={[15, 15, 15]} 
            center={[0.0, 0.09, 0.0]} 
            rotation={[0, 290, 0]}
            showSkybox={true}
        />

        {/* Render the model */}
        <Entity name='lambo'>
            <Render asset={lambo} />
        </Entity>
    </>);
}
```

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `device?` | `GraphicsDevice` | - |  |
| `scene?` | `Scene` | - |  |
| `centerArray?` | `Float32Array<ArrayBuffer>` | - |  |
| `projectedSkydomeCenterId?` | `ScopeId` | - |  |
| `type?` | `string` | - | Sets the type of the sky. Can be: - SKYTYPE_INFINITE - SKYTYPE_BOX - SKYTYPE_DOME Defaults to SKYTYPE_INFINITE. Gets the type of the sky. |
| `depthWrite?` | `boolean` | - | Sets whether depth writing is enabled for the sky. Defaults to false. Writing a depth value for the skydome is supported when its type is not SKYTYPE_INFINITE. When enabled, the depth is written during a prepass render pass and can be utilized by subsequent passes to apply depth-based effects, such as Depth of Field. Note: For the skydome to be rendered during the prepass, the Sky Layer must be ordered before the Depth layer, which is the final layer used in the prepass. Gets whether depth writing is enabled for the sky. |
| `fisheye?` | `number` | - | Sets the fisheye projection strength for the sky. The value is in the range [0, 1]: - 0: Standard rectilinear (perspective) projection. - (0, 1]: Increasing barrel distortion, producing a wider field of view. Only supported with SKYTYPE_INFINITE. Has no effect on dome or box sky types, and has no effect with orthographic cameras. Defaults to 0. Gets the fisheye projection strength for the sky. |
| `scale?` | `[number, number, number]` | - | The scale of the sky. |
| `position?` | `[number, number, number]` | - | The position of the sky. |
| `center?` | `[number, number, number]` | - | The center of the sky. |
| `rotation?` | `[number, number, number]` | - | The rotation of the sky. |
| `showSkybox?` | `boolean` | - | Whether to show the skybox. |
| `ambientBake?` | `boolean` | - | If enabled, the ambient lighting will be baked into lightmaps. This will be either the skybox if set up, otherwise ambientLight. Defaults to false. |
| `ambientBakeOcclusionBrightness?` | `number` | - | If ambientBake is true, this specifies the brightness of ambient occlusion. Typical range is -1 to 1. Defaults to 0, representing no change to brightness. |
| `ambientBakeOcclusionContrast?` | `number` | - | If ambientBake is true, this specifies the contrast of ambient occlusion. Typical range is -1 to 1. Defaults to 0, representing no change to contrast. |
| `ambientLight?` | `Color` | - | The color of the scene's ambient light, specified in sRGB color space. Defaults to black (0, 0, 0). |
| `ambientLuminance?` | `number` | - | The luminosity of the scene's ambient light in lux (lm/m^2). Used if physicalUnits is true. Defaults to 0. |
| `exposure?` | `number` | - | The exposure value tweaks the overall brightness of the scene. Ignored if physicalUnits is true. Defaults to 1. |
| `lightmapSizeMultiplier?` | `number` | - | The lightmap resolution multiplier. Defaults to 1. |
| `lightmapMaxResolution?` | `number` | - | The maximum lightmap resolution. Defaults to 2048. |
| `lightmapMode?` | `number` | - | The lightmap baking mode. Can be: - BAKE_COLOR: single color lightmap - BAKE_COLORDIR: single color lightmap + dominant light direction (used for bump or specular). Only lights with bakeDir=true will be used for generating the dominant light direction. Defaults to BAKE_COLORDIR. |
| `lightmapFilterEnabled?` | `boolean` | - | Enables bilateral filter on runtime baked color lightmaps, which removes the noise and banding while preserving the edges. Defaults to false. Note that the filtering takes place in the image space of the lightmap, and it does not filter across lightmap UV space seams, often making the seams more visible. It's important to balance the strength of the filter with number of samples used for lightmap baking to limit the visible artifacts. |
| `lightmapHDR?` | `boolean` | - | Enables HDR lightmaps. This can result in smoother lightmaps especially when many samples are used. Defaults to false. |
| `root?` | `Entity` | - | The root entity of the scene, which is usually the only child to the Application root entity. |
| `physicalUnits?` | `boolean` | - | Use physically based units for cameras and lights. When used, the exposure value is ignored. |
| `updateShaders?` | `boolean` | - |  |
| `immediate?` | `Immediate` | - |  |
| `ambientBakeNumSamples?` | `number` | - | Sets the number of samples used to bake the ambient light into the lightmap. Note that ambientBake must be true for this to have an effect. Defaults to 1. Maximum value is 255. Gets the number of samples used to bake the ambient light into the lightmap. |
| `ambientBakeSpherePart?` | `number` | - | Sets the part of the sphere which represents the source of ambient light. Note that ambientBake must be true for this to have an effect. The valid range is 0..1, representing a part of the sphere from top to the bottom. A value of 0.5 represents the upper hemisphere. A value of 1 represents a full sphere. Defaults to 0.4, which is a smaller upper hemisphere as this requires fewer samples to bake. Gets the part of the sphere which represents the source of ambient light. |
| `clusteredLightingEnabled?` | `boolean` | - | Sets whether clustered lighting is enabled. Set to false before the first frame is rendered to use non-clustered lighting. Defaults to true. Gets whether clustered lighting is enabled. |
| `layers?` | `LayerComposition` | - | Sets the LayerComposition that defines rendering order of this scene. Gets the LayerComposition that defines rendering order of this scene. |
| `lightmapFilterRange?` | `number` | - | Sets the range parameter of the bilateral filter. It's used when lightmapFilterEnabled is enabled. Larger value applies more widespread blur. This needs to be a positive non-zero value. Defaults to 10. Gets the range parameter of the bilateral filter. |
| `lightmapFilterSmoothness?` | `number` | - | Sets the spatial parameter of the bilateral filter. It's used when lightmapFilterEnabled is enabled. Larger value blurs less similar colors. This needs to be a positive non-zero value. Defaults to 0.2. Gets the spatial parameter of the bilateral filter. |
| `prefilteredCubemaps?` | `Texture[]` | - | Sets the 6 prefiltered cubemaps acting as the source of image-based lighting. Gets the 6 prefiltered cubemaps acting as the source of image-based lighting. |
| `skyboxIntensity?` | `number` | - | Sets the multiplier for skybox intensity. Defaults to 1. Unused if physical units are used. Gets the multiplier for skybox intensity. |
| `skyboxLuminance?` | `number` | - | Sets the luminance (in lm/m^2) of the skybox. Defaults to 0. Only used if physical units are used. Gets the luminance (in lm/m^2) of the skybox. |
| `skyboxMip?` | `number` | - | Sets the mip level of the skybox to be displayed. Only valid for prefiltered cubemap skyboxes. Defaults to 0 (base level). Gets the mip level of the skybox to be displayed. |
| `skyboxHighlightMultiplier?` | `number` | - | Sets the highlight multiplier for the skybox. The HDR skybox can represent brightness levels up to a maximum of 64, with any values beyond this being clipped. This limitation prevents the accurate representation of extremely bright sources, such as the Sun, which can affect HDR bloom rendering by not producing enough bloom. The multiplier adjusts the brightness after clipping, enhancing the bloom effect for bright sources. Defaults to 1. Gets the highlight multiplied for the skybox. |
| `skyboxRotation?` | `Readonly<Quat>` | - | Sets the rotation of the skybox to be displayed. Defaults to Quat.IDENTITY. Gets the rotation of the skybox to be displayed. Use the setter to update skybox state. |
| `skybox?` | `Asset \| null` | - | The skybox asset. Used to set the skybox of the environment. |
| `envAtlas?` | `Asset \| null` | - | The environment lighting. Used to set the lighting of the environment. |
