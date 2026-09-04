---
title: <pc-gsplat>
description: "pc-gsplat要素のリファレンス: Gaussian splat Assetをレンダリングし、splatデータのソース、影、LOD調整向けの属性を扱います。"
---

`<pc-gsplat>`タグは、3D Gaussian Splatsをレンダリングするためのgsplatコンポーネントを定義するために使用されます。

スプラットベースのシーンをレンダリングする場合、最高のパフォーマンスを得るには、[`<pc-app>`](../pc-app)タグの`antialias`を`false`に、`max-pixel-ratio`を`1`に設定することをお勧めします。

:::note[使用法]

* それは、[`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node)の直接の子である必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | Gaussian splatアセットID (`gsplat`タイプのアセットを参照する必要があります) |
| `cast-shadows` | Boolean | `"false"` | gsplatコンポーネントが影を落とすかどうか |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `lod-falloff` | Number | `"1"` | このスプラットのディテールがカメラから離れるにつれてどれだけ速く落ちるかを、0から8の指数で指定します。値が大きいほどシーン全体のスプラット予算をカメラ近くに集中させ、小さいほど均等に分散させます。LODレベルを含むアセットにのみ影響します。 |
| `lod-range-max` | Number | `"99"` | 許可される最大のLODインデックス (この値を含む)。距離によって選択されるLODは、この値より粗い (インデックスが大きい) ものにならないようにクランプされます。デフォルトの`99`は事実上「上限なし」を意味します。LODレベルを含むアセットにのみ影響します。 |
| `lod-range-min` | Number | `"0"` | 許可される最小のLODインデックス (この値を含む)。距離によって選択されるLODは、この値より細かい (インデックスが小さい) ものにならないようにクランプされます。値を上げると、最高品質 (最大) のLODファイルのダウンロードを回避できます。LODレベルを含むアセットにのみ影響します。 |

</div>

## レベルオブディテール {#level-of-detail}

ストリーミング用のスプラットアセットとは、LODレベル付きでエクスポートされたものです。その[`<pc-asset>`](../pc-asset)の`src`はエクスポートの`lod-meta.json`を指し、このファイルが先に読み込まれ、スプラットデータ自体はオンデマンドでストリーミングされます。こうしたアセットは、どこでもフルディテールで描画されるわけではありません。エンジンは**シーン全体のスプラット予算**、つまりシーン内のすべての`<pc-gsplat>`を合わせて画面に描くスプラット数の目標値に従って動き、最も効果の高い場所にそれを使います。予算とその使い方はシーンの性質なので[`<pc-scene>`](../pc-scene)に置かれ、各スプラットが自分の取り分をどう競うかはここに置かれます。

| 属性 | 場所 | 制御する内容 |
| --- | --- | --- |
| `gsplat-splat-budget` | [`<pc-scene>`](../pc-scene) | シーン全体で描画するスプラットの総数。デフォルトは1,000,000。シーンより大きい予算を与えると、すべてのノードが最も細かいレベルで解決されます |
| `gsplat-lod-mode` | [`<pc-scene>`](../pc-scene) | `"error"`は近似誤差を最も減らせる場所に予算を使います。`"distance"`は誤差メタデータを無視し、カメラを中心とした同心円状の帯でディテールを段階的に下げます。誤差テーブルが信頼できないキャプチャ向けです |
| `lod-falloff` | `<pc-gsplat>` | *この*スプラットが自分の予算の中で、遠方のディテールを近くのディテールとどれだけ急にトレードするか。1が中立で、大きい値ほどディテールをカメラ側へ引き寄せます |
| `lod-range-min`・`lod-range-max` | `<pc-gsplat>` | 予算の判断にかかわらず、このスプラットが使えるLODインデックスの上下限。最小値を上げれば、最大のファイルを一切ダウンロードしないようにできます |

```html
<pc-scene gsplat-splat-budget="1500000" gsplat-lod-mode="error">
    <pc-entity name="capture">
        <pc-gsplat asset="capture" lod-falloff="1.5" lod-range-min="1"></pc-gsplat>
    </pc-entity>
</pc-scene>
```

予算による選択を無効にする方法はありません。0以下の予算は上限を外すのではなく、すべてのノードを最も粗いレベルに固定してしまうため、エンジンは警告を出してデフォルトを使い続けます。すべてをフルディテールで見たい場合は、キャプチャより大きい予算を設定してください。LODレベルを持たない通常の`.ply`・`.sog`・`.splat`アセットにはどれも影響せず、常にフルで描画されます。

[Splat Streamingのサンプル](https://playcanvas.github.io/web-components/examples/splat-streaming.html)は大きなLODキャプチャをストリーミングし、予算を操作できるようにしているので、このトレードオフを想像ではなく実際に眺めることができます。

## 例 {#example}

実物のぬいぐるみをスキャンしたガウシアンスプラットです。ドラッグで軌道回転、スクロールでズームできます。上で推奨した `<pc-app>` の属性にも注目してください:

```html live-example
<pc-app antialias="false" max-pixel-ratio="1">
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@2.22.0/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset id="toy" src="https://developer.playcanvas.com/assets/toy-cat.sog"></pc-asset>
    <pc-scene>
        <pc-entity name="camera" position="0 0 2.5">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
            <pc-script>
                <pc-script-instance name="cameraControls" enable-pan="false" zoom-range="1 5"></pc-script-instance>
            </pc-script>
        </pc-entity>
        <pc-entity name="toy" position="0 -0.7 0" rotation="0 0 180">
            <pc-gsplat asset="toy"></pc-gsplat>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[GSplatComponentElement API](https://api.playcanvas.com/web-components/classes/GSplatComponentElement.html)を使用して、`<pc-gsplat>`要素をプログラムで作成および操作できます。

`component`プロパティは、この要素が追加するエンジンの[GSplatComponent](https://api.playcanvas.com/engine/classes/GSplatComponent.html)です。要素の準備が完了するまでは`null`で、属性が公開していないものはすべてここから利用できます。

## 関連項目 {#see-also}

* [`<pc-asset>`](../pc-asset) — `gsplat`アセットとして宣言するスプラットファイル
* [`<pc-app>`](../pc-app) — スプラットに推奨するデバイス設定
* [Webコンポーネントの使用](../../gaussian-splatting/building/your-first-app/web-components.md) — はじめてのスプラットアプリを順を追って作る

サンプル: [Basic Splat](https://playcanvas.github.io/web-components/examples/basic-splat.html)、[Splat Annotations](https://playcanvas.github.io/web-components/examples/splat-annotations.html)、[Splat Flipbook](https://playcanvas.github.io/web-components/examples/splat-flipbook.html)、[Splat Streaming](https://playcanvas.github.io/web-components/examples/splat-streaming.html)
