---
title: PlayCanvas Web Components
description: "Build interactive 3D for the web in HTML: custom elements that wrap the PlayCanvas Engine. A live demo, a first scene to edit in the page, showcase examples, and where to go next."
---

import Link from '@docusaurus/Link';

PlayCanvas Web Components let you put real-time 3D on a web page with nothing but HTML. Each `<pc-*>` tag wraps a piece of the [PlayCanvas Engine](../engine/index.md) — an app, a scene, a camera, a light — so you compose interactive 3D scenes the same way you compose the rest of your page: with markup.

<div className="iframe-container">
    <iframe src="https://playcanvas.github.io/web-components/examples/#golden-meadow.html" title="Golden Meadow — a meadow at golden hour, built with PlayCanvas Web Components" allow="fullscreen; xr-spatial-tracking" allowFullScreen loading="lazy"></iframe>
</div>

Drag to look around the meadow above. Its camera, sun, haze and sound are HTML elements, and so are the scripts that paint its sky and generate its terrain, trees and grass. It's one of [40+ live examples](https://playcanvas.github.io/web-components/examples/) you can explore, complete with source code.

<div className="cta-buttons">
    <Link className="button button--primary button--lg" to="/user-manual/web-components/getting-started/">Get Started →</Link>
    <Link className="button button--secondary button--lg" to="https://playcanvas.github.io/web-components/examples/">Browse the Examples</Link>
</div>

## Your First Scene

This is a complete 3D scene. It is running right here in the page, and you can edit it: the preview re-runs as you type.

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 0 3">
            <pc-camera></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 45 0">
            <pc-light></pc-light>
        </pc-entity>
        <pc-entity name="ball">
            <pc-render type="sphere"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

`<pc-app>` is the canvas and `<pc-scene>` is the world inside it. Each `<pc-entity>` is an object with a position in that world, and the tags inside an entity give it abilities: this one is a camera, that one is a light, the third renders a sphere. Some things to try:

- Change the ball's `type="sphere"` to `"cone"`, `"capsule"` or `"cylinder"`.
- Tint the light with `<pc-light color="orange">`.
- Paint the background with `<pc-camera clear-color="midnightblue">`.
- Duplicate the ball entity and move the copy aside with `position="1.2 0 0"`.

To put a scene like this on a page of your own, add the two `<script>` tags that load the library. [Getting Started](getting-started.md) has the complete file.

## What You Can Build

The same tags scale from one sphere to complete, polished experiences. Each of these showcases is a single HTML page: open it to explore it live, read its source and remix it on StackBlitz.

<div className="row path-cards">
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="https://playcanvas.github.io/web-components/examples/#car-configurator.html">
      <div className="card__image"><img src="/img/user-manual/web-components/showcases/car-configurator.jpg" alt="A silver sports car above a row of paint swatches" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>Car Configurator</h3><p>Pick a paint and watch a sports car change color.</p></div>
    </Link>
  </div>
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="https://playcanvas.github.io/web-components/examples/#product-viewer.html">
      <div className="card__image"><img src="/img/user-manual/web-components/showcases/product-viewer.jpg" alt="A camera drone beside a panel with Explode all and Reset buttons" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>Product Viewer</h3><p>Hover a drone's parts to highlight them, and click to pull them out of the assembly.</p></div>
    </Link>
  </div>
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="https://playcanvas.github.io/web-components/examples/#solar-system.html">
      <div className="card__image"><img src="/img/user-manual/web-components/showcases/solar-system.jpg" alt="The Sun beside a panel of facts about it" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>Solar System</h3><p>Scroll the page to travel from the Sun out past eight worlds.</p></div>
    </Link>
  </div>
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="https://playcanvas.github.io/web-components/examples/#basic-splat.html">
      <div className="card__image"><img src="/img/user-manual/web-components/showcases/basic-splat.jpg" alt="A Gaussian splat capture of a marble angel in a domed hall" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>Gaussian Splats</h3><p>Render a photoreal 3D capture with the <code>&lt;pc-gsplat&gt;</code> tag.</p></div>
    </Link>
  </div>
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="https://playcanvas.github.io/web-components/examples/#third-person-controller.html">
      <div className="card__image"><img src="/img/user-manual/web-components/showcases/third-person-controller.jpg" alt="An animated character standing in a stone courtyard under great arches" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>Third Person Controller</h3><p>Walk, run and jump through a courtyard, with physics and blended animation.</p></div>
    </Link>
  </div>
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="https://playcanvas.github.io/web-components/examples/#clock-tower.html">
      <div className="card__image"><img src="/img/user-manual/web-components/showcases/clock-tower.jpg" alt="A lamp lighting the mechanism behind a clock face in a dusty belfry" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>Clock Tower</h3><p>A clock mechanism set to your local time, with dusty light and chimes.</p></div>
    </Link>
  </div>
</div>

The [examples browser](https://playcanvas.github.io/web-components/examples/) has more, including webcam AR, vehicles and ragdolls, particles, positional sound, and 2D and 3D user interfaces.

## Why PlayCanvas Web Components?

- **HTML is the whole API.** Build complete, interactive scenes in markup, with no build step and no engine boilerplate. Reach for JavaScript only when you want [custom behavior](scripting.md).
- **Every attribute is live.** Change an attribute from JavaScript, from a framework or straight from your browser's dev tools, and the scene updates instantly. See [Attributes](attributes.md) for the shared conventions.
- **The full engine underneath.** This is not a simplified toy layer. The same [PlayCanvas Engine](../engine/index.md) that powers thousands of web applications does the rendering, WebGPU-first with automatic fallback to WebGL 2. When you need more than the tags offer, every element [hands you its engine object](programmatic-access.md).
- **A web standard, not a framework.** The components are [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements), so they work in a plain HTML page or alongside any framework that renders to the DOM. All they ask of a browser is WebGL 2 or WebGPU, ES Modules and Custom Elements, all standard in current Chrome, Edge, Firefox and Safari.
- **Your editor knows every tag.** The package ships a Custom Elements Manifest, so VS Code and JetBrains IDEs [complete tags and attributes](getting-started.md#editor-support) and show their documentation as you type.
- **Open source and MIT licensed.** Developed in the open [on GitHub](https://github.com/playcanvas/web-components), free for personal and commercial projects alike, and contributions are welcome.

## Where Do You Want to Start?

<div className="row path-cards">
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/web-components/getting-started/">
      <div className="card__header"><h3>🚀 I'm new here</h3></div>
      <div className="card__body"><p>Load the library from a CDN, or scaffold a project with <code>npm create playcanvas</code>, and render your first page in minutes.</p></div>
      <div className="card__footer">Getting Started →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/web-components/loading-models/">
      <div className="card__header"><h3>📦 I have a 3D model</h3></div>
      <div className="card__body"><p>Load a glTF or GLB file, see what is inside it, and adjust its parts from markup.</p></div>
      <div className="card__footer">Loading Models →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/gaussian-splatting/building/your-first-app/web-components/">
      <div className="card__header"><h3>✨ I have a Gaussian splat</h3></div>
      <div className="card__body"><p>Build a splat viewer page step by step: load a capture, add a camera you can orbit, and tune the app for splat rendering.</p></div>
      <div className="card__footer">Your First Splat App →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/web-components/scripting/">
      <div className="card__header"><h3>🧩 I want to make it interactive</h3></div>
      <div className="card__body"><p>Attach scripts to entities for motion and gameplay, configure them from markup, and reuse the ready-made scripts that ship with the engine.</p></div>
      <div className="card__footer">Adding Behavior with Scripts →</div>
    </Link>
  </div>
</div>

:::tip[Using React?]

Web Components work anywhere HTML does, React included. If you would rather write your scene as React components, with hooks and JSX, see [PlayCanvas React](/user-manual/react/).

:::

## In This Section

- [Getting Started](getting-started.md) — load the library from a CDN or npm and render your first page.
- [Building a Scene](building-a-scene.md) — a step-by-step tutorial: camera, meshes, lights and materials.
- [Loading Models](loading-models.md) — load a glTF or GLB, see what is inside it, and adjust it from markup.
- [Attributes](attributes.md) — the value conventions shared by every tag.
- [Adding Behavior with Scripts](scripting.md) — attach engine scripts to entities for motion and interactivity.
- [Programmatic Access](programmatic-access.md) — drive the running app from JavaScript with `whenReady`.
- [Reusable Scenes with Templates](templates.md) — declare a subtree once in a `<template>` and clone it into many live instances.
- [XR Support](xr.md) — take your scene into VR and AR.
- [Tag Reference](./tags/index.md) — every element and its attributes.
- [Examples](https://playcanvas.github.io/web-components/examples/) — live demos with source code.
