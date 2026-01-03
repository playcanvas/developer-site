---
title: Import Hierarchy
---

PlayCanvas supports importing models with their meshes as a hierarchy of entities in the scene. This allows you to edit the different meshes directly in the Editor. Components can be added, attach other entities, move/rotate/scale entities in the hierarchy etc.

![Edit model hierarchy in the Editor](/img/user-manual/assets/import-pipeline/import-hierarchy/edit-hierarchy.gif)

## How to enable

:::note

This is now enabled by default for new projects.

:::

Open the 'Project Settings'

<img loading="lazy" src="/img/user-manual/assets/import-pipeline/import-hierarchy/project-settings.png" width="480" />

Scroll down to 'Asset Tasks' and enable 'Import Hierarchy':

<img loading="lazy" src="/img/user-manual/assets/import-pipeline/import-hierarchy/asset-tasks.png" width="360" />

## Importing models

A full tutorial on importing your first model and animation can be found [here][first_model_animation_import].

As an overview, when you drag the model file into the 'Assets Panel':

![Drag Model into Assets Panel](/img/user-manual/assets/import-pipeline/import-hierarchy/import-model.gif)

The following assets will be created when imported:

![Created Assets](/img/user-manual/assets/import-pipeline/import-hierarchy/created-assets.png)

| Asset Type | Description |
|------------|-------------|
| **[Materials][material_asset]** | Materials used by the imported model, mapped to the mesh instance. |
| **[Textures][texture_asset]** | Embedded textures in the model file (if any). These will automatically be mapped to the associated materials. |
| **[Template][template_asset]** | The template stores the scene hierarchy of the model. Create an instance of the template to bring the model into the scene. |
| **Container** | The GLB that stores all the meshes of the model. |
| **Render** | Render assets reference a mesh in the container asset and are used by the [Render Component][render_component] to render the mesh in the scene. They can also be used with the [Collision Component][collision_component] as a mesh for physics. |

## Updating models

As the hierarchy is created as part of a template, when a model is updated it may affect the template instances in the scenes.

Added components to entities in the template will be kept during the update unless the mesh instance that the entity represents no longer exists in the updated model.

The exception to this is if a script component is added to an entity in the template and the mesh instance it represents is no longer part of the updated model, it will be moved under the root entity in the template so there is no data loss. Any entities that were under it before the update will be kept as well.

How the Editor decides what is a new or removed mesh instance is done by the following:

- If in the update, a mesh instance's name and its parent mesh's instance name matches an existing mesh instance and its parent, they are assumed to be the same mesh instance in the hierarchy and is updated.
- If in the update, a mesh instance's name does not exist, it's assumed to be a new mesh instance and a new entity is added to the template.
- If in the update, an existing entity of the template does not have a matching mesh instance given the rules above, it's assumed that this mesh instance has been removed and the entity will be removed from the template. The exception being mentioned above, if there was a script component added to it on the template, those entities are preserved on the root. If there were no script components added, those are deleted from the template.

[material_asset]: /user-manual/editor/assets/inspectors/material/
[texture_asset]: /user-manual/editor/assets/inspectors/texture/
[template_asset]: /user-manual/editor/templates/
[render_component]: https://api.playcanvas.com/engine/classes/RenderComponent.html
[collision_component]: https://api.playcanvas.com/engine/classes/CollisionComponent.html
[first_model_animation_import]: /tutorials/importing-first-model-and-animation/
