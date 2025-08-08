---
title: Getting Started
---

This guide covers the basic structure and concepts you need to understand when writing PlayCanvas scripts, whether you're using the modern ESM approach or the classic system.

## What is a Script?

A script is a piece of JavaScript code that defines behavior for an Entity in your scene. Scripts are:

* **Reusable** - The same script can be attached to multiple entities
* **Configurable** - Use attributes to customize behavior per entity
* **Event-driven** - Respond to lifecycle events and user interactions

## Basic Script Structure

Every PlayCanvas script follows a similar pattern, regardless of which system you use:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM (Recommended)">

```javascript
import { Script } from 'playcanvas';

export class MyScript extends Script {
    static scriptName = 'myScript';

    /** @attribute */
    speed = 10;

    initialize() {
        // Called once when the script starts
        console.log('Script initialized!');
    }

    update(dt) {
        // Called every frame
        this.entity.rotate(0, this.speed * dt, 0);
    }
}
```

**Key points for ESM scripts:**

* Import the `Script` class from PlayCanvas
* Export a class that extends `Script`
* Use `/** @attribute */` to expose properties to the editor
* File must have `.mjs` extension

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var MyScript = pc.createScript('myScript');

MyScript.attributes.add('speed', { type: 'number', default: 10 });

MyScript.prototype.initialize = function() {
    // Called once when the script starts
    console.log('Script initialized!');
};

MyScript.prototype.update = function(dt) {
    // Called every frame
    this.entity.rotate(0, this.speed * dt, 0);
};
```

**Key points for classic scripts:**

* Use `pc.createScript()` to declare the script
* Add attributes using the `.attributes.add()` method
* Define methods on the prototype
* File has `.js` extension

</TabItem>
</Tabs>

## Core Concepts

### Script Lifecycle

Scripts have several methods that are called automatically at different times:

* `initialize()` - Called once when the script starts
* `update(dt)` - Called every frame with delta time
* `postUpdate(dt)` - Called after all updates complete
* Event handlers for `enable`, `disable`, `destroy`

Learn more about the [Script Lifecycle](./script-lifecycle.md).

### Attributes

Attributes let you expose script properties to the editor, making scripts configurable without code changes:

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM">

```javascript
import { Color, Entity, Script } from 'playcanvas';

export class Configurable extends Script {
    static scriptName = 'configurable';

    /** @attribute */
    speed = 5;
    
    /** @attribute */
    color = new Color(1, 0, 0);
    
    /** 
     * @attribute 
     * @type {Entity}
     */
    target;
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Configurable = pc.createScript('configurable');

Configurable.attributes.add('speed', { type: 'number', default: 5 });
Configurable.attributes.add('color', { type: 'rgba', default: [1, 0, 0, 1] });
Configurable.attributes.add('target', { type: 'entity' });
```

</TabItem>
</Tabs>

Learn more about [Script Attributes](./script-attributes/index.md).

### Accessing the Entity

Every script has access to the entity it's attached to via `this.entity`:

```javascript
// Get the entity's position
const position = this.entity.getPosition();

// Find child entities
const child = this.entity.findByName('ChildName');

// Access components
const camera = this.entity.camera;
const rigidbody = this.entity.rigidbody;
```

## Next Steps

* **Learn ESM Scripts:** If you're starting fresh, check out [ESM Scripts](./esm-scripts.md) for the modern approach
* **Understand Lifecycle:** Read about [Script Lifecycle](./script-lifecycle.md) to understand when your code runs
* **Add Interactivity:** Explore [Events](./events.md) to make scripts communicate with each other

:::tip

**Which system should I use?**

For new projects, we recommend **ESM Scripts** as they offer better tooling, cleaner syntax, and modern JavaScript features. Classic scripts are still fully supported for existing projects.

:::
