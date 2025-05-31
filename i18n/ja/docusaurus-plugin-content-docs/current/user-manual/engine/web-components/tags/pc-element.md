---
title: <pc-element>
---

`<pc-element>`タグは、要素コンポーネントを定義するために使用されます。

:::note

* それは[`<pc-entity>`](../pc-entity)の直接の子である必要があります。

:::

## 属性

<div className="nowrap-first-col">

| 属性 | 説明 |
| --- | --- |
| `anchor` | 要素コンポーネントのアンカー。X、Y、Z、Wの値をスペースで区切ったリストとして指定します。指定しない場合、`0 0 0 1`が使用されます。 |
| `asset` | `font`タイプの[`<pc-asset>`](../pc-asset)タグの`id`と一致する必要がある文字列。 |
| `auto-width` | 値なし属性。存在する場合、要素コンポーネントは自動的に幅を調整します。 |
| `color` | 要素コンポーネントの色。R、G、B、Aの値をスペースで区切ったリスト、16進カラーコード、または[名前付き色](https://github.com/playcanvas/web-components/blob/main/src/colors.ts)で指定できます。指定しない場合、`1 1 1 1`が使用されます。 |
| `font-size` | 要素コンポーネントのフォントサイズ。指定しない場合、`16`が使用されます。 |
| `line-height` | 要素コンポーネントの行の高さ。指定しない場合、`1.2`が使用されます。 |
| `pivot` | 要素コンポーネントのピボット。XとYの値をスペースで区切ったリストとして指定します。指定しない場合、`0.5 0.5`が使用されます。 |
| `text` | 要素コンポーネントのテキスト。 |
| `type` | 要素コンポーネントのタイプ。`group`、`image`、または`text`のいずれかです。指定しない場合、`group`が使用されます。 |
| `width` | 要素コンポーネントの幅。指定しない場合、`0`が使用されます。 |
| `wrap-lines` | 値なし属性。存在する場合、要素コンポーネントは行を折り返します。 |

</div>

## 例

```html
<pc-entity>
    <pc-element type="text" asset="arial"text="Hello, World!"></pc-element>
</pc-entity>
```

## JavaScriptインターフェース

[ElementComponentElement API](https://api.playcanvas.com/web-components/classes/ElementComponentElement.html)を使用して、`<pc-element>`要素をプログラムで作成および操作できます。
