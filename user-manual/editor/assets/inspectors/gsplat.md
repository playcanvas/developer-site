# GSplat

A GSplat asset contains 3D Gaussian Splat data. PlayCanvas supports the import of GSplat data from [PLY](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/ply.md) files (including compressed PLY) and [SOG](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/sog.md) files.

:::tip
The [SOG format](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/sog.md) is recommended for its efficient compression, resulting in smaller file sizes and faster load times.
:::

## Inspector

You can select a GSplat asset in the [Assets Panel](https://developer.playcanvas.com/user-manual/editor/interface/assets.md) and view it in the [Inspector](https://developer.playcanvas.com/user-manual/editor/interface/inspector.md).

[Image: GSplat Asset Inspector]

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
To use this asset in scripts, see [Asset Attributes](https://developer.playcanvas.com/user-manual/scripting/script-attributes/esm.md#asset-attribute).
:::
