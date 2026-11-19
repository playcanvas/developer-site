# Self-Hosting the Viewer

The [SuperSplat Viewer](https://developer.playcanvas.com/user-manual/supersplat/viewer.md) is [open source](https://github.com/playcanvas/supersplat-viewer) and can be directly exported by the [SuperSplat Editor](https://developer.playcanvas.com/user-manual/supersplat/editor.md) should you wish to self-host your splat content instead of (or in addition to) publishing to [superspl.at](https://superspl.at). The exported viewer runs in any modern web browser with the viewer's usual [controls](https://developer.playcanvas.com/user-manual/supersplat/viewer/controls.md) and supports [AR and VR](https://developer.playcanvas.com/user-manual/supersplat/viewer/xr.md) on devices that support WebXR.

## Exporting the HTML Viewer

To export your splat as an HTML viewer:

1. Open the `File` > `Export` submenu in the SuperSplat Editor.
2. Select `Viewer App…`.
3. Choose the output folder under **Location** and enter a **Filename**, set the options below, and click **Export**. The Editor remembers the folder for next time; in browsers without the File System Access API the file is delivered as a download instead.

The splat data is compressed to SOG on the GPU as part of the export, so large scenes take a moment.

## Export Options

The viewer export can be configured via several options:

[Image: Viewer Export]

| Option | Description |
|--------|-------------|
| **Export Type** | Controls the format of the exported viewer:<br/>• **HTML**: A single-page `.html` file where the splat is compressed to SOG, Base64 encoded and embedded directly into the file. Very convenient since everything is packed into a single file that can be double-clicked to run in your browser using the `file://` protocol. However, the base64 encoding means it will be roughly 30% larger than the ZIP Package format, and browsers impose different limits on the maximum size (below 32MB should load everywhere, but above this you could encounter problems)<br/>• **ZIP Package**: A zip file containing the viewer app (`index.html`, `index.js`, `index.css` and `settings.json`) plus the splat data as a bundled SOG file (`index.sog`). Smaller, loads faster and guaranteed to load everywhere. However, it will only load over `http://`, so you will need to run a local web server (e.g. Node's [`serve`](https://www.npmjs.com/package/serve) or Python's [`http.server`](https://docs.python.org/3/library/http.server.html) (`python -m http.server`)) |
| **Animation** | If enabled, the camera animation authored on the [Timeline](https://developer.playcanvas.com/user-manual/supersplat/editor/timeline.md) is included and plays when the viewer loads. Only available when the Timeline has keyframes (and enabled by default in that case) |
| **Loop Mode** | How an included camera animation plays back:<br/>• **None**: Play once and stop<br/>• **Repeat**: Loop continuously<br/>• **Ping Pong**: Play forwards, then backwards, repeatedly<br/>Initialized from the Timeline's Loop toggle - **Repeat** if looping is enabled, **None** otherwise |
| **Background** | The background color of the viewer. Defaults to the Editor's **Background Color**, set in the **Colors** section of the [Preferences](https://developer.playcanvas.com/user-manual/supersplat/editor/interface.md#preferences) popup |
| **Field of View** | The field of view of the viewer's camera in degrees, measured across the longer side of the screen. Defaults to the Editor camera's current setting |
| **SH Bands** | The exact number of spherical harmonics bands written to the exported splat data (0–3). Defaults to the highest band count in the scene, capped by the **SH Bands** setting in [Preferences](https://developer.playcanvas.com/user-manual/supersplat/editor/interface.md#preferences). Choosing more bands than a splat contains fills the missing ones with zeros |

The exported viewer's camera starts at the pose your viewport camera has at the moment you export, so frame your favorite view before exporting.

Like the Editor's other exports, the exported splat is tagged with the anti-aliasing mode the viewport draws it with (see **Anti-Aliasing** in [Preferences](https://developer.playcanvas.com/user-manual/supersplat/editor/interface.md#preferences)), and the viewer follows that tag.

## Web Hosting for the HTML Viewer

Once exported, you can host the HTML Viewer file somewhere to make it accessible. One easy option is to use GitHub Pages:

1. Create a new repository on [GitHub](https://github.com).
2. Add the exported HTML file (or, for a ZIP package, the extracted contents of the zip: `index.html`, `index.sog`, `index.js`, `index.css` and `settings.json`).
3. Visit your repository's `Settings` page. Select `Pages` on the left. Ensure `Source` is set to `Deploy from a branch` and set `Branch` to `main` and hit `Save`.
4. It will take a few moments for your viewer to be published. The URL will be in the form:

   `https://<github-username>.github.io/<repository-name>/<html-filename>`

## Other ways to self-host

The exported viewer is a copy of the viewer at the version the Editor includes, and doesn't update itself. To serve the latest viewer, or to point one copy at many splats, [host the prebuilt viewer from npm](https://developer.playcanvas.com/user-manual/supersplat/viewer/embedding.md#hosting-the-prebuilt-viewer) and configure it with URL parameters. To produce the same HTML viewer from a script, use [splat-transform](https://developer.playcanvas.com/user-manual/splat-transform.md) with an `.html` output file.

## See also

- [SuperSplat Viewer overview](https://developer.playcanvas.com/user-manual/supersplat/viewer.md) — what the open-source viewer is and when to use it
- [Embedding](https://developer.playcanvas.com/user-manual/supersplat/viewer/embedding.md) — using the `@playcanvas/supersplat-viewer` npm package in your own web app
- [Experience Settings](https://developer.playcanvas.com/user-manual/supersplat/studio/experience-settings.md) — the JSON contract Studio writes and the Viewer reads
