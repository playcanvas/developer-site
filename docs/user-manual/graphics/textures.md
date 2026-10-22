---
title: Textures
description: Create and use textures from code - 2D textures, cubemaps, texture arrays and volume textures, pixel formats, uploading data, sampling, mipmaps, shaders, and reading back and copying texture data.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A [texture](https://api.playcanvas.com/engine/classes/Texture.html) is an image or a grid of data stored on the GPU. Textures are most commonly loaded as [assets](../assets/index.md) and used by materials, but they can also be created from code, filled with data, sampled in custom shaders, and rendered into using [render targets](./advanced-rendering/render-targets.md).

## Texture types

| Type | Created with | Typical use |
| --- | --- | --- |
| 2D texture | (default) | Images, data maps, render target outputs |
| Cubemap | `cubemap: true` | Environment maps, reflections, omni light shadows - six square faces |
| 2D texture array | `arrayLength: n` | A stack of same-sized 2D layers, sampled by a layer index - terrain layers, impostors, sprite sets |
| Volume (3D) texture | `volume: true` and `depth: n` | A 3D grid of texels, sampled with 3D coordinates - fog and cloud volumes, 3D lookup tables, voxel data |

## Creating a texture

```javascript
const texture = new Texture(app.graphicsDevice, {
    name: 'MyTexture',
    width: 256,
    height: 256,
    format: PIXELFORMAT_RGBA8,
    mipmaps: true,
    minFilter: FILTER_LINEAR_MIPMAP_LINEAR,
    magFilter: FILTER_LINEAR,
    addressU: ADDRESS_CLAMP_TO_EDGE,
    addressV: ADDRESS_CLAMP_TO_EDGE
});
```

The other texture types use the same constructor, with the option selecting the type:

```javascript
// a cubemap with six 128x128 faces
const cubemap = new Texture(app.graphicsDevice, { width: 128, height: 128, cubemap: true });

// a texture array with 16 layers of 256x256
const textureArray = new Texture(app.graphicsDevice, { width: 256, height: 256, arrayLength: 16 });

// a volume texture of 64x64x32 texels
const volume = new Texture(app.graphicsDevice, { width: 64, height: 64, depth: 32, volume: true });
```

## Pixel formats

The `format` option selects how each texel is stored. The [`Texture`](https://api.playcanvas.com/engine/classes/Texture.html) API reference lists all formats, along with the details of their support on WebGL2 and WebGPU. The main groups are:

- **8-bit formats** - `PIXELFORMAT_RGBA8` (the default), `PIXELFORMAT_RG8` and `PIXELFORMAT_R8`, for colors and general data.
- **sRGB formats** - color textures authored in sRGB, such as most color images, should use an sRGB format (for example `PIXELFORMAT_SRGBA8`), or the `srgb: true` option, which selects the sRGB variant of the format. They are converted to linear space when sampled, which keeps the lighting physically correct. See [Linear Workflow](./linear-workflow/index.md) and [sRGB texture handling](./linear-workflow/textures.md).
- **HDR formats** - half-float (`PIXELFORMAT_RGBA16F`), float (`PIXELFORMAT_RGBA32F`), small-float (`PIXELFORMAT_111110F`) and the compact shared-exponent `PIXELFORMAT_RGB9E5`, for values outside of the 0 to 1 range. See [HDR Rendering](./linear-workflow/hdr-rendering.md).
- **Integer formats** - for example `PIXELFORMAT_R8U` or `PIXELFORMAT_RGBA32U`, holding integer values. They cannot be filtered, and are read in a shader by texel coordinates.
- **Compressed formats** - such as the DXT, ETC, PVRTC and ASTC families, which use much less memory. They are usually produced from texture assets, see [Texture Compression](../optimization/texture-compression.md).
- **Depth formats** - `PIXELFORMAT_DEPTH`, `PIXELFORMAT_DEPTH16` and `PIXELFORMAT_DEPTHSTENCIL`, used as the depth buffers of render targets.

Not every format can be rendered into - see [Choosing a format](./advanced-rendering/render-targets.md#choosing-a-format) on the Render Targets page.

## Uploading data

Data can be provided when the texture is created, using the `levels` option, which holds the data of each mip level, starting with the top level:

- **2D texture** - each level is a typed array, or a browser image source such as an image, a canvas, an image bitmap or a video.
- **Cubemap** - each level is an array of six faces, in the order +X, -X, +Y, -Y, +Z, -Z.
- **Texture array** - each level is an array with an entry for each layer.
- **Volume texture** - each level is a single typed array holding all the depth slices, one after another.

```javascript
// a volume texture, filled with data for all its depth slices
const data = new Uint8Array(64 * 64 * 32 * 4);
// ... fill the data, slice after slice, row after row
const volume = new Texture(app.graphicsDevice, {
    width: 64,
    height: 64,
    depth: 32,
    volume: true,
    format: PIXELFORMAT_RGBA8,
    levels: [data]
});
```

The data can also be updated later:

- [`lock`](https://api.playcanvas.com/engine/classes/Texture.html#lock) returns a typed array of a mip level (or of a cubemap face) to fill, and [`unlock`](https://api.playcanvas.com/engine/classes/Texture.html#unlock) uploads it. For a volume texture, the typed array holds all depth slices of the mip level.
- [`setSource`](https://api.playcanvas.com/engine/classes/Texture.html#setsource) sets a browser image source, such as a canvas or a video.

```javascript
const pixels = texture.lock();
for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = 255;        // red
    pixels[i + 1] = 0;      // green
    pixels[i + 2] = 0;      // blue
    pixels[i + 3] = 255;    // alpha
}
texture.unlock();
```

## Sampling options

The filtering and the wrapping of a texture are set by these options, which can also be changed later using the matching properties:

- `minFilter` and `magFilter` - the filtering when the texture is minified and magnified, for example `FILTER_LINEAR_MIPMAP_LINEAR` (trilinear) or `FILTER_NEAREST` (no filtering).
- `anisotropy` - the anisotropic filtering level, which keeps textures sharp at grazing angles.
- `addressU`, `addressV` and `addressW` - the wrapping in each direction, for example `ADDRESS_REPEAT` or `ADDRESS_CLAMP_TO_EDGE`. `addressW` applies to volume textures.

## Mipmaps

Mipmaps are smaller, filtered copies of the texture, which keep it smooth and fast to sample at a distance. They are enabled by the `mipmaps` option (enabled by default), and their number is determined by the largest dimension of the texture - for a volume texture, including its depth. The `numLevels` option sets their number explicitly.

When only the top level of the data is provided, the other levels are generated automatically when the texture is uploaded, for all texture types, including volume textures. Compressed and integer textures do not support the generation, and need all their levels provided.

Mipmaps are also generated after rendering into the texture, see [Mipmaps](./advanced-rendering/render-targets.md#mipmaps) on the Render Targets page.

## Sampling in shaders

Materials such as `StandardMaterial` sample 2D textures and cubemaps. Texture arrays and volume textures are sampled using [custom shaders](./shaders/index.md), which declare the texture with the type matching it:

| Texture type | GLSL | WGSL |
| --- | --- | --- |
| 2D texture | `sampler2D` | `texture_2d<f32>` |
| Cubemap | `samplerCube` | `texture_cube<f32>` |
| 2D texture array | `sampler2DArray` | `texture_2d_array<f32>` |
| Volume texture | `sampler3D` | `texture_3d<f32>` |

For example, a texture array and a volume texture:

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
uniform mediump sampler2DArray uLayers;
uniform mediump sampler3D uVolume;

// in the fragment shader
vec4 layerColor = texture(uLayers, vec3(uv, layerIndex));
vec4 volumeColor = texture(uVolume, uvw);
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
var uLayers: texture_2d_array<f32>;
var uLayersSampler: sampler;
var uVolume: texture_3d<f32>;
var uVolumeSampler: sampler;

// in the fragment shader
let layerColor = textureSample(uLayers, uLayersSampler, uv, layerIndex);
let volumeColor = textureSample(uVolume, uVolumeSampler, uvw);
```

</TabItem>
</Tabs>

```javascript
material.setParameter('uLayers', textureArray);
material.setParameter('uVolume', volume);
```

Integer textures use integer sampler types (for example `usampler2D` in GLSL, `texture_2d<u32>` in WGSL), and are read by texel coordinates using `texelFetch` / `textureLoad`.

On WebGPU, a part of a texture - a range of its mip levels or array layers - can be bound using a [`TextureView`](https://api.playcanvas.com/engine/classes/TextureView.html), created with [`Texture#getView`](https://api.playcanvas.com/engine/classes/Texture.html#getview). On WebGL, a texture view binds the whole texture.

## Reading back and copying

[`Texture#read`](https://api.playcanvas.com/engine/classes/Texture.html#read) downloads a rectangle of a texture's pixels from the GPU, and returns a promise resolving with them. Select the face of a cubemap with the `face` option, the layer of a texture array with `layer`, and the depth slice of a volume texture with `slice`. When `slice` is not specified, all depth slices of the volume are read, one after another, in a single operation:

```javascript
const pixels = await texture.read(0, 0, texture.width, texture.height, { mipLevel: 0 });

// a single depth slice of a volume texture, or all of them
const slicePixels = await volume.read(0, 0, volume.width, volume.height, { slice: 5 });
const volumePixels = await volume.read(0, 0, volume.width, volume.height);
```

[`Texture#copy`](https://api.playcanvas.com/engine/classes/Texture.html#copy) copies a region of a texture into another texture of the same format, on the GPU. It supports the same `face`, `layer` and `slice` options, and copies all depth slices of a volume texture when `slice` is not specified:

```javascript
// copy all depth slices of a volume texture
destination.copy(volume);

// copy one layer of a texture array
destinationArray.copy(textureArray, { layer: 3 });
```

## Rendering into textures

A texture can be rendered into, including into a face of a cubemap, a layer of a texture array or a depth slice of a volume texture. See [Render Targets](./advanced-rendering/render-targets.md).

## Texture memory

A texture holds GPU memory until it is destroyed. Its size depends on its dimensions, its format and its mip levels - all faces of a cubemap, all layers of a texture array and all depth slices of a volume texture count. To observe the memory used by textures:

- [MiniStats](../optimization/mini-stats.md) shows the GPU memory used by textures in its VRAM section.
- The [Inspector](../scripting/debugging/inspector.md) lists the textures on the device, largest first, in its Textures tab, and breaks the video memory down by kind of resource in its Memory tab.

Destroy a texture created from code when it is no longer needed:

```javascript
texture.destroy();
```

## Related pages

- [Render Targets](./advanced-rendering/render-targets.md) - rendering into textures.
- [Linear Workflow](./linear-workflow/index.md) and [sRGB texture handling](./linear-workflow/textures.md) - color spaces of textures.
- [HDR Rendering](./linear-workflow/hdr-rendering.md) - HDR formats and rendering.
- [Texture Compression](../optimization/texture-compression.md) - compressed texture formats.
- [Shaders](./shaders/index.md) - writing custom shaders sampling textures.
- [MiniStats](../optimization/mini-stats.md) and the [Inspector](../scripting/debugging/inspector.md) - observing the memory used by textures.
