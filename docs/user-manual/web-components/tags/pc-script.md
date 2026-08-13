---
title: <pc-script>
description: "Reference for the pc-script element: attach a single script class to an entity, configure script attributes per-property or as JSON."
---

The `<pc-script>` tag is used to define a script.

:::note[Usage]

* It must be a direct child of a [`<pc-scripts>`](../pc-scripts) component.
* The script must have been loaded via the [`<pc-asset>`](../pc-asset) tag.

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `attributes` | String | `""` | JSON object of script attributes. Use it for nested structures and for script attribute names that collide with reserved HTML attribute names (e.g. `title`) |
| `enabled` | Boolean | `"true"` | Enabled state of the script |
| `name` | String | - | Script name (must match the script's `scriptName` property) |

</div>

In addition, any other non-reserved attribute maps to the script attribute of the same name (kebab-case to camelCase, e.g. `focus-point` → `focusPoint`). Values are parsed according to the type of the script's declared default, and the `asset:`/`entity:`/`vec2:`/`vec3:`/`vec4:`/`color:` prefixes can be used where inference cannot help. If the same script attribute is also present in the `attributes` JSON, the per-property attribute wins. See [Adding Behavior with Scripts](../scripting.md) for full details.

## Example

A `rotate` script attached to a cube. Script classes usually load from a [`<pc-asset>`](../pc-asset), but they can also be registered from an inline module — the `<pc-script>` stays pending until its class arrives. Try changing the rotation rates:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 0 3">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light></pc-light>
        </pc-entity>
        <pc-entity name="cube">
            <pc-render type="box"></pc-render>
            <pc-scripts>
                <pc-script name="rotate"></pc-script>
            </pc-scripts>
        </pc-entity>
    </pc-scene>
</pc-app>
<script type="module">
    import { registerScript, Script } from 'playcanvas';
    import { whenReady } from '@playcanvas/web-components';

    // Wait for the application, then register the script class
    await whenReady('pc-app');

    class Rotate extends Script {
        update(dt) {
            this.entity.rotate(10 * dt, 20 * dt, 30 * dt);
        }
    }

    registerScript(Rotate, 'rotate');
</script>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-script>` elements using the [ScriptElement API](https://api.playcanvas.com/web-components/classes/ScriptElement.html).

The element becomes ready once its script instance has been created — await `whenReady('pc-script')` or the element's `ready()` promise. The live `Script` instance is then available via the `script` property, and script attributes can be read and written as an object via the `scriptAttributes` property.
