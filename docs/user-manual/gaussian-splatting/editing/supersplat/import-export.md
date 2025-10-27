---
title: Import and Export
---

## Supported File Formats {#supported-file-formats}

SuperSplat works with several file formats for Gaussian Splat scenes:

### PLY (`.ply`)

The most common interchange format for 3D Gaussian Splat scenes. Very widely supported but very heavyweight in terms of file size.

:::warning

Only `.ply` files containing 3D Gaussian Splat data can be loaded - other PLY file types will fail to import.

:::

### Compressed PLY (`.compressed.ply`)

A lightweight, compressed format that is far smaller than the equivalent uncompressed PLY file. It quantizes splat data and drops spherical harmonics from the output file. See [this article](https://blog.playcanvas.com/compressing-gaussian-splats/) for more details on the format. It can be loaded by all major WebGL engines (although the [PlayCanvas Engine](/user-manual/engine) achieves the best performance since it renders directly from the compressed data).

### Splat File (`.splat`)

Another compressed format, although not as efficient as the compressed PLY format. This format is supported for import only.

## Importing Splats

SuperSplat can import Gaussian Splat scenes in `.ply`, `.compressed.ply` and `.splat` formats.

There are four ways to load a Gaussian Splat file:

1. **Drag and drop** - Drop one or more splat files from your file system into SuperSplat's client area.
2. **File menu** - Select `File` > `Import` and choose one or more splat files from your file system.
3. **Direct file opening** - If you have installed SuperSplat as a PWA, you can double-click a splat file in File Explorer (Windows) or Finder (macOS).
4. **URL loading** - Use the `load` query parameter in the form: `https://superspl.at/editor?load=<PLY_URL>`. For example:

    https://superspl.at/editor?load=https://raw.githubusercontent.com/willeastcott/assets/main/biker.ply

    This is particularly useful for sharing splats with others on social platforms like X and LinkedIn.

### Importing PLY Sequences {#ply-sequences}

SuperSplat supports importing sequences of PLY files to create splat animations. This allows you to view animated Gaussian Splats where each PLY file represents a single frame in the animation.

To import a PLY sequence:

1. Ensure your PLY files follow a naming convention with sequential frame numbers appended, such as:
   - `animation_0001.ply`
   - `animation_0002.ply`
   - `animation_0003.ply`
   - etc.

2. Load the sequence into SuperSplat by either:
   - **Dragging and dropping** all the PLY files from your file system into SuperSplat
   - **Dragging and dropping** a folder containing the PLY files onto SuperSplat
   - Using **File > Import** and selecting multiple PLY files

Once loaded, SuperSplat will automatically recognize the sequence and enable the Timeline panel, allowing you to:

- Step through frames using the arrow buttons
- Play the animation using the play button
- Scrub through the animation using the timeline slider

:::note

PLY sequences are memory-intensive since each frame loads a complete splat scene. For optimal performance, consider the file sizes and number of frames when working with animated splats.

:::

## Exporting Splats

To export your currently loaded scene, open the `Scene` > `Export` submenu. You can export to any of the supported formats above, plus an additional HTML Viewer format for web sharing.

### Export Formats

All the formats described in the [Supported File Formats](#supported-file-formats) section above are available for export:

- **PLY (`.ply`)** - Full quality, uncompressed format
- **Compressed PLY (`.compressed.ply`)** - Smaller file size with some quality trade-offs
- **Splat File (`.splat`)** - Alternative compressed format

:::note

[SOG](../../formats/sog.md) export is not yet supported in the SuperSplat Editor (subscribe to [this GitHub issue](https://github.com/playcanvas/supersplat/issues/543) in order to receive updates). In the meantime, to convert your splats to SOG format, please use the [SplatTransform](../splat-transform.md) CLI tool.

:::

### HTML Viewer (`.html`/`.zip`)

For information about exporting and hosting HTML viewers for your splats, see the [Publishing](publishing.md#self-hosting-the-supersplat-viewer) guide.
