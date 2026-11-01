# `<Anim/>`

The `Anim` component enables animation playback for an [Entity](https://developer.playcanvas.com/user-manual/react/api/entity.md). It allows you to play animation clips from animation assets and control their playback.

## Usage

```jsx copy
import { Entity } from '@playcanvas/react'
import { Anim, Render } from '@playcanvas/react/components'
import { useModel } from '@playcanvas/react/hooks'

const AnimatingDinosaur = (props) => {
  const { asset } = useModel('/dinosaur.glb')

  if (!asset) return null

  return (
    <Entity {...props}>
      <Render type="asset" asset={asset} />
      <Anim asset={asset} playing />
    </Entity>
  )
}
```

Given an asset, `<Anim>` puts all of its animations into one state, so with several of them, only the last one plays. To play clips by name, and to use state graphs, layers and events, see the [Animation](https://developer.playcanvas.com/user-manual/animation.md) section.

Always pass `playing`. Each time `<Anim>` renders, it sets every one of its props on the engine component, and the default of `playing` is `false`, so without it the animation stops as soon as anything renders the component again.

Learn more about the [Anim Component](https://api.playcanvas.com/engine/classes/AnimComponent.html) in the PlayCanvas documentation.

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | `Asset<string>` | - | The asset containing the animations to play. Setting this prop will automatically assign the animations to the component. |
| `stateGraphAsset?` | `any` | - |  |
| `normalizeWeights?` | `boolean` | - | Sets whether the animation component will normalize the weights of its layers by their sum total. Gets whether the animation component will normalize the weights of its layers by their sum total. |
| `animationAssets?` | `{}` | - |  |
| `speed?` | `number` | - | Sets the speed multiplier for animation play back speed. 1.0 is playback at normal speed, 0.0 pauses the animation. Gets the speed multiplier for animation play back speed. |
| `activate?` | `boolean` | - | Sets whether the first animation will begin playing when the scene is loaded. Gets whether the first animation will begin playing when the scene is loaded. |
| `playing?` | `boolean` | - | Sets whether to play or pause all animations in the component. Gets whether to play or pause all animations in the component. |
| `rootBone?` | `Entity` | - | Sets the entity that this anim component should use as the root of the animation hierarchy. Gets the entity that this anim component should use as the root of the animation hierarchy. |
| `stateGraph?` | `any` | - |  |
| `layerIndices?` | `{}` | - |  |
| `parameters?` | `{}` | - |  |
| `targets?` | `{}` | - |  |
| `system?` | `ComponentSystem` | - | The ComponentSystem used to create this Component. |
| `entity?` | `Entity` | - | The Entity that this Component is attached to. |
| `enabled?` | `boolean` | - | Sets the enabled state of the component. Gets the enabled state of the component. |
