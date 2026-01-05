---
title: Using PlayCanvas React
---

import { Application, Entity } from '@playcanvas/react'
import { Camera, GSplat, Script } from '@playcanvas/react/components'
import { useSplat } from '@playcanvas/react/hooks'
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs'

export function ToyCat() {
    const { asset } = useSplat('/assets/toy-cat.sog');
    if (!asset) return null;

    return (
        <Entity position={[0, -0.7, 0]} rotation={[0, 0, 180]}>
            <GSplat asset={asset} />
        </Entity> 
    );
}

export function Demo() {
    return (
        <div style={{ width: '100%', height: '400px', marginBottom: '2rem', borderRadius: '8px', overflow: 'hidden' }}>
            <Application graphicsDeviceOptions={{ antialias: false }} >
                <Entity position={[0, 0, 2.5]}>
                    <Camera />
                    <Script script={CameraControls} />
                </Entity>
                <ToyCat />
            </Application>
        </div>
    );
}

Let's build a simple Gaussian splat application step by step using [PlayCanvas React](/user-manual/react). We'll create a scene with an interactive 3D toy cat splat that you can rotate around.

## Starting Point

First, let's set up a basic React component structure. We'll start with the essential PlayCanvas React components:

```jsx
import { Application } from '@playcanvas/react'

export default function App() {
    return (
        <Application graphicsDeviceOptions={{ antialias: false }} >
        </Application>
    );
}
```

This creates an empty 3D scene with optimal settings for web applications. However, we can't see anything rendered yet. We need a camera and some content.

:::warning Performance Optimization

We've configured the `Application` with `graphicsDeviceOptions={{ antialias: false }}` for optimal splat rendering performance. Setting `antialias` to `false` reduces the fragment processing load, which is the primary bottleneck in Gaussian splat rendering. Learn more in the [Performance](../engine-features/performance.md) guide.

:::

## Adding a Camera

To view our scene, we need a camera which we can add using the `Entity` component with `Camera` and `CameraControls`:

```jsx {2-3,8-11}
import { Application, Entity } from '@playcanvas/react'
import { Camera, Script } from '@playcanvas/react/components'
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs'

export default function App() {
    return (
        <Application graphicsDeviceOptions={{ antialias: false }} >
            <Entity name="Camera" position={[0, 0, 2.5]}>
                <Camera />
                <Script script={CameraControls} />
            </Entity>
        </Application>
    );
}
```

We've positioned the camera 2.5 units down the Z axis. By default, a camera looks down the negative Z axis, so our camera is now looking toward the origin where we'll place our splat. The `CameraControls` will allow you to:

- **Left mouse drag**: Orbit around the target
- **Right mouse drag**: Pan the camera
- **Mouse wheel**: Zoom in and out

## Adding the Splat

Now let's add our toy cat splat as a component using the `useSplat` hook and `GSplat` component:

```jsx {2,4,6-15,24}
import { Application, Entity } from '@playcanvas/react'
import { Camera, GSplat, Script } from '@playcanvas/react/components'
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs'
import { useSplat } from '@playcanvas/react/hooks'

function ToyCat() {
    const { asset } = useSplat('toy-cat.sog');
    if (!asset) return null;

    return (
        <Entity position={[0, -0.7, 0]} rotation={[0, 0, 180]}>
            <GSplat asset={asset} />
        </Entity>
    );
}

export default function App() {
    return (
        <Application graphicsDeviceOptions={{ antialias: false }} >
            <Entity name="Camera" position={[0, 0, 2.5]}>
                <Camera />
                <Script script={CameraControls} />
            </Entity>
            <ToyCat />
        </Application>
    );
}
```

We've added several important elements:

- **`useSplat` hook**: Loads the splat asset from the URL
- **Conditional rendering**: `if (!asset) return null;` ensures we don't render until the asset is loaded
- **GSplat positioning**: The splat is positioned slightly below the origin (-0.7 on the Y axis) and rotated 180 degrees around the Z axis to orient it properly
- **Single Entity**: The ToyCat component returns a single Entity containing the GSplat

## Complete Code

Here's the complete React component with all the code from the steps above:

```jsx
import { Application, Entity } from '@playcanvas/react'
import { Camera, GSplat, Script } from '@playcanvas/react/components'
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs'
import { useSplat } from '@playcanvas/react/hooks'

function ToyCat() {
    const { asset } = useSplat('toy-cat.sog');
    if (!asset) return null;

    return (
        <Entity position={[0, -0.7, 0]} rotation={[0, 0, 180]}>
            <GSplat asset={asset} />
        </Entity>
    );
}

export default function App() {
    return (
        <Application graphicsDeviceOptions={{ antialias: false }} >
            <Entity name="Camera" position={[0, 0, 2.5]}>
                <Camera />
                <Script script={CameraControls} />
            </Entity>
            <ToyCat />
        </Application>
    );
}
```

## Final Result

After completing the steps above, you should see an interactive 3D toy cat splat that you can orbit around, pan, and zoom!

<Demo />

:::tip Try it yourself

Add the complete JSX code above to your React component and run your application to see your first splat app in action! Then extend it in any way you like using the full power of PlayCanvas React!

:::
