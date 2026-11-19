---
title: Publishing
description: "Publish a splat to superspl.at from the Editor, by direct upload, or through the API: what you need, how your splat is compressed, who can see it, and the limits."
---

Publishing puts a splat on [superspl.at](https://superspl.at). Every published splat gets its own [scene page](/user-manual/supersplat/viewing/scene-page) where visitors can view it, appears on your [Manage page](/user-manual/supersplat/publishing/manage), and can be opened in [Studio](/user-manual/supersplat/studio/) to curate how visitors see it.

## Ways to publish

| Path | Use it when |
|------|-------------|
| [From the Editor](/user-manual/supersplat/publishing/editor) | The splat needs cleaning up, cropping, or a camera animation first. Choose **File > Publish** in the [Editor](/user-manual/supersplat/editor/). |
| [Direct Upload](/user-manual/supersplat/publishing/upload) | The file is ready as it is. Use the orange **Upload Splat** button on the [superspl.at home page](https://superspl.at) or the Manage page. |
| [SuperSplat API](/user-manual/supersplat/developers/api-integrations) | A capture app, training pipeline, or script publishes for you. |

All three create the same kind of scene, which you then manage, curate, and share the same way.

## You need an account {#account}

Publishing needs a free PlayCanvas account, signed in at superspl.at. Browsing superspl.at and editing in the Editor don't. See [Account Creation](/user-manual/account-management/user-accounts/account-creation).

## How your splat is compressed {#compression}

superspl.at compresses every published splat to [SOG](/user-manual/gaussian-splatting/formats/sog). By default, splats of 1 million Gaussians or more are published as Streamed SOG, which loads progressively from levels of detail, and splats of more than 40 million Gaussians must be. Compression takes a moment, or several minutes for a very large scene. [Streaming & Performance](/user-manual/supersplat/publishing/streaming) explains both forms and how to choose.

## Who can see it {#visibility}

New splats are **Unlisted**: anyone with the link can open the scene page, but the splat doesn't appear in [Explore](/user-manual/supersplat/viewing/explore), in searches, or on your [profile](/user-manual/supersplat/viewing/user-profile). To list it, set its **Visibility** to **Public** on the [Manage page](/user-manual/supersplat/publishing/manage#visibility-from-the-list).

Visitors can't download the source file until you turn on **Downloadable** and choose a [license](/user-manual/supersplat/publishing/manage#downloadable--license).

## Limits {#limits}

Every account has a daily publishing allowance, measured in compressed output, which resets at 00:00 UTC. There is also a limit on how many scenes can be uploading or processing at once. When you reach either, the Editor's Publish dialog or the Upload dialog says so, and tells you when you can publish again.

Direct Upload also has a maximum file size for each format. See [Supported input formats](/user-manual/supersplat/publishing/upload#supported-input-formats). The API reports the same limits as error codes. See [API & Integrations](/user-manual/supersplat/developers/api-integrations#limits).

## In this section

- [Publishing from the Editor](/user-manual/supersplat/publishing/editor) — the Publish dialog, its options, and republishing to an existing scene
- [Direct Upload](/user-manual/supersplat/publishing/upload) — supported formats, levels of detail, and upload errors
- [Manage](/user-manual/supersplat/publishing/manage) — editing, sharing, and deleting your published splats
- [Streaming & Performance](/user-manual/supersplat/publishing/streaming) — SOG, Streamed SOG, and the viewer's Gaussian budget
