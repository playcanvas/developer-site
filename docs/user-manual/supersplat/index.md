---
title: SuperSplat
description: "SuperSplat turns a raw 3D Gaussian Splat capture into a polished, shareable scene: clean it in the browser-based Editor, publish it to superspl.at, curate it in Studio, and embed it anywhere."
---

import Link from '@docusaurus/Link';

[SuperSplat](https://superspl.at) turns a raw 3D Gaussian Splat capture into a polished, shareable 3D scene. Clean it up in your browser, publish it with one click, and let anyone explore it on any device.

<div className="iframe-container">
    <iframe src="https://superspl.at/s?id=3ae6a716" title="Honeybee — a Gaussian splat published and curated on superspl.at" allow="fullscreen; xr-spatial-tracking" allowFullScreen loading="lazy"></iframe>
</div>

Drag to orbit, scroll to zoom, and click the numbered hotspots. This honeybee by [danylyon](https://superspl.at/user/danylyon) was cleaned in the [Editor](editor/), published to [superspl.at](https://superspl.at), and annotated in [Studio](studio/). Everything on this page is about doing the same with your own captures.

## SuperSplat in 60 seconds

<div className="iframe-container">
    <iframe src="https://www.youtube.com/embed/7B0KdoJCUK8" title="SuperSplat: Edit, Publish and Share 3D Gaussian Splats" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy"></iframe>
</div>

Browse, view, clean up, publish, curate, convert, and share: the whole platform in under a minute.

## Where do you want to start?

<div className="row path-cards">
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/supersplat/getting-started/">
      <div className="card__header"><h3>🧹 I have a splat file</h3></div>
      <div className="card__body"><p>Clean up floaters, crop the scene, and publish it from the browser-based Editor. Follow the quick start and you'll have a shareable scene page in about ten minutes.</p></div>
      <div className="card__footer">Getting Started →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/supersplat/studio/">
      <div className="card__header"><h3>🎬 I've published a splat</h3></div>
      <div className="card__body"><p>Make it shine in Studio: frame the opening camera, add annotated hotspots, dial in bloom and color grading, set a skybox, or make the scene walkable with collision.</p></div>
      <div className="card__footer">Studio →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/supersplat/viewer/">
      <div className="card__header"><h3>🧩 I want splats on my own site or app</h3></div>
      <div className="card__body"><p>Embed the open-source Viewer with an iframe, export a single-file HTML viewer to host yourself, or publish from your own pipeline with the API.</p></div>
      <div className="card__footer">Viewer, embedding and API →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/gaussian-splatting/creating/">
      <div className="card__header"><h3>📷 I don't have a splat yet</h3></div>
      <div className="card__body"><p>Learn how a splat is captured and trained, and pick a tool that fits you, from one-tap phone apps to desktop trainers. Then come back here with your first PLY.</p></div>
      <div className="card__footer">Creating Splats →</div>
    </Link>
  </div>
</div>

:::tip Already have a clean splat?

You can skip the Editor. Hit the orange **Upload Splat** button on the [superspl.at home page](https://superspl.at) or use [Direct Upload](upload) to publish a ready-made file straight to your [Manage page](manage).

:::

## Your first splat in 10 minutes

1. **Load.** Open [superspl.at/editor](https://superspl.at/editor) and drop in your splat file. See [Import and Export](editor/import-export) for the supported formats.
2. **Clean.** Select stray floaters with the box, brush, or sphere tools and press <kbd>Delete</kbd>. See [Selection and Cleanup](editor/editing-splats).
3. **Publish.** Choose **File → Publish**. Your splat lands on your [Manage page](manage) with its own [scene page](scene-page). See [Publishing](editor/publishing).
4. **Curate.** Open it in [Studio](studio/) to frame the camera, add annotations, and switch on post effects.
5. **Share.** Copy the scene link, grab the embed snippet, or set it to **Public** so it appears in [Explore](explore).

The [Getting Started](getting-started) guide walks through each step with screenshots.

## How the pieces fit together

Some parts of SuperSplat you use as a creator, some your visitors use to view what you've made, and some are general-purpose utilities.

```mermaid
flowchart TB
    subgraph you [You: create and publish]
        direction LR
        raw([Splat file]) --> editor([Editor])
        raw --> upload([Direct Upload])
        editor --> manage([Manage])
        upload --> manage
        manage <--> studio([Studio])
    end

    manage --> scene(["Scene page (hosts Viewer)"])

    subgraph visitors [Visitors: discover and view]
        direction LR
        explore([Explore]) <--> scene
        profile([User Profile]) <--> scene
    end
```

| Surface | What it is | Where it lives |
|---------|------------|----------------|
| **[Editor](editor/)** | Browser-based editor for cleaning, cropping, color-adjusting, and animating splats. Publishes to superspl.at. | [superspl.at/editor](https://superspl.at/editor) |
| **[Direct Upload](upload)** | Publish an already-clean splat file without opening the Editor. | The orange **Upload Splat** button on [superspl.at](https://superspl.at) |
| **[Manage](manage)** | Your splat library: edit title and description, change visibility, choose downloadable + license, delete, open in Studio. | [superspl.at/manage](https://superspl.at/manage) |
| **[Studio](studio/)** | Curate the published viewing experience: cameras, annotations, post effects, skybox, collision. | `superspl.at/scene/<hash>/studio` |
| **[Scene page](scene-page)** | Public page for a published splat: embedded viewer, share, embed, download, comments, likes, suggested splats. | `superspl.at/scene/<hash>` |
| **[Explore](explore)** | Public gallery with sort, time, feature filters, and search. The superspl.at home page. | [superspl.at](https://superspl.at) |
| **[User Profile](user-profile)** | A creator's public page: avatar, bio, social links, their published splats. | `superspl.at/user/<username>` |
| **[Viewer](viewer/)** | The open-source web viewer that powers scene pages and Editor HTML exports. Embed it in your own page or self-host it. | npm `@playcanvas/supersplat-viewer`, [GitHub](https://github.com/playcanvas/supersplat-viewer) |
| **[Convert](convert)** | Web frontend to the [splat-transform](/user-manual/splat-transform/) CLI: convert formats, transform, and filter in the browser. | [superspl.at/convert](https://superspl.at/convert) |
| **[API & Integrations](api-integrations)** | Publish and inspect scenes from capture tools, training pipelines, and custom applications. | [API reference](/user-manual/api/supersplat/) |

## Good to know

- **Everything runs in your browser.** The Editor loads splats locally and nothing is uploaded until you choose to publish.
- **Browsing is anonymous.** A free PlayCanvas account is needed to publish, like, or comment. See [Account Creation](/user-manual/account-management/user-accounts/account-creation).
- **Open source at the core.** The [Editor](https://github.com/playcanvas/supersplat), the [Viewer](https://github.com/playcanvas/supersplat-viewer), and [splat-transform](https://github.com/playcanvas/splat-transform) (which powers Convert) are MIT-licensed. Studio, Manage, Explore, scene pages, and the publish API are hosted by PlayCanvas on superspl.at.
- **Publishing optimizes for you.** Every published splat is compressed to SOG, and splats over one million Gaussians are streamed progressively so they load fast on any device. See [Streaming & Performance](streaming).
- **You can host it yourself.** Export a single-file HTML viewer from the Editor or use the Viewer npm package. See [Self-Hosting the Viewer](viewer/self-hosting).

## Stay in the loop

- [SuperSplat news on the PlayCanvas blog](https://blog.playcanvas.com/tags/supersplat/)
- [Discord](https://discord.gg/RSaMRzg) for questions and sharing your splats
- [GitHub](https://github.com/playcanvas/supersplat) for issues and contributions
