---
title: Scripting
description: Surveys editor scripting tools such as script assets, import maps, the code editor, VS Code extension, hot reload, and load order.
---

:::ai

AI assistants can work with Editor scripts in two ways:

- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Let Codex, Claude Code, Cursor, and other MCP clients create or edit script assets and verify them in a running application.
- **[VS Code Extension](/user-manual/ai/vscode-extension/):** Let file-based coding assistants edit scripts locally in Pull/Push mode so you can review every change before syncing it.

:::

The PlayCanvas Editor provides a tightly integrated environment for writing and managing scripts. This section covers the Editor-specific tools and workflows that will enhance your scripting experience.

:::tip Learn the Basics First
If you're new to scripting in PlayCanvas, we recommend starting with the [Scripting](/user-manual/scripting/) section to learn the fundamentals—script lifecycle, events, attributes, and the Engine API—before diving into the Editor-specific features covered here.
:::

## What the Editor Provides

As an Editor user, you benefit from a tightly integrated development environment:

- **Asset Management** — Scripts are assets, managed alongside your models, textures, and materials in the Assets panel.
- **Visual Configuration** — Script Attributes let you customize script behavior directly in the Inspector without changing code.
- **Rapid Iteration** — Hot Reloading lets you see code changes in real-time without restarting your app.
- **Seamless Integration** — The Editor bridges the gap between your code and your scene, making it easy to connect scripts to Entities and Components.

## In This Section

- [Managing Scripts](./managing-scripts.md) — Create, organize, and manage script assets in the Editor.
- [Import Maps](./import-maps.md) — Configure module resolution for ESM scripts.
- [Code Editor](./code-editor.md) — Use the built-in code editor for quick edits.
- [VS Code Extension](./vscode-extension.md) — Set up VS Code for a full-featured development experience.
- [Hot Reloading](./hot-reloading.md) — Iterate rapidly with live code updates.
- [Loading Order](./loading-order.md) — Control the order in which scripts are loaded.
