---
title: Image Elements
---

The image Element is used to display a texture or a solid color. Image Elements can be used as the basis for other more complex user interface components such as buttons.

## Tinting

Each image Element has a color property. If no texture is applied, the image element will simply be a colored rectangle. If a texture is applied, this color will be used to tint the texture. This let's you create color variations using only a single grayscale texture.

![Tinting](/img/user-manual/user-interface/image-element/image-tinted.png)

## Transparency

As with the color property, the opacity property can be used to set the transparency level of an Element.

![Transparent](/img/user-manual/user-interface/image-element/image-transparent.png)

## Advanced Materials

If you can't achieve the results you are looking for using the texture, color and opacity properties. You can assign your own material to an image element using the material property. For correct rendering you should _disable Depth Write_ on any material added to an image Element.

:::note

Lighting will not function as expected for Screen Space elements. You will probably want to disable lighting and shadows for any material that is used in screen space.

:::

## Masks and Masking

Image Elements can be used to mask or hide elements that are descendants. To enable this feature set the `mask` property of an image Element to true.

If there is no texture asset assigned to an image Element used for masking the mask will be a rectangle defined by the width and height. If the image Element has a texture assigned the alpha-channel of the texture is used as the mask. Note, an image mask is 1-bit, i.e. there is no fading out of the mask using the alpha-channel of the texture.
