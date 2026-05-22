---
title: SuperSplat Viewer
description: "The open-source web viewer that powers SuperSplat scene pages — and that you can embed in your own site or self-host."
---

The **SuperSplat Viewer** is the open-source web viewer that renders every [scene page](/user-manual/supersplat/scene-page) on superspl.at. It's a small, self-contained web app that takes a splat file plus a settings JSON document and turns them into an interactive 3D experience: orbit, pan, zoom, annotations, camera animations, post effects, optional collision/walk controls, WebXR for compatible devices.

The viewer is [open source on GitHub](https://github.com/playcanvas/supersplat-viewer) under the MIT license and is distributed on npm as [`@playcanvas/supersplat-viewer`](https://www.npmjs.com/package/@playcanvas/supersplat-viewer).

<!-- TODO: media — /img/user-manual/supersplat/viewer/embed-example.png — the viewer rendered inside a third-party page -->

## When to use the viewer directly

The published [scene page](/user-manual/supersplat/scene-page) on superspl.at is usually the easiest way to share a splat. Reach for the viewer directly when you want:

- **A page without superspl.at chrome.** Embed the viewer in your own website, app, or product with your own surrounding UI.
- **Full control over how the viewer is configured.** Override the settings, content, skybox, or poster image via URL parameters or your own settings.json.
- **A self-contained, offline-friendly bundle.** Use the [Editor's HTML export](/user-manual/supersplat/viewer/self-hosting) to ship a single-file viewer alongside the splat.
- **Independence from superspl.at.** Self-host the viewer on your own infrastructure — no requests back to PlayCanvas servers at runtime.

## Two distribution forms

There are two ways to consume the viewer:

| Form | Use when |
|------|----------|
| **HTML export from the Editor** | You want a self-contained `.html` (or `.zip` of `.html` + `.compressed.ply`) that you can email, drop on a USB stick, or host on GitHub Pages. See [Self-Hosting the Viewer](/user-manual/supersplat/viewer/self-hosting). |
| **`@playcanvas/supersplat-viewer` npm package** | You want to embed the viewer in your own web app, template a settings.json into it, or build your own UI on top. See [Embedding](/user-manual/supersplat/viewer/embedding). |

Both forms read the same [Experience Settings](/user-manual/supersplat/studio/experience-settings) JSON, so anything you authored in [Studio](/user-manual/supersplat/studio/) carries through.

## See also

- [Embedding](/user-manual/supersplat/viewer/embedding) — npm package, URL parameters, settings.json schema
- [Self-Hosting](/user-manual/supersplat/viewer/self-hosting) — exporting a single-file HTML viewer from the Editor
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — the JSON contract that drives the viewer
