---
title: Adding Behavior with Scripts
description: Attach PlayCanvas Script classes to entities with pc-module and pc-script tags, load ES modules, and wire behaviors into Web Components.
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

Scripts are loaded via the [`<pc-asset>`](../tags/pc-asset) tag:

```html
<pc-asset src="path/to/rotate-script.mjs"></pc-asset>
```

Then attach it to an entity using [`<pc-scripts>`](../tags/pc-scripts) and [`<pc-script>`](../tags/pc-script):

```html
<pc-entity name="spinning cube">
    <pc-render type="box"></pc-render>
    <pc-scripts>
        <pc-script name="rotateScript"></pc-script>
    </pc-scripts>
</pc-entity>
```

:::important

The `name` attribute of `<pc-script>` must match the value of the `scriptName` property of the script.

:::

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

We can now configure the script simply by adding a `speed` attribute to the `<pc-script>` tag:

```html {4}
<pc-entity name="fast spinning cube">
    <pc-render type="box"></pc-render>
    <pc-scripts>
        <pc-script name="rotateScript" speed="180"></pc-script>
    </pc-scripts>
</pc-entity>
```

Any attribute on `<pc-script>` that is not part of the element's own API (`name`, `enabled`, `attributes` and standard HTML attributes such as `id` and `style`) maps to the script attribute of the same name. Attribute names are written in kebab-case and map to the script's camelCase property names (e.g. `focus-point` → `focusPoint`).

Values are parsed according to the type of the script's declared default value, following the same [value conventions](attributes.md) as every other element:

| Script attribute type | Example markup |
| --------------------- | -------------- |
| Number                | `speed="180"` |
| Boolean               | `enable-fly="false"` |
| String                | `label="Hello"` |
| Vec2 / Vec3 / Vec4    | `focus-point="0 1.75 0"` |
| Color                 | `tint="#ff0000"` or `tint="1 0 0"` |
| Quat                  | `orientation="0 90 0"` (Euler angles in degrees) |

For example, here is the engine's `cameraControls` script configured entirely with per-property attributes:

```html
<pc-script name="cameraControls"
           enable-fly="false"
           focus-point="0 1.75 0"
           zoom-range="2 15"></pc-script>
```

:::tip

A typo in an attribute name logs a console warning — including a "did you mean" hint if you accidentally write a camelCase name like `focusPoint` instead of `focus-point`. Keep the console open while authoring.

:::

### Type Prefixes

Number, boolean, vector and color values are inferred from the script's declared defaults. For cases where inference cannot help — referencing assets or entities, or setting an attribute whose default is `null` — prefix the value with an explicit type:

| Prefix    | Example | Description |
| --------- | ------- | ----------- |
| `asset:`  | `asset:arial-font` | References a `<pc-asset>` by its `id` attribute |
| `entity:` | `entity:#player` | References a `<pc-entity>` by CSS selector, element `id` or entity `name` |
| `vec2:`   | `vec2:10 20` | A Vec2 from 2 space-separated numbers |
| `vec3:`   | `vec3:10 20 30` | A Vec3 from 3 space-separated numbers |
| `vec4:`   | `vec4:10 20 30 40` | A Vec4 from 4 space-separated numbers |
| `color:`  | `color:1 0.5 0.5` | A Color from 3 (RGB) or 4 (RGBA) space-separated numbers in the range 0 to 1 |

```html
<pc-script name="myScript" font="asset:arial-font" target="entity:#player"></pc-script>
```

### The `attributes` JSON Attribute

Per-property attributes cover flat, simply named script attributes. For everything else, the `attributes` attribute takes a JSON object:

* **Nested structures** — arrays and objects that per-property attributes cannot express.
* **Reserved names** — script attributes whose names collide with the element's own API or standard HTML attribute names (e.g. `title`, `name`, `enabled`, `id`, `style`).

```html
<pc-script name="annotation" attributes='{
    "label": "1",
    "title": "Cockpit Canopy",
    "text": "Transparent canopy offering visibility and housing the pilot controls."
}'></pc-script>
```

:::important

The `attributes` attribute takes a JSON string. Because JSON requires properties to be enclosed in double quotes, you should enclose the JSON string in single quotes.

:::

Inside the JSON, a plain numeric array converts automatically to the script attribute's declared math type — a `Vec2`, `Vec3`, `Vec4` or `Color` default turns `[0, 1.75, 0]` into the right type:

```html
<pc-script name="cameraControls" attributes='{
    "focusPoint": [0, 1.75, 0],
    "pitchRange": [-90, 0]
}'></pc-script>
```

The [type prefixes](#type-prefixes) also work anywhere inside the JSON, including in nested arrays and objects:

```html
<pc-script name="xrMenu" attributes='{
    "menuItems": [{"label": "Exit XR", "eventName": "xr:end"}],
    "fontAsset": "asset:arial-font"
}'></pc-script>
```

### Precedence

If the same script attribute is set both as a per-property attribute and in the `attributes` JSON, the per-property attribute always wins — at creation and whenever either changes at runtime. Removing a per-property attribute falls back to the JSON's value for that key (when present), otherwise to the script's default.

### Accessing Scripts from JavaScript

`<pc-script>` elements become *ready* once their script instance has been created. Use `whenReady()` (or the element's `ready()` promise) to wait for that, then access the live [`Script`](https://api.playcanvas.com/engine/classes/Script.html) instance via the `script` property. See [Programmatic Access](programmatic-access.md) for the full `whenReady` API:

```javascript
import { whenReady } from '@playcanvas/web-components';

const scriptElement = await whenReady('pc-script');
scriptElement.script.speed = 360;
```

You can also read and write script attributes as an object via the `scriptAttributes` property — no JSON strings required:

```javascript
scriptElement.scriptAttributes = { speed: 2, focusPoint: [0, 1.75, 0] };
```

Values are converted with the same rules as the `attributes` attribute: type prefixes are resolved and plain numeric arrays convert to the script attribute's declared math type.

[Read more](/user-manual/scripting/script-attributes) about Script Attributes.

## Using Ready Made Scripts from the Engine

Before you set about writing your own scripts, check to see whether the functionality you need is already available in the PlayCanvas Engine. The Engine ships with a library of useful scripts that you can use in your app. You can find them on [GitHub](https://github.com/playcanvas/engine/tree/main/scripts/esm) and they are used heavily in the [Web Component Examples](https://playcanvas.github.io/web-components/examples/).
