---
title: Downloading Projects
description: Explains PlayCanvas project download formats for self-hosted apps, including static and npm package layouts.
---

<!-- TODO: enable this AI block after editor-mcp-server feat/editor-driver-coverage is released.
:::ai

- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Create a static or npm download build, wait for it to finish, and save the archive to an explicit local path.

:::
-->

PlayCanvas projects can be downloaded as self-hostable application packages. Downloaded packages contain the files needed to run your app outside PlayCanvas hosting, not the full editable project history.

For project backups that can be imported back into PlayCanvas, see [Backup and Export](backup-and-export.md).

## Download Formats {#download-formats}

Use `static` for the standard self-hostable package. This is the right choice when you want to upload the downloaded files directly to a web server or hosting provider.

Use `npm` for a Vite-based npm project. This is the right choice when you want to work with the downloaded app locally, run it with Vite, or create production builds with npm scripts.

The REST [Download app](/user-manual/api/app-download) endpoint uses the `format` parameter to select either `static` or `npm`.

## Static Project Structure {#static-project-structure}

When the download format is `static`, the downloaded project is a self-contained web build for direct web-server hosting. Serve the extracted folder over HTTP or HTTPS; opening `index.html` from a `file://` URL is not supported.

Static downloads also use different layouts depending on the script types in the source project.

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

When the download format is `npm`, the downloaded project uses one of these layouts depending on the script types in the source project. Generated app config and scene data are placed in `src/data/` so they can be watched during local development, while runtime assets and static files remain in `public/`.

### File Names and Conflicts

:::note

NPM downloads may rename scene, asset, and folder files to make paths filesystem-safe and unique. Use the generated config paths rather than assuming Editor names map directly to downloaded filenames.

:::

Scene JSON files are named from the scene display name. Names are lowercased, non-`a-z` or `0-9` characters become hyphens, repeated hyphens are collapsed, and leading or trailing hyphens are removed. For example, `Main Scene` becomes `main-scene.json` and `100% Scene` becomes `100-scene.json`.

If a scene name is empty or only contains punctuation, the file uses `scene-{sceneId}.json`. If multiple scenes would use the same filename, the scene id is appended before `.json`, for example a conflicting `Main Scene` with id `101` becomes `main-scene-101.json`.

Asset and folder names are sanitized for filesystem use, but they are not converted to lowercase hyphenated names. Conflicts are resolved per folder by appending `.{id}` before the extension, for example `image.2.png`, `image.1.1.png`, or `Folder.10`. Generated config paths are updated to the final filenames.

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
