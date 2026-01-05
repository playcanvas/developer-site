---
title: Asset Inspectors
---

When you select an asset in the [Assets Panel](/user-manual/editor/assets/asset-panel), its properties are displayed in the Inspector. Each asset type has its own set of configurable properties.

## Common Properties

All asset inspectors display a common set of properties in the header section:

![Common Asset Inspector Properties](/img/user-manual/editor/assets/inspectors/asset-inspector-common.png)

| Property | Description |
|----------|-------------|
| ID | The unique identifier for the asset. Useful for referencing the asset in scripts. |
| Name | The display name of the asset. This can be edited to rename the asset. |
| Tags | Tags assigned to the asset for organization and filtering, both in the [Assets Panel](/user-manual/editor/assets/asset-panel#searching) and at runtime via the [Engine API](/user-manual/assets/asset-registry#by-tag). |
| Type | The [asset type](#asset-types) (read-only). |
| Exclude | When enabled, the asset is excluded from the published build. Useful for development-only assets such as test scripts or READMEs. |
| Preload | When enabled, the asset is loaded at application startup. When disabled, referenced assets load asynchronously after the app starts, while unreferenced assets must be loaded manually via script. |
| Size | The file size of the asset (read-only). |
| Source | A reference to the source asset from which this asset was derived, if applicable (read-only). |
| Created | The date and time the asset was created (read-only). |

### Script Assets

Script assets display additional properties:

![Script Asset Inspector Properties](/img/user-manual/editor/assets/inspectors/asset-inspector-common-script.png)

| Property | Description |
|----------|-------------|
| Loading Order | Opens the [script loading order manager](/user-manual/editor/scripting/loading-order) to control the order scripts are loaded. |
| Loading Type | Controls when the script is loaded: <ul><li>**Asset** - loaded as a regular asset</li><li>**Before Engine** - loaded before the PlayCanvas engine</li><li>**After Engine** - loaded after the engine but before application start</li></ul> |

### Asset Store Assets

Assets imported from the [Asset Store](/user-manual/editor/assets/asset-store) display additional attribution properties:

![Asset Store Inspector Properties](/img/user-manual/editor/assets/inspectors/asset-inspector-common-license.png)

| Property | Description |
|----------|-------------|
| License | The license under which the asset is provided, with a link to license details. |
| Author | The original author of the asset, with a link to their profile. |

## Asset Types

| Type                             | Imported From                    | Resource Extensions              | Description                        |
| -------------------------------- | -------------------------------- | -------------------------------- | ---------------------------------- |
| [`animation`](animation)         | `.glb`, `.fbx`                   | `.glb`                           | Animation keyframe data            |
| [`audio`](audio)                 | `.mp3`, `.wav`, `.ogg`           | `.mp3`, `.wav`, `.ogg`           | Sound data                         |
| `binary`                         | `.bin`                           | `.bin`                           | Binary data                        |
| `bundle`                         | Created in the Editor            | `.tar`                           | Bundled assets                     |
| [`css`](css)                     | `.css`                           | `.css`                           | Stylesheets for HTML               |
| [`cubemap`](cubemap)             | `.png`, `.jpg`, `.webp`, `.avif` | `.png`, `.jpg`, `.webp`, `.avif` | Environment lighting data          |
| [`font`](font)                   | `.ttf`, `.woff`                  | `.json`, `.png`                  | Font data for rendering text       |
| [`gsplat`](gsplat)               | `.ply`                           | `.ply`                           | 3D Gaussian Splat data             |
| [`html`](html)                   | `.html`                          | `.html`                          | HTML documents                     |
| [`json`](json)                   | `.json`                          | `.json`                          | JSON documents                     |
| [`material`](material)           | `.glb`, `.fbx`                   | None                             | Material definitions for 3D models |
| [`render`](render)               | `.glb`, `.fbx`                   | `.glb`                           | 3D mesh data                       |
| [`script`](../../scripting/index.md) | `.js`, `.mjs`                | `.js`, `.mjs`                    | Scripts                            |
| [`shader`](shader)               | `.glsl`, `.vert`, `.frag`        | `.glsl`, `.vert`, `.frag`        | Custom shaders for rendering       |
| [`sprite`](sprite)               | Created in the Editor            | None                             | 2D images for UIs or textures      |
| [`template`](template)           | `.glb`                           | None                             | Templates for entity hierarchy     |
| [`text`](text)                   | `.txt`                           | `.txt`                           | Text documents                     |
| [`texture-atlas`](texture-atlas) | `.png`, `.jpg`, `.webp`, `.avif` | `.png`, `.jpg`, `.webp`, `.avif` | Sprite sheet image data            |
| [`texture`](texture)             | `.png`, `.jpg`, `.webp`, `.avif` | `.png`, `.jpg`, `.webp`, `.avif` | Image data for 3D models or UIs    |
| [`wasm`](wasm)                   | `.wasm`                          | `.wasm`                          | WebAssembly modules                |
