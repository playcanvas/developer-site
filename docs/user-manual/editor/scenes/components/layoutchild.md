---
title: Layout Child
---

The LayoutChild component enables an element that is controlled by a LayoutGroup component to override the default behavior of the Layout Group.

See the [Layout Groups][0] section for more details.

![LayoutChild component](/img/user-manual/editor/scenes/components/component-layoutchild.png)

## Properties

| Property              | Description |
|-----------------------|-------------|
| Min Width             | Set the minimum width that the element can be rendered at. |
| Min Height            | Set the minimum height that the element can be rendered at. |
| Max Width             | Set the maximum width that the element can be rendered at. |
| Max Height            | Set the maximum height that the element can be rendered at. |
| Fit Width Proportion  | The proportion of additional space that the element will take up if the layout group is set to stretch or shrink. |
| Fit Height Proportion | The proportion of additional space that the element will take up if the layout group is set to stretch or shrink. |
| Exclude from Layout   | Completely ignore this element when calculating the layout. |

## Scripting Interface

You can control an LayoutChild component's properties using a [script component][2]. The LayoutChild component's scripting interface is [here][3].

[0]: /user-manual/user-interface/layout-groups
[2]: /user-manual/editor/scenes/components/script
[3]: https://api.playcanvas.com/engine/classes/LayoutChildComponent.html
