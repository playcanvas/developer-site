# Selection and Cleanup

Select a splat in the **Scene Manager** before editing it. Gaussian selection and cleanup operations apply only to that active splat, even when several splats are visible.

## Selection Depth and Footprint

Two toggles at the left of the bottom toolbar control how every selection tool decides which Gaussians it hits. Both are off when you first open the Editor.

| Toggle | Shortcut | Off (default) | On |
|---|---|---|---|
| **Selection Depth** | `N` | Selects through the whole scene: every Gaussian under the tool's shape is picked, regardless of what is in front of it. | Selects only the visible surface: Gaussians hidden behind others are left alone. Turn this on to clean the surface of a scene without punching through it. |
| **Selection Footprint** | `M` | Selects by center: a Gaussian is picked when its center point falls inside the tool's shape. | Selects by footprint: a Gaussian is picked when any part of its projected ellipse falls inside the shape, so large, soft Gaussians at the edge of a selection are included. |

The viewport can show what the tools are testing: with Selection Footprint off, a dot marks each Gaussian center; with it on, a ring outlines each footprint. Selected Gaussians are highlighted in the selection color (yellow by default) and unselected ones in blue. These overlays are drawn according to the [Appearance](https://developer.playcanvas.com/user-manual/supersplat/editor/color-and-appearance.md#appearance) popup, where you can change their size, thickness, tint strength, and colors.

[Image: Gaussian centers shown while selecting by center]

[Image: Gaussian rings shown while selecting by footprint]

### Display Overlays

Press `Tab` to toggle the center and ring overlays on and off. They are off when the Editor starts, so you see the plain rendered splat; press `Tab` (or turn on a Display toggle in Appearance) when you want to see the individual Gaussians while you work. Hiding the overlays does not change how selection works — Selection Depth and Footprint are independent of what is drawn — and the highlight on selected Gaussians stays visible.

Locked and deleted Gaussians cannot be selected. Fully transparent Gaussians can, which makes it possible to clean up invisible leftovers that still cost memory and rendering time.

## Selection Tools

Each Scene Manager row represents an imported splat, while the selection tools act on individual Gaussians within the active splat. Use these tools to crop a splat or remove unwanted Gaussians:

| Tool | Description |
|------|-------------|
| [Image: Rectangle Selection] **Rectangle Selection** (`R`) | Click to select a single Gaussian, or click and drag to select everything inside a rectangle. This is the default selection tool. |
| [Image: Brush Selection] **Brush Selection** (`B`) | Click and drag to paint a selection with a circular brush. Adjust the brush size with the `[` (decrease) and `]` (increase) keys, or with `Alt + Wheel`. Ideal for organic selection work. |
| [Image: Polygon Selection] **Polygon Selection** (`P`) | Click to place the vertices of a polygon. Press `Backspace` to remove the last placed point. Close the shape by clicking the first point, double-clicking, or pressing `Enter`. Useful for precise selections with straight edges. Shares a toolbar button with Lasso Selection. |
| [Image: Lasso Selection] **Lasso Selection** (`L`) | Click and drag to draw a freeform shape. Gaussians within the outline are selected. Shares a toolbar button with Polygon Selection. |
| [Image: Eyedropper Selection] **Eyedropper Selection** (`Ctrl + E`) | Click the viewport to select Gaussians of a similar color. A threshold slider (0–1) controls the sensitivity of the color match. Shares a toolbar button with Flood Selection. |
| [Image: Flood Selection] **Flood Selection** (`O`) | Click the viewport to grow a 2D selection from that point with a flood fill. A threshold slider (0–1) controls its sensitivity. Particularly useful for isolated stray Gaussians (floaters). Shares a toolbar button with Eyedropper Selection. |
| [Image: Sphere Brush Selection] **Sphere Brush Selection** (`Shift + B`) | Paint a selection in 3D. Each point of the stroke is projected onto the surface under the cursor and selects the Gaussians inside a sphere there, so the brush follows the surface instead of selecting through the scene. The brush size is shared with Brush Selection (`[`, `]`, `Alt + Wheel`) and maps to a world-space radius at the picked depth. |
| [Image: Sphere Selection] **Sphere Selection** | Creates a 3D spherical volume for volumetric selection. Double-click anywhere in the scene to position the sphere center. Move and Scale buttons in the toolbar (or the `1` and `3` keys) switch the sphere's gizmo — dragging the scale gizmo's center handle changes the radius — or enter its **Position** (X, Y, Z) and **Radius** numerically. Click **Set**, **Add**, **Remove**, or **Intersect** to apply the volume to the current selection. |
| [Image: Box Selection] **Box Selection** | Creates a 3D box for volumetric selection. Double-click anywhere in the scene to position the box center. Move, Rotate, and Scale buttons in the toolbar (or the `1`, `2`, and `3` keys) switch the box's gizmo, so the box can be freely positioned, rotated, and resized — or enter its **Position** (X, Y, Z) and **Size** (X, Y, Z) numerically. While the rotate gizmo is active, the **Size** fields are replaced by **Rotation** fields (enter `0, 0, 0` to reset the orientation). Click **Set**, **Add**, **Remove**, or **Intersect** to apply the volume to the current selection. Ideal for selecting Gaussians within a specific region of 3D space. |

Two of the toolbar buttons hold a pair of tools: **Polygon** / **Lasso** and **Eyedropper** / **Flood**. Click the button to activate the tool it currently shows, or press and hold it to choose the other; the button then remembers your choice. The keyboard shortcuts always activate a specific tool.

[Image: The bottom toolbar with the Polygon / Lasso popup open]

### Selection Modifiers

The 2D selection tools and the Sphere Brush support modifier keys to control how the selection is applied:

| Modifier | Action |
|----------|--------|
| **None** | Replace the current selection with the new selection |
| **Shift** | Add to the current selection |
| **Ctrl** | Remove from the current selection |
| **Shift + Ctrl** | Keep only Gaussians that are in both the current selection and the new selection |

While one of these tools is active, the cursor shows which operation the current modifier keys will apply. A plain crosshair means **Set**; a badge on the crosshair indicates **Add** (`+`), **Remove** (`−`), or **Intersect** (`∩`). The same feedback appears when selecting a value range in the [Splat Data panel](https://developer.playcanvas.com/user-manual/supersplat/editor/data-panel.md).

The 3D volume tools (Sphere Selection and Box Selection) have **Set**, **Add**, **Remove**, and **Intersect** buttons in their toolbar instead of using modifier keys. Their volumes are transformed with the same gizmos as the transform tools: clicking the active gizmo mode button again hides the gizmo, the gizmo follows the local/world coordinate-space toggle, and volume edits are undoable while the tool is active. Press `F` to frame the volume in the viewport.

## Lock, Delete, and Restore

Use **Select > Lock** or press `H` to lock the selected Gaussians. Locking clears the selection and prevents those Gaussians from being selected or deleted. This is useful for protecting a finished area while you clean nearby geometry. Choose **Select > Unlock** or press `Shift + H` to unlock all locked Gaussians in the active splat.

Delete selected Gaussians with **Select > Delete**, `Delete`, or `Backspace`. Deletion is non-destructive while you edit: use Undo to reverse the latest deletion, or choose **Select > Reset** to restore all deleted Gaussians in the active splat. Reset does not unlock locked Gaussians.

Lock, unlock, delete, and reset operations are recorded in the edit history. Removing an entire row from the Scene Manager is different and cannot be undone.

## Duplicate and Separate a Selection

When a Gaussian selection exists, the **Edit** menu provides two ways to turn it into another splat:

- **Duplicate** copies the selected Gaussians into a new splat and keeps the originals unchanged.
- **Separate** creates a new splat from the selected Gaussians and deletes them from the original splat.

Both operations can be undone and are useful for giving one region its own transform or visibility.

## Cleanup Recipes

### Remove Floaters

1. Turn on **Selection Depth** (`N`) so selections stop at the visible surface, and press `Tab` if you want to see the Gaussian centers while you work.
2. Use Flood Selection for an isolated patch, or Lasso, Brush, Sphere Brush, Sphere, or Box Selection for a larger region.
3. Rotate the camera and add to or remove from the selection until the intended geometry is isolated.
4. Press `Delete` or `Backspace`.
5. Inspect the result from several angles and use Undo if too much was removed.

### Crop a Splat

1. Select the region you want to keep with Box, Sphere, Lasso, or Polygon Selection. Leave **Selection Depth** off so the selection reaches through the whole scene.
2. Choose **Select > Invert**.
3. Delete the inverted selection.
4. Export the cleaned result, or save an `.ssproj` if you want to preserve the splat and project setup.

### Protect Finished Areas

Select a finished region and press `H` to lock it. Continue cleaning the remaining selectable Gaussians, then press `Shift + H` when you need to edit the protected region again.

For attribute-driven cleanup, use the [Splat Data panel](https://developer.playcanvas.com/user-manual/supersplat/editor/data-panel.md) to select ranges such as low opacity or extreme scale values.

## Next Step

Continue to [Transform, Measure and Align](https://developer.playcanvas.com/user-manual/supersplat/editor/transform-measure-align.md) to transform selected Gaussians or whole splats, calibrate scale, align captures and merge visible splats.
