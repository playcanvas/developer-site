---
title: <pc-model>
---

`<pc-model>`タグは、GLBファイルから3Dモデルをインスタンス化するエンティティを定義するために使用されます。

:::note[使用法]

* [`<pc-scene>`](../pc-scene)または[`<pc-entity>`](../pc-entity)の直接の子である必要があります。

:::

## 属性

[`<pc-entity>`](../pc-entity)のすべての属性も利用可能です。

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `asset` | String | - | コンテナアセットID (`container`型のアセットを参照する必要があります) |

</div>

## 例

```html
<pc-asset src="assets/car.glb" id="car"></pc-asset>
<pc-scene>
    <pc-model asset="car"></pc-model>
</pc-scene>
```

## JavaScriptインターフェース

[ModelElement API](https://api.playcanvas.com/web-components/classes/ModelElement.html)を使用して、`<pc-model>`要素をプログラムで作成および操作できます。
