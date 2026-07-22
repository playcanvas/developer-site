---
title: Localization Settings
description: Localization panel usage for registering JSON translation assets creating starter files and how keys map to UI strings before runtime language swap logic.
sidebar_label: Localization
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** Edit only the Localization Settings values in `.pc/settings.json` so the project satisfies this requirement: localization panel usage for registering JSON translation assets creating starter files and how keys map to UI strings before runtime language swap logic; review the complete diff and diagnostics before Push.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Read the current Localization Settings values, change only those needed to satisfy this requirement: localization panel usage for registering JSON translation assets creating starter files and how keys map to UI strings before runtime language swap logic; read the values back and launch the project when they affect runtime behavior.

:::

Manages the JSON files for supporting multiple languages.

:::note

These settings affect all users on the currently active [branch](../../version-control/branches.md) of the project.

:::

Navigate to the `LOCALIZATION` section and expand the panel:

![Localization Settings](/img/user-manual/editor/interface/settings/localization.webp)

Here is a breakdown of the available settings:

## Settings

| Setting | Description |
| --- | --- |
| **Assets** | JSON assets that contain localization data. Assets in this list are automatically parsed for localization data when loaded. These are used to localize your text elements. |
| **Create New Asset** | Creates a new localization JSON asset with the default en-US format. |

### Notes

- Localization assets typically contain key-value pairs for translations.
- Switching languages at runtime requires code to update UI and scene content.
