---
title: GLB 形式
description: 3D Gaussian splat向けのGLB形式。KHR_gaussian_splatting glTF拡張機能、属性レイアウト、コンテナアセットによるエンジンでの読み込み、SplatTransformでの変換を説明します。
sidebar_label: GLB
---

**GLB** (バイナリ [glTF](https://www.khronos.org/gltf/)) は、Khronosの[KHR_gaussian_splatting](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_gaussian_splatting)拡張機能を使用して3D Gaussian Splatデータを格納できます。これによりスプラットはglTFエコシステムの一級市民となり、標準的なglTFパイプラインを通過でき、通常のメッシュ、マテリアル、アニメーションと同じファイルに共存できます。

これらのファイルは**[SplatTransform](/user-manual/splat-transform/)**で作成でき、PlayCanvasエンジンで直接読み込むことができます。

## スプラットの格納方法

この拡張機能は、各スプラットシーンを`POINTS`トポロジーを持つglTFメッシュプリミティブとして格納します。スプラットのプロパティは頂点属性として提供されます。

| 属性 | 型 | 内容 |
| --------- | ---- | -------- |
| `POSITION` | VEC3 | スプラットの中心位置 |
| `KHR_gaussian_splatting:ROTATION` | VEC4 | 回転クォータニオン (xyzw) |
| `KHR_gaussian_splatting:SCALE` | VEC3 | **リニア**空間での軸ごとのサイズ |
| `KHR_gaussian_splatting:OPACITY` | SCALAR | シグモイド適用済みの不透明度 |
| `KHR_gaussian_splatting:SH_DEGREE_{d}_COEF_{n}` | VEC3 | 球面調和関数の係数 (係数ごとにRGB) |
| `COLOR_0` | VEC4 | スプラット非対応ビューア用のオプションのフォールバックカラー |

[PLY形式](./ply.md)との違いとして、以下の点を知っておくと良いでしょう。

- **アクティベーション済みの値**: スケールはリニア空間で格納され (PLYはログ空間)、不透明度はシグモイド適用後の値です (PLYはシグモイド適用前の値)。
- **座標系**: スプラットデータは標準のglTF座標系 (+Yが上) を使用するため、PLYファイルとは異なり、読み込んだスプラットをシーンに配置する際に反転回転は不要です。
- **フォールバックレンダリング**: この拡張機能を解釈できないビューアでも、`COLOR_0`のポイントクラウドをレンダリングできます。

## GLBファイルの作成

[SplatTransform](/user-manual/splat-transform/)を使用して、サポートされている任意のスプラット形式から変換します。

```bash
splat-transform scene.ply scene.glb
```

## PlayCanvasでの読み込み

スプラットのGLBファイルは、(他のglTFコンテンツと同様に) `gsplat`アセットではなく**コンテナ**アセットとして読み込みます。

```javascript
const asset = new pc.Asset('scene', 'container', { url: 'scene.glb' });
app.assets.add(asset);
app.assets.load(asset);

asset.ready(() => {
    // gsplatコンポーネントを持つエンティティ階層を作成します
    const entity = asset.resource.instantiateRenderEntity();
    app.root.addChild(entity);
});
```

コンテナは、レンダーやマテリアルと同様の方法で、読み込まれたスプラットを`asset.resource.gsplats`経由で従属`gsplat`アセットとして公開します。アプリケーションで`GSplatComponentSystem`を登録することを忘れないでください。

## エンジンサポートに関する注意

- `ellipse`カーネル (標準の3D Gaussian Splatting) のみがサポートされています。その他のカーネルは`ellipse`としてレンダリングされ、デバッグビルドでは警告が出力されます。
- `sortingMethod`と`projection`プロパティは無視されます。ソートはエンジンのグローバルな[gsplat設定](https://api.playcanvas.com/engine/classes/GSplatParams.html)によって制御されます。
- `KHR_gaussian_splatting_compression_spz_2`圧縮拡張機能 (まだドラフト段階) はサポートされていません。

## GLBを使用するタイミング

GLBはスプラットデータを非圧縮で格納するため、ファイルサイズはPLYと同程度です。標準ベースのglTFパイプラインでスプラットを扱う必要がある場合や、メッシュコンテンツと1つのアセットにまとめる場合に使用してください。

:::tip

Web配信には引き続き[SOG](./sog.md)が推奨される形式です。15～20倍の圧縮とより高速な読み込みを実現します。

:::
