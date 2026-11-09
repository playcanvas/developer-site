# Hue-Saturation Effect

:::warning[Deprecated]

This legacy effect is deprecated. Use the color grading `saturation` of [CameraFrame](https://developer.playcanvas.com/user-manual/graphics/posteffects/cameraframe.md) instead, or a color lookup table for a hue shift. See [Migrating to CameraFrame](https://developer.playcanvas.com/user-manual/graphics/posteffects/legacy.md#migrating-to-cameraframe).

:::

The hue-saturation effect allows you to modify the hue and saturation of the rendered image.

Here is an image without the effect:

[Image: Image without effect]

And the same image with the effect applied and changes to hue and saturation:

[Image: Image with effect]

The built-in hue-saturation effect has the following attributes:

* **Hue**: The hue of the image. Ranges from -1 to 1 (-1 is 180 degrees in the negative direction, 0 no change, 1 is 180 degrees in the positive direction).
* **Saturation**: The saturation of the image. Ranges from -1 to 1 (-1 is solid gray, 0 no change, 1 maximum saturation).

Find the post-processing effect script on [GitHub](https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-huesaturation.js).
