import { Application, Entity } from '@playcanvas/react'
import { Render, Camera } from '@playcanvas/react/components'

const Scene = () => {
  return (<>
    <Entity>
      <Render type='box'/>
    </Entity>
  </>)
}

const App = () => (
  <Application>
    <Entity position={[0, 0, 5]}>
      <Camera fov={28} />
    </Entity>
    <Scene />
  </Application>
)
