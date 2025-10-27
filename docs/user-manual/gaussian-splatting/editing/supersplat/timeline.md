---
title: Timeline
---

The Timeline panel allows you to create camera animations for your Gaussian Splat scenes. You can set keyframes to define camera positions and movements, creating smooth animated transitions that can be played back in the editor.

![Timeline Panel](/img/user-manual/gaussian-splatting/editing/supersplat/timeline.png)

## Timeline Controls

The Timeline panel includes the following controls:

- **Play/Stop button** - Play or stop the animation playback
- **Next/Previous Key buttons** - Jump to the next or previous keyframe
- **Add Key button (`+`)** - Create a new keyframe at the current timeline position
- **Remove Key button (`-`)** - Delete the keyframe at the current playhead position
- **Timeline slider** - Scrub through the animation by dragging the playhead (which displays the current frame number)
- **FPS setting** - Set the frames per second for the animation
- **Timeline length** - Set the total duration of the animation in frames
- **Smoothness** - Adjust the interpolation smoothness between keyframes (0-1)

## Creating Keyframes

To create a camera animation keyframe:

1. Position the timeline playhead at the desired frame (by clicking on the timeline or using the frame counter)
2. Move and orient the viewport camera to the desired position
3. Click the `+` (Add Keyframe) button on the Timeline

The keyframe will appear as a yellow diamond on the timeline at the current frame position. Keyframes store the camera's position and rotation at that moment in time.

## Editing Keyframes

Once keyframes are created, you can modify them in two ways:

### Changing Keyframe Timing

Click and drag the yellow diamond keyframes along the timeline to adjust when each camera position occurs in your animation.

### Updating Camera Position/Rotation

To change the camera position or rotation stored in an existing keyframe:

1. Move the playhead to the frame containing the keyframe you want to update
2. Adjust the viewport camera to the new desired position and rotation
3. Click the `+` (Add Key) button - this will overwrite the existing keyframe with the updated camera values

## Deleting Keyframes

To delete a keyframe:

1. Move the playhead to the frame containing the keyframe you want to delete
2. Click the `-` (Remove Key) button

## Configuring Timeline Settings

### Frames Per Second (FPS)

The FPS setting controls the playback speed of your animation. Available FPS values are:

- **1 FPS** - Very slow, single frame per second
- **6 FPS** - Low frame rate
- **12 FPS** - Medium frame rate
- **24 FPS** - Standard film frame rate
- **30 FPS** - Common video frame rate
- **60 FPS** - Smooth, high frame rate playback

### Timeline Length

You can set the total duration of your animation by adjusting the timeline length setting. This defines how many frames your animation spans and determines when the animation loops back to the beginning.

### Smoothness

The Smoothness setting controls how the camera interpolates between keyframes. This value ranges from 0 to 1:

- **0** - Linear interpolation, creating direct straight-line motion between keyframes
- **1** - Maximum smooth interpolation, creating more curved, cinematic camera movements
- **Values in between** - Blend between linear and smooth interpolation

Adjusting smoothness allows you to control the feel of your camera animation, from mechanical and precise to flowing and organic.

## Playing Animations

Use the play button to preview your animation. The camera will interpolate between keyframes based on your smoothness setting, creating fluid motion. The animation will loop continuously from the first frame back to the beginning.

### Animation Looping

The animation automatically loops from the last frame back to the first frame. To create seamless loops, it's important to avoid setting a keyframe on both the first and last frames of the timeline, as this will cause a sudden snap when the animation loops.

:::tip[Best Practice for Smooth Loops]

Instead of placing keyframes on both the first and last frames, place your final keyframe before the last frame and let the animation interpolate smoothly back to the beginning.

For example, with a 100-frame timeline:

- **Good:** Set keyframes at frames 0, 10, 20, 30, 40, 50, 60, 70, 80, 90
  - The animation smoothly interpolates from frame 90 back to frame 0
- **Avoid:** Setting keyframes at frames 0, 10, 20, ... 90, 100
  - This causes a snap/jerk when looping from frame 100 back to frame 0

This technique allows the camera to smoothly transition from your last keyframe back to the starting position, creating a seamless loop.

:::

## Saving Timeline Animations

:::important

Timeline animations are only preserved when you save your project as an `.ssproj` file. The timeline configuration is not saved when exporting to PLY or other splat formats.

See [Managing Projects](managing-projects.md) for more information on saving and loading SuperSplat project files.

:::
