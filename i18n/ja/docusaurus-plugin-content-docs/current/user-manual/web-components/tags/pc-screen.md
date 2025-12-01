---
title: <pc-screen>
---

`<pc-screen>`タグは、スクリーンコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)の直接の子である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `blend` | Flag | - | アルファブレンディングを有効にするかどうか |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `priority` | Number | `"0"` | レンダリング優先度 (0-255) |
| `reference-resolution` | Vector2 | `"640 320"` | 「幅 高さ」の値としての参照解像度 |
| `resolution` | Vector2 | `"640 320"` | 「幅 高さ」の値としてのスクリーン解像度 |
| `scale-blend` | Number | `"0.5"` | スケールブレンディング係数 (0-1) |
| `screen-space` | Flag | - | スクリーン空間でレンダリングするかどうか |

</div>

## 例

```html
<pc-entity>
    <!-- 2Dスクリーンを定義 -->
    <pc-screen></pc-screen>
    <!-- 親スクリーンにテキストをレンダリング -->
    <pc-entity>
        <pc-element type="text" asset="arial" text="Hello, World!"></pc-element>
    </pc-entity>
</pc-entity>
```

## JavaScriptインターフェース

[ScreenComponentElement API](https://api.playcanvas.com/web-components/classes/ScreenComponentElement.html)を使用して、`<pc-screen>`要素をプログラムで作成および操作できます。
