---
title: Preloading
---

On the web, it's critical to get users into your application as soon as possible. The PlayCanvas asset system provides preloading to ensure essential assets are ready before your application starts.

## The Preload Flag

Every asset has a `preload` property. When set to `true`, the asset will be downloaded and its resource created before the application's `initialize` phase begins.

You should use preloading for assets that are needed immediately when your application starts. This prevents assets from "popping in" after the application is already running.

:::tip

In the PlayCanvas Editor, you can set the preload flag in the asset's properties panel. By default, new assets have preload enabled.

:::

## When Are Assets Loaded?

Assets are loaded according to these rules:

1. **Preloaded assets** (`preload = true`) are loaded before the application starts
2. **Referenced assets** are loaded when an enabled component references them. For entities enabled in the scene, this happens immediately after preloading completes
3. **Dependent assets** are loaded when their parent asset loads. For example, when a model loads, its referenced materials load, which in turn load their referenced textures

## Streaming vs Preloading

If an asset is not preloaded, it will be streamed in when needed. Components handle this gracefully and begin operating once their assets are ready. However, you may see visual "popup" as models appear before their textures finish loading.

## Loading Asset Groups with Tags

To avoid popup, you can load groups of assets before displaying them. Use asset tags to organize assets into logical groups:

```javascript
// Find all assets tagged for level 1
const assets = this.app.assets.findByTag('level-1');
let loadedCount = 0;

// Load each asset
for (const asset of assets) {
    asset.once('load', () => {
        loadedCount++;
        if (loadedCount === assets.length) {
            // All level-1 assets are loaded
            this.startLevel();
        }
    });
    this.app.assets.load(asset);
}
```

You can also use more complex tag queries:

```javascript
// Assets tagged with BOTH 'level-1' AND 'enemy'
const enemies = this.app.assets.findByTag('level-1', 'enemy');

// Assets tagged with 'level-1' OR 'level-2'
const assets = this.app.assets.findByTag(['level-1', 'level-2']);
```

## Best Practices

- **Preload essential assets** - UI elements, player models, and anything needed immediately
- **Stream large assets** - Background music, distant scenery, optional content
- **Use tags for levels** - Group assets by level or area to load them together
- **Show loading progress** - For streamed content, display a loading indicator

## See Also

- [Asset Registry](asset-registry) - Finding and managing assets
- [Loading and Unloading](loading-unloading) - Dynamic asset management
