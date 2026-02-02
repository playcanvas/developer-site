---
title: Text to Splats
---

The `GsplatText` script renders text as Gaussian splats, with one splat per non-transparent pixel. This creates text labels that integrate seamlessly with splat-based scenes.

:::info Beta Feature

GsplatText is currently in beta. If you encounter any issues, please report them on the [PlayCanvas Engine GitHub repository](https://github.com/playcanvas/engine/issues).

:::

:::note

This feature requires [unified rendering](/user-manual/gaussian-splatting/building/unified-rendering/) mode.

:::

## Overview

`GsplatText` is a Script component that:

- Renders text to a canvas using standard CSS fonts
- Creates one splat per visible pixel
- Displays text on the XZ plane (Y=0)
- Supports fill color, stroke, and custom fonts

Use the entity's transform to scale and position the text in your scene.

## Basic Usage

```javascript
// Import the script
const { GsplatText } = await import('path/to/gsplat-text.mjs');

// Add script component to an entity
entity.addComponent('script');
const textSplat = entity.script.create(GsplatText);

// Configure text
textSplat.text = 'Hello World';
textSplat.fontSize = 64;
textSplat.fillStyle = '#ffffff';

// Position and scale using entity transform
entity.setLocalPosition(0, 0, 0);
entity.setLocalScale(0.15, 0.15, 0.15);
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `text` | string | `''` | The text string to render |
| `fontSize` | number | `64` | Font size in pixels |
| `fontFamily` | string | `'sans-serif'` | CSS font family |
| `fillStyle` | string | `'#ffffff'` | Text fill color (CSS color string) |
| `strokeStyle` | string | `'rgba(0,0,0,0)'` | Stroke color (CSS color string) |
| `strokeWidth` | number | `0` | Stroke width in pixels |
| `padding` | number | `0` | Padding around text in pixels |

## Styling Examples

### Basic White Text

```javascript
textSplat.text = 'Score: 100';
textSplat.fontSize = 48;
textSplat.fillStyle = '#ffffff';
```

### Outlined Text

```javascript
textSplat.text = 'GAME OVER';
textSplat.fontSize = 72;
textSplat.fillStyle = '#ff0000';
textSplat.strokeStyle = '#000000';
textSplat.strokeWidth = 3;
```

### Custom Font

```javascript
textSplat.text = 'Fancy Text';
textSplat.fontFamily = 'Georgia, serif';
textSplat.fontSize = 56;
```

## Automatic Updates

The script automatically rebuilds when any attribute changes. Simply modify the properties and the splats update on the next frame.

```javascript
// Update text at runtime
textSplat.text = 'New Score: 200';
```

## Coordinate System

Like [GsplatImage](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/image), text is rendered on the XZ plane:

- **X axis**: Left to right
- **Z axis**: Top to bottom (text reads correctly when viewed from +Y)
- **Y axis**: Always 0

The text is sized to fit in a 1x1 unit area, scaled by the entity's transform.

## Performance Considerations

The number of splats depends on:

- Font size (larger = more pixels)
- Text length
- Stroke width (adds more pixels)

For labels with many characters or large font sizes, the splat count can be significant.

## Live Example

See the [Procedural Shapes example](https://playcanvas.github.io/#/gaussian-splatting/procedural-shapes) which demonstrates using `GsplatText` for dimension labels in a CAD-style visualization.

## Script Location

The script is available in the PlayCanvas Engine repository:

```
scripts/esm/gsplat/gsplat-text.mjs
```

## See Also

- [Procedural Splats](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/)
- [Mesh to Splats](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/mesh)
- [Image to Splats](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/image)
- [Lines and Shapes](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/lines)
