---
title: Cubemap
---

Cubemaps are a special type of texture asset. They are formed from 6 texture assets where each texture represents the face of a cube. They typically have two uses:

1. A cubemap can define your scene's sky box. A sky box contains imagery of the distant visuals of your scene such as hills, mountains, the sky and so on.
2. A cubemap can add reflections to any material. Imagine a shiny, chrome ball bearing in your scene. The ball reflects the surrounding scene. For open environments, you would normally set the scene's sky box cubemap as the cubemap on a reflective object's materials.

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/xp7v1oFB/" title="Cubemap" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

## Importing Cubemap Textures

A cubemap is an asset that requires six texture assets as input. Therefore, in order to fully configure a new cubemap asset, you must first import 6 images into your project. To do this, simply drag 6 images from your file system into the Assets panel (or select the Asset panel's Upload option). Once uploaded and processed, the images will appear in the Assets panel where they are now ready to be assigned to a cubemap asset.

## Creating Cubemaps

You can create new cubemap assets directly from the PlayCanvas Editor interface. Use the Create Asset menu in the Asset panel.

![Cubemap Creation](/img/user-manual/assets/cubemaps/cubemap-create.png)

This creates a new cubemap Asset and opens up the Cubemap Editor on the right-hand side of the screen.

## Selecting Cubemaps

To select a cubemap in order to edit it, select it in the Asset Panel. The easiest way to do this is to select the cubemap filter to narrow down the options for selection. Cubemaps are identified by cross-shaped thumbnails:

![Cubemap Thumbnails](/img/user-manual/assets/cubemaps/cubemap-thumbnails.png)

When a cubemap is selected, it will be loaded into the Inspector panel on the right of the Editor.

## Cubemap Properties

Once you have a cubemap selected, you can edit its properties.

![Cubemap Properties](/img/user-manual/assets/cubemaps/cubemap-properties.png)

### Filtering

This setting determines how the pixels of the cubemaps are interpolated as they are magnified. Magnification is when the texel to screen pixel ratio is less than one. Linear gives the best results visually, followed by Nearest.

### Anisotropy

Anisotropy is a value between 1 and 16 that gives control over the quality of texture sampling as the camera's view vector becomes more closely aligned with the plane of a textured surface.

## Assigning Textures to Cubemaps

![Cubemap Preview](/img/user-manual/assets/cubemaps/cubemap-preview.png)

The cubemap Preview panel displays the six faces of a cubemap flattened into the shape of a cross. Imagine a cardboard box that has been unfolded to lay flat. To construct a cubemap, simply drag texture assets from the Assets panel to the face slots in the Preview panel. You can also select a cubemap face slot and then select a texture asset from the Assets panel.

Cubemap faces must be:

- Square (the same resolution in width and height)
- Power of two in dimension (1x1, 2x2, 4x4, 8x8, 16x16, 32x32 and so on)
- All faces must be the same resolution

To assist you, the Editor attempts to figure out how to auto-assign textures to faces intelligently. It does this when you drag the first face to a slot by trying to match commonly used naming conventions for cubemap faces, such as:

- negx, posx, negy, posy, negz, posz
- left, right, top|up, bottom|down, front|forward, back|backward
- 0-5|1-6

An example of a texture set that would match is:

- face_posx.jpg
- face_negx.jpg
- face_posy.jpg
- face_negy.jpg
- face_posz.jpg
- face_negz.jpg

## Image Based Lighting

This technique allows you to use Environment Map such as CubeMap in order to simulate physically based ambient light and reflection on materials. [Read more](/user-manual/graphics/physical-rendering/image-based-lighting/) on how it works and how to author CubeMaps for IBL.

## Assigning Cubemaps to Materials

The default Phong and Physical material types both have reflection properties. If you expand the Environment property section, you see the following:

![Cubemap Material](/img/user-manual/assets/cubemaps/cubemap-material.png)

You can click the Empty slot to select a cubemap or drag and drop a cubemap asset from the asset panel into the cubemap slot.

:::note

A Physical material will use the scene's skybox as a default environment map if it is assigned and prefiltered.

:::

## Converting Equirectangular or Octahedral HDRIs to Cubemaps

Environment textures often are in a equirectangular or Octahedral format ([Poly Haven](https://polyhaven.com/hdris) for example) and will need to be converted to cubemaps before they can be used in PlayCanvas.

This can be done via [PlayCanvas Texture Tool](https://playcanvas.com/texture-tool), available in the browser.

1. Download the HDR version of environment texture and press 'Add Files' button in PlayCanvas Texture Tool to load the file.
2. Select the loaded texture on the left.
3. Under 'Reproject' section, change the 'source' to the format of texture.
4. Change 'target' to 'cube'.
5. Change 'encoding' to the desired format:
    - 'rgbe' for exporting to 'HDR'
    - 'rgbm' for exporting to 'PNG'
6. Set the width to the desired size per face texture. 512 is a good balance between quality and file size.
7. Press 'Reproject' button to do the conversion to a cubemap.
8. Press 'Export to PNG' or 'Export to HDR' to download the 6 individual cubemap face textures that are ready to be uploaded to PlayCanvas.

![PlayCanvas Texture Tool](/img/user-manual/assets/cubemaps/playcanvas-texture-tool-convert.png)

Other tools that can also do this conversion include:

- Mateusz Wisniowski's [HDRI-to-CubeMap tool](https://matheowis.github.io/HDRI-to-CubeMap/) (browser)
- [cmftStudio](https://github.com/dariomanesku/cmftStudio) (desktop) with [guide](https://jamie-white.com/webgl/equirectangular-hdr-image-to-face-list/)
