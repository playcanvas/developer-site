---
title: Layout Child
---

The LayoutChild Component enables an element that is controlled by a LayoutGroup Component to override the default behavior of the Layout Group.

See the [Layout Groups](/user-manual/user-interface/layout-groups) section for more details.

![LayoutChild Component](/img/user-manual/editor/scenes/components/component-layoutchild.png)

## Properties

| Property              | Description |
|-----------------------|-------------|
| Min Width             | Set the minimum width that the element can be rendered at. |
| Max Width             | Set the maximum width that the element can be rendered at. |
| Min Height            | Set the minimum height that the element can be rendered at. |
| Max Height            | Set the maximum height that the element can be rendered at. |
| Fit Width Proportion  | The proportion of additional space that the element will take up if the layout group is set to stretch or shrink. |
| Fit Height Proportion | The proportion of additional space that the element will take up if the layout group is set to stretch or shrink. |
| Exclude from Layout   | Completely ignore this element when calculating the layout. |

## See Also

- [LayoutGroup Component](layoutgroup.md) - The parent component that controls layout
- [Element Component](element.md) - Required for UI layout
- [Layout Groups](/user-manual/user-interface/layout-groups) - Learn more about layout groups

## Scripting Interface

You can control a LayoutChild Component's properties using a [Script Component](script.md). The LayoutChild Component's scripting interface is [here](https://api.playcanvas.com/engine/classes/LayoutChildComponent.html).
