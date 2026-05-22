---
title: Publishing
description: "Publish a splat from the SuperSplat Editor to superspl.at so it lands on your Manage page and can be opened in Studio."
---

Publishing from the SuperSplat Editor uploads your edited splat to [superspl.at](https://superspl.at), where it lands on your [Manage page](/user-manual/supersplat/manage), gets a public [scene page](/user-manual/supersplat/scene-page), and can be opened in [Studio](/user-manual/supersplat/studio/) to curate the viewing experience (cameras, animations, annotations, post effects, skybox, collision).

:::tip Two ways to publish

You can also publish without using the Editor. Hit the orange **Upload Splat** button on the [superspl.at home page](https://superspl.at) (or use the [Direct Upload](/user-manual/supersplat/upload) flow) to publish a ready-made splat file straight to your Manage page. Both paths land in the same place and share the same downstream tooling.

:::

To self-host your own copy of the published viewer instead of (or in addition to) publishing to superspl.at, see [Self-Hosting the Viewer](/user-manual/supersplat/viewer/self-hosting).

![SuperSplat Website](/img/user-manual/supersplat/editor/supersplat-website.png)

## Ensuring you are Logged In

Publishing splats requires you to be logged in.

Before you begin, you must have [created a PlayCanvas account](/user-manual/account-management/user-accounts/account-creation) and be logged in at [playcanvas.com](https://playcanvas.com). You must then also log in at [superspl.at](https://superspl.at) (via the `Login` button in the top right). Verify you are logged in by checking that your account avatar is displayed in the top right of the page on [superspl.at](https://superspl.at).

## Publishing your Splats

To publish your splat:

1. Open the `File` menu.
2. Select `Publish`.
3. Fill out the options in the Publish dialog:

   ![Publish Settings](/img/user-manual/supersplat/editor/publish-settings.png)

   | Option | Description |
   |--------|-------------|
   | **Publish to** | Select where to publish your scene. Choose **New Scene** (default) to publish a brand new scene on a new URL, or select one of your existing published scenes from the dropdown to overwrite it |
   | **Title** | A short title that will appear below your splat's thumbnail once it is published |
   | **Description** | A textual description of your splat that will be displayed under the splat on its viewer page |
   | **Listed** | If checked, the splat will be returned in searches on the SuperSplat website. If unchecked, the splat will only be discoverable by anyone who has the link |
   | **Start Position** | The starting position to use for the viewer's camera:<br/>• **Default**: The viewer does its best to pick a suitable start point<br/>• **Current Viewport**: Use the current camera position as set in the SuperSplat Editor's viewport<br/>• **1st Camera Frame**: Use the first camera's position as defined by the first frame of the Timeline |
   | **Animation** | The animation to apply to the viewer's camera:<br/>• **None**: No animation<br/>• **Track**: Animate the camera using keyframes set on the SuperSplat Editor's Timeline |
   | **Background** | The background color of the viewer |
   | **Field of View** | The vertical field of view of the viewer's camera in degrees |
   | **SH Bands** | The number of spherical harmonics bands to be written out to the published compressed PLY file |

4. Select `Publish`.

:::note

It may take several minutes to compress your splat to SOG format during the publishing process, so be patient! ⏳

:::

Once the publish process is complete, a modal dialog will show with the URL of your published splat. Copy it and share it with whoever you like.

## What's next?

- Your new splat now lives on the [Manage page](/user-manual/supersplat/manage) where you can edit its title, description, visibility, and downloadable license.
- Open it in [Studio](/user-manual/supersplat/studio/) to add cameras, camera animations, annotations, post effects, a skybox, or collision geometry.
- Visitors browse to its [public scene page](/user-manual/supersplat/scene-page) to view, share, embed, like, and (if you allow it) download.
