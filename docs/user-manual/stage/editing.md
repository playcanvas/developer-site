---
title: Editing Scenes
description: Pause a PlayCanvas app in Stage, select entities, move, rotate and scale them with gizmos, and Apply the edits so the agent writes them into the source.
---

In Stage you lay out a scene by hand, the same way you would in the PlayCanvas Editor, and the agent writes the result into your code.

## Play and Pause

The toolbar above the app plays and pauses it with <kbd>⌘</kbd>+<kbd>P</kbd> (<kbd>Ctrl</kbd>+<kbd>P</kbd> on Windows and Linux). Pausing stops the app's updates, input and audio, and an editor camera takes over while the game camera stays where the app put it.

| Input | Action |
| --- | --- |
| Drag | Orbit |
| Middle-drag or <kbd>Shift</kbd>+drag | Pan |
| Scroll | Zoom |
| Right-drag | Look around |
| <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> <kbd>Q</kbd> <kbd>E</kbd> | Fly |
| <kbd>F</kbd> | Frame the selection, or the whole scene, and orbit it |
| <kbd>⌥</kbd>+<kbd>⌘</kbd>+<kbd>P</kbd> | Step the app one frame |

Paused, click an entity to select it. Each camera in the scene shows as an icon, and a selected camera shows what it sees.

<video autoPlay muted loop controls src='/video/stage-select-rotate.mp4' style={{width: '100%', height: 'auto'}} />

## Move, Rotate and Scale

With an entity selected, switch the gizmo with <kbd>1</kbd>, <kbd>2</kbd> and <kbd>3</kbd>. Every toolbar button shows what it does and its key on hover.

| Key | Action |
| --- | --- |
| <kbd>1</kbd> | **Move:** drag an arrow or plane of the gizmo |
| <kbd>2</kbd> | **Rotate:** drag a ring of the gizmo |
| <kbd>3</kbd> | **Scale:** drag a handle of the gizmo |
| <kbd>X</kbd> | Switch the gizmo between world and local axes |
| <kbd>Shift</kbd> | Hold while dragging to snap: move in 0.1 m, turn in 15° and scale in 0.1 steps |
| <kbd>G</kbd> | Show or hide the ground grid |
| <kbd>Ctrl</kbd>/<kbd>⌘</kbd>+<kbd>Z</kbd> | Undo |
| <kbd>Ctrl</kbd>/<kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> | Redo |

<video autoPlay muted loop controls src='/video/stage-move-scale-undo.mp4' style={{width: '100%', height: 'auto'}} />

The ground grid shows to the editor camera only. It never appears in comment captures and can't be selected.

## Apply Edits to the Source

Every edit is saved as you make it, shows in every open view of the stage and survives reloads. Nothing changes in your source until you choose:

- **Apply** sends the edits to the agent, to write into the source.
- **Discard** puts the edited entities back where the app placed them, and sends nothing. It can be undone.

<video autoPlay muted loop controls src='/video/stage-apply.mp4' style={{width: '100%', height: 'auto'}} />

:::tip

In Claude Code you don't need to switch to the session after pressing **Apply**. The plugin wakes the session, and the agent picks the edits up on its own.

:::

:::note

An edit applies once, when its entity appears. After that, the app's own writes to the entity win, so an entity the app moves while it runs won't hold an edit.

:::
