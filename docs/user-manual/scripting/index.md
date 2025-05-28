---
title: Scripting
sidebar_position: 9
---

Scripts are the heart of interactivity in PlayCanvas. They're reusable pieces of code that you attach to Entities to define behaviors, handle user input, manage game logic, and bring your projects to life.

## Two Scripting Systems

PlayCanvas supports two scripting approaches:

* **ESM Scripts** (`.mjs` files) - Modern ES Module-based scripts using class syntax. **Recommended for new projects.**
* **Classic Scripts** (`.js` files) - The original PlayCanvas scripting system using prototype-based syntax.

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

## What You'll Learn

### [Fundamentals](./fundamentals/)
Core concepts that apply to all PlayCanvas scripts:
* [Getting Started](./fundamentals/anatomy/) - Basic script structure and syntax
* [ESM Scripts](./fundamentals/esm-scripts/) - Modern scripting with ES Modules
* [Script Lifecycle](./fundamentals/script-lifecycle/) - When and how script methods are called
* [Script Attributes](./fundamentals/script-attributes/) - Exposing configurable properties
* [Calling the Engine API](./fundamentals/engine-api/) - Key classes and patterns
* [Events](./fundamentals/events/) - Communication between scripts

### [Editor Integration](./editor-users/)
Working with scripts in the PlayCanvas Editor:
* [Managing Scripts](./editor-users/managing-scripts/) - Creating and organizing script files
* [Code Editor](./editor-users/code-editor/) - Using the built-in code editor
* [VS Code Extension](./editor-users/vscode-extension/) - Enhanced development workflow
* [Hot Reloading](./editor-users/hot-reloading/) - Live code updates

### [Debugging](./debugging/)
Tools and techniques for troubleshooting your scripts:
* [Console Logging](./debugging/console-logging/) - Basic debugging with console output
* [Browser Dev Tools](./debugging/browser-dev-tools/) - Advanced debugging techniques

:::tip

New to PlayCanvas scripting? Start with [Getting Started](./fundamentals/anatomy/) to learn the basics, then explore [ESM Scripts](./fundamentals/esm-scripts/) for the modern approach.

:::