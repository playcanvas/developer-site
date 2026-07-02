---
title: The GLB Format
description: "GLB format for 3D Gaussian splats: the KHR_gaussian_splatting glTF extension, attribute layout, engine loading via container assets, and conversion with SplatTransform."
sidebar_label: GLB
---

**GLB** (binary [glTF](https://www.khronos.org/gltf/)) can store 3D Gaussian Splat data using the Khronos [KHR_gaussian_splatting](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_gaussian_splatting) extension. This makes splats first-class citizens of the glTF ecosystem: they travel through standard glTF pipelines and can live alongside regular meshes, materials and animations in a single file.

You can create these files with **[SplatTransform](/user-manual/splat-transform/)** and load them directly with the PlayCanvas Engine.

## How Splats Are Stored

The extension stores each splat scene as a glTF mesh primitive with `POINTS` topology. Splat properties are supplied as vertex attributes:

| Attribute | Type | Contents |
| --------- | ---- | -------- |
| `POSITION` | VEC3 | Splat center positions |
| `KHR_gaussian_splatting:ROTATION` | VEC4 | Rotation quaternion (xyzw) |
| `KHR_gaussian_splatting:SCALE` | VEC3 | Per-axis size in **linear** space |
| `KHR_gaussian_splatting:OPACITY` | SCALAR | Opacity with sigmoid already applied |
| `KHR_gaussian_splatting:SH_DEGREE_{d}_COEF_{n}` | VEC3 | Spherical harmonics coefficients (RGB per coefficient) |
| `COLOR_0` | VEC4 | Optional fallback color for viewers without splat support |

Some differences from the [PLY format](./ply.md) worth knowing about:

- **Activated values**: scale is stored in linear space (PLY stores log-space) and opacity is post-sigmoid (PLY stores pre-sigmoid values).
- **Coordinate system**: splat data uses the standard glTF coordinate system (+Y up), so unlike PLY files, no flip rotation is needed when placing the loaded splat in a scene.
- **Fallback rendering**: viewers that don't understand the extension can still render the `COLOR_0` point cloud.

## Creating GLB Files

Convert any supported splat format using [SplatTransform](/user-manual/splat-transform/):

```bash
splat-transform scene.ply scene.glb
```

## Loading in PlayCanvas

Splat GLB files load as **container** assets (like any other glTF content), not as `gsplat` assets:

```javascript
const asset = new pc.Asset('scene', 'container', { url: 'scene.glb' });
app.assets.add(asset);
app.assets.load(asset);

asset.ready(() => {
    // creates an entity hierarchy with gsplat components
    const entity = asset.resource.instantiateRenderEntity();
    app.root.addChild(entity);
});
```

The container exposes the loaded splats as subordinate `gsplat` assets via `asset.resource.gsplats`, mirroring how renders and materials are exposed. Make sure your application registers the `GSplatComponentSystem`.

## Engine Support Notes

- Only the `ellipse` kernel (standard 3D Gaussian Splatting) is supported. Other kernels render as `ellipse` with a warning in debug builds.
- The `sortingMethod` and `projection` properties are ignored — sorting is controlled by the engine's global [gsplat settings](https://api.playcanvas.com/engine/classes/GSplatParams.html).
- The `KHR_gaussian_splatting_compression_spz_2` compression extension (still a draft) is not supported.

## When to Use GLB

GLB stores splat data uncompressed, so files are comparable in size to PLY. Use it when you need splats in standards-based glTF pipelines or combined with mesh content in a single asset.

:::tip

For web delivery, [SOG](./sog.md) remains the recommended format — it offers 15-20× compression and faster loading.

:::
