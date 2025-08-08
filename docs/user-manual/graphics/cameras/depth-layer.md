---
title: Depth Layer
---

Some rendering techniques require access to the depth or the color buffer of the scene for a specific camera. The Depth Layer is a special layer, which can be added to the `layers` property of a camera. The [`order`][4] of the layers defines at which point during the rendering, the depth or the color buffer is captured. The captured buffers can then be used in the following layers of the camera.

Typically, those buffers are captured after all opaque layers are rendered and can be used in following transparent layers or post-processing.

Additionally, to capture these buffers, the capture needs to be enabled on a CameraComponent from a script:

- [```requestSceneColorMap```][0] to request a color map
- [```requestSceneDepthMap```][1] to request a depth map

## Buffer access

To access one of these buffers in the shader as a texture, these are the uniform names to be used:

- for the color map: `uSceneColorMap`
- for the depth map: `uSceneDepthMap`

## Examples

These engine examples demonstrate the rendering of both the depth and the color map, and also custom shaders allowing their use:

- GrabPass demonstrates the use of the color buffer: [`GrabPass`][2]
- GroundFog demonstrates the use of the depth buffer: [`GroundFog`][3]

[0]: https://api.playcanvas.com/engine/classes/CameraComponent.html#requestscenecolormap
[1]: https://api.playcanvas.com/engine/classes/CameraComponent.html#requestscenedepthmap
[2]: https://playcanvas.github.io/#/shaders/grab-pass
[3]: https://playcanvas.github.io/#/shaders/ground-fog
[4]: /user-manual/graphics/layers/#choosing-the-layer-order
