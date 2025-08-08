---
title: Mesh Detection
---

Interaction between real-world and virtual objects is achieved via visual and logical interactions between the two. Mesh detection is an API that provides access to the representation of real-world geometry in the form of meshes. It can be used in a number of ways such as:

* Virtual object physics within a real-world environment
* Path finding
* Object placement
* Occlusion
* Procedural effects

This API provides a list of meshes, their geometry, transformation and semantic labeling.

The underlying system can provide pre-captured data as well as provide real-time reconstruction depending on the underlying system implementation.

## Support

```javascript
if (app.xr.meshDetection.supported) {
    // mesh detection is supported
}

app.xr.on('start', () => {
    if (app.xr.meshDetection.available) {
        // mesh detection is available
    }
});
```

## Access

A feature flag needs to be added to the session start:

```javascript
app.xr.start(camera, pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    meshDetection: true
});
```

Meshes are added/removed asynchronously:

```javascript
app.xr.meshDetection.on('add', (xrMesh) => {
    // a new XrMesh has been added

    xrMesh.once('remove', () => {
        // an XrMesh has been removed
    });
});
```

Also, the list of XrMeshes is available:

```javascript
const xrMeshes = app.xr.meshDetection.meshes;
for (let i = 0; i < xrMeshes.length; i++) {
    const xrMesh = xrMeshes[i];
}
```

## Mesh

Each mesh is represented as an instance of XrMesh, which can be added/removed during an active session. It also has data that can be changed during its lifetime.

You can access the position and rotation (world-space) of an XrMesh:

```javascript
entity.setPosition(xrMesh.getPosition());
entity.setRotation(xrMesh.getRotation());
```

Each XrMesh has its vertices and indices (in local-space), that can be used to construct a visual mesh. An example below creates a visual mesh for each XrMesh and adds it to the root of the scene:

```javascript
app.xr.meshDetection.on('add', (xrMesh) => {
    // geometry data
    const mesh = new pc.Mesh(app.graphicsDevice);
    mesh.clear(true, true); // ensure that mesh is created with dynamic buffers
    mesh.setPositions(xrMesh.vertices); // set vertices
    mesh.setNormals(pc.calculateNormals(xrMesh.vertices, xrMesh.indices)); // calculate normals
    mesh.setIndices(xrMesh.indices); // set indices
    mesh.update(pc.PRIMITIVE_TRIANGLES); // update buffers

    const material = new pc.StandardMaterial();
    const meshInstance = new pc.MeshInstance(mesh, material);

    const entity = new pc.Entity();

    // add render component
    entity.addComponent('render', {
        meshInstances: [ meshInstance ]
    });

    // add entity to the scene root
    app.root.addChild(entity);

    // clean up after XrMesh is removed
    xrMesh.once('remove', () => {
        material.destroy();
        mesh.destroy();
        entity.destroy();
    });
});
```

## Semantic Label

XrMesh can represent various real-world objects and a label can help to identify what it represents using its property `XrMesh.label`.

These labels can be any of: `floor`, `wall`, `door`, `window`, `table`, `screen`, `global mesh`, `other`, and `more`. Here is a [list of semantic labels][1], although this list is not definitive and the platform can report anything it feels fit.

## Changes

Depending on the underlying system capabilities, the XrMesh geometry can change while an XR session is active. You can subscribe to that event and update a visual mesh accordingly:

```javascript
xrMesh.on('change', () => {
    // vertices, indices and/or label has been changed
});
```

[1]: https://github.com/immersive-web/semantic-labels/blob/master/labels.json
