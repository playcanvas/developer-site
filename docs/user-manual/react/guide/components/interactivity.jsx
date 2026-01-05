import { useState } from 'react'
import { Entity } from '@playcanvas/react'
import { Render } from '@playcanvas/react/components'
import { useMaterial } from '@playcanvas/react/hooks'

export const Interactivity = () => {
  const colors = [
    'lavender', 'lightsteelblue', 'powderblue', 'rebeccapurple'
  ]

  // Create the initial diffuse color and create the material
  const [diffuse, setDiffuse] = useState('lightsteelblue')
  const material = useMaterial({ diffuse })

  const onRequestRandomColor = () => {
    setDiffuse(colors[Math.floor(Math.random() * colors.length)])
  }

  // Attach hover and leave handlers to the sphere
  const onHover = () => document.body.style.cursor = 'pointer'
  const onLeave = () => document.body.style.cursor = 'default'

  return (
    // Attach an onClick handler to the sphere to request a color change
    <Entity
      name="sphere"
      onClick={onRequestRandomColor}
      onPointerOver={onHover}
      onPointerOut={onLeave} >
        <Render type="sphere" material={material} />
    </Entity>
  )
}
