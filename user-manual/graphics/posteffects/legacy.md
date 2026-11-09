# Legacy Post Effects

:::warning[Deprecated]

The legacy script-based post effects are deprecated, and will be removed in a future major version of the engine. They still work, but adding one to a camera logs a deprecation warning in the debug build of the engine. Use [CameraFrame](https://developer.playcanvas.com/user-manual/graphics/posteffects/cameraframe.md) instead, see [Migrating to CameraFrame](https://developer.playcanvas.com/user-manual/graphics/posteffects/legacy.md#migrating-to-cameraframe).

:::

PlayCanvas provides legacy script-based post effects. Each of them has a newer, more performant replacement in [CameraFrame](https://developer.playcanvas.com/user-manual/graphics/posteffects/cameraframe.md), or can be written as a custom CameraFrame effect.

## Setup

We have implemented post effects as scripts that you can add to an Entity that has a [Camera](https://developer.playcanvas.com/user-manual/editor/scenes/components/camera.md) component attached. To add post effects to a camera, do the following:

1. Choose one of the effects below and get the script from the GitHub link.

    - [Bloom](https://developer.playcanvas.com/user-manual/graphics/posteffects/legacy/bloom.md)
    - [Brightness-Contrast](https://developer.playcanvas.com/user-manual/graphics/posteffects/legacy/brightness_contrast.md)
    - [Hue-Saturation](https://developer.playcanvas.com/user-manual/graphics/posteffects/legacy/hue_saturation.md)
    - [FXAA](https://developer.playcanvas.com/user-manual/graphics/posteffects/legacy/fxaa.md)
    - [Sepia](https://developer.playcanvas.com/user-manual/graphics/posteffects/legacy/sepia.md)
    - [Vignette](https://developer.playcanvas.com/user-manual/graphics/posteffects/legacy/vignette.md)

2. Add a [Script](https://developer.playcanvas.com/user-manual/editor/scenes/components/script.md) component to the Entity representing your camera.
3. Assign the desired post effect scripts to the camera entity's Script component. Note that the order in which the post effect scripts are listed in the Script component determine the order in which they are applied.

You can also create your own post effects. You can find some additional ones on [GitHub](https://github.com/playcanvas/engine/tree/main/scripts/posteffects).

## Migrating to CameraFrame

Remove the legacy post effect scripts from the camera, and add `CameraFrame` to it instead: in the Editor attach the [CameraFrame script](https://developer.playcanvas.com/user-manual/graphics/linear-workflow/hdr-rendering.md#cameraframe-in-the-editor), and in code create a [`CameraFrame`](https://api.playcanvas.com/engine/classes/CameraFrame.html). Then enable the effects that replace the legacy ones:

| Legacy script | CameraFrame replacement |
| --- | --- |
| Bloom (`posteffect-bloom.js`) | Bloom (`bloom`) |
| Bokeh (`posteffect-bokeh.js`) | Depth of field (`dof`) |
| Brightness-Contrast (`posteffect-brightnesscontrast.js`) | Color grading `brightness` and `contrast` (`grading`) |
| Hue-Saturation (`posteffect-huesaturation.js`) | Color grading `saturation` (`grading`). For a hue shift, use a [color lookup table](https://developer.playcanvas.com/user-manual/graphics/linear-workflow/hdr-rendering.md#color-lut) (`colorLUT`) |
| Luminosity (`posteffect-luminosity.js`) | Color grading with `saturation` set to 0 (`grading`) |
| Sepia (`posteffect-sepia.js`) | A [color lookup table](https://developer.playcanvas.com/user-manual/graphics/linear-workflow/hdr-rendering.md#color-lut) (`colorLUT`) |
| Vignette (`posteffect-vignette.js`) | Vignette (`vignette`) |
| FXAA (`posteffect-fxaa.js`) | Multisampling (`rendering.samples`), temporal anti-aliasing (`taa`), or [`SmaaEffect`](https://api.playcanvas.com/engine/classes/SmaaEffect.html) |
| SSAO (`posteffect-ssao.js`) | Ambient occlusion (`ssao`) |
| Outline (`posteffect-outline.js`) | [`OutlineRenderer`](https://api.playcanvas.com/engine/classes/OutlineRenderer.html) |
| Edge Detect, Blend, Horizontal and Vertical Tilt Shift | No built-in replacement. Write a [custom effect](https://developer.playcanvas.com/user-manual/graphics/posteffects/cameraframe.md#custom-post-processing) |

The legacy effects are not applied to the UI layer and the layers after it, unless the camera's `disablePostEffectsLayer` is changed. `CameraFrame` applies its effects to the layers up to and including the Immediate layer, and renders the following layers, such as UI, after its effects.
