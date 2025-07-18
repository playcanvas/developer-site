---
title: Publishing
sidebar_position: 11
---

The SuperSplat Editor allows you to publish your splat scenes to the web at [https://superspl.at/](https://superspl.at/). Before you begin, make sure you have created a PlayCanvas account and are currently logged in. To publish:

1. Open the `File` menu.
2. Select `Publish`.
3. Fill out the options in the Publish dialog:
   * _Title_: A short title that will appear below your splat's thumbnail once it is published.
   * _Description_: A textual description of your splat that will be displayed under the splat on it viewer page.
   * _Listed_: If checked, the splat will be returned in searches on the SuperSplat website. If unchecked, the splat will be discoverable by anyone who has the link.
   * _Start Position_: The starting position to use for the viewer's camera. Can be:
      * _Default_: The viewer does it's best to pick a suitable start point.
      * _Current Viewport_: Use the current camera position as set in the SuperSplat Editor's viewport.
      * _1st Camera Frame_: Use the first camera's position as defined by the first frame of the Timeline.
   * _Animation_: The animation to apply to the viewer's camera. Can be:
      * _None_: No animation
      * _Track_: Animate the camera using keyframe set on the SuperSplat Editor's Timeline.
   * _Background_: The background color of the viewer.
   * _Field of View_: The vertical field of view of the viewer's camera in degrees.
   * _SH Bands_: The number of spherical harmonics bands to be written out to the published compressed PLY file.
4. Select `Publish`.

Once the publish process is complete, a model dialog will show with the URL of your published splat. Copy it and share it with whoever you like.