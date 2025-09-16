---
title: SOG file format
---

SOG (Spatially Ordered Gaussians) is a compact file format for storing 3D Gaussian Splat data.  
It achieves high compression via **quantization** (lossy by design), typically yielding files **~15–20× smaller** than an equivalent PLY.

You can create SOG files with **[SplatTransform](https://github.com/playcanvas/splat-transform)** and preview them in the **[PlayCanvas Viewer](https://playcanvas.com/viewer)**.

This page documents the format at a high level.

## File Structure

### Overview

A SOG dataset stores Gaussian properties across multiple images plus a metadata file.  
The default set is:

| File                 | Contains                                |
| -------------------- | --------------------------------------- |
| `meta.json`          | Scene metadata and image file mapping   |
| `means_l.webp`       | Positions - lower 8 bits                |
| `means_u.webp`       | Positions - upper 8 bits                |
| `quats.webp`         | Rotations                               |
| `scales.webp`        | Sizes / scales                          |
| `sh0.webp`           | Base color and alpha                    |
| `shN_labels.webp`    | Indices into spherical-harmonic palette |
| `shN_centroids.webp` | Spherical-harmonic palette              |

:::info Image formats
By default, images are stored as **lossless WebP** to preserve quantized values exactly.

Each property in `meta.json` specifies the filename to load, so other supported image formats can be used.

However, **lossy image compression will corrupt values** and typically results in visible/structural artifacts. Prefer lossless encodings.
:::

## Image layout & indexing

All per-Gaussian properties are co-located: the _same pixel_ across all property images belongs to the _same Gaussian_.

- Gaussian **0** → pixel **(x=0, y=0)**
- Gaussian **1** → pixel **(x=1, y=0)**
- Gaussian **2** → pixel **(x=2, y=0)**
- … continuing **left → right**, then **top → bottom** (row-major order)

Formally, with zero-based indexing and origin at the **top-left**:

## Coordinate System

SOG stores data in standard right-handed coordinate system:
- x: right
- y: up
- z: back

## Bundled format

SOG also supports a **bundled** variant in which the files above are simply **zipped** together into a single archive.  
A reader should unzip the archive and then load it exactly as a standard multi-file SOG.
