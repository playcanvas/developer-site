---
title: Asset Import Settings
sidebar_label: Asset Import
---

Controls default behavior for imported assets.

:::note

These settings affect only you and global for the whole project.

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
| **Unwrap UV** | Generates a set of unwrapped UV coordinates. |
| **Texels Per Meter** | Specifies the number of texels per meter when UV unwrapping is enabled. Default: 16. |
| **Import Morph Normals** | Imports morph target normals when importing a model. Disable this if morph target normals look incorrect. |
| **Create FBX Folder** | Creates a new folder in the current directory when importing an FBX file to store the imported FBX contents. |

## Animation Import

| Setting | Description |
| --- | --- |
| **Naming Strategy** | Choose the naming strategy for imported animations:<ul><li><strong>Use Take Name</strong>: Name the animation after the take name assigned in the FBX file</li><li><strong>Use FBX Filename</strong>: Name the animation after the FBX filename</li></ul> |
| **Sample Rate** | The rate at which to sample animation curves (samples per second). Specify 0 to disable sampling and use input keys instead. |
| **Curve Tolerance** | The tolerance used when optimizing linear animation curve segments. Specify 0 to disable curve optimization. |
| **Cubic Curves** | Output cubic curves when they are encountered. Disable to convert all curves to linear segments. |
