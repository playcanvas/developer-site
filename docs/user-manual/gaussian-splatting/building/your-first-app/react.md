---
title: Using PlayCanvas React
sidebar_position: 3
---

Let's build a simple Gaussian splat application step by step using [PlayCanvas React](/user-manual/playcanvas-react). We'll create a scene with an interactive 3D toy cat splat that you can rotate around.

## Starting Point

First, let's set up a basic React component structure. We'll start with the essential PlayCanvas React components:

```jsx
import React from 'react';
import { Application, Scene } from '@playcanvas/react';

function App() {
    return (
        <Application antialias={false} highResolution={false}>
            <Scene>
            </Scene>
        </Application>
    );
}

export default App;
```

This creates an empty 3D scene. However, we can't see anything rendered yet. We need a camera and some content.

:::warning Performance Optimization

We've disabled `antialias` and `highResolution` on the `Application` component for optimal splat rendering performance. These settings help reduce the fragment processing load, which is the primary bottleneck in Gaussian splat rendering. Learn more in the [Performance](../engine-features/performance.md) guide.

:::

:::note

PlayCanvas React uses JSX components that map to the underlying PlayCanvas Engine. Make sure you have `@playcanvas/react` installed in your React project.

:::

## Adding Assets

Before we can display a splat or add camera controls, we need to define the assets our app will use. Let's add a camera controls script and a splat asset using the `Asset` component:

```jsx {7-8}
import React from 'react';
import { Application, Scene, Asset } from '@playcanvas/react';

function App() {
    return (
        <Application antialias={false} highResolution={false}>
            <Asset id="camera-controls" src="https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs" preload />
            <Asset id="toy" src="https://developer.playcanvas.com/assets/toy-cat.compressed.ply" />
            <Scene>
            </Scene>
        </Application>
    );
}

export default App;
```

We've added two assets:
- A camera controls script that will let us orbit around the scene
- A compressed PLY file containing a toy cat splat

## Adding a Camera

To view our scene, we need a camera which we can add using the `Entity` and `Camera` components:

```jsx {10-12}
import React from 'react';
import { Application, Scene, Asset, Entity, Camera } from '@playcanvas/react';

function App() {
    return (
        <Application antialias={false} highResolution={false}>
            <Asset id="camera-controls" src="https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs" preload />
            <Asset id="toy" src="https://developer.playcanvas.com/assets/toy-cat.compressed.ply" />
            <Scene>
                <Entity position={[0, 0, -2.5]}>
                    <Camera />
                </Entity>
            </Scene>
        </Application>
    );
}

export default App;
```

We've positioned the camera 2.5 units down the negative Z axis. By default, a camera looks down the negative Z axis, so our camera is now looking toward the origin where we'll place our splat.

## Adding Camera Controls

Now let's make the camera interactive by adding the camera controls script using the `Scripts` and `Script` components:

```jsx {12-14}
import React from 'react';
import { Application, Scene, Asset, Entity, Camera, Scripts, Script } from '@playcanvas/react';

function App() {
    return (
        <Application antialias={false} highResolution={false}>
            <Asset id="camera-controls" src="https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs" preload />
            <Asset id="toy" src="https://developer.playcanvas.com/assets/toy-cat.compressed.ply" />
            <Scene>
                <Entity position={[0, 0, -2.5]}>
                    <Camera />
                    <Scripts>
                        <Script name="cameraControls" />
                    </Scripts>
                </Entity>
            </Scene>
        </Application>
    );
}

export default App;
```

The camera controls script will allow you to:
- **Left mouse drag**: Orbit around the target
- **Right mouse drag**: Pan the camera
- **Mouse wheel**: Zoom in and out

## Adding the Splat

Now let's add our toy cat splat to the scene using the `GSplat` component:

```jsx {16-18}
import React from 'react';
import { Application, Scene, Asset, Entity, Camera, Scripts, Script, GSplat } from '@playcanvas/react';

function App() {
    return (
        <Application antialias={false} highResolution={false}>
            <Asset id="camera-controls" src="https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs" preload />
            <Asset id="toy" src="https://developer.playcanvas.com/assets/toy-cat.compressed.ply" />
            <Scene>
                <Entity position={[0, 0, -2.5]}>
                    <Camera />
                    <Scripts>
                        <Script name="cameraControls" />
                    </Scripts>
                </Entity>
                <Entity position={[0, -0.7, 0]} rotation={[180, 0, 0]}>
                    <GSplat asset="toy" />
                </Entity>
            </Scene>
        </Application>
    );
}

export default App;
```

We've positioned the splat slightly below the origin (-0.7 on the Y axis) and rotated it 180 degrees around the X axis to orient it properly. The `asset="toy"` prop references the splat asset we defined earlier.

## Complete Code

Here's the complete React component with all the code from the steps above:

```jsx
import React from 'react';
import { Application, Scene, Asset, Entity, Camera, Scripts, Script, GSplat } from '@playcanvas/react';

function App() {
    return (
        <Application antialias={false} highResolution={false}>
            <Asset id="camera-controls" src="https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs" preload />
            <Asset id="toy" src="https://developer.playcanvas.com/assets/toy-cat.compressed.ply" />
            <Scene>
                <Entity position={[0, 0, -2.5]}>
                    <Camera />
                    <Scripts>
                        <Script name="cameraControls" />
                    </Scripts>
                </Entity>
                <Entity position={[0, -0.7, 0]} rotation={[180, 0, 0]}>
                    <GSplat asset="toy" />
                </Entity>
            </Scene>
        </Application>
    );
}

export default App;
```

## Final Result

After completing the steps above, you should see an interactive 3D toy cat splat that you can orbit around, pan, and zoom!

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="MYgGZax" title="<pc-splat> example" />

:::tip Try it yourself

Add the complete JSX code above to your React component and run your application to see your first splat app in action! Then extend it in any way you like using the full power of PlayCanvas React!

:::
