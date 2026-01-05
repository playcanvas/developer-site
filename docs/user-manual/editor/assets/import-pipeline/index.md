---
title: Asset Import Pipeline
---

Some assets are uploaded in source format and need to be converted into a "target" format before they can be used in a game at runtime. This process is called *Importing*. For example, a 3D model can be uploaded as an FBX file, but must be converted into a PlayCanvas compatible model file before it can be loaded in the game.

Some assets don't need to be imported before they can be used. For example a PNG image can be used as a texture immediately.

## Asset Tasks {#asset-tasks}

When a source asset is uploaded, PlayCanvas starts an Asset Task to perform this import process on our server.

There are a variety of options available to tune the behavior of the import pipeline to suit your needs.

<img loading="lazy" src="/img/user-manual/assets/import-pipeline/asset-tasks.png" width="480" />

### Search related assets {#search-related-assets}

When you update an source asset by uploading a new version of the file. There are two possible behaviors for how we update the target assets that are created by the import pipeline.

* If **Search related assets** is enabled, the pipeline will update target assets no matter what folder they are located in.
* If **Search related assets** is not enabled, the pipeline will only look for the target assets in the same folder as the source asset.

So, if you leave this enabled, you are able to organize your source and target assets into folders and be sure that when you update a source assets it will update all related assets.

### Assets default to preload {#assets-default-to-preload}

Newly created assets will automatically be set to [preload](/user-manual/assets/preloading/) or not depending on whether this option is enabled or not. The exception to this are JavaScript script files which will always be set to preloaded when created.

## Texture Import Settings {#texture-import-settings}

These options only affect the importing of images and textures.

### Texture POT (Power of Two) {#texture-pot-power-of-two}

When this option is enabled textures that are not a power of two will be converted to the nearest power of two resolution when they are imported.

### Create Atlases {#create-atlases}

Images that are uploaded will be imported as a texture atlas instead of a normal texture asset. This is a useful time saver when uploading many spritesheets or UI assets.

## Model Import Settings {#model-import-settings}

These options only affect the importing of model or scene files (e.g. FBX, Collada, obj, etc)

### Preserve material mappings {#preserve-material-mappings}

When a model file is updated or reimported, the Editor will try to preserve the material mappings that were set on it.

### Overwrite Models {#overwrite-models}

When a model file is updated or reimported this option determines whether or not the target model file is overwritten. The default behavior is to overwrite with the new model.

### Overwrite Animations {#overwrite-animations}

When a model file is updated or reimported this option determines whether or not a animations created from the model are overwritten. The default behavior is to overwrite with the new animations.

### Overwrite Materials {#overwrite-materials}

When a model file is updated or reimported this option determines whether or not materials created from the model are overwritten. The default behavior is to leave existing materials.

### Overwrite Textures {#overwrite-textures}

When a model file is updated or reimported this option determines whether or not textures created from the model are overwritten. The default behavior is to overwrite with the new textures.

### Convert to GLB {#convert-to-glb}

Enabled by default on new projects, imported models and animations will create GLB model and animation assets instead of the older, deprecated JSON format.

### Import Hierarchy {#import-hierarchy}

Only available if using [Convert to GLB](#convert-to-glb) option. When a model file is imported, a template asset is created that contains the full hierarchy of the model as entities allowing to you to manipulate them directly in the Editor. See more information about this feature [here](/user-manual/editor/assets/import-pipeline/import-hierarchy/).

### Mesh Compression {#mesh-compression}

Only available if using [Convert to GLB](#convert-to-glb) option. Setting this to a compression format will automatically compress mesh data when importing or re-importing model files. This can drastically reduce the size of GLB files at the cost of some runtime decompression cost.

If using Draco compression, remember to import the Draco WASM module into the project otherwise the models will not load.

<img loading="lazy" src="/img/user-manual/assets/import-pipeline/draco-import-button.png" width="480" />

### Create FBX Folder {#create-fbx-folder}

When importing a model file (e.g a GLB or FBX), the Editor will create a folder for the assets created by the import such as render, template and material assets.

If there is already a Model (Source) file in the current folder or a folder with the same name as the file being imported, it will overwrite the existing assets instead of creating a new folder.

## Animation Import Settings {#animation-import-settings}

Please refer to the [Animation section](/user-manual/editor/assets/inspectors/animation/) for more details.
