---
title: GSplat
---

A GSplat asset contains 3D Gaussian Splat data. PlayCanvas supports the import of GSplat data from [PLY](/user-manual/gaussian-splatting/formats/ply) files (including compressed PLY) and [SOG](/user-manual/gaussian-splatting/formats/sog) files.

:::tip
The [SOG format](/user-manual/gaussian-splatting/formats/sog) is recommended for its efficient compression, resulting in smaller file sizes and faster load times.
:::

## Inspector

You can select a GSplat asset in the [Assets Panel](/user-manual/editor/interface/assets) and view it in the [Inspector](/user-manual/editor/interface/inspector).

![GSplat Asset Inspector](/img/user-manual/editor/assets/inspectors/asset-inspector-gsplat.png)

## Properties

The META section lists the key properties of the GSplat data.

| Property | Description |
|----------|-------------|
| Format | The file format: PLY (`binary_little_endian 1.0`), Compressed PLY, or SOG (read-only). |
| Splats | The total number of Gaussians stored in the PLY file (read-only). |
| SH Bands | The number of spherical harmonics bands used for view-dependent color (read-only). |
| Bound Min | The minimum bounds of the Gaussian splat data in 3D space (read-only). |
| Bound Max | The maximum bounds of the Gaussian splat data in 3D space (read-only). |

:::tip
To use this asset in scripts, see [Asset Attributes](/user-manual/scripting/script-attributes/esm/#asset-attribute).
:::
