---
title: Web Hosting
description: "Hosting a PlayCanvas build on your own server or a static hosting service: testing it locally, choosing a host, GitHub Pages, compression, caching, content types, and serving assets from a CDN."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A build is a folder of static files, so any web server or static hosting service can serve it. Nothing runs on the server. The browser downloads `index.html`, which loads the engine, your code and your assets.

To get a build, see [Making a Build](index.md#making-a-build). For an Editor project, [PlayCanvas Hosting](/user-manual/editor/publishing/playcanvas-hosting/) is the quickest option, with nothing to set up.

## Testing a Build Locally {#testing-a-build-locally}

A build doesn't run if you open its `index.html` file in a browser by double-clicking it. Browsers block a page opened from a `file://` URL from loading the files it needs, so serve the folder from a local web server instead:

- **Vite projects:** run `npm run build`, then `npx vite preview`. In a create-playcanvas project, `npm start` does the same and opens the build in your browser.
- **Any build folder:** run `npx serve` in the folder, which needs [Node.js](https://nodejs.org/), or `python3 -m http.server`, which needs [Python](https://www.python.org/). Then open the address it prints, such as `http://localhost:3000`.

## Choosing a Host {#choosing-a-host}

Any host that serves static files works. For example:

- **Static hosting services**, such as [GitHub Pages](https://pages.github.com/), [Netlify](https://www.netlify.com/), [Cloudflare Pages](https://pages.cloudflare.com/) and [Vercel](https://vercel.com/), publish a folder that you upload or push to a Git repository. They serve it from a content delivery network (CDN), with compression and caching already set up.
- **Game portals**, such as [itch.io](https://itch.io/), accept a zip file of the build. [Publishing](index.md#where-to-publish) lists the platforms that have their own page.
- **Your own web server**, such as Apache, nginx or IIS, serves the build like any other static site. See [Configuring Your Server](#configuring-your-server).

If the build lives in a subfolder of a site rather than at the root of a domain, as a GitHub Pages project site does, it must load its files with relative URLs. Editor builds and create-playcanvas projects already do. In other Vite projects, set Vite's [`base`](https://vite.dev/config/shared-options#base) option to `'./'`.

### GitHub Pages {#github-pages}

By default, GitHub Pages builds a site with Jekyll, which leaves out files whose names start with an underscore. Editor builds of projects with Classic scripts contain files like `__start__.js`, so add an empty file named `.nojekyll` to the root of the build. Publishing with a GitHub Actions workflow, as Vite's [deployment guide](https://vite.dev/guide/static-deploy#github-pages) describes, skips Jekyll.

## Configuring Your Server {#configuring-your-server}

Static hosting services take care of these settings. On your own server, check each one.

### Compression {#compression}

Turn on gzip or Brotli compression for `.html`, `.js`, `.mjs`, `.css`, `.json` and `.wasm` files. Engine code and scene files are large text files that compress to a fraction of their size, so this matters more than any other setting. Images, audio and video files are already compressed.

### Caching {#caching}

Some files keep their names from one build to the next, such as `index.html`. Send them with the `Cache-Control: no-cache` header, so browsers check for a newer version each time. Otherwise players can keep seeing an old build after you upload a new one.

Files whose names change when their contents change, such as the hashed files Vite writes to `dist/assets/`, can be cached for a long time.

### Content Types {#content-types}

Make sure the server sends the right `Content-Type` header for each file. Browsers refuse to run a JavaScript module sent with any type but `text/javascript`, and they compile WebAssembly while it downloads only when it's sent as `application/wasm`. Most servers know the common types, but older ones may not know `.mjs`, `.wasm`, `.glb` or `.ktx2`.

| Extension | Content type |
| --- | --- |
| `.html` | `text/html` |
| `.js`, `.mjs` | `text/javascript` |
| `.css` | `text/css` |
| `.json` | `application/json` |
| `.wasm` | `application/wasm` |
| `.glb` | `model/gltf-binary` |
| `.gltf` | `model/gltf+json` |
| `.bin`, `.basis` | `application/octet-stream` |
| `.ktx2` | `image/ktx2` |
| `.png` | `image/png` |
| `.jpg`, `.jpeg` | `image/jpeg` |
| `.webp` | `image/webp` |
| `.mp3` | `audio/mpeg` |
| `.ogg` | `audio/ogg` |
| `.wav` | `audio/wav` |
| `.mp4` | `video/mp4` |
| `.webm` | `video/webm` |

## Serving Assets from a CDN {#serving-assets-from-a-cdn}

Static hosting services already serve the whole build from a CDN. If you serve `index.html` from your own server, you can still load the larger files, such as models and textures, from a CDN or another server:

1. Upload the whole build folder to the CDN, keeping its folder structure, so that every file the app looks for there exists.
2. Set up Cross-Origin Resource Sharing (CORS) on the CDN. A page can only load files from another origin, such as `https://cdn.example.com` for a page on `https://example.com`, if that server allows it with the `Access-Control-Allow-Origin` header. Set it to your site's origin, or to `*` to allow any site. Each CDN sets it in its own way, so see its documentation, for example [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html).
3. Tell the app where to find its assets, as described below.

<Tabs groupId="authoring-surface">
<TabItem value="editor" label="Editor">

An Editor build loads its assets, scene files and loading screen logo from the address in `ASSET_PREFIX`, which is empty by default:

- With Classic scripts, it's in `__settings__.js`: `window.ASSET_PREFIX = "";`
- With ESM scripts, it's near the start of `js/index.mjs`: `const ASSET_PREFIX="";`

Set it to the address of the build folder on the CDN, ending with `/`, such as `"https://cdn.example.com/my-game/"`.

</TabItem>
<TabItem value="engine" label="Engine">

Set the asset registry's [`prefix`](https://api.playcanvas.com/engine/classes/AssetRegistry.html#prefix) before you load any assets:

```javascript
app.assets.prefix = 'https://cdn.example.com/my-game/';
```

The engine adds the prefix to the start of every relative asset and scene URL. Absolute URLs load unchanged.

</TabItem>
<TabItem value="react" label="React">

Load assets from absolute URLs on the CDN:

```tsx
const { asset } = useModel('https://cdn.example.com/my-game/level.glb');
```

</TabItem>
<TabItem value="web-components" label="Web Components">

Load assets from absolute URLs on the CDN:

```html
<pc-asset id="level" src="https://cdn.example.com/my-game/level.glb"></pc-asset>
```

</TabItem>
</Tabs>
