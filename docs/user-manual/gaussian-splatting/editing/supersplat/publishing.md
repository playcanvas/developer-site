---
title: Publishing
---

The SuperSplat Editor allows you to publish your splat scenes to the web at [https://superspl.at/](https://superspl.at/).

![SuperSplat Website](/img/user-manual/gaussian-splatting/editing/supersplat/supersplat-website.png)

## Ensuring you are Logged In

Publishing splats requires you to be logged in.

Before you begin, you must have [created a PlayCanvas account](/user-manual/account-management/user-accounts/account-creation) and be logged in at [playcanvas.com](https://playcanvas.com). You must then also log in at [superspl.at](https://superspl.at) (via the `Login` button in the top right). Verify you are logged in by checking that your account avatar is displayed in the top right of the page on [superspl.at](https://superspl.at).

## Publishing your Splats

To publish your splat:

1. Open the `File` menu.
2. Select `Publish`.
3. Fill out the options in the Publish dialog:

   | Option | Description |
   |--------|-------------|
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

It may take a minute or two to generate the thumbnail for your splat so be patient! ⏳

:::

Once the publish process is complete, a modal dialog will show with the URL of your published splat. Copy it and share it with whoever you like.

## Managing your Published Splats

After publishing splats to [superspl.at](https://superspl.at), you can manage them by visiting your [Manage page](https://superspl.at/manage). From here, you can perform the following actions on each published splat:

| Action | Description |
|--------|-------------|
| **Edit Title** | Update the splat's main title |
| **Edit Description** | Update the description shown on the splat's viewer page |
| **List/Unlist** | Toggle whether the splat appears in public searches on the SuperSplat website |
| **Delete** | Permanently remove the splat from superspl.at (this cannot be undone) |
