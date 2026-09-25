---
title: Scrollbar
description: PlayCanvas Scrollbar component provides a draggable handle Element that drives scroll position for an associated Scroll View component.
---

The Scrollbar Component defines a scrolling control for a [Scroll View](scrollview.md) Component.

See [Scrollbars](/user-manual/user-interface/scroll-views/#scrollbars) for using one with a scroll view, and [Sliders](/user-manual/user-interface/common-widgets/#sliders) for using one on its own as a slider.

![Scrollbar Component](/img/user-manual/editor/scenes/components/component-scrollbar.png)

## Properties

| Property    | Description |
|-------------|-------------|
| Orientation | Controls whether the scrollbar moves horizontally or vertically. Options: Horizontal, Vertical. |
| Value       | The current position value of the scrollbar, in the range 0 to 1. |
| Handle      | The entity to be used as the scrollbar handle. This entity must have an Element Component. |
| Handle Size | The size of the handle relative to the size of the track, in the range 0 to 1. For a vertical scrollbar, a value of 1 means that the handle will take up the full height of the track. |

## See Also

- [Scroll View Component](scrollview.md) - The scrollable area that uses this scrollbar
- [Element Component](element.md) - Required for the scrollbar handle
- [Scroll Views](/user-manual/user-interface/scroll-views/) - Scroll views and their scrollbars
- [Sliders](/user-manual/user-interface/common-widgets/#sliders) - A scrollbar used as a slider
- [User Interface](/user-manual/user-interface/) - Learn more about building user interfaces

## Scripting Interface

You can control a Scrollbar Component's properties using a [Script Component](script.md). The Scrollbar Component's scripting interface is [here](https://api.playcanvas.com/engine/classes/ScrollbarComponent.html).
