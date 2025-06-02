---
title: <pc-sound>
---

`<pc-sound>`タグは、サウンドを定義するために使用されます。

:::note

* これは、[`<pc-sounds>`](../pc-sounds)コンポーネントの直接の子である必要があります。

:::

## 属性

| 属性 | 説明 |
| --- | --- |
| `asset` | `audio`タイプの[`<pc-asset>`](../pc-asset)タグの`id`と一致する必要がある文字列。 |
| `auto-play` | 値を持たない属性。存在する場合、サウンドスロットは自動的に再生されます。 |
| `duration` | サウンドスロットの再生時間。 |
| `loop` | 値を持たない属性。存在する場合、サウンドスロットはループします。 |
| `name` | サウンドスロットの名前。 |
| `overlap` | 値を持たない属性。存在する場合、サウンドスロットはオーバーラップします。 |
| `pitch` | サウンドスロットのピッチ。指定されていない場合、`1`が使用されます。 |
| `start-time` | サウンドスロットの開始時間。指定されていない場合、`0`が使用されます。 |
| `volume` | サウンドスロットの音量。指定されていない場合、`1`が使用されます。 |

## 例

```html
<pc-sounds>
    <pc-sound asset="music"></pc-sound>
</pc-sounds>
```

## JavaScriptインターフェース

[SoundElement API](https://api.playcanvas.com/web-components/classes/SoundElement.html)を使用して、`<pc-sound>`要素をプログラムによって作成および操作できます。
