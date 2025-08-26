---
title: SplatTransform CLI Tool
---

[SplatTransform](https://github.com/playcanvas/splat-transform) is a powerful command-line tool designed to make working with 3D Gaussian Splats effortless. Whether you need to convert between formats, apply transformations, or analyze splat data, SplatTransform provides the tools developers need for precise control over their Gaussian splat workflows.

:::note Open Source

SplatTransform is [open-sourced under an MIT license on GitHub](https://github.com/playcanvas/splat-transform)

:::

## Why Use SplatTransform?

SplatTransform solves important problems developers face when working with Gaussian splats:

🔄 **Broad Format Support** — seamlessly convert between PLY, SPLAT, KSPLAT, SOGS and even CSV  
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

### Format Conversion

Convert between commonly used splat formats with simple commands:

```bash
# Convert KSPLAT to PLY
splat-transform input.ksplat converted.ply

# Convert PLY to SOGS format  
splat-transform input.ply meta.json

# Convert to SPLAT format
splat-transform input.ply output.splat
```

SplatTransform detects file format based on extension. Supported formats are shown below:

| Format | Extension | Input | Output | Description |
|--------|-----------|-------|--------|-------------|
| PLY | `.ply` | ✅ | ✅ | Uncompressed binary format |
| Compressed PLY | `.compressed.ply` | ✅ | ✅ | Compressed binary format |
| SPLAT | `.splat` | ✅ | ❌ | Binary format (antimatter15) |
| KSPLAT | `.ksplat` | ✅ | ❌ | Compressed binary format (mkkellogg) |
| SOGS | `meta.json` | ❌ | ✅ | Super-compressed format (JSON + WebP) |
| CSV | `.csv` | ❌ | ✅ | Comma-separated values for analysis |

## Transformations

### Apply Spatial Transformations

Transform your splats during conversion with intuitive command-line options:

```bash
# Translate splats
splat-transform input.ply -t 0,0,10 translated.ply

# Rotate around Y-axis by 90 degrees
splat-transform input.ply -r 0,90,0 rotated.ply

# Scale splats by 50%
splat-transform input.ply -s 0.5 scaled.ply

# Combine multiple transformations
splat-transform input.ply -s 0.5 -t 0,0,10 -r 0,90,0 transformed.ply
```

### Transformation Options

| Option | Description | Format |
|--------|-------------|--------|
| `-t, --translate` | Translation vector | `x,y,z` |
| `-r, --rotate` | Rotation in degrees | `x,y,z` |
| `-s, --scale` | Uniform scale factor | `number` |

## Filtering and Optimization

### Smart Filtering

Remove unwanted data and optimize your splats for production:

```bash
# Remove NaN values
splat-transform input.ply --filterNaN cleaned.ply

# Filter by opacity (keep splats with opacity > 0.3)
splat-transform input.ply -c opacity,gt,0.3 filtered.ply

# Remove unnecessary data bands
splat-transform input.ply --filterBands 2 optimized.ply

# Combine multiple filters
splat-transform input.ply --filterNaN -c opacity,gt,0.1 --filterBands 2 production.ply
```

### Filter Options

| Option | Description | Usage |
|--------|-------------|-------|
| `-n, --filterNaN` | Remove splats with NaN values | `--filterNaN` |
| `-c, --condition` | Filter by property condition | `-c property,operator,value` |
| `-b, --filterBands` | Retain specified number of spherical-harmonic bands | `--filterBands 0/1/2/3` |

#### Condition Operators

- `gt` - Greater than
- `lt` - Less than
- `eq` - Equal to
- `gte` - Greater than or equal
- `lte` - Less than or equal

## Scene Merging

Combine multiple splat files into a single scene with individual transformations:

```bash
# Simple merge
splat-transform fileA.ply fileB.ply merged.ply

# Merge with different transformations per file
splat-transform inputA.ply -r 0,90,0 inputB.ply -s 2 merged.ply

# Complex multi-file merge
splat-transform \
  scene1.ply -t 0,0,0 \
  scene2.ply -t 10,0,0 -r 0,45,0 \
  scene3.ply -t 0,0,10 -s 0.8 \
  combined_scene.ply
```

## CSV Export for Data Analysis

One of SplatTransform's most powerful features is CSV export, enabling data science workflows:

```bash
# Export splat data to CSV
splat-transform scene.ply data.csv

# Pre-filter before exporting for analysis
splat-transform input.ply --filterNaN -c opacity,gt,0.1 analysis.csv
```

### Why CSV Export Matters

- **Spreadsheet Analysis** — Import directly into Excel, Google Sheets, or any data analysis tool
- **Statistical Insights** — Calculate distributions, correlations, and quality metrics
- **Custom Filtering** — Use spreadsheet formulas to identify outliers or segment data
- **Visualization** — Create charts and graphs to understand splat data patterns
- **Integration** — Feed splat data into machine learning pipelines or custom workflows

CSV export transforms your splats from opaque binary files into readable, analyzable datasets perfect for research and optimization.

## Common Workflows

### Production Optimization Pipeline

```bash
# Clean, limit spherical harmonic bands, and apply a scale for production
splat-transform raw_capture.ply \
  --filterNaN \
  --filterBands 2 \
  -s 0.8 \
  production/meta.json
```

### Format Migration

```bash
# Convert existing KSPLAT assets to PlayCanvas SOGS
for file in *.ksplat; do
  splat-transform "$file" "${file%.ksplat}_meta.json"
done
```

### Quality Analysis

```bash
# Export for quality analysis in spreadsheet
splat-transform scene.ply \
  --filterNaN \
  -c opacity,gt,0.05 \
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

## Getting Help

Get help for any command:

```bash
# General help
splat-transform --help

# Get version information
splat-transform --version
```

For issues, feature requests, or contributions, visit the [GitHub repository](https://github.com/playcanvas/splat-transform). The project welcomes bug reports and pull requests from the community.
