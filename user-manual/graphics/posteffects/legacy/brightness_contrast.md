# Brightness-Contrast Effect

:::warning[Deprecated]

This legacy effect is deprecated. Use the color grading `brightness` and `contrast` of [CameraFrame](https://developer.playcanvas.com/user-manual/graphics/posteffects/cameraframe.md) instead. See [Migrating to CameraFrame](https://developer.playcanvas.com/user-manual/graphics/posteffects/legacy.md#migrating-to-cameraframe).

:::

The brightness-contrast effect allows you to modify the brightness and contrast of the rendered image.

Here is an image without the effect:

[Image: Image without effect]

And the same image with the effect applied and changes to brightness and contrast:

[Image: Image with effect]

The built-in brightness-contrast effect has the following attributes:

* **Brightness**: The brightness of the image. Ranges from -1 to 1 (-1 is solid black, 0 no change, 1 solid white).
* **Contrast**: The contrast of the image. Ranges from -1 to 1 (-1 is solid gray, 0 no change, 1 maximum contrast).

Find the post-processing effect script on [GitHub](https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-brightnesscontrast.js).
