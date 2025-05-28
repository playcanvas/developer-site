---
title: <pc-light>
---

The `<pc-light>` tag is used to define a light component.

:::note

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

<div className="nowrap-first-col">

| Attribute | Description |
| --- | --- |
| `color` | The color of the light. Can be a space-separated list of R, G, B values, a hex color code, or a [named color](https://github.com/playcanvas/web-components/blob/main/src/colors.ts). If not specified, `1 1 1` is used. |
| `cast-shadows` | Valueless attribute. If present, the light casts shadows. |
| `inner-cone-angle` | The angle of the light's inner cone. If not specified, `40` is used. |
| `intensity` | The intensity of the light. If not specified, `1` is used. |
| `normal-offset-bias` | The bias of the light's normal offset. If not specified, `0.05` is used. |
| `outer-cone-angle` | The angle of the light's outer cone. If not specified, `45` is used. |
| `range` | The range of the light. If not specified, `10` is used. |
| `shadow-bias` | The bias of the light's shadows. If not specified, `0.2` is used. |
| `shadow-distance` | The distance at which the light's shadows are no longer rendered. If not specified, `16` is used. |
| `shadow-resolution` | The resolution of the light's shadow map. If not specified, `1024` is used. |
| `shadow-type` | The type of shadow map. Can be `pcf1-16f`, `pcf1-32f`, `pcf3-16f`, `pcf3-32f`, `pcf5-16f`, `pcf5-32f`, `vsm-16f`, `vsm-32f` or `pcss-32f`. If not specified, `pcf3-32f` is used. |
| `type` | The type of light. Can be `directional`, `point` or `omni`. If not specified, `directional` is used. |
| `vsm-bias` | The bias used for VSM shadows. If not specified, `0.01` is used. |

</div>

## Example

```html
<pc-entity>
    <pc-light type="directional" intensity="10" color="red" cast-shadows></pc-light>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-light>` elements using the [LightComponentElement API](https://api.playcanvas.com/classes/EngineWebComponents.LightComponentElement.html).
