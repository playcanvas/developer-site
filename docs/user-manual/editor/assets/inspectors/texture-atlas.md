---
title: Texture Atlas
---

![Texture Atlas](/img/user-manual/assets/texture-atlas/texture-atlas.jpg)

A Texture Atlas asset is a texture asset with additional data which describes 'Frames' inside the texture. Frames are regions defined in the texture as a rectangle with a 'pivot' point which sets the positional and rotational center of the frame.

Texture Atlases are created by right-clicking on a regular Texture Asset and selecting **Create Atlas**. Or by changing the default asset settings to enable [Create Atlases](/user-manual/editor/interface/settings/asset-import/)

The Texture Atlas is used in combination with the [Sprite Asset](/user-manual/editor/assets/inspectors/sprite) to render 2D graphics.

## Properties

### Frames

The Frames of a texture atlas are keyed by a unique value, usually an integer string. The format of a frame is:

```javascript
{
    rect: [0, 0, 0, 0],  // u,v,width,height - width and height in pixels
    pivot: [0, 0],       // x,y - as a proportion 0-1
    border: [0, 0, 0, 0] // left, bottom, right - top in pixels
}
```

### Texture Properties

In addition to frame data the Texture Atlas contains the properties as a [texture asset](/user-manual/editor/assets/inspectors/texture).
