---
title: Finding Assets
description: Where to find free and paid 3D models, textures, skyboxes, sound effects and music for PlayCanvas projects, and what to check before you use them.
---

You don't have to make every asset yourself. This page lists places to find 3D models, textures, skyboxes, sound effects and music, and what to check before you add them to a project.

## In the Editor

The Editor's [Asset Store](/user-manual/editor/assets/asset-store/) imports assets straight into your project, without a download and upload. It has two libraries:

- **PlayCanvas**: 3D models, fonts, scripts, skyboxes, templates and textures, chosen by the PlayCanvas team and partner creators.
- **[Sketchfab](/user-manual/editor/assets/asset-store/sketchfab/)**: thousands of free 3D models from the Sketchfab community.

Start there. If the Asset Store doesn't have what you need, try the sites below.

## Before You Download

Check three things before you use an asset from another site.

### The License

Every site on this page says how you may use its assets, and many give each asset its own license. These are the [Creative Commons](https://creativecommons.org/cc-licenses/) licenses and terms you'll see most:

| License | What it means |
| ------- | ------------- |
| CC0 (public domain) | Use it for anything, with no credit required. |
| CC BY | Use it for anything, but credit the author in your app. |
| CC BY-NC | Credit the author, and don't use it in a commercial project. |
| Royalty-free | Pay once (or get it free) and use it in your projects without further fees. The seller's license sets the limits. |

Keep a note of where each asset came from and its license, so you can credit the authors and answer questions about it later.

### The Format

GLB is the best format for 3D models. The Editor also imports FBX, OBJ and COLLADA (`.dae`) files and converts them to GLB. Some sites only offer Blender (`.blend`) files, which you have to [export from Blender](/user-manual/assets/models/exporting/) first. See [Supported Formats](/user-manual/assets/supported-formats/) for the full list, including textures and audio.

### The Size

Your users download every asset before they see it. A model made for film or offline rendering can have millions of polygons and 8K textures. Many sites let you pick a texture resolution: 1K or 2K is usually plenty on the web. See [Optimizing Load Time](/user-manual/optimization/load-time/) for more.

## 3D Models

| Site | What you'll find | Cost and license |
| ---- | ---------------- | ---------------- |
| [BlendSwap](https://blendswap.com/) | Community models and scenes, mostly as Blender files | Free. Each model has its own Creative Commons license |
| [CGTrader](https://www.cgtrader.com/) | A large marketplace of models | Free and paid. Formats vary by listing |
| [Fab](https://www.fab.com/) | Epic Games' marketplace. The Fab Standard License covers use in any engine, not just Unreal | Free and paid. Formats vary by listing |
| [KayKit](https://kaylousberg.com/game-assets) | Low-poly packs by Kay Lousberg, in FBX, glTF and OBJ | Free versions are CC0. Paid versions add more models |
| [Mixamo](https://www.mixamo.com/) | Rigged humanoid characters and a library of animations for them, downloaded as FBX. It can also rig your own humanoid models | Free with an Adobe account, royalty-free |
| [Poly Haven](https://polyhaven.com/models) | Realistic props, furniture and plants, in glTF, FBX and Blender formats | Free, CC0 |
| [Quaternius](https://quaternius.com/) | Low-poly characters, animals and environment packs | Free, no credit required. CC0 or the author's own license, which only forbids reselling |
| [Sketchfab](https://sketchfab.com/features/download) | A huge library of community models, many of them downloadable as glTF | Free. Each model has its own Creative Commons license |
| [TurboSquid](https://www.turbosquid.com/) | A large marketplace of models, mostly paid | Mostly paid. Formats vary by listing |

## Textures and Skyboxes

| Site | What you'll find | Cost and license |
| ---- | ---------------- | ---------------- |
| [ambientCG](https://ambientcg.com/) | PBR materials and HDRIs | Free, CC0 |
| [Poly Haven](https://polyhaven.com/) | Physically based rendering (PBR) textures and high dynamic range images (HDRIs) for skyboxes and lighting | Free, CC0 |

HDRIs usually come as a single equirectangular (panorama) image. To use one as a skybox or for lighting, [convert it to a cubemap](/user-manual/editor/assets/inspectors/cubemap/#converting-equirectangular-or-octahedral-hdris-to-cubemaps). See [Image Based Lighting](/user-manual/graphics/physical-rendering/image-based-lighting/) for how the engine uses it.

## 2D Art

| Site | What you'll find | Cost and license |
| ---- | ---------------- | ---------------- |
| [Game Dev Market](https://www.gamedevmarket.net?ally=O0I9alFp) | Art, user interface (UI), 3D and audio packs for games | Mostly paid, royalty-free |
| [itch.io](https://itch.io/game-assets) | Packs from independent artists, many of them free | Free and paid. Check each pack's license |
| [OpenGameArt](https://opengameart.org/) | Community-contributed art of every kind | Free. Each asset has its own license |

## Sound Effects

| Site | What you'll find | Cost and license |
| ---- | ---------------- | ---------------- |
| [Freesound](https://freesound.org/) | A huge community library of sounds and recordings | Free. Each sound is CC0, CC BY or CC BY-NC |
| [OpenGameArt](https://opengameart.org/) | Community-contributed sound effects | Free. Each asset has its own license |
| [PlayOnLoop](https://www.playonloop.com/) | Sound effects for games and videos | Free, CC BY |
| [Sonniss GameAudioGDC](https://sonniss.com/gameaudiogdc/) | Tens of gigabytes of professional sound effects from the free bundles Sonniss releases for the Game Developers Conference | Free, royalty-free, no credit required |

You can also make retro game sounds in your browser with [Bfxr](https://www.bfxr.net/) or [jsfxr](https://sfxr.me/).

## Music

| Site | What you'll find | Cost and license |
| ---- | ---------------- | ---------------- |
| [Incompetech](https://incompetech.com/) | Kevin MacLeod's large library of music in many styles | Free under CC BY, or paid if you don't want to credit him |
| [itch.io](https://itch.io/game-assets/tag-music) | Music packs from independent composers | Free and paid. Check each pack's license |
| [OpenGameArt](https://opengameart.org/) | Community-contributed music | Free. Each asset has its own license |
| [PlayOnLoop](https://www.playonloop.com/) | Music loops that repeat seamlessly | Paid, royalty-free. Short versions are free under CC BY |

## Gaussian Splats

[SuperSplat](https://superspl.at/) is the PlayCanvas site for publishing and sharing Gaussian splats. Many of its creators let you download their splats under a Creative Commons license. [Search for downloadable splats](https://superspl.at/search?features=downloadable), or open the **Free Downloads** collection on the home page. A splat's [Download dialog](/user-manual/supersplat/viewing/scene-page/#download-dialog) shows its license and copies the credit text for you.

To capture your own splats from photos or video, see [Recommended Tools](/user-manual/gaussian-splatting/creating/recommended-tools/).

## Suggest a Site

Know a good source that isn't listed here? Suggest it on the [forum](https://forum.playcanvas.com/), or open a pull request on [GitHub](https://github.com/playcanvas/developer-site).
