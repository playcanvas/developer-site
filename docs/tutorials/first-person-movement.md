---
title: First Person Movement
description: Build a first-person character from scratch. Look around with the mouse, walk with forces on a rigid body and jump, in a small level made of boxes.
tags: [input, camera, physics]
kind: tutorial
topic: Cameras
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405842/JLWRE0-image-75.jpg
---

import StepVideo from '@site/src/components/StepVideo';

<div className="iframe-container">
    <iframe loading="lazy" src="https://playcanv.as/p/HzOzlZOC/" title="First Person Movement" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowFullScreen></iframe>
</div>

*Click the scene, then look around with the mouse, walk with <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd> and <kbd>D</kbd> and jump with <kbd>Space</kbd>. Press <kbd>Esc</kbd> to get the pointer back.*

In this tutorial you build that project from scratch: a small walled yard, a player who is pushed around it by the [physics engine](/user-manual/physics/), and one script of about 140 lines that turns the mouse and keyboard into looking, walking and jumping.

:::info[Before you start]

You need a keyboard and a mouse. It helps to have finished [Your First App](/user-manual/editor/getting-started/your-first-app/), so that you know your way around the Editor. To compare your work, open the [finished project](https://playcanvas.com/project/405842).

:::

## 1. Build the Floor {#build-the-floor}

Create a new project from the **Blank Project** kit and open it in the Editor. Its scene holds a Camera, a Light, a Box and a Plane, under a sky. The Box becomes the floor.

1. In the Hierarchy, select **Plane** and press <kbd>Delete</kbd>.
2. Select **Box**. In the Inspector, change its **Name** to `Floor`, its **Position** to `0`, `-0.5`, `0` and its **Scale** to `20`, `1`, `20`. The top of the floor is now at a height of zero.
3. Select **ADD COMPONENT** > **Physics** > **Collision**. Set **Half Extents** to `10`, `0.5`, `10`. A Collision component does not follow the Entity's scale, so you give it the size yourself: half the scale in each direction.
4. The component reports **Ammo module not found**. Select **IMPORT AMMO** to add the physics engine to the project. The warning turns gray and is gone the next time you select the Entity.
5. Select **ADD COMPONENT** > **Physics** > **Rigid Body**. The new component appears below the Render component. Leave its **Type** as **Static**: the floor never moves, but other bodies can land on it.

![The Collision and Rigid Body components of the Floor](/img/tutorials/first-person-movement/floor.webp)

## 2. Add the Walls {#add-the-walls}

Every other part of the level is a copy of the floor with a different size.

1. With **Floor** selected, select the **Duplicate Entity** button at the top of the Hierarchy. The copy is selected and is also called Floor.
2. Change the copy's **Name** to `Wall North`, its **Position** to `0`, `1.5`, `-10.5` and its **Scale** to `22`, `3`, `1`.
3. In its Collision component, set **Half Extents** to `11`, `1.5`, `0.5`.
4. Select **Duplicate Entity** three more times. There are now four Entities called Wall North in the same place. Leave one as it is and give the other three these values:

    | Name | Position | Rotation |
    | --- | --- | --- |
    | `Wall South` | `0`, `1.5`, `10.5` | `0`, `0`, `0` |
    | `Wall East` | `10.5`, `1.5`, `0` | `0`, `90`, `0` |
    | `Wall West` | `-10.5`, `1.5`, `0` | `0`, `90`, `0` |

A Collision component does follow the Entity's rotation, so the two turned walls need no other change.

## 3. Add Steps and Crates {#add-steps-and-crates}

The steps give the player something to jump onto. The crates are **Dynamic** bodies, which the physics engine moves, so the player can push them around.

1. Select **Wall North**, not one of the turned walls, and duplicate it twice for the steps. Give the copies these values:

    | Name | Position | Scale | Half Extents |
    | --- | --- | --- | --- |
    | `Step Low` | `-4`, `0.5`, `-8` | `4`, `1`, `4` | `2`, `0.5`, `2` |
    | `Step High` | `-8`, `1`, `-8` | `4`, `2`, `4` | `2`, `1`, `2` |

2. Duplicate **Step Low**. Change the copy's **Name** to `Crate`, its **Position** to `3`, `0.5`, `-3`, its **Scale** to `1`, `1`, `1` and its **Half Extents** to `0.5`, `0.5`, `0.5`.
3. In the Crate's Rigid Body component, set **Type** to **Dynamic** and **Mass** to `10`.
4. Duplicate **Crate** and set the copy's **Position** to `4.5`, `0.5`, `-1.5` and its **Rotation** to `0`, `30`, `0`.

## 4. Add Some Color {#add-some-color}

The level is complete. This step only makes it easier to read, so skip it if you are in a hurry.

1. In the Assets panel, select the **+** (Add Asset) button, then **Material**. A material called New Material appears. Select it and change its **Name** to `Ground`. Expand **Diffuse**, select the **Color** swatch, type `7C8C72` in the hex field and press <kbd>Tab</kbd>.
2. Make three more materials in the same way. Each new one is already selected, so go straight to its **Name**:

    | Name | Color |
    | --- | --- |
    | `Wall` | `C9B8A0` |
    | `Step` | `8C9BAA` |
    | `Crate` | `D98A3D` |

3. Drag `Ground` from the Assets panel onto the floor in the Viewport. In the same way, drag `Step` onto each of the two steps and `Crate` onto each of the two crates.
4. Two of the walls are out of view. In the Hierarchy, select **Wall North**, then hold <kbd>Ctrl</kbd> (<kbd>Cmd</kbd> on a Mac) and select the other three walls. Drag `Wall` from the Assets panel onto the slot under **Materials** in the Render component.
5. Select **Light** and set its **Rotation** to `50`, `30`, `0`. Further down the Light component, below **Cast Shadows**, set **Resolution** to **2048 x 2048** and **Distance** to `40`, so that shadows reach across the yard.

![The colored level in the Viewport](/img/tutorials/first-person-movement/level.webp)

[Basic Materials](/tutorials/basic-materials/) goes further with materials.

## 5. Make the Player {#make-the-player}

The player is an invisible capsule with a Camera at eye height.

1. In the Hierarchy, select **Root**, then the **+** (Add Entity) button, then **Entity**.
2. In the Inspector, change the new Entity's **Name** to `Player` and its **Position** to `0`, `1`, `5`.
3. Add a **Collision** component and set its **Type** to **Capsule**. Leave **Radius** at `0.5` and **Height** at `2`: a capsule two units tall, standing on the floor.
4. Add a **Rigid Body** component and set these values:

    | Attribute | Value | Why |
    | --- | --- | --- |
    | **Type** | **Dynamic** | The physics engine moves the player: it falls, lands and is stopped by walls. |
    | **Mass** | `80` | About the weight of a person, in kilograms. It decides how easily the player pushes a crate. |
    | **Angular Factor** | `0`, `0`, `0` | The body cannot rotate, so the capsule never falls over. |
    | **Friction** | `0` | The player slides along a wall instead of sticking to it. The script does the braking. |
    | **Restitution** | `0` | The player does not bounce when it lands. |

5. In the Hierarchy, drag **Camera** onto **Player** to make it a child.
6. Player is now collapsed in the Hierarchy. Select the **+** beside it to show **Camera**, then select **Camera** and set its **Position** to `0`, `0.6`, `0` and its **Rotation** to `0`, `0`, `0`. The capsule's center is one unit above the floor, so the eyes are at 1.6.

![The Rigid Body component of the Player](/img/tutorials/first-person-movement/player.webp)

**Launch** the project. You stand in the yard, facing the far wall and unable to move.

## 6. Look Around {#look-around}

The script starts with the mouse.

1. In the Assets panel, select the **+** (Add Asset) button, then **Script**. Type `first-person-movement.mjs` as the filename and press <kbd>Enter</kbd>.
2. Double-click `first-person-movement.mjs` to open it in the [Code Editor](/user-manual/editor/scripting/code-editor/).
3. Replace everything in the file with the code below, then save with <kbd>Ctrl</kbd>+<kbd>S</kbd> (<kbd>Cmd</kbd>+<kbd>S</kbd> on a Mac).

```javascript
import { Script, Entity, Mouse, math } from 'playcanvas';

export class FirstPersonMovement extends Script {
    static scriptName = 'firstPersonMovement';

    /**
     * The Camera, a child of this Entity.
     *
     * @attribute
     * @title Camera
     * @type {Entity}
     */
    camera = null;

    /**
     * Degrees the view turns for each pixel the mouse moves.
     *
     * @attribute
     * @title Look Speed
     * @type {number}
     */
    lookSpeed = 0.25;

    initialize() {
        // The direction of the view, in degrees
        this.yaw = 0;
        this.pitch = 0;

        const mouse = this.app.mouse;
        mouse.on(Mouse.EVENT_MOUSEDOWN, this.onMouseDown, this);
        mouse.on(Mouse.EVENT_MOUSEMOVE, this.onMouseMove, this);

        this.on('destroy', () => {
            mouse.off(Mouse.EVENT_MOUSEDOWN, this.onMouseDown, this);
            mouse.off(Mouse.EVENT_MOUSEMOVE, this.onMouseMove, this);
        });
    }

    onMouseDown() {
        // Hide the pointer and keep it inside the game. Esc gives it back.
        if (!Mouse.isPointerLocked()) {
            this.app.mouse.enablePointerLock();
        }
    }

    onMouseMove(event) {
        if (!Mouse.isPointerLocked()) return;

        this.yaw -= event.dx * this.lookSpeed;
        this.pitch -= event.dy * this.lookSpeed;

        // Stop at straight up and straight down
        this.pitch = math.clamp(this.pitch, -90, 90);
    }

    update(dt) {
        // Only the Camera turns. The player's body always stays upright.
        this.camera.setLocalEulerAngles(this.pitch, this.yaw, 0);
    }
}
```

Back in the Editor:

1. Select **Player**. In the Inspector, select **ADD COMPONENT** > **Script**.
2. Select the **+ ADD SCRIPT** field and choose `firstPersonMovement`.
3. Select the **Parse** button on the `firstPersonMovement` script: the two arrows next to **Edit**. The Editor reads the code and lists the script's attributes.
4. Drag **Camera** from the Hierarchy onto the **Camera** slot.

![The script on the Player, with the Camera assigned](/img/tutorials/first-person-movement/script.webp)

**Launch** the project and click the scene. The pointer disappears and the mouse turns the view. Press <kbd>Esc</kbd> to get the pointer back.

<StepVideo src="/video/first-person-movement-look.mp4" poster="/img/tutorials/first-person-movement/look.webp" label="The view turning left and right, then up to the sky and down to the floor" />

### How it works {#how-looking-works}

- **Pointer lock.** A mouse pointer stops at the edge of the screen, which would stop the view turning. [`enablePointerLock`](https://api.playcanvas.com/engine/classes/Mouse.html#enablepointerlock) hides the pointer and reports movement without limit. A browser only allows it in answer to a click, which is why it is in `onMouseDown`, and it always gives the pointer back on <kbd>Esc</kbd>.
- **Yaw and pitch.** The script keeps two angles: `yaw` turns the view left and right, `pitch` tilts it up and down. Each `mousemove` event carries the distance the mouse moved, `dx` and `dy`, in pixels. Multiplied by **Look Speed**, they change the angles.
- **The clamp.** [`math.clamp`](https://api.playcanvas.com/engine/functions/math.clamp.html) keeps `pitch` between -90 and 90 degrees. Without it you could keep tilting past straight up and see the world upside down.
- **Only the Camera turns.** `update` applies both angles to the Camera. The Player never rotates, because its Rigid Body has an Angular Factor of zero.
- **Tidying up.** The handler registered on `destroy` removes the mouse listeners, so nothing keeps calling the script after its Entity is gone.

## 7. Walk and Jump {#walk-and-jump}

In the Code Editor, replace everything in `first-person-movement.mjs` with the complete script below and save.

```javascript
import {
    Script, Entity, Mouse, Quat, Vec3, math,
    KEY_A, KEY_D, KEY_S, KEY_W, KEY_SPACE,
    KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP
} from 'playcanvas';

export class FirstPersonMovement extends Script {
    static scriptName = 'firstPersonMovement';

    /**
     * The Camera, a child of this Entity.
     *
     * @attribute
     * @title Camera
     * @type {Entity}
     */
    camera = null;

    /**
     * Degrees the view turns for each pixel the mouse moves.
     *
     * @attribute
     * @title Look Speed
     * @type {number}
     */
    lookSpeed = 0.25;

    /**
     * Top speed along the ground, in meters per second.
     *
     * @attribute
     * @title Speed
     * @type {number}
     */
    speed = 5;

    /**
     * How quickly the player reaches that speed and stops again.
     *
     * @attribute
     * @title Acceleration
     * @type {number}
     */
    acceleration = 10;

    /**
     * Upward speed at the start of a jump, in meters per second.
     *
     * @attribute
     * @title Jump Speed
     * @type {number}
     */
    jumpSpeed = 5.5;

    initialize() {
        // The direction of the view, in degrees
        this.yaw = 0;
        this.pitch = 0;

        // Reused every frame, so that nothing is allocated while the game runs
        this.heading = new Quat();
        this.forward = new Vec3();
        this.right = new Vec3();
        this.wanted = new Vec3();
        this.force = new Vec3();
        this.rayEnd = new Vec3();

        const mouse = this.app.mouse;
        mouse.on(Mouse.EVENT_MOUSEDOWN, this.onMouseDown, this);
        mouse.on(Mouse.EVENT_MOUSEMOVE, this.onMouseMove, this);

        this.on('destroy', () => {
            mouse.off(Mouse.EVENT_MOUSEDOWN, this.onMouseDown, this);
            mouse.off(Mouse.EVENT_MOUSEMOVE, this.onMouseMove, this);
        });
    }

    onMouseDown() {
        // Hide the pointer and keep it inside the game. Esc gives it back.
        if (!Mouse.isPointerLocked()) {
            this.app.mouse.enablePointerLock();
        }
    }

    onMouseMove(event) {
        if (!Mouse.isPointerLocked()) return;

        this.yaw -= event.dx * this.lookSpeed;
        this.pitch -= event.dy * this.lookSpeed;

        // Stop at straight up and straight down
        this.pitch = math.clamp(this.pitch, -90, 90);
    }

    isOnGround() {
        // Cast a ray from the middle of the player to just below its feet
        const start = this.entity.getPosition();
        const end = this.rayEnd.copy(start);
        end.y -= this.entity.collision.height / 2 + 0.1;

        return this.app.systems.rigidbody.raycastFirst(start, end) !== null;
    }

    update(dt) {
        const keyboard = this.app.keyboard;
        const body = this.entity.rigidbody;

        // Only the Camera turns. The player's body always stays upright.
        this.camera.setLocalEulerAngles(this.pitch, this.yaw, 0);

        // Forward and right along the ground, whichever way the Camera is tilted
        this.heading.setFromEulerAngles(0, this.yaw, 0);
        this.heading.transformVector(Vec3.FORWARD, this.forward);
        this.heading.transformVector(Vec3.RIGHT, this.right);

        let x = 0;
        let z = 0;
        if (keyboard.isPressed(KEY_W) || keyboard.isPressed(KEY_UP)) z += 1;
        if (keyboard.isPressed(KEY_S) || keyboard.isPressed(KEY_DOWN)) z -= 1;
        if (keyboard.isPressed(KEY_D) || keyboard.isPressed(KEY_RIGHT)) x += 1;
        if (keyboard.isPressed(KEY_A) || keyboard.isPressed(KEY_LEFT)) x -= 1;

        // The velocity the player is asking for. Normalizing it keeps a diagonal
        // no faster than a straight line.
        this.wanted.set(0, 0, 0)
            .add(this.forward.mulScalar(z))
            .add(this.right.mulScalar(x))
            .normalize()
            .mulScalar(this.speed);

        // Push toward that velocity: the further off it is, the harder the push.
        // With no key held the wanted velocity is zero, so the same push is the brake.
        this.force.sub2(this.wanted, body.linearVelocity);
        this.force.y = 0;
        this.force.mulScalar(body.mass * this.acceleration);
        body.applyForce(this.force);

        if (keyboard.wasPressed(KEY_SPACE) && this.isOnGround()) {
            body.applyImpulse(0, body.mass * this.jumpSpeed, 0);
        }
    }
}
```

Back in the Editor, select **Player** and select **Parse** on the script again. Three new attributes appear: **Speed**, **Acceleration** and **Jump Speed**.

:::note

The Editor reads a script's attributes only when you select **Parse**. Do it again whenever you add or change an attribute in the code.

:::

**Launch** the project. Walk with <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd> and <kbd>D</kbd> or the arrow keys, and jump with <kbd>Space</kbd>. Push a crate across the yard, then jump onto the low step and from there onto the high one.

<StepVideo src="/video/first-person-movement-walk.mp4" poster="/img/tutorials/first-person-movement/walk.webp" label="The player walking to a crate and pushing it, then jumping onto the low step and the high step" />

### How walking works {#how-walking-works}

- **Which way is forward.** The Camera's own forward direction points into the floor when you look down. The script instead builds a rotation from `yaw` alone and uses it to turn [`Vec3.FORWARD`](https://api.playcanvas.com/engine/classes/Vec3.html#forward) and `Vec3.RIGHT`. The results always lie flat on the ground.
- **The wanted velocity.** The keys give `x` and `z` values of -1, 0 or 1. Combined with the two directions, normalized and multiplied by **Speed**, they make the velocity the player is asking for. With no key held, it is zero.
- **The push.** The script never sets the body's velocity. It applies a force with [`applyForce`](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html#applyforce), in proportion to the gap between the wanted velocity and the real one. A big gap gives a hard push and no gap gives none, so the player speeds up quickly, settles at **Speed** and brakes when you let go, all with one line of arithmetic.
- **Why a force.** The physics engine stays in charge. A wall stops the player, a crate takes some effort to shift, and anything that hits the player pushes it back.
- **Up and down.** `this.force.y = 0` leaves the vertical direction to gravity and to the jump.

### How jumping works {#how-jumping-works}

- **One jump per press.** [`wasPressed`](https://api.playcanvas.com/engine/classes/Keyboard.html#waspressed) is true only in the frame the key goes down, where `isPressed` is true for as long as it is held.
- **The impulse.** A force acts over time. An impulse is a single kick: [`applyImpulse`](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html#applyimpulse) changes the velocity at once. Multiplying **Jump Speed** by the body's mass gives the same jump whatever the mass.
- **The ground check.** Without it you could jump again in the air. `isOnGround` casts a ray with [`raycastFirst`](https://api.playcanvas.com/engine/classes/RigidBodyComponentSystem.html#raycastfirst) from the middle of the capsule to a point just below its feet. If the ray hits anything, the player is standing on it. The ray starts inside the player's own capsule, which a ray cast ignores. [Ray Casting](/user-manual/physics/ray-casting/) covers what else a ray can tell you.

## 8. Tune the Feel {#tune-the-feel}

Select **Player** and change the script's attributes. You can do it while the project is running in another tab: the launched project updates as soon as you press <kbd>Enter</kbd>.

| Attribute | Default | What it changes |
| --- | --- | --- |
| **Look Speed** | `0.25` | Degrees turned for each pixel the mouse moves. Lower is steadier, higher is twitchier. |
| **Speed** | `5` | Top speed, in units per second. A brisk walk is about 2 and a sprint about 8. |
| **Acceleration** | `10` | How fast the gap to the wanted velocity closes. At `10` the player is close to top speed in a third of a second. At `2` it feels like ice. |
| **Jump Speed** | `5.5` | Upward speed at take-off. The height of the jump is the speed squared, divided by twice the gravity: 5.5 gives about 1.5 units, enough for a step that is 1 high. |

Two values on the Player's Rigid Body matter as well. **Mass** decides how the player and the crates push each other: set it to `1` and a crate almost stops you. **Friction** above zero lets the player cling to a wall by walking into it in mid-air.

## Where to Go Next {#where-to-go-next}

- **Touch, gamepads and sprinting.** The engine ships a complete controller, [`first-person-controller.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/first-person-controller.mjs), built on the same ideas. Upload it to your project and add it to the Player in place of your script.
- **A better ground check.** One ray from the center misses when the player balances on the very edge of a step. Casting several rays, or using [collision events](/tutorials/collision-and-triggers/), closes the gap.
- **More about forces.** [Forces and Impulses](/tutorials/using-forces-on-rigid-bodies/) covers torques and teleporting a body.
- **A level to walk around.** The [First Person Shooter Starter Kit](/tutorials/first-person-shooter-starter-kit/) puts the same kind of movement in a larger level.
