---
title: Editor Settings
sidebar_label: Editor
---

By default, the Editor is configured with settings that should suit the majority of users. However, in some circumstances, you may wish to modify the default behavior of the Editor.

:::note

These settings affect only you and are global for the whole project. They are 'sticky' and persist over multiple sessions.

:::

Navigate to the `EDITOR` section and expand the panel:

![Editor Settings](/img/user-manual/editor/interface/settings/editor.webp)

Here is a breakdown of the available settings:

## Settings

| Setting | Description |
| --- | --- |
| **Grid Divisions**               | Divisions specifies the number of grid cells in each horizontal direction. Set to 0 to disable the grid. |
| **Grid Division Size**           | Size specifies the size of a cell. |
| **Snap**                         | Set the increment for [gizmo](../viewport.md#gizmos) snapping. Hold Shift or use the Snap toggle on the toolbar to enable snapping while using gizmos. |
| **Zoom Sensitivity**             | Change this value if you want to adjust the zoom sensitivity in the Editor viewport. |
| **Camera Depth Grabpass**        | Enable generating a depth map texture for the editor viewport. Required to preview certain material effects. |
| **Camera Color Grabpass**        | Enable generating a color map texture for the editor viewport. Required to preview certain material effects. |
| **Camera Clip Near**             | Adjust the editor camera Near clip value. This setting does not affect the game. |
| **Camera Clip Far**              | Adjust the editor camera Far clip value. This setting does not affect the game. |
| **Camera Clear Color**           | Set the editor camera clear color. This does not affect the game. |
| **Camera Tonemapping**           | Set the editor camera tone mapping. This setting does not affect the game. |
| **Camera Gamma**                 | Set the editor camera gamma correction. This setting does not affect the game. |
| **Show Fog**                     | Enable fog rendering in the viewport. |
| **Icons Size**                   | Size of icons displayed in the editor viewport. |
| **Locale**                       | The locale to preview in the editor and when you launch the application. This is only visible to you, not to other team members. |
| **Chat Notifications**           | Receive notifications for the Editor's built-in [real-time chat](../../realtime-collaboration.md#real-time-chat). |
| **Rename Duplicated Entities**   | When enabled, duplicated entities are renamed by appending an incrementing number to ensure uniqueness. For example, 'Box' becomes 'Box2'. |
| **Lightmapper Auto Bake**        | Controls whether the [runtime lightmapper](/user-manual/graphics/lighting/runtime-lightmaps) automatically rebakes lightmaps whenever the scene is updated. |
