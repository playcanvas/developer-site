---
title: Your First App
description: Build and publish a small physics game in the PlayCanvas Editor - knock down a pyramid of cans with a ball you roll using the arrow keys - and learn entities, materials, physics, scripting, Live Link and publishing along the way.
---

import StepVideo from '@site/src/components/StepVideo';

In the next 15 minutes you'll build **Can Knockdown**, a tiny physics game where you roll a ball into a pyramid of cans. Then you'll publish it to the web with a link you can send to anyone. You don't need to install anything, and you'll write about 20 lines of code.

This is the finished game. Click it, then use the arrow keys to roll the ball:

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/gLOk3TQH/" title="Can Knockdown, the game you build in this guide" loading="lazy" allow="fullscreen" allowFullScreen></iframe>
</div>

Along the way you'll use the core ideas that every PlayCanvas app is built from:

- **Entities and components** to make objects and give them a shape, physics or behavior.
- **Materials** to color them.
- **Physics** so they fall, stack and scatter.
- **A script** to read the keyboard.
- **Live Link** to tweak the running game from the Editor.
- **Publishing** to put the game online.

Each step has a short video of exactly what to do. The videos play as you scroll to them, so keep the Editor open in another tab and follow along.

:::info[Before you start]

You need a free [PlayCanvas account](https://login.playcanvas.com/signup) and a desktop browser. The game is played with the arrow keys, so a keyboard helps too.

:::

## 1. Create a Project {#create-a-project}

Every app lives in a project. Start a new one:

1. Go to your [Projects dashboard](https://playcanvas.com/editor) and select **New project**.
2. Pick the **Blank Project** starter kit.
3. Name it `My First App` and select **Create project**.
4. When it's ready, select **Open project**. The Editor opens in a new tab.

<StepVideo src="/video/editor-first-app-create-project.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/create-project.webp" label="Creating a project from the Blank Project starter kit on the Projects dashboard" />

## 2. Find Your Way Around {#find-your-way-around}

The Blank Project starts you with a small scene: a **Camera**, a **Light**, a **Box** and a **Plane** for the floor. Here's where everything lives:

![The PlayCanvas Editor with its five main areas numbered](/img/user-manual/editor/getting-started/your-first-app/editor-interface.webp)

1. **[Hierarchy](/user-manual/editor/interface/hierarchy/)**: every entity in the scene, as a tree. Click one to select it.
2. **[Viewport](/user-manual/editor/interface/viewport/)**: your 3D view of the scene.
3. **[Inspector](/user-manual/editor/interface/inspector/)**: the properties of whatever is selected. This is where you'll do most of your editing.
4. **[Assets](/user-manual/editor/assets/asset-panel/)**: the files your project uses, such as materials, scripts, textures and models.
5. **[Toolbar](/user-manual/editor/interface/toolbar/)**: tools for moving, rotating and scaling, plus publishing.

Now take the Viewport for a spin. Drag with the left mouse button to orbit, and scroll to zoom. Select **Box** in the Hierarchy, move the mouse back over the Viewport and press <kbd>F</kbd> to focus on it. That's your way home whenever you get lost.

<StepVideo src="/video/editor-first-app-navigate.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/navigate.webp" label="Orbiting and zooming the Viewport, then pressing F to focus on the Box" />

:::tip

<kbd>Shift</kbd>-drag to pan. The [Controls and Keyboard Shortcuts](/user-manual/editor/interface/keyboard-shortcuts/) page lists everything else.

:::

## 3. Make a Can {#make-a-can}

An **entity** is an empty object. **Components** give it everything else. The Box is an entity with a **Render** component, which draws a shape. Turn it into a can:

1. Select **Box** in the Hierarchy.
2. In the Inspector, change **Name** to `Can`.
3. In the **RENDER** component, change **Type** from **Box** to **Cylinder**.

It's a can, but a plain white one. Colors and shine come from a **material**:

1. In the Assets panel, select **+** and choose **Material**.
2. Select the new material in the Assets panel and rename it `Can` in the Inspector.
3. Open the **DIFFUSE** section, click the **Color** swatch and enter `E52521`.
4. Open the **SPECULAR** section and set **Metalness** to `0.6` and **Glossiness** to `80`.
5. Drag the material from the Assets panel onto the can in the Viewport.

<StepVideo src="/video/editor-first-app-can.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/can.webp" label="Changing the Box into a red metallic Can with a new material" />

## 4. Add Physics {#add-physics}

Right now the can is just a picture of a can. Two physics components make it a real object that falls, collides and gets knocked over:

- A **Rigid Body** gives it mass and lets the physics engine move it.
- A **Collision** component gives it a shape for the physics engine to use. This is separate from the visible shape.

Select the **Can** and add both:

1. Select **ADD COMPONENT** and choose **Physics** > **Rigid Body**. Set its **Type** to **Dynamic**, so the can can move.
2. Select **ADD COMPONENT** again and choose **Physics** > **Collision**. Set its **Type** to **Cylinder** and its **Height** to `1`, so it matches the can.
3. A red **Ammo module not found** notice appears. Select **IMPORT AMMO** to add the physics engine to your project.

Without physics on the floor, the can would fall straight through it. Select the **Plane** and give it the same two components:

1. Add a **Rigid Body** and leave its **Type** as **Static**. A static body never moves, but other bodies collide with it.
2. Add a **Collision** component and leave it as a **Box**. Set **Half Extents** to `4`, `0.5`, `4` and **Position Offset** to `0`, `-0.5`, `0`.

<StepVideo src="/video/editor-first-app-physics.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/physics.webp" label="Adding Rigid Body and Collision components to the Can and the Plane, and importing Ammo" />

:::note[Why those numbers?]

[Collision shapes ignore the entity's **Scale**](/user-manual/physics/collision-shapes/#scale). The Plane is scaled to 8 × 8, so a box that reaches 4 out from the center in each direction covers it. The offset moves that box down by half its height, so its top sits level with the floor.

:::

## 5. Drop Test {#drop-test}

Time to see physics in action. Select the **Can** and drag the green arrow up to lift it into the air. Then select **Launch** (the ▶ button at the top right of the Viewport). Your scene opens in a new tab and runs, and the can drops onto the floor.

<StepVideo src="/video/editor-first-app-drop-test.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/drop-test.webp" label="Lifting the Can above the floor and launching the scene to watch it fall" />

Switch back to the Editor tab and press <kbd>Ctrl</kbd>+<kbd>Z</kbd> (<kbd>Cmd</kbd>+<kbd>Z</kbd> on macOS) to put the can back on the floor. Everything you do in the Editor can be undone.

## 6. Stack the Pyramid {#stack-the-pyramid}

One can isn't much of a target. A duplicate copies an entity with all its components, so every copy is already red and ready for physics:

1. With the **Can** selected, select the **Duplicate** button at the top of the Hierarchy, or press <kbd>Ctrl</kbd>+<kbd>D</kbd> (<kbd>Cmd</kbd>+<kbd>D</kbd> on macOS).
2. Set the new can's **Position** from the table below.
3. Repeat until you have all six cans.

| Can | Position X | Position Y |
| --- | --- | --- |
| Bottom row | `-1`, `0`, `1` | `0.5` |
| Middle row | `-0.5`, `0.5` | `1.5` |
| Top | `0` | `2.5` |

Position Z stays `0` for every can.

<StepVideo src="/video/editor-first-app-pyramid.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/pyramid.webp" label="Duplicating the Can five times and positioning the copies into a pyramid" />

## 7. Make the Ball {#make-the-ball}

The ball is just another can, reshaped. Duplicate it so it keeps the physics components:

1. With a can selected, duplicate it and rename the copy `Ball`.
2. Set its **Position** to `0`, `0.5`, `3`, which puts it in front of the pyramid.
3. In **RENDER**, set **Type** to **Sphere**. In **COLLISION**, set **Type** to **Sphere**.
4. Create another material and name it `Ball`. Set its **DIFFUSE** **Color** to `1F8FFF` and its **SPECULAR** **Glossiness** to `80`, then drag it onto the ball.

<StepVideo src="/video/editor-first-app-ball.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/ball.webp" label="Duplicating a can into a blue Ball with a sphere shape and its own material" />

## 8. Frame the Shot {#frame-the-shot}

The **Camera** decides what the player sees. Select it in the Hierarchy and a live preview of its view appears in the corner of the Viewport. Point it down the length of the floor:

1. Set **Position** to `0`, `4`, `9`.
2. Set **Rotation** to `-20`, `0`, `0`.

<StepVideo src="/video/editor-first-app-camera.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/camera.webp" label="Positioning the Camera and watching its preview update" />

## 9. Script the Controls {#script-the-controls}

Components do a lot, but behavior that's specific to your game comes from **scripts**. This one pushes the ball when you press the arrow keys.

1. Select the **Ball** and choose **ADD COMPONENT** > **Script**.
2. In the **+ ADD SCRIPT** field, type `roll.mjs` and press <kbd>Enter</kbd>. The `.mjs` extension creates an [ESM script](/user-manual/scripting/esm-scripts/), the modern kind of script built on JavaScript modules (ECMAScript modules, or ESM). The script is attached to the ball and appears in the Assets panel.
3. Select the **Edit** (pencil) button on the **roll** script. The Code Editor opens in a new tab.
4. Replace everything in the file with the code below, then press <kbd>Ctrl</kbd>+<kbd>S</kbd> (<kbd>Cmd</kbd>+<kbd>S</kbd> on macOS) to save.
5. Back in the Editor, select the **Parse** button (the two arrows next to **Edit**). A **power** field appears under the script.

```javascript
import { Script, KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN } from 'playcanvas';

export class Roll extends Script {
    static scriptName = 'roll';

    /**
     * How hard the arrow keys push the ball.
     *
     * @attribute
     */
    power = 15;

    update(dt) {
        const keyboard = this.app.keyboard;

        // Which way are the arrow keys pointing?
        let x = 0;
        let z = 0;
        if (keyboard.isPressed(KEY_LEFT)) x -= 1;
        if (keyboard.isPressed(KEY_RIGHT)) x += 1;
        if (keyboard.isPressed(KEY_UP)) z -= 1;
        if (keyboard.isPressed(KEY_DOWN)) z += 1;

        // Push the ball while a key is held. Physics does the rest.
        this.entity.rigidbody.applyForce(x * this.power, 0, z * this.power);
    }
}
```

<StepVideo src="/video/editor-first-app-script.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/script.webp" label="Adding the roll script to the Ball, pasting the code in the Code Editor and parsing it" />

Here's what the script does:

- `update` runs once every frame, about 60 times a second.
- `keyboard.isPressed` checks whether a key is held down right now. Up moves away from the camera, which is the negative Z direction.
- `applyForce` pushes the ball's rigid body. You never move the ball yourself: the physics engine works out the rolling, the bouncing and every can it hits.
- The `@attribute` comment turns `power` into an editable field in the Inspector. That's why you parsed the script, and it means you can tune the game without touching the code.

## 10. Play {#play}

Select **Launch** again. Hold the up arrow to roll the ball, steer with left and right, and aim between two cans for the biggest crash.

<StepVideo src="/video/editor-first-app-play.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/play.webp" label="Playing the game: the ball rolls into the pyramid and the cans scatter" />

To play again, reload the tab.

:::tip[Not working?]

- **Nothing falls:** check that you selected **IMPORT AMMO**, and that the cans' Rigid Body **Type** is **Dynamic**.
- **The ball won't move:** click inside the game first so it has keyboard focus. Then check that the **power** field appears under the roll script. If it doesn't, select **Parse** again.
- **The cans fall through the floor:** check the Plane's Collision **Half Extents** and **Position Offset**.

:::

## 11. Tweak It Live {#tweak-it-live}

The Launch tab stays connected to the Editor through **Live Link**. Change something in the Editor and the running game updates at once, with no reload. Put the two windows side by side and try it:

- Select the **Settings** (gear) button at the top of the Viewport, open **PHYSICS** and set the **Gravity** Y value to `-1.5`. Now roll the ball: it's playing on the Moon.
- Select the **Ball** material and give it a new **Color**.
- Select the **Ball** and turn **power** up to `40`.

<StepVideo src="/video/editor-first-app-live-link.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/live-link.webp" label="The Editor and the running game side by side: lowering gravity and recoloring the ball update the game instantly" />

When you're done, set **Gravity** back to `-9.8`, or keep it. It's your game.

Live Link covers scene and asset changes. After you edit the code in a script, reload the Launch tab to run the new version.

## 12. Publish {#publish}

Last step: put your game on the web.

1. Select the **Publish / Download** button in the toolbar on the left.
2. Select **Publish**.
3. Your build gets your project's name as its title. Select **Publish** at the bottom of the form.

<StepVideo src="/video/editor-first-app-publish.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/publish.webp" label="Publishing a build and getting its playcanv.as link" />

A few seconds later your game is live, with a link like `https://playcanv.as/p/...`. The game at the top of this page was published exactly this way. Open it on your phone, send it to a friend, post it anywhere.

Your first build automatically becomes the project's **primary build**, which is what that link plays. When you publish again, you choose when the new build replaces it, so you can test a build before your players see it. See [PlayCanvas Hosting](/user-manual/editor/publishing/playcanvas-hosting/) to manage builds, or [Downloading a Build](/user-manual/editor/publishing/downloading/) to download a build and host it yourself.

## You Made a Game {#you-made-a-game}

In one sitting you've used the same building blocks as every PlayCanvas app: entities and components, materials, rigid bodies and collision, a script with an editable attribute, Live Link and publishing. Everything else builds on them.

### Make It Yours {#make-it-yours}

Some ideas for what to try next, roughly from easiest to hardest:

- **Build a harder level.** Stack a taller pyramid, or add walls with more static Box entities.
- **Change the look.** Try the other material sections, add more lights, or drop in a model from the [Asset Store](/user-manual/editor/assets/asset-store/).
- **Bring your own art.** [Import](/user-manual/editor/assets/importing/) your own models, textures and sounds.
- **Keep score.** Use [collision events](/user-manual/physics/collision-events/) to count hits, and show the score with a [text element](/user-manual/user-interface/).
- **Add a reset key.** Store each can's starting position in a script and put it back when <kbd>R</kbd> is pressed.

### Keep Learning {#keep-learning}

- [Scripting](/user-manual/scripting/): everything scripts can do.
- [Physics](/user-manual/physics/): forces, joints, triggers and ray casts.
- [The Editor interface](/user-manual/editor/interface/): every panel in depth.
- [Tutorials](/tutorials/): complete projects to explore and fork, such as the [Keepy Up](/tutorials/keepyup-part-one/) game.
