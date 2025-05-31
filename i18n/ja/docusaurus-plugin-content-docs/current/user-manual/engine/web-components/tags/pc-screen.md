---
title: <pc-screen>
---

`<pc-screen>` タグは、スクリーンコンポーネントを定義するために使用されます。

:::note

* それは、[`<pc-entity>`](../pc-entity) の直接の子である必要があります。

:::

## 属性

<div className="nowrap-first-col">

| 属性 | 説明 |
| --- | --- |
| `blend` | 値なし属性。存在する場合、スクリーンコンポーネントはブレンドされます。 |
| `priority` | スクリーンコンポーネントの優先度。`0` から `255` までの整数である必要があります。指定されていない場合、`0` が使用されます。 |
| `reference-resolution` | スクリーンコンポーネントの参照解像度。幅と高さの値をスペース区切りリストで指定します。指定されていない場合、`640 320` が使用されます。 |
| `resolution` | スクリーンコンポーネントの解像度。幅と高さの値をスペース区切りリストで指定します。指定されていない場合、`640 320` が使用されます。 |
| `scale-blend` | スクリーンコンポーネントのスケールブレンド。`0` から `1` までの数値である必要があります。指定されていない場合、`0.5` が使用されます。 |
| `screen-space` | 値なし属性。存在する場合、スクリーンコンポーネントはスクリーンスペースにあります。 |

</div>

## 例

```html
<pc-entity>
    <!-- 2Dスクリーンを定義 -->
    <pc-screen></pc-screen>
    <!-- 親スクリーンにテキストをレンダリング -->
    <pc-entity>
        <pc-element type="text" asset="arial"text="Hello, World!"></pc-element>
    </pc-entity>
</pc-entity>
```

## JavaScript インターフェース

[`<pc-screen>`] 要素をプログラムで作成および操作するには、[ScreenComponentElement API](https://api.playcanvas.com/classes/EngineWebComponents.ScreenComponentElement.html) を使用できます。
