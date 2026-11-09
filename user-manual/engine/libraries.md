# Add-on Libraries

The engine covers rendering, physics, audio, input and the rest of a real-time app. Some features are better served by a separate library that you add alongside it. PlayCanvas maintains some of these libraries, and others are third-party projects with support for PlayCanvas of their own.

| Library | What it adds | Maintained by |
| --- | --- | --- |
| [Spine](https://developer.playcanvas.com/user-manual/engine/libraries/spine.md) | 2D skeletal animation made with the Spine editor, played by the playcanvas-spine plugin | PlayCanvas (plugin), Esoteric Software (Spine) |
| [3D Tiles](https://developer.playcanvas.com/user-manual/engine/libraries/3d-tiles.md) | Streaming of massive 3D datasets, such as photogrammetry and city models, with 3DTilesRendererJS | NASA-AMMOS |
| [Tween](https://developer.playcanvas.com/user-manual/engine/libraries/tween.md) | Animating entity transforms and other values over time, with playcanvas-tween | PlayCanvas |
| [loaders.gl](https://developer.playcanvas.com/user-manual/engine/libraries/loaders-gl.md) | Parsers for many data formats, whose data you turn into engine meshes | vis.gl (OpenJS Foundation) |

These libraries are not part of the `playcanvas` npm package. Each one is installed and versioned on its own, so check which engine versions it supports on its own page or repository.

The **Integrations** category of the [Engine Examples](https://playcanvas.com/examples) shows these libraries in use.
