---
title: Loading Scenes
---

This page covers how to load scenes programmatically and different approaches for using scenes in your projects.

There are two main approaches: changing scenes completely and loading scenes additively.

## Changing Scenes Completely

This is the most common approach that developers take where each scene is a self-contained part of the game. For example, one scene would be the title screen and then one scene per level.

[Here is an example](https://playcanvas.com/project/924351/) where the user can move to and from the title screen to other levels.

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/Q1gKd1ek/"  title="Switching Scenes Completely" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

This is done by simply calling [`SceneRegistry.changeScene`](https://api.playcanvas.com/engine/classes/SceneRegistry.html#changescene) with the name of the scene.

```javascript
this.app.scenes.changeScene('Some Scene Name');
```

If the scene data is not already loaded, this function will:

- Make the asynchronous network request for the new scene data.
- When the scene data is loaded, it will delete all child entities from the application root node (destroying the existing scene hierarchy).
- Call `loadSceneSettings` which is now synchronous as the scene data is loaded.
- Call `loadSceneHierarchy` which is now synchronous as the scene data is loaded.

If you want to know when the scene is loaded or if there are errors, you will need to provide a callback:

```javascript
this.app.scenes.changeScene('Some Scene Name', (err, loadedSceneRootEntity) => {
    if (err) {
        console.error(err);
    } else {
        // Scene hierarchy has successfully been loaded
    }
});
```

To avoid the asynchronous network request when calling `changeScene`, you can call [`SceneRegistry.loadSceneData`](https://api.playcanvas.com/engine/classes/SceneRegistry.html#loadscenedata) ahead of time. This makes `changeScene` synchronous, immediately calling `loadSceneSettings` and `loadSceneHierarchy`.

Common use cases would include knowing that the user would load level 2 when level 1 is completed. In this case, you can load the scene data for level 2 when the user is in level 1. When they complete level 1, they won't have to wait for data to be loaded and immediately enter level 2.

## Loading Scenes Additively

It is possible to load multiple scene hierarchies in an additive manner rather than completely switching scenes. The common use cases for this are to split up a large world so that it can be loaded over time rather than loading it all at once at the start.

A variant of the above would be for each scene to represent a section of the world that is loaded and destroyed as the player moves around. The system would only load the nearest connected sections of the world and related assets while destroying and unloading assets for any section that is not needed. This would help with managing resources such as memory and VRAM.

Sometimes developers use this approach to ensure that certain code and entities are created before the actual game loads and have them globally accessible throughout the game session.

[Below is a simplified example](https://playcanvas.com/project/685077/) of additively loading scenes where the UI in the top left is the 'main' scene and different scene hierarchies are loaded/destroyed.

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/cjBInud1/" title="Additively Loading Scenes" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

:::warning
Multiple instances of the same scene hierarchy cannot be loaded at once. Entities have unique GUIDs assigned in the Editor, and loading multiple instances causes GUID conflicts.

If you need multiple instances of an entity hierarchy, use [Templates](/user-manual/editor/templates/) instead. Templates generate unique GUIDs on instantiation.
:::

## Understanding How Scenes Work

To use scenes effectively, it is important to understand how they are loaded when used in a project. This section goes into detail about how scenes are structured and loaded.

Scenes are separate from [assets](/user-manual/assets/) and have their own properties and APIs.

Scenes are represented by [Scene Registry Items](https://api.playcanvas.com/engine/classes/SceneRegistryItem.html) stored in the [Scene Registry](https://api.playcanvas.com/engine/classes/SceneRegistry.html), accessible via the [Application](https://api.playcanvas.com/engine/classes/AppBase.html#scenes) object. You can find a Scene Registry Item by the scene's name and use it to load the hierarchy or settings.

:::note

The [application root node](https://api.playcanvas.com/engine/classes/AppBase.html#root) is not the scene hierarchy root entity that is named 'Root' by default that you see in the scene with the Editor. The scene hierarchy root entity will be a child of the application root node.

:::

There are two APIs to load the scene hierarchy and settings:

- [`SceneRegistry.loadSceneHierarchy`](https://api.playcanvas.com/engine/classes/SceneRegistry.html#loadscenehierarchy) - Loads a scene hierarchy
- [`SceneRegistry.loadSceneSettings`](https://api.playcanvas.com/engine/classes/SceneRegistry.html#loadscenesettings) - Loads settings from a scene

Here is a code example to load the scene hierarchy or settings:

```javascript
// Find the Scene Registry Item by the name of the scene
const sceneItem = this.app.scenes.find('Some Scene Name');

// Load the scene hierarchy with a callback when it has finished
this.app.scenes.loadSceneHierarchy(sceneItem, (err, loadedSceneRootEntity) => {
    if (err) {
        console.error(err);
    } else {
        // Scene hierarchy has successfully been loaded
    }
});

// Load the scene settings with a callback when it has finished
this.app.scenes.loadSceneSettings(sceneItem, (err) => {
    if (err) {
        console.error(err);
    } else {
        // Scene settings have successfully been loaded
    }
});
```

Both `loadSceneHierarchy` and `loadSceneSettings` have similar behavior in how they get the data needed to load the hierarchy or settings.

When the function is called, it performs an asynchronous network request to the server for the scene data. This means that there will be a delay (depending on network speed, the network connection and size of the scene) between the request to load the scene and the browser completing the network request where the application is still updating.

Once the network request has been completed, the engine will do the following:

`loadSceneHierarchy`

- Creates the entities and components from the loaded scene and adds the hierarchy to the [application root node](https://api.playcanvas.com/engine/classes/AppBase.html#root).
- Calls `initialize` and `postInitialize` functions on the ScriptTypes in the loaded scene.
- Calls the callback that was passed into the `loadSceneHierarchy` function.
- (Optional) The [callback](https://api.playcanvas.com/engine/types/LoadHierarchyCallback.html) receives the loaded scene root entity as a parameter, which can be modified or reparented as needed.

`loadSceneSettings`

- Applies the loaded scene settings to the application.
- Calls the [callback](https://api.playcanvas.com/engine/types/LoadSettingsCallback.html) that was passed into the `loadSceneSettings` function.

By default, `loadSceneHierarchy` will always load additively and it's up to the developer to remove/destroy the existing loaded scene to change scenes completely.

There are several ways to approach this with pros and cons:

### Destroying all children under application root node first

This approach has discrete steps that make it easier to manage where the currently loaded scene is destroyed before loading and creation of the new scene.

```javascript
// Find the Scene Registry Item by the name of the scene
const sceneItem = this.app.scenes.find('Some Scene Name');

// Destroy all children under application root to remove the currently loaded scene hierarchy
const rootChildren = this.app.root.children;
while(rootChildren.length > 0) {
    rootChildren[0].destroy();
}

// Load the scene hierarchy with a callback when it has finished
this.app.scenes.loadSceneHierarchy(sceneItem, (err, loadedSceneRootEntity) => {
    if (err) {
        console.error(err);
    } else {
        // Scene hierarchy has successfully been loaded
    }
});
```

However, as mentioned above, there is a delay between calling `loadSceneHierarchy` and the scene data actually being loaded. This means that there will be a few frames where the application will be rendering a blank screen while it's waiting for the network request to complete which brings us to the alternative.

### Destroying the old scene root entity after the new scene is loaded

This would mean that the old scene hierarchy will be destroyed in the callback after the new scene hierarchy has been added to hierarchy which ensures that the old scene would be present while the scene data is loaded from network.

```javascript
// Find the Scene Registry Item by the name of the scene
const sceneItem = this.app.scenes.find('Some Scene Name');

// Assume the old scene hierarchy's root entity is named 'Root' which is the default name
const oldSceneRootEntity = this.app.root.findByName('Root');

// Load the scene hierarchy with a callback when it has finished
this.app.scenes.loadSceneHierarchy(sceneItem, (err, loadedSceneRootEntity) => {
    if (err) {
        console.error(err);
    } else {
        // Scene hierarchy has successfully been loaded
        oldSceneRootEntity.destroy();
    }
});
```

However, the old scene will be present in the hierarchy while the new scene's scriptTypes call `initialize` and `postInitialize`. This can cause issues if there is some dependency or assumptions in the scripts that it's the only scene hierarchy that is loaded. Examples would be searching for an entity by name in `initialize` and there is also an entity with the same name in the old scene hierarchy. The script would then have a reference to the old scene hierarchy's entity instead of the new scene's which will cause unexpected behavior once the old scene's hierarchy is destroyed.

To help mitigate these potential issues, we have an API that allows the separation of loading the scene data from the creation of the scene hierarchy in the scene, [`SceneRegistry.loadSceneData`](https://api.playcanvas.com/engine/classes/SceneRegistry.html#loadscenedata).

## Managing Assets in Scenes

A common question with scenes is if the assets used in the scene will be loaded as part of the scene load. With PlayCanvas, the assets and scenes are separate and will need to be loaded separately which gives the developer a large degree of flexibility.

The recommended practice is to tag assets with the scene name they belong to. When loading a scene, load the tagged assets first, then load the scene once all assets are ready.

More information about asset tags and asset loading can be found on [this page](/user-manual/assets/preloading-and-streaming/#asset-tags).

The [example project](https://playcanvas.com/project/926754/) below loads the assets when loading the scene and unloads when returning the main menu.

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/SBTfOAeM/" title="Loading scenes and assets" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>
