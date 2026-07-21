---
title: Loading and Unloading
description: Dynamically load and unload assets at runtime to manage memory and stream content on demand.
---

PlayCanvas provides APIs to dynamically load and unload assets at runtime. This gives you fine-grained control over memory usage and allows you to stream content as needed.

## Loading Assets

### Loading Registered Assets

For assets that are already in the asset registry (e.g., assets added in the Editor), use `app.assets.load()`:

```javascript
const asset = this.app.assets.find('My Texture');

asset.ready((asset) => {
    // Asset is loaded and ready to use
    const texture = asset.resource;
});

this.app.assets.load(asset);
```

### Loading from URL

To load an asset from a URL at runtime, use `app.assets.loadFromUrl()`:

```javascript
this.app.assets.loadFromUrl('path/to/texture.png', 'texture', (err, asset) => {
    if (err) {
        console.error('Failed to load texture:', err);
        return;
    }
    
    // Asset is loaded and added to the registry
    const texture = asset.resource;
});
```

The second parameter specifies the asset type. Common types include:

- `texture` - Images (PNG, JPG, WebP, etc.)
- `model` - 3D models (GLB)
- `audio` - Sound files (MP3, OGG, WAV)
- `json` - JSON data
- `binary` - Binary data
- `css` - Stylesheets
- `html` - HTML documents
- `script` - JavaScript files
- `shader` - Shader code

### Loading with Options

You can pass additional options when loading from URL:

```javascript
this.app.assets.loadFromUrlAndFilename(
    'path/to/model.glb',
    'model.glb',
    'container',
    (err, asset) => {
        if (err) {
            console.error('Failed to load model:', err);
            return;
        }
        
        // Create an entity from the loaded model
        const entity = asset.resource.instantiateRenderEntity();
        this.app.root.addChild(entity);
    }
);
```

## Handling Load Events

### Using ready()

The `ready()` method executes a callback when an asset is loaded. If the asset is already loaded, the callback fires immediately:

```javascript
const asset = this.app.assets.find('My Model');

asset.ready((asset) => {
    // Safe to use asset.resource here
});

// Trigger loading if not already loaded
if (!asset.loaded) {
    this.app.assets.load(asset);
}
```

### Using Events

You can listen for load events on individual assets or the registry:

```javascript
// Listen on a specific asset
asset.on('load', (asset) => {
    console.log('Asset loaded:', asset.name);
});

asset.on('error', (err, asset) => {
    console.error('Load failed:', asset.name, err);
});

// Listen on the registry for any asset
this.app.assets.on('load', (asset) => {
    console.log('Some asset loaded:', asset.name);
});
```

## Configuring Retries

Asset loads are automatically retried on failure to make applications more resilient to transient network errors (e.g. slow CDNs, brief connectivity drops). By default, the engine retries each failed request up to **5 times** with exponential backoff (200ms, 400ms, 800ms, 1600ms, 3200ms, capped at 5000ms).

You can change this globally for all asset types:

```javascript
// Override the default retry count
this.app.loader.enableRetry(3);

// Disable retries entirely - load failures are reported immediately
this.app.loader.disableRetry();
```

Or configure retries per asset type:

```javascript
// Only retry texture loads more aggressively
this.app.loader.getHandler('texture').maxRetries = 10;
```

Editor projects can also override the default count via the [Network Settings](../editor/interface/settings/network.md) panel.

## Limiting Concurrent Requests

When an application loads a large number of assets at once, browsers can reject requests with `net::ERR_INSUFFICIENT_RESOURCES` once too many are in flight simultaneously. To guard against this, the engine limits the number of concurrent asset requests, queuing any beyond the limit and dispatching them as earlier requests complete.

The default limit is **128**, which is safe across browsers while still saturating typical CDN throughput. You can change it globally:

```javascript
// Allow at most 50 asset requests to be in flight at once
this.app.loader.maxConcurrentRequests = 50;

// Disable throttling entirely - every request is sent immediately
this.app.loader.maxConcurrentRequests = 0;
```

:::note

This is a process-global limit (it applies to the shared HTTP layer, matching the browser's per-process resource limit), so with multiple applications on a page the last value set wins. It applies to all `XMLHttpRequest`-based loads, which covers the large majority of assets.

:::

Editor projects can also configure this via the [Network Settings](../editor/interface/settings/network.md) panel.

## Loading with Credentials

By default, asset requests are sent without credentials. If your assets are served from an authenticated cross-origin host - one that requires cookies, client TLS certificates or HTTP authentication - enable credentials globally:

```javascript
// Send all asset requests with credentials
this.app.loader.withCredentials = true;
```

Set this **before** preloading or loading any assets, so the requests pick it up. The server must respond with a non-wildcard `Access-Control-Allow-Origin` and `Access-Control-Allow-Credentials: true`, otherwise the browser blocks the response.

:::note

This is a process-global setting (it applies to the shared HTTP layer), so with multiple applications on a page the last value set wins. It applies to all `XMLHttpRequest`-based loads, which covers the large majority of assets.

:::

## Unloading Assets

To free memory, you can unload assets that are no longer needed:

```javascript
const asset = this.app.assets.find('Large Texture');

// Unload the resource but keep the asset in the registry
asset.unload();

// The asset can be loaded again later
this.app.assets.load(asset);
```

### Removing Assets

To completely remove an asset from the registry:

```javascript
const asset = this.app.assets.find('Temporary Asset');

// Remove from registry (also unloads the resource)
this.app.assets.remove(asset);
```

## Loading Multiple Assets

To load multiple assets and wait for all of them:

```javascript
const assetNames = ['texture1', 'texture2', 'model1'];
const assets = assetNames.map(name => this.app.assets.find(name));

let loaded = 0;
const total = assets.length;

const onAssetLoad = () => {
    loaded++;
    if (loaded === total) {
        // All assets loaded
        this.onAllAssetsReady();
    }
};

for (const asset of assets) {
    asset.ready(onAssetLoad);
    if (!asset.loaded) {
        this.app.assets.load(asset);
    }
}
```

## Best Practices

- **Unload unused assets** - Free memory by unloading assets when changing levels or scenes
- **Use ready()** - It handles both loaded and not-yet-loaded cases
- **Handle errors** - Always provide error handling for dynamic loads
- **Batch loads** - Load related assets together to avoid visual inconsistencies

## See Also

- [Asset Registry](asset-registry.md) - Finding and managing assets
- [Preloading](preloading.md) - Loading assets before your app starts
