---
title: ESM Scripts
description: Write PlayCanvas scripts using modern ES Module syntax with static imports, classes, and improved tooling support.
---

ESM Scripts use modern ES Module syntax and provide the recommended way to write PlayCanvas scripts. They offer better code organization, static imports, improved bundling, and a more familiar development experience for modern JavaScript developers.

## Why Choose ESM Scripts?

* **Modern JavaScript:** Use ES6+ features like classes, arrow functions, and destructuring
* **Better Tooling:** Enhanced IDE support with better autocomplete and error detection
* **Modular Code:** Import and export functionality between scripts
* **Improved Performance:** Static imports enable better bundling and dead code elimination
* **Future-Proof:** Built on web standards that continue to evolve

## Creating ESM Scripts

ESM scripts must have the `.mjs` file extension:

1. In the Asset Panel, create a new script
2. Name it with `.mjs` extension (e.g., `PlayerController.mjs`)
3. The editor will provide ESM boilerplate code

```javascript
import { Script } from 'playcanvas';

export class PlayerController extends Script {
    static scriptName = 'playerController';

    initialize() {
        // Setup code here
    }

    update(dt) {
        // Frame update code here
    }
}
```

:::tip

**Multiple Scripts Per File:** A single `.mjs` file can export multiple script classes, but each must be exported to be available in the editor.

:::

## Module Imports and Exports

Share code between scripts using standard ES Module syntax:

```javascript
// config.mjs - Shared configuration
export const GAME_SETTINGS = {
    playerSpeed: 5,
    jumpHeight: 10,
    gravity: -9.8
};

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
```

```javascript
// PlayerController.mjs - Using shared code
import { Script } from 'playcanvas';
import { GAME_SETTINGS, clamp } from './config.mjs';

export class PlayerController extends Script {
    static scriptName = 'playerController';

    update(dt) {
        const speed = GAME_SETTINGS.playerSpeed;
        // Use clamp function...
    }
}
```

## Registering Scripts (Engine-only)

In the Editor, ESM scripts are registered automatically when their `.mjs` asset is loaded. In an **engine-only** project there is no asset pipeline doing this for you, so you must register each script class with the application's [`ScriptRegistry`](https://api.playcanvas.com/engine/classes/ScriptRegistry.html) yourself before you can attach it to an entity by name.

Use `registerScript` (or the registry's `add` method) to register the class:

```javascript
import { registerScript } from 'playcanvas';
import { Rotator } from './rotator.mjs';

// register the class with the application's script registry
registerScript(Rotator, undefined, app);

// equivalently:
// app.scripts.add(Rotator);
```

The registry uses the class's static `scriptName` as its key. Once registered, you can add the script to any entity by that name — including procedurally, when cloning, or when instantiating templates:

```javascript
const entity = new pc.Entity();
entity.addComponent('script');

// attach the script by its registered name
entity.script.create('rotator');
```

:::tip

Registering by name is what makes **asynchronous and procedural workflows** possible — for example dynamically `import()`-ing a script module at runtime and registering it, or instantiating entities from templates that reference scripts by name. If you only ever pass the class reference directly to `entity.script.create(Rotator)`, registration is not strictly required, but name-based lookup will not be available.

:::
