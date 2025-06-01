---
title: Exporting and Preloading
sidebar_position: 5
---

## Loading Order

### ESM Scripts

ESM Scripts do not have an explicit loading order, and should not be relied upon to load in a specific order. Instead, you should use module import statements to declare dependencies between modules.

### Classic Scripts

Generally all scripts are loaded at the beginning of your application. The loading order is determined by a setting in your project which you can access from the main Editor menu or Scene Settings:

![Loading Order](/img/user-manual/scripting/script-loading-order.jpg)

The loading order panel shows all Classic scripts marked as `preload` and the order that they are loaded and executed in.

![Loading Order List](/img/user-manual/scripting/loading-order-list.jpg)

You can click-and-drag to move individual scripts around to edit the order.

When scripts are first loaded, they are immediately executed. That means that the scripts are first executed in the order that they are loaded. However, the loading order of the script **does not** affect the execution of order of script methods within script component. For example, the `initialize` methods of scripts on the same entity are called in the order that they are listed on the Entity, not the loading order.

## Preloading

By default, as with other assets in PlayCanvas, a script asset is marked as `preload`. This means that it will be loaded before the application starts. If you disable preloading on a script, it will not be loaded under normal circumstances. This way, you can include a script in your project but prevent it from loading by unchecking `preload`. You can trigger a non-preloading script to load dynamically by using the regular asset API (see [`AssetRegistry#load`](https://api.playcanvas.com/engine/classes/AssetRegistry.html#load)).

It is possible to subscribe to dynamic changes to script registry:

```javascript
this.app.scripts.on('add', (name, scriptType) => {
    console.log('script', name, 'has been loaded');
});
```

## Exporting

When you publish or export your PlayCanvas project, the way your scripts are processed depends on whether you’re using Classic scripts or ECMAScript Modules (ESM).

### Classic

All preloaded Classic scripts are concatenated into a single file by default. This reduces the number of network requests and improves load times. This method ensures compatibility with older projects and is ideal for simpler codebases.

### ESM

Projects that use ESM Scripts go through a modern bundling and optimization process. If your project contains any ESM scripts, the export process will automatically generate an ESM build.

Key features of ESM builds:

- **Bundled output** Your code is bundled together—optionally including the PlayCanvas Engine—into a set of optimized JavaScript files.
- **Tree-shaking** Unused code is eliminated, reducing bundle size.
- **Code splitting** Your application is split into smaller chunks, which are loaded only when needed. This improves perceived performance by prioritizing critical code.
- **Minification (optional)** If you enable Minify Scripts, your code is also compressed to reduce download size further.
- **Concatenation option** If you enable Concatenate Scripts, the exporter bundles your entire application—including the engine—into the most efficient structure, based on usage patterns.

#### Code Splitting

Although you don’t have fine-grained control over where code is split, you can influence it. If you use dynamic `import()` statements instead of static imports, the bundler treats that module as a candidate for on-demand loading. This helps you defer non-critical code until it’s actually needed — ideal for features like menus, optional tools, or cutscenes.

#### Mixing ESM and Classic Scripts

You can freely mix ESM and Classic scripts within the same project. However, they are treated differently:

- ESM scripts are bundled, optimized, and can benefit from tree-shaking and code splitting.
- Classic scripts are included as separate files and are not part of the ESM bundle.

This ensures backward compatibility while allowing modern development practices.

:::warning

Avoid using `import()` inside Classic scripts to load ESM modules. The final paths of bundled modules may change during export, and Classic scripts won’t be able to resolve them correctly.

:::
