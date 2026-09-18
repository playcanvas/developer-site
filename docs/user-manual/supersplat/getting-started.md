---
title: Getting Started
description: "Publish your first splat with SuperSplat in about ten minutes: load a PLY in the Editor, clean it up, publish it, curate it in Studio, and share the scene page."
---

This guide takes a raw splat file all the way to a published, shareable scene page. It takes about ten minutes and touches every part of the SuperSplat workflow: **Editor → Publish → Studio → Share**.

## Before you start

- **A splat file.** Any `.ply` produced by a Gaussian splatting trainer works, as do `.compressed.ply`, `.sog`, `.splat`, `.ksplat`, `.spz`, and XGRIDS `.lcc` files. Don't have one yet? [Creating Splats](/user-manual/gaussian-splatting/creating/) explains how captures are made and [Recommended Tools](/user-manual/gaussian-splatting/creating/recommended-tools) compares the apps that produce them. Or practice on the sample biker: [open it in the Editor](https://superspl.at/editor?load=https://raw.githubusercontent.com/willeastcott/assets/main/biker.ply).
- **A free PlayCanvas account** for step 3. Loading and editing don't need one; publishing does. See [Account Creation](/user-manual/account-management/user-accounts/account-creation).
- **A current browser.** The Editor runs on WebGPU: current Chrome or Edge, Safari 26 or later, or Firefox with WebGPU enabled. There is nothing to install.

## 1. Load your splat in the Editor

Open [superspl.at/editor](https://superspl.at/editor) and drop your file anywhere in the window. You can also use **File → Import**.

![The SuperSplat Editor interface](/img/user-manual/supersplat/editor/interface-overview.webp)

Once the splat appears, get your bearings:

| Do this | To |
|---------|----|
| Left-drag | Orbit around the focal point |
| Right-drag | Pan |
| Mouse wheel | Zoom |
| Double-click | Set the focal point |
| Press **F** | Focus the camera on the current selection |

If the scene is on its side or upside down, select it in the **Scene Manager** and rotate it upright with the transform controls. See [Transform, Measure and Align](editor/transform-measure-align.md). The full list of controls is in [Camera Controls](editor/camera-controls.md).

## 2. Clean it up

Most raw captures contain **floaters**: stray Gaussians hanging in space where the trainer wasn't sure what it saw. Removing them is the single biggest quality win.

1. Turn on **Selection Depth** (the second toggle at the left of the bottom toolbar, or press **N**) so selections stop at the visible surface, and press **Tab** to show the Gaussian centers.
2. Pick a selection tool from the toolbar: **Brush Selection** to paint over floaters, **Sphere Brush** to paint in 3D along a surface, **Sphere Selection** or **Box Selection** to grab a 3D region, or **Flood Selection** for an isolated patch. Hold **Shift** to add to the selection and **Ctrl** to remove from it.
3. Press <kbd>Delete</kbd>. Rotate the camera, check from another angle, and repeat.
4. Removed too much? Use **Edit → Undo**, or **Select → Reset** to restore every deleted Gaussian.

![Selected Gaussians highlighted among the centers of the rest](/img/user-manual/supersplat/editor/display-centers.webp)

To crop away everything outside your subject, select the region to keep with Box or Sphere Selection, choose **Select → Invert**, and delete. [Selection and Cleanup](editor/editing-splats.md) covers every tool plus more cleanup recipes, and [Color and Appearance](editor/color-and-appearance.md) is where you fix exposure and tint.

:::tip Save your work

Choose **File → Save** to keep an `.ssproj` project file. It preserves your edits and project setup so you can pick up where you left off. See [Managing Projects](editor/managing-projects.md).

:::

## 3. Publish

1. Make sure you are logged in at [superspl.at](https://superspl.at) (the **Login** button in the top right). Your avatar appears there when you are.
2. Frame your favorite view. The published scene opens with the camera exactly where you leave it.
3. Choose **File → Publish**, give the splat a **Title** and a **Description**, and click **Publish**.

<img src="/img/user-manual/supersplat/editor/publish-settings.png" alt="The Publish dialog" width="428" />

Compression to SOG takes a moment, and several minutes for very large scenes. When it finishes, a dialog shows the URL of your new [scene page](scene-page.md). New splats are **Unlisted**: anyone with the link can view them, but they won't appear in Explore until you make them Public in step 5.

:::tip Already clean?

If your file needs no editing, skip the Editor. The orange **Upload Splat** button on superspl.at publishes it directly. See [Direct Upload](upload.md).

:::

Every option in the dialog, including republishing to an existing scene, is covered in [Publishing](editor/publishing.md).

## 4. Curate it in Studio

Your splat now appears on your [Manage page](manage.md). Click **Open in Studio** in its row, or **Edit in Studio** on your scene page, to open [Studio](studio/index.md), where you shape what visitors see.

![The Manage page](/img/user-manual/supersplat/manage.png)

Three things worth doing on a first pass:

- **Frame the opening shot.** In the **Scene** tab, under **Cameras**, set the initial camera position, target, and field of view so visitors start from your best angle. See [Cameras](studio/cameras.md).
- **Add a hotspot.** In the **Annotations** tab, frame a detail, add an annotation, and give it a title and some text. Visitors click through hotspots like a guided tour. See [Annotations](studio/annotations.md).
- **Add some polish.** Under **Post Effects**, try a touch of **Bloom** or a **Vignette**, or pick a **Tonemapping** curve. See [Post Effects](studio/post-effects.md).

<video autoPlay muted loop controls src='/video/supersplat-studio-edit-camera.mp4' style={{width: '100%', height: 'auto'}} />

Click **Save** in the header when you're happy. Edits are not saved automatically. Each save publishes the complete settings, so visitors see the update as soon as they reload.

## 5. Share it

Open your [scene page](scene-page.md) at `superspl.at/scene/<hash>`.

![A published scene page](/img/user-manual/supersplat/scene-page.webp)

- **Share** copies the link or posts it to social platforms.
- **Embed** gives you an `<iframe>` snippet for your own website. Later Studio changes show up there automatically.
- To let visitors download your splat, enable **Downloadable** and pick a Creative Commons license on the [Manage page](manage.md).
- To appear in [Explore](explore.md) and in search results, switch **Visibility** to **Public** in Manage.

## Where next?

- [Keyboard Shortcuts](editor/keyboard-shortcuts.md) to speed up cleanup.
- [Timeline](editor/timeline.md) to animate the camera and publish a flythrough.
- [Collision](studio/collision.md) to make a scene walkable in first person.
- [Convert](convert.md) to change formats or shrink a splat without leaving the browser.
- [Self-Hosting the Viewer](viewer/self-hosting.md) to export a single HTML file you can host anywhere.
- [API & Integrations](api-integrations.md) to publish from your own pipeline.
