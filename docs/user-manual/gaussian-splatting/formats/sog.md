---
title: The SOG Format
description: "SOG (Spatially Ordered Gaussians) specification, versions 2 and 3: WebP textures, meta.json layout, quantization, blind data, and bundled versus unbundled files."
sidebar_label: SOG
---

**SOG (Spatially Ordered Gaussians)** is a compact container for 3D Gaussian Splat data. It achieves high compression via quantization (lossy by design), typically yielding files **\~15–20× smaller** than an equivalent PLY.

You can create SOG files with **[SplatTransform](https://github.com/playcanvas/splat-transform)** and preview them in the **[PlayCanvas Viewer](https://playcanvas.com/viewer)**.

This document is the format specification. It describes **version 2** and **version 3**. Both versions are current: readers **should** support both, and the `version` field in `meta.json` tells them apart.

## Version differences

Most of the format is shared. Where the versions differ, the sections below are marked **v2** and **v3**:

| | Version 2 | Version 3 |
| --- | --- | --- |
| [Orientation](#32-orientation) | `quats.webp`: smallest-three quaternion, 26 bits | Exponential map, 24 bits, in the alpha channels of `means_l.webp`, `means_u.webp` and `scales.webp`. No `quats.webp` |
| [Opacity](#34-base-color--opacity-dc) | `sh0.a / 255`, 0..1 | `(sh0.a / 204)²`, 0..1.5625 |
| [SH bands](#35-higher-order-sh-optional) | 1..3 | 1..4 |
| [SH palette labels](#labels) | 16-bit (R,G), up to 65,536 entries | 24-bit (R,G,B), up to 16,777,216 entries |
| [Blind data](#36-blind-data-v3-only-optional) | — | Optional per-gaussian application data in `blind_N.webp` images |

## 1. File set

A SOG dataset is a set of images plus a metadata file:

| File                 | Purpose                                      | Channels (8-bit)            |
| -------------------- | -------------------------------------------- | --------------------------- |
| `meta.json`          | Scene metadata and filenames                 | —                           |
| `means_l.webp`       | Positions – lower 8 bits (RGB)               | R,G,B (v2) · R,G,B,A (v3)   |
| `means_u.webp`       | Positions – upper 8 bits (RGB)               | R,G,B (v2) · R,G,B,A (v3)   |
| `scales.webp`        | Per-axis sizes via codebook                  | R,G,B (v2) · R,G,B,A (v3)   |
| `quats.webp`         | Orientation – compressed quaternion (v2 only) | R,G,B,A                    |
| `sh0.webp`           | Base color (DC) + opacity                    | R,G,B,A                     |
| `shN_centroids.webp` | SH palette coefficients (optional)           | R,G,B                       |
| `shN_labels.webp`    | Indices into SH palette (optional)           | R,G (v2) · R,G,B (v3)       |
| `blind_N.webp`       | Blind data (optional, v3 only)               | R,G,B,A                     |

In version 3, the alpha channels of `means_l.webp`, `means_u.webp` and `scales.webp` hold the [orientation](#32-orientation).

:::note[Image formats]

* By default, images **should** be **lossless WebP** to preserve quantized values exactly.
* Each property in `meta.json` names its file, so other 8-bit RGBA-capable formats **may** be used.
* Do not use lossy encodings for these assets as lossy compression will corrupt values and can produce visible/structural artifacts.
* Where the alpha channel carries data, encoders **must** keep the RGB values of pixels whose alpha is 0 (the `exact` option of WebP encoders). A blind data image can hold 0 in alpha alongside meaningful RGB.

:::

### 1.1 Image dimensions & indexing

All per-Gaussian properties are co-located: the same pixel (x, y) across all property images (except shN_centroids) belongs to the same Gaussian.

* Pixels are laid out **row-major**, origin at the **top-left**.
* For image width `W` and height `H`, the number of addressable Gaussians is `W*H`.
* `meta.count` **must** be `<= W*H`. Any trailing pixels are ignored.

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

## 2. `meta.json`

```ts
interface Meta {
  version: 2 | 3;          // File format version (integer)
  asset?: {                // Optional tool/version metadata
    generator?: string;    // e.g. "splat-transform v1.2.3"
  };
  count: number;           // Number of gaussians (<= W*H of the images)
  model?: "antialiased" | "2dgs"; // Optional. How the scene was trained; omitted for ordinary gaussians

  means: {
    // Ranges for decoding *log-transformed* positions (see §3.1).
    mins: [number, number, number];   // min of nx,ny,nz (log-domain)
    maxs: [number, number, number];   // max of nx,ny,nz (log-domain)
    files: ["means_l.webp", "means_u.webp"];
  };

  scales: {
    codebook: number[];    // 256 floats (log-domain); see §3.3
    files: ["scales.webp"];
  };

  // v2 only. Version 3 stores the orientation in the means and scales images (§3.2):
  quats?: {
    files: ["quats.webp"]; // §3.2
  };

  sh0: {
    codebook: number[];    // 256 floats; DC coefficients for gamma-space color (§3.4)
    files: ["sh0.webp"];
  };

  // v3 only, optional. Present when some gaussian has an opacity above 1 (§3.4):
  opacity?: {
    max: number;           // Largest stored opacity, up to 1.5625
  };

  // Present only if higher-order SH exist:
  shN?: {
    count: number;         // Palette size: up to 65536 (v2), up to 16777216 (v3)
    bands: number;         // Number of SH bands: 1..3 (v2), 1..4 (v3). DC (=band 0) lives in sh0.
    codebook: number[];    // 256 floats; shared for all AC coefficients (§3.5)
    files: [
      "shN_centroids.webp",// Palette of AC coefficients as pixels (§3.5)
      "shN_labels.webp"    // Per-gaussian palette index (0..count-1)
    ];
  };

  // v3 only, optional. Per-gaussian application data, one entry per image (§3.6):
  blind?: {
    files: [string];       // One RGBA image, e.g. "blind_0.webp"
    fields: {
      name: string;        // Unique across all blind images
      type: "u8" | "u16" | "u24" | "u32" | "f16" | "f32" | "unorm8" | "unorm16";
      range?: [number, number]; // unorm8 / unorm16 only. Default [0, 1]
    }[];
  }[];
}
```

:::note

* The scales codebook contains log-space values that must be passed through `exp()` to recover linear sizes (see [Scales](#33-scales)). The sh0 codebook contains gamma-space DC coefficients. The shN codebook contains gamma-space AC coefficients.
* Image data **must** be treated as raw 8-bit integers (no gamma conversion).
* Unless otherwise stated, channels not mentioned are ignored.
* Filenames in `files` arrays are arbitrary, but the order is significant.

:::

---

## 3. Property encodings

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

The alpha channels of both images are unused in version 2 and hold [orientation](#32-orientation) bytes in version 3.

### 3.2 Orientation

Quaternion components are ordered **(w, x, y, z)** throughout.

#### Version 2: smallest-three

> `quats.webp` (RGBA, 26-bit “smallest-three”)

Quaternions are encoded with **3×8-bit components + 2-bit mode** (total **26 bits**) using the standard *smallest-three* scheme.

* **R,G,B** store the three kept (signed) components in **(w, x, y, z)** order, uniformly quantized to `[-√2/2, +√2/2]`.
* **A** stores the **mode** in the range **252..255**. The mode is `A - 252` ∈ {0,1,2,3} and identifies which of the four components — in **(w, x, y, z)** order — was the **largest by magnitude** (and therefore omitted from the stream and reconstructed): mode 0 = w, 1 = x, 2 = y, 3 = z.
* Let `norm = Math.SQRT2` (i.e., √2).

```ts
// Dequantize the stored three components:
const toComp = (c: number) => (c / 255 - 0.5) * 2.0 / Math.SQRT2;

const a = toComp(quats.r);
const b = toComp(quats.g);
const c = toComp(quats.b);

const mode = quats.a - 252; // 0..3 → omitted component is w, x, y or z respectively

// Reconstruct the omitted component so that ||q|| = 1 and w.l.o.g. the omitted one is non-negative
const t = a*a + b*b + c*c;
const d = Math.sqrt(Math.max(0, 1 - t));

// Place components according to mode; q is ordered [w, x, y, z]
let q: [number, number, number, number];
switch (mode) {
    case 0: q = [d, a, b, c]; break; // omitted = w
    case 1: q = [a, d, b, c]; break; // omitted = x
    case 2: q = [a, b, d, c]; break; // omitted = y
    case 3: q = [a, b, c, d]; break; // omitted = z
    default: throw new Error("Invalid quaternion mode");
}
```

`quats.a` **must** be in **252, 253, 254, 255**. Other values are reserved.

#### Version 3: exponential map

> `means_l.a`, `means_u.a`, `scales.a` (24 bits, one byte each)

The rotation is stored as its **exponential map**: a vector `p` in the unit ball whose direction is the rotation axis and whose length is the rotation angle divided by π. Each component takes one byte, on a lattice that stores the identity rotation exactly:

```ts
const p = [
    (means_l.a - 128) / 127,
    (means_u.a - 128) / 127,
    (scales.a - 128) / 127
];

const len = Math.hypot(p[0], p[1], p[2]);
const t = len * Math.PI / 2;                           // half the rotation angle
const k = len > 1e-6 ? Math.sin(t) / len : Math.PI / 2;

const q = [Math.cos(t), p[0] * k, p[1] * k, p[2] * k]; // [w, x, y, z]
```

To encode, flip the quaternion's sign if needed so that `w >= 0`, then store `p = (2 / π) · atan2(|v|, w) · v / |v|`, with `v = (x, y, z)`, as `round(p * 127 + 128)` per component. Since `|p| <= 1`, every byte is at least 1. The identity rotation is stored as `(128, 128, 128)`.

### 3.3 Scales

> `scales.webp` (RGB via codebook)

Per-axis sizes are **codebook indices**. The codebook stores **log-domain** values, so decoding requires an exponential:

```ts
const sx = Math.exp(meta.scales.codebook[scales.r]); // r,g,b are 0..255
const sy = Math.exp(meta.scales.codebook[scales.g]);
const sz = Math.exp(meta.scales.codebook[scales.b]);
```

Interpretation (e.g., principal axis standard deviations vs. full extents) follows the source training setup; decoded (post-`exp`) values are in **scene units**.

The alpha channel is unused in version 2 and holds an [orientation](#32-orientation) byte in version 3.

### 3.4 Base color + opacity (DC)

> `sh0.webp` (RGBA)

`sh0` holds the **DC (l=0)** SH coefficient per color channel and **alpha**:

* **R,G,B** are 0..255 indices into `sh0.codebook`.
* **A** is the **opacity**, encoded differently in each version (below).

To convert the DC coefficient to **gamma-space RGB** color:

```ts
// SH_C0 = Y_0^0 = 1 / (2 * sqrt(pi))
const SH_C0 = 0.28209479177387814;

const r = 0.5 + meta.sh0.codebook[sh0.r] * SH_C0;
const g = 0.5 + meta.sh0.codebook[sh0.g] * SH_C0;
const b = 0.5 + meta.sh0.codebook[sh0.b] * SH_C0;
```

#### Version 2: linear opacity

The opacity is in `[0, 1]`:

```ts
const a = sh0.a / 255;
```

#### Version 3: squared opacity

The opacity is stored as its square root, which gives fine steps at the low opacities that overlapping translucent splats are built from. Byte 204 is exactly 1, and the bytes above it extend the range to `(255 / 204)² = 1.5625`:

```ts
const a = (sh0.a / 204) ** 2;   // 0..1.5625
```

To encode, store `round(204 * sqrt(a))`, clamped to 255.

Opacities above 1 come from merging gaussians, for example when building coarser levels of detail: the merged gaussian covers more than a single gaussian of opacity 1 can. Renderers that cannot draw the extra coverage **should** clamp the opacity to 1. When any opacity exceeds 1, writers **should** set `meta.opacity.max` to the largest one.

### 3.5 Higher-order SH (optional)

> `shN_centroids.webp`, `shN_labels.webp`

If present, higher-order (AC) SH coefficients are stored via a palette:

* `shN.count` is the number of entries: 1..65,536 in version 2, 1..16,777,216 in version 3.
* `shN.bands` is the number of bands per entry: 1..3 in version 2, 1..4 in version 3.

#### Centroids (palette)

* `shN_centroids.webp` is an RGB image storing the SH coefficient palette.
* There are always 64 entries per row; entries are packed row-major with origin top-left, so the image has `ceil(count / 64)` rows. Writers **should** keep the row count within the texture size limits of the devices they target.

The texture width is dependent on the number of bands:

| Bands | Coefficients | Texture width (pixels) |
|---|---|---|
| 1 | 3 | 64 * 3 = 192 |
| 2 | 8 | 64 * 8 = 512 |
| 3 | 15 | 64 * 15 = 960 |
| 4 (v3 only) | 24 | 64 * 24 = 1536 |

Calculating the pixel location for spherical harmonic entry n and coefficient c:

```ts
const coeffs = [3, 8, 15, 24];
const u = (n % 64) * coeffs[bands - 1] + c;
const v = Math.floor(n / 64);
```

#### Labels

`shN_labels.webp` stores each gaussian's palette index (0..count-1):

```ts
// v2: 16-bit index
const index = shN_labels.r + (shN_labels.g << 8);

// v3: 24-bit index
const index = shN_labels.r + (shN_labels.g << 8) + (shN_labels.b << 16);
```

#### Decoding

Each centroid pixel's **R,G,B** channels are **codebook indices** (0..255) into the shared `shN.codebook`. The three channels correspond to the three color channels of the SH coefficient.

To decode the full set of AC SH coefficients for a single gaussian:

```ts
const coeffs = [3, 8, 15, 24];
const shCoeffs = coeffs[meta.shN.bands - 1];        // coefficients per color channel
const codebook = meta.shN.codebook;                  // 256 shared float entries

// 1. Look up this gaussian's palette entry (see Labels: v3 adds the B byte)
const label = shN_labels.r + (shN_labels.g << 8) + (meta.version >= 3 ? shN_labels.b << 16 : 0);

// 2. For each coefficient, read RGB from the centroids pixel and map through the codebook
for (let c = 0; c < shCoeffs; c++) {
    const u = (label % 64) * shCoeffs + c;
    const v = Math.floor(label / 64);

    // pixel (u, v) in shN_centroids.webp
    const r = centroidsPixel(u, v).r;
    const g = centroidsPixel(u, v).g;
    const b = centroidsPixel(u, v).b;

    sh_channel0[c] = codebook[r];  // SH AC coefficient for color channel 0
    sh_channel1[c] = codebook[g];  // SH AC coefficient for color channel 1
    sh_channel2[c] = codebook[b];  // SH AC coefficient for color channel 2
}
```

### 3.6 Blind data (v3 only, optional)

> `blind_N.webp` (RGBA), one image per `meta.blind` entry

Blind data is per-gaussian data that the format stores but does not interpret: an application defines what each field means, for example a tag marking which part of a scene a gaussian belongs to. Readers **should** ignore blind data they do not use.

Each entry of `meta.blind` is one RGBA image with the same dimensions and pixel layout as the other per-gaussian images. Its `fields` are packed into the pixel's bytes in the order listed, starting at R, each taking the bytes of its type. One image holds at most 4 bytes of fields; use more images for more data. Multi-byte values are little-endian: the lowest byte is in the first channel.

| Type | Bytes | Value |
| --- | --- | --- |
| `u8`, `u16`, `u24`, `u32` | 1, 2, 3, 4 | Unsigned integer |
| `f16`, `f32` | 2, 4 | IEEE 754 half / single precision float |
| `unorm8`, `unorm16` | 1, 2 | `min + code / (2^bits − 1) * (max − min)`, with `[min, max]` from `range` (default `[0, 1]`) |

```ts
const BYTES = { u8: 1, u16: 2, u24: 3, u32: 4, f16: 2, f32: 4, unorm8: 1, unorm16: 2 };

// pixel = [r, g, b, a] of this gaussian in the entry's image
let offset = 0;
for (const field of meta.blind[t].fields) {
    const bytes = BYTES[field.type];
    let code = 0;
    for (let k = 0; k < bytes; k++) {
        code += pixel[offset + k] * 2 ** (8 * k);
    }
    offset += bytes;

    // u8..u32: the value is `code`
    // f16 / f32: the value is the float with the bit pattern `code`
    // unorm8 / unorm16:
    const [min, max] = field.range ?? [0, 1];
    const value = min + code / (2 ** (8 * bytes) - 1) * (max - min);
}
```

Field names **must** be unique across all blind images. Use names that are valid identifiers (letters, digits and `_`), since engines may expose fields to shaders by name.

In PlayCanvas, shaders read blind fields while splats are copied to the work buffer. See [Reading SOG Blind Data](/user-manual/gaussian-splatting/rendering-architecture/work-buffer-format#reading-sog-blind-data).

---

## 4. Example `meta.json`

A version 2 file:

```json
{
  "version": 2,
  "asset": { "generator": "splat-transform v1.2.3" },
  "count": 187543,
  "model": "antialiased",
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
    "count": 65536,
    "bands": 3,
    "codebook": [/* 256 floats */],
    "files": ["shN_centroids.webp", "shN_labels.webp"]
  }
}
```

A version 3 file with opacities above 1, a 4th SH band and one blind data image holding two fields:

```json
{
  "version": 3,
  "asset": { "generator": "splat-transform v1.2.3" },
  "count": 187543,
  "means": {
    "mins": [-2.10, -1.75, -2.40],
    "maxs": [ 2.05,  2.25,  1.90],
    "files": ["means_l.webp", "means_u.webp"]
  },
  "scales": {
    "codebook": [/* 256 floats */],
    "files": ["scales.webp"]
  },
  "sh0": {
    "codebook": [/* 256 floats */],
    "files": ["sh0.webp"]
  },
  "opacity": { "max": 1.42 },
  "shN": {
    "count": 131072,
    "bands": 4,
    "codebook": [/* 256 floats */],
    "files": ["shN_centroids.webp", "shN_labels.webp"]
  },
  "blind": [
    {
      "files": ["blind_0.webp"],
      "fields": [
        { "name": "logo", "type": "u8" },
        { "name": "edge", "type": "unorm8", "range": [0, 1.5] }
      ]
    }
  ]
}
```

---

## 5. Versioning & compatibility

* Readers **must** check `version`. This document describes **version 2** and **version 3**, and readers **should** support both.
* A reader that supports only version 2 cannot read version 3 files. Write version 2 when files must load in such readers. Version 2 has no 4th SH band, no palette above 65,536 entries, no opacity above 1 and no blind data.
* Files without a `version` field use the legacy version 1 layout, which this document does not cover.
* Additional optional properties may appear in future versions; readers **should** ignore unrecognized fields.

---
