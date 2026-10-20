---
title: Asset Import Settings
description: Configure default overwrite behavior and texture size limits for assets imported into the PlayCanvas Editor.
sidebar_label: Asset Import
---

Controls default behavior for imported assets.

:::note

These settings affect only you and are global for the whole project.

:::

Navigate to the `ASSET IMPORT` section and expand the panel:

![Asset Import Settings](/img/user-manual/editor/interface/settings/asset-import.webp)

Here is a breakdown of the available settings:

## General

| Setting | Description |
| --- | --- |
| **Search related assets** | If enabled, importing a source asset updates related target assets wherever they are located. If disabled, assets are updated only when in the same folder; otherwise, new assets are created. |
| **Assets default to preload** | Creates new assets with the preload option enabled. Script assets are always created with preload enabled. |

## Texture Import

| Setting | Description |
| --- | --- |
| **Textures POT** | When a texture is imported, it will be resized to the nearest power-of-two resolution. |
| **Create Atlases** | If enabled, imported textures are converted to Texture Atlas assets instead of Texture assets. |

## Model Import

| Setting | Description |
| --- | --- |
| **Preserve material mappings** | If enabled, when reimporting an existing source model, the Editor attempts to preserve existing user-defined material mappings. |
| **Overwrite Models** | When a model is imported, overwrites any previously imported model asset. |
| **Overwrite Animations** | When a model is imported, overwrites previously imported animation assets. |
| **Overwrite Materials** | When a model is imported, overwrites previously imported material assets. |
| **Overwrite Textures** | When a model is imported, overwrites previously imported texture assets. |
| **Convert to GLB** | Create model assets in GLB format. |
| **Import Hierarchy** | Generates a template asset when importing 3D assets (FBX, etc.). The template asset contains the full entity hierarchy from the imported file. |
| **Mesh Compression** | Specify the mesh compression to apply to imported models. |
| **Draco Decode Speed** | Currently has no effect. The import pipeline ignores this setting and derives the decoding speed from Draco Mesh Size instead. Only shown when Mesh Compression is Draco. |
| **Draco Mesh Size** | How many bits are used to compress mesh attributes, from 0 to 1. This value also sets the decoding speed. Lower values produce smaller files that decode more slowly, with less detail and possible artifacts. Only shown when Mesh Compression is Draco. |
| **Unwrap UV** | Generates a set of unwrapped UV coordinates. |
| **Texels Per Meter** | Specifies the number of texels per meter when UV unwrapping is enabled. Default: 16. |
| **Import Morph Normals** | Imports morph target normals when importing a model. Disable this if morph target normals look incorrect. |
| **Use Unique Indices** | When importing FBX models, identifies unique vertices by their attribute indices instead of their attribute values. This usually generates more vertices, but preserves their order. |
| **Create FBX Folder** | Creates a new folder, named after the imported file, in the current directory to store the imported contents. Despite its name, this applies to every model format, not only FBX. |

## Animation Import

| Setting | Description |
| --- | --- |
| **Naming Strategy** | Choose the naming strategy for imported animations:<ul><li><strong>Use Take Name</strong>: Name the animation after the take name assigned in the FBX file</li><li><strong>Use FBX Filename</strong>: Name the animation after the FBX filename</li></ul> |
| **Sample Rate** | The rate at which to sample animation curves (samples per second). Specify 0 to disable sampling and use input keys instead. |
| **Curve Tolerance** | The tolerance used when optimizing linear animation curve segments. Specify 0 to disable curve optimization. |
| **Cubic Curves** | Output cubic curves when they are encountered. Disable to convert all curves to linear segments. |
