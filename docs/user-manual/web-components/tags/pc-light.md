---
title: <pc-light>
---

The `<pc-light>` tag is used to define a light component.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `cast-shadows` | Flag | - | Whether the light casts shadows |
| `color` | Color | `"1 1 1"` | Light color as space-separated RGB values, hex code, or [named color](https://github.com/playcanvas/web-components/blob/main/src/colors.ts) |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `inner-cone-angle` | Number | `"40"` | Inner cone angle in degrees (for spot lights) |
| `intensity` | Number | `"1"` | Light intensity multiplier |
| `normal-offset-bias` | Number | `"0.05"` | Normal offset bias for shadow rendering |
| `outer-cone-angle` | Number | `"45"` | Outer cone angle in degrees (for spot lights) |
| `range` | Number | `"10"` | Light range distance |
| `shadow-bias` | Number | `"0.2"` | Shadow depth bias |
| `shadow-distance` | Number | `"16"` | Maximum shadow rendering distance |
| `shadow-resolution` | Number | `"1024"` | Shadow map resolution |
| `shadow-type` | Enum | `"pcf3-32f"` | Shadow filtering: `"pcf1-16f"` \| `"pcf1-32f"` \| `"pcf3-16f"` \| `"pcf3-32f"` \| `"pcf5-16f"` \| `"pcf5-32f"` \| `"vsm-16f"` \| `"vsm-32f"` \| `"pcss-32f"` |
| `type` | Enum | `"directional"` | Light type: `"directional"` \| `"omni"` \| `"spot"` |
| `vsm-bias` | Number | `"0.01"` | Variance shadow map bias |

</div>

## Example

```html
<pc-entity>
    <pc-light type="directional" intensity="10" color="red" cast-shadows></pc-light>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-light>` elements using the [LightComponentElement API](https://api.playcanvas.com/web-components/classes/LightComponentElement.html).
