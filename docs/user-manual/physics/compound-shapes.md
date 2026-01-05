---
title: Compound Shapes
---

Compound shapes are custom collision shapes created out of multiple primitive shapes ([full list of shapes here](/user-manual/physics/physics-basics/#rigid-bodies)). This allows you to have more complex collision shapes without using a custom mesh model.

The main advantage is that you are able to have dynamic rigidbody collisions between compound shapes (shown below) which is not possible with mesh collision types.

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/KXZ5Lsda/" title="Compound Physic Shapes" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

[PlayCanvas project link](https://playcanvas.com/project/688146/overview/compound-physics-shapes)

The shape of a compound physics object is defined by the children's collision shapes as shown below.

![Compound shapes setup](/img/user-manual/physics/compound-shape-chair-setup.png)

![Compound shapes chair](/img/user-manual/physics/compound-shape-chair.gif)

The Chair entity (parent) has the [collision component](/user-manual/editor/scenes/components/collision/) with type set to 'Compound'.

The children entities will form the shape of the physics object with collision components and the type set to a primitive shape and positioned relative to the parent.

The parent is also the center of mass of the physics object and it is recommended to have it within the bounds of the shape of the object (usually the center). If not, the object may show odd behavior when forces and torque are applied such as rotating around an invisible pivot in the world.
