---
title: デュアルソースブレンディング
description: WebGL 2 と WebGPU で、1 回のブレンド処理に 2 つのフラグメントシェーダー出力を使用します。
---

デュアルソースブレンディングを使用すると、フラグメントシェーダーは 1 つのカラーアタッチメントに対して 2 つのカラーを出力できます。1 つ目のカラーはブレンドされる値で、2 つ目のカラーはブレンド係数として選択できます。これにより、サブピクセルテキストアンチエイリアスや、単一のフラグメント出力では表現できない高度な合成処理を実装できます。

## プラットフォームサポート

デュアルソースブレンディングは、どちらのグラフィックスバックエンドでもオプション機能です。

- **WebGPU** は `dual-source-blending` デバイス機能と WGSL 言語拡張を使用します。
- **WebGL 2** は `WEBGL_blend_func_extended` 拡張を使用します。

PlayCanvas は両方を同じケイパビリティフラグで公開します。

```javascript
const device = app.graphicsDevice;

if (!device.supportsDualSourceBlending) {
    // フォールバック用のマテリアルまたはレンダリングパスを使用します。
}
```

この機能が利用できる場合、エンジンは `CAPS_DUAL_SOURCE_BLENDING` も定義します。WebGPU では、この機能を使用するフラグメントシェーダーバリアントに `enable dual_source_blending;` を追加します。

## ブレンド係数

2 つ目のフラグメント出力は、次の 4 つのブレンド係数で参照できます。

| ブレンド係数 | 説明 |
|--------------|------|
| `BLENDMODE_SRC1_COLOR` | 2 つ目のソースカラー |
| `BLENDMODE_ONE_MINUS_SRC1_COLOR` | 1 から 2 つ目のソースカラーを引いた値 |
| `BLENDMODE_SRC1_ALPHA` | 2 つ目のソースアルファ |
| `BLENDMODE_ONE_MINUS_SRC1_ALPHA` | 1 から 2 つ目のソースアルファを引いた値 |

これらの定数は、`device.supportsDualSourceBlending` が true の場合にのみ使用してください。

## StandardMaterial

マテリアルの [`BlendState`](https://api.playcanvas.com/engine/classes/BlendState.html) が 2 つ目のソースを参照する係数を使用すると、デュアルソースブレンディングは自動的に有効になります。マテリアルに個別の設定はありません。

最初に、`outputPS` チャンクをオーバーライドして、1 つ目と 2 つ目のフラグメント出力を書き込みます。両方のグラフィックスバックエンドをサポートする場合は、GLSL 版と WGSL 版の両方を指定します。

```javascript
const material = new pc.StandardMaterial();
material.useLighting = false;
material.useTonemap = false;

material.getShaderChunks(pc.SHADERLANGUAGE_GLSL).set('outputPS', `
    gl_FragColor = vec4(0.45, 0.02, 0.02, 0.0);
    pcFragColorSecondary = vec4(0.0, 0.85, 0.18, 1.0);
`);

material.getShaderChunks(pc.SHADERLANGUAGE_WGSL).set('outputPS', `
    output.color = vec4f(0.45, 0.02, 0.02, 0.0);
    output.colorSecondary = vec4f(0.0, 0.85, 0.18, 1.0);
`);
```

次に、ブレンドステートを設定します。この例では、RGB に対して `source0 + destination * source1` を計算します。

```javascript
material.blendState = new pc.BlendState(
    true,
    pc.BLENDEQUATION_ADD,
    pc.BLENDMODE_ONE,
    pc.BLENDMODE_SRC1_COLOR,
    pc.BLENDEQUATION_ADD,
    pc.BLENDMODE_ZERO,
    pc.BLENDMODE_ONE
);

material.update();
```

ここで、`gl_FragColor` / `output.color` が `source0`、`pcFragColorSecondary` / `output.colorSecondary` が `source1` です。2 つ目の値はブレンド処理に使用されますが、別のカラーアタッチメントには書き込まれません。

## ShaderMaterial

[`ShaderMaterial`](https://api.playcanvas.com/engine/classes/ShaderMaterial.html) も同じ BlendState ベースの動作を使用します。フラグメントシェーダーで両方の出力を書き込み、2 つ目のソースを参照する係数を含むブレンドステートを割り当てます。エンジンは、そのマテリアル用のデュアルソースシェーダーバリアントを自動的に生成します。

`ShaderDefinitionUtils.createDefinition` を直接使用してシェーダー定義を作成する場合は、`useDualSourceBlending: true` を渡します。この低レベルオプションは、StandardMaterial または ShaderMaterial では必要ありません。

## 制限事項

- レンダーターゲットにはカラーアタッチメントが 1 つだけ必要です。デュアルソースブレンディングを [マルチレンダーターゲット](/user-manual/graphics/advanced-rendering/multiple-render-targets) と組み合わせることはできません。
- サポート状況はデバイスによって異なるため、2 つ目のソースを参照するブレンド係数を割り当てる前に、必ず `device.supportsDualSourceBlending` を確認してください。
- デュアルソースブレンディングは、マテリアルおよびドローコールごとに個別に選択されます。同じレンダーパス内の他のマテリアルにデュアルソース出力は必要ありません。

## 例

[デュアルソースブレンディングの例](https://playcanvas.com/examples/#/test/dual-source-blending)では、白黒のチェッカーボードをレンダリングし、その上にデュアルソースブレンディングを使用する四角形を描画します。黒いセルには赤い 1 つ目の出力のみが適用され、白いセルには緑の 2 つ目の出力も加算されます。
