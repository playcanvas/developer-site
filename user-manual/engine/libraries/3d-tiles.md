# 3D Tiles

[3D Tiles](https://www.ogc.org/standards/3DTiles) is an open standard for streaming massive 3D datasets, such as photogrammetry captures, city models and terrain. A tileset is a tree of tiles at increasing levels of detail, so a viewer loads only the tiles the camera needs, at the detail the view needs.

[3DTilesRendererJS](https://github.com/NASA-AMMOS/3DTilesRendererJS) by NASA-AMMOS loads and renders 3D Tiles, and includes a renderer for PlayCanvas. It loads the tile content with the engine's glTF parser, so the glTF extensions the engine supports work in tiles too, and it renders with WebGPU and WebGL 2.

## Installation

Install the library and the engine from npm:

```bash
npm install 3d-tiles-renderer playcanvas
```

The PlayCanvas renderer is imported from `3d-tiles-renderer/playcanvas`.

## Rendering a tileset

Create a `TilesRenderer` for the URL of the tileset's `tileset.json`, give it the camera that decides which tiles load, add its root entity to the scene, and update it every frame:

```javascript
import { TilesRenderer } from '3d-tiles-renderer/playcanvas';

const tiles = new TilesRenderer('https://example.com/tileset/tileset.json', app);
tiles.setCamera(camera.camera);
app.root.addChild(tiles.group);

// update the tiles every frame, after the camera has moved
app.on('update', () => {
    tiles.update();
});
```

The tiles are loaded as `container` assets, and created as entities with render components under `tiles.group`. An `Application` includes everything they need. An `AppBase` application needs the `RenderComponentSystem`, and the `ContainerHandler` and `TextureHandler` resource handlers.

The tileset is positioned in its own coordinate system, so move, rotate or scale `tiles.group`, or a parent entity, to place it in your scene.

## Settings

| Property | Description |
| --- | --- |
| `errorTarget` | The screen space error, in pixels, that a tile may show before more detailed tiles load in its place. Lower values load more detail and more data. Defaults to 16. |
| `lruCache.minBytesSize`, `lruCache.maxBytesSize` | The memory budget for loaded tiles, 0.3 and 0.4 GiB by default. |
| `fetchOptions` | Options passed to `fetch` for every request, such as `mode`, `credentials` or `headers`. |
| `renderOptions` | Options for the render components of the tiles, such as `castShadows`, `receiveShadows` or `layers`. |
| `assetOptions` | Options for the `container` assets the tiles are loaded as, such as glTF parser callbacks. |

Photogrammetry tiles often carry large textures. When the memory budget is too small for the view, tiles are unloaded to make room for others, and the view may never finish loading. Raise the budget for such tilesets, keeping in mind the memory of the devices you target.

## Compressed content

Tiles with Draco compressed meshes or KTX2 textures need the engine's decoders to be set up before the tiles load, otherwise those tiles fail to load:

```javascript
import { basisInitialize, dracoInitialize } from 'playcanvas';

dracoInitialize({
    jsUrl: 'wasm/draco/draco.wasm.js',
    wasmUrl: 'wasm/draco/draco.wasm.wasm'
});

basisInitialize({
    glueUrl: 'wasm/basis/basis.wasm.js',
    wasmUrl: 'wasm/basis/basis.wasm.wasm',
    fallbackUrl: 'wasm/basis/basis.js'
});
```

The decoders are not part of the `playcanvas` npm package. You can find them in the engine repository under [`examples/assets/wasm`](https://github.com/playcanvas/engine/tree/main/examples/assets/wasm).

## Customizing loaded tiles

The renderer fires events as it works. The `load-model` event fires for every loaded tile, with the entity created for its content, so you can change its materials. Photogrammetry tiles, for example, are usually unlit, with their color in the emissive map. To light them, so they also receive shadows, move the color to the diffuse map:

```javascript
tiles.on('load-model', ({ scene }) => {
    for (const render of scene.findComponents('render')) {
        for (const meshInstance of render.meshInstances) {
            const material = meshInstance.material;
            material.diffuseMap = material.emissiveMap;
            material.emissiveMap = null;
            material.emissive.set(0, 0, 0);
            material.useLighting = true;
            material.update();
        }
    }
});
```

Events can be subscribed to with `on` and `off`, or with `addEventListener` and `removeEventListener`.

## Plugins

Plugins extend the renderer, for example to authenticate with a tile service or to support more tileset features. Register them with `registerPlugin`:

```javascript
tiles.registerPlugin(plugin);
```

The engine-agnostic plugins of the library, in `3d-tiles-renderer/core/plugins`, work with the PlayCanvas renderer. A plugin can also be a plain object with the hooks the renderer calls while it loads the tileset, which is how the Helsinki example below adapts its tileset.

## Limitations

- Only glTF, GLB and B3DM tile content is supported.
- Only `box` and `sphere` bounding volumes are supported. Tiles that have only a `region` volume are not displayed.
- Engine transforms are 32-bit, so tilesets positioned on the globe, in coordinates millions of meters from the origin, are not rendered precisely. Such a tileset needs to be re-centered close to the origin in double precision before the engine sees it, as the Helsinki example does with a plugin.
- Raycasting against the tiles is not supported.

## Examples

[Live example: Mars 3D Tiles](https://playcanvas.com/examples/#/integrations/mars-3d-tiles) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/integrations/mars-3d-tiles/example.mjs))

[Live example: Helsinki 3D Tiles](https://playcanvas.com/examples/#/integrations/helsinki-3d-tiles) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/integrations/helsinki-3d-tiles/example.mjs))
