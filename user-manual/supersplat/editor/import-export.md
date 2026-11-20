# Import and Export

Import brings splats into the Editor from capture apps, trainers, and other tools. Export writes the visible splats to a file: a compressed format for the web, a full-quality PLY for archiving, or a standalone HTML viewer to host yourself.

## Supported File Formats

SuperSplat supports several Gaussian Splat scene formats, plus COLMAP and INRIA camera poses for creating timeline keyframes:

| Format | Import | Export | Description |
| ------ | ------ | ------ | ----------- |
| `.ply` | ✅ | ✅ | Standard PLY format - most common interchange format, widely supported but heavyweight |
| `.compressed.ply` | ✅ | ✅ | Compressed PLY format - far smaller than uncompressed PLY, quantizes data. [Learn more](https://blog.playcanvas.com/compressing-gaussian-splats/) |
| `.sog` | ✅ | ✅ | Bundled super-compressed format (a zip file containing `meta.json` and `.webp` textures). Recommended for runtime applications |
| `meta.json` | ✅ | ❌ | Unbundled super-compressed format (accompanied by `.webp` textures). Use [SplatTransform](https://developer.playcanvas.com/user-manual/splat-transform.md) CLI tool to export |
| `lod-meta.json` | ✅ | ❌ | [Streamed SOG](https://developer.playcanvas.com/user-manual/supersplat/publishing/streaming.md) bundle (accompanied by per-LOD `.sog` chunks). Use [SplatTransform](https://developer.playcanvas.com/user-manual/splat-transform.md) CLI tool to export |
| `.splat` | ✅ | ✅ | Legacy compressed splat format (antimatter15) - less efficient than compressed PLY |
| `.ksplat` | ✅ | ❌ | KSplat compressed splat format. Import only |
| `.spz` | ✅ | ✅ | Niantic compressed format. Exports as SPZ version 4 by default, with SPZ version 3 available for older readers |
| `.lcc` / `.lcc2` | ✅ | ❌ | XGRIDS proprietary multi-LOD formats. SuperSplat asks which level of detail to load |
| `images.txt` | ✅ | ❌ | Camera poses from a [COLMAP reconstruction](https://colmap.github.io/format.html#images-txt). Importing the file creates [Timeline keyframes](https://developer.playcanvas.com/user-manual/supersplat/editor/timeline.md#importing-camera-poses-as-keyframes); it does not load a splat scene |
| Camera pose `.json` | ✅ | ❌ | Camera poses in the INRIA JSON format. Importing the file creates [Timeline keyframes](https://developer.playcanvas.com/user-manual/supersplat/editor/timeline.md#importing-camera-poses-as-keyframes); it does not load a splat scene |
| `.html` | ❌ | ✅ | Self-contained viewer app with the compressed splat data embedded in one HTML file |
| `.zip` | ❌ | ✅ | Viewer package containing an HTML app and a separate bundled SOG file (`index.sog`) |

:::warning

Only `.ply` files containing 3D Gaussian Splat data can be loaded - other PLY file types will fail to import.

:::

## Importing Splats

SuperSplat can import Gaussian Splat scenes in `.ply`, `.compressed.ply`, `.splat`, `.ksplat`, `.spz`, `.lcc`, `.lcc2`, `.sog` (bundled SOG), `meta.json` (unbundled SOG), and `lod-meta.json` (Streamed SOG) formats, and animated splats as PLY sequences. It can also import COLMAP `images.txt` and INRIA camera pose `.json` files to create [camera animation keyframes](https://developer.playcanvas.com/user-manual/supersplat/editor/timeline.md#importing-camera-poses-as-keyframes).

There are four ways to load a Gaussian Splat file:

1. **Drag and drop** - Drop one or more splat files, or a whole folder, from your file system into SuperSplat's window. While you drag files over the window, a **Drop files to import** card lists the accepted formats. While a dialog or progress screen is open, the card does not appear and the drop is refused. For multi-file formats (such as `.lcc`, `.lcc2`, unbundled SOG, or Streamed SOG), drag the parent folder containing those files.
2. **File menu** - Select `File` > `Import` and choose one or more splat files from your file system. `File` > `Import Recent` lists the files and folders you have imported before so you can reload them without browsing for them again; `Clear Recent` at the bottom of the list empties it.
3. **Direct file opening** - If you have installed SuperSplat as an app from your browser's address bar, you can double-click a `.ply`, `.splat`, `.sog`, `.spz`, `.ksplat`, or `.ssproj` file in File Explorer (Windows) or Finder (macOS) to open it in the Editor.
4. **URL loading** - Use the `load` query parameter in the form: `https://superspl.at/editor?load=<SPLAT_URL>`. For example:

    https://superspl.at/editor?load=https://raw.githubusercontent.com/willeastcott/assets/main/biker.ply

    This is particularly useful for sharing splats with others on social platforms like X and LinkedIn.

    The imported splat is named after the last part of the URL path. Add a `filename` parameter to choose the name instead, for example `?load=<SPLAT_URL>&filename=garden.ply`. The file format is taken from `filename`, so it is required when a signed or extensionless URL does not end in the format's extension. Repeat `load` (and `filename`, in the same order) to import several files.

    URL loading also supports multi-file `.lcc`, `.lcc2`, unbundled SOG, and Streamed SOG scenes. Keep their related chunk or texture files at the relative paths referenced by the container.

While a splat loads, a progress dialog shows each file as it is read, followed by the **Sorting** and **Uploading** stages.

### Importing Several Files

A single file, or the files of one multi-file model (such as an unbundled SOG folder), imports straight away. Anything else you pick, drop, or reload from **Import Recent** (several splats, a PLY sequence, or a mix of splats, projects, and camera poses) is sorted into groups and listed in an **Import Files** dialog, one row per group:

| Column | Description |
|---|---|
| **Files** | The file name, the main file of a multi-file model, or a sequence's frame range, such as `frame_000[1-5].ply`. |
| **Import** | Whether to import the row. Every row is ticked by default; unsupported files are listed but cannot be imported. |
| **As** | How the row imports: **Scene** for a splat or multi-file model, **Project** for an `.ssproj` file, **Camera poses** for COLMAP or INRIA pose files, or **Not supported**. A PLY sequence offers a choice of **Sequence** (the default) or one scene per frame, shown with the frame count (for example **120 scenes**), which imports every frame as a separate splat. |

Click **Import** to import the ticked rows, or **Cancel** to import nothing. Projects are listed first, because opening one replaces the current scene.

### Choosing a Level of Detail

When a file contains multiple levels of detail, SuperSplat displays a **Load Options** dialog before allocating the Gaussians. The dialog lists each LOD and its Gaussian count. It initially selects the most detailed level containing fewer than 20 million Gaussians, helping large scenes avoid excessive memory use.

Choose the LOD that fits your editing needs and available memory, then click **Load**. Lower-detail levels load faster and consume less memory. Click **Cancel** to stop the import without loading a level.

### Importing PLY Sequences

SuperSplat can play animated Gaussian Splats on the [Timeline](https://developer.playcanvas.com/user-manual/supersplat/editor/timeline.md), where each frame of the animation is a complete splat stored in its own PLY file.

To import a PLY sequence:

1. Ensure your PLY (or `.compressed.ply`) files share a folder and a filename prefix, followed by sequential frame numbers, such as:
   - `animation_0001.ply`
   - `animation_0002.ply`
   - `animation_0003.ply`
   - etc.

2. Load the sequence into SuperSplat by either:
   - **Dragging and dropping** all the PLY files from your file system into SuperSplat
   - **Dragging and dropping** a folder containing the PLY files onto SuperSplat
   - Using **File > Import** and selecting multiple PLY files

3. In the [Import Files](https://developer.playcanvas.com/user-manual/supersplat/editor/import-export.md#importing-several-files) dialog, the frames appear as a single row named by their frame range. Leave **As** set to **Sequence** and click **Import**.

Once loaded, the sequence appears as one splat in the Scene Manager and the [Timeline](https://developer.playcanvas.com/user-manual/supersplat/editor/timeline.md) panel drives it, allowing you to:

- Step through frames using the arrow buttons
- Play the animation using the play button
- Scrub through the animation using the timeline slider

You can import several sequences, and they play together. See [Splat Sequences](https://developer.playcanvas.com/user-manual/supersplat/editor/timeline.md#splat-sequences).

:::note

Sequences are memory-intensive since each frame loads a complete splat scene. For optimal performance, consider the file sizes and number of frames when working with animated splats.

:::

## Exporting Splats

To export your currently loaded scene, open the `File` > `Export` submenu and choose **PLY**, **SOG**, **SPZ**, **Splat**, or **Viewer App**. Exports include the visible splats only. Every export uses the same dialog:

[Image: The export dialog with its Location and Filename rows]

- **Location** - The output folder. The Editor remembers the folder you last exported to; click **Choose output folder…** (or **Change…**) to pick another. In browsers without the File System Access API this row is hidden and the file is delivered as a download instead.
- **Filename** - The name of the output file. The dialog warns if the name is invalid or already exists in the folder (the button then reads **Overwrite**), and it refuses to overwrite a file that the current scene is still reading from.
- Format-specific options:
  - **PLY**: **Compress PLY** writes a `.compressed.ply` instead of a full-size PLY; **SH Bands** chooses how many spherical harmonic bands to include.
  - **SOG**: **SH Bands**, and **Iterations** (1–20, default 10), the number of clustering passes used to compress the spherical harmonic data. More iterations give slightly better quality at the cost of export time.
  - **SPZ**: **SH Bands**, and **Version**. **SPZ 4** (the latest version of the spec) is the default, while **SPZ 3** (legacy gzip container) is available for compatibility with older third-party SPZ readers.
  - **Viewer App**: the options for a standalone HTML viewer are described in [Self-Hosting the Viewer](https://developer.playcanvas.com/user-manual/supersplat/developers/self-hosting.md).

**SH Bands** (0–3) is the exact number of spherical harmonic bands written. It starts at the highest band count in the scene, capped by the **SH Bands** setting in [Preferences](https://developer.playcanvas.com/user-manual/supersplat/editor/interface.md#preferences), so a default export keeps what the viewport shows. Choosing more bands than a splat contains fills the missing coefficients with zeros. This lets you export a band-0 splat with 3 bands for tools that expect a fixed spherical harmonic layout.

The suggested filename is the splat's name with its extension, in upper or lower case, replaced by the export format's: a splat loaded from `Garden.PLY` is suggested as `Garden.sog` for a SOG export.

Choose `File` > `Re-export` (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd>) to repeat the last export with the same options to the same file. It overwrites the previous output without further prompts, which is handy while iterating on a cleanup.
