---
title: Devices and Inspector
description: Preview a PlayCanvas app in Stage at phone, tablet and Snapchat Web Lens viewports, and inspect it with the PlayCanvas Inspector and MiniStats.
---

The viewer has tools for seeing how your app looks on other screens and what it's doing under the surface.

## Devices

The device menu shows the app at a phone or tablet viewport:

| Device | Viewport (CSS px) |
| --- | --- |
| Responsive | Fills the viewer |
| **Snapchat Web Lens** | 360×640, portrait only |
| iPhone | 390×844 |
| Android | 412×915 |
| iPad | 820×1180 |

The **Snapchat Web Lens** frame draws Snapchat's own camera controls faintly over the app, so you can lay a lens out around them.

<video autoPlay muted loop controls src='/video/stage-device.mp4' style={{width: '100%', height: 'auto'}} />

## Inspector

The **Inspector** button in the header opens the [PlayCanvas Inspector](https://github.com/playcanvas/inspector) beside the app, as a read-only view of its hierarchy, cameras, assets, materials, memory and more. Its selection is shared with the viewer, so selecting a row in the panel selects the entity in the view, and the other way round.

## MiniStats

The **MiniStats** button shows the app's frame time, GPU and CPU timings, draw calls and memory over its canvas, at three sizes: compact, detailed, and with graphs. It stays on across reloads until you turn it off.

<video autoPlay muted loop controls src='/video/stage-inspector-ministats.mp4' style={{width: '100%', height: 'auto'}} />

