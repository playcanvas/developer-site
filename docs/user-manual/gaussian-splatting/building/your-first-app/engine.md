---
title: Using the Engine API
sidebar_position: 1
---

Let's build a simple Gaussian splat application step by step using the [PlayCanvas Engine](/user-manual/engine) directly. We'll create a scene with an interactive 3D toy cat splat that you can rotate around.

## Starting Point

Let's set up our project with two files: an HTML file and a JavaScript file.

First, create an `index.html` file:

```html
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
        <canvas id='application'></canvas>
    </body>
</html>
```

Next, create a `main.js` file with the basic PlayCanvas application setup:

```javascript
import { Application, Mouse, TouchDevice, Entity, Asset } from 'playcanvas';

const canvas = document.getElementById('application');
const app = new Application(canvas, {
    mouse: new Mouse(canvas),
    touch: new TouchDevice(canvas),
    antialias: false
});

// We'll add our code here step by step

app.start();
```

This creates an empty 3D scene with a canvas that fills the browser window. However, we can't see anything rendered yet. We need a camera and some content.

:::warning Performance Optimization

We've disabled `antialias` for optimal splat rendering performance. This setting helps reduce the fragment processing load, which is the primary bottleneck in Gaussian splat rendering. Learn more in the [Performance](../engine-features/performance.md) guide.

:::

:::note

We're using modern ES modules with an import map to provide clean imports. The import map maps `"playcanvas"` to the CDN URL, allowing us to use simple `import { ... } from 'playcanvas'` statements.

:::

## Loading Assets

Before we can display a splat or add camera controls, we need to load the assets our app will use. Add this code to `main.js` where the comment says "We'll add our code here step by step":

```javascript
// Load assets
const assets = {
    script: new Asset('camera-controls', 'script', {
        url: 'https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs'
    }),
    splat: new Asset('toy', 'gsplat', {
        url: 'https://developer.playcanvas.com/assets/toy-cat.compressed.ply'
    })
};

app.assets.add(assets.script);
app.assets.add(assets.splat);
```

We've added two assets:
- A camera controls script that will let us orbit around the scene
- A compressed PLY file containing a toy cat splat

## Adding a Camera

To view our scene, we need to create a camera entity and add it to the scene. Add this code to `main.js` after the asset loading:

```javascript
// Create camera entity
const camera = new Entity('camera');
camera.addComponent('camera');
camera.setPosition(0, 0, -2.5);
app.root.addChild(camera);
```

We've positioned the camera 2.5 units down the negative Z axis. By default, a camera looks down the negative Z axis, so our camera is now looking toward the origin where we'll place our splat.

## Adding Camera Controls

Now let's make the camera interactive by loading and attaching the camera controls script. Add this code to `main.js` after the camera creation:

```javascript
// Load camera controls script and attach it
assets.script.ready(() => {
    camera.addComponent('script');
    camera.script.create('cameraControls', {
        attributes: {
            orbitSensitivity: 0.3,
            distanceSensitivity: 0.15
        }
    });
});
app.assets.load(assets.script);
```

The camera controls script will allow you to:
- **Left mouse drag**: Orbit around the target
- **Right mouse drag**: Pan the camera
- **Mouse wheel**: Zoom in and out

## Adding the Splat

Now let's add our toy cat splat to the scene. Add this code to `main.js` after the camera controls:

```javascript
// Create splat entity
assets.splat.ready(() => {
    const splatEntity = new Entity('toy-cat');
    splatEntity.addComponent('gsplat', { asset: assets.splat });
    splatEntity.setPosition(0, -0.7, 0);
    splatEntity.setEulerAngles(180, 0, 0);
    app.root.addChild(splatEntity);
});
app.assets.load(assets.splat);
```

We've positioned the splat slightly below the origin (-0.7 on the Y axis) and rotated it 180 degrees around the X axis to orient it properly. The splat will load asynchronously once the PLY file has downloaded.

## Complete Code

Here are the complete files with all the code from the steps above:

**index.html:**
```html
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
        <canvas id='application'></canvas>
    </body>
</html>
```

**main.js:**
```javascript
import { Application, Mouse, TouchDevice, Entity, Asset } from 'playcanvas';

const canvas = document.getElementById('application');
const app = new Application(canvas, {
    mouse: new Mouse(canvas),
    touch: new TouchDevice(canvas),
    antialias: false,
    preserveDrawingBuffer: false
});

// Load assets
const assets = {
    script: new Asset('camera-controls', 'script', {
        url: 'https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs'
    }),
    splat: new Asset('toy', 'gsplat', {
        url: 'https://developer.playcanvas.com/assets/toy-cat.compressed.ply'
    })
};

app.assets.add(assets.script);
app.assets.add(assets.splat);

// Create camera entity
const camera = new Entity('camera');
camera.addComponent('camera');
camera.setPosition(0, 0, -2.5);
app.root.addChild(camera);

// Load camera controls script and attach it
assets.script.ready(() => {
    camera.addComponent('script');
    camera.script.create('cameraControls', {
        attributes: {
            orbitSensitivity: 0.3,
            distanceSensitivity: 0.15
        }
    });
});
app.assets.load(assets.script);

// Create splat entity
assets.splat.ready(() => {
    const splatEntity = new Entity('toy-cat');
    splatEntity.addComponent('gsplat', { asset: assets.splat });
    splatEntity.setPosition(0, -0.7, 0);
    splatEntity.setEulerAngles(180, 0, 0);
    app.root.addChild(splatEntity);
});
app.assets.load(assets.splat);

app.start();
```

## Final Result

After completing the steps above, you should see an interactive 3D toy cat splat that you can orbit around, pan, and zoom!

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="MYgGZax" title="<pc-splat> example" />

:::tip Try it yourself

Create both files above (`index.html` and `main.js`) in the same directory and open `index.html` in your browser to see your first splat app in action! Then extend it in any way you like using the full power of the PlayCanvas Engine!

:::
