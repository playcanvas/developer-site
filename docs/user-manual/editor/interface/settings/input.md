---
title: Input Settings
description: Enable or disable keyboard, mouse, touch, and gamepad input handling in your PlayCanvas application.
sidebar_label: Input
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** Review and edit the “Input Settings” project values through `.pc/settings.json` in Pull/Push mode.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Query and modify the “Input Settings” project settings in the project currently open in the Editor.

:::

Enables or disables input device handling for the application.

:::note

These settings affect all users on the currently active [branch](../../version-control/branches.md) of the project.

:::

Navigate to the `INPUT` section and expand the panel:

![Input Settings](/img/user-manual/editor/interface/settings/input.webp)

Here is a breakdown of the available settings:

## Settings

| Setting | Description |
| --- | --- |
| **Keyboard** | Enable keyboard input. Disable to ignore keyboard input in your application. |
| **Mouse** | Enable mouse input. Disable to ignore mouse input in your application. |
| **Touch** | Enable touch input. Disable to ignore touch input in your application. |
| **Gamepads** | Enable gamepad input. Disable to ignore gamepad input in your application. |

### Notes

- Disabling unused input methods can reduce event handling overhead.
