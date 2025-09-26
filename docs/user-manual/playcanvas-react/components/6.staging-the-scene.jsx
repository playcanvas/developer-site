import { Application, Entity } from '@playcanvas/react'
import { Environment, Light, Render, Camera } from '@playcanvas/react/components'
import { useEnvAtlas, useModel } from '@playcanvas/react/hooks'
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs'

// ↑ previous imports
import { Script } from '@playcanvas/react/components'
import { ShadowCatcher as ShadowCatcherScript } from 'playcanvas/scripts/esm/shadow-catcher.mjs'
import { Grid as GridScript } from 'playcanvas/scripts/esm/grid.mjs'

const Scene = () => {
  // load the assets
  const { asset: envAtlas } = useEnvAtlas('/assets/environment.png');
  const { asset: lambo } = useModel('/assets/lambo.glb');

  // if the assets haven't loaded, don't render anything
  if (!lambo || !envAtlas) return null;

  return <>
    <Environment envAtlas={envAtlas} showSkybox={false} />
    <Entity name='directional-light' position={[0, .001, 0]}>
      <Light type='directional' />
    </Entity>
    <Render type='asset' asset={lambo} />
  </>
}

export const App = () => (
  <Application>
    // highlight-start
    <Script script={ShadowCatcherScript}/>
    <Entity name='grid' scale={[1000, 1, 1000]}>
      <Script script={GridScript} />
    </Entity>
    // highlight-end
    <Entity name='camera' position={[4, 1, 4]}>
      <Camera clearColor='#090707' fov={28} />
      <Script script={CameraControls} enableFly={false} />
    </Entity>
    <Scene />
  </Application>
)