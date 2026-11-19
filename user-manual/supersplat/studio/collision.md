# Collision

By default, splats in the viewer have no physical presence — the camera flies right through them. The **Collision** section in [Studio](https://developer.playcanvas.com/user-manual/supersplat/studio.md) attaches a **voxel** representation of the scene to your splat so the viewer can collide against it. With collision attached, your splat becomes **walkable** — visitors can navigate it on foot rather than only orbiting or flying around it. The [Explore](https://developer.playcanvas.com/user-manual/supersplat/explore.md) page also surfaces walkable scenes via its `walkable` feature filter.

:::important Scale your splat to real-world units
For walkable scenes to feel right, scale your splat so that **one unit equals one meter** before adding collision. In walk mode the viewer holds the camera at an eye height of **1.5 m** above the floor, so if your scene isn't at real-world scale, it will feel too large or too small to move around in. The viewer also offers walk mode only when the scene is at least **5 m** across in both horizontal directions.
:::

## What is voxel collision?

A voxel collision asset is a coarse, low-resolution box-based reconstruction of the splat — the surfaces visitors can stand on, lean against, or be stopped by. It's separate from the splat itself so it can be optimized independently for runtime physics rather than visual quality.

[Image: A splat with its voxel collision shown via debug rendering]

You'll typically generate it once per scene and re-generate only if the underlying splat changes significantly.

## Generating voxel collision

The recommended way to add collision is to generate it directly in Studio. The **Collision** section of the **Scene** tab has a **Generate** button, on its **Voxels** row, that runs a server-side voxelizer against your published splat — no files to prepare or upload.

[Image: The Generate Voxel Collision dialog in Studio]

1. Open the splat in [Studio](https://developer.playcanvas.com/user-manual/supersplat/studio.md#launching-studio) — clicking the splat's thumbnail only *views* it, so use **Open in Studio** (from Manage) or **Edit in Studio** (from the scene page). The **Collision** section is on the **Scene** tab of the left panel, below **Animation**.
2. Click **Generate** on the **Voxels** row to open the **Generate Voxel Collision** dialog.
3. Choose a **Scene type** — **Indoor**, **Outdoor** (the default), or **Object**. This tunes the voxelizer for the kind of space you're reconstructing.
4. Set the **Seed position** (**X**, **Y**, **Z**). This is the point the voxelizer flood-fills outward from to find the navigable space, so it should sit somewhere a visitor could stand. The fields are pre-filled with your current viewport camera position — frame the scene where you want before opening the dialog, or type coordinates in by hand.
5. Click **Generate**.

Generation runs on the server and usually takes a few minutes. The Collision section shows **Generation in progress. Reload to refresh status.** while it runs — Studio doesn't poll, so reload the page to pick up the result. Once it completes, the `scene.voxel.json` and `scene.voxel.bin` files are listed in the section, with their sizes and download links, and the scene becomes walkable on the next viewer reload. If generation fails, the section shows **Generation failed.**

If collision already exists, the dialog's button reads **Regenerate**, and replaces it. The trash icon, **Delete collision**, removes the current voxel asset.

:::note Voxel size
The generator uses a default voxel size of **5 cm** (`0.05` units), which is a good fit for most scenes. To use a different voxel size, generate your collision with [splat-transform](https://developer.playcanvas.com/user-manual/splat-transform.md) and upload the result — see [Uploading custom voxel collision](https://developer.playcanvas.com/user-manual/supersplat/studio/collision.md#uploading-custom-voxel-collision) below.
:::

## Uploading custom voxel collision

Uploading is the option to reach for when you want **custom collision** — for example, when the **Generate** button doesn't produce exactly what you want and you've authored or tuned the voxel files yourself. You can produce a compatible pair with the [Convert](https://developer.playcanvas.com/user-manual/supersplat/convert.md) utility in the browser, or the [splat-transform](https://developer.playcanvas.com/user-manual/splat-transform.md) CLI for scripted or batch workflows.

1. In the **Collision** section of the **Scene** tab, click **Upload** on the **Voxels** row to open the **Upload Voxel Collision Pair** dialog.
2. Drop in (or click to choose) the pair of files that describe the collision — a `.voxel.json` file plus its `.voxel.bin` companion. You can add them together or in two steps.
3. Click **Upload Voxel Pair**. If collision already exists, the button reads **Upload Override** and replaces it.

Upload happens immediately, and the scene becomes walkable on the next viewer reload.

## Collision in the viewer

- **Loading** — the viewer shows the scene without waiting for its collision data, which is often larger than the splat. Walk mode becomes available once the data arrives.
- **Walk mode** — a **Walk Mode** button joins the toolbar, and walk becomes the scene's default camera mode. See [Viewer Controls](https://developer.playcanvas.com/user-manual/supersplat/viewer/controls.md#camera-modes).
- **Show Collision** — visitors can draw the voxels over the splat with **Show Collision** in the viewer's settings panel, or by pressing <kbd>V</kbd>. The overlay needs WebGPU.
- **VR** — in a VR session, visitors teleport onto the collision: only spots where someone could stand are valid targets. See [Viewing in VR and AR](https://developer.playcanvas.com/user-manual/supersplat/viewer/xr.md#moving-around-in-vr).

When you [host the viewer yourself](https://developer.playcanvas.com/user-manual/supersplat/viewer/embedding.md#url-parameters), pass collision with the `collision` URL parameter: a `.voxel.json` file with its `.voxel.bin` beside it, or a `.glb` mesh.

## See also

- [Convert](https://developer.playcanvas.com/user-manual/supersplat/convert.md) — generate voxel collision in the browser
- [splat-transform](https://developer.playcanvas.com/user-manual/splat-transform.md) — generate voxel collision in a script or build pipeline
- [Experience Settings](https://developer.playcanvas.com/user-manual/supersplat/studio/experience-settings.md) — the JSON contract that stores scene-asset references
