---
title: Mesh Detection
description: "AR mesh detection in PlayCanvas: triangle meshes of the room and its furniture with semantic labels, following meshes as they are added, changed and removed, drawing them, building physics colliders from them, and using them for occlusion."
---

Mesh detection gives you triangle meshes of the user's surroundings. Where [planes](/user-manual/xr/ar/plane-detection/) give you flat surfaces, meshes follow the shapes of things: a sofa, a lamp, the whole room. Use them for physics against real objects, for occlusion, and for effects that run over real surfaces.

![The furniture of a room as detected meshes, drawn as translucent blue shapes with wireframe edges, and a virtual ball on the sofa](/img/user-manual/xr/ar/mesh-detection/meshes.webp)

<EngineExample id="xr/ar-mesh-detection" title="AR Mesh Detection" />

## Requesting Mesh Detection {#requesting-mesh-detection}

Ask for mesh detection when you start an AR session:

```javascript
camera.camera.startXr(pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    meshDetection: true
});
```

`app.xr.meshDetection.supported` is `true` when the browser implements mesh detection, and `app.xr.meshDetection.available` becomes `true`, firing `available`, once a session has it. On Meta Quest, meshes come from the room the user has set up, as planes do, and `app.xr.initiateRoomCapture()` asks the device to start its room setup. See [Plane Detection](/user-manual/xr/ar/plane-detection/#requesting-plane-detection).

## Meshes {#meshes}

`app.xr.meshDetection` fires `add` for each mesh the device reports, and `remove` when it goes, and lists the current ones in `app.xr.meshDetection.meshes`. Each is an [`XrMesh`](https://api.playcanvas.com/engine/classes/XrMesh.html):

| Property or method | Description |
| --- | --- |
| `getPosition()`, `getRotation()` | The mesh's pose in [tracking space](/user-manual/xr/ar/#the-real-world-and-the-rig) |
| `vertices` | A `Float32Array` of vertex positions in the mesh's local space, three numbers per vertex |
| `indices` | A `Uint32Array` of the vertices of its triangles, three per triangle |
| `label` | What the mesh is, such as `'table'`, `'couch'` or `'global mesh'`, or an empty string |

A mesh fires `change` when its vertices, indices or label change. Its pose can change in any frame without an event, so read it every frame. From engine 2.23, its properties keep their last values after `remove`. In earlier versions, its `vertices`, `indices` and `label` throw an error once it has been removed, even in a `remove` handler.

Meta Quest reports a mesh for each piece of furniture the user has marked up, and one mesh of the whole room, labeled `'global mesh'`, on devices that scan it.

## Drawing Meshes {#drawing-meshes}

Turn each detected mesh into a render mesh, and follow its pose:

```javascript
app.xr.meshDetection.on('add', (xrMesh) => {
    const mesh = new pc.Mesh(app.graphicsDevice);
    mesh.setPositions(xrMesh.vertices);
    mesh.setNormals(pc.calculateNormals(xrMesh.vertices, xrMesh.indices));
    mesh.setIndices(xrMesh.indices);
    mesh.update();

    const material = new pc.StandardMaterial();
    material.opacity = 0.3;
    material.blendType = pc.BLEND_NORMAL;
    material.update();

    const entity = new pc.Entity(xrMesh.label || 'mesh');
    entity.addComponent('render', {
        meshInstances: [new pc.MeshInstance(mesh, material)]
    });
    rig.addChild(entity);

    const follow = app.on('update', () => {
        entity.setLocalPosition(xrMesh.getPosition());
        entity.setLocalRotation(xrMesh.getRotation());
    });

    xrMesh.once('remove', () => {
        follow.off();
        entity.destroy();
        material.destroy();
    });
});
```

To update a drawn mesh when it changes, create it with dynamic buffers, `mesh.clear(true, true)`, and set its positions, normals and indices again in a `change` handler.

## Physics {#physics}

A static rigid body with a mesh collision shape makes virtual objects collide with the real room. Give the shape a model built from the detected mesh:

```javascript
app.xr.meshDetection.on('add', (xrMesh) => {
    const mesh = new pc.Mesh(app.graphicsDevice);
    mesh.setPositions(xrMesh.vertices);
    mesh.setIndices(xrMesh.indices);
    mesh.update();

    const model = new pc.Model();
    model.graph = new pc.GraphNode();
    model.meshInstances = [new pc.MeshInstance(mesh, new pc.StandardMaterial(), model.graph)];

    const collider = new pc.Entity('room collider');
    rig.addChild(collider);
    collider.setLocalPosition(xrMesh.getPosition());
    collider.setLocalRotation(xrMesh.getRotation());
    collider.addComponent('collision', { type: 'mesh', model });
    collider.addComponent('rigidbody', { type: 'static' });

    xrMesh.once('remove', () => collider.destroy());
});
```

Furniture and room meshes don't move, so the collider takes the mesh's pose once. Building a mesh shape from a large room mesh takes a moment, so build it once, rather than on every change. See [Collision Shapes](/user-manual/physics/collision-shapes/#mesh-colliders).

## Occlusion {#occlusion}

Draw meshes with a material that writes depth but no color, and virtual objects behind real ones are hidden, while the real objects show through. Set the material's `redWrite`, `greenWrite`, `blueWrite` and `alphaWrite` to `false`, and put the occluders in a [layer](/user-manual/graphics/layers/) that renders before the World layer. Meshes are coarse, so the edges of occlusion are only approximate. For per-pixel occlusion, use [depth sensing](/user-manual/xr/ar/depth-sensing/) where the device has it.

## See Also

- [Plane Detection](/user-manual/xr/ar/plane-detection/) - Flat surfaces, with room capture
- [Collision Shapes](/user-manual/physics/collision-shapes/) - Mesh colliders
- [XrMeshDetection](https://api.playcanvas.com/engine/classes/XrMeshDetection.html) - The API reference for `app.xr.meshDetection`
