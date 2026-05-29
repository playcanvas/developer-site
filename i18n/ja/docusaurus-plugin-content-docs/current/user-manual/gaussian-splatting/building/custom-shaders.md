---
title: カスタムシェーダー
description: "Gaussianスプラットのレンダリングをシーンのgsplatマテリアル上のgsplatModifyVSシェーダーチャンクでカスタマイズ：オーバーライド可能な関数、GLSL/WGSL、ライブサンプルです。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

PlayCanvas Engineでは、`gsplatModifyVS`シェーダーチャンクをオーバーライドすることで、Gaussian Splatsのレンダリング方法をカスタマイズできます。このチャンクはシーン全体のgsplatマテリアル（[`app.scene.gsplat.material`](https://api.playcanvas.com/engine/classes/GSplatParams.html#material)）に設定されるため、1つのカスタムシェーダーがシーン内の**すべての**スプラットに適用されます。

**ライブサンプルを見る** - アニメーションスプラットでシェーダーチャンクのカスタマイズを実際に見てください。

<EngineExample id="gaussian-splatting/multi-splat" title="ライブサンプルを見る" />

## オーバーライド可能な関数

`gsplatModifyVS`チャンクでは、スプラットの頂点ステージで3つの関数をオーバーライドできます：

| 関数 | 目的 |
| --- | --- |
| `modifySplatCenter` | スプラットの中心位置を変換（モデル空間） |
| `modifySplatRotationScale` | スプラットの回転クォータニオンとスケールを調整 |
| `modifySplatColor` | スプラットの色と不透明度を変換 |

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
void modifySplatCenter(inout vec3 center);
void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 scale);
void modifySplatColor(vec3 center, inout vec4 color);
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
fn modifySplatCenter(center: ptr<function, vec3f>);
fn modifySplatRotationScale(originalCenter: vec3f, modifiedCenter: vec3f, rotation: ptr<function, vec4f>, scale: ptr<function, vec3f>);
fn modifySplatColor(center: vec3f, color: ptr<function, vec4f>);
```

</TabItem>
</Tabs>

変更したい関数だけを実装すれば十分です。

## サンプルの仕組み

上記のライブサンプルは、サイン波による変位と金色のカラーパルスですべてのスプラットをアニメーションさせています。これは3つのステップで構成されます。

**1. シェーダーチャンクを記述**し、必要な関数をオーバーライドします。サンプルでは`uTime`ユニフォームを使ってアニメーションさせています：

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
uniform float uTime;

void modifySplatCenter(inout vec3 center) {
    float heightIntensity = center.y * 0.2;
    center.x += sin(uTime * 5.0 + center.y) * 0.3 * heightIntensity;
}

void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 scale) {
    // 変更なし
}

void modifySplatColor(vec3 center, inout vec4 clr) {
    float sineValue = abs(sin(uTime * 5.0 + center.y));
    vec3 gold = vec3(1.0, 0.85, 0.0);
    float blend = smoothstep(0.9, 1.0, sineValue);
    clr.xyz = mix(clr.xyz, gold, blend);
}
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
uniform uTime: f32;

fn modifySplatCenter(center: ptr<function, vec3f>) {
    let heightIntensity = (*center).y * 0.2;
    (*center).x += sin(uniform.uTime * 5.0 + (*center).y) * 0.3 * heightIntensity;
}

fn modifySplatRotationScale(originalCenter: vec3f, modifiedCenter: vec3f, rotation: ptr<function, vec4f>, scale: ptr<function, vec3f>) {
    // 変更なし
}

fn modifySplatColor(center: vec3f, clr: ptr<function, vec4f>) {
    let sineValue = abs(sin(uniform.uTime * 5.0 + center.y));
    let gold = vec3f(1.0, 0.85, 0.0);
    let blend = smoothstep(0.9, 1.0, sineValue);
    (*clr) = vec4f(mix((*clr).xyz, gold, blend), (*clr).a);
}
```

</TabItem>
</Tabs>

**2. チャンクをシーンのgsplatマテリアルに適用**し、マテリアルを更新して再コンパイルします。GLSLとWGSLの両方のチャンクを設定すると、WebGLとWebGPUの両方のデバイスに対応できます：

```javascript
const sceneMat = app.scene.gsplat.material;

sceneMat.getShaderChunks('glsl').set('gsplatModifyVS', glslVertShader);
sceneMat.getShaderChunks('wgsl').set('gsplatModifyVS', wgslVertShader);
sceneMat.update();
```

**3. ユニフォームを毎フレーム更新します：**

```javascript
let currentTime = 0;
app.on('update', (dt) => {
    currentTime += dt;
    sceneMat.setParameter('uTime', currentTime);
    sceneMat.update();
});
```

## カスタムシェーダーの削除

デフォルトのレンダリングに戻すには、チャンクのオーバーライドを削除してマテリアルを更新します：

```javascript
const sceneMat = app.scene.gsplat.material;
sceneMat.getShaderChunks('glsl').delete('gsplatModifyVS');
sceneMat.getShaderChunks('wgsl').delete('gsplatModifyVS');
sceneMat.update();
```

## 関連項目

- [ワークバッファレンダリング](/user-manual/gaussian-splatting/rendering-architecture/work-buffer-rendering) — ソート済みスプラットを描画するグローバルなレンダーパスをカスタマイズ
