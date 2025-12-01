---
title: Hue-Saturation Effect
---

The hue-saturation effect allows you to modify the hue and saturation of the rendered image.

Here is an image without the effect:

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

And the same image with the effect applied and changes to hue and saturation:

![Image with effect](/img/user-manual/graphics/posteffects/with-hue-saturation.png)

The built-in hue-saturation effect has the following attributes:

* **Hue**: The hue of the image. Ranges from -1 to 1 (-1 is 180 degrees in the negative direction, 0 no change, 1 is 180 degrees in the positive direction).
* **Saturation**: The saturation of the image. Ranges from -1 to 1 (-1 is solid gray, 0 no change, 1 maximum saturation).

Find the post-processing effect script on [GitHub][3].

[3]: https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-huesaturation.js
