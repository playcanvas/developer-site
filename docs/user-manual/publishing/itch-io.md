---
title: Publishing on itch.io
description: "Publishing a PlayCanvas game on itch.io from an Editor, Engine, React or Web Components project: making a zip file of the build, itch.io's limits on files, uploading it as an HTML project, embed options, updating the game, and fixing files that fail to load."
---

[itch.io](https://itch.io) is a marketplace for independent games. It hosts browser games for you: you upload a zip file of your build, and players start the game on its page with a click, with nothing to download.

## Publishing Flow {#publishing-flow}

### 1. Make a zip file of your build {#make-a-zip-file-of-your-build}

- **Editor:** [download a build](/user-manual/editor/publishing/downloading/) with the **Download Format** set to **Static Website**. The zip file you download is ready to upload as it is.
- **Engine, React and Web Components:** set Vite's [`base`](https://vite.dev/config/shared-options#base) option to `'./'`, so the build loads its files with relative URLs. Projects made with [create-playcanvas](/user-manual/getting-started/start-with-create-playcanvas/) already do. Run `npm run build`, then zip the *contents* of the `dist` folder, so that `index.html` is at the root of the zip file rather than inside a folder.
- **Without a bundler:** zip the contents of the folder that contains your `index.html`.

### 2. Check the zip file against itch.io's limits {#check-the-limits}

itch.io sets [limits](https://itch.io/docs/creators/html5#zip-file-requirements) on a zip file that plays in the browser:

| Limit | Maximum |
| --- | --- |
| Number of files | 1,000 |
| Length of a file's path, including its folders | 240 characters |
| Size of all the files once extracted | 500 MB |
| Size of any one file | 200 MB |

To check a zip file, run `unzip -l build.zip`. It lists every file with its size, then the total size and the number of entries, which counts folders as well as files. To list any paths that are too long, run:

```sh
unzip -Z1 build.zip | awk 'length > 240'
```

An Editor build stores each asset's file at `files/assets/{assetId}/{revision}/{file name}`, so two of the limits need care in a large project:

- **Too many files.** Every texture, model, sound and other asset with a file adds a file to the build. Delete the assets your game doesn't use, or turn on **Exclude** in the [asset Inspector](/user-manual/editor/assets/inspectors/) to leave them out of builds. Keep the **Concatenate Scripts** [build option](/user-manual/editor/publishing/#build-options) turned on, so that your scripts are combined into fewer files.
- **Paths that are too long.** A file takes its name from its asset, so an asset whose name is longer than about 200 characters makes a path that's over the limit. Give the asset a shorter name in the Editor, then download a new build.

### 3. Create your project and upload the zip file {#upload-the-zip-file}

1. Sign in to itch.io and [create a new project](https://itch.io/game/new). An account is free.
2. Fill in the title and the other details, and set **Kind of project** to **HTML**.
3. Upload the zip file, and select **This file will be played in the browser** next to it.
4. Under **Embed options**, choose how your game appears on its page. See [Embed Options](#embed-options).
5. Select **Save & view page**.

### 4. Test and publish {#test-and-publish}

A new page is private, so only you can open it. Play the game there on the devices your players use. The first time the page loads, itch.io takes a moment to process the zip file.

When the game is ready, edit the page and set its visibility to **Public**.

## Embed Options {#embed-options}

itch.io shows your game in an iframe on its page. The embed options decide the size of that iframe and how the game starts:

| Option | What it does |
| --- | --- |
| **Embed in page** | Runs the game in the page at the viewport size you enter. |
| **Click to launch in fullscreen** | Opens the game across the whole browser window when the player starts it, so it needs no viewport size. |
| **Fullscreen button** | Adds a button at the bottom right of an embedded game that switches it to full screen. |
| **Mobile friendly** | Tells itch.io that the game works on phones and tablets. Without it, itch.io warns players on those devices that the game may not work. |

Players click to start the game by default. You can make it start as soon as the page loads, but some browsers then mute its sound. On phones and tablets, itch.io always launches the game across the whole window, whichever options you choose.

A game whose canvas fills its window fits any viewport size. create-playcanvas projects work this way, and so does an Editor project with **Fill Mode** set to **Fill window** in its [Rendering settings](/user-manual/editor/interface/settings/rendering/#resolution). With **Fill Mode** set to **Keep aspect ratio**, give the viewport the same aspect ratio as the project's **Resolution Width** and **Resolution Height**, or the game shows with empty bars beside or above it. With **None**, set the viewport to that exact size.

## Updating Your Game {#updating-your-game}

To replace the build, open the project's edit page, upload a new zip file and delete the old one.

If you update often, itch.io's command-line tool [butler](https://itch.io/docs/butler/) uploads a build folder without zipping it, and sends only the data that changed:

```sh
butler push dist your-name/your-game:html5
```

`dist` is your build folder, `your-name/your-game` comes from the address of your page, `https://your-name.itch.io/your-game`, and `html5` names the channel that holds the build. After the first push, open the project's edit page and mark the new file to be played in the browser.

## Troubleshooting {#troubleshooting}

When a file is missing, itch.io answers with a `403` error instead of the usual `404`. Open the browser's developer tools on your game's page and look for failed requests in the **Network** tab. The usual causes are:

- **URLs that start with `/`.** itch.io serves your game from a subfolder, so a URL like `/assets/level.glb` points outside it. Editor builds don't use them. In an Engine, React or Web Components project, set Vite's `base` option to `'./'`, and write the URLs in your own code without the leading slash, such as `assets/level.glb`.
- **Letter case that doesn't match.** File names on itch.io are case sensitive. A game that asks for `level.glb` when the file is named `Level.glb` works on Windows and macOS, and fails on itch.io.
- **Files loaded over HTTP.** Anything your game loads from another server, such as a script from a CDN or data from an API, must use an `https://` address.

## Useful Links {#useful-links}

- [Uploading HTML5 games](https://itch.io/docs/creators/html5) in the itch.io documentation
- [Getting started](https://itch.io/docs/creators/getting-started) with itch.io project pages
- [butler documentation](https://itch.io/docs/butler/)
