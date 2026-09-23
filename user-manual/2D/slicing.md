# 9-slicing

9-slicing (sometimes called 9-patch) is a technique for 2D graphics that splits a single image into 9 areas which are scaled individually in order to prevent stretching when the image is displayed at different sizes and with different aspect ratios.

[Image: 9 Sliced Button]

In the image above you can see the 9 areas that a defined using the Texture Atlas editing features of the [Sprite Editor](https://developer.playcanvas.com/user-manual/2D/sprite-editor.md). When added to a scene using either a [Sprite Component](https://developer.playcanvas.com/user-manual/editor/scenes/components/sprite.md) or an [Image Element Component](https://developer.playcanvas.com/user-manual/editor/scenes/components/element.md), the image can be resized using the width and height properties of the component. Each area is scaled using the following rules:

* **Center** - stretch or tile both horizontally and vertically
* **Top, Bottom** - stretch or tile horizontally only
* **Left, Right** - stretch or tile vertically only
* **TopLeft, TopRight, BottomLeft, BottomRight** - Do not stretch or tile

[Image: Button Resize Animation]

## Setting up 9-slicing

[Image: Setup 9-slicing]

To setup a 9-sliced sprite. Create a frame around the area that you wish to use 9-slicing on in the Sprite Editor. Then use the blue handles or the Border property in the Frame Inspector to set the borders to outline the center portion of the image that you wish to be the stretch part of your sprite.

Finally click the **New Sliced Sprite From Selection** to create a new Sprite with the render mode set to *Sliced*.

## Render Modes

Sprite Assets can have one of three Render Modes.

### Simple Sprites

[Image: Simple Render Mode]

*Simple* Render Mode has no 9-slicing. Use this mode for regular sprites.

### Sliced Sprites

[Image: Sliced Render Mode]

*Sliced* Render Mode stretches portions of the image. The center stretches horizontally and vertically; the left and right sections stretch vertically; the top and bottom sections stretch horizontally and the corners do not stretch at all.

### Tiled Sprites

[Image: Tiled Render Mode]

*Tiled* Render Mode is similar to *Sliced* mode except instead of stretching the sections repeat in a tiled manner. The center tiles horizontally and vertically; the left and right tile vertically; the top and bottom tile horizontally and the corners do not tile at all.
