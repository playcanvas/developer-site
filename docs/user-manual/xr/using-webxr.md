---
title: Getting Started
description: Meet the requirements for WebXR, set up XR in the Engine, the Editor, React and Web Components, build a first VR scene with a camera rig and controller models, write code that reacts to XR, and try it with or without a headset.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A WebXR application is an ordinary PlayCanvas application whose camera can enter an immersive session. This page sets XR up on each surface and builds a small VR scene: a floor and some boxes, a camera rig that the headset moves the camera around in, models of the user's controllers or hands, and an **Enter VR** button.

<EngineExample id="xr/vr-basic" title="VR Basic" />

## Requirements {#requirements}

- **A device and browser with WebXR.** Headsets run WebXR in their own browsers, such as the Meta Quest Browser and Safari on Apple Vision Pro, and Android phones run AR in Chrome. See [Platforms](/user-manual/xr/platforms/). You can develop without one, using an emulator (see [Trying It](#trying-it)).
- **A secure context.** Browsers offer WebXR only to pages served over HTTPS, or from `localhost`. The engine's debug build logs a warning when you try to start a session from an insecure page.
- **A user action.** A session can only start in response to something the user does, such as a click, a tap or a key press, so there is no way to enter XR as the page loads.
- **Permission when embedded.** A page in an `<iframe>` gets WebXR only if the frame allows it, with `allow="xr-spatial-tracking"`. Otherwise the engine reports that no session type is available.
- **A graphics backend that can present XR.** Every WebXR browser can present from WebGL 2. Presenting from WebGPU needs the browser's WebXR/WebGPU binding, `XRGPUBinding`, which many browsers don't provide. On a WebGPU device without it, the engine reports XR as unavailable, so choose WebGL 2 for applications that offer XR, as shown below.

## Setting Up {#setting-up}

XR lives in the application's [XR manager](https://api.playcanvas.com/engine/classes/XrManager.html), `app.xr`. The engine's XR scripts, such as `XrSession` and `XrControllers`, are ES modules in the `scripts/esm/xr` folder of the [`playcanvas`](https://www.npmjs.com/package/playcanvas) npm package and the [engine repository](https://github.com/playcanvas/engine/tree/main/scripts/esm/xr).

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

An application created with `pc.AppBase` has an XR manager only if you add `pc.XrManager` to its options. [`pc.Application`](https://api.playcanvas.com/engine/classes/Application.html) adds it for you. Pick the graphics backend before you create the device: the static `XrManager.isDeviceSupported()` tells you whether a session of a type can run on WebGPU on this browser.

```javascript
const canvas = document.getElementById('application');

// Present XR from WebGPU only where the browser can, and from WebGL 2 everywhere else
const webgpu = await pc.XrManager.isDeviceSupported(pc.DEVICETYPE_WEBGPU, pc.XRTYPE_VR);
const device = await pc.createGraphicsDevice(canvas, {
    deviceTypes: [webgpu ? pc.DEVICETYPE_WEBGPU : pc.DEVICETYPE_WEBGL2]
});

const options = new pc.AppOptions();
options.graphicsDevice = device;
options.xr = pc.XrManager;
options.componentSystems = [
    pc.CameraComponentSystem,
    pc.LightComponentSystem,
    pc.RenderComponentSystem,
    pc.ScriptComponentSystem
];

// XrControllers loads the controller and hand models as glTF containers
options.resourceHandlers = [pc.ContainerHandler, pc.TextureHandler];

const app = new pc.AppBase(canvas);
app.init(options);
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);
app.start();

window.addEventListener('resize', () => app.resizeCanvas());
```

Import the XR scripts you use from the npm package:

```javascript
import { XrControllers } from 'playcanvas/scripts/esm/xr/xr-controllers.mjs';
import { XrSession } from 'playcanvas/scripts/esm/xr/xr-session.mjs';
```

</TabItem>
<TabItem value="editor" label="Editor">

Launched and published applications create the XR manager for you. Two things to set up:

1. Open the **RENDERING** section of the [Settings](/user-manual/editor/interface/settings/rendering/) panel and leave **Enable WebGPU** off, so that the application renders with WebGL 2.
2. Add the XR scripts you use to your project as script assets. Download them from the `scripts/esm/xr` folder of the [engine repository](https://github.com/playcanvas/engine/tree/main/scripts/esm/xr) and drag them into the Assets panel. This page uses `xr-session.mjs` and `xr-controllers.mjs`.

XR doesn't run in the Editor's viewport. Launch the scene to try it.

</TabItem>
<TabItem value="react" label="React">

`<Application>` creates the XR manager, and renders with WebGL 2 unless you pass other `deviceTypes`. Import the XR scripts from the `playcanvas` package, which `@playcanvas/react` depends on:

```jsx
import { XrControllers } from 'playcanvas/scripts/esm/xr/xr-controllers.mjs';
import { XrSession } from 'playcanvas/scripts/esm/xr/xr-session.mjs';
```

</TabItem>
<TabItem value="web-components" label="Web Components">

`<pc-app>` creates the XR manager. It renders with WebGPU where it can, so give it `backend="webgl2"`, and declare the XR scripts as [`<pc-asset>`](/user-manual/web-components/tags/pc-asset/) elements:

```html
<pc-app backend="webgl2">
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-controllers.mjs"></pc-asset>
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-session.mjs"></pc-asset>
    <!-- ... -->
</pc-app>
```

Load the scripts from the same version of the engine as the rest of the page. See [XR Support](/user-manual/web-components/xr/#xr-scripts) for loading them from npm instead.

</TabItem>
</Tabs>

## Your First VR Scene {#your-first-vr-scene}

The scene has three parts:

- **Something to look at.** A floor at a height of 0, and four boxes standing on it. One unit is one meter in XR, as in [physics](/user-manual/physics/physics-basics/#units-of-measurement), so build to real-world sizes.
- **A camera rig.** The camera is the child of an entity called `rig`. During a session the headset sets the camera's local position and rotation, and the rig places the user in the scene. The camera starts at a height of 1.6 meters, about eye level, for the view on the page.
- **Two scripts on the rig.** `XrSession` starts a VR session when the application fires the `vr:start` event, and ends it on `xr:end` or the Escape key. When a session starts, it moves the rig to the floor below the camera and turns it to face the way the camera looks, so the user starts where the page's view was. When the session ends, it puts the rig and the camera back where they were. `XrControllers` draws a model of each controller and hand that the device tracks.

The **Enter VR** button is HTML. It shows only while the device can start a VR session, and fires `vr:start` when clicked.

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

With the application set up and the scripts imported as above:

```javascript
// A floor, four boxes standing on it, and a light
const floor = new pc.Entity('floor');
floor.addComponent('render', { type: 'plane' });
floor.setLocalScale(8, 1, 8);
app.root.addChild(floor);

for (const [x, z] of [[-1.5, 0], [1.5, 0], [0, -1.5], [0, 1.5]]) {
    const box = new pc.Entity('box');
    box.addComponent('render', { type: 'box' });
    box.setLocalPosition(x, 0.25, z);
    box.setLocalScale(0.5, 0.5, 0.5);
    app.root.addChild(box);
}

const light = new pc.Entity('light');
light.addComponent('light', {
    type: 'directional',
    castShadows: true,
    shadowBias: 0.2,
    normalOffsetBias: 0.05
});
light.setLocalEulerAngles(45, 30, 0);
app.root.addChild(light);

// The camera rig. The headset moves the camera inside it, and moving the rig moves the user.
const rig = new pc.Entity('rig');
app.root.addChild(rig);

const camera = new pc.Entity('camera');
camera.addComponent('camera', { clearColor: new pc.Color(0.1, 0.11, 0.13) });
camera.setLocalPosition(0, 1.6, 4);
rig.addChild(camera);

// Add the scripts once the camera is in the rig, as XrSession looks for it when it starts
rig.addComponent('script');
rig.script.create(XrSession);
rig.script.create(XrControllers);

// An HTML button over the canvas, shown while the device can start a VR session
const button = document.createElement('button');
button.textContent = 'Enter VR';
button.style.cssText = 'position: absolute; bottom: 24px; left: 50%; translate: -50%; padding: 12px 24px; font-size: 18px';
document.body.appendChild(button);

// Availability is checked after the application starts, and again when devices change
const updateButton = () => {
    button.hidden = !app.xr.isAvailable(pc.XRTYPE_VR);
};
updateButton();
app.xr.on('available', updateButton);

button.addEventListener('click', () => app.fire('vr:start'));
```

</TabItem>
<TabItem value="editor" label="Editor">

1. Build the scene: in the Hierarchy, click **+** and choose **3D › Plane**, and set its scale to (8, 1, 8). Add four **3D › Box** entities with a scale of (0.5, 0.5, 0.5), at the positions (±1.5, 0.25, 0) and (0, 0.25, ±1.5). New scenes already have a camera and a light.
2. Click **+** and choose **New Entity** to add an entity at the origin, and rename it `rig`. Drag the `Camera` entity onto it, so that the camera becomes its child, and set the camera's position to (0, 1.6, 4) and its rotation to (0, 0, 0).
3. Add a **Script** component to `rig`, and add the **xrSession** and **xrControllers** scripts to it.
4. Create a script asset called `enter-vr.mjs` with this script, and add it to the Script component of `rig`:

    ```javascript
    import { Script, XRTYPE_VR } from 'playcanvas';

    export class EnterVr extends Script {
        static scriptName = 'enterVr';

        initialize() {
            // An HTML button over the canvas, shown while the device can start a VR session
            const button = document.createElement('button');
            button.textContent = 'Enter VR';
            button.style.cssText = 'position: absolute; bottom: 24px; left: 50%; translate: -50%; padding: 12px 24px; font-size: 18px';
            document.body.appendChild(button);

            // Availability is checked after the application starts, and again when devices change
            const update = () => {
                button.hidden = !this.app.xr.isAvailable(XRTYPE_VR);
            };
            update();
            const handle = this.app.xr.on('available', update);

            button.addEventListener('click', () => this.app.fire('vr:start'));

            this.once('destroy', () => {
                handle.off();
                button.remove();
            });
        }
    }
    ```

5. Launch the scene. See [Trying It](#trying-it) for opening it in a headset or an emulator.

</TabItem>
<TabItem value="react" label="React">

Render `FirstVrScene`. The button is a React component inside `<Application>`, which renders it after the canvas:

```jsx
import { useEffect, useState } from 'react';
import { XRTYPE_VR } from 'playcanvas';
import { Application, Entity } from '@playcanvas/react';
import { Camera, Light, Render, Script } from '@playcanvas/react/components';
import { useApp } from '@playcanvas/react/hooks';
import { XrControllers } from 'playcanvas/scripts/esm/xr/xr-controllers.mjs';
import { XrSession } from 'playcanvas/scripts/esm/xr/xr-session.mjs';

function EnterVrButton() {
  const app = useApp();
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    // Availability is checked after the application starts, and again when devices change
    const update = () => setAvailable(app.xr.isAvailable(XRTYPE_VR));
    update();
    const handle = app.xr.on('available', update);
    return () => handle.off();
  }, [app]);

  if (!available) return null;

  return (
    <button
      style={{ position: 'absolute', bottom: 24, left: '50%', translate: '-50%', padding: '12px 24px', fontSize: 18 }}
      onClick={() => app.fire('vr:start')}>
      Enter VR
    </button>
  );
}

const boxes = [[-1.5, 0.25, 0], [1.5, 0.25, 0], [0, 0.25, -1.5], [0, 0.25, 1.5]];

export function FirstVrScene() {
  return (
    <Application>
      <Entity name="floor" scale={[8, 1, 8]}>
        <Render type="plane" />
      </Entity>
      {boxes.map((position, i) => (
        <Entity key={i} name="box" position={position} scale={[0.5, 0.5, 0.5]}>
          <Render type="box" />
        </Entity>
      ))}
      <Entity name="light" rotation={[45, 30, 0]}>
        <Light type="directional" castShadows shadowBias={0.2} normalOffsetBias={0.05} />
      </Entity>
      {/* The camera rig. The headset moves the camera inside it. */}
      <Entity name="rig">
        <Entity name="camera" position={[0, 1.6, 4]}>
          <Camera clearColor="#1a1c21" />
        </Entity>
        <Script script={XrSession} />
        <Script script={XrControllers} />
      </Entity>
      <EnterVrButton />
    </Application>
  );
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

A complete page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>First VR Scene</title>
    <script type="importmap">
        {
            "imports": {
                "playcanvas": "https://cdn.jsdelivr.net/npm/playcanvas@latest/build/playcanvas.mjs",
                "@playcanvas/web-components": "https://cdn.jsdelivr.net/npm/@playcanvas/web-components@latest/dist/pwc.mjs"
            }
        }
    </script>
    <script type="module" src="https://cdn.jsdelivr.net/npm/@playcanvas/web-components@latest/dist/pwc.mjs"></script>
    <style>
        body { margin: 0; overflow: hidden; }
        #enter-vr { position: absolute; bottom: 24px; left: 50%; translate: -50%; padding: 12px 24px; font-size: 18px; }
    </style>
</head>
<body>
    <pc-app backend="webgl2">
        <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-controllers.mjs"></pc-asset>
        <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-session.mjs"></pc-asset>
        <pc-scene>
            <pc-entity name="floor" scale="8 1 8">
                <pc-render type="plane"></pc-render>
            </pc-entity>
            <pc-entity name="box" position="-1.5 0.25 0" scale="0.5 0.5 0.5">
                <pc-render type="box"></pc-render>
            </pc-entity>
            <pc-entity name="box" position="1.5 0.25 0" scale="0.5 0.5 0.5">
                <pc-render type="box"></pc-render>
            </pc-entity>
            <pc-entity name="box" position="0 0.25 -1.5" scale="0.5 0.5 0.5">
                <pc-render type="box"></pc-render>
            </pc-entity>
            <pc-entity name="box" position="0 0.25 1.5" scale="0.5 0.5 0.5">
                <pc-render type="box"></pc-render>
            </pc-entity>
            <pc-entity name="light" rotation="45 30 0">
                <pc-light type="directional" cast-shadows shadow-bias="0.2" normal-offset-bias="0.05"></pc-light>
            </pc-entity>
            <!-- The camera rig. The headset moves the camera inside it. -->
            <pc-entity name="rig">
                <pc-entity name="camera" position="0 1.6 4">
                    <pc-camera clear-color="#1a1c21"></pc-camera>
                </pc-entity>
                <pc-script>
                    <pc-script-instance name="xrSession"></pc-script-instance>
                    <pc-script-instance name="xrControllers"></pc-script-instance>
                </pc-script>
            </pc-entity>
        </pc-scene>
    </pc-app>
    <button id="enter-vr" hidden>Enter VR</button>
    <script type="module">
        import { XRTYPE_VR } from 'playcanvas';
        import { whenReady } from '@playcanvas/web-components';

        const { app } = await whenReady('pc-app');
        const button = document.getElementById('enter-vr');

        // Availability is checked after the application starts, and again when devices change
        const update = () => {
            button.hidden = !app.xr.isAvailable(XRTYPE_VR);
        };
        update();
        app.xr.on('available', update);

        button.addEventListener('click', () => app.fire('vr:start'));
    </script>
</body>
</html>
```

</TabItem>
</Tabs>

In the headset, users leave the session with the browser's or the device's own controls, such as the Meta button on a Quest controller. On a desktop with a PC VR headset, they can also press Escape. To give users a way out in the scene, add a menu with the [`XrMenu`](/user-manual/user-interface/xr/#xr-menus) script, whose `xr:end` item ends the session through `XrSession`.

:::tip[A view for the page]

Add the engine's `CameraControls` script to the camera to let users orbit the scene on the page before they enter VR. It stands down while a session runs, so the headset keeps control of the camera.

:::

## Writing XR Code {#writing-xr-code}

Your own XR code talks to the same XR manager on every surface. This code logs each session that starts, and each select, such as a trigger press or a pinch:

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

`app.xr` is available wherever your code has the application:

```javascript
app.xr.on('start', () => {
    console.log(`Started a session of type ${app.xr.type}`);
});

app.xr.input.on('select', (inputSource) => {
    console.log(`Select from the ${inputSource.handedness} hand`);
});
```

</TabItem>
<TabItem value="editor" label="Editor">

Write a script that uses `this.app.xr`, and attach it to any entity in the scene. Remove its listeners when it is destroyed, for example when its entity is deleted, so that they don't outlive it:

```javascript
import { Script } from 'playcanvas';

export class XrLogger extends Script {
    static scriptName = 'xrLogger';

    initialize() {
        const handles = [
            this.app.xr.on('start', () => {
                console.log(`Started a session of type ${this.app.xr.type}`);
            }),
            this.app.xr.input.on('select', (inputSource) => {
                console.log(`Select from the ${inputSource.handedness} hand`);
            })
        ];

        this.once('destroy', () => handles.forEach(handle => handle.off()));
    }
}
```

</TabItem>
<TabItem value="react" label="React">

Get the application with `useApp()`, and subscribe in an effect that unsubscribes when it is cleaned up:

```jsx
import { useEffect } from 'react';
import { useApp } from '@playcanvas/react/hooks';

export function XrLogger() {
  const app = useApp();

  useEffect(() => {
    const handles = [
      app.xr.on('start', () => {
        console.log(`Started a session of type ${app.xr.type}`);
      }),
      app.xr.input.on('select', (inputSource) => {
        console.log(`Select from the ${inputSource.handedness} hand`);
      })
    ];
    return () => handles.forEach(handle => handle.off());
  }, [app]);

  return null;
}
```

Render `<XrLogger />` anywhere inside `<Application>`. A script class like the Editor's works too, attached with `<Script script={XrLogger} />`.

</TabItem>
<TabItem value="web-components" label="Web Components">

Wait for the application, then use `app.xr`:

```javascript
import { whenReady } from '@playcanvas/web-components';

const { app } = await whenReady('pc-app');

app.xr.on('start', () => {
    console.log(`Started a session of type ${app.xr.type}`);
});

app.xr.input.on('select', (inputSource) => {
    console.log(`Select from the ${inputSource.handedness} hand`);
});
```

A script class like the Editor's works too: declare its file with `<pc-asset>`, and attach it with `<pc-script-instance name="xrLogger">`.

</TabItem>
</Tabs>

The rest of this section shows engine code that uses `app`. In a script, the same code uses `this.app`.

## Trying It {#trying-it}

- **In a headset.** Open the page in the headset's browser. It needs to be served over HTTPS, or reach the headset as `localhost`. In the Editor, open the launch page in the headset's browser while signed in to PlayCanvas, or publish the project and open the build's URL. Click **Enter VR**, and look around.
- **Without a headset.** Install Meta's [Immersive Web Emulator](https://github.com/meta-quest/immersive-web-emulator) extension in Chrome or Edge. It emulates a Meta Quest headset with its controllers or hands, and draws controls over the page to move them. The **Enter VR** button appears, and the session renders into the page.

[Testing and Debugging](/user-manual/xr/testing/) covers serving pages to devices, emulators and remote debugging in detail.

## See Also

- [Sessions](/user-manual/xr/sessions/) - Starting and ending sessions, reference spaces and features, the next thing to read
- [Input Sources](/user-manual/xr/input-sources/) - Controllers, hands and the actions they send
- [UI in XR](/user-manual/user-interface/xr/) - Menus and panels in the scene
- [WebXR Hello World](/tutorials/webxr-hello-world/) - Tutorial that enters VR from an Editor project
