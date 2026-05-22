---
title: Convert
description: "Convert and transform splats in your browser at superspl.at/convert — the web frontend to the splat-transform CLI."
---

The [Convert page](https://superspl.at/convert) is a browser-based tool for converting splats between formats, transforming them, and filtering them — no installation, no command line. It's the web frontend to the [splat-transform](/user-manual/splat-transform/) CLI, so the same actions and formats are available, but with a friendlier drag-and-drop interface.

Convert runs **entirely in the browser** using WebAssembly. Your splats are never uploaded to a server; everything happens locally and downloads back to your machine when you're done.

<!-- TODO: media — /img/user-manual/supersplat/convert/convert-ui.png — the Convert page with files added and actions queued -->

## When to use Convert vs the CLI

Use the **Convert** page when you want a single one-off conversion, want to experiment interactively, or don't have Node.js installed. Use the [splat-transform CLI](/user-manual/splat-transform/) when you need to script conversions, batch many files, or integrate with a build pipeline.

## Supported input formats

Drag a file (or files) onto the upload area, or pick from your filesystem.

- `.ply` — Standard PLY
- `.sog` — Bundled super-compressed format
- `.ksplat` — mkkellogg compressed format
- `.splat` — antimatter15 compressed format
- `.spz` — Niantic compressed format

You can add multiple files; they'll be merged into one output file (or used as multiple LODs if your output format supports it).

## Supported output formats

Pick the output format from the dropdown. The default is **Compressed PLY**.

| Format | Filename | Notes |
|--------|----------|-------|
| **Standard PLY** | `.ply` | Largest; useful as a lossless interchange format. |
| **Compressed PLY** | `.compressed.ply` | Default. Quantized PLY — ~30% smaller than standard. |
| **SuperSplat Optimized** | `.sog` | Best compression for runtime use. |
| **Spreadsheet** | `.csv` | Per-Gaussian data dumped to CSV for spreadsheet/data analysis. |
| **Embedded Viewer** | `.html` | Self-contained `.html` containing the splat and the viewer — open it locally with a double-click. |
| **Voxel Collision Bundle** | `.voxel.zip` | Voxel collision data for making your scene walkable in [Studio](/user-manual/supersplat/studio/collision). |

## Actions

Each input file has its own action chain. Actions run top-to-bottom. You can also add a final action chain that runs on the merged output.

### Transform actions

| Action | Parameters | Default |
|--------|-----------|---------|
| **Translate** | `x`, `y`, `z` | `0, 0, 0` |
| **Rotate** | `x`, `y`, `z` degrees | `0, 0, 0` |
| **Scale** | factor | `1` (min `0.001`) |

### Filter actions

| Action | Parameters | Default |
|--------|-----------|---------|
| **Remove NaN / Inf** | _(none)_ | — |
| **SH Bands** | Max band: `0` (DC only), `1`, `2`, `3` (Full) | `3` |
| **Bounding Box** | `minX`, `minY`, `minZ`, `maxX`, `maxY`, `maxZ` | `±10` |
| **Sphere** | `centerX`, `centerY`, `centerZ`, `radius` | center `0`, radius `10` |

## Format-specific output options

A few output formats surface extra controls:

- **SOG and HTML viewer** — **SH compression iterations** (range `1–100`, default `10`). More iterations give cleaner spherical-harmonic compression at the cost of longer processing time.
- **Voxel Collision Bundle** — **Voxel resolution** (default `0.05` — smaller = finer surfaces but larger asset) and **Opacity cutoff** (`0–1`, default `0.1` — voxels with opacity above this are treated as solid).

## Processing output

When you click **Convert & Download**:

1. Files process locally with progress reported in the page.
2. A processing log surfaces debug, info, warning, and error messages from the WebAssembly engine.
3. After conversion, a per-column statistics table appears (total Gaussians, min/max/mean per attribute).
4. The output file auto-downloads to your machine.

<!-- TODO: media — /video/user-manual/supersplat/convert/action-chain.mp4 — file drop → action queue → download -->

## See also

- [splat-transform CLI](/user-manual/splat-transform/) — same actions and formats, for the command line
- [Direct Upload](/user-manual/supersplat/upload) — once you have a finished splat, publish it without leaving the browser
- [Studio / Collision](/user-manual/supersplat/studio/collision) — what to do with a `.voxel.zip`
