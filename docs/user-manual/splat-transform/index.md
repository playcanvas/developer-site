---
title: SplatTransform
description: "SplatTransform CLI and library: convert between splat formats, transform and filter data, merge scenes, generate streamed LODs, voxelize for collision, and render images."
---

[SplatTransform](https://github.com/playcanvas/splat-transform) is an open source library and CLI tool for converting and editing Gaussian splats. Whether you need to convert between formats, apply transformations, filter data, generate collision volumes, or analyze splat statistics, SplatTransform gives developers precise control over their Gaussian splat workflows. The library is platform-agnostic and runs in both Node.js and browser environments.

:::note Open Source

SplatTransform is [open-sourced under an MIT license on GitHub](https://github.com/playcanvas/splat-transform).

:::

:::tip Prefer a web UI?

The [SuperSplat Convert page](/user-manual/supersplat/convert) at [superspl.at/convert](https://superspl.at/convert) is the web frontend to splat-transform. It runs the same conversions and transforms in your browser via WebAssembly — no installation required. Use the web UI for one-off conversions and the CLI below for scripted or batch workflows.

:::

## Why Use SplatTransform?

SplatTransform solves the problems developers face when working with Gaussian splats:

🔄 **Broad Format Support** — read PLY, Compressed PLY, SOG, Streamed SOG, SPZ, SPLAT, KSPLAT, LCC and LCC2; write PLY, Compressed PLY, SOG, Streamed SOG, SPZ, GLB, CSV, HTML Viewer, Voxel and WebP image  
🛠️ **Powerful Transformations** — translate, rotate, and scale your splats with precision  
🧹 **Smart Filtering** — strip NaN/Inf, filter by value, box, sphere, harmonic band, or floater contribution, and keep only the connected cluster around a seed point  
📐 **Decimation & Reordering** — simplify via memory-bounded merge-based decimation that scales to 100M+ Gaussians, and reorder by Morton code for spatial locality  
🧱 **Collision Generation** — voxelize a scene into a sparse octree and emit a `.collision.glb` mesh ready for runtime physics  
🖼️ **Image Rendering** — render a scene to a lossless WebP from a configurable camera view, with panoramas, defocus, and motion blur  
📊 **Statistical Analysis** — per-column statistics and structural metadata (`--stats`, `--info`) for data analysis, validation, and publish gating  
📦 **Scene Merging** — combine multiple splat files into a single merged scene  
⚙️ **Generators** — procedurally synthesize splat data with JavaScript generator scripts  
🆓 **Open Source** — MIT licensed and freely available on GitHub

## Installation

Install or update to the latest version:

```bash
npm install -g @playcanvas/splat-transform
```

For library usage, install as a dependency:

```bash
npm install @playcanvas/splat-transform
```

Verify your CLI installation:

```bash
splat-transform --version
```

For running on a backend with Docker (including GPU/Vulkan setup), see the [Docker Backend](/user-manual/splat-transform/docker) guide.

## Guides

- [Generating Streamed SOG](/user-manual/splat-transform/streamed-sog) — build a multi-LOD Streamed SOG from a single PLY.
- [LOD Streaming](/user-manual/gaussian-splatting/building/lod-streaming) — load and render Streamed SOG output in a PlayCanvas app.
- [Collision Mesh Generation](/user-manual/splat-transform/collision) — generate voxel/collision data from a splat scene.
- [Docker Backend](/user-manual/splat-transform/docker) — run splat-transform on a backend (incl. GPU/Vulkan setup).
- [Library Usage](/user-manual/splat-transform/library) — drive splat-transform programmatically from Node.js or the browser. The full TypeDoc reference lives at [api.playcanvas.com/splat-transform](https://api.playcanvas.com/splat-transform/).

## Format Specifications

| Format | Description |
| ------ | ----------- |
| [PLY](/user-manual/gaussian-splatting/formats/ply) | Industry-standard uncompressed format for source, editing and interchange |
| [SOG](/user-manual/gaussian-splatting/formats/sog) | Super-compressed format for web delivery (`meta.json` + WebP textures, bundled or unbundled) |
| [Streamed SOG](/user-manual/gaussian-splatting/formats/streamed-sog) | Multi-LOD chunked SOG for streaming very large scenes (`lod-meta.json`) |
| [Voxel](/user-manual/splat-transform/voxel-format) | Sparse voxel octree for collision detection (`.voxel.json` / `.voxel.bin`) |

## CLI Usage

The general syntax for SplatTransform is:

```bash
splat-transform [GLOBAL] input [ACTIONS] ... output [ACTIONS]
```

**Key points:**

- Input files become the working set; ACTIONS are applied in order
- The last file is the output; actions after it modify the final result
- Use `null` as the output to discard file output (useful with `--stats` for analysis-only runs)

## Supported Formats

SplatTransform detects file format from the file extension:

| Format            | Input | Output | Description                                                                                                                                          |
| ----------------- | ----- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.ply`            | ✅    | ✅     | Standard PLY format                                                                                                                                  |
| `.sog`            | ✅    | ✅     | Bundled super-compressed format (recommended)                                                                                                        |
| `meta.json`       | ✅    | ✅     | Unbundled super-compressed format (accompanied by `.webp` textures). Output filename **must** be `meta.json`                                         |
| `lod-meta.json`   | ✅    | ✅     | Multi-LOD [Streamed SOG](/user-manual/gaussian-splatting/formats/streamed-sog) bundle (accompanied by per-LOD `.sog` chunks). Filename **must** be `lod-meta.json` |
| `.compressed.ply` | ✅    | ✅     | Compressed PLY format (auto-detected and decompressed on read)                                                                                       |
| `.spz`            | ✅    | ✅     | Compressed splat format (Niantic format, v2–4)                                                                                                       |
| `.lcc`            | ✅    | ❌     | LCC file format (XGRIDS)                                                                                                                             |
| `.lcc2`           | ✅    | ❌     | LCC2 file format (XGRIDS, octree)                                                                                                                    |
| `.ksplat`         | ✅    | ❌     | Compressed splat format (mkkellogg format)                                                                                                           |
| `.splat`          | ✅    | ❌     | Compressed splat format (antimatter15 format)                                                                                                        |
| `.mjs`            | ✅    | ❌     | Generate a scene using an mjs script (Beta)                                                                                                          |
| `.glb`            | ❌    | ✅     | Binary glTF with [KHR_gaussian_splatting](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_gaussian_splatting) extension, [loadable directly](/user-manual/gaussian-splatting/formats/glb) by the PlayCanvas Engine |
| `.csv`            | ❌    | ✅     | Comma-separated values spreadsheet                                                                                                                   |
| `.html`           | ❌    | ✅     | HTML viewer app (single-page or unbundled) based on SOG                                                                                              |
| `.voxel.json`     | ❌    | ✅     | Sparse voxel octree for collision detection. See the [Collision Mesh](/user-manual/splat-transform/collision) guide. Output filename must end with `.voxel.json` (the prefix is up to you, e.g. `room.voxel.json`) |
| `.webp`           | ❌    | ✅     | Lossless WebP image rendered from a camera view via GPU rasterizer                                                                                   |
| `null`            | ❌    | ✅     | Discard output (useful with `--stats` for analysis-only runs)                                                                                        |

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
-d, --decimate         <n|n%>           Simplify to n Gaussians via merge-based decimation
                                          Use n% to keep a percentage of Gaussians.
                                          Memory-bounded and streaming: scales to scenes of 100M+
                                          Gaussians. Must be the final action, and the output must
                                          be .ply (write a decimated PLY first, then convert in a
                                          second invocation). Deep targets on huge scenes spill
                                          temporary files to --scratch-dir (default: the output
                                          file's directory).
    --scratch-dir      <path>           Directory for decimation spill files
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

## General Options

```none
-h, --help                              Show this help and exit
-v, --version                           Show version and exit
-q, --quiet                             Suppress non-error output
    --verbose                           Show debug-level diagnostics
    --memory                            Show peak memory in progress output
    --tty                               Interactive bar rendering (default on a TTY; --no-tty to disable)
-w, --overwrite                         Overwrite output file if it exists
```

## GPU Options

Used by SOG compression and GPU voxelization (`--filter-cluster`, `--filter-floaters`, `.voxel.json` output).

```none
    --list-gpus                         List available GPU adapters and exit
-g, --gpu              <n|cpu>          Device for GPU operations: GPU adapter index | 'cpu'
                                          ('cpu' disables GPU and is incompatible with
                                          GPU-only features like --filter-cluster)
```

## SOG Compression Options

Apply when writing `.sog`, `meta.json`, `lod-meta.json`, or `.html` outputs.

```none
-i, --sh-iterations    <n>              Iterations for SH compression (more=better). Default: 10
    --max-workers      <n>              Worker threads for SOG encoding (0 = inline/serial). Default: 4
```

## SPZ Output Options

Apply when writing `.spz` outputs.

```none
    --spz-version      <3|4>            The SPZ format version to write. Default: 4
```

## HTML Viewer Output Options

Apply when writing `.html` outputs.

```none
    --viewer-settings  <settings.json>  HTML viewer settings JSON file
    --unbundled                         Generate unbundled HTML viewer with separate files
```

:::note

See the [SuperSplat Viewer Settings Schema](https://github.com/playcanvas/supersplat-viewer?tab=readme-ov-file#settings-schema) for details on how to pass data to the `--viewer-settings` option.

:::

## LOD Input Options

Apply when reading `lod-meta.json`, `.lcc`, and `.lcc2` files.

```none
-L, --select-lod       <n,n,...>        Comma-separated LOD levels to read from streamed SOG / LCC / LCC2 input
```

## LOD Output Options

Apply when writing `lod-meta.json` ([Streamed SOG](/user-manual/gaussian-splatting/formats/streamed-sog) output).

```none
    --lod-chunk-count  <n>              Approximate number of Gaussians per LOD chunk in K. Default: 512
    --lod-chunk-extent <n>              Approximate size of an LOD chunk in world units (m). Default: 16
```

See [Generating Streamed SOG](/user-manual/splat-transform/streamed-sog) for an end-to-end walkthrough.

## Voxel Output Options

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

## Image Output Options

Apply when writing `.webp` (lossless WebP rendered via GPU rasterizer).

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
    --sensor-size      <n>              Vertical sensor height in world units. Gives --f-stop a physical meaning.
                                        Default: 0.024 (35mm full-frame, world units = meters). Scale to your world:
                                        world unit = decimeter → 0.24, world unit = millimeter → 24.
    --camera-pos-end   <x,y,z>          End camera position. When set, enables camera motion blur: the renderer
                                        averages sub-frames with the camera interpolated from --camera-pos (shutter open)
                                        to --camera-pos-end (shutter close). Default: disabled (no motion blur).
    --camera-target-end <x,y,z>         End camera target. Default: same as --camera-target. Only with --camera-pos-end.
    --camera-up-end    <x,y,z>          End up vector. Default: same as --camera-up. Only with --camera-pos-end.
    --shutter          <0..1>           Fraction of the start→end segment integrated, centered on the midpoint
                                        (1.0 = full motion; 0.5 = 180° shutter). Default: 1. Only with --camera-pos-end.
    --motion-samples   <n>              Sub-frames to accumulate for motion blur. Cost is N× a single render.
                                        Default: 16. Only with --camera-pos-end.
```

## Examples

### Format Conversion

```bash
# Simple format conversion
splat-transform input.ply output.csv

# Convert from .splat format
splat-transform input.splat output.ply

# Convert from .ksplat format
splat-transform input.ksplat output.ply

# Convert to compressed PLY
splat-transform input.ply output.compressed.ply

# Uncompress a compressed PLY back to standard PLY
# (compressed .ply is detected automatically on read)
splat-transform input.compressed.ply output.ply

# Convert to SOG bundled format
splat-transform input.ply output.sog

# Convert to SOG unbundled format
splat-transform input.ply output/meta.json

# Convert from SOG (bundled) back to PLY
splat-transform scene.sog restored.ply

# Convert from SOG (unbundled folder) back to PLY
splat-transform output/meta.json restored.ply

# Convert to standalone HTML viewer (bundled, single file)
splat-transform input.ply output.html

# Convert to unbundled HTML viewer (separate CSS, JS, and SOG files)
splat-transform --unbundled input.ply output.html

# Convert to HTML viewer with custom settings
splat-transform --viewer-settings settings.json input.ply output.html

# Export to CSV for spreadsheet analysis
splat-transform scene.ply data.csv
```

### Transformations

```bash
# Scale and translate
splat-transform bunny.ply -s 0.5 -t 0,0,10 bunny_scaled.ply

# Rotate by 90 degrees around Y axis
splat-transform input.ply -r 0,90,0 output.ply

# Chain multiple transformations
splat-transform input.ply -s 2 -t 1,0,0 -r 0,0,45 output.ply
```

### Filtering

```bash
# Remove entries containing NaN and Inf
splat-transform input.ply --filter-nan output.ply

# Filter by opacity values (keep only splats with opacity > 0.5)
splat-transform input.ply -V opacity,gt,0.5 output.ply

# Strip spherical harmonic bands higher than 2
splat-transform input.ply --filter-harmonics 2 output.ply

# Simplify to 50000 splats via merge-based decimation
splat-transform input.ply --decimate 50000 output.ply

# Simplify to 25% of original splat count
splat-transform input.ply -d 25% output.ply
```

### Scene Merging

```bash
# Combine multiple files with different transforms
splat-transform -w cloudA.ply -r 0,90,0 cloudB.ply -s 2 merged.compressed.ply

# Apply final transformations to combined result
splat-transform input1.ply input2.ply output.ply -t 0,0,10 -s 0.5
```

### Statistics

Generate per-column statistics for data analysis or test validation:

```bash
# Print stats, then write output
splat-transform input.ply --stats output.ply

# Print stats without writing a file (discard output)
splat-transform input.ply --stats null

# Print stats as JSON for scripting
splat-transform input.ply --stats json null

# Print stats before and after a transform
splat-transform input.ply --stats -s 0.5 --stats output.ply
```

The output starts with the file info block (including the `gaussian` verdict — `false` for a readable container that isn't splat data, such as a plain point-cloud PLY), followed by min, max, median, mean, stdDev, nanCount, infCount and a histogram for each column, one table per LOD. Each LOD also reports a `fillRatio` — total splat footprint area over the scene's robust (p1–p99) cross-section, approximately the average overdraw layer count: healthy scenes score in the ones-to-hundreds, while degenerate or adversarial scenes that would overwhelm a GPU with fill score orders of magnitude higher, making the value suitable for automated publish gating. A `+Infinity` scale propagates to an infinite ratio, which serializes as `null` in JSON — treat that as a reject. The JSON form is the same info fields plus a columnar per-LOD `stats` array. The stats are computed in a single streaming pass; the median is approximated from a 1024-bin histogram (error within ~1/1000 of the column's range), all other fields are exact.

### Generators (Beta)

Generator scripts synthesize Gaussian splat data procedurally. See the [example generator scripts](https://github.com/playcanvas/splat-transform/tree/main/generators) in the GitHub repository for more.

```bash
splat-transform gen-grid.mjs -p width=10,height=10,scale=10,color=0.1 scenes/grid.ply -w
```

### Voxel Pipeline (Collision)

The voxel format stores a sparse voxel octree for collision detection (`.voxel.json` + `.voxel.bin`). Pass `--collision-mesh` to also emit a `.collision.glb` mesh derived from the voxel grid. The recommended pipeline:

```bash
splat-transform input.ply \
    --filter-cluster --seed-pos x,y,z \
    [--voxel-external-fill | --voxel-floor-fill] [--voxel-carve] \
    [--collision-mesh [smooth|faces]] \
    output.voxel.json
```

For a step-by-step walkthrough of each option (with illustrations) and full interior/exterior recipes, see the [Collision Mesh](/user-manual/splat-transform/collision) guide.

### Image Rendering

Render a splat scene to a lossless WebP image from a given camera view. Rendering runs on the GPU.

```bash
# Default 1280x720 render
splat-transform input.ply view.webp

# Custom camera and resolution
splat-transform input.ply view.webp \
    --camera-pos 2,1,-2 --camera-target 0,0,0 \
    --camera-fov 50 --resolution 1920x1080

# Transparent background
splat-transform input.ply view.webp --background 0,0,0,0

# Defocus blur (focus on camera-target, f/2.8 aperture)
splat-transform input.ply view.webp --f-stop 2.8

# Defocus with explicit focus distance and a smaller world scale
splat-transform input.ply view.webp \
    --f-stop 2.8 --focus-distance 3 --sensor-size 0.1

# 360° equirectangular panorama from camera position
splat-transform input.ply pano.webp \
    --projection equirect --camera-pos 0,1,0 --camera-target 0,1,1

# Camera motion blur (dolly from start to end pose over the shutter)
splat-transform input.ply view.webp \
    --camera-pos 2,1,-2 --camera-pos-end 3,1,-2 \
    --motion-samples 16 --shutter 1
```

### Device Selection for SOG Compression

When compressing to SOG format, you can control which device (GPU or CPU) performs the compression:

```bash
# List available GPU adapters
splat-transform --list-gpus

# Let WebGPU automatically choose the best GPU (default behavior)
splat-transform input.ply output.sog

# Explicitly select a GPU adapter by index
splat-transform -g 0 input.ply output.sog  # Use first listed adapter
splat-transform -g 1 input.ply output.sog  # Use second listed adapter

# Use CPU for compression instead (much slower but always available)
splat-transform -g cpu input.ply output.sog
```

:::note

When `-g` is not specified, WebGPU automatically selects the best available GPU. Use `--list-gpus` to list available adapters with their indices and names. The order and availability of adapters depend on your system and GPU drivers. Use `-g <index>` to select a specific adapter, or `-g cpu` to force CPU computation.

:::

:::warning

CPU compression can be significantly slower than GPU compression (often 5-10x slower). Use CPU mode only if GPU drivers are unavailable or problematic.

:::

## Common Workflows

### Production Optimization Pipeline

```bash
# Clean, limit spherical harmonic bands, and apply a scale for production
splat-transform raw_capture.ply \
  --filter-nan \
  --filter-harmonics 2 \
  -s 0.8 \
  production/capture.sog
```

### Format Migration

```bash
# Convert existing KSPLAT assets to PlayCanvas SOG
for file in *.ksplat; do
  splat-transform "$file" "${file%.ksplat}.sog"
done
```

### Quality Analysis

```bash
# Export for quality analysis in a spreadsheet
splat-transform scene.ply \
  --filter-nan \
  -V opacity,gt,0.05 \
  quality_analysis.csv
```

### Multi-Scene Composition

```bash
# Combine multiple scenes with precise positioning
splat-transform \
  environment.ply -t 0,0,0 \
  character.ply -t 2,0,1 -r 0,180,0 \
  props.ply -t -3,0,2 -s 1.2 \
  complete_scene.ply
```

### Generating Streamed SOG {#generating-lod-format}

The [Streamed SOG](/user-manual/gaussian-splatting/formats/streamed-sog) format packages multiple LOD levels of a scene into spatial chunks for progressive loading of very large scenes. The full walkthrough — tagging inputs with `--tag-lod`, generating LOD levels with `--decimate`, tuning chunk settings, and reading Streamed SOG back — lives on its own page:

**[Generating Streamed SOG →](/user-manual/splat-transform/streamed-sog)**

## Getting Help

```bash
# General help
splat-transform --help

# Get version information
splat-transform --version
```

For issues, feature requests, or contributions, visit the [GitHub repository](https://github.com/playcanvas/splat-transform). The project welcomes bug reports and pull requests from the community.
