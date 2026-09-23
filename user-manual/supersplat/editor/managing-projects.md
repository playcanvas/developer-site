# Managing Projects

SuperSplat supports the `.ssproj` file format, allowing you to save and reload your work, preserving all settings and animations. This format provides an efficient way to manage projects, share work, and continue editing at a later time.

## Features of `.ssproj` Files

* Full Project Save: Stores every imported splat with its edits, transform, pivot, and applied color grades, plus the camera, view settings such as the grid planes, and the timeline animation.
* Easy Reloading: Load a saved project file to restore the exact state of your work.
* Portability: Share `.ssproj` files with others to collaborate on projects.

## Saving a Project

To save your current work as a `.ssproj` file:

* Open the `File` menu and select `Save As`.
* In the **Save As** dialog, choose the output folder under **Location**. The Editor remembers the last folder you used; click **Choose output folder…** (or **Change…**) to pick another.
* Enter a **Filename**. The dialog warns if a file of that name already exists and offers to **Overwrite** it.
* Click **Save**. Your project will be stored as a `.ssproj` file.

Once a project has a name, `File` > `Save` writes to the same file again without asking. In browsers without the File System Access API, the project is delivered as a download instead.

## Loading a Project

To load a previously saved `.ssproj` file:

* Open the `File` menu and select `Open`, then browse to the `.ssproj` file and click `Open`.
* Or select `File` > `Open Recent` to pick a project you have opened or saved before.
* Or drag the `.ssproj` file into the Editor window.
* If you have installed SuperSplat as an app, double-click the `.ssproj` file in File Explorer (Windows) or Finder (macOS).

SuperSplat restores the project to its last saved state.

## File Structure

The `.ssproj` format is actually a ZIP archive containing:

* A JSON document that stores the project metadata: camera, view settings, camera poses, timeline, and the list of splats.
* The splat data, stored once as uncompressed `.ply` files, plus a small per-splat file holding each splat's editing state (selection, locked and deleted Gaussians, transform, and color grades). Each splat appears as a row in the Scene Manager on load.

## Best Practices

* Save Regularly: To prevent data loss, save your project frequently.
* Use Versioning: When working on major changes, save multiple versions of your project to avoid accidental overwrites.
* Backup Your Files: Store backups of important `.ssproj` files in a cloud storage service or external drive.

By utilizing the `.ssproj` format, SuperSplat users can efficiently manage and share their projects, enhancing workflow and collaboration.
