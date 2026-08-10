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

:::note[When these are read]

The attributes are read once, when the module starts loading — on the element's first connection
to the document, or earlier if a containing `<pc-app>` boots first and collects it. Changing them
afterwards has no effect. Creating the element programmatically works as you would expect: set the
attributes before appending the element to the document.

:::

## Readiness

The element initializes asynchronously and becomes ready once its module has loaded: it fires the
standard `ready` event and can be awaited with `whenReady('pc-module')` — see
[Programmatic Access](../programmatic-access.md). You will rarely need to, though: a containing
`<pc-app>` waits for every `<pc-module>` declared beneath it before creating its graphics device,
so an app that is ready is an app whose modules have loaded.

Readiness is deliberately sticky. A WebAssembly module configures engine-global state that never
unloads, so removing the element does not return it to a pending state, and re-inserting it does
not load the module again.

A `<pc-module>` without a `name` logs a warning and never becomes ready — but it does not block
the containing `<pc-app>` from booting.

## Example

```html
<pc-app>
    <!-- Load the ammo.js module -->
    <pc-module name="Ammo" glue="ammo.wasm.js" wasm="ammo.wasm.wasm" fallback="ammo.js"></pc-module>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-module>` elements using the [ModuleElement API](https://api.playcanvas.com/web-components/classes/ModuleElement.html).
