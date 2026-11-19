# Publishing

Publishing puts a splat on [superspl.at](https://superspl.at). Every published splat gets its own [scene page](https://developer.playcanvas.com/user-manual/supersplat/viewing/scene-page.md) where visitors can view it, appears on your [Manage page](https://developer.playcanvas.com/user-manual/supersplat/publishing/manage.md), and can be opened in [Studio](https://developer.playcanvas.com/user-manual/supersplat/studio.md) to curate how visitors see it.

## Ways to publish

| Path | Use it when |
|------|-------------|
| [From the Editor](https://developer.playcanvas.com/user-manual/supersplat/publishing/editor.md) | The splat needs cleaning up, cropping, or a camera animation first. Choose **File > Publish** in the [Editor](https://developer.playcanvas.com/user-manual/supersplat/editor.md). |
| [Direct Upload](https://developer.playcanvas.com/user-manual/supersplat/publishing/upload.md) | The file is ready as it is. Use the orange **Upload Splat** button on the [superspl.at home page](https://superspl.at) or the Manage page. |
| [SuperSplat API](https://developer.playcanvas.com/user-manual/supersplat/developers/api-integrations.md) | A capture app, training pipeline, or script publishes for you. |

All three create the same kind of scene, which you then manage, curate, and share the same way.

## You need an account

Publishing needs a free PlayCanvas account, signed in at superspl.at. Browsing superspl.at and editing in the Editor don't. See [Account Creation](https://developer.playcanvas.com/user-manual/account-management/user-accounts/account-creation.md).

## How your splat is compressed

superspl.at compresses every published splat to [SOG](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/sog.md). By default, splats of 1 million Gaussians or more are published as Streamed SOG, which loads progressively from levels of detail, and splats of more than 40 million Gaussians must be. Compression takes a moment, or several minutes for a very large scene. [Streaming & Performance](https://developer.playcanvas.com/user-manual/supersplat/publishing/streaming.md) explains both forms and how to choose.

## Who can see it

New splats are **Unlisted**: anyone with the link can open the scene page, but the splat doesn't appear in [Explore](https://developer.playcanvas.com/user-manual/supersplat/viewing/explore.md), in searches, or on your [profile](https://developer.playcanvas.com/user-manual/supersplat/viewing/user-profile.md). To list it, set its **Visibility** to **Public** on the [Manage page](https://developer.playcanvas.com/user-manual/supersplat/publishing/manage.md#visibility-from-the-list).

Visitors can't download the source file until you turn on **Downloadable** and choose a [license](https://developer.playcanvas.com/user-manual/supersplat/publishing/manage.md#downloadable--license).

## Limits

Every account has a daily publishing allowance, measured in compressed output, which resets at 00:00 UTC. There is also a limit on how many scenes can be uploading or processing at once. When you reach either, the Editor's Publish dialog or the Upload dialog says so, and tells you when you can publish again.

Direct Upload also has a maximum file size for each format. See [Supported input formats](https://developer.playcanvas.com/user-manual/supersplat/publishing/upload.md#supported-input-formats). The API reports the same limits as error codes. See [API & Integrations](https://developer.playcanvas.com/user-manual/supersplat/developers/api-integrations.md#limits).

## In this section

- [Publishing from the Editor](https://developer.playcanvas.com/user-manual/supersplat/publishing/editor.md) — the Publish dialog, its options, and republishing to an existing scene
- [Direct Upload](https://developer.playcanvas.com/user-manual/supersplat/publishing/upload.md) — supported formats, levels of detail, and upload errors
- [Manage](https://developer.playcanvas.com/user-manual/supersplat/publishing/manage.md) — editing, sharing, and deleting your published splats
- [Streaming & Performance](https://developer.playcanvas.com/user-manual/supersplat/publishing/streaming.md) — SOG, Streamed SOG, and the viewer's Gaussian budget
