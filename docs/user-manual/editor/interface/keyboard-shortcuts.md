---
title: Controls and Keyboard Shortcuts
description: Editor mouse and keyboard camera controls, numpad views, viewport selection and modifier keys, and accelerators such as launch, duplicate, rename, transform gizmos, frame selection, checkpoints and deletion.
sidebar_label: Controls & Keyboard Shortcuts
---

On a Mac, use CMD instead of CTRL and OPTION instead of ALT.

## Camera Controls {#camera-controls}

The Editor's camera is controlled with the mouse and keyboard. The movement keys work on their own, without holding a mouse button, whenever the keyboard focus is not in a text field.

| Operation      | Controls                                                         |
| -------------- | ---------------------------------------------------------------- |
| Orbit          | Left Mouse Button + Drag                                         |
| Pan            | Middle Mouse Button + Drag<br />SHIFT + Left Mouse Button + Drag |
| Look Around    | Right Mouse Button + Drag                                        |
| Zoom / Dolly   | Mouse Wheel                                                      |
| Zoom (fast)    | ALT + Mouse Wheel                                                |
| Move           | W-A-S-D<br />Arrow Keys                                          |
| Move Down / Up | Q / E<br />PAGE DOWN / PAGE UP                                   |
| Move (fast)    | Hold SHIFT while moving                                          |

In the orthographic views (Top, Bottom, Front, Back, Left and Right), dragging with the left or right mouse button pans the view, and W and S move it up and down.

## Viewport Cameras {#viewport-cameras}

Use the numeric keypad, with Num Lock on, to switch between the Editor's [cameras](viewport.md#cameras). Hold CTRL to view the scene from the opposite side.

| Operation                         | Keyboard Shortcut          |
| --------------------------------- | -------------------------- |
| Front / Back View                 | NUMPAD 1 / CTRL + NUMPAD 1 |
| Right / Left View                 | NUMPAD 3 / CTRL + NUMPAD 3 |
| Top / Bottom View                 | NUMPAD 7 / CTRL + NUMPAD 7 |
| Toggle Perspective / Orthographic | NUMPAD 5                   |
| Perspective View                  | NUMPAD 0                   |

NUMPAD 5 switches from an orthographic view to the Perspective camera, and pressing it again returns to that orthographic view. To keep the Perspective camera but look along an axis, click the [View Cube](viewport.md#view-cube).

## General Mouse Controls {#general-mouse-controls}

| Operation                                              | Controls                        |
| ------------------------------------------------------ | ------------------------------- |
| Select Entity                                          | Left Mouse Button               |
| Add or Remove Entity from Selection                    | CTRL + Left Mouse Button        |
| Rectangle Select                                       | CTRL + Left Mouse Button + Drag |
| Translate / Rotate / Scale Entity (according to gizmo) | Left Mouse Button + Drag        |

A rectangle selection selects the entities drawn inside the rectangle and replaces the current selection.

## General Modifier Keys {#general-modifier-keys}

| Operation                                                 | Controls                                                    |
| --------------------------------------------------------- | ----------------------------------------------------------- |
| Toggle Editor's Snap setting while operating gizmo        | Hold SHIFT while dragging the Entity                        |
| Do not preserve the Entity's transform when reparenting   | Hold CTRL when you reparent the Entity                      |
| Open the Launch Page or the Code Editor in a popup window | Hold SHIFT when you click the Launch or Code Editor button  |

## Keyboard Shortcuts {#keyboard-shortcuts}

| Operation                   | Description                                                                                                              | Keyboard Shortcut              |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| Launch                      | Launch the scene in a new tab                                                                                            | CTRL + ENTER                   |
| New Entity                  | Creates a new entity as a child of the selected entity, or at the root of the scene when no entity is selected           | CTRL + E                       |
| Duplicate Entity            | Duplicates the selected entity and all children                                                                          | CTRL + D                       |
| Rename Entity               | Focuses on the name field of the selected entity                                                                         | F2                             |
| Rename Asset                | Focuses on the name field of the selected asset                                                                          | N or F2                        |
| Select All                  | With an entity selected, selects every entity in the scene. With an asset selected, selects every asset shown in the Assets panel | CTRL + A              |
| Copy Entity / Asset         | Copy the current entity/asset selection                                                                                  | CTRL + C                       |
| Paste Entity / Asset        | Paste copied entity/asset under the currently selected entity/folder                                                     | CTRL + V                       |
| Paste Assets (keep folders) | Paste copied assets and keep their [folder structure](../assets/asset-panel.md#copy-and-paste-between-projects)          | CTRL + SHIFT + V               |
| Delete                      | Delete the current selection                                                                                             | DELETE<br />CTRL + BACKSPACE   |
| Parent Folder               | Go up one folder in the Assets panel                                                                                     | BACKSPACE                      |
| Frame Selection             | Focus on the current entity selection in the 3D view                                                                     | F                              |
| Translate                   | Activate the translate gizmo in the 3D view                                                                              | 1                              |
| Rotate                      | Activate the rotate gizmo in the 3D view                                                                                 | 2                              |
| Scale                       | Activate the scale gizmo in the 3D view                                                                                  | 3                              |
| Resize Element              | Activate the gizmo for [resizing UI elements](/user-manual/user-interface/elements/#element-resizing) in the 3D view     | 4                              |
| World / Local               | Switch between local and world space gizmos                                                                              | L                              |
| Toggle All Panels           | Hides or shows all the panels to maximize the 3D view                                                                    | SPACE                          |
| Bake                        | Re-bake lighting using the [Run-time Lightmapper](/user-manual/graphics/lighting/runtime-lightmaps)                      | CTRL + B                       |
| Previous Selection          | Select previously selected items                                                                                         | SHIFT + X                      |
| Undo                        | Undo the last action                                                                                                     | CTRL + Z                       |
| Redo                        | Redo the last action                                                                                                     | CTRL + Y<br />CTRL + SHIFT + Z |
| New Checkpoint              | Opens the Version Control panel with the form for [creating a checkpoint](../version-control/checkpoints.md#creating-a-checkpoint) | CTRL + S             |
| Code Editor                 | Opens the [Code Editor](../scripting/code-editor.md)                                                                     | CTRL + I                       |
| Projects                    | Switches to the projects page, opening it in a new tab if it is not already open                                         | CTRL + O                       |
| How do I...?                | Toggle search toolbar for mini-tutorials                                                                                 | CTRL + SPACE                   |
| Show Controls               | Display the Editor controls                                                                                              | SHIFT + ?                      |
