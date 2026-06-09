---
title: Shadows
description: Enable shadow mapping, tune cast and receive flags, and use cascaded directional shadows to reduce aliasing.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Shadows ground the objects in your scene, conveying depth and the spatial relationships between them while adding realism and visual polish.

![Soft shadows using PCSS](/img/user-manual/graphics/lighting/shadows/pcss-shadows.webp)

PlayCanvas renders real-time, dynamic shadows using a technique called shadow mapping, which is supported by every light type and works across all platforms, from desktop to mobile. This page covers how to enable shadows, choose which objects cast and receive them, and tune their quality — including shadow cascades and soft shadows.

## Enabling Shadows {#enabling-shadows}

By default, shadow casting is disabled in PlayCanvas, so you have to explicitly enable it yourself. First, identify which lights in your scene should cast shadows — every light exposes a **Cast Shadows** option. You then choose which graphical objects cast and receive shadows: by default, all render and model components both cast and receive shadows, and you can toggle this per entity.

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// Enable shadow casting on a light
lightEntity.light.castShadows = true;

// Render (and model) components cast & receive shadows by default;
// toggle per entity as needed
entity.render.castShadows = true;
entity.render.receiveShadows = true;
```

</TabItem>
<TabItem value="editor" label="Editor">

Select a light in the Hierarchy and enable **Cast Shadows** in its [Light Component](/user-manual/editor/scenes/components/light).

To control which objects participate, select an entity and toggle the **Cast Shadows** / **Receive Shadows** options on its [render](/user-manual/editor/scenes/components/render) or [model](/user-manual/editor/scenes/components/model) component.

</TabItem>
<TabItem value="react" label="React">

```jsx
// Enable shadow casting on a light
<Entity name="light">
  <Light type="directional" castShadows />
</Entity>

// Render components cast & receive shadows by default; toggle as needed
<Entity>
  <Render type="box" castShadows receiveShadows />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<!-- Enable shadow casting on a light -->
<pc-entity>
  <pc-light type="directional" cast-shadows></pc-light>
</pc-entity>

<!-- Render components cast & receive shadows by default; toggle as needed -->
<pc-entity>
  <pc-render type="box" cast-shadows receive-shadows></pc-render>
</pc-entity>
```

</TabItem>
</Tabs>

## Shadow Cascades {#shadow-cascades}

When a directional shadow is used over a large area, it often exhibits aliasing, where a shadow near the camera has a low resolution. Capturing the shadow in a single shadow map requires very high and impractical resolution to improve this.

Shadow cascades help to fix this problem by splitting the camera view frustum along the viewing direction, and a separate shadow map is used for each split. This gives nearby objects one shadow map, and another shadow map captures everything in the distance, and optionally additional shadow maps in between.

Note that the number of shadow cascades has an effect on performance, as each shadow casting mesh might need to be rendered into more than a single shadow map.

The following properties can be used to set up shadow cascades.

### Number of cascades {#number-of-cascades}

Number of cascades (`light.numCascades`) represents the number of view frustum subdivisions, and can be 1, 2, 3 or 4. The default value of 1 represents a single shadow map.

A screenshot showing a single shadow cascade.

![One cascade](/img/user-manual/graphics/lighting/shadows/shadow-cascades-1.jpg)

A screenshot showing four shadow cascades.

![Four cascades](/img/user-manual/graphics/lighting/shadows/shadow-cascades-4.jpg)

### Distribution of cascades {#distribution-of-cascades}

The distribution (`light.cascadeDistribution`) of subdivision of the camera frustum for individual shadow cascades. A value in the range of 0 to 1 can be specified. A value of 0 represents a linear distribution and a value of 1 represents a logarithmic distribution. Visually, a higher value distributes more shadow map resolution to foreground objects, while a lower value distributes it to more distant objects.

## Tuning Shadows {#tuning-shadows}

The shadow mapping technique used by PlayCanvas has only finite resolution. Therefore, you may need to tune some values to make them look as good as possible. Each property below can be set in the [Light Component](/user-manual/editor/scenes/components/light) UI in the Editor, or on the light component in code (`lightEntity.light.*`).

### Shadow Distance {#shadow-distance}

The shadow distance (`light.shadowDistance`) is the distance from the viewpoint beyond which directional light shadows are no longer rendered. The smaller this value, the crisper your shadows will be. The problem is that the viewer will be able to see the shadows suddenly appear as the viewpoint moves around the scene. Therefore, you should balance this value based on how far the player can see into the distance and generally what looks good.

### Shadow Intensity {#shadow-intensity}

The intensity of the shadow (`light.shadowIntensity`), where 1 represents full intensity shadow cast by this light, and 0 represents no shadow.

![Shadow Intensity](/img/user-manual/graphics/lighting/shadows/shadow-intensity.gif)

### Shadow Resolution {#shadow-resolution}

Every light casts shadows via a shadow map. This shadow map (`light.shadowResolution`) can have a resolution of 256x256, 512x512, 1024x1024 or 2048x2048 and this value is also set in the light component's interface. The higher the resolution, the crisper the shadows. However, higher resolution shadows are more expensive to render so be sure to balance performance against quality.

### Shadow Bias {#shadow-bias}

Shadow mapping can be prone to rendering artifacts that can look very ugly. If you notice bands of shadow or speckled patches where you do not expect, you should try tuning the shadow bias (`light.shadowBias`) to resolve the problem.

### Normal Offset Bias {#normal-offset-bias}

'Shadow acne' artifacts are a big problem and the shadow bias can eliminate them quite effectively. Unfortunately, this always introduces some level of 'Peter Panning', the phenomenon where shadows make an object appear to be floating in mid-air.

The Normal Offset Bias (`light.normalOffsetBias`) solves this problem. In addition to using the depth bias, we can avoid both shadow acne and Peter Panning by making small tweaks to the UV coordinates used in the shadow map look-up. A fragment's position is offset along its geometric normal. This "Normal Offset" technique yields vastly superior results to a constant shadow bias only approach.

## Soft Shadows vs Hard Shadows {#soft-shadows-vs-hard-shadows}

The outline of a shadow is called the penumbra. This is a transition from dark to light which gives shadows a soft edge. Softening shadow edges is the default in PlayCanvas but you can change this setting if you wish to achieve hard edged shadows. See below for a comparison of soft and hard edged shadows:

![Hard vs soft shadows](/img/user-manual/graphics/lighting/shadows/hard-vs-soft.jpg)

Soft shadows are achieved by performing more samples of the shadow map on the GPU. The algorithm used is called Percentage Closest Filtering or PCF for short. This algorithm reads 9 localized samples (a 3 by 3 matrix) from the shadow map instead of just one as is used for hard shadows.

The shadow sampling type is specified per light, so the option can be found in the Light Inspector, or set in code via `light.shadowType` (for example `pc.SHADOW_PCF1`, `pc.SHADOW_PCF3` or `pc.SHADOW_PCF5`, where higher numbers sample more taps for softer edges).

### Contact-Hardening Soft Shadows (PCSS) {#contact-hardening-soft-shadows}

PCF produces a soft edge of constant width. Real shadows, however, are sharp where two objects touch and soften as the caster moves further from the surface that receives the shadow. PlayCanvas can reproduce this with **Percentage-Closer Soft Shadows (PCSS)**, which varies the width of the penumbra based on the distance between the shadow caster and receiver.

Select **PCSS** as the light's shadow type in the Inspector, or set it in code:

```javascript
lightEntity.light.shadowType = pc.SHADOW_PCSS_32F;
```

PCSS requires floating-point texture support on the device. Where that is unavailable, the light automatically falls back to PCF.

The appearance and cost of PCSS are controlled by these light properties:

* `light.penumbraSize` — the overall size of the penumbra, i.e. how soft the shadows can become. Defaults to `1`.
* `light.penumbraFalloff` — how quickly the shadow softens with distance from the contact point (a value `>= 1`). Defaults to `1`.
* `light.shadowSamples` — the number of samples used to filter the shadow. Higher values look smoother but cost more on the GPU. Defaults to `16`.
* `light.shadowBlockerSamples` — the number of samples used to estimate the caster-to-receiver distance that drives contact hardening. Set to `0` to disable contact hardening and use a constant softness. Defaults to `16`.

## Performance Considerations {#performance-considerations}

Enabling shadows has performance implications:

* For each shadow casting directional or spot light, the scene must be rendered once into a shadow map every frame. Omni light shadows are far more expensive since the scene is rendered six times per light (the shadow map is stored as a 6-sided cube map). Rendering the scene into shadow maps places load on both the CPU and the GPU.
* Using a greater shadow map resolution will generate crisper shadows but the GPU must fill more shadow map pixels and therefore this may affect frame rate.
* Selecting soft shadows (PCF3x3) for the shadow sample type on a shadow receiving material is more expensive on the GPU versus the hard shadows option.
* If your shadows are from static parts of the environment consider using [lightmaps](/user-manual/graphics/lighting/lightmapping) to bake shadows into textures.
