# Camera Controls

You navigate the Editor's 3D view with a mouse, touch, or the keyboard. There are two control modes: **Orbit** (default) and **Fly**.

- **Orbit mode** - Camera rotates around a focal point. Best for inspecting objects from all angles.
- **Fly mode** - Camera moves freely through the scene. Best for navigating large environments.

Press <kbd>V</kbd> to toggle between modes, or press <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd> or <kbd>D</kbd> to switch to fly mode automatically.

## Mouse Controls

| Action | Orbit Mode | Fly Mode |
|--------|------------|----------|
| Left drag | Orbit around focal point | Look around |
| Middle click | Set focal point | — |
| Middle drag | Orbit around focal point | Look around |
| <kbd>Shift</kbd> + middle drag | Pan | Pan |
| <kbd>Ctrl</kbd> + middle drag | Zoom | Zoom |
| Right drag | Pan | Pan |
| Right + <kbd>Ctrl</kbd>/<kbd>Shift</kbd> drag | Orbit | Look around |
| Right + <kbd>Alt</kbd>/<kbd>Cmd</kbd> drag | Zoom | Zoom |
| Mouse wheel | Zoom | Move forward/backward |
| Mouse wheel + <kbd>Shift</kbd> | Pan | Pan |
| Mouse wheel + <kbd>Ctrl</kbd> | Orbit | Look around |
| Double-click | Set focal point | Set focal point (switches to orbit) |

## Touch Controls

| Action | Orbit Mode | Fly Mode |
|--------|------------|----------|
| Single finger drag | Orbit | Look around |
| Two-finger drag | Pan | — |
| Two-finger pinch/spread | Zoom | Move forward/backward |

## Keyboard Controls

| Key | Action |
|-----|--------|
| <kbd>W</kbd> / <kbd>A</kbd> / <kbd>S</kbd> / <kbd>D</kbd> | Fly forward/left/backward/right |
| <kbd>Q</kbd> / <kbd>E</kbd> | Fly down/up |
| <kbd>Shift</kbd> | 10× faster fly speed |
| <kbd>Alt</kbd> | 0.1× slower fly speed |
| <kbd>V</kbd> | Toggle between orbit and fly modes |
| <kbd>Shift</kbd>+<kbd>F</kbd> | Reset camera to default position |
| <kbd>F</kbd> | Focus camera on the selection (or on the active Box, Sphere, Measure, or Orient tool) |
| <kbd>I</kbd> | Toggle the [camera info overlay](https://developer.playcanvas.com/user-manual/supersplat/editor/camera-controls.md#camera-info-overlay) |

## Camera Settings

Three settings in the [Preferences](https://developer.playcanvas.com/user-manual/supersplat/editor/interface.md#preferences) popup (the gear icon in the right toolbar) affect the camera: **Field of View**, **FOV Auto Dolly**, and **Fly Speed**. Their ranges and defaults are listed under [Preferences](https://developer.playcanvas.com/user-manual/supersplat/editor/interface.md#preferences).

The field of view spans the longer side of the viewport: horizontally when the viewport is wider than it is tall, and vertically when it is taller than it is wide. Published scenes and exported viewers apply it the same way.

By default, changing the Field of View behaves like a lens zoom: the camera stays where it is and the scene appears magnified or shrunk. Enable **FOV Auto Dolly** to have the camera dolly (move) as the FOV changes instead, preserving the subject's framing.

## Camera Info Overlay

Press <kbd>I</kbd> (or enable **Camera Info** in the **Overlays** popup) to toggle an information overlay in the bottom-left corner of the viewport:

[Image: Camera Info Overlay]

The overlay shows the camera's live pose as `x, y, z` coordinates in scene units, updating in real time as you navigate:

- **P** - The camera's position
- **T** - The camera's target (the focal point it orbits around)

### Setting the Camera Pose Numerically

Both values are editable, so you can place the camera precisely:

1. Click a value - the text is selected, ready to overwrite
2. Type three numbers separated by commas or spaces (for example, `-0.55, 0.8, 1.1`)
3. Press <kbd>Enter</kbd> to apply (or <kbd>Esc</kbd> to cancel)

A valid value flashes green and the camera moves to the new pose; invalid input flashes red and the previous value is restored. Editing **P** repositions the camera while keeping it aimed at the current target, while editing **T** re-aims the camera at a new target without moving it.

This is handy for reproducing exact viewpoints - for example, returning to a precise camera setup or sharing coordinates with someone else working on the same scene.
