---
title: Launch Page
description: Launch Page basics with the Launch menu's device, profiler, debug, MiniStats and Inspector options, what the Editor live link updates and what needs a reload, dual-tab testing tips and running on phones.
---

The Editor's Viewport is where you visually construct your application. From there, you can press the Launch button to open the Launch Page and actually _run_ your application.

![Launch Button](/img/user-manual/editor/launch-page/launch-button.png)

## Launching {#launching}

Click **Launch** in the top-right corner of the Viewport, or press CTRL + ENTER (CMD + ENTER on a Mac), to open the Launch Page in a new tab. Hold SHIFT when you click **Launch** to open it in a popup window instead.

Hover over the **Launch** button to show its menu:

| Option | Description |
| --- | --- |
| **Launch with WebGPU**<br />**Launch with WebGL 2.0** | Launch with only that graphics device, instead of trying the devices in the order set in the [Rendering settings](../settings/rendering.md#device-and-api). The menu leaves out the device your project already tries first. Hold SHIFT when you click one to open it in a popup window. |
| **Profiler** | Show the [Profiler](/user-manual/optimization/profiler/) over the running application. |
| **Debug** | Log the engine's warning and error messages to the browser's JavaScript console. |
| **Concatenate Scripts (Classic)** | Combine the preloaded Classic scripts into a single file when you launch, so that the scene loads faster. ESM Scripts are not affected. |
| **Mini stats** | Show the [MiniStats](/user-manual/optimization/mini-stats/) overlay in the running application. |
| **Inspector** | Show the [Inspector](/user-manual/scripting/debugging/inspector/) debug panel in the running application. Requires Engine 2.23 or later. |
| **Use Release Candidate** | Launch with the engine release candidate. Only listed while a release candidate is available. See also [Engine Settings](../settings/engine.md). |

The options apply to every launch until you untick them. **Debug**, **Mini stats**, **Inspector** and **Use Release Candidate** are remembered for you in this project, while **Profiler** and **Concatenate Scripts (Classic)** are cleared when you reload the Editor.

## Working with the Launch Page {#working-with-the-launch-page}

When you activate the Launch Page, it will open in a new tab. It is perfectly valid to switch back and forth between the Editor and the Launch Page. However, if you have a large screen or even a multi-monitor setup, consider tearing off the Launch Page tab and placing it side by side with the Editor.

![Launch Page Side by Side](/img/user-manual/editor/launch-page/launch-page-side-by-side.png)

This can make it easier and quicker to switch between the two.

## Real-Time Updates {#real-time-updates}

A key feature of the Launch Page is that it maintains a real-time connection (or live-link) to the Editor. Most changes made in the Editor are reflected in the Launch Page immediately, without reloading it:

- **Entities**: creating, deleting, renaming, moving, reparenting, enabling and disabling them. Moving an entity that has a rigid body teleports it and resets its velocity.
- **Components**: adding and removing them and editing their properties, including adding, removing, enabling and reordering scripts and editing script attributes.
- **Assets**: changes such as editing a material or replacing a texture.
- **Settings**: scene settings such as gravity, the skybox, fog and exposure, and project settings such as the resolution, layers, batch groups and localization assets.

![Launch Page Live Link](/img/user-manual/editor/launch-page/launch-page-live-link.gif)

And if any other users (with write permission) are present in the Editor with you, their edits can update your Launch Page as well.

Other changes only take effect when you reload the Launch Page:

- **Code changes**: saving a script does not update the running application, unless the script implements `swap()` for [hot reloading](../../scripting/hot-reloading.md).
- **New scripts**: script assets that you create or upload after launching are not loaded until you reload.
- **Other scenes**: the Launch Page keeps running the scene you launched. To run a different scene, open it in the Editor and launch again.
- **Startup settings**: settings that the application reads when it starts, such as the graphics device settings in the [Rendering settings](../settings/rendering.md#device-and-api), the [Input settings](../settings/input.md), the [loading screen](loading-screen.md), external scripts and the import map. Turning **Clustered Lighting** on or off requires reloading the Editor, and the Launch Page too.

:::ai
Give an AI assistant the steps and expected behavior for a reproducible bug. Through the **[Editor MCP Server](/user-manual/editor/mcp-server/)**, it can replay the input and correlate logs, entity state, and captures before and after a fix.
:::

## Running on Other Devices {#running-on-other-devices}

Sometimes it can be useful to run the Launch Page on another device. For example, you might wish to test your application on a mobile device. To do this, ensure you are logged in to your PlayCanvas account on that device. Then, simply visit the Launch Page URL in your device's browser.

:::tip

Chrome can dynamically generate a QR code for any page. From the Launch Page on your desktop, open Chrome's main menu and select `Save and share` > `Create QR Code`. Then, scan the QR code on your mobile device to instantly visit the Launch Page.

:::
