---
title: Scrollbar
---

The Scrollbar component defines a scrolling control for a [Scrollview](/user-manual/editor/scenes/components/scrollview) component.

See the [User Interface](/user-manual/user-interface) section for more details.

![Scrollbar Component](/img/user-manual/editor/scenes/components/component-scrollbar.png)

## Properties

| Property    | Description |
|-------------|-------------|
| Orientation | Controls whether the scrollbar moves horizontally or vertically. Options: Horizontal, Vertical. |
| Value       | The current position value of the scrollbar, in the range 0 to 1. |
| Handle      | The entity to be used as the scrollbar handle. This entity must have an Element component. |
| Handle Size | The size of the handle relative to the size of the track, in the range 0 to 1. For a vertical scrollbar, a value of 1 means that the handle will take up the full height of the track. |

## Scripting Interface

You can control a Scrollbar component's properties using a [script component](/user-manual/editor/scenes/components/script). The Scrollbar component's scripting interface is [here](https://api.playcanvas.com/engine/classes/ScrollbarComponent.html).
