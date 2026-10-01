---
title: Testing and Debugging
description: "Testing and debugging WebXR applications made with PlayCanvas: emulating a headset in the browser with the Immersive Web Emulator or IWER, serving pages to headsets and phones securely, opening Editor projects on devices, remote debugging with Chrome and Safari, and what to test."
---

Most XR development can happen on a desktop computer, with an emulator standing in for the headset. Test on real devices early and often, though: emulators can't tell you how an application performs, how tracking behaves, or how it feels to use.

## Without a Headset {#without-a-headset}

Meta's emulator emulates a Meta Quest headset with its controllers or hands, and draws controls over the page to move them and press their buttons. For AR, it can also put the user in one of several synthetic rooms, with planes, meshes and hit testing. It doesn't emulate light estimation, camera access, image tracking, or hit tests for transient input such as taps. In emulated sessions, the engine can't create anchors from hit test results, and `app.xr.hitTest.start()` with a `profile` throws an error, which stops the session from starting if it happens in an `available` handler. It presents through WebGL, so use WebGL 2 in emulated sessions. There are two ways to use it:

- **The [Immersive Web Emulator](https://github.com/meta-quest/immersive-web-emulator) extension**, for Chrome and Edge. Install it from the Chrome Web Store or the Edge Add-ons store. It replaces the browser's WebXR on every page, with no change to your code.
- **The [IWER](https://meta-quest.github.io/immersive-web-emulation-runtime/) npm packages in your page**, which work in any modern browser, and in automated tests. Install `iwer`, and `@iwer/devui` for the controls. Install the emulated runtime before the engine loads, as the engine checks for parts of WebXR, such as hand tracking, when its modules load:

```javascript
import { XRDevice, XRMesh, metaQuest3 } from 'iwer';
import { DevUI } from '@iwer/devui';

// Before the engine loads: replace the browser's WebXR with an emulated Meta Quest 3
const xrDevice = new XRDevice(metaQuest3);
xrDevice.installRuntime({ forceInstall: true });
xrDevice.installDevUI(DevUI);

// The engine detects mesh detection with this class, which the emulator doesn't install
window.XRMesh ??= XRMesh;

// Then load the engine, and create the application as usual
const pc = await import('playcanvas');
```

`forceInstall` replaces a browser's own WebXR, which desktop Chrome has, even without a headset. Load the emulator only in development builds. In automated tests, the `XRDevice` has properties and methods to move the headset, the controllers and the hands, and to press buttons, from code.

## On a Device {#on-a-device}

Headsets and phones need the page served over HTTPS, or from `localhost`. Some ways to get there:

- **USB and `adb reverse`.** Meta Quest headsets, Android XR headsets and Android phones can reach a development server on your computer as `localhost`, over USB. Enable developer mode and USB debugging on the device, connect it, and forward the server's port:

    ```bash
    adb reverse tcp:5173 tcp:5173
    ```

    Then open `http://localhost:5173` in the device's browser.

- **HTTPS on your network.** Serve your development server over HTTPS with a certificate the device trusts, for example one made with [mkcert](https://github.com/FiloSottile/mkcert), whose root certificate you install on the device, and open the server's address on your network.
- **A tunnel.** Services such as ngrok and Cloudflare Tunnel give a local server a public HTTPS address.
- **The Editor.** Open the launch page of your scene in the device's browser, signed in to your PlayCanvas account, or [publish](/user-manual/editor/publishing/) the project and open its URL. Published builds work for anyone with the link.

## Remote Debugging {#remote-debugging}

Connect the developer tools on your computer to the browser on the device, to see its console, inspect the page and record performance profiles:

- **Meta Quest, Android XR and Android phones.** With USB debugging enabled and the device connected, open `chrome://inspect/#devices` in Chrome on your computer, and click **inspect** under your page.
- **Apple Vision Pro.** Enable **Web Inspector** in the device's Safari settings, under **Advanced**. In Safari on a Mac on the same network, the **Develop** menu lists the device and its pages.

Without a computer at hand, show messages in the scene. The [`XrMenu`](/user-manual/user-interface/xr/#xr-menus) script's label items, updated with `setItemLabel()`, make a quick display in the headset.

## What to Test {#what-to-test}

- Entering and leaving sessions, including leaving through the device's own controls, and entering again.
- Every way to interact: controllers, hands, and switching between them in the middle of a session. On Apple Vision Pro, gaze and pinch. On phones, taps.
- The device's system menu opened in the middle of a session, which [hides your scene, or takes input from it](/user-manual/xr/sessions/#during-a-session).
- Devices without the features you use, such as AR features, which sessions can lack.
- The frame rate, throughout the application, at the device's refresh rate. See [Performance](/user-manual/xr/optimizing-webxr/#measuring).
- Comfort: how movement feels, how readable text is, and whether controls are within reach.

## See Also

- [Getting Started](/user-manual/xr/using-webxr/#trying-it) - Trying a first scene
- [Platforms](/user-manual/xr/platforms/) - The devices and browsers to test on
- [Troubleshooting](/user-manual/xr/troubleshooting/) - Common problems and their causes
