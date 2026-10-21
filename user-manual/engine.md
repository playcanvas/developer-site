# PlayCanvas Engine

The PlayCanvas Engine is an open-source 3D engine for the web. It renders with WebGPU or WebGL 2 in any modern browser, on desktop and mobile, and it's the foundation that the [Editor](https://developer.playcanvas.com/user-manual/editor.md), [PlayCanvas React](https://developer.playcanvas.com/user-manual/react.md) and [Web Components](https://developer.playcanvas.com/user-manual/web-components.md) are built on.

[Interactive demo: Tropical islands with palm trees on a rippling turquoise sea](https://playcanvas.com/examples/iframe/graphics_water.html)

[Get Started →](https://developer.playcanvas.com/user-manual/engine/standalone.md)
[Browse the Examples](https://playcanvas.com/examples/)
[API Reference](https://api.playcanvas.com/engine/)

## Your First App

This is a complete Engine app. It is running right here in the page, and you can edit it: the preview reruns as you type.

```js live-example
import * as pc from 'playcanvas';

// create a graphics device, preferring WebGPU over WebGL 2
const canvas = document.getElementById('application');
const device = await pc.createGraphicsDevice(canvas, {
    deviceTypes: [pc.DEVICETYPE_WEBGPU]
});
device.maxPixelRatio = Math.min(window.devicePixelRatio, 2);

// create an application with the component systems it uses
const options = new pc.AppOptions();
options.graphicsDevice = device;
options.componentSystems = [
    pc.RenderComponentSystem,
    pc.CameraComponentSystem,
    pc.LightComponentSystem
];

const app = new pc.AppBase(canvas);
app.init(options);
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);
window.addEventListener('resize', () => app.resizeCanvas());
app.start();

// light the scene softly from all around
app.scene.ambientLight = new pc.Color(0.3, 0.3, 0.35);

// create a camera looking down at the middle of the grid
const camera = new pc.Entity('camera');
camera.addComponent('camera', {
    clearColor: new pc.Color(0.12, 0.14, 0.17)
});
camera.setPosition(0, 7, 17);
camera.lookAt(0, 0, 0);
app.root.addChild(camera);

// create a sun that casts shadows
const light = new pc.Entity('light');
light.addComponent('light', {
    castShadows: true,
    shadowDistance: 40,
    shadowBias: 0.2,
    normalOffsetBias: 0.05
});
light.setEulerAngles(45, 30, 0);
app.root.addChild(light);

// create a grid of boxes, shading from orange in the middle to purple at the edges
const size = 10;
const orange = new pc.Color(1, 0.4, 0.1);
const purple = new pc.Color(0.4, 0.2, 1);
const boxes = [];
for (let x = -size; x <= size; x++) {
    for (let z = -size; z <= size; z++) {
        const material = new pc.StandardMaterial();
        material.diffuse.lerp(orange, purple, Math.hypot(x, z) / (size * 1.5));
        material.update();

        const box = new pc.Entity();
        box.addComponent('render', { type: 'box', material: material });
        box.setPosition(x, 0, z);
        app.root.addChild(box);
        boxes.push(box);
    }
}

// every frame, ripple the boxes' heights out from the middle
let time = 0;
app.on('update', (dt) => {
    time += dt;
    for (const box of boxes) {
        const { x, z } = box.getPosition();
        const height = 2.2 + 2 * Math.sin(time * 3 - Math.hypot(x, z) * 0.5);
        box.setLocalScale(0.9, height, 0.9);
    }
});
```

The first lines are the same in every Engine app. [`createGraphicsDevice`](https://api.playcanvas.com/engine/functions/createGraphicsDevice.html) asks for WebGPU and falls back to WebGL 2 where the browser doesn't support it. [`AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html) is the application: it runs the frame loop, but only the component systems you register, so a bundler can leave the others out of your build. Everything in the scene is an [entity](https://developer.playcanvas.com/user-manual/ecs/entities.md) in a hierarchy under `app.root`, and components give each entity its abilities: here a camera, a sun that casts shadows, and 441 boxes, each rendered with its own [material](https://developer.playcanvas.com/user-manual/graphics/physical-rendering/physical-materials.md). Every frame, the `update` event passes your code the time since the last one, which it uses to ripple the boxes. Some things to try:

- Speed the ripple up by raising the `3` in `time * 3`, or tighten its rings by raising the `0.5`.
- Swap `orange` and `purple` for any two colors you like.
- Grow the grid by changing `size` to `20`: that's 1,681 boxes.
- Turn the boxes into columns with `type: 'cylinder'`.

To build an app like this on your own machine, run `npm create playcanvas@latest` and pick the Engine format, or follow [Using the Engine Standalone](https://developer.playcanvas.com/user-manual/engine/standalone.md) to set a project up by hand.

## What You Can Build

Engine apps run in the browser, so whatever you build is a link away for anyone, on any device. These are some of the things developers build with it:

[A catapult on a grassy slope launching a burning boulder at soldiers in a valley](https://playcanvas.com/examples/#/demos/catapult): GamesBrowser and mobile games that start from a link, with nothing to install. This siege game is built entirely with the engine. Play the demo →
[A blue running shoe beside a panel of style options](https://playcanvas.com/examples/#/misc/html-texture-configurator): Product ConfiguratorsLet shoppers restyle a product in real time. This shoe switches between glTF material variants from an HTML panel rendered in 3D. Try the demo →
[A Gaussian splat capture of a skate park surrounded by trees](https://playcanvas.com/examples/#/gaussian-splatting/world): Gaussian Splat AppsViewers, tours and games built on photoreal captures. This skate park streams in by level of detail as you move. Explore the demo →
[Two tracked hands in VR, each casting a pointer ray](https://developer.playcanvas.com/user-manual/xr.md): XR AppsVR and AR that open straight from a link with WebXR, on headsets and phones, with controller and hand tracking. Read the XR guide →
[The catapult game running in portrait on a phone](https://developer.playcanvas.com/user-manual/editor/publishing/playable-ads.md): Playable AdsPackage a game like the catapult as an interactive ad, and export it from the Editor for Facebook and Snapchat. Publish a playable ad →
[The Sun beside a panel of facts about it](https://playcanvas.github.io/web-components/examples/#solar-system.html): EducationInteractive lessons and explainers. This scroll-driven tour of the solar system is a single HTML page built with Web Components. Explore the demo →

The [examples browser](https://playcanvas.com/examples/) has more than 250 live examples, from volumetric fog and dynamic skies to crowds of thousands of animated characters, each with source code you can edit.

<small>Models: [Tropical Island](https://sketchfab.com/3d-models/tropical-island-f91862f8c38b481aa19edccac851eefb) by Elin (in the demo at the top of the page), [Catapult](https://sketchfab.com/3d-models/atapult-1c33623dbe0049b98be97a750f27b51b) by AlexJJ, [Low Poly Lumberjack](https://sketchfab.com/3d-models/low-poly-lumberjack-a93a29105fc44bf594f8100b7726bcec) by Daz and [Materials Variants Shoe](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/MaterialsVariantsShoe) by Shopify, all [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Skatepark splat by [Christoph Schindelar](https://superspl.at/user?id=schindelar3d).</small>

## Why the PlayCanvas Engine?

- **WebGPU and WebGL 2 from one codebase.** Ask for WebGPU and the engine falls back to WebGL 2 in browsers that don't support it yet, with the same API and the same look. See [Supported Browsers](https://developer.playcanvas.com/user-manual/engine/supported-browsers.md) for where each one runs.
- **Batteries included.** Rigid-body [physics](https://developer.playcanvas.com/user-manual/physics.md), state-based [animation](https://developer.playcanvas.com/user-manual/animation.md), positional sound, 2D and 3D [user interfaces](https://developer.playcanvas.com/user-manual/user-interface.md), [WebXR](https://developer.playcanvas.com/user-manual/xr.md) for AR and VR, [Gaussian splats](https://developer.playcanvas.com/user-manual/gaussian-splatting.md), and mouse, keyboard, touch and gamepad input are all built in. The package also ships [ready-made scripts](https://github.com/playcanvas/engine/tree/main/scripts/esm) for camera controls, character controllers, XR, post effects and more.
- **Lean by design.** The engine is published as ES modules, and `AppBase` runs only the component systems and resource handlers you register, so a bundler can leave out the ones your app doesn't use.
- **Assets that load fast.** Models load from [glTF 2.0](https://developer.playcanvas.com/user-manual/assets/supported-formats.md) files with Draco geometry and Basis texture compression, and large Gaussian splat scenes [stream in by level of detail](https://developer.playcanvas.com/user-manual/gaussian-splatting/building/lod-streaming.md) as the camera moves.
- **TypeScript ready.** The npm package ships complete TypeScript declarations, so your editor can complete and check every class, method and property, whether you write TypeScript or JavaScript.
- **Runs where JavaScript runs.** As well as in the browser, the engine [runs headless in Node.js](https://developer.playcanvas.com/user-manual/engine/running-in-node.md), for multiplayer servers, asset tools and unit tests.
- **Open source and proven in production.** The engine is developed in the open [on GitHub](https://github.com/playcanvas/engine) under the MIT license, free for personal and commercial projects. It powers the PlayCanvas Editor and [SuperSplat](https://developer.playcanvas.com/user-manual/supersplat.md), as well as every app built with the Editor, PlayCanvas React or Web Components.

## One Engine, Four Ways to Use It

Every PlayCanvas product drives this engine, so choose the way of working that suits you. What you learn about entities, components, materials and scripts carries over between them.

[🦾 Write code against the Engine](https://developer.playcanvas.com/user-manual/engine/standalone.md): Create the app, its entities and their components yourself in JavaScript or TypeScript, with full control over the frame loop and every system. Using the Engine Standalone →
[🛠️ Build visually in the Editor](https://developer.playcanvas.com/user-manual/editor.md): Compose scenes with your team in a browser-based editor, and attach scripts that call the same Engine API. PlayCanvas Editor →
[⚛️ Use React](https://developer.playcanvas.com/user-manual/react.md): Describe your scene as JSX components, with hooks for assets, materials, physics and input. PlayCanvas React →
[🧩 Write HTML](https://developer.playcanvas.com/user-manual/web-components.md): Build scenes from <pc-*> tags in a plain web page, with no build step. PlayCanvas Web Components →

## Explore the Engine

The engine's features are documented by topic, and each topic applies whichever way you use the engine.

| Topic | What it covers |
| --- | --- |
| [Entity Component System](https://developer.playcanvas.com/user-manual/ecs.md) | Entities, components and the scene hierarchy |
| [Scripting](https://developer.playcanvas.com/user-manual/scripting.md) | Script classes, their lifecycle, attributes and events |
| [Assets](https://developer.playcanvas.com/user-manual/assets.md) | Loading and managing models, textures and other files at runtime |
| [Graphics](https://developer.playcanvas.com/user-manual/graphics.md) | Cameras, meshes, lighting, materials, shaders, post effects and particles |
| [Gaussian Splatting](https://developer.playcanvas.com/user-manual/gaussian-splatting.md) | Rendering, streaming and customizing 3D Gaussian splats |
| [Animation](https://developer.playcanvas.com/user-manual/animation.md) | Animation state graphs, layer masks and animation events |
| [Physics](https://developer.playcanvas.com/user-manual/physics.md) | Rigid bodies, collision, triggers, ray casts and joints |
| [2D](https://developer.playcanvas.com/user-manual/2D.md) | Sprites, 9-slicing, texture atlases and Spine |
| [User Interface](https://developer.playcanvas.com/user-manual/user-interface.md) | Screens, layout, text, images and input, on screen or in the 3D world |
| [XR](https://developer.playcanvas.com/user-manual/xr.md) | Immersive AR and VR with WebXR, including input and hand tracking |
| [Optimization](https://developer.playcanvas.com/user-manual/optimization.md) | Profiling and tuning load time, frame rate and memory |

## In This Section

- [Using the Engine Standalone](https://developer.playcanvas.com/user-manual/engine/standalone.md) — set up a project with npm and Vite, or with an import map and a CDN.
- [Running the Engine in Node.js](https://developer.playcanvas.com/user-manual/engine/running-in-node.md) — run headless apps for servers, tools and tests.
- [Versioning and Releases](https://developer.playcanvas.com/user-manual/engine/versioning.md) — version numbers, npm tags and how to control which updates you get.
- [Engine Migrations](https://developer.playcanvas.com/user-manual/engine/migrations.md) — breaking changes and how to update your code.
- [Supported Browsers](https://developer.playcanvas.com/user-manual/engine/supported-browsers.md) — minimum browser versions for WebGL 2 and WebGPU.
- [Developing with AI](https://developer.playcanvas.com/user-manual/engine/developing-with-ai.md) — set up a coding agent on an Engine project and verify its changes.
- [Examples](https://playcanvas.com/examples/) — more than 250 live examples with editable source code.
- [API Reference](https://api.playcanvas.com/engine/) — every class, method and property.

## Stay in the Loop

- [GitHub](https://github.com/playcanvas/engine) for the source code, issues and pull requests, and [release notes](https://github.com/playcanvas/engine/releases) for every version
- [The PlayCanvas blog](https://blog.playcanvas.com/) for Engine news
- [Discord](https://discord.gg/RSaMRzg) and the [forum](https://forum.playcanvas.com/) for questions and sharing your work
- [The Engine's AI-readable documentation index](https://developer.playcanvas.com/user-manual/engine/llms.txt) for coding agents
