---
title: Using PlayCanvas React
---

Let's build a simple Gaussian splat application step by step using [PlayCanvas React](/user-manual/playcanvas-react). We'll create a scene with an interactive 3D toy cat splat that you can rotate around.

## Starting Point

First, let's set up a basic React component structure. We'll start with the essential PlayCanvas React components:

```jsx
import './App.css'
import { Application } from '@playcanvas/react'
import { FILLMODE_FILL_WINDOW, RESOLUTION_AUTO } from 'playcanvas'

function Scene() {
    return null;
}

export default function App() {
    return (
        <Application
            fillMode={FILLMODE_FILL_WINDOW}
            resolutionMode={RESOLUTION_AUTO}
            graphicsDeviceOptions={{ antialias: false }}
        >
            <Scene />
        </Application>
    );
}
```

This creates an empty 3D scene with optimal settings for web applications. However, we can't see anything rendered yet. We need a camera and some content.

:::warning Performance Optimization

We've configured the `Application` with `graphicsDeviceOptions={{ antialias: false }}` for optimal splat rendering performance. Setting `antialias` to `false` reduces the fragment processing load, which is the primary bottleneck in Gaussian splat rendering. Learn more in the [Performance](../engine-features/performance.md) guide.

:::

## Adding a Camera

To view our scene, we need a camera which we can add using the `Entity` component with `Camera` and `OrbitControls`:

```jsx {3-4,8-13}
import './App.css'
import { Application, Entity } from '@playcanvas/react'
import { Camera } from '@playcanvas/react/components'
import { OrbitControls } from '@playcanvas/react/scripts'
import { FILLMODE_FILL_WINDOW, RESOLUTION_AUTO } from 'playcanvas'

function Scene() {
    return (
        <Entity position={[0, 0, -2.5]}>
            <Camera />
            <OrbitControls />
        </Entity>
    );
}

export default function App() {
    return (
        <Application
            fillMode={FILLMODE_FILL_WINDOW}
            resolutionMode={RESOLUTION_AUTO}
            graphicsDeviceOptions={{ antialias: false }}
        >
            <Scene />
        </Application>
    );
}
```

We've positioned the camera 2.5 units down the negative Z axis. By default, a camera looks down the negative Z axis, so our camera is now looking toward the origin where we'll place our splat. The `OrbitControls` will allow you to:

- **Left mouse drag**: Orbit around the target
- **Right mouse drag**: Pan the camera
- **Mouse wheel**: Zoom in and out

## Adding the Splat

Now let's add our toy cat splat to the scene using the `useSplat` hook and `GSplat` component:

```jsx {3,5,9-11,15-17}
import './App.css'
import { Application, Entity } from '@playcanvas/react'
import { Camera, GSplat } from '@playcanvas/react/components'
import { OrbitControls } from '@playcanvas/react/scripts'
import { useSplat } from '@playcanvas/react/hooks'
import { FILLMODE_FILL_WINDOW, RESOLUTION_AUTO } from 'playcanvas'

function Scene() {
    const { asset } = useSplat('toy-cat.compressed.ply');

    if (!asset) return null;

    return (
        <>
            <Entity position={[0, -0.7, 0]} rotation={[0, 0, 180]}>
                <GSplat asset={asset} />
            </Entity>
            <Entity position={[0, 0, -2.5]}>
                <Camera />
                <OrbitControls />
            </Entity>
        </>
    );
}

export default function App() {
    return (
        <Application
            fillMode={FILLMODE_FILL_WINDOW}
            resolutionMode={RESOLUTION_AUTO}
            graphicsDeviceOptions={{ antialias: false }}
        >
            <Scene />
        </Application>
    );
}
```

We've added several important elements:

- **`useSplat` hook**: Loads the splat asset from the URL
- **Conditional rendering**: `if (!asset) return null;` ensures we don't render until the asset is loaded
- **GSplat positioning**: The splat is positioned slightly below the origin (-0.7 on the Y axis) and rotated 180 degrees around the Z axis to orient it properly
- **React Fragment**: We use `<>...</>` to return multiple entities without a wrapper

## Complete Code

Here's the complete React component with all the code from the steps above:

```jsx
import './App.css'
import { Application, Entity } from '@playcanvas/react'
import { Camera, GSplat } from '@playcanvas/react/components'
import { OrbitControls } from '@playcanvas/react/scripts'
import { useSplat } from '@playcanvas/react/hooks'
import { FILLMODE_FILL_WINDOW, RESOLUTION_AUTO } from 'playcanvas'

function Scene() {
    const { asset } = useSplat('toy-cat.compressed.ply');

    if (!asset) return null;

    return (
        <>
            <Entity position={[0, -0.7, 0]} rotation={[0, 0, 180]}>
                <GSplat asset={asset} />
            </Entity>
            <Entity position={[0, 0, -2.5]}>
                <Camera />
                <OrbitControls />
            </Entity>
        </>
    );
}

export default function App() {
    return (
        <Application
            fillMode={FILLMODE_FILL_WINDOW}
            resolutionMode={RESOLUTION_AUTO}
            graphicsDeviceOptions={{ antialias: false }}
        >
            <Scene />
        </Application>
    );
}
```

## Final Result

After completing the steps above, you should see an interactive 3D toy cat splat that you can orbit around, pan, and zoom!

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="MYgGZax" title="<pc-splat> example" />

:::tip Try it yourself

Add the complete JSX code above to your React component and run your application to see your first splat app in action! Then extend it in any way you like using the full power of PlayCanvas React!

:::
