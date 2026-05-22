---
title: Cameras
description: "Define one or more starting cameras for a published splat — position, target, and field of view — in SuperSplat Studio."
---

The **Cameras** panel in [Studio](/user-manual/supersplat/studio/) defines one or more named cameras for your published splat. Each camera has an initial **position**, a **target** (the point the camera looks at), and a **field of view**. Visitors land on one of these cameras when they open your [scene page](/user-manual/supersplat/scene-page); [annotations](/user-manual/supersplat/studio/annotations) and [animation tracks](/user-manual/supersplat/studio/animations) can reference a camera by its place in the list.

{/* TODO: media — /img/user-manual/supersplat/studio/cameras-panel.png — the Cameras panel with a list of cameras */}

## The Cameras panel

The panel shows a list of cameras you've defined. Adding, removing, and reordering happens in this list; the right-hand inspector shows the inputs for the currently selected camera.

| Field | Description |
|-------|-------------|
| **Position** | World-space `[x, y, z]` of the camera. |
| **Target** | World-space `[x, y, z]` the camera looks at. |
| **Field of View** | Vertical FOV in degrees. |

## Defaults

A fresh scene starts with a single camera placed at `[0, 0, 5]`, looking at the world origin `[0, 0, 0]`, with a **60°** field of view. Tweak it to frame your scene the way you want visitors to see it on first load.

## How cameras are used

- **Initial framing** — the first camera in the list is the default starting view when a visitor opens the scene page (unless an [animation track](/user-manual/supersplat/studio/animations) is set to auto-play, or [annotations](/user-manual/supersplat/studio/annotations) drive the start pose).
- **Annotation poses** — each [annotation](/user-manual/supersplat/studio/annotations) can reference a camera so that selecting the annotation moves the visitor's view to that frame.
- **Animation start/end** — [animation tracks](/user-manual/supersplat/studio/animations) define their own keyframes, but you can use a camera as a setup pose for the track.

## See also

- [Animations](/user-manual/supersplat/studio/animations) — keyframed camera motion
- [Annotations](/user-manual/supersplat/studio/annotations) — 3D-positioned hotspots that can adopt a camera pose
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — the JSON contract that stores the camera list
