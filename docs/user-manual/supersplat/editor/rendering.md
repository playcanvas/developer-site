---
title: Rendering Media
description: "Render still images (PNG, JPEG, or WebP) and videos from SuperSplat locally, including 360° equirectangular output and timeline-driven video."
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

- **Projection:** Choose the type of image to render:
  - `Standard` (default) - A regular flat image rendered from the camera's point of view
  - `360° Equirectangular` - A monoscopic 360° panorama capturing the full sphere around the camera's position
- **Preset:** Choose the output resolution. Available options depend on the selected projection:
  - For `Standard`:
    - `Current` (default) - Uses the current viewport resolution
    - `HD` - `1920x1080` resolution
    - `QHD` - `2560x1440` resolution
    - `4K` - `3840x2160` resolution
    - `Custom` - Allows manual resolution selection
  - For `360° Equirectangular` (2:1 aspect ratio): `1024x512`, `2048x1024`, `3840x1920` (default), `4096x2048` and `Custom`
- **Resolution:** Only active when `Custom` preset is selected. Allows you to specify custom width and height values.
- **Format:** Choose the output image format:
  - `PNG` (default) - Lossless output with transparency support
  - `JPEG` - Smaller, lossy output for photographs and sharing
  - `WebP` - Lossless WebP output with transparency support
- **Quality:** Only shown for `JPEG`. Set the JPEG quality from 1 to 100 (default 90).
- **Transparent Background:** If checked, the rendered image will have a transparent background instead of the scene's background color. This is useful for creating images that can be composited over other content or used as overlays. This option is unavailable for JPEG, which does not support transparency.
- **Show Debug Overlays:** If checked, whatever splat visualization mode (centers or rings) is active in the Editor will be rendered to the image. Only available for `Standard` projection.
- **Level Horizon:** Only shown for `360° Equirectangular` projection. If checked (the default), the image stays level and follows only the camera's heading. If unchecked, the camera's full orientation (including pitch) is baked into the image.

### Rendering the Image

Once you've configured your settings:

1. Click the `Render` button.
2. The image will be rendered at the current camera position.
3. In browsers that support the File System Access API, choose a filename and location in the system save dialog. In other browsers, the image downloads automatically using the selected format's extension.

The suggested filename uses the project name when one is set, otherwise the first visible splat's name, and finally `supersplat` if neither is available. Invalid filename characters are removed. You can change the name in the save dialog before writing the file.

## Video Rendering

Video rendering creates an animated sequence using camera animations from the Timeline.

### Video Settings

When you select `Video` from the Render menu, a dialog will appear with several settings to customize your video:

- **Projection:** Choose the type of video to render:
  - `Standard` (default) - A regular flat video rendered from the camera's point of view
  - `360° Equirectangular` - A monoscopic 360° video that can be viewed on YouTube, in VR headsets and in 360°-capable players like VLC
- **Resolution:** Choose the output resolution. Available options depend on the selected projection:
  - For `Standard`: `960x540`, `1280x720`, `1920x1080` (default), `2560x1440`, `3840x2160`
  - For `360° Equirectangular` (2:1 aspect ratio): `1024x512`, `2048x1024`, `3840x1920` (default), `4096x2048`
- **Format:** Choose the output video format:
  - `MP4` (default) - Most widely compatible format, ideal for general use
  - `WebM` - Open format, excellent for web use
  - `MOV` - Apple QuickTime format, ideal for professional video editing workflows
  - `MKV` - Flexible open container format supporting various codecs
- **Codec:** Choose the video codec for compression. Available options depend on the selected format:
  - For MP4 and MOV: `H.264` (default), `H.265/HEVC`
  - For WebM: `VP9` (default), `AV1`
  - For MKV: `H.264` (default), `H.265/HEVC`, `VP9`, `AV1`
- **Frame Rate:** Choose from the following frame rates:
  - `12 fps`
  - `15 fps`
  - `24 fps`
  - `25 fps`
  - `30 fps` (default)
  - `48 fps`
  - `60 fps`
  - `120 fps`
- **Bitrate:** Adjust the quality of your video by choosing a higher or lower bitrate. Options are:
  - `Low`
  - `Medium`
  - `High` (default)
  - `Ultra`
- **Frame Range:** Specify the start and end frames from the Timeline to include in your video. By default, the entire Timeline is rendered.
- **Portrait Mode:** If checked, the resolution will be flipped to be vertical. This is useful if you intend your video to be viewed in portrait on mobile. Only available for `Standard` projection.
- **Level Horizon:** Only shown for `360° Equirectangular` projection. If checked (the default), the video stays level and follows only the camera's heading, which is generally the most comfortable to watch. If unchecked, the camera's full orientation (including pitch) is baked into the video.
- **Show Debug Overlays:** If checked, whatever splat visualization mode (centers or rings) is active in the Editor will be rendered to the video. Only available for `Standard` projection.

### Rendering the Video

Once you've configured your settings:

1. Click the `Render` button.
2. The Timeline pointer will animate through all frames until video encoding is complete.
3. In browsers that support the File System Access API, choose a filename and location in the system save dialog. In other browsers, the video downloads automatically.

:::tip Browser Recommendation for Video Rendering

We recommend using a Chromium-based browser (Chrome, Edge, Opera, etc.) for rendering videos. Browsers that support the [FileSystem API](https://caniuse.com/native-filesystem-api) will ask you to pick a destination filename and will then stream out the file during the encoding process instead of having to do it in memory. This allows for the recording of much larger videos without running into memory limitations.

:::

### 360° Video Rendering

Setting the `Projection` option to `360° Equirectangular` renders a monoscopic 360° video instead of a regular flat one. For every output frame, the full sphere around the camera's position on the [Timeline](timeline.md) is captured into a 2:1 equirectangular frame.

YouTube's embedded player presents this 360° video as a flat video, so open the example on YouTube to drag the view, use your phone's motion controls or watch it in a headset:

<div style={{textAlign: 'center', marginBottom: '2rem'}}>
    <a className="button button--primary button--lg" href="https://www.youtube.com/watch?v=6oGjT8eubMc" target="_blank" rel="noopener noreferrer">▶&nbsp;&nbsp;Look around in 360° on YouTube</a>
</div>

Some things to keep in mind when rendering 360° video:

- `MP4` and `MOV` videos are tagged with spherical video metadata, so YouTube, VR headsets and players like VLC automatically detect and play them as 360° video. `WebM` and `MKV` videos are not tagged, so some players may need to be told that the video is 360°.
- `MP4` and `MOV` 360° videos are held in memory while rendering (the spherical metadata is added once encoding completes), so long renders at high resolution use more memory than standard renders.
- A 360° render takes roughly six times longer than a standard render of the same length, because the scene is rendered once for each of the six directions around the camera for every output frame.

You can render 360° still images in the same way: set the `Projection` option in the [Image Settings](#image-settings) dialog to `360° Equirectangular`. The panorama is captured from the current camera position and saved as a 2:1 equirectangular image in the selected PNG, JPEG, or WebP format.

## Tips for Best Results

- **For Images:** Position your camera carefully and consider the composition before rendering. Higher resolutions will provide more detail for print or web use.
- **For Videos:** Before rendering, ensure your Timeline animations are smooth and camera movements are polished.
- **For 360° Videos:** The camera animation drives the viewer's position through the scene. Slow, smooth camera movement is much more comfortable to watch in a VR headset than rapid motion.
- **For Social Media:** Portrait-mode renders often yield better engagement on mobile platforms.
- **Debug Overlays:** Use the debug overlay option when you need to show splat data for educational or technical presentations.

Happy Rendering! 🎬📸
