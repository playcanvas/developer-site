---
title: Physics Settings
description: Physics settings for installing Ammo from the store controlling global gravity on rigid bodies and understanding why simulation stays off without the library.
sidebar_label: Physics
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** Edit only the Physics Settings values in `.pc/settings.json` so the project satisfies this requirement: physics settings for installing Ammo from the store controlling global gravity on rigid bodies and understanding why simulation stays off without the library; review the complete diff and diagnostics before Push.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Read the current Physics Settings values, change only those needed to satisfy this requirement: physics settings for installing Ammo from the store controlling global gravity on rigid bodies and understanding why simulation stays off without the library; read the values back and launch the project when they affect runtime behavior.

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
