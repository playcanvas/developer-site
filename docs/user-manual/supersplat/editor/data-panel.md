---
title: Data Panel
description: "Use SuperSplat's Splat Data panel to inspect splat attributes, filter the histogram, select value ranges, and find outliers."
---

The **Splat Data** panel visualizes the attribute values of the active splat as an interactive histogram. Use it to understand how values are distributed, find outliers, and select splats whose values fall within a particular range.

![The Splat Data panel showing its filters, property list, and histogram](/img/user-manual/supersplat/editor/data-panel.png)

## Opening the Panel

The panel opens at the bottom of the Editor and is collapsed by default. Open or close it by:

- Clicking **Splat Data** in the status bar.
- Pressing **Ctrl + D** (or **Cmd + D** on macOS).

Drag the panel's top edge to change its height.

## Choosing Which Splats and Property to Display

The controls on the left determine which values are included in the histogram:

| Control | Description |
|---------|-------------|
| **Visible Splats Only** | Includes only splats inside the camera's current view. Splats outside the view are excluded. This is a view-frustum filter; it does not test whether another splat is in front of them. |
| **Log Scale** | Uses a logarithmic vertical scale so bins with small counts remain visible alongside bins with large counts. This changes only the graph's vertical display, not the underlying values or selection. |
| **All Properties** | Adds raw DC and spherical harmonic (SH) coefficients to the property list. The available SH entries depend on the bands contained in the active splat. |

Select a row in the property list to display its distribution. The default properties are:

| Property | Description |
|----------|-------------|
| **Position X/Y/Z** | World-space position after applying scene and per-splat transforms. |
| **Opacity** | Effective opacity, including the active Color panel transparency adjustment. |
| **Red/Green/Blue** | Final color for the current camera direction, including spherical harmonics and Color panel adjustments. These histograms can change when the camera moves. |
| **Scale X/Y/Z** | Decoded Gaussian scale along each local axis. |
| **Quat W/X/Y/Z** | Components of the Gaussian's rotation quaternion. |
| **Distance** | Distance from the world origin `(0, 0, 0)`. |
| **Camera Depth** | Distance along the current camera's view direction. This histogram changes when the camera moves. |
| **Volume** | `scale_x * scale_y * scale_z`. |
| **Surface Area** | A relative size measure calculated as `scale_x² + scale_y² + scale_z²`. |
| **Hue/Saturation/Value** | HSV components calculated from the final color for the current camera direction. |

With **All Properties** enabled, the list can also include:

| Property | Description |
|----------|-------------|
| **DC R/G/B** | Raw zeroth-order spherical harmonic color coefficients. These values do not include higher SH bands or Color panel adjustments. |
| **R/G/B SH _n_** | Higher-order spherical harmonic coefficients, grouped by color channel. Only coefficients present in the source data are listed. |

Locked and deleted splats are always excluded from the histogram. Enable **Visible Splats Only** to exclude off-screen splats as well.

## Reading the Histogram

The histogram uses the Editor's unselected and selected colors to show the two populations separately. By default, unselected splats are blue and selected splats are yellow.

Move the pointer across the histogram to inspect a value. The value appears beneath the pointer, while an overlay shows:

- **Splats** - The number and percentage of included splats at that value.
- **Selected** - How many of those splats are currently selected.

When you drag across a range, the two values beneath the histogram mark the range boundaries and the overlay reports aggregate counts for the whole range.

## Selecting a Value Range

Click and drag across the histogram to select all eligible splats in a value range. A highlighted rectangle shows the range before you release the pointer. Locked and deleted splats cannot be selected through the histogram.

Hold modifier keys when releasing the pointer to control how the range is applied:

| Modifier | Operation | Result |
|----------|-----------|--------|
| None | **Set** | Replace the current selection with the range. |
| **Shift** | **Add** | Add the range to the current selection. |
| **Ctrl** | **Remove** | Remove the range from the current selection. |
| **Shift + Ctrl** | **Intersect** | Keep only splats that are in both the current selection and the range. |

The pointer displays the active Set, Add, Remove, or Intersect operation while it is over the histogram. These operations match the modifiers used by the [2D selection tools](editing-splats.md#selection-modifiers).

## Status Bar Totals

The status bar below the panel reports the state of the active splat independently of the histogram's property and view filters:

| Statistic | Description |
|-----------|-------------|
| **Splats** | Total number of non-deleted splats, including locked splats. |
| **Selected** | Number of currently selected splats. |
| **Locked** | Number of locked splats. |
| **Deleted** | Number of deleted splats. |

These totals update when splats are selected, deselected, locked, unlocked, deleted, or reset.

## Common Uses

### Finding Outliers

Choose **Distance**, **Opacity**, **Volume**, or **Surface Area**, look for isolated bins at either end of the histogram, and select the relevant range for inspection or deletion. Enable **Log Scale** when a small number of outliers is hidden by much larger bins.

### Selecting by Color

Choose **Hue**, **Saturation**, or **Value** and select a range to isolate similarly colored splats. Because these properties use the final view-dependent color, position the camera at the viewpoint that matters before making the selection.

### Cleaning Only the Current View

Enable **Visible Splats Only** to restrict analysis and range selection to the camera's current view. Combine this with other selection tools when you need to refine the result spatially.

## Value Interpretation

The panel displays decoded or derived values rather than every value exactly as it is stored in the source file:

| Property type | Interpretation |
|---------------|----------------|
| Position | World-space position after active transforms. |
| Scale | Decoded Gaussian scale; logarithmic source values have already been exponentiated. |
| Red/Green/Blue | Final color after evaluating available SH bands for the current view and applying Color panel adjustments. |
| Hue/Saturation/Value | Calculated from the final color after clamping RGB to the `0-1` range. |
| Opacity | Decoded opacity with the Color panel transparency adjustment applied. |
| Quat W/X/Y/Z | Rotation quaternion; `W` is reconstructed in its non-negative canonical form. |
| DC and SH | Raw coefficients exposed when **All Properties** is enabled. |

Internal `state` and `transform` properties are not available for histogram visualization.
