---
title: Alternatives to ammo.js
description: Survey of lighter 2D and 3D physics engines when ammo.js size or cost is too high for your project.
---

ammo.js is perhaps the most popular and well known JavaScript physics engine. It is highly versatile and can generate high fidelity simulations. But it has quite high performance and memory requirements. Therefore, you should investigate whether it is indeed the best choice for your application. For example, if you are making a 2D game, a 2D physics engine might be more appropriate.

As it happens, there are several alternatives to ammo.js. The most actively developed options are listed first, followed by older engines that are largely unmaintained but still usable:

| Physics Engine                                     | Language   | JS Build | WASM Build | 2D | 3D | Determinism | PlayCanvas Integration                                |
| -------------------------------------------------- | ---------- | -------- | ---------- | -- | -- | ----------- | ----------------------------------------------------- |
| [Rapier](https://rapier.rs)                        | Rust       |          | ✔️          | ✔️  | ✔️  | ✔️           |                                                       |
| [Jolt](https://github.com/jrouwe/JoltPhysics.js)   | C++        | ✔️        | ✔️          |    | ✔️  | ✔️           |                                                       |
| [Box3D](https://github.com/erincatto/box3d)        | C          |          | ✔️          |    | ✔️  | ✔️           |                                                       |
| [PhysX](https://github.com/NVIDIA-Omniverse/PhysX) | C++        |          | ✔️          |    | ✔️  |             |                                                       |
| [box2d.js](https://github.com/kripken/box2d.js)    | C++        | ✔️        | ✔️          | ✔️  |    |             |                                                       |
| [Matter.js](https://github.com/liabru/matter-js)   | JavaScript | ✔️        |            | ✔️  |    |             |                                                       |
| [p2.js](https://github.com/schteppe/p2.js)         | JavaScript | ✔️        |            | ✔️  |    |             | [Yes](https://github.com/playcanvas/playcanvas-p2.js) |
| [cannon.js](https://github.com/schteppe/cannon.js) | JavaScript | ✔️        |            |    | ✔️  |             |                                                       |
| [Oimo.js](https://github.com/lo-th/Oimo.js)        | JavaScript | ✔️        |            |    | ✔️  |             |                                                       |

The engines not written in JavaScript are compiled for the browser by separate binding projects: `@dimforge/rapier2d` and `@dimforge/rapier3d` for Rapier, [JoltPhysics.js](https://github.com/jrouwe/JoltPhysics.js) for Jolt, [box3d.js](https://github.com/isaac-mason/box3d.js) for Box3D and [physx-js-webidl](https://github.com/fabmax/physx-js-webidl) for PhysX. Only the Rapier and Jolt bindings are maintained by the engine authors.

Most of those ship WebAssembly only. Jolt and box2d.js also offer a JavaScript build, because Emscripten can emit [asm.js](https://developer.mozilla.org/en-US/docs/Games/Tools/asm.js) instead of WebAssembly. An asm.js build runs anywhere JavaScript does and needs no WebAssembly support, but it is slower and larger than the equivalent WebAssembly build, so prefer WebAssembly unless you have a specific reason not to.

:::info

The Determinism column means *cross-platform* determinism: the simulation produces identical results on every device, which you need for lockstep networked multiplayer and replays. It depends on how the engine is built, so check before relying on it:

- Rapier's official WebAssembly packages are cross-platform deterministic out of the box.
- Jolt requires `CROSS_PLATFORM_DETERMINISTIC` to be enabled at compile time, which the prebuilt JoltPhysics.js packages do not set.
- PhysX guarantees determinism only for a fixed platform and build, and explicitly does not support it across architectures.

:::

:::warning

Box3D is by far the newest option here. The engine reached its initial 0.1.0 release in June 2026 and box3d.js is still at an early 0.0.x version, so expect breaking API changes.

:::

While there is currently only one existing PlayCanvas integration for the p2.js engine, it should be straightforward to create additional integrations for the other engines listed using a similar approach.
