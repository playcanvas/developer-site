---
title: カスタムシェーダー
---

PlayCanvas Engineは、Gaussian Splats用のカスタムシェーダーをサポートしており、高度な視覚効果を作成し、標準実装を超えたレンダリング動作をカスタマイズできます。

:::note 非統合レンダリング専用

このページは**非統合レンダリング**（`entity.gsplat.unified = false`の場合）のシェーダーカスタマイズについて説明します。各コンポーネントには独立してカスタマイズできる独自のマテリアルがあります。

**統合レンダリング**については、グローバルレンダリングモディファイアを通じて同様のカスタマイズ機能を提供する[ワークバッファレンダリング](/user-manual/gaussian-splatting/building/unified-rendering/work-buffer-rendering)を参照してください。

:::

## はじめに

`gsplatModifyVS`シェーダーチャンクをオーバーライドして、スプラットの位置、サイズ、色をカスタマイズします。これにより、コアシェーダー機能はそのままに、関連する部分のみをオーバーライドできます。

**[ライブサンプルを見る](https://playcanvas.vercel.app/#/gaussian-splatting/multi-splat)** - アニメーションスプラットでシェーダーチャンクのカスタマイズを実際に見てください。

## APIリファレンス

`gsplatModifyVS`シェーダーチャンクでは、スプラットのレンダリング方法をカスタマイズする3つの関数をオーバーライドできます：

### modifySplatCenter

モデル空間でスプラット中心の位置を変換します。

**GLSL:**

```glsl
void modifySplatCenter(inout vec3 center)
```

**WGSL:**

```wgsl
fn modifySplatCenter(center: ptr<function, vec3f>)
```

**パラメータ：**

- `center` - モデル空間でのスプラット中心位置

**例：**

```glsl
// すべてのスプラットを1ユニット上にオフセット
void modifySplatCenter(inout vec3 center) {
    center.y += 1.0;
}
```

### modifySplatRotationScale

回転クォータニオンとスケールベクトルを調整してスプラットのサイズと形状を変更します。

**GLSL:**

```glsl
void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 scale)
```

**WGSL:**

```wgsl
fn modifySplatRotationScale(originalCenter: vec3f, modifiedCenter: vec3f, rotation: ptr<function, vec4f>, scale: ptr<function, vec3f>)
```

**パラメータ：**

- `originalCenter` - 変更前の元のスプラット中心位置
- `modifiedCenter` - `modifySplatCenter()`適用後のスプラット中心位置
- `rotation` - スプラットの回転を表すクォータニオン（x, y, z, w）
- `scale` - 各軸でのスプラットのサイズを表すスケールベクトル

**例：**

```glsl
// すべてのスプラットを2倍にスケール
void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 scale) {
    scale *= 2.0;
}
```

### modifySplatColor

スプラットの色と不透明度を変換します。

**GLSL:**

```glsl
void modifySplatColor(vec3 center, inout vec4 color)
```

**WGSL:**

```wgsl
fn modifySplatColor(center: vec3f, color: ptr<function, vec4f>)
```

**パラメータ：**

- `center` - スプラット中心位置（`modifySplatCenter()`適用後）
- `color` - スプラットの色（RGBA）

**例：**

```glsl
// すべてのスプラットを50%暗くする
void modifySplatColor(vec3 center, inout vec4 color) {
    color.rgb *= 0.5;
}
```

## 使用例

### 基本的なセットアップ

Gaussian Splatマテリアルにカスタムシェーダーチャンクを適用するには：

```javascript
// 現在のデバイスのシェーダー言語を取得
const shaderLanguage = device.isWebGPU ? 'wgsl' : 'glsl';

// カスタムシェーダーコードを定義
const customShader = `
    // ここにシェーダー関数を記述
`;

// gsplatマテリアルにカスタムシェーダーチャンクのオーバーライドを設定
gsplatMaterial.getShaderChunks(shaderLanguage).set('gsplatModifyVS', customShader);

// 新しいシェーダーで再コンパイルするためにマテリアルを更新
gsplatMaterial.update();
```

### GLSLの例：位置と色のアニメーション

```javascript
const customShader = `
uniform float uTime;

void modifySplatCenter(inout vec3 center) {
    // 高さに基づいて波のエフェクトを作成
    float heightIntensity = center.y * 0.2;
    center.x += sin(uTime * 5.0 + center.y) * 0.3 * heightIntensity;
}

void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 scale) {
    // サイズの変更なし
}

void modifySplatColor(vec3 center, inout vec4 color) {
    // 波のピークにゴールドのティントを追加
    float sineValue = abs(sin(uTime * 5.0 + center.y));
    vec3 gold = vec3(1.0, 0.85, 0.0);
    float blend = smoothstep(0.9, 1.0, sineValue);
    color.rgb = mix(color.rgb, gold, blend);
}
`;

// gsplatマテリアルにカスタムシェーダーチャンクのオーバーライドを設定
const shaderLanguage = app.graphicsDevice.isWebGPU ? 'wgsl' : 'glsl';
gsplatMaterial.getShaderChunks(shaderLanguage).set('gsplatModifyVS', customShader);
gsplatMaterial.update();

// 毎フレームユニフォームを更新
const uTime = app.graphicsDevice.scope.resolve('uTime');
let time = 0;
app.on('update', (dt) => {
    time += dt;
    uTime.setValue(time);
});
```

### WGSLの例：位置と色のアニメーション

```javascript
const customShader = `
uniform uTime: f32;

fn modifySplatCenter(center: ptr<function, vec3f>) {
    // 高さに基づいて波のエフェクトを作成
    let heightIntensity = (*center).y * 0.2;
    (*center).x += sin(uniform.uTime * 5.0 + (*center).y) * 0.3 * heightIntensity;
}

fn modifySplatRotationScale(originalCenter: vec3f, modifiedCenter: vec3f, rotation: ptr<function, vec4f>, scale: ptr<function, vec3f>) {
    // サイズの変更なし
}

fn modifySplatColor(center: vec3f, color: ptr<function, vec4f>) {
    // 波のピークにゴールドのティントを追加
    let sineValue = abs(sin(uniform.uTime * 5.0 + center.y));
    let gold = vec3f(1.0, 0.85, 0.0);
    let blend = smoothstep(0.9, 1.0, sineValue);
    (*color) = vec4f(mix((*color).rgb, gold, blend), (*color).a);
}
`;

// gsplatマテリアルにカスタムシェーダーチャンクのオーバーライドを設定
const shaderLanguage = app.graphicsDevice.isWebGPU ? 'wgsl' : 'glsl';
gsplatMaterial.getShaderChunks(shaderLanguage).set('gsplatModifyVS', customShader);
gsplatMaterial.update();
```

### カスタムシェーダーの削除

カスタムシェーダーを削除してデフォルトのレンダリングに戻すには：

```javascript
// gsplatマテリアルからカスタムシェーダーチャンクのオーバーライドを削除
const shaderLanguage = app.graphicsDevice.isWebGPU ? 'wgsl' : 'glsl';
gsplatMaterial.getShaderChunks(shaderLanguage).delete('gsplatModifyVS');
gsplatMaterial.update();
```

## ヘルパー関数

以下のヘルパー関数は、スプラットのサイズと形状を操作するために`modifySplatRotationScale()`で利用できます：

### gsplatGetSizeFromScale

スケールベクトルからスプラットの現在のサイズを抽出します。

**GLSL:**

```glsl
float gsplatGetSizeFromScale(vec3 scale)
```

**WGSL:**

```wgsl
fn gsplatGetSizeFromScale(scale: vec3f) -> f32
```

**例：**

```glsl
// スプラットサイズを特定の範囲にクランプ
float size = gsplatGetSizeFromScale(scale);
float newSize = clamp(size, 0.01, 0.5);
scale *= newSize / size;
```

### gsplatMakeSpherical

特定の半径でスプラットを球形にします。

**GLSL:**

```glsl
void gsplatMakeSpherical(inout vec3 scale, float radius)
```

**WGSL:**

```wgsl
fn gsplatMakeSpherical(scale: ptr<function, vec3f>, radius: f32)
```

**例：**

```glsl
// すべてのスプラットを均一なサイズの完全な球形にする
float size = gsplatGetSizeFromScale(scale);
gsplatMakeSpherical(scale, size * 0.5);

// またはスケールをゼロに設定してスプラットを非表示にする
scale = vec3(0.0);
```

### 直接スケール操作

新しいAPIはスケールベクトルへの直接アクセスを提供するため、スプラットサイズを簡単に変更できます：

```glsl
// すべてのスプラットのサイズを2倍にする
scale *= 2.0;

// 非均一にスケール
scale.x *= 2.0;  // 水平方向に伸ばす

// スプラットを非表示にする
scale = vec3(0.0);
```

## サンプル

カスタムシェーダーテクニックを示すいくつかの例：

### アニメーションエフェクト

[**シンプルな正弦波アニメーション**](https://playcanvas.github.io/#/gaussian-splatting/multi-splat) - 正弦波を使用してGaussianの色と位置をアニメーションするシンプルなシェーダーを適用します。この例では、スプラットプロパティをリアルタイムで変更して動的なプロシージャルモーションエフェクトを作成する方法を示しています。
