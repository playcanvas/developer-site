---
title: Publishing on Wavedash
description: Covers calling Wavedash.init() from an Editor project, then testing, uploading and publishing a downloaded build with the Wavedash CLI, plus optional SDK features.
---

[Wavedash](https://wavedash.com) is a platform for publishing browser games. It hosts your game, and its SDK adds features such as player accounts, achievements, leaderboards, cloud saves and multiplayer lobbies.

This page covers projects built in the Editor. If you build your game with the Engine and a bundler such as Vite, follow Wavedash's own [PlayCanvas guide](https://docs.wavedash.com/engines/playcanvas) instead.

## Publishing Flow

To publish your game on Wavedash, follow these steps:

1. Install the Wavedash CLI and create your game
2. Call `Wavedash.init()` from your project
3. Download a build of your project
4. Test and upload the build
5. Publish!

### 1. Install the Wavedash CLI and create your game

Install the CLI by following Wavedash's [installation guide](https://docs.wavedash.com/cli/installation), then sign in:

```sh
wavedash auth login
```

Create your game in the [Developer Portal](https://wavedash.com/dev-portal), or from the command line with `wavedash team create` and `wavedash project create` (see the [CLI commands](https://docs.wavedash.com/cli/commands)). Make a note of the game ID, which you'll need in step 4.

### 2. Call `Wavedash.init()` from your project

Wavedash shows its own loading screen until your game calls `Wavedash.init()`. Until then, your game stays hidden. When your game runs on Wavedash, the platform defines a global `Wavedash` object before your code starts, so there is nothing to install in your project.

Create a script with the following code and attach it to an entity in your first scene, such as the Root entity:

```javascript
import { Script } from 'playcanvas';

export class WavedashInit extends Script {
    static scriptName = 'wavedashInit';

    initialize() {
        // Wavedash is only defined when the game runs on Wavedash or in `wavedash dev`
        if (typeof Wavedash !== 'undefined') {
            Wavedash.init();
        }
    }
}
```

`initialize()` runs after the preloaded assets have loaded and the scene has been created, so your game is ready to be shown. The `typeof` check keeps the same build working on other hosts, such as [PlayCanvas Hosting](playcanvas-hosting.md).

To show your game's loading progress on the Wavedash loading screen, forward the preload progress from a [custom loading screen](../../interface/launch-page/loading-screen.md) script:

```javascript
app.on('preload:progress', (value) => {
    if (typeof Wavedash !== 'undefined') {
        Wavedash.updateLoadProgressZeroToOne(value);
    }
});
```

### 3. Download a build of your project

Download a web build of your application by following the steps for **Self-hosting on your own server** on the [Self-hosting](self-hosting.md#self-hosting-on-your-own-server) page, with the **Download Format** set to **Static Website**. Extract the zip file into a folder named `build`.

### 4. Test and upload the build

In the folder that contains `build`, create a file named `wavedash.toml` with your game ID:

```none
game_id = "YOUR_GAME_ID"
upload_dir = "./build"
```

Wavedash loads `index.html` from the upload folder by default, which is the file a downloaded build starts from, so no other settings are needed.

To test your game, run:

```sh
wavedash dev
```

This serves your build locally with the Wavedash SDK connected to test data, so you can check that your game appears and that any SDK features work.

When you're happy with it, upload the build:

```sh
wavedash build push
```

This prints a build ID and a playtest URL. Uploading a build doesn't make it live. You can also upload the zip file from the **Builds** tab of the Developer Portal.

### 5. Publish

Before you publish for the first time, fill in your game's **Metadata** in the Developer Portal. Wavedash lists the details it needs, such as a description, cover art and a preview video, on its [publishing page](https://docs.wavedash.com/publishing/publish).

Then publish the build using the ID from step 4:

```sh
wavedash publish BUILD_ID
```

You can also click **Publish** in the **Builds** tab of the Developer Portal. Your game page goes live straight away. To roll back, publish an earlier build.

## Loading Files from Other Servers

Wavedash serves games [cross-origin isolated](https://docs.wavedash.com/platform/cross-origin-isolation). Everything in your downloaded build, including the Engine, works without changes. If your game also loads files from another server, that server must send the `Cross-Origin-Resource-Policy: cross-origin` and `Access-Control-Allow-Origin: *` headers, or the browser will block the request. This includes external scripts or import map entries that point to a CDN, and any API your game calls.

## SDK Features (optional)

The global `Wavedash` object also gives your scripts access to the rest of the [Wavedash SDK](https://docs.wavedash.com/sdk), including:

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
- [Wavedash PlayCanvas guide](https://docs.wavedash.com/engines/playcanvas) (Engine and bundler projects)
- [Wavedash Discord](https://discord.com/invite/7HJDmfeRev)
