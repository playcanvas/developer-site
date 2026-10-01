---
title: Plane Detection
description: "AR plane detection in PlayCanvas: floors, walls, tables and other flat surfaces with semantic labels, following planes as they are added, changed and removed, drawing them as meshes, room capture, and using planes for placement, physics and occlusion."
---

Plane detection gives you the flat surfaces of the user's surroundings: floors, walls, ceilings, tables, doors and windows. Each plane is a polygon with a pose, an orientation and, on some devices, a label that says what it is. Use them to place content on real surfaces, to make virtual objects collide with the room, or to hide virtual objects behind walls.

![The planes of a room drawn in colors by label: the floor in green, the walls in blue, and the table and sofa in orange](/img/user-manual/xr/ar/plane-detection/planes.webp)

<EngineExample id="xr/ar-plane-detection" title="AR Plane Detection" />

## Requesting Plane Detection {#requesting-plane-detection}

Ask for plane detection when you start an AR session:

```javascript
camera.camera.startXr(pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    planeDetection: true
});
```

`app.xr.planeDetection.supported` is `true` when the browser implements plane detection, and `app.xr.planeDetection.available` becomes `true`, firing `available`, once a session has it.

Where planes come from depends on the device. Headsets such as Meta Quest report the planes of a room that the user has set up, all at once, so if the user hasn't set one up there may be none. `app.xr.initiateRoomCapture()` asks the device to start its room setup, where the device supports it. Phones detect planes from the camera as the user looks around, and report more, and larger ones, over time.

```javascript
app.xr.on('start', () => {
    // If no planes arrive, offer the user a room scan
    setTimeout(() => {
        if (app.xr.active && app.xr.planeDetection.planes.length === 0) {
            app.xr.initiateRoomCapture((err) => {
                if (err) console.warn(err.message);
            });
        }
    }, 2000);
});
```

## Planes {#planes}

`app.xr.planeDetection` fires `add` for each plane the device reports, and `remove` when it goes, and lists the current ones in `app.xr.planeDetection.planes`. Each is an [`XrPlane`](https://api.playcanvas.com/engine/classes/XrPlane.html):

| Property or method | Description |
| --- | --- |
| `getPosition()`, `getRotation()` | The plane's pose in [tracking space](/user-manual/xr/ar/#the-real-world-and-the-rig). The plane lies in its local XZ plane, with its local Y axis as its normal |
| `points` | The outline of the plane, as points in its local space |
| `orientation` | `'horizontal'`, `'vertical'`, or `null` for anything else |
| `label` | What the plane is, such as `'floor'`, `'wall'` or `'table'`, or an empty string |
| `id` | A number unique to the plane |

Planes change as the device learns more. A plane fires `change` when its outline, orientation or label changes. Its pose can change in any frame without an event, so read it every frame. From engine 2.23, its properties keep their last values after `remove`. In earlier versions, its `points` and `label` throw an error once it has been removed, even in a `remove` handler.

## Drawing Planes {#drawing-planes}

Build a mesh from a plane's outline, as a fan of triangles from the plane's origin, and rebuild it when the plane changes:

```javascript
// Fills the plane's outline with triangles, in the plane's local space
const updatePlaneMesh = (mesh, plane) => {
    const positions = [0, 0, 0];
    const normals = [0, 1, 0];
    const indices = [];
    const count = plane.points.length;
    plane.points.forEach((point, i) => {
        positions.push(point.x, point.y, point.z);
        normals.push(0, 1, 0);
        indices.push(0, i + 1, ((i + 1) % count) + 1);
    });
    mesh.setPositions(positions);
    mesh.setNormals(normals);
    mesh.setIndices(indices);
    mesh.update();
};

app.xr.planeDetection.on('add', (plane) => {
    const mesh = new pc.Mesh(app.graphicsDevice);
    mesh.clear(true, true); // Dynamic buffers, as the plane can change
    updatePlaneMesh(mesh, plane);

    const material = new pc.StandardMaterial();
    material.diffuse = plane.orientation === 'horizontal' ? pc.Color.GREEN : pc.Color.BLUE;
    material.opacity = 0.4;
    material.blendType = pc.BLEND_NORMAL;
    material.cull = pc.CULLFACE_NONE;
    material.update();

    const entity = new pc.Entity(plane.label || 'plane');
    entity.addComponent('render', {
        meshInstances: [new pc.MeshInstance(mesh, material)]
    });
    rig.addChild(entity);

    // The pose can change in any frame, and the outline when the plane changes
    const follow = app.on('update', () => {
        entity.setLocalPosition(plane.getPosition());
        entity.setLocalRotation(plane.getRotation());
    });
    plane.on('change', () => updatePlaneMesh(mesh, plane));

    plane.once('remove', () => {
        follow.off();
        entity.destroy();
        material.destroy();
    });
});
```

The entity is a child of the camera rig, so its local pose is the plane's pose in tracking space. Planes are convex on most devices, and rectangles on Meta Quest, which a fan fills correctly.

## Labels {#labels}

A plane's `label` comes from the device's understanding of the room. Common labels are `floor`, `ceiling`, `wall`, `door`, `window` and `table`. See the [semantic labels](https://github.com/immersive-web/semantic-labels) of WebXR for the full list. Not every device labels planes, and devices can report labels that aren't on the list, so treat an unknown or empty label as an unknown surface.

## Uses {#uses}

- **Placement.** Put content on the largest horizontal plane, or on a table. Planes give you the whole surface at once, where a [hit test](/user-manual/xr/ar/hit-testing/) gives you one point.
- **Physics.** Give each plane's entity a static [rigid body](/user-manual/physics/rigid-bodies/) with a thin box collision shape the size of the plane, so that virtual objects land on the real floor and bounce off the real walls. For irregular surfaces, use [meshes](/user-manual/xr/ar/mesh-detection/#physics).
- **Occlusion.** Draw walls with a material that writes depth but no color, so that virtual objects behind them are hidden while the real wall shows through: set the material's `redWrite`, `greenWrite`, `blueWrite` and `alphaWrite` to `false`. The walls must render before the objects they hide, so put them in a [layer](/user-manual/graphics/layers/) that renders before the World layer.

## See Also

- [Mesh Detection](/user-manual/xr/ar/mesh-detection/) - Triangle meshes of the room and its furniture
- [Hit Testing](/user-manual/xr/ar/hit-testing/) - Finding one point on a surface
- [WebXR: Plane Detection](/tutorials/webxr-plane-detection/) - Tutorial with an Editor project
- [XrPlaneDetection](https://api.playcanvas.com/engine/classes/XrPlaneDetection.html) - The API reference for `app.xr.planeDetection`
