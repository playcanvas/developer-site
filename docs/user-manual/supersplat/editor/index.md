---
title: SuperSplat Editor
description: "SuperSplat Editor: the open-source, browser-based editor for cleaning, optimizing, and animating 3D Gaussian Splats."
---

The [SuperSplat Editor](https://superspl.at/editor) is the open-source, browser-based editor at the heart of the [SuperSplat platform](../). It's the tool you use to clean up raw splat captures, trim floaters, crop scenes, retouch colors, build camera animations, and publish a finished splat ready to share. The Editor is [open source on GitHub](https://github.com/playcanvas/supersplat) under the MIT license and runs entirely in your browser — nothing is uploaded until you choose to publish.

:::tip Already have a clean splat?

You can skip the Editor entirely. Hit the orange **Upload Splat** button on the [superspl.at home page](https://superspl.at) (or use the [Direct Upload](../upload) flow) to publish a ready-made splat straight to your [Manage page](../manage).

:::

![SuperSplat Interface](/img/user-manual/supersplat/editor/supersplat-interface.png)

## Video Tutorials

### Introduction to SuperSplat

A great way to learn the basics of the SuperSplat Editor is to watch this video introduction:

<div className="iframe-container">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/MwzaEM2I55I" title="SuperSplat Basics" allowfullscreen></iframe>
</div>

### In-Depth Tutorial

For a more comprehensive guide to using the SuperSplat Editor, check out this in-depth tutorial:

<div className="iframe-container">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/J37rTieKgJ8" title="SuperSplat In-Depth Tutorial" allowfullscreen></iframe>
</div>

## Getting Started

### Accessing the Editor

1. **Open your browser** — Navigate to [superspl.at/editor](https://superspl.at/editor)
2. **Load your PLY file** — Drag and drop or use the File menu
3. **Begin editing** — Use the interface controls to navigate and edit

### System Requirements

- **Modern web browser** — Chrome, Firefox, Safari, or Edge
- **WebGL 2.0 support** — Available in all modern browsers
- **WebGPU support** — Only needed for SOG and standalone viewer exports (available in recent Chrome, Edge, and Safari)
- **GPU acceleration** — Recommended for large splat files
- **No installation** — Everything runs in the browser

## What's next?

- Get oriented with the [Interface Overview](interface)
- Learn the supported [Import and Export](import-export) formats
- Clean a capture with [Selection and Cleanup](editing-splats), then use [Transform, Measure, and Align](transforming-splats) to prepare it
- Work with multiple captures using [Scene Management](scene-management), and finish their look with [Color and Appearance](color-and-appearance)
- Keep the [Keyboard Shortcuts](keyboard-shortcuts) reference nearby, or check [Troubleshooting](troubleshooting) when a workflow does not behave as expected
- Once your splat is clean, [Publish](publishing) it to superspl.at to land on your [Manage page](../manage) and open it in [Studio](../studio/)
