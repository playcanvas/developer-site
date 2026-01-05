import { useState, useEffect, useMemo } from 'react'
import { Entity } from '@playcanvas/react'
import { Camera, Render, Script } from '@playcanvas/react/components'
import { useApp } from '@playcanvas/react/hooks'
import { XrControllers } from 'playcanvas/scripts/esm/xr-controllers.mjs'
import { XrNavigation } from 'playcanvas/scripts/esm/xr-navigation.mjs'
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs'
import { Vec2 } from 'playcanvas'

// ↑ imports hidden
export const XrExample = () => {
  const app = useApp()
  const [xrActive, setXrActive] = useState(false)
  const arAvailable = useMemo(() => app?.xr?.isAvailable('immersive-ar'), [app.xr])
  const vrAvailable = useMemo(() => app?.xr?.isAvailable('immersive-vr'), [app.xr])

  // Listen for XR session start/end
  useEffect(() => {
    const onStart = () => setXrActive(true)
    const onEnd = () => setXrActive(false)
    
    app.xr?.on('start', onStart)
    app.xr?.on('end', onEnd)
    
    return () => {
      app.xr?.off('start', onStart)
      app.xr?.off('end', onEnd)
    }
  }, [app])

  const startAR = () => {
    const camera = app.root.findComponent('camera')
    if (camera) {
      app.xr.start(camera, 'immersive-ar', 'local-floor')
    }
  }

  const startVR = () => {
    const camera = app.root.findComponent('camera')
    if (camera) {
      app.xr.start(camera, 'immersive-vr', 'local-floor')
    }
  }

  const endXR = () => app.xr.end()

  return (
    <>
      {/* XR UI Controls */}
      <div className="overlay">
        { !xrActive && arAvailable && <button onClick={startAR}>Enter AR</button> }
        { !xrActive && vrAvailable && <button onClick={startVR}>Enter VR</button> }
        { xrActive && <button data-selected onClick={endXR}>Exit XR</button> }
      </div>

      {/* Camera with XR support */}
      <Entity name="camera-root">
        <Entity name="camera" position={[4, 1, 4]} rotation={[0, 45, 0]}>
          <Camera clearColor="#1e1e1e" />
          { !xrActive && <Script script={CameraControls} enableFly={false} pitchRange={new Vec2(-90, -5)} /> }
        </Entity>
        <Script script={XrControllers} />
        <Script script={XrNavigation} />
      </Entity>

      {/* Scene content - a grid of cubes */}
      <Entity name="cube-1" position={[-2, 0, 0]}>
        <Render type="box" />
      </Entity>
      <Entity name="cube-2" position={[0, 0, 0]}>
        <Render type="box" />
      </Entity>
      <Entity name="cube-3" position={[2, 0, -2]}>
        <Render type="box" />
      </Entity>
    </>
  )
}

