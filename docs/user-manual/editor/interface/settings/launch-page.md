---
title: Launch Page Settings
description: Configure browser features like resolution, fill mode, and transparent canvas for the Editor Launch page.
sidebar_label: Launch Page
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** Edit only the Launch Page Settings values in `.pc/settings.json` so the project satisfies this requirement: configure browser features like resolution, fill mode, and transparent canvas for the Editor Launch page; review the complete diff and diagnostics before Push.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Read the current Launch Page Settings values, change only those needed to satisfy this requirement: configure browser features like resolution, fill mode, and transparent canvas for the Editor Launch page; read the values back and launch the project when they affect runtime behavior.

:::

The **Launch Page** settings control browser-level features used when running your project from the PlayCanvas Editor.

:::note

These settings affect all users on the currently active [branch](../../version-control/branches.md) of the project.

:::

Navigate to the `LAUNCH PAGE` section and expand the panel:

![Launch Page Settings](/img/user-manual/editor/interface/settings/launch-page.webp)

Here is a breakdown of the available settings:

## Settings

| Setting | Description |
| --- | --- |
| **Enable SharedArrayBuffer** | Adds the required headers on the launch page to enable SharedArrayBuffer. |

### Notes

- [`SharedArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) is required for some advanced features such as multithreaded physics.
- When enabled, ensure your hosting setup serves the correct HTTP headers:
  - `Cross-Origin-Opener-Policy: same-origin`
  - `Cross-Origin-Embedder-Policy: require-corp`
