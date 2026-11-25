---
title: Importing your first Model and Animation
description: Import a free rigged character into the Editor, add it to the scene and play a looping run animation with the Anim component.
tags: [animation,basics]
kind: tutorial
topic: Basics
thumb: /img/tutorials/importing-first-model-and-animation/thumbnail.webp
---

import StepVideo from '@site/src/components/StepVideo';

In this tutorial, you'll import a rigged character and its animations into the PlayCanvas Editor, add the character to your scene and make it run on the spot. This is the result:

<StepVideo src="/video/tutorials/importing-first-model-and-animation/preview.mp4" poster="/img/tutorials/importing-first-model-and-animation/preview.webp" width={960} height={540} label="The Knight character running on the spot in the launched scene" />

:::info[Before you start]

You need a free [PlayCanvas account](https://login.playcanvas.com/signup). Create a new project from the **Blank Project** starter kit, as in [Your First App](/user-manual/editor/getting-started/your-first-app/#create-a-project), and open it in the Editor. Then select the **Box** entity in the Hierarchy and press <kbd>Delete</kbd>, so it doesn't hide the character.

:::

## Getting the Example Assets

This tutorial uses the [KayKit Character Pack: Adventurers](https://kaylousberg.itch.io/kaykit-adventurers) by Kay Lousberg. The free version is released under [CC0](https://creativecommons.org/publicdomain/zero/1.0/), a public domain license, so you can use it in any project without giving credit.

1. On the pack's page, select **Download Now**.
2. The pack is name-your-own-price. To download it for free, select **No thanks, just take me to the downloads**.
3. Download the **Free** version, `KayKit_Adventurers_2.0_FREE.zip`.

Unzip the file. The pack comes in several formats. This tutorial uses the glTF binary (`.glb`) files, the [format PlayCanvas recommends](/user-manual/assets/supported-formats/), which are in the `gltf` folders:

```none
KayKit_Adventurers_2.0_FREE/
├── Characters/
│   └── gltf/
│       ├── Barbarian.glb
│       ├── Knight.glb
│       └── ...
└── Animations/
    └── gltf/
        └── Rig_Medium/
            ├── Rig_Medium_General.glb
            └── Rig_Medium_MovementBasic.glb
```

The characters and their animations are in separate files. All the characters share the same skeleton, called `Rig_Medium`, so every animation in the pack works on every character.

## Importing the Model

Start with the Knight:

1. In the Assets panel, select **+** and then **Upload**. You can also drag the file from your computer onto the Assets panel.
2. Choose `Characters/gltf/Knight.glb`.

<StepVideo src="/video/tutorials/importing-first-model-and-animation/importing-model.mp4" poster="/img/tutorials/importing-first-model-and-animation/importing-model.webp" label="Uploading Knight.glb from the Assets panel's + menu. The import creates a Knight.glb folder of assets" />

The Editor imports the file into a new `Knight.glb` folder and creates these assets from it:

- **Knight**, a template asset. It holds the character's full entity hierarchy, and you use it to add the character to the scene.
- **Knight.glb**, the container asset, which holds the imported model data.
- **knight**, a material asset.
- **knight_texture.png**, a texture asset. The texture was embedded in the GLB file, so the import also assigned it to the material.
- A render asset for each part of the character's mesh, such as **Knight_Body** and **Knight_Helmet**.

The original `Knight.glb` file is kept as a source asset, too.

:::tip

If you import models into an existing project, select the cog icon in the [Toolbar](/user-manual/editor/interface/toolbar/) to open the **Settings**, and check that **Import Hierarchy** and **Create FBX Folder** are ticked in the **Asset Import** section. Import Hierarchy creates the template asset, and Create FBX Folder puts the imported assets in their own folder, for every model format. For FBX files, also tick **Convert to GLB**. See [Asset Import settings](/user-manual/editor/interface/settings/asset-import/) for the full list.

![The Model Import Settings in the Asset Import section of the Settings](/img/tutorials/importing-first-model-and-animation/asset-import-settings.webp)

:::

## Adding the Model Template to the Scene

A template asset, known as a prefab in other game engines, adds the whole character to the scene in one go. There are several ways to add an instance of it.

Drag the template into the Viewport:

<StepVideo src="/video/tutorials/importing-first-model-and-animation/template-add-scene-view.mp4" poster="/img/tutorials/importing-first-model-and-animation/template-add-scene-view.webp" label="Dragging the Knight template from the Assets panel into the Viewport" />

Or drag it into an empty area of the Hierarchy, which adds it as a child of the topmost entity, **Root**. Dropping it onto an entity in the Hierarchy adds it as a child of that entity instead.

<StepVideo src="/video/tutorials/importing-first-model-and-animation/template-add-hierarchy.mp4" poster="/img/tutorials/importing-first-model-and-animation/template-add-hierarchy.webp" label="Dragging the Knight template into the empty area of the Hierarchy" />

Or right-click an entity in the Hierarchy, select **Template** and then **Add Instance**, and pick the template in the Assets panel. The instance is added as a child of the entity you right-clicked.

<StepVideo src="/video/tutorials/importing-first-model-and-animation/template-add-context-menu.mp4" poster="/img/tutorials/importing-first-model-and-animation/template-add-context-menu.webp" label="Right-clicking Root, selecting Template and Add Instance, then picking the Knight template" />

Use whichever you like, but add only one Knight to the scene. To learn more about templates, see [Templates](/user-manual/editor/templates/).

## Checking the Material and Texture

The Knight already has its texture, because it was embedded in `Knight.glb`. Select the **knight** material in the Assets panel to see it in the Inspector. The texture is in the **Diffuse** section:

<StepVideo src="/video/tutorials/importing-first-model-and-animation/material-texture.mp4" poster="/img/tutorials/importing-first-model-and-animation/material-texture.webp" label="Selecting the knight material. The Inspector shows knight_texture.png in the Diffuse slot" />

Not every model file includes its textures. FBX files, for example, often keep them as separate image files, and a model imported without them looks plain white. In that case, upload the image files too, and then add each texture to its material: drag the texture asset onto the material's slot in the Inspector, or select the slot's pencil (edit) button and pick the texture in the Assets panel. To learn more about materials, see the [Material Inspector](/user-manual/editor/assets/inspectors/material/).

## Importing the Animations

The animations are in their own file. To import them, go back to the root folder (**/**) of the Assets panel, then select **+** and **Upload** again, and choose `Animations/gltf/Rig_Medium/Rig_Medium_MovementBasic.glb`.

<StepVideo src="/video/tutorials/importing-first-model-and-animation/importing-animation.mp4" poster="/img/tutorials/importing-first-model-and-animation/importing-animation.webp" label="Uploading Rig_Medium_MovementBasic.glb. The import creates an animation asset for each clip in the file" />

The import creates an animation asset for each clip in the file, such as **Running_A.glb**, **Walking_A.glb** and **Jump_Full_Long.glb**.

The file also contains a mannequin character to show the animations on. You don't need it, so you can delete its assets. Switch the Assets panel to the **Details** view (the list icon) to see each asset's type. Select **Character_Material**, the six **Mannequin_** render assets, the **Rig_Medium_MovementBasic** template and the **Rig_Medium_MovementBasic.glb** container. <kbd>Ctrl</kbd>-click (<kbd>Cmd</kbd>-click on macOS) to select more than one. Then press <kbd>Delete</kbd> and select **Delete**. Keep the animation assets and the **Model (source)** asset.

<StepVideo src="/video/tutorials/importing-first-model-and-animation/delete-extra-assets.mp4" poster="/img/tutorials/importing-first-model-and-animation/delete-extra-assets.webp" label="Selecting the mannequin's material, render, template and container assets in the Details view and deleting them" />

To preview an animation, select it in the Assets panel. The Inspector needs a character to play it on. Select the pencil (edit) button of **Preview Asset**, open the `Knight.glb` folder and pick the **Knight** template:

<StepVideo src="/video/tutorials/importing-first-model-and-animation/animation-preview.mp4" poster="/img/tutorials/importing-first-model-and-animation/animation-preview.webp" label="Selecting Running_A.glb and picking the Knight template as its Preview Asset. The Knight runs in the Inspector" />

## Animating the Model

To play an animation on the character, you need an Anim State Graph asset and an Anim component on the character's entity.

To create the graph, select **+** in the Assets panel and then **Anim State Graph**. The Editor creates a **New Anim State Graph** asset.

<StepVideo src="/video/tutorials/importing-first-model-and-animation/create-anim-state-graph.mp4" poster="/img/tutorials/importing-first-model-and-animation/create-anim-state-graph.webp" label="Creating an Anim State Graph asset from the Assets panel's + menu" />

A state graph can have many states, and each state plays an animation. Transitions with conditions control the flow from one state to another. A new graph has a single state, **Initial State**, which loops. Select **Open Graph Editor** in the Inspector to see it:

![The new graph in the graph editor: START leads to Initial State, which has loop ticked](/img/tutorials/importing-first-model-and-animation/anim-state-graph.webp)

This tutorial only needs that one state with one animation. To learn about states, transitions and parameters, see [State Graphs](/user-manual/animation/state-graphs/) and the rest of the [Animation](/user-manual/animation/) section.

Now add the Anim component to the character:

1. Select the **Knight** entity in the Hierarchy.
2. In the Inspector, select **Add Component**, then **Animation** and **Anim**.

<StepVideo src="/video/tutorials/importing-first-model-and-animation/add-anim-component.mp4" poster="/img/tutorials/importing-first-model-and-animation/add-anim-component.webp" label="Adding an Anim component to the Knight entity from the Add Component menu" />

Then give the component its graph and animation:

1. Drag the **New Anim State Graph** asset onto the component's **State Graph** slot. The states of the graph appear in the component.
2. Open the `Rig_Medium_MovementBasic.glb` folder and drag **Running_A.glb** onto the **Initial State** slot.

<StepVideo src="/video/tutorials/importing-first-model-and-animation/add-animation-to-anim.mp4" poster="/img/tutorials/importing-first-model-and-animation/add-animation-to-anim.webp" label="Dragging the state graph onto the State Graph slot, then Running_A.glb onto the Initial State slot" />

The Knight entity is an instance of the template, so the Inspector lists the new component as an override of it. You can leave it as an override, or select **Apply All** to save the component to the template as well.

Select **Launch** at the top right of the Viewport. The scene opens in a new tab, and the Knight runs on the spot.

That's it! You've imported your first model and looping animation into PlayCanvas. Try the other animations in the pack, such as **Walking_A.glb**, by dragging them onto the **Initial State** slot, or import another character from the pack and give it its own Anim component.
