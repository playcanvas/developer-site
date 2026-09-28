---
title: シェーダーパラメーター
description: 独自のシェーダーユニフォームの値を、マテリアル、メッシュインスタンス、またはグラフィックスデバイスのグローバルに設定します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

カスタムシェーダーは、ティントカラーやアニメーションの時間など、独自のユニフォームを読み取ることがよくあります。その値は次の 3 か所で設定できます。

- **マテリアル**: そのマテリアルで描画するすべてのメッシュインスタンスに適用されます。
- **メッシュインスタンス**: そのメッシュインスタンスの描画にのみ適用されます。
- **グローバル**: グラフィックスデバイスのスコープに設定し、独自の値を設定していないすべての描画に適用されます。

各描画では、メッシュインスタンスに設定された値がそのマテリアルに設定された値より優先され、マテリアルの値はグローバルな値より優先されます。カメラ行列など、エンジン自身が提供するユニフォームについては、[組み込みシェーダーユニフォーム](/user-manual/graphics/shaders/built-in-uniforms)を参照してください。

値には、数値、ベクトルや行列を表す数値の配列、テクスチャを使用できます。配列の内容を変更する場合は、配列を再度設定してください。配列をその場で変更しても、反映されるとは限りません。

## ユニフォームの宣言

ユニフォームは通常どおりシェーダーで宣言します。たとえば、`tint` カラーを読み取るフラグメントシェーダーは次のようになります。

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
uniform vec3 tint;

void main(void) {
    gl_FragColor = vec4(tint, 1.0);
}
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
uniform tint: vec3f;

@fragment
fn fragmentMain(input: FragmentInput) -> FragmentOutput {
    var output: FragmentOutput;
    output.color = vec4f(uniform.tint, 1.0);
    return output;
}
```

</TabItem>
</Tabs>

## マテリアルパラメーター

`Material.setParameter()` は、そのマテリアルで描画するすべてのメッシュインスタンスに値を設定し、`Material.deleteParameter()` はその値を削除します。`ShaderMaterial` やカスタムシェーダーチャンクのユニフォームは、この方法で指定します。

```javascript
material.setParameter('tint', [1, 0.5, 0]);
```

`StandardMaterial` は、`diffuse`、`emissive`、`gloss` などの自身のプロパティのユニフォームを自分で提供します。代わりにこれらのプロパティを設定し、`update()` を呼び出してください。`material_diffuse` など、これらのプロパティのユニフォーム名で `setParameter()` を呼び出しても効果はなく、デバッグビルドでは警告が表示されます。

マテリアルパラメーターは、そのマテリアルの描画の後にリセットされません。同じ名前のパラメーターを持たないマテリアルを使う後続の描画は、最後にその値を設定したマテリアルの値を読み取ります。

## メッシュインスタンスパラメーター

`MeshInstance.setParameter()` は 1 つのメッシュインスタンスの描画に対して値をオーバーライドし、`MeshInstance.deleteParameter()` はそのオーバーライドを削除します。同じマテリアルを使う他のメッシュインスタンスには影響しません。

```javascript
const meshInstance = entity.render.meshInstances[0];
meshInstance.setParameter('tint', [0, 1, 0]);
```

メッシュインスタンスは、`StandardMaterial` のプロパティの値やテクスチャも、それぞれのユニフォーム名を使ってオーバーライドできます。設定する値はシェーダーが受け取る値そのものなので、カラーはリニア空間で指定します。一方、`diffuse` プロパティ自体は sRGB のカラーを受け取ります。

```javascript
meshInstance.setParameter('material_diffuse', new Float32Array([0.8, 0.1, 0.1]));
```

:::warning

`StandardMaterial` の値やテクスチャをメッシュインスタンスごとにオーバーライドするのは、低コストな方法ではありません。そのメッシュインスタンスはマテリアルのユニフォームデータの独自のコピーを持ちます。このコピーは追加の GPU メモリを使用し、マテリアルまたはオーバーライドが変更されるたびに再アップロードされ、そのメッシュインスタンスの描画ごとにバインドされます。多くのメッシュインスタンスでこれらの値が異なる場合は、別々のマテリアルを使うか、インスタンスごとのデータを持つ[ハードウェアインスタンシング](/user-manual/graphics/advanced-rendering/hardware-instancing)を検討してください。

:::

`ShaderMaterial` のユニフォームなど、それ以外の値をオーバーライドしても、このようなコピーは作成されません。

## グローバルパラメーター

値は、グラフィックスデバイスのスコープにグローバルに設定することもできます。マテリアルもメッシュインスタンスも独自の値を設定していない描画はすべて、この値を使用します。

```javascript
app.graphicsDevice.scope.resolve('tint').setValue([1, 0, 0]);
```

グローバルな値をオーバーライドしたメッシュインスタンスは、その描画でのみ自身の値を使用し、後続の描画は再びグローバルな値を読み取ります。

マテリアルパラメーターはそのマテリアルの描画の後にリセットされないため、グローバルなデフォルトとして使う名前を、一部のマテリアルだけにパラメーターとして設定しないでください。他のマテリアルの描画は、グローバルな値ではなく、それらのマテリアルのうち最後に値を設定したものの値を読み取ってしまいます。

## レンダラーが設定する値

レンダラーは、一部のユニフォームをレンダーパスごとに 1 回、自身で設定します。[組み込みシェーダーユニフォーム](/user-manual/graphics/shaders/built-in-uniforms)に記載されているカメラの値や、ライトとフォグの値がこれにあたります。これらの名前に対してマテリアル、メッシュインスタンス、またはグローバルに設定した値は効果がありません。

WebGPU では、レンダラーがパスごとに `StandardMaterial` に提供するテクスチャ、たとえば環境アトラス、シーンのカラーマップと深度マップ、クラスタードライティングのシャドウアトラスとクッキーアトラスにも同じことが当てはまります。これらはマテリアルごとやメッシュインスタンスごとに置き換えることはできず、デバッグビルドでは警告が表示されます。
