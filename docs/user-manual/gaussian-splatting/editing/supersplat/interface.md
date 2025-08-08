---
title: Interface Overview
---

The SuperSplat Editor's interface appears as follows:

![supersplat-interface](/img/user-manual/gaussian-splatting/editing/supersplat/interface-overview.png)

The key elements of the interface are labelled:

## Menu Bar

The Menu Bar gives you access to the most commonly used functions in the SuperSplat Editor.

* **File Menu:** Load and save your projects. Import and export to/from popular file formats.
* **Select Menu:** Perform common selection based operations on your loaded scene.
* **Render Menu:** Render an image or a video of your currently loaded scene.
* **Help Menu:** Access developer resources related to SuperSplat.

### Scene Manager

The Scene Manager allows you to manage multiple loaded Gaussian Splat scenes (typically loaded from imported PLY files). You can also use this panel to set the transform of the selected scene.

### Viewport

The 3D viewport where you can visually edit your scenes. The viewport has a 2D grid to help orient yourself in the scene. By default, the grid lies in the XZ plane (with the world Y axis pointing upwards). The X axis is colored red and the Z axis is blue. Major grid divisions occur at 1 meter intervals (and smaller grid divisions are at 10cm intervals).

### View Cube

The View Cube is a gizmo that gives added control over the viewport camera. You can click on any of the circles to switch to an orthographic view of the scene from one of six directions. This can make it easier to make accurate selections in certain circumstances.

### Right Toolbar

This vertical toolbar contains icons related to splat visualization, camera controls and application settings.

### Bottom Toolbar

This horizontal toolbar contains icons related to undo/redo, splat selection and transformation.

### Animation Timeline

The Timeline allows you to create and delete keyframes for the viewport camera. It also allows you to play back (or scrub through) the animation you have configured.

### Histogram Panel

This panel allows you to inspect the Gaussian data in your scenes, visualized as a histogram along with a set of numerical statistics.
