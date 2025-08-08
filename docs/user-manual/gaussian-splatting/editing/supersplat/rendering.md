---
title: Rendering Media
---

SuperSplat enables you to render high-quality images and videos directly from your 3D Gaussian Splats. Whether you want to create a single frame for social media, showcase your creations with animated videos, embed them on your website, or keep them locally, this guide will help you get started.

:::important

Both images and videos are rendered entirely locally on your device. No render data or splat information is uploaded to any external server.

:::

## Getting Started

To render from your splat:

1. Open your splat in the [SuperSplat Editor](https://superspl.at/editor).
2. Position your camera for the desired view (for images) or set up camera animations on the [Timeline](timeline.md) (for videos).
3. Click the `Render` menu in the menu bar and select either `Image` or `Video`.

## Image Rendering

Image rendering creates a single high-quality frame from your current camera position.

### Image Settings

When you select `Image` from the Render menu, a dialog will appear with settings to customize your image:

- **Preset:** Choose from the following preset options:
  - `Current` (default) - Uses the current viewport resolution
  - `HD` - `1920x1080` resolution
  - `QHD` - `2560x1440` resolution  
  - `4K` - `3840x2160` resolution
  - `Custom` - Allows manual resolution selection
- **Resolution:** Only active when `Custom` preset is selected. Allows you to specify custom width and height values.
- **Transparent Background:** If checked, the rendered image will have a transparent background instead of the scene's background color. This is useful for creating images that can be composited over other content or used as overlays.
- **Show Debug Overlays:** If checked, whatever splat visualization mode (centers or rings) is active in the Editor will be rendered to the image.

### Rendering the Image

Once you've configured your settings:

1. Click the `Render` button.
2. The image will be rendered at the current camera position.
3. On completion, your image will auto-download.

## Video Rendering

Video rendering creates an animated sequence using camera animations from the Timeline.

### Video Settings

When you select `Video` from the Render menu, a dialog will appear with several settings to customize your video:

- **Resolution:** Choose from the following resolutions:
  - `960x540`
  - `1280x720`
  - `1920x1080` (default)
  - `2560x1440`
  - `3840x2160`
- **Frame Rate:** Choose from the following frame rates:
  - `12 fps`
  - `24 fps`
  - `30 fps` (default)
  - `60 fps`
  - `120 fps`
- **Bitrate:** Adjust the quality of your video by choosing a higher or lower bitrate. Options are:
  - `Low`
  - `Medium`
  - `High` (default)
  - `Ultra`
- **Portrait Mode:** If checked, the resolution will be flipped to be vertical. This is useful if you intend your video to be viewed in portrait on mobile.
- **Show Debug Overlays:** If checked, whatever splat visualization mode (centers or rings) is active in the Editor will be rendered to the video.

### Rendering the Video

Once you've configured your settings:

1. Click the `Render` button.
2. The Timeline pointer will animate through all frames until video encoding is complete.
3. On completion, your video will auto-download.

## Tips for Best Results

- **For Images:** Position your camera carefully and consider the composition before rendering. Higher resolutions will provide more detail for print or web use.
- **For Videos:** Before rendering, ensure your Timeline animations are smooth and camera movements are polished.
- **For Social Media:** Portrait-mode renders often yield better engagement on mobile platforms.
- **Debug Overlays:** Use the debug overlay option when you need to show splat data for educational or technical presentations.

Happy Rendering! 🎬📸
