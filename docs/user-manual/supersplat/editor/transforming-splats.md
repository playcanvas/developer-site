---
title: Transform, Measure, and Align
description: "Move, rotate, scale, measure, align, and merge whole splats or selected Gaussians in the SuperSplat Editor."
---

SuperSplat can transform an entire imported splat or only the Gaussians selected within it. The current selection determines which behavior is used:

| Active splat state | Transform target |
|---|---|
| No Gaussians selected | The whole active splat |
| One or more Gaussians selected | Only the selected Gaussians |

If you intended to move the whole splat, choose **Select > None** before transforming it.

## Transform Tools

Select the active splat, then choose a tool from the bottom toolbar:

- **Move** (`1`) translates the target.
- **Rotate** (`2`) rotates the target.
- **Scale** (`3`) scales the target.

Drag the gizmo handles in the viewport. For precise values, edit **Position**, **Rotation**, and uniform **Scale** in the **Transform** panel below the Scene Manager. Transform operations can be undone and redone.

Press `Shift + C` to switch the gizmo between world and local coordinate space.

## Position the Pivot

The transform origin controls where rotation and scale are applied. The origin button in the bottom toolbar switches between:

- **Splat origin**: the imported splat's transform origin.
- **Bound center**: the center of the whole splat, or the center of the selected Gaussians when a selection exists.

While Move, Rotate, or Scale is active, double-click a visible surface to place the pivot at that point. Moving the pivot does not move the splat until you use a transform control.

## Align Multiple Splats

To align independently captured splats:

1. Import each capture as a separate splat.
2. Select the first splat and leave it fixed as a reference.
3. Select the splat to align and choose **Select > None** so the whole splat is the transform target.
4. Use Move, Rotate, and Scale, checking the result from more than one camera angle.
5. Toggle visibility or use Solo mode to compare the splats.

The grid uses meters, with major divisions at 1 m and minor divisions at 0.1 m. Enable bounds and dimensions in **Settings** when a numeric size check is useful.

## Measure and Rescale a Splat

The Measure tool reports the distance between two surface points and can rescale the whole active splat to a known real-world length.

1. Activate **Measure** in the bottom toolbar.
2. Click a surface to place the first marker, then click again to place the second.
3. Click either marker and use its move gizmo to refine the position.
4. Read the measured length in the toolbar above the bottom controls.
5. To calibrate the splat, enter the real distance in that field. SuperSplat uniformly rescales the whole active splat around the midpoint of the two markers.

`Delete` or `Backspace` removes the active marker while Measure is active. Press `Escape` to leave the tool. Changing the length is undoable.

## Merge Visible Splats

After aligning and cleaning the splats, make every splat you want to include visible and choose **File > Export > PLY**. The export combines the visible splats into one file.

**File > Save** preserves the editable splats in an `.ssproj` project; it does not create a merged PLY. See [Managing Splats](scene-management.md) and [Managing Projects](managing-projects.md).
