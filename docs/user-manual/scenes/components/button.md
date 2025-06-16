---
title: Button
---

The Button Component is a convenient shortcut for creating User Interface buttons for use with [Screen][1] and [Element][2] Components.

The Button Component can be used in two Transition Modes. *Sprite Swap*, which uses a different sprite or frame for each button state or *Tint*, which tints a single sprite with a different color for each state.

## Common Properties

| Property        | Description |
|-----------------|-------------|
| Active          | When enabled the button will respond to and fire event. When disabled the button is set to the Inactive State. |
| Image           | The Image Element Entity that is used to detect input events. |
| Hit Padding     | Additional space around the Image Element that will be included when testing for input events. |
| Transition Mode | The type of effect to use when transitioning between states. Either Sprite Swap or Tint. |

## Sprite Swap Properties

![Sprite Swap Button](/img/user-manual/scenes/components/component-button-sprite-change.png)

| Property        | Description |
|-----------------|-------------|
| Hover Sprite    | The Sprite Asset used when the button is in the Hover State. |
| Hover Frame     | The Sprite Frame to display when the button is in the Hover State. |
| Pressed Sprite  | The Sprite Asset used when the button is in the Pressed State. |
| Pressed Frame   | The Sprite Frame to display when the button is in the Pressed State. |
| Inactive Sprite | The Sprite Asset used when the button is not active. |
| Inactive Frame  | The Sprite Frame used when the button is not active. |

## Tint Properties

![Tint Button](/img/user-manual/scenes/components/component-button-tint.png)

| Property      | Description |
|---------------|-------------|
| Hover Tint    | The color to tint the Image Element with when the button is in the Hover State. |
| Pressed Tint  | The color to tint the Image Element with when the button is in the Pressed State. |
| Inactive Tint | The color to tint the Image Element with when the button is in the Inactive State. |
| Fade Duration | The time in milliseconds to blend between the different state colors. |

## Scripting Interface

You can control the properties of a Button component using a [script component][5]. The scripting interface for the Button component is [here][6].

[1]: /user-manual/scenes/components/screen
[2]: /user-manual/scenes/components/element
[5]: /user-manual/scenes/components/script
[6]: https://api.playcanvas.com/engine/classes/ButtonComponent.html
