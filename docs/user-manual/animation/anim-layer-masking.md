---
title: Anim Layer Masks
---

When creating complex animation behavior for your game objects, it is often necessary to isolate the playback of certain animations to specific bones in each object's model. This is particularly useful when animating characters that need to carry out multiple actions at the same time. This can be achieved in PlayCanvas by creating a mask for a given [animation layer](/user-manual/animation/anim-state-graph-assets/#layers) in your anim component.

### Creating a mask

After creating an Anim State Graph asset and attaching it to an anim component, you'll be presented with a list of layers contained in your graph. You can create a mask for any of these layers by clicking the **Create Mask** button under each layer panel:

![Anim Component Create Mask](/img/user-manual/anim/anim_component_create_mask.png)

 This will open up the mask inspector for that layer which is shown below:

![Mask Inspector](/img/user-manual/anim/anim_mask_inspector.png)

The mask inspector displays the full hierarchy which the anim component is driving, starting at the `root bone` specified in the anim component. Each bone in the hierarchy can be selected to be included in the mask. You can also right-click specific bones to include or exclude whole sections of the hierarchy. Any bones which are not selected in this mask will not be driven by any of the animations which play in this mask's layer.

After creating masks, you can use [layer blending](/user-manual/animation/anim-state-graph-assets/#layer-blending) to smoothly blend the masked animations of multiple layers together.
