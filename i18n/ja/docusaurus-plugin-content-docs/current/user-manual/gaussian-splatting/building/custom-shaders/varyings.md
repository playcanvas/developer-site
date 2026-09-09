---
title: Varying ストリーム
description: "カスタム Varying ストリームで gsplat の頂点ステージからフラグメントステージにスプラットごとのデータを渡す方法。API、自動生成される set/get 関数、クリッピングのライブサンプル。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Varying ストリームは、スプラットごとのカスタムデータを[頂点ステージ](/user-manual/gaussian-splatting/building/custom-shaders/vertex)から[フラグメントステージ](/user-manual/gaussian-splatting/building/custom-shaders/fragment)へ渡します。`gsplatModifyVS` チャンクで**スプラットごとに一度**値を計算し、`gsplatModifyPS` チャンクでそのスプラットの各フラグメントが読み取ります。

主な用途は分類です。スプラットについて一度判定し、必要な場合にだけフラグメントステージでピクセル単位の処理を行います。

**ライブサンプルを見る** - アニメーションするボックスでスプラットをクリップし、ボックスの表面と交差するスプラットだけにピクセル単位のクリッピングを適用します。

<EngineExample id="gaussian-splatting/clipping" title="ライブサンプルを見る" />

## ストリームの追加

ストリームは [`app.scene.gsplat.varyings`](https://api.playcanvas.com/engine/classes/GSplatParams.html#varyings) で管理します。

```javascript
app.scene.gsplat.varyings.add([
    { name: 'clipState', type: pc.TYPE_UINT32, components: 1 }
]);

// later, to remove
app.scene.gsplat.varyings.remove(['clipState']);
```

対応する型は `TYPE_FLOAT32`、`TYPE_INT32`、`TYPE_UINT32` で、成分数は 1〜4 です。

各ストリームに対して 2 つの関数が生成され、シェーダーチャンクで使用できるようになります。

| 関数 | 使用可能なチャンク | 用途 |
| --- | --- | --- |
| `set<Name>(value)` | `gsplatModifyVS` | スプラットごとの値を書き込む（スプラットごとに一度実行） |
| `get<Name>()` | `gsplatModifyPS` | 現在のフラグメントに対応するスプラットの値を読み取る |

ストリームを追加または削除すると gsplat シェーダーが再構築されるため、実行中に切り替えるのではなく、起動時に設定してください。

## 使用例

上のライブサンプルでは、ワールド空間でアニメーションするボックスによってスプラットをクリップします。頂点ステージで各スプラットとボックスの位置関係を一度判定します。完全に内側にあるスプラットは全体をクリップし、完全に外側にあるスプラットはフラグメント処理を省略するフラグを設定します。ボックスの表面と交差するスプラットだけでピクセル単位の判定を行います。

**1. 頂点ステージのチャンクでスプラットごとの値を書き込みます。**

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
uniform vec3 uClipCenter;
uniform vec3 uClipHalf;

void modifySplatCenter(inout vec3 center) {
}

void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 scale) {
    // signed distance of the splat center from the clipping box surface (negative inside)
    vec3 d = abs(modifiedCenter - uClipCenter) - uClipHalf;
    float sdf = length(max(d, vec3(0.0))) + min(max(d.x, max(d.y, d.z)), 0.0);

    // conservative splat radius
    float radius = 2.0 * gsplatGetSizeFromScale(scale);

    if (sdf < -radius) {
        // fully inside the box - clip the whole splat
        scale = vec3(0.0);
        setClipState(1u);
    } else if (sdf > radius) {
        // fully outside the box - no per-pixel clipping needed
        setClipState(1u);
    } else {
        // intersects the box surface - clip per pixel in the fragment shader
        setClipState(0u);
    }
}

void modifySplatColor(vec3 center, inout vec4 color) {
}
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
uniform uClipCenter: vec3f;
uniform uClipHalf: vec3f;

fn modifySplatCenter(center: ptr<function, vec3f>) {
}

fn modifySplatRotationScale(originalCenter: vec3f, modifiedCenter: vec3f, rotation: ptr<function, vec4f>, scale: ptr<function, vec3f>) {
    // signed distance of the splat center from the clipping box surface (negative inside)
    let d = abs(modifiedCenter - uniform.uClipCenter) - uniform.uClipHalf;
    let sdf = length(max(d, vec3f(0.0))) + min(max(d.x, max(d.y, d.z)), 0.0);

    // conservative splat radius
    let radius = 2.0 * gsplatGetSizeFromScale(*scale);

    if (sdf < -radius) {
        // fully inside the box - clip the whole splat
        *scale = vec3f(0.0);
        setClipState(1u);
    } else if (sdf > radius) {
        // fully outside the box - no per-pixel clipping needed
        setClipState(1u);
    } else {
        // intersects the box surface - clip per pixel in the fragment shader
        setClipState(0u);
    }
}

fn modifySplatColor(center: vec3f, color: ptr<function, vec4f>) {
}
```

</TabItem>
</Tabs>

**2. フラグメントステージのチャンクで値を読み取り**、負荷の高いピクセル単位の処理の前に早期リターンします。

この例は、キャンバスの描画バッファ全体に描画することを前提としています。組み込みの [`screen_size`](/user-manual/graphics/shaders/built-in-uniforms) がそのサイズを提供します。別のレンダーターゲットや部分的なビューポートを使用する場合は、座標の正規化を調整してください。

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
uniform vec3 uClipCenter;
uniform vec3 uClipHalf;
uniform mat4 uInvViewProj;
uniform vec4 screen_size;

void modifySplatColor(vec2 gaussianUV, inout vec4 color) {
    // splats fully inside or outside the box were already resolved per splat in the vertex stage
    if (getClipState() == 1u) return;

    // reconstruct the world position of this fragment (on the splat's depth plane)
    vec3 ndc = vec3(gl_FragCoord.xy * screen_size.zw, gl_FragCoord.z) * 2.0 - 1.0;
    vec4 world = uInvViewProj * vec4(ndc, 1.0);
    vec3 worldPos = world.xyz / world.w;

    // clip fragments inside the box
    vec3 d = abs(worldPos - uClipCenter) - uClipHalf;
    if (max(d.x, max(d.y, d.z)) < 0.0) {
        color.a = 0.0;
    }
}
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
uniform uClipCenter: vec3f;
uniform uClipHalf: vec3f;
uniform uInvViewProj: mat4x4f;
uniform screen_size: vec4f;

fn modifySplatColor(gaussianUV: vec2f, color: ptr<function, vec4f>) {
    // splats fully inside or outside the box were already resolved per splat in the vertex stage
    if (getClipState() == 1u) {
        return;
    }

    // reconstruct the world position of this fragment (on the splat's depth plane)
    let uv = pcPosition.xy * uniform.screen_size.zw;
    let ndc = vec3f(uv.x * 2.0 - 1.0, (1.0 - uv.y) * 2.0 - 1.0, pcPosition.z * 2.0 - 1.0);
    let world = uniform.uInvViewProj * vec4f(ndc, 1.0);
    let worldPos = world.xyz / world.w;

    // clip fragments inside the box
    let d = abs(worldPos - uniform.uClipCenter) - uniform.uClipHalf;
    if (max(d.x, max(d.y, d.z)) < 0.0) {
        *color = vec4f((*color).rgb, 0.0);
    }
}
```

</TabItem>
</Tabs>

両方のチャンクを、通常どおり `gsplatModifyVS` と `gsplatModifyPS` キーを使ってシーンの gsplat マテリアルに適用します。

## メモリに関する考慮事項

一部のプラットフォームでは、各成分がスプラットごとにビデオメモリに保存されるため、描画するスプラット数に比例してメモリ使用量が増加します。成分数を減らし、複数の小さな値を個別のストリームではなく 1 つの uint 成分にビットパックするなど、データをできるだけコンパクトにしてください。

## 関連項目

- [頂点ステージのカスタマイズ](/user-manual/gaussian-splatting/building/custom-shaders/vertex) — 値を書き込む場所
- [フラグメントステージのカスタマイズ](/user-manual/gaussian-splatting/building/custom-shaders/fragment) — 値を読み取る場所
