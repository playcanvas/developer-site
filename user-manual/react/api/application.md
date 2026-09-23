# `<Application/>`

The `<Application />` is the root your PlayCanvas React application. It initializes the engine and provides a rendering context. An Application maps to a single canvas in your app.

You can set the fill mode and resolution mode to control how the canvas fills the window, and other properties that control the graphics device.

```jsx copy
import { Application } from '@playcanvas/react'

export default function Scene() {
  return (
    <Application 
      fillMode={FILLMODE_FILL_WINDOW}
      resolutionMode={RESOLUTION_AUTO}
    >
      {/* Your scene content */}
    </Application>
  )
}
```

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `fillMode?` | `"NONE" \| "FILL_WINDOW" \| "KEEP_ASPECT"` | `FILLMODE_NONE` | Controls how the canvas fills the window and resizes when the window changes. |
| `resolutionMode?` | `"AUTO" \| "FIXED"` | `RESOLUTION_AUTO` | Change the resolution of the canvas, and set the way it behaves when the window is resized. |
| `usePhysics?` | `boolean` | `false` | When `true`, the PlayCanvas Physics system will be enabled. |
| `deviceTypes?` | `DeviceType[]` | `[DEVICETYPE_WEBGL2]` | The device types to use for the graphics device. This allows you to set an order of preference for the graphics device. The first device type in the array that is supported by the browser will be used. |
| `graphicsDeviceOptions?` | `GraphicsDeviceOptions` | - | Graphics Settings |
| `children?` | `ReactNode` | - | The children of the application |
| `renderNextFrame?` | `boolean` | - | Set to true to render the scene on the next iteration of the main loop. This only has an effect if autoRender is set to false. The value of renderNextFrame is set back to false again as soon as the scene has been rendered. |
| `timeScale?` | `number` | - | Scales the global time delta. Defaults to 1. Scripts, animation and physics all receive the scaled delta, so 0 stops them together. To pause or slow down physics alone while the rest of the application keeps running, use RigidBodyComponentSystem#timeScale . |
| `maxDeltaTime?` | `number` | - | Clamps per-frame delta time to an upper bound. Useful since returning from a tab deactivation can generate huge values for dt, which can adversely affect game state. Defaults to 0.1 (seconds). |
| `scriptsOrder?` | `string[]` | - | Scripts in order of loading first. |
| `autoRender?` | `boolean` | - | When true, the application's render function is called every frame. Setting autoRender to false is useful to applications where the rendered image may often be unchanged over time. This can heavily reduce the application's load on the CPU and GPU. Defaults to true. |
| `graphicsDevice?` | `GraphicsDevice` | - | The graphics device used by the application. |
| `root?` | `Entity` | - | The root entity of the application. |
| `lightmapper?` | `Lightmapper \| null` | - | The run-time lightmapper. |
| `loader?` | `ResourceLoader` | - | The resource loader. |
| `scenes?` | `SceneRegistry` | - | The scene registry managed by the application. |
| `systems?` | `ComponentSystemRegistry` | - | The application's component system registry. |
| `i18n?` | `I18n` | - | Handles localization. |
| `elementInput?` | `ElementInput \| null` | - | Used to handle input for ElementComponents. |
| `xr?` | `XrManager \| null` | - | The XR Manager that provides ability to start VR/AR sessions. |
| `defaultLayerWorld?` | `Layer` | - |  |
| `defaultLayerDepth?` | `Layer` | - |  |
| `defaultLayerSkybox?` | `Layer` | - |  |
| `defaultLayerUi?` | `Layer` | - |  |
| `defaultLayerImmediate?` | `Layer` | - |  |
| `context?` | `any` | - |  |
| `className?` | `string` | `pc-app` | The class name to attach to the canvas component |
| `style?` | `Record<string, unknown>` | `{ width: '100%', height: '100%' }` | A style object added to the canvas component |
