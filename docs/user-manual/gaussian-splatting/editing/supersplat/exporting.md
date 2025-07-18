---
title: Exporting Splats
sidebar_position: 3
---

To export the currently loaded scene, open the `Scene` > `Export` submenu. You can export to the following formats:

### PLY (`.ply`)

The most common interchange format for 3D Gaussian Splat scenes. Very widely supported but very heavyweight.

### Compressed PLY (`.compressed.ply`)

A lightweight, compressed format that is far smaller than the equivalent uncompressed .ply file. It quantizes splat data and drops spherical harmonics from the output file. See [this article](https://blog.playcanvas.com/compressing-gaussian-splats/) for more details on the format. It can be loaded by all major WebGL engines (although the [PlayCanvas Engine](https://playcanvas.com) achieves the best performance since it renders directly from the compressed data).

### Splat File (`.splat`)

Another compressed format, although not as efficient as the compressed PLY format.

### HTML Viewer (`.html`/`.zip`)

The HTML Viewer is a quick and easy way to publish your splats and share them with others. It runs in any web browser with easy to use camera controls. It even supports AR and VR visualization for devices that support WebXR.

#### Viewer Export Options

The viewer export can be configured via a number of options:

![Viewer Export](/img/user-manual/gaussian-splatting/editing/supersplat/viewer-export.png)

`Export Type` controls the format of the exported viewer:

1. **HTML** - A single-page `.html` file where the splat is Base64 encoded and embedded directly into the file.
2. **ZIP Package** - A zip file containing the viewer `.html` file and a separate `.compressed.ply` containing the splat.

The single-page `.html` option is very convenient because everything is packed into a single file. You can double-click on the file and it will run successfully in your browser using the `file://` protocol. However, it has some disadvantages:

* The base64 encoding of the splat data means it will be roughly 30% larger than the ZIP Package format.
* The various web browsers impose different limits on the maximum size of the Base64 encoded data. Below 32MB, the viewer should load everywhere, but above this, you _could_ encounter problems in certain browsers.

On the other hand, the ZIP Package is smaller, loads faster and is guaranteed to load everywhere. But it is somewhat less convenient since you cannot simply double-click on the `.html` file to open it using the `file://` protocol. It will only load over `http://`, so you will need to run a local web server (e.g. Node's [`serve`](https://www.npmjs.com/package/serve) or Python's [`SimpleHTTPServer`](https://docs.python.org/2/library/simplehttpserver.html)).

Beyond the `Export Type`, you can also configure:

* `SH Bands` - The number of Spherical Harmonic Bands that are exported. Think carefully about your choice here since Spherical Harmonics can drastically increase the size of your exported splat data (but can also improve rendering quality of your splat).
* `Start Position` - The initial camera pose when the viewer starts.
* `Background` - The background color used by the viewer.
* `Field of View` - The field of view used by the viewer camera.

#### Customizing the HTML Viewer

The HTML Viewer is built on [PlayCanvas Web Components](https://github.com/playcanvas/web-components). You can edit the default HTML of the viewer to customize it to you liking.

#### Web Hosting for the HTML Viewer

Once exported, you can host the HTML Viewer file somewhere to make it accessible. One easy option is to use GitHub Pages.

1. Create a new repository on [GitHub](https://github.com).
2. Add the exported HTML file (and the `.compressed.ply` file if you exported the viewer as a ZIP package).
3. Visit your repository's `Settings` page. Select `Pages` on the left. Ensure `Source` is set to `Deploy from a branch` and set `Branch` to `main` and hit `Save`.
4. It will take a few moments for your viewer to be published. The URL will be in the form:

   `https://<github-username>.github.io/<repository-name>/<html-filename>`.
