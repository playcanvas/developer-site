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
| `gsplat-lod-mode` | Enum | `"error"` | How LOD levels are chosen for streamed Gaussian splats, within the splat budget: `"error"` \| `"distance"`. See [Level of Detail](../pc-gsplat#level-of-detail) |
| `gsplat-splat-budget` | Number | `"1000000"` | Target number of splats rendered across every Gaussian splat in the scene. Distributed between streamed splat assets; a value of 0 or less warns and keeps the default |
| `gsplat-use-fog` | Boolean | `"true"` | Whether the scene's fog applies to Gaussian splats |
| `gsplat-use-tonemap` | Boolean | `"true"` | Whether the camera's tone mapping and the scene's `exposure` apply to Gaussian splats. Set `"false"` to render splats with their stored colors, which suits captures that are already display-ready. Fog still applies |
| `gravity` | Vector3 | `"0 -9.81 0"` | Gravity applied to rigid bodies as "X Y Z" values |
| `lighting-max-lights` | Number | `"255"` | Maximum number of lights clustered lighting uses in a frame, from 1 to 65535. Lights over the limit are ignored with a warning, and values above 255 double the memory of the light grid |
| `physics-time-scale` | Number | `"1"` | Scale on the time the physics simulation advances by each frame: below 1 is slow motion, above 1 speeds it up, and `"0"` pauses physics while the rest of the application keeps running. Applied on top of the application's own time scale |

</div>

## Events

`<pc-scene>` is the ancestor of every entity element, so the [pointer events](../pc-entity#events) dispatched on entities bubble through it, and a listener here is a delegated listener for the whole scene. Read `event.target` to find the entity that was hit:

```javascript
document.querySelector('pc-scene').addEventListener('click', (event) => {
    console.log(`Clicked ${event.target.getAttribute('name')}`);
});
```

A listener here counts towards [when events are dispatched](../pc-entity#when-events-are-dispatched), so none is needed on the entities themselves. A click whose press and release landed on two different top-level entities targets `<pc-scene>` itself, their nearest common ancestor. The scene also receives its own `pointerenter` and `pointerleave` as the pointer moves onto and off its entities as a whole, so one pair of listeners can, for example, change the cursor whenever anything in the scene is under the pointer.

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

## See Also

* [`<pc-app>`](../pc-app) — the application that holds the scene
* [`<pc-sky>`](../pc-sky) — the scene's skybox and image-based lighting
* [`<pc-camera>`](../pc-camera) — tone mapping, applied after the scene's exposure
* [`<pc-rigid-body>`](../pc-rigid-body) — the bodies gravity acts on

Examples: [Basic Shapes](https://playcanvas.github.io/web-components/examples/basic-shapes.html) and [Spinning Cube](https://playcanvas.github.io/web-components/examples/spinning-cube.html).
