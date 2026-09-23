# Running the Engine in Node.js

[Node.js](https://nodejs.org/) is a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, macOS, and more. It runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting.

The PlayCanvas Engine fully supports running in Node.js. This can be useful for:

* creating multiplayer servers
* creating tools for processing asset data
* writing unit tests for your application

:::note

The PlayCanvas Engine runs its own [unit tests](https://github.com/playcanvas/engine/blob/main/test/README.md) using Node.js.

:::

## Installation

Before you begin, verify you have Node.js 18+ installed. Then you can install the PlayCanvas Engine using npm.

```bash
npm install playcanvas
```

## Creating a Headless Application

When running a PlayCanvas application in Node.js, you are unlikely to require rendering. In this case, you can create a [`NullGraphicsDevice`](https://api.playcanvas.com/engine/classes/NullGraphicsDevice.html), which renders nothing. Since there is nothing to display, a plain object can stand in for the canvas.

```javascript
import { Application, NullGraphicsDevice } from 'playcanvas';

// Nothing is rendered, so a plain object stands in for the canvas
const canvas = { width: 1, height: 1 };
const graphicsDevice = new NullGraphicsDevice(canvas);

const app = new Application(canvas, { graphicsDevice });
app.start();
```

## Updating the Application

In a browser, `app.start()` begins a main loop driven by `requestAnimationFrame`. Node.js has no `requestAnimationFrame`, so no main loop runs. Instead, call [`app.update(dt)`](https://api.playcanvas.com/engine/classes/AppBase.html#update) at the rate you need. This updates your scripts, animation and physics, and skips rendering entirely.

```javascript
const TICK_RATE = 20; // updates per second

setInterval(() => {
    app.update(1 / TICK_RATE);
}, 1000 / TICK_RATE);
```

Passing a fixed `dt` gives every update the same length, however much the timer drifts.

## Adding Scripts

[ESM scripts](https://developer.playcanvas.com/user-manual/scripting/esm-scripts.md) are standard JavaScript modules, so Node.js can import them directly. For example, here is a script that rotates its entity:

```javascript title="rotate.mjs"
import { Script } from 'playcanvas';

export class Rotate extends Script {
    static scriptName = 'rotate';

    update(dt) {
        this.entity.rotate(0, 90 * dt, 0);
    }
}
```

Import the script class and pass it to the script component:

```javascript
import { Entity } from 'playcanvas';
import { Rotate } from './rotate.mjs';

const entity = new Entity('Box');
entity.addComponent('script');
entity.script.create(Rotate);
app.root.addChild(entity);
```

The script's `update` method now runs every time you call `app.update(dt)`.

## Using jsdom

Some parts of the engine rely on DOM APIs that Node.js does not provide:

* classic scripts, which are loaded with a `<script>` element
* loading assets through the asset registry, which requests files with `XMLHttpRequest`

If you need either of these, you can use the [`jsdom`](https://www.npmjs.com/package/jsdom) package to simulate a DOM environment.

```bash
npm install jsdom
```

The following function uses `jsdom` to configure the DOM environment so that the PlayCanvas Engine can run successfully.

```javascript
import { JSDOM } from 'jsdom';
import * as pc from 'playcanvas';

let jsdom;

export function jsdomSetup() {
    const html = '<!DOCTYPE html><html><head></head><body></body></html>';

    jsdom = new JSDOM(html, {
        resources: 'usable',         // Allow the engine to load assets
        runScripts: 'dangerously',   // Allow the engine to run scripts
        url: 'http://localhost:3000' // Set the URL of the document
    });

    // Copy the window and document to global scope
    global.window = jsdom.window;
    global.document = jsdom.window.document;

    // Copy the DOM APIs used by the engine to global scope
    global.ArrayBuffer = jsdom.window.ArrayBuffer;
    global.Audio = jsdom.window.Audio;
    global.DataView = jsdom.window.DataView;
    global.Image = jsdom.window.Image;
    global.KeyboardEvent = jsdom.window.KeyboardEvent;
    global.MouseEvent = jsdom.window.MouseEvent;
    global.XMLHttpRequest = jsdom.window.XMLHttpRequest;

    // Copy the PlayCanvas API to global scope (only required for 'classic' scripts)
    jsdom.window.pc = pc;
}
```

Call `jsdomSetup()` before you create your application. `jsdom` does not provide a main loop either, so keep calling `app.update(dt)` as shown above.
