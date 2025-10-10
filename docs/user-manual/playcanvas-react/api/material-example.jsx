import { useMaterial } from '@playcanvas/react/hooks'
import { Entity } from '@playcanvas/react'
import { Render } from '@playcanvas/react/components'
import { useState } from 'react'

// ↑ imports hidden
export function MaterialExample() {
  const [diffuse, setDiffuse] = useState('red')
  
  const makeRed = () => setDiffuse('red')
  const makeBlue = () => setDiffuse('blue')
  const makeGreen = () => setDiffuse('green')
  
  const material = useMaterial({ diffuse })

  return <>
    {/* Box with material */}
    <Entity>
      <Render type="box" material={material} />
    </Entity>
    {/* UI Buttons */}
    <div className="overlay">
      <button data-selected={diffuse === 'red'} onClick={makeRed}>Red</button>
      <button data-selected={diffuse === 'blue'} onClick={makeBlue}>Blue</button>
      <button data-selected={diffuse === 'green'} onClick={makeGreen}>Green</button>
    </div>
  </>
}
