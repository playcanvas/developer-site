---
title: GSplat
---

A GSplat asset contains 3D Gaussian Splat data. PlayCanvas supports the import of GSplat data from [PLY](https://en.wikipedia.org/wiki/PLY_(file_format)) files.

## Asset Inspector {#asset-inspector}

You can select a GSplat asset in the [Assets Panel](/user-manual/editor/interface/assets) and view it in the [Inspector](/user-manual/editor/interface/inspector).

![GSplat Asset Inspector](/img/user-manual/assets/types/asset-inspector-gsplat.png)

The META section lists some key properties of the data.

| Property | Description |
| -------- | ----------- |
| Format   | PLY supports `ascii 1.0`, `binary_little_endian 1.0`, and `binary_big_endian 1.0` |
| Splats   | The total number of Gaussians stored in the PLY file |
| Properties | The list of per-Gaussian properties stored in the PLY file (`x`, `y`, `z`, `opacity` and so on) |
