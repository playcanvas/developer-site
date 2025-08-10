---
title: Layers Settings
sidebar_label: Layers
---

Layers determine which objects are rendered together and in what order.

:::note

These settings affect all users on the currently active [branch](../../version-control/branches.md) of the project.

:::

## Layers

- **Add Layer**: Creates a new layer for organizing scene objects.
- Each layer can be renamed and removed as needed.

Default layers:

- **World**
- **Depth**
- **Skybox**
- **Immediate**
- **UI**

## Render Order

Defines the sequence in which layers are drawn, and separates opaque and transparent rendering passes.

| Column | Description |
| --- | --- |
| **Layer** | The name of the render layer. |
| **Pass** | Either *Opaque* or *Transparent*. |
| **Enabled** | Toggles rendering of that pass. |

### Notes

- Transparent objects must be rendered after opaque objects to display correctly.
- Layers can be reordered by dragging in the **Render Order** list.
