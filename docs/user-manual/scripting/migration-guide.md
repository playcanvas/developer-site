---
title: Migration Guide
---

ESM Scripts replace the older Classic Scripting system as the recommended way to develop PlayCanvas applications. Whilst classic scripts will continue to work in existing projects and will be supported for the foreseeable future, we recommend using the newer ESM format for your projects.

## Gradual Migration

Using ESM Scripts within your project is entirely optional and allows you to gradually migrate your projects over to the newer ESM based format in your own time, without affecting existing projects.

:::tip

**Projects can contain both ESM Scripts and Classic Scripts**

You do not need to update all your scripts together. We recommend gradually migrating scripts and iteratively testing

:::

## Codemod

In order to migrate Classic Scripts to the ESM format, we've provided a [codemod](https://codemod.com/registry/playcanvas-esm-scripts) that will automatically update your code.

You can find the codemods in our [github repository](https://github.com/playcanvas/codemods) and you can run the codemod using the following command:

```bash
npx codemod playcanvas-esm-scripts
```

## Known differences

In general, ESM Scripts provide a more expressive and flexible way of creating projects. Whilst we have attempted to keep the migration process as seamless as possible, there are some notable differences that you should bear in mind.

### Module Scope

**ESM Scripts have module scope, Classic Scripts have global scope**. This means modules cannot implicitly access variables defined in other files. Often this is used as a way to define global settings or configuration. The config has a higher loading order than the script, and so the `SPEED` is accessible globally.

<details>
<summary>**See code example**</summary>

```javascript
// config.js
var SPEED = 10;

// script.js
// ❌ This will not work. `SPEED` is scoped to config.js
console.log(SPEED)
```

This is a *hidden dependency* which breaks if the loading order changes. Instead, use `import/export` syntax to explicitly define the dependency.

```javascript
// config.mjs
export const SPEED = 10

// script.mjs
import { SPEED } from './config.mjs';
// ✅ Works!
console.log(SPEED); 
```

</details>

You can learn more about the other difference between [ES Modules and standard scripts here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#other_differences_between_modules_and_standard_scripts)

### Loading Order

:::note

**ESM Scripts do not have a loading order.**

:::

The loading order of scripts was introduced as a way to organize dependencies between scripts and guarantee certain code would be executed before others. With ES modules, these relationships can be explicitly defined through `import/export` syntax. As such, ESM Scripts do not have a loading order and they should not be relied upon to load in a certain way. Instead we encourage you to use `import/export` statements to set up dependencies.

### The New `Script` Class

With ESM Scripts, the new `Script` base class replaces the existing `ScriptType` class as the default base class. The `Script` class represents the minimal set of features necessary, but omits a couple of features present in the original `ScriptType` class.

It's worth noting that although `Script` is now the default base class, it's still possible to use `ScriptType` as the base class (internally `ScriptType` extends `Script`), however we do not recommend doing this for ESM Scripts, due to some of the reasons listed below.

#### Attribute Events

:::note

ESM Scripts do not fire Attribute Events.

:::

The `Script` class does not support attributes events in the format of `attr:[name]`. The reason behind removing this is that, internally, the engine would override class members, and in practice this would create difficult-to-debug scenarios as it's not fully compatible with [ES6 class syntax](https://github.com/playcanvas/engine/issues/6316).

Instead, you can define your own events around class attribute members using something like the following;

<details>
<summary>**See code example**</summary>

```javascript
const watch = (target, prop) => {
    const privateProp = `#{prop}`;
    target[privateProp] = target[prop];

    Object.defineProperty(target, prop, {
        set(value) {
            if (target[privateProp] !== value) {
                target.fire(`changed:${prop}`, value);
                target[privateProp] = value;
            }
        },
        get() {
            return this[privateProp];
        }
    });
}

import { Script } from 'playcanvas'

export class Rotate extends Script {
    static scriptName = 'rotate';

    /** attribute */
    speed = 10;

    initialize() {
        watch(this, 'speed');

        this.on('changed:speed', console.log)
    }
}

```

</details>

This also means you can have events for any class members too, not only script attributes.

#### Attribute Copying

:::note

**ESM Script Attributes are not copied, they are passed by reference.**

:::

**Attributes are no longer copied, they are passed by reference.** The reasons this was changed was also due to a [bug in `ScriptType`](https://github.com/playcanvas/engine/issues/6316) that was incompatible with ES6 classes.

Instead, if you do need to copy values, we recommend you do it manually and explicitly via getters and setters. Whilst this is more verbose, it's clear and explicit.

<details>
<summary>**See code example**</summary>

```javascript
import { Script, Vec3 } from 'playcanvas';

export class Rotate extends Script {
    static scriptName = 'rotate';

    _speed = new Vec3();

    set speed(value) {
        this._speed.copy(value)
    }

    get speed() {
        return this._speed;
    }
}
```

</details>
