# Keyboard Shortcuts

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
| Toggle Selection Depth | `N` | `N` |
| Toggle Selection Footprint | `M` | `M` |

For Rectangle, Lasso, Polygon, Brush, Sphere Brush, Flood, and Eyedropper selections, hold `Shift` to add, `Ctrl` to remove, or `Shift + Ctrl` to intersect with the current selection. [Selection Depth and Footprint](https://developer.playcanvas.com/user-manual/supersplat/editor/editing-splats.md#selection-depth-and-footprint) explains what `N` and `M` change.

## Tools and View

| Action | Shortcut |
|---|---|
| Move / Rotate / Scale | `1` / `2` / `3` (while Box or Sphere Selection is active, these switch the selection volume's gizmo instead) |
| Rectangle / Lasso / Polygon Selection | `R` / `L` / `P` |
| Brush / Sphere Brush Selection | `B` / `Shift + B` |
| Flood Selection | `O` |
| Eyedropper Selection | `Ctrl + E` (`Cmd + E` on macOS) |
| Decrease / increase brush size | `[` / `]`, or `Alt + Wheel` |
| Close the polygon | `Enter` |
| Remove the last polygon point | `Backspace` |
| Remove the active Measure or Orient point | `Delete` or `Backspace` |
| Deactivate current tool | `Escape` |
| Toggle world/local coordinates | `Shift + C` |
| Toggle display overlays | `Tab` |
| Toggle grid | `G` |
| Toggle camera info | `I` |
| Toggle Splat Data panel | `Ctrl + D` (`Cmd + D` on macOS) |
| Toggle Timeline panel | `Ctrl + T` (`Cmd + T` on macOS) |

## Camera

| Action | Shortcut |
|---|---|
| Frame the selection or active splat | `F` (frames the active Box, Sphere, Measure, or Orient tool instead while one is active) |
| Reset camera | `Shift + F` |
| Toggle orbit/fly controls | `V` |
| Fly forward/back/left/right | `W` / `S` / `A` / `D` |
| Fly down/up | `Q` / `E` |
| Fly faster / slower | Hold `Shift` / `Alt` |

See [Camera Controls](https://developer.playcanvas.com/user-manual/supersplat/editor/camera-controls.md) for mouse, touch, fly, and view-cube controls.

## Timeline

| Action | Shortcut |
|---|---|
| Play or pause | `Space` |
| Previous / next frame | `,` / `.` |
| Previous / next keyframe | `<` / `>` (`Shift + ,` / `Shift + .`) |
| Add keyframe | `Enter` |
| Remove keyframe | `Shift + Enter` |
| Overwrite a keyframe with the current camera pose | `Ctrl + Click` the keyframe |
| Copy a keyframe | `Shift + Drag` the keyframe |

## File

| Action | Windows/Linux | macOS |
|---|---|---|
| Re-export (repeat the last export) | `Ctrl + Shift + E` | `Cmd + Shift + E` |

Shortcuts are ignored while focus is in a text or numeric input. The brush size shortcuts act on whichever brush is active; Brush and Sphere Brush share one size.
