---
title: Camera Controls
---

SuperSplat provides intuitive camera controls for navigating the 3D view, supporting mouse, touch, and keyboard inputs. There are two control modes: **Orbit** (default) and **Fly**.

- **Orbit mode** - Camera rotates around a focal point. Best for inspecting objects from all angles.
- **Fly mode** - Camera moves freely through the scene. Best for navigating large environments.

Press **V** to toggle between modes, or use the WASD keys to automatically switch to fly mode.

## Mouse Controls

| Action | Orbit Mode | Fly Mode |
|--------|------------|----------|
| Left drag | Orbit around focal point | Look around |
| Middle drag | Zoom | Zoom |
| Right drag | Pan | Pan |
| Right + Ctrl/Shift drag | Orbit | Look around |
| Right + Alt drag | Zoom | Zoom |
| Mouse wheel | Zoom | Move forward/backward |
| Mouse wheel + Shift | Pan (trackpad) | — |
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
| **W/A/S/D** | Fly forward/left/backward/right |
| **Q/E** | Fly down/up |
| **Shift** | 10× faster fly speed |
| **Ctrl** | 0.1× slower fly speed |
| **V** | Toggle between orbit and fly modes |
| **C** | Reset camera to default position |
| **F** | Focus camera on selection |

## Camera Settings

Access camera settings through the **View Options** panel (gear icon):

| Setting | Range | Default | Description |
|---------|-------|---------|-------------|
| **Field of View** | 10° - 120° | 75° | Camera viewing angle |
| **Fly Speed** | 0.1 - 30 | 1 | Speed of WASD navigation |
