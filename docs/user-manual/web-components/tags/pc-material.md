---
title: <pc-material>
description: "Reference for the pc-material element: define a standard material with a diffuse color and texture maps that render components can reference by id."
---

The `<pc-material>` tag is used to define a material that can be applied to [`<pc-render>`](../pc-render) components via their `material` attribute.

:::note[Usage]

* It must be a direct child of [`<pc-app>`](../pc-app).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `diffuse` | Color | `"1 1 1"` | Diffuse color of the material |
| `diffuse-map` | String | - | `id` of a texture [`<pc-asset>`](../pc-asset) used as the diffuse map |
| `id` | String | - | Unique identifier used by other tags to reference this material |
| `metalness-map` | String | - | `id` of a texture [`<pc-asset>`](../pc-asset) used as the metalness map |
| `normal-map` | String | - | `id` of a texture [`<pc-asset>`](../pc-asset) used as the normal map |
| `roughness-map` | String | - | `id` of a texture [`<pc-asset>`](../pc-asset) used as the roughness map |

</div>

## Example

```html
<pc-app>
    <pc-asset src="assets/textures/dark-tiles.png" id="dark-tiles"></pc-asset>
    <pc-material id="crimson" diffuse="crimson"></pc-material>
    <pc-material id="ground" diffuse-map="dark-tiles"></pc-material>
    <pc-scene>
        <pc-entity name="box">
            <pc-render type="box" material="crimson"></pc-render>
        </pc-entity>
        <pc-entity name="ground" scale="10 1 10">
            <pc-render type="plane" material="ground"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

A `<pc-material>` inserted at runtime (after the application has started) creates its material on insertion, so materials can be added dynamically from JavaScript.

## JavaScript Interface

You can programmatically create and manipulate `<pc-material>` elements using the [MaterialElement API](https://api.playcanvas.com/web-components/classes/MaterialElement.html).
