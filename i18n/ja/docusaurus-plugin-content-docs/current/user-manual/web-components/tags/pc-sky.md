---
title: <pc-sky>
description: "pc-sky要素のリファレンス: テクスチャアセットによるスカイボックス。ボックス・ドーム・無限の投影、シーンライティングのオプション、回転を備えます。"
---

`<pc-sky>`タグは、スカイコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-scene>`](../pc-scene)の直接の子である必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | テクスチャアセットID (`texture`型のアセットを参照する必要があります) |
| `center` | Vector3 | `"0 0.01 0"` | "X Y Z"値としてのスカイの中心 (0-1の範囲) |
| `intensity` | Number | `"1"` | スカイの明るさの強度 |
| `lighting` | Boolean | `"false"` | スカイボックスを光源として使用するかどうか |
| `mip-level` | Number | `"0"` | スカイボックスのミップレベル。0が最も鮮明です。値を上げるとぼやけたミップが選択され、テクスチャ自体をぼかすことなくスカイボックスを柔らかくできます |
| `rotation` | Vector3 | `"0 0 0"` | "X Y Z"オイラー角としてのスカイの回転 |
| `scale` | Vector3 | `"100 100 100"` | "X Y Z"値としてのスカイのスケール |
| `type` | Enum | `"infinite"` | スカイの種類: `"box"` \| `"dome"` \| `"infinite"` \| `"none"` |

</div>

## 例 {#example}

正距円筒図法のテクスチャをドーム投影のスカイとして使い、シーンの照明にも利用しています (`lighting` に注目)。ドラッグで見回せます。`type="infinite"` や `rotation="0 90 0"`、より高い `mip-level` (ソフトになります) も試してみましょう:

```html live-example
<pc-app>
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@2.21.4/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset id="skybox" src="https://developer.playcanvas.com/assets/sepulchral-chapel-rotunda-4k.webp"></pc-asset>
    <pc-scene>
        <pc-sky asset="skybox" type="dome" center="0 0.05 0" scale="20 20 20" lighting></pc-sky>
        <pc-entity name="camera" position="0 1.5 5">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
            <pc-script>
                <pc-script-instance name="cameraControls" enable-pan="false" pitch-range="-90 0" zoom-range="2 12"></pc-script-instance>
            </pc-script>
        </pc-entity>
        <pc-entity name="sphere" position="0 1 0">
            <pc-render type="sphere"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[SkyElement API](https://api.playcanvas.com/web-components/classes/SkyElement.html)を使用して、`<pc-sky>`要素をプログラムで作成および操作できます。

属性はプロパティとしても利用できます。スカイそのものはエンジンのシーンの状態、つまり[Scene](https://api.playcanvas.com/engine/classes/Scene.html)の`sky`と環境アトラスであり、`<pc-scene>`要素の`scene`プロパティを通じてアクセスします。

## 関連項目 {#see-also}

* [`<pc-asset>`](../pc-asset) — 正距円筒テクスチャアセット
* [`<pc-scene>`](../pc-scene) — 露出と、エンジン上でスカイが置かれる場所
* [`<pc-light>`](../pc-light) — スカイの画像ベースライティングと組み合わせる直接光

サンプル: [GLB Loader](https://playcanvas.github.io/web-components/examples/glb-loader.html)、[Product Viewer](https://playcanvas.github.io/web-components/examples/product-viewer.html)、[Shadow Cascades](https://playcanvas.github.io/web-components/examples/shadow-cascades.html)
