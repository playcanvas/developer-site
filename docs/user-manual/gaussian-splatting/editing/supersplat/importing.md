---
title: Importing Splats
sidebar_position: 2
---

SuperSplat supports the importing of Gaussian Splat scenes in `.ply`, `.compressed.ply` and `.splat` format.

Note that only `.ply` files that contain 3D Gaussian Splat data can be imported. If you attempt to load any other type of data from a `.ply` file, it will fail.

There are four ways that you can load a Gaussian Splat file:

1. Drag and drop one or more `.ply` files from your file system into SuperSplat's client area.
2. Select the `File` > `Import` menu item and select one or more `.ply` files from your file system.
3. If you have installed SuperSplat as a PWA, you can simply double-click a `.ply` file in File Explorer (Windows) or Finder (macOS).
4. Use the `load` query parameter. This is in the form: `https://playcanvas.com/supersplat/editor?load=<PLY_URL>`. An example would be:

    https://superspl.at/editor?load=https://raw.githubusercontent.com/willeastcott/assets/main/biker.ply

    This is a useful mechanism for sharing splats with other people (say on social platforms like X and LinkedIn).
