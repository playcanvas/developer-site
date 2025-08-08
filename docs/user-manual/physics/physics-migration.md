---
title: Updating ammo.js
---

### Introduction

PlayCanvas has added support for the latest version of ammo.js.

The new version has a number of benefits:

- more of the underlying Bullet API has been exposed
- support for ammo.js wasm module has been added
- the wasm version is smaller and runs faster

### Existing projects

Projects created before the introduction of wasm modules continue by default to use the legacy version of ammo.js. It is up to project owners to migrate their physics system to the latest version of ammo.js.

To check if your project is using the legacy version of ammo.js, navigate to the Scene Settings panel:

![Physics Legacy Settings](/img/user-manual/physics/physics-legacy-settings.png)

If 'Enable Physics' does not appear, then the project is new and doesn't have the option of using the legacy built-in version of ammo.js.

Otherwise, if 'Enable Physics' is checked the legacy version of ammo.js is silently being added to your project at build time.

### Migration

In order to use the latest version of ammo.js, disable 'Enable Physics' and click 'Import Ammo'. This imports the latest version of ammo.js provided by PlayCanvas into the Assets Panel.

If updating ammo.js causes issues with your project you may need to revert back to the old version. Do this by deleting (or disabling) the project's ammo.js modules and re-enabling the physics checkbox.

### Note

The project should either include legacy physics (using the 'Enable Physics' checkbox) or it should have the ammo.js modules included in the project directly, but it should not include both at the same time!
