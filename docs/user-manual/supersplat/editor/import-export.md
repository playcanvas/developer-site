---
title: Import and Export
description: "SuperSplat import and export formats: PLY, SOG, SPLAT, SPZ, LCC/LCC2, multi-LOD loading, viewers, and choosing formats for web or archival use."
---

SuperSplat's import and export capabilities are essential for working with Gaussian Splat data throughout your entire workflow. Import allows you to bring in splat scenes from various capture tools and formats for editing, cleanup, and optimization. Once your editing work is complete, export enables you to save your refined splats in the optimal format for your target platform - whether that's a compressed format for web deployment, a full-quality PLY for archival, or a standalone HTML viewer for easy sharing. This flexibility ensures SuperSplat can integrate seamlessly into any Gaussian Splat production pipeline.

## Supported File Formats {#supported-file-formats}

SuperSplat works with several file formats for Gaussian Splat scenes:

| Format | Import | Export | Description |
| ------ | ------ | ------ | ----------- |
| `.ply` | ✅ | ✅ | Standard PLY format - most common interchange format, widely supported but heavyweight |
| `.compressed.ply` | ✅ | ✅ | Compressed PLY format - far smaller than uncompressed PLY, quantizes data. [Learn more](https://blog.playcanvas.com/compressing-gaussian-splats/) |
| `.sog` | ✅ | ✅ | Bundled super-compressed format (a zip file containing `meta.json` and `.webp` textures). Recommended for runtime applications |
| `meta.json` | ✅ | ❌ | Unbundled super-compressed format (accompanied by `.webp` textures). Use [SplatTransform](/user-manual/splat-transform/) CLI tool to export |
| `.splat` | ✅ | ✅ | Legacy compressed splat format (antimatter15) - less efficient than compressed PLY |
| `.spz` | ✅ | ✅ | Niantic compressed format. Exports as SPZ version 4 by default, with SPZ version 3 available for older readers |
| `.lcc` / `.lcc2` | ✅ | ❌ | XGRIDS proprietary multi-LOD formats. SuperSplat asks which level of detail to load |
| `.html` / `.zip` | ❌ | ✅ | Standalone HTML viewer app - embeds compressed splat data for web sharing |

:::warning

Only `.ply` files containing 3D Gaussian Splat data can be loaded - other PLY file types will fail to import.

:::

## Importing Splats

SuperSplat can import Gaussian Splat scenes in `.ply`, `.compressed.ply`, `.splat`, `.spz`, `.lcc`, `.lcc2`, `.sog` (bundled SOG) and `meta.json` (unbundled SOG) formats.

There are four ways to load a Gaussian Splat file:

1. **Drag and drop** - Drop one or more splat files from your file system into SuperSplat's client area. For multi-file formats (such as `.lcc`, `.lcc2`, or unbundled SOG), drag the parent folder containing those files.
2. **File menu** - Select `File` > `Import` and choose one or more splat files from your file system.
3. **Direct file opening** - If you have installed SuperSplat as a PWA, you can double-click a splat file in File Explorer (Windows) or Finder (macOS).
4. **URL loading** - Use the `load` query parameter in the form: `https://superspl.at/editor?load=<SPLAT_URL>`. For example:

    https://superspl.at/editor?load=https://raw.githubusercontent.com/willeastcott/assets/main/biker.ply

    This is particularly useful for sharing splats with others on social platforms like X and LinkedIn.

    URL loading also supports multi-file `.lcc`, `.lcc2`, and unbundled SOG scenes. Keep their related chunk or texture files at the relative paths referenced by the container.

### Choosing a Level of Detail {#choosing-a-level-of-detail}

When a file contains multiple levels of detail, SuperSplat displays a **Load Options** dialog before allocating the splats. The dialog lists each LOD and its splat count. It initially selects the most detailed level containing fewer than 20 million splats, helping large scenes avoid excessive memory use.

Choose the LOD that fits your editing needs and available memory, then click **Load**. Lower-detail levels load faster and consume less memory. Click **Cancel** to stop the import without loading a level.

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

Once loaded, SuperSplat will automatically recognize the sequence and enable the [Timeline](timeline.md) panel, allowing you to:

- Step through frames using the arrow buttons
- Play the animation using the play button
- Scrub through the animation using the timeline slider

:::note

PLY sequences are memory-intensive since each frame loads a complete splat scene. For optimal performance, consider the file sizes and number of frames when working with animated splats.

:::

## Exporting Splats

To export your currently loaded scene, open the `File` > `Export` submenu and select your desired format. All formats with export support listed in the [Supported File Formats](#supported-file-formats) table above are available.

Most formats let you choose how many spherical harmonic bands to include in the export dialog. When exporting to SPZ, you can also select the format version: **SPZ 4** (the latest version of the spec) is the default, while **SPZ 3** (legacy gzip container) is available for compatibility with older third-party SPZ readers.

:::note

Exporting to SOG (`.sog`) and exporting the standalone viewer (`.html` / `.zip`) require a browser with **WebGPU** support, as the SOG compression runs on the GPU. In a browser without WebGPU, these exports fail with the error: "This export requires WebGPU, which is not available in this browser. Please try a recent version of Chrome, Edge or Safari." All other export formats work in any WebGL 2.0 browser.

:::

For information about exporting and hosting HTML viewers for your splats, see [Self-Hosting the Viewer](/user-manual/supersplat/viewer/self-hosting).
