---
title: <pc-scene>
---

`<pc-scene>` タグはシーンを定義するために使用されます。

:::note

* [`<pc-app>`](../pc-app) の直接の子である必要があります。

:::

## 属性

| 属性 | 説明 |
| --- | --- |
| `fog` | 使用するフォグの種類。`linear`、`exp`、または `exp2` のいずれかです。 |
| `fog-color` | フォグの色。CSS カラー文字列または 16 進カラーコードです。 |
| `fog-start` | フォグの開始距離。 |
| `fog-end` | フォグの終了距離。 |
| `fog-density` | フォグの密度。 |

## 例

```html
<pc-app>
    <pc-scene>
        <!-- ここでpc-entityタグを定義します -->
    </pc-scene>
</pc-app>
```

## JavaScript インターフェース

[SceneElement API](https://api.playcanvas.com/web-components/classes/SceneElement.html) を使用して、プログラムで `<pc-scene>` 要素を作成および操作できます。
