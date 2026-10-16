---
title: Mesh Instances
description: Create, share and destroy mesh instances, render them through a render component or a layer, and control their material, visibility, culling, shadows, sort order, render style and shader parameters.
---

A [`MeshInstance`](https://api.playcanvas.com/engine/classes/MeshInstance.html) represents the placement of a mesh in the world: it pairs the mesh with a material and with the node whose world transform positions it. A mesh instance is not rendered by itself. It is rendered once it is part of a render component, or once it is added to a layer. Its mesh and material can be shared with other mesh instances, so the settings of one placement, such as whether it casts shadows, live on the mesh instance.

## Creating a Mesh Instance

Create a mesh instance from a mesh, a material and, optionally, a node:

```javascript
import { MeshInstance } from 'playcanvas';

const meshInstance = new MeshInstance(mesh, material, node);
```

The mesh and the material of a mesh instance can be changed at any time by assigning its `mesh` and `material` properties.

## Rendering a Mesh Instance {#rendering-a-mesh-instance}

A mesh instance is rendered in one of two ways: as part of a render component, or added to a layer directly.

### In a Render Component {#in-a-render-component}

Assign the mesh instance to the [`meshInstances`](https://api.playcanvas.com/engine/classes/RenderComponent.html#meshinstances) of a render component. The component registers its mesh instances for rendering with each layer in its own [`layers`](https://api.playcanvas.com/engine/classes/RenderComponent.html#layers) list, which holds the World layer by default, and the cameras whose [`layers`](https://api.playcanvas.com/engine/classes/CameraComponent.html#layers) include one of those layers render them. See [Layers](../layers/index.md).

Create the mesh instance without a node, as in this example, so that the entity of the component places it. A mesh instance that already has a node keeps it, and is placed by that node instead of by the entity:

```javascript
import { BoxGeometry, Color, Entity, Mesh, MeshInstance, StandardMaterial } from 'playcanvas';

const mesh = Mesh.fromGeometry(app.graphicsDevice, new BoxGeometry());

const material = new StandardMaterial();
material.diffuse = new Color(1, 0.5, 0);
material.update();

const entity = new Entity('Box');
entity.addComponent('render', {
    meshInstances: [new MeshInstance(mesh, material)]
});
app.root.addChild(entity);
```

When a mesh instance belongs to a render component, change its settings on the component wherever the component has a matching property: `castShadows`, `receiveShadows`, `shadowCascadeMask`, `renderStyle`, `lightmapped` and `customAabb`. The component passes these to each of its mesh instances. A value set directly on one of its mesh instances lasts only until the matching component property changes, or until the mesh instances are assigned again, which overrides it. The component also uses `castShadows` to register its mesh instances as shadow casters of its layers.

### In a Layer {#in-a-layer}

A mesh instance can also be added to a layer directly, without an entity or a component. Your application then controls its node, its layer membership and its lifetime, and sets all of its properties, such as those described below, on the mesh instance itself. See [Rendering Without Entities](../advanced-rendering/rendering-without-entities.md).

## Accessing the Mesh Instances of a Render Component

A render component creates the mesh instances of primitive shapes and loaded models itself, and they are available in its `meshInstances`. A loaded model has one mesh instance for each primitive of the mesh, each with its own material:

```javascript
for (const meshInstance of entity.render.meshInstances) {
    meshInstance.material = highlightMaterial;
}
```

## Sharing a Mesh

Any number of mesh instances can use the same mesh, each with its own node and material:

```javascript
const red = new Entity('Red');
red.addComponent('render', { meshInstances: [new MeshInstance(mesh, redMaterial)] });

const blue = new Entity('Blue');
blue.addComponent('render', { meshInstances: [new MeshInstance(mesh, blueMaterial)] });
```

They all render the same geometry, so changing the vertices of the mesh changes every one of them. See [Shared Meshes](index.md#shared-meshes).

## Destroying Mesh Instances

- **A render component owns the mesh instances you assign to it.** It destroys them when you assign a different array to `meshInstances`, change its `type`, or when the component or its entity is destroyed. Do not use these mesh instances afterwards.
- **`MeshInstance.destroy()` releases the mesh**, and destroys it once no other mesh instance or render asset uses it, so meshes do not need to be destroyed separately. Skin and morph instances are destroyed with it.
- **Materials are never destroyed by the mesh instances that use them.** Destroy a material you created once nothing uses it.

## Visibility and Culling

- [`visible`](https://api.playcanvas.com/engine/classes/MeshInstance.html#visible) skips drawing the mesh instance without removing it from its layers. To stop drawing a render component, disable the component or its entity instead.
- [`cull`](https://api.playcanvas.com/engine/classes/MeshInstance.html#cull) controls whether a camera that frustum culls can skip the mesh instance when it is outside its view. It defaults to `true`.

Culling uses the bounding box of the mesh, [`mesh.aabb`](https://api.playcanvas.com/engine/classes/Mesh.html#aabb), which is in the local space of the mesh. The engine transforms it by the world transform of the node, and returns the result as the world space bounding box of the mesh instance, [`meshInstance.aabb`](https://api.playcanvas.com/engine/classes/MeshInstance.html#aabb). If a shader moves vertices outside the bounds of the mesh, such as for wind animation, the mesh instance can be culled while still in view. Enlarge the local space bounding box to cover the movement, either by setting `mesh.aabb` as described in [Creating Meshes](creating-meshes.md#bounding-box), or by setting [`customAabb`](https://api.playcanvas.com/engine/classes/RenderComponent.html#customaabb) on the render component, which overrides it for all of its mesh instances.

`customAabb` is particularly useful for skinned meshes. Without it, the bounding box of a skinned mesh instance is evaluated precisely every frame from the positions of its bones, which is expensive. A custom bounding box large enough to contain every pose of the animation avoids that work.

## Shadows

- [`castShadow`](https://api.playcanvas.com/engine/classes/MeshInstance.html#castshadow) makes the mesh instance cast shadows, by including it in the shadow maps of lights.
- `receiveShadow` makes the mesh instance receive shadows cast by other mesh instances.
- [`shadowCascadeMask`](https://api.playcanvas.com/engine/classes/MeshInstance.html#shadowcascademask) selects which cascades of a directional light the mesh instance casts shadows into, for example to keep small objects out of the distant cascades.

When you add a mesh instance to a layer yourself, set `castShadow` before adding it, as described in [Rendering Without Entities](../advanced-rendering/rendering-without-entities.md#keep-layer-membership-persistent). See [Shadows](../lighting/shadows.md) for configuring the lights.

## Sort Order

The order in which a layer draws its mesh instances depends on its sort mode, described in [Layers](../layers/index.md#sort-modes). Several mesh instance properties take part:

- [`drawOrder`](https://api.playcanvas.com/engine/classes/MeshInstance.html#draworder) sets the order directly, in layers that use `SORTMODE_MANUAL`.
- [`drawBucket`](https://api.playcanvas.com/engine/classes/MeshInstance.html#drawbucket) groups mesh instances before the other sort modes order them within each group.
- [`calculateSortDistance`](https://api.playcanvas.com/engine/classes/MeshInstance.html#calculatesortdistance) replaces the distance used by `SORTMODE_BACK2FRONT` and `SORTMODE_FRONT2BACK`. By default, this is the depth of the center of the bounding box along the camera direction.

A custom sort distance can improve the order of [transparent](../transparency.md) objects whose bounding box centers are a poor guide, such as large meshes the camera can be inside:

```javascript
meshInstance.calculateSortDistance = (instance, cameraPosition, cameraForward) => {
    // sort by the distance to the camera instead of the depth along its direction
    return instance.aabb.center.distance(cameraPosition);
};
```

## Render Style

[`renderStyle`](https://api.playcanvas.com/engine/classes/MeshInstance.html#renderstyle) draws a triangle mesh as solid triangles (`RENDERSTYLE_SOLID`, the default), as a wireframe of its edges (`RENDERSTYLE_WIREFRAME`), or as points at its vertices (`RENDERSTYLE_POINTS`). The wireframe is generated from the mesh the first time it is needed.

## Shader Parameters

[`setParameter()`](https://api.playcanvas.com/engine/classes/MeshInstance.html#setparameter) sets the value of a shader uniform for the draws of one mesh instance. The material does not need to set the same parameter. When it does, the value set on the mesh instance takes precedence, so mesh instances can share a material and still differ in a few values. This sets the `tint` uniform of a custom shader for one mesh instance:

```javascript
meshInstance.setParameter('tint', [0, 1, 0]);
```

See [Shader Parameters](../shaders/shader-parameters.md#mesh-instance-parameters) for overriding the properties of a `StandardMaterial`, and for the cost of these overrides.

## Skinning and Morphing

A mesh with a [`skin`](https://api.playcanvas.com/engine/classes/Mesh.html#skin) or a [`morph`](https://api.playcanvas.com/engine/classes/Mesh.html#morph) is animated per mesh instance, by its [`skinInstance`](https://api.playcanvas.com/engine/classes/MeshInstance.html#skininstance), which holds the bones that pose it, and its [`morphInstance`](https://api.playcanvas.com/engine/classes/MeshInstance.html#morphinstance), which holds the weights of its morph targets. A render component sets these up for the skinned and morphed meshes of a loaded model, and the [anim component](../../animation/index.md) drives them.

<EngineExample id="graphics/mesh-morph" title="Mesh Morph" />

## Drawing Many Copies

Each mesh instance is normally one draw call. To draw many copies of a mesh more efficiently, see:

- [Hardware Instancing](../advanced-rendering/hardware-instancing.md) - Many copies of a mesh from a single mesh instance, with per-copy data such as transforms.
- [Batching](../advanced-rendering/batching.md) - Mesh instances that share a material are merged into fewer draw calls.
- [Multi-Draw](../advanced-rendering/multi-draw.md) - A single mesh instance rendered as many sub-draws of its mesh in one call.
- [Indirect Drawing](../advanced-rendering/indirect-drawing.md) - A compute shader writes the draw parameters on the GPU.
