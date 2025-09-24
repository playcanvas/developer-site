---
title: Your First Scene
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Your first project

This guide will walk you through the process of setting up a new `@playcanvas/react` project to create a simple 3D application that you can use as a starting point for your own projects. It assumes you have some familiarity with React. If you're new to React, it's worth taking a look at the [React documentation](https://react.dev/learn) to get up to speed.

### Create a new project

If you've not already done so, follow the [Installation Guide](./installation.md) guide, and create scaffold out a new PlayCanvas React project

## Loading a 3D model

In this example, we'll create a simple 3D scene that displays a Lamborghini model that you can rotate with the mouse, with some environment lighting and a ground plane shadowing effect.

<PlayCanvasReactExample />

Let's break this down.

### Your first 3D project

Before we get to anything more complex, let's create a simple example that displays a spinning cube.

You'll probably want to modify the `App.css` to make the application fullscreen. You can do this by adding the following to the `#root` selector:

```css title="src/App.css"
#root {
  width: 100vw;
  height: 100vh; 
  margin: 0;
  padding: 0;
}
```

In your `/src/App.jsx` file, you can delete everything and replace it with the following:

```jsx title="src/App.jsx"
import './App.css'
import { Application, Entity } from '@playcanvas/react'
import { Render } from '@playcanvas/react/components'

export default function App() {
    return <Application>
      <Entity name='box'>
          <Render type='box'/>
      </Entity>
  </Application>
}
```

_What's happening here?_ We've created a PlayCanvas `Application` and added an `Entity` containing a `Render` component. The `Application` is the root component, it sets up the `canvas` and initializes the scene. The `Entity` is a container for components, it has position, rotation, scale. Lastly the `Render` component provides the `Entity` with the ability to render a 3D asset.

If you run this project though, you'll notice that nothing is displayed. This is because we don't actually have a camera, and you'll need a camera to see anything, so let's add one.

```jsx title="src/App.jsx" {7-9}
import './App.css'
import { Application, Entity } from '@playcanvas/react'
import { Camera, Render } from '@playcanvas/react/components'

export default function App() {
    return <Application>
        <Entity name='camera' position={[0, 0, 5]}>
            <Camera/>
        </Entity>
        <Entity name='box'>
            <Render type='box'/>
        </Entity>
    </Application>
}
```

We've added an entity with a `Camera` component to the scene. Also, we've set the camera's position to `[0, 0, 5]` so that it's a bit away from the box. If you play with that value, you'll see the cube move closer or further away. If you run the project now, you should see the cube in the center of the screen.

:::tip

PlayCanvas uses an ECS architecture, so you add a `<Camera/>` component to an `<Entity/>`.

:::

### Adding interactivity

On its own, this isn't very exciting. Let's add some interactivity by adding a `Script` component so you can rotate the cube with the mouse.

```jsx title="src/App.jsx" {10}
import './App.css'
import { Application, Entity } from '@playcanvas/react'
import { Camera, Render } from '@playcanvas/react/components'
import { OrbitControls } from '@playcanvas/react/scripts'

export default function App() {
    return <Application>
        <Entity name='camera' position={[0, 0, 2]}>
            <Camera/>
            <OrbitControls/>
        </Entity>
        <Entity name='box' scale={[4, 4, 4]}>
            <Render type='box'/>
        </Entity>
    </Application>
}
```

Now when you run it, you should be able to rotate the cube with the mouse. What's actually happening is that you've added a `Script` component that uses the `OrbitControls` script to allow which rotates the camera around the cube with the mouse. We've also made the `box` a little bigger so it's easier to see using the `scale={[4, 4, 4]}` prop. This simply uniformly scales the entity on each axis.

### Adding lights



### Adding 3D models

Ok, so we have a camera and a rotating box. Let's add a 3D model to the scene. You can can use any 3D model format that PlayCanvas supports. [Fab](https://www.fab.com/) is a great resource for free 3D models.

For this example we'll use a Lamborghini model. You can download the model from the [PlayCanvas React examples](/assets/lamborghini_vision_gt.glb).

```jsx title="src/App.jsx" {11-13}
import './App.css'
import { Application, Entity } from '@playcanvas/react'
import { Camera, Render, Light } from '@playcanvas/react/components'
import { useModel } from '@playcanvas/react/hooks'
import { OrbitControls } from '@playcanvas/react/scripts'

export default function App() {
    return <Application>
      <Entity name='camera' position={[0, 0, 2]}>
            <Camera/>
            <OrbitControls/>
            <Entity name='light' rotation={[45, -45, 45]} >
                <Light type='directional' color="orange" />
            </Entity>
        </Entity>
        <Entity name='model' scale={[4, 4, 4]}>
            <Glb src='/lamborghini_vision_gt.glb' />
        </Entity>
    </Application>
}
```

You should now see the Lamborghini model in the scene. Note here that we've added the `Glb` component to the `Entity` that contains the model. This isn't part of the core `@playcanvas/react` library, but it's a simple component that wraps the `useModel` hook to make it easier to use in a React component. You can read more about [loading assets here](./loading-assets).

### Putting it all together

So far we've created a simple 3D scene with a camera, a rotating box, and a 3D model. In the next section, we'll add some more features to the scene to make it more interesting. It's mainly missing some staging, so we'll add a ground plane and some environment lighting. We'll also remove the orange light since we now have some environment lighting.

For a complete working example with environment lighting and staging, see the [model viewer example](https://playcanvas-react.vercel.app/examples/model-viewer).

We now have a complete 3D scene with a camera, a rotating model, and some environment lighting. You can now start adding your own assets and creating your own scenes. Check out the [loading assets guide](./loading-assets) to learn how to load your own assets and add interactivity with scripts.
