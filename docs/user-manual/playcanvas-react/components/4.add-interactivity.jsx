import { Application, Entity } from '@playcanvas/react'
import { Render, Camera, Light, Environment } from '@playcanvas/react/components'
import { useEnvAtlas } from '@playcanvas/react/hooks'
import { Script } from '@playcanvas/react/components'
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs'

const Scene = () => {
  // load the assets
  const { asset: envAtlas } = useEnvAtlas('/assets/environment.png');

  // if the asset hasn't loaded, don't render anything
  if (!envAtlas) return null;

  return (<>
    <Environment envAtlas={envAtlas} />
    <Entity name='directional-light' position={[0, .001, 0]}>
      <Light type='directional' />
    </Entity>
    <Render type='box'/>
  </>)
}

export const App = () => (
  <Application>
    <Entity name='camera' position={[4, 1, 4]}>
      <Camera clearColor='#090707' fov={28} />
      // highlight-next-line
      <Script script={CameraControls}/>
    </Entity>
    <Scene />
  </Application>
)