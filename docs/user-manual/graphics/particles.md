---
title: Particles
---

PlayCanvas provides comprehensive support for creating and editing particle systems.

## What is a Particle System?

A particle system is a simulation that manages many independently moving particles. They can be used to approximate a huge number of effects such as rain, snow, smoke, fire and so on.

Note that particles are not physically simulated. They do not interact or collide with each other. They will pass through surfaces in your scene.

## Creating a Particle System

In the Editor's 3D View, an unselected particle system is represented with the following icon:

![Particle system icon](/img/user-manual/graphics/particles/particle_system_icon.png)

To create a new particle system, simply create a new entity and add a particle system component to it. For convenience, the Editor menu has an item that does this in a single step:

![Particle system creation](/img/user-manual/graphics/particles/particle_system_create.png)

A newly created particle system with the default settings looks like this:

![Default particle system](/img/user-manual/graphics/particles/particle_system_default.gif)

To configure the particle system via the particle system component interface, consult the reference [here][4].

## Triggering a Particle System in Script

Sometimes, you might want a particle system to play in response to some event or at a particular time. For example, an explosion should play when a missile reaches its target. To do this, ensure that the Autoplay option is disabled for your particle system. Then, attach a script component to your particle system entity. The following two lines will start (or restart) a particle system:

```javascript
this.entity.particlesystem.reset();
this.entity.particlesystem.play();
```

## Soft Particles

Soft particles are particles that are faded out near their intersections with scene geometry. If soft particles are enabled by using [```depthSoftening```][5], the camera which renders the particles needs to have a [Depth Map][6] rendering enabled.

[4]: /user-manual/editor/scenes/components/particlesystem
[5]: https://api.playcanvas.com/engine/classes/ParticleSystemComponent.html#depthsoftening
[6]: /user-manual/graphics/cameras/depth-layer
