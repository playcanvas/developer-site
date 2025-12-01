---
title: Using Web Components
---

Let's build a simple Gaussian splat application step by step using [PlayCanvas Web Components](/user-manual/web-components). We'll create a scene with an interactive 3D toy cat splat that you can rotate around.

## Starting Point

Begin by creating a new file called `index.html` and copy the [Web Components boilerplate HTML](/user-manual/web-components/getting-started/#boilerplate-html) into it.

Now, let's add the basic structure of our application to our HTML `body` using the [`<pc-app>`](/user-manual/web-components/tags/pc-app) and [`<pc-scene>`](/user-manual/web-components/tags/pc-scene) elements.

```html
<pc-app antialias="false" high-resolution="false">
    <pc-scene>
    </pc-scene>
</pc-app>
```

This creates an empty 3D scene. However, we can't see anything rendered yet. For that, we will need to add a camera and a splat.

:::warning Performance Optimization

We've disabled `antialias` and `high-resolution` on the `<pc-app>` element for optimal splat rendering performance. These settings help reduce the fragment processing load, which is the primary bottleneck in Gaussian splat rendering. Learn more in the [Performance](../engine-features/performance.md) guide.

:::

## Loading Assets

Before we can display a splat or add camera controls, we need to define the assets our app will use. Let's add a camera controls script and a splat asset using the [`<pc-asset>`](/user-manual/web-components/tags/pc-asset) element.

```html {2-3}
<pc-app antialias="false" high-resolution="false">
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset id="toy" src="https://developer.playcanvas.com/assets/toy-cat.sog"></pc-asset>
    <pc-scene>
    </pc-scene>
</pc-app>
```

We've added two assets:

- A camera controls script that will let us orbit around the scene
- A compressed PLY file containing a toy cat splat

## Adding a Camera

To view our scene, we need a camera which we can add using the [`<pc-entity>`](/user-manual/web-components/tags/pc-entity) and [`<pc-camera>`](/user-manual/web-components/tags/pc-camera) elements.

```html {5-7}
<pc-app antialias="false" high-resolution="false">
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset id="toy" src="https://developer.playcanvas.com/assets/toy-cat.sog"></pc-asset>
    <pc-scene>
        <pc-entity position="0 0 2.5">
            <pc-camera></pc-camera>
        </pc-entity>
    </pc-scene>
</pc-app>
```

We've positioned the camera 2.5 units down the Z axis. By default, a camera looks down the negative Z axis, so our camera is now looking toward the origin where we'll place our splat.

## Adding Camera Controls

Now let's make the camera interactive by adding the camera controls script using the [`<pc-scripts>`](/user-manual/web-components/tags/pc-scripts) and [`<pc-script>`](/user-manual/web-components/tags/pc-script) elements.

```html {7-9}
<pc-app antialias="false" high-resolution="false">
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset id="toy" src="https://developer.playcanvas.com/assets/toy-cat.sog"></pc-asset>
    <pc-scene>
        <pc-entity position="0 0 2.5">
            <pc-camera></pc-camera>
            <pc-scripts>
                <pc-script name="cameraControls"></pc-script>
            </pc-scripts>
        </pc-entity>
    </pc-scene>
</pc-app>
```

The camera controls script will allow you to:

- **Left mouse drag**: Orbit around the target
- **Right mouse drag**: Pan the camera
- **Mouse wheel**: Zoom in and out

## Adding the Splat

Now let's add our toy cat splat to the scene using the [`<pc-splat>`](/user-manual/web-components/tags/pc-splat) element.

```html {11-13}
<pc-app antialias="false" high-resolution="false">
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset id="toy" src="https://developer.playcanvas.com/assets/toy-cat.sog"></pc-asset>
    <pc-scene>
        <pc-entity position="0 0 2.5">
            <pc-camera></pc-camera>
            <pc-scripts>
                <pc-script name="cameraControls"></pc-script>
            </pc-scripts>
        </pc-entity>
        <pc-entity position="0 -0.7 0" rotation="0 0 180">
            <pc-splat asset="toy"></pc-splat>
        </pc-entity>
    </pc-scene>
</pc-app>
```

We've positioned the splat slightly below the origin (-0.7 on the Y axis) and rotated it 180 degrees around the Z axis to orient it properly. The `asset="toy"` attribute references the splat asset we defined earlier.

## Final Result

After completing the steps above, you should see an interactive 3D toy cat splat that you can orbit around, pan, and zoom!

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="MYgGZax" title="<pc-splat> example" />

:::tip Try it yourself

Copy the final HTML code above into an HTML file and open it in your browser to see your first splat app in action! Then extend it in any way you like using the full power of the PlayCanvas Engine!

:::
