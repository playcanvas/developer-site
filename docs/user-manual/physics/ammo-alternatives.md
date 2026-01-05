---
title: Alternatives to ammo.js
---

ammo.js is perhaps the most popular and well known JavaScript physics engine. It is highly versatile and can generate high fidelity simulations. But it has quite high performance and memory requirements. Therefore, you should investigate whether it is indeed the best choice for your application. For example, if you are making a 2D game, a 2D physics engine might be more appropriate.

As it happens, there are several alternatives to ammo.js:

| Physics Engine                                     | JS       | WASM     | 2D       | 3D       | PlayCanvas Integration                                |
| -------------------------------------------------- | -------- | -------- | -------- | -------- | ----------------------------------------------------- |
| [box2d.js](https://github.com/kripken/box2d.js)    | &#x2713; | &#x2713; | &#x2713; |          |                                                       |
| [Matter.js](https://github.com/liabru/matter-js)   | &#x2713; |          | &#x2713; |          |                                                       |
| [p2.js](https://github.com/schteppe/p2.js)         | &#x2713; |          | &#x2713; |          | [Yes](https://github.com/playcanvas/playcanvas-p2.js) |
| [cannon.js](https://github.com/schteppe/cannon.js) | &#x2713; |          |          | &#x2713; |                                                       |
| [Oimo.js](https://github.com/lo-th/Oimo.js)        | &#x2713; |          |          | &#x2713; |                                                       |

While there is currently only one existing PlayCanvas integration for the p2.js engine, it should be straightforward to create additional integrations for the other engines listed using a similar approach.

In December 2018, Nvidia open sourced the [PhysX](https://github.com/NVIDIAGameWorks/PhysX) physics engine. While there is no JS/WASM port of PhysX yet, it is perhaps the most competitive physics runtime compared to Bullet/ammo.js. When a web port becomes available, it will be added to the table above.
