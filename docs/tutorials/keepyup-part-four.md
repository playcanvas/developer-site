---
title: "Making a Simple Game - Part 4: Game Flow and Scoring"
description: Add a game script that keeps score using application events, and build the first piece of user interface for Keepy Up, a score drawn with a Screen and a Text Element.
tags: [games]
kind: tutorial
topic: Games
thumb: /img/tutorials/keepyup-part-four/thumbnail.webp
---

In [Part 3](/tutorials/keepyup-part-three/) you made a ball that can be kicked. In this part a game script counts the kicks, and you build your first piece of [user interface](/user-manual/user-interface/) to show the score.

:::info[Before you start]

You need the project you made in Parts 1 to 3. To compare your work, open the [finished project](https://playcanvas.com/project/1660780/overview/keepy-up).

:::

## 1. Write the Game Script {#write-the-game-script}

Create a script called `game.mjs` in the **Scripts** folder, with this code:

```javascript
import { Script } from 'playcanvas';

/**
 * Keeps the score and tells the rest of the game when a round starts and ends.
 */
export class Game extends Script {
    static scriptName = 'game';

    score = 0;

    playing = false;

    initialize() {
        this.app.on('ball:kicked', this.onBallKicked, this);
        this.app.on('ball:lost', this.onBallLost, this);

        this.on('destroy', () => {
            this.app.off('ball:kicked', this.onBallKicked, this);
            this.app.off('ball:lost', this.onBallLost, this);
        });
    }

    onBallKicked() {
        // The first kick starts a new round
        if (!this.playing) {
            this.playing = true;
            this.score = 0;
            this.app.fire('game:start');
        }

        this.score++;
        this.app.fire('game:score', this.score);
    }

    onBallLost() {
        this.playing = false;
        this.app.fire('game:over', this.score);
    }
}
```

Then select the **Game** entity and add the `game` script to its Script Component, below `input`. This script has no attributes, so there is nothing to parse.

### How the Game Script Works {#how-the-game-script-works}

The ball script fires `ball:kicked` and `ball:lost`. The game script listens for those two events with `this.app.on`, and fires three of its own:

| Event | Fired when | Carries |
| --- | --- | --- |
| `game:start` | The first kick of a round lands | |
| `game:score` | The score changes | The new score |
| `game:over` | The ball is lost | The final score |

Notice what is missing: the ball script never mentions the game script, and the game script never mentions the ball. Each one only announces what happened, and anything that cares can listen. This keeps scripts independent, and it lets you add the scoreboard, the menus and the sound later without changing a line of what you have written so far.

The handlers are removed again in the `destroy` handler. That matters whenever an Entity can be destroyed while the application keeps running.

## 2. Make the Font Ready {#make-the-font-ready}

Text is drawn with a [font asset](/user-manual/editor/assets/inspectors/font/). The starter project includes one, but the image of its characters has to be generated in your own project.

1. In the Assets panel, open **Fonts**. Two assets are called `LilitaOne-Regular.ttf`. Select the font, which has an **Aa** icon. The other one, with a dashed outline, is the file the font was made from.
2. In the Inspector, **JSON** and **Textures** under **Source Files** both read **Missing**. Scroll down to the **Font** section and select **REGENERATE FONT ASSETS**.

![The Source Files and Font sections of the Inspector for the font asset](/img/tutorials/keepyup-part-four/font.webp)

After a few seconds, **Source Files** names a new JSON asset and a new texture. The Editor adds them to the **Fonts** folder, beside the two they replace.

## 3. Add a Screen {#add-a-screen}

Every user interface starts with a [Screen](/user-manual/editor/scenes/components/screen/). It defines the area that the interface is laid out in.

1. Add an Entity to **Root** called `UI`. It only keeps the Hierarchy tidy.
2. With **UI** selected, select **+** (Add Entity) > **User Interface** > **2D Screen**. Name the new Entity `Score Screen`.
3. In its Screen Component, set **Ref Resolution** to `720` by `1280` and **Scale Blend** to `1`.

:::note

A new Entity is added inside the Entity that is selected, or to Root if nothing is selected. Clicking an Entity that is already selected deselects it, so check that the parent you want is highlighted in the Hierarchy before you add to it. If an Entity ends up in the wrong place, drag it onto its parent in the Hierarchy.

:::

![The Screen Component of the Score Screen entity, with the uiScore script below it](/img/tutorials/keepyup-part-four/screen.webp)

The reference resolution is the size you design the interface at. With a **Scale Blend** of `1`, the interface is scaled to fit the height of the window. The camera's view of the world also follows the window's height, so the interface and the ball stay lined up on any shape of screen.

## 4. Add the Score {#add-the-score}

1. With **Score Screen** selected, select **+** > **User Interface** > **Text Element**. Name the new Entity `Score`.
2. In its [Element Component](/user-manual/editor/scenes/components/element/), set **Preset** to **Top Anchor & Pivot**. The text now hangs from the top center of the screen.
3. Set the Entity's **Position** to `0`, `-50`, `0` to move it down from the edge.
4. Check that the **Font** slot shows `LilitaOne-Regular.ttf`. The Editor fills it in with the font you last selected. If the slot is empty, drag the font from the Assets panel onto it.
5. Set **Text** to `0`, and **Font Size** and **Line Height** to `150`.
6. To make the number stand out against the crowd, set **Outline Color** to `0F2440FF` and **Outline Thickness** to `0.5`. Then set **Shadow Color** to `08142899` and **Shadow Offset** to `0`, `-0.28`.

![The text settings in the Element Component of the Score entity, from Font to Shadow Offset](/img/tutorials/keepyup-part-four/score-element.webp)

These two colors have an alpha value, so their hex codes have eight digits. The last two digits are the alpha: `FF` is opaque and `99` is 60%. If you type only six digits, the alpha becomes 0 and the outline or the shadow is invisible.

Your Hierarchy should now look like this:

![The Hierarchy with UI, Score Screen and Score](/img/tutorials/keepyup-part-four/hierarchy.webp)

## 5. Write the Score Script {#write-the-score-script}

Create a script called `ui-score.mjs`:

```javascript
import { Entity, Script } from 'playcanvas';

/**
 * Shows the score while a round is being played.
 */
export class UiScore extends Script {
    static scriptName = 'uiScore';

    /**
     * The text element that displays the score.
     *
     * @attribute
     * @type {Entity}
     */
    label;

    initialize() {
        // Nothing to show until the first round starts
        this.label.enabled = false;

        this.app.on('game:start', this.onGameStart, this);
        this.app.on('game:score', this.onGameScore, this);

        this.on('destroy', () => {
            this.app.off('game:start', this.onGameStart, this);
            this.app.off('game:score', this.onGameScore, this);
        });
    }

    onGameStart() {
        this.label.enabled = true;
    }

    onGameScore(score) {
        this.label.element.text = String(score);
    }
}
```

1. Add a **Script** component to **Score Screen**, add the `uiScore` script and select its **Parse** button.
2. Drag the **Score** entity from the Hierarchy onto the script's `label` slot.

The script hides the number until the first round starts, then changes the element's `text` every time `game:score` fires.

The script is on the screen and not on the text itself for a reason: a script on a disabled Entity does not run, so the text could not switch itself back on.

## Check Your Progress {#check-your-progress}

**Launch** the game. The score appears with your first kick and counts up with each one after it. When you lose the ball, your score stays on screen until the next round starts from 1.

![The game at the end of Part 4: the ball in the air and a score of 1 at the top of the screen](/img/tutorials/keepyup-part-four/result.webp)

The game now has rules, but it does not explain itself. In [Part 5: Menu and Game Over Screens](/tutorials/keepyup-part-five/) you add a title and tell the player when a round is over.
