---
title: テクスチャ
---

### sRGBテクスチャの取り扱い

Diffuse、Emissive、Specular、Sheen などの色を表すテクスチャは、色の精度を維持し、バンディングを減らすために、通常 sRGB スペースに格納されます。エンジンによって使用される際、これらのテクスチャは正しいライティング計算のために sRGB から linear スペースに自動的に変換されます。この変換は、テクスチャが sRGB フォーマットを使用して作成されている場合、GPU によって追加費用なしで効率的に実行されます。

#### **テクスチャのsRGBエンコーディングの指定**

sRGB スペースで色を表すテクスチャアセットをロードする際、sRGB エンコーディングを指定することが重要です。次の例は、sRGB エンコーディングでアセットを作成する方法を示しています。

```javascript
new pc.Asset(
    'color',
    'texture',
    { url: 'heart.png' },
    { encoding: 'srgb' }
);
```

#### **エディターでのsRGBテクスチャのマーク**

Editor で作業する際は、カラーテクスチャがインスペクターパネルで **sRGB** としてマークされていることを確認してください。これにより、エンジンがテクスチャを sRGB として正しく解釈し、linear スペースへの必要な変換を適用することが保証されます。

![sRGB](/img/user-manual/graphics/linear-workflow/srgb-editor.png)

#### **sRGBプロシージャルテクスチャ / レンダーターゲット**

プロシージャルテクスチャを作成する場合、または色を表しシェーダーによって読み取られるテクスチャにレンダリングする場合、自動変換を有効にするために **sRGBフォーマット** で作成することが重要です。このテクスチャにレンダリングする際、linear 値はバンディングを防ぐために自動的に gamma スペースに変換されます。その後、このテクスチャがカラーテクスチャとして使用される際、ピクセルは自動的に linear スペースに逆変換されます。

次の例は、sRGB レンダーターゲットテクスチャを作成する方法を示しています。

```javascript
const texture = new pc.Texture(app.graphicsDevice, {
    name: 'color-texture',
    width: 512,
    height: 512,
    format: pc.PIXELFORMAT_SRGBA8
});
```
