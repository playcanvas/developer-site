---
title: Import and Export
---

SuperSplat's import and export capabilities are essential for working with Gaussian Splat data throughout your entire workflow. Import allows you to bring in splat scenes from various capture tools and formats for editing, cleanup, and optimization. Once your editing work is complete, export enables you to save your refined splats in the optimal format for your target platform - whether that's a compressed format for web deployment, a full-quality PLY for archival, or a standalone HTML viewer for easy sharing. This flexibility ensures SuperSplat can integrate seamlessly into any Gaussian Splat production pipeline.

## Supported File Formats {#supported-file-formats}

SuperSplat works with several file formats for Gaussian Splat scenes:

| Format | Import | Export | Description |
| ------ | ------ | ------ | ----------- |
| `.ply` | ✅ | ✅ | Standard PLY format - most common interchange format, widely supported but heavyweight |
| `.compressed.ply` | ✅ | ✅ | Compressed PLY format - far smaller than uncompressed PLY, quantizes data. [Learn more](https://blog.playcanvas.com/compressing-gaussian-splats/) |
| `.splat` | ✅ | ✅ | Compressed splat format (antimatter15) - less efficient than compressed PLY |
| `.lcc` | ✅ | ❌ | XGRIDS proprietary format which contains multiple levels-of-detail. Imports the highest LOD that contains less than 20 million Gaussians |
| `.sog` | ✅ | ❌ | Bundled super-compressed format - export not yet supported ([GitHub issue](https://github.com/playcanvas/supersplat/issues/543)). Use [SplatTransform](../splat-transform.md) CLI tool to export |
| `meta.json` | ✅ | ❌ | Unbundled super-compressed format (accompanied by `.webp` textures) - export not yet supported. Use [SplatTransform](../splat-transform.md) CLI tool to export |
| `.html` / `.zip` | ❌ | ✅ | Standalone HTML viewer app - embeds compressed splat data for web sharing |

:::warning

Only `.ply` files containing 3D Gaussian Splat data can be loaded - other PLY file types will fail to import.

:::

## Importing Splats

SuperSplat can import Gaussian Splat scenes in `.ply`, `.compressed.ply`, `.splat`, `.lcc`, `.sog` (bundled) and `meta.json` (unbundled SOG) formats.

There are four ways to load a Gaussian Splat file:

1. **Drag and drop** - Drop one or more splat files from your file system into SuperSplat's client area. For multi-file formats (such as `.lcc` or unbundled SOG), drag the parent folder containing those files.
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

Once loaded, SuperSplat will automatically recognize the sequence and enable the [Timeline](timeline.md) panel, allowing you to:

- Step through frames using the arrow buttons
- Play the animation using the play button
- Scrub through the animation using the timeline slider

:::note

PLY sequences are memory-intensive since each frame loads a complete splat scene. For optimal performance, consider the file sizes and number of frames when working with animated splats.

:::

## Exporting Splats

To export your currently loaded scene, open the `File` > `Export` submenu and select your desired format. All formats with export support listed in the [Supported File Formats](#supported-file-formats) table above are available.

For information about exporting and hosting HTML viewers for your splats, see the [Publishing](publishing.md#self-hosting-the-supersplat-viewer) guide.
