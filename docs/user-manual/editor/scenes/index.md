---
title: Working with Scenes
description: Scenes hub explaining entities, components, scene-wide settings and the 16 MB scene size limit, with links for managing scene files, component types, and runtime scene loading.
---

A **Scene** is the foundation of your PlayCanvas application. It defines the 3D world that users will experience, containing all the entities, components and settings that make up your game or interactive experience.

## What's in a Scene?

Every scene contains:

- **Entities** - The objects in your scene, organized in a hierarchy. Entities can represent characters, props, lights, cameras or any other element.
- **Components** - The building blocks that give entities their behavior and appearance. Components handle rendering, physics, audio, user interface and more.
- **Scene Settings** - Global properties that affect the entire scene, such as physics gravity, ambient lighting, fog and skybox.

## In This Section

| Topic | Description |
|-------|-------------|
| [Managing Scenes](managing-scenes.md) | Create, open, duplicate and delete scenes in your project. |
| [Components](components/index.md) | Learn about the different component types you can add to entities. |
| [Loading Scenes](loading-scenes.md) | Load scenes dynamically at runtime in your application. |

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
- **Load data at runtime.** Keep large data sets, such as level layouts, dialog or configuration tables, in a [JSON asset](/user-manual/editor/assets/inspectors/json/) instead of in script attributes. Load the asset when your application needs it. See [Loading and Unloading](/user-manual/assets/loading-unloading/).
- **Remove what you don't need.** Delete unused entities, such as test objects or nodes of an imported model that you never use.

:::ai
For repetitive scene changes, ask an AI assistant through the **[Editor MCP Server](/user-manual/editor/mcp-server/)** to find matching entities and components and prepare a consistent batch edit. Review the targets, then use Viewport and Launcher captures to spot outliers.
:::
