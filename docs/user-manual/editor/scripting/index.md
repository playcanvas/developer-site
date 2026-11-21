---
title: Scripting
description: "The Editor's tools for scripts: creating and attaching them, editing them in the Code Editor or VS Code, hot reloading, import maps, loading order and loading scenes at runtime."
---

Scripts are how you give entities behavior. In the Editor, a script is an asset like any other: you create it in the Assets panel, attach it to an entity with a Script component, and tune its attributes in the Inspector without touching the code. This section covers those Editor tools.

:::tip[Learn the Basics First]

New to scripting in PlayCanvas? Start with [Scripting](/user-manual/scripting/) in Common Topics, which covers what a script can do: its lifecycle, attributes, events and the Engine it talks to. Everything there applies to scripts in Editor projects.

:::

The Editor supports two kinds of script. **ESM scripts** are ECMAScript modules (`.mjs` files) that can `import` from each other and from packages, and they're recommended for new projects. **Classic scripts** (`.js` files) are the older format, and still work. When you create a script, its name decides the kind: end it in `.mjs` for an ESM script. See [ESM Scripts](/user-manual/scripting/esm-scripts/).

## In This Section {#in-this-section}

| Page | What it covers |
| --- | --- |
| [Managing Your Scripts](managing-scripts.md) | Create, import, organize and delete scripts, and attach them to entities. |
| [Code Editor](code-editor.md) | The Editor's built-in, collaborative code editor. |
| [VS Code Extension](vscode-extension.md) | Edit your project's scripts in Visual Studio Code, kept in sync with the Editor. |
| [Hot Reloading](hot-reloading.md) | Update a running app with your code changes, without reloading it. |
| [Import Maps](import-maps.md) | Give ESM imports short names, or load packages from a content delivery network (CDN). |
| [Script Loading Order](loading-order.md) | The order scripts load in, and how publishing combines them. |
| [Loading Scenes](../scenes/loading-scenes.md) | Switch scenes, or load several at once, while your app runs. |

:::ai
When a script change also needs Editor setup, use an AI coding assistant with **[VS Code Extension Pull/Push mode](/user-manual/editor/scripting/vscode-extension/)** for source edits and the **[Editor MCP Server](/user-manual/editor/mcp-server/)** for attachments, attributes, instances, and Launcher verification. Review both source and Editor changes.
:::
