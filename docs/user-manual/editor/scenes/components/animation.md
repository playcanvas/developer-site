---
title: Animation (Legacy)
---

:::warning

The Animation Component is deprecated. It has been replaced by the [Anim](anim.md) Component.

:::

The Animation Component enables an entity to specify which animations can be applied to the model assigned to its Model Component.

![Animation Component](/img/user-manual/editor/scenes/components/component-animation.png)

## Properties

| Property | Description |
|----------|-------------|
| Assets   | The animation assets that can be utilized by this entity. Multiple animations can be assigned via the picker control. |
| Speed    | A multiplier for animation playback speed. 0 will freeze animation playback, 1 represents the normal playback speed of the asset, and negative values will play the animation in reverse. Range is -2 to 2. |
| Activate | If checked, the component will start playing the animation on load. |
| Loop     | If checked, the animation will continue to loop back to the start on completion. Otherwise, the animation will come to a stop on its final frame. |

## See Also

- [Anim Component](anim.md) - The recommended replacement for this component

## Scripting Interface

You can control an Animation Component's properties using a [Script Component](script.md). The Animation Component's scripting interface is [here](https://api.playcanvas.com/engine/classes/AnimationComponent.html).
