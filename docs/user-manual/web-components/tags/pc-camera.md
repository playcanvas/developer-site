---
title: <pc-camera>
description: "Reference for the pc-camera element: projection, field of view, clipping planes, clear options, and tone mapping mapped to the engine camera component."
---

The `<pc-camera>` tag is used to define a camera component.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity), a [`<pc-model>`](../pc-model) or a [`<pc-node>`](../pc-node).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `clear-color` | Color | `"0.75 0.75 0.75 1"` | Background color as space-separated RGBA values, hex code, or [named color](https://github.com/playcanvas/web-components/blob/main/src/colors.ts) |
| `clear-color-buffer` | Boolean | `"true"` | Controls whether the camera clears the color buffer |
| `clear-depth` | Number | `"1"` | The depth value the depth buffer is cleared to |
| `clear-depth-buffer` | Boolean | `"true"` | Controls whether the camera clears the depth buffer |
| `clear-stencil-buffer` | Boolean | `"true"` | Controls whether the camera clears the stencil buffer |
| `cull-faces` | Boolean | `"true"` | Controls whether the camera culls faces |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `far-clip` | Number | `"1000"` | The far clipping plane distance |
| `flip-faces` | Boolean | `"false"` | Controls whether the camera flips faces |
| `fov` | Number | `"45"` | Field of view in degrees |
| `frustum-culling` | Boolean | `"true"` | Controls whether the camera uses frustum culling |
| `gamma` | Enum | `"srgb"` | Color space: `"linear"` \| `"srgb"` |
| `horizontal-fov` | Boolean | `"false"` | Whether to use horizontal field of view instead of vertical |
| `near-clip` | Number | `"0.1"` | The near clipping plane distance |
| `ortho-height` | Number | `"10"` | Height of the orthographic projection. Only used when `projection` is `"orthographic"` |
| `priority` | Number | `"0"` | Rendering priority of the camera |
| `projection` | Enum | `"perspective"` | Projection of the camera: `"perspective"` \| `"orthographic"`. Use `ortho-height` to size an orthographic projection |
| `rect` | Vector4 | `"0 0 1 1"` | Viewport rectangle as "X Y Width Height" values |
| `scissor-rect` | Vector4 | `"0 0 1 1"` | Scissor rectangle as "X Y Width Height" values |
| `tonemap` | Enum | `"none"` | Tone mapping: `"none"` \| `"aces"` \| `"aces2"` \| `"filmic"` \| `"hejl"` \| `"linear"` \| `"neutral"` |

</div>

## Example

A row of boxes receding into the distance. Try a different `fov`, or switch to `projection="orthographic"` (sized by `ortho-height`) and watch the perspective disappear:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 1.5 4" rotation="-15 0 0">
            <pc-camera clear-color="#4a5568" fov="60"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light></pc-light>
        </pc-entity>
        <pc-entity name="box-near" position="-1.5 0.5 0">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="box-mid" position="0 0.5 -2">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="box-far" position="1.5 0.5 -4">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="ground" position="0 -0.5 -2" scale="12 1 16">
            <pc-render type="box"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-camera>` elements using the [CameraComponentElement API](https://api.playcanvas.com/web-components/classes/CameraComponentElement.html).

The `component` property is the engine [CameraComponent](https://api.playcanvas.com/engine/classes/CameraComponent.html) the element adds — `null` until the element is ready — and everything the attributes do not expose is available on it.

## See Also

* [`<pc-scene>`](../pc-scene) — exposure and fog, which the camera's tone mapping works with
* [`<pc-sky>`](../pc-sky) — a skybox in place of the clear color
* [`<pc-script>`](../pc-script) — camera controls are engine scripts attached beside the camera
* [XR Support](../xr.md) — entering VR and AR from the camera element

Examples: [Basic Shapes](https://playcanvas.github.io/web-components/examples/basic-shapes.html) and [First Person Controller](https://playcanvas.github.io/web-components/examples/first-person-controller.html).
