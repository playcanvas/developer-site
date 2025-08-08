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

| | Tool | Description |
|-|------|-------------|
| ![Picker Select](/img/user-manual/gaussian-splatting/editing/supersplat/select-picker.svg) | **Picker Select** | Click to select, or click + drag to rect select. |
| ![Lasso Select](/img/user-manual/gaussian-splatting/editing/supersplat/select-lasso.svg) | **Lasso Select** | Click and drag to draw an arbitrary shape. Splats within the shape's outline will be selected. |
| ![Polygon Select](/img/user-manual/gaussian-splatting/editing/supersplat/select-poly.svg) | **Polygon Select** | Similar to Lasso Select. Click to create points that create the edges of an arbitrary shape. Double click to close the shape. Splats within the shape's outline will be selected. |
| ![Brush Select](/img/user-manual/gaussian-splatting/editing/supersplat/select-brush.svg) | **Brush Select** | Click and drag a selection circle. Change the brush size with the `[` and `]` keys. |
| ![Sphere Select](/img/user-manual/gaussian-splatting/editing/supersplat/select-sphere.svg) | **Sphere Select** | Activate a sphere volume to add or remove splats from the current selection. Double click on any splat to reposition the sphere volume. |
| ![Box Select](/img/user-manual/gaussian-splatting/editing/supersplat/select-box.svg) | **Box Select** | Click and drag to create a rectangular selection box. All splats within the box boundaries will be selected. |

Once you are happy with your selection, you can delete it with the Delete key.

## Transforming Splats

SuperSplat can translate, rotate and scale splats. To do this, select a splat in the Scene Manager and activate one of the gizmos via the horizontal icon bar.

To achieve fine grain control over the transform of the selected splat, you can use the TRANSFORM panel (below the SCENE MANAGER panel).

To set the origin of the currently active gizmo, double click anywhere in the 3D view.

## Merging Splats

It is possible to merge multiple .ply files together and output a single, combined .ply file. Simply load any number of .ply files into Scene Manager, perform whatever transformations and edits you require, and then save the result via the `Scene` > `Save` menu item.
