---
title: Anti-Aliasing
description: "How Gaussian splats trained with anti-aliasing are detected and rendered with the opacity compensation they need, and how to override it per resource or for the whole scene."
---

Some splat trainers apply an anti-aliasing filter while training, in the style of [Mip-Splatting](https://niujinshuchong.github.io/mip-splatting/): Postshot does it by default, and Brush and gsplat offer it as a mode. Splats trained this way need a matching opacity compensation when they are rendered. Without it, small and distant splats render too bright, and fine detail such as hair or fur looks glittery. Splats trained without the filter must render without the compensation, or they look too faint.

## Automatic Detection

By default, each splat is rendered the way its file asks for. When a splat file loads, the training mode it records sets [`antiAlias`](https://api.playcanvas.com/engine/classes/GSplatResourceBase.html#antialias) on its resource:

| Format | Recorded as |
| --- | --- |
| [PLY](../formats/ply.md) | The `postshot.anti_aliasing=1` header comment (Postshot), or `SplatRenderMode: mip` (Brush, SplatTransform) |
| [SOG](../formats/sog.md) | `"model": "antialiased"` in `meta.json` |
| [Streamed SOG](../formats/streamed-sog.md) | `"model": "antialiased"` in `lod-meta.json`, for all the files it streams |
| [SPZ](../formats/spz.md) | The anti-aliased header flag |

Files that do not record it, LCC2 and glTF files, and [procedural splats](procedural-splats/index.md) render without the compensation. A scene can mix splats trained both ways, and each renders with its own setting.

[SplatTransform](/user-manual/splat-transform/) keeps the training mode when it converts between these formats.

## Files That Don't Record the Training Mode

Set `antiAlias` on the resource yourself. It can be changed at any time:

```javascript
const asset = new Asset('scene', 'gsplat', { url: 'scene.ply' });
asset.ready(() => {
    // this scene was trained with anti-aliasing, but its file does not record it
    asset.resource.antiAlias = true;

    const entity = new Entity();
    entity.addComponent('gsplat', { asset });
    app.root.addChild(entity);
});
app.assets.add(asset);
app.assets.load(asset);
```

For a streamed scene, the resource is a [`GSplatOctreeResource`](https://api.playcanvas.com/engine/classes/GSplatOctreeResource.html#antialias), and its setting applies to every file it streams.

## Overriding for the Whole Scene

[`app.scene.gsplat.antiAlias`](https://api.playcanvas.com/engine/classes/GSplatParams.html#antialias) is `undefined` by default, which lets each splat follow its resource. Set it to `true` or `false` to render every splat with or without the compensation, whatever their files record:

```javascript
// render every splat without the compensation
app.scene.gsplat.antiAlias = false;

// let each splat follow its resource again
app.scene.gsplat.antiAlias = undefined;
```

## Filter Size

Trainers use different anti-aliasing filters: Mip-Splatting, the mip mode of Brush, LichtFeld Studio and Spirula train with a filter of 0.1 pixels squared, and the anti-aliased mode of gsplat with 0.3. Files do not record the size, so set [`app.scene.gsplat.antiAliasFilterSize`](https://api.playcanvas.com/engine/classes/GSplatParams.html#antialiasfiltersize) to match the trainer. It defaults to 0.1, Mip-Splatting's filter. A filter larger than the one the splats were trained with renders them too soft:

```javascript
// splats trained with gsplat's anti-aliased mode
app.scene.gsplat.antiAliasFilterSize = 0.3;
```

The size applies to the splats rendered with the compensation. Other splats always render with the 0.3 filter of standard training.

## Performance

The compensation adds a few instructions per splat. A scene that mixes splats trained with and without anti-aliasing also reads a per-splat flag, a small extra cost that scenes with a single kind of splats don't pay.
