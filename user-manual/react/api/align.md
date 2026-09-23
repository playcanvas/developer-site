# `<Align/>`

The `<Align/>` component is a simple container that positions an entity relative to its parent. This can be useful when using 3D assets that are offset from the origin. Sometimes, you just want to sit the asset on the ground, or align it with the camera.

The `<Align/>` component accepts the following props: `top`, `bottom`, `left`, `right`, `front`, `back`.

## Usage

This example will align the asset to the bottom right of the parent entity.

```jsx copy
import { Entity } from '@playcanvas/react'
import { Align, Render } from '@playcanvas/react/components'

export default function Scene() {
  return (
    <Entity>
      <Align bottom right>
        <Render type="box" />
      </Align>
    </Entity>
  )
}
```

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `left?` | `boolean` | - |  |
| `right?` | `boolean` | - |  |
| `top?` | `boolean` | - |  |
| `bottom?` | `boolean` | - |  |
| `front?` | `boolean` | - |  |
| `back?` | `boolean` | - |  |
| `children?` | `ReactNode` | - |  |
