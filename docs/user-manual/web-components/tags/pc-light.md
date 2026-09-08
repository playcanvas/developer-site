---
title: <pc-light>
description: "Reference for the pc-light element: light types, color, intensity, shadows, and attributes for directional, spot, and omni lights."
---

The `<pc-light>` tag is used to define a light component.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity), a [`<pc-model>`](../pc-model) or a [`<pc-node>`](../pc-node).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `cascade-blend` | Number | `"0"` | Fraction of each shadow cascade blended into the next, from 0 (no blending) to 1. Used by `directional` lights with `num-cascades` above 1 |
| `cascade-distribution` | Number | `"0.5"` | How the camera frustum is split between cascades, from 0 (linear) to 1 (logarithmic, concentrating resolution near the camera). Used by `directional` lights with `num-cascades` above 1 |
| `cast-shadows` | Boolean | `"false"` | Whether the light casts shadows |
| `color` | Color | `"1 1 1"` | Light color as space-separated RGB values, hex code, or [named color](https://github.com/playcanvas/web-components/blob/main/src/colors.ts) |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `inner-cone-angle` | Number | `"40"` | Inner cone angle in degrees (for spot lights) |
| `intensity` | Number | `"1"` | Light intensity multiplier |
| `normal-offset-bias` | Number | `"0"` | Normal offset bias for shadow rendering |
| `num-cascades` | Number | `"1"` | Number of shadow cascades, an integer from 1 (no cascades) to 4. Used by `directional` lights |
| `outer-cone-angle` | Number | `"45"` | Outer cone angle in degrees (for spot lights) |
| `penumbra-falloff` | Number | `"1"` | PCSS shadow penumbra falloff rate |
| `penumbra-size` | Number | `"1"` | PCSS shadow penumbra size |
| `range` | Number | `"10"` | Light range distance |
| `shadow-bias` | Number | `"0.05"` | Shadow depth bias |
| `shadow-blocker-samples` | Number | `"16"` | Number of PCSS shadow blocker samples |
| `shadow-distance` | Number | `"40"` | Maximum shadow rendering distance |
| `shadow-intensity` | Number | `"1"` | Shadow intensity multiplier |
| `shadow-resolution` | Number | `"1024"` | Shadow map resolution |
| `shadow-samples` | Number | `"16"` | Number of PCSS shadow samples |
| `shadow-type` | Enum | `"pcf3-32f"` | Shadow filtering: `"pcf1-16f"` \| `"pcf1-32f"` \| `"pcf3-16f"` \| `"pcf3-32f"` \| `"pcf5-16f"` \| `"pcf5-32f"` \| `"vsm-16f"` \| `"vsm-32f"` \| `"pcss-32f"` |
| `shape` | Enum | `"punctual"` | Light source shape: `"punctual"` \| `"rect"` \| `"disk"` \| `"sphere"`. The area shapes apply to `omni` and `spot` lights, take their size from the entity's scale, and need the lookup tables loaded by `area-light-luts` on [`<pc-app>`](../pc-app) — see [Area Lights](#area-lights) |
| `type` | Enum | `"directional"` | Light type: `"directional"` \| `"omni"` \| `"spot"` |
| `vsm-bias` | Number | `"0.0025"` | Variance shadow map bias |
| `vsm-blur-size` | Number | `"11"` | Variance shadow map blur size (1-25) |

</div>

Every default here is the engine's own, so a `<pc-light>` with an attribute absent renders exactly as a light the engine built for itself. That matters most for the shadow-tuning attributes: they are deliberately left untuned rather than pre-set to values that flatter a small scene, so expect to reach for `shadow-bias` and `normal-offset-bias` yourself once shadows are on and something looks wrong.

## Shadow Cascades

A single shadow map stretched over a long view runs out of resolution — shadows near the camera go blocky while distant ones stay coarse. Cascades split the camera frustum into slices and give each its own shadow map, so detail follows the camera. They apply to `directional` lights only, and they are off until you ask for them:

```html
<pc-entity name="sun" rotation="45 30 0">
    <pc-light cast-shadows
              num-cascades="4"
              cascade-distribution="0.7"
              cascade-blend="0.1"
              shadow-distance="200"
              shadow-resolution="2048"></pc-light>
</pc-entity>
```

The three attributes do distinct jobs, and only `num-cascades` above 1 brings the other two into play:

| Attribute | What it controls |
| --- | --- |
| `num-cascades` | How many slices, 1 to 4. More slices means more detail per slice, at the cost of a shadow render pass each |
| `cascade-distribution` | Where the splits fall between 0 (evenly spaced) and 1 (packed towards the camera). Raise it when near shadows need the detail; lower it when the far slice looks starved |
| `cascade-blend` | How much of each slice cross-fades into the next, 0 to 1. A small value hides the seams where slices meet; too much wastes resolution on the overlap |

`shadow-distance` still bounds the whole thing — it is the range the cascades divide up, so raising the cascade count without raising the distance just subdivides the same near-field. `shadow-resolution` is per cascade, not a shared budget.

The [Shadow Cascades example](https://playcanvas.github.io/web-components/examples/shadow-cascades.html) drives all three over a desert causeway long enough to need them, and plots the split distances the renderer derives — worth a look, because the engine has no cascade debug view and the distribution slider otherwise appears to do nothing.

## Area Lights

A punctual light is an infinitesimal point. Real fixtures have size, and that size is what softens their highlights and shadows. `shape` gives an `omni` or `spot` light one of three areas — `rect`, `disk` or `sphere` — sized by the entity's scale: at unit scale a `rect` is a 1 by 1 rectangle in the entity's local XZ plane, a `disk` is 1 across in the same plane, and a `sphere` is 1 across. Area shapes fall off with their own size and distance, so for them `range` is only a cutoff, not the falloff itself.

Area lights need lookup tables the engine does not ship — the linearly transformed cosine tables from Heitz, Dupuy, Hill and Neubelt (SIGGRAPH 2016). `area-light-luts` on [`<pc-app>`](../pc-app) names a [`<pc-asset>`](../pc-asset) holding them as JSON (`LTC_MAT_1` and `LTC_MAT_2`, 16,384 numbers each — the format of the engine examples' `area-light-luts.json`), and loading that asset is what switches area lights on for the whole application:

```html
<pc-app area-light-luts="luts">
    <pc-asset id="luts" src="https://playcanvas.github.io/web-components/examples/assets/json/area-light-luts.json"></pc-asset>
    <pc-scene>
        <!-- A 2 by 1 ceiling panel; rect and disk shapes emit from the entity's XZ plane, so this one shines down -->
        <pc-entity name="panel" position="0 3 0" scale="2 1 1">
            <pc-light type="spot" shape="rect" intensity="8" range="12" outer-cone-angle="88"></pc-light>
        </pc-entity>
    </pc-scene>
</pc-app>
```

One attribute drives both halves of the feature. Loading a valid table applies it and enables area lights; clearing the attribute switches them off again (tables already handed to the engine stay in place). An id that resolves to no asset switches them off with a warning, and a file that is not a lookup table is refused with a warning — because without real tables the engine's placeholder makes `disk` lights emit nothing and strips specular from every shape. Unlike the other [`<pc-app>`](../pc-app) attributes this one applies immediately, and set before boot it loads along with the other assets. A device that cannot render area lights ignores the switch, and its `omni` and `spot` area lights stay punctual.

The tables come from the engine repository's `examples/assets/json/area-light-luts.json` (MIT licensed). The Web Components example gallery serves a copy at the URL above — about 300 KB, fine for trying things out, but host your own for production.

The [Area Lights example](https://playcanvas.github.io/web-components/examples/area-lights.html) builds ceiling panels from `rect` spots and lantern bulbs from `sphere` omnis, which is the quickest way to see how `intensity` and `range` interact with a shape's size.

## Example

Try editing the light `color`, `intensity` or `type` values and watch the scene update:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 2.5 5" rotation="-15 0 0">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <!-- A warm spot light shining down (spot lights point down the negative Y axis) -->
        <pc-entity name="spot-light" position="-2 4 0">
            <pc-light type="spot" color="#ffb47a" intensity="5" outer-cone-angle="35" cast-shadows normal-offset-bias="0.05" shadow-bias="0.2"></pc-light>
        </pc-entity>
        <!-- A cool omni light between the shapes -->
        <pc-entity name="omni-light" position="2 2 1">
            <pc-light type="omni" color="#7ab8ff" intensity="2.5" range="10"></pc-light>
        </pc-entity>
        <!-- Shapes to light -->
        <pc-entity name="ground" position="0 -0.5 0" scale="10 1 10">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="sphere" position="-2 0.5 0">
            <pc-render type="sphere"></pc-render>
        </pc-entity>
        <pc-entity name="box" position="2 0.5 0" rotation="0 30 0">
            <pc-render type="box"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-light>` elements using the [LightComponentElement API](https://api.playcanvas.com/web-components/classes/LightComponentElement.html).

The `component` property is the engine [LightComponent](https://api.playcanvas.com/engine/classes/LightComponent.html) the element adds — `null` until the element is ready — and everything the attributes do not expose is available on it.

## See Also

* [`<pc-scene>`](../pc-scene) — exposure, which scales every light's contribution
* [`<pc-sky>`](../pc-sky) — image-based lighting to fill in what direct lights miss
* [`<pc-render>`](../pc-render) — `cast-shadows` and `receive-shadows` on what the light hits

Examples: [Basic Shapes](https://playcanvas.github.io/web-components/examples/basic-shapes.html), [Shadow Cascades](https://playcanvas.github.io/web-components/examples/shadow-cascades.html) and [Area Lights](https://playcanvas.github.io/web-components/examples/area-lights.html).
