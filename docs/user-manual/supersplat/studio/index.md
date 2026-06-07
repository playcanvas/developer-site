---
title: SuperSplat Studio
description: "Studio curates the viewing experience for a published splat: cameras, annotations, post effects, skybox, and collision."
---

**SuperSplat Studio** is where you curate the viewing experience of a splat you've already [published](/user-manual/supersplat/editor/publishing) or [directly uploaded](/user-manual/supersplat/upload). It opens on top of the published scene and lets you curate much of what a visitor sees on its [scene page](/user-manual/supersplat/scene-page): camera framing, on-scene annotations, post-processing effects, tonemapping, the background or skybox, and collision geometry for walkable scenes. (Camera animation is authored separately in the [Editor Timeline](/user-manual/supersplat/editor/timeline).)

Studio writes its output as a single JSON document — [Experience Settings](/user-manual/supersplat/studio/experience-settings) — that the open-source [SuperSplat Viewer](/user-manual/supersplat/viewer/) reads at runtime. That same JSON is what gets bundled into a self-hosted HTML export.

<!-- TODO: media — /img/user-manual/supersplat/studio/launching-studio.png — the Studio layout -->

## Launching Studio {#launching-studio}

Studio runs at **`https://superspl.at/scene/<hash>/studio`**. Only the splat's owner can open it; for anyone else the URL 404s.

There are two ways to get there:

- From the [Manage page](/user-manual/supersplat/manage), open a splat's **Edit Splat** dialog and click **Open in Studio** in the preview card.
- From your own splat's [scene page](/user-manual/supersplat/scene-page), use the **Edit in Studio** entry point.

:::note Desktop recommended

Studio is built for a desktop browser. On a phone or tablet you'll see a "Studio works best on desktop" warning when you open it. You can dismiss the warning and continue, but expect a constrained UI.

:::

## The layout

Studio reuses the SuperSplat editor shell:

- **Header** — back button, scene name, **Import** / **Export** / **View** actions, and **Save**.
- **Left panel** — a single panel organized into three tabs:
  - **Scene** — grouped sections for *Look & Tone* (background, tonemapping, high-precision rendering), *Post Effects*, and *Cameras*.
  - **Annotations** — the list of on-scene annotations.
  - **Assets** — scene-asset uploads, such as collision.
- **Viewport** — live preview of how visitors will see the scene.

Each tool section has its own page:

- [Cameras](/user-manual/supersplat/studio/cameras) — initial pose, target, and field of view for one or more named cameras.
- [Annotations](/user-manual/supersplat/studio/annotations) — 3D-positioned text hotspots that visitors can navigate between.
- [Post Effects](/user-manual/supersplat/studio/post-effects) — sharpness, bloom, color grading, vignette, fringing, tonemapping, high-precision rendering.
- [Skybox](/user-manual/supersplat/studio/skybox) — background color or full equirectangular skybox.
- [Collision](/user-manual/supersplat/studio/collision) — voxel geometry that makes a scene "walkable."

## Saving changes

Edits are not auto-saved. The header surfaces a **Save** action that pushes your full Experience Settings JSON to the server.

<!-- TODO: media — /video/user-manual/supersplat/studio/save-flow.mp4 — dirty-state indicator → Save → viewer reload -->

A few things to know about the save flow:

- **Dirty-state tracking** — Studio knows when you have unsaved changes. If you try to navigate away with edits pending, you'll be warned before losing them.
- **Cache-busting on reload** — after a successful save, the viewer reloads with a cache-busted settings URL so it picks up your edits immediately. Visitors loading the scene page from then on see the new version.
- **No partial saves** — every save writes the full Experience Settings JSON, not a diff. If something looks wrong after a save, double-check the value in each panel rather than expecting changes to be merged.

## Schema versioning

The Experience Settings JSON has a version number; the current schema is **v2**. Older `v1` settings (from before Studio supported some features) are migrated to `v2` automatically when loaded. You don't need to do anything special — but if you self-host the [Viewer](/user-manual/supersplat/viewer/) and read settings.json directly, see the [Experience Settings](/user-manual/supersplat/studio/experience-settings) reference for the current schema.

## See also

- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — the JSON contract Studio writes and the Viewer reads
- [Viewer / embedding](/user-manual/supersplat/viewer/embedding) — how the published settings are consumed at runtime
- [Scene page](/user-manual/supersplat/scene-page) — what visitors see after Studio changes are saved
