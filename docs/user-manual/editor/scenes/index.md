---
title: Working with Scenes
description: "Building scenes in the PlayCanvas Editor: what a scene holds, the panels you build it with, components, templates, and the 16 MB scene size limit."
---

A **scene** is one world your app can show, such as a level or a menu. A project can have many. Each scene holds:

- **Entities**: the objects in the scene, arranged in a hierarchy. An entity can be a character, a prop, a light, a camera or an empty group.
- **Components**: what gives each entity its abilities, such as rendering a model, lighting the scene, colliding, playing sound or running a script.
- **Scene settings**: properties of the whole scene, such as its skybox, ambient light, fog and physics gravity. Open them with the cog on the [Toolbar](../interface/toolbar.md). See [Rendering](../interface/settings/rendering.md) and [Physics](../interface/settings/physics.md) settings.

New to entities and components? [Entity Component System](/user-manual/ecs/) explains the model, and [How Editor Projects Work](../getting-started/how-projects-work.md) shows where scenes fit in a project.

## In This Section {#in-this-section}

| Page | What it covers |
| --- | --- |
| [Managing Scenes](managing-scenes.md) | Create, open, duplicate and delete the scenes in your project. |
| [Hierarchy Panel](../interface/hierarchy.md) | Create, find, reparent, duplicate and copy entities. |
| [Viewport](../interface/viewport.md) | Move around the scene, transform entities with gizmos, and switch cameras and render modes. |
| [Inspector Panel](../interface/inspector.md) | Edit the selected entity's components and properties. |
| [Components](components/index.md) | Every component type, with the properties it shows in the Inspector. |
| [Templates](../templates/index.md) | Save an entity hierarchy as a reusable asset, place it many times and update it everywhere. Includes [Nested Templates](../templates/nested.md) and the [Override Diff View](../templates/diff.md). |

To load scenes while your app runs, see [Loading Scenes](loading-scenes.md) in Scripting.

## Scene Size Limit {#size-limit}

The PlayCanvas servers store each scene as a single document, and that document can't grow past 16 MB. A change that would take a scene past this cap isn't saved, so keep your scenes well below it.

Everything stored in the scene counts toward the limit:

- **Entities** - Every entity, with all of its components and their property values.
- **Script attributes** - The values set on each script, including JSON (JavaScript Object Notation) attributes and arrays.
- **Template instances** - Each instance stores a full copy of its entity hierarchy in the scene. Placing a template 100 times stores its hierarchy 100 times.
- **Scene settings** - These take up very little space.

Assets don't count. Models, textures, audio, scripts and other assets are stored separately, and the scene only refers to them by ID. An imported model adds nothing to a scene until you add it to the hierarchy. Then each node of the model becomes an entity, and those entities count.

### The Size Warning

When you open a scene whose data takes more than 14 MB as JSON, the Editor shows a red banner: "You are close to your scene size limit." The stored size isn't exactly the JSON size, so the warning appears early to leave headroom. Treat it as a signal to start reducing the scene.

The Editor checks the size only when it loads a scene. After you reduce a scene, reload the Editor to check it again. You can also measure the current scene at any time by running this in your browser's developer console with the [Editor API](/user-manual/editor/editor-api/):

```javascript
JSON.stringify(editor.api.globals.realtime.scenes.current.data).length;
```

The result is a character count. The warning appears when it passes 14,680,064 (14 × 1024 × 1024).

### Staying Under the Limit

- **Split your content into multiple scenes.** Give each level, area or menu its own scene. Switch between them at runtime, or load several additively to build a larger world. See [Loading Scenes](loading-scenes.md#loading-scenes-additively).
- **Instantiate templates at runtime.** Template instances placed in the Editor are stored in the scene, but a template spawned from a script is stored once, in its asset. For objects that repeat many times, such as enemies, pickups or props, spawn them from code. See [Instantiating at Runtime](/user-manual/editor/templates/#instantiating-at-runtime).
- **Load data at runtime.** Keep large data sets, such as level layouts, dialog or configuration tables, in a [JSON asset](/user-manual/editor/assets/inspectors/text/#json) instead of in script attributes. Load the asset when your application needs it. See [Loading and Unloading](/user-manual/assets/loading-unloading/).
- **Remove what you don't need.** Delete unused entities, such as test objects or nodes of an imported model that you never use.

:::ai
For repetitive scene changes, ask an AI assistant through the **[Editor MCP Server](/user-manual/editor/mcp-server/)** to find matching entities and components and prepare a consistent batch edit. Review the targets, then use Viewport and Launcher captures to spot outliers.
:::
