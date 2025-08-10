---
title: Launch Page Settings
sidebar_label: Launch Page
---

The **Launch Page** settings control browser-level features used when running your project from the PlayCanvas Editor.

:::note

These settings affect all users on the currently active [branch](../../version-control/branches.md) of the project.

:::

## Settings

| Setting | Description |
| --- | --- |
| **Enable SharedArrayBuffer** | Enables use of the `SharedArrayBuffer` API for high-performance memory sharing between the main thread and Web Workers. Requires cross-origin isolation headers on the host page. |

### Notes

- `SharedArrayBuffer` is required for some advanced features like multithreaded physics or WASM-based decoding.
- When enabled, ensure your hosting setup serves the correct HTTP headers:
  - `Cross-Origin-Opener-Policy: same-origin`
  - `Cross-Origin-Embedder-Policy: require-corp`
