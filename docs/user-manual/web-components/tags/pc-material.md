---
title: <pc-material>
description: "Reference for the pc-material element: a physically based standard material with color, metalness, gloss, opacity and per-attribute texture map slots."
---

The `<pc-material>` tag is used to define a material that can be applied to [`<pc-render>`](../pc-render) components via their `material` attribute.

:::note[Usage]

* It must be a direct child of [`<pc-app>`](../pc-app).

:::

The element wraps the engine's [StandardMaterial](https://api.playcanvas.com/engine/classes/StandardMaterial.html) and is metal/rough by default: unlike a bare `StandardMaterial`, the metalness workflow is enabled (`use-metalness` defaults to `"true"`), which is what the `metalness-*` attributes assume and what glTF and other PBR tools mean by PBR. As a companion to that default, `metalness` starts at `0` (dielectric) rather than the engine's `1`, so a material with just a `diffuse` color renders as that color rather than as a fully metallic surface. Set `metalness="1"` for a metal.

:::warning[Gloss vs roughness]

The `roughness` and `roughness-map` attributes are aliases for `gloss` and `gloss-map` that additionally invert the gloss channel. Use one family or the other on a given material — mixing them logs a console warning, because the two families disagree about inversion. The `gloss-map-*` [modifiers](#texture-map-modifiers) carry no inversion of their own, so they are the supported way to configure a `roughness-map`.

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `alpha-test` | Number | `"0"` | Alpha test reference value. Fragments with an opacity below this value are discarded |
| `alpha-to-coverage` | Boolean | `"false"` | Whether to use alpha-to-coverage, which resolves transparency using multisampling |
| `ao-intensity` | Number | `"1"` | Strength of the ambient occlusion map, from 0 to 1 |
| `ao-map` | [Asset ID](../attributes.md#asset-and-material-ids) | - | `id` of a texture [`<pc-asset>`](../pc-asset) used as the ambient occlusion map |
| `blend-type` | Enum | `"none"` | How the material is blended with the scene behind it: `"none"` \| `"normal"` \| `"additive"` \| `"additive-alpha"` \| `"premultiplied"` \| `"multiplicative"` \| `"multiplicative-2x"` \| `"screen"` \| `"min"` \| `"max"` \| `"subtractive"` |
| `bumpiness` | Number | `"1"` | Strength of the normal map, where 0 is flat and 1 is the map's full effect |
| `cull` | Enum | `"back"` | Which faces of a mesh are culled: `"none"` \| `"back"` \| `"front"` \| `"front-and-back"` |
| `depth-bias` | Number | `"0"` | Offset applied to the depth of a fragment, used to resolve z-fighting |
| `depth-test` | Boolean | `"true"` | Whether fragments are tested against the depth buffer |
| `depth-write` | Boolean | `"true"` | Whether fragments write to the depth buffer |
| `diffuse` | Color | `"1 1 1"` | Diffuse color of the material |
| `diffuse-map` | [Asset ID](../attributes.md#asset-and-material-ids) | - | `id` of a texture [`<pc-asset>`](../pc-asset) used as the diffuse map |
| `emissive` | Color | `"0 0 0"` | Emissive color of the material |
| `emissive-intensity` | Number | `"1"` | Multiplier applied to the emissive color and map |
| `emissive-map` | [Asset ID](../attributes.md#asset-and-material-ids) | - | `id` of a texture [`<pc-asset>`](../pc-asset) used as the emissive map |
| `enable-ggx-specular` | Boolean | `"false"` | Whether to use the GGX specular model, which supports anisotropy |
| `fresnel-model` | Enum | `"schlick"` | Fresnel model used for specular reflections at grazing angles: `"none"` \| `"schlick"` |
| `gloss` | Number | `"0.25"` | Glossiness of the material, from 0 (rough) to 1 (shiny). See `roughness` |
| `gloss-invert` | Boolean | `"false"` | Whether the gloss value and map are inverted, making the material treat them as roughness. Setting `roughness` or `roughness-map` enables this automatically |
| `gloss-map` | [Asset ID](../attributes.md#asset-and-material-ids) | - | `id` of a texture [`<pc-asset>`](../pc-asset) used as the gloss map |
| `height-map` | [Asset ID](../attributes.md#asset-and-material-ids) | - | `id` of a texture [`<pc-asset>`](../pc-asset) used as the height map |
| `height-map-factor` | Number | `"1"` | Strength of the parallax effect driven by the height map |
| `id` | String | - | Unique identifier used by other tags to reference this material |
| `metalness` | Number | `"0"` | How metallic the surface is, from 0 (dielectric) to 1 (metal) |
| `metalness-map` | [Asset ID](../attributes.md#asset-and-material-ids) | - | `id` of a texture [`<pc-asset>`](../pc-asset) used as the metalness map |
| `name` | String | `"Untitled"` | Name of the material. A label, not a reference: other tags always address the material by `id` |
| `normal-map` | [Asset ID](../attributes.md#asset-and-material-ids) | - | `id` of a texture [`<pc-asset>`](../pc-asset) used as the normal map |
| `occlude-direct` | Boolean | `"false"` | Whether ambient occlusion also attenuates direct lighting |
| `occlude-specular` | Enum | `"ao"` | How specular reflections are occluded: `"none"` \| `"ao"` \| `"gloss-dependent"` |
| `opacity` | Number | `"1"` | Opacity of the material, from 0 (transparent) to 1 (opaque). Requires a `blend-type` other than `"none"` to have a visible effect |
| `opacity-dither` | Enum | `"none"` | Dithering used to render opacity, which approximates transparency without blending: `"none"` \| `"bayer8"` \| `"bluenoise"` \| `"ignnoise"` |
| `opacity-fades-specular` | Boolean | `"true"` | Whether specular highlights fade out as the material becomes transparent |
| `opacity-map` | [Asset ID](../attributes.md#asset-and-material-ids) | - | `id` of a texture [`<pc-asset>`](../pc-asset) used as the opacity map |
| `roughness` | Number | - | Roughness of the material, from 0 (shiny) to 1 (rough). An alias for `gloss` that also sets `gloss-invert`, so do not combine it with the `gloss` attributes |
| `roughness-map` | [Asset ID](../attributes.md#asset-and-material-ids) | - | `id` of a texture [`<pc-asset>`](../pc-asset) used as the roughness map. An alias for `gloss-map` that also sets `gloss-invert`, so do not combine it with the `gloss` attributes |
| `slope-depth-bias` | Number | `"0"` | Depth offset applied in proportion to a surface's slope, used to resolve z-fighting |
| `specular` | Color | `"0 0 0"` | Specular color of the material. Applies only when the metalness workflow is disabled or `use-metalness-specular-color` is enabled |
| `specularity-factor` | Number | `"1"` | Strength of specular reflections at direct angles, from 0 to 1. Applies only when `use-metalness-specular-color` is enabled |
| `two-sided-lighting` | Boolean | `"false"` | Whether back faces are lit as though their normals were flipped |
| `use-fog` | Boolean | `"true"` | Whether the material is affected by scene fog |
| `use-lighting` | Boolean | `"true"` | Whether the material is affected by scene lights. When disabled, the material renders unlit using the diffuse color and map alone |
| `use-metalness` | Boolean | `"true"` | Whether to use the metalness workflow rather than the older specular workflow |
| `use-metalness-specular-color` | Boolean | `"false"` | Whether the specular color tints reflections while the metalness workflow is in use |
| `use-skybox` | Boolean | `"true"` | Whether the material is lit by the scene's skybox |
| `use-tonemap` | Boolean | `"true"` | Whether the camera's tone mapping is applied to the material |

</div>

## Texture Map Modifiers

Every `*-map` attribute above defines a texture slot, and each slot accepts a set of companion modifiers that configure how its texture is sampled. Replace `<slot>` with one of `ao`, `diffuse`, `emissive`, `gloss`, `height`, `metalness`, `normal` or `opacity`:

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `<slot>-map-channel` | Enum | *varies* | Texture channel(s) to read the map from |
| `<slot>-map-offset` | Vector2 | `"0 0"` | UV offset of the map |
| `<slot>-map-rotation` | Number | `"0"` | Rotation of the map in degrees |
| `<slot>-map-tiling` | Vector2 | `"1 1"` | Tiling (repeat) of the map across the surface |
| `<slot>-map-uv` | Number | `"0"` | Index of the UV set used to sample the map |

</div>

The `-map-channel` modifier varies by slot:

* The color maps (`diffuse`, `emissive`) accept `"r"` \| `"g"` \| `"b"` \| `"a"` \| `"rgb"` and default to `"rgb"`.
* The scalar maps (`ao`, `gloss`, `height`, `metalness`) accept `"r"` \| `"g"` \| `"b"` \| `"a"` and default to `"g"`.
* The `opacity` map accepts `"r"` \| `"g"` \| `"b"` \| `"a"` and defaults to `"a"`.
* The `normal` map has no channel modifier — it always reads all three channels.

## Example

Four materials: a plain color, a metal, a transparent "glass" and a tiled texture map. The sky's `lighting` gives the metal something to reflect. Try editing `diffuse` colors, `metalness`, `roughness`, `opacity` or the `diffuse-map-tiling`:

```html live-example
<pc-app>
    <pc-asset src="https://developer.playcanvas.com/assets/dark-tiles.png" id="dark-tiles"></pc-asset>
    <pc-asset src="https://developer.playcanvas.com/assets/sepulchral-chapel-rotunda-4k.webp" id="skybox"></pc-asset>
    <pc-material id="crimson" diffuse="crimson"></pc-material>
    <pc-material id="gold" diffuse="#ffd700" metalness="1" roughness="0.3"></pc-material>
    <pc-material id="glass" blend-type="normal" opacity="0.4"></pc-material>
    <pc-material id="ground" diffuse-map="dark-tiles" diffuse-map-tiling="4 4"></pc-material>
    <pc-scene>
        <pc-sky asset="skybox" lighting></pc-sky>
        <pc-entity name="camera" position="0 1.5 5" rotation="-12 0 0">
            <pc-camera clear-color="#1d1f2b" tonemap="aces"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows normal-offset-bias="0.05" shadow-bias="0.2" intensity="1.5"></pc-light>
        </pc-entity>
        <pc-entity name="box" position="-2 0.5 0">
            <pc-render type="box" material="crimson"></pc-render>
        </pc-entity>
        <pc-entity name="sphere" position="0 0.5 0">
            <pc-render type="sphere" material="gold"></pc-render>
        </pc-entity>
        <pc-entity name="capsule" position="2 1 0">
            <pc-render type="capsule" material="glass"></pc-render>
        </pc-entity>
        <pc-entity name="ground" scale="10 1 10">
            <pc-render type="plane" material="ground"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

A `<pc-material>` inserted at runtime (after the application has started) creates its material on insertion, so materials can be added dynamically from JavaScript. Attribute changes made at runtime also take effect immediately — a burst of changes is coalesced into a single material update — and removing a `*-map` attribute clears that texture slot.

The `name` attribute is worth setting on any material you expect to identify later. It reaches the engine material, so it is the label that shows up wherever materials surface by name: profilers, GPU captures, and the assignments [`<pc-model>`'s `hierarchy()`](../pc-model#inspecting-the-hierarchy) reports — including on a material swapped in by [`<pc-node>`'s `material-overrides`](../pc-node#overriding-materials), which otherwise reads as `Untitled` there. It has no bearing on how the material is referenced, which is always by `id`.

## JavaScript Interface

You can programmatically create and manipulate `<pc-material>` elements using the [MaterialElement API](https://api.playcanvas.com/web-components/classes/MaterialElement.html).

The `material` property is the engine [StandardMaterial](https://api.playcanvas.com/engine/classes/StandardMaterial.html) the element builds, and `MaterialElement.get(id)` looks one up by `id`. The element is synchronous, so neither waits on readiness.
