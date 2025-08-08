---
title: Types of VR experiences
---

Different types of VR experiences can have different reference spaces. Reference spaces are coordinate systems used to define the positions and orientations of objects and users within a VR environment. They allow the application to understand and manage spatial relationships in a consistent manner. Refer to the `XRSPACE` constants for more information:

* [`XRSPACE_BOUNDEDFLOOR`](https://api.playcanvas.com/engine/variables/XRSPACE_BOUNDEDFLOOR.html)
* [`XRSPACE_LOCAL`](https://api.playcanvas.com/engine/variables/XRSPACE_LOCAL.html)
* [`XRSPACE_LOCALFLOOR`](https://api.playcanvas.com/engine/variables/XRSPACE_LOCALFLOOR.html)
* [`XRSPACE_UNBOUNDED`](https://api.playcanvas.com/engine/variables/XRSPACE_UNBOUNDED.html)
* [`XRSPACE_VIEWER`](https://api.playcanvas.com/engine/variables/XRSPACE_VIEWER.html)

## Room Scale VR

Room Scale VR is supported by devices such as the Meta Quest, Apple Vision Pro, HTC Vive and many others. Room scale experiences are designed to allow a small or large amount of movement away from the origin position of the scene.

Suitable reference spaces: `pc.XRSPACE_LOCALFLOOR`, `pc.XRSPACE_BOUNDEDFLOOR`, `pc.XRSPACE_UNBOUNDED`.

## Seated VR

Seated VR or 3DoF (3 degrees of freedom) is supported by devices such as Google Cardboard, Samsung Gear VR and Oculus Rift. These experiences are based around the user remaining roughly stationary. In some cases, there is no positional data available (e.g. Google Cardboard) and only the orientation of the headset is used.

Suitable reference spaces: `pc.XRSPACE_LOCAL`, `pc.XRSPACE_LOCALFLOOR`.
