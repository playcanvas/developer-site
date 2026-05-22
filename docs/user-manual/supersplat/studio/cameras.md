---
title: Cameras
description: "Define one or more starting cameras for a published splat — position, target, and field of view — in SuperSplat Studio."
---

The **Cameras** panel in [Studio](/user-manual/supersplat/studio/) defines one or more cameras for your published splat. Each camera has an initial **position**, a **target** (the point the camera looks at), and a **field of view**. Visitors land on the **first** camera in the list when they open your [scene page](/user-manual/supersplat/scene-page) (unless an [animation track](/user-manual/supersplat/studio/animations) or [annotation](/user-manual/supersplat/studio/annotations) drives the start pose instead).

<!-- TODO: media — /img/user-manual/supersplat/studio/cameras-panel.png — the Cameras panel with a list of cameras -->

## The Cameras panel

The panel shows a list of cameras you've defined. Adding, removing, and reordering happens in this list; the right-hand inspector shows the inputs for the currently selected camera.

| Field | Description |
|-------|-------------|
| **Position** | World-space `[x, y, z]` of the camera. |
| **Target** | World-space `[x, y, z]` the camera looks at. |
| **Field of View** | Vertical FOV in degrees. |

## Defaults

A fresh scene starts with a single camera using sensible defaults — for environment-style scenes the default is position `[0, 2, 0]`, target `[2, 2, 0]`, **75°** field of view; for object-style scenes the default is position `[2, 2, -2]`, target `[0, 0, 0]`, **75°** field of view. Tweak the values to frame your scene the way you want visitors to see it on first load.

## How cameras are used

- **Initial framing** — the first camera in the list is the default starting view when a visitor opens the scene page (`startMode: 'default'`). [Animation tracks](/user-manual/supersplat/studio/animations) and [annotations](/user-manual/supersplat/studio/annotations) can override this via the scene's start mode.
- **Annotation poses** — each [annotation](/user-manual/supersplat/studio/annotations) embeds its own camera pose that the viewer animates to when the annotation is selected. The annotation's pose is independent of the entries in the Cameras list.

## See also

- [Animations](/user-manual/supersplat/studio/animations) — keyframed camera motion
- [Annotations](/user-manual/supersplat/studio/annotations) — 3D-positioned hotspots that can adopt a camera pose
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — the JSON contract that stores the camera list
