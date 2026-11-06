---
title: The SOG Format
description: "SOG (Spatially Ordered Gaussians) specification: WebP textures, meta.json layout, quantization, and bundled versus unbundled files."
sidebar_label: SOG
---

**SOG (Spatially Ordered Gaussians)** is a compact container for 3D Gaussian Splat data. It achieves high compression via quantization (lossy by design), typically yielding files **\~15–20× smaller** than an equivalent PLY.

You can create SOG files with **[SplatTransform](https://github.com/playcanvas/splat-transform)** and preview them in the **[PlayCanvas Viewer](https://playcanvas.com/viewer)**.

This document is the format specification. It describes **version 3**. The previous version is specified in [SOG version 2](./sog-v2.md), and §8 summarizes the changes.

## 1. File set

A SOG dataset is a set of images plus a metadata file:

| File                 | Purpose                                               | Channels (8-bit) |
| -------------------- | ----------------------------------------------------- | ---------------- |
| `meta.json`          | Scene metadata and filenames                          | —                |
| `means_l.webp`       | Positions – lower 8 bits (RGB) + rotation byte 0 (A)  | R,G,B,A          |
| `means_u.webp`       | Positions – upper 8 bits (RGB) + rotation byte 1 (A)  | R,G,B,A          |
| `scales.webp`        | Per-axis sizes via codebook (RGB) + rotation byte 2 (A) | R,G,B,A        |
| `sh0.webp`           | Base color (DC) + opacity                             | R,G,B,A          |
| `shN_centroids.webp` | SH palette coefficients (optional)                    | R,G,B            |
| `shN_labels.webp`    | Indices into SH palette (optional)                    | R,G,B            |
| `blind_<i>.webp`     | Per-gaussian blind data, one file per blind texture (optional) | 1–4 of R,G,B,A |

:::note[Image formats]

* By default, images **should** be **lossless WebP** to preserve quantized values exactly.
* Each property in `meta.json` names its file, so other 8-bit RGBA-capable formats **may** be used.
* Do not use lossy encodings for these assets as lossy compression will corrupt values and can produce visible/structural artifacts.
* Many lossless WebP encoders discard the RGB values of fully transparent pixels (alpha = 0) unless told to keep them (libwebp's `exact` option). Rotation bytes are never 0 (§3.2), but a blind texture whose fields use the A byte (§3.7) can contain alpha 0, so it **must** be encoded with RGB preserved under zero alpha.

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

SOG stores gaussians in the same coordinate frame as 3DGS PLY files, so positions, rotations and SH coefficients are stored exactly as they were trained.

To place a scene in a right-handed, +y-up world (such as PlayCanvas, where −z is forward), rotate it 180° about z, i.e. `(x, y, z) → (−x, −y, z)`. Apply the rotation to the scene as a whole (for example as the transform of the node holding it): rotations and SH coefficients are defined in the file's frame (§3.5.1).

### 1.3 Bundled variant

A bundled SOG is a ZIP of the files above. Readers **should** accept either layout:

* **Multi-file directory** (recommended during authoring)
* **Single archive** (e.g., `scene.sog`) containing the same files at the archive root

Readers **must** unzip and then resolve files using `meta.json` exactly as for the multi-file version.

---

## 2. `meta.json`

```ts
interface Meta {
  version: 3;              // File format version (integer)
  asset?: {                // Optional tool/version metadata
    generator?: string;    // e.g. "splat-transform v1.2.3"
  };
  count: number;           // Number of gaussians (<= W*H of the images)
  model?: "antialiased" | "2dgs"; // Optional. How the scene was trained (§3.8); omitted for ordinary gaussians

  means: {
    // Ranges for decoding *log-transformed* positions (see §3.1).
    mins: [number, number, number];   // min of nx,ny,nz (log-domain)
    maxs: [number, number, number];   // max of nx,ny,nz (log-domain)
    files: ["means_l.webp", "means_u.webp"]; // alpha channels: rotation bytes 0 and 1 (§3.2)
  };

  scales: {
    codebook: number[];    // 256 floats (log-domain); see §3.3
    files: ["scales.webp"]; // alpha channel: rotation byte 2 (§3.2)
  };

  sh0: {
    codebook: number[];    // 256 floats; DC coefficients for gamma-space color (§3.4)
    files: ["sh0.webp"];   // alpha channel: opacity byte (§3.4)
  };

  // Present only if some gaussian's opacity exceeds 1 (§3.6):
  opacity?: {
    max: number;           // The largest stored opacity, in (1, 1.5625]
  };

  // Present only if higher-order SH exist:
  shN?: {
    count: number;         // Palette size (up to 16777216, §3.5)
    bands: number;         // Number of SH bands (1..4). DC (=band 0) lives in sh0.
    codebook: number[];    // 256 floats; shared for all AC coefficients (§3.5)
    files: [
      "shN_centroids.webp",// Palette of AC coefficients as pixels (§3.5)
      "shN_labels.webp"    // Per-gaussian palette index (0..count-1)
    ];
  };

  // Present only if the scene carries blind data: one entry per blind texture (§3.7)
  blind?: {
    files: [string];       // e.g. "blind_0.webp"
    fields: {              // Packed in order into the texel's bytes (R, G, B, A)
      name: string;        // Application-defined name, e.g. the source PLY column
      type: "u8" | "u16" | "u24" | "u32" | "f16" | "f32" | "unorm8" | "unorm16";
      range?: [number, number]; // unorm types only: the values code 0 and the top code map to (default [0, 1])
    }[];
  }[];

  extras?: any;            // Application-defined JSON (§4)
  comments?: string[];     // Free-form producer comments (§5)
}
```

:::note

* The scales codebook contains log-space values that must be passed through `exp()` to recover linear sizes (§3.3). The sh0 codebook contains gamma-space DC coefficients. The shN codebook contains gamma-space AC coefficients.
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

The alpha channels of both images carry rotation bytes (§3.2).

### 3.2 Orientation

> `means_l.a`, `means_u.a`, `scales.a` (24-bit exponential map)

Quaternion components are ordered **(w, x, y, z)** throughout.

A rotation is stored as a point `p` in the unit ball, the quaternion's **exponential map** scaled so that a half-turn (180°) lies on the unit sphere, with one byte per component:

* `means_l.a` stores `p.x`, `means_u.a` stores `p.y` and `scales.a` stores `p.z`.
* Each byte `b` maps to `(b − 128) / 127`. This lattice has a level at exactly 0, so the identity rotation (bytes 128, 128, 128) is exact.

```ts
const px = (means_l.a - 128) / 127;
const py = (means_u.a - 128) / 127;
const pz = (scales.a - 128) / 127;

const r = Math.hypot(px, py, pz);        // 0..1
const theta = (Math.PI / 2) * r;         // half the rotation angle
const k = r > 0 ? Math.sin(theta) / r : 0;

const q = [Math.cos(theta), px * k, py * k, pz * k]; // [w, x, y, z], unit length
```

Encoding (informative): normalize `q`, negate it if `w < 0` (`q` and `−q` are the same rotation), then

```ts
const v = Math.hypot(x, y, z);
const k = v > 0 ? Math.atan2(v, w) / v / (Math.PI / 2) : 2 / Math.PI;
const toByte = (c: number) => Math.max(0, Math.min(255, Math.round(c * k * 127 + 128)));
// means_l.a = toByte(x), means_u.a = toByte(y), scales.a = toByte(z)
```

Because `|p| <= 1`, every encoded byte is at least 1, so these alpha channels are never fully transparent. Decoding always yields a unit quaternion, so byte combinations with `|p| > 1` (which a conforming encoder never produces) still decode to a valid rotation.

Over uniformly random rotations this encoding has a maximum error of about 1.2° and an RMS error of about 0.6°.

### 3.3 Scales

> `scales.webp` (RGB via codebook)

Per-axis sizes are **codebook indices**. The codebook stores **log-domain** values, so decoding requires an exponential:

```ts
const sx = Math.exp(meta.scales.codebook[scales.r]); // r,g,b are 0..255
const sy = Math.exp(meta.scales.codebook[scales.g]);
const sz = Math.exp(meta.scales.codebook[scales.b]);
```

Interpretation (e.g., principal axis standard deviations vs. full extents) follows the source training setup; decoded (post-`exp`) values are in **scene units**.

The alpha channel carries a rotation byte (§3.2).

### 3.4 Base color + opacity (DC)

> `sh0.webp` (RGBA)

`sh0` holds the **DC (l=0)** SH coefficient per color channel and **opacity**:

* **R,G,B** are 0..255 indices into `sh0.codebook`.
* **A** is the opacity byte. Opacity values above 1 are allowed (§3.6).

To convert the DC coefficient to **gamma-space RGB** color:

```ts
// SH_C0 = Y_0^0 = 1 / (2 * sqrt(pi))
const SH_C0 = 0.28209479177387814;

const r = 0.5 + meta.sh0.codebook[sh0.r] * SH_C0;
const g = 0.5 + meta.sh0.codebook[sh0.g] * SH_C0;
const b = 0.5 + meta.sh0.codebook[sh0.b] * SH_C0;
const a = (sh0.a / 204) ** 2;   // linear opacity, 0..1.5625
```

The opacity byte stores the square root of the opacity, `A = (b / 204)²`. The square root gives fine steps at the low opacities that overlapping translucent layers are built from. Byte 204 is exactly `A = 1`, where trained scenes keep their saturated gaussians, and bytes 205–255 hold opacities above 1, up to `(255 / 204)² = 1.5625`.

Encoding (informative): `b = min(255, round(204 * sqrt(A)))`, with `A <= 0` stored as 0. Opacities above 1.5625 are clamped.

#### 3.4.1 Color space

Decoded colors (DC plus higher-order SH) are **sRGB**: the sRGB transfer function with Rec.709 primaries, which is what 3DGS training produces. This corresponds to `srgb_rec709_display` in glTF's [`KHR_gaussian_splatting`](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_gaussian_splatting/README.md).

Colors are display-referred: scene lighting, exposure and tone mapping don't apply. Blending happens in sRGB, and any conversion to the output's color space happens after blending.

### 3.5 Higher-order SH (optional)

> `shN_centroids.webp`, `shN_labels.webp`

If present, higher-order (AC) SH coefficients are stored via a palette:

* `shN.count` ∈ **\[1,2^24]** number of entries.
* `shN.bands` ∈ **\[1,4]** number of bands per entry.

The palette image has `ceil(count / 64)` rows, so a reader is limited by its maximum texture size. Writers **should** keep `count` ≤ 262144 (4096 rows, the size every WebGL2 device supports).

#### Centroids (palette)

* `shN_centroids.webp` is an RGB image storing the SH coefficient palette.
* There are always 64 entries per row; entries are packed row-major with origin top-left.

The texture width is dependent on the number of bands:

| Bands | Coefficients | Texture width (pixels) |
|---|---|---|
| 1 | 3 | 64 * 3 = 192 |
| 2 | 8 | 64 * 8 = 512 |
| 3 | 15 | 64 * 15 = 960 |
| 4 | 24 | 64 * 24 = 1536 |

Calculating the pixel location for spherical harmonic entry n and coefficient c:

```ts
const coeffs = [3, 8, 15, 24];
const u = (n % 64) * coeffs[bands - 1] + c;
const v = Math.floor(n / 64);
```

#### Labels

* `shN_labels.webp` stores a **24-bit index** per gaussian with range (0..count-1).

```ts
const index = shN_labels.r + (shN_labels.g << 8) + (shN_labels.b << 16);
```

#### Decoding

Each centroid pixel's **R,G,B** channels are **codebook indices** (0..255) into the shared `shN.codebook`. The three channels correspond to the three color channels of the SH coefficient.

To decode the full set of AC SH coefficients for a single gaussian:

```ts
const coeffs = [3, 8, 15, 24];
const shCoeffs = coeffs[meta.shN.bands - 1];        // coefficients per color channel
const codebook = meta.shN.codebook;                  // 256 shared float entries

// 1. Look up this gaussian's palette entry
const label = shN_labels.r + (shN_labels.g << 8) + (shN_labels.b << 16);

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

#### 3.5.1 Basis and evaluation

Within each color channel, coefficients are ordered by band: band 1's 3 coefficients, then band 2's 5, band 3's 7 and band 4's 9.

The coefficients use the real SH basis with the Condon–Shortley phase, as used by the 3DGS reference implementation and gsplat. Bands 1–3 match `KHR_gaussian_splatting` (Appendix A); band 4 is gsplat's. Colors are evaluated with `d`, the unit vector from the camera to the gaussian center, expressed in the file's coordinate frame (§1.2):

```ts
const [x, y, z] = d;                        // normalize(center - cameraPosition)
const xx = x * x, yy = y * y, zz = z * z;
const xy = x * y, yz = y * z, xz = x * z;

const basis = [
    // band 1
    -0.4886025119029199 * y,
     0.4886025119029199 * z,
    -0.4886025119029199 * x,
    // band 2
     1.0925484305920792 * xy,
    -1.0925484305920792 * yz,
     0.31539156525252005 * (2 * zz - xx - yy),
    -1.0925484305920792 * xz,
     0.5462742152960396 * (xx - yy),
    // band 3
    -0.5900435899266435 * y * (3 * xx - yy),
     2.890611442640554 * xy * z,
    -0.4570457994644658 * y * (4 * zz - xx - yy),
     0.3731763325901154 * z * (2 * zz - 3 * xx - 3 * yy),
    -0.4570457994644658 * x * (4 * zz - xx - yy),
     1.445305721320277 * z * (xx - yy),
    -0.5900435899266435 * x * (xx - 3 * yy),
    // band 4
     2.5033429417967046 * xy * (xx - yy),
    -1.7701307697799304 * yz * (3 * xx - yy),
     0.9461746957575601 * xy * (7 * zz - 1),
    -0.6690465435572892 * yz * (7 * zz - 3),
     0.10578554691520431 * (zz * (35 * zz - 30) + 3),
    -0.6690465435572892 * xz * (7 * zz - 3),
     0.47308734787878004 * (xx - yy) * (7 * zz - 1),
    -1.7701307697799304 * xz * (xx - 3 * yy),
     0.6258357354491761 * (xx * (xx - 3 * yy) - yy * (3 * xx - yy)),
];

// per color channel c, with dc from §3.4 and sh_channel from above
let color = 0.5 + 0.28209479177387814 * dc[c];
for (let k = 0; k < shCoeffs; k++) color += basis[k] * sh_channel[c][k];
color = Math.max(0, color);
```

A renderer may evaluate fewer bands than the file stores, trading accuracy for speed. When a scene is rotated, either rotate `d` into the file's frame before evaluating (as above) or rotate the coefficients band by band.

### 3.6 Opacity above 1

When a decimator merges several gaussians into one, the merged gaussian often needs to carry more total opacity ("mass") than a standard gaussian with opacity 1 can. SOG stores this as an opacity `A > 1`, up to 1.5625 (§3.4). `meta.opacity.max` is present, and above 1, exactly when some gaussian's opacity exceeds 1, so a reader can tell without scanning the image.

The format defines `A` only as the gaussian's total mass relative to a standard gaussian of opacity 1. How that mass is drawn is a rendering choice: nothing about the profile is stored in the file, so renderers can change or tune it without affecting existing files.

A gaussian with `A <= 1` renders as a standard gaussian. For `A > 1`, the recommended profile (used by PlayCanvas and SplatTransform) keeps the gaussian's footprint and peak alpha 1, and adds an **opaque core**: the inner fraction `u0` of the footprint is fully opaque, and the gaussian's usual falloff is stretched over the rest. `u0` is solved so that the profile draws exactly `A` times the mass of a standard gaussian. For a renderer that cuts gaussians off at `c` σ and subtracts `f = exp(−c² / 2)` so that alpha reaches 0 at the cutoff:

```ts
// Per renderer: constants for its cutoff c (in σ)
const f = Math.exp(-c * c / 2);
const g0 = Math.sqrt(Math.PI / 2) / c * erf(c / Math.SQRT2) - f;   // erf: the error function
const g1 = (1 - f) / (c * c) - f / 2;
const qa = (1 - f) / 2 - g0 + g1;
const r0 = (g0 - 2 * g1) / (2 * qa);
const q = g1 / qa;

// Per gaussian: the core radius, as a fraction of the cutoff (0 for A <= 1)
const t = Math.min(Math.max(A - 1, 0), 0.5625);
const u0 = Math.sqrt(r0 * r0 + q * t) - r0;
const peak = Math.min(A, 1);

// Per fragment, r = the Mahalanobis distance from the center, in σ
const s = Math.max(0, r - u0 * c) / (1 - u0);
const alpha = peak * Math.max(0, Math.exp(-0.5 * s * s) - f);
```

* The footprint, culls and cutoff are the standard gaussian's, so no renderer bounds change. At `A = 1`, `u0 = 0` and the profile is the standard gaussian.
* A renderer that also rescales alpha by `1 / (1 − f)` uses the same constants. The PlayCanvas engine cuts off at `c = 2√2`, giving `r0 = 0.53839315` and `q = 0.62504992` (`u0 <= 0.2625`). SplatTransform's renderer cuts off at `c = 3` (`u0 <= 0.24`).

A renderer that does not support opacity above 1 **must** clamp `A` to 1. The scene then renders as it would have before over-unity opacity was stored.

When converting to PLY, a tool **should** write `opacity = logit(min(A, 1))` and the remainder `opacity_excess = max(0, A − 1)` as an extra float property, so that tools that ignore `opacity_excess` still read a valid PLY.

### 3.7 Blind data (optional)

> `blind_<i>.webp` (one file per blind texture, 1–4 bytes per gaussian each)

Blind data is application-defined data per gaussian (for example an object ID, a segment label or a weight). Renderers do not interpret it, but may expose it to shaders.

Each entry of `meta.blind` describes one RGBA8 texture. Its `fields` are **packed in order** into the texture's 4 bytes per gaussian (R, G, B, A): the first field starts at byte 0 (R), and each following field starts where the previous one ended. Each field takes the number of bytes its `type` needs and is stored little-endian (the lowest byte first).

| `type` | Bytes | Value |
|--------|-------|-------|
| `u8`, `u16`, `u24`, `u32` | 1, 2, 3, 4 | Unsigned integer |
| `f16` | 2 | IEEE 754 half-precision float bits |
| `f32` | 4 | IEEE 754 single-precision float bits |
| `unorm8` | 1 | `min + (code / 255) * (max - min)`, with `[min, max] = range` |
| `unorm16` | 2 | `min + (code / 65535) * (max - min)`, with `[min, max] = range` |

* A texture's fields **must** fit in its 4 bytes.
* `range` applies only to the unorm types and defaults to `[0, 1]`. A writer quantizes `value` to `round((value - min) / (max - min) * 255)` (or `* 65535`). Values outside the range cannot be stored.
* Field names **must** be unique across all blind textures, and **must** stay unique and non-empty after conversion to a shader identifier: characters other than `A–Z`, `a–z`, `0–9` and `_` become `_`, runs of `_` collapse to one, and a leading or trailing `_` is dropped. (The PlayCanvas engine exposes field `name` to shaders as `getBlind_<identifier>()`, defining `SOG_BLIND_<identifier>`.)
* When converting to PLY, a tool **should** use each name as the property name: a `uint` property for the integer types and a `float` property for the others.
* Bytes after the last field are unused. Writers **should** set an unused R, G or B to 0 and an unused A to 255 (so the image stays opaque), and readers **must** ignore them.
* Each blind texture is one more texture a renderer samples. Writers **should** keep to 10 blind textures or fewer, which every WebGL2 device can bind, packing narrow fields into shared textures.

```ts
// field j of texture t, for the gaussian at texel (u, v)
const bytesOf = { u8: 1, u16: 2, u24: 3, u32: 4, f16: 2, f32: 4, unorm8: 1, unorm16: 2 };
const fields = meta.blind[t].fields;
let offset = 0;
for (let k = 0; k < j; k++) offset += bytesOf[fields[k].type];

const px = blind[t].pixel(u, v);           // [r, g, b, a]
let code = 0;
for (let k = 0; k < bytesOf[fields[j].type]; k++) code |= px[offset + k] << (8 * k);
code >>>= 0;                               // unsigned 32-bit
```

As noted in §1, a blind texture whose fields use the A byte can contain pixels with alpha 0 and **must** be encoded so that RGB is preserved under zero alpha.

In PlayCanvas, shaders read blind fields while splats are copied to the work buffer. See [Reading SOG Blind Data](/user-manual/gaussian-splatting/rendering-architecture/work-buffer-format#reading-sog-blind-data).

### 3.8 Splat model

`model` records how the scene was trained, which decides how it must be rendered. It is omitted for ordinary 3D gaussians.

* `"antialiased"`: trained with a screen-space anti-aliasing filter (Mip-Splatting's 2D filter). A renderer **should** filter each projected gaussian with that filter instead of the usual 0.3 px² dilation, adding it to the diagonal of the 2D covariance Σ, and scale its opacity by `sqrt(det Σ / det(Σ + filter))` so that it draws the unfiltered gaussian's mass. Apply this scale before the over-unity profile (§3.6). The filter size is not stored: 0.1 px² (Mip-Splatting's, used by Brush, LichtFeld Studio and Spirula) is the default in PlayCanvas and SplatTransform, and both let it be overridden. See [Anti-Aliasing](../building/anti-aliasing.md) for how PlayCanvas detects and renders these scenes.
* `"2dgs"`: 2D Gaussian Splatting surfels. The third scale is the zero-thickness axis.

---

## 4. Extras

`extras` is an optional top-level property of `meta.json` holding **application-defined JSON**, in the spirit of glTF's `extras`. It may be any JSON value; an object is recommended.

* Readers **must not** require `extras` and **should** expose it to the application unchanged.
* Tools that convert or process a SOG **should** carry `extras` through to their output. Tools that combine several scenes **should** keep `extras` only when every input carries identical extras.

---

## 5. Comments

`comments` is an optional top-level array of **free-form producer comments**, such as the header `comment` lines of the PLY a scene was converted from (for example `"Postshot v1.1.69"` or `"postshot.color.eotf=sRGB"`).

* Comments are informational. Readers **must not** require them or derive rendering behavior from them; anything that changes how a scene renders has its own property (for example `model`).
* Tools **should** carry `comments` through conversion unchanged, and write them back as PLY `comment` lines when converting to PLY (a line break inside a comment becomes a space). They need not repeat comments that restate properties the file already records, such as `model`, or a tool's own generator line.
* Comments are not interpreted, so ones that describe coordinates (an origin offset, an up axis) are not updated when a tool transforms the scene.
* Tools that combine several scenes **should** keep `comments` only when every input carries identical comments.

---

## 6. Example `meta.json`

```json
{
  "version": 3,
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
  "sh0": {
    "codebook": [/* 256 floats */],
    "files": ["sh0.webp"]
  },
  "opacity": {
    "max": 1.5625
  },
  "shN": {
    "count": 65536,
    "bands": 3,
    "codebook": [/* 256 floats */],
    "files": ["shN_centroids.webp", "shN_labels.webp"]
  },
  "blind": [
    {
      "files": ["blind_0.webp"],
      "fields": [
        { "name": "segment", "type": "u16" },
        { "name": "weight", "type": "unorm8" },
        { "name": "depth", "type": "unorm8", "range": [0.5, 40] }
      ]
    }
  ],
  "extras": { "capturedBy": "rig-04" },
  "comments": ["Postshot v1.1.69", "postshot.color.eotf=sRGB"]
}
```

---

## 7. Versioning & compatibility

* Readers **must** check `version`. This document describes **version 3**; [version 2](./sog-v2.md) is specified separately. Readers **should** reject versions they do not support.
* Additional optional properties may appear in future versions; readers **should** ignore unrecognized fields.
* A version 3 file cannot be stored as version 2 without loss. When writing version 2, a tool **should** clamp opacity to 1, drop blind data, reduce SH to 3 bands and the SH palette to 65536 entries, and warn about each.

---

## 8. Changes from version 2

| Area | Version 2 | Version 3 |
|---|---|---|
| Rotation | `quats.webp`: 26-bit smallest-three | 24-bit exponential map in the alpha channels of `means_l`, `means_u`, `scales` (§3.2); `quats.webp` and `meta.quats` removed |
| Opacity | `sh0.a / 255`, at most 1 | `(sh0.a / 204)²`, up to 1.5625; `meta.opacity.max` when above 1 (§3.4, §3.6) |
| SH bands | 1–3 | 1–4 (§3.5) |
| SH palette | up to 65536 entries, 16-bit labels | up to 2^24 entries, 24-bit labels (§3.5) |
| Blind data | — | optional blind textures `blind_<i>.webp` described by `meta.blind` (§3.7) |
| Extras | — | optional `extras`: application-defined JSON (§4) |
| Comments | — | optional `comments`: free-form producer comments (§5) |

Everything else (positions, scales, DC color, the SH palette layout, indexing and bundling) is unchanged.

---
