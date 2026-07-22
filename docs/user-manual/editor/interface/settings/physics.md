---
title: Physics Settings
description: Physics settings for installing Ammo from the store controlling global gravity on rigid bodies and understanding why simulation stays off without the library.
sidebar_label: Physics
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** Review and edit the “Physics Settings” project values through `.pc/settings.json` in Pull/Push mode.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Query and modify the “Physics Settings” project settings in the project currently open in the Editor.

:::

Controls the global physics simulation settings.

:::note

These settings affect all users on the currently active [branch](../../version-control/branches.md) of the project.

:::

Navigate to the `PHYSICS` section and expand the panel:

![Physics Settings](/img/user-manual/editor/interface/settings/physics.webp)

Here is a breakdown of the available settings:

## Settings

| Setting | Description |
| --- | --- |
| **Physics Library** | Add the Ammo asm.js and WebAssembly modules to this project from the PlayCanvas Store. |
| **Gravity** | Gravity is the acceleration applied every frame to all rigid bodies in your scene. By default, it is set to -9.8 m/s^2, which essentially approximates Earth's gravity. If you are making a game in space, you might want to set this to 0, 0, 0 (zero g). |

### Notes

- Without Ammo.js imported, physics features will not function.
- Gravity can be adjusted to simulate different worlds.
