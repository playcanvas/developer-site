---
title: Brightness-Contrast Effect
description: "Legacy brightness and contrast script effect: parameter ranges and GitHub source for the camera post pipeline."
---

:::ai

* **[Engine Development](/user-manual/ai/developing-with-engine/):** Implement Brightness-Contrast Effect; required behavior and constraints: Legacy brightness and contrast script effect: parameter ranges and GitHub source for the camera post pipeline; launch the application, capture the rendered result, and check the console for shader or rendering errors.
* **[VS Code Extension](/user-manual/ai/vscode-extension/):** Implement Brightness-Contrast Effect in the relevant script or shader assets so the result satisfies this requirement: legacy brightness and contrast script effect: parameter ranges and GitHub source for the camera post pipeline; review the complete diff and diagnostics before Push.
* **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Configure the open project for Brightness-Contrast Effect so the result satisfies this requirement: legacy brightness and contrast script effect: parameter ranges and GitHub source for the camera post pipeline; launch the scene, capture the rendered result, and check the console for shader or rendering errors.

:::

The brightness-contrast effect allows you to modify the brightness and contrast of the rendered image.

Here is an image without the effect:

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

And the same image with the effect applied and changes to brightness and contrast:

![Image with effect](/img/user-manual/graphics/posteffects/with-brightness-contrast.png)

The built-in brightness-contrast effect has the following attributes:

* **Brightness**: The brightness of the image. Ranges from -1 to 1 (-1 is solid black, 0 no change, 1 solid white).
* **Contrast**: The contrast of the image. Ranges from -1 to 1 (-1 is solid gray, 0 no change, 1 maximum contrast).

Find the post-processing effect script on [GitHub](https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-brightnesscontrast.js).
