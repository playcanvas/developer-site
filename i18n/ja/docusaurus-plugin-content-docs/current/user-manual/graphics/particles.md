---
title: パーティクル
---

PlayCanvasはパーティクルシステムの作成と編集のための包括的なサポートを提供します。

## パーティクルシステム (ParticleSystem) とは？

パーティクルシステムは、多数の独立して移動するパーティクルを管理するシミュレーションです。雨、雪、煙、火などの膨大な数のエフェクトをまとめるために使用できます。

ただし、パーティクルは物理的にシミュレートされません。互いに相互作用や衝突はしません。シーン内の表面を通過します。

## パーティクルシステムの作成

エディターの3Dビューで、選択されていないパーティクルシステムは、次のアイコンで表されます。

![Particle system icon](/img/user-manual/graphics/particles/particle-system-icon.png)

新しいパーティクルシステムを作成するには、新しいエンティティを作成し、ParticleSystemコンポーネントを追加します。エディターメニューには、次のアイテムがあり、これを1つのステップで実行できます。

![Particle system creation](/img/user-manual/graphics/particles/particle-system-create.png)

デフォルトの設定を使用して新しく作成されたパーティクルシステムは、次のようになります。

![Default particle system](/img/user-manual/graphics/particles/particle-system-default.gif)

ParticleSystemコンポーネントインターフェースを介してパーティクルシステムを構成するには、[こちら](/user-manual/editor/scenes/components/particlesystem)を参照してください。

## スクリプトでパーティクルシステムをトリガー

イベントや時間に応じてパーティクルシステムを再生する必要がある場合があります。たとえば、ミサイルが目標に到達したときに爆発が再生される必要があります。これを行うには、パーティクルシステムのAutoplayオプションが無効になっていることを確認してください。次に、パーティクルシステムエンティティにScriptコンポーネントをアタッチします。次の2行でパーティクルシステムを開始または再開します。

```javascript
this.entity.particlesystem.reset();
this.entity.particlesystem.play();
```

## ソフトパーティクル (Soft Particles)

ソフトパーティクルは、シーンジオメトリと交差する場所近くでフェードアウトするパーティクルのことを意味します。[```depthSoftening```](https://api.playcanvas.com/engine/classes/ParticleSystemComponent.html#depthsoftening)を使用してSoftパーティクルを有効にした場合は、パーティクルを描画するカメラに[Depthマップ](/user-manual/graphics/cameras/depth-layer)レンダリングを有効にする必要があります。
