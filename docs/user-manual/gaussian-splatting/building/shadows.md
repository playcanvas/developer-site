---
title: Shadows
description: "Enable shadow casting from Gaussian splats onto meshes: API properties, lights, and tuning shadow quality for splat scenes."
---

Gaussian Splats can cast shadows onto meshes and other surfaces in your scene.

**View Live Example** - See splat shadows in action.

<EngineExample id="gaussian-splatting/simple" title="View Live Example" />

![Splat Shadows](/img/user-manual/gaussian-splatting/splat-shadows.png)

## Enabling Shadow Casting

To enable shadow casting on a GSplat component, set the [castShadows](https://api.playcanvas.com/engine/classes/GSplatComponent.html#castshadows) property:

```javascript
entity.gsplat.castShadows = true;
```

Or when creating the component:

```javascript
entity.addComponent('gsplat', {
    asset: splatAsset,
    castShadows: true
});
```

You'll also need a light with shadow casting enabled:

```javascript
entity.light.castShadows = true;
```

## Shadow Quality

For better shadow quality, you can adjust the alpha clip threshold. This controls how transparent splats contribute to shadows — lower values include more semi-transparent splats in the shadow, while higher values create sharper but potentially incomplete shadows.

Set the alpha clip threshold on the global GSplat settings:

```javascript
app.scene.gsplat.alphaClip = 0.4;
```

## Receiving Shadows

Splats cannot directly receive shadows from other objects. However, you can work around this limitation by using a shadow catcher - an invisible mesh that approximates the splat's shape and writes to the depth buffer to receive shadows.

See [3DGS with Physics and Relighting](https://playcanvas.com/project/1358087/overview/3dgs-with-physics-and-relighting) for an example of this technique in action.
