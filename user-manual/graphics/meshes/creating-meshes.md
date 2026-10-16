# Creating Meshes

A [`Mesh`](https://api.playcanvas.com/engine/classes/Mesh.html) can be created in code in three ways, from the simplest to the most flexible:

1. From a [geometry class](https://developer.playcanvas.com/user-manual/graphics/meshes/creating-meshes.md#geometry-classes), such as `SphereGeometry`, which generates a common shape.
2. From [vertex data](https://developer.playcanvas.com/user-manual/graphics/meshes/creating-meshes.md#setting-vertex-data) you provide, such as positions, normals and texture coordinates.
3. From [vertex and index buffers](https://developer.playcanvas.com/user-manual/graphics/meshes/creating-meshes.md#vertex-and-index-buffers) you create yourself.

To render the mesh, create a mesh instance for it and give it to a render component or add it to a layer, as described in [Mesh Instances](https://developer.playcanvas.com/user-manual/graphics/meshes/mesh-instances.md#rendering-a-mesh-instance).

## Geometry Classes

A geometry class generates the vertex data of a shape on the CPU. [`Mesh.fromGeometry()`](https://api.playcanvas.com/engine/classes/Mesh.html#fromgeometry) uploads it to a new mesh:

```javascript
import { Mesh, SphereGeometry } from 'playcanvas';

const mesh = Mesh.fromGeometry(app.graphicsDevice, new SphereGeometry({
    radius: 2,
    latitudeBands: 32,
    longitudeBands: 32
}));
```

| Class | Shape | Main options |
| ----- | ----- | ------------ |
| [`BoxGeometry`](https://api.playcanvas.com/engine/classes/BoxGeometry.html) | Box | `halfExtents`, `widthSegments`, `lengthSegments`, `heightSegments` |
| [`PlaneGeometry`](https://api.playcanvas.com/engine/classes/PlaneGeometry.html) | Flat plane facing up | `halfExtents`, `widthSegments`, `lengthSegments` |
| [`SphereGeometry`](https://api.playcanvas.com/engine/classes/SphereGeometry.html) | Sphere | `radius`, `latitudeBands`, `longitudeBands` |
| [`CapsuleGeometry`](https://api.playcanvas.com/engine/classes/CapsuleGeometry.html) | Capsule | `radius`, `height`, `heightSegments`, `sides` |
| [`CylinderGeometry`](https://api.playcanvas.com/engine/classes/CylinderGeometry.html) | Cylinder | `radius`, `height`, `heightSegments`, `capSegments` |
| [`ConeGeometry`](https://api.playcanvas.com/engine/classes/ConeGeometry.html) | Cone or truncated cone | `baseRadius`, `peakRadius`, `height`, `heightSegments`, `capSegments` |
| [`TorusGeometry`](https://api.playcanvas.com/engine/classes/TorusGeometry.html) | Torus or a sector of it | `tubeRadius`, `ringRadius`, `sectorAngle`, `segments`, `sides` |
| [`CircleGeometry`](https://api.playcanvas.com/engine/classes/CircleGeometry.html) | Flat disc | `radius`, `sectors`, `rings`, `ringExponent` |
| [`DomeGeometry`](https://api.playcanvas.com/engine/classes/DomeGeometry.html) | Sphere with a flattened base, such as a sky dome | `latitudeBands`, `longitudeBands` |

All of them generate positions, normals, texture coordinates and indices. Most also accept `calculateTangents: true`, which adds the tangents a material needs for [normal maps](https://developer.playcanvas.com/user-manual/graphics/physical-rendering/physical-materials.md).

A [`Geometry`](https://api.playcanvas.com/engine/classes/Geometry.html) is a plain container of arrays, so you can modify its data before creating the mesh. This example displaces a subdivided plane into a wavy terrain and recalculates its normals:

```javascript
import { Mesh, PlaneGeometry, Vec2 } from 'playcanvas';

const geometry = new PlaneGeometry({
    halfExtents: new Vec2(10, 10),
    widthSegments: 64,
    lengthSegments: 64
});

const positions = geometry.positions;
for (let i = 0; i < positions.length; i += 3) {
    positions[i + 1] = Math.sin(positions[i] * 0.5) * Math.cos(positions[i + 2] * 0.5);
}
geometry.calculateNormals();

const mesh = Mesh.fromGeometry(app.graphicsDevice, geometry);
```

You can also fill an empty `Geometry` with your own `positions`, `normals`, `uvs`, `colors` and `indices`, and pass it to `Mesh.fromGeometry()`.

## Setting Vertex Data

To build a mesh from your own data, set each vertex stream on a new mesh and call [`update()`](https://api.playcanvas.com/engine/classes/Mesh.html#update), which creates the vertex and index buffers and uploads the data. This mesh is a single quad with texture coordinates:

```javascript
import { Mesh, calculateNormals } from 'playcanvas';

const positions = new Float32Array([
    -1, 0, 1,
    1, 0, 1,
    1, 0, -1,
    -1, 0, -1
]);
const uvs = new Float32Array([
    0, 0,
    1, 0,
    1, 1,
    0, 1
]);
const indices = [
    0, 1, 2,
    0, 2, 3
];

const mesh = new Mesh(app.graphicsDevice);
mesh.setPositions(positions);
mesh.setNormals(calculateNormals(positions, indices));
mesh.setUvs(0, uvs);
mesh.setIndices(indices);
mesh.update();
```

Each method sets one vertex stream:

| Method | Data per vertex | Stored as |
| ------ | --------------- | --------- |
| [`setPositions()`](https://api.playcanvas.com/engine/classes/Mesh.html#setpositions) | x, y, z | 32-bit floats |
| [`setNormals()`](https://api.playcanvas.com/engine/classes/Mesh.html#setnormals) | x, y, z | 32-bit floats |
| [`setUvs()`](https://api.playcanvas.com/engine/classes/Mesh.html#setuvs) | u, v for texture coordinate set 0 to 7 | 32-bit floats |
| [`setColors()`](https://api.playcanvas.com/engine/classes/Mesh.html#setcolors) | r, g, b, a | 32-bit floats, for HDR colors |
| [`setColors32()`](https://api.playcanvas.com/engine/classes/Mesh.html#setcolors32) | r, g, b, a in the 0 to 255 range | 8-bit values, read as 0 to 1 by shaders |
| [`setVertexStream()`](https://api.playcanvas.com/engine/classes/Mesh.html#setvertexstream) | Any semantic, such as `SEMANTIC_TANGENT` | The data type you choose |
| [`setIndices()`](https://api.playcanvas.com/engine/classes/Mesh.html#setindices) | Indices of the vertices of each primitive | 16-bit, or 32-bit for meshes with more than 65535 vertices |

The data can be a JavaScript array or a typed array. Typed arrays are faster for large meshes and for data that changes every frame, while plain arrays avoid the cost of creating typed arrays for small meshes. All vertex streams of a mesh must have the same number of vertices. Indices are optional: without them, the vertices are drawn in order.

[`calculateNormals()`](https://api.playcanvas.com/engine/functions/calculateNormals.html) and [`calculateTangents()`](https://api.playcanvas.com/engine/functions/calculateTangents.html) generate normals and tangents from the positions, texture coordinates and indices of a triangle mesh.

To draw with the vertex colors, enable them on the material, for example `material.diffuseVertexColor = true` on a `StandardMaterial`.

### Primitive Types

By default, `update()` draws the mesh as triangles, three vertices or indices per triangle. Pass a different primitive type to draw points or lines instead:

```javascript
import { PRIMITIVE_LINES } from 'playcanvas';

mesh.update(PRIMITIVE_LINES);
```

The types are `PRIMITIVE_POINTS`, `PRIMITIVE_LINES`, `PRIMITIVE_LINELOOP`, `PRIMITIVE_LINESTRIP`, `PRIMITIVE_TRIANGLES`, `PRIMITIVE_TRISTRIP` and `PRIMITIVE_TRIFAN`. Lines drawn this way are one pixel wide. For thick lines, see [Wide Lines](https://developer.playcanvas.com/user-manual/graphics/wide-lines.md).

### Bounding Box

`update()` also computes the bounding box of the mesh from its positions, in the local space of the mesh, which the engine uses for frustum culling and for sorting. To skip that work, pass `false` as the second argument and set [`mesh.aabb`](https://api.playcanvas.com/engine/classes/Mesh.html#aabb) yourself:

```javascript
import { BoundingBox, PRIMITIVE_TRIANGLES, Vec3 } from 'playcanvas';

mesh.aabb = new BoundingBox(new Vec3(0, 0, 0), new Vec3(10, 2, 10));
mesh.update(PRIMITIVE_TRIANGLES, false);
```

The bounding box is computed only from positions with 3 components. Set `aabb` yourself for other positions, or when a shader moves the vertices outside the bounds of the vertex data.

## Updating a Mesh

A mesh can be updated at any time, including every frame. Set the vertex streams that changed and call `update()` again. Streams you do not set keep their previous data. This example creates a grid whose heights change every frame, while its texture coordinates and indices are set only once:

```javascript
const mesh = new Mesh(app.graphicsDevice);
mesh.setPositions(positions);
mesh.setNormals(calculateNormals(positions, indices));
mesh.setUvs(0, uvs);
mesh.setIndices(indices);
mesh.update();

app.on('update', (dt) => {
    animateHeights(positions, dt);

    // only the positions and normals change
    mesh.setPositions(positions);
    mesh.setNormals(calculateNormals(positions, indices));
    mesh.update();
});
```

[Live example: Mesh Generation](https://playcanvas.com/examples/#/graphics/mesh-generation) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/graphics/mesh-generation.example.mjs))

Keep these rules in mind when updating a mesh:

- **Set up all vertex streams before creating mesh instances.** A mesh instance sets up its shaders for the vertex streams the mesh has when the mesh is assigned to it, so call `update()` first. To change the streams later, see [Changing the Vertex Format](https://developer.playcanvas.com/user-manual/graphics/meshes/creating-meshes.md#changing-the-vertex-format).
- **Reserve space for growing meshes.** When an update needs more vertices or indices than the buffers hold, they are created again at the new size, with only the vertex streams set since the last `update()`, so set all of them in that update. To avoid this, reserve space for the largest size by passing the maximum counts to [`clear()`](https://api.playcanvas.com/engine/classes/Mesh.html#clear) before setting the data, as in `mesh.clear(false, false, maxVertices, maxIndices)`. Its first two arguments are optional usage hints for the buffers.
- **Updating the bounding box has a cost.** For large meshes that change every frame, consider setting a bounding box that contains every pose instead, as described in [Bounding Box](https://developer.playcanvas.com/user-manual/graphics/meshes/creating-meshes.md#bounding-box).

### Changing the Vertex Format

To change which vertex streams a mesh has, such as adding vertex colors or a texture coordinate set, call `clear()`. It discards the vertex format, and the next `update()` creates new vertex and index buffers from the data you set, so set all the streams and the indices again. As mesh instances set up their shaders for the vertex streams of a mesh when it is assigned to them, assign the mesh to each of its mesh instances again, even though it is already set. The debug build of the engine warns about mesh instances whose mesh changed its vertex streams since it was assigned.

```javascript
mesh.clear();
mesh.setPositions(positions);
mesh.setNormals(normals);
mesh.setColors32(colors);
mesh.setIndices(indices);
mesh.update();

// set up the shaders of the mesh instance for the new vertex streams
meshInstance.mesh = mesh;
```

### Modifying Loaded Meshes

The same methods work on loaded meshes. Read their current data with getters such as [`getPositions()`](https://api.playcanvas.com/engine/classes/Mesh.html#getpositions), modify it and set it back. Remember that a loaded mesh is shared by every entity instantiated from its asset, as described in [Shared Meshes](https://developer.playcanvas.com/user-manual/graphics/meshes.md#shared-meshes).

```javascript
const mesh = entity.render.meshInstances[0].mesh;

const positions = [];
mesh.getPositions(positions);

// lift every vertex
for (let i = 1; i < positions.length; i += 3) {
    positions[i] += 0.5;
}

mesh.setPositions(positions);
mesh.update();
```

[Live example: Mesh Deformation](https://playcanvas.com/examples/#/graphics/mesh-deformation) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/graphics/mesh-deformation.example.mjs))

## Vertex and Index Buffers

For full control over the vertex layout, create the [`VertexBuffer`](https://api.playcanvas.com/engine/classes/VertexBuffer.html) and [`IndexBuffer`](https://api.playcanvas.com/engine/classes/IndexBuffer.html) yourself and assign them to the mesh. This lets you upload data you already have in its final layout, such as interleaved data from a binary file, without copying it per vertex stream.

A [`VertexFormat`](https://api.playcanvas.com/engine/classes/VertexFormat.html) describes the layout. By default it interleaves the attributes, with each attribute starting at a multiple of 4 bytes. This example draws a triangle with a position and an 8-bit color per vertex, 16 bytes in total:

```javascript
import {
    BoundingBox,
    Mesh,
    PRIMITIVE_TRIANGLES,
    SEMANTIC_COLOR,
    SEMANTIC_POSITION,
    TYPE_FLOAT32,
    TYPE_UINT8,
    Vec3,
    VertexBuffer,
    VertexFormat
} from 'playcanvas';

const device = app.graphicsDevice;
const format = new VertexFormat(device, [
    { semantic: SEMANTIC_POSITION, components: 3, type: TYPE_FLOAT32 },
    { semantic: SEMANTIC_COLOR, components: 4, type: TYPE_UINT8, normalize: true }
]);

const vertices = [
    { position: [-1, 0, 0], color: [255, 0, 0, 255] },
    { position: [1, 0, 0], color: [0, 255, 0, 255] },
    { position: [0, 1.5, 0], color: [0, 0, 255, 255] }
];

// format.size is the size of one vertex in bytes
const data = new ArrayBuffer(format.size * vertices.length);
const floats = new Float32Array(data);
const bytes = new Uint8Array(data);
vertices.forEach((vertex, i) => {
    floats.set(vertex.position, i * format.size / 4);
    bytes.set(vertex.color, i * format.size + 12);
});

const mesh = new Mesh(device);
mesh.vertexBuffer = new VertexBuffer(device, format, vertices.length, { data });
mesh.primitive[0] = {
    type: PRIMITIVE_TRIANGLES,
    base: 0,
    baseVertex: 0,
    count: vertices.length,
    indexed: false
};
mesh.aabb = new BoundingBox(new Vec3(0, 0.75, 0), new Vec3(1, 0.75, 0));
```

When you assign the buffers yourself, also set the [primitive](https://api.playcanvas.com/engine/classes/Mesh.html#primitive) that describes the draw and the bounding box, as `update()` is not involved. For an indexed mesh, assign the index buffer to `mesh.indexBuffer[0]` and set `indexed` to `true`. Destroying the mesh destroys the buffers assigned to it.

On WebGPU, the buffers of a mesh can also be read and written by [compute shaders](https://developer.playcanvas.com/user-manual/graphics/shaders/compute-shaders.md). Create the mesh with `new Mesh(device, { storageVertex: true, storageIndex: true })`, or pass the same options to `Mesh.fromGeometry()`.
