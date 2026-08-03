---
title: <pc-module>
description: "Reference for the pc-module element: load WebAssembly modules such as Ammo, Basis, and DracoDecoderModule from glue, wasm, and fallback paths."
---

The `<pc-module>` tag is used to load a WebAssembly module.

:::note[Usage]

* It must be a direct child of [`<pc-app>`](../pc-app).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `fallback` | String | - | Path to fallback (asm.js) code when WebAssembly is not supported |
| `glue` | String | - | Path to the JavaScript glue code for the module |
| `name` | String | - | Module name used to reference it in scripts |
| `wasm` | String | - | Path to the WebAssembly (.wasm) file |

</div>

The `name` is case-sensitive — the engine looks the module up by exact name. The modules consumed by the engine are `Ammo` (physics), `Basis` (texture transcoding) and `DracoDecoderModule` (mesh decompression).

## Example

```html
<pc-app>
    <!-- Load the ammo.js module -->
    <pc-module name="Ammo" glue="ammo.wasm.js" wasm="ammo.wasm.wasm" fallback="ammo.js"></pc-module>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-module>` elements using the [ModuleElement API](https://api.playcanvas.com/web-components/classes/ModuleElement.html).
