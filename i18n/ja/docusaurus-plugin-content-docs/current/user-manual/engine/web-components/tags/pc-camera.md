---
title: <pc-camera>
---

The `<pc-camera>` tag is used to define a camera component.

:::note

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

<div className="nowrap-first-col">

| Attribute | Description |
| --- | --- |
| `clear-color` | The background color of the camera. Can be a space-separated list of R, G, B, and A values, a hex color code, or a [named color](https://github.com/playcanvas/web-components/blob/main/src/colors.ts). If unspecified, `0.75 0.75 0.75 1` is used. |
| `clear-color-buffer` | Boolean attribute. Controls whether the camera clears the color buffer. If unspecified, the color buffer is cleared. |
| `clear-depth-buffer` | Boolean attribute. Controls whether the camera clears the depth buffer. If unspecified, the depth buffer is cleared. |
| `clear-stencil-buffer` | Boolean attribute. Controls whether the camera clears the stencil buffer. If unspecified, the stencil buffer is cleared. |
| `cull-faces` | Boolean attribute. Controls whether the camera culls faces. If unspecified, faces are culled. |
| `far-clip` | The far clipping plane of the camera. If unspecified, `1000` is used. |
| `flip-faces` | Boolean attribute. Controls whether the camera flips faces. If unspecified, faces are not flipped. |
| `fov` | The field of view of the camera. If unspecified, `45` is used. |
| `frustum-culling` | Boolean attribute. Controls whether the camera uses frustum culling. If unspecified, frustum culling is used. |
| `gamma` | The gamma of the camera. Can be `linear` or `srgb`. If unspecified, `srgb` is used. |
| `horizontal-fov` | Valueless attribute. If present, the camera uses a horizontal field of view. If unspecified, the camera uses a vertical field of view. |
| `near-clip` | The near clipping plane of the camera. If unspecified, `0.1` is used. |
| `orthographic` | Valueless attribute. If present, the camera uses an orthographic projection. If unspecified, the camera uses a perspective projection. |
| `ortho-height` | The height of the orthographic projection. If unspecified, `10` is used. |
| `priority` | The priority of the camera. If unspecified, `0` is used. |
| `rect` | The viewport rectangle of the camera. Specified as a space-separated list of X, Y, Width, and Height values. If unspecified, `0 0 1 1` is used. |
| `scissor-rect` | The scissor rectangle of the camera. Specified as a space-separated list of X, Y, Width, and Height values. If not specified, `0 0 1 1` is used. |
| `tonemap` | The tonemap of the camera. Can be `none`, `aces`, `aces2`, `filmic`, `hejl`, `linear`, or `neutral`. If unspecified, `none` is used. |

</div>

## Example

```html
<pc-entity>
    <pc-camera clear-color="yellow"></pc-camera>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-camera>` elements using the [CameraComponentElement API](https://api.playcanvas.com/classes/EngineWebComponents.CameraComponentElement.html).
