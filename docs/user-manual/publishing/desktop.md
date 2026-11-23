---
title: Desktop Apps
description: "Packaging a PlayCanvas app as a desktop app for Windows, macOS and Linux with NW.js or Electron, from an Editor, Engine, React or Web Components project."
---

A PlayCanvas app runs in desktop browsers as it is. To ship it as an app that people install on Windows, macOS or Linux, for example from a game store, package it with a tool that bundles a browser engine and your app together.

Two widely used tools do this:

- [NW.js](https://nwjs.io/) runs a web app as a desktop app with little setup. Its documentation explains [how to package and distribute an app](https://github.com/nwjs/nw.js/wiki/How-to-package-and-distribute-your-apps) for each operating system.
- [Electron](https://www.electronjs.org/) does the same, with more control over the native side of the app. Its [tutorial](https://www.electronjs.org/docs/latest/tutorial/tutorial-prerequisites) covers creating, packaging and distributing an app.

With either tool:

1. [Make a build](index.md#making-a-build) of your app. For an Editor project, [download a build](/user-manual/editor/publishing/downloading/) in the **Static Website** format.
2. Package the build folder with the tool, following its documentation.
3. Test the packaged app on each operating system you ship to.
