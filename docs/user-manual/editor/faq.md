---
title: Common Questions
---



## How do I add a component?

To add a **component** to an Entity, select the Entity and then click **Add Component** in the **Inspector** or right click on the Entity and select a component from the Add Component context menu.

[Learn more](/user-manual/scenes/components/)

## How do I add a script?

<img src="https://playcanvas.com/static-assets/instructions/add-new-script.gif" />

You can use JavaScript to control the behavior of entities. Select any entity, add a script component and create a new script asset.

[Learn more](/user-manual/scripting/editor-users/managing-scripts/)

## How do I change the background color?

To change the background color of your scene, you should update the Clear Color property of the camera in your scene.

You could also try and adding a [skybox](/user-manual/assets/types/cubemap/) to your scene.

[Learn more](/user-manual/scenes/components/camera/)

## How do I change the material of a model?

<img src="https://playcanvas.com/static-assets/instructions/change_material.gif" />

Every surface on a 3D model is rendered using a **material**. The material defines the properties of that surface, such as its color, shininess, bumpiness etc.

You can create a new material and drag and drop it on your model or you can select its existing materials and edit their properties in the Inspector.

[Learn more](/user-manual/assets/types/material/)

## How do I create a cubemap?

<img src="https://playcanvas.com/static-assets/instructions/new_cubemap.gif" />

Cubemaps are a special type of texture asset. They are formed from 6 texture assets where each texture represents the face of a cube.

To create a cubemap click on the **<span class="pc-icon">&#57632;</span> Add** button in the Assets panel and select **New Cubemap**. Then drag 6 textures in the cubemap inspector. To take advantage of Physically Based Rendering make sure you click **Prefilter** after setting the 6 textures.

[Learn more](/user-manual/assets/types/cubemap/)

## How do I create an Entity?

<img src="https://playcanvas.com/static-assets/instructions/new_entity.gif" />

You can create a new Entity by clicking on the <span class="pc-icon">&#57632;</span> Add button in the Hierarchy panel or right click on an Entity and use the **New Entity** menu item.

## How do I create a light?

You can create a light by adding a **Light** component to an Entity. You can also right click on an Entity and select New Entity / Directional Light to create a new directional light and similarly for spot lights and omni lights.

[Learn more](/user-manual/scenes/components/light/)

## How do I create a material?

Every surface on a 3D model is rendered using a **material**. The material defines the properties of that surface, such as its color, shininess, bumpiness etc.

To create a material click on the **<span class="pc-icon">&#57632;</span> Add** button in the Assets panel and then select **New Material**.

[Learn more](/user-manual/assets/types/material/)

## How do I create a new shader?

You can create a new shader asset from the asset panel. Click **Add Asset -> Shader**.

[View tutorial](http://developer.playcanvas.com/tutorials/custom-shaders/)

## How do I create a shape like a box or sphere?

<img src="https://playcanvas.com/static-assets/instructions/new_box.gif" />

You can add primitive shapes like boxes, spheres and others by adding a **Render Component** on an Entity and changing its type to the desired shape.

You can also right click on an Entity and select New Entity/Box to add a box (similarly for other shapes).

[Learn more](/user-manual/scenes/components/render/)

## How do I create a skybox?

To create a skybox for your scene you first need to create a [Cubemap asset](/user-manual/assets/types/cubemap/). Then you can drag and drop the Cubemap inside the 3D viewport, or you can go to the Scene Settings and drag the Cubemap in the Skybox field.

[Learn more](/user-manual/editor/interface/settings/rendering/)

## How do I delete an asset?

To delete an asset select it and press **Delete** or right click on it and select Delete.

## How do I delete an Entity?

You can delete an Entity by selecting it and pressing **Delete**. Alternatively you can click on the <span class="pc-icon">&#57636;</span> Delete button in the Hierarchy panel or right click on the Entity and select Delete from the context menu.

## How do I duplicate an Entity?

To duplicate an Entity use the <span class="pc-icon">&#57638;</span> Duplicate button in the Hierarchy panel or press **Ctrl+D**.

You can also copy and paste an Entity. To copy press **Ctrl+C** and to paste **Ctrl+V**.

## How do I play an animation?

To play an animation of a 3D model you need to create an Entity with a [Model Component](/user-manual/scenes/components/model/) and an [Animation Component](/user-manual/scenes/components/animation/). The **Model Component** will render your model and the **Animation Component** will play animations.

To render the model drag a model Asset in the Asset field of the Model Component. To play animations drag Animation Assets on the Assets field of the Animation Component.

## How do I play a sound?

To play sounds you need to add a [Sound component](/user-manual/scenes/components/sound/) to an Entity. Then you can create slots to play [Audio assets](/user-manual/assets/types/audio/). Simply click "Add Slot" and drag an Audio Asset on the Asset field. In order to hear the sounds you also need to add an [AudioListener component](/user-manual/scenes/components/audiolistener/) to an Entity - usually to the Camera Entity.

You can create Audio assets by dragging audio files from your computer into the Assets panel.

[View tutorial](/tutorials/basic-audio/)

## How do I remove a component?

<img src="https://playcanvas.com/static-assets/instructions/remove_component.jpg" />

To remove a component, select the Entity and then click on the **<span class="pc-icon">&#57636;</span> Delete** button in the Inspector next the component’s title.

## How do I render a 3D model?

<img src="https://playcanvas.com/static-assets/instructions/new_model.gif" />

To render a 3D model you need to add a **Model Component** to an Entity and drag a **Model Asset** on the Asset field. Alternatively you can drag and drop a Model Asset from the Assets Panel into the 3D Viewport.

[Learn more](/user-manual/scenes/components/model/)

## How do I move / rotate / scale an Entity?

<img src="https://playcanvas.com/static-assets/instructions/transform.gif" />

To move an Entity, select it and then move it using the **<span class="pc-icon">&#57617;</span> Translate tool**. To rotate it use the **<span class="pc-icon">&#57619;</span> Rotate tool** and to scale it use the **<span class="pc-icon">&#57618;</span> Scale tool**.

Switch between the Translate / Rotate / Scale tools by pressing 1 / 2 / 3 respectively.

## How do I upload assets?

To upload Assets simply drag and drop files from your computer into the Assets panel. Your files will be processed by the server and will appear shortly after in the Assets Panel.

[Learn more](/user-manual/assets/importing/)

## How do I use physics?

To give physical properties to an Entity you need to add a [Collision component](/user-manual/scenes/components/collision/) to it and a [RigidBody component](/user-manual/scenes/components/rigidbody/). The Collision component gives a physical shape to the Entity and the RigidBody component makes the Entity be simulated by the physics engine.

You can change the default [gravity](/user-manual/editor/interface/settings/physics/) in the Scene Settings.

[View tutorial](/tutorials/collision-and-triggers/)

## How do I use real-time shadows?

Real-time shadows are rendered for each light source that has **Cast Shadows** enabled. To enable shadows, select an Entity with a Light component and enable Cast Shadows. You also need to enable Cast Shadows on any Model components in your scene.

[Learn more](/user-manual/graphics/lighting/shadows/)
