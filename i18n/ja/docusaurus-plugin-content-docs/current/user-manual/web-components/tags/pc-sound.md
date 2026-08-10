---
title: <pc-sound>
description: "pc-sound要素のリファレンス: 位置オーディオまたは非位置のオーディオクリップ、音量、ピッチ、自動再生のルール、Asset参照です。"
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
| `auto-play` | Boolean | `"false"` | サウンドが自動的に再生されるかどうか |
| `duration` | Number | - | サウンドの再生時間（秒単位）（省略するとクリップ全体を再生します） |
| `loop` | Boolean | `"false"` | サウンドがループするかどうか |
| `name` | String | - | サウンドスロットの名前識別子 |
| `overlap` | Boolean | `"false"` | 複数回トリガーされたときにサウンドが重なることができるかどうか |
| `pitch` | Number | `"1"` | ピッチ乗数（1 = 通常ピッチ） |
| `start-time` | Number | `"0"` | 開始時間のオフセット（秒単位） |
| `volume` | Number | `"1"` | 音量レベル（0-1） |

</div>

## 例

```html
<pc-app>
    <pc-asset src="assets/audio/music.mp3" id="music"></pc-asset>
    <pc-scene>
        <pc-entity>
            <pc-sounds>
                <pc-sound asset="music"></pc-sound>
            </pc-sounds>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース

[SoundSlotElement API](https://api.playcanvas.com/web-components/classes/SoundSlotElement.html)を使用して、`<pc-sound>`要素をプログラムで作成および操作できます。
