---
title: Using the Editor
sidebar_position: 4
---

Let's build a simple Gaussian splat application step by step using the [PlayCanvas Editor](/user-manual/editor). We'll create a scene with an interactive 3D toy cat splat that you can rotate around.

## Video Walk-Through

The complete process to build the app is in this short video:

<video autoPlay muted loop controls src='/video/my-first-splat-editor.mp4' style={{width: '100%', height: 'auto'}} />

Here are the actions demonstrated in the video as a set of steps you can follow:

## Creating a New Project

First, let's create a new PlayCanvas project:

1. Go to [playcanvas.com](https://playcanvas.com) and sign in to your account
2. Click **"NEW"** to create a new project
3. Select the **"Blank Project"** template
4. Enter a name like "My First Splat App"
5. Click **"CREATE"** to create the project

You will be taken to the new project's dashboard. Click the EDITOR button and the Editor will open with an empty scene containing just a camera, directional light, cube and plane.

:::warning Performance Optimization

For optimal splat rendering performance, disable anti-aliasing and device pixel ratio. Go to **Settings** → **Rendering** and uncheck both **"Anti-Alias"** and **"Device Pixel Ratio"**. This helps reduce the fragment processing load, which is the primary bottleneck in Gaussian splat rendering. Learn more in the [Performance](../engine-features/performance.md) guide.

:::

## Uploading the Splat Asset

First, download the toy cat splat to your local file system: [`https://developer.playcanvas.com/assets/toy-cat.compressed.ply`](https://developer.playcanvas.com/assets/toy-cat.compressed.ply)

Now let's add the downloaded splat to the project:

1. In the **ASSETS** panel (bottom of the screen), click the + icon
2. Select **"Upload"** from the popup menu
3. In the file open dialog, locate and select the `toy-cat.compressed.ply`

The PLY file will be processed and appear in your Assets panel as a GSplat asset.

## Creating the Splat Entity

Let's create an entity to display our splat:

1. In the **HIERARCHY** panel (left side), click the + icon
2. Select **"Entity"** from the popup menu to create a new entity
3. With the new entity selected, rename it to "Toy Cat" in the **INSPECTOR** panel (right side)

## Adding the GSplat Component

Now we'll add the component that displays Gaussian splats:

1. With the "Toy Cat" entity selected, scroll down in the **INSPECTOR** panel
2. Click **"ADD COMPONENT"**
3. Select **"Gaussian Splat"** from the component list

The GSplat component will be added to your entity.

## Assigning the Asset

Let's connect our uploaded splat asset to the component:

1. In the GSplat component properties, click the **asset picker** (pencil icon) for the Asset attribute
2. Select the toy cat PLY asset we uploaded earlier
3. The splat should now appear in the viewport!

## Positioning the Splat

The splat is not be positioned correctly. Let's adjust its transform:

1. With the "Toy Cat" entity still selected, look at the **ENTITY** header section in the Inspector
2. Set the **Rotation** to `0, 0, 180` (flips it to be the right way up)
3. Set the **Position** to `0, -0.7, 0` (centers it on the origin)

## Adding Camera Controls

To make the scene interactive, let's import a camera controls script from the Asset Store:

1. In the **ASSETS** panel, click the **"ASSET STORE"** button
2. In the Asset Store, filter by **SCRIPTS**
3. Find and select the **Orbit Camera** script by PlayCanvas and click **IMPORT**
4. Close the Asset Store panel by clicking the `x` icon (top right)

The script will be added to your project's Assets panel.

Now let's attach the script to our camera:

1. Select the **"Camera"** entity in the Hierarchy
2. In the Inspector, click **"ADD COMPONENT"** and select **"Script"**
3. In the Script component, click the **"Add Script"** dropdown
4. Select **"orbitCamera"** from the list (it should appear in the dropdown now)
5. Select **"orbitCameraInputMouse"** from the list
6. Select **"orbitCameraInputTouch"** from the list

The camera controls script is now attached and ready to use!

## Testing the Scene

Now let's test our interactive splat scene:

1. Click the **"LAUNCH"** button in the Viewport's toolbar to run the project
2. You should see the toy cat splat displayed in your browser
3. Try interacting with it:
   - **Left mouse drag**: Orbit around the splat
   - **Mouse wheel**: Zoom in and out

## Final Result

Congratulations! You've successfully created an interactive Gaussian splat application using the PlayCanvas Editor.

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/N0FSHHVn/" title="My First Splat" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

:::tip Next Steps

Now that you have a working splat app, try experimenting with:

- Swapping the toy cat PLY file for one of your own
- Adding a user interface
- Building more complex interactions with scripts

:::
