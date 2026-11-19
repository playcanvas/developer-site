---
title: Camera Animation
description: "Keyframe a camera flythrough for a published splat on SuperSplat Studio's timeline, and choose whether it plays when the scene opens."
---

A **camera animation** moves the camera along a keyframed path, from a gentle turntable around an object to a full flythrough of a captured space. In [Studio](/user-manual/supersplat/studio/) you author it on the **Timeline** panel and control it from the **Animation** section of the **Scene** tab. Visitors watch it on the [scene page](/user-manual/supersplat/scene-page), and can pause it or take over the camera at any time.

A scene has one camera animation. If you published the splat from the Editor with an animation from its [Timeline](/user-manual/supersplat/editor/timeline), Studio opens with that animation, ready to edit.

<!-- TODO: media — /img/user-manual/supersplat/studio/timeline-panel.png — the Studio timeline panel with several keyframes -->

## The timeline panel

Click **Timeline** in the header, or press <kbd>T</kbd>, to show or hide the panel along the bottom of Studio.

| Control | What it does |
|---------|--------------|
| **Previous keyframe** / **Next keyframe** | Jump the playhead to the neighboring keyframe. |
| **Step back one frame** / **Step forward one frame** | Move the playhead one frame. |
| **Play** / **Pause** | Play the animation in the viewport (<kbd>Space</kbd>). Unavailable in [camera edit mode](/user-manual/supersplat/studio/cameras#edit-camera-mode). |
| **Add keyframe at playhead** | Store the viewport camera as a keyframe at the playhead (<kbd>Enter</kbd>). |
| **Delete selected keyframes** | Remove the selected keyframes. The count of selected keyframes is shown beside it. |
| Frame readout | The playhead's frame and the total number of frames. |
| **Duration** | Length of the animation, in seconds (0.1 to 600). |
| **FPS** | Frames per second of the timeline (1 to 120). The animation has **Duration** × **FPS** frames. |
| **Loop mode** | **Play once**, **Loop** (the default) or **Ping-pong**: play forwards, then backwards, repeatedly. |
| **Smooth** | Smoothness of the path between keyframes, from `0` (straight lines) to `1` (the default, smooth curves). |
| **Hide timeline** | Close the panel. |

Below the controls, the **Camera** track shows a ruler with a keyframe marker for every keyframe. Click or drag along the ruler to move the playhead. The trash icon on the track, **Delete camera animation**, removes the animation with all its keyframes.

## Creating keyframes

1. Open the timeline and move the playhead to the frame you want.
2. Frame the shot in the viewport.
3. Click **Add keyframe at playhead**, or press <kbd>Enter</kbd>. A keyframe that already exists at that frame is replaced.
4. Move the playhead and repeat.

Each keyframe stores the camera's position, target and field of view. Adding the first keyframe also turns on **Play animation on open**.

## Editing keyframes

- **Select** a keyframe by clicking it. <kbd>Ctrl</kbd>-click (<kbd>Cmd</kbd>-click on macOS) adds or removes keyframes from the selection, and dragging across an empty part of the track selects every keyframe it covers.
- **Move** keyframes by dragging the selection along the track.
- **Copy** keyframes by holding <kbd>Shift</kbd> while you drag.
- **Change** a keyframe by moving the playhead to it, framing the new shot and adding a keyframe again.

Every timeline edit can be undone with <kbd>Ctrl</kbd>+<kbd>Z</kbd> (<kbd>Cmd</kbd>+<kbd>Z</kbd> on macOS).

:::tip Smooth loops

With **Loop mode** set to **Loop**, the camera travels from the last keyframe back to the first over the remaining frames. Leave some frames after the last keyframe, and don't key both the first and last frame, or the loop will snap.

:::

## Playing on open {#playing-on-open}

The **Animation** section of the **Scene** tab has one switch, **Play animation on open**:

- **On**: the scene page plays the animation as soon as it opens. Visitors can pause it or take over the camera.
- **Off**: the scene opens at the [starting camera](/user-manual/supersplat/studio/cameras), and the animation isn't played.

If the animation has keyframes while the switch is off, the timeline shows **Viewer won't play this animation**, with a **Play on open** button that turns the switch on.

When you click **Save**, an animation without keyframes isn't saved, and the scene opens at the starting camera.

## Animating in the Editor or in Studio

You can also keyframe the camera on the Editor's [Timeline](/user-manual/supersplat/editor/timeline) and publish the animation with the splat. Both edit the same animation, so the last one saved wins: republishing from the Editor with **Override Animation** replaces what you made in Studio. Studio is the quicker route for a splat that is already published, since you see the result in the published viewer straight away.

## See also

- [Cameras](/user-manual/supersplat/studio/cameras) — the starting camera and field of view
- [Viewer Controls](/user-manual/supersplat/viewer/controls) — how visitors play, pause and scrub an animation
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — the `animTracks` and `startMode` fields this page edits
