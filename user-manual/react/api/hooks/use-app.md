# `useApp`

The `useApp` hook provides access to the PlayCanvas [Application](https://api.playcanvas.com/engine/classes/Application.html) instance from within your React components. It's a convenient way to get information about the app state, fire events, and more.

```jsx copy title="./my-component.jsx"
import { useApp } from '@playcanvas/react/hooks'

function MyComponent() {
  const app = useApp()
  
  // Access application properties
  console.log('Scene:', app.scene)
  
  // Cameras are components on entities, so look them up from the root
  const cameras = app.root.findComponents('camera')
  console.log('Cameras:', cameras)
  
  return null
}
```

A reference to the app gives you access to the scene, root entity, systems, assets, events, etc.

## Application context

The hook only relies on the `<Application/>` component for context, so without one it will throw an error. Call it from inside a component that is a child of an `<Application/>`.

```jsx title="🚫 No <Application> context"
// Nope, useApp is outside <Application>
export const Wrong = () => {
  const app = useApp();
  return (
    <Application>
      <Scene/>
    </Application>
  )
}
```

```jsx copy title="✅ Correct <Application> context"
// Yep! `useApp` has <Application> context
const Correct = () => {
  const app = useApp();
  return <Scene />;
}

export const App = () => <Application>
  <Correct/>
  </Application>
```

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `createDevice` | `(canvas: any, options: any) => WebglGraphicsDevice` | - |  |
| `addComponentSystems` | `(appOptions: any) => void` | - |  |
| `addResourceHandles` | `(appOptions: any) => void` | - |  |
| `_batcher` | `any` | - | The application's batch manager. |
| `_destroyRequested` | `any` | - |  |
| `_inFrameUpdate` | `any` | - |  |
| `_librariesLoaded` | `any` | - |  |
| `_fillMode` | `any` | - |  |
| `_resolutionMode` | `any` | - |  |
| `_allowResize` | `any` | - |  |
| `_skyboxAsset` | `any` | - |  |
| `_soundManager` | `any` | - |  |
| `_visibilityChangeHandler` | `any` | - |  |
| `renderNextFrame` | `boolean` | - | Set to true to render the scene on the next iteration of the main loop. This only has an effect if autoRender is set to false. The value of renderNextFrame is set back to false again as soon as the scene has been rendered. |
| `timeScale` | `number` | - | Scales the global time delta. Defaults to 1. Scripts, animation and physics all receive the scaled delta, so 0 stops them together. To pause or slow down physics alone while the rest of the application keeps running, use RigidBodyComponentSystem#timeScale . |
| `maxDeltaTime` | `number` | - | Clamps per-frame delta time to an upper bound. Useful since returning from a tab deactivation can generate huge values for dt, which can adversely affect game state. Defaults to 0.1 (seconds). |
| `scriptsOrder` | `string[]` | - | Scripts in order of loading first. |
| `autoRender` | `boolean` | - | When true, the application's render function is called every frame. Setting autoRender to false is useful to applications where the rendered image may often be unchanged over time. This can heavily reduce the application's load on the CPU and GPU. Defaults to true. |
| `graphicsDevice` | `GraphicsDevice` | - | The graphics device used by the application. |
| `root` | `Entity` | - | The root entity of the application. |
| `scene` | `Scene` | - | The scene managed by the application. |
| `lightmapper` | `Lightmapper \| null` | - | The run-time lightmapper. |
| `loader` | `ResourceLoader` | - | The resource loader. |
| `assets` | `AssetRegistry` | - | The asset registry managed by the application. |
| `scenes` | `SceneRegistry` | - | The scene registry managed by the application. |
| `scripts` | `ScriptRegistry` | - | The application's script registry. |
| `systems` | `ComponentSystemRegistry` | - | The application's component system registry. |
| `i18n` | `I18n` | - | Handles localization. |
| `keyboard` | `Keyboard \| null` | - | The keyboard device. |
| `mouse` | `Mouse \| null` | - | The mouse device. |
| `touch` | `TouchDevice \| null` | - | Used to get touch events input. |
| `gamepads` | `GamePads \| null` | - | Used to access GamePad input. |
| `elementInput` | `ElementInput \| null` | - | Used to handle input for ElementComponents. |
| `xr` | `XrManager \| null` | - | The XR Manager that provides ability to start VR/AR sessions. |
| `init` | `(appOptions: AppOptions) => void` | - | Initialize the app. |
| `defaultLayerWorld` | `Layer` | - |  |
| `defaultLayerDepth` | `Layer` | - |  |
| `defaultLayerSkybox` | `Layer` | - |  |
| `defaultLayerUi` | `Layer` | - |  |
| `defaultLayerImmediate` | `Layer` | - |  |
| `_initDefaultMaterial` | `any` | - |  |
| `_initProgramLibrary` | `any` | - |  |
| `batcher` | `BatchManager` | - | The application's batch manager. The batch manager is used to merge mesh instances in the scene, which reduces the overall number of draw calls, thereby boosting performance. |
| `fillMode` | `string` | - | The current fill mode of the canvas. Can be: - FILLMODE_NONE: the canvas will always match the size provided. - FILLMODE_FILL_WINDOW: the canvas will simply fill the window, changing aspect ratio. - FILLMODE_KEEP_ASPECT: the canvas will grow to fill the window as best it can while maintaining the aspect ratio. |
| `resolutionMode` | `string` | - | The current resolution mode of the canvas, Can be: - RESOLUTION_AUTO: if width and height are not provided, canvas will be resized to match canvas client size. - RESOLUTION_FIXED: resolution of canvas will be fixed. |
| `configure` | `(url: string, callback: ConfigureAppCallback) => void` | - | Load the application configuration file and apply application properties and fill the asset registry. |
| `preload` | `(callback: PreloadAppCallback) => void` | - | Load all assets in the asset registry that are marked as 'preload'. |
| `_preloadScripts` | `(sceneData: any, callback: any) => void` | - |  |
| `_parseApplicationProperties` | `(props: any, callback: any) => void` | - |  |
| `_width` | `any` | - |  |
| `_height` | `any` | - |  |
| `_loadLibraries` | `any` | - |  |
| `_parseScenes` | `any` | - | Insert scene name/urls into the registry. |
| `_parseAssets` | `any` | - | Insert assets into registry. |
| `start` | `() => void` | - | Start the application. This function does the following: 1. Fires an event on the application named 'start' 2. Calls initialize for all components on entities in the hierarchy 3. Fires an event on the application named 'initialize' 4. Calls postInitialize for all components on entities in the hierarchy 5. Fires an event on the application named 'postinitialize' 6. Starts executing the main loop of the application This function is called internally by PlayCanvas applications made in the Editor but you will need to call start yourself if you are using the engine stand-alone. |
| `_alreadyStarted` | `boolean` | - |  |
| `inputUpdate` | `any` | - | Update all input devices managed by the application. |
| `update` | `(dt: number) => void` | - | Update the application. This function will call the update functions and then the postUpdate functions of all enabled components. It will then update the current state of all connected input devices. This function is called internally in the application's main loop and does not need to be called explicitly. |
| `renderComposition` | `(layerComposition: any) => void` | - |  |
| `setCanvasFillMode` | `(mode: string, width?: number \| undefined, height?: number \| undefined) => void` | - | Controls how the canvas fills the window. The canvas is sized when this is called and on every AppBase#resizeCanvas ; the engine installs no window `resize` listener of its own, so call `resizeCanvas` from your own handler to keep the window-relative modes tracking the window. |
| `setCanvasResolution` | `(mode: string, width?: number \| undefined, height?: number \| undefined) => void` | - | Change the resolution of the canvas, and set the way it behaves when the window is resized. |
| `isHidden` | `() => boolean` | - | Queries the visibility of the window or tab in which the application is running. |
| `onVisibilityChange` | `any` | - | Called when the visibility state of the current tab/window changes. |
| `resizeCanvas` | `(width?: number \| undefined, height?: number \| undefined) => { width: number; height: number; } \| undefined` | - | Resize the application's canvas element in line with the current fill mode. - In FILLMODE_KEEP_ASPECT mode, the canvas will grow to fill the window as best it can while maintaining the aspect ratio. - In FILLMODE_FILL_WINDOW mode, the canvas will simply fill the window, changing aspect ratio. - In FILLMODE_NONE mode, the canvas will always match the size provided. |
| `updateCanvasSize` | `() => void` | - | Updates the GraphicsDevice canvas size to match the canvas size on the document page. It is recommended to call this function when the canvas size changes (e.g on window resize and orientation change events) so that the canvas resolution is immediately updated. |
| `onLibrariesLoaded` | `any` | - | Event handler called when all code libraries have been loaded. Code libraries are passed into the constructor of the Application and the application won't start running or load packs until all libraries have been loaded. |
| `applySceneSettings` | `(settings: { physics: { gravity: number[]; }; render: { global_ambient: number[]; fog: string; fog_color: number[]; fog_density: number; fog_start: number; fog_end: number; gamma_correction: number; tonemapping: number; ... 52 more ...; gsplatEnableIds?: boolean; }; }) => void` | - | Apply scene settings to the current scene. Useful when your scene settings are parsed or generated from a non-URL source. |
| `setAreaLightLuts` | `(ltcMat1: number[], ltcMat2: number[]) => void` | - | Sets the area light LUT tables for this app. |
| `setSkybox` | `(asset: Asset) => void` | - | Sets the skybox asset to current scene, and subscribes to asset load/change events. |
| `_onSkyboxRemoved` | `any` | - |  |
| `_onSkyboxChanged` | `any` | - |  |
| `_firstBake` | `any` | - |  |
| `_firstBatch` | `any` | - |  |
| `drawLine` | `(start: Vec3, end: Vec3, color?: Color \| undefined, depthTest?: boolean \| undefined, layer?: Layer \| undefined) => void` | - | Draws a single line. Line start and end coordinates are specified in world space. The line will be flat-shaded with the specified color. |
| `drawLines` | `(positions: Vec3[], colors: Color \| Color[], depthTest?: boolean \| undefined, layer?: Layer \| undefined) => void` | - | Renders an arbitrary number of discrete line segments. The lines are not connected by each subsequent point in the array. Instead, they are individual segments specified by two points. Therefore, the lengths of the supplied position and color arrays must be the same and also must be a multiple of 2. The colors of the ends of each line segment will be interpolated along the length of each line. |
| `drawLineArrays` | `(positions: number[], colors: number[] \| Color, depthTest?: boolean \| undefined, layer?: Layer \| undefined) => void` | - | Renders an arbitrary number of discrete line segments. The lines are not connected by each subsequent point in the array. Instead, they are individual segments specified by two points. |
| `destroy` | `() => void` | - | Destroys application and removes all event listeners at the end of the current engine frame update. However, if called outside of the engine frame update, calling destroy() will destroy the application immediately. |
| `_gsplatSortedEvt` | `EventHandle` | - |  |
| `context` | `any` | - |  |
| `_registerSceneImmediate` | `any` | - |  |
| `_callbacks` | `any` | - |  |
| `_callbackActive` | `any` | - |  |
| `on` | `(name: string, callback: HandleEventCallback, scope?: object \| undefined) => EventHandle` | - | Attach an event handler to an event. |
| `once` | `(name: string, callback: HandleEventCallback, scope?: object \| undefined) => EventHandle` | - | Attach an event handler to an event. This handler will be removed after being fired once. |
| `off` | `(name?: string \| undefined, callback?: HandleEventCallback \| undefined, scope?: object \| undefined) => EventHandler` | - | Detach an event handler from an event. If callback is not provided then all callbacks are unbound from the event, if scope is not provided then all events with the callback will be unbound. Use this form to remove all listeners matching a name (and optionally callback/scope). To remove a single known subscription, prefer retaining the EventHandle returned by EventHandler#on  / EventHandler#once  and calling its EventHandle#off : it removes exactly that subscription and is faster (no scan of the callback list). |
| `fire` | `(name: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any, arg6?: any, arg7?: any, arg8?: any) => EventHandler` | - | Fire an event, all additional arguments are passed on to the event listener. |
| `hasEvent` | `(name: string) => boolean` | - | Test if there are any handlers bound to an event name. |

## Related

- [Application Component](https://developer.playcanvas.com/user-manual/react/api/application.md) - The component that provides the app context
- [useParent](https://developer.playcanvas.com/user-manual/react/api/hooks/use-parent.md) - Access the parent Entity
- [useAppEvent](https://developer.playcanvas.com/user-manual/react/api/hooks/use-app-event.md) - Subscribe to application events
