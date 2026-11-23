---
title: リライティング
description: "プロキシメッシュと GsplatRelighting スクリプトを使い、標準のライトで Gaussian Splat のシーンをリライティングする方法。セットアップ、ライト、シャドウ、調整。"
---

Gaussian Splat のシーンは、ライティングがベイクされた状態でキャプチャされます。リライティングを使うと、そのライティングを実行時に変更できます。ソフトシャドウ付きの太陽を追加する、ポイントライトを配置する、環境を入れ替えるといったことが可能です。シーンの**プロキシメッシュ**を標準のライトで照らし、そのライティングをピクセル単位でスプラットに転写することで実現します。

**ライブサンプルを見る** - HDRI 環境、PCSS ディレクショナルライト、シャドウを落とすオムニライトでリライティングしたスプラットシーンです。

<EngineExample id="gaussian-splatting-fx/relighting" title="ライブサンプルを見る" />

## 仕組み

1. スプラットシーンを近似する簡略化したメッシュ（スプラットから再構築したものや、フォトグラメトリのメッシュなど）を、それを照らすライトとともに専用のレイヤーに配置します。
2. `GsplatRelighting` スクリプトが、メインカメラと一致するカメラからそのレイヤーをオフスクリーンテクスチャにレンダリングします。RGB にはライティングされたメッシュの色、アルファにはメッシュのカバレッジマスクが入ります。
3. [フラグメントステージ](/user-manual/gaussian-splatting/building/custom-shaders/fragment)のシェーダーチャンクが、各スプラットフラグメントの色を、そのフラグメントの画面位置でサンプリングしたライティングで調整します。テクスチャはメインカメラの画面と一致しているため再投影は不要で、ライティングはピクセル単位で転写されます。

プロキシメッシュに覆われていないスプラット（空など）は、色を変えずにそのまま残すか、背景用の別の乗数でスケールして環境の露出に追従させることができます。

## セットアップ

この手法は [`GsplatRelighting`](https://github.com/playcanvas/engine/blob/main/scripts/esm/gsplat/gsplat-relighting.mjs) スクリプトにまとめられています。メインカメラを持つエンティティにアタッチします。

```javascript
import { GsplatRelighting } from 'playcanvas/scripts/esm/gsplat/gsplat-relighting.mjs';

camera.addComponent('script');
const relighting = camera.script.create(GsplatRelighting, {
    properties: {
        blend: 0.5,
        brightness: 1
    }
});
```

プロキシメッシュをリライティング用のレイヤーに配置し、カバレッジマスクを書き込むように設定したマテリアルを割り当てます。

```javascript
const meshMaterial = new StandardMaterial();
meshMaterial.diffuse = new Color(0.5, 0.5, 0.5);
relighting.configureMaterial(meshMaterial);

const meshEntity = meshAsset.resource.instantiateRenderEntity();
meshEntity.findComponents('render').forEach((render) => {
    render.layers = [relighting.layer.id];
    render.meshInstances.forEach((meshInstance) => {
        meshInstance.material = meshMaterial;
    });
});
app.root.addChild(meshEntity);
```

続いて、同じレイヤーにライトを追加します。イメージベースドライティング、シャドウを落とすディレクショナルライトやオムニライトなど、標準のライトはどれでも使用できます。

```javascript
const light = new Entity('sun');
light.addComponent('light', {
    type: 'directional',
    layers: [relighting.layer.id],
    castShadows: true
});
app.root.addChild(light);
```

## スクリプト属性

| 属性 | デフォルト | 用途 |
| --- | --- | --- |
| `blend` | 1 | メッシュのライティングがスプラットに与える影響の強さ（0 = 元のスプラット、1 = 完全に適用） |
| `brightness` | 2 | 色を調整する際のライティングの明るさ。2 にすると、プロキシマテリアルの 0.5 のグレーのアルベドが補正されます |
| `background` | 1 | メッシュに覆われていないスプラット（空など）に掛ける乗数。環境の露出に追従させることができます |
| `textureScale` | 1 | バックバッファに対するライティングテクスチャの解像度 |
| `layerName` | `'Relighting'` | プロキシメッシュとライトを配置するレイヤーの名前（存在しない場合は作成されます） |
| `priority` | -1 | 内部カメラの優先度。テクスチャが先にレンダリングされるよう、メインカメラより低い値にします |

ライティングテクスチャは `relighting.texture` として取得でき（対応している環境では HDR）、デバッグや追加の処理に利用できます。

## 注意事項

- プロキシメッシュの品質が結果に直接影響します。メッシュのシルエットがスプラットの表面からずれている場所では、ライティングの境界が誤った位置に現れます。品質を高めるには、スプラットにより近いメッシュを使うことが最も効果的です。
- 動かないライトでは、[`SHADOWUPDATE_THISFRAME`](https://api.playcanvas.com/engine/variables/SHADOWUPDATE_THISFRAME.html) を使用すると、シャドウマップを毎フレームではなく一度だけレンダリングできます。ライブサンプルではオムニライトにこの設定を使用しています。

## 関連項目

- [カスタムシェーダー](/user-manual/gaussian-splatting/building/custom-shaders) — この機能の基盤となるシェーダーチャンクの仕組み
- [フラグメントステージのカスタマイズ](/user-manual/gaussian-splatting/building/custom-shaders/fragment) — ライティングの適用に使用するピクセル単位のフック
