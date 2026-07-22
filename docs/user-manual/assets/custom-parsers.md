---
title: Custom Asset Parsers
description: Register custom file format parsers with the engine's resource handlers to load new asset formats or override the built-in ones.
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** Register custom file format parsers with the engine's resource handlers to load new asset formats or override the built-in ones; inspect the resulting asset metadata, registry state, and references.
- **[VS Code Extension](/user-manual/ai/vscode-extension/):** Implement Custom Asset Parsers in the relevant asset-management scripts so it satisfies this requirement: register custom file format parsers with the engine's resource handlers to load new asset formats or override the built-in ones; review the complete diff and diagnostics before Push.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Write and attach the scripts needed for Custom Asset Parsers so they satisfy this requirement: register custom file format parsers with the engine's resource handlers to load new asset formats or override the built-in ones; launch the scene and inspect asset registry state, references, and runtime logs.

:::

Every asset type in PlayCanvas is loaded by a **resource handler** — one per asset type (`'texture'`, `'model'`, `'audio'` and so on). Within a handler, the individual file formats are handled by **parsers**: the texture handler, for example, has parsers for browser images, DDS, KTX2 and Basis. Handlers expose a public registry for these parsers, so you can add support for a new file format — or override a built-in one — without modifying the engine.

:::note

Custom parsers are available from **engine v2.21.0**. They are an engine runtime API: parsers run in your application at load time and do not affect the Editor's asset import pipeline.

:::

## How asset loading works

When an asset is loaded, the [`ResourceLoader`](https://api.playcanvas.com/engine/classes/ResourceLoader.html) looks up the [`ResourceHandler`](https://api.playcanvas.com/engine/classes/ResourceHandler.html) registered for the asset's type. The handler then selects a parser by asking each registered parser, **newest-first**, whether it recognizes the resource:

1. The handler builds a context describing the resource (its URL, file extension and so on)
2. The most recently registered parser whose `canParse(context)` returns `true` is selected
3. The parser's `load()` fetches the file and delivers its data
4. The parser's `open()` converts that data into the runtime resource (a `Texture`, a `Model`, ...)

Because selection is newest-first, a parser you register later takes precedence over the built-in ones for any resource it claims.

## The parser contract

A parser is a plain object or class instance with the following methods:

```javascript
class MyParser {
    // return true if this parser handles the described resource
    canParse(context) {
        return context.ext === 'myformat';
    }

    // fetch the resource and deliver its raw data via callback(err, data)
    load(url, callback, asset) {
        this.handler.fetch(url, pc.Http.ResponseType.ARRAY_BUFFER, callback, asset);
    }

    // optional: convert the loaded data into the runtime resource
    open(url, data, asset) {
        return data;
    }
}
```

The `context` passed to `canParse` describes the resource being loaded:

| Property   | Description                                                                  |
| ---------- | ---------------------------------------------------------------------------- |
| `url`      | The original resource URL, with any query string removed (or `null`)         |
| `ext`      | The lower-cased file extension without the leading dot, for example `'tga'`  |
| `basename` | The lower-cased file name, for example `'lod-meta.json'`                     |
| `asset`    | The [`Asset`](https://api.playcanvas.com/engine/classes/Asset.html) being loaded, if any |
| `app`      | The running [`AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html) |

When a parser is registered, the handler assigns itself to the parser's `handler` property. This gives `load()` access to `this.handler.fetch(url, responseType, callback, asset)` — a helper that downloads the resource with the handler's retry settings and reuses pre-fetched data when available — as well as any handler state (for example `this.handler.app`).

## Registering a parser

Parsers are registered on the handler for their asset type:

```javascript
app.loader.getHandler('texture').addParser(new TgaParser());
```

Register parsers before starting any loads for that asset type. A registered parser can be removed again with `removeParser(parser)`, and the currently registered parsers can be inspected via the read-only `parsers` property.

Since selection is newest-first, registering a parser that claims a format already covered by a built-in parser overrides the built-in — this works for specific extensions as well as for catch-all parsers.

## Example: a TGA texture parser

The engine does not load `.tga` files at runtime. A custom parser adds support:

```javascript
class TgaParser {
    canParse(context) {
        return context.ext === 'tga';
    }

    load(url, callback, asset) {
        this.handler.fetch(url, pc.Http.ResponseType.ARRAY_BUFFER, callback, asset);
    }

    // texture parsers use an extended open signature: the handler passes the graphics
    // device and the texture options derived from the asset's data
    open(url, data, device, textureOptions) {
        // decode the TGA file into RGBA8 pixels (using your decoder of choice)
        const { width, height, pixels } = decodeTga(data);

        const texture = new pc.Texture(device, {
            name: url,
            width: width,
            height: height,
            format: pc.PIXELFORMAT_RGBA8,
            levels: [pixels],

            // spread the asset-derived options last, so that asset settings
            // (srgb, filtering, mipmaps, ...) override the defaults above
            ...textureOptions
        });

        texture.upload();

        return texture;
    }
}

app.loader.getHandler('texture').addParser(new TgaParser());
```

With the parser registered, `.tga` files load like any other texture:

```javascript
const asset = new pc.Asset('picture', 'texture', { url: 'images/picture.tga' }, { srgb: true });
app.assets.add(asset);
app.assets.load(asset);
```

For a complete, runnable example of a custom **model** parser, see the engine's [OBJ parser](https://github.com/playcanvas/engine/blob/main/scripts/parsers/obj-model.js) and the [OBJ loader example](https://playcanvas.github.io/#/loaders/obj) that uses it.

## Handler notes

Most format-bearing handlers participate in the parser registry: `model`, `texture`, `material`, `gsplat`, `container`, `animation`, `animclip`, `animstategraph`, `template`, `audio`, `json`, `css`, `html`, `text`, `shader` and `binary`. A few details vary by asset type:

- **texture** — parsers implement the extended `open(url, data, device, textureOptions)` shown above. The built-in browser image parser is a catch-all, so unknown extensions fall back to it unless your parser claims them.
- **material** — the handler's asset binding (assigning texture assets referenced by the material data) applies to `StandardMaterial` produced by the built-in JSON parser; materials produced by custom parsers manage their own asset references.
- **audio** — the sound manager is available to parsers as `this.handler.manager`; a custom parser can decode to an `AudioBuffer` and return it wrapped in a `pc.Sound`.
- Handlers that compose other assets rather than parse file formats (`cubemap`, `font`, `sprite`, `textureatlas`) and special-purpose handlers (`bundle`, `script`, `folder`) do not consult registered parsers.

## See Also

- [`ResourceHandler` API Reference](https://api.playcanvas.com/engine/classes/ResourceHandler.html)
- [`ResourceLoader` API Reference](https://api.playcanvas.com/engine/classes/ResourceLoader.html)
- [Supported Formats](supported-formats.md)
- [Loading and Unloading](loading-unloading.md)
