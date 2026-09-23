# Building a Scene

This guide will walk you through the process of setting up a new `@playcanvas/react` project and creating a simple 3D scene. By the end of this guide, you'll have a basic understanding of the core concepts of PlayCanvas React.

At the end you'll have something like the following.

An interactive 3D scene built with <b>@playcanvas/react</b>.

:::info

This guide assumes you have some familiarity with React. If you're new to React, it's worth taking a look at the [React documentation](https://react.dev/learn) to get up to speed.

:::

We'll build the scene step by step, and you'll see the code and live examples at each step.

## Your first scene

If you've not already done so, **follow the [Installation Guide](https://developer.playcanvas.com/user-manual/react/getting-started/installation.md)**, and
create a new PlayCanvas React project.

```bash
npm create playcanvas@latest my-first-3d-app -t react-ts
```

Before we get to anything more complex, let's create a simple example that displays a box. Any PlayCanvas scene starts with an **Application**, a **Scene** and a **Camera** so we can see something.

In your `/src/App.jsx` file, you can delete everything and replace it with the following code.

**Rendering a simple box**

```jsx title="/src/App.jsx"
import { Application, Entity } from '@playcanvas/react'
import { Render, Camera } from '@playcanvas/react/components'

const Scene = () => {
  return (<>
    <Entity name='box'>
      <Render type='box'/>
    </Entity>
  </>)
}

export const App = () => (
  <Application>
    <Entity name='camera' position={[0, 0, 5]}>
      <Camera />
    </Entity>
    <Scene />
  </Application>
)
```

When you run this or click the Demo tab, you'll see a square in the center of the screen.

### What's happening here?

We've created a PlayCanvas `Application` and a separate `Scene` that contains an `Entity` with a `Render` component. The `Application` is the root of every PlayCanvas application. It sets up an HTML `canvas` element and defines a rendering context.

We've abstracted out a `Scene` that contains everything we want to render. It's not strictly necessary, but it's a clean and logical way to organize your code. Inside the `Scene`, we've added an `Entity` component with a `Render` component. The `Entity` component is simply a container. It can be positioned, rotated and scaled, but on its own, it doesn't do anything. The `Render` component gives the `Entity` the ability to render 3D assets.

:::tip

PlayCanvas uses an **ECS architecture**. You add **'components'** to an `Entity` to give it functionality.

:::

Finally we've added a `Camera` component to the `Entity`. When you attach a `Camera` component to an `Entity`, it will render the scene from that entity's position down the entity's negative Z axis. We've set the camera's position to `[0, 0, 5]` so that it's a bit away from the box. If you play with those values, you'll see how it changes the rendered scene.

## Adding lights

This is a great start, but we don't have any lights in the scene. You can add lighting to the scene by either adding an `Environment` or `Light` component. There are various types of lights in PlayCanvas, so check the [docs](https://developer.playcanvas.com/user-manual/graphics/lighting/lights.md) for a broader overview. For now, we'll use environmental lighting (which provides a more naturally lit scene) and a simple directional light which we'll use later to help ground the scene.

**Adding lights to the scene**

```jsx title="/src/App.jsx"
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
```

If you run this or click the Demo tab, you'll see the box with a bit of lighting. There are a few new concepts here, so let's break them down.

### Loading assets

We've loaded an environment atlas using the `useEnvAtlas` hook. This is a hook that allows us to load an environment atlas from a URL which we pass to the `Environment` component. The library provides a number of powerful hooks for loading different types of assets that let you manage loading states and errors.

[Learn more](https://developer.playcanvas.com/user-manual/react/guide/loading-assets.md) about loading assets.

### Adding components

- `Environment` - This component adds environmental lighting to the scene.
- `Light` - This component adds a light to the scene.
- `Render` - This component renders the box.

We do this by loading an environment atlas and passing it to the `Environment` component, and adding a `Light` component.

## Adding interactivity

Ok, so we have some lighting. Let's add some interactivity by adding a `Script` component so you can rotate the cube with the mouse. We'll use the `CameraControls` script to allow the camera to be rotated with the mouse. We've also added a `Camera` component to the `Entity` to set the clear color and field of view.

**Adding interactivity to the scene**

```jsx title="/src/App.jsx"
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
```

There are a number of ways to add interactivity to your scene. You can attach event listeners directly to entities, or use the `Script` component to add custom behavior.

### Using the `Script` component

In the above example, we're using the `Script` component together with the `CameraControls` script. A `Script` component is a handy way to attach custom behavior to an `Entity`. It hooks into the engine's update loop and allows you to run code on every frame outside the React render loop. This is great for interactivity where you want to respond to user input for example, or do animations.

:::tip

Using a `<Script>` component is more performant than re-rendering the React tree. However, a Script can override Entity props, so it's important to be aware of this.

:::

Now when you run it, you should be able to rotate the cube with the mouse. You can learn more in the [Scripting section](https://developer.playcanvas.com/user-manual/scripting.md).

## Adding 3D models

Ok, so we have a camera and a rotating box. Let's make it more interesting by adding a 3D model to the scene. You can use any 3D model format that PlayCanvas supports. [Fab](https://www.fab.com/) is a great resource for free 3D models.

**Adding a 3D model to the scene**

```jsx title="/src/App.jsx"
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
```

You should now see the Lamborghini model in the scene. We've removed the box primitive by switching the `Render` to render assets. The asset is loaded using the `useModel` hook which is passed directly to the `Render` component. While the asset loads, we're returning `null` so nothing is rendered until the asset is loaded. You could optionally use a loading spinner here instead. Check out the [loading assets guide](https://developer.playcanvas.com/user-manual/react/guide/loading-assets.md) to learn more about loading assets.

## Staging the scene

We've now got a basic 3D scene with a camera, a rotating model, and some environment lighting. Let's add a ground plane and some shadows to stage the scene a little better. We can use the `ShadowCatcher` and `Grid` components to help with this.

**Staging the scene**

```jsx title="/src/App.jsx"
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
```

## Live example

We now have a complete 3D scene with a camera, a rotating model, and some environment lighting. You can now start adding your own assets and creating your own scenes. Check out the [loading assets guide](https://developer.playcanvas.com/user-manual/react/guide/loading-assets.md) to learn how to load your own assets and add interactivity with scripts.

```jsx title="src/App.jsx" live noInline
const Scene = () => {
  // load the assets
  const { asset: envAtlas } = useEnvAtlas('/assets/environment.png');
  const { asset: lambo } = useModel('/assets/lambo.glb');

  // if the assets haven't loaded, don't render anything
  if (!lambo || !envAtlas) return null;

  return <Entity name='model' >
    <Render type='asset' asset={lambo} />
    <Entity name='directional-light' position={[0, .001, 0]}>
      <Light type='directional' />
    </Entity>
    <Environment envAtlas={envAtlas} showSkybox={false} />
  </Entity>
}

const App = () => {
  return <Application>
    <ShadowCatcher width={5} depth={5} />
    <Entity name='grid' scale={[1000, 1, 1000]}>
      <Script script={GridScript}/>
    </Entity>
    <Entity name='camera' position={[4, 1, 4]}>
      <Camera clearColor='#090707' fov={28} renderSceneColorMap={true} />
      <Script script={CameraControls} enableFly={false}/>
    </Entity>
    <Scene />
  </Application>
}

render(<App />)
```

## Your next steps

Now you've got a basic understanding of the core concepts of PlayCanvas React, you're ready to start building your own scenes. Check out the [loading assets guide](https://developer.playcanvas.com/user-manual/react/guide/loading-assets.md) to learn how to load your own assets and add interactivity with scripts.

You can also check out the [guide](https://developer.playcanvas.com/user-manual/react/guide.md) to learn about the different concepts and techniques you can use to build your scenes.
