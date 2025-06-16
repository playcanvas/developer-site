---
title: Animation
---

:::warning

The Animation component is deprecated. It has been replaced by the [Anim](/user-manual/scenes/components/anim) component.

:::

The Animation component enables an entity to specify which animations can be applied to the model assigned to its Model component.

The Animation component can be enabled or disabled using the toggle in the top right of the component panel. If enabled, the component will play the assigned animation.

![Animation component](/img/user-manual/scenes/components/component-animation.png)

## Properties

| Property | Description |
|----------|-------------|
| Assets   | The animation assets that can be utilized by this entity. Multiple animations can be assigned via the picker control. |
| Speed    | A multiplier for animation playback speed. 0 will freeze animation playback, and 1 represents the normal playback speed of the asset. |
| Activate | If checked, the component will start playing the animation on load. |
| Loop     | If checked, the animation will continue to loop back to the start on completion. Otherwise, the animation will come to a stop on its final frame. |

## Scripting Interface

You can control an Animation component's properties using a [script component][2]. The Animation component's scripting interface is [here][3].

[2]: /user-manual/scenes/components/script
[3]: https://api.playcanvas.com/engine/classes/AnimationComponent.html
