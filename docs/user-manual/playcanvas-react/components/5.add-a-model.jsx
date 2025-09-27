import { Application, Entity } from '@playcanvas/react'
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs'
import { Render, Environment, Script, Light, Camera } from '@playcanvas/react/components'
import { useModel, useEnvAtlas } from '@playcanvas/react/hooks'

const Scene = () => {
  // load the assets
  const { asset: envAtlas } = useEnvAtlas('/assets/environment.png');
  // highlight-next-line
  const { asset: lambo } = useModel('/assets/lambo.glb');

  // if the assets haven't loaded, don't render anything
  if (!lambo || !envAtlas) return null;

  return <>
    // highlight-next-line
    <Render type='asset' asset={lambo} />
    <Entity name='directional-light' position={[0, .001, 0]}>
      <Light type='directional' />
    </Entity>
    <Environment envAtlas={envAtlas} showSkybox={false}/>
  </>
}

export const App = () => (
  <Application>
    <Entity name='camera' position={[4, 1, 4]}>
      <Camera clearColor='#090707' fov={28} />
      <Script script={CameraControls}/>
    </Entity>
    <Scene />
  </Application>
)
