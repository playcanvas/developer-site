---
title: Manipulating Entities
tags: [basics]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/186/KM6GIE-image-75.jpg
---

In this tutorial we'll show you how you can change an Entity's position, orientation and scale.

Entities form the basis of most applications built using the PlayCanvas framework. An Entity can represent anything from the player character, a bullet, an enemy or just simply be a point in space.

Entities are a special form of graph node, they inherit a lot of their behavior from `pc.GraphNode`. All the manipulations we apply below can also be applied to graph nodes.

One of the most common operations you will need to perform on Entities is to change its transform matrix. The local transform property of the Entity determines the position, orientation and scale of the Entity and affects all child Entities as well. Learning how to manipulate the transform is critical to making interesting and interactive applications.

### Local and World Co-ordinates

An important part of understanding how to move and manipulate Entities is understanding local and world co-ordinate systems. The world co-ordinate system is shared by all Entities, it has a fixed origin `(0,0,0)` and a fixed orientation - where `(0,1,0)` is up. The local co-ordinate system is relative to the Entity itself. So the local origin is the Entity position, and the orientation follows the orientation of the Entity.

Here is a visual representation of the world-space coordinate system (left) and the local-space coordinate system (right) of an entity:

![World and Local Coordinate Systems](/img/tutorials/world-and-local.png)

### Hierarchy

An important part of the Entity system to understand is the Entity Graph or Hierarchy. As Entities are a type of graph node they are collected together in a graph or a hierarchy of parents and children. Each Entity can have a single parent and multiple children. Child Entities inherit transformation information from their parents. An Entity's world transformation matrix is multiplying the local transform by the world transform of the parent Entity. So, for example, if a child Entity has a local translation of `(1,0,0)` and it's parent has a local translation of `(0,1,0)`, the world position of the child will be `(1,1,0)`

## Position

Getting the position of the entity is straightforward

```javascript
// Get the entity's position relative to the coordinate system of the entity's parent
var lp = entity.getLocalPosition();

// Get the entity's position in world space
var wp = entity.getPosition();
```

These methods both return a `pc.Vec3` (a vector quantity in the array form [x,y,z]).

Setting the position of an entity is just as straightforward.

```javascript
// Set the entity's position relative to the coordinate system of the entity's parent
entity.setLocalPosition(x, y, z);

// Set the entity's position in world space
entity.setPosition(x, y, z);
```

### Moving the entity

To move the Entity you can add to the Entity's position or you can use the helper functions translate and translateLocal.

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
var q = new pc.Quat();
// Set the entity to have the same rotation as its parent - equivalent to
// entity.setLocalEulerAngles(0, 0, 0)
entity.setLocalRotation(q);

// Set the entity to have no rotation with respect to the world space coordinate
// system  - equivalent to entity.setEulerAngles(0, 0, 0)
entity.setRotation(q);
```

To rotate an Entity incrementally, you can use rotate to rotate the Entity with respect to world space axes or rotateLocal to rotate with respect to the Entity's current axes.

For example, to rotate an Entity by 180 degrees around the world up axis:

```javascript
entity.rotate(0, 180, 0);
```

Or to rotate the Entity 90 degrees around its local x axis do:

```javascript
entity.rotateLocal(90, 0, 0);
```

## Scale

To scale an Entity you simply need to call the following function:

```javascript
// Scale the entity by a factor of 2 in the local Y axis
entity.setLocalScale(1, 2, 1);
```

And here is a slightly more interesting example:

```javascript
// Scale the entity using a sine function over time
this.timer += deltaTime;
var s = Math.sin(this.timer) + 1;
entity.setLocalScale(s, s, s);
```

Note that you cannot currently set the Entity's scale in world space.
