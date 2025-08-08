---
title: Plane Detection
---

Very similar to [Mesh Detection][1], Plane Detection provides access to planes that estimate real-world surfaces.

Each plane can represent a surface with optionally available labels, such as: `wall`, `floor`, `table`, etc.

The underlying system can provide pre-captured data as well as provide real-time reconstruction depending on the underlying system implementation.

## Support

```javascript
if (app.xr.planeDetection.supported) {
    // plane detection is supported
}

app.xr.on('start', () => {
    if (app.xr.planeDetection.available) {
        // plane detection is available
    }
});
```

## Access

A feature flag needs to be added to the session start:

```javascript
app.xr.start(camera, pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    planeDetection: true
});
```

Then planes are added/removed asynchronously:

```javascript
app.xr.planeDetection.on('add', (xrPlane) => {
    // a new XrPlane has been added

    xrPlane.once('remove', () => {
        // an XrPlane has been removed
    });
});
```

Also, the list of XrPlanes is available:

```javascript
const xrPlanes = app.xr.planeDetection.meshes;
for (let i = 0; i < xrPlanes.length; i++) {
    const xrPlane = xrPlanes[i];
}
```

## Mesh

Each plane is represented as an instance of XrPlane which can be added/removed during an active session. It also has data that can be changed during its lifetime.

You can access the position and rotation (world-space) of an XrPlane:

```javascript
entity.setPosition(xrPlane.getPosition());
entity.setRotation(xrPlane.getRotation());
```

Each XrPlane has its points (in local-space) and orientation, that can be used to construct a visual mesh. The list of points represents the vertices of a polygon perimeter.

An `xrPlane.orientation` provides information as to whether a plane is vertical, horizontal or anything else.

An example below creates a visual mesh for each XrPlane and adds it to the scene root:

```javascript
app.xr.planeDetection.on('add', (xrPlane) => {
    // geometry data
    const mesh = new pc.Mesh(app.graphicsDevice);
    mesh.clear(true, true); // ensure that mesh is created with dynamic buffers

    // create a list of vertices
    const vertices = new Float32Array((xrPlane.points.length + 1) * 3);

    // first point is always in the origin
    vertices[0] = 0;
    vertices[1] = 0;
    vertices[2] = 0;

    // create a list of indices
    const indices = new Uint32Array(xrPlane.points.length * 3);

    // construct a polygon where each edge is connected to the origin of a mesh
    for (let i = 0; i < xrPlane.points.length; i++) {
        vertices[i * 3 + 3 + 0] = xrPlane.points[i].x;
        vertices[i * 3 + 3 + 1] = xrPlane.points[i].y;
        vertices[i * 3 + 3 + 2] = xrPlane.points[i].z;
        indices[i * 3 + 0] = 0;
        indices[i * 3 + 1] = i + 1;
        indices[i * 3 + 2] = ((i + 1) % xrPlane.points.length) + 1;
    }

    mesh.setPositions(vertices); // set vertices
    mesh.setNormals(pc.calculateNormals(vertices, indices)); // calculate normals
    mesh.setIndices(indices); // set indices
    mesh.update(pc.PRIMITIVE_TRIANGLES); // update buffers

    const material = new pc.StandardMaterial();
    const meshInstance = new pc.MeshInstance(mesh, material);

    const entity = new pc.Entity(xrPlane.label);

    // add render component
    entity.addComponent('render', {
        meshInstances: [ meshInstance ]
    });

    // add entity to the scene root
    app.root.addChild(entity);

    // clean up after XrPlane is removed
    xrPlane.once('remove', () => {
        material.destroy();
        mesh.destroy();
        entity.destroy();
    });
});
```

## Semantic Label

An XrPlane can represent various real-world objects and a label can help to identify what it represents using its property `XrPlane.label`.

These labels can be any of: `floor`, `wall`, `door`, `window`, `table`, `screen`, `global mesh`, `other` and more. Here is a [list of semantic labels][2], although this list is not definitive and the platform can report anything it feels fit.

## Changes

Depending on the underlying system capabilities, XrPlane attributes can change while an XR session is active. You can subscribe to that event and update a visual mesh accordingly:

```javascript
xrPlane.on('change', () => {
    // points and/or label have been changed
});
```

[1]: /user-manual/xr/ar/mesh-detection/
[2]: https://github.com/immersive-web/semantic-labels/blob/master/labels.json
