---
title: Sprite
---

A Sprite is a 2D graphic that can be rendered into a scene. A Sprite Asset is a reference to a [Texture Atlas][1] and a sequence of frames from that atlas. In this way a sprite can either represent a single image (taken out of the atlas) or a flip-book style animation (multiple frames from the atlas).

## Properties

![Sprites](/img/user-manual/assets/sprites/sprites.jpg)

### Pixels Per Unit

The number of pixels in the sprite image that maps to 1 Unit in the PlayCanvas scene. e.g If `pixelsPerUnit` is 1 and the sprite is 32x32. Then it will be 32 units across and high when rendered in the scene. By default a sprite with the *Simple* render mode is created with `pixelsPerUnit` set to 100. This means that a 100x100 sprite will be 1 unit wide/high in the scene.

If you create a *Sliced* sprite, by default it will be created with a `pixelsPerUnit` value of 1. Because these sprites are usually used as part of a Screen Component for building user interfaces, 1 sprite pixel should map to 1 screen pixel.

### Render Mode

* Simple - the sprite does not use the border values
* Sliced - the sprite uses the border values to perform [9-sliced][2] rendering by stretching.
* Tiled - the sprite uses the border values to perform [9-sliced][2] rendering by tiling.

### Texture Atlas

The Texture Atlas asset that the sprite references

[1]: /user-manual/editor/assets/inspectors/texture-atlas
[2]: /user-manual/2D/slicing
