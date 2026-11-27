---
title: Upgrading Engine V1 Projects
description: "How the Editor upgrades Engine V1 projects to Engine V2 when they're opened, what to check afterwards in gamma, tone mapping, sRGB textures and scripts, and how to fix brightness differences."
---

The Editor runs every project on Engine V2. Projects made for Engine V1 are upgraded to Engine V2 automatically the first time someone with write access opens them in the Editor. The Editor converts the open scene, saves the change and reloads. There's no way to switch a project back to Engine V1.

Engine V2 changed how some parts of a scene are set up, and some of the engine's APIs. This page covers what the upgrade does for you, and what to check yourself afterwards.

## What the Upgrade Changes {#what-the-upgrade-changes}

### Gamma and Tone Mapping {#gamma-and-tone-mapping}

Engine V1 set gamma and tone mapping for the whole scene, in the Rendering settings. Engine V2 sets them on each camera, so every Camera component has **Tonemapping** and **Gamma** fields:

<img loading="lazy" src='/img/user-manual/editor/editor-v2/gamma-tonemap.webp' alt='The Tonemapping and Gamma fields on a Camera component' width='400px' />

The upgrade copies the open scene's gamma and tone mapping to each camera in that scene, and the Console lists each camera whose values change. Cameras in the project's other scenes aren't changed, so open each of those scenes and check its cameras.

The Viewport has its own gamma and tone mapping, which affect only how the scene looks in the Editor. Set them with **Camera Tonemapping** and **Camera Gamma** in the [Editor settings](/user-manual/editor/interface/settings/editor/):

<img loading="lazy" src='/img/user-manual/editor/editor-v2/settings-editor.webp' alt='The Viewport gamma and tone mapping in the Editor settings' width='400px' />

### sRGB Textures {#srgb-textures}

Engine V2 needs to know whether each texture is sRGB. Textures that store colors, such as diffuse and emissive maps, should be sRGB for accurate color, while textures that store other data, such as normal maps, should not. The setting is in the texture asset's panel:

<img loading="lazy" src='/img/user-manual/editor/editor-v2/srgb-texture.webp' alt='The sRGB setting of a texture asset' width='400px' />

The Editor checks each texture's setting against the places it's used. When textures need attention, the status bar at the bottom of the Editor shows **N audits found**, and the Console lists each affected texture or texture atlas and where it's used:

<img loading="lazy" src='/img/user-manual/editor/editor-v2/console-texture.webp' alt='Console messages about the sRGB settings of textures' width='600px' />

- Select **N audits found**, then **Fix issues**, to fix every texture whose uses all need the same setting.
- Resolve conflicts, where a texture's uses need different settings, one at a time. Selecting a Console message takes you to the use. To use the same image both ways, duplicate the texture so that each use has its own copy.

<video autoPlay muted loop controls playsInline src='/video/asset-auditor.mp4' style={{width: '100%', height: 'auto'}} />

For more about sRGB, see [Textures](/user-manual/graphics/linear-workflow/textures/) in the Linear Workflow section.

### Scripts {#scripts}

The upgrade doesn't change your scripts. Engine V2 changed or removed some Engine V1 APIs, so check your scripts against the [Engine Migrations](/user-manual/engine/migrations/) guide. Then launch the project with the **Debug** [launch option](/user-manual/editor/interface/launch-page/) ticked, and look for errors and deprecation warnings in the browser's JavaScript console.

:::ai
With the **[Editor MCP Server](/user-manual/editor/mcp-server/)**, an AI assistant can find the scripts that use Engine V1 APIs, update them, and launch the project to check the result. Its page includes a [demo](/user-manual/editor/mcp-server/#verify-the-running-result) of an assistant migrating an Engine V1 project.
:::

## Troubleshooting the Upgrade {#troubleshooting-the-upgrade}

### The Scene Looks Brighter or Darker {#the-scene-looks-brighter-or-darker}

Check every place your scene's look can come from:

- **Each camera**: **Gamma** and **Tonemapping** on every Camera component, in every scene. See [Gamma and Tone Mapping](#gamma-and-tone-mapping).
- **The Viewport**: **Camera Gamma** and **Camera Tonemapping** in the Editor settings, which change only how the Viewport looks.
- **Each texture**: its sRGB setting. See [sRGB Textures](#srgb-textures).

### A Camera Looks Different in the Editor and on the Launch Page {#a-camera-looks-different-in-the-editor-and-on-the-launch-page}

If a script creates the camera, set its gamma and tone mapping explicitly in code, with the Camera component's `gammaCorrection` and `toneMapping` properties.
