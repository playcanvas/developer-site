# `usePhysics`

The `usePhysics` hook provides information on the physics engine state. It allows you to check if physics is enabled, loaded, and to handle any physics-related errors.

PlayCanvas React lazily loads and instantiates the physics engine allowing you to render content ahead of time. The `usePhysics` provides a reactive mechanism to check the physics engine state.

You can read more about the physics system in the [Physics guide](https://developer.playcanvas.com/user-manual/react/guide/physics.md) or the [Rigidbody](https://developer.playcanvas.com/user-manual/react/api/rigidbody.md) and [Collision](https://developer.playcanvas.com/user-manual/react/api/collision.md) components.

## Usage

### Conditional Rendering

```jsx copy
import { usePhysics } from '@playcanvas/react/hooks'

function PhysicsInfo() {
  const { isPhysicsEnabled, isPhysicsLoaded, physicsError } = usePhysics()

  if (!isPhysicsLoaded) return null
  
  return (<Entity>
    <Rigidbody type="box" />
    <Collision type="box" />
    <Render type="box" />
  </Entity>)
}
```

### Safe Physics Component Creation

```jsx copy
import { usePhysics } from '@playcanvas/react/hooks'

function SafePhysicsEntity() {
  const { isPhysicsEnabled, isPhysicsLoaded } = usePhysics()
  
  return (
    <Entity>
      <Render type="box" />
      {isPhysicsEnabled && isPhysicsLoaded && (
        <>
          <Collision type="box" />
          <Rigidbody type="dynamic" mass={5} />
        </>
      )}
    </Entity>
  )
}
```

### Physics with Fallback

```jsx copy
import { usePhysics } from '@playcanvas/react/hooks'

function PhysicsWithFallback() {
  const { isPhysicsEnabled, isPhysicsLoaded } = usePhysics()
  
  if (isPhysicsEnabled && isPhysicsLoaded) {
    return (
      <Entity>
        <Collision type="box" />
        <Rigidbody type="dynamic" mass={10} />
        <Render type="box" />
      </Entity>
    )
  }
  
  // Fallback without physics
  return (
    <Entity>
      <Render type="box" />
    </Entity>
  )
}
```

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `isPhysicsEnabled` | `boolean` | - | Whether physics is enabled on the application. |
| `isPhysicsLoaded` | `boolean` | - | Whether the physics library has been successfully loaded. |
| `physicsError` | `Error \| null` | - | The error that occurred when loading physics, if any. |

## Related

- [useApp](https://developer.playcanvas.com/user-manual/react/api/hooks/use-app.md) - Access the Application instance
- [Collision Component](https://developer.playcanvas.com/user-manual/react/api/collision.md) - Create collision components
- [Rigidbody Component](https://developer.playcanvas.com/user-manual/react/api/rigidbody.md) - Create rigidbody components
- [Application Component](https://developer.playcanvas.com/user-manual/react/api/application.md) - Enable physics with usePhysics prop
