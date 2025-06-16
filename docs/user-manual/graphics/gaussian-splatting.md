---
title: 3D Gaussian Splatting
sidebar_position: 7
---

3D Gaussian Splatting is a relatively new technique for capturing and rendering photorealistic volumetric point clouds. Since the technique relies on photogrammetry, it is very quick, cheap and easy to generate high-quality rendered scenes.

<div className="iframe-container">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/Pe4Sx8t1Ud4" title="Templates Overview" allowfullscreen></iframe>
</div>

## Working with Gaussian Splats

### Creating Splats

Splats are stored in binary [PLY](https://en.wikipedia.org/wiki/PLY_(file_format)) files. There are a number of ways you can generate your own splats.

#### 1. Use a Capture App

Use a splat capture app such as [Polycam](https://poly.cam/) or [Luma](https://lumalabs.ai/). With Luma, export to 'Gaussian Splat' and extract the PLY file from the downloaded ZIP file. With Polycam, export to 'splat PLY'.

#### 2. Use the Inria Tools

Inria's [SIGGRAPH 2023 paper](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/) links to a toolset on [GitHub](https://github.com/graphdeco-inria/gaussian-splatting) that you can download and use to generate splats from a set of images. These tools are more complicated to set up and use but they do offer fine-grained control over the splat generation process.

### Editing Splats

Captured splats normally need to be edited to some degree. The generation process can often create splats in the wrong location (sometimes referred to as 'floaters') so it's useful to be able to remove these stray splats. It may also be desirable to isolate a particular object (such as a person) in a captured splat and completely remove the background.

![SuperSplat](/img/user-manual/graphics/gaussian-splatting/supersplat.png)

PlayCanvas provides a powerful 3D Gaussian Splat editor called [SuperSplat](https://superspl.at/editor). SuperSplat is open-sourced under an MIT license on [GitHub](https://github.com/playcanvas/supersplat).

### Importing Splats

To import your PLY splat file:

1. Drag it into the Editor's [Asset Panel](../../editor/interface/assets).
2. Drag the created [GSplat asset](../../assets/types/gsplat) into the [Viewport](../../editor/interface/viewport). This will auto-create an Entity in the Hierarchy with a [GSplat component](../../scenes/components/gsplat) with your GSplat asset assigned to it.

![Import Gaussian Splat](/img/user-manual/graphics/gaussian-splatting/import-gsplat.webp)

## Performance

Rendering splats can be expensive on both the CPU and GPU. Here are some strategies to achieve good performance:

- Be mindful of the number of Gaussians in your scene since every Gaussian is sorted on camera depth every frame. You can check the number contained within a particular GSplat asset by using the [Inspector](../../assets/types/gsplat/#asset-inspector). Use SuperSplat to trim unwanted Gaussians from your PLY files.
- Disable `Anti-Alias` in the Scene Settings. Anti-aliasing is GPU intensive and offers little benefit for rendering splats.
- Disable `Device Pixel Ratio` in the Scene Settings. This will reduce the overall number of pixels that the GPU has to process.

## Limitations

There are some limitations to keep in mind when working with splats:

1. Fog has no effect.
2. Dynamic lights have no effect.
3. [Image Based Lighting](../physical-rendering/image-based-lighting) has no effect.
