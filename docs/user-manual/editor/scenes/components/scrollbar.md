---
title: Scrollbar
---

The Scrollbar component defines a scrolling control for a [Scrollview][1] component.

See the [User Interface][2] section for more details.

![Scrollbar Component](/img/user-manual/scenes/components/component-scrollbar.png)

## Component Properties

| Property    | Description |
|-------------|-------------|
| Orientation | Controls whether the scrollbar moves horizontally or vertically. |
| Value       | The current position value of the scrollbar, in the range 0 to 1. |
| Handle      | The entity to be used as the scrollbar handle. This entity must have a Scrollbar component. |
| Handle Size | The size of the handle relative to the size of the track, in the range 0 to 1. For a vertical scrollbar, a value of 1 means that the handle will take up the full height of the track. |

[1]: /user-manual/scenes/components/scrollview
[2]: /user-manual/user-interface
