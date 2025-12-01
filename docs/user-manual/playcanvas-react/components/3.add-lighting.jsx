import { Application, Entity } from '@playcanvas/react'
import { Render, Camera, Light, Environment } from '@playcanvas/react/components'
import { useEnvAtlas } from '@playcanvas/react/hooks'

const Scene = () => {
  // load the assets
  const { asset: envAtlas } = useEnvAtlas('/assets/environment.png');

  // if the asset hasn't loaded, don't render anything
  if (!envAtlas) return null;

  return (<>
    <Environment envAtlas={envAtlas} showSkybox={false} />
    <Entity name='directional-light' position={[0, .001, 0]}>
      <Light type='directional' color="orange" />
    </Entity>
    <Render type='box'/>
  </>)
}

export const App = () => (
  <Application>
    <Entity position={[0, 0, 5]}>
      <Camera clearColor="#090707" fov={28} />
    </Entity>
    <Scene />
  </Application>
)
