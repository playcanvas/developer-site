---
title: The SPZ Format
description: "SPZ format for 3D Gaussian splats: Niantic's compressed splat format, loading in the engine via an external parser script, and conversion with SplatTransform."
sidebar_label: SPZ
---

**SPZ** is an open source compressed format for 3D Gaussian Splat data from [Niantic](https://github.com/nianticlabs/spz). It stores quantized splat attributes in ZSTD compressed streams, making files roughly 10× smaller than the PLY equivalent with virtually no perceptible loss in visual quality. It is the native format of apps like Scaniverse.

You can create these files with **[SplatTransform](/user-manual/splat-transform/)** and load them with the PlayCanvas Engine using a parser script.

## Creating SPZ Files

Convert any supported splat format using [SplatTransform](/user-manual/splat-transform/):

```bash
splat-transform scene.ply scene.spz
```

This writes SPZ version 4 by default, which is the version the engine parser supports.

## Loading in PlayCanvas

The SPZ parser is not part of the engine — it ships as a script with the engine ([`scripts/esm/parsers/spz-parser.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/parsers/spz-parser.mjs)) and is registered with the `gsplat` resource handler by the application.

The SPZ attribute streams are ZSTD compressed, so the parser also needs a ZSTD decompression WebAssembly module to be registered. A prebuilt module is available in the [engine repository](https://github.com/playcanvas/engine/tree/main/examples/assets/wasm/zstd).

```javascript
import { SpzParser } from 'playcanvas/scripts/esm/parsers/spz-parser.mjs';

// the spz attribute streams are ZSTD compressed - register a decoder module
pc.WasmModule.setConfig('ZstdDecoderModule', {
    glueUrl: 'zstd.wasm.js',
    wasmUrl: 'zstd.wasm.wasm'
});

// register the spz parser with the gsplat resource handler
app.loader.getHandler('gsplat').addParser(new SpzParser(app));

// spz files then load as regular gsplat assets
const asset = new pc.Asset('scene', 'gsplat', { url: 'scene.spz' });
app.assets.add(asset);
app.assets.load(asset);
```

See the [simple-spz example](https://playcanvas.github.io/#/gaussian-splatting/simple-spz) for a complete setup.

## Engine Support Notes

- Only SPZ **version 4** is supported. Older gzip-based files (versions 1–3) are rejected — reconvert them with [SplatTransform](/user-manual/splat-transform/).
- The splat data is kept in its quantized form in GPU memory (roughly 20 bytes per splat plus spherical harmonics) and dequantized in the shader, so GPU memory use is comparable to compressed PLY and SOG rather than uncompressed formats.
- Spherical harmonics are supported up to 3 bands. Files with degree 4 harmonics load with the extra band ignored.
- **Coordinate system**: splat data uses a +Y up coordinate system (like glTF), so unlike PLY files, no flip rotation is needed when placing the loaded splat in a scene.
- The `antialiased` flag and vendor extensions are ignored.

## When to Use SPZ

Use SPZ when your splat assets already exist in this format — for example scans captured with Scaniverse or content from tools built around the Niantic ecosystem.

:::tip

For web delivery, [SOG](./sog.md) remains the recommended format — it offers stronger compression and faster loading, and is supported by the engine out of the box.

:::
