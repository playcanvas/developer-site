# Rendering Images

[SplatTransform](https://developer.playcanvas.com/user-manual/splat-transform.md) can render a splat scene to a lossless WebP image from a camera view you choose. Give the output a `.webp` extension and the scene is rasterized on the GPU instead of being written as splat data. Use it for thumbnails, previews, panoramas and camera-animation frame sequences.

Rendering needs a GPU: it does not run with `-g cpu`. See [Which Features Need a GPU](https://developer.playcanvas.com/user-manual/splat-transform/cli-reference.md#which-features-need-a-gpu) and, for servers, the [Docker Backend](https://developer.playcanvas.com/user-manual/splat-transform/docker.md) guide.

## Setting Up the Camera

By default the camera sits at `2,1,-2`, looks at the origin with a 60° vertical field of view, and renders 1280x720 over an opaque black background:

```bash
# Default 1280x720 render
splat-transform input.ply view.webp

# Custom camera and resolution
splat-transform input.ply view.webp \
    --camera-pos 2,1,-2 --camera-target 0,0,0 \
    --camera-fov 50 --resolution 1920x1080

# Transparent background
splat-transform input.ply view.webp --background 0,0,0,0
```

`--camera-up` sets the world up vector (default `0,1,0`). `--camera-near` sets the near clip distance (default `0.2`, matching the reference 3DGS rasterizer); splats closer to the camera than this are culled.

## 360° Panoramas

`--projection equirect` renders a full 360°×180° equirectangular panorama from `--camera-pos`, with `--camera-target` setting the view direction at the center of the image. The resolution must be 2:1 (default 2048x1024), and `--camera-fov` must be omitted:

```bash
# 360° equirectangular panorama from camera position
splat-transform input.ply pano.webp \
    --projection equirect --camera-pos 0,1,0 --camera-target 0,1,1
```

Depth of field is not available with this projection.

## Depth of Field

`--f-stop` enables defocus blur, treating the camera as a lens with that aperture: smaller numbers give stronger blur. The focus plane defaults to the distance to `--camera-target`; set `--focus-distance` to focus elsewhere.

```bash
# Defocus blur (focus on camera-target, f/2.8 aperture)
splat-transform input.ply view.webp --f-stop 2.8

# Smoother aperture sampling for strongly defocused edges
splat-transform input.ply view.webp --f-stop 1 --dof-samples 64

# Defocus with explicit focus distance and a smaller world scale
splat-transform input.ply view.webp \
    --f-stop 2.8 --focus-distance 3 --sensor-size 0.1
```

An f-stop only means something relative to a sensor size. `--sensor-size` is the vertical sensor height in world units, and its default of `0.024` is a 35mm full-frame sensor when one world unit is one meter. Scale it with your scene's units: `0.24` if a world unit is a decimeter, `24` if it is a millimeter.

Each image averages `--dof-samples` views across the aperture (default 32). More samples reduce sampling artifacts in strongly defocused areas, at the cost of more render passes.

## Motion Blur

Setting `--camera-pos-end` enables camera motion blur. The camera moves from its start pose (`--camera-pos`, `--camera-target`, `--camera-up`) at shutter open to its end pose at shutter close, and the image averages renders at `--motion-samples` instants across the shutter. `--camera-target-end` and `--camera-up-end` default to the start values.

```bash
# Camera motion blur (dolly from start to end pose over a 180° shutter, 16 instants averaged)
splat-transform input.ply view.webp \
    --camera-pos 2,1,-2 --camera-pos-end 3,1,-2 \
    --shutter 0.5 --motion-samples 16
```

`--shutter` is the fraction of the start→end movement that is averaged, centered on its midpoint: `1.0` covers the full movement and the default `0.5` is a 180° shutter. Rendering cost grows with `--motion-samples`; too few samples show as discrete copies wherever the motion between instants exceeds a couple of pixels.

### Combining Effects

Depth of field and motion blur resolve visibility separately for each sample, then average in linear light before encoding the final image. Reconstructed splat colors are treated as sRGB; transparent outputs use premultiplied linear color during averaging. When both effects are enabled, each shutter instant uses `--dof-samples` aperture views, so the cost multiplies.

## Camera Animations

`--camera-track` renders a camera animation as a numbered frame sequence instead of a single view. The track can come from a [SuperSplat](https://developer.playcanvas.com/user-manual/supersplat.md) editor project, a [viewer settings](https://github.com/playcanvas/supersplat-viewer?tab=readme-ov-file#settings-schema) `settings.json` with `animTracks`, or a plain frame list. A saved `.ssproj` is a ZIP archive, so extract it first and pass the extracted directory or its `document.json`. A frame list looks like this:

```json
{
    "frameRate": 30,
    "frames": [
        { "position": [2, 1, -2], "target": [0, 0, 0], "fov": 60 },
        { "position": [2.1, 1, -1.9], "target": [0, 0, 0], "fov": 60, "up": [0, 1, 0] }
    ]
}
```

Editor projects and viewer settings are evaluated the way the editor and viewer play them back. A frame list is interpolated linearly between entries; `frameRate` defaults to 30, frames without a `fov` use `--camera-fov`, and frames without an `up` use `--camera-up`. Each frame is written as `<name>.NNNN.webp`, numbered by its frame index in the track.

```bash
# Render every frame of an extracted SuperSplat project's camera animation
# (writes view.0000.webp, view.0001.webp, ...)
splat-transform scene.ply view.webp --camera-track scene-project/

# Render frames 0-47 at 1920x1080, motion-blurred over half of each frame interval
splat-transform scene.ply view.webp --camera-track track.json \
    --frames 0-47 --resolution 1920x1080 --shutter 0.5
```

The track replaces `--camera-pos` and `--camera-target`, and its target is also the focus point for depth of field. Motion blur for a track comes from `--shutter` alone: it is off by default, and setting it blurs each frame over that fraction of the frame interval. `--camera-pos-end` cannot be combined with a track.

## See Also

- [Image Output Options](https://developer.playcanvas.com/user-manual/splat-transform/cli-reference.md#image-output-options) — every rendering option with its default.
- [SuperSplat Editor → Timeline](https://developer.playcanvas.com/user-manual/supersplat/editor/timeline.md) — authoring the camera animations that `--camera-track` renders.
- [Library Usage](https://developer.playcanvas.com/user-manual/splat-transform/library.md) — rendering from JavaScript with `writeImage` and `loadCameraTrack`.
