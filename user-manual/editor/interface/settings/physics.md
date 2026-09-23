# Physics Settings

Controls the global physics simulation settings.

:::note

These settings affect all users on the currently active [branch](https://developer.playcanvas.com/user-manual/editor/version-control/branches.md) of the project.

:::

Navigate to the `PHYSICS` section and expand the panel:

[Image: Physics Settings]

Here is a breakdown of the available settings:

## Settings

| Setting | Description |
| --- | --- |
| **Physics Library** | Add the Ammo asm.js and WebAssembly modules to this project from the PlayCanvas Store. |
| **Gravity** | Gravity is the acceleration applied every frame to all rigid bodies in your scene. By default, it is set to -9.8 m/s^2, which essentially approximates Earth's gravity. If you are making a game in space, you might want to set this to 0, 0, 0 (zero g). |

### Notes

- Without Ammo.js imported, physics features will not function.
- Gravity can be adjusted to simulate different worlds.
