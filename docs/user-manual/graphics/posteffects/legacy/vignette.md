---
title: Vignette Effect
description: Legacy vignette offset and darkness controls to darken edges, with GitHub link for the vignette script.
---

:::ai

* **[Engine Development](/user-manual/ai/developing-with-engine/):** Implement Vignette Effect; required behavior and constraints: Legacy vignette offset and darkness controls to darken edges, with GitHub link for the vignette script; launch the application, capture the rendered result, and check the console for shader or rendering errors.
* **[VS Code Extension](/user-manual/ai/vscode-extension/):** Implement Vignette Effect in the relevant script or shader assets so the result satisfies this requirement: legacy vignette offset and darkness controls to darken edges, with GitHub link for the vignette script; review the complete diff and diagnostics before Push.
* **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Configure the open project for Vignette Effect so the result satisfies this requirement: legacy vignette offset and darkness controls to darken edges, with GitHub link for the vignette script; launch the scene, capture the rendered result, and check the console for shader or rendering errors.

:::

In photography and optics, [vignetting](https://en.wikipedia.org/wiki/Vignetting) is the reduction of an image's brightness or saturation at the periphery compared to the image center. You can use it to draw attention to the center of the frame.

Here is an image without the effect:

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

And the same image with the effect applied:

![Image with effect](/img/user-manual/graphics/posteffects/with-vignette.png)

The built-in vignette effect has the following attributes:

* **Offset**: Controls the offset of the effect.
* **Darkness**: Controls the darkness of the effect.

Find the post-processing effect script on [GitHub](https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-vignette.js).
