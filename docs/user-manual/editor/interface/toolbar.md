---
title: Toolbar
description: Toolbar buttons from menus and gizmos through snap focus history lightmapper code editor publish downloads community links help overlays and settings access.
---

The Editor's main toolbar can be found on the left, vertical edge of the Editor. You can access many common operations via the toolbar. Here is a list of the functionality available:

| Button | Command | Description |
| ------ | ------- | ----------- |
| ![Menu](/img/user-manual/editor/interface/toolbar/menu.png) | **Menu** | Open the main menu to access the most commonly needed Editor functions. |
| ![Gizmo Translate](/img/user-manual/editor/interface/toolbar/translate.png) | **Translate** | Activate the translate [gizmo](../viewport#gizmos) in the [Viewport](../viewport). |
| ![Gizmo Rotate](/img/user-manual/editor/interface/toolbar/rotate.png) | **Rotate** | Activate the rotate [gizmo](../viewport#gizmos) in the [Viewport](../viewport). |
| ![Gizmo Scale](/img/user-manual/editor/interface/toolbar/scale.png) | **Scale** | Activate the scale [gizmo](../viewport#gizmos) in the [Viewport](../viewport). |
| ![Element Scale](/img/user-manual/editor/interface/toolbar/resize-element.png) | **Resize Element** | Activate the User Interface [Element resizing gizmo](/user-manual/user-interface/elements#element-resizing) in the [Viewport](../viewport).  |
| ![World Local](/img/user-manual/editor/interface/toolbar/world-local.png) | **World/Local** | Switch between local and world coordinate systems for the active [gizmo](../viewport#gizmos) in the [Viewport](../viewport). |
| ![Snap](/img/user-manual/editor/interface/toolbar/snap.png) | **Snap** | Enable snapping when using the [gizmos](../viewport#gizmos) in the [Viewport](../viewport). |
| ![Focus](/img/user-manual/editor/interface/toolbar/focus.png) | **Focus** | Zoom the [Viewport](../viewport) camera to the currently selected Entity. |
| ![Undo](/img/user-manual/editor/interface/toolbar/undo.png) | **Undo** | Undo the last operation. |
| ![Redo](/img/user-manual/editor/interface/toolbar/redo.png) | **Redo** | Redo the last operation. |
| ![Bake](/img/user-manual/editor/interface/toolbar/lightmapper.png) | **Lightmapper** | Access the [Lightmapper](/user-manual/graphics/lighting/runtime-lightmaps) bake and auto-rebake controls. |
| ![Code Editor](/img/user-manual/editor/interface/toolbar/code-editor.png) | **Code Editor** | Open the [Code Editor](/user-manual/editor/scripting/code-editor). |
| ![Publish](/img/user-manual/editor/interface/toolbar/publish.png) | **Publish / Download** | [Publish a build](/user-manual/editor/publishing/web/playcanvas-hosting#publishing-a-new-build) or download your project. |
| ![GitHub](/img/user-manual/editor/interface/toolbar/github.png) | **GitHub** | Report issues on [GitHub](https://github.com/playcanvas/editor/issues). |
| ![Discord](/img/user-manual/editor/interface/toolbar/discord.png) | **Discord** | Join the PlayCanvas [Discord server](https://discord.gg/RSaMRzg). |
| ![Forum](/img/user-manual/editor/interface/toolbar/forum.png) | **Forum** | Ask for help on the [forum](https://forum.playcanvas.com). |
| ![How Do I](/img/user-manual/editor/interface/toolbar/how-do-i.png) | **How Do I...?** | Toggle the 'How Do I...?' help widget in the [Viewport](../viewport). |
| ![Controls](/img/user-manual/editor/interface/toolbar/controls.png) | **Controls** | Show the list of [controls and keyboard shortcuts](../keyboard-shortcuts) supported by the Editor. |
| ![Settings](/img/user-manual/editor/interface/toolbar/settings.png) | **Settings** | Load Editor and Scene Settings into the [Inspector](../inspector). |

## Customizing the toolbar

Since Editor 2.30.3 you can hide buttons you never use and reorder the rest.

<video autoPlay muted loop controls src='/video/editor-toolbar-customization.mp4' style={{width: '100%', height: 'auto'}} />

Right-click anywhere on the toolbar to open its context menu:

| Command | Description |
| ------- | ----------- |
| **Edit Toolbar** | Enter edit mode. |
| **Done Editing** | Leave edit mode. Shown in place of Edit Toolbar while editing. |
| **Reset Toolbar** | Restore the default buttons and order. Only shown once you have hidden or moved something. |

In edit mode:

- Each button gains an **eye** badge. Click it to hide or show that button. Hidden buttons stay visible, dimmed, while you are editing so you can bring them back.
- Buttons can be dragged to reorder them. The toolbar has two groups — the commands at the top and the utility buttons at the bottom — and a button can only be moved within its own group.
- The **Menu** button at the top of the toolbar becomes a **Done editing toolbar** button. Click it, or pick **Done Editing** from the context menu, to finish.

:::note

Your layout is saved in your browser rather than in the project, so it applies to every project you open in that browser and is not shared with your collaborators.

:::
