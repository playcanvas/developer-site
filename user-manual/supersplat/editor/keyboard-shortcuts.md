# Keyboard Shortcuts

Open **Help > Keyboard Shortcuts** in the Editor for the in-app reference. The tables below list the default bindings.

On macOS, shortcuts shown with <kbd>Ctrl</kbd> use <kbd>Cmd</kbd> for application commands such as Undo and Select All. The <kbd>Ctrl</kbd> selection modifier remains <kbd>Ctrl</kbd> on every platform.

## Editing and Selection

| Action | Windows/Linux | macOS |
|---|---|---|
| Undo | <kbd>Ctrl</kbd>+<kbd>Z</kbd> | <kbd>Cmd</kbd>+<kbd>Z</kbd> |
| Redo | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> | <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> |
| Select all | <kbd>Ctrl</kbd>+<kbd>A</kbd> | <kbd>Cmd</kbd>+<kbd>A</kbd> |
| Select none | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd> | <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd> |
| Invert selection | <kbd>Ctrl</kbd>+<kbd>I</kbd> | <kbd>Cmd</kbd>+<kbd>I</kbd> |
| Delete selected Gaussians | <kbd>Delete</kbd> or <kbd>Backspace</kbd> | <kbd>Delete</kbd> or <kbd>Backspace</kbd> |
| Lock selection | <kbd>H</kbd> | <kbd>H</kbd> |
| Unlock all | <kbd>Shift</kbd>+<kbd>H</kbd> | <kbd>Shift</kbd>+<kbd>H</kbd> |
| Toggle X-Ray | <kbd>N</kbd> | <kbd>N</kbd> |

For Rectangle, Lasso, Polygon, Brush, Sphere Brush, Flood, and Eyedropper selections, hold <kbd>Shift</kbd> to add, <kbd>Ctrl</kbd> to remove, or <kbd>Shift</kbd>+<kbd>Ctrl</kbd> to intersect with the current selection. [Selection Mode and X-Ray](https://developer.playcanvas.com/user-manual/supersplat/editor/editing-splats.md#selection-mode-and-x-ray) explains what <kbd>N</kbd> and <kbd>M</kbd> change.

## Tools and View

| Action | Shortcut |
|---|---|
| Move / Rotate / Scale | <kbd>1</kbd> / <kbd>2</kbd> / <kbd>3</kbd> (while Box or Sphere Selection is active, these switch the selection volume's gizmo instead) |
| Rectangle / Lasso / Polygon Selection | <kbd>R</kbd> / <kbd>L</kbd> / <kbd>P</kbd> |
| Brush / Sphere Brush Selection | <kbd>B</kbd> / <kbd>Shift</kbd>+<kbd>B</kbd> |
| Flood Selection | <kbd>O</kbd> |
| Eyedropper Selection | <kbd>Ctrl</kbd>+<kbd>E</kbd> (<kbd>Cmd</kbd>+<kbd>E</kbd> on macOS) |
| Decrease / increase brush size | <kbd>[</kbd> / <kbd>]</kbd>, or <kbd>Alt</kbd> + mouse wheel |
| Close the polygon | <kbd>Enter</kbd> |
| Remove the last polygon point | <kbd>Backspace</kbd> |
| Remove the active Measure or Orient point | <kbd>Delete</kbd> or <kbd>Backspace</kbd> |
| Deactivate current tool | <kbd>Esc</kbd> |
| Toggle world/local coordinates | <kbd>Shift</kbd>+<kbd>C</kbd> |
| Toggle Centers/Rings mode | <kbd>M</kbd> |
| Toggle markers | <kbd>Tab</kbd> |
| Toggle grid | <kbd>G</kbd> |
| Toggle camera info | <kbd>I</kbd> |
| Toggle Splat Data panel | <kbd>Ctrl</kbd>+<kbd>D</kbd> (<kbd>Cmd</kbd>+<kbd>D</kbd> on macOS) |
| Toggle Timeline panel | <kbd>Ctrl</kbd>+<kbd>T</kbd> (<kbd>Cmd</kbd>+<kbd>T</kbd> on macOS) |

## Camera

| Action | Shortcut |
|---|---|
| Frame the selection or active splat | <kbd>F</kbd> (frames the active Box, Sphere, Measure, or Orient tool instead while one is active) |
| Reset camera | <kbd>Shift</kbd>+<kbd>F</kbd> |
| Toggle orbit/fly controls | <kbd>V</kbd> |
| Fly forward/back/left/right | <kbd>W</kbd> / <kbd>S</kbd> / <kbd>A</kbd> / <kbd>D</kbd> |
| Fly down/up | <kbd>Q</kbd> / <kbd>E</kbd> |
| Fly faster / slower | Hold <kbd>Shift</kbd> / <kbd>Alt</kbd> |

See [Camera Controls](https://developer.playcanvas.com/user-manual/supersplat/editor/camera-controls.md) for mouse, touch, fly, and view-cube controls.

## Timeline

| Action | Shortcut |
|---|---|
| Play or pause | <kbd>Space</kbd> |
| Previous / next frame | <kbd>,</kbd> / <kbd>.</kbd> |
| Previous / next keyframe | <kbd>&lt;</kbd> / <kbd>&gt;</kbd> (<kbd>Shift</kbd>+<kbd>,</kbd> / <kbd>Shift</kbd>+<kbd>.</kbd>) |
| Add keyframe | <kbd>Enter</kbd> |
| Remove keyframe | <kbd>Shift</kbd>+<kbd>Enter</kbd> |
| Overwrite a keyframe with the current camera pose | <kbd>Ctrl</kbd>-click the keyframe |
| Copy a keyframe | <kbd>Shift</kbd>-drag the keyframe |

## File

| Action | Windows/Linux | macOS |
|---|---|---|
| Re-export (repeat the last export) | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> | <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> |

Shortcuts are ignored while focus is in a text or numeric input. The brush size shortcuts act on whichever brush is active; Brush and Sphere Brush share one size.
