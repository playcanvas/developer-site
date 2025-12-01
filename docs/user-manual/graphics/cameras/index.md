---
title: Cameras
---

Cameras are responsible for rendering a scene to the screen. You need at least one camera in your scene to see anything. When you create a new scene in PlayCanvas, it is automatically populated with a single camera (along with a directional light).

## Creating a Camera

In the Editor's 3D View, a unselected camera is represented with the following icon:

![Camera icon](/img/user-manual/graphics/cameras/camera_icon.png)

To create a new camera, simply create a new entity and add a camera component to it. For convenience, the Editor menu has an item that does this in a single step:

![Camera creation](/img/user-manual/graphics/cameras/camera_create.png)

## Orthographic vs Perspective Projection

Camera's can have one of two types of projection: orthographic or perspective. Orthographic camera define a parallel projection and is often use for 2D or isometric games.

![Orthographic camera](/img/user-manual/graphics/cameras/camera_orthographic.png)

More commonly used is the perspective projection. It more closely mimics how our eyes or cameras work.

![Perspective camera](/img/user-manual/graphics/cameras/camera_perspective.png)

## Controlling the Viewport

By default, a camera will render to the full width and height of its render target. However, there are circumstances where you might want to change this behavior. For example, perhaps you are writing a game that has a local multiplayer mode that requires split-screen rendering to show each player's viewpoint.

For 2-player horizontal split screen, you would create two cameras and configure their viewports as follows:

![Horizontal splitscreen](/img/user-manual/graphics/cameras/camera_horizontal_splitscreen.png)

And for vertical split screen, you would configure the viewports as follows:

![Vertical splitscreen](/img/user-manual/graphics/cameras/camera_vertical_splitscreen.png)
