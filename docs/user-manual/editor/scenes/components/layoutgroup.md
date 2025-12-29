---
title: Layout Group
---

The LayoutGroup component enables an entity to specify the size and position of child Element Components.

See the [Layout Groups][0] section for more details.

![LayoutGroup component](/img/user-manual/editor/scenes/components/component-layoutgroup.png)

## Properties

| Property       | Description |
|----------------|-------------|
| Orientation    | Whether the layout should run horizontally or vertically. |
| ReverseX       | Reverses the order of children along the x axis. |
| ReverseY       | Reverses the order of children along the y axis. |
| Alignment      | Specifies the horizontal and vertical alignment of child elements. Values range from 0 to 1 where [0, 0] is the bottom left and [1, 1] is the top right. |
| Padding        | Padding to be applied inside the container before positioning any children. Specified as left, bottom, right and top values. |
| Spacing        | Spacing to be applied between each child element. |
| Width Fitting  | Fitting logic to be applied when positioning and scaling child elements. |
| Height Fitting | Fitting logic to be applied when positioning and scaling child elements. |
| Wrap           | Whether or not to wrap children onto a new row/column when the size of the container is exceeded. |

## Scripting Interface

You can control a LayoutGroup component's properties using a [script component][2]. The LayoutGroup component's scripting interface is [here][3].

[0]: /user-manual/user-interface/layout-groups
[2]: /user-manual/editor/scenes/components/script
[3]: https://api.playcanvas.com/engine/classes/LayoutGroupComponent.html
