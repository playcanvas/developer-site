---
title: Build a Snapchat Web Lens
description: Build a PlayCanvas game for Snapchat and publish it as a Web Lens, starting from the create-playcanvas starter or the Editor.
---

A [Snapchat Web Lens](https://developers.snap.com/web-lenses/home) is a web app that runs inside Snapchat as a Lens, full screen and in portrait, on iOS and Android. You upload a zip of your build through [My Lenses](https://my-lenses.snapchat.com/), and once it passes review, players can find it by name or by scanning its Snapcode.

Web Lenses are in beta, so Snap may change some of the limits below. Snap's [Platform requirements](https://developers.snap.com/web-lenses/requirements) and [Capabilities and restrictions](https://developers.snap.com/web-lenses/capabilities) pages have the current rules.

## Design for a Lens

| Requirement | What it means for your game |
| --- | --- |
| Portrait | A Lens runs full screen in portrait, so design for a 9:16 screen. Landscape is not supported. |
| Safe area | Snapchat draws its own controls over the top of the Lens. Keep your heads-up display (HUD) inside the `env(safe-area-inset-*)` insets, which need `viewport-fit=cover` in the viewport meta tag. |
| No network | A Lens can load files from its own zip and nothing else, so bundle every script, model, texture, font, and sound. |
| Relative URLs | Every URL in the build must be relative, such as `./assets/game.js`. A root-absolute path such as `/assets/game.js` shows a blank screen. |
| Size | The zip can be up to 8 MB, with an `index.html` of up to 1 MB at its root. |
| Persistence | `localStorage` and IndexedDB start empty each time the Lens opens, so keep progress in the Web Lens API's storage. |

Scale motion by elapsed time, since many phones run at 120 Hz, start audio from a tap, and pause when the page is hidden. Snap's [Runtime environment](https://developers.snap.com/web-lenses/runtime-environment) guide covers these in more detail.

## Start from the Web Lens Starter

For a code project with the Engine, React, or Web Components, start from the `web-lens` starter in [create-playcanvas](/user-manual/getting-started/start-with-create-playcanvas/):

```sh
npm create playcanvas@latest my-lens -- --starter web-lens
```

The starter is a small portrait game that already meets the requirements above:

- `src/lens.css` fills the phone screen, shows a 9:16 column in wider browsers, and keeps the HUD clear of Snapchat's controls. A phone browser reports only its own notch, so the development server marks the room those controls take.
- `vite.config.ts` makes every URL in the build relative.
- `src/lens.ts` connects the game to Snapchat through the Web Lens API. It submits each run to the leaderboard, keeps the player's best score in Snapchat storage, and shows their Bitmoji.

To make it your own, replace the game in `src/dodge-game.ts` and keep the rest. The project's README lists which files to replace and which to keep, which helps AI coding agents too.

To try the game on your phone, run `npm run dev -- --host` and open the network URL it prints.

## Use the Web Lens API

The [Web Lens API](https://developers.snap.com/web-lenses/web-lens-api) gives your game leaderboards, the player's Bitmoji, and storage that lasts between launches. Outside Snapchat it answers from a built-in stub with canned data, so you can develop in any browser.

- In a code project, install it with `npm install @snap/web-lens-api`. The starter already includes it.
- In the Editor, copy `snap-api.js` from the package's `dist` folder into your project as a script asset, and set its **Loading Type** to **Before Engine**. It installs the API as `window.snapchat`. The API must ship inside your zip, so do not add it under **Settings > External Scripts**.

Call `init()` once at startup, then check that a capability is supported before you use it, and keep the game playable when it is not:

```javascript
import snapchat from '@snap/web-lens-api';

await snapchat.init();

if (snapchat.isSupported('leaderboards')) {
    await snapchat.leaderboards.submitScore({ score: 42 });
}
```

## Package Your Build

In a project made from the starter, run:

```sh
npm run package
```

It builds the game, checks the build against the upload rules, and writes a zip to `dist/`. It writes no zip if the zip is over 8 MB or `index.html` is over 1 MB, if the build refers to one of its own files by a root-absolute path, if it loads anything from another host, or if it uses something the Lens sandbox blocks, such as an `<iframe>`. Each problem it reports names the file to fix.

`npm run start` serves the production build under the same restrictions, so a request for a file outside the build fails in the browser console as it would in Snapchat.

For an Editor project, download a build from the **Publish** dialog, then zip the *contents* of the build folder so that `index.html` sits at the root of the zip. On Windows, avoid PowerShell's `Compress-Archive`, which writes backslashes that break relative paths. Check the zip with `unzip -l` and confirm that it is no more than 8 MB.

## Upload to Snapchat

1. Sign in to [My Lenses](https://my-lenses.snapchat.com/), create a new Lens, choose the Web Lens option, and upload your zip.
2. Give the Lens a name, a 512 × 512 PNG icon, and a 5-second, 720 × 1280 preview video.
3. Submit it for review. Once it is approved, players can find it by name or by scanning its Snapcode.

Snap's [Publishing](https://developers.snap.com/web-lenses/publishing) guide has the full checklist.
