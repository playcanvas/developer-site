# Layout Groups

The Layout Group Component is used to automatically set the position and size of child Elements. A Layout Group Component can be used to align child elements into vertical or horizontal columns or a grid. A Layout Group Component applies the layout rules to all its direct children, you can override the Layout Group rules on a single child using a Layout Child Component.

The Layout Group Component can be used to generate common layouts, for example, a [grid](https://developer.playcanvas.com/user-manual/user-interface/layout-groups.md#grid), a fixed width [vertical column](https://developer.playcanvas.com/user-manual/user-interface/layout-groups.md#vertical-leaderboard), or [horizontal row](https://developer.playcanvas.com/user-manual/user-interface/layout-groups.md#horizontal-buttons).

## Creating a Layout Group

Add a Layout Group by adding the LayoutGroup Component to an existing Element Entity.

[Image: Create Layout Group]

## Layout Group Properties

### Orientation

Set the `Orientation` to Horizontal to organize your layout from left-to-right or right-to-left. Or Vertical to organize your layout top-to-bottom or bottom-to-top.

### Reverse

ReverseX and ReverseY properties are used to set the direction the layout group is built out in. The default is left-to-right and bottom-to-top.

### Alignment

Alignment is used to align the child elements to the edges of the Layout Group. `[0,0]` aligns to the bottom left, `[1,1]` aligns to the top right.

### Padding

Padding adds a space to the inside of the Layout Group before positioning any children.

### Spacing

Spacing determines the gap between each child.

### Fitting

The Width Fitting and Height Fitting properties determine how a child element's width or height will be adjusted by the Layout Group.

A value of **None** will apply no fitting.

A value of **Stretch** will stretch the children to fill the width or height of the container using the following procedure:

- Sum the fitWidthProportion/fitHeightProportion values of each child and normalize so that all values sum to 1.
- Apply the natural width/height for each child.
- If there is space remaining in the container, distribute it to each child based on the normalized fitWidthProportion/fitHeightProportion values, but do not exceed the maxWidth/maxHeight of each child.

A value of **Shrink** will shrink the children to fit the container using the following procedure:

- Sum the fitWidthProportion/fitHeightProportion values of each child and normalize so that all values sum to 1.
- Apply the natural width/height for each child.
- If the new total width/height of all children exceeds the available space of the container, reduce each child's width/height proportionally based on the normalized fitWidthProportion/fitHeightProportion values, but do not exceed the minWidth/minHeight of each child.

A value of **Both** will apply both **Stretch** and **Shrink**.

### Wrap

The wrap property causes children that are outside of the width (for vertical groups) or height (for horizontal groups) to be moved to a new row or column. Using the wrap property you can create grid-based layouts.

## Layout Children

A Layout Group applies its rules to all of its direct children. If you want to override these rules for a specific child you can do that by adding a LayoutChild Component to that child.

[Image: Layout Child]

In this example, the horizontal layout is using the **Stretch** width fitting to stretch each button to fit evenly into the container. The center button has a Layout Child Component with a `maxWidth` value set to 64, so it will not be stretched.

[Image: Layout Child Setup]

## Example Layouts

### Vertical Leaderboard

[Image: Leaderboard]

This Leaderboard is setup as vertical column aligned to the top center. We're using the Width Fitting property to stretch each item to be the full width. And using the Padding and Spacing properties to leave clear gaps between the cells.

[Image: Leaderboard Setup]

### Horizontal Buttons

[Image: Horizontal Buttons]

This row of buttons is laid out using a Horizontal Layout Group with some Spacing and Padding settings to make the buttons fit the correct width. No width or height fitting is used.

[Image: Horizontal Setup]

### Grid

[Image: Grid]

This row of buttons is laid out using a Layout Group with the Wrap setting enabled to set up a grid. The Group Element the Layout Group is attached to is set to the correct width (button width + spacing) to force the wrap to generate a two column grid. The Horizontal layout means that the grid fills in rows not columns and the Alignment property is set to `[0.5, 1]` which means that any "loose" elements (a row with only one element) will be centered in the X axis.

[Image: Setup]
