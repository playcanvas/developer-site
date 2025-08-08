---
title: Managing Projects
---

SuperSplat supports the `.ssproj` file format, allowing you to save and reload your work, preserving all settings and animations. This format provides an efficient way to manage projects, share work, and continue editing at a later time.

## Features of .ssproj Files

* Full Project Save: Stores all relevant project data, including app settings, timeline settings and more.
* Easy Reloading: Load a saved project file to restore the exact state of your work.
* Portability: Share `.ssproj` files with others to collaborate on projects.

## Saving a Project

To save your current work as a .ssproj file:

* Open the `File` menu.
* Select `Save As`.
* Choose a location and enter a name for your project.
* Click Save. Your project will be stored as a `.ssproj` file.

## Loading a Project

To load a previously saved `.ssproj` file:

* Open the `File` menu.
* Select `Open`.
* Browse to the `.ssproj` file you wish to open.
* Click `Open`. SuperSplat will restore your project to its last saved state.

## File Structure

The `.ssproj` format is actually a ZIP archive containing:

* A JSON-based file that stores project-specific metadata, such as app settings and timeline settings.
* One or more uncompressed `.ply` files (these are listed in the `Scenes` panel on load).

## Best Practices

* Save Regularly: To prevent data loss, save your project frequently.
* Use Versioning: When working on major changes, save multiple versions of your project to avoid accidental overwrites.
* Backup Your Files: Store backups of important .ssproj files in a cloud storage service or external drive.

By utilizing the `.ssproj` format, SuperSplat users can efficiently manage and share their projects, enhancing workflow and collaboration.
