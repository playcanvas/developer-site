---
title: Shadows
---

Shadows are a great way to add realism to your games. However, dynamic (realtime) shadows, can come with a significant runtime performance cost. For a more performant way of adding static shadows to your scene. See [Lightmaps][4].

![Characters with shadow casting](/img/user-manual/graphics/lighting/shadows/doom3_shadows.jpg)

The PlayCanvas engine implements a shadowing algorithm called shadow mapping. It is completely cross-platform and so is guaranteed to work on both mobile and the desktop.

## Enabling Shadows {#enabling-shadows}

<img loading="lazy" src="/img/user-manual/graphics/lighting/shadows/light-shadow-options.png" width="480" />

By default, shadow casting is disabled in PlayCanvas. You have to explicitly enable it yourself. Fortunately, enabling shadows is easy. First of all, identify which lights in your scene you want to cast shadows. Select the lights in the Hierarchy to edit their properties in the Inspector panel. Every light has a 'Cast Shadows' option. Simply check this option for the light to generate shadows for shadow casting graphical objects in your scene.

![Model Component](/img/user-manual/scenes/components/component-model.png)

Now you need to specify which graphical objects in your scene cast and receive shadows. By default, all render and model components cast and receive shadows. To modify these properties, select the entity in the Hierarchy, locate the render or model component in the Inspector and uncheck the 'Cast Shadows' or 'Receive Shadows' option as required.

## Shadow Cascades {#shadow-cascades}

When a directional shadow is used over a large area, it often exhibits aliasing, where a shadow near the camera has a low resolution. Capturing the shadow in a single shadow map requires very high and impractical resolution to improve this.

Shadow cascades help to fix this problem by splitting the camera view frustum along the viewing direction, and a separate shadow map is used for each split. This gives nearby objects one shadow map, and another shadow map captures everything in the distance, and optionally additional shadow maps in between.

Note that the number of shadow cascades has an effect on performance, as each shadow casting mesh might need to be rendered into more than a single shadow map.

The following properties can be used to set up shadow cascades.

### Number of cascades {#number-of-cascades}

Number of cascades represents the number of view frustum subdivisions, and can be 1, 2, 3 or 4. The default value of 1 represents a single shadow map.

A screenshot showing a single shadow cascade.

![One cascade](/img/user-manual/graphics/lighting/shadows/shadow_cascades_1.jpg)

A screenshot showing four shadow cascades.

![Four cascades](/img/user-manual/graphics/lighting/shadows/shadow_cascades_4.jpg)

### Distribution of cascades {#distribution-of-cascades}

The distribution of subdivision of the camera frustum for individual shadow cascades. A value in the range of 0 to 1 can be specified. A value of 0 represents a linear distribution and a value of 1 represents a logarithmic distribution. Visually, a higher value distributes more shadow map resolution to foreground objects, while a lower value distributes it to more distant objects.

## Tuning Shadows {#tuning-shadows}

The shadow mapping technique used by PlayCanvas has only finite resolution. Therefore, you may need to tune some values to make them look as good as possible. The following properties can be found in the [Light Component][2] UI.

### Shadow Distance {#shadow-distance}

The shadow distance is the distance from the viewpoint beyond which directional light shadows are no longer rendered. The smaller this value, the crisper your shadows will be. The problem is that the viewer will be able to see the shadows suddenly appear as the viewpoint moves around the scene. Therefore, you should balance this value based on how far the player can see into the distance and generally what looks good.

### Shadow Intensity {#shadow-intensity}

The intensity of the shadow, where 1 represents full intensity shadow cast by this light, and 0 represents no shadow.

![Shadow Intensity](/img/user-manual/graphics/lighting/shadows/shadow-intensity.gif)

### Shadow Resolution {#shadow-resolution}

Every light casts shadows via a shadow map. This shadow map can have a resolution of 256x256, 512x512, 1024x1024 or 2048x2048 and this value is also set in the light component's interface. The higher the resolution, the crisper the shadows. However, higher resolution shadows are more expensive to render so be sure to balance performance against quality.

### Shadow Bias {#shadow-bias}

Shadow mapping can be prone to rendering artifacts that can look very ugly. If you notice bands of shadow or speckled patches where you do not expect, you should try tuning the shadow bias to resolve the problem.

### Normal Offset Bias {#normal-offset-bias}

'Shadow acne' artifacts are a big problem and the shadow bias can eliminate them quite effectively. Unfortunately, this always introduces some level of 'Peter Panning', the phenomenon where shadows make a object appear to be floating in mid-air.

The Normal Offset Bias solves this problem. In addition to using the depth bias, we can avoid both shadow acne and Peter Panning by making small tweaks to the UV coordinates used in the shadow map look-up. A fragment's position is offset along its geometric normal. This "Normal Offset" technique yields vastly superior results to a constant shadow bias only approach.

## Soft Shadows vs Hard Shadows {#soft-shadows-vs-hard-shadows}

The outline of a shadow is called the penumbra. This is a transition from dark to light which gives shadows a soft edge. Softening shadow edges is the default in PlayCanvas but you can change this setting if you wish to achieve hard edged shadows. See below for a comparison of soft and hard edged shadows:

![Hard vs soft shadows](/img/user-manual/graphics/lighting/shadows/hard_vs_soft.jpg)

Soft shadows are achieved by performing more samples of the shadow map on the GPU. The algorithm used is called Percentage Closest Filtering or PCF for short. This algorithm reads 9 localized samples (a 3 by 3 matrix) from the shadow map instead of just one as is used for hard shadows.

The shadow sampling type is specified per light and so the option can be found in the Light Inspector.

## Performance Considerations {#performance-considerations}

Enabling shadows has performance implications:

* For each shadow casting directional or spot light, the scene must be rendered once into a shadow map every frame. Omni light shadows are far more expensive since the scene is rendered six times per light (the shadow map is stored as a 6-sided cube map). Rendering the scene into shadow maps places load on both the CPU and the GPU.
* Using a greater shadow map resolution with generate crisper shadows but the GPU must fill more shadow map pixels and therefore this may affect frame rate.
* Selecting soft shadows (PCF3x3) for the shadow sample type on a shadow receiving material is more expensive on the GPU versus the hard shadows option.
* If your shadows are from static parts of the environment consider using [lightmaps][4] to bake shadows into textures.

[2]: /user-manual/scenes/components/light
[4]: /user-manual/graphics/lighting/lightmapping
