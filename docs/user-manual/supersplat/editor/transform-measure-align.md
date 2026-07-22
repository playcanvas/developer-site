---
title: Transform, Measure and Align
description: "Move, rotate, scale, measure, orient, align, and merge whole splats or selected Gaussians in the SuperSplat Editor."
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

Gizmos start in the splat's local coordinate space. Press `Shift + C` (or the coordinate-space toggle in the bottom toolbar) to switch between local and world space.

## Position the Pivot

The pivot marks the transform origin — where rotation and scale are applied — and defines the splat's local coordinate frame:

- While Move, Rotate, or Scale is active, double-click a visible surface to place the pivot at that point.
- Click **Reset Pivot** in the bottom toolbar to return the pivot to the splat's origin and reset its orientation. `Shift`-click it to place the pivot at the bound center instead: the center of the whole splat, or of the selected Gaussians when a selection exists.
- The [Orient tool](#orient-a-splat-to-the-grid) can set the pivot from a plane picked on the splat's surface.

Moving the pivot does not move the splat until you use a transform control. Pivot changes are undoable, and a custom pivot is saved with the project in `.ssproj` files.

## Orient a Splat to the Grid {#orient-a-splat-to-the-grid}

The Orient tool levels a mis-rotated splat — a Z-up import, a tilted capture, or an upside-down scan — by aligning a plane picked on its surface to the grid:

1. Activate **Orient** in the bottom toolbar.
2. Click three points on a surface that should be level, such as a floor or table top.
3. Click a placed point and use its move gizmo to refine the position. `Delete` or `Backspace` removes the active point, **Clear** removes all of them, and `F` frames the points in the viewport.
4. Press **Align to Grid**. The whole active splat rotates and translates so the picked plane lands exactly on the grid plane, pivoting around the picked points so the clicked region stays in place.

The side of the plane facing the camera becomes up. If the result is upside down, orbit underneath the plane and press **Align to Grid** again. When the picked plane is within 3 degrees of one of the splat's own axes, the rotation snaps to that axis, so conventional Z-up imports produce exact quarter turns.

Alignment applies to the whole active splat regardless of any Gaussian selection and is recorded as a single undoable operation. The grid is displayed while the tool is active, even if hidden. The target plane follows the **Grid Plane** setting in **Settings** (XZ by default, or XY/YZ).

With three points placed, the pivot button in the bottom toolbar changes to **Set Pivot**. Instead of moving the splat, it stores the picked plane as the splat's pivot and local frame: local-space gizmos and the **Transform** panel then work in that frame. This is useful for transforming along a surface's own axes without rotating the splat itself.

## Align Multiple Splats

To align independently captured splats:

1. Import each capture as a separate splat.
2. Select the first splat and leave it fixed as a reference.
3. Select the splat to align and choose **Select > None** so the whole splat is the transform target.
4. Use Move, Rotate, and Scale, checking the result from more than one camera angle.
5. Toggle visibility or use Solo mode to compare the splats.

The grid uses meters, with major divisions at 1 m and minor divisions at 0.1 m. Enable **Show Bounding Box** and **Show Dimensions** in **Settings** when a numeric size check is useful.

## Measure and Rescale a Splat

The Measure tool reports the distance between two surface points and can rescale the whole active splat to a known real-world length.

1. Activate **Measure** in the bottom toolbar.
2. Click a surface to place the first marker, then click again to place the second.
3. Click either marker and use its move gizmo to refine the position.
4. Read the measured length in the toolbar above the bottom controls. With **Show Dimensions** enabled in **Settings**, the length is also labeled along the line in the viewport.
5. To calibrate the splat, enter the real distance in that field. SuperSplat uniformly rescales the whole active splat around the midpoint of the two markers.

`Delete` or `Backspace` removes the active marker while Measure is active, and `F` frames the placed markers. Press `Escape` to leave the tool. Changing the length is undoable.

## Merge Visible Splats

After aligning and cleaning the splats, make every splat you want to include visible and choose **File > Export > PLY**. The export combines the visible splats into one file.

**File > Save** preserves the editable splats in an `.ssproj` project; it does not create a merged PLY. See [Managing Splats](scene-management.md) and [Managing Projects](managing-projects.md).
