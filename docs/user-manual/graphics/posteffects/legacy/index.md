---
title: Legacy Post Effects
---

PlayCanvas provides legacy script-based post effects that are still supported and functional. While many of these effects now have newer, more performant replacements in [CameraFrame](/user-manual/graphics/posteffects/cameraframe), they remain available for use.

## Setup

We have implemented post effects as scripts that you can add to an Entity that has a [Camera](/user-manual/editor/scenes/components/camera) component attached. To add post effects to a camera, do the following:

1. Choose one of the effects below and get the script from the GitHub link.

    - [Bloom](/user-manual/graphics/posteffects/legacy/bloom)
    - [Brightness-Contrast](/user-manual/graphics/posteffects/legacy/brightness_contrast)
    - [Hue-Saturation](/user-manual/graphics/posteffects/legacy/hue_saturation)
    - [FXAA](/user-manual/graphics/posteffects/legacy/fxaa)
    - [Sepia](/user-manual/graphics/posteffects/legacy/sepia)
    - [Vignette](/user-manual/graphics/posteffects/legacy/vignette)

2. Add a [Script](/user-manual/editor/scenes/components/script) component to the Entity representing your camera.
3. Assign the desired post effect scripts to the camera entity's Script component. Note that the order in which the post effect scripts are listed in the Script component determine the order in which they are applied.

You can also create your own post effects. You can find some additional ones on [GitHub](https://github.com/playcanvas/engine/tree/main/scripts/posteffects).
