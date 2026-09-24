---
title: 組み込みシェーダーユニフォーム
description: カスタムフォワードシェーダーで使用できる、エンジンが提供するカメラ行列、画面とビューポートのサイズ、XR ビューインデックス。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

PlayCanvas は、フォワードパスでメッシュを描画するときに、以下の数値ユニフォームを提供します。これらの名前に対して `Material.setParameter()` を呼び出すことなく、`ShaderMaterial` のシェーダーやカスタムマテリアルチャンクで使用できます。

カメラの値は、現在描画しているカメラまたは XR ビューに対応します。この一覧はフォワードレンダリングを対象としています。シャドウ、ピッキング、コンピュート、独立したポストプロセスのパスでも同じ入力が設定されるとは限りません。

## 利用可能なユニフォーム

ユニフォームは頂点シェーダーとフラグメントシェーダーで読み取れます。使用する名前を以下の型で宣言してください。WGSL では `uniform.` プレフィックスを付けてアクセスします。

| ユニフォーム | GLSL 型 | WGSL 型 | 値 |
| --- | --- | --- | --- |
| `matrix_view` | `mat4` | `mat4x4f` | ワールド空間の位置をビュー空間に変換します。 |
| `matrix_viewInverse` | `mat4` | `mat4x4f` | `matrix_view` の逆行列。ビュー空間の位置をワールド空間に変換します。 |
| `matrix_view3` | `mat3` | `mat3x3f` | `matrix_view` の左上の 3×3 部分。平行移動を適用せずに方向を変換します。 |
| `matrix_projection` | `mat4` | `mat4x4f` | ビュー空間の位置をクリップ空間に変換します。ジッター、レンダーターゲットの Y 反転、グラフィックスバックエンドの深度規約など、レンダラーによる射影の調整を含みます。 |
| `matrix_viewProjection` | `mat4` | `mat4x4f` | `matrix_projection * matrix_view`。ワールド空間の位置をクリップ空間に変換します。 |
| `view_position` | `vec3` | `vec3f` | ワールド空間のカメラ位置。XR では現在描画している目の位置です。 |
| `screen_size` | `vec4` | `vec4f` | キャンバスの描画バッファの幅、高さ、幅の逆数、高さの逆数。CSS サイズではなくピクセル単位です。 |
| `viewport_size` | `vec4` | `vec4f` | カメラのビューポートの幅、高さ、幅の逆数、高さの逆数（ピクセル単位）。レンダーターゲット、`camera.rect`、XR の各目のビューポートを考慮します。ビューポートの原点は含みません。 |
| `view_index` | `uint` | `u32` | 現在描画している XR ビューの 0 始まりのインデックス。深度テクスチャ配列のレイヤーなど、ビューごとのデータを選択するために使用します。 |

これらの射影行列は実際の描画に使用されるものです。ジッターやバックエンドの調整前にアプリケーションで計算した射影行列とは異なる場合があります。シェーダーでワールド空間の位置を射影する場合は `matrix_viewProjection` を使用してください。

`matrix_model` と `matrix_normal` はメッシュごとの入力であり、上記のカメラやシーンの値とは別です。スキニング、モーフィング、インスタンシングにも対応する変換には、[頂点シェーダーチャンク](/user-manual/graphics/shaders/#vertex-shader)を使用してください。

## ユニフォームの宣言と読み取り

例えば、ワールド空間の方向をビュー空間に変換するには次のように記述します。

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
uniform mat3 matrix_view3;

vec3 directionToView(vec3 worldDirection) {
    return matrix_view3 * worldDirection;
}
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
uniform matrix_view3: mat3x3f;

fn directionToView(worldDirection: vec3f) -> vec3f {
    return uniform.matrix_view3 * worldDirection;
}
```

</TabItem>
</Tabs>

宣言の詳しい規則については、[GLSL の詳細](/user-manual/graphics/shaders/glsl-specifics#uniforms)と [WGSL リフレクション](/user-manual/graphics/shaders/wgsl-reflection#uniforms)を参照してください。

## 画面サイズとビューポートサイズ

両方のサイズユニフォームは `[width, height, 1 / width, 1 / height]` という形式ですが、対象となる領域が異なります。

- `screen_size` は常にキャンバスの描画バッファを表します。小さなオフスクリーンターゲットに描画しても変わりません。
- `viewport_size` は、現在のターゲット内のカメラのビューポートを表します。オフスクリーンターゲット、部分的なカメラ矩形、XR の各目のビューポートに応じて変化します。

1920×1080 のキャンバスで、カメラが 960×540 のターゲット全体に描画する場合、`screen_size.xy` は `(1920, 1080)`、`viewport_size.xy` は `(960, 540)` です。カメラがターゲットの幅の半分を占める場合、`viewport_size.xy` は `(480, 540)` になります。

`screen_size` を任意のテクスチャサイズを取得するために使用しないでください。部分的なビューポートのフレームバッファ座標を正規化するには、ビューポートの原点も考慮する必要があります。どちらのサイズユニフォームも原点は提供しません。
