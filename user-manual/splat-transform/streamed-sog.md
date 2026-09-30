# Generating Streamed SOG

The [Streamed SOG](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/streamed-sog.md) format enables efficient streaming and rendering of large Gaussian splat scenes. [splat-transform](https://developer.playcanvas.com/user-manual/splat-transform.md) builds an optimized streaming format with a spatial tree structure for progressive download from a set of LOD (Level of Detail) levels, where each level has progressively fewer Gaussians (LOD 0 = highest detail, higher numbers = lower detail).

For loading and rendering Streamed SOG in a PlayCanvas application, see the [LOD Streaming](https://developer.playcanvas.com/user-manual/gaussian-splatting/building/lod-streaming.md) guide.

## Obtaining LOD levels

You can obtain the LOD levels in two ways:

- **Supply your own LOD files** — provide a separate splat file for each level, for example produced during training or exported from another tool.
- **Generate them by decimating a single source** — use [`--decimate`](https://developer.playcanvas.com/user-manual/splat-transform.md#actions) to create the lower-detail levels from one high-quality input, so you don't have to author each level separately. `--decimate` removes Gaussians at a uniform rate everywhere; `--decimate-adaptive` allocates removal by local error instead, which is much better on mixed-scale content such as skies, at higher memory cost.

:::note

Decimation must be the final action of an invocation and its output must be a `.ply` file, so generating LOD levels is a two-step process: write the decimated PLY levels first, then bundle them into Streamed SOG in a second invocation. Decimation is memory-bounded and streaming, scaling to scenes of 100M+ Gaussians. A deep target on a huge scene can need `--scratch-dir` for its intermediate levels; nothing is written to disk without it, and the run stops with an error if those levels don't fit in memory.

:::

## Output filename requirements

The output filename determines the format. These are **not** arbitrary names:

- **`lod-meta.json`** — generates Streamed SOG format (multiple SOG chunks with a spatial tree structure for progressive loading)
- **`meta.json`** — generates unbundled SOG format (a single SOG file, no streaming)

The output filename must be exactly `lod-meta.json` or `meta.json` — only the directory path before it can vary. For example: `output/lod-meta.json`, `my-scene/lod-meta.json`.

## Tagging inputs with `--tag-lod`

`-l` / `--tag-lod` tags the Gaussians of an input file with an LOD level, and follows the input file it applies to. For `lod-meta.json` output, every input must carry a tag:

- **`n >= 0`** — a detail level (`0` = highest detail).
- **`-1`** — the **environment**: a backdrop splat (e.g. sky or distant surroundings) written to `env/meta.json` and referenced from `lod-meta.json` via its `environment` field, rather than being binned into the LOD chunks.

LCC and LCC2 inputs already contain LOD levels (and, where present, an environment), so they need no explicit tags.

:::note

Environment splats are only written for `lod-meta.json` output. Every other output format ignores them — splat-transform warns if env-tagged splats would be dropped.

:::

## Examples

```bash
# Generate Streamed SOG format from multiple input files
# Each input file represents a different detail level (LOD 0 is highest quality)
splat-transform \
  lod0.ply -l 0 \
  lod1.ply -l 1 \
  lod2.ply -l 2 \
  lod3.ply -l 3 \
  output/lod-meta.json \
  --filter-nan \
  --filter-harmonics 0

# Generate the lower-detail levels by decimating a single high-quality source
# Step 1: create progressively smaller versions of the source splat
splat-transform source.ply -d 50% lod1.ply
splat-transform source.ply -d 25% lod2.ply
splat-transform source.ply -d 10% lod3.ply
# (for mixed-scale content such as skies, use --decimate-adaptive instead of -d)
# Step 2: bundle the full-detail source and the decimated levels into Streamed SOG format
splat-transform \
  source.ply -l 0 \
  lod1.ply -l 1 \
  lod2.ply -l 2 \
  lod3.ply -l 3 \
  output/lod-meta.json \
  --filter-nan

# Include an environment (backdrop) splat alongside the LOD levels
splat-transform \
  scene.ply -l 0 \
  sky.ply --tag-lod -1 \
  output/lod-meta.json

# Generate LOD with custom chunk settings for better performance
splat-transform \
  --lod-chunk-count 1024 \
  --lod-chunk-extent 32 \
  lod0.ply -l 0 \
  lod1.ply -l 1 \
  lod2.ply -l 2 \
  output/lod-meta.json \
  --filter-nan

# Generate Streamed SOG format directly from an LCC or LCC2 file
# (these already contain multiple LOD levels)
splat-transform scene.lcc output/lod-meta.json
```

## Reading Streamed SOG back

Streamed SOG is also readable as an input format. Use `-L` / `--select-lod` to choose which LOD levels to read, and `--info` to inspect a dataset's structure without converting it:

```bash
# Extract the highest-detail level back to PLY
splat-transform scene/lod-meta.json --select-lod 0 lod0.ply

# Inspect format and per-LOD splat counts without writing anything
splat-transform scene/lod-meta.json --info null
```

## Tips

- Use `--decimate` (`-d`) to generate lower LOD levels from a single high-quality source, instead of authoring each level separately, or `--decimate-adaptive` for mixed-scale content such as skies
- Use `--filter-nan` to remove invalid Gaussians before processing
- Use `--filter-harmonics 0` to reduce file size if colour detail is less critical
- Use `--lod-chunk-count` to control the number of generated SOG files containing splats
- Use `--lod-chunk-extent` to control the size of each node. Increase for very large scenes to avoid generating a huge number of nodes to manage
- Use `--lod-chunk-min` to keep sparse regions such as sky or distant background from being cut into many near-empty chunks: a region with fewer Gaussians than this (in K, default 8) is not split for extent
- Use `--info` to check per-LOD splat counts of a generated dataset

## See also

- [Streamed SOG format](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/streamed-sog.md) — the on-disk format specification.
- [LOD Streaming](https://developer.playcanvas.com/user-manual/gaussian-splatting/building/lod-streaming.md) — loading and rendering Streamed SOG in a PlayCanvas app.
- [splat-transform CLI reference](https://developer.playcanvas.com/user-manual/splat-transform.md) — full option reference including LOD Input/Output Options.
- [SuperSplat streaming](https://developer.playcanvas.com/user-manual/supersplat/streaming.md) — generating Streamed SOG through the SuperSplat web UI.
