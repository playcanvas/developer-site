---
title: Controls and Keyboard Shortcuts
description: Editor mouse and keyboard camera controls, numpad views, viewport selection and modifier keys, and accelerators such as launch, duplicate, rename, transform gizmos, frame selection, checkpoints and deletion.
sidebar_label: Controls & Keyboard Shortcuts
---

On macOS, use <kbd>Cmd</kbd> instead of <kbd>Ctrl</kbd> and <kbd>Option</kbd> instead of <kbd>Alt</kbd>.

## Camera Controls {#camera-controls}

The Editor's camera is controlled with the mouse and keyboard. The movement keys work on their own, without holding a mouse button, whenever the keyboard focus is not in a text field.

| Operation | Controls |
| --- | --- |
| Orbit | Drag with the left mouse button |
| Pan | Drag with the middle mouse button<br /><kbd>Shift</kbd>-drag with the left mouse button |
| Look Around | Drag with the right mouse button |
| Zoom / Dolly | Mouse wheel |
| Zoom (fast) | <kbd>Alt</kbd> + mouse wheel |
| Move | <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd><br />Arrow keys |
| Move Down / Up | <kbd>Q</kbd> / <kbd>E</kbd><br /><kbd>Page Down</kbd> / <kbd>Page Up</kbd> |
| Move (fast) | Hold <kbd>Shift</kbd> while moving |

In the orthographic views (Top, Bottom, Front, Back, Left and Right), dragging with the left or right mouse button pans the view, and <kbd>W</kbd> and <kbd>S</kbd> move it up and down.

## Viewport Cameras {#viewport-cameras}

Use the numeric keypad, with <kbd>Num Lock</kbd> on, to switch between the Editor's [cameras](viewport.md#cameras). Hold <kbd>Ctrl</kbd> to view the scene from the opposite side.

| Operation | Keyboard Shortcut |
| --- | --- |
| Front / Back View | <kbd>Numpad 1</kbd> / <kbd>Ctrl</kbd>+<kbd>Numpad 1</kbd> |
| Right / Left View | <kbd>Numpad 3</kbd> / <kbd>Ctrl</kbd>+<kbd>Numpad 3</kbd> |
| Top / Bottom View | <kbd>Numpad 7</kbd> / <kbd>Ctrl</kbd>+<kbd>Numpad 7</kbd> |
| Toggle Perspective / Orthographic | <kbd>Numpad 5</kbd> |
| Perspective View | <kbd>Numpad 0</kbd> |

<kbd>Numpad 5</kbd> switches from an orthographic view to the Perspective camera, and pressing it again returns to that orthographic view. To keep the Perspective camera but look along an axis, click the [View Cube](viewport.md#view-cube).

## General Mouse Controls {#general-mouse-controls}

| Operation | Controls |
| --- | --- |
| Select Entity | Click |
| Add or Remove Entity from Selection | <kbd>Ctrl</kbd>-click |
| Rectangle Select | <kbd>Ctrl</kbd>-drag |
| Translate / Rotate / Scale Entity (according to gizmo) | Drag the gizmo |

A rectangle selection selects the entities drawn inside the rectangle and replaces the current selection.

## General Modifier Keys {#general-modifier-keys}

| Operation | Controls |
| --- | --- |
| Toggle Editor's Snap setting while operating gizmo | Hold <kbd>Shift</kbd> while dragging the Entity |
| Do not preserve the Entity's transform when reparenting | Hold <kbd>Ctrl</kbd> when you reparent the Entity |
| Open the Launch Page or the Code Editor in a popup window | <kbd>Shift</kbd>-click the Launch or Code Editor button |

## Keyboard Shortcuts {#keyboard-shortcuts}

| Operation | Description | Keyboard Shortcut |
| --- | --- | --- |
| Launch | Launch the scene in a new tab | <kbd>Ctrl</kbd>+<kbd>Enter</kbd> |
| New Entity | Creates a new entity as a child of the selected entity, or at the root of the scene when no entity is selected | <kbd>Ctrl</kbd>+<kbd>E</kbd> |
| Duplicate Entity | Duplicates the selected entity and all children | <kbd>Ctrl</kbd>+<kbd>D</kbd> |
| Rename Entity / Asset | Focuses on the name field of the selected entity or asset | <kbd>N</kbd> or <kbd>F2</kbd> |
| Select All | With an entity selected, selects every entity in the scene. With an asset selected, selects every asset shown in the Assets panel | <kbd>Ctrl</kbd>+<kbd>A</kbd> |
| Copy Entity / Asset | Copy the current entity/asset selection | <kbd>Ctrl</kbd>+<kbd>C</kbd> |
| Paste Entity / Asset | Paste copied entity/asset under the currently selected entity/folder | <kbd>Ctrl</kbd>+<kbd>V</kbd> |
| Paste Assets (keep folders) | Paste copied assets and keep their [folder structure](../assets/asset-panel.md#copy-and-paste-between-projects) | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd> |
| Delete | Delete the current selection | <kbd>Delete</kbd><br /><kbd>Ctrl</kbd>+<kbd>Backspace</kbd> |
| Parent Folder | Go up one folder in the Assets panel | <kbd>Backspace</kbd> |
| Frame Selection | Focus on the current entity selection in the 3D view | <kbd>F</kbd> |
| Translate | Activate the translate gizmo in the 3D view | <kbd>1</kbd> |
| Rotate | Activate the rotate gizmo in the 3D view | <kbd>2</kbd> |
| Scale | Activate the scale gizmo in the 3D view | <kbd>3</kbd> |
| Resize Element | Activate the gizmo for [resizing UI elements](/user-manual/user-interface/elements/#element-resizing) in the 3D view | <kbd>4</kbd> |
| World / Local | Switch between local and world space gizmos | <kbd>L</kbd> |
| Toggle All Panels | Hides or shows all the panels to maximize the 3D view | <kbd>Space</kbd> |
| Bake | Re-bake lighting using the [Run-time Lightmapper](/user-manual/graphics/lighting/runtime-lightmaps) | <kbd>Ctrl</kbd>+<kbd>B</kbd> |
| Previous Selection | Select previously selected items | <kbd>Shift</kbd>+<kbd>X</kbd> |
| Undo | Undo the last action | <kbd>Ctrl</kbd>+<kbd>Z</kbd> |
| Redo | Redo the last action | <kbd>Ctrl</kbd>+<kbd>Y</kbd><br /><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> |
| New Checkpoint | Opens the Version Control panel with the form for [creating a checkpoint](../version-control/checkpoints.md#creating-a-checkpoint) | <kbd>Ctrl</kbd>+<kbd>S</kbd> |
| Code Editor | Opens the [Code Editor](../scripting/code-editor.md) | <kbd>Ctrl</kbd>+<kbd>I</kbd> |
| Projects | Switches to the projects page, opening it in a new tab if it is not already open | <kbd>Ctrl</kbd>+<kbd>O</kbd> |
| How do I...? | Toggle search toolbar for mini-tutorials | <kbd>Ctrl</kbd>+<kbd>Space</kbd> |
| Show Controls | Display the Editor controls | <kbd>Shift</kbd>+<kbd>?</kbd> |
