---
title: Selection and Cleanup
description: "Select, lock, delete, restore, duplicate, and separate Gaussians while cleaning floaters and cropping splat scenes in SuperSplat."
---

Select a scene in the **Scene Manager** before editing it. Gaussian selection and cleanup operations apply only to that active scene, even when several scenes are visible.

## Edit Modes

SuperSplat functions in one of two **_edit modes_**:

- Centers Mode
- Rings Mode

These modes affect how selections work and what you see in the viewport.

### Centers Mode

In centers mode:

- Gaussians are overlaid with a blue dot at their center.
- Selections apply to all Gaussian centers independent of their screen depth.
- Centers are colored depending on their selection state. By default, blue is used for unselected Gaussians and yellow for selected Gaussians.
- You can control the size that centers are rendered in the SETTINGS panel.

<img width="1224" alt="Screenshot 2025-01-06 at 08 51 53" src="/img/user-manual/supersplat/editor/centers-mode.png" />

### Rings Mode

In rings mode:

- Gaussians are overlaid with a ring at their outer boundary.
- Selections apply to the top-most layer of gaussian rings only.
- Selected Gaussians are colored yellow (by default).

<img width="1224" alt="Screenshot 2025-01-06 at 08 51 58" src="/img/user-manual/supersplat/editor/rings-mode.png" />

### Disabling the Overlay

The mode overlay can be disabled entirely (by pressing **Tab**), so neither dots nor rings are displayed.

However, please note that the selection behavior is still determined by the active mode.

<img width="1224" alt="Screenshot 2025-01-06 at 08 51 48" src="/img/user-manual/supersplat/editor/disable-overlay.png" />

## Selection Tools

Cropping splats or deleting unwanted Gaussians is a key function of SuperSplat. To help with this, there are 8 selection tools available:

<div class="no-wrap-first-col">

| Tool | Description |
|------|-------------|
| ![Picker Select](/img/user-manual/supersplat/editor/select-picker.svg) **Picker Select** | Click to select a single splat, or click + drag to create a rectangular selection area. This is the default selection tool. |
| ![Lasso Select](/img/user-manual/supersplat/editor/select-lasso.svg) **Lasso Select** | Click and drag to draw a freeform shape. Splats within the shape's outline will be selected. This is a 2D screen-space selection tool. |
| ![Polygon Select](/img/user-manual/supersplat/editor/select-poly.svg) **Polygon Select** | Click to place points that define the vertices of a polygon. Press `Backspace` or `Delete` to remove the last placed point. Close the shape by clicking the first point, double-clicking, or pressing `Enter`. Splats within the polygon will be selected. This is useful for precise selections with straight edges. |
| ![Brush Select](/img/user-manual/supersplat/editor/select-brush.svg) **Brush Select** | Click and drag to paint a selection using a circular brush. Adjust the brush size with the `[` (decrease) and `]` (increase) keys. Ideal for organic selection work. |
| ![Flood Select](/img/user-manual/supersplat/editor/select-flood.svg) **Flood Select** | Click on the viewport to generate a 2D selection mask based on a flood fill algorithm. A threshold slider (0-1) controls the sensitivity of the flood fill. This tool is particularly useful for selecting and deleting stray Gaussians (also known as floaters) that appear isolated in the scene. |
| ![Eyedropper Select](/img/user-manual/supersplat/editor/select-eyedropper.svg) **Eyedropper Select** | Click on the viewport to select splats based on color similarity. A threshold slider (0-1) controls the sensitivity of the color matching. This tool is useful for selecting groups of splats that share similar colors. |
| ![Sphere Select](/img/user-manual/supersplat/editor/select-sphere.svg) **Sphere Select** | Creates a 3D spherical volume for volumetric selection. Double-click anywhere in the scene to position the sphere center, use the translate gizmo to move it, or enter its **Position** (X, Y, Z) numerically. Set its **Radius** in the toolbar. Click **Set**, **Add**, **Remove**, or **Intersect** to apply the volume to the current selection. |
| ![Box Select](/img/user-manual/supersplat/editor/select-box.svg) **Box Select** | Creates an axis-aligned 3D box for volumetric selection. Double-click anywhere in the scene to position the box center, use the translate gizmo to move it, or enter its **Position** (X, Y, Z) numerically. Enter its **Size** (X, Y, Z) in the toolbar. Click **Set**, **Add**, **Remove**, or **Intersect** to apply the volume to the current selection. This is ideal for selecting splats within a specific region of 3D space. |

</div>

### Selection Modifiers {#selection-modifiers}

The 2D selection tools support modifier keys to control how the selection is applied:

| Modifier | Action |
|----------|--------|
| **None** | Replace the current selection with the new selection |
| **Shift** | Add to the current selection |
| **Ctrl** | Remove from the current selection |
| **Shift + Ctrl** | Keep only splats that are in both the current selection and the new selection |

**Intersect** is available with Picker, Lasso, Polygon, Brush, and Flood Select. Eyedropper Select supports **Set**, **Add**, and **Remove**, but not **Intersect**.

While Picker, Lasso, Polygon, Brush, or Flood Select is active, the cursor shows which operation the current modifier keys will apply. A plain crosshair means **Set**; a badge on the crosshair indicates **Add** (`+`), **Remove** (`−`), or **Intersect** (`∩`). The same feedback appears when selecting a value range in the [Splat Data panel](data-panel.md).

The 3D selection tools (Sphere Select and Box Select) have **Set**, **Add**, **Remove**, and **Intersect** buttons in their toolbar instead of using modifier keys.

## Lock, Delete, and Restore

Use **Select > Lock** or press `H` to lock the selected Gaussians. Locking clears the selection and prevents those Gaussians from being selected or deleted. This is useful for protecting a finished area while you clean nearby geometry. Choose **Select > Unlock** or press `Shift + H` to unlock all locked Gaussians in the active scene.

Delete selected Gaussians with **Select > Delete**, `Delete`, or `Backspace`. Deletion is non-destructive while you edit: use Undo to reverse the latest deletion, or choose **Select > Reset** to restore all deleted Gaussians in the active scene. Reset does not unlock locked Gaussians.

Lock, unlock, delete, and reset operations are recorded in the edit history. Removing an entire row from the Scene Manager is different and cannot be undone.

## Duplicate and Separate a Selection {#duplicate-and-separate-a-selection}

When a Gaussian selection exists, the **Edit** menu provides two ways to turn it into another scene:

- **Duplicate** copies the selected Gaussians into a new scene and keeps the originals unchanged.
- **Separate** creates a new scene from the selected Gaussians and deletes them from the original scene.

Both operations can be undone and are useful for giving one region its own transform, visibility, or [Color](color-and-appearance.md) settings.

## Cleanup Recipes

### Remove Floaters

1. Switch to **Rings** mode so selection stops at the topmost visible surface.
2. Use Flood Select for an isolated patch, or Lasso, Brush, Sphere, or Box Select for a larger region.
3. Rotate the camera and add to or remove from the selection until the intended geometry is isolated.
4. Press `Delete` or `Backspace`.
5. Inspect the result from several angles and use Undo if too much was removed.

### Crop a Scene

1. Select the region you want to keep with Box, Sphere, Lasso, or Polygon Select.
2. Choose **Select > Invert**.
3. Delete the inverted selection.
4. Export the cleaned result, or save an `.ssproj` if you want to preserve the scene and project setup.

### Protect Finished Areas

Select a finished region and press `H` to lock it. Continue cleaning the remaining selectable Gaussians, then press `Shift + H` when you need to edit the protected region again.

For attribute-driven cleanup, use the [Splat Data panel](data-panel.md) to select ranges such as low opacity or extreme scale values.

## Transforming Splats {#transforming-splats}

Move, Rotate, and Scale affect selected Gaussians when a selection exists, or the whole active scene when nothing is selected. See [Transform, Measure, and Align](transforming-splats.md) for gizmos, numeric transforms, pivots, and scene alignment.

## Measuring and Rescaling Splats {#measuring-and-rescaling-splats}

The Measure tool can place two surface markers, report their distance, and uniformly rescale the active scene to a known length. See [Measure and Rescale a Scene](transforming-splats.md#measure-and-rescale-a-scene).

## Merging Splats {#merging-splats}

Load and align multiple scenes, make the scenes to include visible, then choose **File > Export > PLY**. See [Merge Visible Scenes](transforming-splats.md#merge-visible-scenes). **File > Save** creates an editable `.ssproj` instead of a merged PLY.
