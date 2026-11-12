# Bundle Size and Tree Shaking

The PlayCanvas Engine is published on npm as ES modules, one module per source file, and its `package.json` declares `"sideEffects": false`. When you bundle your application with a build tool such as [Vite](https://vite.dev/), [Rollup](https://rollupjs.org/), [esbuild](https://esbuild.github.io/) or [webpack](https://webpack.js.org/), the build tool follows the imports in your code and leaves out every module that nothing uses. This is called tree shaking.

Most of what ends up in your bundle is decided by how you set up [`AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html). This page explains how to set it up so that your application includes only what it uses.

## How It Works

Your code refers to components and assets by name: `entity.addComponent('render')` or `new Asset('logo', 'texture', { url })`. A build tool can't tell from these strings which parts of the engine your application needs.

Instead, `AppBase` registers only the component systems and resource handlers that you list in an [`AppOptions`](https://api.playcanvas.com/engine/classes/AppOptions.html) object:

* A **component system** runs one type of component. For example, `RenderComponentSystem` runs the `render` component.
* A **resource handler** loads one type of asset. For example, `TextureHandler` loads `texture` assets.

Each class you list is imported by your code, so it is included in your bundle. Each class you don't list is left out, together with the code that only it uses.

## Setting Up AppBase

This example registers what an application with meshes, a camera, lights, scripts, textures and glTF models needs:

```javascript title="main.js"
import {
    AppBase,
    AppOptions,
    CameraComponentSystem,
    ContainerHandler,
    createGraphicsDevice,
    DEVICETYPE_WEBGPU,
    Keyboard,
    LightComponentSystem,
    Mouse,
    RenderComponentSystem,
    ScriptComponentSystem,
    ScriptHandler,
    TextureHandler,
    TouchDevice
} from 'playcanvas';

const canvas = document.getElementById('application');
const device = await createGraphicsDevice(canvas, {
    deviceTypes: [DEVICETYPE_WEBGPU]
});

const createOptions = new AppOptions();
createOptions.graphicsDevice = device;

// input devices the application reads
createOptions.mouse = new Mouse(canvas);
createOptions.touch = new TouchDevice(canvas);
createOptions.keyboard = new Keyboard(window);

// component systems and resource handlers the application uses
createOptions.componentSystems = [
    RenderComponentSystem,
    CameraComponentSystem,
    LightComponentSystem,
    ScriptComponentSystem
];
createOptions.resourceHandlers = [TextureHandler, ContainerHandler, ScriptHandler];

const app = new AppBase(canvas);
app.init(createOptions);
app.start();
```

If you use a component without registering its system, `addComponent` returns `null`, and the debug build of the Engine logs `addComponent: System 'sound' doesn't exist`. If you load an asset without registering its handler, the load fails with `No resource handler for asset type`.

:::tip

During development, Vite and other build tools that set the `development` export condition use the debug build of the Engine, which logs these errors. Production builds use the release build.

:::

## Component Systems

Register a component system for each type of component your application adds. The **Also needs** column lists what else the component uses.

| Component system | Component | Used for | Also needs |
| ---------------- | --------- | -------- | ---------- |
| `RenderComponentSystem` | `render` | Meshes, primitive shapes and the entities of glTF models | |
| `CameraComponentSystem` | `camera` | Cameras | |
| `LightComponentSystem` | `light` | Directional, omni, spot and area lights | |
| `ScriptComponentSystem` | `script` | Scripts | `ScriptHandler` to load scripts as `script` assets |
| `GSplatComponentSystem` | `gsplat` | Gaussian splats | `GSplatHandler` |
| `ParticleSystemComponentSystem` | `particlesystem` | Particle systems | `TextureHandler` for particle textures |
| `AnimComponentSystem` | `anim` | Animation state graphs and animation layers | `AnimClipHandler` and `AnimStateGraphHandler` to load `animclip` and `animstategraph` assets |
| `AnimationComponentSystem` | `animation` | Legacy animation playback, superseded by `anim` | `AnimationHandler` |
| `ModelComponentSystem` | `model` | Legacy meshes, superseded by `render` | `ModelHandler` |
| `SoundComponentSystem` | `sound` | Playing sounds | `AudioHandler`, and `soundManager` in `AppOptions` |
| `AudioListenerComponentSystem` | `audiolistener` | The listener for positional sound | `soundManager` in `AppOptions` |
| `CollisionComponentSystem` | `collision` | Collision shapes and triggers | ammo.js |
| `RigidBodyComponentSystem` | `rigidbody` | Rigid body physics | `CollisionComponentSystem`, ammo.js |
| `JointComponentSystem` | `joint` | Physics joints | `RigidBodyComponentSystem`, `CollisionComponentSystem`, ammo.js |
| `ScreenComponentSystem` | `screen` | The root of a user interface | |
| `ElementComponentSystem` | `element` | Text, image and group elements | `ScreenComponentSystem`, `FontHandler` for text, and `elementInput` in `AppOptions` for input |
| `ButtonComponentSystem` | `button` | Buttons | `ElementComponentSystem`, `elementInput` in `AppOptions` |
| `ScrollViewComponentSystem` | `scrollview` | Scrolling content | `ElementComponentSystem`, `ScrollbarComponentSystem` for its scrollbars |
| `ScrollbarComponentSystem` | `scrollbar` | Scrollbars | `ElementComponentSystem` |
| `LayoutGroupComponentSystem` | `layoutgroup` | Laying out child elements | `ElementComponentSystem` |
| `LayoutChildComponentSystem` | `layoutchild` | Layout settings of an element in a layout group | `ElementComponentSystem`, `LayoutGroupComponentSystem` |
| `SpriteComponentSystem` | `sprite` | 2D sprites and sprite animations | `SpriteHandler`, `TextureAtlasHandler` and `TextureHandler` to load sprites |

## Resource Handlers

Register a resource handler for each type of asset your application loads.

| Resource handler | Asset type | Loads |
| ---------------- | ---------- | ----- |
| `TextureHandler` | `texture` | Images, HDR images and compressed textures |
| `ContainerHandler` | `container` | glTF and GLB models, with their meshes, materials, textures and animations |
| `ScriptHandler` | `script` | JavaScript files that define scripts |
| `GSplatHandler` | `gsplat` | Gaussian splat files |
| `CubemapHandler` | `cubemap` | Cubemaps |
| `MaterialHandler` | `material` | Materials stored as JSON |
| `RenderHandler` | `render` | Meshes that refer to a `container` asset, as exported by the Editor |
| `FontHandler` | `font` | Fonts for text elements |
| `AudioHandler` | `audio` | Sound files |
| `AnimClipHandler` | `animclip` | Animation clips for the `anim` component |
| `AnimStateGraphHandler` | `animstategraph` | Animation state graphs for the `anim` component |
| `AnimationHandler` | `animation` | Animations for the legacy `animation` component |
| `ModelHandler` | `model` | Models for the legacy `model` component |
| `SpriteHandler` | `sprite` | Sprites |
| `TextureAtlasHandler` | `textureatlas` | Texture atlases for sprites |
| `SceneHandler` | `scene` | Scenes exported by the Editor |
| `JsonHandler` | `json` | JSON data |
| `TextHandler` | `text` | Text files |
| `BinaryHandler` | `binary` | Binary data, as an `ArrayBuffer` |

## Other Options

The other properties of `AppOptions` add features in the same way: what you don't set is not included.

| Option | Value | Used for |
| ------ | ----- | -------- |
| `graphicsDevice` | A `GraphicsDevice`, from `createGraphicsDevice` | Rendering. Required. |
| `mouse` | `new Mouse(canvas)` | Reading mouse input through `app.mouse` |
| `touch` | `new TouchDevice(canvas)` | Reading touch input through `app.touch` |
| `keyboard` | `new Keyboard(window)` | Reading keyboard input through `app.keyboard` |
| `gamepads` | `new GamePads()` | Reading gamepad input through `app.gamepads` |
| `elementInput` | `new ElementInput(canvas)` | Mouse and touch input on user interface elements |
| `soundManager` | `new SoundManager()` | Playing sounds with the `sound` and `audiolistener` components |
| `lightmapper` | The `Lightmapper` class | Baking lightmaps at runtime |
| `batchManager` | The `BatchManager` class | Combining mesh instances into batches |
| `xr` | The `XrManager` class | WebXR, through `app.xr` |
| `assetPrefix` | A string | A prefix added to the URL of every asset |
| `scriptPrefix` | A string | A prefix added to the URL of every script |
| `scriptsOrder` | An array of script URLs | The order in which scripts are loaded |
| `devtools` | `true` or `false` | Whether the application announces itself to developer tools such as the PlayCanvas Inspector. Defaults to `true`. |

Each input device stays `null` on the application unless you set it here.

## Keeping the Bundle Small

* **Import from `playcanvas`.** The package name resolves to the per-module build that build tools can tree shake. The single-file builds in `playcanvas/build/` are meant for use without a build tool, such as from an import map.
* **Use the engine's exports directly.** Named imports (`import { Entity } from 'playcanvas'`) and members of a namespace import (`pc.Entity`) both tree shake. Passing the whole namespace to a function as a value, as in `setup(pc)`, makes some build tools, such as esbuild, keep the entire engine.
* **Check what your bundle contains.** esbuild prints the size of each module with `--analyze`, and [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer) draws a map of a Vite or Rollup bundle.
