---
title: <pc-wasm>
description: "Reference for the pc-wasm element: load WebAssembly modules such as Ammo, Basis, and DracoDecoderModule from glue, wasm, and fallback paths."
---

The `<pc-wasm>` tag loads a WebAssembly module the engine needs before the application starts — `Ammo` for physics, `Basis` or `DracoDecoderModule` for compressed assets.

:::note[Usage]

* It must be a direct child of [`<pc-app>`](../pc-app).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `fallback` | String | - | Path to fallback (asm.js) code when WebAssembly is not supported. The Draco decoder ignores it |
| `glue` | String | - | Path to the JavaScript glue code for the module |
| `name` | String | - | Module name used to reference it in scripts |
| `wasm` | String | - | Path to the WebAssembly (.wasm) file |

</div>

The `name` is case-sensitive — the engine looks the module up by exact name. The modules consumed by the engine are `Ammo` (physics), `Basis` (texture transcoding) and `DracoDecoderModule` (mesh decompression). Getting the case wrong is the one load failure the element cannot report: with `name="ammo"`, the engine throws a `TypeError` as the glue script loads, no `error` event fires, and neither the element nor its `<pc-app>` ever becomes ready.

:::note[When these are read]

The attributes are read once, when the module starts loading — on the element's first connection
to the document, or earlier if a containing `<pc-app>` boots first and collects it. Changing them
afterwards has no effect. Creating the element programmatically works as you would expect: set the
attributes before appending the element to the document.

:::

## Readiness

The element initializes asynchronously and becomes ready once its module has loaded or failed to
load: it fires the standard `ready` event and can be awaited with `whenReady('pc-wasm')` — see
[Programmatic Access](../programmatic-access.md). (`Basis` is the exception: it is ready as soon
as its transcoder starts loading.) Readiness means the load settled, not that it succeeded; a
module that fails also fires [`error`](#events). You will rarely need to wait for the element,
though: a `<pc-app>` waits for every `<pc-wasm>` among its children to settle before creating its
graphics device, so by the time the app is ready each module has either loaded or reported its
failure. A `<pc-wasm>` nested any deeper still loads, but the app does not wait for it.

Readiness is deliberately sticky. A WebAssembly module configures engine-global state that never
unloads, so removing the element does not return it to a pending state, and re-inserting it does
not load the module again.

A `<pc-wasm>` without a `name` logs a warning and never becomes ready — but it does not block
the containing `<pc-app>` from booting.

Declare `Ammo` in the markup rather than adding it later. The engine looks for the physics module
once, as the application starts, so an app that booted without it runs without physics.

## Events

Listen to this event using [`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) or by assigning an event listener to the `oneventname` property of this interface.

| Event | Description |
| --- | --- |
| `error` | An [`ErrorEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent) fired when the module fails to load — from a mistyped URL, say, or a server that refuses it — with the engine's error in `message`. It fires once per element, and the element still becomes ready. A `Basis` module never fires it. |

The event does not bubble, so listen on the element itself or with a capture-phase listener on
`<pc-app>`.

A module that fails to load does not stop the application. The element logs
`pc-wasm failed to load module '<name>' - <error>` to the console, and the containing `<pc-app>`
boots without the module — a failed `Ammo` leaves the app running without physics. The engine
never tries to load a failed module again, so every `<pc-wasm>` for that module fails with it: one
already waiting when the load fails, and one added later, in a second `<pc-app>` say, which fails
straight away.

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

The element exposes no engine object of its own. A module that loads is instantiated through the engine's `WasmModule` under its `name` (`Basis` goes through the engine's Basis initializer instead). Ammo's glue script defines the global `Ammo`, so scripts can use it directly; reach other modules through `WasmModule.getInstance(name, callback)`. Both depend on the load succeeding, which readiness does not tell you: after a failed load the element is still ready, but `Ammo` stays undefined and `getInstance` never calls its callback. Code that needs a module must handle that outcome — listen for the element's [`error`](#events) event and carry on without the module, running without physics for a failed `Ammo`, rather than wait on `getInstance`.

## See Also

* [`<pc-rigid-body>`](../pc-rigid-body) — physics, the usual reason to load Ammo
* [`<pc-collision>`](../pc-collision) — collision shapes for physics
* [`<pc-app>`](../pc-app) — waits for every module before it boots

Examples: [Basic Physics](https://playcanvas.github.io/web-components/examples/#basic-physics.html), [Vehicle Physics](https://playcanvas.github.io/web-components/examples/#vehicle-physics.html) and [Video Texture](https://playcanvas.github.io/web-components/examples/#video-texture.html).
