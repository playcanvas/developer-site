---
title: Embedding the Viewer
description: "Embed the open-source SuperSplat Viewer in your own web app via the @playcanvas/supersplat-viewer npm package, URL parameters, or templating."
---

The [SuperSplat Viewer](/user-manual/supersplat/viewer/) is published on npm as [`@playcanvas/supersplat-viewer`](https://www.npmjs.com/package/@playcanvas/supersplat-viewer). It's a self-contained static web app you can drop into your own site, point at any splat file, and configure via URL parameters or a JSON settings document.

## Installing

```bash
npm install @playcanvas/supersplat-viewer
```

The package exports the viewer's `index.html`, `index.css`, and `index.js` as strings, ready to template into your build pipeline:

```ts
import { html, css, js } from '@playcanvas/supersplat-viewer';

// The full markup of the viewer page
console.log(html);

// The viewer's stylesheet
console.log(css);

// The viewer's compiled JS bundle
console.log(js);
```

This is the same machinery the [Editor's HTML export](/user-manual/supersplat/viewer/self-hosting) uses internally to produce a single-file viewer. Use it when you want to build your own templated bundle — e.g. injecting a particular `settings.json`, swapping in a custom skybox, or replacing the default poster image — without paying the runtime cost of loading the viewer from a CDN.

## URL parameters

If you'd rather host the viewer's built files yourself and configure each instance through query parameters, the following are supported:

| Parameter | Description | Default |
| --------- | ----------- | ------- |
| `settings` | URL of the [Experience Settings](/user-manual/supersplat/studio/experience-settings) JSON file | `./settings.json` |
| `content` | URL of the scene file (`.ply`, `.sog`, `.meta.json`, `.lod-meta.json`, `.compressed.ply`) | `./scene.compressed.ply` |
| `skybox` | URL of an equirectangular skybox image | _(none)_ |
| `poster` | URL of an image to show while the scene loads | _(none)_ |
| `noui` | Hide the viewer's built-in UI | _(off)_ |
| `noanim` | Start with any animation track paused | _(off)_ |
| `ministats` | Show runtime CPU/GPU performance graphs | _(off)_ |
| `unified` | Force [unified rendering](/user-manual/gaussian-splatting/building/unified-rendering/) | _(off)_ |
| `aa` | Enable antialiasing (not supported in unified mode) | _(off)_ |

These flags are subject to change as the viewer evolves; check the [project README](https://github.com/playcanvas/supersplat-viewer#readme) for the current set.

## Settings JSON

The `settings` URL parameter points at an [Experience Settings](/user-manual/supersplat/studio/experience-settings) v2 document — the same JSON format [Studio](/user-manual/supersplat/studio/) saves whenever you hit Save. See the [Experience Settings reference](/user-manual/supersplat/studio/experience-settings) for the full schema, defaults, and migration notes.

A minimal `settings.json` for a quick test:

```json
{
  "background": { "color": [0, 0, 0] },
  "cameras": [
    { "initial": { "position": [0, 1, -1], "target": [0, 0, 0], "fov": 60 } }
  ],
  "animTracks": []
}
```

For full coverage of every field — post effects, annotations, animations, tonemapping, etc. — go to [Experience Settings](/user-manual/supersplat/studio/experience-settings).

## Programmatic publishing

If you want to publish splats and update their settings without going through the Editor or Studio UIs, the [Splat Publishing API](/user-manual/api/splat-publish/) exposes the underlying REST endpoints.

## See also

- [SuperSplat Viewer overview](/user-manual/supersplat/viewer/) — what the viewer is and when to reach for it
- [Self-Hosting](/user-manual/supersplat/viewer/self-hosting) — single-file HTML export from the Editor
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — the JSON contract the viewer reads
- [Splat Publishing API](/user-manual/api/splat-publish/) — REST endpoints for programmatic publishing
