# <pc-camera>

The `<pc-camera>` tag is used to define a camera component.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md), a [`<pc-model>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-model.md) or a [`<pc-node>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-node.md).

:::

## Attributes

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
| `projection-offset` | Vector2 | `"0 0"` | Shifts the projection window off the view direction, like a shift lens, as "X Y" values in half-frustum units: `"0 1"` moves it up by half the frustum height. Keeping the camera level and shifting the window frames a tall subject with its verticals parallel. Applies to both projections and is ignored in XR |
| `rect` | Vector4 | `"0 0 1 1"` | Viewport rectangle as "X Y Width Height" values |
| `scissor-rect` | Vector4 | `"0 0 1 1"` | Scissor rectangle as "X Y Width Height" values |
| `tonemap` | Enum | `"linear"` | Tone mapping: `"none"` \| `"aces"` \| `"aces2"` \| `"filmic"` \| `"hejl"` \| `"linear"` \| `"neutral"` |

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

* [`<pc-scene>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scene.md) — exposure and fog, which the camera's tone mapping works with
* [`<pc-sky>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sky.md) — a skybox in place of the clear color
* [`<pc-script>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-script.md) — camera controls are engine scripts attached beside the camera
* [XR Support](https://developer.playcanvas.com/user-manual/web-components/xr.md) — entering VR and AR from the camera element

Examples: [Basic Shapes](https://playcanvas.github.io/web-components/examples/basic-shapes.html) and [First Person Controller](https://playcanvas.github.io/web-components/examples/first-person-controller.html).
