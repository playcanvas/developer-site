---
title: Splat File Formats
---

PlayCanvas supports two formats for 3D Gaussian Splat data:

## [PLY Format](./ply.md) - Source & Interchange

The industry standard for Gaussian splat data. Uncompressed, full precision, and universally compatible.

- **Use for**: Training, editing, archival storage
- **File size**: Large (anything up to several GB)
- **Quality**: Lossless

## [SOG Format](./sog.md) - Runtime & Delivery

Compressed format optimized for web delivery. 15-20× smaller than PLY with lossy compression.

- **Use for**: Web apps, real-time rendering, CDN delivery
- **File size**: Small (compressed)
- **Quality**: Visually optimized

## Quick Comparison

| | PLY | SOG |
|---|---|---|
| **Size** | Large | Small (15-20× compression) |
| **Quality** | Lossless | Lossy |
| **Use** | Source/editing | Runtime/delivery |
| **Speed** | Slow loading | Fast loading |

## Workflow

1. Train and edit with **PLY**
2. Convert to **SOG** for production using [SplatTransform](../editing/splat-transform.md)
3. Deploy SOG files for optimal performance
