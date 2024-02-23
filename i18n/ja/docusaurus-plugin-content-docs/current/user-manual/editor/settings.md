---
title: Editor Settings
sidebar_position: 7
---

By default, the Editor is configured with settings that should suit the majority of users. However, in some circumstances, you may wish to modify the default behavior of the Editor. To do this, load the Settings into the [Inspector](inspector.md) by clicking the 'cog' icon on the [Toolbar](toolbar.md) or in the [Viewport](viewport.md).

![Settings](/img/user-manual/editor/toolbar/settings.png)

Then, navigate to the `EDITOR` section:

![Editor Settings](/img/user-manual/editor/settings/editor-settings.png)

:::note

Updates to Editor Settings apply only to the current project and only to you. In other words, they are personal preferences. They all persist over multiple sessions except for `Engine Version` which is reset at the start of each session.

:::

Here is a breakdown of the available settings:

| Setting                          | 説明 |
| -------------------------------- | ----------- |
| **Grid Divisions**               | Determines the number of divisions in the grid in the [Viewport](viewport.md). |
| **Grid Division Size**           | Sets the size of each grid division, affecting the grid scale. |
| **Snap**                         | Sets the snap increment when using the [gizmos](viewport.md#gizmos) in the [Viewport](viewport.md). Useful for precise positioning. |
| **Camera Clip Near**             | Sets the near clipping plane for all Editor cameras in the [Viewport](viewport.md). |
| **Camera Clip Far**              | Sets the far clipping plane for all Editor cameras in the [Viewport](viewport.md). |
| **Camera Depth Grabpass**        | Configures the camera to capture depth information for special effects. |
| **Camera Color Grabpass**        | Configures the camera to capture color information for special effects. |
| **Zoom Sensitivity**             | Adjusts the sensitivity of zooming in the [Viewport](viewport.md). |
| **Clear Color**                  | Sets the clear color for all Editor cameras in the [Viewport](viewport.md). |
| **Show Fog**                     | Toggles the visibility of fog in the [Viewport](viewport.md), even if it is enabled in the Scene Settings. |
| **Icons Size**                   | Changes the size of entity icons in the [Viewport](viewport.md). |
| **Engine Version**               | The engine version to use in the [Launch Page](launch-page/index.md) or when [publishing a build](../publishing/web/playcanvas-hosting.md#publishing-a-new-build). Defaults to the current [stable release](https://github.com/playcanvas/engine/releases) of the PlayCanvas Engine. This setting only persists for the current session. |
| **Locale**                       | Sets the locale used by the [localization system](../user-interface/localization.md) for display in the [Viewport](viewport.md). |
| **Chat Notifications**           | Toggles browser notifications for the Editor's built-in realtime chat. |
| **Rename Duplicated Entities**   | If enabled, duplicated entity names get an incremental number added to the end. This helps to ensure unique naming of entities. |
