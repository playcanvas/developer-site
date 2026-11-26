---
title: Basic Materials
description: Create materials, assign them to meshes, and tune color and physical shading on primitives step by step.
tags: [materials,basics]
kind: tutorial
topic: Graphics
thumb: /img/tutorials/basic-materials/thumbnail.webp
---

Materials define the appearance of the surfaces of a 3D model. At its simplest, a material sets the color of a surface. At its most complex, it can simulate the surface of an ocean or the way that light passes through glass.

In this tutorial, you'll create a material, assign it to a box, change its color and then add textures to it. You can follow along in any scene. A new project created from the **Blank Project** kit is a good place to start.

## Step 1 - Add a box to your scene

In the [Hierarchy](/user-manual/editor/interface/hierarchy) panel, click the **+** (Add Entity) button and select **3D** > **Box**.

![The Add Entity menu with 3D > Box highlighted](/img/tutorials/basic-materials/add-box.webp)

This creates a new Entity called Box, with a [Render Component](/user-manual/editor/scenes/components/render) that draws the box. If your scene already has a box, as the Blank Project does, you can use that one instead.

## Step 2 - Create a material

In the [Assets](/user-manual/editor/assets/asset-panel) panel, click the **+** (Add Asset) button and select **Material**.

![The Add Asset menu with Material highlighted](/img/tutorials/basic-materials/add-material.webp)

A new material called New Material appears in the Assets panel. Select it to show its properties in the [Inspector](/user-manual/editor/interface/inspector), then change its **Name** to `Box Material`.

## Step 3 - Assign the material to the box

Until you give it a material, a new box is drawn with a plain default material. To assign your material, drag it from the Assets panel into the [Viewport](/user-manual/editor/interface/viewport) and drop it on the box.

You can also assign it in the Inspector. Select the box and find **Materials** at the bottom of its Render Component. Drag the material onto the **Material #0** slot, or click the pencil icon on the slot and then click the material in the Assets panel.

![The Materials property of the Render Component with Box Material assigned](/img/tutorials/basic-materials/assign-material.webp)

A new material is white, so the box doesn't look any different yet.

## Step 4 - Change the color of the material

Select Box Material in the Assets panel. In the Inspector, expand the **Diffuse** section and click the **Color** swatch to open the color picker. Pick a color, or type a hex value such as `2979FF`.

![The Diffuse section of the material with the color picker open, and the box turned blue](/img/tutorials/basic-materials/diffuse-color.webp)

The box updates in the Viewport as you edit the material. So would any other mesh that uses the same material.

## Bonus - Add textures to the material

Changing the color of the material is a good start, but you'll quickly want more detail than a flat color. That is where texture maps come in.

Download and save these two sample textures:

![Sample Diffuse Map](/img/tutorials/basic-materials/proto_orange.webp)

![Sample Normal Map](/img/tutorials/basic-materials/proto_gray_n.webp)

Then [upload them](/user-manual/editor/assets/importing) to your project by dragging the files into the Assets panel.

Once they're uploaded, assign them to texture slots on the material:

1. Select Box Material and expand the **Diffuse** section. Drag `proto_orange.png` from the Assets panel onto the empty **Diffuse** slot.
2. The diffuse **Color** tints the texture, so set it back to white (`FFFFFF`) to see the texture's own colors.
3. Expand the **Normals** section and drag `proto_gray_n.png` onto the empty **Normals** slot.

![The box with the diffuse and normal maps assigned](/img/tutorials/basic-materials/textured-box.webp)

A normal map stores surface directions and not colors, so it must not be treated as sRGB. Select `proto_gray_n.png` in the Assets panel and untick **sRGB** in the Inspector. Until you do, the Editor shows a warning in its Console.

![The Texture section of the Inspector with sRGB unticked](/img/tutorials/basic-materials/normal-map-srgb.webp)

Try changing **Offset** and **Tiling** in the material's **Texture Transform** section to change how the textures are wrapped around the box.

To learn more about setting up materials, see [Physical Materials](/user-manual/graphics/physical-rendering/physical-materials/) and the [Material Inspector](/user-manual/editor/assets/inspectors/material/) reference.
