---
title: Snapchat Web Lenses
description: "Publishing a PlayCanvas game to Snapchat as a Web Lens from an Editor, Engine, React or Web Components project: Snap's requirements, adding the Web Lens API, zipping the build and uploading it."
---

A [Snapchat Web Lens](https://developers.snap.com/web-lenses/home) is a web app that runs inside Snapchat as a Lens, full screen and in portrait, on iOS and Android.

To start a new game for Snapchat, use the [Snapchat Web Lens starter](/user-manual/getting-started/start-with-create-playcanvas/#snapchat-web-lens-starter) of create-playcanvas. It's available for the Engine, React and Web Components, and it's already set up for everything on this page.

## Check Snap's Requirements {#check-snaps-requirements}

Before you publish, check your game against Snap's [Platform requirements](https://developers.snap.com/web-lenses/requirements) and [Capabilities and restrictions](https://developers.snap.com/web-lenses/capabilities). In particular, a Lens runs in portrait, and it can load files only from its own zip file, so your game must not load anything from another host, such as a CDN.

## Add the Web Lens API {#add-the-web-lens-api}

The [Web Lens API](https://developers.snap.com/web-lenses/web-lens-api) gives your game leaderboards, the player's Bitmoji, and storage that lasts between launches. Your game calls `snapchat.init()` once at startup, then checks `snapchat.isSupported()` before using each capability. Outside Snapchat, the API answers from a built-in stub with canned data, so your game still runs in any browser.

The API must ship inside your zip file, because a Lens can't load it from anywhere else.

### In an Editor Project {#in-an-editor-project}

1. Download `snap-api.js` from the `dist` folder of the [`@snap/web-lens-api`](https://www.npmjs.com/package/@snap/web-lens-api) package.
2. Upload it to your project as a script asset.
3. In the asset's Inspector, set **Loading Type** to **Before Engine**.

The script installs the API as `window.snapchat`, so your scripts can use `snapchat` directly. Don't add it under **Settings > External Scripts**, which loads it from another host.

### In an Engine, React or Web Components Project {#in-a-code-project}

Install the package:

```sh
npm install @snap/web-lens-api
```

Then import it in your code:

```javascript
import snapchat from '@snap/web-lens-api';

// at startup
const ready = snapchat.init();

// for example, when a run ends
async function submitScore(score) {
    await ready;
    if (snapchat.isSupported('leaderboards')) {
        await snapchat.leaderboards.submitScore({ score });
    }
}
```

## Build and Zip Your Game {#build-and-zip-your-game}

1. Make a build:
    - **Editor:** [download a build](/user-manual/editor/publishing/downloading/) in the **Static Website** format, and extract the zip file into a folder.
    - **Engine, React and Web Components:** set Vite's [`base`](https://vite.dev/config/shared-options#base) option to `'./'`, so the build loads its files with relative URLs, then run `npm run build`. Vite writes the build to `dist`.
2. Zip the *contents* of the build folder, so that `index.html` is at the root of the zip file rather than inside a folder. On Windows, avoid PowerShell's `Compress-Archive`, which writes backslashes into the zip file that break relative paths.
3. Check the zip file with `unzip -l`. It must be no more than 8 MB, and `index.html` no more than 1 MB.

In a project made from the create-playcanvas Web Lens starter, `npm run package` does all of this, and checks the build against Snap's upload rules.

## Upload to Snapchat {#upload-to-snapchat}

Sign in to [My Lenses](https://my-lenses.snapchat.com/), create a new Lens, choose the Web Lens option, and upload your zip file. Snap's [Publishing](https://developers.snap.com/web-lenses/publishing) guide covers the details you add, such as the icon and the preview video, and the review process.
