---
title: <pc-asset>
---

`<pc-asset>`タグは、アセットを定義するために使用されます。

:::note[使用法]

* [`<pc-app>`](../pc-app)の直接の子である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `id` | String | - | 他のタグがこのアセットを参照するために使用する一意の識別子 |
| `lazy` | Flag | - | 最初に参照されるか、明示的に要求されるまでロードを延期するかどうか |
| `src` | String | - | アセットファイルへのパス |
| `type` | Enum | *inferred* | アセットタイプ：`"audio"` \| `"binary"` \| `"css"` \| `"container"` \| `"gsplat"` \| `"html"` \| `"json"` \| `"script"` \| `"shader"` \| `"text"` \| `"texture"` |

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

## JavaScriptインターフェース

[AssetElement API](https://api.playcanvas.com/web-components/classes/AssetElement.html)を使用して、`<pc-asset>`要素をプログラムで作成および操作できます。
