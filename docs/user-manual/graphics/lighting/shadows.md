---
title: Shadows
description: Enable real-time shadows, choose a shadow type (PCF, VSM, or PCSS), and tune quality with cascades, resolution, and bias.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Shadows ground the objects in your scene, conveying depth and the spatial relationships between them while adding realism and visual polish.

PlayCanvas renders real-time, dynamic shadows using a technique called shadow mapping, which is supported by every light type and works across all platforms, from desktop to mobile. This page covers how to enable shadows, choose which objects cast and receive them, pick a shadow type, and tune their quality.

## Enabling Shadows {#enabling-shadows}

By default, shadow casting is disabled in PlayCanvas, so you have to explicitly enable it yourself. First, identify which lights in your scene should cast shadows — every light exposes a **Cast Shadows** option. You then choose which graphical objects cast and receive shadows: by default, all render and model components both cast and receive shadows, and you can toggle this per entity.

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// Enable shadow casting on a light
entity.light.castShadows = true;

// Mesh entities cast & receive shadows by default (render or model component);
// toggle per entity as needed
meshEntity.render.castShadows = true;
meshEntity.render.receiveShadows = true;
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

## Shadow Types {#shadow-type}

The technique used to filter a light's shadows — trading off edge softness, quality, and performance — is chosen per light. PlayCanvas offers three filtering techniques:

:::note

With [clustered lighting](/user-manual/graphics/lighting/clustered-lighting) enabled (the default), the per-light shadow type only applies to directional lights. Spot and omni lights all share a single [scene-wide shadow type](/user-manual/graphics/lighting/clustered-lighting/#shadows-type) (PCF only), set in the scene's lighting settings.

:::

### PCF (Percentage-Closer Filtering) {#pcf}

The outline of a shadow is called the penumbra: the transition from dark to light that gives a shadow its soft edge. PCF, the default technique, reads several localized samples from the shadow map and averages them to soften this edge by a fixed amount.

![Hard vs soft shadows](/img/user-manual/graphics/lighting/shadows/hard-vs-soft.jpg)

The kernel size controls the trade-off: 1×1 gives the hardest edge, 3×3 is the default, and 5×5 produces the softest edges — larger kernels sample more texels and cost more on the GPU.

Set the shadow type to a PCF variant:

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// SHADOW_PCF1_32F | SHADOW_PCF3_32F (default) | SHADOW_PCF5_32F
entity.light.shadowType = pc.SHADOW_PCF5_32F;
```

</TabItem>
<TabItem value="editor" label="Editor">

Set **Shadow Type** to **Shadow Map PCF 1x1**, **3x3** or **5x5** in the [Light Component](/user-manual/editor/scenes/components/light).

</TabItem>
<TabItem value="react" label="React">

```jsx
import { SHADOW_PCF5_32F } from 'playcanvas';

<Entity name="light">
  <Light type="directional" castShadows shadowType={SHADOW_PCF5_32F} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<!-- shadow-type: pcf1-32f | pcf3-32f | pcf5-32f -->
<pc-entity>
  <pc-light type="directional" cast-shadows shadow-type="pcf5-32f"></pc-light>
</pc-entity>
```

</TabItem>
</Tabs>

### VSM (Variance Shadow Maps) {#vsm}

Variance shadow maps store statistical depth information that can be pre-blurred, producing smooth soft edges that work well over large areas such as directional-light shadows. They are available in 16-bit and 32-bit precision variants (the latter being more precise), and can exhibit light-bleeding artifacts in some scenes.

:::note

VSM is only available for directional lights and non-clustered spot lights.

:::

Set the shadow type to VSM and tune it:

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
entity.light.shadowType = pc.SHADOW_VSM_16F;

// Optional tuning
entity.light.vsmBlurSize = 11; // blur kernel size, 1-25
entity.light.vsmBlurMode = pc.BLUR_GAUSSIAN; // or pc.BLUR_BOX (cheaper)
entity.light.vsmBias = 0.0025; // reduces shadow acne, 0-1
```

</TabItem>
<TabItem value="editor" label="Editor">

Set **Shadow Type** to **Variance Shadow Map (16bit)** or **(32bit)** in the [Light Component](/user-manual/editor/scenes/components/light). **VSM Blur Mode** and **VSM Blur Size** then appear there too.

</TabItem>
<TabItem value="react" label="React">

```jsx
import { SHADOW_VSM_16F, BLUR_GAUSSIAN } from 'playcanvas';

<Entity name="light">
  <Light type="directional" castShadows shadowType={SHADOW_VSM_16F}
    vsmBlurSize={11} vsmBlurMode={BLUR_GAUSSIAN} vsmBias={0.0025} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<!-- vsm-blur-mode is not currently exposed as an attribute -->
<pc-entity>
  <pc-light type="directional" cast-shadows shadow-type="vsm-16f"
    vsm-blur-size="11" vsm-bias="0.0025"></pc-light>
</pc-entity>
```

</TabItem>
</Tabs>

### PCSS (Percentage-Closer Soft Shadows) {#pcss}

PCF produces a soft edge of constant width. Real shadows, however, are sharp where two objects touch and soften as the caster moves further from the surface that receives the shadow. PCSS reproduces this *contact-hardening* behavior, varying the width of the penumbra based on the distance between the shadow caster and receiver.

![Soft shadows using PCSS](/img/user-manual/graphics/lighting/shadows/pcss-shadows.webp)

:::note

PCSS is only available for directional lights.

PCSS also requires the device to support rendering to and linearly filtering floating-point textures. This is widely available on modern desktop GPUs, but it is not universal — particularly on older or low-end mobile devices. Where it is unsupported, the light automatically falls back to PCF, so it is always safe to enable PCSS.

:::

Set the shadow type to PCSS and fine-tune it:

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
entity.light.shadowType = pc.SHADOW_PCSS_32F;

// Optional fine-tuning
entity.light.penumbraSize = 2; // overall penumbra size (softness)
entity.light.penumbraFalloff = 1; // how fast softness grows with distance, >= 1
entity.light.shadowSamples = 16; // filter samples; higher = smoother, costlier
entity.light.shadowBlockerSamples = 16; // 0 disables contact hardening
```

</TabItem>
<TabItem value="editor" label="Editor">

Select the light in the Hierarchy and set its **Shadow Type** to **PCSS (Soft Shadows)** in the [Light Component](/user-manual/editor/scenes/components/light). **Penumbra Size** and **Penumbra Falloff** then appear there too; the sample counts are not currently exposed in the Light Component editor UI and must therefore be set in a script.

</TabItem>
<TabItem value="react" label="React">

```jsx
import { SHADOW_PCSS_32F } from 'playcanvas';

<Entity name="light">
  <Light type="directional" castShadows shadowType={SHADOW_PCSS_32F}
    penumbraSize={2} penumbraFalloff={1} shadowSamples={16} shadowBlockerSamples={16} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity>
  <pc-light type="directional" cast-shadows shadow-type="pcss-32f"
    penumbra-size="2" penumbra-falloff="1" shadow-samples="16" shadow-blocker-samples="16"></pc-light>
</pc-entity>
```

</TabItem>
</Tabs>

## Tuning Shadows {#tuning-shadows}

The shadow mapping technique used by PlayCanvas has only finite resolution. Therefore, you may need to tune some values to make them look as good as possible. Each property below can be set in the [Light Component](/user-manual/editor/scenes/components/light) UI in the Editor, or on the light component in code (`entity.light.*`).

### Shadow Resolution {#shadow-resolution}

Every light casts shadows via a shadow map. This shadow map (`light.shadowResolution`) can range from 16x16 up to 4096x4096, and this value is also set in the light component's interface. The higher the resolution, the crisper the shadows. However, higher resolution shadows are more expensive to render so be sure to balance performance against quality.

### Shadow Distance {#shadow-distance}

The shadow distance (`light.shadowDistance`) is the distance from the viewpoint beyond which directional light shadows are no longer rendered. The smaller this value, the crisper your shadows will be. The problem is that the viewer will be able to see the shadows suddenly appear as the viewpoint moves around the scene. Therefore, you should balance this value based on how far the player can see into the distance and generally what looks good.

### Shadow Cascades {#shadow-cascades}

When a directional shadow is used over a large area, it often exhibits aliasing, where a shadow near the camera has a low resolution. Capturing the shadow in a single shadow map requires very high and impractical resolution to improve this.

Shadow cascades help to fix this problem by splitting the camera view frustum along the viewing direction, and a separate shadow map is used for each split. This gives nearby objects one shadow map, and another shadow map captures everything in the distance, and optionally additional shadow maps in between.

Note that the number of shadow cascades has an effect on performance, as each shadow casting mesh might need to be rendered into more than a single shadow map.

The number of cascades (`light.numCascades`) represents the number of view frustum subdivisions, and can be 1, 2, 3 or 4. The default value of 1 represents a single shadow map.

A screenshot showing a single shadow cascade.

![One cascade](/img/user-manual/graphics/lighting/shadows/shadow-cascades-1.jpg)

A screenshot showing four shadow cascades.

![Four cascades](/img/user-manual/graphics/lighting/shadows/shadow-cascades-4.jpg)

The distribution (`light.cascadeDistribution`) of subdivision of the camera frustum for individual shadow cascades. A value in the range of 0 to 1 can be specified. A value of 0 represents a linear distribution and a value of 1 represents a logarithmic distribution. Visually, a higher value distributes more shadow map resolution to foreground objects, while a lower value distributes it to more distant objects.

### Shadow Intensity {#shadow-intensity}

The intensity of the shadow (`light.shadowIntensity`), where 1 represents full intensity shadow cast by this light, and 0 represents no shadow.

![Shadow Intensity](/img/user-manual/graphics/lighting/shadows/shadow-intensity.gif)

## Fixing Shadow Artifacts {#fixing-shadow-artifacts}

Shadow mapping can be prone to rendering artifacts that can look very ugly. The properties below can help you eliminate them.

### Shadow Bias {#shadow-bias}

If you notice bands of shadow or speckled patches where you do not expect, you should try tuning the shadow bias (`light.shadowBias`) to resolve the problem.

### Normal Offset Bias {#normal-offset-bias}

'Shadow acne' artifacts are a big problem and the shadow bias can eliminate them quite effectively. Unfortunately, this always introduces some level of 'Peter Panning', the phenomenon where shadows make an object appear to be floating in mid-air.

The Normal Offset Bias (`light.normalOffsetBias`) solves this problem. In addition to using the depth bias, we can avoid both shadow acne and Peter Panning by making small tweaks to the UV coordinates used in the shadow map look-up. A fragment's position is offset along its geometric normal. This "Normal Offset" technique yields vastly superior results to a constant shadow bias only approach.

## Performance Considerations {#performance-considerations}

Enabling shadows has performance implications:

* For each shadow casting directional or spot light, the scene must be rendered once into a shadow map every frame. Omni light shadows are far more expensive since the scene is rendered six times per light (the shadow map is stored as a 6-sided cube map). Rendering the scene into shadow maps places load on both the CPU and the GPU.
* Using a greater shadow map resolution will generate crisper shadows but the GPU must fill more shadow map pixels and therefore this may affect frame rate.
* The [shadow type](#shadow-type) affects cost: larger PCF kernels, VSM blurring, and especially PCSS (which takes many samples per pixel) are more expensive on the GPU than a hard, single-sample shadow.
* For directional lights, each additional [shadow cascade](#shadow-cascades) may require shadow casters to be rendered into more than one shadow map, increasing cost.
* If your shadows are from static parts of the environment consider using [lightmaps](/user-manual/graphics/lighting/lightmapping) to bake shadows into textures.
