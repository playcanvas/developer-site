---
title: Supported Formats
description: Complete list of file formats supported by PlayCanvas for 3D models, textures, audio, fonts, and other asset types.
---

PlayCanvas supports a wide variety of file formats for different asset types. This page lists the formats that can be used in your projects.

## 3D Models

| Format | Extension | Notes |
|--------|-----------|-------|
| glTF Binary | `.glb` | Recommended format. Efficient, widely supported |
| glTF | `.gltf` | JSON-based with external files |
| FBX | `.fbx` | Converted to GLB on import in Editor |
| COLLADA | `.dae` | Converted to GLB on import in Editor |
| OBJ | `.obj` | Basic mesh format, no animations |

:::tip

GLB is the recommended format for 3D models. It's compact, loads quickly, and supports all PlayCanvas features including animations, materials, and morph targets.

:::

## Textures

| Format | Extension | Notes |
|--------|-----------|-------|
| PNG | `.png` | Lossless, supports transparency |
| JPEG | `.jpg`, `.jpeg` | Lossy compression, no transparency |
| WebP | `.webp` | Modern format, good compression |
| AVIF | `.avif` | Next-gen format, excellent compression |
| GIF | `.gif` | Converted to PNG/JPG on import |
| TGA | `.tga` | Converted to PNG/JPG on import |
| BMP | `.bmp` | Converted to PNG/JPG on import |
| TIFF | `.tif`, `.tiff` | Converted to PNG/JPG on import |
| HDR | `.hdr` | High dynamic range, for environment maps |
| EXR | `.exr` | High dynamic range, converted to RGBM PNG |

### Texture Compression

For optimized delivery, textures can be compressed to GPU-native formats:

| Format | Platform | Notes |
|--------|----------|-------|
| Basis | All | Universal compressed format |
| DXT/BC | Desktop | Windows/Mac/Linux |
| PVRTC | iOS | Apple devices |
| ETC | Android | Most Android devices |
| ASTC | Modern mobile | iOS 8+, Android with ASTC support |

## Audio

| Format | Extension | Notes |
|--------|-----------|-------|
| MP3 | `.mp3` | Widely supported, good compression |
| OGG Vorbis | `.ogg` | Open format, good quality |
| WAV | `.wav` | Uncompressed, large files |
| M4A | `.m4a` | AAC audio |

:::note

For best browser compatibility, provide both MP3 and OGG versions of audio files. PlayCanvas will use the format supported by the user's browser.

:::

## Fonts

| Format | Extension | Notes |
|--------|-----------|-------|
| TrueType | `.ttf` | Converted to bitmap font on import |
| WOFF | `.woff` | Web font format |

## Scripts

| Format | Extension | Notes |
|--------|-----------|-------|
| JavaScript | `.js` | Classic scripts |
| ES Module | `.mjs` | ESM scripts (recommended) |

## Data Files

| Format | Extension | Notes |
|--------|-----------|-------|
| JSON | `.json` | Structured data |
| Text | `.txt` | Plain text |
| CSV | `.csv` | Tabular data (as text) |
| XML | `.xml` | Markup data (as text) |
| HTML | `.html` | HTML documents |
| CSS | `.css` | Stylesheets |

## Shaders

| Format | Extension | Notes |
|--------|-----------|-------|
| GLSL | `.glsl` | OpenGL shading language |
| Vertex Shader | `.vert` | Vertex shader source |
| Fragment Shader | `.frag` | Fragment shader source |

## Other

| Format | Extension | Notes |
|--------|-----------|-------|
| WebAssembly | `.wasm` | Compiled binary modules |
| Binary | `.bin` | Raw binary data |
| PLY | `.ply` | 3D Gaussian Splat data |
| glTF Binary | `.glb` | 3D Gaussian Splat data using the [KHR_gaussian_splatting](/user-manual/gaussian-splatting/formats/glb) extension |
| SPZ | `.spz` | Compressed 3D Gaussian Splat data ([Niantic SPZ format](/user-manual/gaussian-splatting/formats/spz)), loaded via a parser script |

## Custom Formats

The lists above cover the engine's built-in loaders, but they are not fixed: at runtime, custom parsers can add support for new file formats — or override the built-in ones — for most asset types. See [Custom Asset Parsers](custom-parsers.md).

## See Also

- [Models](models/index.md) - Preparing 3D models for PlayCanvas
- [Asset Inspectors](/user-manual/editor/assets/inspectors/) - Configure asset properties in the Editor
- [Custom Asset Parsers](custom-parsers.md) - Load custom file formats at runtime
