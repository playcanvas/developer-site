---
title: Using the Engine Standalone
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

It is possible to build applications on the PlayCanvas Engine without using the Editor. Some examples of applications built directly against the Engine are:

* [glTF Viewer](https://playcanvas.com/viewer) \[[GitHub](https://github.com/playcanvas/model-viewer)\]
* [SuperSplat](https://playcanvas.com/supersplat/editor) \[[GitHub](https://github.com/playcanvas/supersplat)\]
* ...and, of course, the [PlayCanvas Editor](../../editor) itself!

This page guides you in how to get started.

:::note

Before you begin, ensure you have [Node.js](https://nodejs.org/) installed.

:::

When setting up your project, there are two main options to consider.

## Option 1: Build Tool and NPM

This is the recommended set up that should suit most developers.

A build tool can bundle your application into an optimized package that can run on a wide range of browsers. There are many build tools such as [webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/) and [esbuild](https://esbuild.github.io/), and PlayCanvas will work with all of them. Here, we will use [Vite](https://vitejs.dev/), a popular build tool that aims to provide a faster and leaner development experience for modern web projects.

First, select whether you prefer to develop in JavaScript or TypeScript:

<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

1. Open a Terminal/Command Prompt, create a folder for your app and `cd` inside it.
2. Install `playcanvas` and `vite`:

    ```sh
    npm install playcanvas vite --save-dev
    ```

3. Create an `index.html` and paste this:

    ```html title="index.html"
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <style>
                body { margin: 0; overflow: hidden; }
            </style>
        </head>
        <body>
            <script type="module" src="main.js"></script>
            <canvas id='application'></canvas>
        </body>
    </html>
    ```

4. Create a `main.js` and paste this:

    ```javascript title="main.js"
    import * as pc from 'playcanvas';

    // create an application
    const canvas = document.getElementById('application');
    const app = new pc.Application(canvas);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.start();

    // create a camera
    const camera = new pc.Entity();
    camera.addComponent('camera', {
        clearColor: new pc.Color(0.3, 0.3, 0.7)
    });
    camera.setPosition(0, 0, 3);
    app.root.addChild(camera);

    // create a light
    const light = new pc.Entity();
    light.addComponent('light');
    light.setEulerAngles(45, 45, 0);
    app.root.addChild(light);

    // create a box
    const box = new pc.Entity();
    box.addComponent('model', {
        type: 'box'
    });
    app.root.addChild(box);

    // rotate the box
    app.on('update', (dt) => box.rotate(10 * dt, 20 * dt, 30 * dt));
    ```

5. Run the Vite development server:

    ```sh
    npx vite
    ```

    This starts a server at `http://localhost:5173`. Visit this URL in your browser and you will see the following:

    ![Spinning Cube](/img/user-manual/engine/standalone/spinning-cube.webp)

    :::tip

    Every time you save your source files, the tab will reload automatically.

    :::

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

1. Open a Terminal/Command Prompt, create a folder for your app and `cd` inside it.
2. Install `playcanvas` and `vite`:

    ```sh
    npm install playcanvas vite --save-dev
    ```

3. Create an `index.html` and paste this:

    ```html title="index.html"
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <style>
                body { margin: 0; overflow: hidden; }
            </style>
        </head>
        <body>
            <script type="module" src="main.ts"></script>
            <canvas id='application'></canvas>
        </body>
    </html>
    ```

4. Create a `main.ts` and paste this:

    ```typescript title="main.ts"
    import * as pc from 'playcanvas';

    // create an application
    const canvas = document.getElementById('application') as HTMLCanvasElement;
    const app = new pc.Application(canvas);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.start();

    // create a camera
    const camera = new pc.Entity();
    camera.addComponent('camera', {
        clearColor: new pc.Color(0.3, 0.3, 0.7)
    });
    camera.setPosition(0, 0, 3);
    app.root.addChild(camera);

    // create a light
    const light = new pc.Entity();
    light.addComponent('light');
    light.setEulerAngles(45, 45, 0);
    app.root.addChild(light);

    // create a box
    const box = new pc.Entity();
    box.addComponent('model', {
        type: 'box'
    });
    app.root.addChild(box);

    // rotate the box
    app.on('update', (dt: number) => box.rotate(10 * dt, 20 * dt, 30 * dt));
    ```

5. Run the Vite development server:

    ```sh
    npx vite
    ```

    This starts a server at `http://localhost:5173`. Visit this URL in your browser and you will see the following:

    ![Spinning Cube](/img/user-manual/engine/standalone/spinning-cube.webp)

    :::tip

    Every time you save your source files, the tab will reload automatically.

    :::

  </TabItem>
</Tabs>

## Option 2: Import Map and CDN

An [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) can resolve module specifiers in JavaScript modules. Consider this import statement:

```javascript
import * as pc from 'playcanvas';
```

An import map can resolve `playcanvas` to a CDN-hosted build of the engine that can be dynamically loaded by the browser. This means that we can skip the build step described in Option 1.

First, select whether you prefer to develop in JavaScript or TypeScript:

<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

1. Open a Terminal/Command Prompt, create a folder for your app and `cd` inside it.
2. Create an `index.html` and paste this:

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
            <canvas id='application'></canvas>
        </body>
    </html>
    ```

3. Create a `main.js` and paste this:

    ```javascript title="main.js"
    import * as pc from 'playcanvas';

    // create an application
    const canvas = document.getElementById('application');
    const app = new pc.Application(canvas);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.start();

    // create a camera
    const camera = new pc.Entity();
    camera.addComponent('camera', {
        clearColor: new pc.Color(0.3, 0.3, 0.7)
    });
    camera.setPosition(0, 0, 3);
    app.root.addChild(camera);

    // create a light
    const light = new pc.Entity();
    light.addComponent('light');
    light.setEulerAngles(45, 45, 0);
    app.root.addChild(light);

    // create a box
    const box = new pc.Entity();
    box.addComponent('model', {
        type: 'box'
    });
    app.root.addChild(box);

    // rotate the box
    app.on('update', (dt) => box.rotate(10 * dt, 20 * dt, 30 * dt));
    ```

4. Run `serve`:

    ```sh
    npx serve
    ```

    This starts a server at `http://localhost:3000`. Visit this URL in your browser and you will see the following:

    ![Spinning Cube](/img/user-manual/engine/standalone/spinning-cube.webp)

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

1. Open a Terminal/Command Prompt, create a folder for your app and `cd` inside it.
2. Create an `index.html` and paste this:

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
            <canvas id='application'></canvas>
        </body>
    </html>
    ```

3. Create a `main.ts` and paste this:

    ```javascript title="main.ts"
    import * as pc from 'playcanvas';

    // create an application
    const canvas = document.getElementById('application') as HTMLCanvasElement;
    const app = new pc.Application(canvas);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.start();

    // create a camera
    const camera = new pc.Entity();
    camera.addComponent('camera', {
        clearColor: new pc.Color(0.3, 0.3, 0.7)
    });
    camera.setPosition(0, 0, 3);
    app.root.addChild(camera);

    // create a light
    const light = new pc.Entity();
    light.addComponent('light');
    light.setEulerAngles(45, 45, 0);
    app.root.addChild(light);

    // create a box
    const box = new pc.Entity();
    box.addComponent('model', {
        type: 'box'
    });
    app.root.addChild(box);

    // rotate the box
    app.on('update', (dt: number) => box.rotate(10 * dt, 20 * dt, 30 * dt));
    ```

4. Install `playcanvas` and `typescript`:

    ```sh
    npm install playcanvas typescript --save-dev
    ```

5. Compile `main.ts` to `main.js`:

    ```sh
    npx tsc main.ts --lib esnext,dom --module esnext --moduleResolution node
    ```

6. Run `serve`:

    ```sh
    npx serve
    ```

    This starts a server at `http://localhost:3000`. Visit this URL in your browser and you will see the following:

    ![Spinning Cube](/img/user-manual/engine/standalone/spinning-cube.webp)

  </TabItem>
</Tabs>
