# Scripting

Scripts are the heart of interactivity in PlayCanvas. They're reusable pieces of code that you attach to Entities to define behaviors, handle user input, manage game logic, and bring your projects to life.

:::tip Using the Editor?
If you're using the PlayCanvas Editor, check out the [Editor Scripting](https://developer.playcanvas.com/user-manual/editor/scripting.md) section to learn about managing scripts, the code editor, VS Code integration, and hot reloading.
:::

## Two Scripting Systems

PlayCanvas supports two scripting approaches:

- **ESM Scripts** (`.mjs` files) — Modern ES Module-based scripts using class syntax. **Recommended for new projects.**
- **Classic Scripts** (`.js` files) — The original PlayCanvas scripting system using prototype-based syntax.

Both systems can coexist in the same project, allowing you to migrate gradually or use whichever approach fits your needs.

## Quick Example

Here's a simple script that rotates an entity:

**ESM (Recommended)**

```javascript
import { Script } from 'playcanvas';

export class Rotate extends Script {
    static scriptName = 'rotate';

    /** @attribute */
    speed = 10;

    update(dt) {
        this.entity.rotate(0, this.speed * dt, 0);
    }
}
```

**Classic**

```javascript
var Rotate = pc.createScript('rotate');

Rotate.attributes.add('speed', { type: 'number', default: 10 });

Rotate.prototype.update = function(dt) {
    this.entity.rotate(0, this.speed * dt, 0);
};
```

## In This Section

- [Getting Started](https://developer.playcanvas.com/user-manual/scripting/getting-started.md) — Basic script structure and syntax.
- [ESM Scripts](https://developer.playcanvas.com/user-manual/scripting/esm-scripts.md) — Modern scripting with ES Modules.
- [Script Lifecycle](https://developer.playcanvas.com/user-manual/scripting/script-lifecycle.md) — When and how script methods are called.
- [Application Lifecycle](https://developer.playcanvas.com/user-manual/scripting/application-lifecycle.md) — Understanding app initialization and frame updates.
- [Script Attributes](https://developer.playcanvas.com/user-manual/scripting/script-attributes.md) — Exposing configurable properties.
- [Engine API](https://developer.playcanvas.com/user-manual/scripting/engine-api.md) — Key classes and patterns.
- [Events](https://developer.playcanvas.com/user-manual/scripting/events.md) — Communication between scripts.
- [Debugging](https://developer.playcanvas.com/user-manual/scripting/debugging.md) — Tools and techniques for troubleshooting.
- [Migration Guide](https://developer.playcanvas.com/user-manual/scripting/migration-guide.md) — Upgrading from classic to ESM scripts.
