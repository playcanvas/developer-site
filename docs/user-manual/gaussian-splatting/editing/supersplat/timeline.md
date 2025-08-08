---
title: Timeline
---

The Animation Timeline is for playing any animation set up in your project. Two types of animation can be set up:

1. **Camera Animation:** The viewport camera can be animated by setting keyframes on the Timeline.
2. **Splat Animation:** You can load a sequence of PLY files where each PLY file is a single frame in an animation.

## Camera Animation

Simply pick a frame in the Timeline, position the camera and click the `+` button on the Timeline to set a keyframe. Note that the last keyframe on the Timeline will automatically loop back to the first keyframe.

## Splat Animation

In order to view a set of PLY files as an animation:

- Ensure the files have a common name with frame number appended, like `anim_0003.ply`, `anim_0004.ply`, `anim_0005.ply`....
- Load the files into SuperSplat by either dragging and dropping the files or a folder containing the files, onto SuperSplat

The timeline panel will be displayed:

<img width="931" alt="Screenshot 2025-01-03 at 13 52 25" src="/img/user-manual/gaussian-splatting/editing/supersplat/timeline.png" />

- Use the arrow buttons to step one frame forwards and backwards
- Use the play button to play the animation
- Use the dropdown to select a playback speed
- Use the slider to scrub the animation
