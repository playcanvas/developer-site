---
title: フラグメントステージ
description: "gsplatModifyPS シェーダーチャンクで Gaussian Splat の最終フラグメント色をカスタマイズする方法。ピクセル単位の色変更、GLSL/WGSL、利用可能なシェーダー入力。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`gsplatModifyPS` チャンクは、フラグメントステージでスプラットの最終的な色をカスタマイズします。**覆われたピクセルごとに一度**実行されるため、スプラット内で効果を滑らかに変化させることができます。これはスプラット単位の頂点ステージではできません。

**ライブサンプルを見る** - 各スプラットをそれぞれの色のリングとして描画し、ハイライトの波を加えます。

<EngineExample id="gaussian-splatting/shader-rings" title="ライブサンプルを見る" />

## オーバーライド可能な関数

このチャンクは次の関数をオーバーライドします。

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
void modifySplatColor(vec2 gaussianUV, inout vec4 color);
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
fn modifySplatColor(gaussianUV: vec2f, color: ptr<function, vec4f>);
```

</TabItem>
</Tabs>

フォワードパスでガウス減衰と不透明度のディザを評価した後、色にアルファを乗算して出力する直前に呼び出されます。

- `gaussianUV` — ガウス分布の範囲内でのフラグメントの位置。スプラットの中心で `(0,0)`、クリップされる境界で長さ 1 です。`dot(gaussianUV, gaussianUV)` は減衰に使用する正規化された半径の二乗を返します。
- `color` — `rgb` はスプラットの色、`a` は最終的なフラグメントのアルファです。どちらも変更できます。アルファの変更はブレンドの重みに影響し、独自の減衰やピクセルごとのフェードを実現できます。

## 利用可能な入力

チャンク内では次の入力も使用できます。

- `gl_FragCoord` (GLSL) / `pcPosition` (WGSL) — ピクセル単位のフレームバッファ内のフラグメント位置
- `screen_size` — エンジンが提供する `vec4` / `vec4f` ユニフォーム。`xy` はキャンバスの描画バッファのピクセルサイズ、`zw` はその逆数です。`viewport_size` との違いは[組み込みシェーダーユニフォーム](/user-manual/graphics/shaders/built-in-uniforms)を参照してください。
- チャンクで宣言し、マテリアルパラメーターで設定する独自のユニフォームとテクスチャ

## 使用例

以下は上のライブサンプルで使用するチャンクです。各スプラットをそれぞれの色のリングとして描画します。`gaussianUV` がスプラット内の位置を提供し、`fwidth` が指定したリング幅をピクセルからスプラット内の単位に変換するため、ズームしても画面上のリング幅を一定に保てます。

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
uniform float uRingWidth;
uniform float uRingAlpha;

void modifySplatColor(vec2 gaussianUV, inout vec4 color) {
    // distance from the splat center: 0 at center, 1 at the clipping edge
    float radius = length(gaussianUV);

    // ring of constant screen-space width at the splat edge - fwidth gives the
    // change of radius per screen pixel, converting pixels to radius units
    float radiusPerPixel = fwidth(radius);
    float innerEdge = 1.0 - uRingWidth * radiusPerPixel;
    float ring = smoothstep(innerEdge - radiusPerPixel, innerEdge, radius);
    color.a = ring * uRingAlpha;
}
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
uniform uRingWidth: f32;
uniform uRingAlpha: f32;

fn modifySplatColor(gaussianUV: vec2f, color: ptr<function, vec4f>) {
    // distance from the splat center: 0 at center, 1 at the clipping edge
    let radius = length(gaussianUV);

    // ring of constant screen-space width at the splat edge - fwidth gives the
    // change of radius per screen pixel, converting pixels to radius units
    let radiusPerPixel = fwidth(radius);
    let innerEdge = 1.0 - uniform.uRingWidth * radiusPerPixel;
    let ring = smoothstep(innerEdge - radiusPerPixel, innerEdge, radius);
    *color = vec4f((*color).rgb, ring * uniform.uRingAlpha);
}
```

</TabItem>
</Tabs>

頂点チャンクと同じ方法で `gsplatModifyPS` キーを使って適用し、マテリアルパラメーターでユニフォームを設定します。

```javascript
const sceneMat = app.scene.gsplat.material;

sceneMat.getShaderChunks('glsl').set('gsplatModifyPS', glslFragShader);
sceneMat.getShaderChunks('wgsl').set('gsplatModifyPS', wgslFragShader);
sceneMat.setParameter('uRingWidth', 1);
sceneMat.setParameter('uRingAlpha', 0.25);
sceneMat.update();
```

各フラグメントの画面位置でスクリーンに対応したテクスチャをサンプリングする効果については、[リライティング](/user-manual/gaussian-splatting/building/relighting)を参照してください。オフスクリーンテクスチャに描画したプロキシメッシュのライティングでスプラットの色を調整します。

## 関連項目

- [頂点ステージのカスタマイズ](/user-manual/gaussian-splatting/building/custom-shaders/vertex) — スプラットの移動、拡大縮小、色付け
- [Varying ストリーム](/user-manual/gaussian-splatting/building/custom-shaders/varyings) — 頂点ステージで書き込んだスプラットごとの値を読み取る
- [リライティング](/user-manual/gaussian-splatting/building/relighting) — このフックとプロキシメッシュを使ってスプラットを照らす
