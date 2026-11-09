# loaders.gl

[loaders.gl](https://loaders.gl/) is a collection of loaders for many data formats, from point clouds and meshes to geospatial data and tables. It is part of the vis.gl framework suite, under the OpenJS Foundation.

loaders.gl parses data and nothing more. A loader returns plain JavaScript objects and typed arrays, such as the positions and colors of a point cloud, and does not render anything. To show the data, create an engine [`Mesh`](https://api.playcanvas.com/engine/classes/Mesh.html) from the arrays, and render it with a mesh instance.

The engine loads glTF and GLB models, compressed textures and gaussian splats itself, so prefer its own loaders for those, and reach for loaders.gl for formats the engine does not read.

## Example

The example loads a Draco compressed point cloud with loaders.gl, and renders its points with a custom shader:

[Live example: loaders.gl](https://playcanvas.com/examples/#/integrations/loaders-gl) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/integrations/loaders-gl/example.mjs))

See the [loaders.gl documentation](https://loaders.gl/docs) for the available loaders and how to use them.
