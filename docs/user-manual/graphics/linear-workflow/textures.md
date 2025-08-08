---
title: Textures
---

### sRGB Texture Handling  

Textures that represent colors, such as Diffuse, Emissive, Specular, and Sheen, are typically stored in sRGB space to maintain color accuracy and reduce banding. When used by the engine, these textures are automatically converted from sRGB to linear space for correct lighting calculations. This conversion is performed by the GPU efficiently at no extra cost, provided that the texture is created using an sRGB format.  

#### **Specifying sRGB Encoding for Textures**  

When loading a texture asset that represents colors in sRGB space, it is important to specify sRGB encoding. The following example demonstrates how to create an asset with sRGB encoding:  

```javascript
new pc.Asset(
    'color',
    'texture',
    { url: 'heart.png' },
    { encoding: 'srgb' }
);
```

#### **Marking sRGB Textures in the Editor**  

When working in the Editor, ensure that the color texture is marked as **sRGB** in the inspector panel. This guarantees that the engine correctly interprets the texture as sRGB and applies the necessary conversion to linear space.

![sRGB](/img/user-manual/graphics/linear-workflow/srgb-editor.png)

#### **sRGB Procedural Textures / Render Targets**  

When creating a procedural texture or rendering to a texture that represents color and will be read by a shader, it is important to create it with an **sRGB format** to enable automatic conversion. When rendering to this texture, linear values are automatically converted to gamma space to prevent banding. Later, when the texture is used as a color texture, pixels are automatically converted back to linear space.  

The following example demonstrates how to create an sRGB render target texture:  

```javascript
const texture = new pc.Texture(app.graphicsDevice, {
    name: 'color-texture',
    width: 512,
    height: 512,
    format: pc.PIXELFORMAT_SRGBA8
});
```
