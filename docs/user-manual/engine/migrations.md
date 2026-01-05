---
title: Engine Migrations
---

The PlayCanvas Engine is continually evolving, and its updates occasionally introduce breaking changes that require users to adapt their scripts.

This guide provides an overview of all major breaking changes across releases, offering users a helpful resource for migrating their code to newer versions.

It’s advisable to use the debug version of the engine when troubleshooting issues, as it provides logs for deprecated messages, warnings, and errors related to incorrect usage.

## Migration from 2.4.0 to 2.5.0

### Breaking changes in 2.5.0

#### ShaderMaterial

`ShaderMaterial` previously streamlined gamma correction, tone mapping, and fog handling by automatically injecting the necessary code blocks into each fragment shader. This functionality has now been removed, making it the responsibility of individual shaders to include the relevant features manually.

If you encounter shader errors due to missing functions such as `gammaCorrectOutput`, `toneMap`, or `addFog`, ensure that you explicitly include the required functions in your shader. For more details, see [this update](https://github.com/playcanvas/engine/pull/7331).

## Migration from 1.75.0 to 2.4.0

The migration from major version 1 to major version 2 is a substantial update, introducing numerous breaking changes.

### Breaking changes

#### WebGL 1

Support for WebGL1 has been discontinued; the engine now exclusively supports WebGL2 and WebGPU (in beta). If your application relies on WebGL1, you will need to continue using version 1 of the engine.

#### AudioSourceComponent

The AudioSourceComponent, which was replaced by the SoundComponent some time ago, has now been completely removed.

#### Legacy Scripts

The legacy scripting system, deprecated since 2016 and maintained in a read-only state for several years, is now being removed entirely.

#### Deprecated functions

Numerous deprecated functions that provided backward compatibility have been removed. If your application displays deprecation warnings when using the debug version of Engine 1, these issues should be resolved before migrating to Engine 2. In Engine 2, deprecated warnings are no longer displayed, and the backward compatibility code has been eliminated.

#### Basic Material

The BasicMaterial has been removed. To achieve equivalent functionality, you can use a StandardMaterial with the emissive color or emissive map set as a replacement.

#### Shader Material

If you've received the error `Material class cannot be instantiated, use ShaderMaterial instead`, this indicates the need to modify your code to use [ShaderMaterial](/user-manual/graphics/shaders/) instead. Note that as the engine shaders now use [Linear Workflow](/user-manual/graphics/linear-workflow/), notice how `gammaCorrectOutput` is used to apply final gamma correction in the [fragment shader](/user-manual/graphics/shaders/#fragment-shader).

#### Rendering to a texture

When rendering to a texture, the deprecated method of configuring the RenderTarget on the Layer has been fully removed. The RenderTarget must now be set directly on the camera instead.

#### Engine rendering callbacks

The engine previously executed multiple callbacks per frame for camera and layer rendering. These have been replaced with an event-driven system that supports multiple subscribers. The new events are now emitted by the Scene class. For more details, refer to [this pull request](https://github.com/playcanvas/engine/pull/7156).

#### StandardMaterial tint flags

The tint options for StandardMaterial have been confusing and inconsistent, so we've removed the flags for Ambient, Diffuse and Emissive tint. Previously, these flags only affected certain cases, such as when a texture was applied. With this update, tint colors are now always applied. To disable tinting, set the color to a neutral value (the default tint colors used when creating a new material):

Here is the list of default colors per tint type:

* **Ambient**: `new Color(1, 1, 1)` (white)
* **Diffuse**: `new Color(1, 1, 1)` (white)
* **Emissive**: `new Color(0, 0, 0)` (black)

There is one somewhat confusing behavior to note. By default, the emissive tint is set to black to ensure the material doesn't emit any color. When you assign an emissive texture, it's important to set the emissive color to white; otherwise, the black tint will override the emissive contribution from the texture, resulting in no visible emission.

#### Black movie texture

If your movie texture appears black, check the warnings in the debug version of the engine. It likely indicates that the material’s tint emissive color is set to black, causing the movie to render as black. To fix this, change the emissive color to white.

#### Gamma-correction, tone-mapping and fog settings

Previously, the `gammaCorrection` and `toneMapping` settings were applied globally on the `Scene` and affected all cameras' rendering. Now, these settings are available directly on each camera, allowing for unique configurations and rendering for each individual camera.

Previously, fog settings were accessed directly on the `Scene`, such as `Scene.fog`, `Scene.fogColor`, and `Scene.fogEnd`. These settings have now been moved under the `Scene.fog` property, and can be set using `Scene.fog.type`, `Scene.fog.color`, `Scene.fog.end`, and similar properties.

For more details, refer to [this pull request](https://github.com/playcanvas/engine/pull/7101).

#### Gamma space textures

Textures that represent colors, such as Diffuse, Emissive, Specular, and Sheen, are typically stored in sRGB space to maintain color range and reduce banding. When used by the engine, these textures are converted from sRGB to linear space for accurate lighting calculations. Previously, this conversion was handled by shader math, which impacted performance. With the removal of WebGL1 support, we can now leverage hardware to perform this conversion efficiently at no extra cost. The only requirement is that the texture must be created using sRGB format:

* When loading a Texture asset that represents colors in sRGB space, it's important to specify an sRGB encoding. For details, see [this pull request](https://github.com/playcanvas/engine/pull/6739).
* When creating a Texture instance that represents color in sRGB space, it is essential to use an sRGB pixel format, such as `PIXELFORMAT_SRGBA8`.

#### Instancing

If your code includes customizations to the instancing section of the `transformVS` chunk, you’ll need to update it by moving these customizations to the `transformInstancingVS` chunk. Additionally, configure the material to specify which attributes are in use. For further details, refer to [this pull request](https://github.com/playcanvas/engine/pull/6867).

### Other changes

For detailed information on the changes, refer to the release notes for each individual engine version:

* [2.0.0](https://github.com/playcanvas/engine/releases/tag/v2.0.0)
* [2.1.0](https://github.com/playcanvas/engine/releases/tag/v2.1.0)
* [2.2.0](https://github.com/playcanvas/engine/releases/tag/v2.2.0)
* [2.3.0](https://github.com/playcanvas/engine/releases/tag/v2.3.0)
* [2.4.0](https://github.com/playcanvas/engine/releases/tag/v2.4.0)
