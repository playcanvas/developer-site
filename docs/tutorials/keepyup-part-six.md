---
title: "Making a Simple Game - Part 6: Sound, Particles and Publishing"
description: Finish Keepy Up with a kick sound, music, a game over sound and a burst of particles, all driven by one script, then publish the game to the web.
tags: [games]
kind: tutorial
topic: Games
thumb: /img/tutorials/keepyup-part-six/thumbnail.webp
---

import StepVideo from '@site/src/components/StepVideo';

In [Part 5](/tutorials/keepyup-part-five/) you completed the game's screens. In this last part you add sound and a particle effect, and then you publish the game.

:::info[Before you start]

You need the project you made in Parts 1 to 5. To compare your work, open the [finished project](https://playcanvas.com/project/1660780/overview/keepy-up).

:::

## 1. Add the Sounds {#add-the-sounds}

A [Sound Component](/user-manual/editor/scenes/components/sound/) plays audio assets. Each sound it can play has a **slot**, and a script plays a slot by name.

1. Add an Entity to **Root** called `Effects`.
2. Select **ADD COMPONENT** > **Audio** > **Sound**.
3. Turn off **Positional**. Positional sounds get quieter with distance from the camera, which suits a sound in a 3D world but not music.
4. The component starts with one slot. Set it up as the first row of the table, then select **ADD SLOT** twice for the other two.

| Name | Asset | Settings |
| --- | --- | --- |
| `kick` | `kick.mp3` | **Overlap** on, so that quick kicks do not cut each other off |
| `music` | `music.mp3` | **Loop** on, **Volume** `0.6` |
| `gameOver` | `game-over.mp3` | |

The sounds are in the **Sounds** folder. Open it from the folder tree on the left of the Assets panel, so that **Effects** stays selected, and drag each sound onto **Asset** in its slot. Leave **Auto Play** off for all three: the script decides when each one plays.

![The Sound Component on the Effects entity, with its kick and music slots](/img/tutorials/keepyup-part-six/sound.webp)

To learn more about sound in PlayCanvas, see the [Audio](/user-manual/audio/) section.

## 2. Add a Particle Effect {#add-a-particle-effect}

A puff of dust where the ball is kicked makes each kick feel solid.

1. With **Effects** selected, select **+** (Add Entity) > **Particle System**. Name the new Entity `Impact`.
2. In its [Particle System Component](/user-manual/editor/scenes/components/particlesystem/), turn off **Auto Play** and **Loop**. The effect should play once, when the script asks.
3. Set **Particle Count** to `14`, **Lifetime** to `0.45`, and **Emission Rate** and **Emission Rate 2** to `0`. A rate of zero releases every particle at once.
4. Set **Emitter Shape** to **Sphere** and **Emitter Radius** to `0.25`.
5. Drag `puff.png` from the **Textures** folder onto the **Color Map** slot.
6. Leave **Lighting** and **Depth Write** turned off, which suits soft, see-through particles.

![The Particle System Component on the Impact entity, from Auto Play to Emitter Radius](/img/tutorials/keepyup-part-six/particles.webp)

The remaining settings, at the bottom of the component, are curves. A curve changes a value over each particle's life, from time `0`, when the particle appears, to time `1`, when it disappears. Every curve starts with a single key at time `0`.

Start with **Scale**, which makes each puff grow:

1. Select the **Scale** curve to open the curve editor.
2. Select the key at the left end of the line and set **Value** to `0.14`.
3. Click an empty part of the graph to add a second key. Set its **Time** to `1` and its **Value** to `0.45`.
4. Click outside the curve editor to close it.

Set **Opacity** in the same way, with a value of `0.85` at time `0` and `0` at time `1`, so that each puff fades away.

**Local Velocity** makes the particles fly outwards and slow down. It has a curve for each axis, and a second set of curves gives each particle a random direction:

1. Select the **Local Velocity** curve. The X, Y and Z curves lie on top of each other, so use the **X**, **Y** and **Z** buttons to hide the ones you are not working on.
2. Give the X curve and the Y curve the same two keys: `3.5` at time `0` and `0.6` at time `1`.
3. Turn on **Randomize**. A second X curve and a second Y curve appear, both flat at `0`. Give each of them the keys `-3.5` at time `0` and `-0.6` at time `1`.
4. Leave both Z curves at `0`.

![The curve editor with the finished Local Velocity curves](/img/tutorials/keepyup-part-six/curve-editor.webp)

Each particle now moves at a velocity somewhere between the two sets of curves. To remove a key that you added by mistake, right-click it.

Do not worry about matching these exactly. Once the script in the next step is in place, launch the game, kick the ball and adjust the effect until you like it.

## 3. Write the Effects Script {#write-the-effects-script}

Create a script called `effects.mjs`:

```javascript
import { Entity, Script } from 'playcanvas';

/**
 * Plays the sounds and the particle effect that go with what happens in the game.
 */
export class Effects extends Script {
    static scriptName = 'effects';

    /**
     * The particle system to play where the ball is kicked.
     *
     * @attribute
     * @type {Entity}
     */
    impact;

    initialize() {
        this.app.on('ball:kicked', this.onBallKicked, this);
        this.app.on('game:start', this.onGameStart, this);
        this.app.on('game:over', this.onGameOver, this);

        this.on('destroy', () => {
            this.app.off('ball:kicked', this.onBallKicked, this);
            this.app.off('game:start', this.onGameStart, this);
            this.app.off('game:over', this.onGameOver, this);
        });
    }

    onBallKicked(point) {
        this.entity.sound.play('kick');

        // Restart the particle effect at the point of the kick
        this.impact.setPosition(point);
        this.impact.particlesystem.reset();
        this.impact.particlesystem.play();
    }

    onGameStart() {
        this.entity.sound.play('music');
    }

    onGameOver() {
        this.entity.sound.stop('music');
        this.entity.sound.play('gameOver');
    }
}
```

1. Add a **Script** component to **Effects**, add the `effects` script and select its **Parse** button.
2. Drag the **Impact** entity onto the script's `impact` slot.

This is where the events from Parts 3 and 4 pay off. The script listens for `ball:kicked`, `game:start` and `game:over`, and none of the earlier scripts had to change. The `ball:kicked` event carries the point where the kick landed, so the script moves the particle effect there before restarting it.

Browsers do not let a page play sound until the player has interacted with it. That is not a problem here, because the first sound is triggered by the player's first tap.

## Check Your Progress {#check-your-progress}

**Launch** the game with your sound turned on. Each kick makes a thud and a puff of dust, the music starts with the round, and a whistle and a groan from the crowd tell you when it is over.

<StepVideo src="/video/keepyup-part-six.mp4" poster="/img/tutorials/keepyup-part-six/result.webp" label="The finished game: the menu, several kicks with a puff of dust on each, then the game over screen" />

## 4. Publish Your Game {#publish-your-game}

So far only you can play the game, from the Editor. [Publishing](/user-manual/editor/publishing/) makes a build that anyone can play from a link.

1. Select the **Publish / Download** button in the toolbar on the left of the Editor.
2. Select **Publish** to start a new build. The **Title** is filled in with the name of your project. The **Description** still describes the starter project, so write your own.
3. Scroll down to **Options** and leave **Concatenate Scripts** turned on. A build of a project with scripts like these needs it.
4. Select **Publish** at the bottom. After a few seconds the build appears under **Primary build**, with a link.

Open the link on your phone and try the game with your thumb.

## Where Next? {#where-next}

You have built and published a complete game. Along the way you used templates, image-based lighting, materials, scripts and their attributes, application events, user interface screens, sound and particles.

Some ideas for making the game your own:

- **Keep a best score.** Listen for `game:over` in a new script and save the highest score with the browser's [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
- **Make it harder.** Increase the ball's `gravity` a little with every point.
- **Change the look.** Recolor the ball, or build a different backdrop.

For more to learn, browse the other [tutorials](/tutorials/), or ask a question on the [forum](https://forum.playcanvas.com).
