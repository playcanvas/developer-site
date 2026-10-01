---
title: Adding Behavior with Scripts
description: "Attach PlayCanvas Script classes to entities with pc-script and pc-script-instance, load them as ES modules with pc-asset, and configure them with script attributes set one by one or as JSON."
---

Scripts add custom behaviors to entities in your PlayCanvas Web Components app.

Let's consider a simple script that rotates an entity over time:

```javascript title="rotate-script.mjs"
import { Script } from 'playcanvas';

export class RotateScript extends Script {
    static scriptName = 'rotateScript';

    update(dt) {
        // Rotate the entity 90 degrees per second around the world-space Y axis
        this.entity.rotate(0, dt * 90, 0);
    }
}
```

## Loading Scripts

Scripts are loaded via the [`<pc-asset>`](tags/pc-asset.md) tag, which goes directly inside `<pc-app>` like any other asset:

```html
<pc-asset src="path/to/rotate-script.mjs"></pc-asset>
```

Give the file an `.mjs` extension. That is how `<pc-asset>` knows it holds a script, and how the engine knows to import it as an ES module: any other script file is run as a classic script, which fails on the `import` statement.

Then attach it to an entity using [`<pc-script>`](tags/pc-script.md) and [`<pc-script-instance>`](tags/pc-script-instance.md):

```html
<pc-entity name="spinning cube">
    <pc-render type="box"></pc-render>
    <pc-script>
        <pc-script-instance name="rotateScript"></pc-script-instance>
    </pc-script>
</pc-entity>
```

:::important

The `name` attribute of `<pc-script-instance>` must match the name the script class is registered under: its `scriptName` property, as here, or the name passed to `registerScript()`.

:::

The script does not have to be registered first: a `<pc-script-instance>` waits for its class, whether it comes from a `<pc-asset>` or from `registerScript()` in your own code, and creates its instance as soon as it arrives. If the class has still not arrived once no script asset is left loading, the element logs a console warning — usually a sign of a missing `<pc-asset>` or a `name` that does not match.

`registerScript()` registers a class with the running application, so call it once `<pc-app>` is ready (`await whenReady('pc-app')` first), or pass the application as its third argument.

## Passing Data to Scripts with Attributes

Our rotate script is currently hardcoded to rotate at 90 degrees per second. But what if we want to rotate at a different speed? And what if we want to rotate multiple entities at different speeds? This is where script attributes come in!

Let's update our script to accept a rotation speed as an attribute:

```javascript title="rotate-script.mjs" {6-10,14}
import { Script } from 'playcanvas';

export class RotateScript extends Script {
    static scriptName = 'rotateScript';

    /**
     * The speed of the rotation in degrees per second
     * @attribute
     */
    speed = 90;

    update(dt) {
        // Rotate the entity `speed` degrees per second around the world-space Y axis
        this.entity.rotate(0, dt * this.speed, 0);
    }
}
```

We can now configure the script simply by adding a `speed` attribute to the `<pc-script-instance>` tag:

```html {4}
<pc-entity name="fast spinning cube">
    <pc-render type="box"></pc-render>
    <pc-script>
        <pc-script-instance name="rotateScript" speed="180"></pc-script-instance>
    </pc-script>
</pc-entity>
```

Here is that script running on two cubes, one at its declared speed and one at 180 degrees per second. The script file is served from this site:

```html live-example
<pc-app>
    <pc-asset src="https://developer.playcanvas.com/assets/scripts/rotate-script.mjs"></pc-asset>
    <pc-scene>
        <pc-entity name="camera" position="0 1 4" rotation="-10 0 0">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light></pc-light>
        </pc-entity>
        <pc-entity name="spinning cube" position="-1 0 0">
            <pc-render type="box"></pc-render>
            <pc-script>
                <pc-script-instance name="rotateScript"></pc-script-instance>
            </pc-script>
        </pc-entity>
        <pc-entity name="fast spinning cube" position="1 0 0">
            <pc-render type="box"></pc-render>
            <pc-script>
                <pc-script-instance name="rotateScript" speed="180"></pc-script-instance>
            </pc-script>
        </pc-entity>
    </pc-scene>
</pc-app>
```

Some things to try:

* Give the first cube a `speed` too, or make one negative to reverse it.
* Add `enabled="false"` to a `<pc-script-instance>` to stop that cube.
* Misspell `name`, then open the console to see the element waiting for a class that never arrives.

Any attribute on `<pc-script-instance>` that is not reserved maps to the script attribute of the same name. Reserved names are the element's own API (`name`, `enabled`, `attributes`), the global HTML attributes (such as `id`, `class` and `style`), `data-*` and `aria-*` attributes, names starting with `_` (as stamped on elements by some frameworks), and real inline event handler names such as `onclick` (a script attribute that merely starts with `on`, like `one-shot`, still maps). Attribute names are written in kebab-case and map to the script's camelCase property names (e.g. `focus-point` → `focusPoint`). A script attribute whose name collides with the script API (`app`, `entity`, `destroy`, `initialize`, `postInitialize`, `postUpdate`, `swap`, `update`) or with any other method of the script is never written and logs a console warning.

Values are parsed according to the type of the script's declared default value, following the same [value conventions](attributes.md) as every other element:

| Script attribute type | Example markup |
| --------------------- | -------------- |
| Number                | `speed="180"` |
| Boolean               | `enable-fly="false"` |
| String                | `label="Hello"` |
| Vec2 / Vec3 / Vec4    | `focus-point="0 1.75 0"` |
| Color                 | `tint="#ff0000"` or `tint="1 0 0"` |
| Quat                  | `orientation="0 90 0"` (Euler angles in degrees) |

Unlike an element's own attributes, a script attribute has no engine default to fall back to. An invalid value logs a warning and keeps the script's current value, and so does removing the attribute, unless the [`attributes` JSON](#the-attributes-json-attribute) sets the same property. An attribute the script declares with no typed default (`null`, say) is assigned the string as written, with a warning, unless you give it a [type prefix](#type-prefixes).

For example, here is the engine's `cameraControls` script configured entirely with per-property attributes. It is one of the [ready-made scripts](#using-ready-made-scripts-from-the-engine) the engine ships, loaded here from a CDN:

```html
<pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/camera-controls.mjs"></pc-asset>
<!-- ... -->
<pc-entity name="camera">
    <pc-camera></pc-camera>
    <pc-script>
        <pc-script-instance name="cameraControls"
                            enable-fly="false"
                            focus-point="0 1.75 0"
                            zoom-range="2 15"></pc-script-instance>
    </pc-script>
</pc-entity>
```

:::tip

A typo in an attribute name logs a console warning — including a "did you mean" hint if you accidentally write a camelCase name like `focusPoint` instead of `focus-point`. Keep the console open while authoring.

:::

### Type Prefixes

Number, boolean, vector and color values are inferred from the script's declared defaults. For cases where inference cannot help — referencing assets or entities, or setting an attribute whose default is `null` — prefix the value with an explicit type:

| Prefix    | Example | Description |
| --------- | ------- | ----------- |
| `asset:`  | `asset:arial-font` | References a `<pc-asset>` by its `id` attribute |
| `entity:` | `entity:player` | References a `<pc-entity>`, `<pc-model>` or `<pc-node>` by entity `name`, or by document-wide `#` selector (`entity:#player`) |
| `vec2:`   | `vec2:10 20` | A Vec2 from 2 space-separated numbers |
| `vec3:`   | `vec3:10 20 30` | A Vec3 from 3 space-separated numbers |
| `vec4:`   | `vec4:10 20 30 40` | A Vec4 from 4 space-separated numbers |
| `color:`  | `color:1 0.5 0.5` | A Color from 3 (RGB) or 4 (RGBA) space-separated numbers in the range 0 to 1 |

```html
<pc-script-instance name="myScript" font="asset:arial-font" target="entity:#player"></pc-script-instance>
```

There is no prefix for numbers or booleans, so set one whose default is `null` through the [`attributes` JSON](#the-attributes-json-attribute), where JSON's own types carry it. A prefix is not read on an attribute whose current value is a string: that value is taken as written, so a label such as `color:red` stays text.

An `entity:` value follows the same [reference grammar](attributes.md#entity-references) as entity-valued attributes like [`<pc-scrollbar>`](tags/pc-scrollbar.md)'s `handle`: a bare value is an entity `name` — resolved against the nearest enclosing entity first, then outward, then the document — and never an element `id`, while a value beginning with `#` is a document-wide selector. So `entity:body` names an entity, and `entity:#body` references the element whose `id` is `body`. Inside a [cloned `<template>`](templates.md), names resolve within the clone first, which is what lets one template wire many independent instances.

### The `attributes` JSON Attribute

Per-property attributes cover flat, simply named script attributes. For everything else, the `attributes` attribute takes a JSON object:

* **Nested structures** — arrays and objects that per-property attributes cannot express.
* **Reserved names** — script attributes whose names collide with the element's own API or standard HTML attribute names (e.g. `title`, `name`, `id`, `style`). The exception is `enabled`, which always belongs to the element: its `enabled` attribute switches the script on and off.

```html
<pc-script-instance name="annotation" attributes='{
    "label": "1",
    "title": "Cockpit Canopy",
    "text": "Transparent canopy offering visibility and housing the pilot controls."
}'></pc-script-instance>
```

:::important

The `attributes` attribute takes a JSON string. Because JSON requires properties to be enclosed in double quotes, you should enclose the JSON string in single quotes.

:::

Inside the JSON, a plain numeric array converts automatically to the script attribute's declared math type — a `Vec2`, `Vec3`, `Vec4` or `Color` default turns `[0, 1.75, 0]` into the right type, and a `Quat` default reads three numbers as Euler angles in degrees. An array of the wrong length logs a warning and keeps the current value:

```html
<pc-script-instance name="cameraControls" attributes='{
    "focusPoint": [0, 1.75, 0],
    "pitchRange": [-90, 0]
}'></pc-script-instance>
```

An object value merges with the script's declared default rather than replacing it wholesale — with a declared default of `{a: 1, b: 2}`, setting `{"a": 5}` yields `{a: 5, b: 2}`. This means you only need to specify the properties you want to change.

The [type prefixes](#type-prefixes) also work anywhere inside the JSON, including in nested arrays and objects. There, every string value is checked for one, so a string that must stay text cannot begin with `asset:`, `entity:`, `vec2:`, `vec3:`, `vec4:` or `color:`:

```html
<pc-script-instance name="xrMenu" attributes='{
    "menuItems": [{"label": "Exit XR", "eventName": "xr:end"}],
    "fontAsset": "asset:arial-font"
}'></pc-script-instance>
```

Unlike per-property attributes, the keys of the JSON are not checked against the script: a misspelled key is simply added to the script as a new property.

### Precedence

If the same script attribute is set both as a per-property attribute and in the `attributes` JSON, the per-property attribute always wins — at creation and whenever either changes at runtime. Removing a per-property attribute falls back to the JSON's value for that key when there is one; otherwise the script keeps its current value.

The engine's [Script Attributes](../scripting/script-attributes/index.md) page covers declaring attributes in the script itself.

## Accessing Scripts from JavaScript

`<pc-script-instance>` elements become *ready* once their script instance has been created. Use `whenReady()` (or the element's `ready()` promise) to wait for that, then access the live [`Script`](https://api.playcanvas.com/engine/classes/Script.html) instance via the `script` property. See [Programmatic Access](programmatic-access.md) for the full `whenReady` API:

```javascript
import { whenReady } from '@playcanvas/web-components';

const scriptElement = await whenReady('pc-script-instance');
scriptElement.script.speed = 360;
```

You can also set script attributes as an object through the `scriptAttributes` property — no JSON strings required. It is the same channel as the `attributes` attribute, so per-property attributes still win over it:

```javascript
scriptElement.scriptAttributes = { speed: 180 };
```

Values are converted with the same rules as the `attributes` attribute: type prefixes are resolved and plain numeric arrays convert to the script attribute's declared math type. Reading `scriptAttributes` returns the object you last set this way, or that the `attributes` attribute parsed to, rather than the script's live values; read those from `script`.

## Using Ready-Made Scripts from the Engine

Before you set about writing your own scripts, check to see whether the functionality you need is already available in the PlayCanvas Engine. The Engine ships with a library of useful scripts that you can use in your app. You can find them on [GitHub](https://github.com/playcanvas/engine/tree/main/scripts/esm) and they are used heavily in the [Web Component Examples](https://playcanvas.github.io/web-components/examples/).
