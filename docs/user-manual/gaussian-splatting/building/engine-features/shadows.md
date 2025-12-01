---
title: Shadows
---

Splats can cast shadows onto meshes (see the GSplatComponent's [castShadows](https://api.playcanvas.com/engine/classes/GSplatComponent.html#castshadows) property).

![Splat Shadows](/img/user-manual/gaussian-splatting/splat-shadows.png)

View the [Splat Shadows Engine Example](https://playcanvas.github.io/#/gaussian-splatting/simple).

Splats cannot directly receive shadows (although you can fake it with an invisible mesh that approximates the splat that is written to the depth buffer).
