---
title: FXAA Effect
description: Legacy FXAA script for fast full-screen anti-aliasing and where to find the engine posteffect-fxaa implementation.
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** Implement FXAA Effect; required behavior and constraints: Legacy FXAA script for fast full-screen anti-aliasing and where to find the engine posteffect-fxaa implementation; launch the application, capture the rendered result, and check the console for shader or rendering errors.
- **[VS Code Extension](/user-manual/ai/vscode-extension/):** Implement FXAA Effect in the relevant script or shader assets so the result satisfies this requirement: legacy FXAA script for fast full-screen anti-aliasing and where to find the engine posteffect-fxaa implementation; review the complete diff and diagnostics before Push.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Configure the open project for FXAA Effect so the result satisfies this requirement: legacy FXAA script for fast full-screen anti-aliasing and where to find the engine posteffect-fxaa implementation; launch the scene, capture the rendered result, and check the console for shader or rendering errors.

:::

Fast Approximate Anti-Aliasing (FXAA) is an anti-aliasing algorithm created by NVIDIA. It provides an easy and fast way to add anti-aliasing to your scene.

Here is an image without the effect:

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

And the same image with the effect applied:

![Image with effect](/img/user-manual/graphics/posteffects/with-fxaa.png)

Find the post-processing effect script on [GitHub](https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-fxaa.js).
