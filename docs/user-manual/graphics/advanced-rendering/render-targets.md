---
title: Render Targets
description: Render a scene into an offscreen texture instead of the screen, then use the result in your scene - covering creation, layer setup, orientation, formats, resizing and MSAA.
---

A [render target](https://api.playcanvas.com/engine/classes/RenderTarget.html) is a rectangular rendering surface you can render into instead of the screen. It wraps one or more renderable color textures, along with an optional depth (and stencil) buffer. Once a camera has rendered into it, the color texture holds the result and can be used anywhere a normal texture can - most commonly applied to a material to display it in the scene, or fed into further processing.

This underpins effects such as in-world screens, security monitors, mirrors and portals, reflection and refraction, and custom multi-pass pipelines.

## Creating a render target

First create the color [texture](https://api.playcanvas.com/engine/classes/Texture.html) to render into. It must use a renderable, uncompressed format (see [Choosing a format](#choosing-a-format) below):

```javascript
const texture = new pc.Texture(app.graphicsDevice, {
    name: 'RT-color',
    width: 512,
    height: 256,
    format: pc.PIXELFORMAT_SRGBA8,
    mipmaps: true,
    minFilter: pc.FILTER_LINEAR,
    magFilter: pc.FILTER_LINEAR,
    addressU: pc.ADDRESS_CLAMP_TO_EDGE,
    addressV: pc.ADDRESS_CLAMP_TO_EDGE
});
```

Then wrap it in a render target. Request a depth buffer if the scene you render needs depth testing, and set `samples` for hardware anti-aliasing (see [Anti-aliasing](#anti-aliasing)):

```javascript
const renderTarget = new pc.RenderTarget({
    name: 'RT',
    colorBuffer: texture,
    depth: true,
    origin: pc.RENDERTARGET_ORIGIN_TOP
});
```

The [`origin`](#orientation) option is explained below.

## Rendering the scene into it

Assign the render target to a camera's [`renderTarget`](https://api.playcanvas.com/engine/classes/CameraComponent.html#rendertarget) property. That camera then renders into the texture instead of the screen. Give it a negative `priority` so it renders before the main camera each frame, ensuring the texture is up to date when the main camera uses it:

```javascript
const textureCamera = new pc.Entity('TextureCamera');
textureCamera.addComponent('camera', {
    // rendered before the main camera (default priority 0)
    priority: -1,
    renderTarget
});
app.root.addChild(textureCamera);
```

A render target can also be filled by means other than a camera - for example a fullscreen shader pass or a compute shader - but rendering a scene with a camera is the most common case.

## Excluding the display surface with layers

When the render target's texture is displayed on an object within the same scene, that object must **not** be rendered into the render target itself - otherwise the surface would try to render the texture it is currently producing, feeding back on itself.

The clean way to arrange this is with [layers](../layers/index.md). A camera only renders the layers listed in its `layers` array, so placing the display object in a layer the texture camera does not list excludes it. The [render-to-texture example](#example) below uses three layers and two cameras:

- **World** - the scene content. Listed by both cameras, so it renders into the texture and to the screen.
- **Excluded** - the object that displays the texture (and anything else that should appear on screen only). Listed by the main camera only.
- **Skybox** - listed by both cameras.

```javascript
// a layer for objects that must not render into the texture
const excludedLayer = new pc.Layer({ name: 'Excluded' });
app.scene.layers.insert(excludedLayer, 1);

const worldLayer = app.scene.layers.getLayerByName('World');
const skyboxLayer = app.scene.layers.getLayerByName('Skybox');

// texture camera renders the scene, but NOT the Excluded layer
textureCamera.camera.layers = [worldLayer.id, skyboxLayer.id];

// main camera renders everything, including the display surface in the Excluded layer
mainCamera.camera.layers = [worldLayer.id, excludedLayer.id, skyboxLayer.id];
```

## Using the result

The render target's color texture is available as [`renderTarget.colorBuffer`](https://api.playcanvas.com/engine/classes/RenderTarget.html#colorbuffer) (it is the same texture you created). Apply it to a material like any other texture - for instance as the emissive map of the plane that acts as the display surface:

```javascript
const material = new pc.StandardMaterial();
material.emissiveMap = renderTarget.colorBuffer;
material.emissive = pc.Color.WHITE;
material.update();
```

## Orientation

WebGL2 and WebGPU natively store a rendered image with the opposite vertical row order. If you leave the orientation unspecified and then sample the render target as a regular texture (with mesh UVs), the result appears vertically mirrored between the two APIs. The `origin` option pins the stored orientation so the render target looks identical everywhere. It can be:

- [`RENDERTARGET_ORIGIN_TOP`](https://api.playcanvas.com/engine/variables/RENDERTARGET_ORIGIN_TOP.html) - row 0 is the top of the rendered image, on all graphics APIs, matching how image textures are stored. **Use this for any render target you sample as a regular texture** (a material map, or a cube map face). Recommended for most content - write the sampling code as if the texture were a loaded image.
- [`RENDERTARGET_ORIGIN_BOTTOM`](https://api.playcanvas.com/engine/variables/RENDERTARGET_ORIGIN_BOTTOM.html) - row 0 is the bottom of the rendered image, on all graphics APIs, replicating WebGL2's native layout. Use this to keep consuming code written against WebGL conventions working unchanged - shaders deriving UVs from projected (NDC) coordinates, or texture atlases addressing cells by viewport rectangles.
- [`RENDERTARGET_ORIGIN_NATIVE`](https://api.playcanvas.com/engine/variables/RENDERTARGET_ORIGIN_NATIVE.html) - the image is stored in the graphics API's native orientation, so the row order differs between WebGL2 and WebGPU. This is the default. It is only appropriate for orientation-agnostic consumers, such as screen-space sampling using coordinates derived from the fragment position.

In short: if you display a render target on a surface in your scene, use `RENDERTARGET_ORIGIN_TOP`.

## Choosing a format

The color texture must use a renderable, uncompressed format:

- **`PIXELFORMAT_RGBA8`** (or its sRGB variant `PIXELFORMAT_SRGBA8`) is the standard choice, renderable everywhere.
- **`PIXELFORMAT_RGB10A2`** offers 10 bits per RGB channel with 2-bit alpha - higher precision than `RGBA8` at the same memory cost, renderable on both WebGL2 and WebGPU.
- **HDR formats** (float `PIXELFORMAT_RGBA32F`, half-float `PIXELFORMAT_RGBA16F`, small-float `PIXELFORMAT_111110F`) are renderable subject to device support. Rather than picking one directly, query [`GraphicsDevice.getRenderableHdrFormat`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#getrenderablehdrformat), which returns the first supported option. Support varies: on WebGPU float and half-float are always renderable; on WebGL2 half-float is widely available (including many mobile iOS devices) while full float rendering requires [`GraphicsDevice.textureFloatRenderable`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#texturefloatrenderable).
- **`PIXELFORMAT_RGB9E5`** is a compact HDR format that can be sampled but **cannot** be used as a render target color buffer.

See the [`Texture`](https://api.playcanvas.com/engine/classes/Texture.html) API reference for the full list and the detailed HDR support rules.

For depth testing during rendering, request a depth buffer with `depth: true` when creating the render target (as shown above). Use `stencil: true` as well if you need a stencil buffer.

## Resizing

To change a render target's resolution - for example to keep it matched to the output size when the window resizes - call [`renderTarget.resize(width, height)`](https://api.playcanvas.com/engine/classes/RenderTarget.html#resize). This resizes the underlying color and depth buffers; their previous contents are not preserved.

## Anti-aliasing

Set `samples` greater than 1 to render the target with hardware multi-sample anti-aliasing (MSAA). The multi-sampled result is automatically resolved into the single-sampled color texture you created, which is the one you sample from:

```javascript
const renderTarget = new pc.RenderTarget({
    colorBuffer: texture,
    depth: true,
    origin: pc.RENDERTARGET_ORIGIN_TOP,
    samples: 4
});
```

For control over how the samples are resolved - or to read them individually in a shader - see [Explicit multisampled render targets](#explicit-multisampled-render-targets-and-custom-resolves) below.

## Explicit multisampled render targets and custom resolves

:::note

The features in this section require Engine 2.22 or later, and are WebGPU only.

:::

The automatic resolve above averages the samples with a fixed hardware "box" filter. Techniques that need a different resolve - a tonemapped color resolve, a min/max depth resolve, or reading the individual samples in a shader - create the multisampled textures explicitly (a [`Texture`](https://api.playcanvas.com/engine/classes/Texture.html) with `samples` greater than 1) and use them directly as the render target's buffers:

```javascript
// multisampled textures - the render target renders directly into their samples
const msColor = new pc.Texture(app.graphicsDevice, { width, height, format: pc.PIXELFORMAT_RGBA16F, samples: 4 });
const msDepth = new pc.Texture(app.graphicsDevice, { width, height, format: pc.PIXELFORMAT_DEPTH, samples: 4 });

// optional single-sampled resolve targets
const resolvedColor = new pc.Texture(app.graphicsDevice, { width, height, format: pc.PIXELFORMAT_RGBA16F, mipmaps: false });
const resolvedDepth = new pc.Texture(app.graphicsDevice, { width, height, format: pc.PIXELFORMAT_R32F, mipmaps: false });

const renderTarget = new pc.RenderTarget({
    colorBuffer: msColor,
    resolveBuffer: resolvedColor,       // hardware resolve at the end of a render pass
    depthBuffer: msDepth,
    depthResolveBuffer: resolvedDepth   // shader-based resolve, controlled by depthResolveMode
});
```

- **Color**: when a `resolveBuffer` is provided, the color samples are hardware-resolved into it at the end of a render pass, like the automatic path. When it is omitted, the samples are stored instead, and a later pass reads them individually with `textureLoad` on a `texture_multisampled_2d` - a custom resolve. This is also the only way to use MSAA with formats the hardware cannot resolve, such as integer formats. With multiple render targets, each attachment has its own optional resolve texture (`resolveBuffers`).
- **Depth**: depth has no hardware resolve on WebGPU. A multisampled `depthBuffer` can be read per sample as a `texture_depth_multisampled_2d`, or resolved into the `depthResolveBuffer` by an engine-provided shader whose operation is selected with [`depthResolveMode`](https://api.playcanvas.com/engine/classes/RenderTarget.html#depthresolvemode) - `DEPTHRESOLVE_MIN` (the default, selecting the nearest surface), `DEPTHRESOLVE_MAX` or `DEPTHRESOLVE_SAMPLE0`. The same mode also controls the depth resolve used by the scene depth map and by depth copies.

Two examples demonstrate these techniques - a custom tonemapped color resolve compared side by side against the hardware resolve, and per-sample depth fog compared against fog computed from a resolved depth:

<EngineExample id="graphics-advanced/custom-msaa-resolve" title="Custom MSAA Resolve" />

<EngineExample id="graphics-advanced/msaa-depth-fog" title="MSAA Depth Fog" />

## Cleaning up

A render target does not own its textures, so destroy them separately when you are done. Destroy the color texture (and depth buffer texture, if you created one explicitly), then the render target:

```javascript
renderTarget.colorBuffer.destroy();
renderTarget.destroy();
```

## Example

The following example renders a scene into a texture from a second camera and displays it on a plane in the world. It uses the three-layer setup described above to keep the display plane out of the render target, and switches the texture camera between perspective and orthographic projection every few seconds.

<EngineExample id="graphics/render-to-texture" title="Render to Texture" />

## Related pages

- [Multiple Render Targets](./multiple-render-targets.md) - render to several color buffers at once from a single pass.
- [Multiple Cameras](../cameras/multiple-cameras.md) - composing views and assigning render targets to cameras.
- [Layers](../layers/index.md) - controlling which objects each camera renders.
- [Post Effects](../posteffects/index.md) - built-in and custom post-processing built on render targets.
