---
title: Meshes
description: What a mesh holds, where meshes come from, and how they are shared.
---

A [`Mesh`](https://api.playcanvas.com/engine/classes/Mesh.html) holds geometry: a vertex buffer, an optional index buffer, and the primitive that describes how to draw them as triangles, lines or points. A mesh has no material and no position of its own, so the same mesh can be rendered any number of times, in different places and with different materials.

## Where Meshes Come From

### Primitive Shapes {#primitive-shapes}

A render component with a `type` of `box`, `capsule`, `cone`, `cylinder`, `plane`, `sphere` or `torus` renders a built-in mesh of that shape:

```javascript
const box = new Entity('Box');
box.addComponent('render', { type: 'box' });
app.root.addChild(box);
```

<EngineExample id="graphics/shapes" title="Primitive Shapes" />

### Loaded Models {#loaded-models}

A GLB loads as a container asset whose render assets hold the meshes. `asset.resource.instantiateRenderEntity()` creates an entity hierarchy with a render component for each of them. See the [Render Asset](https://playcanvas.github.io/#/graphics/render-asset) example.

### Meshes Created in Code {#meshes-created-in-code}

A mesh can be built from one of the geometry classes, such as `BoxGeometry`, or from your own vertex data. See [Creating Meshes](creating-meshes.md).

## Shared Meshes {#shared-meshes}

As one mesh can be rendered in many places, changing the vertices of a mesh changes all of them. This also applies to meshes you did not create:

- The meshes of the primitive shapes are created once per graphics device and shared by every render component of that type.
- The meshes of a loaded model are shared by every entity instantiated from its asset.

To change the geometry of a single object, give it a mesh of its own.

## In This Section

- [Creating Meshes](creating-meshes.md) - Building meshes from geometry classes and vertex data, and updating them.
- [Mesh Instances](mesh-instances.md) - Rendering meshes, and the settings that control how they render: visibility, shadows, sort order and shader parameters.
