---
title: Playable Ads
description: "Exporting a PlayCanvas Editor project as a playable ad, an interactive ad that runs inside an ad network's app: Facebook and Snapchat formats, size budgets and the export tool."
---

A **playable ad** is a small, interactive version of a game or app that runs inside an ad network's app, so people can try it before they install it. PlayCanvas apps suit the format because they're already web pages that start quickly.

You make one from an Editor project with the [PlayCanvas REST API Tools](https://github.com/playcanvas/playcanvas-rest-api-tools), an official command-line tool on GitHub. It downloads a build of your project and repackages it in the format each ad network accepts.

The tool works only with projects whose scripts are all [Classic scripts](/user-manual/scripting/#two-scripting-systems). It edits files that only their builds contain, such as `__settings__.js` and `__start__.js`.

| Network | Format |
| --- | --- |
| [Facebook](fb-playable-ads.md) | A single HTML file of up to 2 MB, or a ZIP file of up to 5 MB, uncompressed. |
| [Snapchat](snapchat-playable-ads.md) | An HTML file that uses the Mobile Rich Media Ad Interface Definitions (MRAID) 2.0 standard, with its assets in a separate folder. |

Other ad networks may work, but the PlayCanvas team hasn't tested them.

Size is the main constraint. The Engine alone takes about 1.2 MB of a Facebook ad's budget, so plan your assets around what's left. Each network's page has size tips and a checklist, and [Optimization](/user-manual/optimization/) covers making assets smaller.
