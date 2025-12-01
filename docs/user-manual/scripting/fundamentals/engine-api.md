---
title: Calling the Engine API
---

When writing PlayCanvas scripts, you're working with the [PlayCanvas Engine API](https://api.playcanvas.com/engine/). This page covers the essential classes and patterns you'll use most often in your scripts.

## Key Classes for Script Writers

### Your Script Context

Every script has access to these core objects:

```javascript
this.app        // The main application (AppBase)
this.entity     // The entity this script is attached to
```

:::important

`this.app` and `this.entity` are only valid within methods defined on your Script instance (`initialize`, `update`, etc.). [Learn more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) about JavaScript's `this` keyword.

:::

### Essential Classes

**[`AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html)** - Your application

```javascript
// Common app operations
this.app.fire('game:start');
const player = this.app.root.findByName('Player');
const texture = this.app.assets.find('logo', 'texture');
```

**[`Entity`](https://api.playcanvas.com/engine/classes/Entity.html)** - Objects in your scene

```javascript
// Common entity operations
this.entity.setPosition(0, 5, 0);
this.entity.rotate(0, 90, 0);
const child = this.entity.findByName('Weapon');
```

**[`Component`](https://api.playcanvas.com/engine/classes/Component.html)** - Add functionality to entities

```javascript
// Accessing components
const camera = this.entity.camera;
const light = this.entity.light;
const rigidbody = this.entity.rigidbody;
const sound = this.entity.sound;
```

### Math Classes

Import these for calculations and transformations:

```javascript
import { Vec3, Quat, Color } from 'playcanvas';

const position = new Vec3(0, 5, 0);
const rotation = new Quat();
const red = new Color(1, 0, 0);
```

## Common Script Patterns

### Finding Entities

```javascript
// By name (searches entire hierarchy)
const player = this.app.root.findByName('Player');

// By tag (returns array)
const enemies = this.app.root.findByTag('enemy');

// Relative to current entity
const weapon = this.entity.findByPath('Arms/RightHand/Weapon');
```

### Working with Assets

```javascript
// Find and load assets
const sound = this.app.assets.find('explosion', 'audio');
sound.ready(() => {
    this.entity.sound.play('explosion');
});
this.app.assets.load(sound);
```

### Events and Communication

```javascript
// Fire application events
this.app.fire('player:died', this.entity);

// Listen for events
this.app.on('game:start', this.onGameStart, this);
```

## Learning More

* **[Full Engine API Reference](https://api.playcanvas.com/engine/)** - Complete documentation
* **[Engine Guide](../../engine/index.md)** - In-depth guide to the PlayCanvas Engine runtime
* **[Script Lifecycle](./script-lifecycle.md)** - When your script methods are called
* **[Events](./events.md)** - Script communication patterns

:::tip

**IDE Support:** Use the [VS Code Extension](../editor-users/vscode-extension.md) for autocomplete and inline documentation while writing scripts.

:::
