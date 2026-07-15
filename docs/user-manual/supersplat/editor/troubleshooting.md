---
title: Troubleshooting
description: "Resolve common SuperSplat Editor problems with imports, selection, transforms, exports, performance, saving, rendering, and publishing."
---

## A File Does Not Import

- Confirm that the file uses a format listed in [Import and Export](import-export.md). A generic or "vanilla" PLY containing only mesh or point-cloud data will not load. SuperSplat requires a 3DGS PLY with Gaussian attributes such as position (`x`, `y`, `z`), scale (`scale_*`), rotation (`rot_*`), opacity, and spherical harmonic color (`f_dc_*`, with optional `f_rest_*`). See [How 3DGS PLYs Differ from Regular PLYs](/user-manual/gaussian-splatting/formats/ply).
- For formats made of several related files, drag the parent folder into the Editor so relative file paths remain available.
- When importing from a URL, the remote server must allow the browser to fetch the file using Cross-Origin Resource Sharing (CORS).
- If the browser reports insufficient memory, try a lower-detail source file, close other GPU-heavy tabs, and import splats separately.

## Selection Does Not Match the Visible Surface

**Centers** mode selects Gaussian centers through the depth of the scene. Switch to **Rings** mode when you want screen-space selection to affect only the topmost visible layer.

Pressing `Tab` hides the edit overlay but does not change the active selection mode. Press `M` to switch modes. Locked or deleted Gaussians cannot be selected; use **Select > Unlock** or **Select > Reset** when appropriate.

See [Selection and Cleanup](editing-splats.md) for selection operations and cleanup recipes.

## A Transform Moves the Wrong Content

If any Gaussians are selected, Move, Rotate, Scale, and numeric Transform values affect only that selection. Choose **Select > None** to transform the whole active splat.

If rotation or scaling moves content around an unexpected point, switch the origin control or double-click a visible surface to place the pivot. See [Transform, Measure, and Align](transforming-splats.md).

## Content Is Missing from an Export

Splat exports include visible splats. In the Scene Manager, enable the eye icon for every splat that should be included. Disable Solo mode and verify the complete result before exporting.

To combine splats into one PLY, use **File > Export > PLY**. **File > Save** creates an editable `.ssproj` project instead.

## Color Looks Different

- Check **Settings** for tonemapping, exposure, background color, and the number of spherical harmonic bands shown in the viewport.
- Open **Color** and use its reset button to rule out per-splat tint, tonal, or transparency adjustments.
- Inspect the scene from several angles because spherical harmonic color is view-dependent.

See [Color and Appearance](color-and-appearance.md) for the difference between splat adjustments and viewport settings.

## The Editor Is Slow or Runs Out of Memory

Large splats are limited by available browser and GPU memory. Close other graphics-intensive tabs, work on one visible splat at a time with Solo mode, and choose a lower level of detail when importing a multi-LOD file. You can also reduce the Gaussian count by cleaning the splat. For large sequence imports, remember that every frame contains a full splat.

WebGPU is required only for SOG and standalone viewer exports; normal editing requires WebGL 2.0. If a WebGPU export is unavailable, use a current browser with WebGPU enabled and supported by the device.

## Unsaved Work or Project Confusion

Use **File > Save** or **Save As** regularly to preserve an editable `.ssproj` project. Exported PLY and other delivery formats are not substitutes for the project file when you need to continue editing splat layout, color controls, camera settings, or animation.

See [Managing Projects](managing-projects.md) for the difference between saving, opening, importing, and exporting.

## Publishing or Rendering Fails

- Publishing requires you to be signed in to superspl.at with a PlayCanvas account.
- Video codec support depends on the browser. Try another format from the Render dialog or use a current version of Chrome, Edge, Firefox, or Safari.
- A blocked download, private-browsing restriction, or low free memory can prevent large renders and exports from completing.

If the problem persists, open **Help > Log an Issue** in the Editor and include the browser version, operating system, source format, approximate Gaussian count, and the steps that reproduce the problem. You can also ask in the [SuperSplat Discord community](https://discord.gg/T3pnhRTTAY).
