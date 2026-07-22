---
title: Library Usage
description: "Use splat-transform programmatically: the chunk-source pipeline for reading, processing, and writing Gaussian splat data in Node.js and the browser."
---

[splat-transform](/user-manual/splat-transform/) exposes a programmatic API for reading, processing, and writing Gaussian splat data. Scenes flow through lazy, chunked `ChunkSource`s, so resident memory is bounded by chunk size rather than scene size — the same pipeline the CLI uses to process scenes of hundreds of millions of Gaussians.

:::note API Reference

This page is an overview of the main entry points. The full TypeDoc reference for every export lives at [api.playcanvas.com/splat-transform](https://api.playcanvas.com/splat-transform/).

:::

## Basic Import

```typescript
import {
    readFile,
    writeSource,
    getInputFormat,
    getOutputFormat,
    createChunkDataPool,
    processSourceBridged
} from '@playcanvas/splat-transform';
```

## Key Exports

Chunk-source pipeline (the primary API):

| Export | Description |
| ------ | ----------- |
| `readFile` | Read a splat file as lazy `ChunkSource`s |
| `readFileInfo` | Header-only structural metadata (validate/inspect without decoding) |
| `getInputFormat` | Detect input format from filename |
| `getOutputFormat` | Detect output format from filename |
| `ChunkSource` | The streaming contract: chunked/gathered reads over one scene |
| `createChunkDataPool` | Pooled read buffers shared across a pipeline |
| `processSource`, `processSourceBridged` | Apply a sequence of processing actions to a source |
| `selectLod`, `stackLods`, `concatSource`, `bakeTransform` | Structural combinators (lazy views) |
| `decimateSource` | Chunk-native, memory-bounded decimation to an exact target count |
| `writeSource` | Stream a source to any single-scene output format |
| `writeLodSource` | Write streamed SOG (`lod-meta.json` + chunked units) from a multi-LOD source |
| `computeStats` | Streaming per-LOD, per-column statistics for a source or table |

DataTable compat (secondary; every entry materializes the whole scene in memory):

| Export | Description |
| ------ | ----------- |
| `DataTable`, `Column` | Legacy whole-scene table |
| `combine` | Merge multiple DataTables into one |
| `processDataTable` | Apply processing actions to a DataTable |
| `dataTableToChunkSource`, `materializeToDataTable` | Bridges between the DataTable and chunk-source worlds |
| `writeFile` | Write a DataTable to any output format |
| `writeVoxel` | Write sparse voxel octree files |
| `writeImage` | Render a camera view to a lossless WebP image (requires GPU) |

## File System Abstractions

The library uses abstract file system interfaces for maximum flexibility:

**Reading:**

- `UrlReadFileSystem` - Read from URLs (browser/Node.js)
- `MemoryReadFileSystem` - Read from in-memory buffers
- `ZipReadFileSystem` - Read from ZIP archives

**Writing:**

- `MemoryFileSystem` - Write to in-memory buffers
- `ZipFileSystem` - Write to ZIP archives

## Example: Reading and Processing

```typescript
import { Vec3 } from 'playcanvas';
import {
    readFile,
    writeSource,
    getInputFormat,
    getOutputFormat,
    createChunkDataPool,
    processSourceBridged,
    UrlReadFileSystem,
    MemoryFileSystem
} from '@playcanvas/splat-transform';

// Read a PLY file from a URL as a lazy, chunked source
const fileSystem = new UrlReadFileSystem('https://example.com/');
const [source] = await readFile({
    filename: 'scene.ply',
    inputFormat: getInputFormat('scene.ply'),
    fileSystem
});

// Apply actions: transforms compose lazily, filters stream chunk-by-chunk
const pool = createChunkDataPool();
const processed = await processSourceBridged(source, [
    { kind: 'scale', value: 0.5 },
    { kind: 'translate', value: new Vec3(0, 1, 0) },
    { kind: 'filterNaN' }
], pool);

// Stream the result to an in-memory PLY
const memFs = new MemoryFileSystem();
await writeSource({
    filename: 'output.ply',
    outputFormat: getOutputFormat('output.ply', {}),
    source: processed,
    pool,
    options: {}
}, memFs);
await processed.close();

// Get the output data
const outputBuffer = memFs.results.get('output.ply');
```

Consumers still on the `DataTable` API can bridge in either direction with `materializeToDataTable(source, pool)` and `dataTableToChunkSource(dataTable)` — both materialize the full scene, so prefer staying on sources for large inputs.

## Processing Actions

`processSource` / `processSourceBridged` (and the compat `processDataTable`) accept an array of actions:

```typescript
type ProcessAction =
    | { kind: 'translate'; value: Vec3 }
    | { kind: 'rotate'; value: Vec3 }       // Euler angles in degrees
    | { kind: 'scale'; value: number }
    | { kind: 'filterNaN' }
    | { kind: 'filterByValue'; columnName: string; comparator: 'lt'|'lte'|'gt'|'gte'|'eq'|'neq'; value: number }
    | { kind: 'filterBands'; value: 0|1|2|3 }
    | { kind: 'filterBox'; min: Vec3; max: Vec3 }
    | { kind: 'filterSphere'; center: Vec3; radius: number }
    | { kind: 'filterFloaters'; voxelResolution?: number; opacityCutoff?: number; minContribution?: number } // GPU
    | { kind: 'filterCluster'; voxelResolution?: number; seed?: Vec3; opacityCutoff?: number; minContribution?: number } // GPU
    | { kind: 'decimate'; count: number | null; percent: number | null }
    | { kind: 'param'; name: string; value: string }
    | { kind: 'stats'; format?: 'text' | 'json' }
    | { kind: 'info'; format?: 'text' | 'json' }
    | { kind: 'mortonOrder' };
```

:::note

`filterFloaters` and `filterCluster` require a GPU device — pass `createDevice` via the `ProcessOptions` argument. `processSource` streams and throws on actions that need the DataTable bridge (`decimate`, `mortonOrder`, the GPU voxel filters); `processSourceBridged` handles every action, materializing only those runs.

:::

## Custom Logging

Configure the logger for your environment:

```typescript
import { logger, TextRenderer } from '@playcanvas/splat-transform';

// Route status output (scopes, progress bars, messages) to stderr and
// pipeable output (e.g. JSON stats) to stdout
logger.setRenderer(new TextRenderer({
    write: process.stderr.write.bind(process.stderr),
    output: process.stdout.write.bind(process.stdout)
}));

logger.setVerbosity('quiet'); // 'quiet' | 'normal' | 'verbose'
```
