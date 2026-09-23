# Scrollbar

The Scrollbar Component defines a scrolling control for a [Scroll View](https://developer.playcanvas.com/user-manual/editor/scenes/components/scrollview.md) Component.

See the [User Interface](https://developer.playcanvas.com/user-manual/user-interface.md) section for more details.

[Image: Scrollbar Component]

## Properties

| Property    | Description |
|-------------|-------------|
| Orientation | Controls whether the scrollbar moves horizontally or vertically. Options: Horizontal, Vertical. |
| Value       | The current position value of the scrollbar, in the range 0 to 1. |
| Handle      | The entity to be used as the scrollbar handle. This entity must have an Element Component. |
| Handle Size | The size of the handle relative to the size of the track, in the range 0 to 1. For a vertical scrollbar, a value of 1 means that the handle will take up the full height of the track. |

## See Also

- [Scroll View Component](https://developer.playcanvas.com/user-manual/editor/scenes/components/scrollview.md) - The scrollable area that uses this scrollbar
- [Element Component](https://developer.playcanvas.com/user-manual/editor/scenes/components/element.md) - Required for the scrollbar handle
- [User Interface](https://developer.playcanvas.com/user-manual/user-interface.md) - Learn more about building user interfaces

## Scripting Interface

You can control a Scrollbar Component's properties using a [Script Component](https://developer.playcanvas.com/user-manual/editor/scenes/components/script.md). The Scrollbar Component's scripting interface is [here](https://api.playcanvas.com/engine/classes/ScrollbarComponent.html).
