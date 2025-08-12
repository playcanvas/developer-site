---
title: Engine Settings
sidebar_label: Engine
---

Configure which PlayCanvas Engine version is used when launching, publishing, or downloading builds.

:::note

These settings affect all users on the currently active [branch](../../version-control/branches.md) of the project.

:::

Navigate to the `ENGINE` section and expand the panel:

![Engine Settings](/img/user-manual/editor/interface/settings/engine.webp)

Here is a breakdown of the available settings:

## Settings

| Setting | Description |
| --- | --- |
| **Engine Version** | The engine to use when you click Launch or when you publish or download a build. This setting is only valid during your current session and is not shared among team members. Options:<ul><li><strong>Previous</strong>: the latest patch of the previous minor build</li><li><strong>Current</strong>: the latest stable build</li><li><strong>Release Candidate</strong>: the forthcoming minor build yet to be promoted as the current stable build in the Editor.</li></ul> |

### Notes

- Engine versions may affect rendering features and behavior. Verify your project after switching.
