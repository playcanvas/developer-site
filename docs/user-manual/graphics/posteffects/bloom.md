---
title: Bloom Effect
---

[Bloom][1] is a post-processing effect used to reproduce an imaging artifact of real-world cameras. The effect produces fringes (or feathers) of light extending from the borders of bright areas in an image, contributing to the illusion of an extremely bright light overwhelming the camera capturing the scene.

Here is an image without bloom:

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

And the same image with bloom applied:

![Image with effect](/img/user-manual/graphics/posteffects/with-bloom.png)

The built-in bloom effect has the following attributes:

* **Bloom Intensity**: The intensity of the effect
* **Bloom Threshold**: Only pixels brighter than this threshold will be processed. Ranges from 0 to 1.
* **Blur Amount**: Controls the amount of blurring.

Find the post-processing effect script on [GitHub][4].

[1]: https://en.wikipedia.org/wiki/Bloom_(shader_effect)
[4]: https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-bloom.js
