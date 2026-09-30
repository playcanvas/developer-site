# SplatTransform

[SplatTransform](https://github.com/playcanvas/splat-transform) is an open source library and CLI tool for converting and editing Gaussian splats. Whether you need to convert between formats, apply transformations, filter data, generate collision volumes, or analyze splat statistics, SplatTransform gives developers precise control over their Gaussian splat workflows. The library is platform-agnostic and runs in both Node.js and browser environments.

:::note Open Source

SplatTransform is [open-sourced under an MIT license on GitHub](https://github.com/playcanvas/splat-transform).

:::

:::tip Prefer a web UI?

The [SuperSplat Convert page](https://developer.playcanvas.com/user-manual/supersplat/convert.md) at [superspl.at/convert](https://superspl.at/convert) is the web frontend to splat-transform. It runs the same conversions and transforms in your browser via WebAssembly — no installation required. Use the web UI for one-off conversions and the CLI below for scripted or batch workflows.

:::

## Why Use SplatTransform?

SplatTransform solves the problems developers face when working with Gaussian splats:

🔄 **Broad Format Support** — convert between the common splat formats, from PLY and SPZ to SOG and Streamed SOG, and export to glTF, CSV, standalone HTML viewers and WebP images ([full list](https://developer.playcanvas.com/user-manual/splat-transform/cli-reference.md#supported-formats))  
🛠️ **Powerful Transformations** — translate, rotate, and scale your splats with precision  
🧹 **Smart Filtering** — strip NaN/Inf, filter by value, box, sphere, harmonic band, or floater contribution, and keep only the connected cluster around a seed point  
📐 **Decimation & Reordering** — simplify via memory-bounded merge-based decimation (uniform or error-adaptive) that scales to 100M+ Gaussians, and reorder by Morton code for spatial locality  
🧱 **Collision Generation** — voxelize a scene into a sparse octree and emit a `.collision.glb` mesh ready for runtime physics  
🖼️ **Image Rendering** — render a scene to a lossless WebP from a configurable camera view, with panoramas, defocus, and motion blur, or render a camera animation as a frame sequence  
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

For running on a backend with Docker (including GPU/Vulkan setup), see the [Docker Backend](https://developer.playcanvas.com/user-manual/splat-transform/docker.md) guide.

## Quick Start

Convert a PLY file to SOG for web delivery:

```bash
splat-transform scene.ply scene.sog
```

The format of each file is detected from its extension. Actions go after the file they apply to and run in the order given. This run scales the scene, raises it by one unit, and removes invalid Gaussians before writing:

```bash
splat-transform scene.ply -s 0.5 -t 0,1,0 --filter-nan scene.sog
```

Add `-w` to overwrite an output file that already exists. The general form is `splat-transform [GLOBAL] input [ACTIONS] ... output [ACTIONS]`: see [Command Syntax](https://developer.playcanvas.com/user-manual/splat-transform/cli-reference.md#command-syntax) for the full rules and [Supported Formats](https://developer.playcanvas.com/user-manual/splat-transform/cli-reference.md#supported-formats) for every file type.

## Guides

- [CLI Reference](https://developer.playcanvas.com/user-manual/splat-transform/cli-reference.md) — every option, the supported formats, and which features need a GPU.
- [Generating Streamed SOG](https://developer.playcanvas.com/user-manual/splat-transform/streamed-sog.md) — build a multi-LOD Streamed SOG from a single PLY.
- [Collision Mesh Generation](https://developer.playcanvas.com/user-manual/splat-transform/collision.md) — generate voxel/collision data from a splat scene.
- [Rendering Images](https://developer.playcanvas.com/user-manual/splat-transform/image-rendering.md) — render views, panoramas, depth of field, motion blur and camera animations to WebP.
- [Library Usage](https://developer.playcanvas.com/user-manual/splat-transform/library.md) — drive splat-transform programmatically from Node.js or the browser. The full TypeDoc reference lives at [api.playcanvas.com/splat-transform](https://api.playcanvas.com/splat-transform/).
- [Docker Backend](https://developer.playcanvas.com/user-manual/splat-transform/docker.md) — run splat-transform on a backend (incl. GPU/Vulkan setup).

The file formats themselves are specified in [Splat File Formats](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats.md) and the [Voxel Format](https://developer.playcanvas.com/user-manual/splat-transform/voxel-format.md) specification. To load Streamed SOG output in a PlayCanvas app, see [LOD Streaming](https://developer.playcanvas.com/user-manual/gaussian-splatting/building/lod-streaming.md).

## Examples

### Format Conversion

```bash
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
```

To convert a whole folder, call splat-transform once per file:

```bash
# Convert existing KSPLAT assets to PlayCanvas SOG
for file in *.ksplat; do
  splat-transform "$file" "${file%.ksplat}.sog"
done
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

# Clean a raw capture and write it straight to SOG for production
splat-transform raw_capture.ply --filter-nan --filter-harmonics 2 production/capture.sog
```

`--filter-floaters` and `--filter-cluster` remove stray Gaussians by voxelizing the scene on the GPU. The [Collision Mesh Generation](https://developer.playcanvas.com/user-manual/splat-transform/collision.md) guide shows `--filter-cluster` isolating the scene around a seed point, which works just as well when the output is a splat file.

### Decimation

`--decimate` simplifies a scene to a target count via merge-based decimation, removing at a uniform rate everywhere. `--decimate-adaptive` allocates removal by local error instead, which is much better on mixed-scale content such as skies, at a higher memory cost. Either must be the last action, and the output must be `.ply`, so convert the result in a second run if you need another format.

```bash
# Simplify to 50000 splats via merge-based decimation
splat-transform input.ply --decimate 50000 output.ply

# Simplify to 25% of original splat count
splat-transform input.ply -d 25% output.ply

# Allocate removal by local error (better on mixed-scale content such as skies)
splat-transform input.ply --decimate-adaptive 25% output.ply

# Then convert the decimated PLY for delivery
splat-transform output.ply output.sog

# Deep target on a huge scene: give the intermediate levels somewhere to go
splat-transform huge.ply -d 1% --scratch-dir /mnt/scratch output.ply
```

Decimation works within a memory budget of half the machine's RAM (at most 48 GiB). When a deep target on a huge scene produces an intermediate level that doesn't fit, the run stops with an error unless `--scratch-dir` is set; with it, those levels are written there as temporary PLY files and removed once consumed.

Decimation is also how you build the lower-detail levels of a Streamed SOG from one source; see [Generating Streamed SOG](https://developer.playcanvas.com/user-manual/splat-transform/streamed-sog.md).

### Scene Merging

List several inputs to merge them into one output. Actions after an input apply to that input alone; actions after the output apply to the merged result:

```bash
# Place each scene before merging
splat-transform \
  environment.ply \
  character.ply -t 2,0,1 -r 0,180,0 \
  props.ply -t -3,0,2 -s 1.2 \
  complete_scene.ply

# Apply final transformations to the combined result
splat-transform input1.ply input2.ply output.ply -t 0,0,10 -s 0.5
```

### Inspecting Scenes

`--info` prints a scene's structural metadata: the detected format, whether the file holds Gaussian splat data at all, Gaussian and per-LOD counts, SH bands, the [antialiased or 2DGS tag](https://developer.playcanvas.com/user-manual/splat-transform/cli-reference.md#antialiased-and-2dgs-scenes) if there is one, and any extra columns. `--stats` prints the same block followed by per-column statistics, for data analysis or test validation:

```bash
# Check what a file contains without writing anything
splat-transform input.ply --info null

# Print stats, then write output
splat-transform input.ply --stats output.ply

# Print stats as JSON for scripting
splat-transform input.ply --stats json null

# Print stats before and after a transform
splat-transform input.ply --stats -s 0.5 --stats output.ply

# Export the cleaned-up data for analysis in a spreadsheet
splat-transform scene.ply --filter-nan -V opacity,gt,0.05 quality_analysis.csv
```

The info block's `gaussian` verdict is `false` for a readable container that isn't splat data, such as a plain point-cloud PLY. The stats follow as min, max, median, mean, stdDev, nanCount, infCount and a histogram for each column, one table per LOD. Each LOD also reports a `fillRatio` — total splat footprint area over the scene's robust (p1–p99) cross-section, approximately the average overdraw layer count: healthy scenes score in the ones-to-hundreds, while degenerate or adversarial scenes that would overwhelm a GPU with fill score orders of magnitude higher, making the value suitable for automated publish gating. A `+Infinity` scale propagates to an infinite ratio, which serializes as `null` in JSON — treat that as a reject. The JSON form is the same info fields plus a columnar per-LOD `stats` array. The stats are computed in a single streaming pass; the median is approximated from a 1024-bin histogram (error within ~1/1000 of the column's range), all other fields are exact.

### Generators (Beta)

Generator scripts synthesize Gaussian splat data procedurally. See the [example generator scripts](https://github.com/playcanvas/splat-transform/tree/main/generators) in the GitHub repository for more.

```bash
splat-transform gen-grid.mjs -p width=10,height=10,scale=10,color=0.1 scenes/grid.ply -w
```

## Getting Help

```bash
splat-transform --help
```

For issues, feature requests, or contributions, visit the [GitHub repository](https://github.com/playcanvas/splat-transform). The project welcomes bug reports and pull requests from the community.
