---
title: Collision
description: "Add voxel collision to a published splat so visitors can walk through it — uploading from the Convert utility, or generating it directly in Studio."
---

By default, splats in the viewer have no physical presence — the camera flies right through them. The **Collision** section in [Studio](/user-manual/supersplat/studio/) attaches a **voxel** representation of the scene to your splat so the viewer can collide against it. With collision attached, your splat becomes **walkable** — visitors can navigate it on foot rather than just orbit around it. The [Explore](/user-manual/supersplat/explore) page also surfaces walkable scenes via its `walkable` feature filter.

<!-- TODO: media — /img/user-manual/supersplat/studio/collision-voxels.png — the collision upload section -->

## What is voxel collision?

A voxel collision asset is a coarse, low-resolution box-based reconstruction of the splat — the surfaces visitors can stand on, lean against, or be stopped by. It's separate from the splat itself so it can be optimized independently for runtime physics rather than visual quality.

You'll typically generate it once per scene and re-generate only if the underlying splat changes significantly.

## Uploading voxel collision

The simplest path is to upload pre-generated voxel files:

1. Open the **Scene Assets** section.
2. Click the **Voxel** upload action.
3. Drop in the pair of files that describe the collision — a JSON file plus a binary file alongside it.
4. Wait for the upload state indicator to reach **Complete**.

| State | Meaning |
|-------|---------|
| **Uploading** | The collision files are being sent to the platform. |
| **Complete** | The voxel asset is live; the scene is now walkable on the next viewer reload. |
| **Error** | Upload failed — re-check the files and try again. |

## Generating voxel collision

You can generate voxel collision from your splat without leaving the browser using the [Convert](/user-manual/supersplat/convert) utility. Pick **Voxel Collision Bundle** (`.voxel.zip`) as the output format and tune:

- **Voxel resolution** (default `0.05`) — smaller values capture finer surfaces but produce larger, slower assets.
- **Opacity cutoff** (default `0.1`) — voxels with opacity above this threshold are considered solid.

The Convert utility downloads a `.voxel.zip` containing the JSON+BIN pair, which you then upload through Studio's Voxel section as above.

For scripted or batch generation, the [splat-transform](/user-manual/splat-transform/) CLI exposes the same generation under its `voxel.zip` output target.

## When a scene is walkable

Once a voxel asset is attached, visitors viewing the scene get walk controls instead of pure orbit. The viewer also sets the `walkable` flag on the scene, which:

- Surfaces a **walkable** badge on the [scene page](/user-manual/supersplat/scene-page).
- Includes the scene in [Explore](/user-manual/supersplat/explore) results when the `walkable` feature filter is on.

## See also

- [Convert](/user-manual/supersplat/convert) — generate voxel collision in the browser
- [splat-transform](/user-manual/splat-transform/) — generate voxel collision in a script or build pipeline
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — the JSON contract that stores scene-asset references
