---
title: <pc-scene>
description: "Reference for the pc-scene element: scene container inside pc-app, ambient settings, and where entities are mounted for rendering."
---

The `<pc-scene>` tag is used to define the scene.

:::note[Usage]

* It must be a direct child of [`<pc-app>`](../pc-app).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `fog` | Enum | `"none"` | Fog type: `"none"` \| `"linear"` \| `"exp"` \| `"exp2"` |
| `fog-color` | Color | `"1 1 1"` | Fog color as space-separated RGB values, hex code, or [named color](https://github.com/playcanvas/web-components/blob/main/src/colors.ts) |
| `fog-density` | Number | `"0"` | Fog density for exponential fog types |
| `fog-end` | Number | `"1000"` | End distance for linear fog |
| `fog-start` | Number | `"0"` | Start distance for linear fog |
| `gravity` | Vector3 | `"0 -9.81 0"` | Gravity applied to rigid bodies as "X Y Z" values |

</div>

## Example

```html
<pc-app>
    <pc-scene>
        <!-- define pc-entity tags here -->
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-scene>` elements using the [SceneElement API](https://api.playcanvas.com/web-components/classes/SceneElement.html).
