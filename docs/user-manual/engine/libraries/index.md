---
title: Add-on Libraries
description: Libraries that work alongside the engine - Spine skeletal animation, streaming 3D Tiles with 3DTilesRendererJS, tweening, and loading data with loaders.gl.
---

The engine covers rendering, physics, audio, input and the rest of a real-time app. Some features are better served by a separate library that you add alongside it. PlayCanvas maintains some of these libraries, and others are third-party projects with support for PlayCanvas of their own.

| Library | What it adds | Maintained by |
| --- | --- | --- |
| [Spine](/user-manual/engine/libraries/spine/) | 2D skeletal animation made with the Spine editor, played by the playcanvas-spine plugin | PlayCanvas (plugin), Esoteric Software (Spine) |
| [3D Tiles](/user-manual/engine/libraries/3d-tiles/) | Streaming of massive 3D datasets, such as photogrammetry and city models, with 3DTilesRendererJS | NASA-AMMOS |
| [Tween](/user-manual/engine/libraries/tween/) | Animating entity transforms and other values over time, with playcanvas-tween | PlayCanvas |
| [loaders.gl](/user-manual/engine/libraries/loaders-gl/) | Parsers for many data formats, whose data you turn into engine meshes | vis.gl (OpenJS Foundation) |

These libraries are not part of the `playcanvas` npm package. Each one is installed and versioned on its own, so check which engine versions it supports on its own page or repository.

The **Integrations** category of the [Engine Examples](https://playcanvas.com/examples) shows these libraries in use.
