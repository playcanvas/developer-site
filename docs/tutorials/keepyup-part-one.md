---
title: "Making a Simple Game - Part 1: Setting Up the Scene"
description: Start building Keepy Up, a tap-to-play football game, in the PlayCanvas Editor. Fork the starter project, place the stadium and the ball, and set up the camera and light.
tags: [games]
kind: tutorial
topic: Games
thumb: /img/tutorials/keepyup-part-one/thumbnail.webp
---

In this six-part series you'll build **Keepy Up**, a small game where you tap a football to keep it in the air. Each part ends with something you can run, and by the end you'll have a finished game published to the web.

This is the finished game. Tap or click the ball to start:

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/qWhjnAAp/" title="Keepy Up, the game you build in this series" loading="lazy" allow="fullscreen" allowFullScreen></iframe>
</div>

The series covers:

1. **Setting up the scene** (this part): the project, the stadium, the ball, the camera and the light.
2. [Lighting and materials](/tutorials/keepyup-part-two/): a sky that lights the scene, shadows, and a shinier ball.
3. [Making the ball move](/tutorials/keepyup-part-three/): your first two scripts.
4. [Game flow and scoring](/tutorials/keepyup-part-four/): a game script and a score on screen.
5. [Menu and game over screens](/tutorials/keepyup-part-five/): the rest of the user interface.
6. [Sound, particles and publishing](/tutorials/keepyup-part-six/): the finishing touches, then putting the game online.

:::info[Before you start]

- You need a free [PlayCanvas account](https://login.playcanvas.com/signup) and a desktop browser.
- If you have never used the Editor, work through [Your First App](/user-manual/editor/getting-started/your-first-app/) first. It takes about 15 minutes and teaches the panels this series uses.
- You can look at the [finished project](https://playcanvas.com/project/1660780/overview/keepy-up) at any time to compare it with your own.

:::

## 1. Fork the Starter Project {#fork-the-starter-project}

The models, textures, sounds and font for the game are ready for you in a starter project. [Forking](/user-manual/editor/projects/creating/#fork-an-existing-project) it gives you your own copy to build on.

1. Open the [Keepy Up Starter](https://playcanvas.com/project/1660810/overview/keepy-up-starter) project and select **Fork**.
2. Name your copy `Keepy Up` and confirm.
3. Open your new project in the Editor.

The [Assets](/user-manual/editor/assets/asset-panel/) panel shows what you have to work with:

![The Assets panel of the starter project, with six folders](/img/tutorials/keepyup-part-one/assets.webp)

| Folder | Contents |
| --- | --- |
| **Models** | The football and the stadium |
| **Textures** | A sky image and a particle image |
| **UI** | A ring to draw around the ball |
| **Sounds** | A kick, a game over sound and a music loop |
| **Fonts** | The font for the score and the titles |
| **Scripts** | Empty. You'll write the scripts yourself |

The scene, called Game, holds only a Camera and a Light.

## 2. Sharpen the Picture {#sharpen-the-picture}

Phones and many laptops have screens with more than one physical pixel per CSS pixel. By default a PlayCanvas app ignores that and looks soft on them.

1. Select the cog icon at the bottom of the toolbar to open the project's **Settings** in the [Inspector](/user-manual/editor/interface/inspector/).
2. Expand **Rendering** and turn on **Device Pixel Ratio**.

A new project already fills the browser window and matches its resolution, so there is nothing else to change here.

## 3. Add the Stadium {#add-the-stadium}

When a model is imported, the Editor makes a [template](/user-manual/editor/templates/) for it: a ready-made Entity that you can drop into a scene.

1. In the Assets panel, open **Models** > **Stadium**.
2. Drag the `stadium` template into the [Hierarchy](/user-manual/editor/interface/hierarchy/) panel and drop it on **Root**.
3. With the new Entity selected, change its **Name** in the Inspector to `Stadium`.

Its **Position** should be `0`, `0`, `0`. The stadium is built so that its pitch is 7 units below that point, which puts the game's camera at about chest height.

![The Editor with the stadium selected in the Viewport](/img/tutorials/keepyup-part-one/scene.webp)

## 4. Add the Football {#add-the-football}

1. Open **Models** > **Football** and drag the `football` template onto **Root**.
2. Rename the Entity `Football`.
3. Set its **Position** to `0`, `0.7`, `0` and its **Scale** to `1.2`, `1.2`, `1.2`.

![The Inspector for the Football entity, with its position and scale set](/img/tutorials/keepyup-part-one/football.webp)

The panel at the top of the Inspector tells you that the Entity is an instance of a template, and counts the values you have changed as overrides. You can ignore it for this project.

## 5. Aim the Camera {#aim-the-camera}

The game is played side on, with the camera looking straight at the ball.

1. Select **Camera** in the Hierarchy.
2. Set its **Position** to `0`, `0`, `12.4` and its **Rotation** to `0`, `0`, `0`.
3. In the [Camera Component](/user-manual/editor/scenes/components/camera/), set **Field Of View** to `45`, **Near Clip** to `0.5` and **Far Clip** to `2000`.

![The Inspector for the Camera entity](/img/tutorials/keepyup-part-one/camera.webp)

**Near Clip** and **Far Clip** set the range of distances that the camera draws. This range covers the whole stadium with room to spare.

## 6. Turn the Light {#turn-the-light}

A directional light acts like the sun. Only its rotation matters, not its position.

1. Select **Light** in the Hierarchy.
2. Set its **Rotation** to `45`, `-40`, `0`, so that it shines from behind the camera and to its left.
3. In the [Light Component](/user-manual/editor/scenes/components/light/), set **Intensity** to `1.6`, and set **Color** to a slightly warm white such as `FFF7E6`.

![The Inspector for the Light entity](/img/tutorials/keepyup-part-one/light.webp)

## Check Your Progress {#check-your-progress}

Select **Launch** at the top right of the [Viewport](/user-manual/editor/interface/viewport/). Your game opens in a new tab and should look like this:

![The game at the end of Part 1: the ball in front of the stadium, with a black sky](/img/tutorials/keepyup-part-one/result.webp)

The ball hangs in front of the goal and nothing moves yet. The sky is black because the scene has no sky, and the ball looks flat because the only light on it comes from one direction.

You fix both in [Part 2: Lighting and Materials](/tutorials/keepyup-part-two/).
