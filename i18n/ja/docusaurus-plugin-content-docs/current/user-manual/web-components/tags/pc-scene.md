---
title: <pc-scene>
description: "pc-scene要素のリファレンス: pc-app内のSceneコンテナ、アンビエント設定、レンダリング用にEntityをマウントする場所です。"
---

`<pc-scene>`タグは、シーンを定義するために使用されます。

:::note[使用法]

* [`<pc-app>`](../pc-app)の直接の子要素である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `fog` | Enum | `"none"` | フォグの種類：`"none"` \| `"linear"` \| `"exp"` \| `"exp2"` |
| `fog-color` | Color | `"1 1 1"` | スペース区切りのRGB値、16進数コード、または[名前付きカラー](https://github.com/playcanvas/web-components/blob/main/src/colors.ts)としてのフォグの色 |
| `fog-density` | Number | `"0"` | 指数フォグタイプの場合のフォグの密度 |
| `fog-end` | Number | `"1000"` | 線形フォグの終了距離 |
| `fog-start` | Number | `"0"` | 線形フォグの開始距離 |
| `gravity` | Vector3 | `"0 -9.81 0"` | 「X Y Z」値としてリジッドボディに適用される重力 |

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
