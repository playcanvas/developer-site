---
title: Editing Scenes
sidebar_position: 7
---

## Selecting and Deleting Splats

Cropping splats or deleting unwanted Gaussians is a key function of SuperSplat. To help with this, there are 5 selection tools available:

* **Picker Select**: Click to select, or click + drag to rect select.
* **Lasso Select**: Click and drag to draw an arbitrary shape. Splats within the shape's outline will be selected.
* **Polygon Select**: Similar to Lasso Select. Click to create points that create the edges of an arbitrary shape. Double click to close the shape.  Splats within the shape's outline will be selected.
* **Brush Select**: Click and drag a selection circle. Change the brush size with the `[` and `]` keys.
* **Sphere Select**: Activate a sphere volume to add or remove splats from the current selection. Double click on any splat to reposition the sphere volume.

Once you are happy with your selection, you can delete it with the Delete key.

## Transforming Splats

SuperSplat can translate, rotate and scale splats. To do this, select a splat in the Scene Manager and activate one of the gizmos via the horizontal icon bar.

To achieve fine grain control over the transform of the selected splat, you can use the TRANSFORM panel (below the SCENE MANAGER panel).

To set the origin of the currently active gizmo, double click anywhere in the 3D view.

## Merging Splats

It is possible to merge multiple .ply files together and output a single, combine .ply file. Simply load any number of .ply files into Scene Manager, perform whatever transformations and edits you require, and then save the result via the `Scene` > `Save` menu item.
