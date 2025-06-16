---
title: Rigid Body
---

The Rigid Body component enables an entity to participate in the scene's physics simulation. This allows the movement of an entity to be simulated realistically. The component interface dynamically displays different attributes based on the 'Type' attribute.

The Rigid Body component can be enabled or disabled using the toggle in the top right of the component panel. If enabled and if the component has a sibling collision component, the rigid body will participate in the physics simulation.

#### Static

![Rigid Body component (Static)](/img/user-manual/scenes/components/component-rigid-body-static.png)

#### Dynamic

![Rigid Body component (Dynamic)](/img/user-manual/scenes/components/component-rigid-body-dynamic.png)

#### Kinematic

![Rigid Body component (Kinematic)](/img/user-manual/scenes/components/component-rigid-body-kinematic.png)

Note that you must add a [collision component][4] to the same entity in order to define the shape of the rigid body. Otherwise, the Rigid Body component has no effect and will not participate in the physics simulation.

## Properties

| Property        | Description |
|-----------------|-------------|
| Type            | The type of the body: <ul><li>Static</li><li>Dynamic</li><li>Kinematic</li></ul> |
| Mass            | The mass of the body. If world units in your scene are meters, the unit for mass is kilograms. |
| Linear Damping  | Specifies the proportion of linear velocity that is lost by the body every second. |
| Angular Damping | Specifies the proportion of angular velocity that is lost by the body every second. |
| Linear Factor   | Multiplier for a body's linear movement in each world axis. If set to 0 for any axis no movement will occur in this axis - useful for the creation of 2D games or 1D/2D movement. |
| Angular Factor  | Multiplier for a body's angular (rotational) movement about each world axis. If set to 0 for any axis, no rotation will occur around this axis. |
| Friction        | Controls how quickly a body loses velocity when in contact with other bodies. |
| Restitution     | A measure of the bounciness of a body between 0 and 1. Warning: setting to 1 means a moving body will never come to a stop (unless  colliding with other bodies with restitutions below 1, or unless a stop is scripted). |

## Scripting Interface

You can control a Rigid Body component's properties using a [script component][5]. The Rigid Body component's scripting interface is [here][6].

[4]: /user-manual/scenes/components/collision/
[5]: /user-manual/scenes/components/script
[6]: https://api.playcanvas.com/engine/classes/RigidBodyComponent.html
