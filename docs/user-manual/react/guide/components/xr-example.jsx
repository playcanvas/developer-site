import { useState, useEffect } from 'react'
import { Entity } from '@playcanvas/react'
import { Camera, Render, Script } from '@playcanvas/react/components'
import { useApp } from '@playcanvas/react/hooks'
import { XrControllers } from 'playcanvas/scripts/esm/xr/xr-controllers.mjs'
import { XrNavigation } from 'playcanvas/scripts/esm/xr/xr-navigation.mjs'
import { XrSession } from 'playcanvas/scripts/esm/xr/xr-session.mjs'
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs'
import { Vec2 } from 'playcanvas'

// ↑ imports hidden
export const XrExample = () => {
  const app = useApp()
  const [xrType, setXrType] = useState(null)
  const xrActive = xrType !== null
  const [arAvailable, setArAvailable] = useState(false)
  const [vrAvailable, setVrAvailable] = useState(false)

  // Availability is checked after the application starts, and again when devices change
  useEffect(() => {
    const update = () => {
      setArAvailable(app.xr.isAvailable('immersive-ar'))
      setVrAvailable(app.xr.isAvailable('immersive-vr'))
    }
    update()
    const handle = app.xr.on('available', update)
    return () => handle.off()
  }, [app])

  // Listen for XR session start/end
  useEffect(() => {
    const onStart = () => setXrType(app.xr.type)
    const onEnd = () => setXrType(null)
    
    app.xr?.on('start', onStart)
    app.xr?.on('end', onEnd)
    
    return () => {
      app.xr?.off('start', onStart)
      app.xr?.off('end', onEnd)
    }
  }, [app])

  // XrSession on the camera rig starts and ends sessions on its own camera
  const startAR = () => app.fire('ar:start')
  const startVR = () => app.fire('vr:start')
  const endXR = () => app.fire('xr:end')

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
          {/* Transparent in AR, so the real world shows through */}
          <Camera clearColor={xrType === 'immersive-ar' ? '#00000000' : '#1e1e1e'} />
          { !xrActive && <Script script={CameraControls} enableFly={false} pitchRange={new Vec2(-90, -5)} /> }
        </Entity>
        <Script script={XrSession} />
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

