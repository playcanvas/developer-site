---
title: "Making a Simple Game - Part 5: Menu and Game Over Screens"
description: Build the title screen and the game over screen for Keepy Up from Text, Image and Group elements, and show and hide them with two short scripts.
tags: [games]
kind: tutorial
topic: Games
thumb: /img/tutorials/keepyup-part-five/thumbnail.webp
---

In [Part 4](/tutorials/keepyup-part-four/) you built a score from a Screen and a Text Element. In this part you use the same pieces, plus an image, to make a title screen and a game over screen.

:::info[Before you start]

You need the project you made in Parts 1 to 4. To compare your work, open the [finished project](https://playcanvas.com/project/1660780/overview/keepy-up).

:::

## 1. Build the Menu Screen {#build-the-menu-screen}

The menu is a title, a ring around the ball and a line telling the player what to do.

1. Select **UI**, then **+** (Add Entity) > **User Interface** > **2D Screen**. Name it `Menu Screen`, and set **Ref Resolution** to `720` by `1280` and **Scale Blend** to `1`, as you did for the score.
2. Add four elements to **Menu Screen** from the **User Interface** menu, and set them up as in the table. Select **Menu Screen** again before you add each one, because a new element is added inside whatever is selected.

| Name | Type | Position | Settings |
| --- | --- | --- | --- |
| `Title Keepy` | Text | `0`, `455`, `0` | **Text** `KEEPY`, **Font Size** and **Line Height** `150` |
| `Title Up` | Text | `0`, `317`, `0` | **Text** `UP`, **Font Size** and **Line Height** `150`, **Color** `FFD13D` |
| `Ring` | Image | `0`, `87`, `0` | **Texture** `ring.png` from the **UI** folder, then **Width** and **Height** `264` |
| `Prompt` | Text | `0`, `-147`, `0` | **Text** `TAP THE BALL`, **Font Size** and **Line Height** `54` |

Give each of the three text elements the font, outline and shadow that you gave the score in Part 4. Set the ring's texture before its size, because the Editor resizes an Image Element to fit a new texture.

:::tip

To save time, select the `Score` entity and duplicate it with <kbd>Ctrl</kbd>+<kbd>D</kbd> (<kbd>Cmd</kbd>+<kbd>D</kbd> on a Mac). The copy appears below the original, with the same name. Drag it onto **Menu Screen**, set its **Preset** to **Center Anchor & Pivot**, and it already has the right font, outline and shadow.

:::

:::note

To open the **UI** folder without losing your selection, select it in the folder tree on the left of the Assets panel. Double-clicking a folder in the main part of the panel changes the selection, so the Inspector no longer shows the element you were working on.

:::

Positions are measured from the middle of the screen, because these elements are anchored to its center. The ring sits at `87` because that is where the ball's starting place, 0.7 units above the camera's height, lands on a screen 1280 units tall.

![The Hierarchy with the four elements of the Menu Screen](/img/tutorials/keepyup-part-five/hierarchy.webp)

## 2. Hide the Menu When Play Starts {#hide-the-menu-when-play-starts}

Create a script called `ui-menu.mjs`:

```javascript
import { Script } from 'playcanvas';

/**
 * Hides the menu when the first round starts.
 */
export class UiMenu extends Script {
    static scriptName = 'uiMenu';

    initialize() {
        this.app.once('game:start', this.onGameStart, this);

        this.on('destroy', () => {
            this.app.off('game:start', this.onGameStart, this);
        });
    }

    onGameStart() {
        this.entity.enabled = false;
    }
}
```

Add a **Script** component to **Menu Screen** and add the `uiMenu` script. It has no attributes to parse.

The script uses `this.app.once` and not `this.app.on`, so its handler runs for the first `game:start` only. The menu is disabled along with everything under it, and it never needs to come back.

## 3. Build the Game Over Screen {#build-the-game-over-screen}

This screen has to appear and disappear many times. Its script lives on the screen, which stays enabled, and switches a group of elements under it on and off.

1. Add another **2D Screen** to **UI** called `Game Over Screen`, with the same **Ref Resolution** and **Scale Blend**.
2. With **Game Over Screen** selected, select **+** > **User Interface** > **Group Element**. Name the group `Panel` and set its **Preset** to **Stretch**, so that it covers the whole screen.

![The Element Component of the Panel entity, a group stretched to fill the screen](/img/tutorials/keepyup-part-five/panel-element.webp)

Then add these four elements to **Panel**. The quickest way is to duplicate the ones on the menu and drag the copies onto **Panel**.

| Name | Type | Position | Settings |
| --- | --- | --- | --- |
| `Game` | Text | `0`, `388`, `0` | **Text** `GAME`, **Font Size** and **Line Height** `92` |
| `Over` | Text | `0`, `300`, `0` | **Text** `OVER`, **Font Size** and **Line Height** `92`, **Color** `FFD13D` |
| `Ring` | Image | `0`, `87`, `0` | As on the menu |
| `Prompt` | Text | `0`, `-147`, `0` | As on the menu |

The two words are smaller than the title because they have to fit between the score and the ring.

## 4. Show It Between Rounds {#show-it-between-rounds}

Create a script called `ui-game-over.mjs`:

```javascript
import { Entity, Script } from 'playcanvas';

/**
 * Shows the game over message between rounds.
 */
export class UiGameOver extends Script {
    static scriptName = 'uiGameOver';

    /**
     * The entity that holds everything on the game over screen.
     *
     * @attribute
     * @type {Entity}
     */
    panel;

    initialize() {
        this.panel.enabled = false;

        this.app.on('game:over', this.onGameOver, this);
        this.app.on('game:start', this.onGameStart, this);

        this.on('destroy', () => {
            this.app.off('game:over', this.onGameOver, this);
            this.app.off('game:start', this.onGameStart, this);
        });
    }

    onGameOver() {
        this.panel.enabled = true;
    }

    onGameStart() {
        this.panel.enabled = false;
    }
}
```

1. Add a **Script** component to **Game Over Screen**, add the `uiGameOver` script and select its **Parse** button.
2. Drag the **Panel** entity onto the script's `panel` slot.

The panel is hidden when the game loads, shown on `game:over` and hidden again on the next `game:start`.

## Check Your Progress {#check-your-progress}

**Launch** the game. It opens on the title:

![The menu screen: KEEPY UP above the ball, which has a ring around it](/img/tutorials/keepyup-part-five/menu.webp)

Kick the ball and the title gives way to the score. Lose the ball and the game over screen appears, with the ball back in its ring, ready for another round:

![The game over screen: the score, GAME OVER, and the ball in its ring](/img/tutorials/keepyup-part-five/game-over.webp)

The game is complete, but it is silent. [Part 6: Sound, Particles and Publishing](/tutorials/keepyup-part-six/) adds the finishing touches and puts it online.
