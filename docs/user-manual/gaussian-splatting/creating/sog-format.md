---
title: SOG file format
---

**SOG (Spatially Ordered Gaussians)** is a compact container for 3D Gaussian Splat data. It achieves high compression via quantization (lossy by design), typically yielding files **\~15–20× smaller** than an equivalent PLY.

You can create SOG files with **[SplatTransform](https://github.com/playcanvas/splat-transform)** and preview them in the **[PlayCanvas Viewer](https://playcanvas.com/viewer)**.

This document is the format specification.

## 1) File set

A SOG dataset is a set of images plus a metadata file:

| File                 | Purpose                             | Channels (8-bit) |
| -------------------- | ----------------------------------- | ---------------- |
| `meta.json`          | Scene metadata and filenames        | —                |
| `means_l.webp`       | Positions – lower 8 bits (RGB)      | R,G,B            |
| `means_u.webp`       | Positions – upper 8 bits (RGB)      | R,G,B            |
| `quats.webp`         | Orientation – compressed quaternion | R,G,B,A          |
| `scales.webp`        | Per-axis sizes via codebook         | R,G,B            |
| `sh0.webp`           | Base color (DC) + opacity           | R,G,B,A          |
| `shN_labels.webp`    | Indices into SH palette (optional)  | R,G              |
| `shN_centroids.webp` | SH palette coefficients (optional)  | RGBA             |

:::note[Image formats]
* By default, images SHOULD be **lossless WebP** to preserve quantized values exactly.
* Each property in `meta.json` names its file, so other 8-bit RGBA-capable formats MAY be used.
* Do not use lossy encodings for these assets as lossy compression will corrupt values and can produce visible/structural artifacts.
:::

### 1.1 Image dimensions & indexing

All per-Gaussian properties are co-located: the same pixel (x, y) across all property images (except shN_centroids) belongs to the same Gaussian.

* Pixels are laid out **row-major**, origin at the **top-left**.
* For image width `W` and height `H`, the number of addressable Gaussians is `W*H`.
* `meta.count` MUST be `<= W*H`. Any trailing pixels are ignored.

**Indexing math (zero-based):**

* From index to pixel:
  `x = i % W`, `y = floor(i / W)`
* From pixel to index:
  `i = x + y * W`

### 1.2 Coordinate system

Right-handed:

* **x:** right
* **y:** up
* **z:** back (i.e., −z is “forward” in camera-looking-down −z conventions)

### 1.3 Bundled variant

A bundled SOG is a ZIP of the files above. Readers **should** accept either layout:

* **Multi-file directory** (recommended during authoring)
* **Single archive** (e.g., `scene.sog`) containing the same files at the archive root

Readers **must** unzip and then resolve files using `meta.json` exactly as for the multi-file version.

---

## 2) `meta.json`

```ts
interface Meta {
  version: 2;              // File format version (integer)
  count: number;           // Number of gaussians (<= W*H of the images)
  antialias: boolean;      // True iff scene was trained with anti-aliasing

  means: {
    // Ranges for decoding *log-transformed* positions (see §3.1).
    mins: [number, number, number];   // min of nx,ny,nz (log-domain)
    maxs: [number, number, number];   // max of nx,ny,nz (log-domain)
    files: ["means_l.webp", "means_u.webp"];
  };

  scales: {
    codebook: number[];    // 256 floats; see §3.3
    files: ["scales.webp"];
  };

  quats: {
    files: ["quats.webp"]; // §3.2
  };

  sh0: {
    codebook: number[];    // 256 floats; maps quantized DC to linear color (§3.4)
    files: ["sh0.webp"];
  };

  // Present only if higher-order SH exist:
  shN?: {
    count: number;         // Palette size (up to 65536)
    bands: number;         // Number of SH bands (1..3). DC (=band 1) lives in sh0.
    codebook: number[];    // 256 floats; shared for all AC coefficients (§3.5)
    files: [
      "shN_labels.webp",   // Per-gaussian palette index (0..count-1)
      "shN_centroids.webp" // Palette of AC coefficients as pixels (§3.5)
    ];
  };
}
```

:::note
* All codebooks contain linear-space values, not sRGB.
* Image data **must** be treated as raw 8-bit integers (no gamma conversion).
* Unless otherwise stated, channels not mentioned are ignored.
:::

---

## 3) Property encodings

### 3.1 Positions

> `means_l.webp`, `means_u.webp` (RGB, 16-bit per axis)

Each axis is quantized to **16 bits** across two images:

```ts
// 16-bit normalized value per axis (0..65535)
const qx = (means_u.r << 8) | means_l.r;
const qy = (means_u.g << 8) | means_l.g;
const qz = (means_u.b << 8) | means_l.b;

// Dequantize into *log-domain* nx,ny,nz using per-axis ranges from meta:
const nx = lerp(meta.means.mins[0], meta.means.maxs[0], qx / 65535);
const ny = lerp(meta.means.mins[1], meta.means.maxs[1], qy / 65535);
const nz = lerp(meta.means.mins[2], meta.means.maxs[2], qz / 65535);

// Undo the symmetric log transform used at encode time:
const unlog = (n: number) => Math.sign(n) * (Math.exp(Math.abs(n)) - 1);

const p = {
  x: unlog(nx),
  y: unlog(ny),
  z: unlog(nz),
};
```

### 3.2 Orientation

> `quats.webp` (RGBA, 26-bit “smallest-three”)

Quaternions are encoded with **3×8-bit components + 2-bit mode** (total **26 bits**) using the standard *smallest-three* scheme.

* **R,G,B** store the three kept (signed) components, uniformly quantized to `[-√2/2, +√2/2]`.
* **A** stores the **mode** in the range **252..255**. The mode is `A - 252` ∈ {0,1,2,3} and identifies which of the four components was the **largest by magnitude** (and therefore omitted from the stream and reconstructed).
* Let `norm = Math.SQRT2` (i.e., √2).

```ts
// Dequantize the stored three components:
const toComp = (c: number) => (c / 255 - 0.5) * 2.0 / Math.SQRT2;

const a = toComp(quats.r);
const b = toComp(quats.g);
const c = toComp(quats.b);

const mode = quats.a - 252; // 0..3 (R,G,B,A is one of the four components)

// Reconstruct the omitted component so that ||q|| = 1 and w.l.o.g. the omitted one is non-negative
const t = a*a + b*b + c*c;
const d = Math.sqrt(Math.max(0, 1 - t));

// Place components according to mode
let q: [number, number, number, number];
switch (mode) {
    case 0: q = [d, a, b, c]; break; // omitted = x
    case 1: q = [a, d, b, c]; break; // omitted = y
    case 2: q = [a, b, d, c]; break; // omitted = z
    case 3: q = [a, b, c, d]; break; // omitted = w
    default: throw new Error("Invalid quaternion mode");
}
```

#### Validity constraints

* `quats.a` **must** be in **252, 253, 254, 255**. Other values are reserved.

### 3.3 Scales

> `scales.webp` (RGB via codebook)

Per-axis sizes are **codebook indices**:

```ts
const sx = meta.scales.codebook[scales.r]; // 0..255
const sy = meta.scales.codebook[scales.g];
const sz = meta.scales.codebook[scales.b];
```

Interpretation (e.g., principal axis standard deviations vs. full extents) follows the source training setup; values are in **scene units**.

### 3.4 Base color + opacity (DC)

> `sh0.webp` (RGBA)

`sh0` holds the **DC (l=0)** SH coefficient per color channel and **alpha**:

* **R,G,B** are 0..255 indices into `sh0.codebook` (linear domain).
* **A** is the **opacity** in `[0,1]` (i.e., `sh0.a / 255`).

To convert the DC coefficient to **linear RGB** contribution:

```ts
// SH_C0 = Y_0^0 = 1 / (2 * sqrt(pi))
const SH_C0 = 0.28209479177387814;

const r = 0.5 + meta.sh0.codebook[sh0.r] * SH_C0;
const g = 0.5 + meta.sh0.codebook[sh0.g] * SH_C0;
const b = 0.5 + meta.sh0.codebook[sh0.b] * SH_C0;
const a = sh0.a / 255;
```

> **Color space.** Values are **linear**. If you output to sRGB, apply the usual transfer after shading/compositing.

### 3.5 Higher-order SH (optional)

> `shN_labels.webp`, `shN_centroids.webp`

If present, higher-order (AC) SH coefficients are stored via a palette:

* `shN.count` ∈ **\[1,64k]** number of entries.
* `shN.bands` ∈ **\[1,3]** number of bands per entry.

#### Labels

* `shN_labels.webp` stores a **16-bit index** per gaussian with range (0..count-1).

```ts
const index = shN_labels.r + (shN_labels.g << 8);
```

#### Centroids (palette)

* `shN_centroids.webp` is an RGB image storing the SH coefficient palette.
* There are always 64 entries per row; entries are packed row-major with origin top-left.

The texture width is dependent on the number of bands:

| Bands | Coefficients | Texure width (pixels) |
|---|---|---|
| 1 | 3 | 64 * 3 = 96 |
| 2 | 8 | 64 * 8 = 512 |
| 3 | 15 | 64 * 15 = 960 |

Calculating the pixel location for spherical harmonic entry n and coefficient c:

```ts
const coeffs = [3, 8, 15];
const u = (n % 64) * coeffs[bands] + c;
const v = Math.floor(n / 64);
```

---

## 4) Example `meta.json`

```json
{
  "version": 2,
  "count": 187543,
  "antialias": true,
  "means": {
    "mins": [-2.10, -1.75, -2.40],
    "maxs": [ 2.05,  2.25,  1.90],
    "files": ["means_l.webp", "means_u.webp"]
  },
  "scales": {
    "codebook": [/* 256 floats */],
    "files": ["scales.webp"]
  },
  "quats": { "files": ["quats.webp"] },
  "sh0": {
    "codebook": [/* 256 floats */],
    "files": ["sh0.webp"]
  },
  "shN": {
    "count": 128,
    "bands": 3,
    "codebook": [/* 256 floats */],
    "files": ["shN_labels.webp", "shN_centroids.webp"]
  }
}
```

---

## 5) Versioning & compatibility

* Readers **must** check `version`. This document describes **version 2**.
* Additional optional properties may appear in future versions; readers **should** ignore unrecognized fields.

---
