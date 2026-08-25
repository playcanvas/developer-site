---
title: <pc-wasm>
description: "Reference for the pc-wasm element: load WebAssembly modules such as Ammo, Basis, and DracoDecoderModule from glue, wasm, and fallback paths."
---

The `<pc-wasm>` tag is used to load a WebAssembly module.

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
standard `ready` event and can be awaited with `whenReady('pc-wasm')` — see
[Programmatic Access](../programmatic-access.md). You will rarely need to, though: a containing
`<pc-app>` waits for every `<pc-wasm>` declared beneath it before creating its graphics device,
so an app that is ready is an app whose modules have loaded.

Readiness is deliberately sticky. A WebAssembly module configures engine-global state that never
unloads, so removing the element does not return it to a pending state, and re-inserting it does
not load the module again.

A `<pc-wasm>` without a `name` logs a warning and never becomes ready — but it does not block
the containing `<pc-app>` from booting.

## Example

Loading the `Ammo` physics module. The box only falls because the module is declared — the app waits for it before booting, so physics is ready when the scene starts. Try removing the `<pc-wasm>` tag and re-running:

```html live-example
<pc-app>
    <!-- Load the ammo.js WebAssembly module -->
    <pc-wasm name="Ammo" glue="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.js" wasm="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.wasm" fallback="https://developer.playcanvas.com/assets/modules/ammo/ammo.js"></pc-wasm>
    <pc-scene>
        <pc-entity name="camera" position="0 2 6">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows normal-offset-bias="0.05" shadow-bias="0.2"></pc-light>
        </pc-entity>
        <pc-entity name="crate" position="0 4 0" rotation="25 15 35">
            <pc-render type="box"></pc-render>
            <pc-collision></pc-collision>
            <pc-rigid-body type="dynamic"></pc-rigid-body>
        </pc-entity>
        <pc-entity name="ground" position="0 -0.5 0" scale="10 1 10">
            <pc-render type="box"></pc-render>
            <pc-collision half-extents="5 0.5 5"></pc-collision>
            <pc-rigid-body type="static"></pc-rigid-body>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-wasm>` elements using the [WasmElement API](https://api.playcanvas.com/web-components/classes/WasmElement.html).
