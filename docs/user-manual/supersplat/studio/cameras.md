---
title: Cameras
description: "Set the starting camera for a published splat — frame its position and target in the viewport and set the field of view — in SuperSplat Studio."
---

The **Cameras** section — in the **Scene** tab of [Studio](/user-manual/supersplat/studio/)'s left panel — defines the **starting camera** for your published splat: the view a visitor lands on when they open your [scene page](/user-manual/supersplat/scene-page) (unless a [camera animation track](/user-manual/supersplat/editor/timeline) or [annotation](/user-manual/supersplat/studio/annotations) drives the start pose instead). The camera has a **position**, a **target** (the point it looks at), and a **field of view**.

:::note

Studio currently supports a single camera. Support for multiple cameras is coming.

:::

<!-- TODO: media — /img/user-manual/supersplat/studio/cameras-panel.png — the Cameras panel with a list of cameras -->

## Setting the camera

The camera is listed as **Camera 1** with two actions:

- **Go to** — flies the viewport to the camera's saved pose.
- **Edit** — enters edit mode. While editing, orbit, pan, and zoom the viewport to frame the shot; the camera's **position** and **target** are captured from the current view. Click **Edit** again to exit.

You set the camera's position and target by framing it in the viewport rather than typing coordinates — there are no numeric position/target inputs.

## Lens (field of view)

Below the camera list, the **Lens** control sets the **field of view** with a slider and a numeric input (in degrees). This is a single, global setting — it applies to the start camera and all annotation cameras. The default is **75°**.

## Defaults

A fresh scene starts with a camera using sensible defaults — for environment-style scenes, position `[0, 2, 0]`, target `[2, 2, 0]`, **75°** field of view; for object-style scenes, position `[2, 2, -2]`, target `[0, 0, 0]`, **75°** field of view. Frame the viewport and use **Edit** to capture the pose — and adjust the **Lens** field of view — so your scene looks the way you want visitors to see it on first load.

## How cameras are used

- **Initial framing** — the first camera in the list is the default starting view when a visitor opens the scene page (`startMode: 'default'`). A [camera animation track](/user-manual/supersplat/editor/timeline) or an [annotation](/user-manual/supersplat/studio/annotations) can override this via the scene's start mode.
- **Annotation poses** — each [annotation](/user-manual/supersplat/studio/annotations) embeds its own camera pose that the viewer animates to when the annotation is selected. The annotation's pose is independent of the entries in the Cameras list.

## See also

- [Camera animation (Timeline)](/user-manual/supersplat/editor/timeline) — keyframed camera motion, authored in the SuperSplat Editor
- [Annotations](/user-manual/supersplat/studio/annotations) — 3D-positioned hotspots that can adopt a camera pose
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — the JSON contract that stores the camera list
