---
title: Animations
description: "Author keyframed camera animations that auto-play on a published splat, including loop behavior and interpolation in SuperSplat Studio."
---

The **Animations** section in [Studio](/user-manual/supersplat/studio/) lets you author one or more **animation tracks** that drive the viewer's camera through your scene. A track is a keyframed path — at each keyframe, the camera's **position**, **target**, and **field of view** are sampled. The viewer interpolates between keyframes at runtime.

A track can be set to auto-play when a visitor opens the [scene page](/user-manual/supersplat/scene-page), turning your splat into a cinematic flythrough.

<!-- TODO: media — /video/user-manual/supersplat/studio/animation-playback.mp4 — camera track playing in the viewer -->

## Track properties

Each track has the following properties:

| Field | Description |
|-------|-------------|
| **Name** | A display label for the track in the Studio UI. |
| **Duration** | Length of the track in seconds. |
| **Frame rate** | Frames per second the keyframe times are expressed in. |
| **Loop mode** | `none` — play once and stop. `repeat` — loop seamlessly from end back to start. `pingpong` — play forward, then reverse, repeating. |
| **Interpolation** | `step` — snap from keyframe to keyframe. `spline` — smooth curve between keyframes. |
| **Smoothness** | A `0–1` blend applied to the spline interpolation. `0` is linear, `1` is maximally smooth. |
| **Keyframes** | A list of `(time, { position, target, fov })` entries that define the animated camera path. |

## Authoring a track

The general flow is:

1. Frame the camera in the viewport at the time-zero pose you want.
2. Add a keyframe at `time = 0`.
3. Scrub forward, reframe the camera, add the next keyframe — and so on.
4. Pick a **loop mode** and an **interpolation** that matches the mood of the track.

The keyframe list stores three parallel arrays (`position`, `target`, `fov`) and a `times` array; you don't normally edit these by hand, but if you're consuming the saved JSON externally see [Experience Settings](/user-manual/supersplat/studio/experience-settings) for the canonical shape.

## Auto-play on load

Set the scene's **start mode** to `animTrack` to make the animation track play automatically when a visitor opens the scene page. Combined with a seamless `repeat` loop, this gives the impression of a hands-off showreel. When more than one track is defined, the first track in the list is the one that plays.

## Tip: smooth loops

For a track that loops cleanly (`loopMode = repeat`), avoid placing keyframes on both the very first frame *and* the very last frame at the same pose — the spline will be flat there and the loop will appear to "snap" rather than continue smoothly. Instead, leave a small gap before the end of the track and let the interpolation carry the camera back to the start pose.

## See also

- [Cameras](/user-manual/supersplat/studio/cameras) — the initial cameras you can frame and reference
- [Annotations](/user-manual/supersplat/studio/annotations) — annotations can pause a playing track when selected
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — the JSON contract that stores animation tracks
