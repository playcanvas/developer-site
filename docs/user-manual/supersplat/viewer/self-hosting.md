---
title: Self-Hosting the Viewer
description: "Export your splat as a self-contained HTML viewer from the SuperSplat Editor and host it anywhere — GitHub Pages, your own web server, or shared as a single file."
---

The [SuperSplat Viewer](/user-manual/supersplat/viewer/) is [open source](https://github.com/playcanvas/supersplat-viewer) and can be directly exported by the [SuperSplat Editor](/user-manual/supersplat/editor/) should you wish to self-host your splat content instead of (or in addition to) publishing to [superspl.at](https://superspl.at). The exported viewer runs in any modern web browser with easy-to-use camera controls and supports AR and VR visualization on devices that support WebXR.

## Exporting the HTML Viewer

To export your splat as an HTML viewer:

1. Open the `File` > `Export` submenu in the SuperSplat Editor.
2. Select `Viewer App…`.

:::note

Viewer export requires a browser with **WebGPU** support, as the embedded splat data is compressed to SOG on the GPU. In a browser without WebGPU, the export fails with the error: "This export requires WebGPU, which is not available in this browser. Please try a recent version of Chrome, Edge or Safari."

:::

## Export Options

The viewer export can be configured via several options:

![Viewer Export](/img/user-manual/supersplat/viewer/viewer-export.png)

| Option | Description |
|--------|-------------|
| **Export Type** | Controls the format of the exported viewer:<br/>• **HTML**: A single-page `.html` file where the splat is compressed to SOG, Base64 encoded and embedded directly into the file. Very convenient since everything is packed into a single file that can be double-clicked to run in your browser using the `file://` protocol. However, the base64 encoding means it will be roughly 30% larger than the ZIP Package format, and browsers impose different limits on the maximum size (below 32MB should load everywhere, but above this you could encounter problems)<br/>• **ZIP Package**: A zip file containing the viewer app (`index.html`, `index.js`, `index.css` and `settings.json`) plus the splat data as a bundled SOG file (`index.sog`). Smaller, loads faster and guaranteed to load everywhere. However, it will only load over `http://`, so you will need to run a local web server (e.g. Node's [`serve`](https://www.npmjs.com/package/serve) or Python's [`http.server`](https://docs.python.org/3/library/http.server.html) (`python -m http.server`)) |
| **Animation** | If enabled, the camera animation authored on the [Timeline](/user-manual/supersplat/editor/timeline) is included and plays when the viewer loads. Only available when the Timeline has keyframes (and enabled by default in that case) |
| **Loop Mode** | How an included camera animation plays back:<br/>• **None**: Play once and stop<br/>• **Repeat** (default): Loop continuously<br/>• **Ping Pong**: Play forwards, then backwards, repeatedly |
| **Background** | The background color of the viewer. Defaults to the Editor's current background color |
| **Field of View** | The vertical field of view of the viewer's camera in degrees. Defaults to the Editor camera's current setting |
| **SH Bands** | The number of spherical harmonics bands to include in the exported splat data |

The exported viewer's camera starts at the pose your viewport camera has at the moment you export, so frame your favorite view before exporting.

## Web Hosting for the HTML Viewer

Once exported, you can host the HTML Viewer file somewhere to make it accessible. One easy option is to use GitHub Pages:

1. Create a new repository on [GitHub](https://github.com).
2. Add the exported HTML file (or, for a ZIP package, the extracted contents of the zip: `index.html`, `index.sog`, `index.js`, `index.css` and `settings.json`).
3. Visit your repository's `Settings` page. Select `Pages` on the left. Ensure `Source` is set to `Deploy from a branch` and set `Branch` to `main` and hit `Save`.
4. It will take a few moments for your viewer to be published. The URL will be in the form:

   `https://<github-username>.github.io/<repository-name>/<html-filename>`

## See also

- [SuperSplat Viewer overview](/user-manual/supersplat/viewer/) — what the open-source viewer is and when to use it
- [Embedding](/user-manual/supersplat/viewer/embedding) — using the `@playcanvas/supersplat-viewer` npm package in your own web app
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — the JSON contract Studio writes and the Viewer reads
