---
title: アンチエイリアス
description: "アンチエイリアスを使って学習された Gaussian スプラットが、必要な不透明度の補正付きでどのように検出・描画されるか、そしてリソースごとやシーン全体でそれを上書きする方法。"
---

一部のスプラット学習ツールは、[Mip-Splatting](https://niujinshuchong.github.io/mip-splatting/) のように学習中にアンチエイリアスフィルタを適用します。Postshot はデフォルトでこれを行い、Brush と gsplat はモードとして提供しています。このように学習されたスプラットは、描画時にそれに対応する不透明度の補正が必要です。補正がないと、小さなスプラットや遠くのスプラットが明るくなりすぎ、髪の毛や毛皮のような細かいディテールがギラついて見えます。フィルタなしで学習されたスプラットは補正なしで描画する必要があり、補正を適用すると薄く見えてしまいます。

## 自動検出

デフォルトでは、各スプラットはそのファイルが求める方法で描画されます。スプラットファイルが読み込まれると、ファイルに記録された学習方法によって、そのリソースの [`antiAlias`](https://api.playcanvas.com/engine/classes/GSplatResourceBase.html#antialias) が設定されます：

| フォーマット | 記録方法 |
| --- | --- |
| [PLY](../formats/ply.md) | ヘッダーコメント `postshot.anti_aliasing=1`（Postshot）、または `SplatRenderMode: mip`（Brush、SplatTransform） |
| [SOG](../formats/sog.md) | `meta.json` の `"model": "antialiased"` |
| [Streamed SOG](../formats/streamed-sog.md) | `lod-meta.json` の `"model": "antialiased"`（ストリーミングされるすべてのファイルに適用） |
| [SPZ](../formats/spz.md) | ヘッダーのアンチエイリアスフラグ |

学習方法を記録していないファイル、LCC2 と glTF のファイル、そして[プロシージャルスプラット](procedural-splats/index.md)は補正なしで描画されます。1つのシーンに両方の方法で学習されたスプラットを混在させることができ、それぞれが自身の設定で描画されます。

[SplatTransform](/user-manual/splat-transform/) は、これらのフォーマット間で変換する際に学習方法を保持します。

## 学習方法を記録していないファイル

リソースの `antiAlias` を自分で設定します。いつでも変更できます：

```javascript
const asset = new Asset('scene', 'gsplat', { url: 'scene.ply' });
asset.ready(() => {
    // このシーンはアンチエイリアスを使って学習されていますが、ファイルにはそれが記録されていません
    asset.resource.antiAlias = true;

    const entity = new Entity();
    entity.addComponent('gsplat', { asset });
    app.root.addChild(entity);
});
app.assets.add(asset);
app.assets.load(asset);
```

ストリーミングされるシーンの場合、リソースは [`GSplatOctreeResource`](https://api.playcanvas.com/engine/classes/GSplatOctreeResource.html#antialias) で、その設定はストリーミングされるすべてのファイルに適用されます。

## シーン全体での上書き

[`app.scene.gsplat.antiAlias`](https://api.playcanvas.com/engine/classes/GSplatParams.html#antialias) はデフォルトで `undefined` で、各スプラットがそのリソースに従います。`true` または `false` に設定すると、ファイルの記録に関係なく、すべてのスプラットを補正ありまたは補正なしで描画します：

```javascript
// すべてのスプラットを補正なしで描画します
app.scene.gsplat.antiAlias = false;

// 再び各スプラットがそのリソースに従うようにします
app.scene.gsplat.antiAlias = undefined;
```

## フィルタサイズ

学習ツールによって使うアンチエイリアスフィルタは異なります。Mip-Splatting、Brush の mip モード、LichtFeld Studio、Spirula は 0.1 ピクセル² のフィルタで、gsplat のアンチエイリアスモードは 0.3 で学習します。ファイルにはサイズが記録されないため、学習ツールに合わせて [`app.scene.gsplat.antiAliasFilterSize`](https://api.playcanvas.com/engine/classes/GSplatParams.html#antialiasfiltersize) を設定してください。デフォルトは Mip-Splatting のフィルタである 0.1 です。スプラットの学習時より大きなフィルタを使うと、ぼやけて描画されます：

```javascript
// gsplat のアンチエイリアスモードで学習されたスプラット
app.scene.gsplat.antiAliasFilterSize = 0.3;
```

このサイズは補正付きで描画されるスプラットに適用されます。それ以外のスプラットは、常に標準的な学習の 0.3 フィルタで描画されます。

## パフォーマンス

補正はスプラットごとに数命令を追加します。アンチエイリアスありとなしで学習されたスプラットが混在するシーンでは、さらにスプラットごとのフラグの読み取りが加わります。これは1種類のスプラットだけのシーンにはかからない、わずかな追加コストです。
