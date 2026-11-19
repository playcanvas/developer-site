---
title: Embedding the Viewer
description: "Embed the open-source SuperSplat Viewer in your own site from the @playcanvas/supersplat-viewer npm package: host the prebuilt viewer with URL parameters, generate a page with renderViewerHtml, or create viewers in your app with createViewer."
---

The [SuperSplat Viewer](/user-manual/supersplat/viewer/) is published on npm as [`@playcanvas/supersplat-viewer`](https://www.npmjs.com/package/@playcanvas/supersplat-viewer). You can host the prebuilt viewer and configure it with URL parameters, generate a page around it, or create viewers inside your own web app.

If your splat is already published on superspl.at, the simplest embed is an `<iframe>` from the [Embed dialog](/user-manual/supersplat/scene-page#embed-dialog) on its scene page.

## Choosing an approach

| Approach | Use when |
|----------|----------|
| [Host the prebuilt viewer](#hosting-the-prebuilt-viewer) | You want to serve the viewer's static files and point them at a splat and `settings.json`, configuring each page with URL parameters. |
| [Generate a page](#generating-a-page) with `renderViewerHtml` | Your server or build writes the HTML page, with the asset URLs and settings filled in. |
| [Create a viewer in your page](#creating-a-viewer-in-your-own-page) with `createViewer` | Your web app owns the page, and creates, controls and destroys viewers itself. |

## Installing

```bash
npm install @playcanvas/supersplat-viewer
```

The package has these entry points:

| Import | Provides |
|--------|----------|
| `@playcanvas/supersplat-viewer` | `renderViewerHtml`, and the viewer's stylesheet and bundle as the strings `css` and `js` |
| `@playcanvas/supersplat-viewer/viewer` | `createViewer`, with `playcanvas` (2.24.1 or later) as a peer dependency |
| `@playcanvas/supersplat-viewer/viewer.css` | The stylesheet `createViewer` needs |
| `@playcanvas/supersplat-viewer/settings` | Settings types, defaults, validation and migration. See [Experience Settings](/user-manual/supersplat/studio/experience-settings#generating-and-validating-settings). |

The main entry also exports the viewer's page as the string `html`, but it is deprecated: its formatting changes between releases, so use `renderViewerHtml` instead.

## Hosting the prebuilt viewer {#hosting-the-prebuilt-viewer}

The package's `public/` folder holds the standalone viewer: `index.html`, `index.js`, `index.css`, and the WebAssembly decoders (`.wasm` files) that some formats need. Copy the folder to your web server and open `index.html`. With no parameters, it loads `./settings.json` and `./scene.compressed.ply` from beside it.

The `.wasm` files are fetched only for content that needs them, such as version 4 `.spz` files. Serve them as `application/wasm`.

### URL parameters {#url-parameters}

Configure each page with query parameters, for example `index.html?content=./museum/lod-meta.json&settings=./museum/settings.json`. These parameters are subject to change as the viewer evolves; the [project README](https://github.com/playcanvas/supersplat-viewer#readme) lists the current set, along with a few more for developers.

#### Content

| Parameter | Description | Default |
| --------- | ----------- | ------- |
| `settings` | URL of the [Experience Settings](/user-manual/supersplat/studio/experience-settings) JSON file | `./settings.json` |
| `content` | URL of the splat. See [Supported content](#supported-content). | `./scene.compressed.ply` |
| `skybox` | URL of an equirectangular skybox image | _(none)_ |
| `poster` | URL of an image shown, blurred, while the scene loads | _(none)_ |
| `collision` | URL of collision data for walk mode: a `.voxel.json` file (with its `.voxel.bin` beside it), or a `.glb` mesh. `voxel` is an alias. | _(none)_ |

#### UI

| Parameter | Description |
| --------- | ----------- |
| `noui` | Hide the viewer's built-in UI |
| `noanim` | Start with the camera animation paused |
| `reticle` | Show a center reticle in fly and walk mode while the mouse is captured |
| `ministats` | Show runtime CPU/GPU performance graphs |
| `lang` | The UI language: `de`, `en`, `es`, `fr`, `ja`, `ko`, `pt-BR`, `ru` or `zh-CN`. By default, the browser's language. |
| `vr` | Show a **Tap to enter VR** prompt while the scene loads, where VR is available. See [Viewing in VR and AR](/user-manual/supersplat/viewer/xr#entering-a-session). |

#### Rendering

| Parameter | Description |
| --------- | ----------- |
| `webgl` | Use WebGL. By default the viewer uses WebGPU where it's available. |
| `aa` | Force the anti-aliasing compensation for splats trained with anti-aliasing: `aa`, `aa=1`, `aa=true` or `aa=enable` turn it on for every splat, any other value turns it off. Without it, each splat file's own training mode decides. |
| `hpr` | Override the settings' `highPrecisionRendering`: `hpr`, `hpr=1`, `hpr=true` or `hpr=enable` turn it on, any other value off. |
| `nofx` | Turn off post effects |
| `budget` | The splat budget, in millions, overriding every [Quality](/user-manual/supersplat/viewer/controls#quality) position |
| `fullload` | Load all of a streamed scene's detail before the first frame |
| `stochastic` | Experimental. Force the stochastic splat renderer that [Performance Mode](/user-manual/supersplat/viewer/controls#performance-mode) uses: `stochastic` in its per-pixel mode, `stochastic=mobile` in its mode for phones and headsets, or `stochastic=off` to keep the standard renderer. Each hides the Performance Mode setting. WebGPU only. |
| `colorize` | Color the splats by level of detail |
| `heatmap` | Draw the collision overlay as a heat map. Needs WebGPU and voxel collision; turn the overlay on with **Show Collision** or <kbd>V</kbd>. |
| `debug` | Open the developer debug panel on load (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> toggles it) |

### Supported content {#supported-content}

The viewer picks the format from the content's file name:

| Format | File |
|--------|------|
| PLY | `.ply`, `.compressed.ply` |
| SOG | `.sog`, or the `meta.json` of an unbundled SOG |
| Streamed SOG | `lod-meta.json` |
| SPZ | `.spz` (versions 3 and 4) |
| XGRIDS LCC2 | `.lcc2`, streamed on demand like a Streamed SOG |

SOG v3 files written by splat-transform 3.11.0 or 3.11.1 use an earlier layout that the viewer no longer reads. Convert them again with a current [splat-transform](/user-manual/splat-transform/).

## Generating a page {#generating-a-page}

If your server or build generates the page around the viewer, use `renderViewerHtml`. It returns a complete HTML document, with your asset URLs and settings supplied in a single JSON block:

```ts
import { renderViewerHtml } from '@playcanvas/supersplat-viewer';

const page = renderViewerHtml({
    bootstrap: {
        settings,                      // an object, or omit it and set settingsUrl
        contentUrl: 'scene.sog',
        posterUrl: 'poster.jpg'
    },
    baseHref: '/viewer/',              // serving from a sub-path
    backgroundColor: [0, 0, 0],        // components are 0..1, not 0..255
    headExtras: '<script src="analytics.js"></script>',
    inlineCss: true                    // no sibling index.css needed
});
```

| Option | Description |
|--------|-------------|
| `bootstrap` | The page's assets and settings: `settings` or `settingsUrl`, `contentUrl`, `contentFilename`, `posterUrl`, `skyboxUrl`, `collisionUrl` and `zstdDecoderUrl` |
| `baseHref` | The page's base URL, for serving the viewer from a sub-path |
| `backgroundColor` | The page background before the first frame, as 0–1 RGB like the settings' `background.color` |
| `headExtras` / `bodyStartExtras` | Markup added to the `<head>`, or at the start of the `<body>` |
| `inlineCss` / `inlineJs` | Inline the stylesheet or the bundle instead of loading `index.css` and `index.js` from beside the page |

Called with no options, it returns the page the package ships, unchanged. URL parameters on the served page still override the bootstrap's asset URLs, so each instance stays configurable, except inline `settings`, which take precedence over `?settings=`.

For a single self-contained file, set both `inlineCss` and `inlineJs`, pass the settings inline, and pass the splat as a `data:` URI in `contentUrl`. A `data:` URI has no file name, so name the content with `contentFilename`, such as `scene.sog`:

```ts
const page = renderViewerHtml({
    bootstrap: {
        settings,
        contentUrl: sogDataUri,
        contentFilename: 'scene.sog'
    },
    inlineCss: true,
    inlineJs: true
});
```

A single-file page that loads a version 4 `.spz` file also needs the decoder inline: set `zstdDecoderUrl` to `zstd-decoder.wasm` as a `data:` URL. `zstdDecoderUrl` has no URL parameter, since a link could otherwise run any WebAssembly in your page's origin.

## Creating a viewer in your own page {#creating-a-viewer-in-your-own-page}

If your web app owns the page, create the viewer inside one of its elements:

```ts
import { createViewer } from '@playcanvas/supersplat-viewer/viewer';
import '@playcanvas/supersplat-viewer/viewer.css';

const viewer = await createViewer({
    container: document.getElementById('viewer'),
    settings: './settings.json',
    contentUrl: './scene.sog'
});

// later
viewer.destroy();
```

The returned handle controls loading, playback, the camera, annotations, fullscreen and XR, and the built-in UI can be restyled or replaced. See [Viewer API](/user-manual/supersplat/viewer/api).

## Settings JSON

The `settings` parameter or option points at an [Experience Settings](/user-manual/supersplat/studio/experience-settings) v2 document, the same JSON format [Studio](/user-manual/supersplat/studio/) saves. This is the complete document that `defaultSettings()` from `@playcanvas/supersplat-viewer/settings` generates:

```json
{
  "version": 2,
  "tonemapping": "linear",
  "highPrecisionRendering": false,
  "background": {
    "color": [0, 0, 0]
  },
  "postEffectSettings": {
    "sharpness": { "enabled": false, "amount": 0 },
    "bloom":     { "enabled": false, "intensity": 0.1, "blurLevel": 2 },
    "grading":   { "enabled": false, "brightness": 1, "contrast": 1, "saturation": 1, "tint": [1, 1, 1] },
    "vignette":  { "enabled": false, "intensity": 0.5, "inner": 0.3, "outer": 0.75, "curvature": 1 },
    "fringing":  { "enabled": false, "intensity": 0.5 }
  },
  "animTracks": [],
  "cameras": [
    { "initial": { "position": [0, 2, 0], "target": [2, 2, 0], "fov": 85 } }
  ],
  "annotations": [],
  "startMode": "default"
}
```

That camera looks across a captured space from inside it; `defaultSettings('object')` frames a subject from outside instead. For every field, the authoring limits, and the helpers for generating, validating and migrating settings, see the [Experience Settings](/user-manual/supersplat/studio/experience-settings) reference.

## Programmatic publishing

If you want to publish splats and update their settings without going through the Editor or Studio UIs, the [Splat Publishing API](/user-manual/api/splat-publish/) exposes the underlying REST endpoints.

## See also

- [SuperSplat Viewer overview](/user-manual/supersplat/viewer/) — what the viewer is and when to reach for it
- [Viewer API](/user-manual/supersplat/viewer/api) — `createViewer` and the viewer handle
- [Self-Hosting](/user-manual/supersplat/viewer/self-hosting) — single-file HTML export from the Editor
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — the JSON contract the viewer reads
- [Splat Publishing API](/user-manual/api/splat-publish/) — REST endpoints for programmatic publishing
