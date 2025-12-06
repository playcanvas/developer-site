---
title: Adding Behavior with Scripts
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

We can now pass configuration to our script using the `attributes` attribute:

```html {4-6}
<pc-entity name="fast spinning cube">
    <pc-render type="box"></pc-render>
    <pc-scripts>
        <pc-script name="rotateScript" attributes='{
            "speed": 180
        }'></pc-script>
    </pc-scripts>
</pc-entity>
```

:::important

The `attributes` attribute takes a JSON string. Because JSON requires properties to be enclosed in double quotes, you should enclose the JSON string in single quotes.

:::

### PlayCanvas-Specific Types for Script Attributes

In addition to standard JavaScript types, you can configure script attributes using special PlayCanvas data types. When passing these values, you must supply them as strings formatted with a prefix followed by the required data. This ensures that the engine correctly interprets the attribute values.

The expected format for each type is as follows:

| PlayCanvas Data Type | Format Example                           | Description |
| -------------------- | ---------------------------------------- | ----------- |
| **Asset**            | `asset:your-asset-id`                    | References a `<pc-asset>`. Concatenate `asset:` with the asset's `id` attribute. |
| **Entity**           | `entity:your-entity-id`                  | References a `<pc-entity>`. Concatenate `entity:` with the entity's `id` attribute. |
| **Color**            | `color:255,200,100` or `color:255,200,100,255` | Specifies a color. Provide three comma-separated values (RGB) or four values (RGBA) prefixed by `color:`. |
| **Vec2**             | `vec2:10,20`                             | Defines a two-dimensional vector. Concatenate `vec2:` with two comma-separated numbers. |
| **Vec3**             | `vec3:10,20,30`                          | Defines a three-dimensional vector. Concatenate `vec3:` with three comma-separated numbers. |
| **Vec4**             | `vec4:10,20,30,40`                       | Defines a four-dimensional vector. Concatenate `vec4:` with four comma-separated numbers. |

Example Usage in HTML:

```html
<pc-script name="myScript" attributes='{
    "speed": 180,
    "targetColor": "color:255,100,50,255",
    "velocity": "vec3:5,0,0"
}'></pc-script>
```

[Read more](/user-manual/scripting/script-attributes) about Script Attributes.

## Using Ready Made Scripts from the Engine

Before you set about writing your own scripts, check to see whether the functionality you need is already available in the PlayCanvas Engine. The Engine ships with a library of useful scripts that you can use in your app. You can find them on [GitHub](https://github.com/playcanvas/engine/tree/main/scripts/esm) and they are used heavily in the [Web Component Examples](https://playcanvas.github.io/web-components/examples/).
