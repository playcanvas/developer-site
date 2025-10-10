import { useState } from 'react'
import { Entity } from '@playcanvas/react'
import { RigidBody, Collision, Render } from '@playcanvas/react/components'
import { useMaterial } from '@playcanvas/react/hooks'
import { math } from 'playcanvas'
// ↑ imports hidden

const Box = ({ color, ...entityProps  }) => {
  const material = useMaterial({ diffuse: color })
  return (
    <Entity {...entityProps}>
      <RigidBody type="dynamic" mass={1} restitution={0.2} friction={0.5} />
      <Collision type="box" />
      <Render type="box" material={material} />
    </Entity>
  )
}

export const RigidbodyExample = () => {
  const [boxes, setBoxes] = useState([
    { id: 1, position: [0, 20, 0], color: '#e74c3c' },
    { id: 2, position: [0.5, 8, 0], color: '#3498db' },
    { id: 3, position: [-0.5, 11, 0], color: '#2ecc71' }
  ])

  const addBox = () => {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c']
    const color = colors[Math.floor(math.random(0, colors.length))]
    const box = {
      id: Date.now(),
      position: [math.random(-2, 2), 5, math.random(-2, 2)],
      rotation: [math.random(0, 360), math.random(0, 360), math.random(0, 360)],
      color
    }
    setBoxes([...boxes, box])
  }

  return (<>
    {/* Ground plane */}
    <Entity key="ground" position={[0, -0.6, 0]} scale={[10, -0.1, 10]}>
      <RigidBody type="static" friction={0.5} />
      <Collision type="box" halfExtents={[5, 0.1, 5]} />
    </Entity>

    {/* Falling boxes */}
    { boxes.map((props) => <Box key={props.id} {...props} />) }

    {/* UI */}
    <div className="overlay">
      <button onClick={addBox}>Add Box</button>
    </div>
  </>)
}

