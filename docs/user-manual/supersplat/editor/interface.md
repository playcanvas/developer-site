---
title: Interface Overview
description: "Tour of the SuperSplat UI: menu bar, scene manager, viewport, view cube, toolbar, core panels, persistent settings, and interface language."
---

The SuperSplat Editor's interface appears as follows:

![supersplat-interface](/img/user-manual/supersplat/editor/interface-overview.png)

## Interface Elements

The key elements of the interface are labeled:

### Menu Bar

The Menu Bar gives you access to the most commonly used functions in the SuperSplat Editor.

* **File Menu:** Load and save your projects. Import and export to/from popular file formats.
* **Edit Menu:** Undo or redo changes, or duplicate or separate selected Gaussians into a new splat.
* **Select Menu:** Perform common selection based operations on your loaded scene.
* **Render Menu:** Render an image or a video of your currently loaded scene.
* **Help Menu:** Access developer resources related to SuperSplat.

### Scene Manager

The Scene Manager lists the imported splats in the project. Click a row to choose the active splat, use the eye icons or Solo mode to control visibility, and use the panel below it for precise transforms. See [Managing Splats](scene-management.md) for the complete workflow.

### Viewport

The 3D viewport where you can visually edit your scenes. The viewport has a 2D grid to help orient yourself in the scene. By default, the grid lies in the XZ plane (with the world Y axis pointing upwards). The X axis is colored red and the Z axis is blue. Major grid divisions occur at 1 meter intervals (and smaller grid divisions are at 10cm intervals).

### View Cube

The View Cube is a gizmo that gives added control over the viewport camera. You can click on any of the circles to switch to an orthographic view of the scene from one of six directions. This can make it easier to make accurate selections in certain circumstances.

### Right Toolbar

This vertical toolbar contains icons related to splat visualization, camera controls and application settings.

### Bottom Toolbar

This horizontal toolbar contains undo and redo, Gaussian selection tools, Move, Rotate, Scale, Measure, coordinate-space and pivot controls. See [Selection and Cleanup](editing-splats.md) and [Transform, Measure and Align](transform-measure-align.md).

### Animation Timeline

The Timeline allows you to create and delete keyframes for the viewport camera. It also allows you to play back (or scrub through) the animation you have configured.

### Histogram Panel

This panel allows you to inspect the Gaussian data in your scenes, visualized as a histogram along with a set of numerical statistics. See the [Splat Data panel](data-panel.md).

## Settings and Preferences

Open the **Settings** panel from the gear icon in the [Right Toolbar](#right-toolbar). Changes to view, camera, and editing preferences are saved in your browser and restored the next time you open the Editor. These preferences include colors and tonemapping, camera field of view and control mode, spherical harmonic bands, centers and rings display, grid and bounds overlays, and other viewport options.

Loading an `.ssproj` project applies the view and camera settings saved in that project for the current session without replacing your stored preferences. Selecting **File > New** reapplies your preferences. To clear them and restore the factory settings, click **Reset to Defaults** at the bottom of the **Settings** panel. This also returns the interface language to **Automatic**.

### Language

SuperSplat's interface is available in several languages. By default it follows your browser's language — the **Automatic** setting — but you can choose a specific language from the **Language** dropdown at the top of the **Settings** panel (the gear icon in the [Right Toolbar](#right-toolbar)).

Switching language takes effect immediately. There is no page reload, so your loaded scene and any unsaved work are preserved. Your choice is remembered across sessions until you change it again or switch back to **Automatic**.

The following languages are supported:

* English — `en`
* Deutsch (German) — `de`
* Español (Spanish) — `es`
* Français (French) — `fr`
* 日本語 (Japanese) — `ja`
* 한국어 (Korean) — `ko`
* Português (Brasil) (Brazilian Portuguese) — `pt-BR`
* Русский (Russian) — `ru`
* 中文 (简体) (Simplified Chinese) — `zh-CN`

:::tip Share a link in a specific language

Add a `?lng=` query parameter set to one of the language codes listed above (for example, `?lng=ja`) to pin the language for a shared link. This overrides both your saved choice and the browser default, so the link always opens in that language.

:::

:::tip Missing your language?

SuperSplat is [open source](https://github.com/playcanvas/supersplat), and its translations are plain JSON files under [`static/locales`](https://github.com/playcanvas/supersplat/tree/main/static/locales). [Open an issue](https://github.com/playcanvas/supersplat/issues) to request a new language, or open a pull request adding or improving a locale file.

:::
