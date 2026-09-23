# Assets

Assets are the building blocks of your PlayCanvas application. They represent all the external resources your application needs, such as 3D models, textures, audio files, and scripts.

## Assets vs Resources

In PlayCanvas, there's an important distinction between **Assets** and **Resources**:

- **Asset** - A record in the asset registry that contains metadata about a resource, including its name, type, tags, and a reference to the underlying resource data. Assets are managed by the [`AssetRegistry`](https://developer.playcanvas.com/user-manual/assets/asset-registry.md).

- **Resource** - The actual runtime data that gets loaded into memory and used by the engine. For example, a texture asset's resource is the actual image data that can be applied to materials.

When you load an asset, PlayCanvas downloads and parses the underlying file to create the resource. The asset object then holds a reference to this resource via its `resource` property.

```javascript
const asset = this.app.assets.find('my-texture');
asset.ready((asset) => {
    const texture = asset.resource; // The actual Texture object
});
this.app.assets.load(asset);
```

## Asset Lifecycle

Assets go through several stages during the lifetime of your application:

1. **Registry** - Assets are registered in the [`AssetRegistry`](https://developer.playcanvas.com/user-manual/assets/asset-registry.md), making them discoverable by ID, name, or tags
2. **Loading** - Asset data is downloaded from the server
3. **Ready** - The resource is parsed and available for use
4. **Unloading** - Resources can be unloaded to free memory

For details on controlling when assets load, see [Preloading](https://developer.playcanvas.com/user-manual/assets/preloading.md) and [Loading and Unloading](https://developer.playcanvas.com/user-manual/assets/loading-unloading.md).

## Supported Formats

PlayCanvas supports a wide variety of file formats for different asset types. See [Supported Formats](https://developer.playcanvas.com/user-manual/assets/supported-formats.md) for a complete list.

## Working with Assets

### In the Editor

If you're using the PlayCanvas Editor, see the [Editor Assets Guide](https://developer.playcanvas.com/user-manual/editor/assets.md) for information on:

- Importing and organizing assets
- Configuring asset properties
- Using the Asset Store

### Programmatically

For working with assets in code:

- **[Asset Registry](https://developer.playcanvas.com/user-manual/assets/asset-registry.md)** - Find and manage assets at runtime
- **[Preloading](https://developer.playcanvas.com/user-manual/assets/preloading.md)** - Control which assets load before your app starts
- **[Loading and Unloading](https://developer.playcanvas.com/user-manual/assets/loading-unloading.md)** - Dynamically load assets during runtime

## Finding Assets

Looking for 3D models, textures, or audio for your project? See [Finding Assets](https://developer.playcanvas.com/user-manual/assets/finding.md) for a list of asset marketplaces and resources.
