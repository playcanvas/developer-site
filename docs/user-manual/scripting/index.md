---
title: Scripting
---

Scripts are the heart of interactivity in PlayCanvas. They're reusable pieces of code that you attach to Entities to define behaviors, handle user input, manage game logic, and bring your projects to life.

:::tip Using the Editor?
If you're using the PlayCanvas Editor, check out the [Editor Scripting](/user-manual/editor/scripting/) section to learn about managing scripts, the code editor, VS Code integration, and hot reloading.
:::

## Two Scripting Systems

PlayCanvas supports two scripting approaches:

- **ESM Scripts** (`.mjs` files) — Modern ES Module-based scripts using class syntax. **Recommended for new projects.**
- **Classic Scripts** (`.js` files) — The original PlayCanvas scripting system using prototype-based syntax.

Both systems can coexist in the same project, allowing you to migrate gradually or use whichever approach fits your needs.

## Quick Example

Here's a simple script that rotates an entity:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM (Recommended)">

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

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Rotate = pc.createScript('rotate');

Rotate.attributes.add('speed', { type: 'number', default: 10 });

Rotate.prototype.update = function(dt) {
    this.entity.rotate(0, this.speed * dt, 0);
};
```

</TabItem>
</Tabs>

## In This Section

- [Getting Started](./getting-started.md) — Basic script structure and syntax.
- [ESM Scripts](./esm-scripts.md) — Modern scripting with ES Modules.
- [Script Lifecycle](./script-lifecycle.md) — When and how script methods are called.
- [Application Lifecycle](./application-lifecycle.md) — Understanding app initialization and frame updates.
- [Script Attributes](./script-attributes/index.md) — Exposing configurable properties.
- [Engine API](./engine-api.md) — Key classes and patterns.
- [Events](./events.md) — Communication between scripts.
- [Debugging](./debugging/index.md) — Tools and techniques for troubleshooting.
- [Migration Guide](./migration-guide.md) — Upgrading from classic to ESM scripts.
