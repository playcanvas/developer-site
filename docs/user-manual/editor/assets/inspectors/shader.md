---
title: Shader
description: Shader assets hold GLSL from new asset or upload; edit in the Script Editor and view a read-only code preview in the Inspector.
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** Edit Shader asset files locally in Pull/Push mode and review their diffs before syncing; review the complete diff and diagnostics before Push.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Read or overwrite Shader asset text, update its asset metadata, and launch the project to verify the result.

:::

A Shader asset contains GLSL code for custom rendering effects. You can create a new Shader asset by clicking New Shader in the Asset Panel or by uploading a file with an extension of `.vert`, `.frag`, or `.glsl`.

To edit a Shader asset, right click on it in the Editor and select Edit.

## Inspector

![Shader Asset Inspector](/img/user-manual/editor/assets/inspectors/asset-inspector-shader.png)

The Shader asset inspector displays a preview of the GLSL shader code contained in the asset.

## Properties

This asset type has no configurable properties in the Inspector. It displays a read-only preview of the shader code.

:::tip
To use this asset in scripts, see [Asset Attributes](/user-manual/scripting/script-attributes/esm/#asset-attribute).
:::
