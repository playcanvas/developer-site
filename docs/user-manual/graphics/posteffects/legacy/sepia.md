---
title: Sepia Effect
description: Legacy sepia script effect amount and GitHub reference for the sepia post-processing camera script.
---

:::ai

* **[VS Code Extension](/user-manual/ai/vscode-extension/):** Edit and review the scripts and shaders used by “Sepia Effect” locally in Pull/Push mode.
* **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Write the related text assets, configure Camera and rendering properties, then launch and capture the result.

:::

The Sepia effect makes the image look like an old photograph.

Here is an image without the effect:

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

And the same image with the effect applied:

![Image with effect](/img/user-manual/graphics/posteffects/with-sepia.png)

The built-in sepia effect has the following attributes:

* **Amount**: Controls the intensity of the effect. Ranges from 0 to 1.

Find the post-processing effect script on [GitHub](https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-sepia.js).
