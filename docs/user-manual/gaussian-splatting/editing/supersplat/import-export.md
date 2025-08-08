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

## Exporting Splats

To export your currently loaded scene, open the `Scene` > `Export` submenu. You can export to any of the supported formats above, plus an additional HTML Viewer format for web sharing.

### Export Formats

All the formats described in the [Supported File Formats](#supported-file-formats) section above are available for export:

- **PLY (`.ply`)** - Full quality, uncompressed format
- **Compressed PLY (`.compressed.ply`)** - Smaller file size with some quality trade-offs
- **Splat File (`.splat`)** - Alternative compressed format

:::note

SOGS export is not yet supported in the SuperSplat Editor (subscribe to [this GitHub issue](https://github.com/playcanvas/supersplat/issues/543) in order to receive updates). In the meantime, to convert your splats to SOGS format, please use the [SplatTransform](../splat-transform.md) CLI tool.

:::

### HTML Viewer (`.html`/`.zip`)

The HTML Viewer is a special export option that creates a complete web viewer for your splats. It runs in any web browser with easy-to-use camera controls and even supports AR and VR visualization for devices that support WebXR.

#### Viewer Export Options

The viewer export can be configured via several options:

![Viewer Export](/img/user-manual/gaussian-splatting/editing/supersplat/viewer-export.png)

**Export Type** controls the format of the exported viewer:

1. **HTML** - A single-page `.html` file where the splat is Base64 encoded and embedded directly into the file.
2. **ZIP Package** - A zip file containing the viewer `.html` file and a separate `.compressed.ply` containing the splat.

The single-page `.html` option is very convenient because everything is packed into a single file. You can double-click on the file and it will run successfully in your browser using the `file://` protocol. However, it has some disadvantages:

- The base64 encoding of the splat data means it will be roughly 30% larger than the ZIP Package format.
- The various web browsers impose different limits on the maximum size of the Base64 encoded data. Below 32MB, the viewer should load everywhere, but above this, you _could_ encounter problems in certain browsers.

On the other hand, the ZIP Package is smaller, loads faster and is guaranteed to load everywhere. But it is somewhat less convenient since you cannot simply double-click on the `.html` file to open it using the `file://` protocol. It will only load over `http://`, so you will need to run a local web server (e.g. Node's [`serve`](https://www.npmjs.com/package/serve) or Python's [`SimpleHTTPServer`](https://docs.python.org/2/library/simplehttpserver.html)).

**Additional Configuration Options:**

- **SH Bands** - The number of Spherical Harmonic Bands that are exported. Think carefully about your choice here since Spherical Harmonics can drastically increase the size of your exported splat data (but can also improve rendering quality of your splat).
- **Start Position** - The initial camera pose when the viewer starts.
- **Background** - The background color used by the viewer.
- **Field of View** - The field of view used by the viewer camera.

#### Customizing the HTML Viewer

The HTML Viewer is built on [PlayCanvas Web Components](https://github.com/playcanvas/web-components). You can edit the default HTML of the viewer to customize it to your liking.

#### Web Hosting for the HTML Viewer

Once exported, you can host the HTML Viewer file somewhere to make it accessible. One easy option is to use GitHub Pages:

1. Create a new repository on [GitHub](https://github.com).
2. Add the exported HTML file (and the `.compressed.ply` file if you exported the viewer as a ZIP package).
3. Visit your repository's `Settings` page. Select `Pages` on the left. Ensure `Source` is set to `Deploy from a branch` and set `Branch` to `main` and hit `Save`.
4. It will take a few moments for your viewer to be published. The URL will be in the form:

   `https://<github-username>.github.io/<repository-name>/<html-filename>`
