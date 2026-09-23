# Render

A Render asset contains 3D mesh data extracted from imported 3D model files (such as GLB or FBX). It defines the shape and structure of 3D models and is used by the [Render Component](https://developer.playcanvas.com/user-manual/editor/scenes/components/render.md) to display geometry in the scene.

Render assets are primarily used for:

- Defining the shape and structure of 3D models
- Applying materials to mesh surfaces

## Inspector

The Render asset inspector displays metadata about the mesh and its relationship to the source container asset.

## Properties

### Meta

[Image: Render Asset Inspector - Meta]

| Property | Description |
|----------|-------------|
| Vertices | The total number of vertices in the mesh (read-only). |
| Triangles | The total number of triangles in the mesh (read-only). |
| Meshes | The number of mesh instances contained in the asset (read-only). |
| Skinned | Whether the mesh contains skinning data for skeletal animation (read-only). |
| Attributes | The vertex attributes present in the mesh data, such as position, normal, UV coordinates (read-only). |
| Mesh Compression | The compression format used, if any (e.g., Draco) (read-only). |

### Render

[Image: Render Asset Inspector - Render]

| Property | Description |
|----------|-------------|
| Index | The index of this render asset within its source container (read-only). |
| Container | A reference to the source container asset (GLB) from which this render was extracted (read-only). |

:::tip
To use this asset in scripts, see [Asset Attributes](https://developer.playcanvas.com/user-manual/scripting/script-attributes/esm.md#asset-attribute).
:::
