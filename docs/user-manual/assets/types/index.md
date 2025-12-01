---
title: Asset Types
---

The [Assets Panel](/user-manual/editor/interface/assets) manages the assets in your project. There are several different types of asset.

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
