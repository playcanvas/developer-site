import { Application, Entity } from '@playcanvas/react'
import { Render, Camera } from '@playcanvas/react/components'

const Scene = () => {   
  return (<>
    <Entity name='box'>
      <Render type='box'/>
    </Entity>
  </>)
}

export const App = () => (
  <Application>
    <Entity name='camera' position={[0, 0, 5]}>
      <Camera />
    </Entity>
    <Scene />
  </Application>
)