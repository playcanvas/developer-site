# XR

PlayCanvas React makes it easy to add Virtual Reality (VR) and Augmented Reality (AR) support to your applications using the WebXR API.

## Basic Setup

To enable XR support in your React application, you'll need:

1. **XR Scripts** - Import the XR controller and navigation scripts from the PlayCanvas engine package
2. **Camera Setup** - Configure your camera entity with XR scripts attached
3. **XR Controls** - Add UI buttons to enter and exit XR sessions (WebXR requires user interaction)
4. **Secure Context** - Serve your app over HTTPS (or `localhost` during development)

## XR Scripts

The PlayCanvas engine provides two essential XR scripts:

- **`XrControllers`** - Automatically downloads and renders XR controller models for detected controllers (including hand tracking)
- **`XrNavigation`** - Implements teleportation-based navigation using point-and-select actions

Import them from the PlayCanvas scripts package:

```tsx
import { XrControllers } from 'playcanvas/scripts/esm/xr/xr-controllers.mjs'
import { XrNavigation } from 'playcanvas/scripts/esm/xr/xr-navigation.mjs'
```

## Camera Configuration

For XR to work properly, you need a camera entity with the XR scripts attached. The recommended structure is:

```tsx
<Entity name="camera-root">
  <Entity name="camera" position={[0, 1.6, 0]}>
    <Camera clearColor="#1e1e1e" />
  </Entity>
  <Script script={XrControllers} />
  <Script script={XrNavigation} />
</Entity>
```

The camera is positioned at approximately eye-level (1.6 meters) and the scripts are attached to the parent entity.

## Starting XR Sessions

WebXR requires a user gesture to start a session. Use the `app.xr` API to start and manage XR sessions:

```tsx
const app = useApp()

const startVR = () => {
  const camera = app.root.findComponent('camera')
  if (camera) {
    app.xr.start(camera, 'immersive-vr', 'local-floor')
  }
}

const startAR = () => {
  const camera = app.root.findComponent('camera')
  if (camera) {
    app.xr.start(camera, 'immersive-ar', 'local-floor')
  }
}
```

## Complete Example

Here's a complete example with XR support, including buttons to enter AR/VR mode and a simple scene with cubes you can navigate around in XR:

**XR Support with AR and VR**

```jsx title="xr-example.jsx"
import { useState, useEffect, useMemo } from 'react'
import { Entity } from '@playcanvas/react'
import { Camera, Render, Script } from '@playcanvas/react/components'
import { useApp } from '@playcanvas/react/hooks'
import { XrControllers } from 'playcanvas/scripts/esm/xr/xr-controllers.mjs'
import { XrNavigation } from 'playcanvas/scripts/esm/xr/xr-navigation.mjs'
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
```

:::tip

- Press **Escape** to exit an active XR session
- XR availability depends on your device and browser support
- Use a VR headset or AR-capable mobile device to test the full experience
- During development, Chrome and Edge support WebXR emulation via DevTools

:::

## Checking XR Availability

You can check if AR or VR is available on the current device:

```tsx
const app = useApp()
const arAvailable = app.xr.isAvailable('immersive-ar')
const vrAvailable = app.xr.isAvailable('immersive-vr')
```

## XR Events

Listen to XR session events to update your UI:

```tsx
useEffect(() => {
  const onStart = () => console.log('XR session started')
  const onEnd = () => console.log('XR session ended')
  
  app.xr.on('start', onStart)
  app.xr.on('end', onEnd)
  
  return () => {
    app.xr.off('start', onStart)
    app.xr.off('end', onEnd)
  }
}, [app])
```

## Next Steps

The PlayCanvas Engine has comprehensive XR support with many advanced features. For more information, check out:

- [XR User Manual](https://developer.playcanvas.com/user-manual/xr.md) - Comprehensive XR documentation
- [WebXR API Reference](https://api.playcanvas.com/engine/classes/XrManager.html) - Full API documentation
- [XR Scripts Source](https://github.com/playcanvas/engine/tree/main/scripts/esm) - View the XR scripts source code
