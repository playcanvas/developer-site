---
title: Splat File Formats
description: "Compare PLY, SOG and Streamed SOG splat formats for editing versus web delivery, size and quality trade-offs, and typical conversion workflows."
---

PlayCanvas supports three formats for 3D Gaussian Splat data:

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

## [Streamed SOG Format](./streamed-sog.md) - Large-Scene Streaming

SOG chunks organized into a spatial tree with multiple levels of detail. Viewers stream in only the chunks and detail levels needed for the current camera.

- **Use for**: Very large scenes (tens of millions of Gaussians), progressive loading
- **File size**: Small per chunk, loaded on demand
- **Quality**: Visually optimized, view-dependent detail

## Quick Comparison

| | PLY | SOG | Streamed SOG |
|---|---|---|---|
| **Size** | Large | Small (15-20× compression) | Small (SOG chunks, loaded on demand) |
| **Quality** | Lossless | Lossy | Lossy, view-dependent detail |
| **Use** | Source/editing | Runtime/delivery | Very large scenes |
| **Speed** | Slow loading | Fast loading | Progressive streaming |

## Workflow

1. Train and edit with **PLY**
2. Convert to **SOG** for production using [SplatTransform](/user-manual/splat-transform/)
3. For very large scenes, convert to **Streamed SOG** instead
4. Deploy for optimal performance
