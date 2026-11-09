# Splat File Formats

PlayCanvas supports six formats for 3D Gaussian Splat data:

## [PLY Format](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/ply.md) - Source & Interchange

The industry standard for Gaussian splat data. Uncompressed, full precision, and universally compatible.

- **Use for**: Training, editing, archival storage
- **File size**: Large (anything up to several GB)
- **Quality**: Lossless

## [SOG Format](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/sog.md) - Runtime & Delivery

Compressed format optimized for web delivery. 15-20× smaller than PLY with lossy compression.

- **Use for**: Web apps, real-time rendering, CDN delivery
- **File size**: Small (compressed)
- **Quality**: Visually optimized

## [Streamed SOG Format](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/streamed-sog.md) - Large-Scene Streaming

SOG chunks organized into a spatial tree with multiple levels of detail. Viewers stream in only the chunks and detail levels needed for the current camera.

- **Use for**: Very large scenes (tens of millions of Gaussians), progressive loading
- **File size**: Small per chunk, loaded on demand
- **Quality**: Visually optimized, view-dependent detail

## [GLB Format](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/glb.md) - Standards-Based Interchange

Binary glTF with the Khronos [KHR_gaussian_splatting](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_gaussian_splatting) extension. Splats travel through standard glTF pipelines and can be combined with regular mesh content.

- **Use for**: Interoperability, standard glTF tooling and pipelines
- **File size**: Large (uncompressed, similar to PLY)
- **Quality**: Lossless

## [SPZ Format](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/spz.md) - Compressed Interchange

[Niantic's](https://github.com/nianticlabs/spz) open source compressed splat format, roughly 10× smaller than PLY. Loaded via a parser script that ships with the engine.

- **Use for**: Assets from the Niantic/Scaniverse ecosystem
- **File size**: Small (compressed)
- **Quality**: Visually optimized

## [LCC2 Format](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/lcc2.md) - XGRIDS Large-Scene Streaming

[XGRIDS'](https://github.com/xgrids/LCC2Whitepaper) level of detail tree of splat files, stored as SOG or SPZ. The engine streams `.lcc2` scenes directly, so scenes exported by XGRIDS software need no conversion.

- **Use for**: Large scans from XGRIDS scanners and LCC Studio
- **File size**: Small per chunk, loaded on demand
- **Quality**: Lossy, view-dependent detail

## Quick Comparison

| | PLY | SOG | Streamed SOG | GLB | SPZ | LCC2 |
|---|---|---|---|---|---|---|
| **Size** | Large | Small (15-20× compression) | Small (SOG chunks, loaded on demand) | Large | Small (~10× compression) | Small (SOG or SPZ chunks, loaded on demand) |
| **Quality** | Lossless | Lossy | Lossy, view-dependent detail | Lossless | Lossy | Lossy, view-dependent detail |
| **Use** | Source/editing | Runtime/delivery | Very large scenes | glTF interchange | Niantic ecosystem | XGRIDS scans |
| **Speed** | Slow loading | Fast loading | Progressive streaming | Fast loading | Fast loading | Progressive streaming |

## Workflow

1. Train and edit with **PLY**
2. Convert to **SOG** for production using [SplatTransform](https://developer.playcanvas.com/user-manual/splat-transform.md)
3. For very large scenes, convert to **Streamed SOG** instead
4. Use **GLB** when splats need to flow through standard glTF pipelines
5. Load **SPZ** directly when assets come from tools like Scaniverse
6. Load **LCC2** directly when scenes come from XGRIDS scanners
7. Deploy for optimal performance
