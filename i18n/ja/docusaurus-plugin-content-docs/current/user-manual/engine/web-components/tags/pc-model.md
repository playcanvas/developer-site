---
title: <pc-model>
---

`<pc-model>`タグは、GLBファイルから3Dモデルをインスタンス化するエンティティを定義するために使用されます。

:::note

* [`<pc-scene>`](../pc-scene)または[`<pc-entity>`](../pc-entity)の直接の子である必要があります。

:::

## 属性

[`<pc-entity>`](../pc-entity)のすべての属性も利用可能です。

| 属性    | 説明                                                                                                        |
| --- | ---                                                                                                        |
| `asset` | `container`タイプの[`<pc-asset>`](../pc-asset)タグの`id`と一致する必要がある文字列。 |

## 例

```html
<pc-asset src="assets/car.glb" id="car"></pc-asset>
<pc-scene>
    <pc-model asset="car"></pc-model>
</pc-scene>
```

## JavaScriptインターフェース

[ModelElement API](https://api.playcanvas.com/classes/EngineWebComponents.ModelElement.html)を使用して、`<pc-model>`要素をプログラムで作成および操作できます。
