---
title: <pc-asset>
description: "pc-asset要素のリファレンス: URLまたはidで読み込むAssetの宣言、型、プリロード、他のタグが読み込んだリソースをどう使うかです。"
---

`<pc-asset>`タグは、アセットを定義するために使用されます。

:::note[使用法]

* [`<pc-app>`](../pc-app)の直接の子である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `atlas` | String | - | `sprite` アセットの場合: このスプライトが読み込む `textureatlas` `<pc-asset>` の `id`。アトラスはスプライトより前に宣言する必要があります |
| `data` | String | - | インラインのJSONアセットデータ。テクスチャアトラス（フレーム定義）やスプライトで使用されます |
| `frame-keys` | String | - | `sprite` アセットの場合: スプライトを構成するアトラスのフレームキーを、スペースまたはカンマ区切りで指定したリスト |
| `id` | String | - | 他のタグがこのアセットを参照するために使用する一意の識別子 |
| `lazy` | Flag | - | 最初に参照されるか、明示的に要求されるまでロードを延期するかどうか |
| `pixels-per-unit` | Number | `"1"` | `sprite` アセットの場合: ワールドユニットあたりのピクセル数 |
| `render-mode` | Enum | `"simple"` | `sprite` アセットの場合: `"simple"` \| `"sliced"` \| `"tiled"`。9スライスパネルには `"sliced"` を使用します |
| `src` | String | - | アセットファイルへのパス |
| `type` | Enum | *inferred* | アセットタイプ：`"audio"` \| `"binary"` \| `"css"` \| `"container"` \| `"font"` \| `"gsplat"` \| `"html"` \| `"json"` \| `"script"` \| `"shader"` \| `"sprite"` \| `"text"` \| `"texture"` \| `"textureatlas"` |

</div>

## 例

```html
<pc-app>
    <!-- スクリプトアセット -->
    <pc-asset src="assets/scripts/animate.mjs"></pc-asset>
    <!-- GLBアセット -->
    <pc-asset src="assets/models/car.glb" id="car"></pc-asset>
</pc-app>
```

スプライトは、テクスチャアトラス（フレーム定義を保持）と、それを参照する1つ以上の `sprite` アセットによって定義されます。アトラスは、それを使用するスプライトより前に宣言する必要があります。

```html
<pc-app>
    <!-- テクスチャアトラス（インラインのフレーム定義付き） -->
    <pc-asset id="ui-sheet" type="textureatlas" src="assets/textures/ui.png"
              data='{"frames":{"3":{"name":"panel","border":[10,10,10,10],"rect":[41,1,100,100],"pivot":[0.5,0.5]}}}'></pc-asset>
    <!-- アトラスからフレーム "3" を読み込む9スライススプライト -->
    <pc-asset id="panel" type="sprite" atlas="ui-sheet" frame-keys="3" render-mode="sliced"></pc-asset>
</pc-app>
```

## JavaScriptインターフェース

[AssetElement API](https://api.playcanvas.com/web-components/classes/AssetElement.html)を使用して、`<pc-asset>`要素をプログラムで作成および操作できます。
