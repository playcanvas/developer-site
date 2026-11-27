---
title: Testing and Debugging
description: "Test PlayCanvas XR applications without a headset using the Immersive Web Emulator extension or the IWER runtime in your page, serve them to headsets and phones over HTTPS, debug them remotely, and know what to check on a real device."
---

You can build and test most of an XR application without a headset. An emulator stands in for the device in a desktop browser, so you can enter sessions, move the head and controllers, press buttons and try AR in a virtual room. Test on real devices as well, because only they show you comfort, legibility, performance and their own input.

## Testing Without a Headset {#without-a-headset}

### The Immersive Web Emulator {#the-immersive-web-emulator}

The [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik) is a browser extension from Meta for Chrome and Edge. It replaces the browser's WebXR with an emulated headset, so any page can enter VR and AR, and shows controls for the headset over the page. Install it, open your application, and select your application's button to enter VR or AR.

It emulates:

- **The headset.** Move and turn it with the mouse and keyboard, and choose the device it emulates, such as a Meta Quest 3.
- **Controllers.** Move them, and press their triggers, grips, buttons and thumbsticks.
- **Hands.** Switch from controllers to tracked hands, and pinch.
- **AR.** Choose a room for the emulated device to see. AR sessions can then use [hit testing](/user-manual/xr/ar/hit-testing/), [anchors](/user-manual/xr/ar/anchors/), [plane detection](/user-manual/xr/ar/plane-detection/) and [mesh detection](/user-manual/xr/ar/mesh-detection/) against it.

It doesn't emulate light estimation, camera access, image tracking or DOM overlays. Turn the extension off for pages where you want the browser's own WebXR, such as when a headset is connected to your computer.

Don't use the older **WebXR API Emulator** extension. It is no longer maintained, and isn't compatible with PlayCanvas.

### The Emulator in Your Page {#the-emulator-in-your-page}

The extension is built on the [Immersive Web Emulation Runtime](https://github.com/meta-quest/immersive-web-emulation-runtime) (IWER), which is also on npm. Add it to a development build of your application to emulate a headset in any browser, without an extension. It is also how automated tests can enter XR in a headless browser.

![A VR scene in a desktop browser with the emulator's controls over it: a panel of buttons and sliders for the emulated controllers, and the headset's view of the scene](/img/user-manual/xr/testing/iwer-devui.webp)

Install `iwer` and `@iwer/devui`, which draws the controls shown above, and start the runtime **before** you import the engine, which looks for WebXR's classes as it loads:

```javascript
import { XRDevice, XRMesh, metaQuest3 } from 'iwer';
import { DevUI } from '@iwer/devui';

// Replace the browser's WebXR with an emulated Meta Quest 3, and show its controls
const xrDevice = new XRDevice(metaQuest3);
xrDevice.installRuntime({ forceInstall: true });
xrDevice.installDevUI(DevUI);

// The engine detects mesh detection by this class, which the runtime doesn't install
window.XRMesh ??= XRMesh;

// Then import the engine, and create the application as usual
const pc = await import('playcanvas');
```

`forceInstall` replaces the browser's own WebXR, if it has one. Without it, the runtime is only installed in browsers without WebXR.

For AR, add the runtime's Synthetic Environment Module from `@iwer/sem`, and load one of its rooms:

```javascript
import { SyntheticEnvironmentModule } from '@iwer/sem';

xrDevice.installSEM(SyntheticEnvironmentModule);
await xrDevice.sem.loadDefaultEnvironment('sunlit_living_room');
```

`xrDevice.sem.environments` lists the rooms. Your code can also drive the emulated device: set `xrDevice.position` and `xrDevice.quaternion` to move the head, and use the controllers in `xrDevice.controllers` to press buttons. See the [IWER documentation](https://meta-quest.github.io/immersive-web-emulation-runtime/).

## Testing on a Device {#testing-on-a-device}

A headset or phone loads your application over the network, and only offers WebXR to a page in a secure context. A development server on your computer, on an address such as `http://192.168.1.20:5173`, isn't one. These are the usual ways around it:

- **Forward a port over USB.** Meta Quest headsets, Android XR headsets and Android phones run Android, so `adb` can make a port on your computer appear as `localhost` on the device. Turn on developer mode on the device, connect it with a USB cable, and run `adb reverse tcp:5173 tcp:5173`. Then open `http://localhost:5173` in the device's browser.
- **Serve over HTTPS.** Use a development server with a certificate that the device trusts, or a tunneling service that gives your server a public HTTPS address.
- **Deploy it.** Upload a build to any HTTPS host. See [Publishing](/user-manual/publishing/).

In the Editor, the [Launch Page](/user-manual/editor/interface/launch-page/#running-on-other-devices) is already served over HTTPS. Sign in to your PlayCanvas account in the device's browser, and open the Launch Page's URL there. Published builds on PlayCanvas hosting are HTTPS too.

### Remote Debugging {#remote-debugging}

While a session runs, the device's display shows your scene, not the browser's developer tools. Connect your computer's browser to the device's to see its console, set breakpoints and profile:

| Device | How |
| --- | --- |
| Meta Quest, Android XR headsets, Android phones | Turn on developer mode and connect the device with USB. Open `chrome://inspect` in Chrome on your computer, and select **inspect** under the device's tab |
| Apple Vision Pro | Turn on **Web Inspector** in the Safari settings of the Vision Pro, and pair it with your Mac. Then open it in the **Develop** menu of Safari on your Mac |

To check which features a session was given, log `app.xr.session.enabledFeatures` once it has started.

## What to Test on a Device {#what-to-test-on-a-device}

An emulator runs your code, but it can't tell you how your application feels. On each device you support, check:

- **The frame rate.** A headset needs a steady frame at its refresh rate, which an emulator on a desktop computer doesn't show. See [Performance](/user-manual/xr/optimizing-webxr/).
- **Comfort.** Movement, turning and anything that moves the user's view without their head moving can make people feel unwell. Try them with people who are new to XR.
- **Scale and legibility.** Check that objects are the size you meant, and that text is readable at the distance you put it.
- **Input.** Each device has its own controllers, or none: a Meta Quest has controllers and hands, an Apple Vision Pro has hands and eyes, and a phone has the touchscreen. See [Input Sources](/user-manual/xr/input-sources/).
- **Leaving and returning.** Open the device's system menu, take the headset off and put it back on, and end the session from the device's own controls. See [Visibility](/user-manual/xr/sessions/#visibility) and [Ending a Session](/user-manual/xr/sessions/#ending-a-session).
- **Permissions.** The browser may ask the user for permission to use XR, the camera or the room's layout. Check what your application does if they decline.

## See Also

- [Getting Started](/user-manual/xr/using-webxr/) - A first VR scene to try in the emulator
- [Troubleshooting](/user-manual/xr/troubleshooting/) - Common problems and their causes
- [Platforms](/user-manual/xr/platforms/) - Devices and browsers, and the features of each
- [Debugging](/user-manual/debugging/) - The engine's debugging tools, which work in XR applications too
