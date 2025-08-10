---
title: Physics Settings
sidebar_label: Physics
---

Controls the global physics simulation settings.

:::note

These settings affect all users on the currently active [branch](../../version-control/branches.md) of the project.

:::

## Settings

| Setting | Description |
| --- | --- |
| **Physics Library** | Add the Ammo asm.js and WASM modules to this project from the Store. Required for rigid body and collision components. |
| **Gravity** | Acceleration applied to all rigid bodies. Default `(0, -9.8, 0)` approximates Earth gravity. Set to `0, 0, 0` for zero‑g. |

### Notes

- Without Ammo.js imported, physics features will not function.
- Gravity can be adjusted to simulate different worlds.
