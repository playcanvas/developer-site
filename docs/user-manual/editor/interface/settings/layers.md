---
title: Layers Settings
sidebar_label: Layers
---

Layers determine which objects are rendered together and in what order.

:::note

These settings affect all users on the currently active [branch](../../version-control/branches.md) of the project.

:::

Navigate to the `LAYERS` section and expand the panel:

![Layers Settings](/img/user-manual/editor/interface/settings/layers.webp)

Here is a breakdown of the available settings:

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

| Setting | Description |
| --- | --- |
| **Layer** | The name of the render layer. |
| **Pass** | Either:<ul><li><strong>Opaque</strong>: Renders opaque mesh instances</li><li><strong>Transparent</strong>: Renders semi‑transparent mesh instances</li></ul> |
| **Enabled** | Enables or disables this part of the layer. When a part is disabled, the mesh instances of that part will not be rendered. |

### Notes

- Transparent objects must be rendered after opaque objects to display correctly.
- Layers can be reordered by dragging in the **Render Order** list.
