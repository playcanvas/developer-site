---
title: Alternatives to ammo.js
description: Survey of lighter 2D and 3D physics engines when ammo.js size or cost is too high for your project.
---

ammo.js is perhaps the most popular and well known JavaScript physics engine. It is highly versatile and can generate high fidelity simulations. But it has quite high performance and memory requirements. Therefore, you should investigate whether it is indeed the best choice for your application. For example, if you are making a 2D game, a 2D physics engine might be more appropriate.

As it happens, there are several alternatives to ammo.js. The most actively developed options are listed first, followed by older engines that are largely unmaintained but still usable:

| Physics Engine                                     | JS | WASM | 2D | 3D | PlayCanvas Integration                                |
| -------------------------------------------------- | -- | ---- | -- | -- | ----------------------------------------------------- |
| [Rapier](https://rapier.rs)                        |    | ✔️    | ✔️  | ✔️  |                                                       |
| [Jolt](https://github.com/jrouwe/JoltPhysics.js)   | ✔️  | ✔️    |    | ✔️  |                                                       |
| [Box3D](https://github.com/erincatto/box3d)        |    | ✔️    |    | ✔️  |                                                       |
| [box2d.js](https://github.com/kripken/box2d.js)    | ✔️  | ✔️    | ✔️  |    |                                                       |
| [Matter.js](https://github.com/liabru/matter-js)   | ✔️  |      | ✔️  |    |                                                       |
| [p2.js](https://github.com/schteppe/p2.js)         | ✔️  |      | ✔️  |    | [Yes](https://github.com/playcanvas/playcanvas-p2.js) |
| [cannon.js](https://github.com/schteppe/cannon.js) | ✔️  |      |    | ✔️  |                                                       |
| [Oimo.js](https://github.com/lo-th/Oimo.js)        | ✔️  |      |    | ✔️  |                                                       |

The first three are all written in native languages, reach the browser as WebAssembly, and offer cross-platform determinism, which is useful if you need reproducible simulation for networked multiplayer or replays:

- **Rapier** is written in Rust and publishes official WebAssembly bindings for both 2D (`@dimforge/rapier2d`) and 3D (`@dimforge/rapier3d`) simulation.
- **Jolt** is written in C++ and is exposed to the web by [JoltPhysics.js](https://github.com/jrouwe/JoltPhysics.js), which ships both WebAssembly and asm.js builds.
- **Box3D** is written in C by the author of Box2D. It is the newest option listed here, having reached its initial 0.1.0 release in June 2026, and its [box3d.js](https://github.com/isaac-mason/box3d.js) WebAssembly bindings are third-party and still at an early 0.0.x version. Expect breaking API changes.

While there is currently only one existing PlayCanvas integration for the p2.js engine, it should be straightforward to create additional integrations for the other engines listed using a similar approach.

In December 2018, Nvidia open sourced the [PhysX](https://github.com/NVIDIAGameWorks/PhysX) physics engine. While there is no JS/WASM port of PhysX yet, it is perhaps the most competitive physics runtime compared to Bullet/ammo.js. When a web port becomes available, it will be added to the table above.
