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

```html
<pc-entity>
    <pc-scripts>
        <pc-script name="myScript" speed="180" target-color="#ff6432"></pc-script>
    </pc-scripts>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-script>` elements using the [ScriptElement API](https://api.playcanvas.com/web-components/classes/ScriptElement.html).

The element becomes ready once its script instance has been created — await `whenReady('pc-script')` or the element's `ready()` promise. The live `Script` instance is then available via the `script` property, and script attributes can be read and written as an object via the `scriptAttributes` property.
