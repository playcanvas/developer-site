---
title: Hue-Saturation Effect
description: Legacy hue and saturation script effect controls plus GitHub link for the huesaturation post effect source.
---

:::ai

* **[Engine Development](/user-manual/ai/developing-with-engine/):** Implement Hue-Saturation Effect; required behavior and constraints: Legacy hue and saturation script effect controls plus GitHub link for the huesaturation post effect source; launch the application, capture the rendered result, and check the console for shader or rendering errors.
* **[VS Code Extension](/user-manual/ai/vscode-extension/):** Implement Hue-Saturation Effect in the relevant script or shader assets so the result satisfies this requirement: legacy hue and saturation script effect controls plus GitHub link for the huesaturation post effect source; review the complete diff and diagnostics before Push.
* **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Configure the open project for Hue-Saturation Effect so the result satisfies this requirement: legacy hue and saturation script effect controls plus GitHub link for the huesaturation post effect source; launch the scene, capture the rendered result, and check the console for shader or rendering errors.

:::

The hue-saturation effect allows you to modify the hue and saturation of the rendered image.

Here is an image without the effect:

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

And the same image with the effect applied and changes to hue and saturation:

![Image with effect](/img/user-manual/graphics/posteffects/with-hue-saturation.png)

The built-in hue-saturation effect has the following attributes:

* **Hue**: The hue of the image. Ranges from -1 to 1 (-1 is 180 degrees in the negative direction, 0 no change, 1 is 180 degrees in the positive direction).
* **Saturation**: The saturation of the image. Ranges from -1 to 1 (-1 is solid gray, 0 no change, 1 maximum saturation).

Find the post-processing effect script on [GitHub](https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-huesaturation.js).
