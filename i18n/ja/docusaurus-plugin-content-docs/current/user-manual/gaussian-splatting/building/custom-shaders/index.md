---
title: カスタムシェーダー
description: "シーンの gsplat マテリアルのシェーダーチャンクで Gaussian Splat のレンダリングをカスタマイズする方法。頂点ステージとフラグメントステージのフック、その選び方、適用方法。"
---

PlayCanvas Engine では、シェーダーチャンクをオーバーライドすることで、Gaussian Splat のレンダリング方法をカスタマイズできます。チャンクはシーン全体の gsplat マテリアル（[`app.scene.gsplat.material`](https://api.playcanvas.com/engine/classes/GSplatParams.html#material)）に設定するため、1つのカスタムシェーダーがシーン内の**すべての**スプラットに適用されます。

カスタマイズできる箇所は、シェーダーステージごとに1つずつ、合わせて2つあります。

| チャンク | ステージ | 実行回数 | 用途 |
| --- | --- | --- | --- |
| [`gsplatModifyVS`](/user-manual/gaussian-splatting/building/custom-shaders/vertex) | 頂点 | スプラットごとに一度 | スプラットの位置、回転、スケール、色、不透明度を変更します |
| [`gsplatModifyPS`](/user-manual/gaussian-splatting/building/custom-shaders/fragment) | フラグメント | 覆われたピクセルごとに一度 | 各スプラットフラグメントの最終的な色とアルファを変更します |

## ステージの選び方

スプラット全体で一様な処理には、**[頂点ステージ](/user-manual/gaussian-splatting/building/custom-shaders/vertex)を使用します**。スプラットの移動、拡大縮小、回転、非表示、位置に基づく色付けなどが該当します。スプラットごとに一度だけ実行されるため低コストで、スプラットのジオメトリを変更できるのはこのステージだけです。

テクスチャのサンプリングのように、スプラットの範囲内で効果を変化させる必要がある場合は、**[フラグメントステージ](/user-manual/gaussian-splatting/building/custom-shaders/fragment)を使用します**。覆われたフラグメントごとに一度実行されるため、スプラットが大きく重なり合う場所ではコストが高くなります。

2つのステージは自由に組み合わせることができ、どちらか一方だけでも、両方でも実装できます。また、[Varying ストリーム](/user-manual/gaussian-splatting/building/custom-shaders/varyings)を使うと、スプラットごとの値を頂点ステージからフラグメントステージに渡せます。たとえば、スプラットを一度だけ分類しておき、必要な場所でのみピクセル単位のコストを払うことができます。

## チャンクの適用

どちらのチャンクも同じ手順で適用します。シェーダー言語ごとにチャンクのソースを設定し（GLSL は WebGL、WGSL は WebGPU に対応します）、マテリアルを更新して再コンパイルします。

```javascript
const sceneMat = app.scene.gsplat.material;

sceneMat.getShaderChunks('glsl').set('gsplatModifyVS', glslChunk);
sceneMat.getShaderChunks('wgsl').set('gsplatModifyVS', wgslChunk);
sceneMat.update();
```

チャンクで宣言した独自のユニフォームは、マテリアルパラメーターを通じて毎フレーム設定します。

```javascript
app.on('update', (dt) => {
    sceneMat.setParameter('uTime', currentTime);
    sceneMat.update();
});
```

## チャンクの削除

デフォルトのレンダリングに戻すには、チャンクのオーバーライドを削除してマテリアルを更新します。

```javascript
const sceneMat = app.scene.gsplat.material;
sceneMat.getShaderChunks('glsl').delete('gsplatModifyVS');
sceneMat.getShaderChunks('wgsl').delete('gsplatModifyVS');
sceneMat.update();
```

## 関連項目

- [頂点ステージのカスタマイズ](/user-manual/gaussian-splatting/building/custom-shaders/vertex) — スプラットの移動、拡大縮小、色付け
- [フラグメントステージのカスタマイズ](/user-manual/gaussian-splatting/building/custom-shaders/fragment) — ピクセル単位の色の変更
- [Varying ストリーム](/user-manual/gaussian-splatting/building/custom-shaders/varyings) — スプラットごとのデータを頂点ステージからフラグメントステージに渡す
- [リライティング](/user-manual/gaussian-splatting/building/relighting) — フラグメントフックを基に、プロキシメッシュを使ってスプラットを照らす
- [ワークバッファレンダリング](/user-manual/gaussian-splatting/rendering-architecture/work-buffer-rendering) — ソート済みスプラットを描画するグローバルなレンダーパスをカスタマイズ
