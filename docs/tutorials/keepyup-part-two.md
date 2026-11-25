---
title: "Making a Simple Game - Part 2: Lighting and Materials"
description: Give Keepy Up its finished look. Turn a sky image into image-based lighting, add shadows, set the camera's tone mapping and make the football's materials shine.
tags: [games]
kind: tutorial
topic: Games
thumb: /img/tutorials/keepyup-part-two/thumbnail.webp
---

In [Part 1](/tutorials/keepyup-part-one/) you placed the stadium and the ball. In this part you light them. One image of a sky will become both the background and a source of light from every direction, and the ball will get a glossy finish that shows it off.

:::info[Before you start]

You need the project you made in Part 1. To compare your work, open the [finished project](https://playcanvas.com/project/1660780/overview/keepy-up).

:::

## 1. Make a Cubemap from the Sky {#make-a-cubemap-from-the-sky}

The **Textures** folder holds `stadium-sky.png`, a panorama of a sky above a green field. PlayCanvas uses a sky like this as a [cubemap](/user-manual/editor/assets/inspectors/cubemap/): six square images that surround the scene.

1. In the Assets panel, open **Textures** and right-click `stadium-sky.png`.
2. Select **Create Cubemap**. The Editor adds six face textures and a cubemap called `stadium-sky_cubemap`.
3. Select the cubemap. At the bottom of the Inspector, under **Prefiltering**, select **PREFILTER CUBEMAP**. When it has finished, the button changes to **DELETE PREFILTERED DATA**.

![The Faces and Prefiltering sections of the Inspector for the cubemap](/img/tutorials/keepyup-part-two/cubemap.webp)

Prefiltering makes blurred copies of the sky. A rough surface reflects a blurred sky and a polished one reflects a sharp sky, so the engine needs both. This is called [image-based lighting](/user-manual/graphics/physical-rendering/image-based-lighting/).

## 2. Set the Skybox {#set-the-skybox}

1. Select the cog icon at the bottom of the toolbar to open **Settings**, and expand **Rendering**.
2. Drag `stadium-sky_cubemap` from the Assets panel onto the **Skybox** slot.

![The Skybox slot in the Rendering settings](/img/tutorials/keepyup-part-two/skybox.webp)

The Viewport now has a sky, and everything in the scene is lit by it: blue from above and green from below.

## 3. Choose the Tone Mapping {#choose-the-tone-mapping}

Tone mapping decides how the bright values in the rendered picture are fitted into the range a screen can show. It is a property of each camera.

1. Select **Camera**.
2. In the Camera Component, set **Tonemapping** to **Neutral**.

![The Tonemapping setting of the Camera Component](/img/tutorials/keepyup-part-two/tonemapping.webp)

**Neutral** keeps colors close to the ones you chose, which suits the bright, simple look of this game. Try the other options to see how each one changes the picture.

## 4. Cast Shadows {#cast-shadows}

A shadow on the pitch shows the player where the ball is.

1. Select **Light**.
2. In the Light Component, check that **Cast Shadows** is turned on. It already is for the Light in a new project.
3. Set **Resolution** to `2048 x 2048`, **Cascades** to `2` and **Distance** to `420`.
4. Set **Shadow Bias** to `0.3` and **Normal Offset Bias** to `0.2`.

![The shadow settings of the Light Component](/img/tutorials/keepyup-part-two/shadows.webp)

**Distance** is how far from the camera shadows are drawn. The stadium is large, so it has to be large too. **Cascades** splits that distance into ranges with a shadow map each, which keeps the ball's shadow sharp. The two bias values stop surfaces from shadowing themselves at this scale.

## 5. Polish the Ball {#polish-the-ball}

The football uses three [materials](/user-manual/graphics/physical-rendering/physical-materials/): `Ball Light` for the white panels, `Ball Dark` for the black ones and `Ball Seam` for the grooves between them. They are in **Models** > **Football**.

1. Select `Ball Light` and expand **Clearcoat** in the Inspector.
2. Set **Clear Coat Factor** to `0.4`. More settings appear below it.
3. Under **Clear Coat Gloss**, set **Glossiness** to `0.85`.
4. Do the same for `Ball Dark`.

![The Clearcoat section of the material Inspector](/img/tutorials/keepyup-part-two/clearcoat.webp)

Clear coat adds a thin glossy layer over the material, like varnish. The ball now picks up a reflection of the sky.

While you have a material open, look at its other sections:

- **Diffuse** sets the base color. Change the **Color** of `Ball Light` and `Ball Dark` to put the ball in your own team's colors.
- **Specular** holds **Metalness** and **Glossiness**, which decide how mirror-like the surface is.

The stadium's materials, in **Models** > **Stadium**, show three more techniques. `Crowd` takes its color from a texture in its **Diffuse** slot. `Boards` also has its texture in the **Emissive** slot, so the advertising boards glow like screens. In its **Opacity** section, `Net` has an **Intensity** below 1 and a **Blend Type** of **Alpha**, which makes the goal net see-through.

## Check Your Progress {#check-your-progress}

**Launch** the game again:

![The game at the end of Part 2: the lit stadium under a blue sky](/img/tutorials/keepyup-part-two/result.webp)

The scene has its finished look, but it is still a picture. In [Part 3: Making the Ball Move](/tutorials/keepyup-part-three/) you write the scripts that turn it into something you can play.
