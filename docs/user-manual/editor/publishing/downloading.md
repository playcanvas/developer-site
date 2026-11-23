---
title: Downloading a Build
description: "Downloading a build of a PlayCanvas Editor project to host yourself: the Static Website and npm download formats, and the files each one contains for Classic, ESM and mixed scripts."
---

Download a build when you want to run your app somewhere other than [PlayCanvas Hosting](playcanvas-hosting.md): on your own server, on a game platform, in an app store or as a desktop app. A download contains the files your app needs to run, not the project itself. To back up a project so that you can import it again, see [Backup and Export](../projects/backup-and-export.md).

## Downloading a Build {#downloading-a-build}

1. Select the **Publish / Download** button in the [toolbar](../interface/toolbar.md) to open the [Builds panel](index.md#the-builds-panel).
2. Select **Download**.
3. Give the build a **Title**, choose a **Download Format**, and select the scenes to include. See [Making a Build](index.md#making-a-build) for the other settings.
4. Select **Download** at the bottom of the form.

The build appears in **Build history**. When it's ready, select its download button to save it as a zip file.

A build doesn't run if you open its `index.html` from your computer's files. To try it, [serve it from a local web server](/user-manual/publishing/web-hosting/#testing-a-build-locally).

## Download Formats {#download-formats}

| Format | Use it when |
| --- | --- |
| **Static Website** | You want to put the build on a web server, a static hosting service or a game platform as it is. See [Web Hosting](/user-manual/publishing/web-hosting/). |
| **NPM + Vite Project** | You want to keep working on the app as code: run it with Vite, change it, and make production builds with npm scripts. This format is a work in progress. |

The REST API's [Download app](/user-manual/api/app-download/) endpoint downloads builds too. Its `format` parameter is `static` for a static website or `npm` for an npm project.

## Static Project Structure {#static-project-structure}

A Static Website build is a folder of files that runs as it is. Its layout depends on the kinds of script your project uses.

### Classic Scripts {#static-projects-with-classic-scripts}

```text
index.html
playcanvas-stable.min.js
__settings__.js
__modules__.js
__start__.js
__loading__.js
config.json
{sceneId}.json
manifest.json
styles.css
logo.png
files/
  assets/
    {assetId}/
      {revision}/
        *
```

Classic script concatenation options may also add `__game-scripts.js` and source maps. These optional files do not change the script-type layout.

### ESM Scripts {#static-projects-with-esm-scripts}

In ESM static downloads, `index.html` loads `js/index.mjs` as the module entry point.

```text
index.html
config.json
{sceneId}.json
manifest.json
styles.css
logo.png
js/
  index.mjs
  *.mjs
files/
  assets/
    {assetId}/
      {revision}/
        *
```

### Mixed Scripts {#static-projects-with-classic-and-esm-scripts}

Mixed static downloads use the ESM-style layout. The generated module entry point also loads the classic `.js` scripts.

```text
index.html
config.json
{sceneId}.json
manifest.json
styles.css
logo.png
js/
  index.mjs
  *.mjs
  *.js
files/
  assets/
    {assetId}/
      {revision}/
        *
```

## NPM Project Structure {#npm-project-structure}

:::info[Work in progress]

The `npm` download format is currently in active development. Package layouts and generated file names may change.

:::

An npm project uses one of these layouts depending on the script types in the source project. Generated app config and scene data are placed in `src/data/` so they can be watched during local development, while runtime assets and static files remain in `public/`.

### File Names and Conflicts

:::note

NPM downloads may rename scene, asset, and folder files to make paths filesystem-safe and unique. Use the generated config paths rather than assuming Editor names map directly to downloaded filenames.

:::

Scene JSON files are named from the scene display name. Names are lowercased, non-`a-z` or `0-9` characters become hyphens, repeated hyphens are collapsed, and leading or trailing hyphens are removed. For example, `Main Scene` becomes `main-scene.json` and `100% Scene` becomes `100-scene.json`.

If a scene name is empty or only contains punctuation, the file uses `scene-{sceneId}.json`. If multiple scenes would use the same filename, the scene id is appended before `.json` using the collision rule below. For example, a conflicting `Main Scene` with id `101` becomes `main-scene-101.json`.

Asset and folder names are sanitized for filesystem use, but they are not converted to lowercase hyphenated names. Scene, asset, and folder conflicts are resolved per folder by appending `-{id}` before the extension, for example `image-2.png`, `Folder-10`, or `main-scene-101.json`. Every member of a collision group receives its stable id, while unique names remain unchanged. A naturally suffixed name stays reserved, so duplicate `image.png` files with ids `1` and `2` alongside a natural `image-1.png` become `image-1-1.png`, `image-2.png`, and `image-1.png`. Generated config paths are updated to the final filenames.

The following examples show the package structure created for projects that contain only classic scripts, only ESM scripts, or both script types.

### Classic Scripts {#projects-with-classic-scripts}

```text
src/
  main.mjs
  bootstrap/
    settings.js
    modules.js
    start.js
    loading.js
  scripts/
    *.js
  data/
    config.json
    scenes/
      *.json
public/
  assets/
  thumbs/
  manifest.json
  styles.css
```

### ESM Scripts {#projects-with-esm-scripts}

```text
src/
  main.mjs
  bootstrap/
    index.mjs
    settings.mjs
    modules.mjs
    start.mjs
    loading.mjs
  scripts/
    *.mjs
  data/
    config.json
    scenes/
      *.json
public/
  assets/
  thumbs/
  manifest.json
  styles.css
```

### Mixed Scripts {#projects-with-classic-and-esm-scripts}

```text
src/
  main.mjs
  bootstrap/
    index.mjs
    settings.mjs
    modules.mjs
    start.mjs
    loading.mjs
  scripts/
    *.mjs
    *.js
  data/
    config.json
    scenes/
      *.json
public/
  assets/
  thumbs/
  manifest.json
  styles.css
```
