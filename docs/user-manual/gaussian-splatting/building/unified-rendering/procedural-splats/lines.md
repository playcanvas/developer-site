---
title: Lines and Shapes
---

The `GsplatLines` script renders line-based debug primitives using Gaussian splats. It supports lines, arrows, and axis-aligned bounding boxes (AABBs), making it useful for CAD-style visualizations and debugging.

:::info Beta Feature

GsplatLines is currently in beta. If you encounter any issues, please report them on the [PlayCanvas Engine GitHub repository](https://github.com/playcanvas/engine/issues).

:::

:::note

This feature requires [unified rendering](/user-manual/gaussian-splatting/building/unified-rendering/) mode.

:::

## Overview

`GsplatLines` is a Script component that:

- Creates splat-based lines, arrows, and wireframe boxes
- Supports gradient colors along lines
- Uses a handle system for adding/removing primitives
- Automatically rebuilds when primitives change

## Basic Usage

```javascript
// Import the script
const { GsplatLines } = await import('path/to/gsplat-lines.mjs');

// Add script component to an entity
entity.addComponent('script');
const lines = entity.script.create(GsplatLines);

// Add primitives
const lineHandle = lines.addLine(
    new pc.Vec3(0, 0, 0),
    new pc.Vec3(1, 1, 1),
    new pc.Color(1, 0, 0),  // Start color (red)
    new pc.Color(0, 0, 1),  // End color (blue)
    0.05                     // Thickness
);

// Remove later if needed
lines.removePrimitive(lineHandle);
```

## API

### addLine(start, end, startColor, endColor, thickness)

Adds a line with gradient color from start to end.

```javascript
const handle = lines.addLine(
    new pc.Vec3(0, 0, 0),
    new pc.Vec3(1, 0, 0),
    new pc.Color(1, 0, 0),
    new pc.Color(0, 1, 0),
    0.02
);
```

### addLineSimple(start, end, color, thickness)

Adds a line with a single color.

```javascript
const handle = lines.addLineSimple(
    new pc.Vec3(0, 0, 0),
    new pc.Vec3(1, 0, 0),
    new pc.Color(1, 1, 0),
    0.02
);
```

### addArrow(start, end, color, thickness, headSize?)

Adds an arrow with a pyramid-shaped head.

```javascript
const handle = lines.addArrow(
    new pc.Vec3(0, 0, 0),
    new pc.Vec3(0, 1, 0),
    new pc.Color(0, 1, 0),
    0.02,
    0.1  // Optional head size (default: thickness * 9)
);
```

### addAABB(min, max, color, thickness)

Adds an axis-aligned bounding box as a wireframe.

```javascript
const handle = lines.addAABB(
    new pc.Vec3(-1, -1, -1),
    new pc.Vec3(1, 1, 1),
    new pc.Color(1, 1, 0),
    0.01
);
```

### removePrimitive(handle)

Removes a primitive by its handle.

```javascript
const removed = lines.removePrimitive(handle);  // Returns true if found
```

### clear()

Removes all primitives.

```javascript
lines.clear();
```

### primitiveCount (read-only)

Returns the number of primitives.

```javascript
console.log(`${lines.primitiveCount} primitives`);
```

## How It Works

Lines are rendered as a series of splats placed along the line path:

- Splat count is based on line length and thickness
- Splats are evenly distributed along the line
- Color is interpolated from start to end
- Arrows use 5 lines (main shaft + 4 pyramid edges)
- AABBs use 12 lines (one per edge)

## Use Cases

- **CAD-style annotations**: Dimension lines, measurement arrows
- **Debug visualization**: Bounding boxes, direction indicators
- **Scene decoration**: Wireframe overlays, guides

## Live Example

See the [Procedural Shapes example](https://playcanvas.github.io/#/gaussian-splatting/procedural-shapes) which demonstrates CAD-style dimension annotations on a Gaussian splat scene.

## Script Location

The script is available in the PlayCanvas Engine repository:

```text
scripts/esm/gsplat/gsplat-lines.mjs
```

## See Also

- [Procedural Splats](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/)
- [Mesh to Splats](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/mesh)
- [Image to Splats](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/image)
- [Text to Splats](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/text)
