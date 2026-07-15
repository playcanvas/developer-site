---
title: Scene Management
description: "Manage multiple splat scenes in SuperSplat: select, show, solo, rename, remove, align, and merge imported layers."
---

Each file you import appears as a separate row in the **Scene Manager**. This makes it possible to assemble several captures, compare revisions, or align independently captured areas before exporting them together.

## The Active Scene

Click a row to make that scene active. The active scene is the target for:

- Gaussian selection and editing
- The **Transform**, **Color**, and **Splat Data** panels
- Camera focus and measurement tools

Only one scene can be active at a time. Selecting a row does not change its visibility.

## Add Scenes

Use **File > Import**, the import button in the Scene Manager header, or drag supported files into the viewport. Importing adds content to the current project; it does not replace scenes that are already loaded.

**File > New** is different: it starts a new, empty project after asking for confirmation if the current project contains data.

See [Import and Export](import-export.md) for supported formats and multi-file import requirements.

## Visibility and Solo Mode

Click the eye icon on a scene row to show or hide it. Hidden scenes are excluded from splat exports, so check visibility before exporting a combined scene.

Use the **Solo** button in the Scene Manager header when you want to work on one scene without changing your visibility setup:

1. Select a scene.
2. Enable **Solo** to hide every other scene.
3. Select another row to switch which scene is shown.
4. Disable **Solo** to restore the visibility state that existed before Solo mode was enabled.

If you import a scene while Solo mode is active, select its row to view it.

## Rename and Remove Scenes

Double-click a scene name to rename it. Renaming can be undone and redone.

Click the trash icon on a scene row to remove the entire scene from the project. Removing a scene cannot be undone. This is different from deleting selected Gaussians, which is recorded in the edit history and can be undone. Save an `.ssproj` copy first if you may need the scene later.

## Assemble Multiple Captures

A typical multi-scene workflow is:

1. Import all captures.
2. Use Solo mode to inspect and clean each one independently.
3. Use the [transform tools](transforming-splats.md) to position, rotate, and scale each scene.
4. Show the scenes together and check their alignment from several camera angles.
5. Hide any scene that should not be included.
6. Choose **File > Export > PLY** to combine the visible scenes into one PLY file.

Saving with **File > Save** creates an editable `.ssproj` project instead of a merged PLY. See [Managing Projects](managing-projects.md).
