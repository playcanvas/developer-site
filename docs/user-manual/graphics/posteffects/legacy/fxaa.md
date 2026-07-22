---
title: FXAA Effect
description: Legacy FXAA script for fast full-screen anti-aliasing and where to find the engine posteffect-fxaa implementation.
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** Edit and review the scripts and shaders used by “FXAA Effect” locally in Pull/Push mode.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Write the related text assets, configure Camera and rendering properties, then launch and capture the result.

:::

Fast Approximate Anti-Aliasing (FXAA) is an anti-aliasing algorithm created by NVIDIA. It provides an easy and fast way to add anti-aliasing to your scene.

Here is an image without the effect:

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

And the same image with the effect applied:

![Image with effect](/img/user-manual/graphics/posteffects/with-fxaa.png)

Find the post-processing effect script on [GitHub](https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-fxaa.js).
