---
title: Editor Interface
description: "A tour of the PlayCanvas Editor: its five main areas, moving around the Viewport, selecting and transforming entities, undo, launching your scene, and where the other tools are."
---

This page is a tour of the Editor's interface: what each area is for, how to move around your scene, and how to select and move things in it.

![The PlayCanvas Editor with its five main areas numbered](/img/user-manual/editor/getting-started/your-first-app/editor-interface.webp)

1. **[Hierarchy](hierarchy.md)**: every entity in the scene, as a tree. Select, create, rename, reparent and duplicate entities here.
2. **[Viewport](viewport.md)**: your 3D view of the scene. Select entities by clicking them, and move them with the gizmos.
3. **[Inspector](inspector.md)**: the properties of whatever you have selected, such as an entity's components or an asset's settings. This is where you do most of your editing.
4. **[Assets](../assets/asset-panel.md)**: the files your project uses, such as models, materials, textures, audio and scripts. Drag an asset into the Viewport or onto a property in the Inspector to use it.
5. **[Toolbar](toolbar.md)**: the transform tools, undo and redo, the Code Editor, publishing and the Editor's settings.

Above the Viewport, a bar shows the project, branch and scene you're working in. Select **Projects** in it to go back to the [Project Dashboard](../projects/dashboard.md).

## Moving Around the Viewport {#moving-around-the-viewport}

| To | Do this |
| --- | --- |
| Orbit | Drag with the left mouse button. |
| Pan | Drag with the middle mouse button, or <kbd>Shift</kbd>-drag with the left. |
| Look around | Drag with the right mouse button. |
| Zoom | Scroll the mouse wheel. |
| Fly | Hold <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd> or <kbd>D</kbd> (or the arrow keys) to move, and <kbd>Q</kbd> or <kbd>E</kbd> to move down or up. Add <kbd>Shift</kbd> to go faster. |
| Frame the selection | Press <kbd>F</kbd>. If you lose your way, select an entity and press <kbd>F</kbd> to get back to it. |

The View Cube in the corner of the Viewport turns the camera to look along an axis. See [Viewport](viewport.md) for its cameras and render modes.

## Selecting and Transforming {#selecting-and-transforming}

Click an entity in the Viewport or the Hierarchy to select it, and its properties appear in the Inspector. Then use a gizmo to change its transform:

| Gizmo | Key | What it does |
| --- | --- | --- |
| Translate | <kbd>1</kbd> | Moves the entity. |
| Rotate | <kbd>2</kbd> | Rotates the entity. |
| Scale | <kbd>3</kbd> | Scales the entity. |

Drag a gizmo's handles to change one axis at a time, or type exact values into **Position**, **Rotation** and **Scale** in the Inspector. Press <kbd>L</kbd> to switch the gizmo between world and local axes.

Undo with <kbd>Ctrl</kbd>+<kbd>Z</kbd> (<kbd>Cmd</kbd>+<kbd>Z</kbd> on macOS) and redo with <kbd>Ctrl</kbd>+<kbd>Y</kbd> (<kbd>Cmd</kbd>+<kbd>Y</kbd> on macOS). Undo only steps back through your own changes, not other people's.

## Running Your Scene {#running-your-scene}

Select **Launch** at the top right of the Viewport, or press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (<kbd>Cmd</kbd>+<kbd>Enter</kbd> on macOS), to run the current scene in a new tab. The [Launch Page](launch-page/index.md) stays connected to the Editor, so you can change things and see the result while it runs.

## Everything Else {#everything-else}

- **The main menu**, under the PlayCanvas logo at the top left, opens the rest of the Editor's tools, such as the [Scenes](../scenes/managing-scenes.md) dialog.
- **The cog** on the Toolbar opens the [Settings](settings/index.md) for the project and the current scene in the Inspector.
- **[Keyboard Shortcuts](keyboard-shortcuts.md)** lists every control. The **Controls** button on the Toolbar shows them in the Editor.

The [Toolbar](toolbar.md) page describes every button, and you can rearrange the Toolbar to suit you.
