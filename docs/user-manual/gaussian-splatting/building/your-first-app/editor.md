---
title: Using the Editor
sidebar_position: 4
---

Let's build a simple Gaussian splat application step by step using the [PlayCanvas Editor](/user-manual/editor). We'll create a scene with an interactive 3D toy cat splat that you can rotate around.

## Creating a New Project

First, let's create a new PlayCanvas project:

1. Go to [playcanvas.com](https://playcanvas.com) and sign in to your account
2. Click **"NEW"** to create a new project
3. Select the **"Blank Project"** template
4. Enter a name like "My First Splat App"
5. Click **"CREATE"** to create the project

<!-- ![Creating a new project](/img/user-manual/gaussian-splatting/building/editor-new-project.png) -->

The Editor will open with an empty scene containing just a camera and directional light.

:::warning Performance Optimization

For optimal splat rendering performance, we'll disable anti-aliasing. Go to **Settings** → **Rendering** and uncheck **"Anti-alias"**. This helps reduce the fragment processing load, which is the primary bottleneck in Gaussian splat rendering.

:::

<!-- ![Disabling anti-aliasing in settings](/img/user-manual/gaussian-splatting/building/editor-disable-antialiasing.png) -->

## Uploading the Splat Asset

Now let's add our toy cat splat to the project:

1. In the **Assets** panel (bottom of the screen), right-click in an empty area
2. Select **"Upload"** from the context menu
3. In the upload dialog, enter this URL: `https://developer.playcanvas.com/assets/toy-cat.compressed.ply`
4. Click **"UPLOAD"** to add the asset to your project

<!-- ![Uploading a PLY asset](/img/user-manual/gaussian-splatting/building/editor-upload-asset.png) -->

The PLY file will be processed and appear in your Assets panel as a GSplat asset.

<!-- ![GSplat asset in Assets panel](/img/user-manual/gaussian-splatting/building/editor-gsplat-asset.png) -->

## Creating the Splat Entity

Let's create an entity to display our splat:

1. In the **Hierarchy** panel (left side), right-click on "Root"
2. Select **"Entity"** from the context menu to create a new entity
3. With the new entity selected, rename it to "Toy Cat" in the **Inspector** panel (right side)

<!-- ![Creating a new entity](/img/user-manual/gaussian-splatting/building/editor-create-entity.png) -->

## Adding the GSplat Component

Now we'll add the component that displays Gaussian splats:

1. With the "Toy Cat" entity selected, scroll down in the **Inspector** panel
2. Click **"ADD COMPONENT"**
3. Select **"GSplat"** from the component list

<!-- ![Adding GSplat component](/img/user-manual/gaussian-splatting/building/editor-add-gsplat-component.png) -->

The GSplat component will be added to your entity.

## Assigning the Asset

Let's connect our uploaded splat asset to the component:

1. In the GSplat component properties, click the **asset picker** (empty field next to "Asset")
2. Select the toy cat PLY asset we uploaded earlier
3. The splat should now appear in the viewport!

<!-- ![Assigning the GSplat asset](/img/user-manual/gaussian-splatting/building/editor-assign-asset.png) -->

## Positioning the Splat

The splat might not be positioned perfectly. Let's adjust its transform:

1. With the "Toy Cat" entity still selected, look at the **Transform** section in the Inspector
2. Set the **Position** to `0, -0.7, 0` (moves it down slightly)
3. Set the **Rotation** to `180, 0, 0` (flips it to face the correct direction)

<!-- ![Adjusting splat position and rotation](/img/user-manual/gaussian-splatting/building/editor-transform-splat.png) -->

## Adding Camera Controls

To make the scene interactive, let's import a camera controls script from the Asset Store:

1. In the **Assets** panel, click the **"Asset Store"** button (shopping cart icon)
2. In the Asset Store, search for **"camera controls"**
3. Find the **"Camera Controls"** script by PlayCanvas and click **"ADD TO PROJECT"**
4. Click **"IMPORT"** in the confirmation dialog

<!-- ![Importing camera controls from Asset Store](/img/user-manual/gaussian-splatting/building/editor-import-camera-controls.png) -->

The script will be added to your project's Assets panel.

<!-- ![Camera controls script in Assets panel](/img/user-manual/gaussian-splatting/building/editor-camera-controls-asset.png) -->

Now let's attach the script to our camera:

1. Select the **"Camera"** entity in the Hierarchy
2. In the Inspector, click **"ADD COMPONENT"** and select **"Script"**
3. In the Script component, click the **"Add Script"** dropdown
4. Select **"camera-controls"** from the list (it should appear in the dropdown now)

<!-- ![Attaching camera controls script](/img/user-manual/gaussian-splatting/building/editor-attach-script.png) -->

The camera controls script is now attached and ready to use!

## Testing the Scene

Now let's test our interactive splat scene:

1. Click the **"LAUNCH"** button (play icon) in the toolbar to run the project
2. You should see the toy cat splat displayed in your browser
3. Try interacting with it:
   - **Left mouse drag**: Orbit around the splat
   - **Mouse wheel**: Zoom in and out
   - **Touch drag**: Orbit on mobile devices

<!-- ![Running the splat app](/img/user-manual/gaussian-splatting/building/editor-launch-app.png) -->

## Final Result

Congratulations! You've successfully created an interactive Gaussian splat application using the PlayCanvas Editor.

<!-- ![Final splat application](/img/user-manual/gaussian-splatting/building/editor-final-result.png) -->

:::tip Next Steps

Now that you have a working splat app, try experimenting with:

- Different PLY files from the [Asset Store](/user-manual/assets/asset-store)
- Adding lighting effects to enhance the scene
- Creating multiple splat entities
- Building more complex interactions with scripts

:::
