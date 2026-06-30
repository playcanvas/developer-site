---
title: Interface Overview
description: "Tour of the SuperSplat UI: menu bar, scene manager, viewport, view cube, toolbar, and core panels for editing splats."
---

The SuperSplat Editor's interface appears as follows:

![supersplat-interface](/img/user-manual/supersplat/editor/interface-overview.png)

The key elements of the interface are labeled:

## Menu Bar

The Menu Bar gives you access to the most commonly used functions in the SuperSplat Editor.

* **File Menu:** Load and save your projects. Import and export to/from popular file formats.
* **Select Menu:** Perform common selection based operations on your loaded scene.
* **Render Menu:** Render an image or a video of your currently loaded scene.
* **Help Menu:** Access developer resources related to SuperSplat.

## Scene Manager

The Scene Manager allows you to manage multiple loaded Gaussian Splat scenes (typically loaded from imported PLY files). You can also use this panel to set the transform of the selected scene.

## Viewport

The 3D viewport where you can visually edit your scenes. The viewport has a 2D grid to help orient yourself in the scene. By default, the grid lies in the XZ plane (with the world Y axis pointing upwards). The X axis is colored red and the Z axis is blue. Major grid divisions occur at 1 meter intervals (and smaller grid divisions are at 10cm intervals).

## View Cube

The View Cube is a gizmo that gives added control over the viewport camera. You can click on any of the circles to switch to an orthographic view of the scene from one of six directions. This can make it easier to make accurate selections in certain circumstances.

## Right Toolbar

This vertical toolbar contains icons related to splat visualization, camera controls and application settings.

## Bottom Toolbar

This horizontal toolbar contains icons related to undo/redo, splat selection and transformation.

## Animation Timeline

The Timeline allows you to create and delete keyframes for the viewport camera. It also allows you to play back (or scrub through) the animation you have configured.

## Histogram Panel

This panel allows you to inspect the Gaussian data in your scenes, visualized as a histogram along with a set of numerical statistics.

## Language

SuperSplat's interface is available in several languages. By default it follows your browser's language — the **Automatic** setting — but you can choose a specific language from the **Language** dropdown at the top of the **Settings** panel (the gear icon in the [Right Toolbar](#right-toolbar)).

Switching language takes effect immediately. There is no page reload, so your loaded scene and any unsaved work are preserved. Your choice is remembered across sessions until you change it again or switch back to **Automatic**.

The following languages are supported:

- English
- Deutsch (German)
- Español (Spanish)
- Français (French)
- 日本語 (Japanese)
- 한국어 (Korean)
- Português (Brasil) (Brazilian Portuguese)
- Русский (Russian)
- 中文 (简体) (Simplified Chinese)

You can also pin a language for a shared link by adding a `?lng=` query parameter to the URL (for example, `?lng=ja`). This overrides both your saved choice and the browser default, which is useful when sharing a link that should always open in a particular language.
