---
title: Network Settings
sidebar_label: Network
---

Configures network retry behavior for asset loading.

:::note

These settings affect all users on the currently active [branch](../../version-control/branches.md) of the project.

:::

Navigate to the `NETWORK` section and expand the panel:

![Network Settings](/img/user-manual/editor/interface/settings/network.webp)

Here is a breakdown of the available settings:

## Settings

| Setting | Description |
| --- | --- |
| **Asset Retries** | The maximum number of times to retry loading an asset if it fails to load. If an asset request fails, it will be retried with exponential backoff. |

### Notes

- A higher retry count improves resilience for poor connections, but can delay error reporting.
