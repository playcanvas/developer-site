---
title: The PLY Format
---

[PLY](https://en.wikipedia.org/wiki/PLY_(file_format)) (Polygon File Format) is the standard file format for storing 3D Gaussian Splat data. While PLY has been around since the 1990s as a format for storing 3D mesh data, its use in Gaussian Splatting represents a specialized application with unique characteristics and considerations.

## What is the PLY Format?

PLY is a simple, flexible file format originally designed by Stanford University for storing 3D scanner data. It can store various types of 3D geometry including vertices, faces, colors, and custom properties. The format supports both ASCII (human-readable text) and binary encoding.

## File Structure

A PLY file containing 3D Gaussian Splat data consists of three main sections:

### Header

```none
ply
format binary_little_endian 1.0
element vertex 500000
property float x
property float y
property float z
property float scale_0
property float scale_1
property float scale_2
property float rot_0
property float rot_1
property float rot_2
property float rot_3
property float opacity
property float f_dc_0
property float f_dc_1
property float f_dc_2
property float f_rest_0
property float f_rest_1
...
property float f_rest_44
end_header
```

### Element Definitions

The header defines the structure and properties of elements (typically vertices representing individual Gaussian splats).

### Data Section

The actual binary or ASCII data follows the header, containing the values for each property of every element.

## How 3DGS PLYs Differ from Regular PLYs

Standard PLY files typically store simple mesh geometry with basic properties like position and color. 3D Gaussian Splat PLY files are fundamentally different:

### Extended Properties

3DGS PLY files contain specialized properties for each Gaussian splat:

- **Position** (`x`, `y`, `z`): 3D location of the splat center
- **Scale** (`scale_0`, `scale_1`, `scale_2`): Size of the Gaussian along each axis
- **Rotation** (`rot_0`, `rot_1`, `rot_2`, `rot_3`): Quaternion representing splat orientation
- **Opacity**: Transparency/alpha value
- **Spherical Harmonics Coefficients**: View-dependent color encoding using two sets of properties:
  - **Direct Color Component** (`f_dc_0`, `f_dc_1`, `f_dc_2`): The base color values (RGB) representing the 0th-order spherical harmonic coefficients. These define the primary color of the splat.
  - **Higher-Order Coefficients** (`f_rest_0` through `f_rest_44`): Additional spherical harmonic coefficients that encode how the color changes based on viewing direction. These 45 coefficients are distributed across higher-order bands:
    - **1st order**: 3 coefficients × 3 color channels = 9 coefficients
    - **2nd order**: 5 coefficients × 3 color channels = 15 coefficients  
    - **3rd order**: 7 coefficients × 3 color channels = 21 coefficients

### No Traditional Geometry

Unlike regular PLY files that contain vertices and faces defining mesh topology, 3DGS PLY files contain only point data with no connectivity information. Each "vertex" represents an independent Gaussian splat.

### Massive Point Counts

3DGS PLY files typically contain hundreds of thousands to millions of points, far exceeding typical mesh vertex counts.

## PLY as a Source Format

Think of PLY files in 3DGS workflows as you would PSD files for images or project files for video editing:

### Uncompressed and Complete

- Contains full-precision data with no quality loss
- Preserves all Gaussian splat parameters in their original form
- Allows for re-processing and optimization without degradation

### Archive and Backup

- Essential for long-term storage of your 3DGS captures
- Enables future re-processing with improved algorithms
- Serves as the canonical version of your 3D scene

### Quality Reference

- Maintain PLY files as your highest-quality reference
- Generate compressed formats from PLY for specific use cases
- Always keep the original PLY for quality comparisons

## PLY as an Interchange Format

The PLY format serves as the lingua franca of the 3DGS ecosystem:

### Universal Compatibility

- **Training Software**: Brush, nerfstudio, Postshot
- **Editors**: [SuperSplat Editor](../editing/supersplat/index.md)
- **Converters**: [SplatTransform](../editing/splat-transform.md)
- **Viewers**: [SuperSplat Viewer](https://github.com/playcanvas/supersplat-viewer), [Model Viewer](https://github.com/playcanvas/model-viewer)

### Cross-Platform Workflow

- Move assets between different 3DGS training pipelines
- Share datasets with collaborators regardless of their toolchain
- Maintain consistency across different processing stages

### Research and Development

- Standard format for academic research and paper submissions
- Enables reproducible results across different implementations
- Facilitates algorithm development and comparison

## Runtime Considerations

While PLY is excellent for source and interchange purposes, it has significant limitations for real-time applications:

### File Size Issues

- **Uncompressed**: No data compression leads to massive file sizes
- **Typical Sizes**: Can range from 50MB to several GB per scene
- **Network Transfer**: Impractical for web delivery without preprocessing
- **Storage Costs**: Expensive for cloud storage and CDN distribution

### Loading Performance

- **Parse Time**: Text parsing (ASCII PLY) is particularly slow
- **Memory Usage**: Entire file must be loaded into memory
- **Initialization**: No progressive loading or streaming capabilities

:::tip

Convert your PLYs to a more efficient run-time format using the [SplatTransform](../editing/splat-transform.md) tool. We currently recommend Self-Organizing Gaussians (AKA SOGS) to achieve the best compression ratios and fastest loading times.

:::
