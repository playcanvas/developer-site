---
title: Legacy Post Effects
---

PlayCanvas provides legacy script-based post effects that are still supported and functional. While many of these effects now have newer, more performant replacements in [CameraFrame](/user-manual/graphics/posteffects/cameraframe), they remain available for use.

## Setup

We have implemented post effects as scripts that you can add to an Entity that has a [Camera][1] component attached. To add post effects to a camera, do the following:

1. Choose one of the effects below and get the script from the GitHub link.

    - [Bloom][3]
    - [Brightness-Contrast][4]
    - [Hue-Saturation][5]
    - [FXAA][6]
    - [Sepia][7]
    - [Vignette][8]

2. Add a [Script][9] component to the Entity representing your camera.
3. Assign the desired post effect scripts to the camera entity's Script component. Note that the order in which the post effect script are listed in the Script component determine the order in which they are applied.

You can also create your own post effects. You can find some additional ones on [GitHub][2].

[1]: /user-manual/scenes/components/camera
[2]: https://github.com/playcanvas/engine/tree/main/scripts/posteffects
[3]: /user-manual/graphics/posteffects/legacy/bloom
[4]: /user-manual/graphics/posteffects/legacy/brightness_contrast
[5]: /user-manual/graphics/posteffects/legacy/hue_saturation
[6]: /user-manual/graphics/posteffects/legacy/fxaa
[7]: /user-manual/graphics/posteffects/legacy/sepia
[8]: /user-manual/graphics/posteffects/legacy/vignette
[9]: /user-manual/scenes/components/script
