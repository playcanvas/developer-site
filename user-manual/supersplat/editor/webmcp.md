# AI Agents (WebMCP)

The SuperSplat Editor registers a set of tools with the browser's [WebMCP API](https://webmachinelearning.github.io/webmcp/), so an AI agent that can use WebMCP can inspect and edit the scene in your open Editor tab. The agent works on the same scene you see: it shares your splats, selection, and undo history, so you can watch its edits happen and undo them like your own.

:::note Experimental

WebMCP is an experimental browser API. Whether your browser exposes it, and how an agent connects to it, depends on the browser and its version. In browsers without WebMCP the Editor works normally and registers no tools.

:::

## Requirements

- A browser with WebMCP support, such as Chrome with its experimental WebMCP feature enabled, and WebGPU (which the Editor always needs).
- An agent or browser integration that can discover and call the tools a page registers through WebMCP.
- The Editor open in a tab. There is no server or network listener to run: the tools live in the page and act only on that tab.

Tool titles follow the Editor's [interface language](https://developer.playcanvas.com/user-manual/supersplat/editor/interface.md#language).

## Tools

The tools refer to the splats in the [Scene Manager](https://developer.playcanvas.com/user-manual/supersplat/editor/scene-management.md) as layers, identified by the numeric IDs that `get_scene` returns. Each tool describes its arguments, ranges, and defaults to the agent.

| Area | Tools | What they do |
|---|---|---|
| Inspection | `get_scene`, `get_layer`, `get_histogram` | Read the scene, its layers, Gaussian counts, bounds, properties, camera, and history. `get_histogram` reads the same property distributions as the [Splat Data panel](https://developer.playcanvas.com/user-manual/supersplat/editor/data-panel.md), with counts, means, and percentiles. |
| Selection | `set_selection`, `select_region`, `select_rectangle`, `select_property` | Select all, none, or the inverse; select inside or outside a box, sphere, or ellipsoid; select within a viewport rectangle, through all depths or only the visible surface; or select a range of a property's values. Region and property selections can preview the number and bounds of the matches first. |
| Editing | `delete_selection`, `hide_selection`, `restore_splats`, `duplicate_selection`, `separate_selection` | Delete or lock the selected Gaussians (`hide_selection` is the equivalent of **Lock Selection**), restore locked or deleted ones, and duplicate or separate the selection into a new layer. |
| Layers, transforms, and color | `update_layer`, `transform`, `apply_color`, `reset_color` | Rename, show, hide, or activate a layer; move, rotate, or scale a selection or layer; apply or reset a [color grade](https://developer.playcanvas.com/user-manual/supersplat/editor/color-and-appearance.md#colors). |
| History | `undo`, `redo` | Step through the Editor's shared edit history. |
| Camera and view | `set_camera`, `focus_camera`, `pick_points`, `render_view`, `set_view` | Position or frame the camera, find the world positions under viewport points, render an image for the agent to look at, and change display settings such as the background, grid, tone mapping, SH bands, and the [mode strip](https://developer.playcanvas.com/user-manual/supersplat/editor/interface.md#mode-strip) switches. |
| Timeline | `get_timeline`, `set_timeline`, `set_keyframes`, `move_keyframe`, `delete_keyframes` | Read or set the [Timeline](https://developer.playcanvas.com/user-manual/supersplat/editor/timeline.md) length, frame rate, playhead, playback, smoothness, and looping, and add, replace, move, copy, or delete camera keyframes. |
| Creating content | `create_from_generator`, `instance_layer` | Create a new layer from a [SplatTransform generator](https://developer.playcanvas.com/user-manual/splat-transform.md#generators-beta) script, or place up to 128 copies of a layer that share its Gaussian data. |
| Files | `import_url`, `export_scene` | Import a PLY, SPLAT, SOG, SPZ, or KSPLAT file from a URL as a new layer, or download an export as PLY, compressed PLY, SPLAT, SOG, SPZ, or a standalone HTML or ZIP viewer. |

## How Agent Edits Behave

- **Shared history.** Each successful edit is one entry in the Editor's undo history, alongside your own edits. The agent's `undo` and `redo` step through that same history, so they can also undo something you did.
- **Explicit targets.** The agent names the layer for every edit, and naming a layer does not make it the active splat. Transforms and color grades must say whether they apply to the selection or the whole layer; an empty selection is an error rather than falling back to the whole layer.
- **Session settings.** Camera moves, Timeline settings, display settings, layer visibility, and changing the active layer do not create undo entries. Renaming a layer and editing camera keyframes do.
- **Current views only.** Rectangle selection and point picking work in viewport coordinates, so they require a token from the agent's latest look at the view. If you move the camera or resize the window in between, the call fails and the agent has to look again, rather than selecting from outdated coordinates.
- **Checking its work.** `render_view` renders an image from any camera pose without moving your view. Besides the normal image, it can show the selection, a heat map of a property such as opacity, each layer in its own color, or plain shading of the surface shape, from up to four angles in one image. It fails while the Timeline is playing, and when the tab is in the background and does not render a frame within 5 seconds.

## Safety and Limits

- There is no tool for running arbitrary JavaScript in the Editor. `create_from_generator` runs the agent's generator script in a sandbox with no access to the Editor page, its storage, or your files, and no network access. A generator must finish within 10 seconds and produce at most 2,000,000 Gaussians.
- `import_url` accepts HTTP or HTTPS URLs without embedded credentials, from servers that allow cross-origin access. Files with several levels of detail load the recommended level, or one the agent names, without showing the [Load Options](https://developer.playcanvas.com/user-manual/supersplat/editor/import-export.md#choosing-a-level-of-detail) dialog.
- `export_scene` asks the browser to download the file; your browser's download settings decide where it is saved. Agents cannot write to other local paths.
- Agents cannot replace or save the project, publish to superspl.at, render images or videos to files, or open local file pickers.

## Full Reference

The tool arguments, result formats, error codes, and worked examples (such as previewing and cropping a region, finding faint floaters with histograms, and authoring a camera move) are documented in [WebMCP](https://github.com/playcanvas/supersplat/blob/main/docs/webmcp.md) in the Editor's GitHub repository.
