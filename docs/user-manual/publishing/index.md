---
title: Publishing
description: "Getting a PlayCanvas app to players from the Editor, the Engine, React or Web Components: making a build, hosting it on the web, embedding it in a page, game platforms, Snapchat, and mobile and desktop apps."
---

A PlayCanvas app is a web page: an `index.html` file and the scripts and assets it loads. To publish one, you make a **build**, a folder of files that runs on its own, and put it where players can open it. Nothing runs on a server, so any web host can serve a build, and platforms for browser games can host it for you.

## Making a Build {#making-a-build}

How you make a build depends on how you build your app:

- **Editor:** publish a build to [PlayCanvas Hosting](/user-manual/editor/publishing/playcanvas-hosting/) at a link you can share, or [download it](/user-manual/editor/publishing/downloading/) as a static website to host anywhere else. [Editor Publishing](/user-manual/editor/publishing/) covers both.
- **Engine, React and Web Components:** run your bundler's production build. In a Vite project, including one made with [create-playcanvas](/user-manual/getting-started/start-with-create-playcanvas/), `npm run build` writes the build to the `dist` folder.
- **Without a bundler:** the build is the folder that contains your `index.html`, as in the Web Components [Getting Started](/user-manual/web-components/getting-started/) examples.

## Where to Publish {#where-to-publish}

| Page | What it covers |
| --- | --- |
| [Web Hosting](web-hosting.md) | Putting a build on your own server or a static hosting service, testing it locally, and serving its assets from a content delivery network (CDN). |
| [Embedding in a Web Page](embedding.md) | Showing an app inside another page with an iframe, and passing messages between the page and the app. |
| [itch.io](itch-io.md) | A marketplace for independent games that hosts browser games from a zip file of the build. |
| [CrazyGames](crazygames.md) | A platform for browser games that shares its ad revenue with developers, with an SDK for video ads, player accounts and cloud saves. |
| [Wavedash](wavedash.md) | A platform for browser games, with player accounts, leaderboards and multiplayer lobbies. |
| [heyVR](heyvr.md) | A platform for WebXR games that players open on VR headsets and other devices. |
| [Snapchat Web Lenses](snapchat-web-lenses.md) | Running a game inside Snapchat as a Lens. |
| [Mobile Apps](mobile.md) | Wrapping a build in a native app for the Apple App Store and Google Play. |
| [Desktop Apps](desktop.md) | Packaging a build as a Windows, macOS or Linux app. |

The Editor can also export a project as a [playable ad](/user-manual/editor/publishing/playable-ads/) for Facebook and Snapchat.

## Before You Publish {#before-you-publish}

- **Test the build, not just your development version.** [Serve the build locally](web-hosting.md#testing-a-build-locally) and open it on the devices your players use. In the Editor, the [Launch Page](/user-manual/editor/interface/launch-page/) opens on phones and tablets as well as your desktop.
- **Keep the download small.** [Texture compression](/user-manual/optimization/texture-compression/) and the other [load-time tips](/user-manual/optimization/load-time/) matter most on phones. In a bundler project, [Bundle Size and Tree Shaking](/user-manual/engine/bundle-size/) explains how to ship only the parts of the engine your app uses.
- **Show progress while it loads.** Editor builds show a [loading screen](/user-manual/editor/interface/launch-page/loading-screen/) that you can replace with your own.
