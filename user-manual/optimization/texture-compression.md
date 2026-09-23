# Texture Compression

Texture data is stored in a device's video memory (or VRAM). It is important to ensure that your application does not exhaust VRAM as this can cause undesirable things like browser tab crashes.

The Editor has the ability to apply lossy compression schemes to your textures to dramatically reduce the amount of VRAM used using Basis.

[Basis](https://github.com/BinomialLLC/basis_universal) is a 'super-compressed' texture format. It's a platform independent lossy block compression format that can be transcoded to the natively supported hardware compression format at runtime. Supported transcode formats are ASTC, DXT, ETC2, ETC, PVR and ATC (selected in that order where available).

Consider this texture asset:

[Image: Brick Texture]

It's a 512x512 JPG that is 202KB in size. However, JPG is a compressed format and when passed to the graphics engine, it is expanded to an uncompressed RGB8 format that occupies 1.05MB of VRAM (including mipmap levels).

Enabling texture compression achieves the following results:

[Image: Basis Compression results]

The compression has achieved a 6 times reduction in VRAM usage. Furthermore, in this case, compression has also reduced download size from 202KB to as little as 46KB using the Default quality setting and ETC Mode.

Below is a side by side comparison of the brick texture on Mac with Chrome:

[Brick texture compression comparison](https://developer.playcanvas.com/img/user-manual/assets/textures/texture-compression/basis-vs-no-compression-brick.png)

Here is another example of the PlayCanvas cube [with Basis (ETC mode)](https://playcanv.as/p/j8rsh3eO/) and [without](https://playcanv.as/p/nAW3WkW8/) on Mac with Chrome:

[PlayCanvas cube compression comparison](https://developer.playcanvas.com/img/user-manual/assets/textures/texture-compression/basis-vs-no-compression-cube.png)

## Using Basis Texture Compression

Once the texture has been imported into the Editor, select it and scroll down in the inspector to find the Compression section.

1. Tick BASIS.
2. Click on Import Basis to add the WASM module for the Basis runtime to the project (this only needs to be done once).
3. Change mode from 'ETC (smaller size, lower quality)' to 'ASTC (larger size, higher quality)' if you need to reduce compression artifacts on this texture.
4. Tick Normals if compressing a normal map.
5. Change the quality setting to balance file size vs quality. Lower quality results in smaller file sizes.
6. Click on Compress Basis.

[Image: Enabling Basis Texture Compression]

The Basis WASM module will add 253KB of extra gzipped data to the preload download size but that should be offset by the texture size savings compared to using the legacy texture compression format files ([see below](https://developer.playcanvas.com/user-manual/optimization/texture-compression.md#legacy-texture-compression)).

To remove Basis compression from a texture:

1. Untick BASIS.
2. Click on Compress Basis.

[Image: Disabling Basis Texture Compression]

If you would no longer want to use Basis, remove Basis compression from all textures and delete the Basis folder from the project.

[Image: Delete Basis Module]

## Basis Limitations

There are some limitations of Basis texture compression in PlayCanvas.

1. The PVR format only supports textures that have dimensions that are both square (same width and height) and power of two (e.g. 256, 512, 1024 and so on). Older iOS devices (with an A6 SoC or lower like the iPhone 5 and 5C) and older iOS versions (13.7 and lower) only support PVR. A Basis texture that is non-square or non-power of two cannot be transcoded to PVR format but will instead use a 16-bit 565 pixel format. It will still display correctly, although may occupy more VRAM.
2. The maximum texture dimensions supported for Basis compression are 4096x4096. Textures larger than this would take an inordinate amount of time to compress so this is disabled.

## Legacy Texture Compression

We strongly recommend using Basis compression where possible as it requires a single texture file to cover all platforms and it is also a much smaller file compared to the legacy formats. Our tests show Basis to be ~50% smaller with minimal difference in quality.

The Legacy Texture schemes are:

- DXT: Typically supported by desktop devices.
- PVR: Typically supported by iOS devices.
- ETC: Typically supported by Android devices.

To use the Legacy Texture Compression options, select the texture and scroll down in the inspector to find the Compression section.

1. Tick LEGACY.
2. Tick all the formats you wish to use.
3. Click on Compress Legacy.

[Image: Enabling Legacy Texture Compression]

To remove one or several formats:

1. Untick all the formats you wish to remove.
2. Click on Compress Legacy.

[Image: Disabling Legacy Texture Compression]

## Migrating from Legacy to Basis Texture Compression

If you have a project that is already using the Legacy Texture Compression formats and wish to use Basis, do the following:

1. Remove all the legacy texture formats.
2. Enable and use Basis.

[Image: Migrate from Legacy to Basis]
