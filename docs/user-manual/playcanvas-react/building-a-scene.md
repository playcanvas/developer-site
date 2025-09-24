---
title: Building a Scene
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Let's build a simple 3D scene step by step using PlayCanvas React. We'll create a basic scene with a lit sphere and see it running live in your browser.

## Starting Point

First, let's create the basic structure of our application using the `Application` component:

```jsx
import { Application } from '@playcanvas/react'

export default function App() {
  return (
    <Application>
      {/* Your 3D scene will go here */}
    </Application>
  )
}
```

This creates an empty 3D scene. However, we can't see anything rendered yet. We need a camera and some content.

## Adding a Camera

To view our scene, we need a camera. In PlayCanvas React, we use `Entity` components as containers and attach component behaviors like `Camera`:

```jsx
import { Application, Entity } from '@playcanvas/react'
import { Camera } from '@playcanvas/react/components'

export default function App() {
  return (
    <Application>
      <Entity name="camera" position={[0, 0, 5]}>
        <Camera />
      </Entity>
    </Application>
  )
}
```

We've added a camera entity positioned 5 units down the positive Z axis. By default, a camera looks down the negative Z axis so our camera is now looking at the origin. The rendered scene shows a solid grey color (the clear color of the camera).

## Adding a Light

Let's add a directional light to illuminate our scene:

```jsx
import { Application, Entity } from '@playcanvas/react'
import { Camera, Light } from '@playcanvas/react/components'

export default function App() {
  return (
    <Application>
      <Entity name="camera" position={[0, 0, 5]}>
        <Camera />
      </Entity>
      <Entity name="light" rotation={[45, 45, 0]}>
        <Light type="directional" />
      </Entity>
    </Application>
  )
}
```

The light is rotated to shine at an angle, which will create more interesting shading on our objects.

## Adding an Object

Now let's add a sphere to our scene using the `Render` component:

<Tabs>
<TabItem value="code" label="Code">

```jsx
import { Application, Entity } from '@playcanvas/react'
import { Camera, Light, Render } from '@playcanvas/react/components'

export default function App() {
  return (
    <Application>
      <Entity name="camera" position={[0, 0, 5]}>
        <Camera />
      </Entity>
      <Entity name="light" rotation={[45, 45, 0]}>
        <Light type="directional" />
      </Entity>
      <Entity name="sphere">
        <Render type="sphere" />
      </Entity>
    </Application>
  )
}
```

</TabItem>
<TabItem value="demo" label="Live Demo">

You can see this example running live at [playcanvas-react.vercel.app/examples/hello-world](https://playcanvas-react.vercel.app/examples/hello-world).

</TabItem>
</Tabs>

You should now see a white sphere in the center of your screen!

## Making it Interactive

One of the great advantages of using React is how easy it is to add interactivity. Let's make our sphere respond to clicks.

```jsx
import { Application, Entity } from '@playcanvas/react'
import { Camera, Light, Render } from '@playcanvas/react/components'
import { useState } from 'react'

export default function App() {
  const [sphereColor, setSphereColor] = useState([1, 1, 1])
  
  const handleSphereClick = () => {
    // Change to a random color when clicked
    setSphereColor([Math.random(), Math.random(), Math.random()])
  }

  return (
    <Application>
      <Entity name="camera" position={[0, 0, 5]}>
        <Camera />
      </Entity>
      <Entity name="light" rotation={[45, 45, 0]}>
        <Light type="directional" />
      </Entity>
      <Entity name="sphere" onClick={handleSphereClick}>
        <Render type="sphere" />
      </Entity>
    </Application>
  )
}
```

You can see this interactive example running live at [playcanvas-react.vercel.app/examples/pointer-events](https://playcanvas-react.vercel.app/examples/pointer-events).

## Key Differences from Web Components

When building scenes with PlayCanvas React compared to [Web Components](/user-manual/web-components/):

1. **Component Structure**: Instead of HTML tags like `<pc-app>`, we use React components like `<Application>`
2. **Props vs Attributes**: We use React props with camelCase (e.g., `clearColor`) instead of HTML attributes
3. **Event Handling**: We can use React's event system directly (e.g., `onClick`)
4. **State Management**: We can leverage React hooks like `useState` for dynamic behavior
5. **Type Safety**: Full TypeScript support with type safety.

## Next Steps

Now that you've built your first scene, try:

- Adding more objects with different shapes (`box`, `cylinder`, `cone`, etc.)
- Experimenting with different light types (`point`, `spot`)
- Adding movement with the `OrbitControls` script
- Exploring physics by adding `RigidBody` and `Collision` components

Now you have the basics, see the [documentation](https://playcanvas-react.vercel.app/docs) for more examples.
