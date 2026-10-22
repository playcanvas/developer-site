---
title: 頂点ステージ
description: "gsplatModifyVS シェーダーチャンクで Gaussian Splat の位置、回転、スケール、色をカスタマイズする方法。オーバーライド可能な関数、GLSL/WGSL、ライブサンプル。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`gsplatModifyVS` チャンクは、頂点ステージでスプラットをカスタマイズします。**スプラットごとに一度**実行されるため、スプラット全体の移動、回転、拡大縮小、非表示、色付けに適しています。

**ライブサンプルを見る** - アニメーションするスプラットで、シェーダーチャンクのカスタマイズを確認できます。

<EngineExample id="gaussian-splatting/multi-splat" title="ライブサンプルを見る" />

## オーバーライド可能な関数

`gsplatModifyVS` チャンクでは、次の3つの関数をオーバーライドできます。

| 関数 | 用途 |
| --- | --- |
| `modifySplatCenter` | スプラットの中心位置（モデル空間）を変換します |
| `modifySplatRotationScale` | スプラットの回転クォータニオンとスケールを調整します |
| `modifySplatColor` | スプラットの色と不透明度を変換します |

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

上のライブサンプルでは、すべてのスプラットを正弦波で変位させ、金色に明滅させます。これは3つのステップで構成されています。

**1. シェーダーチャンクを作成し**、必要な関数をオーバーライドします。このサンプルでは `uTime` ユニフォームを使ってアニメーションします。

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
uniform float uTime;

void modifySplatCenter(inout vec3 center) {
    float heightIntensity = center.y * 0.2;
    center.x += sin(uTime * 5.0 + center.y) * 0.3 * heightIntensity;
}

void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 scale) {
    // no modification
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
    // no modification
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

**2. チャンクをシーンの gsplat マテリアルに適用し**、再コンパイルされるようにマテリアルを更新します。GLSL と WGSL の両方のチャンクを設定することで、WebGL と WebGPU の両方のデバイスに対応できます。

```javascript
const sceneMat = app.scene.gsplat.material;

sceneMat.getShaderChunks('glsl').set('gsplatModifyVS', glslVertShader);
sceneMat.getShaderChunks('wgsl').set('gsplatModifyVS', wgslVertShader);
sceneMat.update();
```

**3. ユニフォームを毎フレーム更新します:**

```javascript
let currentTime = 0;
app.on('update', (dt) => {
    currentTime += dt;
    sceneMat.setParameter('uTime', currentTime);
    sceneMat.update();
});
```

チャンクが使用するすべてのユニフォームとテクスチャは、マテリアルに設定してください。グラフィックスデバイスのスコープにグローバルに設定した値は、これらのチャンクではサポートされていません。

## 関連項目

- [フラグメントステージのカスタマイズ](/user-manual/gaussian-splatting/building/custom-shaders/fragment) — ピクセル単位の色の変更
- [Varying ストリーム](/user-manual/gaussian-splatting/building/custom-shaders/varyings) — ここで計算したスプラットごとの値をフラグメントステージに渡す
