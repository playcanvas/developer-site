# Snapchat Web Lenses

A [Snapchat Web Lens](https://developers.snap.com/web-lenses/home) is a web app that runs inside Snapchat as a Lens, full screen and in portrait, on iOS and Android. This page explains how to publish an Editor project as one. For a code project, start from the [Snapchat Web Lens starter](https://developer.playcanvas.com/user-manual/getting-started/start-with-create-playcanvas.md#snapchat-web-lens-starter) instead.

Before you publish, check your game against Snap's [Platform requirements](https://developers.snap.com/web-lenses/requirements) and [Capabilities and restrictions](https://developers.snap.com/web-lenses/capabilities). In particular, a Lens runs in portrait and can load files only from its own zip, so your project must not load anything from another host.

## Add the Web Lens API

The [Web Lens API](https://developers.snap.com/web-lenses/web-lens-api) gives your game leaderboards, the player's Bitmoji, and storage that lasts between launches. To add it to your project:

1. Download `snap-api.js` from the `dist` folder of the [`@snap/web-lens-api`](https://www.npmjs.com/package/@snap/web-lens-api) package.
2. Upload it to your project as a script asset.
3. In the asset's Inspector, set **Loading Type** to **Before Engine**.

The script installs the API as `window.snapchat`, so your scripts can call `snapchat.init()` at startup and check `snapchat.isSupported()` before using each capability. The API must ship inside your zip, so do not add it under **Settings > External Scripts**. Outside Snapchat, including on the Launch page, the API answers from a built-in stub with canned data.

## Download and Zip the Build

1. [Download a build](https://developer.playcanvas.com/user-manual/editor/publishing/web/self-hosting.md) of your project from the **Publish** dialog.
2. Zip the *contents* of the build folder, so that `index.html` sits at the root of the zip rather than inside a folder. On Windows, avoid PowerShell's `Compress-Archive`, which writes backslashes into the zip that break relative paths.
3. Check the zip with `unzip -l`. It must be no more than 8 MB, and `index.html` no more than 1 MB.

## Upload to Snapchat

Sign in to [My Lenses](https://my-lenses.snapchat.com/), create a new Lens, choose the Web Lens option, and upload your zip. Snap's [Publishing](https://developers.snap.com/web-lenses/publishing) guide covers the details you add, such as the icon and the preview video, and the review process.
