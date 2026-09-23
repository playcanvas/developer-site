# Troubleshooting

## The Editor Does Not Start

The Editor requires WebGPU. If the page shows "SuperSplat requires WebGPU, which this browser does not support" instead of loading, switch to a current version of Chrome or Edge, Safari 26 or later, or Firefox with WebGPU enabled, and make sure hardware acceleration is turned on in the browser's settings. On a machine with more than one GPU, the browser must be allowed to use the dedicated one.

If the message is "SuperSplat failed to start", open the browser console for details and include them when you [report the problem](https://developer.playcanvas.com/user-manual/supersplat/editor/troubleshooting.md#reporting-a-problem).

## A File Does Not Import

- Confirm that the file uses a format listed in [Import and Export](https://developer.playcanvas.com/user-manual/supersplat/editor/import-export.md). A generic or "vanilla" PLY containing only mesh or point-cloud data will not load. SuperSplat requires a 3DGS PLY with Gaussian attributes such as position (`x`, `y`, `z`), scale (`scale_*`), rotation (`rot_*`), opacity, and spherical harmonic color (`f_dc_*`, with optional `f_rest_*`). See [How 3DGS PLYs Differ from Regular PLYs](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/ply.md).
- For formats made of several related files, drag the parent folder into the Editor so relative file paths remain available.
- When importing from a URL, the remote server must allow the browser to fetch the file using Cross-Origin Resource Sharing (CORS).
- If the browser reports insufficient memory, try a lower-detail source file, close other GPU-heavy tabs, and import splats separately.

## Selection Does Not Match the Visible Surface

Check the two toggles at the left of the bottom toolbar:

- **Selection Depth** (`N`) is off by default, so a selection reaches through the whole scene and also picks Gaussians hidden behind the surface you clicked. Turn it on to select only the visible surface.
- **Selection Footprint** (`M`) is off by default, so a Gaussian is only picked when its center lies inside the tool's shape. Large, soft Gaussians whose centers sit just outside your selection are left out; turn it on to select by the whole footprint instead.

Pressing `Tab` only shows or hides the center and ring overlays; it does not change how selection works. Locked or deleted Gaussians cannot be selected; use **Select > Unlock** or **Select > Reset** when appropriate.

See [Selection Depth and Footprint](https://developer.playcanvas.com/user-manual/supersplat/editor/editing-splats.md#selection-depth-and-footprint) and the cleanup recipes in [Selection and Cleanup](https://developer.playcanvas.com/user-manual/supersplat/editor/editing-splats.md).

## A Transform Moves the Wrong Content

If any Gaussians are selected, Move, Rotate, Scale, and numeric Transform values affect only that selection. Choose **Select > None** to transform the whole active splat.

If rotation or scaling moves content around an unexpected point, switch the origin control or double-click a visible surface to place the pivot. See [Transform, Measure and Align](https://developer.playcanvas.com/user-manual/supersplat/editor/transform-measure-align.md).

## Content Is Missing from an Export

Splat exports include visible splats. In the Scene Manager, enable the eye icon for every splat that should be included. Disable Solo mode and verify the complete result before exporting.

To combine splats into one PLY, use **File > Export > PLY**. **File > Save** creates an editable `.ssproj` project instead.

## Color Looks Different

- Check **Preferences** for the tone mapping curve and the number of spherical harmonic bands shown in the viewport, and **Appearance** for the background color. These are view settings and are not written into exports.
- Expand **Colors** in the Scene Manager and click **Reset** to rule out a color grade applied to the splat or to a selection.
- Inspect the scene from several angles because spherical harmonic color is view-dependent.

See [Color and Appearance](https://developer.playcanvas.com/user-manual/supersplat/editor/color-and-appearance.md) for the difference between splat adjustments and viewport settings.

## The Editor Is Slow or Runs Out of Memory

Large splats are limited by available GPU memory. Close other graphics-intensive tabs, work on one visible splat at a time with Solo mode, and choose a lower level of detail when importing a multi-LOD file. You can also reduce the Gaussian count by cleaning the splat. For large sequence imports, remember that every frame contains a full splat.

If the viewport stutters while you orbit a heavy scene, open **Preferences** and check **Stochastic Alpha**. **Auto** (the default) switches to fast stochastic rendering during movement only once a sorted frame proves slow; choose **Movement** to use it during every camera move, or **Enabled** to use it all the time. The **Frame Timings** and **Overdraw** diagnostics in the [Overlays](https://developer.playcanvas.com/user-manual/supersplat/editor/interface.md#overlays) popup show where the time goes: high GPU times together with a red-to-white overdraw map mean many overlapping Gaussians, which cleanup or a lower level of detail will reduce.

## Unsaved Work or Project Confusion

Use **File > Save** or **Save As** regularly to preserve an editable `.ssproj` project. Exported PLY and other delivery formats are not substitutes for the project file when you need to continue editing splat layout, camera settings, or animation.

See [Managing Projects](https://developer.playcanvas.com/user-manual/supersplat/editor/managing-projects.md) for the difference between saving, opening, importing, and exporting.

## Publishing or Rendering Fails

- Publishing requires you to be signed in to superspl.at with a PlayCanvas account.
- Video codec support depends on the browser. The Render Video dialog disables resolutions your browser or device cannot encode with the current settings — try a lower resolution, frame rate, or bitrate, another format or codec, or update your browser or graphics driver.
- A blocked download, private-browsing restriction, or low free memory can prevent large renders and exports from completing. In browsers without the File System Access API, renders and exports are delivered as downloads.

## Reporting a Problem

If the problem persists, open **Help > Log an Issue** in the Editor and include the browser version, operating system, source format, approximate Gaussian count, and the steps that reproduce the problem. You can also ask in the [SuperSplat Discord community](https://discord.gg/T3pnhRTTAY).
