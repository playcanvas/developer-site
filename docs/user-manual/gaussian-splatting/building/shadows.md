---
title: Shadows
---

Gaussian Splats can cast shadows onto meshes and other surfaces in your scene.

**[View Live Example](https://playcanvas.github.io/#/gaussian-splatting/simple)** - See splat shadows in action.

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

### Unified Mode

In unified rendering mode, set the alpha clip threshold on the global GSplat settings:

```javascript
app.scene.gsplat.alphaClip = 0.4;
```

### Non-Unified Mode

In non-unified mode, set the alpha clip threshold directly on the component's material:

```javascript
entity.gsplat.material.setParameter('alphaClip', 0.4);
```

## Receiving Shadows

Splats cannot directly receive shadows from other objects. However, you can work around this limitation by using a shadow catcher - an invisible mesh that approximates the splat's shape and writes to the depth buffer to receive shadows.

See [3DGS with Physics and Relighting](https://playcanvas.com/project/1358087/overview/3dgs-with-physics-and-relighting) for an example of this technique in action.
