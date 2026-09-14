---
title: Rendering Without Entities
description: Render meshes directly through layers using named GraphNodes, persistent MeshInstances, and hardware instancing.
---

You can render geometry without creating an Entity or a Render Component for each object. Create a [`MeshInstance`](https://api.playcanvas.com/engine/classes/MeshInstance.html) with a mesh, a material, and a [`GraphNode`](https://api.playcanvas.com/engine/classes/GraphNode.html), then add it to a [layer](../layers/index.md). It participates in the layer's normal rendering, including lighting, shadows, sorting, and culling.

This is useful for procedural environments, custom scene management, or large groups of repeated objects. Your application controls the transforms, layer membership, and resource lifetime that components would normally manage.

## Live Example

The example renders a ground plane with a manually created StandardMaterial and a forest of hardware-instanced trees loaded from a GLB. Only the camera and light use entities. Use **Show Trees** to remove and re-add the same mesh instance, or **Tree Count** to change how many trees use the existing instance buffer.

<EngineExample id="graphics-advanced/rendering-without-entities" title="Rendering Without Entities" />

## Create a Mesh Instance

The following code assumes an initialized application with a camera and lighting. The World layer is already part of the application's default layer composition and camera configuration.

```javascript
import {
    Color,
    GraphNode,
    LAYERID_WORLD,
    Mesh,
    MeshInstance,
    PlaneGeometry,
    StandardMaterial,
    Vec2,
    VertexBuffer,
    VertexFormat
} from 'playcanvas';

const layer = app.scene.layers.getLayerById(LAYERID_WORLD);

const material = new StandardMaterial();
material.diffuse = new Color(0.53, 0.55, 0.43);
material.gloss = 0.15;
material.update();

const mesh = Mesh.fromGeometry(app.graphicsDevice, new PlaneGeometry({
    halfExtents: new Vec2(20, 20)
}));

const node = new GraphNode('Ground');
const ground = new MeshInstance(mesh, material, node);
const meshInstances = [ground];
layer.addMeshInstances(meshInstances);
```

Supply the node explicitly when no component will assign one. It provides the world transform and a useful name for debugging. A standalone GraphNode does not need to be attached to `app.root`; you can move, rotate, or scale it with the usual GraphNode transform methods.

## Keep Layer Membership Persistent

[`Layer.addMeshInstances()`](https://api.playcanvas.com/engine/classes/Layer.html#addmeshinstances) registers the instances until you remove them. Call it when an object becomes part of the scene, and update its node or material as needed. There is no need to submit it again every frame.

```javascript
// Hide the ground while preserving its resources for reuse.
layer.removeMeshInstances(meshInstances);

// Show it again later, using the same mesh instance.
layer.addMeshInstances(meshInstances);
```

The layer determines where these objects render in the scene's layer composition. For a custom layer, include it in the composition and in the camera's `layers` list. Lights must also affect that layer. See [Layers](../layers/index.md) for ordering and camera configuration.

To cast shadows, set `meshInstance.castShadow = true` **before** adding it to the layer; registration also adds eligible instances to the layer's shadow casters. Removing the instance removes it from both lists. StandardMaterial receives lighting and shadows through the normal renderer, just as it does on a Render Component.

## Instance a Loaded Mesh

A loaded container asset exposes render assets and materials without requiring `instantiateRenderEntity()`. The example's tree GLB contains one static mesh with one material:

```javascript
// treeAsset is an already loaded container asset.
const treeMesh = treeAsset.resource.renders[0].resource.meshes[0];
const treeMaterial = treeAsset.resource.materials[0].resource;
const forest = new MeshInstance(treeMesh, treeMaterial, new GraphNode('Forest'));
forest.castShadow = true;
```

This direct lookup is specific to the example asset. A general GLB can contain multiple primitives and materials, node transforms, skins, and morph targets. Those require the corresponding setup when bypassing entity instantiation. The example centers and grounds the tree's raw mesh before placing copies.

For [hardware instancing](hardware-instancing.md), create one buffer of transforms and attach it to the mesh instance. Here, `matrices` is a Float32Array containing `treeCount` world-space Mat4 transforms, and `forestBounds` encloses all transformed trees:

```javascript
const instanceBuffer = new VertexBuffer(
    app.graphicsDevice,
    VertexFormat.getDefaultInstancingFormat(app.graphicsDevice),
    treeCount,
    { data: matrices }
);

forest.setInstancing(instanceBuffer, true);
forest.setCustomAabb(forestBounds);
const forestInstances = [forest];
layer.addMeshInstances(forestInstances);

// Draw only the first half of the buffer, without reallocating it.
forest.instancingCount = Math.floor(treeCount / 2);
```

The default instancing format uses world-space matrices, so the forest's GraphNode stays at identity. Passing `true` to `setInstancing()` enables frustum culling for the whole group. Supply a conservative bounding box covering every copy; individual trees are not culled separately. Update the bounds if the transforms change. Keeping the full forest bounds when reducing the count is safe, though less precise.

Instancing reuses one mesh and material for all the trees. Layer removal and re-addition also preserve the mesh instance and its buffer, so neither operation requires rebuilding the forest.

## Release Owned Resources

Removing an instance from a layer does not destroy it. When it is no longer needed, remove it from every layer it belongs to and then destroy it:

```javascript
layer.removeMeshInstances(meshInstances);
ground.destroy();
material.destroy();

layer.removeMeshInstances(forestInstances);
forest.destroy();
instanceBuffer.destroy();
```

`MeshInstance.destroy()` releases its mesh reference and destroys the mesh when no references remain. It does not destroy the material or an instance buffer you supplied. Destroy manually owned materials and buffers when no other objects use them. Let the asset registry manage the GLB resources, and unload the asset only after all of its users have finished with it. The complete example performs cleanup when the application is destroyed.
