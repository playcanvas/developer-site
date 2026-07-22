---
title: Sepia Effect
description: Legacy sepia script effect amount and GitHub reference for the sepia post-processing camera script.
---

:::ai

* **[Engine Development](/user-manual/ai/developing-with-engine/):** Implement Sepia Effect; required behavior and constraints: Legacy sepia script effect amount and GitHub reference for the sepia post-processing camera script; launch the application, capture the rendered result, and check the console for shader or rendering errors.
* **[VS Code Extension](/user-manual/ai/vscode-extension/):** Implement Sepia Effect in the relevant script or shader assets so the result satisfies this requirement: legacy sepia script effect amount and GitHub reference for the sepia post-processing camera script; review the complete diff and diagnostics before Push.
* **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Configure the open project for Sepia Effect so the result satisfies this requirement: legacy sepia script effect amount and GitHub reference for the sepia post-processing camera script; launch the scene, capture the rendered result, and check the console for shader or rendering errors.

:::

The Sepia effect makes the image look like an old photograph.

Here is an image without the effect:

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

And the same image with the effect applied:

![Image with effect](/img/user-manual/graphics/posteffects/with-sepia.png)

The built-in sepia effect has the following attributes:

* **Amount**: Controls the intensity of the effect. Ranges from 0 to 1.

Find the post-processing effect script on [GitHub](https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-sepia.js).
