---
title: Project Settings
description: Settings panel map for scene, project and personal settings, from engine, editor, import, physics, rendering, layers, lightmaps and batches to loading screen, import map, scripts, launch, localization, network and history.
---

The Settings panel controls how your project runs and how the Editor behaves. Each setting has one of three scopes:

- **Scene**: saved with the scene that is open, so each scene can have its own values. Gravity, the environment (ambient color and skybox), clustered lighting, Gaussian splat rendering, exposure, fog and lightmapping are scene settings, as are tonemapping and gamma in Engine v1 projects.
- **Project**: shared by every scene in the project, such as the resolution, the graphics device, anti-aliasing, layers, batch groups and input devices.
- **You**: personal preferences that affect only you, such as the Editor settings and the asset import options.

Scene and project settings affect all collaborators on the current [branch](../../version-control/branches.md). The icon in a panel's header shows whether the panel affects only you or everyone on the branch, and hovering over the header tells you which.

## Opening Settings

Load the Settings into the [Inspector](../inspector) by clicking the 'cog' icon on the [Toolbar](../toolbar) or in the [Viewport](../viewport), or by choosing **Settings** in the main menu.

![Settings](/img/user-manual/editor/interface/toolbar/settings.png)

## Settings Overview

The **Scene Name** field at the top of the Settings renames the current scene. Below it, settings are grouped into categories, where each category is shown as a collapsible panel. These categories are listed in the Inspector in the following order:

| Panel | Description | Scope |
| --- | --- | --- |
| [Engine](engine.md) | Engine settings, including the engine version. | You, for the current session |
| [Editor](editor.md) | Editor settings such as camera near/far clip, zoom sensitivity, gizmos, the View Cube and more. | You |
| Version Control | Version control preferences, such as **Auto-Load Diffs**, which computes and shows diffs in the [Version Control](../../version-control/index.md) panel automatically. Turn it off for very large projects where generating diffs is slow. | You |
| [Asset Import](asset-import.md) | Settings for controlling how assets are imported into your project. | You |
| [Physics](physics.md) | Physics settings to include the library and set gravity. | Gravity: scene<br />Physics Library: project |
| [Rendering](rendering.md) | Rendering settings such as skybox, clustered lighting, shadow settings, resolution, graphics device and more. | Environment, lighting, splats, exposure and fog: scene<br />Resolution, device and canvas options: project |
| [Layers](layers.md) | Manage rendering layers and their order. | Project |
| [Lightmapping](lightmapping.md) | Lightmapping settings such as resolution, mode, and ambient bake. | Scene |
| [Batch Groups](batch-groups.md) | Manage batch groups for this project. Batch groups reduce draw calls by batching similar models and elements together. | Project |
| Loading Screen | The script that creates the application's [loading screen](../launch-page/loading-screen.md). | Project |
| Import Map | The [import map](../../scripting/import-maps.md) that resolves module specifiers in ESM Scripts. | Project |
| External Scripts | The URLs of external scripts to include in your application. They are added as `<script>` tags to the application's page and load before any other script. | Project |
| [Launch Page](launch-page.md) | Settings for the launch page. | Project |
| [Input](input.md) | Enable or disable input devices (mouse, keyboard, etc.). | Project |
| [Localization](localization.md) | Settings for adding localization assets. | Project |
| [Network](network.md) | Network-related settings for the project. | Project |
| Scripts Loading Order | The order in which preloaded scripts are loaded. See [Script Loading Order](../../scripting/loading-order.md). | Project |
| Project Settings History | Opens the [item history](../../version-control/item-history.md) of the project settings in the Version Control panel. | Project |

:::ai
When configuration may cause unexpected behavior, ask an AI assistant through the **[Editor MCP Server](/user-manual/editor/mcp-server/)** to identify relevant settings and scopes, then explain the smallest change before you apply it.
:::
