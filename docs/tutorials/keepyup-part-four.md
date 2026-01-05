---
title: Making a Simple Game - Part 4
tags: [games]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406050/LIJTDO-image-75.jpg
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/KH37bnOk/?overlay=false" title="Making a Simple Game - Part 4" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*You can find the [full project here](https://playcanvas.com/project/406050). If you haven't see [Part 1](/tutorials/keepyup-part-one/), [Part 2](/tutorials/keepyup-part-two/) and [Part 3](/tutorials/keepyup-part-three/) read them first.*

## The Football

The football is the center of attention in our Keepy Up game. It responds to player input, it responds to the environment (well, gravity), it makes sounds. It's probably the most complicated part of the game. Fortunately, we're going to explain all the bits to you as simply as we can.

## ball.js

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script, Vec3 } from 'playcanvas';

export class Ball extends Script {
    static scriptName = "ball";

    /**
     * The value of gravity to use.
     * 
     * @attribute
     * @title Gravity
     * @type {number}
     */
    gravity = -9.8;

    /**
     * Speed to set the ball to when it is tapped.
     * 
     * @attribute
     * @title Default Tap
     * @type {number}
     */
    defaultTap = 5;

    /**
     * The particle effect to trigger when the ball is tapped.
     * 
     * @attribute
     * @title Impact Effect
     * @type {Entity}
     */
    impactEffect = null;

    /**
     * When ball goes below minimum y value, game over is triggered.
     * 
     * @attribute
     * @title Ball Minimum
     * @type {number}
     */
    ballMinimum = -6;

    /**
     * Multiplier to apply to X speed when tap is off center.
     * 
     * @attribute
     * @title Speed Mult
     * @type {number}
     */
    speedMult = 4;

    /**
     * Multiplier to apply to angular speed when tap is off center.
     * 
     * @attribute
     * @title Ang Mult
     * @type {number}
     */
    angMult = -6;

    static tmp = new Vec3();

    // initialize code called once per entity
    initialize() {
        this.paused = true;

        // Get the "Game" Entity and start listening for events
        this.game = this.app.root.findByName("Game");

        this.app.on("game:start", this.unpause, this);
        this.app.on("game:gameover", this.pause, this);
        this.app.on("game:reset", this.reset, this);

        // Initialize properties
        this._vel = new Vec3(0, 0, 0);
        this._acc = new Vec3(0, this.gravity, 0);
        this._angSpeed = 0;

        // Store the initial position and rotation for reseting
        this._origin = this.entity.getLocalPosition().clone();
        this._rotation = this.entity.getLocalRotation().clone();
    }

    // update code called every frame
    update(dt) {
        // Don't update when paused
        if (this.paused) {
            this.entity.rotate(0, 30 * dt, 0);
            return;
        }

        let p = this.entity.getLocalPosition();
        let tmp = Ball.tmp;

        // integrate the velocity in a temporary variable
        tmp.copy(this._acc).scale(dt);
        this._vel.add(tmp);

        // integrate the position in a temporary variable
        tmp.copy(this._vel).scale(dt);
        p.add(tmp);

        // update position
        this.entity.setLocalPosition(p);

        // rotate by angular speed
        this.entity.rotate(0, 0, this._angSpeed);

        // check for game over condition
        if (p.y < this.ballMinimum) {
            this.game.script.game.gameOver();
        }
    }

    /*
     * Called by the input handler to tap the ball up in the air
     * dx is the tap distance from centre of ball in x
     * dy is the tap distance from centre of ball in y
     */
    tap(dx, dy) {
        // Update velocity and spin based on position of tap
        this._vel.set(this.speedMult * dx, this.defaultTap, 0);
        this._angSpeed += this.angMult * dx;

        // calculate the position of the tap in world space
        let tmp = Ball.tmp;
        tmp.copy(this.entity.getLocalPosition());
        tmp.x -= dx;
        tmp.y -= dy;

        // trigger particle effect to tap position, facing away from the center of the ball
        this.impactEffect.setLocalPosition(tmp);
        this.impactEffect.particlesystem.reset();
        this.impactEffect.particlesystem.play();
        this.impactEffect.lookAt(this.entity.getPosition());

        // play audio
        this.entity.sound.play("bounce");

        // increment the score by 1
        this.game.script.game.addScore(1);
    }

    // Pause the ball update when not playing the game
    unpause() {
        this.paused = false;

        // start game with a tap
        this.tap(0, 0);
    }

    // Resume ball updating
    pause() {
        this.paused = true;
    }

    // Reset the ball to initial values
    reset() {
        this.entity.setLocalPosition(this._origin);
        this.entity.setLocalRotation(this._rotation);
        this._vel.set(0, 0, 0);
        this._acc.set(0, this.gravity, 0);
        this._angSpeed = 0;
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Ball = pc.createScript('ball');

Ball.attributes.add('gravity', {
    type: 'number',
    default: -9.8,
    description: 'The value of gravity to use'
});

Ball.attributes.add('defaultTap', {
    type: 'number',
    default: 5,
    description: 'Speed to set the ball to when it is tapped'
});

Ball.attributes.add('impactEffect', {
    type: 'entity',
    description: 'The particle effect to trigger when the ball is tapped'
});

Ball.attributes.add('ballMinimum', {
    type: 'number',
    default: -6,
    description: 'When ball goes below minimum y value game over is triggered'
});

Ball.attributes.add('speedMult', {
    type: 'number',
    default: 4,
    description: 'Multiplier to apply to X speed when tap is off center'
});

Ball.attributes.add('angMult', {
    type: 'number',
    default: -6,
    description: 'Multiplier to apply to angular speed when tap is off center'
});

Ball.tmp = new pc.Vec3();

// initialize code called once per entity
Ball.prototype.initialize = function() {
    this.paused = true;

    // Get the "Game" Entity and start listening for events
    this.game = this.app.root.findByName("Game");

    this.app.on("game:start", this.unpause, this);
    this.app.on("game:gameover", this.pause, this);
    this.app.on("game:reset", this.reset, this);

    // Initialize properties
    this._vel = new pc.Vec3(0, 0, 0);
    this._acc = new pc.Vec3(0, this.gravity, 0);
    this._angSpeed = 0;

    // Store the initial position and rotation for reseting
    this._origin = this.entity.getLocalPosition().clone();
    this._rotation = this.entity.getLocalRotation().clone();
};

// update code called every frame
Ball.prototype.update = function(dt) {
    // Don't update when paused
    if (this.paused) {
        this.entity.rotate(0, 30*dt, 0);
        return;
    }

    var p = this.entity.getLocalPosition();
    var tmp = Ball.tmp;

    // integrate the velocity in a temporary variable
    tmp.copy(this._acc).scale(dt);
    this._vel.add(tmp);

    // integrate the position in a temporary variable
    tmp.copy(this._vel).scale(dt);
    p.add(tmp);

    // update position
    this.entity.setLocalPosition(p);

    // rotate by angular speed
    this.entity.rotate(0, 0, this._angSpeed);

    // check for game over condition
    if (p.y < this.ballMinimum) {
        this.game.script.game.gameOver();
    }
};

/*
 * Called by the input handler to tap the ball up in the air
 * dx is the tap distance from centre of ball in x
 * dy is the tap distance from centre of ball in y
 */
Ball.prototype.tap = function (dx, dy) {
    // Update velocity and spin based on position of tap
    this._vel.set(this.speedMult * dx, this.defaultTap, 0);
    this._angSpeed += this.angMult * dx;

    // calculate the position of the tap in world space
    var tmp = Ball.tmp;
    tmp.copy(this.entity.getLocalPosition());
    tmp.x -= dx;
    tmp.y -= dy;

    // trigger particle effect to tap position, facing away from the center of the ball
    this.impactEffect.setLocalPosition(tmp);
    this.impactEffect.particlesystem.reset();
    this.impactEffect.particlesystem.play();
    this.impactEffect.lookAt(this.entity.getPosition());

    // play audio
    this.entity.sound.play("bounce");

    // increment the score by 1
    this.game.script.game.addScore(1);
};

// Pause the ball update when not playing the game
Ball.prototype.unpause = function () {
    this.paused = false;

    // start game with a tap
    this.tap(0, 0);
};

// Resume ball updating
Ball.prototype.pause = function () {
    this.paused = true;
};

// Reset the ball to initial values
Ball.prototype.reset = function () {
    this.entity.setLocalPosition(this._origin);
    this.entity.setLocalRotation(this._rotation);
    this._vel.set(0,0,0);
    this._acc.set(0, this.gravity, 0);
    this._angSpeed = 0;
};
```

</TabItem>
</Tabs>

### Script Attributes

The first thing you'll notice at the top of the script are a set of script attributes that we've defined. Defining script attributes lets you expose values from your script into the editor. There are three very good reasons to do this.

![Script Attributes](/img/tutorials/beginner/keepyup-part-four/ball-script-attributes.jpg)

First, it lets you use the same script for many different Entities with different values. For example, you could have a script attribute which sets a color, and in the editor create a red, blue and green version of a entity just by modifying the script attribute.

Second, you can quickly and easily tune the behavior of scripts. When you modify a script attribute (or indeed any property from the editor) the changes are made instantly to any instance of the game that you have launched from the editor. So for example in the case of the `ballMinimum` property we define here, you can launch the game and test what the value of `ballMinimum` should be to allow the ball to drop off the bottom of the screen without ever having to reload the game. Test the game, modify the value, test the game.

This is known as "iteration speed". The faster you can modify and test your game, the quicker you can get it developed!

For the ball, we define script attributes that let us tweak a number of game play properties like the gravity, the impulse applied when the ball is tapped. These attributes let us very quickly tune the game to our liking.

Third, the script attribute is a great way to link a script to an Entity or an Asset in your scene. For example, the ball script needs to trigger a particle effect when it is tapped. The particle effect is on another Entity in our scene. We define a script attribute called `impactEffect` of type `entity` and in the Editor we link this to the entity with our particle effect. Our script now has a reference to the entity and we are free to modify this entity or change to another entity without breaking our code.

### The Physics Simulation

For those of you with some basic vector maths knowledge this `update()` loop of the ball should be simple, but for everyone else we'll explain a little about simulating a ball in a video game.

A simple way to simulate something in video game is to give that object an acceleration, a velocity and a position. Every time step (or frame) the acceleration (which is the rate of change of velocity) changes the velocity and the velocity (which is the rate of change of position) changes the position. Then you draw your object at the new position.

You can influence the position of your object in one of three ways.

* **Change the acceleration**, this is useful for applying a force over a period of time, like gravity on the ball.
* **Change the velocity**, this is an instantaneous change. Like a ball bouncing off the floor.
* **Change the position**, like teleportation, there isn't a real world equivalent!

In our simulation we have a constant acceleration due to gravity, when you tap the ball we apply an instant change in velocity and when you reset the game we teleport the ball back to it's starting position.

#### Simulating

The update loop does this:

```none
(Change in Velocity) = (Acceleration) * (Time since last frame)
(New Velocity) = (Old Velocity) + (Change in Velocity)
(Change in Position) = (New Velocity) * (Time since last frame)
(New Position) = (Old Position) + (Change in Position)
```

In code this looks like this:

```javascript
var p = this.entity.getLocalPosition();

// integrate the velocity in a temporary variable
tmp.copy(this._acc).scale(dt);
this._vel.add(tmp);

// integrate the position in a temporary variable
tmp.copy(this._vel).scale(dt);
p.add(tmp);

// update position
this.entity.setLocalPosition(p);
```

You will note that we use temporary vector `tmp` to store intermediate values. It's important not to create a new vector every frame for this. Also notice that we have to call `setLocalPosition` to apply the updated position.

Finally, for a nice effect we add rotate the ball by the angular speed value using `entity.rotate()`. This isn't very physically accurate, but it looks nice.

#### Responding to input

You may remember from [Part 2](/tutorials/keepyup-part-two/) that the `input.js` script checked to see if an input has hit the ball and if so it calls the `tap()` method. The `tap()` method defined above applies a direct change to the velocity and the angular speed of the ball. We use a couple of our script attributes `this.speedMult` and `this.angMult` to multiply the new velocity and angular speed to match our expectations of the gameplay.

We also use the tap method to trigger a particle dust cloud at the point of impact and play a sound effect. We'll talk about particle and sounds in [Part 5](/tutorials/keepyup-part-five/).

## Summary

The ball script runs a simple physical simulation to make the ball fall under gravity and respond to taps. It also listens for game events to know when to pause and reset. Finally, it interacts with some other systems to show particle effects and play sounds.
