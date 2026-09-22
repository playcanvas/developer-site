---
title: Joint
description: PlayCanvas Joint component constrains two rigid bodies, or one rigid body to a fixed point in world space, as a fixed, ball, hinge, slider or 6DoF joint.
---

The Joint Component constrains two rigid bodies, or constrains one rigid body to a fixed point in world space.

<video autoPlay muted loop controls src='/video/editor-joint-component.mp4' style={{width: '100%', height: 'auto'}} />

## Prerequisites

The Joint Component is driven by the Ammo physics backend, so two things must be in place before it does anything:

- **Ammo must be imported into the project.** Until it is, the component panel shows an `Ammo module not found` warning with an import button. See [Physics](/user-manual/physics) for how to add it.
- **Both referenced entities need a [Rigid Body Component](rigidbody.md)**, each with a [Collision Component](collision.md) to give it a shape.

Leave `Entity B` empty to constrain `Entity A` to a fixed point in world space instead of to a second body.

## Joint types

`Type` selects a fixed, ball, hinge, slider, or six degrees of freedom joint. The inspector options are **Fixed**, **Ball**, **Hinge**, **Slider** and **6DoF**.

The type decides which of the remaining fields the inspector shows, so the panel changes as you switch between them:

| Type | Additional fields |
|------|-------------------|
| Fixed | None — only the always-shown properties. |
| Ball | Enable Limits, and the swing and twist limits when it is on. |
| Hinge | Enable Limits, Limits, Motor Speed, Max Motor Force. |
| Slider | Enable Limits, Limits, Motor Speed, Max Motor Force. |
| 6DoF | The per-axis Linear and Angular motion, limit and spring fields. |

<video autoPlay muted loop controls src='/video/editor-joint-bridge-launch.mp4' style={{width: '100%', height: 'auto'}} />

A chain of planks, each held to the next by a joint, launched from the Editor.

## Properties

### Always shown

| Property | Description |
|----------|-------------|
| Type | Selects a fixed, ball, hinge, slider, or six degrees of freedom joint. |
| Entity A | First constrained entity. It must have a rigid body component. |
| Entity B | Second constrained entity. Leave empty to constrain Entity A to world space. |
| Enable Collision | Allow the two constrained bodies to collide with each other. |
| Break Impulse | Impulse above which the joint breaks. Leave empty for an unbreakable joint. |

### Limits

`Enable Limits` is shown for the Ball, Hinge and Slider types.

| Property | Description |
|----------|-------------|
| Enable Limits | Enable the configured hinge, slider, or ball-joint limits. |

### Hinge and Slider

`Motor Speed` and `Max Motor Force` do not depend on `Enable Limits`.

| Property | Description |
|----------|-------------|
| Limits | Lower and upper angular hinge limits or linear slider limits. Only shown when Enable Limits is on. |
| Motor Speed | Target angular hinge speed or linear slider speed. |
| Max Motor Force | Maximum motor force or torque. Set to 0 to disable the motor. |

### Ball

Only shown when `Enable Limits` is on.

| Property | Description |
|----------|-------------|
| Swing Limit Y | Maximum ball-joint swing towards its Y axis in degrees. |
| Swing Limit Z | Maximum ball-joint swing towards its Z axis in degrees. |
| Twist Limit | Maximum ball-joint twist about its X axis in degrees. |

### 6DoF

The six degrees of freedom type replaces the fields above with a per-axis grid — Linear and Angular, each for X, Y and Z.

| Property | Description |
|----------|-------------|
| Linear Motion X / Y / Z | Selects whether linear motion on that axis is locked, limited, or free. |
| Linear Limits X / Y / Z | Lower and upper limits used when linear motion on that axis is limited. |
| Linear Stiffness | Stiffness of the linear springs on the X, Y and Z axes. |
| Linear Damping | Damping of the linear springs on the X, Y and Z axes. |
| Linear Equilibrium | Rest positions of the linear springs on the X, Y and Z axes. |
| Angular Motion X / Y / Z | Selects whether angular motion on that axis is locked, limited, or free. |
| Angular Limits X / Y / Z | Lower and upper limits used when angular motion on that axis is limited. |
| Angular Stiffness | Stiffness of the angular springs about the X, Y and Z axes. |
| Angular Damping | Damping of the angular springs about the X, Y and Z axes. |
| Angular Equilibrium | Rest angles of the angular springs about the X, Y and Z axes. |

A `Limits` field only appears once its corresponding `Motion` field is set to **Limited**.

## Editing a joint at runtime

<video autoPlay muted loop controls src='/video/editor-joint-bridge-sim.mp4' style={{width: '100%', height: 'auto'}} />

A bridge of jointed planks simulating in a running application.

Two behaviours are worth knowing when you change joint properties from a script:

- Setting `type` destroys and recreates the constraint, which also clears the broken flag. It does not pull already-separated bodies back together.
- Setting a limit such as `swingLimitY` calls the constraint's limit update, so limits are live-editable while the application is running.

## See Also

- [Rigid Body Component](rigidbody.md) - Required on both constrained entities
- [Collision Component](collision.md) - Defines each rigid body's shape
- [Physics](/user-manual/physics) - Learn more about the physics system

## Scripting Interface

You can control a Joint Component's properties using a [Script Component](script.md). The Joint Component's scripting interface is [here](https://api.playcanvas.com/engine/classes/JointComponent.html).
