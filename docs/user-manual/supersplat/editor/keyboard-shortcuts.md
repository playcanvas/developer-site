---
title: Keyboard Shortcuts
description: "Reference for SuperSplat Editor keyboard shortcuts covering navigation, selection, tools, panels, and the animation timeline."
---

Open **Help > Keyboard Shortcuts** in the Editor for the in-app reference. The tables below list the default bindings.

On macOS, shortcuts shown with `Ctrl` use `Cmd` for application commands such as Undo and Select All. The `Ctrl` selection modifier remains `Ctrl` on every platform.

## Editing and Selection

| Action | Windows/Linux | macOS |
|---|---|---|
| Undo | `Ctrl + Z` | `Cmd + Z` |
| Redo | `Ctrl + Shift + Z` | `Cmd + Shift + Z` |
| Select all | `Ctrl + A` | `Cmd + A` |
| Select none | `Ctrl + Shift + A` | `Cmd + Shift + A` |
| Invert selection | `Ctrl + I` | `Cmd + I` |
| Delete selected Gaussians | `Delete` or `Backspace` | `Delete` or `Backspace` |
| Lock selection | `H` | `H` |
| Unlock all | `Shift + H` | `Shift + H` |

For Picker, Lasso, Polygon, Brush, and Flood selections, hold `Shift` to add, `Ctrl` to remove, or `Shift + Ctrl` to intersect with the current selection.

## Tools and View

| Action | Shortcut |
|---|---|
| Move / Rotate / Scale | `1` / `2` / `3` (while Box or Sphere Select is active, these switch the selection volume's gizmo instead) |
| Picker / Lasso / Polygon | `R` / `L` / `P` |
| Brush / Flood | `B` / `O` |
| Eyedropper | `Ctrl + E` (`Cmd + E` on macOS) |
| Decrease / increase brush size | `[` / `]` |
| Deactivate current tool | `Escape` |
| Toggle world/local coordinates | `Shift + C` |
| Toggle centers/rings mode | `M` |
| Toggle edit overlay | `Tab` |
| Toggle grid | `G` |
| Toggle camera information | `I` |
| Toggle Splat Data panel | `Ctrl + D` (`Cmd + D` on macOS) |
| Toggle Timeline panel | `Ctrl + T` (`Cmd + T` on macOS) |

## Camera

| Action | Shortcut |
|---|---|
| Focus on selection or active splat | `F` |
| Reset camera | `Shift + F` |
| Toggle orbit/fly controls | `V` |
| Fly forward/back/left/right | `W` / `S` / `A` / `D` |
| Fly down/up | `Q` / `E` |
| Fly faster / slower | Hold `Shift` / `Alt` |

See [Camera Controls](camera-controls.md) for mouse, touch, fly, and view-cube controls.

## Timeline

| Action | Shortcut |
|---|---|
| Play or pause | `Space` |
| Previous / next frame | `,` / `.` |
| Previous / next keyframe | `<` / `>` |
| Add keyframe | `Enter` |
| Remove keyframe | `Shift + Enter` |

Shortcuts are ignored while focus is in a text or numeric input. Some keys also have tool-specific behavior: for example, `Delete` removes a placed point while Measure or Orient is active, and removes the last unclosed Polygon point while drawing a polygon. While Measure or Orient is active, `F` frames the placed points instead of the selection.
