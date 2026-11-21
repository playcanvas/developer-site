---
title: Publishing
description: "Getting a PlayCanvas Editor app to players: builds, hosting on playcanvas.com or your own server, a custom loading screen, playable ads, Snapchat Web Lenses, and mobile and desktop apps."
---

A PlayCanvas app is a web page, so anything that can show a web page can run it. To publish, you make a **build**: a snapshot of the scenes you choose, packaged with everything they need to run on their own. Changes you make in the Editor afterwards don't affect a build until you publish a new one.

## Where to Publish {#where-to-publish}

| Destination | How |
| --- | --- |
| [The web](web/index.md) | [Host a build on playcanvas.com](web/playcanvas-hosting.md) at a link you can share, or [download it](../projects/downloading.md) to [host yourself](web/self-hosting.md). |
| [Playable ads](playable-ads/index.md) | Export a build as an interactive ad for [Facebook](playable-ads/fb-playable-ads.md) or [Snapchat](playable-ads/snapchat-playable-ads.md). |
| [Snapchat Web Lenses](snapchat-web-lenses.md) | Upload a build to Snapchat as a Web Lens. |
| [Mobile app stores](mobile/index.md) | Wrap a build in a native iOS or Android app. |
| [Desktop](desktop/index.md) | Package a build as a Windows, macOS or Linux app. |

Wherever it runs, a build shows a [loading screen](../interface/launch-page/loading-screen.md) while its assets load, and you can replace the default one with your own.

## Before You Publish {#before-you-publish}

- **Test it where it will run.** The [Launch Page](../interface/launch-page/index.md) opens on phones and tablets as well as your desktop.
- **Check what loads first.** Assets marked to [preload](/user-manual/assets/preloading/) load before your app starts, so they decide how long the loading screen shows.
- **Keep downloads small.** [Texture compression](/user-manual/optimization/texture-compression/) and the other [load-time tips](/user-manual/optimization/load-time/) matter most on phones, and playable ads have strict size limits.
