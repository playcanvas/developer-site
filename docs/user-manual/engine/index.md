---
title: PlayCanvas Engine
description: "The open-source 3D engine for the web that every PlayCanvas product is built on: a live demo, a first app to edit in the page, showcase examples, the ways to use the engine, and where to go next."
---

import Link from '@docusaurus/Link';

The PlayCanvas Engine is an open-source 3D engine for the web. It renders with WebGPU or WebGL 2 in any modern browser, on desktop and mobile, and it's the foundation that the [Editor](../editor/index.md), [PlayCanvas React](../react/index.mdx) and [Web Components](../web-components/index.md) are built on.

<div className="iframe-container">
    <iframe src="https://playcanvas.com/examples/iframe/graphics_water.html" title="Tropical islands with palm trees on a rippling turquoise sea" allow="fullscreen" allowFullScreen loading="lazy"></iframe>
</div>

<div className="cta-buttons">
    <Link className="button button--primary button--lg" to="/user-manual/engine/standalone/">Get Started →</Link>
    <Link className="button button--secondary button--lg" to="https://playcanvas.com/examples/">Browse the Examples</Link>
    <Link className="button button--secondary button--lg" to="https://api.playcanvas.com/engine/">API Reference</Link>
</div>

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

The first lines are the same in every Engine app. [`createGraphicsDevice`](https://api.playcanvas.com/engine/functions/createGraphicsDevice.html) asks for WebGPU and falls back to WebGL 2 where the browser doesn't support it. [`AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html) is the application: it runs the frame loop, but only the component systems you register, so a bundler can leave the others out of your build. Everything in the scene is an [entity](../ecs/entities.md) in a hierarchy under `app.root`, and components give each entity its abilities: here a camera, a sun that casts shadows, and 441 boxes, each rendered with its own [material](../graphics/physical-rendering/physical-materials.md). Every frame, the `update` event passes your code the time since the last one, which it uses to ripple the boxes. Some things to try:

- Speed the ripple up by raising the `3` in `time * 3`, or tighten its rings by raising the `0.5`.
- Swap `orange` and `purple` for any two colors you like.
- Grow the grid by changing `size` to `20`: that's 1,681 boxes.
- Turn the boxes into columns with `type: 'cylinder'`.

To build an app like this on your own machine, run `npm create playcanvas@latest` and pick the Engine format, or follow [Using the Engine Standalone](standalone.md) to set a project up by hand.

## What You Can Build

Engine apps run in the browser, so whatever you build is a link away for anyone, on any device. These are some of the things developers build with it:

<div className="row path-cards">
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="https://playcanvas.com/examples/#/demos/catapult">
      <div className="card__image"><img src="/img/user-manual/engine/showcases/catapult.jpg" alt="A catapult on a grassy slope launching a burning boulder at soldiers in a valley" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>Games</h3><p>Browser and mobile games that start from a link, with nothing to install. This siege game is built entirely with the engine.</p></div>
      <div className="card__footer">Play the demo →</div>
    </Link>
  </div>
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="https://playcanvas.com/examples/#/misc/html-texture-configurator">
      <div className="card__image"><img src="/img/user-manual/engine/showcases/product-configurator.jpg" alt="A blue running shoe beside a panel of style options" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>Product Configurators</h3><p>Let shoppers restyle a product in real time. This shoe switches between glTF material variants from an HTML panel rendered in 3D.</p></div>
      <div className="card__footer">Try the demo →</div>
    </Link>
  </div>
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="https://playcanvas.com/examples/#/gaussian-splatting/world">
      <div className="card__image"><img src="/img/user-manual/engine/showcases/gaussian-splat-world.jpg" alt="A Gaussian splat capture of a skate park surrounded by trees" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>Gaussian Splat Apps</h3><p>Viewers, tours and games built on photoreal captures. This skate park streams in by level of detail as you move.</p></div>
      <div className="card__footer">Explore the demo →</div>
    </Link>
  </div>
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="/user-manual/xr/">
      <div className="card__image"><img src="/img/user-manual/xr/skinned-hands.webp" alt="Two tracked hands in VR, each casting a pointer ray" width="1024" height="720" loading="lazy" /></div>
      <div className="card__body"><h3>XR Apps</h3><p>VR and AR that open straight from a link with WebXR, on headsets and phones, with controller and hand tracking.</p></div>
      <div className="card__footer">Read the XR guide →</div>
    </Link>
  </div>
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="/user-manual/editor/publishing/playable-ads/">
      <div className="card__image"><img src="/img/user-manual/engine/showcases/playable-ad.jpg" alt="The catapult game running in portrait on a phone" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>Playable Ads</h3><p>Package a game like the catapult as an interactive ad, and export it from the Editor for Facebook and Snapchat.</p></div>
      <div className="card__footer">Publish a playable ad →</div>
    </Link>
  </div>
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="https://playcanvas.github.io/web-components/examples/#solar-system.html">
      <div className="card__image"><img src="/img/user-manual/web-components/showcases/solar-system.jpg" alt="The Sun beside a panel of facts about it" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>Education</h3><p>Interactive lessons and explainers. This scroll-driven tour of the solar system is a single HTML page built with Web Components.</p></div>
      <div className="card__footer">Explore the demo →</div>
    </Link>
  </div>
</div>

The [examples browser](https://playcanvas.com/examples/) has more than 250 live examples, from volumetric fog and dynamic skies to crowds of thousands of animated characters, each with source code you can edit.

<small>Models: [Tropical Island](https://sketchfab.com/3d-models/tropical-island-f91862f8c38b481aa19edccac851eefb) by Elin (in the demo at the top of the page), [Catapult](https://sketchfab.com/3d-models/atapult-1c33623dbe0049b98be97a750f27b51b) by AlexJJ, [Low Poly Lumberjack](https://sketchfab.com/3d-models/low-poly-lumberjack-a93a29105fc44bf594f8100b7726bcec) by Daz and [Materials Variants Shoe](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/MaterialsVariantsShoe) by Shopify, all [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Skatepark splat by [Christoph Schindelar](https://superspl.at/user?id=schindelar3d).</small>

## Why the PlayCanvas Engine?

- **WebGPU and WebGL 2 from one codebase.** Ask for WebGPU and the engine falls back to WebGL 2 in browsers that don't support it yet, with the same API and the same look. See [Supported Browsers](supported-browsers.md) for where each one runs.
- **Batteries included.** Rigid-body [physics](../physics/index.md), state-based [animation](../animation/index.md), positional sound, 2D and 3D [user interfaces](../user-interface/index.md), [WebXR](../xr/index.md) for AR and VR, [Gaussian splats](../gaussian-splatting/index.md), and mouse, keyboard, touch and gamepad input are all built in. The package also ships [ready-made scripts](https://github.com/playcanvas/engine/tree/main/scripts/esm) for camera controls, character controllers, XR, post effects and more.
- **Lean by design.** The engine is published as ES modules, and `AppBase` runs only the component systems and resource handlers you register, so a bundler can leave out the ones your app doesn't use.
- **Assets that load fast.** Models load from [glTF 2.0](../assets/supported-formats.md) files with Draco geometry and Basis texture compression, and large Gaussian splat scenes [stream in by level of detail](../gaussian-splatting/building/lod-streaming.md) as the camera moves.
- **TypeScript ready.** The npm package ships complete TypeScript declarations, so your editor can complete and check every class, method and property, whether you write TypeScript or JavaScript.
- **Runs where JavaScript runs.** As well as in the browser, the engine [runs headless in Node.js](running-in-node.md), for multiplayer servers, asset tools and unit tests.
- **Open source and proven in production.** The engine is developed in the open [on GitHub](https://github.com/playcanvas/engine) under the MIT license, free for personal and commercial projects. It powers the PlayCanvas Editor and [SuperSplat](../supersplat/index.md), as well as every app built with the Editor, PlayCanvas React or Web Components.

## One Engine, Four Ways to Use It

Every PlayCanvas product drives this engine, so choose the way of working that suits you. What you learn about entities, components, materials and scripts carries over between them.

<div className="row path-cards">
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/engine/standalone/">
      <div className="card__header"><h3>🦾 Write code against the Engine</h3></div>
      <div className="card__body"><p>Create the app, its entities and their components yourself in JavaScript or TypeScript, with full control over the frame loop and every system.</p></div>
      <div className="card__footer">Using the Engine Standalone →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/editor/">
      <div className="card__header"><h3>🛠️ Build visually in the Editor</h3></div>
      <div className="card__body"><p>Compose scenes with your team in a browser-based editor, and attach scripts that call the same Engine API.</p></div>
      <div className="card__footer">PlayCanvas Editor →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/react/">
      <div className="card__header"><h3>⚛️ Use React</h3></div>
      <div className="card__body"><p>Describe your scene as JSX components, with hooks for assets, materials, physics and input.</p></div>
      <div className="card__footer">PlayCanvas React →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/web-components/">
      <div className="card__header"><h3>🧩 Write HTML</h3></div>
      <div className="card__body"><p>Build scenes from <code>&lt;pc-*&gt;</code> tags in a plain web page, with no build step.</p></div>
      <div className="card__footer">PlayCanvas Web Components →</div>
    </Link>
  </div>
</div>

## Explore the Engine

The engine's features are documented by topic, and each topic applies whichever way you use the engine.

| Topic | What it covers |
| --- | --- |
| [Entity Component System](../ecs/index.md) | Entities, components and the scene hierarchy |
| [Scripting](../scripting/index.md) | Script classes, their lifecycle, attributes and events |
| [Assets](../assets/index.md) | Loading and managing models, textures and other files at runtime |
| [Graphics](../graphics/index.md) | Cameras, meshes, lighting, materials, shaders, post effects and particles |
| [Gaussian Splatting](../gaussian-splatting/index.md) | Rendering, streaming and customizing 3D Gaussian splats |
| [Animation](../animation/index.md) | Animation state graphs, layer masks and animation events |
| [Physics](../physics/index.md) | Rigid bodies, collision, triggers, ray casts and joints |
| [2D](../2D/index.md) | Sprites, 9-slicing, texture atlases and Spine |
| [User Interface](../user-interface/index.md) | Screens, layout, text, images and input, on screen or in the 3D world |
| [XR](../xr/index.md) | Immersive AR and VR with WebXR, including input and hand tracking |
| [Optimization](../optimization/index.md) | Profiling and tuning load time, frame rate and memory |

## In This Section

- [Using the Engine Standalone](standalone.md) — set up a project with npm and Vite, or with an import map and a CDN.
- [Running the Engine in Node.js](running-in-node.md) — run headless apps for servers, tools and tests.
- [Versioning and Releases](versioning.md) — version numbers, npm tags and how to control which updates you get.
- [Engine Migrations](migrations.md) — breaking changes and how to update your code.
- [Supported Browsers](supported-browsers.md) — minimum browser versions for WebGL 2 and WebGPU.
- [Developing with AI](developing-with-ai.md) — set up a coding agent on an Engine project and verify its changes.
- [Examples](https://playcanvas.com/examples/) — more than 250 live examples with editable source code.
- [API Reference](https://api.playcanvas.com/engine/) — every class, method and property.

## Stay in the Loop

- [GitHub](https://github.com/playcanvas/engine) for the source code, issues and pull requests, and [release notes](https://github.com/playcanvas/engine/releases) for every version
- [The PlayCanvas blog](https://blog.playcanvas.com/) for Engine news
- [Discord](https://discord.gg/RSaMRzg) and the [forum](https://forum.playcanvas.com/) for questions and sharing your work
- [The Engine's AI-readable documentation index](https://developer.playcanvas.com/user-manual/engine/llms.txt) for coding agents
