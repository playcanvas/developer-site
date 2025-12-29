---
title: Particle System
---

The Particle System component specifies a particle emitter in 3D space.

The Particle System component can be enabled or disabled using the toggle in the top right of the component panel. If enabled, the particle system will be added to the scene and rendered.

![Particle System component](/img/user-manual/scenes/components/component-particle-system.png)

## Properties

| Property        | Description |
|-----------------|-------------|
| Auto Play       | If checked, the particle system will play immediately on creation. If this option is left unchecked, you will need to call the particle system component's play function from script. |
| Particle Count  | The maximum number of particles managed by this particle system. |
| Lifetime        | The length of time in seconds between a particle's birth and its death. |
| Emission Rate   | The lower bound of the time range defining the interval between particle births. The time for the next particle emission will be chosen at random between 'Emission Rate' and 'Emission Rate 2'. |
| Emission Rate2  | The upper bound of the time range defining the interval between particle births. The time for the next particle emission will be chosen at random between 'Emission Rate' and 'Emission Rate 2'. |
| Start Angle     | The lower bound of the initial particle rotation specified in degrees. For each particle, this angle is chosen at random between 'Start Angle' and 'Start Angle 2'. |
| Start Angle2    | The upper bound of the initial particle rotation specified in degrees. For each particle, this angle is chosen at random between 'Start Angle' and 'Start Angle 2'. |
| Loop            | If checked, the particle system will emit indefinitely. Otherwise, it will emit the number of particles specified by the 'Particle Count' property and then stop. |
| Pre Warm        | If enabled, the particle system will be initialized as though it had already completed a full cycle. This option is only available for looping particle systems. |
| Lighting        | If checked, the particle will be lit by the directional and ambient light in the scene. In some circumstances, it may be advisable to set a normal map on the particle system in order to achieve more realistic lighting. |
| Half-Lambert    | Enabling Half Lambert lighting avoids particles looking too flat when lights appear to be shining towards the back sides of the particles. It is a completely non-physical lighting model but can give more pleasing visual results. This option is only available when Lighting is enabled. |
| Color Intensity | Scales the color of particles to allow them to have arbitrary brightness. |
| Depth Test      | If checked, the particles will write depth information to the depth buffer. If unchecked, the depth buffer is left unchanged and particles will be guaranteed to overwrite one another in the order in which they are rendered. |
| Depth Softening | This variable value determines how much particles fade out as they get closer to another surface. This avoids the situation where particles appear to cut into surfaces. Setting this value to zero effectively disables depth softening. Setting a value greater than zero requires the scene to be rendered to a depth target for depth comparisons to be performed. This can have a significant performance impact by increasing the overall number of draw calls submitted every frame. |
| Sorting Mode    | Sorting mode gives you control over the order in which particles are rendered. The options are: <ul><li>None: Particles are rendered in arbitrary order. When this option is selected, the particle system is simulated on the GPU (if the underlying hardware supports floating point textures) and it is recommended you use this setting to get the best performance.</li><li>Camera Distance: Particles are sorted on the CPU and rendered in back to front order (in terms of camera z depth).</li><li>Newer First: Particles are sorted on the CPU and rendered in age order, youngest first.</li><li>Older First: Particles are sorted on the CPU and rendered in age order, oldest first.</li></ul> |
| Blending Mode   | The blending mode determines how particles are composited when they are written to the frame buffer. Let's consider that Prgb is the RGB color of a particle's pixel, Pa is its alpha value, and Drgb is the RGB color already in the frame buffer. The blending options are: <ul><li>Additive: Prgb + Drgb</li><li>Alpha: Prgb x Pa + Drgb x (1 - Pa)</li><li>Multiply: Prgb * Drgb</li></ul> |
| Stretch         | A value in world units that controls the amount by which particles are stretched based on their velocity. Particles are stretched from their center towards their previous position. |
| Align To Motion | Orient particles in their direction of motion. |
| Spawn Bounds    | The half extents of a local space bounding box within which particles are spawned at random positions. |
| Wrap            | Enables wrap bounds. |
| Wrap Bounds     | World space AABB volume centered on the owner entity's position. If a particle crosses the boundary of one side of the volume, it teleports to the opposite side. You can use this to make environmental effects like rain by moving a wrapped emitter's owner entity. |
| Color Map       | The color map texture to apply to all particles in the system. If no texture asset is assigned, a default spot texture is used. |
| Normal Map      | The normal map texture to apply to all particles in the system. Applying a normal map can make billboard particles appear more consistent with the scenes lighting. |
| Particle Mesh   | A model asset. The first mesh found in the model is used to represent all particles rather than a flat billboard. |
| Local Velocity  | A curve defining how each particle's velocity with respect to the particle system's local coordinate system changes over time. If two curves are specified in the curve editor, local velocity will be a random lerp between both curves. |
| Velocity        | A curve defining how each particle's velocity with respect to the world coordinate system changes over time. If two curves are specified in the curve editor, velocity will be a random lerp between both curves. |
| Rotation Speed  | A curve defining how each particle's angular velocity changes over time. If two curves are specified in the curve editor, the angular velocity will be a random lerp between both curves. |
| Scale           | A curve defining how each particle's scale changes over time. By default, a particle is 1 unit in width and height. If two curves are specified in the curve editor, the scale will be a random lerp between both curves. |
| Color           | A curve defining how each particle's color changes over time. |
| Lifetime        | A curve defining how each particle's opacity changes over time. If two curves are specified in the curve editor, the opacity will be a random lerp between both curves. |

## Scripting Interface

You can control a Particle System component's properties using a [script component][2]. The Particle System component's scripting interface is [here][3].

[2]: /user-manual/editor/scenes/components/script
[3]: https://api.playcanvas.com/engine/classes/ParticleSystemComponent.html
