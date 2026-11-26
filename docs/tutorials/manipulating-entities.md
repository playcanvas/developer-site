---
title: Manipulating Entities
description: Move, rotate, and scale entities by editing local and world transforms and understanding how child hierarchies inherit motion.
tags: [basics]
kind: tutorial
topic: Basics
thumb: /img/tutorials/manipulating-entities/thumbnail.webp
---

In this tutorial we'll show you how you can change an Entity's position, orientation and scale.

Entities form the basis of most applications built using the PlayCanvas framework. An Entity can represent anything from the player character, a bullet, an enemy or just simply be a point in space.

Entities are a special form of graph node. They inherit a lot of their behavior from [`GraphNode`](https://api.playcanvas.com/engine/classes/GraphNode.html). All the manipulations we apply below can also be applied to graph nodes.

One of the most common operations you will need to perform on Entities is to change their transform. The local transform property of the Entity determines the position, orientation and scale of the Entity and affects all child Entities as well. Learning how to manipulate the transform is critical to making interesting and interactive applications.

### Local and World Coordinates

An important part of understanding how to move and manipulate Entities is understanding local and world coordinate systems. The world coordinate system is shared by all Entities. It has a fixed origin `(0,0,0)` and a fixed orientation, where `(0,1,0)` is up. The local coordinate system is relative to the Entity itself. So the local origin is the Entity position, and the orientation follows the orientation of the Entity.

Here is a visual representation of the world-space coordinate system (left) and the local-space coordinate system (right) of an entity:

![World and Local Coordinate Systems](/img/tutorials/world-and-local.webp)

### Hierarchy

An important part of the Entity system to understand is the Entity Graph or Hierarchy. As Entities are a type of graph node they are collected together in a graph or a hierarchy of parents and children. Each Entity can have a single parent and multiple children. Child Entities inherit transformation information from their parents. An Entity's world transform is calculated by multiplying its local transform by the world transform of its parent. So, for example, if a child Entity has a local position of `(1,0,0)` and its parent has a local position of `(0,1,0)`, the world position of the child will be `(1,1,0)`.

## Position

Getting the position of an entity is straightforward:

```javascript
// Get the entity's position relative to the coordinate system of the entity's parent
const lp = entity.getLocalPosition();

// Get the entity's position in world space
const wp = entity.getPosition();
```

These methods both return a [`Vec3`](https://api.playcanvas.com/engine/classes/Vec3.html), a vector with `x`, `y` and `z` properties.

Setting the position of an entity is just as straightforward. You can pass three numbers or a `Vec3`:

```javascript
// Set the entity's position relative to the coordinate system of the entity's parent
entity.setLocalPosition(x, y, z);

// Set the entity's position in world space
entity.setPosition(x, y, z);
```

### Moving the entity

To move the Entity you can add to the Entity's position, or you can use the helper functions `translate` and `translateLocal`.

```javascript
// Translate the entity 1 unit down the positive x axis of world space
entity.translate(1, 0, 0);

// Translate the entity 1 unit down the entity's local z axis
entity.translateLocal(0, 0, 1);
```

## Orientation

To set an Entity's orientation you can either set an absolute rotation, or apply an incremental rotation.

Setting absolute rotations can be done using either [Euler angles](https://en.wikipedia.org/wiki/Euler_angles) or [quaternions](https://en.wikipedia.org/wiki/Quaternion). The Wikipedia explanations of these two mathematical representations of rotation are a little hard to follow but the basics are easy to understand. Here are the important facts:

### Euler Angles

* Euler angles are three rotations in degrees about the X, Y and Z axes of a coordinate system *in that order*.
* If looking down a coordinate system axis, a positive Euler angle will result in an anti-clockwise rotation around that axis.
* Euler angles are easy to understand because you can visualize the effect they will have in your head.

### Quaternions

* Quaternions are stored as 4 numbers and represent any orientation in 3D space.
* They are difficult to set directly, but can be set from Euler angles, rotation matrices or an axis-angle representation.
* Although they are hard to visualize, they are useful since they are robust and can be quickly interpolated (when animating rotation).

When scripting entities, it is more likely that you will set an Entity's rotation using Euler angles. For example:

```javascript
// Rotate 30 degrees anticlockwise around the x axis of the parent entity's coordinate
// system and then 45 degrees around its y axis and lastly 60 degrees around its z axis
entity.setLocalEulerAngles(30, 45, 60);

// Rotate 30 degrees anticlockwise around the world space x axis and then 45 degrees
// around the world space y axis and lastly 60 degrees around the world space z axis
entity.setEulerAngles(30, 45, 60);
```

However, if you do want to set an Entity's rotation in quaternion form, you can use the following functions:

```javascript
// Create an identity rotation
const q = new Quat();
// Set the entity to have the same rotation as its parent - equivalent to
// entity.setLocalEulerAngles(0, 0, 0)
entity.setLocalRotation(q);

// Set the entity to have no rotation with respect to the world space coordinate
// system  - equivalent to entity.setEulerAngles(0, 0, 0)
entity.setRotation(q);
```

To rotate an Entity incrementally, you can use `rotate` to rotate the Entity with respect to world space axes or `rotateLocal` to rotate with respect to the Entity's current axes.

For example, to rotate an Entity by 180 degrees around the world up axis:

```javascript
entity.rotate(0, 180, 0);
```

Or to rotate the Entity 90 degrees around its local x axis:

```javascript
entity.rotateLocal(90, 0, 0);
```

## Scale

To scale an Entity, call `setLocalScale`:

```javascript
// Scale the entity by a factor of 2 in the local Y axis
entity.setLocalScale(1, 2, 1);
```

And here is a slightly more interesting example:

```javascript
// Scale the entity using a sine function over time
this.timer += dt;
const s = Math.sin(this.timer) + 1;
entity.setLocalScale(s, s, s);
```

Note that you cannot set an Entity's scale in world space.

## Putting It Together

Transforms are usually changed a little every frame, in the `update` method of a [script](/user-manual/scripting/). This script spins its Entity around the world up axis and moves it up and down:

```javascript
import { Script } from 'playcanvas';

export class SpinAndBob extends Script {
    static scriptName = 'spinAndBob';

    timer = 0;

    update(dt) {
        this.timer += dt;

        // Rotate 90 degrees per second around the world up axis
        this.entity.rotate(0, 90 * dt, 0);

        // Move up and down between a height of 0.5 and 1.5
        const lp = this.entity.getLocalPosition();
        this.entity.setLocalPosition(lp.x, 1 + Math.sin(this.timer) * 0.5, lp.z);
    }
}
```

Multiplying by `dt`, the time in seconds since the last frame, keeps the speed the same whatever the frame rate.
