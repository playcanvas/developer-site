---
title: Annotations
description: "Add 3D-positioned text hotspots to a published splat — visitors can click through them to navigate the scene from one curated viewpoint to the next."
---

**Annotations** are 3D-positioned text hotspots you place on your published splat in [Studio](/user-manual/supersplat/studio/). On the viewer side, each annotation shows up as a numbered hotspot visitors can click; clicking it moves the camera to a curated pose and surfaces a title and body of text. Use them to call out features, narrate a story, or give a self-guided tour of the scene.

<!-- TODO: media — /img/user-manual/supersplat/studio/annotations-panel.png — the Annotations panel with a list of annotations and a selected one in the viewport -->

## Annotation properties

Each annotation has:

| Field | Description |
|-------|-------------|
| **Position** | World-space `[x, y, z]` where the hotspot marker sits in the scene. |
| **Title** | Short heading shown when the annotation is selected. |
| **Text** | Longer body of text, shown as plain text in the viewer. |
| **Camera** | The [camera pose](/user-manual/supersplat/studio/cameras) the viewer animates to when this annotation is selected. |
| **Extras** | Free-form metadata you can attach for custom integrations or future Studio features. |

## Authoring annotations

The general flow is:

1. Frame the camera the way you want a visitor to see this part of the scene.
2. Add an annotation; Studio places its hotspot in the world and captures the current camera as the annotation's pose.
3. Edit the title and body text.
4. Repeat for as many points of interest as you'd like.

You can reorder annotations in the list panel — the order controls how visitors step through them on the viewer, and the number each hotspot shows.

The [Experience Settings](/user-manual/supersplat/studio/experience-settings#authoring-limits) authoring limits allow up to 50 annotations per scene, with titles of up to 60 characters and text of up to 280.

<!-- TODO: media — /video/user-manual/supersplat/studio/annotation-flythrough.mp4 — visitor navigating between hotspots -->

## How visitors use them

On the [scene page](/user-manual/supersplat/scene-page), the viewer shows each annotation as a numbered hotspot:

- **Selecting a hotspot** eases the camera to the annotation's pose, and its title and text appear in a panel beside the hotspot as the camera arrives. An annotation with neither title nor text shows no panel. Visitors can orbit from there, pivoting near the annotated point, and the panel stays open.
- **The navigator**, shown when a scene has two or more annotations, displays the current annotation's number and title, with arrows to step to the previous and next one in list order.
- **Clicking elsewhere** in the viewer deselects the annotation and returns to free navigation. The navigator keeps the last annotation, greyed out, and clicking it selects it again.
- **Hotspots hidden** behind part of the scene are faded once the camera stops moving.
- **Show Annotations**, in the viewer's settings panel, lets visitors hide the hotspots and the navigator.

See [Viewer Controls](/user-manual/supersplat/viewer/controls#annotations) for the full visitor experience.

:::note

The settings format accepts `annotation` as a scene's start mode, but the viewer doesn't act on it: a scene always starts from its [starting camera](/user-manual/supersplat/studio/cameras) or its camera animation.

:::

## See also

- [Cameras](/user-manual/supersplat/studio/cameras) — the camera poses annotations reference
- [Camera animation (Timeline)](/user-manual/supersplat/editor/timeline) — for cinematic flythroughs that don't need visitor interaction
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — the JSON contract that stores annotations
