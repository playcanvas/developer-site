---
title: Publishing
description: "Publishing a PlayCanvas app to game platforms, with steps for Editor, Engine, React and Web Components projects."
---

A PlayCanvas app is a web page, so anything that serves web pages can host it. This section covers game platforms: sites that host browser games and add features such as player accounts and leaderboards through their own SDK.

Each page has steps for every way of building with PlayCanvas. What you upload depends on how you build your app:

- **Editor:** a build of your project, downloaded from the Editor. [Editor Publishing](/user-manual/editor/publishing/) also covers hosting on playcanvas.com, self-hosting and other destinations.
- **Engine, React and Web Components:** your bundler's production build, such as the `dist` folder that `npm run build` writes in a Vite project. Without a bundler, upload the folder that contains your `index.html`.

## Platforms {#platforms}

| Platform | What it covers |
| --- | --- |
| [Wavedash](wavedash.md) | Show your game with `Wavedash.init()`, then upload and publish a build with the Wavedash CLI. |
