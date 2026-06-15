---
title: Streaming & Performance
description: "How SuperSplat compresses published splats to SOG, generates Streamed SOG for large scenes, and enforces a runtime Gaussian budget."
---

When you [publish from the Editor](/user-manual/supersplat/editor/publishing) or [directly upload](/user-manual/supersplat/upload) a splat, SuperSplat compresses it to the **SOG** family of formats for fast delivery. Large splats are automatically converted to **Streamed SOG** so they load quickly and run smoothly on any device.

## How your splat is compressed

Your splat's Gaussian count determines the format:

- **Fewer than 1 million Gaussians** — the splat is compressed to a single, non-streamed **`.sog`** file.
- **1 million Gaussians or more** — SuperSplat generates a set of **levels of detail (LODs)** using [splat-transform](/user-manual/splat-transform/), halving the Gaussian count at each level (decimation), and compresses them into a **Streamed SOG** bundle: a `lod-meta.json` index plus per-LOD `.sog` chunks. Larger splats produce more levels, so expect some extra back-end processing time after upload.

When you [directly upload](/user-manual/supersplat/upload) a PLY, this choice appears as an **Auto generate LODs** checkbox, ticked automatically at 1 million Gaussians or more; you can override it before publishing. Splats uploaded as a pre-built LCC or SSOG archive are always streamed.

## Near-instant loads and the Gaussian budget

A Streamed SOG splat loads **progressively**: the viewer shows the scene as soon as the lowest level of detail is ready, then fills in finer detail as it streams in. This gives near-instant time-to-first-frame even for very large scenes.

At runtime the viewer enforces a **Gaussian budget** — a cap on how many Gaussians are drawn at once — so the scene stays within a sensible amount of memory and renders at a good frame rate. The budget depends on the device and the viewer's **Performance Mode** setting (a toggle in the viewer's settings menu):

| Device | Performance Mode on | Performance Mode off |
|--------|---------------------|----------------------|
| Desktop | 2M Gaussians | 4M Gaussians |
| Mobile / XR | 1M Gaussians | 2M Gaussians |

As the camera moves, the viewer raises and lowers the level of detail across the scene to stay within this budget — so you get consistent performance and bounded memory use on everything from a phone to a desktop. (Performance Mode also lowers the render resolution for extra headroom on slower devices.)

## Bringing your own LODs

Advanced users can skip the automatic step and supply a pre-built Streamed SOG bundle:

- Generate one with the [splat-transform](/user-manual/splat-transform/) CLI (use `--decimate` to build the LOD levels), then [directly upload](/user-manual/supersplat/upload) the resulting bundle.
- Or produce LOD-capable output from the [Convert](/user-manual/supersplat/convert) utility.

## See also

- [Direct Upload](/user-manual/supersplat/upload) — upload a ready-made splat
- [splat-transform](/user-manual/splat-transform/) — generate Streamed SOG bundles yourself
- [Streamed SOG (developer guide)](/user-manual/gaussian-splatting/building/lod-streaming) — using Streamed SOG in your own PlayCanvas apps
