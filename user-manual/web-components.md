# PlayCanvas Web Components

PlayCanvas Web Components let you put real-time 3D on a web page with nothing but HTML. Each `<pc-*>` tag wraps a piece of the [PlayCanvas Engine](https://developer.playcanvas.com/user-manual/engine.md) — an app, a scene, a camera, a light — so you compose interactive 3D scenes the same way you compose the rest of your page: with markup.

[Interactive demo: Golden Meadow — a meadow at golden hour, built with PlayCanvas Web Components](https://playcanvas.github.io/web-components/examples/#golden-meadow.html)

Drag to look around the meadow above. Its camera, sun, haze and sound are HTML elements, and so are the scripts that paint its sky and generate its terrain, trees and grass. It's one of [40+ live examples](https://playcanvas.github.io/web-components/examples/) you can explore, complete with source code.

[Get Started →](https://developer.playcanvas.com/user-manual/web-components/getting-started.md)
[Browse the Examples](https://playcanvas.github.io/web-components/examples/)

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

To put a scene like this on a page of your own, add the two `<script>` tags that load the library. [Getting Started](https://developer.playcanvas.com/user-manual/web-components/getting-started.md) has the complete file.

## What You Can Build

The same tags scale from one sphere to complete, polished experiences. Each of these showcases is a single HTML page: open it to explore it live, read its source and remix it on StackBlitz.

[A silver sports car above a row of paint swatches](https://playcanvas.github.io/web-components/examples/#car-configurator.html): Car ConfiguratorPick a paint and watch a sports car change color.
[A camera drone beside a panel with Explode all and Reset buttons](https://playcanvas.github.io/web-components/examples/#product-viewer.html): Product ViewerHover a drone's parts to highlight them, and click to pull them out of the assembly.
[The Sun beside a panel of facts about it](https://playcanvas.github.io/web-components/examples/#solar-system.html): Solar SystemScroll the page to travel from the Sun out past eight worlds.
[A Gaussian splat capture of a marble angel in a domed hall](https://playcanvas.github.io/web-components/examples/#basic-splat.html): Gaussian SplatsRender a photoreal 3D capture with the <pc-gsplat> tag.
[An animated character standing in a stone courtyard under great arches](https://playcanvas.github.io/web-components/examples/#third-person-controller.html): Third Person ControllerWalk, run and jump through a courtyard, with physics and blended animation.
[A lamp lighting the mechanism behind a clock face in a dusty belfry](https://playcanvas.github.io/web-components/examples/#clock-tower.html): Clock TowerA clock mechanism set to your local time, with dusty light and chimes.

The [examples browser](https://playcanvas.github.io/web-components/examples/) has more, including webcam AR, vehicles and ragdolls, particles, positional sound, and 2D and 3D user interfaces.

## Why PlayCanvas Web Components?

- **HTML is the whole API.** Build complete, interactive scenes in markup, with no build step and no engine boilerplate. Reach for JavaScript only when you want [custom behavior](https://developer.playcanvas.com/user-manual/web-components/scripting.md).
- **Every attribute is live.** Change an attribute from JavaScript, from a framework or straight from your browser's dev tools, and the scene updates instantly. See [Attributes](https://developer.playcanvas.com/user-manual/web-components/attributes.md) for the shared conventions.
- **The full engine underneath.** This is not a simplified toy layer. The same [PlayCanvas Engine](https://developer.playcanvas.com/user-manual/engine.md) that powers thousands of web applications does the rendering, WebGPU-first with automatic fallback to WebGL 2. When you need more than the tags offer, every element [hands you its engine object](https://developer.playcanvas.com/user-manual/web-components/programmatic-access.md).
- **A web standard, not a framework.** The components are [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements), so they work in a plain HTML page or alongside any framework that renders to the DOM. All they ask of a browser is WebGL 2 or WebGPU, ES Modules and Custom Elements, all standard in current Chrome, Edge, Firefox and Safari.
- **Your editor knows every tag.** The package ships a Custom Elements Manifest, so VS Code and JetBrains IDEs [complete tags and attributes](https://developer.playcanvas.com/user-manual/web-components/getting-started.md#editor-support) and show their documentation as you type.
- **Open source and MIT licensed.** Developed in the open [on GitHub](https://github.com/playcanvas/web-components), free for personal and commercial projects alike, and contributions are welcome.

## Where Do You Want to Start?

[🚀 I'm new here](https://developer.playcanvas.com/user-manual/web-components/getting-started.md): Load the library from a CDN, or scaffold a project with npm create playcanvas, and render your first page in minutes. Getting Started →
[📦 I have a 3D model](https://developer.playcanvas.com/user-manual/web-components/loading-models.md): Load a glTF or GLB file, see what is inside it, and adjust its parts from markup. Loading Models →
[✨ I have a Gaussian splat](https://developer.playcanvas.com/user-manual/gaussian-splatting/building/your-first-app/web-components.md): Build a splat viewer page step by step: load a capture, add a camera you can orbit, and tune the app for splat rendering. Your First Splat App →
[🧩 I want to make it interactive](https://developer.playcanvas.com/user-manual/web-components/scripting.md): Attach scripts to entities for motion and gameplay, configure them from markup, and reuse the ready-made scripts that ship with the engine. Adding Behavior with Scripts →

:::tip[Using React?]

Web Components work anywhere HTML does, React included. If you would rather write your scene as React components, with hooks and JSX, see [PlayCanvas React](https://developer.playcanvas.com/user-manual/react.md).

:::

## In This Section

- [Getting Started](https://developer.playcanvas.com/user-manual/web-components/getting-started.md) — load the library from a CDN or npm and render your first page.
- [Building a Scene](https://developer.playcanvas.com/user-manual/web-components/building-a-scene.md) — a step-by-step tutorial: camera, meshes, lights and materials.
- [Loading Models](https://developer.playcanvas.com/user-manual/web-components/loading-models.md) — load a glTF or GLB, see what is inside it, and adjust it from markup.
- [Attributes](https://developer.playcanvas.com/user-manual/web-components/attributes.md) — the value conventions shared by every tag.
- [Adding Behavior with Scripts](https://developer.playcanvas.com/user-manual/web-components/scripting.md) — attach engine scripts to entities for motion and interactivity.
- [Programmatic Access](https://developer.playcanvas.com/user-manual/web-components/programmatic-access.md) — drive the running app from JavaScript with `whenReady`.
- [Reusable Scenes with Templates](https://developer.playcanvas.com/user-manual/web-components/templates.md) — declare a subtree once in a `<template>` and clone it into many live instances.
- [XR Support](https://developer.playcanvas.com/user-manual/web-components/xr.md) — take your scene into VR and AR.
- [Tag Reference](https://developer.playcanvas.com/user-manual/web-components/tags.md) — every element and its attributes.
- [Examples](https://playcanvas.github.io/web-components/examples/) — live demos with source code.
