---
title: <pc-script>
---

`<pc-script>`タグは、スクリプトを定義するために使用されます。

:::note

* [`<pc-scripts>`](../pc-scripts)コンポーネントの直接の子である必要があります。
* スクリプトは、[`<pc-asset>`](../pc-asset)タグを介してロードされている必要があります。

:::

## 属性

| 属性 | 説明 |
| --- | --- |
| `attributes` | スクリプトの属性を表すJSON文字列。 |
| `enabled` | スクリプトの有効状態。指定されていない場合、`true`が使用されます。 |
| `name` | スクリプトの名前。この名前は、スクリプトのクラス名をキャメルケースにしたものです。 |

## 例

```html
<pc-entity>
    <pc-scripts>
        <pc-script name="myScript"></pc-script>
    </pc-scripts>
</pc-entity>
```

## JavaScriptインターフェース

[ScriptElement API](https://api.playcanvas.com/classes/EngineWebComponents.ScriptElement.html)を使用して、`<pc-script>`要素をプログラムで作成および操作できます。
