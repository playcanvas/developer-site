---
title: Using Texture Packers
---

## What is texture packing?

It's common to find sprites or UI images bundled as separate images. Texture packing is combining those separate images into a single [texture atlas][texture-atlas].

This has several advantages including:

- Faster loading times as it's a single network request instead of many.
- As it's a single texture, the sprites can be batched into a single draw call.

## Tools

Here are some texture packing tools that are compatible with PlayCanvas.

### TexturePacker Online (free)

([Website][texture-packer-online])

A free browser tool that is able to do the basics of texture packing.

![](/img/user-manual/2D/texture-packer/texture-packer-online-steps.png)

1. Clear the texture atlas.
2. Add your sprites/UI images.
3. Data format should be kept as JSON hash.
4. Download .png for the texture atlas.
5. Download .json for the frame data.

### Texture Packer tool

([Website][texture-packer-tool])

TexturePacker is a paid tool for download that has many more features and options for creating texture atlases. These include more control over the layout of the sprites/UI images and being able to set up [9 slicing][9-slicing].

![](/img/user-manual/2D/texture-packer/texture-packer-tool-steps.png)

Basic steps:

1. Add your sprites/UI images.
2. Set Output files -> Framework as PlayCanvas.
3. Click on Publish sprite sheet to create the texture atlas and JSON frame data.

## Creating frames in Sprite Editor

Once you have uploaded the texture atlas file into the Editor and created a [texture atlas asset][texture-atlas], open the Sprite Editor.

![](/img/user-manual/2D/texture-packer/playcanvas-sprite-editor.png)

Click on 'Upload Texture Packer JSON' and select the JSON frame data file to upload.

This will create frames in the texture atlas that you can create sprite assets from.

When updating the texture atlas later in development, as long as the sprite filenames and frame names remain the same, the following will happen when uploading the new frame data:

- Sprites that have been removed on the atlas will have their frames removed.
- Sprites that have been added on the atlas will have new frames added to the end of the list.
- Existing sprites will have their frames updated.

[texture-atlas]: /user-manual/editor/assets/inspectors/texture-atlas/
[texture-packer-online]: https://www.codeandweb.com/tp-online
[texture-packer-tool]: https://www.codeandweb.com/texturepacker
[9-slicing]: /user-manual/2D/slicing/
