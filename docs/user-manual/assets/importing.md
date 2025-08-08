---
title: Uploading and Importing
---

## Creating New Assets

To upload an asset to PlayCanvas, follow these steps:

### In the Editor

* Drag and drop your asset file into the Asset panel in the Editor window.
* A progress bar will appear along the bottom.
* When the progress bar disappears, your new Asset will appear in the Asset panel.

Now, when you attempt to choose an asset via the asset picker attribute control (for the Model component or the Animation component for example), your asset will be available for assignment.

:::note

There is a file size limit of 340MB.

:::

## Updating Existing Assets

To update an Asset that you have already uploaded. Upload the asset again, ensuring that you have the same filename as the existing asset. PlayCanvas will update the existing asset with the new upload.

## Migrating from JSON to glTF GLB

As of Wed 14 Oct 2020, PlayCanvas will be creating GLBs for model and animation imports instead of JSON. This gives a large reduction in parsing times which means lower load times and more responsive applications.

For projects created prior to this date, they will still create JSON assets by default for consistency.

If you would like to migrate assets to the GLB format, please go to 'Project Settings'.

<img loading="lazy" src="/img/user-manual/assets/importing/project-settings.png" alt="Project settings" width="300" />

Open 'Asset Tasks' and tick 'Convert to GLB'.

<img loading="lazy" src="/img/user-manual/assets/importing/asset-tasks.png" alt="Asset tasks settings" width="400" />

And finally reimport the model and/or animation file (via drag and drop or the 'Upload' menu option) to create the GLB asset.

<img loading="lazy" src="/img/user-manual/assets/importing/drag-and-drop.gif" alt="Drag and drop file" />

Once created, this can be referenced to Entities in place of the existing JSON asset.
