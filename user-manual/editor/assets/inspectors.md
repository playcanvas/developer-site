# Asset Inspectors

When you select an asset in the [Assets Panel](https://developer.playcanvas.com/user-manual/editor/assets/asset-panel.md), its properties are displayed in the Inspector. Each asset type has its own set of configurable properties.

## Common Properties

All asset inspectors display a common set of properties in the header section:

[Image: Common Asset Inspector Properties]

| Property | Description |
|----------|-------------|
| ID | The unique identifier for the asset. Useful for referencing the asset in scripts. |
| Name | The display name of the asset. This can be edited to rename the asset. |
| Tags | Tags assigned to the asset for organization and filtering, both in the [Assets Panel](https://developer.playcanvas.com/user-manual/editor/assets/asset-panel.md#searching) and at runtime via the [Engine API](https://developer.playcanvas.com/user-manual/assets/asset-registry.md#by-tag). |
| Type | The [asset type](https://developer.playcanvas.com/user-manual/editor/assets/inspectors.md#asset-types) (read-only). |
| Exclude | When enabled, the asset is excluded from the published build. Useful for development-only assets such as test scripts or READMEs. |
| Preload | When enabled, the asset is loaded at application startup. When disabled, referenced assets load asynchronously after the app starts, while unreferenced assets must be loaded manually via script. |
| Size | The file size of the asset (read-only). |
| Source | A reference to the source asset from which this asset was derived, if applicable (read-only). |
| Created | The date and time the asset was created (read-only). |

### Script Assets

Script assets display additional properties:

[Image: Script Asset Inspector Properties]

| Property | Description |
|----------|-------------|
| Loading Order | Opens the [script loading order manager](https://developer.playcanvas.com/user-manual/editor/scripting/loading-order.md) to control the order scripts are loaded. |
| Loading Type | Controls when the script is loaded: <ul><li>**Asset** - loaded as a regular asset</li><li>**Before Engine** - loaded before the PlayCanvas engine</li><li>**After Engine** - loaded after the engine but before application start</li></ul> |

### Asset Store Assets

Assets imported from the [Asset Store](https://developer.playcanvas.com/user-manual/editor/assets/asset-store.md) display additional attribution properties:

[Image: Asset Store Inspector Properties]

| Property | Description |
|----------|-------------|
| License | The license under which the asset is provided, with a link to license details. |
| Author | The original author of the asset, with a link to their profile. |

## Asset Types

| Type                             | Imported From                    | Resource Extensions              | Description                        |
| -------------------------------- | -------------------------------- | -------------------------------- | ---------------------------------- |
| [`animation`](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/animation.md)         | `.glb`, `.fbx`                   | `.glb`                           | Animation keyframe data            |
| [`audio`](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/audio.md)                 | `.mp3`, `.wav`, `.ogg`           | `.mp3`, `.wav`, `.ogg`           | Sound data                         |
| `binary`                         | `.bin`                           | `.bin`                           | Binary data                        |
| `bundle`                         | Created in the Editor            | `.tar`                           | Bundled assets                     |
| [`css`](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/css.md)                     | `.css`                           | `.css`                           | Stylesheets for HTML               |
| [`cubemap`](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/cubemap.md)             | `.png`, `.jpg`, `.webp`, `.avif` | `.png`, `.jpg`, `.webp`, `.avif` | Environment lighting data          |
| [`font`](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/font.md)                   | `.ttf`, `.ttc`, `.otf`, `.dfont` | `.json`, `.png`                  | Font data for rendering text       |
| [`gsplat`](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/gsplat.md)               | `.ply`                           | `.ply`                           | 3D Gaussian Splat data             |
| [`html`](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/html.md)                   | `.html`                          | `.html`                          | HTML documents                     |
| [`json`](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/json.md)                   | `.json`                          | `.json`                          | JSON documents                     |
| [`material`](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/material.md)           | `.glb`, `.fbx`                   | None                             | Material definitions for 3D models |
| [`render`](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/render.md)               | `.glb`, `.fbx`                   | `.glb`                           | 3D mesh data                       |
| [`script`](https://developer.playcanvas.com/user-manual/editor/scripting.md) | `.js`, `.mjs`                | `.js`, `.mjs`                    | Scripts                            |
| [`shader`](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/shader.md)               | `.glsl`, `.vert`, `.frag`        | `.glsl`, `.vert`, `.frag`        | Custom shaders for rendering       |
| [`sprite`](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/sprite.md)               | Created in the Editor            | None                             | 2D images for UIs or textures      |
| [`template`](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/template.md)           | `.glb`                           | None                             | Templates for entity hierarchy     |
| [`text`](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/text.md)                   | `.txt`                           | `.txt`                           | Text documents                     |
| [`texture-atlas`](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/texture-atlas.md) | `.png`, `.jpg`, `.webp`, `.avif` | `.png`, `.jpg`, `.webp`, `.avif` | Sprite sheet image data            |
| [`texture`](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/texture.md)             | `.png`, `.jpg`, `.webp`, `.avif` | `.png`, `.jpg`, `.webp`, `.avif` | Image data for 3D models or UIs    |
| [`wasm`](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/wasm.md)                   | `.wasm`                          | `.wasm`                          | WebAssembly modules                |
