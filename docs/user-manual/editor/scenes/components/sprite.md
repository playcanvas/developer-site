---
title: Sprite
---

The Sprite Component renders and animates [Sprite Assets][1] into the scene.

There are two types of sprite: Simple and Animated.

## Simple Sprites

Simple Sprite Components display a single frame from an atlas

![Simple Sprite](/img/user-manual/editor/scenes/components/component-sprite-simple.png)

## Simple Sprite Component Properties

| Property    | Description |
|-------------|-------------|
| Type        | Simple or Animated. |
| Sprite      | The Sprite Asset to display. |
| Frame       | The frame index of the Sprite to display. |
| Color       | A color to apply as a tint to the sprite. |
| Opacity     | The transparency of the sprite. |
| Flip X      | Flip the rendered sprite horizontally. |
| Flip Y      | Flip the rendered sprite vertically. |
| Layers      | The Layers in which to render the sprite. |
| Draw Order  | The order in which this sprite is rendered. Lower numbers are rendered first. |
| Batch Group | The Batch Group that this model belongs to. More on Batching [here][6]. |

## Animated Sprites

Animated Sprite Components have multiple Sprite Animation Clips attached which can play back a different Sprite Asset.

![Animated Sprite](/img/user-manual/editor/scenes/components/component-sprite-animated.png)

## Animated Sprite Component Properties

| Property   | Description |
|------------|-------------|
| Type       | Simple or Animated. |
| Frame      | The frame index of the Sprite to display. |
| Color      | A color to apply as a tint to the sprite. |
| Opacity    | The transparency of the sprite. |
| Flip X     | Flip the rendered sprite horizontally. |
| Flip Y     | Flip the rendered sprite vertically. |
| Speed      | Multiplier applied to the speed at which sprite animation clips on this sprite component are animated. |
| Layers     | The Layers in which to render the sprite. |
| Draw Order | The order in which this sprite is rendered. Lower numbers are rendered first. |
| Auto Play  | The name of a sprite animation clip to play when the sprite is enabled. |

## Sprite Animation Clip Properties

| Property | Description |
|----------|-------------|
| Name     | The name of the Sprite Animation Clip. Used to reference an individual clip. |
| Loop     | If true the animation clip will loop back to the start when it reaches the end. |
| FPS      | The speed at which the clip is played in Frames Per Second. |
| Sprite   | The Sprite Asset which is used to play this clip. |

## Scripting Interface

You can control the properties of a Sprite component using a [script component][4]. The scripting interface for the Sprite component is [here][5].

[1]: /user-manual/assets/types/sprite
[4]: /user-manual/editor/scenes/components/script
[5]: https://api.playcanvas.com/engine/classes/SpriteComponent.html
[6]: /user-manual/graphics/advanced-rendering/batching
