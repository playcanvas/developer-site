---
title: Splat File Formats
description: "Compare PLY, SOG, Streamed SOG, GLB and SPZ splat formats for editing versus web delivery, size and quality trade-offs, and typical conversion workflows."
---

PlayCanvas supports five formats for 3D Gaussian Splat data:

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

## [GLB Format](./glb.md) - Standards-Based Interchange

Binary glTF with the Khronos [KHR_gaussian_splatting](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_gaussian_splatting) extension. Splats travel through standard glTF pipelines and can be combined with regular mesh content.

- **Use for**: Interoperability, standard glTF tooling and pipelines
- **File size**: Large (uncompressed, similar to PLY)
- **Quality**: Lossless

## [SPZ Format](./spz.md) - Compressed Interchange

[Niantic's](https://github.com/nianticlabs/spz) open source compressed splat format, roughly 10× smaller than PLY. Loaded via a parser script that ships with the engine.

- **Use for**: Assets from the Niantic/Scaniverse ecosystem
- **File size**: Small (compressed)
- **Quality**: Visually optimized

## Quick Comparison

| | PLY | SOG | Streamed SOG | GLB | SPZ |
|---|---|---|---|---|---|
| **Size** | Large | Small (15-20× compression) | Small (SOG chunks, loaded on demand) | Large | Small (~10× compression) |
| **Quality** | Lossless | Lossy | Lossy, view-dependent detail | Lossless | Lossy |
| **Use** | Source/editing | Runtime/delivery | Very large scenes | glTF interchange | Niantic ecosystem |
| **Speed** | Slow loading | Fast loading | Progressive streaming | Fast loading | Fast loading |

## Workflow

1. Train and edit with **PLY**
2. Convert to **SOG** for production using [SplatTransform](/user-manual/splat-transform/)
3. For very large scenes, convert to **Streamed SOG** instead
4. Use **GLB** when splats need to flow through standard glTF pipelines
5. Load **SPZ** directly when assets come from tools like Scaniverse
6. Deploy for optimal performance
