---
title: Input Settings
description: Enable or disable keyboard, mouse, touch, and gamepad input handling in your PlayCanvas application.
sidebar_label: Input
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** Edit only the Input Settings values in `.pc/settings.json` so the project satisfies this requirement: enable or disable keyboard, mouse, touch, and gamepad input handling in your PlayCanvas application; review the complete diff and diagnostics before Push.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Read the current Input Settings values, change only those needed to satisfy this requirement: enable or disable keyboard, mouse, touch, and gamepad input handling in your PlayCanvas application; read the values back and launch the project when they affect runtime behavior.

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
