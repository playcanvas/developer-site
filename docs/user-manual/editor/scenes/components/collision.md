---
title: Collision
---

The Collision component assigns a collision volume to the entity. The component interface dynamically displays different attributes based on the 'Type' attribute.

The Collision component can be enabled or disabled using the toggle in the top right of the component panel. If enabled and if the component is a trigger volume (because it has no sibling rigidbody component), the trigger volume will be enabled. Likewise, if the component does have a sibling rigidbody component, the rigidbody will be enabled.

#### Box

![Collision component (Box)](/img/user-manual/editor/scenes/components/component-collision-box.png)

#### Capsule

![Collision component (Capsule)](/img/user-manual/editor/scenes/components/component-collision-capsule.png)

#### Compound

![Collision component (Compound)](/img/user-manual/editor/scenes/components/component-collision-compound.png)

#### Cone

![Collision component (Cone)](/img/user-manual/editor/scenes/components/component-collision-cone.png)

#### Cylinder

![Collision component (Cylinder)](/img/user-manual/editor/scenes/components/component-collision-cylinder.png)

#### Mesh

![Collision component (Mesh)](/img/user-manual/editor/scenes/components/component-collision-mesh.png)

#### Sphere

![Collision component (Sphere)](/img/user-manual/editor/scenes/components/component-collision-sphere.png)

If the entity also has a rigidbody component, the collision component determines the shape of the rigid body. If no rigidbody component is present, the collision component is treated as a trigger volume. The trigger volume cannot affect the simulation of other rigid bodies in the scene. Instead, you can add a script component and attach a script which responds to trigger events. For example, if another entity that has a rigidbody component enters or exits the trigger, your script can be notified.

## Properties

| Property        | Description |
|-----------------|-------------|
| Type            | The type of collision primitive. Can be: Box, Sphere, Capsule, Cylinder, Cone, Mesh, or Compound. |
| Half Extents    | Box only. The half-extents of the collision box. This is a 3-dimensional vector: local space half-width, half-height, and half-depth. |
| Radius          | Sphere, Capsule, Cylinder, and Cone only. The radius of the collision shape. |
| Height          | Capsule, Cylinder, and Cone only. The height of the collision shape along the selected axis. |
| Axis            | Capsule, Cylinder, and Cone only. Aligns the collision shape with the local-space X, Y, or Z axis of the entity. |
| Convex Hull     | Mesh only. If enabled, the collision mesh will be treated as a convex hull, which is more efficient for dynamic rigid bodies. If disabled, the mesh is used as a triangle mesh (concave), which only works with static or kinematic rigid bodies. |
| Model Asset     | Mesh only. The model asset that will be used as a source for the collision mesh. Either a Model Asset or Render Asset can be specified, but not both. |
| Render Asset    | Mesh only. The [render asset](/user-manual/assets/types/render) that will be used as a source for the collision mesh. Either a Model Asset or Render Asset can be specified, but not both. |
| Position Offset | The positional offset of the collision shape relative to the entity's position. |
| Rotation Offset | The rotational offset of the collision shape relative to the entity's rotation, specified in degrees. |

## Scripting Interface

You can control a Collision component's properties using a [script component](/user-manual/editor/scenes/components/script). The Collision component's scripting interface is [here](https://api.playcanvas.com/engine/classes/CollisionComponent.html).
