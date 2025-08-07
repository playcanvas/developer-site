---
title: <pc-scene>
---

The `<pc-scene>` tag is used to define the scene.

:::note[Usage]

* It must be a direct child of [`<pc-app>`](../pc-app).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `fog` | Enum | - | Fog type: `"linear"` \| `"exp"` \| `"exp2"` |
| `fog-color` | Color | - | Fog color as CSS color string or hex code |
| `fog-density` | Number | - | Fog density for exponential fog types |
| `fog-end` | Number | - | End distance for linear fog |
| `fog-start` | Number | - | Start distance for linear fog |

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
