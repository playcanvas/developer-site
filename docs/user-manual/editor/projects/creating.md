---
title: Creating Projects
description: Creates projects from starter kits or forks walks privacy rules and explains duplicating projects for templates or backups.
---

You can create Editor projects in two ways:

1. Create a project based on a number of predefined starter kits.
2. Fork an existing project, using it as a starting point.

Both can be done from the Editor's [projects home](/user-manual/editor/projects/projects-home/) or from playcanvas.com.

## Create a Project from the Projects Home {#create-a-project-from-the-projects-home}

1. Open the projects home at [playcanvas.com/editor](https://playcanvas.com/editor).
2. Select **New project** in the sidebar.
3. Pick a starter kit. **Empty Project** creates a project with nothing in it. **Blank Project**, the default, starts with a skybox, a cube and a plane.
4. Set the name, description and owner, and choose whether the project is **Private**.
5. Select **Create project**.

<video autoPlay muted loop controls src='/video/editor-projects-home-new-project.mp4' style={{width: '100%', height: 'auto'}} />

When the project is ready, the dialog says "Your new project is ready. It opens in a new tab." Select **Open project** to open it in its own tab, or **Not now** to stay on the projects home.

## Create a New Project from a Starter Kit

To create a new project:

1. Log in to your PlayCanvas account and navigate to your [User Page](https://playcanvas.com/)
2. Click the **NEW** button in the top right corner

![New Project Button](/img/user-manual/editor/projects/new-project-button.png)

### Selecting a Starter Kit

All Editor projects are created based on a starter kit.

![New Project Dialog](/img/user-manual/editor/projects/new-project-dialog.png)

PlayCanvas offers several starter kits to get you started quickly:

- **Blank Project**: A minimal project with a camera, light, sky and some basic shapes
- **Model Viewer**: A simple starter kit for viewing 3D models
- **VR Kit**: A starter kit showing how to enter and exit a WebXR-based VR session
- **Roll a Ball**: A simple physics-based 3D game
- **WebXR AR Starter Kit**: A starter kit showing how to initiate a WebXR-based AR session
- **First Person Shooter**: The basis for an FPS-type game or experience

Pick a starter kit, set a name, description and owner, and select whether your project should be public or private. Then hit **CREATE**.

:::note

You can only create private projects with a Personal or Organization plan.

:::

## Fork an Existing Project {#fork-an-existing-project}

Forking allows you to create a new project based on an existing public project (or a private project of which you are a team member). This is useful for:

- Using another project as a starting point for your own work
- Creating backups of your own projects
- Learning from example projects created by other developers
- Experimenting with modifications without affecting the original

### How to Fork a Project

To fork a project from the [projects home](/user-manual/editor/projects/projects-home/):

1. Select the **⋮** button on the project's card or row, then **Fork**.
2. The fork dialog shows the project you are forking from, with its name and description filled in. Change them, and the owner, as needed.
3. Select **Fork project**.

<video autoPlay muted loop controls src='/video/editor-projects-home-fork.mp4' style={{width: '100%', height: 'auto'}} />

The dialog explains why instead of showing the form when a project can't be forked: it uses legacy scripts, its owner keeps its source assets private and you can't edit it, or it is private and the new owner has no paid plan.

To fork a project from playcanvas.com:

1. Navigate to the project's dashboard page
2. Click the **Fork** button in the dashboard header
3. Enter a name for your new project
4. Click **FORK**

![Fork Project Button](/img/user-manual/editor/projects/fork-project-button.png)

### What Gets Forked

When you fork a project, the entire main branch is copied to your new project:

- All scenes and their settings
- All assets (textures, models, scripts, etc.)
- Project settings

### What Doesn't Get Forked

Forking has some limitations:

- **Version control history** is not preserved
- **Only the main branch** is copied (other branches are ignored)
- **Team members** are not copied (you become the sole owner)
- **Development logs** and project activity are not copied

### After Forking

Once your fork is created:

- You have full ownership and control over the new project
- You can modify, delete, or further develop the project as needed
- The fork is completely independent from the original project
- You can add your own team members and configure project settings

Forked projects appear in your project list just like any other project you've created.

:::tip

The project dashboard for your fork has a **Forked From** property. Click the link to visit the dashboard of the upstream project that was originally forked.

:::
