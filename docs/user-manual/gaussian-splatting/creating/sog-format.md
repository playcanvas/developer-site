---
title: SOG file format
---

SOG (Spatially Ordered Gaussians) is a compact file format for storing 3D Gaussian Splat data.  
It achieves high compression via **quantization** (lossy by design), typically yielding files **~15–20× smaller** than an equivalent PLY.

You can create SOG files with **[SplatTransform](https://github.com/playcanvas/splat-transform)** and preview them in the **[PlayCanvas Viewer](https://playcanvas.com/viewer)**.

This page documents the file format.

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

### Image layout & indexing

All per-Gaussian properties are co-located: the _same pixel_ across all property images belongs to the _same Gaussian_.

- Gaussian **0** → pixel **(x=0, y=0)**
- Gaussian **1** → pixel **(x=1, y=0)**
- Gaussian **2** → pixel **(x=2, y=0)**
- … continuing **left → right**, then **top → bottom** (row-major order)

Formally, with zero-based indexing and origin at the **top-left**:

### Coordinate System

SOG stores data in standard right-handed coordinate system:
- x: right
- y: up
- z: back

### Bundled format

SOG also supports a **bundled** variant in which the files above are simply **zipped** together into a single archive.  
A reader should unzip the archive and then load it exactly as a standard multi-file SOG.

## File Data Layout

### meta.json

``` typescript
interface Meta {
    version: 2;             // File format version
    count: number;          // Number of gaussians
    antialias: boolean;     // True if the scene was trained with anti aliasing

    means: {
        // Per-axis ranges used to decode log-transformed positions.
        mins: [number, number, number];     // Minimum x, y, z
        maxs: [number, number, number];     // Maximum x, y, z
        files: [
            "means_l.webp",         // Image containing lower 8 bits of position
            "means_u.webp"          // Image containing upper 8 bits of position
        ];
    };

    scales: {
        codebook: number[];         // Array of 256 floats
        files: [
            "scales.webp"           // Image containing scale data
        ];
    };

    quats: {
        files: [
            "quats.webp"            // Image containing rotation data
        ];
    };

    sh0: {
        codebook: number[];         // Array of 256 floats
        files: [
            "sh0.webp"              // Image containing color and opacity data
        ];
    };

    // The following is present only if spherical harmonics exist
    shN?: {
        count: number;              // Number of entries in the palette
        bands: number;              // Number of bands in the palette (1..3)
        codebook: number[];         // Array of 256 floats
        files: [
            "shN_labels.webp"       // Image containing the per-gaussian palette indices
            "shN_centroids.webp",   // Image containing the spherical harmonic palette of coefficients
        ];
    };
}
```

### Data Layout

### means_l, means_u
Encodes the gaussian center in 16 bits, log-scaled.

``` typescript
const nx = lerp(meta.means.mins[0], meta.means.maxs[0], ((means_u.r << 8) + means_l.r) / 65535);
const ny = lerp(meta.means.mins[1], meta.means.maxs[1], ((means_u.g << 8) + means_l.g) / 65535);
const nz = lerp(meta.means.mins[2], meta.means.maxs[2], ((means_u.b << 8) + means_l.b) / 65535);

p.x = Math.sign(nx) * (Math.exp(Math.abs(nx)) - 1);
p.y = Math.sign(ny) * (Math.exp(Math.abs(ny)) - 1);
p.z = Math.sign(nz) * (Math.exp(Math.abs(nz)) - 1);
```

### quats
Encodes the gaussian orientation as a compressed quaternion in 8882 bits:

``` typescript
const a = (quats.r / 255 - 0.5) * norm;
const b = (quats.g / 255 - 0.5) * norm;
const c = (quats.b / 255 - 0.5) * norm;
const d = Math.sqrt(Math.max(0, 1 - (a * a + b * b + c * c)));
const mode = quats.a - 252;

switch (mode) {
    case 0: r = new Quaternion(a, b, c, d); break;
    case 1: r = new Quaternion(d, b, c, a); break;
    case 2: r = new Quaternion(b, d, c, a); break;
    case 3: r = new Quaternion(b, c, d, a); break;
}
```

### scales
Encodes the gaussian size as a reference into the scales codebook.

``` typescript
const sx = meta.scales.codebook[scales.r];
const sy = meta.scales.codebook[scales.g];
const sz = meta.scales.codebook[scales.b];
```

### sh0
Encodes the gaussian color and opacity.

``` typescript
const r = 0.5 + sh0.codebook[sh0.r] * SH_C0;
const g = 0.5 + sh0.codebook[sh0.g] * SH_C0;
const b = 0.5 + sh0.codebook[sh0.b] * SH_C0;
const a = sh0.a / 255;
```

