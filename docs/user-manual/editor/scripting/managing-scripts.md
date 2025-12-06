---
title: Managing Your Scripts
---

In the PlayCanvas Editor, your JavaScript code lives in Script Assets. These are `.js` or `.mjs` files stored within your project's Asset panel, just like your models, textures, and materials. Effectively managing these Script Assets is key to an organized and efficient workflow. This page covers how to create, organize, delete, import, and assign scripts using the Editor interface.

Key Concepts:

* **Script Asset:** The `.js` or `.mjs` file containing your script's code. It resides in the Asset Panel.
* **Script Component:** An instance of one or more Script Assets attached to an Entity. This is what makes your script "run" on that specific Entity.

## Creating New Scripts

You can create new Script Assets directly within the Editor:

1. Navigate to the Asset Panel.
2. Choose a Folder (Optional but Recommended): It's good practice to organize your scripts into folders. You can create a new folder by right-clicking in the Asset Panel and selecting New Asset > Folder.
3. Create the Script:
    * Right-click within the desired folder (or the root of the Asset Panel).
    * Select New Asset > Script.  
    ![New Script](/img/user-manual/scripting/new-script.png)
    * In the popup, provide a filename for your new script.

## Importing Scripts

You can bring scripts into your PlayCanvas project from external sources:

* **Importing Scripts from Your Computer:**
    1. Locate the `.js`/`.mjs` file(s) on your computer's file system.
    2. Drag the file(s) directly from your file explorer/finder into the desired folder in the PlayCanvas Editor's Asset Panel.
    3. The Editor will upload and process the script, making it available as a Script Asset.
* **Importing Scripts from the PlayCanvas Asset Store:**
    1. Open the [Asset Store](../../assets/asset-store/index.md) (accessible via a button in the Asset Panel header).
    2. Browse or apply the SCRIPT filter.
    3. Once you find a script/package you want, click to view its details and select IMPORT.
    4. The imported script(s) will appear in your Asset Panel, typically within a new folder named after the Asset Store package. These are now regular Script Assets you can manage and use.

## Assigning Scripts to Entities (via Script Components)

A Script Asset itself doesn't do anything until it's attached to an Entity via a Script Component.

1. **Select an Entity:** In the Hierarchy panel, select the Entity you want to add a script to.
2. **Add a Script Component (if one doesn't exist):**
    * In the Inspector panel (on the right), click the Add Component button.
    * Select Script from the list. A new Script Component will be added to the Entity.
3. **Assign Your Script Asset(s) to the Script Component:**
    * The Script Component has an edit box (with the text + ADD SCRIPT). Click within the edit box to focus.
    * A dropdown/search box will appear. Start typing the name of your script, or browse the list, and select it.
    ![Select Script](/img/user-manual/scripting/select-script.png)
    * You can add multiple Script Assets to a single Script Component on an Entity. They will generally execute their lifecycle methods (like initialize, update) in the order they appear in the "Scripts" array, though dependencies are better managed using postInitialize or events.

## Organizing Scripts

As your project grows, so will your number of scripts. Good organization is crucial:

* **Folders:** Use folders within the Asset Panel to categorize and group your scripts. You can drag-and-drop scripts between folders as necessary.
* **Naming Conventions:** Stick to consistent and descriptive naming for your script files. This makes them easier to find and understand.

## Deleting Scripts

To delete a Script Asset:

1. Select the Script Asset in the Asset Panel.
2. Press the Delete key, or right-click and select Delete.
3. A confirmation dialog will appear. Click DELETE to confirm.

:::note

If the Script Asset is currently assigned to any Script Components on Entities in your scenes, deleting the asset will remove it from those components. You may want to delete those components if they are no longer required.

:::

:::warning

There is no undo for Asset Deletion so be cautious. Using [version control](../../editor/version-control/index.md) to regularly set checkpoints is highly recommended to recover accidentally deleted files.

:::
