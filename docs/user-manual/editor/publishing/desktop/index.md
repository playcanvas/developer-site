---
title: Desktop
description: "Packaging a PlayCanvas Editor app as a desktop app for Windows, macOS and Linux with NW.js."
---

A PlayCanvas app runs in desktop browsers as it is. To ship it as an app people install on Windows, macOS or Linux, for example on a game store, package it with a tool that bundles a browser engine and your app together.

We recommend [NW.js](https://nwjs.io/):

1. [Download a build](../../projects/downloading.md) of your project in the static format.
2. Package it with NW.js. The [NW.js documentation](https://github.com/nwjs/nw.js/wiki/How-to-package-and-distribute-your-apps) explains how to make an app for each operating system.

Test the packaged app on each system you ship to, as you would in a browser.
