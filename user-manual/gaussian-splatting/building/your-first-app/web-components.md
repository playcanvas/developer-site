# Using Web Components

Let's build a simple Gaussian splat application step by step using [PlayCanvas Web Components](https://developer.playcanvas.com/user-manual/web-components.md). We'll create a scene with an interactive 3D toy cat splat that you can rotate around.

## Starting Point

Begin by creating a new file called `index.html` and copy the [example page](https://developer.playcanvas.com/user-manual/web-components/getting-started.md#your-first-page) from the Web Components Getting Started guide into it, clearing out everything inside its `body`.

Now, let's add the basic structure of our application to our HTML `body` using the [`<pc-app>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-app.md) and [`<pc-scene>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scene.md) elements.

```html
<pc-app antialias="false" max-pixel-ratio="1">
    <pc-scene>
    </pc-scene>
</pc-app>
```

This creates an empty 3D scene. However, we can't see anything rendered yet. For that, we will need to add a camera and a splat.

:::warning Performance Optimization

We've disabled `antialias` and capped `max-pixel-ratio` at `1` (rendering at CSS resolution) on the `<pc-app>` element for optimal splat rendering performance. These settings help reduce the fragment processing load, which is the primary bottleneck in Gaussian splat rendering. Learn more in the [Performance](https://developer.playcanvas.com/user-manual/gaussian-splatting/building/performance.md) guide.

:::

## Loading Assets

Before we can display a splat or add camera controls, we need to define the assets our app will use. Let's add a camera controls script and a splat asset using the [`<pc-asset>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-asset.md) element.

```html {2-3}
<pc-app antialias="false" max-pixel-ratio="1">
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

To view our scene, we need a camera which we can add using the [`<pc-entity>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md) and [`<pc-camera>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-camera.md) elements.

```html {5-7}
<pc-app antialias="false" max-pixel-ratio="1">
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

Now let's make the camera interactive by adding the camera controls script using the [`<pc-script>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-script.md) and [`<pc-script-instance>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-script-instance.md) elements.

```html {7-9}
<pc-app antialias="false" max-pixel-ratio="1">
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset id="toy" src="https://developer.playcanvas.com/assets/toy-cat.sog"></pc-asset>
    <pc-scene>
        <pc-entity position="0 0 2.5">
            <pc-camera></pc-camera>
            <pc-script>
                <pc-script-instance name="cameraControls"></pc-script-instance>
            </pc-script>
        </pc-entity>
    </pc-scene>
</pc-app>
```

The camera controls script will allow you to:

- **Left mouse drag**: Orbit around the target
- **Right mouse drag**: Pan the camera
- **Mouse wheel**: Zoom in and out

## Adding the Splat

Now let's add our toy cat splat to the scene using the [`<pc-gsplat>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-gsplat.md) element.

```html {11-13}
<pc-app antialias="false" max-pixel-ratio="1">
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset id="toy" src="https://developer.playcanvas.com/assets/toy-cat.sog"></pc-asset>
    <pc-scene>
        <pc-entity position="0 0 2.5">
            <pc-camera></pc-camera>
            <pc-script>
                <pc-script-instance name="cameraControls"></pc-script-instance>
            </pc-script>
        </pc-entity>
        <pc-entity position="0 -0.7 0" rotation="0 0 180">
            <pc-gsplat asset="toy"></pc-gsplat>
        </pc-entity>
    </pc-scene>
</pc-app>
```

We've positioned the splat slightly below the origin (-0.7 on the Y axis) and rotated it 180 degrees around the Z axis to orient it properly. The `asset="toy"` attribute references the splat asset we defined earlier.

## Final Result

After completing the steps above, you should see an interactive 3D toy cat splat that you can orbit around, pan, and zoom!

[CodePen: <pc-gsplat> example](https://codepen.io/playcanvas/pen/MYgGZax)

:::tip Try it yourself

Copy the final HTML code above into an HTML file and open it in your browser to see your first splat app in action! Then extend it in any way you like using the full power of the PlayCanvas Engine!

:::
