# <pc-scene>

The `<pc-scene>` tag defines the scene an application renders: the root of its entity hierarchy, and the fog, exposure, Gaussian splat, lighting and gravity settings that apply to everything in it.

:::note[Usage]

* It must be a direct child of [`<pc-app>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-app.md).

:::

## Attributes

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `exposure` | Number | `"1"` | Overall brightness multiplier applied to the rendered image. Ignored while the scene uses physical light units, which are switched on from JavaScript with the engine scene's `physicalUnits` |
| `fog` | Enum | `"none"` | Fog type: `"none"` \| `"linear"` \| `"exp"` \| `"exp2"` |
| `fog-color` | Color | `"0 0 0"` | Fog color as space-separated RGB values, hex code, or [named color](https://github.com/playcanvas/web-components/blob/main/src/colors.ts) |
| `fog-density` | Number | `"0"` | Fog density for exponential fog types |
| `fog-end` | Number | `"1000"` | End distance for linear fog |
| `fog-start` | Number | `"1"` | Start distance for linear fog |
| `gsplat-lod-mode` | Enum | `"distance"` | How LOD levels are chosen for streamed Gaussian splats, within the splat budget: `"error"` \| `"distance"`. See [Level of Detail](https://developer.playcanvas.com/user-manual/web-components/tags/pc-gsplat.md#level-of-detail) |
| `gsplat-splat-budget` | Number | `"1000000"` | Target number of splats rendered across every Gaussian splat in the scene. Distributed between streamed splat assets; a value of 0 or less is treated as the default |
| `gsplat-use-fog` | Boolean | `"true"` | Whether the scene's fog applies to Gaussian splats |
| `gsplat-use-tonemap` | Boolean | `"true"` | Whether the camera's tone mapping and the scene's `exposure` apply to Gaussian splats. Set `"false"` to render splats with their stored colors, which suits captures that are already display-ready. Fog still applies |
| `gravity` | Vector3 | `"0 -9.81 0"` | Gravity applied to rigid bodies as "X Y Z" values |
| `lighting-max-lights` | Number | `"255"` | Maximum number of lights clustered lighting uses in a frame. The engine clamps the value to between 1 and the most the device supports (up to 65535), and lights over the limit are left out of the frame. Values above 255 double the memory of the light grid |

The scene applies these settings before any script's `initialize()` runs, both when the application boots and when a `<pc-scene>` is inserted into a running one, so scripts see the element's values from the start. The time scales that slow down or pause the application and its physics are attributes of [`<pc-app>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-app.md).

## Events

`<pc-scene>` is the ancestor of every entity element, so the [pointer events](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md#events) dispatched on entities bubble through it, and a listener here is a delegated listener for the whole scene. Read `event.target` to find the entity that was hit:

```javascript
document.querySelector('pc-scene').addEventListener('click', (event) => {
    console.log(`Clicked ${event.target.getAttribute('name')}`);
});
```

A listener here counts towards [when events are dispatched](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md#when-events-are-dispatched), so none is needed on the entities themselves. A click whose press and release landed on two different top-level entities targets `<pc-scene>` itself, their nearest common ancestor. The scene also receives its own `pointerenter` and `pointerleave` as the pointer moves onto and off its entities as a whole, so one pair of listeners can, for example, change the cursor whenever anything in the scene is under the pointer.

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

The `scene` property is the engine [Scene](https://api.playcanvas.com/engine/classes/Scene.html), where fog, exposure and the sky are configured. It is `null` until the containing application has been created, so await the element's readiness before reading it from page code.

## See Also

* [`<pc-app>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-app.md) — the application that holds the scene, and its time scales
* [`<pc-sky>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sky.md) — the scene's skybox and image-based lighting
* [`<pc-camera>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-camera.md) — tone mapping, applied after the scene's exposure
* [`<pc-rigid-body>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-rigid-body.md) — the bodies gravity acts on

Examples: [Basic Shapes](https://playcanvas.github.io/web-components/examples/#basic-shapes.html) and [Spinning Cube](https://playcanvas.github.io/web-components/examples/#spinning-cube.html).
