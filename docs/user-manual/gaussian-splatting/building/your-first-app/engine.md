---
title: Using the Engine API
---

Let's build a simple Gaussian splat application step by step using the [PlayCanvas Engine](/user-manual/engine) directly. We'll create a scene with an interactive 3D toy cat splat that you can rotate around.

## Starting Point

Let's set up our project with two files: an HTML file and a JavaScript file.

First, create an `index.html` file:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <style>
            body { margin: 0; overflow: hidden; }
        </style>
        <script type="importmap">
        {
            "imports": {
                "playcanvas": "https://cdn.jsdelivr.net/npm/playcanvas/+esm"
            }
        }
        </script>
    </head>
    <body>
        <script type="module" src="main.js"></script>
    </body>
</html>
```

Next, create a `main.js` file with the basic PlayCanvas application setup:

```javascript title="main.js"
import { Application, Asset, AssetListLoader, Entity, FILLMODE_FILL_WINDOW, RESOLUTION_AUTO } from 'playcanvas';

// Create application
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const app = new Application(canvas, {
    graphicsDeviceOptions: {
        antialias: false
    }
});
app.setCanvasFillMode(FILLMODE_FILL_WINDOW);
app.setCanvasResolution(RESOLUTION_AUTO);
app.start();

window.addEventListener('resize', () => app.resizeCanvas());
```

This creates an empty 3D scene using the [`Application`](https://api.playcanvas.com/engine/classes/Application.html) class with a canvas that:

- Fills the entire browser window (`FILLMODE_FILL_WINDOW`)
- Automatically adjusts resolution based on device pixel ratio (`RESOLUTION_AUTO`)
- Properly resizes when the window changes size

We can't see anything rendered yet though - we need to load assets and add a camera and content.

:::warning Performance Optimization

We've disabled `antialias` in the graphics device options for optimal splat rendering performance. This setting helps reduce the fragment processing load, which is the primary bottleneck in Gaussian splat rendering. Learn more in the [Performance](../engine-features/performance.md) guide.

:::

## Loading Assets

Before we can display a splat or add camera controls, we need to load the assets our app will use. We'll use the [`Asset`](https://api.playcanvas.com/engine/classes/Asset.html) class to define our assets and the [`AssetListLoader`](https://api.playcanvas.com/engine/classes/AssetListLoader.html) to load them efficiently. Add this code to `main.js` where the comment says "We'll add our code here step by step":

```javascript
// Load assets
const assets = [
    new Asset('camera-controls', 'script', {
        url: 'https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs'
    }),
    new Asset('toy', 'gsplat', {
        url: 'https://developer.playcanvas.com/assets/toy-cat.sog'
    })
];

const loader = new AssetListLoader(assets, app.assets);
await new Promise(resolve => loader.load(resolve));
```

We're loading two assets:

- A camera controls script that will let us orbit around the scene
- A `.sog` file containing a toy cat splat

The [`AssetListLoader`](https://api.playcanvas.com/engine/classes/AssetListLoader.html) loads all assets efficiently and we use `await` to ensure they're fully loaded before proceeding.

## Adding a Camera

To view our scene, we need to create a camera entity using the [`Entity`](https://api.playcanvas.com/engine/classes/Entity.html) class and add a [camera component](https://api.playcanvas.com/engine/classes/CameraComponent.html) to it. Add this code to `main.js` after the asset loading:

```javascript
// Create camera entity
const camera = new Entity('Camera');
camera.setPosition(0, 0, 2.5);
camera.addComponent('camera');
app.root.addChild(camera);
```

We've positioned the camera 2.5 units down the Z axis. By default, a camera looks down the negative Z axis, so our camera is now looking toward the origin where we'll place our splat.

## Adding Camera Controls

Now let's make the camera interactive by attaching the camera controls script using the [script component](https://api.playcanvas.com/engine/classes/ScriptComponent.html). Add this code to `main.js` after the camera creation:

```javascript
// Add camera controls
camera.addComponent('script');
camera.script.create('cameraControls');
```

Since we've already loaded the camera controls script using [`AssetListLoader`](https://api.playcanvas.com/engine/classes/AssetListLoader.html), we can directly create the script component. The camera controls will allow you to:

- **Left mouse drag**: Orbit around the target
- **Right mouse drag**: Pan the camera
- **Mouse wheel**: Zoom in and out

## Adding the Splat

Now let's add our toy cat splat to the scene using the [gsplat component](https://api.playcanvas.com/engine/classes/GSplatComponent.html). Add this code to `main.js` after the camera controls:

```javascript
// Create splat entity
const splat = new Entity('Toy Cat');
splat.setPosition(0, -0.7, 0);
splat.setEulerAngles(0, 0, 180);
splat.addComponent('gsplat', { asset: assets[1] });
app.root.addChild(splat);
```

We reference the splat asset using `assets[1]` (the second asset in our array). We've positioned the splat slightly below the origin (-0.7 on the Y axis) and rotated it 180 degrees around the Z axis to orient it properly.

## Complete Code

Here are the complete files with all the code from the steps above:

**index.html:**

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <style>
            body { margin: 0; overflow: hidden; }
        </style>
        <script type="importmap">
        {
            "imports": {
                "playcanvas": "https://cdn.jsdelivr.net/npm/playcanvas/+esm"
            }
        }
        </script>
    </head>
    <body>
        <script type="module" src="main.js"></script>
    </body>
</html>
```

**main.js:**

```javascript title="main.js"
import { Application, Asset, AssetListLoader, Entity, FILLMODE_FILL_WINDOW, RESOLUTION_AUTO } from 'playcanvas';

// Create application
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const app = new Application(canvas, {
    graphicsDeviceOptions: {
        antialias: false
    }
});
app.setCanvasFillMode(FILLMODE_FILL_WINDOW);
app.setCanvasResolution(RESOLUTION_AUTO);
app.start();

window.addEventListener('resize', () => app.resizeCanvas());

// Load assets
const assets = [
    new Asset('camera-controls', 'script', {
        url: 'https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs'
    }),
    new Asset('toy', 'gsplat', {
        url: 'https://developer.playcanvas.com/assets/toy-cat.sog'
    })
];

const loader = new AssetListLoader(assets, app.assets);
await new Promise(resolve => loader.load(resolve));

// Create camera entity
const camera = new Entity('Camera');
camera.setPosition(0, 0, 2.5);
camera.addComponent('camera');
camera.addComponent('script');
camera.script.create('cameraControls');
app.root.addChild(camera);

// Create splat entity
const splat = new Entity('Toy Cat');
splat.setPosition(0, -0.7, 0);
splat.setEulerAngles(0, 0, 180);
splat.addComponent('gsplat', { asset: assets[1] });
app.root.addChild(splat);
```

## Final Result

After completing the steps above, you should see an interactive 3D toy cat splat that you can orbit around, pan, and zoom!

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="LEpRPbj" defaultTab="js" title="PlayCanvas Engine: Your First Splat" />

:::tip Try it yourself

Create both files above (`index.html` and `main.js`) in the same directory and open `index.html` in your browser to see your first splat app in action! Then extend it in any way you like using the full power of the PlayCanvas Engine!

:::
