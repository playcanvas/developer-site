---
title: SplatTransform CLI Tool
---

[SplatTransform](https://github.com/playcanvas/splat-transform) is a powerful command-line tool designed to make working with 3D Gaussian Splats effortless. Whether you need to convert between formats, apply transformations, or analyze splat data, SplatTransform provides the tools developers need for precise control over their Gaussian splat workflows.

:::note Open Source

SplatTransform is [open-sourced under an MIT license on GitHub](https://github.com/playcanvas/splat-transform)

:::

## Why Use SplatTransform?

SplatTransform solves important problems developers face when working with Gaussian splats:

🔄 **Broad Format Support** — seamlessly convert between PLY, SPLAT, KSPLAT, SOG and even CSV  
🛠️ **Powerful Transformations** — translate, rotate, and scale your splats with precision  
🧹 **Smart Filtering** — remove NaN values, filter by properties, and strip unnecessary data  
📦 **Scene Merging** — combine multiple splat files into a merged scene  
⚡ **Production Ready** — optimized for maximum performance  
🆓 **Open Source** — completely free and available on GitHub

## Installation

Install SplatTransform globally via npm:

```bash
npm install -g @playcanvas/splat-transform
```

Verify your installation:

```bash
splat-transform --version
```

## Basic Usage

The general syntax for SplatTransform is:

```bash
splat-transform [GLOBAL] input [ACTIONS] ... output [ACTIONS]
```

**Key points:**

- Input files become the working set; ACTIONS are applied in order
- The last file is the output; actions after it modify the final result

### Format Conversion

Convert between commonly used splat formats with simple commands:

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

# Convert to standalone HTML viewer
splat-transform input.ply output.html

# Convert to HTML viewer with custom settings
splat-transform -E settings.json input.ply output.html
```

SplatTransform detects file format based on extension. Supported formats are shown below:

| Format | Input | Output | Description |
| ------ | ----- | ------ | ----------- |
| `.ply` | ✅ | ✅ | Standard PLY format |
| `.sog` | ✅ | ✅ | Bundled super-compressed format (recommended) |
| `meta.json` | ✅ | ✅ | Unbundled super-compressed format (accompanied by `.webp` textures) |
| `lod-meta.json` | ❌ | ✅ | Level of detail format with octree structure |
| `.compressed.ply` | ✅ | ✅ | Compressed PLY format (auto-detected and decompressed on read) |
| `.lcc` | ✅ | ❌ | Level of detail container format |
| `.ksplat` | ✅ | ❌ | Compressed splat format (mkkellogg format) |
| `.splat` | ✅ | ❌ | Compressed splat format (antimatter15 format) |
| `.spz` | ✅ | ❌ | Compressed splat format (Niantic format) |
| `.mjs` | ✅ | ❌ | Generate a scene using an mjs script (Beta) |
| `.csv` | ❌ | ✅ | Comma-separated values spreadsheet |
| `.html` | ❌ | ✅ | Standalone HTML viewer app (embeds SOG format) |

## Actions

Actions can be repeated and applied in any order to transform and filter your splats:

```none
-t, --translate        <x,y,z>          Translate splats by (x, y, z)
-r, --rotate           <x,y,z>          Rotate splats by Euler angles (x, y, z) in degrees
-s, --scale            <factor>         Uniformly scale splats by factor
-H, --filter-harmonics <0|1|2|3>        Remove spherical harmonic bands > n
-N, --filter-nan                        Remove Gaussians with NaN or Inf values
-B, --filter-box       <x,y,z,X,Y,Z>    Remove Gaussians outside box (min, max corners)
-S, --filter-sphere    <x,y,z,radius>   Remove Gaussians outside sphere (center, radius)
-V, --filter-value     <name,cmp,value> Keep splats where <name> <cmp> <value>
                                          cmp ∈ {lt,lte,gt,gte,eq,neq}
-p, --params           <key=val,...>    Pass parameters to .mjs generator script
-l, --lod              <n>              Specify the level of detail, n >= 0
```

## Global Options

```none
-h, --help                              Show this help and exit
-v, --version                           Show version and exit
-q, --quiet                             Suppress non-error output
-w, --overwrite                         Overwrite output file if it exists
-c, --cpu                               Use CPU for SOG spherical harmonic compression
-i, --iterations       <n>              Iterations for SOG SH compression (more=better). Default: 10
-E, --viewer-settings  <settings.json>  HTML viewer settings JSON file
-O, --lod-select       <n,n,...>        Comma-separated LOD levels to read from LCC input
-C, --lod-chunk-count  <n>              Approximate number of Gaussians per LOD chunk in K. Default: 512
-X, --lod-chunk-extent <n>              Approximate size of an LOD chunk in world units (m). Default: 16
```

:::note

See the [SuperSplat Viewer Settings Schema](https://github.com/playcanvas/supersplat-viewer?tab=readme-ov-file#settings-schema) for details on how to pass data to the `-E` option.

:::

## Transformations

### Apply Spatial Transformations

Transform your splats during conversion with intuitive command-line options:

```bash
# Scale and translate
splat-transform bunny.ply -s 0.5 -t 0,0,10 bunny_scaled.ply

# Rotate by 90 degrees around Y axis
splat-transform input.ply -r 0,90,0 output.ply

# Chain multiple transformations
splat-transform input.ply -s 2 -t 1,0,0 -r 0,0,45 output.ply
```

## Filtering and Optimization

### Smart Filtering

Remove unwanted data and optimize your splats for production:

```bash
# Remove entries containing NaN and Inf
splat-transform input.ply --filter-nan output.ply

# Filter by opacity values (keep only splats with opacity > 0.5)
splat-transform input.ply -V opacity,gt,0.5 output.ply

# Strip spherical harmonic bands higher than 2
splat-transform input.ply --filter-harmonics 2 output.ply
```

## Scene Merging

Combine multiple splat files into a single scene with individual transformations:

```bash
# Combine multiple files with different transforms
splat-transform -w cloudA.ply -r 0,90,0 cloudB.ply -s 2 merged.compressed.ply

# Apply final transformations to combined result
splat-transform input1.ply input2.ply output.ply -t 0,0,10 -s 0.5
```

## CSV Export for Data Analysis

One of SplatTransform's most powerful features is CSV export, enabling data science workflows:

```bash
# Export splat data to CSV
splat-transform scene.ply data.csv

# Pre-filter before exporting for analysis
splat-transform input.ply --filter-nan -V opacity,gt,0.1 analysis.csv
```

### Why CSV Export Matters

- **Spreadsheet Analysis** — Import directly into Excel, Google Sheets, or any data analysis tool
- **Statistical Insights** — Calculate distributions, correlations, and quality metrics
- **Custom Filtering** — Use spreadsheet formulas to identify outliers or segment data
- **Visualization** — Create charts and graphs to understand splat data patterns
- **Integration** — Feed splat data into machine learning pipelines or custom workflows

CSV export transforms your splats from opaque binary files into readable, analyzable datasets perfect for research and optimization.

## Generators (Beta)

Generator scripts can be used to synthesize gaussian splat data. This allows you to procedurally create splat scenes using JavaScript:

```bash
splat-transform gen-grid.mjs -p width=10,height=10,scale=10,color=0.1 scenes/grid.ply -w
```

See the [example generator scripts](https://github.com/playcanvas/splat-transform/tree/main/generators) in the GitHub repository for more details.

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
# Export for quality analysis in spreadsheet
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

### Generating LOD Format

The LOD (Level of Detail) format enables efficient streaming and rendering of large gaussian splat scenes. The tool takes multiple pre-generated LOD files as input and generates an optimized streaming format with an octree structure for optimal download performance.

**Note:** The tool does NOT create the LOD levels themselves - you must supply multiple LOD files with progressively fewer gaussians (LOD 0 = highest detail, higher numbers = lower detail).

```bash
# Generate LOD streaming format from multiple input files
# Each input file represents a different detail level (LOD 0 is highest quality)
splat-transform \
  lod0.ply -l 0 \
  lod1.ply -l 1 \
  lod2.ply -l 2 \
  lod3.ply -l 3 \
  output/lod-meta.json \
  --filter-nan \
  --filter-harmonics 0

# Generate LOD with custom chunk settings for better performance
splat-transform \
  -C 1024 \
  -X 32 \
  lod0.ply -l 0 \
  lod1.ply -l 1 \
  lod2.ply -l 2 \
  output/lod-meta.json \
  --filter-nan

# For very large scenes, increase Node.js memory allocation
node --max-old-space-size=32000 node_modules/.bin/splat-transform \
  lod0.ply -l 0 \
  lod1.ply -l 1 \
  lod2.ply -l 2 \
  lod3.ply -l 3 \
  output/lod-meta.json \
  --filter-nan \
  --filter-harmonics 0
```

**Tips:**

- Use `--filter-nan` to remove invalid gaussians before processing
- Use `--filter-harmonics 0` to reduce file size if color detail is less critical
- Use `-C` to control the number of generated SOG files containing splats
- Use `-X` to control the size of each node. Increase for very large scenes to avoid generating a huge number of nodes to manage
- For very large scenes, use Node's `--max-old-space-size` flag to give it more memory

## Getting Help

Get help for any command:

```bash
# General help
splat-transform --help

# Get version information
splat-transform --version
```

For issues, feature requests, or contributions, visit the [GitHub repository](https://github.com/playcanvas/splat-transform). The project welcomes bug reports and pull requests from the community.
