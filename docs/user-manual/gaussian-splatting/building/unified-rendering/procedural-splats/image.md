---
title: Image to Splats
---

The `GsplatImage` script renders an image as Gaussian splats, with one splat per non-transparent pixel. This creates a unique visual effect where images appear as point-based representations.

:::info Beta Feature

GsplatImage is currently in beta. If you encounter any issues, please report them on the [PlayCanvas Engine GitHub repository](https://github.com/playcanvas/engine/issues).

:::

:::note

This feature requires [unified rendering](/user-manual/gaussian-splatting/building/unified-rendering/) mode.

:::

## Overview

`GsplatImage` is a Script component that:

- Takes a texture asset as input
- Creates one splat for each non-transparent pixel
- Displays the image on the XZ plane (Y=0)
- Sizes the image to fit in a 1x1 unit area

Use the entity's transform to scale and position the image in your scene.

## Basic Usage

```javascript
// Import the script
const { GsplatImage } = await import('path/to/gsplat-image.mjs');

// Add script component to an entity
entity.addComponent('script');
const imageSplat = entity.script.create(GsplatImage);
imageSplat.imageAsset = myTextureAsset;

// Position and scale using entity transform
entity.setLocalPosition(0, 0, 0);
entity.setLocalScale(2, 2, 2);  // 2x2 unit image
```

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `imageAsset` | Asset | The texture asset to display as splats |

## How It Works

1. The script reads pixel data from the texture
2. Transparent pixels (alpha = 0) are skipped
3. Each visible pixel becomes a splat with:
   - Position based on pixel coordinates (on XZ plane)
   - Color from the pixel's RGBA values
   - Size calculated to avoid gaps between splats

### Coordinate Mapping

The image is mapped to a 1x1 unit area on the XZ plane:

- **X axis**: Left to right (pixel x → world x)
- **Z axis**: Top to bottom (pixel y → world -z)
- **Y axis**: Always 0 (flat on the ground)

The image is centered at the origin, so coordinates range from -0.5 to +0.5.

## Automatic Updates

The script automatically rebuilds when the `imageAsset` changes. Simply assign a new texture asset and the splats will update.

```javascript
// Change the image at runtime
imageSplat.imageAsset = anotherTextureAsset;
```

## Performance Considerations

The number of splats equals the number of non-transparent pixels in the image. For a 512x512 fully opaque image, this creates ~262,000 splats.

**Tips:**

- Use smaller images for better performance
- Images with transparency reduce splat count
- Consider the visual effect vs. performance tradeoff

## Live Example

See the [Procedural Shapes example](https://playcanvas.github.io/#/gaussian-splatting/procedural-shapes) which demonstrates using `GsplatImage` to display textures as ground and wall decorations.

## Script Location

The script is available in the PlayCanvas Engine repository:

```text
scripts/esm/gsplat/gsplat-image.mjs
```

## See Also

- [Procedural Splats](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/)
- [Mesh to Splats](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/mesh)
- [Lines and Shapes](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/lines)
- [Text to Splats](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/text)
