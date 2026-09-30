---
title: CLI Reference
description: "Every splat-transform command-line option: command syntax, supported formats, actions, per-format options, and which features need a GPU."
toc_max_heading_level: 4
---

This page lists every [SplatTransform](/user-manual/splat-transform/) command-line option, grouped the way `splat-transform --help` prints them. For worked examples, see the [Overview](/user-manual/splat-transform/#examples) and the task guides: [Generating Streamed SOG](/user-manual/splat-transform/streamed-sog), [Collision Mesh Generation](/user-manual/splat-transform/collision) and [Rendering Images](/user-manual/splat-transform/image-rendering).

## Command Syntax

```bash
splat-transform [GLOBAL] input [ACTIONS] ... output [ACTIONS]
```

- Input files become the working set; ACTIONS are applied in order
- The last file is the output; actions after it modify the final result
- Use `null` as the output to discard file output (useful with `--stats` for analysis-only runs)
- Input filenames may also be `http(s)://` URLs, downloaded on demand (`.mjs` generators must be local files)

## Supported Formats

SplatTransform detects file format from the file extension:

| Format            | Input | Output | Description                                                                                                                                          |
| ----------------- | ----- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.ply`            | ✅    | ✅     | Standard [PLY](/user-manual/gaussian-splatting/formats/ply) format                                                                                   |
| `.sog`            | ✅    | ✅     | Bundled super-compressed [SOG](/user-manual/gaussian-splatting/formats/sog) format (recommended)                                                     |
| `meta.json`       | ✅    | ✅     | Unbundled super-compressed format (accompanied by `.webp` textures). Output filename **must** be `meta.json`                                         |
| `lod-meta.json`   | ✅    | ✅     | Multi-LOD [Streamed SOG](/user-manual/gaussian-splatting/formats/streamed-sog) bundle (accompanied by per-LOD `.sog` chunks). Filename **must** be `lod-meta.json` |
| `.compressed.ply` | ✅    | ✅     | Compressed PLY format (auto-detected and decompressed on read)                                                                                       |
| `.spz`            | ✅    | ✅     | Compressed [SPZ](/user-manual/gaussian-splatting/formats/spz) splat format (Niantic format, v2–4)                                                    |
| `.lcc`            | ✅    | ❌     | LCC file format (XGRIDS)                                                                                                                             |
| `.lcc2`           | ✅    | ❌     | LCC2 file format (XGRIDS, octree)                                                                                                                    |
| `.ksplat`         | ✅    | ❌     | Compressed splat format (mkkellogg format)                                                                                                           |
| `.splat`          | ✅    | ❌     | Compressed splat format (antimatter15 format)                                                                                                        |
| `.mjs`            | ✅    | ❌     | Generate a scene using an mjs script (Beta)                                                                                                          |
| `.glb`            | ❌    | ✅     | Binary glTF with [KHR_gaussian_splatting](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_gaussian_splatting) extension, [loadable directly](/user-manual/gaussian-splatting/formats/glb) by the PlayCanvas Engine |
| `.csv`            | ❌    | ✅     | Comma-separated values spreadsheet                                                                                                                   |
| `.html`           | ❌    | ✅     | HTML viewer app (single-page or unbundled) based on SOG                                                                                              |
| `.voxel.json`     | ❌    | ✅     | [Sparse voxel octree](/user-manual/splat-transform/voxel-format) for collision detection. See the [Collision Mesh](/user-manual/splat-transform/collision) guide. Output filename must end with `.voxel.json` (the prefix is up to you, e.g. `room.voxel.json`) |
| `.webp`           | ❌    | ✅     | Lossless WebP image rendered from a camera view via GPU rasterizer. See the [Rendering Images](/user-manual/splat-transform/image-rendering) guide    |
| `null`            | ❌    | ✅     | Discard output (useful with `--stats` for analysis-only runs)                                                                                        |

### Antialiased and 2DGS Scenes

Scenes trained with antialiasing (a mip-splatting style screen-space filter) or as 2D Gaussian surfels (2DGS) are tagged on read, and the tag is preserved wherever the output format can hold it. `--info` reports it as `model`.

- **On read:** a PLY header comment — Brush's `comment SplatRenderMode: default | mip | 2dgs` or Postshot's `comment antialiased 0 | 1` (the last one wins) — the SPZ antialiased header bit, or the `model` entry of a SOG `meta.json`. A PLY with `scale_0` and `scale_1` but no `scale_2` is read as 2DGS regardless of comments, and the missing column is filled with a zero-thickness scale so the rest of the pipeline is unaffected.
- **On write:** `.ply` and `.compressed.ply` carry `comment SplatRenderMode: mip | 2dgs` (Brush's spelling, whichever form was read); `.sog` and `meta.json` carry `"model": "antialiased" | "2dgs"`; `.spz` sets its antialiased bit, and warns that it cannot represent 2DGS. A 2DGS PLY output drops the `scale_2` column again. Other output formats have nowhere to record the tag and drop it silently.
- **Merging:** combining inputs whose tags disagree warns and writes the result untagged.

## Actions

Actions execute in the order specified and can be repeated. Any action may appear after any input or output file:

```none
-t, --translate        <x,y,z>          Translate Gaussians by (x, y, z)
-r, --rotate           <x,y,z>          Rotate Gaussians by Euler angles (x, y, z), in degrees
-s, --scale            <factor>         Uniformly scale Gaussians by factor
-H, --filter-harmonics <0|1|2|3>        Remove spherical harmonic bands > n
-N, --filter-nan                        Remove Gaussians with NaN values, most Inf values, or a
                                          zero-norm (unrenderable) rotation quaternion;
                                          retains +Infinity in opacity and -Infinity in scale_*
-B, --filter-box       <x,y,z,X,Y,Z>    Remove Gaussians outside box (min, max corners)
-S, --filter-sphere    <x,y,z,radius>   Remove Gaussians outside sphere (center, radius)
-V, --filter-value     <name,cmp,value> Keep Gaussians where <name> <cmp> <value>
                                          cmp ∈ {lt,lte,gt,gte,eq,neq}
                                          opacity, scale_*, f_dc_* use transformed values
                                          (linear opacity 0-1, linear scale, linear color 0-1).
                                          Append _raw for raw PLY values (e.g. opacity_raw).
-d, --decimate         <n|n%>           Simplify to n Gaussians via merge-based decimation,
                                          removing at a uniform rate everywhere.
                                          Use n% to keep a percentage of Gaussians.
                                          Lower memory, and better at depth on uniformly-sized
                                          Gaussians: uniform texture, single objects, snow.
    --decimate-adaptive <n|n%>          Simplify, allocating removal by local error instead.
                                          Much better on mixed-scale content such as skies,
                                          at higher memory cost.
                                          Both are memory-bounded and streaming: they scale to
                                          scenes of 100M+ Gaussians. Either must be the final
                                          action, and the output must be .ply (write a decimated
                                          PLY first, then convert in a second invocation).
    --scratch-dir      <path>           Directory for intermediate levels when a deep decimation
                                          target exceeds memory. Nothing is written without it.
-F, --filter-floaters  [size,op,min]    Remove Gaussians not contributing to any solid voxel.
                                          Evaluates each Gaussian at occupied voxel centers.
                                          Default: size=0.05, opacity=0.1, min=0.004 (1/255).
                                          Bare flag (no value) uses all defaults.
-C, --filter-cluster   [res,op,min]     Keep only the connected cluster at --seed-pos.
                                          GPU-voxelizes at coarse resolution (res world units/voxel).
                                          Default: res=1.0, opacity=0.999, min=0.1.
                                          Bare flag (no value) uses all defaults.
-p, --params           <key=val,...>    Pass parameters to .mjs generator script
-l, --tag-lod          <n>              Tag the Gaussians with LOD level n (n >= 0, or -1 for environment)
    --stats            [text|json]      Print file info, per-column statistics and the fill/overdraw ratio to stdout. Default: text
    --info             [text|json]      Print structural metadata (format, per-LOD counts, extra columns) to stdout. Default: text
-m, --morton-order                      Reorder Gaussians by Morton code (Z-order curve)
```

## CLI Options

These options configure a run as a whole rather than operating on splat data — most groups apply only when reading or writing a specific format.

### General Options

```none
-h, --help                              Show this help and exit
-v, --version                           Show version and exit
-q, --quiet                             Suppress non-error output
    --verbose                           Show debug-level diagnostics
    --memory                            Show peak memory in progress output
    --tty                               Interactive bar rendering (default on a TTY; --no-tty to disable)
-w, --overwrite                         Overwrite output file if it exists
    --webp-effort      <0-9>            Lossless WebP compression effort for image, SOG, HTML and LOD output.
                                          Higher tries harder to reduce size. Default: libwebp's default
                                          lossless settings.
```

### GPU Options

Select the device used for GPU work. See [Which Features Need a GPU](#which-features-need-a-gpu) below for what runs on it.

```none
    --list-gpus                         List available GPU adapters and exit
-g, --gpu              <n|cpu>          Device for GPU operations: GPU adapter index | 'cpu'
                                          ('cpu' disables GPU and is incompatible with
                                          GPU-only features like --filter-cluster)
    --gpu-backend      <name>           Force the WebGPU backend: vulkan | d3d12 | metal.
                                          Default: the platform default (e.g. vulkan works around
                                          Dawn D3D12 bugs on Windows)
```

#### Which Features Need a GPU

All GPU work goes through WebGPU. Some features cannot run without it:

- `--filter-cluster` and `--filter-floaters`.
- `.voxel.json` output and `--collision-mesh`.
- `.webp` image output, including `--camera-track` frame sequences.

Others use the GPU by default but also run on the CPU with `-g cpu`:

- `--decimate` and `--decimate-adaptive`.
- SOG output (`.sog`, `meta.json`, `lod-meta.json` and `.html`). The only step that uses the GPU is k-means clustering of the spherical harmonic coefficients, so inputs without SH bands (for example `.splat` files, or anything passed through `--filter-harmonics 0`) are written entirely on the CPU. Inputs with SH bands also work with `-g cpu`, but SH clustering is often 5-10x slower without a GPU.

#### Selecting a Device

```bash
# List available GPU adapters
splat-transform --list-gpus

# Let WebGPU automatically choose the best GPU (default behavior)
splat-transform input.ply output.sog

# Explicitly select a GPU adapter by index
splat-transform -g 0 input.ply output.sog  # Use first listed adapter
splat-transform -g 1 input.ply output.sog  # Use second listed adapter

# Use the CPU instead (much slower for SH compression, but always available)
splat-transform -g cpu input.ply output.sog

# Force the Vulkan backend (e.g. to work around Dawn D3D12 bugs on Windows)
splat-transform --gpu-backend vulkan input.ply output.sog
```

When `-g` is not specified, WebGPU automatically selects the best available GPU. Use `--list-gpus` to list available adapters with their indices and names. The order and availability of adapters depend on your system and GPU drivers. `--gpu-backend` also applies to `--list-gpus`, which then lists only that backend's adapters.

To run splat-transform on a server with an NVIDIA GPU, see the [Docker Backend](/user-manual/splat-transform/docker) guide.

### SOG Compression Options

Apply when writing `.sog`, `meta.json`, `lod-meta.json`, or `.html` outputs.

```none
-i, --sh-iterations    <n>              Iterations for SH compression (more=better). Default: 10
    --max-workers      <n>              Worker threads for SOG and image-sequence encoding (0 = inline/serial). Default: 4
```

### SPZ Output Options

Apply when writing `.spz` outputs.

```none
    --spz-version      <3|4>            The SPZ format version to write. Default: 4
```

### HTML Viewer Output Options

Apply when writing `.html` outputs.

```none
    --viewer-settings  <settings.json>  HTML viewer settings JSON file
    --unbundled                         Generate unbundled HTML viewer with separate files
```

:::note

See the [SuperSplat Viewer Settings Schema](https://github.com/playcanvas/supersplat-viewer?tab=readme-ov-file#settings-schema) for details on how to pass data to the `--viewer-settings` option. The settings are validated before the page is written, so an invalid file fails the run instead of producing a viewer that renders nothing.

:::

### LOD Input Options

Apply when reading `lod-meta.json`, `.lcc`, and `.lcc2` files.

```none
-L, --select-lod       <n,n,...>        Comma-separated LOD levels to read from streamed SOG / LCC / LCC2 input
```

### LOD Output Options

Apply when writing `lod-meta.json` ([Streamed SOG](/user-manual/gaussian-splatting/formats/streamed-sog) output).

```none
    --lod-chunk-count  <n>              Approximate number of Gaussians per LOD chunk in K. Default: 512
    --lod-chunk-extent <n>              Approximate size of an LOD chunk in world units (m). Default: 16
    --lod-chunk-min    <n>              Gaussians in K below which a chunk is not split for extent. Default: 8
```

A chunk is split when it holds more than `--lod-chunk-count` Gaussians, or when it is wider than `--lod-chunk-extent` and holds more than `--lod-chunk-min`. The minimum keeps sparse regions such as sky or distant background from being cut into thousands of near-empty chunks: below it, a region stays one chunk however wide it is. Dense regions are unaffected.

See [Generating Streamed SOG](/user-manual/splat-transform/streamed-sog) for an end-to-end walkthrough.

### Voxel Output Options

Apply when writing `.voxel.json` (sparse voxel octree for collision detection). See the [Collision Mesh](/user-manual/splat-transform/collision) guide for a deep dive on each step and tuning.

```none
    --voxel-size       <n>              Voxel size for .voxel.json. Default: 0.05
    --voxel-opacity    <n>              Voxel opacity threshold for .voxel.json. Default: 0.1
    --voxel-external-fill [size]        Seal exterior voxels via boundary flood fill (interior scenes).
                                          [size] (world units) is the dilation distance applied
                                          before the flood fill to bridge small wall gaps.
                                          --seed-pos is used to verify the volume is enclosed at
                                          the seed; the fill is skipped if the seed is reachable
                                          from outside.
                                          Default size: 1.6
    --voxel-floor-fill [size]           Fill each column upward from bottom until hitting solid (exterior scenes).
                                          Optional size (world units): only patch XZ areas surrounded by floor
                                          within 2*size; large empty exterior areas are left alone.
                                          Default size: 1.6
    --voxel-carve      [h,r]            Carve navigable space using capsule flood fill from seed.
                                          Default: height=1.6, radius=0.2
    --seed-pos         <x,y,z>          Seed position for voxel fill/carve and --filter-cluster.
                                          Default: 0,0,0
    --collision-mesh   [smooth|faces]   Generate collision mesh (.collision.glb). Default: smooth
```

### Image Output Options

Apply when writing `.webp` (lossless WebP rendered via GPU rasterizer). See the [Rendering Images](/user-manual/splat-transform/image-rendering) guide for examples of each effect.

```none
    --projection       <pinhole|equirect>  Camera projection. Default: pinhole.
                                        equirect = 360°×180° panorama from --camera-pos; --camera-fov must be
                                        omitted; --resolution must be 2:1 (default 2048x1024).
    --camera-pos       <x,y,z>          Camera position in world space. Default: 2,1,-2
    --camera-target    <x,y,z>          Camera target point. Default: 0,0,0
    --camera-up        <x,y,z>          World up vector. Default: 0,1,0
    --camera-fov       <degrees>        Vertical field of view in degrees. Default: 60. Rejected with --projection equirect.
    --resolution       <WxH>            Output resolution, e.g. 1920x1080. Default: 1280x720 (pinhole) or 2048x1024 (equirect)
    --camera-near      <n>              Near clip distance. Default: 0.2 (matches reference 3DGS)
    --background       <r,g,b[,a]>      Background color in [0,1]. Default: 0,0,0,1
    --f-stop           <N>              Aperture as a photographic f-stop (e.g. 2.8, 5.6, 11). Enables defocus blur;
                                        smaller = more blur. Pinhole only. Default: disabled (no defocus).
    --focus-distance   <n>              Camera-space Z of the focus plane (world units). Default: distance to --camera-target.
                                        Pinhole only; only meaningful with --f-stop.
    --dof-samples      <n>              Aperture samples per instant with --f-stop. Default: 32. More samples reduce
                                        sampling artifacts at greater cost; multiplies --motion-samples when combined.
    --sensor-size      <n>              Vertical sensor height in world units. Gives --f-stop a physical meaning.
                                        Default: 0.024 (35mm full-frame, world units = meters). Scale to your world:
                                        world unit = decimeter → 0.24, world unit = millimeter → 24.
    --camera-pos-end   <x,y,z>          End camera position. When set, enables camera motion blur: the camera moves
                                        from --camera-pos (shutter open) to --camera-pos-end (shutter close) and the
                                        frame averages renders at instants across the shutter. Default: disabled.
    --camera-target-end <x,y,z>         End camera target. Default: same as --camera-target. Only with --camera-pos-end.
    --camera-up-end    <x,y,z>          End up vector. Default: same as --camera-up. Only with --camera-pos-end.
    --shutter          <0..1>           Fraction of the start→end segment averaged, centered on its midpoint. Default: 0.5.
                                        With --camera-track, fraction of the frame interval averaged around each frame.
                                        Default for tracks: off. 1.0 = full interval; 0.5 = 180° shutter.
    --motion-samples   <n>              Renders averaged per motion-blurred frame, at evenly spaced instants across
                                        the shutter. Cost is N× a single render; too few show as discrete copies
                                        where the motion between instants exceeds a couple of pixels. Default: 16.
    --camera-track     <path>           Render a camera animation as a frame sequence: a SuperSplat editor project
                                        (.ssproj directory or its document.json), a viewer settings.json with
                                        animTracks, or a JSON { frameRate, frames: [{ position, target, fov, up }] }.
                                        Frames are written as <name>.NNNN.webp. Replaces --camera-pos/--camera-target;
                                        the track's target is the defocus focus point. A frame's up vector tilts the
                                        camera; frames without one use --camera-up. With --shutter, each frame is
                                        motion-blurred over that fraction of the frame interval.
    --frames           <a[-b]>          Inclusive frame range of the track to render. Default: all frames.
```

## See Also

- [Splat File Formats](/user-manual/gaussian-splatting/formats/) — specifications for the PLY, SOG, Streamed SOG, GLB and SPZ formats.
- [Voxel Format](/user-manual/splat-transform/voxel-format) — specification of `.voxel.json` / `.voxel.bin` output.
- [Library Usage](/user-manual/splat-transform/library) — the same operations from JavaScript.
