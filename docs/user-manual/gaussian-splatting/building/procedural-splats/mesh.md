---
title: Mesh to Splats
description: "GsplatMesh script: rasterize mesh triangles into uniformly distributed splats using render-component geometry for stylized splat models."
---

The `GsplatMesh` script converts mesh geometry into Gaussian splats. It extracts triangles from render components and generates uniformly distributed splats across the mesh surface using triangle rasterization.

:::note

This feature builds on the [splat rendering architecture](/user-manual/gaussian-splatting/rendering-architecture).

:::

## Overview

`GsplatMesh` is a Script component that:

- Extracts triangles from mesh instances in an entity hierarchy
- Rasterizes each triangle to generate splat positions
- Uses material colors (emissive or diffuse) for splat colors
- Creates a [GSplatContainer](/user-manual/gaussian-splatting/building/procedural-splats/) internally

This is useful for converting 3D models to splat representations for stylized rendering effects.

## Basic Usage

```javascript
// Import the script
const { GsplatMesh } = await import('path/to/gsplat-mesh.mjs');

// Add script component to an entity
entity.addComponent('script');
const meshSplat = entity.script.create(GsplatMesh);

// Build splats from another entity's mesh hierarchy
meshSplat.buildFromEntity(sourceEntity, {
    splatSize: 0.02,
    recursive: true
});
```

## API

### buildFromEntity(entity, options)

Builds splats from an entity's mesh hierarchy.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `entity` | Entity | - | The entity to extract meshes from |
| `options.splatSize` | number | 0.01 | Size of each splat and spacing between them |
| `options.recursive` | boolean | true | Whether to recursively search children |
| `options.margin` | number | 0.65 | Margin factor relative to splatSize |

**Splat Size:** Smaller values create more splats for higher density coverage. The spacing between splats is based on this size.

**Margin:** Controls the distance from triangle edges where no splats are placed. Use 0 for no margin (splats extend to edges), or higher values to avoid overlap artifacts at shared triangle edges.

### clear()

Removes all splats and destroys the internal container.

```javascript
meshSplat.clear();
```

### splatCount (read-only)

Returns the current number of splats.

```javascript
console.log(`Generated ${meshSplat.splatCount} splats`);
```

## Color Extraction

The script extracts colors from materials in this order:

1. **Emissive color** (if non-zero)
2. **Diffuse color** (fallback)
3. **White** (default for non-StandardMaterial)

For transparent materials, the opacity is also extracted and halved to compensate for overlap.

## Transform Handling

Splats are generated in the **local space** of the entity that has the `GsplatMesh` script. The script:

1. Gets the world transform of the source entity
2. Computes the inverse to transform mesh vertices to local space
3. Generates splats in that local space

This means you can use the entity's transform (position, rotation, scale) to place the splat representation in your scene.

## Sharing Containers

The generated `GSplatContainer` can be shared across multiple gsplat components:

```javascript
// Build splats
meshSplat.buildFromEntity(sourceEntity, { splatSize: 0.05 });

// Get the container
const container = meshSplat.entity.gsplat.resource;

// Share with other entities
anotherEntity.addComponent('gsplat', {
    resource: container
});
```

## Live Example

See the Procedural Mesh example which demonstrates converting a terrain scene with animated clouds to splat representation.

<EngineExample id="gaussian-splatting/procedural-mesh" title="Procedural Mesh example" />

## Script Location

The script is available in the PlayCanvas Engine repository:

```text
scripts/esm/gsplat/gsplat-mesh.mjs
```

## See Also

- [Procedural Splats](/user-manual/gaussian-splatting/building/procedural-splats/)
- [Image to Splats](/user-manual/gaussian-splatting/building/procedural-splats/image)
- [Lines and Shapes](/user-manual/gaussian-splatting/building/procedural-splats/lines)
- [Text to Splats](/user-manual/gaussian-splatting/building/procedural-splats/text)
