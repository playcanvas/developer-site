---
title: Button
---

The Button Component is a convenient shortcut for creating User Interface buttons for use with [Screen](screen.md) and [Element](element.md) Components.

The Button Component can be used in two Transition Modes. *Sprite Change*, which uses a different sprite or frame for each button state or *Tint*, which tints a single sprite with a different color for each state.

## Common Properties

| Property        | Description |
|-----------------|-------------|
| Active          | When enabled the button will respond to and fire events. When disabled the button is set to the Inactive State. |
| Image           | The Image Element Entity that is used to detect input events. |
| Hit Padding     | Additional space around the Image Element that will be included when testing for input events. Specified as left, bottom, right, top padding values. |
| Transition Mode | The type of effect to use when transitioning between states. Either Sprite Change or Tint. |

## Sprite Change Properties

![Sprite Change Button](/img/user-manual/editor/scenes/components/component-button-sprite-change.png)

| Property        | Description |
|-----------------|-------------|
| Hover Sprite    | The Sprite Asset used when the button is in the Hover State. |
| Hover Frame     | The Sprite Frame to display when the button is in the Hover State. |
| Pressed Sprite  | The Sprite Asset used when the button is in the Pressed State. |
| Pressed Frame   | The Sprite Frame to display when the button is in the Pressed State. |
| Inactive Sprite | The Sprite Asset used when the button is not active. |
| Inactive Frame  | The Sprite Frame used when the button is not active. |

## Tint Properties

![Tint Button](/img/user-manual/editor/scenes/components/component-button-tint.png)

| Property      | Description |
|---------------|-------------|
| Hover Tint    | The color to tint the Image Element with when the button is in the Hover State. |
| Pressed Tint  | The color to tint the Image Element with when the button is in the Pressed State. |
| Inactive Tint | The color to tint the Image Element with when the button is in the Inactive State. |
| Fade Duration | The time in milliseconds to blend between the different state colors. |

## See Also

- [Element Component](element.md) - Required for button visuals
- [Screen Component](screen.md) - The root component for user interfaces
- [User Interface](/user-manual/user-interface) - Learn more about building user interfaces

## Scripting Interface

You can control a Button Component's properties using a [Script Component](script.md). The Button Component's scripting interface is [here](https://api.playcanvas.com/engine/classes/ButtonComponent.html).
