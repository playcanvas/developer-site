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
    <iframe src="https://www.youtube.com/embed/ohEANEGjxJ0" title="SuperSplat in 60 Seconds: Edit, Publish and Share 3D Gaussian Splats" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy"></iframe>
</div>

Capture, clean up, publish, polish in Studio, and share: the whole workflow in one minute.

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
      <div className="card__body"><p>Make it shine in Studio: frame the opening camera, keyframe a flythrough, add annotated hotspots, dial in bloom and color grading, set a skybox, or make the scene walkable with collision.</p></div>
      <div className="card__footer">Studio →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/supersplat/developers/viewer/">
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

You can skip the Editor. Hit the orange **Upload Splat** button on the [superspl.at home page](https://superspl.at) or use [Direct Upload](/user-manual/supersplat/publishing/upload/) to publish a ready-made file straight to your [Manage page](/user-manual/supersplat/publishing/manage/).

:::

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
| **[Direct Upload](/user-manual/supersplat/publishing/upload/)** | Publish an already-clean splat file without opening the Editor. | The orange **Upload Splat** button on [superspl.at](https://superspl.at) |
| **[Manage](/user-manual/supersplat/publishing/manage/)** | Your splat library: edit title and description, change visibility, choose downloadable + license, delete, open in Studio. | [superspl.at/manage](https://superspl.at/manage) |
| **[Studio](studio/)** | Curate the published viewing experience: look and tone, skybox, cameras, camera animation, collision, post effects, annotations. | `superspl.at/scene/<hash>/studio` |
| **[Scene page](/user-manual/supersplat/viewing/scene-page/)** | Public page for a published splat: embedded viewer, share, embed, download, comments, likes, suggested splats. | `superspl.at/scene/<hash>` |
| **[Explore](/user-manual/supersplat/viewing/explore/)** | Public gallery with sort, time, feature filters, and search. The superspl.at home page. | [superspl.at](https://superspl.at) |
| **[User Profile](/user-manual/supersplat/viewing/user-profile/)** | A creator's public page: avatar, bio, social links, their published splats. | `superspl.at/user/<username>` |
| **[Viewer](/user-manual/supersplat/developers/viewer/)** | The open-source web viewer that powers scene pages and Editor HTML exports. Embed it in your own page or self-host it. | npm `@playcanvas/supersplat-viewer`, [GitHub](https://github.com/playcanvas/supersplat-viewer) |
| **[Convert](convert)** | Web frontend to the [splat-transform](/user-manual/splat-transform/) CLI: convert formats, transform, and filter in the browser. | [superspl.at/convert](https://superspl.at/convert) |
| **[API & Integrations](/user-manual/supersplat/developers/api-integrations/)** | Publish and inspect scenes from capture tools, training pipelines, and custom applications. | [API reference](/user-manual/api/supersplat/) |

## Good to know

- **Everything runs in your browser.** The Editor loads splats locally and nothing is uploaded until you choose to publish. It needs a [browser with WebGPU](/user-manual/supersplat/editor/#system-requirements).
- **Browsing is anonymous.** A free PlayCanvas account is needed to publish, like, or comment. See [Account Creation](/user-manual/account-management/user-accounts/account-creation).
- **Open source at the core.** The [Editor](https://github.com/playcanvas/supersplat), the [Viewer](https://github.com/playcanvas/supersplat-viewer), and [splat-transform](https://github.com/playcanvas/splat-transform) (which powers Convert) are MIT-licensed. Studio, Manage, Explore, scene pages, and the publish API are hosted by PlayCanvas on superspl.at.
- **Publishing optimizes for you.** Every published splat is compressed to SOG, and splats over one million Gaussians are streamed progressively so they load fast on any device. See [Streaming & Performance](/user-manual/supersplat/publishing/streaming/).
- **You can host it yourself.** Export a single-file HTML viewer from the Editor or use the Viewer npm package. See [Self-Hosting the Viewer](/user-manual/supersplat/developers/self-hosting/).

## Stay in the loop

- [SuperSplat news on the PlayCanvas blog](https://blog.playcanvas.com/tags/supersplat/)
- [Discord](https://discord.gg/qcydPEtn65) for questions and sharing your splats
- [GitHub](https://github.com/playcanvas/supersplat) for issues and contributions
