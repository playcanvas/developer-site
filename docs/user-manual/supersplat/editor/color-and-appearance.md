---
title: Color and Appearance
description: "Adjust tint, temperature, saturation, brightness, tonal range, and transparency for imported splats in SuperSplat."
---

The **Color** panel applies non-destructive appearance adjustments to the active splat. Open it from the color icon in the right toolbar, then select the splat you want to adjust in the Scene Manager.

Color adjustments apply to the entire active splat, not only to selected Gaussians. To treat one region differently, [separate it into a new splat](editing-splats.md#duplicate-and-separate-a-selection) first.

## Controls

| Control | Effect |
|---|---|
| **Tint** | Multiplies the splat color by the selected color. White leaves the source color unchanged. |
| **Temperature** | Shifts the result toward cooler or warmer tones. |
| **Saturation** | Reduces or increases color intensity. A value of `1` leaves saturation unchanged. |
| **Brightness** | Darkens or brightens the splat. A value of `0` leaves brightness unchanged. |
| **Black Point** | Raises the darkest value that is mapped to black, increasing shadow clipping. |
| **White Point** | Lowers the brightest value that is mapped to white, increasing highlight clipping. |
| **Transparency** | Reduces or increases the splat's opacity relative to its source values. |

Black Point cannot be set above White Point. Use the reset button in the panel header to return all Color controls to their defaults. Adjustments and resets can be undone and redone.

## A Practical Correction Workflow

1. Set the viewport tonemapping and background in **Settings** so you are judging the scene in its intended viewing conditions.
2. Correct overall warmth with **Temperature**.
3. Adjust **Brightness**, then set **Black Point** and **White Point** to establish the tonal range.
4. Use **Saturation** and **Tint** for the final color balance.
5. Check the result from several camera angles. Spherical harmonic color can change with view direction.

The viewport's tonemapping, exposure, and background are view settings; the Color panel changes the splat itself.

## Save and Export Behavior

Saving an `.ssproj` project preserves these controls as editable splat settings. When you export a splat format, SuperSplat applies the adjustments to the exported color and opacity data.

For per-Gaussian inspection and selection by color or other attributes, use the [Splat Data panel](data-panel.md). To animate the viewport camera after finishing the splat's appearance, see the [Timeline](timeline.md).
