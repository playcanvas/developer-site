---
title: <pc-gsplat>
description: "pc-gsplat要素のリファレンス: Gaussian splat Assetをレンダリングし、splatデータのソース、影、LOD調整向けの属性を扱います。"
---

`<pc-gsplat>`タグは、3D Gaussian Splatsをレンダリングするためのgsplatコンポーネントを定義するために使用されます。

スプラットベースのシーンをレンダリングする場合、最高のパフォーマンスを得るには、[`<pc-app>`](../pc-app)タグの`antialias`を`false`に、`max-pixel-ratio`を`1`に設定することをお勧めします。

:::note[使用法]

* それは、[`<pc-entity>`](../pc-entity)の直接の子である必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `asset` | String | - | Gaussian splatアセットID (`gsplat`タイプのアセットを参照する必要があります) |
| `cast-shadows` | Boolean | `"false"` | gsplatコンポーネントが影を落とすかどうか |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `lod-base-distance` | Number | `"5"` | 最初のLOD遷移 (LOD 0 から LOD 1) の距離。これより近いスプラットは最高品質のLODを使用します。最小値は`0.1`。LODレベルを含むアセットにのみ影響します。 |
| `lod-multiplier` | Number | `"3"` | 連続するLOD距離しきい値の間の乗数で、等比数列を形成します。値が大きいほど、より粗いLODへ早く切り替わります。最小値は`1.2`。LODレベルを含むアセットにのみ影響します。 |
| `lod-range-max` | Number | `"99"` | 許可される最大のLODインデックス (この値を含む)。距離によって選択されるLODは、この値より粗い (インデックスが大きい) ものにならないようにクランプされます。デフォルトの`99`は事実上「上限なし」を意味します。LODレベルを含むアセットにのみ影響します。 |
| `lod-range-min` | Number | `"0"` | 許可される最小のLODインデックス (この値を含む)。距離によって選択されるLODは、この値より細かい (インデックスが小さい) ものにならないようにクランプされます。値を上げると、最高品質 (最大) のLODファイルのダウンロードを回避できます。LODレベルを含むアセットにのみ影響します。 |

</div>

## 例 {#example}

実物のぬいぐるみをスキャンしたガウシアンスプラットです。ドラッグで軌道回転、スクロールでズームできます。上で推奨した `<pc-app>` の属性にも注目してください:

```html live-example
<pc-app antialias="false" max-pixel-ratio="1">
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@2.21.4/scripts/esm/camera-controls.mjs"></pc-asset>
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

スプラットのワークフローはサンプルでいくつか扱っています。[Basic Splat](https://playcanvas.github.io/web-components/examples/basic-splat.html)、[Splat Annotations](https://playcanvas.github.io/web-components/examples/splat-annotations.html)、[Splat Flipbook](https://playcanvas.github.io/web-components/examples/splat-flipbook.html)、[Splat Streaming](https://playcanvas.github.io/web-components/examples/splat-streaming.html)です。
