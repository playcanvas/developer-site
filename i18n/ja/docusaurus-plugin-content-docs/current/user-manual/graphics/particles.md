---
title: パーティクル
sidebar_position: 5
---

PlayCanvasはパーティクルシステムの作成と編集のための包括的なサポートを提供します。

## パーティクルシステム (ParticleSystem) とは？

パーティクルシステムは、多数の独立して移動するパーティクルを管理するシミュレーションです。雨、雪、煙、火などの膨大な数のエフェクトをまとめるために使用できます。

ただし、パーティクルは物理的にシミュレートされません。互いに相互作用や衝突はしません。シーン内の表面を通過します。

## パーティクルシステムの作成

エディターの3Dビューで、選択されていないパーティクルシステムは、次のアイコンで表されます。

![Particle system icon][1]

新しいパーティクルシステムを作成するには、新しいエンティティを作成し、ParticleSystemコンポーネントを追加します。エディターメニューには、次のアイテムがあり、これを1つのステップで実行できます。

![Particle system creation][2]

デフォルトの設定を使用して新しく作成されたパーティクルシステムは、次のようになります。

![Default particle system][3]

ParticleSystemコンポーネントインターフェースを介してパーティクルシステムを構成するには、[こちら][4]を参照してください。

## スクリプトでパーティクルシステムをトリガー

イベントや時間に応じてパーティクルシステムを再生する必要がある場合があります。たとえば、ミサイルが目標に到達したときに爆発が再生される必要があります。これを行うには、パーティクルシステムのAutoplayオプションが無効になっていることを確認してください。次に、パーティクルシステムエンティティにScriptコンポーネントをアタッチします。次の2行でパーティクルシステムを開始または再開します。

```javascript
this.entity.particlesystem.reset();
this.entity.particlesystem.play();
```

## ソフトパーティクル (Soft Particles)

ソフトパーティクルは、シーンジオメトリと交差する場所近くでフェードアウトするパーティクルのことを意味します。[```depthSoftening```][5]を使用してSoftパーティクルを有効にした場合は、パーティクルを描画するカメラに[Depthマップ][6]レンダリングを有効にする必要があります。

[1]: /images/user-manual/graphics/particles/particle_system_icon.png
[2]: /images/user-manual/graphics/particles/particle_system_create.png
[3]: /images/user-manual/graphics/particles/particle_system_default.gif
[4]: /user-manual/packs/components/particlesystem
[5]: /api/pc.ParticleSystemComponent.html#depthSoftening
[6]: /user-manual/graphics/cameras/depth-layer
