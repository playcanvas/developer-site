---
title: <pc-script-instance>
description: "Reference for the pc-script-instance element: attach a single script class to an entity, configure script attributes per-property or as JSON."
---

The `<pc-script-instance>` tag is used to define a script.

:::note[Usage]

* It must be a direct child of a [`<pc-script>`](../pc-script) component.
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

In addition, any other non-reserved attribute maps to the script attribute of the same name (kebab-case to camelCase, e.g. `focus-point` → `focusPoint`). Values are parsed according to the type of the script's declared default, and the `asset:`/`entity:`/`vec2:`/`vec3:`/`vec4:`/`color:` prefixes can be used where inference cannot help. An `entity:` value is an entity `name` — write `entity:#id` to reference an element by `id`. If the same script attribute is also present in the `attributes` JSON, the per-property attribute wins. See [Adding Behavior with Scripts](../scripting.md) for full details.

Declared values are the source of truth. When the host entity cycles — a [`<pc-node>`](../pc-node) rebinding after its model reloads, for instance — a surviving script instance has its declared state re-asserted, which deliberately snaps back any runtime mutation of a declared property. Keep state you change at runtime in properties the markup does not declare.

## Events

Listen to these events using [`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

| Event | Description |
| --- | --- |
| `scriptattributeschange` | Fired when the script attributes change. `detail.attributes` carries the new attributes object. |
| `scriptenablechange` | Fired when `enabled` changes. `detail.enabled` carries the new state. |
| `scriptnamechange` | Fired when the script is renamed by changing `name` on an element that already had one. `detail.oldName` and `detail.newName` carry the two names, and the parent [`<pc-script>`](../pc-script) responds by destroying the old script and creating the new one. |

All three bubble. The parent [`<pc-script>`](../pc-script) listens for them to apply each change to the engine, and the same events let your own code observe script configuration changing — one listener on an ancestor covers every script instance beneath it.

## Example

A `rotate` script attached to a cube. Script classes usually load from a [`<pc-asset>`](../pc-asset), but they can also be registered from an inline module — the `<pc-script-instance>` stays pending until its class arrives. Try changing the rotation rates:

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
            <pc-script>
                <pc-script-instance name="rotate"></pc-script-instance>
            </pc-script>
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

You can programmatically create and manipulate `<pc-script-instance>` elements using the [ScriptInstanceElement API](https://api.playcanvas.com/web-components/classes/ScriptInstanceElement.html).

The element becomes ready once its script instance has been created — await `whenReady('pc-script-instance')` or the element's `ready()` promise. The live `Script` instance is then available via the `script` property, and script attributes can be read and written as an object via the `scriptAttributes` property.
