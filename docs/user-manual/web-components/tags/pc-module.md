---
title: <pc-module>
---

The `<pc-module>` tag is used to load a WebAssembly module.

:::note

* It must be a direct child of [`<pc-app>`](../pc-app).

:::

## Attributes

| Attribute | Description |
| --- | --- |
| `name` | The name of the module. This is used to reference the module in scripts. |
| `glue` | The path to the glue code for the module. |
| `wasm` | The path to the WASM file for the module. |
| `fallback` | The path to the fallback (asm.js) code for the module (for when WebAssembly is not supported). |

## Example

```html
<pc-app>
    <!-- Load the ammo.js module -->
    <pc-module name="ammo" glue="ammo.js" wasm="ammo.wasm.wasm" fallback="ammo.wasm.js"></pc-module>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-module>` elements using the [ModuleElement API](https://api.playcanvas.com/web-components/classes/ModuleElement.html).
