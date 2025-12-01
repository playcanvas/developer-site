---
title: <pc-camera>
---

The `<pc-camera>` tag is used to define a camera component.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `clear-color` | Color | `"0.75 0.75 0.75 1"` | Background color as space-separated RGBA values, hex code, or [named color](https://github.com/playcanvas/web-components/blob/main/src/colors.ts) |
| `clear-color-buffer` | Boolean | `"true"` | Controls whether the camera clears the color buffer |
| `clear-depth-buffer` | Boolean | `"true"` | Controls whether the camera clears the depth buffer |
| `clear-stencil-buffer` | Boolean | `"true"` | Controls whether the camera clears the stencil buffer |
| `cull-faces` | Boolean | `"true"` | Controls whether the camera culls faces |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `far-clip` | Number | `"1000"` | The far clipping plane distance |
| `flip-faces` | Boolean | `"false"` | Controls whether the camera flips faces |
| `fov` | Number | `"45"` | Field of view in degrees |
| `frustum-culling` | Boolean | `"true"` | Controls whether the camera uses frustum culling |
| `gamma` | Enum | `"srgb"` | Color space: `"linear"` \| `"srgb"` |
| `horizontal-fov` | Flag | - | Whether to use horizontal field of view instead of vertical |
| `near-clip` | Number | `"0.1"` | The near clipping plane distance |
| `orthographic` | Flag | - | Whether to use orthographic projection instead of perspective |
| `ortho-height` | Number | `"10"` | Height of the orthographic projection |
| `priority` | Number | `"0"` | Rendering priority of the camera |
| `rect` | Vector4 | `"0 0 1 1"` | Viewport rectangle as "X Y Width Height" values |
| `scissor-rect` | Vector4 | `"0 0 1 1"` | Scissor rectangle as "X Y Width Height" values |
| `tonemap` | Enum | `"none"` | Tone mapping: `"none"` \| `"aces"` \| `"aces2"` \| `"filmic"` \| `"hejl"` \| `"linear"` \| `"neutral"` |

</div>

## Example

```html
<pc-entity>
    <pc-camera clear-color="yellow"></pc-camera>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-camera>` elements using the [CameraComponentElement API](https://api.playcanvas.com/web-components/classes/CameraComponentElement.html).
