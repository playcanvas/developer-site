---
title: loaders.gl
description: Parse data formats the engine does not load itself, such as point clouds, with the loaders of loaders.gl, and turn the parsed data into engine meshes.
---

[loaders.gl](https://loaders.gl/) is a collection of loaders for many data formats, from point clouds and meshes to geospatial data and tables. It is part of the vis.gl framework suite, under the OpenJS Foundation.

loaders.gl parses data and nothing more. A loader returns plain JavaScript objects and typed arrays, such as the positions and colors of a point cloud, and does not render anything. To show the data, create an engine [`Mesh`](https://api.playcanvas.com/engine/classes/Mesh.html) from the arrays, and render it with a mesh instance.

The engine loads glTF and GLB models, compressed textures and gaussian splats itself, so prefer its own loaders for those, and reach for loaders.gl for formats the engine does not read.

## Example

The example loads a Draco compressed point cloud with loaders.gl, and renders its points with a custom shader:

<EngineExample id="integrations/loaders-gl" title="loaders.gl" />

See the [loaders.gl documentation](https://loaders.gl/docs) for the available loaders and how to use them.
