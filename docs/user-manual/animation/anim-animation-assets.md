---
title: Animation Assets 
description: Keyframe animation assets from FBX conversion and how they link to animstategraphs through the anim component.
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** Load the requested Animation asset, map it to an animstategraph state, add any required animation events, and verify playback and event timing.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Upload or inspect Animation assets and read, add, update, or remove their animation events; launch the scene and verify playback, transitions, parameters, or event data.

:::

![Animation Assets](/img/user-manual/animation/animation-assets.png)

Animation assets are the animation keyframe data that’s used to drive animations of a model in PlayCanvas. They are linked to an animstategraph asset via an entity's anim component.

The anim component currently supports animation assets that have been imported into a PlayCanvas project from .FBX files using the `Convert to GLB` setting in Project Settings > Asset Import.

![Asset Import](/img/user-manual/animation/asset-tasks.png)
