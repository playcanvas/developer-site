---
title: Bloom Effect
description: "Legacy script bloom: intensity, threshold, blur, and links to the engine posteffect-bloom source on GitHub."
---

:::ai

* **[Engine Development](/user-manual/ai/developing-with-engine/):** Implement Bloom Effect; required behavior and constraints: Legacy script bloom: intensity, threshold, blur, and links to the engine posteffect-bloom source on GitHub; launch the application, capture the rendered result, and check the console for shader or rendering errors.
* **[VS Code Extension](/user-manual/ai/vscode-extension/):** Implement Bloom Effect in the relevant script or shader assets so the result satisfies this requirement: legacy script bloom: intensity, threshold, blur, and links to the engine posteffect-bloom source on GitHub; review the complete diff and diagnostics before Push.
* **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Configure the open project for Bloom Effect so the result satisfies this requirement: legacy script bloom: intensity, threshold, blur, and links to the engine posteffect-bloom source on GitHub; launch the scene, capture the rendered result, and check the console for shader or rendering errors.

:::

[Bloom](https://en.wikipedia.org/wiki/Bloom_(shader_effect)) is a post-processing effect used to reproduce an imaging artifact of real-world cameras. The effect produces fringes (or feathers) of light extending from the borders of bright areas in an image, contributing to the illusion of an extremely bright light overwhelming the camera capturing the scene.

Here is an image without bloom:

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

And the same image with bloom applied:

![Image with effect](/img/user-manual/graphics/posteffects/with-bloom.png)

The built-in bloom effect has the following attributes:

* **Bloom Intensity**: The intensity of the effect
* **Bloom Threshold**: Only pixels brighter than this threshold will be processed. Ranges from 0 to 1.
* **Blur Amount**: Controls the amount of blurring.

Find the post-processing effect script on [GitHub](https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-bloom.js).
