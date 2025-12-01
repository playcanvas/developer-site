---
title: Localization Settings
sidebar_label: Localization
---

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
