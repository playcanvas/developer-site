---
title: Templates
---

Templates (or prefabs) allow you to speed up your development by creating Entities that are reusable. You can place multiple instances of a Template in your Scene and if you make any changes and apply them to the Template Asset, all instances of that Template will be updated.

<div className="iframe-container">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/2HV8Ib6wYRc" title="Templates Overview" allowfullscreen></iframe>
</div>

## Creating Templates {#creating-templates}

To create a new Template Asset you can right-click on any Entity in your Scene and select Template &rarr; New Template. This will create a new Template Asset and add it to your currently selected folder in the Asset Panel. The Entity you right clicked will become an instance of that new Template Asset automatically.

## Adding Templates in your Scene {#adding-templates-in-your-scene}

You can drag & drop a Template Asset in your scene or right click under an Entity in the Hierarchy and select Template &rarr; Add Instance. Then you can select the Template Asset and that will an instance of it under the clicked Entity.

When an Entity is an instance of a Template it will have a slightly difference appearance in the Hierarchy:

![Template Instance](/img/user-manual/templates/hierarchy.png)

The root Entity of the Template Instance and all its children will have a different icon showing that they are part of the same Template.

When you select the root of the Template Instance you will notice the following properties in the Entity Inspector:

![Template Inspector](/img/user-manual/templates/inspector.png)

## Updating Templates {#updating-templates}

In order to make changes to a Template Asset you first have to add an instance of it in the Editor. Then you can change the instance as you see fit and in the end apply the changes to the Template Asset.

### Template Overrides {#template-overrides}

When you make changes to a Template instance or its children this will generate Template Overrides. There are various types of overrides:

* *Field override*: An override where the value of a field of the Entity or its Components differs to the one in the Template Asset.
* *New Entity override*: An Entity that you have added as a child to the Template instance that does not exist in the Template Asset.
* *Deleted Entity override*: An child Entity that you have deleted from the Template instance.

When you apply overrides to the Template Asset then they stop being overrides and become part of the Template Asset.

You can see the summary of the overrides by selecting the root of the Template Instance and looking at the Entity Inspector:

![Overrides](/img/user-manual/templates/override.png)

Also notice the different color of the label of the field that has been overridden. You can also see a more detailed list of all the overrides by clicking View Diff. See [Overrides Diff View][4] for more information.

If you hover over the colored label of the overridden field you can view more details about that specific override:

![Override Hover](/img/user-manual/templates/override-hover.png)

### Applying Overrides {#applying-overrides}

To apply an override you can click APPLY in the tooltip shown when you hover over the overridden field.

To apply multiple overrides select the root of the Template Instance and click Apply All on the Entity Inspector. You can also right click on the root of the Template Instance and select Template &rarr; Apply To Template.

Alternatively you can open the [Override Diff View][4] and apply overrides from there too.

Any overrides you apply to the Template Asset will propagate to other instances of the Template Asset in any scene that these might be.

:::note

You cannot currently undo the action of applying overrides to a Template Asset.

:::

### Reverting Overrides {#reverting-overrides}

To revert a specific override, click REVERT in the tooltip shown when you hover over the overridden field.

To revert all overrides select the root of the Template Instance and click Revert All on the Entity Inspector.

Alternatively you can open the [Override Diff View][4] and revert overrides from there too.

### More details on Overrides {#more-details-on-overrides}

When you create an override then the property that it overrides gets protected from updates to the Template Asset. For example. say your Template Instance looks like so:

![Template Instance](/img/user-manual/templates/hierarchy.png)

You modify the position of Tree1/Sphere. This creates an override on the position of the Sphere entity. You then create another instance of the Template Asset and you change the position of the Sphere to something else. If you apply the override from the second instance then that will not update the position of the first instance since it is overridden and protected. In order for the first instance to pick up position changes for the Sphere Entity you have to revert the override first.

## Instantiating At Runtime {#instantiating-at-runtime}

You can instantiate Template Assets at runtime like so:

```javascript
const templateAsset = this.app.assets.get(templateAssetId);
const instance = templateAsset.resource.instantiate();
this.app.root.addChild(instance);
```

You can also use Script Attributes to pass Template Assets to your scripts instead of searching for them by ID.

## When do I need to load Template Assets? {#when-do-i-need-to-load-template-assets}

Templates store the Entity hierarchy and data, similar to scenes. When a template instance is added to the scene in the Editor, the Entity hierarchy and data is included in the Scene data.

At runtime, the Template instance is not linked to the asset and you can reduce the download size by not preloading/loading the asset.

You only need Template assets to be loaded if you are instantiating instances at runtime.

[4]: /user-manual/editor/templates/diff
