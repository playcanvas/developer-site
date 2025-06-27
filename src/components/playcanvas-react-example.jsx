import { Application, Entity } from '@playcanvas/react'
import { Camera, Light, Render } from '@playcanvas/react/components'
import confetti from "canvas-confetti"

export default function Interactive() {
  return (
    <Application>
      <Entity name="camera" position={[0, 0, 5]}>
        <Camera />
      </Entity>
      <Entity name="light" rotation={[45, 45, 0]}>
        <Light type="directional" />
      </Entity>
      <Entity name="sphere"
        onClick={() => confetti()}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'default'} >
        <Render type="sphere" />
      </Entity>
    </Application>
  )
}
