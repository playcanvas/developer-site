---
title: Texture Compression
---

Texture data is stored in a device's video memory (or VRAM). It is important to ensure that your application does not exhaust VRAM as this can cause undesirable things like browser tab crashes.

The Editor has the ability to apply lossy compression schemes to your textures to dramatically reduce the amount of VRAM used using Basis.

[Basis][1] is a 'super-compressed' texture format. It's a platform independent lossy block compression format that can be transcoded to the natively supported hardware compression format at runtime. Supported transcode formats are ASTC, DXT, ETC2, ETC, PVR and ATC (selected in that order where available).

Consider this texture asset:

<img loading="lazy" src="/img/user-manual/assets/textures/texture-compression/brick.jpg" alt="Brick Texture" width="256" height="256" />

It's a 512x512 JPG that is 202KB in size. However, JPG is a compressed format and when passed to the graphics engine, it is expanded to an uncompressed RGB8 format that occupies 1.05MB of VRAM (including mipmap levels).

Enabling texture compression achieves the following results:

<img loading="lazy" src="/img/user-manual/assets/textures/texture-compression/compression-results.png" alt="Basis Compression results" width="400" />

The compression has achieved a 6 times reduction in VRAM usage. Furthermore, in this case, compression has also reduced download size from 202KB to as little as 46KB using the Default quality setting and ETC Mode.

Below is a side by side comparison of the brick texture on Mac with Chrome:

<a href="/img/user-manual/assets/textures/texture-compression/basis-vs-no-compression-brick.png" target="_blank"><img loading="lazy" src="/img/user-manual/assets/textures/texture-compression/basis-vs-no-compression-brick-thumb.jpg" alt="Brick texture compression comparison" /></a>

Here is another example of the PlayCanvas cube [with Basis (ETC mode)][2] and [without][3] on Mac with Chrome:

<a href="/img/user-manual/assets/textures/texture-compression/basis-vs-no-compression-cube.png" target="_blank"><img loading="lazy" src="/img/user-manual/assets/textures/texture-compression/basis-vs-no-compression-cube-thumb.jpg" alt="PlayCanvas cube compression comparison" /></a>

## Using Basis Texture Compression {#using-basis-texture-compression}

Once the texture has been imported into the Editor, select it and scroll down in the inspector to find the Compression section.

1. Tick BASIS.
2. Click on Import Basis to add the WASM module for the Basis runtime to the project (this only needs to be done once).
3. Change mode from 'ETC (smaller size, lower quality)' to 'ASTC (larger size, higher quality)' if you need to reduce compression artifacts on this texture.
4. Tick Normals if compressing a normal map.
5. Change the quality setting to balance file size vs quality. Lower quality results in smaller file sizes.
6. Click on Compress Basis.

<img loading="lazy" src="/img/user-manual/assets/textures/texture-compression/enable-basis-texture-compression.gif" alt="Enabling Basis Texture Compression" width="400" />

The Basis WASM module will add 253KB of extra gzipped data to the preload download size but that should be offset by the texture size savings compared to using the legacy texture compression format files ([see below][4]).

To remove Basis compression from a texture:

1. Untick BASIS.
2. Click on Compress Basis.

<img loading="lazy" src="/img/user-manual/assets/textures/texture-compression/disable-basis-texture-compression.gif" alt="Disabling Basis Texture Compression" width="400" />

If you would no longer want to use Basis, remove Basis compression from all textures and delete the Basis folder from the project.

<img loading="lazy" src="/img/user-manual/assets/textures/texture-compression/delete-basis-library.png" alt="Delete Basis Module" width="400" />

## Basis Limitations {#basis-limitations}

There are some limitations of Basis texture compression in PlayCanvas.

1. The PVR format only supports textures that have dimensions that are both square (same width and height) and power of two (e.g. 256, 512, 1024 and so on). Older iOS devices (with an A6 SoC or lower like the iPhone 5 and 5C) and older iOS versions (13.7 and lower) only support PVR. A Basis texture that is non-square or non-power of two cannot be transcoded to PVR format but will instead use a 16-bit 565 pixel format. It will still display correctly, although may occupy more VRAM.
2. The maximum texture dimensions supported for Basis compression are 4096x4096. Textures larger than this would take an inordinate amount of time to compress so this is disabled.

## Legacy Texture Compression {#legacy-texture-compression}

We strongly recommend using Basis compression where possible as it requires a single texture file to cover all platforms and it is also a much smaller file compared to the legacy formats. Our tests show Basis to be ~50% smaller with minimal difference in quality.

The Legacy Texture schemes are:

- DXT: Typically supported by desktop devices.
- PVR: Typically supported by iOS devices.
- ETC: Typically supported by Android devices.

To use the Legacy Texture Compression options, select the texture and scroll down in the inspector to find the Compression section.

1. Tick LEGACY.
2. Tick all the formats you wish to use.
3. Click on Compress Legacy.

<img loading="lazy" src="/img/user-manual/assets/textures/texture-compression/enable-legacy-texture-compression.gif" alt="Enabling Legacy Texture Compression" width="400" />

To remove a or several formats:

1. Untick all the formats you wish to remove.
2. Click on Compress Legacy.

<img loading="lazy" src="/img/user-manual/assets/textures/texture-compression/disable-legacy-texture-compression.gif" alt="Disabling Legacy Texture Compression" width="400" />

## Migrating from Legacy to Basis Texture Compression {#migrating-from-legacy-to-basis-texture-compression}

If you have a project that is already using the Legacy Texture Compression formats and wish to use Basis, do the following:

1. Remove all the legacy texture formats.
2. Enable and use Basis.

<img loading="lazy" src="/img/user-manual/assets/textures/texture-compression/migrate-legacy-to-basis.gif" alt="Migrate from Legacy to Basis" width="400" />

[1]: https://github.com/BinomialLLC/basis_universal
[2]: https://playcanv.as/p/j8rsh3eO/
[3]: https://playcanv.as/p/nAW3WkW8/
[4]: #legacy-texture-compression
