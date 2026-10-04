---
title: <pc-gsplat>
description: "pc-gsplat要素のリファレンス: Gaussian splat Assetをレンダリングし、splatデータのソース、影、LOD調整向けの属性を扱います。"
---

`<pc-gsplat>`タグは、3D Gaussian Splatを描画するgsplatコンポーネントを追加します。何百万もの小さく柔らかな色付きの粒としてキャプチャしたシーンです。

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
| `lod-base-distance` | Number | `"5"` | 最初のLOD切り替え (LOD 0からLOD 1) が起きるカメラ距離。これより近い部分は最も細かいレベルを使います。ワールド単位で、カメラの視野角に応じて補正され、最小値0.1にクランプされます。LODレベルを含むアセットにのみ影響します。 |
| `lod-multiplier` | Number | `"3"` | 連続するLOD切り替え距離の間の倍率。より粗い各レベルは、1つ前のレベルの距離にこの値を掛けた距離から始まります。値が大きいほどカメラから遠くまで細かいディテールが保たれますが、メモリのコストが増えます。最小値1.2にクランプされます。LODレベルを含むアセットにのみ影響します。 |
| `lod-range-max` | Number | `"99"` | 許可される最大のLODインデックス (この値を含む)。選択されたLODは、この値より粗い (インデックスが大きい) ものにならないようにクランプされます。デフォルトの`99`は事実上「上限なし」を意味します。LODレベルを含むアセットにのみ影響します。 |
| `lod-range-min` | Number | `"0"` | 許可される最小のLODインデックス (この値を含む)。選択されたLODは、この値より細かい (インデックスが小さい) ものにならないようにクランプされます。値を上げると、最高品質 (最大) のLODファイルのダウンロードを回避できます。LODレベルを含むアセットにのみ影響します。 |

</div>

## レベルオブディテール {#level-of-detail}

ストリーミング用のスプラットアセットとは、LODレベル付きでエクスポートされたものです。その[`<pc-asset>`](../pc-asset)の`src`はエクスポートの`lod-meta.json`を指し、このファイルが先に読み込まれ、スプラットデータ自体はオンデマンドでストリーミングされます。`.json`ファイルはそのままでは通常のJSONとして読み込まれるため、`type="gsplat"`を付けて宣言してください。こうしたアセットは、どこでもフルディテールで描画されるわけではありません。ディテールはカメラからの距離に応じて段階的に下がります。`lod-base-distance`までは最も細かいレベルを使い、より粗い各レベルは、1つ前のレベルが始まった距離の`lod-multiplier`倍から始まります。エンジンはさらに**シーン全体のスプラット予算**、つまりシーン内のすべての`<pc-gsplat>`を合わせたスプラット数に従って動きます。予算とその使い方はシーンの性質なので[`<pc-scene>`](../pc-scene)に置かれ、各スプラットのディテールが距離に応じてどう下がるかはここに置かれます。

| 属性 | 場所 | 制御する内容 |
| --- | --- | --- |
| `gsplat-splat-budget` | [`<pc-scene>`](../pc-scene) | シーン全体で描画するスプラット数。デフォルトは1,000,000で、0以下は予算なしを意味します |
| `gsplat-splat-budget-mode` | [`<pc-scene>`](../pc-scene) | デフォルトの`"target"`は、カメラの位置にかかわらず予算を使い切るまでディテールを上げ、LOD距離はディテールの下がり方とスプラット間での配分を形づくるだけです。`"limit"`はLOD距離にディテールを決めさせ、それが予算を超える場合にだけディテールを下げます。そのため、遠くのスプラットは距離に見合った少数のスプラットしか使いません |
| `lod-base-distance`・`lod-multiplier` | `<pc-gsplat>` | *この*スプラットのディテールがどこで下がるか。どちらかを上げると、カメラから遠くまで細かいディテールが保たれます |
| `lod-range-min`・`lod-range-max` | `<pc-gsplat>` | 距離と予算の判断にかかわらず、このスプラットが使えるLODインデックスの上下限。最小値を上げれば、最大のファイルを一切ダウンロードしないようにできます |

```html
<pc-asset id="capture" src="capture/lod-meta.json" type="gsplat"></pc-asset>
<!-- ... -->
<pc-scene gsplat-splat-budget="1500000" gsplat-splat-budget-mode="limit">
    <pc-entity name="capture">
        <pc-gsplat asset="capture" lod-base-distance="8" lod-range-min="1"></pc-gsplat>
    </pc-entity>
</pc-scene>
```

予算がない場合、`"target"`はすべてを最も細かいレベルで描画し、`"limit"`はディテールをLOD距離だけに任せます。LODレベルを持たない通常の`.ply`・`.sog`アセットは常にフルで描画されますが、そのスプラットは予算に数えられ、その分ストリーミングされるアセットに回る量が減ります。

[Splat Streamingのサンプル](https://playcanvas.github.io/web-components/examples/#splat-streaming.html)は大きなLODキャプチャをストリーミングします。`lod-range-min`を最も粗いレベルに固定してシーン全体を素早く表示し、その後固定を外してより細かいレベルをストリーミングさせるため、予算の働きを見ることができます。

## 確率的レンダリング {#stochastic-rendering}

スプラットは通常、毎フレームソートされてアルファブレンドされます。WebGPUでは、[`<pc-scene>`](../pc-scene)の`gsplat-stochastic`を設定すると、代わりにソートせず、ディザリングしたカバレッジと深度書き込みで描画します。これによりフレームからソートがなくなる代わりに、細かいノイズが生じます。ノイズはテンポラルアンチエイリアシングで滑らかになり、そのパターンは`gsplat-dither`で選びます。WebGLでは両方の属性が無視されます。

```html
<pc-scene gsplat-stochastic gsplat-dither="bayer4">
```

## 例 {#example}

実物のぬいぐるみをスキャンしたガウシアンスプラットです。ドラッグで軌道回転、スクロールでズームできます。上で推奨した `<pc-app>` の属性にも注目してください:

```html live-example
<pc-app antialias="false" max-pixel-ratio="1">
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@2.23.0/scripts/esm/camera-controls.mjs"></pc-asset>
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

サンプル: [Basic Splat](https://playcanvas.github.io/web-components/examples/#basic-splat.html)、[Splat Annotations](https://playcanvas.github.io/web-components/examples/#splat-annotations.html)、[Splat Flipbook](https://playcanvas.github.io/web-components/examples/#splat-flipbook.html)、[Splat Streaming](https://playcanvas.github.io/web-components/examples/#splat-streaming.html)
