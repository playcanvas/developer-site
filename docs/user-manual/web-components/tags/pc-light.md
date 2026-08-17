---
title: <pc-light>
description: "Reference for the pc-light element: light types, color, intensity, shadows, and attributes for directional, spot, and omni lights."
---

The `<pc-light>` tag is used to define a light component.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `cast-shadows` | Boolean | `"false"` | Whether the light casts shadows |
| `color` | Color | `"1 1 1"` | Light color as space-separated RGB values, hex code, or [named color](https://github.com/playcanvas/web-components/blob/main/src/colors.ts) |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `inner-cone-angle` | Number | `"40"` | Inner cone angle in degrees (for spot lights) |
| `intensity` | Number | `"1"` | Light intensity multiplier |
| `normal-offset-bias` | Number | `"0.05"` | Normal offset bias for shadow rendering |
| `outer-cone-angle` | Number | `"45"` | Outer cone angle in degrees (for spot lights) |
| `penumbra-falloff` | Number | `"1"` | PCSS shadow penumbra falloff rate |
| `penumbra-size` | Number | `"1"` | PCSS shadow penumbra size |
| `range` | Number | `"10"` | Light range distance |
| `shadow-bias` | Number | `"0.2"` | Shadow depth bias |
| `shadow-blocker-samples` | Number | `"16"` | Number of PCSS shadow blocker samples |
| `shadow-distance` | Number | `"16"` | Maximum shadow rendering distance |
| `shadow-intensity` | Number | `"1"` | Shadow intensity multiplier |
| `shadow-resolution` | Number | `"1024"` | Shadow map resolution |
| `shadow-samples` | Number | `"16"` | Number of PCSS shadow samples |
| `shadow-type` | Enum | `"pcf3-32f"` | Shadow filtering: `"pcf1-16f"` \| `"pcf1-32f"` \| `"pcf3-16f"` \| `"pcf3-32f"` \| `"pcf5-16f"` \| `"pcf5-32f"` \| `"vsm-16f"` \| `"vsm-32f"` \| `"pcss-32f"` |
| `type` | Enum | `"directional"` | Light type: `"directional"` \| `"omni"` \| `"spot"` |
| `vsm-bias` | Number | `"0.01"` | Variance shadow map bias |
| `vsm-blur-size` | Number | `"11"` | Variance shadow map blur size (1-25) |

</div>

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
            <pc-light type="spot" color="#ffb47a" intensity="5" outer-cone-angle="35" cast-shadows></pc-light>
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
