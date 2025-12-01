---
title: Animation
---

PlayCanvas provides a powerful state-based animation system which can be used to animate character models and other arbitrary scene object models. Users can work with any of their .FBX animation assets. These can be organized using animation state machines to easily control the animated behavior of scene models at runtime.

## System Overview

The animation system touches on three main areas of the PlayCanvas platform. This section will walk through how these areas can be used together to create complex animation behavior for your models. The following sections of the animation user manual then will explore each area in more detail.

### Animating in PlayCanvas

In order to begin animating a PlayCanvas entity, you must have a set of animation assets available and imported into your PlayCanvas project. These animation assets will drive the animation of a given model you wish to animate. For example a humanoid character may have a set of animations; Idle, Walk, Jump.

![Animations](/img/user-manual/anim/animations.gif)

These three animations can be organized into a single animation system to create a simple locomotion system for that character. The way this is achieved in PlayCanvas is through the use of an animstategraph asset. These assets can be thought of as state machines for an entity’s animation behavior. With each state in this asset relating to an animation, the state machine can be set up to define the complex animation behavior of an entity’s model. This includes defining when the system should stop one animation and start another and how the transition between these animations should be blended.

The anim component is then used to assign an animstategraph asset to a particular entity in your scene. Once an entity has been assigned an animstategraph asset, each state in the graph can have an actual animation asset assigned to it. Once all states have been assigned animations, the anim component will become playable. At this point the animation system is complete and the defined animation behavior will be viewable in the PlayCanvas launcher.
