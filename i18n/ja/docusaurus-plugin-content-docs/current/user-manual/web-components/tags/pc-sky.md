---
title: <pc-sky>
description: "pc-sky要素のリファレンス: テクスチャアセットによるスカイボックス。ボックス・ドーム・無限の投影、シーンライティングのオプション、回転を備えます。"
---

`<pc-sky>`タグは、スカイコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-scene>`](../pc-scene)の直接の子である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `asset` | String | - | テクスチャアセットID (`texture`型のアセットを参照する必要があります) |
| `center` | Vector3 | `"0 0.01 0"` | "X Y Z"値としてのスカイの中心 (0-1の範囲) |
| `intensity` | Number | `"1"` | スカイの明るさの強度 |
| `lighting` | Boolean | `"false"` | スカイボックスを光源として使用するかどうか |
| `mip-level` | Number | `"0"` | スカイボックスのミップレベル。0が最も鮮明です。値を上げるとぼやけたミップが選択され、テクスチャ自体をぼかすことなくスカイボックスを柔らかくできます |
| `rotation` | Vector3 | `"0 0 0"` | "X Y Z"オイラー角としてのスカイの回転 |
| `scale` | Vector3 | `"100 100 100"` | "X Y Z"値としてのスカイのスケール |
| `type` | Enum | `"infinite"` | スカイの種類: `"box"` \| `"dome"` \| `"infinite"` \| `"none"` |

</div>

## 例

```html
<pc-app>
    <pc-asset id="skybox" src="assets/skybox.webp"></pc-asset>
    <pc-scene>
        <pc-sky asset="skybox"></pc-sky>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース

[SkyElement API](https://api.playcanvas.com/web-components/classes/SkyElement.html)を使用して、`<pc-sky>`要素をプログラムで作成および操作できます。
