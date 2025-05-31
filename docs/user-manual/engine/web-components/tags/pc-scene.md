---
title: <pc-scene>
---

The `<pc-scene>` tag is used to define the scene.

:::note

* It must be a direct child of [`<pc-app>`](../pc-app).

:::

## Attributes

| Attribute | Description |
| --- | --- |
| `fog` | The type of fog to use. Can be `linear`, `exp`, or `exp2`. |
| `fog-color` | The color of the fog. Can be a CSS color string or a hex color code. |
| `fog-start` | The start distance of the fog. |
| `fog-end` | The end distance of the fog. |
| `fog-density` | The density of the fog. |

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
