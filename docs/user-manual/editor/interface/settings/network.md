---
title: Network Settings
description: Configure asset loading retry behavior and network timeout settings for your PlayCanvas application.
sidebar_label: Network
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** Edit only the Network Settings values in `.pc/settings.json` so the project satisfies this requirement: configure asset loading retry behavior and network timeout settings for your PlayCanvas application; review the complete diff and diagnostics before Push.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Read the current Network Settings values, change only those needed to satisfy this requirement: configure asset loading retry behavior and network timeout settings for your PlayCanvas application; read the values back and launch the project when they affect runtime behavior.

:::

Configures network behavior for asset loading.

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
| **Max Concurrent Requests** | The maximum number of asset requests allowed to be in flight at the same time. Additional requests are queued and sent as earlier ones complete. This prevents the browser from rejecting requests with `net::ERR_INSUFFICIENT_RESOURCES` when a large number of assets load at once. Defaults to 128; set to 0 to disable throttling. |

### Notes

- A higher retry count improves resilience for poor connections, but can delay error reporting.
- A lower concurrent request limit avoids resource-exhaustion errors on large preloads, but may slightly increase total load time; the default of 128 is a safe starting point.
