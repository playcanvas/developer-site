---
title: <pc-scene>
description: "Reference for the pc-scene element: the scene container inside pc-app, with fog, exposure and gravity settings for the entities it holds."
---

The `<pc-scene>` tag is used to define the scene.

:::note[Usage]

* It must be a direct child of [`<pc-app>`](../pc-app).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `exposure` | Number | `"1"` | Overall brightness multiplier applied to the rendered image. Ignored while the scene uses physical light units |
| `fog` | Enum | `"none"` | Fog type: `"none"` \| `"linear"` \| `"exp"` \| `"exp2"` |
| `fog-color` | Color | `"1 1 1"` | Fog color as space-separated RGB values, hex code, or [named color](https://github.com/playcanvas/web-components/blob/main/src/colors.ts) |
| `fog-density` | Number | `"0"` | Fog density for exponential fog types |
| `fog-end` | Number | `"1000"` | End distance for linear fog |
| `fog-start` | Number | `"0"` | Start distance for linear fog |
| `gravity` | Vector3 | `"0 -9.81 0"` | Gravity applied to rigid bodies as "X Y Z" values |

</div>

## Example

Boxes fading into linear fog. Try a different `fog-color` (match the camera's `clear-color` for the classic depth-haze look), or switch `fog` to `"exp"` with a `fog-density` of `0.15`:

```html live-example
<pc-app>
    <pc-scene fog="linear" fog-color="#4a5568" fog-start="2" fog-end="10">
        <pc-entity name="camera" position="0 1.5 4" rotation="-10 0 0">
            <pc-camera clear-color="#4a5568"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light></pc-light>
        </pc-entity>
        <pc-entity name="box-1" position="-1 0.5 0">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="box-2" position="0 0.5 -3">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="box-3" position="1 0.5 -6">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="box-4" position="2 0.5 -9">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="ground" position="0 -0.5 -4" scale="10 1 20">
            <pc-render type="box"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-scene>` elements using the [SceneElement API](https://api.playcanvas.com/web-components/classes/SceneElement.html).

The `scene` property is the engine [Scene](https://api.playcanvas.com/engine/classes/Scene.html) — `null` until the element is ready — where fog, exposure and the sky are configured.
