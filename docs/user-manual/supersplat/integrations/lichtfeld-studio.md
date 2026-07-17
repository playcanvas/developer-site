---
title: LichtFeld Studio
description: "Install the SuperSplat Upload plugin for LichtFeld Studio, connect with a PlayCanvas access token, and publish PLY or SOG scenes directly to SuperSplat."
---

The SuperSplat Upload plugin publishes Gaussian splat scenes from [LichtFeld Studio](https://lichtfeld.io/) directly to [SuperSplat](https://superspl.at). It uses LichtFeld Studio's native exporter to create a local PLY or SOG file, then uploads that file with progress reporting and resumable multipart uploads.

:::info Ownership and support

PlayCanvas maintains the upload plugin and the SuperSplat upload service. LichtFeld Studio and its native exporter are maintained by the LichtFeld team.

:::

![The SuperSplat Upload panel in LichtFeld Studio](/img/user-manual/supersplat/integrations/lichtfeld-studio/upload-panel.png)

## Requirements

- LichtFeld Studio 0.5.3 or later on Windows or Linux.
- A PlayCanvas account with an API access token.
- Python 3.10 or later, supplied by LichtFeld Studio.

The plugin has no required third-party Python dependencies.

## Install the plugin

1. Download the latest plugin release from the [SuperSplat Upload for LichtFeld Studio repository](https://github.com/playcanvas/supersplat-lfs-plugin/releases).
2. Extract the archive and copy its contents to a directory named `lfs_supersplat` in the LichtFeld Studio plugin directory:

| Platform | Plugin directory |
|----------|------------------|
| Windows | `%USERPROFILE%\.lichtfeld\plugins\lfs_supersplat` |
| Linux | `~/.lichtfeld/plugins/lfs_supersplat` |

:::note Plugin directory name

The directory itself must be named `lfs_supersplat`. Avoid leaving the files inside an extra archive directory such as `supersplat-lfs-plugin-0.1.1`.

:::

After copying the plugin, open LichtFeld Studio's Python Console and run:

```python
import lichtfeld as lf

lf.plugins.discover()
lf.plugins.settings("lfs_supersplat").set("load_on_startup", True)
lf.plugins.load("lfs_supersplat")
```

The **SuperSplat** tab appears in the main workspace. The `load_on_startup` setting loads the plugin automatically in future sessions.

## Connect to SuperSplat

The panel calls a PlayCanvas API access token an **API key**. Generate a token by following the [REST API authorization instructions](/user-manual/api/#authorization). Treat the token as a secret; anyone with the token can use its permissions until you revoke it.

To connect:

1. Open the **SuperSplat** tab.
2. Paste the access token into **API key**.
3. Optionally enable **Store securely with your operating system**.
4. Select **Connect**.

When secure storage is enabled, the plugin first tries the Python `keyring` package and then Windows DPAPI on Windows. If no secure credential backend is available, the key remains available only for the current LichtFeld Studio session; the plugin does not save a plaintext fallback.

You can alternatively set `SUPERSPLAT_API_KEY` before launching LichtFeld Studio. Environment-provided keys are not copied into persistent plugin settings.

## Upload a scene

1. Open a scene containing at least one splat node.
2. Open the **SuperSplat** tab and connect to your account.
3. Choose **All splats** or **Visible splats**.
4. Enter a title and, optionally, a description.
5. Select **Upload to SuperSplat**.

LichtFeld Studio first exports the chosen content to a local staging file. The plugin then uploads that file to SuperSplat. When the upload is accepted, the panel provides links to continue in SuperSplat or open the scene viewer.

New uploads are **unlisted** by default. You can change their metadata and visibility in SuperSplat after upload.

## Advanced settings

Open **Advanced** to configure the export and upload:

| Setting | Description |
|---------|-------------|
| **Format** | Export as PLY for broad interchange or SOG for a compressed upload. |
| **SH degree** | Choose how much view-dependent color information to retain. Higher degrees preserve more information and produce larger files. |
| **Parallel parts** | Upload between one and eight parts concurrently. More parallel parts can improve throughput on a fast, stable connection. |

The plugin limits the selected SH degree to the degree available in the source scene.

## Resume an interrupted upload

After LichtFeld Studio finishes the local export, the plugin stores the staged file and a JSON checkpoint in its cache. If the upload is interrupted, the **SuperSplat** tab offers to resume or discard it the next time the plugin loads.

Resume requires:

- The original staged file at the same size.
- The upload checkpoint.
- The same SuperSplat account that created the upload.

An interruption during the export itself cannot be resumed. A successful upload removes its staged file and checkpoint.

| Platform | Default cache directory |
|----------|-------------------------|
| Windows | `%LOCALAPPDATA%\LichtFeld\SuperSplat` |
| Linux | `$XDG_CACHE_HOME/lichtfeld-supersplat`, or `~/.cache/lichtfeld-supersplat` |

Set `LFS_SUPERSPLAT_CACHE_DIR` before launching LichtFeld Studio to use a different cache directory.

## Current limits

- Each upload is limited to 10 GiB.
- The plugin can upload all splats or visible splats. Exporting only selected splats is not currently supported.
- Transient part failures are retried automatically with fresh signed URLs.
- An accepted upload may continue processing in SuperSplat before it is ready to view.

## Troubleshooting

| Problem | What to check |
|---------|---------------|
| The SuperSplat tab does not appear | Confirm the directory is named `lfs_supersplat`, rerun `lf.plugins.discover()`, and inspect `lf.plugins.get_error("lfs_supersplat")` in the Python Console. |
| The plugin does not connect | Generate a new access token, check the network connection, and verify that an environment-provided key was set before LichtFeld Studio launched. |
| No splats are available to upload | Open a scene containing splat nodes. If using **Visible splats**, confirm that at least one splat node is visible. |
| Export or staging fails | Check available disk space and permissions for the cache directory. The staged file must fit within the 10 GiB upload limit. |
| Resume is unavailable | Confirm that the staged file and checkpoint still exist and that you connected with the same SuperSplat account. |
| A stored key is missing after restart | The operating system may not have an available secure credential backend. Paste the key again or set `SUPERSPLAT_API_KEY` before launch. |
| Upload completed but the viewer is not ready | SuperSplat is still processing the scene. Try the viewer again after processing completes. |

Report plugin problems on the [GitHub issue tracker](https://github.com/playcanvas/supersplat-lfs-plugin/issues).
