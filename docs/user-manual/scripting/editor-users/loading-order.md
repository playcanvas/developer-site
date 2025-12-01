---
title: Script Loading Order
---

## ESM Scripts

ESM Scripts do not have an explicit loading order, and should not be relied upon to load in a specific order. Instead, you should use module import statements to declare dependencies between modules.

## Classic Scripts

Generally all scripts are loaded at the beginning of your application. The loading order is determined by a setting in your project which you can access from the main Editor menu or Scene Settings:

![Loading Order](/img/user-manual/scripting/script-loading-order.jpg)

The loading order panel shows all Classic scripts marked as `preload` and the order that they are loaded and executed in.

![Loading Order List](/img/user-manual/scripting/loading-order-list.jpg)

You can click-and-drag to move individual scripts around to edit the order.

When scripts are first loaded, they are immediately executed. That means that the scripts are first executed in the order that they are loaded. However, the loading order of the script **does not** affect the execution of order of script methods within script component. For example, the `initialize` methods of scripts on the same entity are called in the order that they are listed on the Entity, not the loading order.

### Preloading

By default, as with other assets in PlayCanvas, a script asset is marked as `preload`. This means that it will be loaded before the application starts. If you disable preloading on a script, it will not be loaded under normal circumstances. This way, you can include a script in your project but prevent it from loading by unchecking `preload`. You can trigger a non-preloading script to load dynamically by using the regular asset API (see [`AssetRegistry#load`](https://api.playcanvas.com/engine/classes/AssetRegistry.html#load)).

It is possible to subscribe to dynamic changes to script registry:

```javascript
this.app.scripts.on('add', (name, scriptType) => {
    console.log('script', name, 'has been loaded');
});
```

### Concatenation

By default, when you publish or export your application, all preloaded Classic scripts are concatenated into a single script file. This optimizes load time by reducing the number of requests that are needed to load all your scripts.
