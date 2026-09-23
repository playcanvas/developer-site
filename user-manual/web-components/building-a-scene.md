# Building a Scene

Let's build a simple 3D scene step by step using PlayCanvas Web Components. By the end, you'll have a shaded, colored sphere resting on the ground under a blue sky — and you'll know what every line does.

Each snippet below is the complete contents of your page's `body`. The surrounding HTML (the import map, script tag and styles) is the boilerplate from [Getting Started](https://developer.playcanvas.com/user-manual/web-components/getting-started.md) — if you finished that page, clear out its scene, because we're rebuilding it from scratch and then going further.

## Starting Point

First, let's add the basic structure of our application to our HTML `body` using the [`<pc-app>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-app.md) and [`<pc-scene>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scene.md) elements.

```html
<pc-app>
    <pc-scene>
    </pc-scene>
</pc-app>
```

This creates an empty 3D scene. However, we can't see anything rendered yet. We need a camera and some content.

:::note

All `pc-` elements must be closed properly. Self-closing tags (e.g. `<pc-camera />`) are not supported.

:::

## Adding a Camera

To view our scene, we need a camera which we can add to our scene using the [`<pc-entity>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md) and [`<pc-camera>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-camera.md) elements.

```html {3-5}
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 0 5">
            <pc-camera></pc-camera>
        </pc-entity>
    </pc-scene>
</pc-app>
```

We've added a camera entity positioned 5 units down the positive Z axis. By default, a camera looks down the negative Z axis so our camera is now looking at the origin. At this point, the rendered scene is a solid grey color — the default clear color of a camera:

[Image: A solid grey frame showing the camera's default clear color]

A grey void — but proof that the renderer is up and running.

## Adding an Object

The scene needs something to look at. Let's add a sphere using the [`<pc-render>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-render.md) element.

```html {6-8}
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 0 5">
            <pc-camera></pc-camera>
        </pc-entity>
        <pc-entity name="sphere">
            <pc-render type="sphere"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

A dark disc appears in the center of the screen. The sphere is definitely there — but the scene has no lights, so nothing illuminates its surface and it renders as a black silhouette:

[Image: An unlit sphere rendering as a black silhouette on a grey background]

## Adding a Light

Let's fix that with a directional light, added between the camera and the sphere using the [`<pc-light>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-light.md) element.

```html {6-8}
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 0 5">
            <pc-camera></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 45 0">
            <pc-light type="directional"></pc-light>
        </pc-entity>
        <pc-entity name="sphere">
            <pc-render type="sphere"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

The light is rotated to shine down at an angle, which creates more interesting shading than lighting the sphere head-on. The sphere springs to life:

[Image: A white lit sphere on a grey background]

## Adding Some Color

Everything so far uses defaults: a white material and a grey clear color. Let's introduce some color of our own. Materials are defined with the [`<pc-material>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-material.md) element, which lives as a direct child of `<pc-app>` (it's a shared resource rather than part of any one scene) and is applied by `id` through a render component's `material` attribute. While we're at it, we'll change the background using the camera's `clear-color` attribute.

```html {2,5,11}
<pc-app>
    <pc-material id="crimson" diffuse="crimson"></pc-material>
    <pc-scene>
        <pc-entity name="camera" position="0 0 5">
            <pc-camera clear-color="lightskyblue"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 45 0">
            <pc-light type="directional"></pc-light>
        </pc-entity>
        <pc-entity name="sphere">
            <pc-render type="sphere" material="crimson"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

Both color values here are [CSS color names](https://github.com/playcanvas/web-components/blob/main/src/colors.ts). Color attributes also accept hex codes and space-separated numbers — see [Attributes](https://developer.playcanvas.com/user-manual/web-components/attributes.md) for the full conventions.

[Image: A crimson sphere on a light blue background]

## Grounding the Scene

Objects floating in a void only get you so far. Let's give the sphere something to rest on: a `plane` primitive, scaled up to act as the ground, with a second material. The sphere primitive is 1 unit in diameter, so raising it to `position="0 0.5 0"` sets it exactly on top of the plane. We'll also raise and tilt the camera to frame the scene, and have the light cast shadows with the `cast-shadows` attribute — a boolean that is enabled simply by being present (see [Attributes](https://developer.playcanvas.com/user-manual/web-components/attributes.md)).

```html {3,5,9,11,14-16}
<pc-app>
    <pc-material id="crimson" diffuse="crimson"></pc-material>
    <pc-material id="gray" diffuse="lightgray"></pc-material>
    <pc-scene>
        <pc-entity name="camera" position="0 1.5 6" rotation="-10 0 0">
            <pc-camera clear-color="lightskyblue"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 45 0">
            <pc-light type="directional" cast-shadows></pc-light>
        </pc-entity>
        <pc-entity name="sphere" position="0 0.5 0">
            <pc-render type="sphere" material="crimson"></pc-render>
        </pc-entity>
        <pc-entity name="ground" scale="8 1 8">
            <pc-render type="plane" material="gray"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

[Image: A crimson sphere resting on a light gray plane, casting a shadow under a blue sky]

That's a scene: a camera, a light, geometry and materials — composed entirely in HTML.

## The Element Hierarchy

The structure you just built follows rules that apply to every PlayCanvas Web Components document:

```none
pc-app ................... the application
├── pc-material .......... app-level resources (also: pc-asset)
└── pc-scene ............. root of the entity hierarchy
    └── pc-entity ........ a node in the scene graph (entities can nest)
        └── pc-camera .... components that give an entity abilities
                           (also: pc-light, pc-render, ...)
```

- [`<pc-scene>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scene.md), [`<pc-material>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-material.md) and [`<pc-asset>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-asset.md) are direct children of [`<pc-app>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-app.md).
- [`<pc-entity>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md) is a direct child of `<pc-scene>` or of another entity. Nest entities to build the transform hierarchy — an entity's `position`, `rotation` and `scale` are local to its parent.
- Component elements such as [`<pc-camera>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-camera.md), [`<pc-light>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-light.md) and [`<pc-render>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-render.md) are direct children of an entity, and each one gives that entity a capability.
- A misplaced element logs a console warning naming the required parent, so keep the console open while authoring. Each tag's [reference page](https://developer.playcanvas.com/user-manual/web-components/tags.md) states its placement rules.

## Next Steps

- [Loading Models](https://developer.playcanvas.com/user-manual/web-components/loading-models.md) — swap the primitives for a glTF or GLB model, and reach inside it.
- [Attributes](https://developer.playcanvas.com/user-manual/web-components/attributes.md) — the value conventions you just used: booleans, colors, vectors and more.
- [Adding Behavior with Scripts](https://developer.playcanvas.com/user-manual/web-components/scripting.md) — make things move. The engine also ships ready-made scripts such as `cameraControls`, which lets you orbit your scene with the mouse.
- [Tag Reference](https://developer.playcanvas.com/user-manual/web-components/tags.md) — everything else you can declare.
- [Examples](https://playcanvas.github.io/web-components/examples/) — see [Basic Shapes](https://playcanvas.github.io/web-components/examples/basic-shapes.html) for a bigger version of the scene you just built.
