---
title: Getting Started
description: "Set up WebXR in the Engine, the Editor, React and Web Components, build a first VR scene with a camera rig, controller models and an Enter VR button, and try it with or without a headset."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

An XR application is an ordinary PlayCanvas application that can also run in an immersive session. Until the user enters XR, it renders to the canvas on the page like any other. When they press a button to enter VR, the browser hands the display over to the headset. The engine then renders the scene once for each eye, from a camera that follows the user's head. This page sets up XR on each surface and builds a first VR scene: a few shapes on a floor, models of the user's controllers, and a button that enters VR.

<video autoPlay muted loop controls playsInline src="/video/xr-first-vr-scene.mp4" style={{width: '100%', height: 'auto'}} />

## Requirements {#requirements}

Browsers offer WebXR, the web API behind immersive sessions, only when:

- **The page is in a secure context.** Serve it over HTTPS. A page on `http://localhost` also counts as secure, which is enough for a browser on your own computer, but not for a headset that loads the page over your network. See [Testing on a Device](/user-manual/xr/testing/#testing-on-a-device).
- **The user starts the session.** A session can only start in response to a user action, such as a click on a button. A page can't enter XR as it loads, or from a timer.
- **An iframe allows it.** A page in an iframe needs `allow="xr-spatial-tracking"` on its `<iframe>` element. Without it, the browser hides XR from the page, and the engine reports every session type as unavailable.

The graphics device must also be able to present to the headset. WebGL 2 always can. WebGPU can only in a browser that supports WebXR with WebGPU, which few do yet. See [Choosing a Graphics Device](#choosing-a-graphics-device).

## Setting Up {#setting-up}

XR is run by the application's XR manager, an [`XrManager`](https://api.playcanvas.com/engine/classes/XrManager.html) available as `app.xr`. It checks which session types the device supports, starts and ends sessions, and drives the camera and input while a session runs.

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

Pass `XrManager` in the application's options. An application created without it has no `app.xr`:

```javascript
const canvas = document.getElementById('application');
const device = await createGraphicsDevice(canvas, {
    deviceTypes: [DEVICETYPE_WEBGL2]
});

// Render at the full resolution of the display, and of the headset in XR
device.maxPixelRatio = window.devicePixelRatio;

const options = new AppOptions();
options.graphicsDevice = device;
options.xr = XrManager;
options.componentSystems = [
    CameraComponentSystem,
    LightComponentSystem,
    RenderComponentSystem,
    ScriptComponentSystem
];
options.resourceHandlers = [
    ContainerHandler,
    TextureHandler
];

const app = new AppBase(canvas);
app.init(options);
app.setCanvasFillMode(FILLMODE_FILL_WINDOW);
app.setCanvasResolution(RESOLUTION_AUTO);
app.start();

window.addEventListener('resize', () => app.resizeCanvas());
```

`createGraphicsDevice` makes the device compatible with XR whenever the browser supports WebXR. The `ContainerHandler` loads the glTF models of controllers and hands. See [Using the Engine Standalone](/user-manual/engine/standalone/) for the rest of the setup.

</TabItem>
<TabItem value="editor" label="Editor">

Launched and published applications have an XR manager, so there is no code to write. Check two settings in the **RENDERING** section of the [Settings](/user-manual/editor/interface/settings/rendering/) panel:

- **Enable WebGPU.** When it's on, the application uses WebGPU wherever the browser has it, and XR is unavailable in browsers that can't present WebGPU to a headset. Turn it off for an XR application, and leave **Enable WebGL 2.0** on.
- **Device Pixel Ratio.** Turn it on to render at the full resolution of the display, and of the headset in XR. See [Performance](/user-manual/xr/optimizing-webxr/#resolution).

</TabItem>
<TabItem value="react" label="React">

`<Application>` creates the XR manager, and renders with WebGL 2 unless you set its `deviceTypes` prop. To render at the full resolution of the headset, set the graphics device's `maxPixelRatio` as described in [Performance](/user-manual/xr/optimizing-webxr/#resolution).

</TabItem>
<TabItem value="web-components" label="Web Components">

`<pc-app>` creates the XR manager, but renders with WebGPU by default. Ask for WebGL 2 instead:

```html
<pc-app backend="webgl2">
```

See [XR Support](/user-manual/web-components/xr/) for the rest of the Web Components setup.

</TabItem>
</Tabs>

### Choosing a Graphics Device {#choosing-a-graphics-device}

An XR session presents the frames it renders through a binding between WebXR and the graphics API. Every browser with WebXR has the binding for WebGL. Only some have it for WebGPU, such as the Meta Quest Browser and Safari on Apple Vision Pro, while Chrome has it only behind a flag. See [Platforms](/user-manual/xr/platforms/). On a WebGPU device in a browser without it, the engine reports VR and AR as unavailable, so the safe choice for an XR application is WebGL 2.

To use WebGPU where it works with XR, and WebGL 2 elsewhere, ask [`XrManager.isDeviceSupported`](https://api.playcanvas.com/engine/classes/XrManager.html#isdevicesupported) before you create the device. It is a static method, so you can call it before there is an application:

```javascript
const webgpu = await XrManager.isDeviceSupported(DEVICETYPE_WEBGPU, XRTYPE_VR);
const device = await createGraphicsDevice(canvas, {
    deviceTypes: webgpu ? [DEVICETYPE_WEBGPU, DEVICETYPE_WEBGL2] : [DEVICETYPE_WEBGL2]
});
```

It only resolves to `true` while a headset is available, so a desktop browser with no headset gets WebGL 2. In stereo on WebGPU, the engine doesn't yet support grab passes or per-camera post-processing, and GPU depth sensing in AR needs WebGL.

## Your First VR Scene {#your-first-vr-scene}

The scene in the video above has a light, a floor and three shapes. Its camera is the child of an entity called the **rig**, which stands for the user's place in the world. Two of the engine's XR scripts go on the rig:

- [`XrSession`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-session.mjs) starts a VR session when the application fires a `vr:start` event, and ends it on `xr:end` or when the user presses <kbd>Esc</kbd>.
- [`XrControllers`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-controllers.mjs) draws a model of each of the user's controllers or hands.

A button on the page fires `vr:start`. It is shown only while VR is available and no session is running.

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

Add a button to the page:

```html
<button id="enter-vr" hidden>Enter VR</button>
```

With the application set up as above:

```javascript
import { XrControllers } from 'playcanvas/scripts/esm/xr/xr-controllers.mjs';
import { XrSession } from 'playcanvas/scripts/esm/xr/xr-session.mjs';

// A light, a floor and three shapes
const light = new Entity('light');
light.addComponent('light', { type: 'directional' });
light.setEulerAngles(50, 30, 0);
app.root.addChild(light);

const floor = new Entity('floor');
floor.addComponent('render', { type: 'plane' });
floor.setLocalScale(10, 1, 10);
app.root.addChild(floor);

const addShape = (type, color, x, z) => {
    const material = new StandardMaterial();
    material.diffuse = color;
    material.update();

    const shape = new Entity(type);
    shape.addComponent('render', { type, material });
    shape.setPosition(x, 0.5, z);
    app.root.addChild(shape);
};
addShape('box', new Color(1, 0.55, 0.2), -1, -1);
addShape('sphere', new Color(0.3, 0.55, 1), 0, -2);
addShape('cylinder', new Color(0.3, 0.8, 0.45), 1, -1);

// The rig is the user's place in the world, and the camera is its child
const rig = new Entity('rig');
app.root.addChild(rig);

const camera = new Entity('camera');
camera.addComponent('camera', { clearColor: new Color(0.11, 0.12, 0.14) });
camera.setLocalPosition(0, 1.6, 2);
camera.setLocalEulerAngles(-20, 0, 0);
rig.addChild(camera);

rig.addComponent('script');
rig.script.create(XrSession);
rig.script.create(XrControllers);

// Show the button while VR is available and no session is running
const button = document.getElementById('enter-vr');
const update = (inSession) => {
    button.hidden = inSession || !app.xr.isAvailable(XRTYPE_VR);
};
app.xr.on('available', () => update(app.xr.active));
app.xr.on('start', () => update(true));
app.xr.on('end', () => update(false));
update(false);

// XrSession starts a VR session when this event fires
button.addEventListener('click', () => app.fire('vr:start'));
```

The scripts are in the `playcanvas` package, under `scripts/esm/xr/`. Without a bundler, map `playcanvas/scripts/` to that folder in your import map, as [Using the Engine Standalone](/user-manual/engine/standalone/) does for `playcanvas`.

</TabItem>
<TabItem value="editor" label="Editor">

1. Download [`xr-session.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-session.mjs) and [`xr-controllers.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-controllers.mjs) from the engine repository, and drag them into the Assets panel. Each becomes a script asset.
2. In the Hierarchy, select the root entity, click **+** and choose **Entity**. Rename the new entity `Rig`.
3. Drag the `Camera` entity onto `Rig` to make it a child. Set the camera's position to (0, 1.6, 2) and its rotation to (-20, 0, 0).
4. Select `Rig`, add a **Script** component (**ADD COMPONENT** › **Script**), and add the **xrSession** and **xrControllers** scripts to it with **+ ADD SCRIPT**.
5. Add a floor and some shapes to look at, such as a **Plane** scaled to (10, 1, 10) and a few **Box**, **Sphere** and **Cylinder** entities, each 0.5 above the floor.
6. Create a script asset called `enter-vr.mjs`, paste in this script, and add it to the Script component of `Rig`:

    ```javascript
    import { Script, XRTYPE_VR } from 'playcanvas';

    export class EnterVr extends Script {
        static scriptName = 'enterVr';

        initialize() {
            const button = document.createElement('button');
            button.textContent = 'Enter VR';
            button.style.cssText = 'position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%); padding: 12px 24px; font-size: 18px;';
            document.body.appendChild(button);

            // XrSession starts a VR session when this event fires
            button.addEventListener('click', () => this.app.fire('vr:start'));

            // Show the button while VR is available and no session is running
            const update = (inSession) => {
                button.hidden = inSession || !this.app.xr.isAvailable(XRTYPE_VR);
            };
            const onAvailable = () => update(this.app.xr.active);
            const onStart = () => update(true);
            const onEnd = () => update(false);
            this.app.xr.on('available', onAvailable);
            this.app.xr.on('start', onStart);
            this.app.xr.on('end', onEnd);
            update(false);

            this.on('destroy', () => {
                this.app.xr.off('available', onAvailable);
                this.app.xr.off('start', onStart);
                this.app.xr.off('end', onEnd);
                button.remove();
            });
        }
    }
    ```

7. Launch the scene.

The **VR Kit** and **WebXR AR** starter kits on the [Project Dashboard](/user-manual/editor/projects/creating/#starter-kits) are older than the engine's XR scripts: they use classic scripts and a WebXR polyfill. Start new projects from the steps above.

</TabItem>
<TabItem value="react" label="React">

Render `FirstVrScene` inside an `<Application>`:

```jsx
import { useEffect, useState } from 'react';
import { XRTYPE_VR } from 'playcanvas';
import { Entity } from '@playcanvas/react';
import { Camera, Light, Render, Script } from '@playcanvas/react/components';
import { useApp, useMaterial } from '@playcanvas/react/hooks';
import { XrControllers } from 'playcanvas/scripts/esm/xr/xr-controllers.mjs';
import { XrSession } from 'playcanvas/scripts/esm/xr/xr-session.mjs';

// Shown while VR is available and no session is running
function EnterVrButton() {
  const app = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = inSession => setVisible(!inSession && app.xr.isAvailable(XRTYPE_VR));
    const onAvailable = () => update(app.xr.active);
    const onStart = () => update(true);
    const onEnd = () => update(false);
    app.xr.on('available', onAvailable);
    app.xr.on('start', onStart);
    app.xr.on('end', onEnd);
    update(false);
    return () => {
      app.xr.off('available', onAvailable);
      app.xr.off('start', onStart);
      app.xr.off('end', onEnd);
    };
  }, [app]);

  if (!visible) return null;

  // XrSession starts a VR session when this event fires
  return (
    <button className="enter-vr" onClick={() => app.fire('vr:start')}>
      Enter VR
    </button>
  );
}

export function FirstVrScene() {
  const orange = useMaterial({ diffuse: '#ff8c33' });
  const blue = useMaterial({ diffuse: '#4d8cff' });
  const green = useMaterial({ diffuse: '#4dcc73' });

  return (
    <>
      <EnterVrButton />
      <Entity name="light" rotation={[50, 30, 0]}>
        <Light type="directional" />
      </Entity>
      <Entity name="floor" scale={[10, 1, 10]}>
        <Render type="plane" />
      </Entity>
      <Entity name="box" position={[-1, 0.5, -1]}>
        <Render type="box" material={orange} />
      </Entity>
      <Entity name="sphere" position={[0, 0.5, -2]}>
        <Render type="sphere" material={blue} />
      </Entity>
      <Entity name="cylinder" position={[1, 0.5, -1]}>
        <Render type="cylinder" material={green} />
      </Entity>
      <Entity name="rig">
        <Entity name="camera" position={[0, 1.6, 2]} rotation={[-20, 0, 0]}>
          <Camera clearColor="#1d1f24" />
        </Entity>
        <Script script={XrSession} />
        <Script script={XrControllers} />
      </Entity>
    </>
  );
}
```

Position the button over the canvas with CSS, for example with `position: absolute` on the `enter-vr` class.

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-app backend="webgl2">
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-session.mjs"></pc-asset>
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-controllers.mjs"></pc-asset>
    <pc-material id="orange" diffuse="#ff8c33"></pc-material>
    <pc-material id="blue" diffuse="#4d8cff"></pc-material>
    <pc-material id="green" diffuse="#4dcc73"></pc-material>
    <pc-scene>
        <pc-entity name="light" rotation="50 30 0">
            <pc-light type="directional"></pc-light>
        </pc-entity>
        <pc-entity name="floor" scale="10 1 10">
            <pc-render type="plane"></pc-render>
        </pc-entity>
        <pc-entity name="box" position="-1 0.5 -1">
            <pc-render type="box" material="orange"></pc-render>
        </pc-entity>
        <pc-entity name="sphere" position="0 0.5 -2">
            <pc-render type="sphere" material="blue"></pc-render>
        </pc-entity>
        <pc-entity name="cylinder" position="1 0.5 -1">
            <pc-render type="cylinder" material="green"></pc-render>
        </pc-entity>
        <pc-entity name="rig">
            <pc-entity name="camera" position="0 1.6 2" rotation="-20 0 0">
                <pc-camera clear-color="#1d1f24"></pc-camera>
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

    // Show the button while VR is available and no session is running
    const button = document.getElementById('enter-vr');
    const update = (inSession) => {
        button.hidden = inSession || !app.xr.isAvailable(XRTYPE_VR);
    };
    app.xr.on('available', () => update(app.xr.active));
    app.xr.on('start', () => update(true));
    app.xr.on('end', () => update(false));
    update(false);

    // XrSession starts a VR session when this event fires
    button.addEventListener('click', () => app.fire('vr:start'));
</script>
```

Load the scripts from the same version of the engine as the page's import map. See [XR Support](/user-manual/web-components/xr/#xr-scripts).

</TabItem>
</Tabs>

## How It Fits Together {#how-it-fits-together}

The camera rig of the scene above is:

```none
rig          XrSession and XrControllers scripts: the user's place in the world
└── camera   camera component, driven by the headset during a session
```

A few rules follow from it, and the rest of this section builds on them:

- **The headset drives the camera, relative to the rig.** Every frame of a session, the engine sets the camera entity's local position and rotation to the pose of the user's head, and derives its field of view and aspect ratio from the headset's displays. Anything you set on the camera's transform is overwritten. To move the user, by teleporting or walking, move the rig instead. See [The Camera and Its Rig](/user-manual/xr/sessions/#the-camera-and-its-rig).
- **The rig's origin is on the floor of the room.** The scene starts its session in the `local-floor` reference space, whose origin is on the floor near where the user stands, so the camera is at the height of the user's eyes above the rig. See [Reference Spaces](/user-manual/xr/sessions/#reference-spaces).
- **`XrSession` moves the rig when a session starts.** It places the rig on the ground below the camera, facing the way the camera faces across the ground, so the user starts where the page's view was. The camera's tilt doesn't matter: the user's head decides where they look. When the session ends, it puts the rig and the camera back.
- **Input is reported in world space.** The engine applies the rig's transform to the controllers and hands, so they move with the user. `XrControllers` downloads a model for each one from the [WebXR Input Profiles](https://github.com/immersive-web/webxr-input-profiles) repository on a CDN, and draws it at the controller's pose. See [Input Sources](/user-manual/xr/input-sources/).

## Trying It {#trying-it}

You don't need a headset to try the scene. Install the [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik) browser extension in Chrome or Edge, open the page, and select **Enter VR**. The extension shows controls over the page that move the emulated headset and controllers.

To try it on a headset, open the page in the headset's browser over HTTPS. See [Testing and Debugging](/user-manual/xr/testing/) for both, and for the Editor's launch page on a headset.

The engine's VR example is a gallery to walk around:

<EngineExample id="xr/vr-basic" title="VR Basic" />

## See Also

- [Sessions](/user-manual/xr/sessions/) - Session types, reference spaces, the camera rig and the session lifecycle
- [Input Sources](/user-manual/xr/input-sources/) - Controllers, hands, screen taps and their rays
- [UI in XR](/user-manual/user-interface/xr/) - Panels that controllers and hands point at
- [XR Support](/user-manual/web-components/xr/) and [XR in PlayCanvas React](/user-manual/react/guide/xr/) - XR on the Web Components and React surfaces
- [XrManager](https://api.playcanvas.com/engine/classes/XrManager.html) - Reference for the XR manager
