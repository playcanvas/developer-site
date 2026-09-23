# `<Entity/>`

The `<Entity/>` component is the fundamental building block of a React application. It represents a node in the scene graph hierarchy and can contain other entities as children, as well as components that define its behavior and appearance.

```jsx copy
import { Entity } from '@playcanvas/react'

export default function Scene() {
  return (
    <Entity>
      <Entity name="child" />
      <Entity name="other-child">
        <Entity name="nested-child" />
      </Entity>
    </Entity>
  )
}
```

An `<Entity/>` is a transform node, which has position, rotation and scale. On its own, it has no behavior. To allow it to render something, react to physics or behave like a camera you must add behavior using components.

:::tip

An `<Entity/>` on its own has no behavior. You can add Components to an `<Entity/>` to give it behavior. Components are the building blocks of behavior in PlayCanvas.

:::

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `name?` | `string` | `"Untitled"` | The name of the entity |
| `position?` | `[number, number, number]` | `[0, 0, 0]` | The local position of the entity relative to its parent. You can use the `position` prop to set the position of the entity. |
| `scale?` | `[number, number, number]` | `[1, 1, 1]` | The local scale of the entity relative to its parent. You can use the `scale` prop to set the scale of the entity. |
| `rotation?` | `[number, number, number]` | `[0, 0, 0]` | The local rotation of the entity relative to its parent. The rotation is specified as euler angles in degrees. |
| `onPointerUp?` | `PointerEventCallback` | `null` | The callback for the pointer up event |
| `onPointerDown?` | `PointerEventCallback` | `null` | The callback for the pointer down event |
| `onPointerOver?` | `PointerEventCallback` | `null` | The callback for the pointer over event |
| `onPointerOut?` | `PointerEventCallback` | `null` | The callback for the pointer out event |
| `onClick?` | `MouseEventCallback` | `null` | The callback for the click event |
| `children?` | `ReactNode` | - |  |
| `tags?` | `Tags` | - | Interface for tagging graph nodes. Tag based searches can be performed using the findByTag function. |
| `enabled?` | `boolean` | - | Sets the enabled state of the GraphNode. If one of the GraphNode's parents is disabled there will be no other side effects. If all the parents are enabled then the new value will activate or deactivate all the enabled children of the GraphNode. Gets the enabled state of the GraphNode. |
| `ref?` | `Ref<Entity> \| undefined` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). |
| `key?` | `Key \| null \| undefined` | - |  |
