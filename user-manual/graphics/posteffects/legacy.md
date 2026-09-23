# Legacy Post Effects

PlayCanvas provides legacy script-based post effects that are still supported and functional. While many of these effects now have newer, more performant replacements in [CameraFrame](https://developer.playcanvas.com/user-manual/graphics/posteffects/cameraframe.md), they remain available for use.

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
