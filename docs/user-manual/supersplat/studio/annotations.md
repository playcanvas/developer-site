---
title: Annotations
description: "Add 3D-positioned text hotspots to a published splat — visitors can click through them to navigate the scene from one curated viewpoint to the next."
---

**Annotations** are 3D-positioned text hotspots you place on your published splat in [Studio](/user-manual/supersplat/studio/). On the viewer side, each annotation shows up as a marker visitors can click; clicking it fades the camera to a curated pose and surfaces a title and body of text. Use them to call out features, narrate a story, or give a self-guided tour of the scene.

{/* TODO: media — /img/user-manual/supersplat/studio/annotations-panel.png — the Annotations panel with a list of annotations and a selected one in the viewport */}

## Annotation properties

Each annotation has:

| Field | Description |
|-------|-------------|
| **Position** | World-space `[x, y, z]` where the hotspot marker sits in the scene. |
| **Title** | Short heading shown when the annotation is selected. |
| **Text** | Longer body of text. HTML is allowed but sanitized — no scripts or unsafe attributes. |
| **Camera** | The [camera pose](/user-manual/supersplat/studio/cameras) the viewer animates to when this annotation is selected. |
| **Extras** | Free-form metadata you can attach for custom integrations or future Studio features. |

## Authoring annotations

The general flow is:

1. Frame the camera the way you want a visitor to see this part of the scene.
2. Add an annotation; Studio places its hotspot in the world and captures the current camera as the annotation's pose.
3. Edit the title and body text.
4. Repeat for as many points of interest as you'd like.

You can reorder annotations in the list panel — the order controls how visitors step through them on the viewer.

{/* TODO: media — /video/user-manual/supersplat/studio/annotation-flythrough.mp4 — visitor navigating between hotspots */}

## How visitors use them

On the [scene page](/user-manual/supersplat/scene-page), the viewer shows each annotation as a marker. A floating navigator UI lets visitors step **Previous** / **Next** through the list; selecting an annotation animates the camera to its pose and surfaces the title and body text. Visitors can dismiss the annotation overlay to return to free-look navigation at any time.

## Tip: annotations as a starting point

Set the scene's **start mode** to `annotation` if you'd like the viewer to land on the first annotation when a visitor opens the scene page — useful for a guided-tour-by-default experience.

## See also

- [Cameras](/user-manual/supersplat/studio/cameras) — the camera poses annotations reference
- [Animations](/user-manual/supersplat/studio/animations) — for cinematic flythroughs that don't need visitor interaction
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — the JSON contract that stores annotations
