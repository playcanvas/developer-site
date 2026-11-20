# Transform, Measure and Align

SuperSplat can transform an entire imported splat or only the Gaussians selected within it. The current selection determines which behavior is used:

| Active splat state | Transform target |
|---|---|
| No Gaussians selected | The whole active splat |
| One or more Gaussians selected | Only the selected Gaussians |

If you intended to move the whole splat, choose **Select > None** before transforming it.

## Transform Tools

Select the active splat, then choose a tool from the bottom toolbar:

- **Move** (<kbd>1</kbd>) translates the target.
- **Rotate** (<kbd>2</kbd>) rotates the target.
- **Scale** (<kbd>3</kbd>) scales the target.

Drag the gizmo handles in the viewport. For precise values, edit **Position**, **Rotation**, and uniform **Scale** in the **Transform** section below the Scene Manager's splat list (click its header to collapse or expand it). Transform operations can be undone and redone.

[Image: The Move tool's gizmo on the active splat, with the splat's values in the Transform section]

### Copy and Paste a Transform

Right-click the **Transform** header and choose **Copy** to copy the whole transform, or right-click the **Position**, **Rotation**, or **Scale** row to copy just that value. Values are copied at full precision as plain JSON text, for example `{"position":[1.5,0,-2],"rotation":[0,90,0],"scale":1}`, so they can be pasted back into the Editor, into another splat, or into any text field. **Paste** on the header accepts any subset of these keys, so `{"scale":2}` changes only the scale; **Paste** on a row accepts a bare value such as `[1.5,0,-2]` or a copied section. A paste is a single undo step. Invalid clipboard contents change nothing and briefly flash the target red.

Gizmos start in the splat's local coordinate space. Press <kbd>Shift</kbd>+<kbd>C</kbd> (or the coordinate-space toggle in the bottom toolbar) to switch between local and world space.

## Position the Pivot

The pivot marks the transform origin — where rotation and scale are applied — and defines the splat's local coordinate frame:

- While Move, Rotate, or Scale is active, double-click a visible surface to place the pivot at that point.
- Click **Reset Pivot** in the bottom toolbar to return the pivot to the splat's origin and reset its orientation. <kbd>Shift</kbd>-click it to place the pivot at the bound center instead: the center of the whole splat, or of the selected Gaussians when a selection exists.
- The [Orient tool](https://developer.playcanvas.com/user-manual/supersplat/editor/transform-measure-align.md#orient-a-splat-to-the-grid) can set the pivot from a plane picked on the splat's surface.

Moving the pivot does not move the splat until you use a transform control. Pivot changes are undoable, and a custom pivot is saved with the project in `.ssproj` files.

## Orient a Splat to the Grid

The Orient tool levels a mis-rotated splat — a Z-up import, a tilted capture, or an upside-down scan — by aligning a plane or a vertical line picked on its surface to the grid:

1. Activate **Orient** in the bottom toolbar.
2. Click points on the splat:
   - **Three points** on a surface that should be level, such as a floor or table top, define a plane.
   - **Two points** on an edge that should be vertical, such as a door frame or column, define a line. Click the bottom point first, then the top. Use this when the capture has no usable floor.
3. Click a placed point and use its move gizmo to refine the position. <kbd>Delete</kbd> or <kbd>Backspace</kbd> removes the active point, **Clear** removes all of them, and <kbd>F</kbd> frames the points in the viewport.
4. Press **Align to Grid**.
   - With three points, the whole active splat rotates and translates so the picked plane lands exactly on the grid plane, pivoting around the picked points so the clicked region stays in place. The side of the plane facing the camera becomes up. If the result is upside down, orbit underneath the plane and press **Align to Grid** again.
   - With two points, the whole active splat rotates about the midpoint of the line so the line points straight up from the grid, from the first point to the second. Click order sets the direction, so tilted, sideways, and upside-down captures all level in one step. The splat is not moved onto the grid, because a line does not define a floor.

When the picked plane or line is within 3 degrees of one of the splat's own axes, the rotation snaps to that axis, so conventional Z-up imports produce exact quarter turns.

Alignment applies to the whole active splat regardless of any Gaussian selection and is recorded as a single undoable operation. The grid is displayed while the tool is active, even if hidden. The target is the first grid plane enabled under **Planes** in the [Overlays](https://developer.playcanvas.com/user-manual/supersplat/editor/interface.md#overlays) popup: XZ by default, or XY or YZ if you have turned XZ off. With two points, "up" is the axis perpendicular to that plane: +Y for XZ, +Z for XY, and +X for YZ.

While Orient is active, the pivot button in the bottom toolbar becomes **Set Pivot**. With three points placed, it stores the picked plane as the splat's pivot and local frame instead of moving the splat: local-space gizmos and the **Transform** section then work in that frame. This is useful for transforming along a surface's own axes without rotating the splat itself.

## Align Multiple Splats

To align independently captured splats:

1. Import each capture as a separate splat.
2. Select the first splat and leave it fixed as a reference.
3. Select the splat to align and choose **Select > None** so the whole splat is the transform target.
4. Use Move, Rotate, and Scale, checking the result from more than one camera angle.
5. Toggle visibility or use Solo mode to compare the splats.

The grid uses meters, with major divisions at 1 m and minor divisions at 0.1 m. Enable **Bounding Box** and **Dimensions** in the [Overlays](https://developer.playcanvas.com/user-manual/supersplat/editor/interface.md#overlays) popup when a numeric size check is useful.

## Measure and Rescale a Splat

The Measure tool reports the distance between two surface points and can rescale the whole active splat to a known real-world length.

1. Activate **Measure** in the bottom toolbar.
2. Click a surface to place the first marker, then click again to place the second.
3. Click either marker and use its move gizmo to refine the position.
4. Read the measured length in the toolbar above the bottom controls. With **Dimensions** enabled in the Overlays popup, the length is also labeled along the line in the viewport.
5. To calibrate the splat, enter the real distance in that field. SuperSplat uniformly rescales the whole active splat around the midpoint of the two markers.

<kbd>Delete</kbd> or <kbd>Backspace</kbd> removes the active marker while Measure is active, and <kbd>F</kbd> frames the placed markers. Press <kbd>Esc</kbd> to leave the tool. Changing the length is undoable.

## Merge Visible Splats

After aligning and cleaning the splats, make every splat you want to include visible and choose **File > Export > PLY**. The export combines the visible splats into one file.

**File > Save** preserves the editable splats in an `.ssproj` project; it does not create a merged PLY. See [Managing Splats](https://developer.playcanvas.com/user-manual/supersplat/editor/scene-management.md) and [Managing Projects](https://developer.playcanvas.com/user-manual/supersplat/editor/managing-projects.md).
