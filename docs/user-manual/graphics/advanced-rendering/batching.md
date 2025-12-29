---
title: Batching
---

Batching is the process of combining multiple mesh instances together into a single mesh instance, so that they can all be rendered in a single GPU draw call. PlayCanvas provides a handy feature on the [Model][7], [Sprite][9] and [Element][10] components that lets you assign these components to batch groups which give the engine hints on how to combine meshes to reduce the overall draw call count.

There are a variety of rules which the engine will apply to see if mesh instances are able to be combined. The primary rule is that all mesh instances must share the same material.

Common batching use cases are:

- Combine together static geometry -- e.g. environments -- into a single mesh instance or multiple large instances to reduce draw calls, but still support camera culling.
- Combine together dynamic geometry -- e.g. a set of moving objects -- into a single mesh instance with dynamic properties that are applied on the GPU.

:::note

The use of batching is currently not compatible with [runtime lightmaps](/user-manual/graphics/lighting/runtime-lightmaps/) due to each lightmapped object requiring its own unique lightmap texture.

:::

## Creating Batch Groups

![Creating Batch Groups](/img/user-manual/optimization/batching/batch-groups.jpg)

Batch Groups can be created from the Batch Groups section of the [scene settings panel][6]. Each batch group has a number of properties that are used to give the engine hints about how to create batches from this batch group.

### Batch Group Properties

- **Name**: Used to differentiate different batch groups, ideally it would describe the kinds of objects that this batch group will have. This name is available at runtime to retrieve the group.
- **Dynamic**: If enabled then objects inside the batch group can still move/rotate/scale. You can use this for objects that are similar to each other and use the same materials e.g. bullets. Static groups use less runtime resources so you should disable Dynamic if the contents of batch group will not move.
- **Max AABB size**: The maximum size of any one side of the bounding box that contains all objects in the batch group at the time when the batches are created. If the set of meshes are larger than the maximum size it will create multiple batches to be rendered. A larger bounding box will render in less draw calls, but will work less well with camera culling.

## Adding a component to a Batch Group

![Selecting Batch Groups](/img/user-manual/optimization/batching/model-component.jpg)

The Model component has a Batch Group property to assign a model into a batch group.

## Rules for combining mesh instances

The rules for whether the engine can combine mesh instances are fairly complicated but a good summary is that all mesh instances that belong to a single batch must obey the following:

- Have the same Batch Group ID
- Have the same material
- Have the same shader parameters
- Be within a bounding box with no side larger than the Max AABB Size
- Be in the same layer
- Each batch has a maximum vertex count of 65535
- For dynamic batches there is a maximum number of movable mesh instances. This hardware dependent but has a maximum of 1024.

If a batch group contains components or mesh instances that do not obey all of the rules the batch group will produce multiple batches such that each individual batch contains mesh instance that follow all the rules.

## Trigger re-batching

Based on Batch Groups the engine creates an optimized version of mesh instances. Further changes to many properties of the original mesh instances are not reflected in the optimized versions. To allow for good performance by using batching, while still allowing some further updates, you can request the engine to rebatch individual Batch Groups after you make changes to the original mesh instances. This is often useful with User Interface element components, where you might want to set up batching, but still need to do infrequent updates. Note that re-batching a group is a potentially expensive operation. In many cases, the impact of rebatching can be minimized by separating elements that need updating to separate Batch Group.

Here is an example of a simple script. The script updates `textureAsset` on an element, and marks the Batch Group as dirty.

```javascript
// change textureAsset on element
element.textureAsset = this.hoverAsset;

// if this element has Batch Group set, mark it dirty to rebuild the group in the next frame
if (element.batchGroupId)
    this.app.batcher.markGroupDirty(element.batchGroupId);
```

## Example - Batching a static environment

![Western Scene](/img/user-manual/optimization/batching/western-scene.jpg)

In this scene we have created a static environment from 7 separate model files, some of which are repeated in the scene. For example, the road tile is used in 50 entities to create the long road through the center of the scene.

![Western Animation](/img/user-manual/optimization/batching/western-animation-all.gif)

You can see in the animation each draw call as it is made. In this environment the engine makes over 50 draw calls to draw each of the models individually. However, apart from the ground, all of these models use the same material and so they can be combined into batch groups.

![Western Animation Batched](/img/user-manual/optimization/batching/western-animation.gif)

In this animation we have created 4 batch groups for the buildings, the cacti, the road and the ground. Notice, that the road and the ground are not combined into single draw calls because the meshes are larger than the Max AABB Size defined on the batch group.

## Terminology

- **Batch Group** - A named group, created in the Editor, that defines some hints on how mesh instances should be combined. Components are assigned to a batch group
- **Batch** - An engine object created at runtime which is the set of mesh instances that are rendered in a single draw call. A batch group may result in multiple batches depending on the properties of the mesh instances that are added to the batch group.
- **Batch Manager** - The programmatic interface for creating and updating batches at runtime. See [API documentation][8].

[6]: /user-manual/editor/interface/settings/batch-groups/
[7]: /user-manual/editor/scenes/components/model
[8]: https://api.playcanvas.com/engine/classes/BatchManager.html
[9]: /user-manual/editor/scenes/components/sprite
[10]: /user-manual/editor/scenes/components/element
