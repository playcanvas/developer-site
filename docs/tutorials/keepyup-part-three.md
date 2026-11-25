---
title: "Making a Simple Game - Part 3: Making the Ball Move"
description: Write the first two scripts for Keepy Up. One moves the football under gravity and kicks it, and the other turns mouse clicks and touches into kicks.
tags: [games]
kind: tutorial
topic: Games
thumb: /img/tutorials/keepyup-part-three/thumbnail.webp
---

import StepVideo from '@site/src/components/StepVideo';

In [Part 2](/tutorials/keepyup-part-two/) you finished the look of the scene. In this part you write two [scripts](/user-manual/scripting/). The first makes the ball fall and lets it be kicked. The second works out whether a click or a touch landed on the ball.

:::info[Before you start]

You need the project you made in Parts 1 and 2. To compare your work, open the [finished project](https://playcanvas.com/project/1660780/overview/keepy-up).

:::

## 1. Write the Ball Script {#write-the-ball-script}

1. In the Assets panel, open the **Scripts** folder.
2. Select the **+** (Add Asset) button, then **Script**. Type `ball.mjs` as the filename and press <kbd>Enter</kbd>.
3. Double-click `ball.mjs` to open it in the [Code Editor](/user-manual/editor/scripting/code-editor/).
4. Replace everything in the file with the code below, then save with <kbd>Ctrl</kbd>+<kbd>S</kbd> (<kbd>Cmd</kbd>+<kbd>S</kbd> on a Mac).

```javascript
import { Script, Vec3 } from 'playcanvas';

/**
 * Moves the ball under gravity, kicks it when it is tapped and returns it to its starting
 * position when it falls out of view.
 */
export class Ball extends Script {
    static scriptName = 'ball';

    /**
     * The acceleration due to gravity, in units per second squared.
     *
     * @attribute
     * @type {number}
     */
    gravity = -20;

    /**
     * The upward speed a kick gives the ball, in units per second.
     *
     * @attribute
     * @type {number}
     */
    kickSpeed = 12;

    /**
     * The sideways speed a kick adds for each unit it lands off center.
     *
     * @attribute
     * @type {number}
     */
    sideSpeed = 4;

    /**
     * The spin a kick adds for each unit it lands off center, in degrees per second.
     *
     * @attribute
     * @type {number}
     */
    spin = 360;

    /**
     * The height below which the ball is lost.
     *
     * @attribute
     * @type {number}
     */
    floor = -6;

    velocity = new Vec3();

    spinSpeed = 0;

    inPlay = false;

    initialize() {
        // Remember where the ball starts so it can be put back
        this.startPosition = this.entity.getPosition().clone();
        this.startRotation = this.entity.getRotation().clone();
    }

    update(dt) {
        if (!this.inPlay) {
            // Turn slowly while waiting for a kick
            this.entity.rotate(0, 30 * dt, 0);
            return;
        }

        // Gravity changes the velocity, and the velocity changes the position
        this.velocity.y += this.gravity * dt;
        this.entity.translate(this.velocity.x * dt, this.velocity.y * dt, 0);

        // Spin around the axis that points at the camera
        this.entity.rotate(0, 0, this.spinSpeed * dt);

        if (this.entity.getPosition().y < this.floor) {
            this.lose();
        }
    }

    /**
     * Kicks the ball up and away from a point.
     *
     * @param {Vec3} point - The position of the kick in world space.
     */
    kick(point) {
        // How far the kick landed to the side of the ball's center
        const offset = this.entity.getPosition().x - point.x;

        this.velocity.set(this.sideSpeed * offset, this.kickSpeed, 0);
        this.spinSpeed -= this.spin * offset;
        this.inPlay = true;

        this.app.fire('ball:kicked', point);
    }

    lose() {
        this.inPlay = false;
        this.velocity.set(0, 0, 0);
        this.spinSpeed = 0;
        this.entity.setPosition(this.startPosition);
        this.entity.setRotation(this.startRotation);

        this.app.fire('ball:lost');
    }
}
```

## 2. Attach It to the Football {#attach-it-to-the-football}

1. Back in the Editor, select **Football** in the Hierarchy.
2. In the Inspector, select **ADD COMPONENT** > **Script**. The new [Script Component](/user-manual/editor/scenes/components/script/) is added at the bottom of the Inspector, so scroll down to it.
3. Select the **+ ADD SCRIPT** field and choose `ball`.
4. Select the **Parse** button on the `ball` script: the two arrows next to **Edit**. The Editor reads the code and lists the script's attributes.

![The Script Component on the Football entity, showing the ball script's attributes](/img/tutorials/keepyup-part-three/ball-script.webp)

The five values under the script are its [attributes](/user-manual/scripting/script-attributes/). Each one comes from a property in the code that has an `@attribute` comment above it. You can change them here without touching the code.

:::note

The Editor reads a script's attributes only when you select **Parse**. Do it for every script in this series that has attributes, and again whenever you change an attribute in the code.

:::

**Launch** the game. The ball turns slowly on the spot, waiting for a kick that nothing can give it yet.

### How the Ball Script Works {#how-the-ball-script-works}

- **`initialize`** runs once when the game starts. It remembers where the ball began.
- **`update`** runs every frame, and `dt` is the time since the last frame in seconds. While the ball is in play, gravity changes its velocity and its velocity changes its position. Multiplying by `dt` makes the ball move at the same speed however fast the game is running.
- **`kick`** throws the ball upwards. If the kick lands to one side of the ball's center, the ball also moves away from it and spins.
- **`lose`** puts the ball back where it started once it drops below `floor`.

The script also calls `this.app.fire` twice. That sends an event to the rest of the game: `ball:kicked` when the ball is kicked and `ball:lost` when it is lost. Nothing is listening yet. In Part 4 the game script will use these events to keep score.

## 3. Write the Input Script {#write-the-input-script}

The ball needs something to kick it. Create a second script in the **Scripts** folder called `input.mjs`, with this code:

```javascript
import { Entity, MOUSEBUTTON_LEFT, Script, Vec3 } from 'playcanvas';

/**
 * Turns mouse clicks and touches into kicks when they land on the ball.
 */
export class Input extends Script {
    static scriptName = 'input';

    /**
     * The ball to kick.
     *
     * @attribute
     * @type {Entity}
     */
    ball;

    /**
     * The camera the game is viewed through.
     *
     * @attribute
     * @type {Entity}
     */
    camera;

    /**
     * How close to the ball's center a tap must land to count, in units.
     *
     * @attribute
     * @type {number}
     */
    hitRadius = 0.75;

    point = new Vec3();

    initialize() {
        this.app.mouse.on('mousedown', this.onMouseDown, this);
        this.app.touch?.on('touchstart', this.onTouchStart, this);

        this.on('destroy', () => {
            this.app.mouse.off('mousedown', this.onMouseDown, this);
            this.app.touch?.off('touchstart', this.onTouchStart, this);
        });
    }

    onMouseDown(event) {
        if (event.button === MOUSEBUTTON_LEFT) {
            this.tap(event.x, event.y);
        }
    }

    onTouchStart(event) {
        const touch = event.changedTouches[0];
        this.tap(touch.x, touch.y);

        // Stop the browser from also sending a mouse event for this touch
        event.event.preventDefault();
    }

    /**
     * Kicks the ball if a point on the screen is over it.
     *
     * @param {number} x - The horizontal position on the screen, in pixels.
     * @param {number} y - The vertical position on the screen, in pixels.
     */
    tap(x, y) {
        const ballPosition = this.ball.getPosition();

        // Find the point in the world that is under the tap, at the ball's distance from the camera
        const distance = this.camera.getPosition().z - ballPosition.z;
        this.camera.camera.screenToWorld(x, y, distance, this.point);

        if (this.point.distance(ballPosition) < this.hitRadius) {
            this.ball.script.ball.kick(this.point);
        }
    }
}
```

## 4. Add a Game Entity {#add-a-game-entity}

The input script does not belong to the ball or the camera, so give it an Entity of its own.

1. In the Hierarchy, select **Root**, then the **+** (Add Entity) button, then **Entity**. In the Inspector, change the **Name** of the new Entity to `Game`.
2. Add a **Script** component to it, add the `input` script and select its **Parse** button.
3. Drag **Football** from the Hierarchy onto the script's `ball` slot.
4. Drag **Camera** from the Hierarchy onto its `camera` slot.

![The input script on the Game entity, with its ball and camera slots filled](/img/tutorials/keepyup-part-three/input-script.webp)

The two slots exist because the code marks `ball` and `camera` as attributes of type `Entity`. This is how one script is told about other Entities in the scene.

### How the Input Script Works {#how-the-input-script-works}

- **`initialize`** asks to be told about mouse presses and touches. The `?.` before `on` skips the touch line on devices that have no touchscreen.
- **`onMouseDown`** and **`onTouchStart`** each pass a position on the screen to `tap`. A touch also asks the browser not to send a second, pretend mouse press for the same tap.
- **`tap`** uses the camera's [`screenToWorld`](https://api.playcanvas.com/engine/classes/CameraComponent.html#screentoworld) function to find the point in the 3D world that is under the tap, at the same distance from the camera as the ball. If that point is within `hitRadius` of the ball's center, it kicks the ball there.

## Check Your Progress {#check-your-progress}

**Launch** the game and click or tap the ball. Keep it in the air for as long as you can. When you miss, it comes back to its starting place.

<StepVideo src="/video/keepyup-part-three.mp4" poster="/img/tutorials/keepyup-part-three/result.webp" label="The ball being kicked into the air several times, then dropping out of view and returning to its starting place" />

Now is a good time to experiment. Select **Football** and change the attributes of the `ball` script: a `gravity` of `-10` gives a floaty ball, and a `sideSpeed` of `8` makes off-center kicks much harder to recover.

You have a toy. [Part 4: Game Flow and Scoring](/tutorials/keepyup-part-four/) turns it into a game.
