---
title: Building a Scene
---

Let's build a simple 3D scene step by step using PlayCanvas Web Components. We'll create a basic scene with a lit sphere.

## Starting Point

First, let's add the basic structure of our application to our HTML `body` using the [`<pc-app>`](../tags/pc-app) and [`<pc-scene>`](../tags/pc-scene) elements.

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

To view our scene, we need a camera which we can add to our scene using the [`<pc-entity>`](../tags/pc-entity) and [`<pc-camera>`](../tags/pc-camera) elements.

```html {3-5}
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 0 5">
            <pc-camera></pc-camera>
        </pc-entity>
    </pc-scene>
</pc-app>
```

We've added a camera entity positioned 5 units down the positive Z axis. By default, a camera looks down the negative Z axis so our camera is now looking at the origin. At this point, the rendered scene is a solid grey color (the default clear color of a camera).

## Adding a Light

Let's add a directional light to illuminate our scene using the [`<pc-light>`](../tags/pc-light) element.

```html {6-8}
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 0 5">
            <pc-camera></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 45 0">
            <pc-light type="directional"></pc-light>
        </pc-entity>
    </pc-scene>
</pc-app>
```

The light is rotated to shine at an angle, which will create more interesting shading on our objects.

## Adding an Object

Now let's add a sphere shape to our scene using the [`<pc-render>`](../tags/pc-render) element.

```html {9-11}
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

You should now see a white sphere in the center of your screen!
