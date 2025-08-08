---
title: Running the Engine in Node.js
---

[Node.js](https://nodejs.org/) is a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, macOS, and more. It runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting.

The PlayCanvas Engine fully supports running in Node.js. This can be useful for:

* creating multiplayer servers
* creating tools for processing asset data
* writing unit tests for your application

:::note

The PlayCanvas Engine runs its own [unit tests](https://github.com/playcanvas/engine/blob/main/test/README.md) using Node.js.

:::

## Installation

Before you begin, verify you have Node.js 18+ installed. Then you can install the PlayCanvas Engine and `jsdom` using npm.

```bash
npm install jsdom playcanvas --save-dev
```

:::info

The `jsdom` package is used to simulate a DOM environment in Node.js. This is required because the PlayCanvas Engine uses the DOM API in a number of places.

:::

## Configuring jsdom

Let's create a function that uses `jsdom` to configure the DOM environment so that the PlayCanvas Engine can run successfully.

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

Once you have called `jsdomSetup()`, you can create your PlayCanvas application as normal.

## Creating a PlayCanvas Application

When running a PlayCanvas application in Node.js, you are unlikely to require rendering. In this case, you can create a Null graphics device which will not output any graphics.

```javascript
import { Application, NullGraphicsDevice } from 'playcanvas';

export function createApp() {
    const canvas = document.createElement('canvas');
    const graphicsDevice = new NullGraphicsDevice(canvas);
    return new Application(canvas, { graphicsDevice });
}
```
