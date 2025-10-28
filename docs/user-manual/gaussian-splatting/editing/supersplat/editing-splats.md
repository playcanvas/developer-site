---
title: Editing Splats
---

## Edit Modes

SuperSplat functions in one of two **_edit modes_**:

- Centers Mode
- Rings Mode

These modes affect how selections work and what you see in the viewport.

### Centers Mode

In centers mode:

- Gaussians are overlaid with a blue dot at their center.
- Selections apply to all gaussian centers independent of their screen depth.
- Centers are colored depending on their selection state. By default, blue is used for unselected Gaussians and yellow for selected Gaussians.
- You can control the size that centers are rendered in the VIEW OPTIONS panel.

<img width="1224" alt="Screenshot 2025-01-06 at 08 51 53" src="/img/user-manual/gaussian-splatting/editing/supersplat/centers-mode.png" />

### Rings Mode

In rings mode:

- Gaussians are overlaid with a ring at their outer boundary.
- Selections apply to the top-most layer of gaussian rings only.
- Selected Gaussians are colored yellow (by default).

<img width="1224" alt="Screenshot 2025-01-06 at 08 51 58" src="/img/user-manual/gaussian-splatting/editing/supersplat/rings-mode.png" />

### Disabling the Overlay

The mode overlay can be disabled entirely (using space bar shortcut), so neither dots nor rings are displayed.

However, please note that the selection behavior is still determined by the active mode.

<img width="1224" alt="Screenshot 2025-01-06 at 08 51 48" src="/img/user-manual/gaussian-splatting/editing/supersplat/disable-overlay.png" />

## Selecting and Deleting Splats

Cropping splats or deleting unwanted Gaussians is a key function of SuperSplat. To help with this, there are 6 selection tools available:

<div class="no-wrap-first-col">

| Tool | Description |
|------|-------------|
| ![Picker Select](/img/user-manual/gaussian-splatting/editing/supersplat/select-picker.svg) **Picker Select** | Click to select, or click + drag to rect select. |
| ![Lasso Select](/img/user-manual/gaussian-splatting/editing/supersplat/select-lasso.svg) **Lasso Select** | Click and drag to draw an arbitrary shape. Splats within the shape's outline will be selected. |
| ![Polygon Select](/img/user-manual/gaussian-splatting/editing/supersplat/select-poly.svg) **Polygon Select** | Similar to Lasso Select. Click to create points that create the edges of an arbitrary shape. Double click to close the shape. Splats within the shape's outline will be selected. |
| ![Brush Select](/img/user-manual/gaussian-splatting/editing/supersplat/select-brush.svg) **Brush Select** | Click and drag a selection circle. Change the brush size with the `[` and `]` keys. |
| ![Flood Select](/img/user-manual/gaussian-splatting/editing/supersplat/select-flood.svg) **Flood Select** | Click on the viewport to generate a 2D selection mask based on a flood fill algorithm. A threshold value (0-1) controls the sensitivity of the flood fill. This tool is particularly useful for selecting and deleting stray Gaussians (also known as floaters). |
| ![Sphere Select](/img/user-manual/gaussian-splatting/editing/supersplat/select-sphere.svg) **Sphere Select** | Activate a sphere volume to add or remove splats from the current selection. Double click on any splat to reposition the sphere volume. |
| ![Box Select](/img/user-manual/gaussian-splatting/editing/supersplat/select-box.svg) **Box Select** | Click and drag to create a rectangular selection box. All splats within the box boundaries will be selected. |

</div>

Once you are happy with your selection, you can delete it with the Delete key.

## Transforming Splats

SuperSplat can translate, rotate and scale splats. To do this, select a splat in the Scene Manager and activate one of the gizmos via the horizontal icon bar.

To achieve fine grain control over the transform of the selected splat, you can use the TRANSFORM panel (below the SCENE MANAGER panel).

To set the origin of the currently active gizmo, double click anywhere in the 3D view.

## Measuring and Rescaling Splats

SuperSplat provides a measurement tool to help you measure distances within your splat scene and rescale it based on real-world measurements. This is accessible via the Measurement icon in the bottom toolbar.

**To use the measurement tool:**

1. Click the Measurement icon in the bottom toolbar to activate the tool.
2. Click in the Viewport to place the first marker.
3. Click again to place the second marker.
4. Click on either marker to activate the translation gizmo and tweak its location.
5. The length between the two markers is displayed in a popup above the bottom toolbar.

**To rescale the scene:**

- Edit the length value in the popup to rescale the entire scene based on that modified length.

**Keyboard shortcuts:**

- Press `Delete` to remove the placed markers.
- Press `Escape` to deactivate the Measurement tool.

## Merging Splats

It is possible to merge multiple .ply files together and output a single, combined .ply file. Simply load any number of .ply files into Scene Manager, perform whatever transformations and edits you require, and then save the result via the `File` > `Save` menu item.
