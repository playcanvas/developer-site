# The LCC2 Format

**LCC2** is a format for large Gaussian splat scenes from [XGRIDS](https://github.com/xgrids/LCC2Whitepaper), the maker of the Lixel scanners and LCC Studio. A scene is a tree of regions, each holding its splats at one level of detail (LOD), with the splats stored in chunk files that are streamed on demand. The engine loads `.lcc2` files directly, so scenes exported by XGRIDS software can be streamed without conversion.

:::note[Attribution]

The LCC2 data organization format originated from XGRIDS. The XGRIDS licence requires applications that ship LCC2 data to display the attribution "Data Organization Format originated from XGRIDS".

:::

## File Set

An LCC2 scene is a folder with a JSON index file and its splat files:

```none
scene/
├── scene.lcc2           # index: scene info and the LOD tree
├── data/
│   ├── 3dgs/            # splat files, .sog or .spz (required)
│   └── mesh/            # optional collision meshes (not loaded by the engine)
└── info/                # optional scene attributes, such as the spawn point
```

The splat files of a scene are all of one kind, either [SOG](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/sog.md) or [SPZ](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/spz.md), which the `splatType` field of the index states. Several regions can share one file, each referencing a range of splats within it.

## How the Tree Works

The index describes a tree of bounding boxes. Every node below the root holds one LOD of its region, and its children together hold the next finer level of the same region. The coarsest level sits just below the root and the leaves hold the finest. A viewer shows a node while it is far away, and swaps it for its children when it gets closer. The root holds no splats, only an optional environment chunk for far-field background such as sky.

## Loading in PlayCanvas

Load the `.lcc2` file as a `gsplat` asset, in the same way as a [Streamed SOG](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/streamed-sog.md) scene. The splat files are then requested as the camera moves.

```javascript
const asset = new Asset('scene', 'gsplat', { url: 'scene/scene.lcc2' });
app.assets.add(asset);
app.assets.load(asset);

const entity = new Entity('scene');
entity.addComponent('gsplat', { asset });

// LCC2 scenes store +Z up
entity.setLocalEulerAngles(270, 0, 0);
app.root.addChild(entity);
```

How much detail is loaded, and how it falls off with distance, is controlled in the same way as for Streamed SOG. See [Controlling LOD Behavior](https://developer.playcanvas.com/user-manual/gaussian-splatting/building/lod-streaming.md#controlling-lod-behavior) and the [global splat budget](https://developer.playcanvas.com/user-manual/gaussian-splatting/building/performance.md#global-splat-budget).

### SOG and SPZ Splat Files

LCC2 scenes with SOG splat files need nothing beyond the engine, as SOG is built in. Scenes with SPZ splat files need the SPZ parser registered with the `gsplat` resource handler, because the splat files are requested by their `.spz` extension. See [Loading in PlayCanvas](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/spz.md#loading-in-playcanvas) for the setup. SPZ version 3 files, which LCC2 uses, do not need the ZSTD module.

## Engine Support Notes

- Only the splats are loaded. The collision meshes, BVH files, spawn point and other scene information are ignored.
- The `offset`, `shift` and `scale` fields of the index are not applied.
- Spherical harmonics are loaded when the splat files contain them.
- The environment chunk, when present, is loaded and rendered with the scene. It represents the surroundings as seen from the scanned positions, so it can look like large blobs when the camera moves far from them.

## Examples

See the [Streamed LCC2 example](https://playcanvas.github.io/#/gaussian-splatting/streamed-lcc2) for a complete setup, and the [Viewer example](https://playcanvas.github.io/#/gaussian-splatting/viewer), which opens an LCC2 scene from its URL.

## Converting LCC2

[SplatTransform](https://developer.playcanvas.com/user-manual/splat-transform.md) reads LCC2 scenes and can convert them to [Streamed SOG](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/streamed-sog.md) or any other supported format. See [Generating Streamed SOG](https://developer.playcanvas.com/user-manual/splat-transform/streamed-sog.md).
