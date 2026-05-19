---
title: Downloading Projects
description: Explains PlayCanvas project download formats for self-hosted apps, including static and npm package layouts.
---

PlayCanvas projects can be downloaded as self-hostable application packages. Downloaded packages contain the files needed to run your app outside PlayCanvas hosting, not the full editable project history.

For project backups that can be imported back into PlayCanvas, see [Backup and Export](backup-and-export.md).

## Download Formats {#download-formats}

Use `static` for the standard self-hostable package. This is the right choice when you want to upload the downloaded files directly to a web server or hosting provider.

Use `npm` for a Vite-based npm project. This is the right choice when you want to work with the downloaded app locally, run it with Vite, or create production builds with npm scripts.

The REST [Download app](/user-manual/api/app-download) endpoint uses the `format` parameter to select either `static` or `npm`.

## NPM Project Structure {#npm-project-structure}

When the download format is `npm`, the downloaded project uses one of these layouts depending on the scripts in the project. Generated app config and scene data are placed in `src/data/` so they can be watched during local development, while runtime assets and static files remain in `public/`.

### File Names and Conflicts

:::note

NPM downloads may rename scene, asset, and folder files to make paths filesystem-safe and unique. Use the generated config paths rather than assuming Editor names map directly to downloaded filenames.

:::

Scene JSON files are named from the scene display name. Names are lowercased, non-`a-z` or `0-9` characters become hyphens, repeated hyphens are collapsed, and leading or trailing hyphens are removed. For example, `Main Scene` becomes `main-scene.json` and `100% Scene` becomes `100-scene.json`.

If a scene name is empty or only contains punctuation, the file uses `scene-{sceneId}.json`. If multiple scenes would use the same filename, the scene id is appended before `.json`, for example a conflicting `Main Scene` with id `101` becomes `main-scene-101.json`.

Asset and folder names are sanitized for filesystem use, but they are not converted to lowercase hyphenated names. Conflicts are resolved per folder by appending `.{id}` before the extension, for example `image.2.png`, `image.1.1.png`, or `Folder.10`. Generated config paths are updated to the final filenames.

### Classic Scripts

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

### ESM Scripts

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

### Classic and ESM Scripts

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
