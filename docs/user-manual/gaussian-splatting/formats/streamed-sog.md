---
title: The Streamed SOG Format
description: "Streamed SOG specification: lod-meta.json layout, spatial tree, LOD chunk references, and environment splats."
sidebar_label: Streamed SOG
---

**Streamed SOG** splits a Gaussian splat scene into spatial chunks at multiple levels of detail (LOD). A viewer walks a spatial tree to decide which chunks and detail levels to load for the current camera, allowing very large scenes (tens of millions of Gaussians) to load progressively and stay interactive.

You can create Streamed SOG datasets with **[SplatTransform](https://github.com/playcanvas/splat-transform)** — see [Generating Streamed SOG](/user-manual/splat-transform/#generating-lod-format) for a step-by-step walkthrough. Individual chunks are standard [SOG](./sog.md) datasets.

This document is the format specification. It describes **version 1**.

## 1. File set

A Streamed SOG dataset is a directory containing a single index file plus one subdirectory per chunk:

```none
scene/
├── lod-meta.json        # index: scene info + spatial tree (this spec)
├── 0_0/                 # LOD 0, chunk 0 — unbundled SOG (meta.json + .webp textures)
│   ├── meta.json
│   └── *.webp
├── 0_1/                 # LOD 0, chunk 1
├── 1_0/                 # LOD 1, chunk 0
├── …                    # one directory per {lod}_{chunk}
└── env/                 # optional environment splats — unbundled SOG
```

* The index file is always named `lod-meta.json`. Loaders identify the format by this filename.
* Each chunk is a standard **unbundled** [SOG](./sog.md) dataset (a `meta.json` plus WebP texture files). Bundled (single-archive) SOG chunks are not part of this format.
* All paths in `lod-meta.json` are relative to the directory containing `lod-meta.json`.

:::note[Chunk naming]

The `{lod}_{chunk}/` directory naming is a convention of the writer. Readers **must** resolve chunk locations through the `filenames` array, not the naming pattern.

:::

---

## 2. `lod-meta.json`

```ts
interface LodMeta {
  version: 1;                  // File format version (integer)
  asset?: {                    // Optional tool/version metadata
    generator?: string;        // e.g. "splat-transform v2.5.2"
  };
  count: number;               // Total gaussians across all LOD levels (excludes environment)
  counts: number[];            // Gaussians per LOD level; index = LOD level, length = lodLevels
  lodLevels: number;           // Number of LOD levels
  environment?: string;        // Relative path to the environment SOG's meta.json; omitted if none
  filenames: string[];         // Relative paths to chunk SOG meta.json files, referenced by index
  tree: Node;                  // Root of the spatial tree
}

interface Node {
  bound: {
    min: [number, number, number];   // AABB minimum [x, y, z]
    max: [number, number, number];   // AABB maximum [x, y, z]
  };
  children?: [Node, Node];     // Interior node: exactly two child nodes
  lods?: {
    [lodLevel: string]: {      // Leaf node: map of LOD level → splat range
      file: number;            // Index into filenames
      offset: number;          // Index of the first splat within the chunk
      count: number;           // Number of consecutive splats
    };
  };
}
```

---

## 3. The spatial tree

`tree` is a binary spatial subdivision of the scene. Every node carries an axis-aligned bounding box and is either an **interior node** (has `children`, always exactly two) or a **leaf node** (has `lods`) — never both.

* A leaf's `bound` encloses the full extents of every Gaussian assigned to it — each Gaussian's position expanded by its rotated, scaled ellipsoid — not just the Gaussian centers.
* An interior node's `bound` is the union of its children's bounds.
* Bounds are expressed in the same coordinate frame as the splat positions stored in the chunk SOG files.

### 3.1 LOD levels

LOD level `0` is the highest detail; higher levels are progressively coarser. A leaf's `lods` object is keyed by the decimal string form of the LOD level (`"0"` … `"lodLevels - 1"`). A missing key means the leaf has no splats at that level.

All LOD levels of a leaf cover the same spatial region — a viewer selects exactly one level per leaf based on, for example, distance to camera.

### 3.2 Chunk references

Each `lods` entry addresses a contiguous run of splats within one chunk:

* `file` is an index into the top-level `filenames` array.
* `offset` and `count` select splats `[offset, offset + count)` in the chunk's storage order (splat indices, not bytes). In the chunk's SOG textures, storage order is row-major pixel order, so splat `i` lives at pixel `(i % W, floor(i / W))`.

A chunk file's contents are exactly the concatenation of the leaf runs that reference it: the runs are non-overlapping and cover the chunk completely. Within each run, splats are sorted in Morton order for spatial locality; no ordering holds across run boundaries. A chunk only ever contains splats of a single LOD level.

---

## 4. Environment

The optional `environment` field points to a standard unbundled [SOG](./sog.md) dataset containing splats that are not part of the LOD/chunk streaming scheme — typically far-field background such as sky. A viewer **should** load and render the environment unconditionally, independent of the spatial tree.

---

## 5. Precision

Non-integer numbers in `lod-meta.json` are quantized to 7 significant digits (approximately 32-bit float precision).

---

## 6. Example `lod-meta.json`

A two-level scene with an environment, split into one interior node with two leaves:

```json
{
  "version": 1,
  "asset": { "generator": "splat-transform v2.5.2" },
  "count": 1500000,
  "counts": [1000000, 500000],
  "lodLevels": 2,
  "environment": "env/meta.json",
  "filenames": [
    "0_0/meta.json",
    "1_0/meta.json"
  ],
  "tree": {
    "bound": { "min": [-10, 0, -10], "max": [10, 5, 10] },
    "children": [
      {
        "bound": { "min": [-10, 0, -10], "max": [0.5, 5, 10] },
        "lods": {
          "0": { "file": 0, "offset": 0, "count": 600000 },
          "1": { "file": 1, "offset": 0, "count": 300000 }
        }
      },
      {
        "bound": { "min": [0.5, 0, -10], "max": [10, 4.5, 10] },
        "lods": {
          "0": { "file": 0, "offset": 600000, "count": 400000 },
          "1": { "file": 1, "offset": 300000, "count": 200000 }
        }
      }
    ]
  }
}
```

---

## 7. Versioning & compatibility

* Files conforming to this specification have `version: 1`. Readers **should** reject files with a greater major version.
* Files produced before the format was versioned omit `version`, `asset`, `count` and `counts`, and may contain `"environment": null`. Readers that wish to support them **should** treat a missing `version` as pre-release and `environment: null` as no environment.
* Unknown fields **should** be ignored, allowing minor additive evolution without a version bump.

---
