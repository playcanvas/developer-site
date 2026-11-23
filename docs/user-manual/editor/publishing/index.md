---
title: Publishing
description: "Making a build of a PlayCanvas Editor project: the Builds panel, publishing to playcanvas.com, downloading a build to host anywhere, build settings, the loading screen, and playable ads."
---

To publish an Editor project, you make a **build**: a snapshot of the scenes you choose, packaged with everything they need to run on their own. Changes you make in the Editor afterwards don't affect a build until you make a new one.

You can make two kinds of build:

- **Publish** a build to [PlayCanvas Hosting](playcanvas-hosting.md), which gives it a playcanv.as link that you can share with anyone. There's nothing to set up.
- **Download** a build to [host it yourself](downloading.md), or to take it to any of the other destinations in [Publishing](/user-manual/publishing/), such as game platforms, app stores and desktop apps.

## The Builds Panel {#the-builds-panel}

To open the Builds panel, select the **Publish / Download** button in the [toolbar](../interface/toolbar.md).

![The Builds panel](/img/user-manual/editor/getting-started/your-first-app/publish.webp)

- **Primary build** shows the build that your project's link plays, once you've published one.
- **Publish** and **Download** open the form for a new build.
- **Build history** lists your published and downloaded builds, with filters for their type, format, status, branch and the person who made them. Select a build to see its details, or select its **...** button to view it, delete it, or make it the primary build.

## Making a Build {#making-a-build}

Publishing and downloading use the same form:

1. Under **Build details**, give the build a **Title**. When you publish, you can also add an image and a **Description**, which show when you share the build's link, and a **Version** and **Release Notes** to help you tell builds apart.
2. Under **Build settings**, choose the **Engine Version** and the [build options](#build-options). When you download, also choose the [download format](downloading.md#download-formats).
3. Under **Scenes**, select the scenes to include. The **primary scene** is the one that loads when the build starts. To change it, select the icon next to another scene.
4. Select **Publish** or **Download** at the bottom of the form.

The build appears in **Build history** while it's being made, and is ready when its status shows a check mark.

## Build Options {#build-options}

| Option | What it does |
| --- | --- |
| **Concatenate Scripts** | Combines your scripts into fewer files, which load faster. Classic scripts are combined into one file, and ESM Scripts are bundled with the engine. See [how scripts are processed when publishing](../scripting/loading-order.md#publishing). On by default. |
| **Minify Scripts** | Removes whitespace and shortens names in your scripts to make them smaller. Available when **Concatenate Scripts** is on. On by default. |
| **Generate Source Maps** | Adds source maps, which let browser developer tools show your original code when you debug the build. Available when **Minify Scripts** is on. |
| **Optimize Scene Format** | Makes scene files smaller to download. See [Optimize Scene Format](/user-manual/optimization/optimizing-scene-format/). |

The npm download format keeps your scripts as source files, so these options don't apply to it.

## In This Section {#in-this-section}

| Page | What it covers |
| --- | --- |
| [PlayCanvas Hosting](playcanvas-hosting.md) | Publish a build to a playcanv.as link, and choose which build the project's link plays. |
| [Downloading a Build](downloading.md) | Download a build as a static website or an npm project, and what's inside each. |
| [Loading Screen](../interface/launch-page/loading-screen.md) | Replace the screen a build shows while its assets load. |
| [Playable Ads](playable-ads/index.md) | Export a project as an interactive ad for Facebook or Snapchat. |

To host a downloaded build, embed it in another page, or publish it to a game platform, an app store or as a desktop app, see [Publishing](/user-manual/publishing/), which applies to every way of building with PlayCanvas.
