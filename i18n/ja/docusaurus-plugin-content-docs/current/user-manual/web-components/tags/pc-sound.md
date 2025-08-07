---
title: <pc-sound>
---

`<pc-sound>`タグは、サウンドを定義するために使用されます。

:::note[使用法]

* [`<pc-sounds>`](../pc-sounds)コンポーネントの直接の子である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `asset` | String | - | オーディオアセットID（`audio`型アセットを参照する必要があります） |
| `auto-play` | Flag | - | サウンドが自動的に再生されるかどうか |
| `duration` | Number | - | サウンドの再生時間（秒単位） |
| `loop` | Flag | - | サウンドがループするかどうか |
| `name` | String | - | サウンドスロットの名前識別子 |
| `overlap` | Flag | - | 複数回トリガーされたときにサウンドが重なることができるかどうか |
| `pitch` | Number | `"1"` | ピッチ乗数（1 = 通常ピッチ） |
| `start-time` | Number | `"0"` | 開始時間のオフセット（秒単位） |
| `volume` | Number | `"1"` | 音量レベル（0-1） |

</div>

## 例

```html
<pc-sounds>
    <pc-sound asset="music"></pc-sound>
</pc-sounds>
```

## JavaScriptインターフェース

[SoundElement API](https://api.playcanvas.com/web-components/classes/SoundElement.html)を使用して、`<pc-sound>`要素をプログラムで作成および操作できます。
