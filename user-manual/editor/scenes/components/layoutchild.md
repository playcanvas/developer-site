# Layout Child

The LayoutChild Component enables an element that is controlled by a LayoutGroup Component to override the default behavior of the Layout Group.

See [Layout Children](https://developer.playcanvas.com/user-manual/user-interface/layout-groups.md#layout-children) for how a layout child changes the way its element is laid out.

[Image: LayoutChild Component]

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

- [LayoutGroup Component](https://developer.playcanvas.com/user-manual/editor/scenes/components/layoutgroup.md) - The parent component that controls layout
- [Element Component](https://developer.playcanvas.com/user-manual/editor/scenes/components/element.md) - Required for UI layout
- [Layout Groups](https://developer.playcanvas.com/user-manual/user-interface/layout-groups.md) - How layout groups place their children, and layout children

## Scripting Interface

You can control a LayoutChild Component's properties using a [Script Component](https://developer.playcanvas.com/user-manual/editor/scenes/components/script.md). The LayoutChild Component's scripting interface is [here](https://api.playcanvas.com/engine/classes/LayoutChildComponent.html).
