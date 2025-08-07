---
title: <pc-scene>
---

`<pc-scene>`タグは、シーンを定義するために使用されます。

:::note[使用法]

* [`<pc-app>`](../pc-app)の直接の子要素である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `fog` | Enum | - | フォグの種類：`"linear"` \| `"exp"` \| `"exp2"` |
| `fog-color` | Color | - | CSSカラース文字列または16進数コードとしてのフォグの色 |
| `fog-density` | Number | - | 指数フォグタイプの場合のフォグの密度 |
| `fog-end` | Number | - | 線形フォグの終了距離 |
| `fog-start` | Number | - | 線形フォグの開始距離 |

</div>

## 例

```html
<pc-app>
    <pc-scene>
        <!-- ここにpc-entityタグを定義します -->
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース

[SceneElement API](https://api.playcanvas.com/web-components/classes/SceneElement.html)を使用して、`<pc-scene>`要素をプログラムで作成および操作できます。
