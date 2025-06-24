---
title: Building a Scene
---

import { Application, Entity } from '@playcanvas/react';
import { Camera, Render, Light, Collision } from '@playcanvas/react/components';
import { useState, lazy } from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import InteractiveSource from '!!raw-loader!@site/src/components/playcanvas-react-example';
import CodeBlock from '@theme/CodeBlock';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const LazyInteractive = lazy(() => import('@site/src/components/playcanvas-react-example'));

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

export const CompleteScene = () => {
  return (
    <div style={{height: '400px', width: '100%', position: 'relative'}}>
      <Application>
        <Entity name="camera" position={[0, 0, 5]}>
          <Camera clearColor="#1a1a1a" />
        </Entity>
        <Entity name="light" rotation={[45, 45, 0]}>
          <Light type="directional" intensity={1} />
        </Entity>
        <Entity name="sphere">
          <Render type="sphere" />
        </Entity>
      </Application>
    </div>
  );
};

<CompleteScene />

</TabItem>
</Tabs>

You should now see a white sphere in the center of your screen!

## Making it Interactive

One of the great advantages of using React is how easy it is to add interactivity. Let's make our sphere respond to clicks.

**Click on the Demo Tab to view the results.**

<Tabs>
    <TabItem default value="code" label="Code">
      <CodeBlock language="jsx">{InteractiveSource}</CodeBlock>
    </TabItem>
    <TabItem  value="demo" label="Demo" className='example-demo'>
      <BrowserOnly>
        <LazyInteractive/>
      </BrowserOnly>
    </TabItem>
</Tabs>

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
