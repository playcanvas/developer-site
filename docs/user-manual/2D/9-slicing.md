---
title: 9-slicing
---

9-slicing (sometimes called 9-patch) is a technique for 2D graphics that splits a single image into 9 areas which are scaled individually in order to prevent stretching when the image is displayed at different sizes and with different aspect ratios.

![9 Sliced Button](/img/user-manual/2D/9-slicing/9-sliced-labelled.jpg)

In the image above you can see the 9 areas that a defined using the Texture Atlas editing features of the [Sprite Editor][2]. When added to a scene using either a [Sprite Component][3] or an [Image Element Component][4], the image can be resized using the width and height properties of the component. Each area is scaled using the following rules:

* **Center** - stretch or tile both horizontally and vertically
* **Top, Bottom** - stretch or tile horizontally only
* **Left, Right** - stretch or tile vertically only
* **TopLeft, TopRight, BottomLeft, BottomRight** - Do not stretch or tile

![Button Resize Animation](/img/user-manual/2D/9-slicing/button-resize.gif)

## Setting up 9-slicing

![Setup 9-slicing](/img/user-manual/2D/9-slicing/9-slice-setup.jpg)

To setup a 9-sliced sprite. Create a frame around the area that you wish to use 9-slicing on in the Sprite Editor. Then use the blue handles or the Border property in the Frame Inspector to set the borders to outline the center portion of the image that you wish to be the stretch part of your sprite.

Finally click the **New Sliced Sprite From Selection** to create a new Sprite with the render mode set to *Sliced*.

## Render Modes

Sprite Assets can have one of three Render Modes.

### Simple Sprites

![Simple Render Mode](/img/user-manual/2D/9-slicing/simple-resize.gif)

*Simple* Render Mode has no 9-slicing. Use this mode for regular sprites.

### Sliced Sprites

![Sliced Render Mode](/img/user-manual/2D/9-slicing/sliced-resize.gif)

*Sliced* Render Mode stretches portions of the image. The center stretches horizontally and vertically; the left and right sections stretch vertically; the top and bottom sections stretch horizontally and the corners do not stretch at all.

### Tiled Sprites

![Tiled Render Mode](/img/user-manual/2D/9-slicing/tiled-resize.gif)

*Tiled* Render Mode is similar to *Sliced* mode except instead of stretching the sections repeat in tiled manner. The center tiles horizontally and vertically; the left and right tile vertically; the top and bottom tile horizontally and the corners do not tile at all.

[2]: /user-manual/2D/sprite-editor
[3]: /user-manual/scenes/components/sprite
[4]: /user-manual/scenes/components/element
