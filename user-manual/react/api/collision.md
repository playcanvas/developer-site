# `<Collision/>`

The `<Collision/>` component attaches a PlayCanvas [Collision Component](https://api.playcanvas.com/engine/classes/CollisionComponent.html) to an [Entity](https://developer.playcanvas.com/user-manual/react/api/entity.md).

It allows an Entity to participate in collision detection with other entities that have collision components. This is useful for physics simulations, trigger zones, and other gameplay mechanics that require detecting when objects intersect.

:::note
Enable physics by installing `sync-ammo` and enabling physics on the Application using `<Application usePhysics/>`.
:::

## Usage

You attach a Collision component to an Entity in the same way you would attach a Render component. To work with physics, you should also attach a `Rigidbody` component to the same `Entity`, and probably a `Render` component too.

```jsx copy
import { Application, Entity } from '@playcanvas/react'
import { Collision, Rigidbody, Render } from '@playcanvas/react/components'

export default function Scene() {
  return (
    <Application usePhysics>
      <Entity>
        <Collision type="box" />
        <Rigidbody type="dynamic" mass={12} />
        <Render type="box" />
      </Entity>
    </Application>
  )
}
```

Learn more about [Collision Components](https://api.playcanvas.com/engine/classes/CollisionComponent.html) in the PlayCanvas documentation. Also see the [Rigidbody](https://developer.playcanvas.com/user-manual/react/api/rigidbody.md) component for more information on how to use collision components with physics.

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `type?` | `"box" \| "capsule" \| "compound" \| "cone" \| "cylinder" \| "mesh" \| "sphere"` | - | Sets the type of the collision volume. Can be: - "box": A box-shaped collision volume. - "capsule": A capsule-shaped collision volume. - "compound": A compound shape. Any descendant entities with a collision component of type box, capsule, cone, cylinder or sphere will be combined into a single, rigid shape. - "cone": A cone-shaped collision volume. - "cylinder": A cylinder-shaped collision volume. - "mesh": A collision volume that uses a model asset as its shape. - "sphere": A sphere-shaped collision volume. Defaults to "box". Gets the type of the collision volume. |
| `halfExtents?` | `[number, number, number]` | - | Sets the half-extents of the box-shaped collision volume in the x, y and z axes. Defaults to `[0.5, 0.5, 0.5]`. Gets the half-extents of the box-shaped collision volume in the x, y and z axes. Use the setter to update the collision shape. |
| `linearOffset?` | `[number, number, number]` | - | Sets the positional offset of the collision shape from the Entity position along the local axes. Defaults to `[0, 0, 0]`. Gets the positional offset of the collision shape from the Entity position along the local axes. Use the setter to update the collision shape. |
| `angularOffset?` | `[number, number, number, number]` | - | Sets the rotational offset of the collision shape from the Entity rotation in local space. Defaults to identity. Gets the rotational offset of the collision shape from the Entity rotation in local space. Use the setter to update the collision shape. |
| `radius?` | `number` | - | Sets the radius of the sphere, capsule, cylinder or cone-shaped collision volumes. Defaults to 0.5. Gets the radius of the sphere, capsule, cylinder or cone-shaped collision volumes. |
| `axis?` | `number` | - | Sets the local space axis with which the capsule, cylinder or cone-shaped collision volume's length is aligned. 0 for X, 1 for Y and 2 for Z. Defaults to 1 (Y-axis). Gets the local space axis with which the capsule, cylinder or cone-shaped collision volume's length is aligned. |
| `height?` | `number` | - | Sets the total height of the capsule, cylinder or cone-shaped collision volume from tip to tip. Defaults to 2. Gets the total height of the capsule, cylinder or cone-shaped collision volume from tip to tip. |
| `asset?` | `number \| Asset \| null` | - | Sets the asset or asset id for the model of the mesh collision volume. Defaults to null. Gets the asset or asset id for the model of the mesh collision volume. |
| `renderAsset?` | `number \| Asset \| null` | - | Sets the render asset or asset id of the mesh collision volume. Defaults to null. If not set then the asset property will be checked instead. Gets the render asset id of the mesh collision volume. |
| `convexHull?` | `boolean` | - | Sets whether the collision mesh should be treated as a convex hull. When false, the mesh can only be used with a static body. When true, the mesh can be used with a static, dynamic or kinematic body. Defaults to `false`. Gets whether the collision mesh should be treated as a convex hull. |
| `shape?` | `any` | - |  |
| `model?` | `Model \| null` | - | Sets the model that is added to the scene graph for the mesh collision volume. Gets the model that is added to the scene graph for the mesh collision volume. |
| `render?` | `any` | - |  |
| `checkVertexDuplicates?` | `boolean` | - | Sets whether checking for duplicate vertices should be enabled when creating collision meshes. Gets whether checking for duplicate vertices should be enabled when creating collision meshes. |
| `system?` | `ComponentSystem` | - | The ComponentSystem used to create this Component. |
| `entity?` | `Entity` | - | The Entity that this Component is attached to. |
| `enabled?` | `boolean` | - | Sets the enabled state of the component. Gets the enabled state of the component. |
