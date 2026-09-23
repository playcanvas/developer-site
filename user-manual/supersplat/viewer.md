# SuperSplat Viewer

The **SuperSplat Viewer** is the open-source web viewer that renders every [scene page](https://developer.playcanvas.com/user-manual/supersplat/scene-page.md) on superspl.at. It's a small, self-contained web app that takes a splat file plus a settings JSON document and turns them into an interactive 3D experience: orbit, pan, zoom, annotations, camera animations, post effects, optional collision/walk controls, WebXR for compatible devices.

The viewer is [open source on GitHub](https://github.com/playcanvas/supersplat-viewer) under the MIT license and is distributed on npm as [`@playcanvas/supersplat-viewer`](https://www.npmjs.com/package/@playcanvas/supersplat-viewer).

## When to use the viewer directly

The published [scene page](https://developer.playcanvas.com/user-manual/supersplat/scene-page.md) on superspl.at is usually the easiest way to share a splat. Reach for the viewer directly when you want:

- **A page without superspl.at chrome.** Embed the viewer in your own website, app, or product with your own surrounding UI.
- **Full control over how the viewer is configured.** Override the settings, content, skybox, or poster image via URL parameters or your own settings.json.
- **A self-contained, offline-friendly bundle.** Use the [Editor's HTML export](https://developer.playcanvas.com/user-manual/supersplat/viewer/self-hosting.md) to ship a single-file viewer alongside the splat.
- **Independence from superspl.at.** Self-host the viewer on your own infrastructure — no requests back to PlayCanvas servers at runtime.

## Two distribution forms

There are two ways to consume the viewer:

| Form | Use when |
|------|----------|
| **HTML export from the Editor** | You want a self-contained `.html` (or `.zip` of `.html` + `.compressed.ply`) that you can email, drop on a USB stick, or host on GitHub Pages. See [Self-Hosting the Viewer](https://developer.playcanvas.com/user-manual/supersplat/viewer/self-hosting.md). |
| **`@playcanvas/supersplat-viewer` npm package** | You want to embed the viewer in your own web app, template a settings.json into it, or build your own UI on top. See [Embedding](https://developer.playcanvas.com/user-manual/supersplat/viewer/embedding.md). |

Both forms read the same [Experience Settings](https://developer.playcanvas.com/user-manual/supersplat/studio/experience-settings.md) JSON, so anything you authored in [Studio](https://developer.playcanvas.com/user-manual/supersplat/studio.md) carries through.

## See also

- [Embedding](https://developer.playcanvas.com/user-manual/supersplat/viewer/embedding.md) — npm package, URL parameters, settings.json schema
- [Self-Hosting](https://developer.playcanvas.com/user-manual/supersplat/viewer/self-hosting.md) — exporting a single-file HTML viewer from the Editor
- [Experience Settings](https://developer.playcanvas.com/user-manual/supersplat/studio/experience-settings.md) — the JSON contract that drives the viewer
