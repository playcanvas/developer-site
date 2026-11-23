---
title: Publishing on Wavedash
description: Showing a PlayCanvas game on Wavedash with Wavedash.init() from an Editor, Engine, React or Web Components project, then testing, uploading and publishing a build with the Wavedash CLI.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Wavedash](https://wavedash.com) is a platform for publishing browser games. It hosts your game, and its SDK adds features such as player accounts, achievements, leaderboards, cloud saves and multiplayer lobbies.

This page covers projects built with the Editor, the Engine, React and Web Components. Wavedash's own [PlayCanvas guide](https://docs.wavedash.com/engines/playcanvas) walks through an Engine project built with Vite.

## Publishing Flow

To publish your game on Wavedash, follow these steps:

1. Install the Wavedash CLI and create your game
2. Call `Wavedash.init()` when your game is ready
3. Build your project
4. Test and upload the build
5. Publish!

### 1. Install the Wavedash CLI and create your game

Install the CLI by following Wavedash's [installation guide](https://docs.wavedash.com/cli/installation), then sign in:

```sh
wavedash auth login
```

Create your game in the [Developer Portal](https://wavedash.com/dev-portal), or from the command line with `wavedash team create` and `wavedash project create` (see the [CLI commands](https://docs.wavedash.com/cli/commands)). Make a note of the game ID, which you'll need in step 4.

### 2. Call `Wavedash.init()` when your game is ready

Wavedash shows its own loading screen until your game calls `Wavedash.init()`, so your game stays hidden until then. Call it once the assets your first scene needs have loaded.

When your game runs on Wavedash, the platform defines a global `window.Wavedash` object before your code starts, so there is nothing to install. Writing the call as `window.Wavedash?.init()` makes it do nothing on other hosts, so the same build still works on [PlayCanvas Hosting](/user-manual/editor/publishing/playcanvas-hosting/) or [your own server](web-hosting.md).

<Tabs groupId="authoring-surface">
<TabItem value="editor" label="Editor">

Create a script with the following code and attach it to an entity in your first scene, such as the Root entity:

```javascript
import { Script } from 'playcanvas';

export class WavedashInit extends Script {
    static scriptName = 'wavedashInit';

    initialize() {
        window.Wavedash?.init();
    }
}
```

`initialize()` runs after the preloaded assets have loaded and the scene has been created, so your game is ready to be shown.

To show your game's loading progress on the Wavedash loading screen, forward the preload progress from a [custom loading screen](/user-manual/editor/interface/launch-page/loading-screen/) script:

```javascript
app.on('preload:progress', (value) => {
    window.Wavedash?.updateLoadProgressZeroToOne(value);
});
```

</TabItem>
<TabItem value="engine" label="Engine">

Call it after the assets for your first scene have loaded, for example in the callback of the [`AssetListLoader`](https://api.playcanvas.com/engine/classes/AssetListLoader.html) that loads them:

```javascript
const loader = new AssetListLoader(Object.values(assets), app.assets);
loader.load(() => {
    // create your scene from the loaded assets, then start the app
    app.start();
    window.Wavedash?.init();
});
```

`AssetListLoader` also fires a `progress` event for each asset it loads, so you can pass the fraction loaded so far to `window.Wavedash?.updateLoadProgressZeroToOne()`.

</TabItem>
<TabItem value="react" label="React">

Call it from an effect once the [asset hooks](/user-manual/react/guide/loading-assets/) for your first scene have finished loading:

```tsx
import { useEffect } from 'react';
import { Gltf } from '@playcanvas/react';
import { useModel } from '@playcanvas/react/hooks';

export function Level() {
    const { asset, loading } = useModel('level.glb');

    useEffect(() => {
        if (!loading) {
            window.Wavedash?.init();
        }
    }, [loading]);

    if (loading) return null;
    return <Gltf asset={asset} key={asset.id} />;
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

Wait for `<pc-app>` to become ready, which happens once it has preloaded its assets and started, using [`whenReady`](/user-manual/web-components/programmatic-access/):

```html
<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const appElement = document.querySelector('pc-app');

    // optional: show loading progress on the Wavedash loading screen
    appElement.addEventListener('progress', (event) => {
        window.Wavedash?.updateLoadProgressZeroToOne(event.loaded / event.total);
    });

    await whenReady(appElement);
    window.Wavedash?.init();
</script>
```

</TabItem>
</Tabs>

:::note[TypeScript]

To give `window.Wavedash` its types, install the `@wvdsh/sdk-js` package as a dev dependency and add a type-only import to the file that uses it:

```typescript
import type {} from '@wvdsh/sdk-js';
```

Keep the import type-only. Importing the package itself throws an error whenever the game isn't running on Wavedash or in `wavedash dev`.

:::

### 3. Build your project

<Tabs groupId="authoring-surface">
<TabItem value="editor" label="Editor">

[Download a build](/user-manual/editor/publishing/downloading/) of your project with the **Download Format** set to **Static Website**. Extract the zip file into a folder named `build`, which is your upload folder.

</TabItem>
<TabItem value="engine" label="Engine">

Run your bundler's production build. If you use Vite, set its `base` option to `'./'` so the build loads its files with relative paths, as Wavedash's examples do, then run `npm run build`. Vite writes the build to `dist`, which is your upload folder.

</TabItem>
<TabItem value="react" label="React">

If you use Vite, set its `base` option to `'./'` so the build loads its files with relative paths, as Wavedash's examples do, then run `npm run build`. Vite writes the build to `dist`, which is your upload folder.

</TabItem>
<TabItem value="web-components" label="Web Components">

If you use a bundler such as Vite, set its `base` option to `'./'` so the build loads its files with relative paths, as Wavedash's examples do, then run `npm run build`. Vite writes the build to `dist`, which is your upload folder. Without a bundler, your upload folder is the one that contains your `index.html`.

</TabItem>
</Tabs>

### 4. Test and upload the build

Next to your upload folder, create a file named `wavedash.toml` with your game ID, and set `upload_dir` to the upload folder from step 3:

```none
game_id = "YOUR_GAME_ID"
upload_dir = "./dist"
```

Wavedash loads `index.html` from the upload folder by default. Downloaded Editor builds and Vite builds both start from `index.html`, so no other settings are needed.

To test your game, run:

```sh
wavedash dev
```

This serves your build locally with the Wavedash SDK connected to test data, so you can check that your game appears and that any SDK features work.

When you're happy with it, upload the build:

```sh
wavedash build push
```

This prints a build ID and a playtest URL. Uploading a build doesn't make it live. You can also upload a zip file of your upload folder from the **Builds** tab of the Developer Portal.

### 5. Publish

Before you publish for the first time, fill in your game's **Metadata** in the Developer Portal. Wavedash lists the details it needs, such as a description, cover art and a preview video, on its [publishing page](https://docs.wavedash.com/publishing/publish).

Then publish the build using the ID from step 4:

```sh
wavedash publish BUILD_ID
```

You can also click **Publish** in the **Builds** tab of the Developer Portal. Your game page goes live straight away. To roll back, publish an earlier build.

## Loading Files from Other Servers

Wavedash serves games [cross-origin isolated](https://docs.wavedash.com/platform/cross-origin-isolation). Everything in your upload folder works without changes. If your game also loads files from another server, that server must send the `Cross-Origin-Resource-Policy: cross-origin` and `Access-Control-Allow-Origin: *` headers, or the browser will block the request. This applies to CDNs, external scripts and import map entries, and any API your game calls. jsDelivr, which the Web Components [Getting Started](/user-manual/web-components/getting-started/) page uses, already sends both headers.

## SDK Features (optional)

The global `window.Wavedash` object also gives your code access to the rest of the [Wavedash SDK](https://docs.wavedash.com/sdk), including:

- Player accounts
- Achievements
- Leaderboards
- Cloud saves
- User-generated content
- Paid content
- Multiplayer lobbies and networking

The [SDK functions reference](https://docs.wavedash.com/sdk/functions) lists every call.

## Useful Links

- [Wavedash Developer Portal](https://wavedash.com/dev-portal)
- [Wavedash documentation](https://docs.wavedash.com)
- [Wavedash PlayCanvas guide](https://docs.wavedash.com/engines/playcanvas)
- [Wavedash Discord](https://discord.com/invite/7HJDmfeRev)
