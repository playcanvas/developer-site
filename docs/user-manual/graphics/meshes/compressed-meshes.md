---
title: Compressed Meshes
description: Load GLB models compressed with Draco or meshopt in PlayCanvas, and choose between the two to cut model download size.
---

The geometry in a GLB file is often most of its size. Compressing it can make the file several times smaller, so it downloads faster, at the cost of decoding it when it loads.

The engine loads GLB and glTF files compressed with either of the two common glTF compression schemes:

| Scheme | glTF extensions | Decoder |
|--------|-----------------|---------|
| [Draco](https://google.github.io/draco/) | `KHR_draco_mesh_compression` | Draco WebAssembly module, run in web workers |
| [meshopt](https://meshoptimizer.org/) | `EXT_meshopt_compression`, `KHR_meshopt_compression` | meshoptimizer decoder module |

Neither decoder is part of the engine. You serve the decoder files with your application and tell the engine where they are, as described below. A compressed file loaded without its decoder fails to load.

## Choosing a Scheme

Both schemes shrink geometry a lot, but they work differently:

- **Draco** compresses mesh primitives: vertex positions, normals, texture coordinates and other attributes, and indices. It usually produces the smallest files for static geometry, but decoding is comparatively slow, so the engine decodes it in web workers. Draco does not compress animations or morph targets.
- **meshopt** compresses the glTF buffer views themselves, so it applies to all binary data in the file: vertex attributes, indices, animation keyframes and morph targets. Files are usually a little larger than Draco's, but decoding is much faster. Compressed meshopt data also compresses further with the gzip or Brotli compression that web servers apply.

Prefer meshopt for animated or skinned models and when load time on slower devices matters, and Draco when the smallest download of static geometry matters most.

Textures are not affected by either scheme. To compress them as well, use [Basis](/user-manual/optimization/texture-compression/) textures.

## Draco

### Creating Draco Files

- [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline): `gltf-pipeline -i model.glb -o model-draco.glb -d`
- [glTF-Transform](https://gltf-transform.dev/): `gltf-transform draco model.glb model-draco.glb`
- Blender's glTF exporter, with the **Compression** option enabled.
- The Editor can compress models with Draco when it imports them. See [Mesh Compression](/user-manual/editor/assets/import-pipeline/#mesh-compression) in the import settings.

### Loading Draco Files

The Draco decoder is a WebAssembly module with a JavaScript glue script. Take the files from a [Draco release](https://github.com/google/draco/releases), or copy the set in the engine's [examples](https://github.com/playcanvas/engine/tree/main/examples/assets/wasm/draco), and configure the engine with their URLs before loading any Draco compressed model:

```javascript
import { WasmModule } from 'playcanvas';

WasmModule.setConfig('DracoDecoderModule', {
    glueUrl: 'lib/draco/draco.wasm.js',
    wasmUrl: 'lib/draco/draco.wasm.wasm',
    fallbackUrl: 'lib/draco/draco.js'
});

// optionally wait for the decoder to load before loading models
await new Promise((resolve) => {
    WasmModule.getInstance('DracoDecoderModule', resolve);
});
```

Alternatively, configure the decoder directly with [`dracoInitialize`](https://api.playcanvas.com/engine/functions/dracoInitialize.html), which also sets the number of workers decoding in parallel:

```javascript
import { dracoInitialize } from 'playcanvas';

dracoInitialize({
    jsUrl: 'lib/draco/draco.wasm.js',
    wasmUrl: 'lib/draco/draco.wasm.wasm',
    numWorkers: 2,
    lazyInit: true  // start the workers when the first Draco mesh loads
});
```

Without either, the engine looks for `draco.wasm.js` and `draco.wasm.wasm` next to the page.

In the Editor, add the decoder to the project with the **Draco Library** button in the [Rendering settings](/user-manual/editor/interface/settings/rendering/), and the engine is configured for you.

For a working project, see the [Loading Draco Compressed GLBs](/tutorials/loading-draco-compressed-glbs/) tutorial.

## Meshopt

Meshopt support requires Engine 2.24 or later.

### Creating Meshopt Files

- [gltfpack](https://meshoptimizer.org/gltf/): `gltfpack -i model.glb -o model-meshopt.glb -cc`. The `-c` option compresses, and `-cc` compresses further. gltfpack also quantizes vertex data with `KHR_mesh_quantization`, which the engine supports.
- [glTF-Transform](https://gltf-transform.dev/): `gltf-transform meshopt model.glb model-meshopt.glb`

### Loading Meshopt Files

The decoder is `meshopt_decoder.mjs` from the [meshoptimizer](https://github.com/zeux/meshoptimizer/tree/master/js) JavaScript package. Initialize it with [`meshoptInitialize`](https://api.playcanvas.com/engine/functions/meshoptInitialize.html) before loading any meshopt compressed model. Either pass the URL of the decoder module, which the engine imports the first time a meshopt compressed file loads:

```javascript
import { meshoptInitialize } from 'playcanvas';

meshoptInitialize({ url: 'lib/meshopt/meshopt_decoder.mjs' });
```

Or, when you bundle your application, import the decoder from the `meshoptimizer` npm package and pass it in:

```javascript
import { MeshoptDecoder } from 'meshoptimizer';
import { meshoptInitialize } from 'playcanvas';

meshoptInitialize({ decoder: MeshoptDecoder });
```

A relative `url` resolves against the page, like any other URL in your document. Files using `KHR_meshopt_compression` need the decoder from meshoptimizer 1.0 or later.

By default the decoder runs on the main thread, which is fast enough for most models. To decode large files without blocking the main thread, set `numWorkers` to decode on web workers instead:

```javascript
meshoptInitialize({ url: 'lib/meshopt/meshopt_decoder.mjs', numWorkers: 2 });
```

Once the decoder is initialized, meshopt compressed models load like any other, as `container` assets:

```javascript
import { Asset } from 'playcanvas';

const asset = new Asset('model', 'container', { url: 'models/model-meshopt.glb' });
asset.ready(() => {
    const entity = asset.resource.instantiateRenderEntity();
    app.root.addChild(entity);
});
app.assets.add(asset);
app.assets.load(asset);
```

If no decoder was initialized, loading fails with an error saying the buffer view is meshopt compressed and naming `meshoptInitialize`. The exception is a file that also contains uncompressed fallback data, such as one written by gltfpack with `-cf`: without a decoder, the engine loads the fallback data instead, and with one, it skips downloading the fallback.
