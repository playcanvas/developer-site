---
title: 影
---

Gaussian Splatsは、シーン内のメッシュやその他のサーフェスに影を落とすことができます。

**[ライブデモを見る](https://playcanvas.github.io/#/gaussian-splatting/simple)** - スプラットの影の動作を確認できます。

![スプラットの影](/img/user-manual/gaussian-splatting/splat-shadows.png)

## シャドウキャスティングの有効化

GSplatコンポーネントでシャドウキャスティングを有効にするには、[castShadows](https://api.playcanvas.com/engine/classes/GSplatComponent.html#castshadows) プロパティを設定します：

```javascript
entity.gsplat.castShadows = true;
```

または、コンポーネント作成時に設定できます：

```javascript
entity.addComponent('gsplat', {
    asset: splatAsset,
    castShadows: true
});
```

シャドウキャスティングが有効なライトも必要です：

```javascript
light.light.castShadows = true;
```

## 影の品質

より良い影の品質を得るために、グローバルGSplatマテリアルのアルファクリップしきい値を調整できます。これは、半透明のスプラットが影にどのように寄与するかを制御します：

```javascript
app.scene.gsplat.material.setParameter('alphaClip', 0.4);
app.scene.gsplat.material.update();
```

値が低いほど、より多くの半透明スプラットが影に含まれます。値が高いほど、よりシャープですが不完全な影になる可能性があります。

:::note

`alphaClip` パラメータは一時的な措置です。影の品質を制御するためのより正式なAPIは、将来のリリースで予定されています。

:::

## 影の受け取り

スプラットは他のオブジェクトからの影を直接受け取ることができません。ただし、シャドウキャッチャーを使用することでこの制限を回避できます。シャドウキャッチャーは、スプラットの形状を近似し、デプスバッファに書き込んで影を受け取る不可視のメッシュです。

このテクニックの実際の例については、[3DGS with Physics and Relighting](https://playcanvas.com/project/1358087/overview/3dgs-with-physics-and-relighting) を参照してください。
